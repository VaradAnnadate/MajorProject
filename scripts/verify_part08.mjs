import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = async (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');
let checks = 0;
function verify(condition, message) {
  assert.ok(condition, message);
  checks += 1;
}

const manifest = JSON.parse(await source('public/manifest.webmanifest'));
const icon = await source('public/icons/rightsquest.svg');
const icon192 = await readFile(new URL('../public/icons/rightsquest-192.png', import.meta.url));
const icon512 = await readFile(new URL('../public/icons/rightsquest-512.png', import.meta.url));
const worker = await source('public/sw.js');
const generator = await source('scripts/generate-service-worker.mjs');
const questStore = await source('src/pwa/offlineQuestStore.js');
const scenarioPage = await source('src/features/gameplay/pages/ScenarioPage.jsx');
const pwaStatus = await source('src/pwa/PwaStatus.jsx');
const router = await source('src/app/router.jsx');
const globals = await source('src/styles/globals.css');
const motion = await source('src/styles/motion.css');
const packageJson = JSON.parse(await source('package.json'));
const bundleBudget = await source('scripts/check-initial-bundle.mjs');

verify(manifest.display === 'standalone' && manifest.scope === '/', 'PWA manifest supports standalone launch at the site root');
verify(manifest.icons.some((item) => item.sizes === '192x192' && item.type === 'image/png'), 'Manifest provides the 192px install icon');
verify(manifest.icons.some((item) => item.sizes === '512x512' && item.purpose.includes('maskable')), 'Manifest provides a maskable 512px install icon');
verify(icon192.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) && icon192.readUInt32BE(16) === 192, '192px PNG icon exists with a valid PNG header');
verify(icon512.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) && icon512.readUInt32BE(16) === 512, '512px PNG icon exists with a valid PNG header');
verify(icon.includes('viewBox="0 0 512 512"'), 'App icon is resolution independent');
verify(worker.includes("request.mode === 'navigate'") && worker.includes("caches.match(APP_SHELL_URL)") && worker.includes('webmanifest'), 'Service worker provides the cached SPA shell and manifest for offline routes');
verify(worker.includes("url.pathname.startsWith('/api/')") && worker.includes('request.method !== \'GET\''), 'Service worker leaves API and non-GET requests network-only');
verify(generator.includes("startsWith('three-chunk-')") && generator.includes('__RQ_PRECACHE_URLS__'), 'Build precaches app assets while leaving the optional 3D bundle out');
verify(questStore.includes('indexedDB.open') && questStore.includes("createObjectStore(QUEST_STORE, { keyPath: 'id' })"), 'Quest scripts have a versioned IndexedDB object store');
verify(scenarioPage.includes('getOfflineQuest(scenarioId)') && scenarioPage.includes('cacheOfflineQuests([bundledScenario])'), 'Scenario route reads saved quests offline and refreshes their local copy online');
verify(pwaStatus.includes("'beforeinstallprompt'") && pwaStatus.includes("'offline'") && pwaStatus.includes('role="status"'), 'PWA controls announce install and offline state accessibly');
verify(router.includes('aria-live="polite"') && globals.includes(':focus-visible'), 'Route loading is announced and keyboard focus has a visible treatment');
verify(motion.includes('prefers-reduced-motion: reduce'), 'Global motion styles honor reduced-motion preferences');
verify(packageJson.scripts['test:part08'] === 'node scripts/verify_part08.mjs', 'Part 08 verification is available as a dedicated npm script');
verify(bundleBudget.includes('150 * 1024') && packageJson.scripts.build.includes('check-initial-bundle.mjs'), 'Production builds enforce a 150 KiB initial-route gzip budget');

console.log(`Part 08 PWA and accessibility verification passed (${checks} checks).`);
