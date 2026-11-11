import * as THREE from 'three';

/**
 * SovereignPortalTunnel
 * A cinematic 3D portal bridge connecting Scene 04 to Scene 05.
 * 1. Begins in front of the Golden Ashoka Chakra of Rights & Justice.
 * 2. As the user scrolls, the camera flies INTO the center opening of the seal.
 * 3. POV travels inside a deep dimensional warp tunnel of glowing golden rings & rushing sparks.
 * 4. A brilliant white beacon at the end expands into pure white light.
 * 5. Light fades out smoothly to reveal Scene 05 (The Living World Adventure Map).
 */
export class SovereignPortalTunnel {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animationFrameId = null;
    this.clock = new THREE.Clock();

    // Scene groups & elements
    this.sealGroup = null;
    this.tunnelGroup = null;
    this.beaconMesh = null;
    this.beaconCorona = null;
    this.particles = null;
    this.tunnelRings = [];

    this.progress = 0;

    this.init();
  }

  init() {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;

    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Perspective Camera with cinematic depth
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 9.5);
    this.camera.lookAt(0, 0, 0);

    // 3. Renderer with transparent alpha to blend seamlessly into #FBF8F3
    const gl =
      this.canvas.getContext('webgl2', { antialias: true, alpha: true }) ||
      this.canvas.getContext('webgl', { antialias: true, alpha: true });

    if (!gl) {
      throw new Error('WebGL context is not supported');
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      context: gl,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;

    // 4. Studio Lighting
    this.setupLighting();

    // 5. Build Front Seal Object at Z = 0
    this.buildFrontSeal();

    // 6. Build Dimensional Warp Tunnel extending Z = 0 to Z = -32
    this.buildTunnel();

    // 7. Build Floating Atmospheric Particles
    this.buildAtmosphere();

    // 8. Resize listener & Observer
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this.canvas);
    }

    // 9. Start render loop
    this.render = this.render.bind(this);
    this.render();
  }

  setupLighting() {
    // Soft all-around ambient illumination
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.8);
    this.scene.add(ambientLight);

    // Key sunlight from upper-right
    const sunLight = new THREE.DirectionalLight(0xffeedd, 2.8);
    sunLight.position.set(6, 10, 8);
    this.scene.add(sunLight);

    // Warm saffron fill from left
    const fillLight = new THREE.DirectionalLight(0xff9933, 1.6);
    fillLight.position.set(-6, -4, 4);
    this.scene.add(fillLight);

    // Tunnel interior light moving along Z axis
    this.tunnelPointLight = new THREE.PointLight(0xffb84d, 3.5, 25, 1.2);
    this.tunnelPointLight.position.set(0, 0, -8);
    this.scene.add(this.tunnelPointLight);

    // White beacon point light at the end of tunnel
    this.beaconPointLight = new THREE.PointLight(0xffffff, 5.0, 30, 1.5);
    this.beaconPointLight.position.set(0, 0, -32);
    this.scene.add(this.beaconPointLight);
  }

  buildFrontSeal() {
    this.sealGroup = new THREE.Group();
    this.sealGroup.position.set(0, 0, 0);

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf5b83d,
      metalness: 0.88,
      roughness: 0.22,
    });

    const darkGoldMat = new THREE.MeshStandardMaterial({
      color: 0xba7c18,
      metalness: 0.82,
      roughness: 0.35,
    });

    const saffronGlowMat = new THREE.MeshStandardMaterial({
      color: 0xffe29a,
      emissive: 0xff9900,
      emissiveIntensity: 1.8,
      roughness: 0.15,
    });

    const outerRadius = 2.4;
    const hubRadius = 0.85; // Wide central aperture so camera can fly straight inside!

    // Heavy gold outer torus rim
    const outerRimGeo = new THREE.TorusGeometry(outerRadius, 0.14, 24, 72);
    const outerRim = new THREE.Mesh(outerRimGeo, goldMat);
    this.sealGroup.add(outerRim);

    // Secondary inner bevel ring
    const midRimGeo = new THREE.TorusGeometry(outerRadius - 0.26, 0.07, 16, 72);
    const midRim = new THREE.Mesh(midRimGeo, darkGoldMat);
    this.sealGroup.add(midRim);

    // 4 Cardinal Medallions of Rights (Survival, Protection, Development, Participation)
    for (let m = 0; m < 4; m++) {
      const angle = (m * Math.PI) / 2;
      const medGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 16);
      const med = new THREE.Mesh(medGeo, saffronGlowMat);
      med.rotation.x = Math.PI / 2;
      med.position.set(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius, 0.05);
      this.sealGroup.add(med);
    }

    // 24 Spokes of the Ashoka Chakra
    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI * 2) / 24;
      const spokeLength = outerRadius - 0.28 - hubRadius;

      const spokeGeo = new THREE.CylinderGeometry(0.028, 0.055, spokeLength, 8);
      const spoke = new THREE.Mesh(spokeGeo, goldMat);

      spoke.position.set(
        Math.cos(angle) * (hubRadius + spokeLength / 2),
        Math.sin(angle) * (hubRadius + spokeLength / 2),
        0
      );
      spoke.rotation.z = angle - Math.PI / 2;
      this.sealGroup.add(spoke);
    }

    // Open Hub Rim (Entrance to the dimensional tunnel!)
    const hubRimGeo = new THREE.TorusGeometry(hubRadius, 0.1, 20, 64);
    const hubRim = new THREE.Mesh(hubRimGeo, saffronGlowMat);
    this.sealGroup.add(hubRim);

    this.scene.add(this.sealGroup);
  }

  buildTunnel() {
    this.tunnelGroup = new THREE.Group();

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffaa22,
      emissive: 0xff8800,
      emissiveIntensity: 1.5,
      roughness: 0.2,
      metalness: 0.8,
    });

    const tunnelRadius = 1.4;

    // 11 Concentric Glowing Portal Rings stretching down the tunnel: Z = -2.5 to -30
    for (let z = -2.5; z >= -30; z -= 2.75) {
      const ringGeo = new THREE.TorusGeometry(tunnelRadius, 0.06, 16, 48);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(0, 0, z);
      this.tunnelGroup.add(ring);
      this.tunnelRings.push(ring);
    }

    // 8 Longitudinal glowing speed warp ribs along the tunnel walls
    for (let r = 0; r < 8; r++) {
      const angle = (r * Math.PI * 2) / 8;
      const ribGeo = new THREE.CylinderGeometry(0.02, 0.02, 32, 6);
      const ribMat = new THREE.MeshBasicMaterial({
        color: 0xf5b83d,
        transparent: true,
        opacity: 0.65,
      });
      const rib = new THREE.Mesh(ribGeo, ribMat);
      rib.position.set(Math.cos(angle) * tunnelRadius, Math.sin(angle) * tunnelRadius, -16);
      rib.rotation.x = Math.PI / 2;
      this.tunnelGroup.add(rib);
    }

    // ----------------------------------------------------
    // End-of-Tunnel Luminous White Beacon (Z = -32)
    // ----------------------------------------------------
    const beaconGeo = new THREE.SphereGeometry(1.8, 32, 32);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });
    this.beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    this.beaconMesh.position.set(0, 0, -32);
    this.tunnelGroup.add(this.beaconMesh);

    // Golden corona halo ring around the beacon
    const coronaGeo = new THREE.TorusGeometry(3.2, 0.25, 16, 48);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xffeedd,
      transparent: true,
      opacity: 0.85,
    });
    this.beaconCorona = new THREE.Mesh(coronaGeo, coronaMat);
    this.beaconCorona.position.set(0, 0, -32.1);
    this.tunnelGroup.add(this.beaconCorona);

    this.scene.add(this.tunnelGroup);
  }

  buildAtmosphere() {
    // 250 golden sparks distributed along the entire flight path (Z = 8 down to -32)
    const count = 250;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Cylinder distribution along tunnel radius
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2.2 + 0.2;
      positions[i * 3 + 0] = Math.cos(angle) * radius; // X
      positions[i * 3 + 1] = Math.sin(angle) * radius; // Y
      positions[i * 3 + 2] = Math.random() * 42 - 32;  // Z: -32 to +10
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xffcc44,
      size: 0.09,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  /**
   * Update scroll progress (0 to 1):
   * Drives the camera smoothly through the Ashoka seal, into the tunnel, and to the beacon!
   */
  setProgress(progress) {
    this.progress = Math.max(0, Math.min(1, progress));
    const t = this.progress;

    // 1. Front Seal spins on its axis as user scrolls
    if (this.sealGroup) {
      this.sealGroup.rotation.z = t * Math.PI * 2.4;
      // Slight 3D dynamic tilt before camera enters
      if (t < 0.35) {
        this.sealGroup.rotation.y = Math.sin(t * Math.PI * 2.5) * 0.35;
        this.sealGroup.rotation.x = Math.sin(t * Math.PI * 2.0) * 0.15;
      } else {
        this.sealGroup.rotation.y = 0;
        this.sealGroup.rotation.x = 0;
      }
    }

    // 2. Camera POV Flight Path through 3D space:
    // t = 0.00: Z = 9.5 (Front full view of the Sovereign Seal)
    // t = 0.30: Z = 2.5 (Approaching the open hub opening)
    // t = 0.45: Z = -0.5 (Passing through the center opening of the seal!)
    // t = 0.70: Z = -16.0 (Flying inside the tunnel between glowing rings & stars)
    // t = 0.90: Z = -28.0 (Arriving at the intense white beacon)
    // t = 1.00: Z = -31.8 (Directly inside the white light core)
    const targetZ = 9.5 - t * 41.3;

    // Subtle gentle camera roll/bob for immersive POV flight sensation
    const rollZ = Math.sin(t * Math.PI * 2) * 0.08;
    this.camera.position.set(0, 0, targetZ);
    this.camera.rotation.z = rollZ;
    this.camera.lookAt(0, 0, targetZ - 10);

    // 3. Move the interior tunnel light along with the camera
    if (this.tunnelPointLight) {
      this.tunnelPointLight.position.set(0, 0, targetZ - 4);
    }

    // 4. White beacon expands into full viewport burst as camera approaches (t > 0.72)
    if (this.beaconMesh && this.beaconCorona) {
      if (t > 0.72) {
        const factor = (t - 0.72) / 0.28;
        const scale = 1.0 + Math.pow(factor, 2.2) * 14.0;
        this.beaconMesh.scale.set(scale, scale, scale);
        this.beaconCorona.scale.set(scale, scale, scale);
      } else {
        this.beaconMesh.scale.set(1, 1, 1);
        this.beaconCorona.scale.set(1, 1, 1);
      }
    }
  }

  render() {
    this.animationFrameId = requestAnimationFrame(this.render);

    const elapsed = this.clock.getElapsedTime();

    // Subtle idle rotation on particles
    if (this.particles) {
      this.particles.rotation.z = elapsed * 0.05;
    }

    // Subtle idle spin on beacon corona
    if (this.beaconCorona) {
      this.beaconCorona.rotation.z = elapsed * 0.2;
    }

    this.renderer.render(this.scene, this.camera);
  }

  handleResize() {
    if (!this.canvas || !this.camera || !this.renderer) return;
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    window.removeEventListener('resize', this.handleResize);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.scene) {
      this.scene.traverse((obj) => {
        if (obj.isMesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material.dispose();
          }
        }
      });
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
  }
}
