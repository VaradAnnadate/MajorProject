import { gzipSync } from 'node:zlib';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const distDirectory = path.resolve('dist');
const manifestPath = path.join(distDirectory, '.vite/manifest.json');
const maxInitialGzipBytes = 150 * 1024;

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const byOutputFile = new Map(Object.entries(manifest).map(([key, entry]) => [path.basename(entry.file), key]));
const visitedEntries = new Set();
const outputFiles = new Set();

function collectEntry(key) {
  if (visitedEntries.has(key)) return;
  visitedEntries.add(key);
  const entry = manifest[key];
  if (!entry) throw new Error(`Missing build manifest entry: ${key}`);

  if (entry.file) outputFiles.add(entry.file);
  for (const stylesheet of entry.css || []) outputFiles.add(stylesheet);
  for (const importedFile of entry.imports || []) {
    const importedKey = manifest[importedFile]
      ? importedFile
      : byOutputFile.get(path.basename(importedFile).replace(/^_/, ''));
    if (importedKey) collectEntry(importedKey);
  }
}

// The root route is the app shell plus the landing page shown on a fresh visit.
collectEntry('index.html');
collectEntry('src/pages/LandingPage.jsx');

let initialGzipBytes = 0;
for (const file of outputFiles) {
  const filePath = path.join(distDirectory, file);
  await stat(filePath);
  initialGzipBytes += gzipSync(await readFile(filePath)).byteLength;
}

const formattedSize = `${(initialGzipBytes / 1024).toFixed(1)} KiB`;
if (initialGzipBytes > maxInitialGzipBytes) {
  throw new Error(`Initial app shell and landing route are ${formattedSize} gzipped; budget is 150 KiB.`);
}

console.log(`Initial app shell and landing route: ${formattedSize} gzipped (150 KiB budget).`);
