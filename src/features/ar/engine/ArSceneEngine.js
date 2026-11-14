import * as THREE from 'three';

/**
 * ArSceneEngine
 * Premium Spatial Three.js Engine for RightsQuest India.
 *
 * Powers both:
 * 1. WebXR Augmented Reality Mode (immersive-ar session on compatible mobile hardware)
 * 2. Premium Interactive 3D Exhibition Mode (accessible universal fallback)
 *
 * Creative OS Governing Standards:
 * - 44_AGENCYLIKE_UI (Spatial Persuasion Spine, Shared-Element Continuity, Physical Consequence)
 * - DPDP Act 2023 §9 Child Safeguarding: Zero camera frames recorded, saved, or uploaded.
 */
export class ArSceneEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = options;
    this.onObjectClick = options.onObjectClick || null;
    this.onInteractivePartClick = options.onInteractivePartClick || null;
    this.onArSessionEnd = options.onArSessionEnd || null;
    this.onPlacementStatus = options.onPlacementStatus || null;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.currentSession = null;
    this.isArActive = false;
    this.isPlacedInAr = false;
    this.animationFrameId = null;
    this.clock = new THREE.Clock();

    // Scene groups
    this.exhibitionPedestal = null;
    this.mainStageGroup = null;
    this.currentStationGroup = null;
    this.mitraGroup = null;
    this.particlesGroup = null;
    this.reticle = null;
    this.hitTestSource = null;

    // Consequence animation states
    this.activeSpatialEffect = null;
    this.effectTimer = 0;
    this.scaleTiltAngle = -0.22; // Start with noticeable unfair tilt for Station 2
    this.targetScaleTilt = -0.22;
    this.gateAngle = 0;
    this.targetGateAngle = 0;
    this.scrollUnfurlProgress = 0;
    this.targetScrollUnfurl = 0;
    this.shieldDomeScale = 0.001;
    this.targetShieldDomeScale = 0.001;
    this.beaconPulseScale = 1;
    this.chakraSpinSpeed = 0.004;
    this.remedyRaysActive = false;

    // Mitra emotional state
    this.mitraEmotion = 'welcome'; // 'welcome' | 'explaining' | 'thinking' | 'celebrating' | 'concerned'
    this.mitraBlinkTimer = 0;

    // Interaction controls for 3D inspection
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0.002 };
    this.zoomLevel = 6.0;

    // Bind event listeners
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleCanvasClick = this.handleCanvasClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.init();
  }

  init() {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || (window.innerHeight * 0.72);

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera with cinematic focal length
    this.camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    this.camera.position.set(0, 1.15, this.zoomLevel);
    this.camera.lookAt(0, 0.15, 0);

    // 3. WebGL Renderer with WebXR capabilities
    const gl =
      this.canvas.getContext('webgl2', { antialias: true, alpha: true }) ||
      this.canvas.getContext('webgl', { antialias: true, alpha: true });

    if (!gl) {
      throw new Error('WebGL is not supported in this browser.');
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      context: gl,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.xr.enabled = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Lighting setup (Museum-Grade Directional & Rim illumination)
    this.setupLighting();

    // 5. Architectural Exhibition Pedestal (for 3D mode)
    this.exhibitionPedestal = this.buildPedestal();
    this.scene.add(this.exhibitionPedestal);

    // 6. Floating constitutional dust particles
    this.particlesGroup = this.buildDustParticles();
    this.scene.add(this.particlesGroup);

    // 7. Main Stage Container
    this.mainStageGroup = new THREE.Group();
    this.scene.add(this.mainStageGroup);

    // 8. Mitra 3D Spatial Companion
    this.mitraGroup = this.buildMitraCompanion();
    this.mitraGroup.position.set(2.4, -0.85, 0.5);
    this.mitraGroup.scale.set(0.68, 0.68, 0.68);
    this.scene.add(this.mitraGroup);

    // 9. Reticle for WebXR surface placement
    this.reticle = this.buildReticle();
    this.scene.add(this.reticle);

    // 10. Attach event listeners
    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    this.canvas.addEventListener('wheel', this.handleWheel, { passive: true });
    this.canvas.addEventListener('click', this.handleCanvasClick);
    window.addEventListener('resize', this.handleResize);

    // 11. Start animation loop
    this.startAnimationLoop();
  }

  setupLighting() {
    // Warm gallery ambient fill
    const ambient = new THREE.AmbientLight(0xfff8ed, 1.45);
    this.scene.add(ambient);

    // Primary warm key light with soft shadow mapping
    const keyLight = new THREE.DirectionalLight(0xfffaea, 2.4);
    keyLight.position.set(4.5, 7.5, 5.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.001;
    this.scene.add(keyLight);

    // Warm saffron fill light
    const fillLight = new THREE.DirectionalLight(0xde7215, 1.3);
    fillLight.position.set(-5, 2.5, -2);
    this.scene.add(fillLight);

    // Peacock blue accent rim light
    const rimLight = new THREE.PointLight(0x1b6d80, 2.8, 28);
    rimLight.position.set(0, 4.5, -4);
    this.scene.add(rimLight);
  }

  buildPedestal() {
    const group = new THREE.Group();

    // Dark slate sub-plinth
    const slateMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.65,
      metalness: 0.2,
    });
    const subPlinth = new THREE.Mesh(new THREE.CylinderGeometry(3.3, 3.45, 0.2, 48), slateMat);
    subPlinth.position.y = -1.78;
    subPlinth.receiveShadow = true;
    group.add(subPlinth);

    // Upper polished marble circular platform
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xfbf8f3,
      roughness: 0.28,
      metalness: 0.08,
    });
    const marbleDisc = new THREE.Mesh(new THREE.CylinderGeometry(2.95, 3.15, 0.24, 48), marbleMat);
    marbleDisc.position.y = -1.58;
    marbleDisc.receiveShadow = true;
    group.add(marbleDisc);

    // Polished brass perimeter bevel ring
    const brassTrimMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      roughness: 0.24,
      metalness: 0.85,
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.045, 16, 64), brassTrimMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.45;
    group.add(ring);

    // Soft architectural contact shadow disc
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.22,
    });
    const shadowDisc = new THREE.Mesh(new THREE.CircleGeometry(3.8, 48), shadowMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = -1.89;
    group.add(shadowDisc);

    group.name = 'exhibitionPedestal';
    return group;
  }

  buildDustParticles() {
    const count = 48;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8.5;
      positions[i + 1] = (Math.random() - 0.5) * 5 + 0.6;
      positions[i + 2] = (Math.random() - 0.5) * 6.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.075,
      transparent: true,
      opacity: 0.65,
    });

    return new THREE.Points(geometry, material);
  }

  buildReticle() {
    const ringGeo = new THREE.RingGeometry(0.18, 0.24, 32).rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xde7215,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const reticleMesh = new THREE.Mesh(ringGeo, ringMat);
    reticleMesh.matrixAutoUpdate = false;
    reticleMesh.visible = false;
    return reticleMesh;
  }

  // ── REFINED 3D MITRA MASCOT COMPANION ─────────────────────────────────────

  buildMitraCompanion() {
    const group = new THREE.Group();

    const saffronMat = new THREE.MeshStandardMaterial({
      color: 0xde7215,
      roughness: 0.42,
      metalness: 0.12,
    });

    const creamFurMat = new THREE.MeshStandardMaterial({
      color: 0xfffdf7,
      roughness: 0.52,
      metalness: 0.04,
    });

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const eyeHighlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const noseMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.3 });

    const lanternFrameMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.88,
      roughness: 0.2,
    });

    const lanternCoreMat = new THREE.MeshStandardMaterial({
      color: 0xfff3b0,
      emissive: 0xffaa00,
      emissiveIntensity: 1.3,
      roughness: 0.1,
    });

    // 1. Torso
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.68, 24, 24), saffronMat);
    body.scale.set(0.95, 1.18, 0.88);
    body.name = 'mitraBody';
    group.add(body);

    // 2. Chest & Belly Cream Fur Patch
    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.52, 20, 20), creamFurMat);
    belly.position.set(0, -0.05, 0.38);
    belly.scale.set(0.72, 0.88, 0.34);
    group.add(belly);

    // 3. Head Assembly
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.12, 0.08);
    headGroup.name = 'mitraHead';

    const headSphere = new THREE.Mesh(new THREE.SphereGeometry(0.56, 24, 24), saffronMat);
    headGroup.add(headSphere);

    // Cheek Fluff
    const leftCheek = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.42, 10), creamFurMat);
    leftCheek.position.set(-0.46, -0.12, 0.12);
    leftCheek.rotation.z = 1.15;
    headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.42, 10), creamFurMat);
    rightCheek.position.set(0.46, -0.12, 0.12);
    rightCheek.rotation.z = -1.15;
    headGroup.add(rightCheek);

    // Muzzle & Snout
    const muzzle = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.42, 16), creamFurMat);
    muzzle.rotation.x = Math.PI / 2;
    muzzle.position.set(0, -0.12, 0.52);
    headGroup.add(muzzle);

    // Black nose tip
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), noseMat);
    nose.position.set(0, -0.08, 0.72);
    headGroup.add(nose);

    // Ears with Inner Cream Layer
    const leftEarOuter = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.52, 10), saffronMat);
    leftEarOuter.position.set(-0.35, 0.54, 0.02);
    leftEarOuter.rotation.z = 0.28;
    leftEarOuter.name = 'leftEar';
    headGroup.add(leftEarOuter);

    const leftEarInner = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.38, 10), creamFurMat);
    leftEarInner.position.set(-0.33, 0.54, 0.08);
    leftEarInner.rotation.z = 0.28;
    headGroup.add(leftEarInner);

    const rightEarOuter = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.52, 10), saffronMat);
    rightEarOuter.position.set(0.35, 0.54, 0.02);
    rightEarOuter.rotation.z = -0.28;
    rightEarOuter.name = 'rightEar';
    headGroup.add(rightEarOuter);

    const rightEarInner = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.38, 10), creamFurMat);
    rightEarInner.position.set(0.33, 0.54, 0.08);
    rightEarInner.rotation.z = -0.28;
    headGroup.add(rightEarInner);

    // Expressive Eyes with Highlights
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 14), eyeMat);
    leftEye.position.set(-0.18, 0.06, 0.52);
    leftEye.name = 'leftEye';
    headGroup.add(leftEye);

    const leftHighlight = new THREE.Mesh(new THREE.SphereGeometry(0.026, 8, 8), eyeHighlightMat);
    leftHighlight.position.set(-0.16, 0.09, 0.57);
    headGroup.add(leftHighlight);

    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 14), eyeMat);
    rightEye.position.set(0.18, 0.06, 0.52);
    rightEye.name = 'rightEye';
    headGroup.add(rightEye);

    const rightHighlight = new THREE.Mesh(new THREE.SphereGeometry(0.026, 8, 8), eyeHighlightMat);
    rightHighlight.position.set(0.20, 0.09, 0.57);
    headGroup.add(rightHighlight);

    group.add(headGroup);

    // 4. Bushy Fox Tail with Ivory Tip
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, -0.35, -0.45);

    const tailBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.32, 0.75, 16), saffronMat);
    tailBase.rotation.x = -0.72;
    tailBase.position.set(0, 0.22, -0.2);
    tailGroup.add(tailBase);

    const tailPlume = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), saffronMat);
    tailPlume.scale.set(0.9, 1.35, 0.9);
    tailPlume.position.set(0, 0.58, -0.48);
    tailGroup.add(tailPlume);

    const tailTip = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.46, 16), creamFurMat);
    tailTip.position.set(0, 0.98, -0.58);
    tailTip.rotation.x = 0.2;
    tailGroup.add(tailTip);

    tailGroup.name = 'mitraTail';
    group.add(tailGroup);

    // 5. Floating Golden Wisdom Lantern (Mitra's Beacon)
    const lanternGroup = new THREE.Group();
    lanternGroup.position.set(0.9, 0.75, 0.35);

    const lanternCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.26, 1), lanternCoreMat);
    lanternCore.name = 'lanternCore';
    lanternGroup.add(lanternCore);

    const lanternRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.026, 10, 32), lanternFrameMat);
    lanternRing1.name = 'lanternRing1';
    lanternGroup.add(lanternRing1);

    const lanternRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.40, 0.022, 10, 32), lanternFrameMat);
    lanternRing2.rotation.x = Math.PI / 2;
    lanternRing2.name = 'lanternRing2';
    lanternGroup.add(lanternRing2);

    // Internal point light inside the lantern
    const lanternLight = new THREE.PointLight(0xffaa00, 1.4, 3.5);
    lanternLight.name = 'lanternPointLight';
    lanternGroup.add(lanternLight);

    lanternGroup.name = 'mitraLantern';
    group.add(lanternGroup);

    group.name = 'mitraCompanion';
    group.userData = { id: 'mitra-companion', title: 'Mitra the Sun-Fox Guide' };
    return group;
  }

  setMitraEmotion(emotion) {
    this.mitraEmotion = emotion;
    if (!this.mitraGroup) return;

    const lanternCore = this.mitraGroup.getObjectByName('lanternCore');
    const lanternLight = this.mitraGroup.getObjectByName('lanternPointLight');
    const head = this.mitraGroup.getObjectByName('mitraHead');

    if (lanternCore && lanternLight) {
      switch (emotion) {
        case 'celebrating':
          lanternCore.material.emissive.setHex(0x10b981); // Emerald celebration
          lanternCore.material.emissiveIntensity = 2.2;
          lanternLight.color.setHex(0x10b981);
          lanternLight.intensity = 2.4;
          if (head) head.rotation.z = 0.08;
          break;
        case 'thinking':
          lanternCore.material.emissive.setHex(0x38bdf8); // Sky blue
          lanternCore.material.emissiveIntensity = 1.3;
          lanternLight.color.setHex(0x38bdf8);
          lanternLight.intensity = 1.4;
          if (head) head.rotation.z = -0.12;
          break;
        case 'concerned':
          lanternCore.material.emissive.setHex(0xf97316); // Protective amber
          lanternCore.material.emissiveIntensity = 1.4;
          lanternLight.color.setHex(0xf97316);
          lanternLight.intensity = 1.6;
          if (head) head.rotation.z = 0.15;
          break;
        case 'explaining':
          lanternCore.material.emissive.setHex(0xf59e0b); // Warm focused gold
          lanternCore.material.emissiveIntensity = 1.6;
          lanternLight.color.setHex(0xf59e0b);
          lanternLight.intensity = 1.8;
          if (head) head.rotation.z = -0.05;
          break;
        default:
          lanternCore.material.emissive.setHex(0xffaa00); // Natural sunlight
          lanternCore.material.emissiveIntensity = 1.2;
          lanternLight.color.setHex(0xffaa00);
          lanternLight.intensity = 1.3;
          if (head) head.rotation.z = 0;
      }
    }
  }

  // ── LOAD CONSTITUTIONAL STATION ───────────────────────────────────────────

  loadConstitutionalStation(stationData) {
    if (!stationData) return;

    if (this.currentStationGroup) {
      this.mainStageGroup.remove(this.currentStationGroup);
      this.disposeObject(this.currentStationGroup);
    }

    const newGroup = new THREE.Group();

    switch (stationData.geometryType) {
      case 'chakra':
        this.buildAshokaChakraGeometry(newGroup, stationData);
        break;
      case 'pillar':
        this.buildEqualityBalanceGeometry(newGroup, stationData);
        break;
      case 'beacon':
        this.buildVoiceBeaconGeometry(newGroup, stationData);
        break;
      case 'shield':
        this.buildSafetyShieldGeometry(newGroup, stationData);
        break;
      case 'scroll':
        this.buildEducationScrollGeometry(newGroup, stationData);
        break;
      case 'crest':
        this.buildRemediesCrestGeometry(newGroup, stationData);
        break;
      default:
        this.buildAshokaChakraGeometry(newGroup, stationData);
    }

    newGroup.userData = { id: stationData.id, title: stationData.title };
    this.currentStationGroup = newGroup;
    this.mainStageGroup.add(newGroup);

    // Reset default animation states per station
    if (stationData.id === 'right-to-equality') {
      this.targetScaleTilt = -0.22; // Initial unbalanced state awaiting decision
    } else {
      this.targetScaleTilt = 0;
    }
  }

  loadConstitutionalObject(data) {
    this.loadConstitutionalStation(data);
  }

  // ── 1. THE SOVEREIGN ASHOKA CHAKRA ─────────────────────────────────────────

  buildAshokaChakraGeometry(group, data) {
    const chakraNavy = new THREE.MeshStandardMaterial({
      color: 0x0a192f,
      roughness: 0.35,
      metalness: 0.65,
    });

    const chakraGold = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.88,
      roughness: 0.22,
    });

    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xffd54f,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });

    const chakraGroup = new THREE.Group();
    chakraGroup.position.set(0, 0.45, 0);

    // Central Navy Hub
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.22, 32), chakraNavy);
    hub.rotation.x = Math.PI / 2;
    chakraGroup.add(hub);

    // Golden Axle Core
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), chakraGold);
    chakraGroup.add(core);

    // Outer Navy Wheel Rim
    const outerRim = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.085, 16, 64), chakraNavy);
    chakraGroup.add(outerRim);

    // Golden Inlaid Rim
    const innerRim = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.035, 12, 64), chakraGold);
    chakraGroup.add(innerRim);

    // 24 Dharma Spokes
    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI * 2) / 24;
      const spokeGroup = new THREE.Group();
      spokeGroup.rotation.z = angle;

      // Tapered wedge spoke
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.038, 1.38, 8), chakraNavy);
      spoke.position.y = 1.05;
      spokeGroup.add(spoke);

      // Spoke tip accent bead
      const tipBead = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), chakraGold);
      tipBead.position.y = 1.76;
      spokeGroup.add(tipBead);

      chakraGroup.add(spokeGroup);
    }

    // 4 Cardinal Medallions of Rights (Survival, Protection, Development, Participation)
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const med = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 16), chakraGold);
      med.position.set(Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0);
      med.rotation.x = Math.PI / 2;
      chakraGroup.add(med);
    }

    // Luminous Golden Aurora Plane (illuminates when full equality/dharma is realized)
    const auraDisc = new THREE.Mesh(new THREE.CircleGeometry(2.35, 48), auraMat);
    auraDisc.position.z = -0.05;
    auraDisc.name = 'chakraAura';
    chakraGroup.add(auraDisc);

    chakraGroup.name = 'ashokaChakraModel';
    group.add(chakraGroup);
    group.name = 'ashokaChakraModel';
  }

  // ── 2. THE BALANCE OF EQUALITY (REFERENCE-QUALITY CRAFTSMANSHIP) ───────────

  buildEqualityBalanceGeometry(group, data) {
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.88,
      roughness: 0.22,
    });

    const darkBronzeMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      metalness: 0.92,
      roughness: 0.32,
    });

    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 2.1,
    });

    const gaugeMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.45,
      metalness: 0.4,
    });

    const tokenGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.92,
      roughness: 0.16,
    });

    // 1. Stepped Brass Pedestal Base
    const baseGroup = new THREE.Group();
    baseGroup.position.set(0, -1.35, 0);

    const baseTier1 = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.25, 0.16, 36), darkBronzeMat);
    baseTier1.receiveShadow = true;
    baseGroup.add(baseTier1);

    const baseTier2 = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.98, 0.14, 36), brassMat);
    baseTier2.position.y = 0.12;
    baseTier2.receiveShadow = true;
    baseGroup.add(baseTier2);

    const baseCollar = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.035, 12, 36), darkBronzeMat);
    baseCollar.rotation.x = Math.PI / 2;
    baseCollar.position.y = 0.18;
    baseGroup.add(baseCollar);

    // Front Brass Plaque: "Article 14 · Equal Dignity"
    const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.12, 0.05), brassMat);
    plaque.position.set(0, 0.08, 0.98);
    baseGroup.add(plaque);

    group.add(baseGroup);

    // 2. Classical Fluted Brass Pillar Column
    const pillarGroup = new THREE.Group();
    pillarGroup.position.set(0, 0.1, 0);

    const pillarShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 2.7, 24), brassMat);
    pillarShaft.castShadow = true;
    pillarGroup.add(pillarShaft);

    // Column Decorative Rings
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 12, 24), darkBronzeMat);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = -0.8;
    pillarGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 12, 24), darkBronzeMat);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = 0.6;
    pillarGroup.add(ring2);

    // Column Capital Bracket
    const capital = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.16, 0.28, 16), brassMat);
    capital.position.y = 1.38;
    pillarGroup.add(capital);

    group.add(pillarGroup);

    // 3. Calibrated Equilibrium Gauge (Mounted right below the pivot)
    const gaugeGroup = new THREE.Group();
    gaugeGroup.position.set(0, 1.05, 0.15);

    const gaugePlate = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.28, 0.04), gaugeMat);
    gaugeGroup.add(gaugePlate);

    // Center Gold Equilibrium Marker (0°)
    const centerMarker = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.05), brassMat);
    centerMarker.position.set(0, 0, 0.02);
    gaugeGroup.add(centerMarker);

    // Left (-) and Right (+) bias markers
    const leftMarker = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.1, 0.05), darkBronzeMat);
    leftMarker.position.set(-0.32, 0, 0.02);
    gaugeGroup.add(leftMarker);

    const rightMarker = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.1, 0.05), darkBronzeMat);
    rightMarker.position.set(0.32, 0, 0.02);
    gaugeGroup.add(rightMarker);

    group.add(gaugeGroup);

    // 4. Arched Crossbeam Assembly (rotates on z axis)
    const beamGroup = new THREE.Group();
    beamGroup.position.set(0, 1.48, 0);

    // Horizontal Tapered Truss Beam
    const beamBar = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.12, 0.14), brassMat);
    beamBar.castShadow = true;
    beamGroup.add(beamBar);

    // Upper Decorative Arch Rib
    const archRib = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.03, 8, 32, Math.PI), brassMat);
    archRib.position.y = -0.05;
    beamGroup.add(archRib);

    // Pivot Axle Hub
    const pivotHub = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.32, 16), darkBronzeMat);
    pivotHub.rotation.x = Math.PI / 2;
    beamGroup.add(pivotHub);

    // Downward Pointing Index Needle (swings across the gauge plate)
    const needle = new THREE.Mesh(new THREE.ConeGeometry(0.026, 0.52, 8), brassMat);
    needle.position.set(0, -0.28, 0.16);
    needle.rotation.z = Math.PI; // Point downwards
    beamGroup.add(needle);

    // Central Justice Diamond
    const centerDiamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.36, 0), diamondMat);
    centerDiamond.name = 'equalityDiamond';
    centerDiamond.position.y = 0.22;
    beamGroup.add(centerDiamond);

    // Internal Light for Diamond
    const diamondLight = new THREE.PointLight(0xfcd34d, 1.2, 3);
    diamondLight.name = 'diamondGlowLight';
    centerDiamond.add(diamondLight);

    // 5. Left Suspension Assembly & Pan
    const leftPanGroup = new THREE.Group();
    leftPanGroup.position.set(-1.72, -1.05, 0);

    // Top shackle ring
    const leftShackle = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 8, 16), brassMat);
    leftShackle.position.y = 0.98;
    leftPanGroup.add(leftShackle);

    // 3 Delicate Tripod Suspension Cords
    for (let i = 0; i < 3; i++) {
      const theta = (i * Math.PI * 2) / 3;
      const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.1, 6), brassMat);
      cord.position.set(Math.cos(theta) * 0.32, 0.48, Math.sin(theta) * 0.32);
      cord.rotation.z = Math.cos(theta) * -0.28;
      cord.rotation.x = Math.sin(theta) * 0.28;
      leftPanGroup.add(cord);
    }

    // Deep Spun-Brass Dish Bowl
    const leftBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.42, 0.2, 32, 1, false), brassMat);
    leftBowl.castShadow = true;
    leftPanGroup.add(leftBowl);

    const leftBowlRim = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.028, 8, 32), darkBronzeMat);
    leftBowlRim.rotation.x = Math.PI / 2;
    leftBowlRim.position.y = 0.1;
    leftPanGroup.add(leftBowlRim);

    // Weighted Tokens in Left Pan ("Equal Dignity" tokens)
    const tokenL1 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), tokenGoldMat);
    tokenL1.position.set(-0.15, 0.14, 0);
    leftPanGroup.add(tokenL1);

    const tokenL2 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), tokenGoldMat);
    tokenL2.position.set(0.15, 0.14, 0);
    leftPanGroup.add(tokenL2);

    leftPanGroup.name = 'leftPanGroup';
    beamGroup.add(leftPanGroup);

    // 6. Right Suspension Assembly & Pan
    const rightPanGroup = new THREE.Group();
    rightPanGroup.position.set(1.72, -1.05, 0);

    const rightShackle = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 8, 16), brassMat);
    rightShackle.position.y = 0.98;
    rightPanGroup.add(rightShackle);

    for (let i = 0; i < 3; i++) {
      const theta = (i * Math.PI * 2) / 3;
      const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.1, 6), brassMat);
      cord.position.set(Math.cos(theta) * 0.32, 0.48, Math.sin(theta) * 0.32);
      cord.rotation.z = Math.cos(theta) * 0.28;
      cord.rotation.x = Math.sin(theta) * 0.28;
      rightPanGroup.add(cord);
    }

    const rightBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.42, 0.2, 32, 1, false), brassMat);
    rightBowl.castShadow = true;
    rightPanGroup.add(rightBowl);

    const rightBowlRim = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.028, 8, 32), darkBronzeMat);
    rightBowlRim.rotation.x = Math.PI / 2;
    rightBowlRim.position.y = 0.1;
    rightPanGroup.add(rightBowlRim);

    // Tokens in Right Pan
    const tokenR1 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), tokenGoldMat);
    tokenR1.position.set(-0.15, 0.14, 0);
    tokenR1.name = 'rightToken1';
    rightPanGroup.add(tokenR1);

    const tokenR2 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), tokenGoldMat);
    tokenR2.position.set(0.15, 0.14, 0);
    tokenR2.name = 'rightToken2';
    rightPanGroup.add(tokenR2);

    rightPanGroup.name = 'rightPanGroup';
    beamGroup.add(rightPanGroup);

    beamGroup.name = 'balanceBeamGroup';
    group.add(beamGroup);

    group.name = 'equalityBalanceModel';
  }

  // ── 3. THE BEACON OF EXPRESSION ───────────────────────────────────────────

  buildVoiceBeaconGeometry(group, data) {
    const tealMat = new THREE.MeshStandardMaterial({
      color: 0x1b6d80,
      metalness: 0.65,
      roughness: 0.28,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.85,
      roughness: 0.25,
    });

    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x38bdf8,
      emissiveIntensity: 2.0,
      roughness: 0.1,
    });

    // Tiered Circular Amphitheater Steps (Bal Sansad Assembly Forum)
    const forumTier1 = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.65, 0.16, 32), tealMat);
    forumTier1.position.y = -1.45;
    group.add(forumTier1);

    const forumTier2 = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.05, 0.16, 32), tealMat);
    forumTier2.position.y = -1.29;
    group.add(forumTier2);

    // Central Transmission Spire
    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.32, 3.4, 16), brassMat);
    spire.position.y = 0.55;
    spire.name = 'beaconSpire';
    group.add(spire);

    // Spire Rings
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.38 - i * 0.08, 0.03, 8, 24), brassMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.2 + i * 0.8;
      group.add(ring);
    }

    // Beacon Top Lantern Crystal
    const lantern = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 1), flameMat);
    lantern.position.y = 2.45;
    group.add(lantern);

    // Dynamic Concentric Soundwave Ripple Rings (Article 19 & UNCRC 12 Voice)
    const waveGroup = new THREE.Group();
    waveGroup.position.set(0, 2.45, 0);

    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.9 + i * 0.65, 0.035, 8, 36), waveMat);
      ring.rotation.x = Math.PI / 2;
      waveGroup.add(ring);
    }

    waveGroup.name = 'soundwaveGroup';
    group.add(waveGroup);

    group.name = 'voiceBeaconModel';
  }

  // ── 4. THE SHIELD OF BODILY SAFETY ────────────────────────────────────────

  buildSafetyShieldGeometry(group, data) {
    const shieldGold = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.88,
      roughness: 0.22,
    });

    const shieldCrimson = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      metalness: 0.45,
      roughness: 0.35,
    });

    const domeMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      transmission: 0.88,
      transparent: true,
      opacity: 0.75,
      roughness: 0.15,
      ior: 1.4,
    });

    // Heraldic Curved Shield Body
    const shieldMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 0.4, 2.6, 24, 1, false, 0, Math.PI), shieldCrimson);
    shieldMesh.rotation.y = Math.PI / 2;
    shieldMesh.position.y = 0.25;
    shieldMesh.scale.set(0.65, 1, 1);
    group.add(shieldMesh);

    // Polished Golden Shield Trim Rim
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.065, 12, 32, Math.PI), shieldGold);
    rim.position.set(0, 0.45, 0.25);
    group.add(rim);

    // Central Childline 1098 Beacon Emblem
    const emblem = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 1), shieldGold);
    emblem.position.set(0, 0.35, 0.4);
    group.add(emblem);

    // Translucent Emerald Protective Sanctuary Forcefield Dome
    const dome = new THREE.Mesh(new THREE.SphereGeometry(2.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
    dome.position.y = -1.45;
    dome.scale.set(0.001, 0.001, 0.001); // Expands dynamically upon consequence trigger
    dome.name = 'sanctuaryDome';
    group.add(dome);

    group.name = 'safetyShieldModel';
  }

  // ── 5. THE SCROLL OF FREE LEARNING ────────────────────────────────────────

  buildEducationScrollGeometry(group, data) {
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.6,
      metalness: 0.15,
    });

    const brassGateMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.85,
      roughness: 0.25,
    });

    const parchmentMat = new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      roughness: 0.75,
      metalness: 0.05,
    });

    // Schoolhouse Classical Portico
    const archBase = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.22, 1.2), stoneMat);
    archBase.position.y = -1.45;
    group.add(archBase);

    // Twin Fluted Columns
    const leftCol = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 2.8, 16), stoneMat);
    leftCol.position.set(-1.45, 0.05, 0);
    group.add(leftCol);

    const rightCol = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 2.8, 16), stoneMat);
    rightCol.position.set(1.45, 0.05, 0);
    group.add(rightCol);

    // Classical Pediment Header
    const pediment = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.35, 0.65), stoneMat);
    pediment.position.y = 1.6;
    group.add(pediment);

    // Left Gate Wing (Hinged at x = -1.45)
    const leftGateGroup = new THREE.Group();
    leftGateGroup.position.set(-1.45, 0.05, 0);
    const leftGateBars = new THREE.Mesh(new THREE.BoxGeometry(1.25, 2.4, 0.06), brassGateMat);
    leftGateBars.position.x = 0.62;
    leftGateGroup.add(leftGateBars);
    leftGateGroup.name = 'leftSchoolGate';
    group.add(leftGateGroup);

    // Right Gate Wing (Hinged at x = +1.45)
    const rightGateGroup = new THREE.Group();
    rightGateGroup.position.set(1.45, 0.05, 0);
    const rightGateBars = new THREE.Mesh(new THREE.BoxGeometry(1.25, 2.4, 0.06), brassGateMat);
    rightGateBars.position.x = -0.62;
    rightGateGroup.add(rightGateBars);
    rightGateGroup.name = 'rightSchoolGate';
    group.add(rightGateGroup);

    // Unfurling Article 21A Parchment Scroll
    const scrollMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 0.04), parchmentMat);
    scrollMesh.position.set(0, 0.05, 0.45);
    scrollMesh.scale.set(1, 0.01, 1); // Unrolls vertically upon trigger
    scrollMesh.name = 'article21AParchment';
    group.add(scrollMesh);

    group.name = 'educationScrollModel';
  }

  // ── 6. THE CREST OF LEGAL REMEDIES ────────────────────────────────────────

  buildRemediesCrestGeometry(group, data) {
    const navyMarbleMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.35,
      roughness: 0.3,
    });

    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      roughness: 0.1,
      ior: 1.7,
    });

    const rayMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.75,
    });

    // Dr. B.R. Ambedkar's Hexagonal Pillar of Justice
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.35, 2.4, 6), navyMarbleMat);
    pillar.position.y = -0.25;
    group.add(pillar);

    // Crowning Apex Crystal (The Supreme Court Apex)
    const apexCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.52, 1), crystalMat);
    apexCrystal.position.y = 1.75;
    apexCrystal.name = 'apexCrystal';
    group.add(apexCrystal);

    // 5 Radial Crystal Facets (The 5 Writs: Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari)
    const crystalRaysGroup = new THREE.Group();
    crystalRaysGroup.position.set(0, 1.75, 0);

    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const prism = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.65, 5), crystalMat);
      prism.position.set(Math.cos(angle) * 1.5, -0.65, Math.sin(angle) * 1.5);
      group.add(prism);

      // Light ray beaming toward apex
      const ray = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.6, 6), rayMat);
      ray.position.set(Math.cos(angle) * 0.75, -0.32, Math.sin(angle) * 0.75);
      ray.rotation.z = Math.cos(angle) * -0.55;
      ray.rotation.x = Math.sin(angle) * 0.55;
      crystalRaysGroup.add(ray);
    }

    crystalRaysGroup.scale.set(0.001, 0.001, 0.001);
    crystalRaysGroup.name = 'remediesCrystalRays';
    group.add(crystalRaysGroup);

    group.name = 'remediesCrestModel';
  }

  // ── SPATIAL CONSEQUENCE TRIGGERS ──────────────────────────────────────────

  triggerSpatialEffect(effectName) {
    this.activeSpatialEffect = effectName;
    this.effectTimer = 0;

    switch (effectName) {
      case 'scale-balanced':
        this.targetScaleTilt = 0; // Perfect golden horizontal equilibrium
        this.setMitraEmotion('celebrating');
        break;
      case 'scale-unbalanced':
        this.targetScaleTilt = -0.32; // Unfair heavy tilt
        this.setMitraEmotion('concerned');
        break;
      case 'chakra-glow-full':
        this.chakraSpinSpeed = 0.015;
        this.setMitraEmotion('celebrating');
        break;
      case 'chakra-dim':
        this.chakraSpinSpeed = 0.001;
        this.setMitraEmotion('concerned');
        break;
      case 'beacon-pulse':
        this.setMitraEmotion('celebrating');
        break;
      case 'beacon-dim':
        this.setMitraEmotion('concerned');
        break;
      case 'shield-expand':
        this.targetShieldDomeScale = 1.0;
        this.setMitraEmotion('celebrating');
        break;
      case 'shield-flicker':
        this.targetShieldDomeScale = 0.001;
        this.setMitraEmotion('concerned');
        break;
      case 'scroll-unfurl':
        this.targetGateAngle = 1.57; // 90 degrees open
        this.targetScrollUnfurl = 1.0;
        this.setMitraEmotion('celebrating');
        break;
      case 'scroll-blocked':
        this.targetGateAngle = 0.0;
        this.targetScrollUnfurl = 0.01;
        this.setMitraEmotion('concerned');
        break;
      case 'remedy-prisms-fire':
        this.remedyRaysActive = true;
        this.setMitraEmotion('celebrating');
        break;
      case 'remedy-dim':
        this.remedyRaysActive = false;
        this.setMitraEmotion('concerned');
        break;
      default:
        break;
    }
  }

  // ── WEBXR AUGMENTED REALITY SESSION ───────────────────────────────────────

  async startArSession() {
    if (!navigator.xr) {
      throw new Error('WebXR is not supported on this device/browser.');
    }

    const sessionInit = {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['dom-overlay', 'light-estimation'],
    };

    const session = await navigator.xr.requestSession('immersive-ar', sessionInit);
    this.currentSession = session;
    this.isArActive = true;
    this.isPlacedInAr = false;

    await this.renderer.xr.setSession(session);

    // In real AR mode, hide the virtual pedestal so real physical surfaces shine through
    if (this.exhibitionPedestal) this.exhibitionPedestal.visible = false;
    if (this.particlesGroup) this.particlesGroup.visible = false;

    // Scale models appropriately for table/floor placement
    this.mainStageGroup.scale.set(0.35, 0.35, 0.35);
    this.mainStageGroup.visible = false; // Hidden until surface anchor tap

    this.mitraGroup.scale.set(0.24, 0.24, 0.24);
    this.mitraGroup.visible = false;

    if (this.onPlacementStatus) {
      this.onPlacementStatus('Scan your room to detect a flat surface (floor or desk).');
    }

    const viewerSpace = await session.requestReferenceSpace('viewer');
    this.hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
    const refSpace = await session.requestReferenceSpace('local');

    session.addEventListener('select', this.handleSelect);
    session.addEventListener('end', () => {
      this.stopArSession();
      if (this.onArSessionEnd) this.onArSessionEnd();
    });

    const onXRFrame = (timestamp, frame) => {
      if (!this.currentSession) return;
      this.renderArFrame(timestamp, frame, refSpace);
    };

    session.requestAnimationFrame(onXRFrame);
  }

  handleSelect() {
    if (this.reticle && this.reticle.visible && !this.isPlacedInAr) {
      const pos = new THREE.Vector3();
      const quat = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      this.reticle.matrix.decompose(pos, quat, scale);

      this.mainStageGroup.position.copy(pos);
      this.mainStageGroup.visible = true;

      this.mitraGroup.position.set(pos.x + 0.55, pos.y, pos.z + 0.15);
      this.mitraGroup.visible = true;

      this.isPlacedInAr = true;
      this.reticle.visible = false;

      if (this.onPlacementStatus) {
        this.onPlacementStatus('Monument anchored! Walk around and interact.');
      }
    }
  }

  renderArFrame(timestamp, frame, referenceSpace) {
    const session = frame.session;
    if (this.hitTestSource && !this.isPlacedInAr) {
      const hitTestResults = frame.getHitTestResults(this.hitTestSource);
      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0];
        const pose = hit.getPose(referenceSpace);
        if (pose && this.reticle) {
          this.reticle.visible = true;
          this.reticle.matrix.fromArray(pose.transform.matrix);
        }
      } else if (this.reticle) {
        this.reticle.visible = false;
      }
    }

    this.updateSpatialAnimations();
    this.renderer.render(this.scene, this.camera);
    session.requestAnimationFrame((t, f) => this.renderArFrame(t, f, referenceSpace));
  }

  stopArSession() {
    if (this.currentSession) {
      this.currentSession.end().catch(() => {});
      this.currentSession = null;
    }
    this.isArActive = false;
    this.isPlacedInAr = false;
    this.hitTestSource = null;

    if (this.exhibitionPedestal) this.exhibitionPedestal.visible = true;
    if (this.particlesGroup) this.particlesGroup.visible = true;

    this.mainStageGroup.scale.set(1, 1, 1);
    this.mainStageGroup.position.set(0, 0, 0);
    this.mainStageGroup.visible = true;

    this.mitraGroup.scale.set(0.68, 0.68, 0.68);
    this.mitraGroup.position.set(2.4, -0.85, 0.5);
    this.mitraGroup.visible = true;

    if (this.reticle) this.reticle.visible = false;
  }

  // ── UNIVERSAL 3D ANIMATION LOOP ───────────────────────────────────────────

  startAnimationLoop() {
    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);

      if (!this.isArActive) {
        // Inertial rotation
        if (!this.isDragging) {
          this.mainStageGroup.rotation.y += this.rotationVelocity.y;
          this.rotationVelocity.y *= 0.985;
        }

        this.updateSpatialAnimations();
        this.renderer.render(this.scene, this.camera);
      }
    };

    animate();
  }

  updateSpatialAnimations() {
    const elapsed = this.clock.getElapsedTime();

    // 1. Mitra organic breathing & animated tail
    if (this.mitraGroup) {
      this.mitraGroup.position.y += Math.sin(elapsed * 2.2) * 0.0018;

      const tail = this.mitraGroup.getObjectByName('mitraTail');
      if (tail) {
        tail.rotation.z = Math.sin(elapsed * 3.6) * 0.16;
      }

      // Natural eye blinking
      const leftEye = this.mitraGroup.getObjectByName('leftEye');
      const rightEye = this.mitraGroup.getObjectByName('rightEye');
      if (leftEye && rightEye) {
        const blinkCycle = Math.sin(elapsed * 0.8);
        if (blinkCycle > 0.985) {
          leftEye.scale.set(1, 0.1, 1);
          rightEye.scale.set(1, 0.1, 1);
        } else {
          leftEye.scale.set(1, 1, 1);
          rightEye.scale.set(1, 1, 1);
        }
      }

      const lantern = this.mitraGroup.getObjectByName('mitraLantern');
      if (lantern) {
        lantern.position.y = 0.75 + Math.sin(elapsed * 2.8) * 0.045;
        const r1 = lantern.getObjectByName('lanternRing1');
        const r2 = lantern.getObjectByName('lanternRing2');
        if (r1) r1.rotation.y = elapsed * 1.5;
        if (r2) r2.rotation.z = elapsed * 1.2;
      }
    }

    // 2. Dust particles floating gently
    if (this.particlesGroup && this.particlesGroup.visible) {
      this.particlesGroup.rotation.y = elapsed * 0.025;
    }

    // 3. Equality Balance Scale Animation (Reference Station)
    if (this.currentStationGroup && this.currentStationGroup.name === 'equalityBalanceModel') {
      const beamGroup = this.currentStationGroup.getObjectByName('balanceBeamGroup');
      if (beamGroup) {
        // Damped harmonic physics settle
        this.scaleTiltAngle += (this.targetScaleTilt - this.scaleTiltAngle) * 0.07;
        beamGroup.rotation.z = this.scaleTiltAngle;

        // Counter-rotate pans so bowls remain level under gravity
        const leftPan = beamGroup.getObjectByName('leftPanGroup');
        const rightPan = beamGroup.getObjectByName('rightPanGroup');
        if (leftPan) leftPan.rotation.z = -this.scaleTiltAngle;
        if (rightPan) rightPan.rotation.z = -this.scaleTiltAngle;

        // Diamond brightness response
        const diamondLight = beamGroup.getObjectByName('diamondGlowLight');
        if (diamondLight) {
          if (Math.abs(this.scaleTiltAngle) < 0.05) {
            diamondLight.intensity = 2.0; // Radiant equilibrium
          } else {
            diamondLight.intensity = 0.6; // Dim in unfair state
          }
        }
      }
    }

    // 4. Ashoka Chakra Axial Rotation & Spoke Glow
    if (this.currentStationGroup && this.currentStationGroup.name === 'ashokaChakraModel') {
      const aura = this.currentStationGroup.getObjectByName('chakraAura');
      if (aura && this.activeSpatialEffect === 'chakra-glow-full') {
        aura.material.opacity = 0.45 + Math.sin(elapsed * 3) * 0.15;
      }
    }

    // 5. Voice Beacon Soundwave expansion
    if (this.currentStationGroup && this.currentStationGroup.name === 'voiceBeaconModel') {
      const waves = this.currentStationGroup.getObjectByName('soundwaveGroup');
      if (waves && this.activeSpatialEffect === 'beacon-pulse') {
        const pulse = 1 + (Math.sin(elapsed * 4.5) * 0.22 + 0.22);
        waves.scale.set(pulse, pulse, pulse);
      }
    }

    // 6. Safety Shield Sanctuary Dome Expansion
    if (this.currentStationGroup && this.currentStationGroup.name === 'safetyShieldModel') {
      const dome = this.currentStationGroup.getObjectByName('sanctuaryDome');
      if (dome) {
        this.shieldDomeScale += (this.targetShieldDomeScale - this.shieldDomeScale) * 0.08;
        const s = Math.max(0.001, this.shieldDomeScale);
        dome.scale.set(s, s, s);
      }
    }

    // 7. Education Schoolhouse Gates & Scroll Unfurl
    if (this.currentStationGroup && this.currentStationGroup.name === 'educationScrollModel') {
      const leftGate = this.currentStationGroup.getObjectByName('leftSchoolGate');
      const rightGate = this.currentStationGroup.getObjectByName('rightSchoolGate');
      const parchment = this.currentStationGroup.getObjectByName('article21AParchment');

      this.gateAngle += (this.targetGateAngle - this.gateAngle) * 0.06;
      if (leftGate) leftGate.rotation.y = -this.gateAngle;
      if (rightGate) rightGate.rotation.y = this.gateAngle;

      this.scrollUnfurlProgress += (this.targetScrollUnfurl - this.scrollUnfurlProgress) * 0.06;
      if (parchment) {
        parchment.scale.y = Math.max(0.01, this.scrollUnfurlProgress);
      }
    }

    // 8. Dr. Ambedkar's Remedies Crystal Rays
    if (this.currentStationGroup && this.currentStationGroup.name === 'remediesCrestModel') {
      const rays = this.currentStationGroup.getObjectByName('remediesCrystalRays');
      if (rays) {
        const targetScale = this.remedyRaysActive ? 1.0 : 0.001;
        rays.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      }
    }
  }

  // ── INTERACTIVE 3D EVENT HANDLERS ─────────────────────────────────────────

  handlePointerDown(e) {
    if (this.isArActive) return;
    this.isDragging = true;
    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  handlePointerMove(e) {
    if (!this.isDragging || this.isArActive) return;
    const deltaX = e.clientX - this.previousMousePosition.x;
    const deltaY = e.clientY - this.previousMousePosition.y;

    this.mainStageGroup.rotation.y += deltaX * 0.008;
    this.rotationVelocity.y = deltaX * 0.008;

    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  handlePointerUp() {
    this.isDragging = false;
  }

  handleWheel(e) {
    if (this.isArActive) return;
    this.zoomLevel = Math.max(3.8, Math.min(8.5, this.zoomLevel + e.deltaY * 0.0035));
    this.camera.position.z = this.zoomLevel;
  }

  handleCanvasClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0) {
      let hitObj = intersects[0].object;

      // Check if user tapped Mitra
      let checkMitra = hitObj;
      while (checkMitra) {
        if (checkMitra === this.mitraGroup) {
          this.setMitraEmotion('celebrating');
          if (this.onInteractivePartClick) {
            this.onInteractivePartClick({ part: 'mitra', message: 'Mitra waves hello and brightens his golden wisdom lantern!' });
          }
          return;
        }
        checkMitra = checkMitra.parent;
      }

      // Check if user tapped the active 3D model or its parts
      let checkModel = hitObj;
      while (checkModel && checkModel.parent !== this.mainStageGroup && checkModel.parent !== this.scene) {
        if (checkModel.name === 'leftPanGroup' || checkModel.name === 'rightPanGroup') {
          // Toggle balance scale tilt!
          const nextTilt = this.targetScaleTilt === 0 ? -0.32 : 0;
          this.triggerSpatialEffect(nextTilt === 0 ? 'scale-balanced' : 'scale-unbalanced');
          if (this.onInteractivePartClick) {
            this.onInteractivePartClick({ 
              part: 'balance-pan', 
              tilt: nextTilt, 
              message: nextTilt === 0 ? 'Equilibrium restored! Article 14 ensures equal opportunity.' : 'Scale tilted in unfair bias.' 
            });
          }
          return;
        }
        checkModel = checkModel.parent;
      }

      if (hitObj.userData && hitObj.userData.id && this.onObjectClick) {
        this.onObjectClick(hitObj.userData);
      }
    }
  }

  handleResize() {
    if (!this.canvas || this.isArActive) return;
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || (window.innerHeight * 0.72);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // ── CLEAN RESOURCE DISPOSAL ───────────────────────────────────────────────

  disposeObject(obj) {
    if (!obj) return;
    obj.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.currentSession) {
      this.currentSession.end().catch(() => {});
      this.currentSession = null;
    }

    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    this.canvas.removeEventListener('wheel', this.handleWheel);
    this.canvas.removeEventListener('click', this.handleCanvasClick);
    window.removeEventListener('resize', this.handleResize);

    if (this.scene) {
      this.disposeObject(this.scene);
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
  }
}
