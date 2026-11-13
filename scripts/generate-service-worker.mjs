import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('dist');
const workerPath = path.join(outputDirectory, 'sw.js');
const cacheableExtensions = new Set(['.html', '.css', '.js', '.json', '.webmanifest', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.woff', '.woff2']);

async function listFiles(directory, relativeDirectory = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(absolutePath, relativePath));
    } else if (entry.isFile()) {
      files.push(relativePath.split(path.sep).join('/'));
    }
  }
  return files;
}

const files = (await listFiles(outputDirectory))
  .filter((file) => file !== 'sw.js' && cacheableExtensions.has(path.extname(file).toLowerCase()))
  .filter((file) => !file.startsWith('.vite/'))
  // The cinematic WebGL bundle is optional for quest playback and would make first-install caching much heavier.
  .filter((file) => !path.basename(file).startsWith('three-chunk-'))
  .sort();

if (!files.includes('index.html') || !files.includes('manifest.webmanifest')) {
  throw new Error('PWA shell files are missing from dist. Run `vite build` before generating the service worker.');
}

const urls = ['/', ...files.map((file) => `/${file}`)];
const versionDigest = createHash('sha256').update(urls.join('\n'));
for (const file of files) {
  versionDigest.update(await readFile(path.join(outputDirectory, file)));
}
const cacheVersion = versionDigest.digest('hex').slice(0, 12);
const template = await readFile(workerPath, 'utf8');
const worker = template
  .replaceAll('__RQ_CACHE_VERSION__', cacheVersion)
  .replace('__RQ_PRECACHE_URLS__', JSON.stringify(urls));

if (worker === template || worker.includes('__RQ_PRECACHE_URLS__') || worker.includes('__RQ_CACHE_VERSION__')) {
  throw new Error('Could not inject the generated offline asset manifest into dist/sw.js.');
}

await writeFile(workerPath, worker);
console.log(`Generated service worker ${cacheVersion} with ${urls.length} offline shell assets.`);
