import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

console.log('------------------------------------------------------------');
console.log('RUNNING RIGHTSQUEST INDIA 3D SOVEREIGN PORTAL TUNNEL QA CHECK');
console.log('------------------------------------------------------------');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Core 3D Gateway Files Existence
const gatewayFiles = [
  'src/features/gateway/engine/SovereignPortalTunnel.js',
  'src/features/gateway/components/LandingScrollGateway.jsx',
  'src/features/gateway/components/LandingScrollGateway.module.css',
  'src/features/progression/components/GamifiedMilestoneCelebration.jsx',
];

for (const relPath of gatewayFiles) {
  assert(existsSync(resolve(process.cwd(), relPath)), `File exists: ${relPath}`);
}

// 2. Three.js Procedural Sovereign Portal Tunnel Engine
const engineSource = readFileSync(resolve(process.cwd(), 'src/features/gateway/engine/SovereignPortalTunnel.js'), 'utf-8');
assert(engineSource.includes('class SovereignPortalTunnel'), 'SovereignPortalTunnel class is defined');
assert(engineSource.includes('THREE.WebGLRenderer'), 'Initializes Three.js WebGLRenderer');
assert(engineSource.includes('THREE.PerspectiveCamera'), 'Initializes PerspectiveCamera with realistic spatial depth');
assert(engineSource.includes('alpha: true'), 'Renderer configured with transparent alpha to match page background');
assert(engineSource.includes('sealGroup'), 'Constructs 3D Ashoka Chakra of Child Rights at entrance');
assert(engineSource.includes('tunnelRings'), 'Constructs dimensional warp tunnel of concentric glowing rings');
assert(engineSource.includes('beaconMesh'), 'Constructs white beacon at end of tunnel');
assert(engineSource.includes('setProgress'), 'Supports camera POV flight into and through the seal into the tunnel');
assert(engineSource.includes('destroy()'), 'Performs deep memory and WebGL context disposal');

// 3. Landing Page Embedded Scroll Experience Bridge (Between Scene 04 and Scene 05)
const landingSource = readFileSync(resolve(process.cwd(), 'src/pages/LandingPage.jsx'), 'utf-8');
assert(landingSource.includes('LandingScrollGateway'), 'LandingPage imports and renders LandingScrollGateway');
assert(landingSource.includes('<LandingScrollGateway />'), 'LandingScrollGateway is mounted between Scene 04 and Scene 05');

const gatewaySource = readFileSync(resolve(process.cwd(), 'src/features/gateway/components/LandingScrollGateway.jsx'), 'utf-8');
assert(gatewaySource.includes('onScroll'), 'LandingScrollGateway drives 3D camera travel on user scroll');
assert(gatewaySource.includes('stickyViewport'), 'LandingScrollGateway pins viewport during 3D fly-through');
assert(gatewaySource.includes('SovereignPortalTunnel'), 'LandingScrollGateway instantiates SovereignPortalTunnel');
assert(gatewaySource.includes('whiteLightOverlay'), 'Implements white-light burst overlay that fades out to reveal Scene 05');
assert(gatewaySource.includes('playThresholdChime'), 'Plays harmonic threshold chime upon entering white light');

const cssSource = readFileSync(resolve(process.cwd(), 'src/features/gateway/components/LandingScrollGateway.module.css'), 'utf-8');
assert(cssSource.includes('--color-canvas-primary'), 'Styles match landing page background #FBF8F3');
assert(cssSource.includes('position: sticky'), 'CSS uses sticky positioning with zero free space');

// 4. Navigation & Route Architecture: No separate isolated /gateway destination
const navSource = readFileSync(resolve(process.cwd(), 'src/data/navigation.js'), 'utf-8');
assert(!navSource.includes("path: '/gateway'"), "NAV_LINKS cleanly omits isolated '/gateway' link");

const routerSource = readFileSync(resolve(process.cwd(), 'src/app/router.jsx'), 'utf-8');
assert(routerSource.includes("path: 'gateway'") && routerSource.includes("to=\"/\""), "Router redirects '/gateway' to home screen");

// 5. Invariant Checks
assert(!gatewaySource.includes('leaderboard') && !gatewaySource.includes('ranking'), 'Zero competitive ranking in 3D bridge');

console.log('------------------------------------------------------------');
console.log(`3D SOVEREIGN TUNNEL QA SUMMARY: ${passed} PASSED / ${failed} FAILED`);
console.log('------------------------------------------------------------');

if (failed > 0) {
  process.exit(1);
}
