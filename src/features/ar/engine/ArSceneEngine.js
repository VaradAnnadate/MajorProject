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
    this.scaleTiltAngle = 0;
    this.targetScaleTilt = 0;
    this.gateAngle = 0;
    this.targetGateAngle = 0;
    this.scrollUnfurlProgress = 0;
    this.targetScrollUnfurl = 0;
    this.shieldDomeScale = 0;
    this.targetShieldDomeScale = 0;
    this.beaconPulseScale = 1;

    // Mitra emotional state
    this.mitraEmotion = 'welcome'; // 'welcome' | 'explaining' | 'thinking' | 'celebrating' | 'concerned'
    this.mitraLanternIntensity = 1.0;

    // Interaction controls for 3D inspection
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0.003 };
    this.zoomLevel = 6.2;

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
    this.camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    this.camera.position.set(0, 1.1, this.zoomLevel);
    this.camera.lookAt(0, 0.1, 0);

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

    // 4. Lighting setup
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
    this.mitraGroup.position.set(2.6, -0.9, 0.6);
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

    // Start render loop
    this.startAnimationLoop();
  }

  setupLighting() {
    const ambient = new THREE.AmbientLight(0xfff8ed, 1.4);
    this.scene.add(ambient);

    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfffaea, 2.2);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    this.scene.add(keyLight);

    // Saffron fill light
    const fillLight = new THREE.DirectionalLight(0xde7215, 1.2);
    fillLight.position.set(-5, 2, -2);
    this.scene.add(fillLight);

    // Peacock rim light
    const rimLight = new THREE.PointLight(0x1b6d80, 2.5, 25);
    rimLight.position.set(0, 4.5, -4);
    this.scene.add(rimLight);
  }

  buildPedestal() {
    const group = new THREE.Group();

    // Marble circular stage
    const stageMat = new THREE.MeshStandardMaterial({
      color: 0xfdfbf7,
      roughness: 0.35,
      metalness: 0.1,
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xde7215,
      roughness: 0.3,
      metalness: 0.7,
    });

    const disc = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 3.1, 0.28, 48), stageMat);
    disc.position.y = -1.65;
    disc.receiveShadow = true;
    group.add(disc);

    // Golden perimeter ring
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.04, 12, 64), trimMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.51;
    group.add(ring);

    // Soft contact shadow disc
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x111827,
      transparent: true,
      opacity: 0.18,
    });
    const shadowDisc = new THREE.Mesh(new THREE.CircleGeometry(3.6, 32), shadowMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = -1.79;
    group.add(shadowDisc);

    group.name = 'exhibitionPedestal';
    return group;
  }

  buildDustParticles() {
    const count = 45;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 5 + 0.5;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffd54f,
      size: 0.08,
      transparent: true,
      opacity: 0.65,
    });

    return new THREE.Points(geometry, material);
  }

  buildReticle() {
    const ringGeo = new THREE.RingGeometry(0.18, 0.23, 32).rotateX(-Math.PI / 2);
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

  // ── REFINED MITRA 3D MASCOT MODEL ──────────────────────────────────────────

  buildMitraCompanion() {
    const group = new THREE.Group();

    const saffronMat = new THREE.MeshStandardMaterial({
      color: 0xde7215,
      roughness: 0.45,
      metalness: 0.15,
    });

    const creamFurMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf5,
      roughness: 0.55,
      metalness: 0.05,
    });

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111827 });
    const eyeHighlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const noseMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.3 });

    const lanternFrameMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.85,
      roughness: 0.2,
    });

    const lanternCoreMat = new THREE.MeshStandardMaterial({
      color: 0xfff3b0,
      emissive: 0xffaa00,
      emissiveIntensity: 1.2,
      roughness: 0.1,
    });

    // Body
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.68, 20, 20), saffronMat);
    body.scale.set(0.95, 1.15, 0.88);
    body.name = 'mitraBody';
    group.add(body);

    // Chest & Belly Cream Fur Patch
    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.52, 16, 16), creamFurMat);
    belly.position.set(0, -0.05, 0.36);
    belly.scale.set(0.72, 0.85, 0.32);
    group.add(belly);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.56, 20, 20), saffronMat);
    head.position.set(0, 1.1, 0.08);
    head.name = 'mitraHead';
    group.add(head);

    // Cheek Fluff (Left & Right)
    const leftCheek = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.4, 8), creamFurMat);
    leftCheek.position.set(-0.46, 0.98, 0.15);
    leftCheek.rotation.z = 1.1;
    group.add(leftCheek);

    const rightCheek = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.4, 8), creamFurMat);
    rightCheek.position.set(0.46, 0.98, 0.15);
    rightCheek.rotation.z = -1.1;
    group.add(rightCheek);

    // Muzzle
    const muzzle = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.38, 12), creamFurMat);
    muzzle.rotation.x = Math.PI / 2;
    muzzle.position.set(0, 0.98, 0.58);
    group.add(muzzle);

    // Nose tip
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), noseMat);
    nose.position.set(0, 1.02, 0.77);
    group.add(nose);

    // Ears with Inner Cream Layer
    const leftEarOuter = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.48, 8), saffronMat);
    leftEarOuter.position.set(-0.35, 1.62, 0.05);
    leftEarOuter.rotation.z = 0.28;
    leftEarOuter.name = 'leftEar';
    group.add(leftEarOuter);

    const leftEarInner = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.36, 8), creamFurMat);
    leftEarInner.position.set(-0.33, 1.62, 0.11);
    leftEarInner.rotation.z = 0.28;
    group.add(leftEarInner);

    const rightEarOuter = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.48, 8), saffronMat);
    rightEarOuter.position.set(0.35, 1.62, 0.05);
    rightEarOuter.rotation.z = -0.28;
    rightEarOuter.name = 'rightEar';
    group.add(rightEarOuter);

    const rightEarInner = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.36, 8), creamFurMat);
    rightEarInner.position.set(0.33, 1.62, 0.11);
    rightEarInner.rotation.z = -0.28;
    group.add(rightEarInner);

    // Expressive Almond Eyes
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), eyeMat);
    leftEye.position.set(-0.17, 1.15, 0.58);
    group.add(leftEye);

    const leftHighlight = new THREE.Mesh(new THREE.SphereGeometry(0.024, 6, 6), eyeHighlightMat);
    leftHighlight.position.set(-0.15, 1.18, 0.63);
    group.add(leftHighlight);

    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), eyeMat);
    rightEye.position.set(0.17, 1.15, 0.58);
    group.add(rightEye);

    const rightHighlight = new THREE.Mesh(new THREE.SphereGeometry(0.024, 6, 6), eyeHighlightMat);
    rightHighlight.position.set(0.19, 1.18, 0.63);
    group.add(rightHighlight);

    // Bushy Fox Tail with Ivory Tip
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, -0.35, -0.45);

    const tailBase = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.3, 0.7, 12), saffronMat);
    tailBase.rotation.x = -0.7;
    tailBase.position.set(0, 0.2, -0.2);
    tailGroup.add(tailBase);

    const tailPlume = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), saffronMat);
    tailPlume.scale.set(0.9, 1.3, 0.9);
    tailPlume.position.set(0, 0.55, -0.45);
    tailGroup.add(tailPlume);

    const tailTip = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.42, 12), creamFurMat);
    tailTip.position.set(0, 0.95, -0.55);
    tailTip.rotation.x = 0.2;
    tailGroup.add(tailTip);

    tailGroup.name = 'mitraTail';
    group.add(tailGroup);

    // Floating Golden Wisdom Lantern (Mitra's Trademark Light)
    const lanternGroup = new THREE.Group();
    lanternGroup.position.set(0.85, 0.7, 0.35);

    const lanternCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 1), lanternCoreMat);
    lanternCore.name = 'lanternCore';
    lanternGroup.add(lanternCore);

    const lanternRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.025, 8, 24), lanternFrameMat);
    lanternRing1.name = 'lanternRing1';
    lanternGroup.add(lanternRing1);

    const lanternRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.02, 8, 24), lanternFrameMat);
    lanternRing2.rotation.x = Math.PI / 2;
    lanternRing2.name = 'lanternRing2';
    lanternGroup.add(lanternRing2);

    lanternGroup.name = 'mitraLantern';
    group.add(lanternGroup);

    group.name = 'mitraCompanion';
    return group;
  }

  setMitraEmotion(emotion) {
    this.mitraEmotion = emotion;
    if (!this.mitraGroup) return;

    const lanternCore = this.mitraGroup.getObjectByName('lanternCore');
    if (!lanternCore) return;

    switch (emotion) {
      case 'celebrating':
        lanternCore.material.emissive.setHex(0x34d399); // Brilliant emerald celebration
        lanternCore.material.emissiveIntensity = 2.0;
        break;
      case 'thinking':
        lanternCore.material.emissive.setHex(0x60a5fa); // Thoughtful sky blue
        lanternCore.material.emissiveIntensity = 1.0;
        break;
      case 'concerned':
        lanternCore.material.emissive.setHex(0xfb923c); // Warm protective amber
        lanternCore.material.emissiveIntensity = 1.3;
        break;
      default:
        lanternCore.material.emissive.setHex(0xffaa00); // Golden sunshine
        lanternCore.material.emissiveIntensity = 1.2;
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

    newGroup.userData = { ...stationData };
    this.currentStationGroup = newGroup;
    this.mainStageGroup.add(newGroup);

    // Reset spatial states
    this.activeSpatialEffect = null;
    this.scaleTiltAngle = 0;
    this.targetScaleTilt = 0;
    this.gateAngle = 0;
    this.targetGateAngle = 0;
    this.scrollUnfurlProgress = 0;
    this.targetScrollUnfurl = 0;
    this.shieldDomeScale = 0;
    this.targetShieldDomeScale = 0;

    if (!this.isArActive) {
      this.mainStageGroup.position.set(0, 0, 0);
    }
  }

  // Backwards compatibility alias
  loadConstitutionalObject(data) {
    this.loadConstitutionalStation(data);
  }

  // ── 3D MODEL BUILDERS ─────────────────────────────────────────────────────

  buildAshokaChakraGeometry(group, data) {
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xde7215,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0x3d1c00,
      emissiveIntensity: 0.25,
    });

    const navyHubMat = new THREE.MeshStandardMaterial({
      color: 0x1b6d80,
      metalness: 0.65,
      roughness: 0.25,
    });

    const outerRadius = 2.25;
    const hubRadius = 0.58;

    // Outer Torus Ring
    const outerRing = new THREE.Mesh(new THREE.TorusGeometry(outerRadius, 0.13, 16, 64), goldMat);
    group.add(outerRing);

    // Inner Concentric Rim
    const innerRim = new THREE.Mesh(new THREE.TorusGeometry(outerRadius - 0.26, 0.045, 12, 64), goldMat);
    group.add(innerRim);

    // Central Navy Hub with 24 socket notches
    const centralHub = new THREE.Mesh(new THREE.CylinderGeometry(hubRadius, hubRadius, 0.26, 32), navyHubMat);
    centralHub.rotation.x = Math.PI / 2;
    group.add(centralHub);

    // Central Emblem Jewel
    const jewel = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.24, 1),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffe082, emissiveIntensity: 0.8 })
    );
    jewel.position.z = 0.15;
    group.add(jewel);

    // Exactly 24 Spokes of the Chakra
    const spokeLength = outerRadius - 0.28 - hubRadius;
    const spokeGeo = new THREE.CylinderGeometry(0.026, 0.052, spokeLength, 8);
    const spokesGroup = new THREE.Group();

    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI * 2) / 24;
      const spoke = new THREE.Mesh(spokeGeo, goldMat);
      spoke.position.set(
        Math.cos(angle) * (hubRadius + spokeLength / 2),
        Math.sin(angle) * (hubRadius + spokeLength / 2),
        0
      );
      spoke.rotation.z = angle - Math.PI / 2;
      spoke.userData = { spokeIndex: i + 1, spokeName: `Spoke ${i + 1}` };
      spokesGroup.add(spoke);
    }
    spokesGroup.name = 'chakraSpokesGroup';
    group.add(spokesGroup);

    // 4 Cardinal Medallions of Rights (Survival, Development, Protection, Participation)
    for (let m = 0; m < 4; m++) {
      const angle = (m * Math.PI) / 2;
      const med = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.14, 16), goldMat);
      med.rotation.x = Math.PI / 2;
      med.position.set(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius, 0.06);
      group.add(med);
    }

    group.name = 'ashokaChakraModel';
  }

  buildEqualityBalanceGeometry(group, data) {
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.75,
      roughness: 0.28,
    });

    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.6,
    });

    // Central Pillar Stand
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.35, 3.2, 16), brassMat);
    stand.position.y = -0.2;
    group.add(stand);

    // Horizontal Balance Beam (rotates on z axis)
    const beamGroup = new THREE.Group();
    beamGroup.position.set(0, 1.4, 0);

    const beamBar = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 0.15), brassMat);
    beamGroup.add(beamBar);

    // Center Diamond of Justice
    const centerDiamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), diamondMat);
    centerDiamond.name = 'equalityDiamond';
    beamGroup.add(centerDiamond);

    // Left Pan Suspension Rod & Bowl
    const leftPanGroup = new THREE.Group();
    leftPanGroup.position.set(-1.5, -0.9, 0);

    const leftRod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.6, 8), brassMat);
    leftRod.position.y = 0.8;
    leftPanGroup.add(leftRod);

    const leftBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.3, 0.2, 24, 1, false, 0, Math.PI * 2), brassMat);
    leftPanGroup.add(leftBowl);
    leftPanGroup.name = 'leftPanGroup';
    beamGroup.add(leftPanGroup);

    // Right Pan Suspension Rod & Bowl
    const rightPanGroup = new THREE.Group();
    rightPanGroup.position.set(1.5, -0.9, 0);

    const rightRod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.6, 8), brassMat);
    rightRod.position.y = 0.8;
    rightPanGroup.add(rightRod);

    const rightBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.3, 0.2, 24, 1, false, 0, Math.PI * 2), brassMat);
    rightPanGroup.add(rightBowl);
    rightPanGroup.name = 'rightPanGroup';
    beamGroup.add(rightPanGroup);

    beamGroup.name = 'balanceBeamGroup';
    group.add(beamGroup);

    group.name = 'equalityBalanceModel';
  }

  buildVoiceBeaconGeometry(group, data) {
    const tealMat = new THREE.MeshStandardMaterial({
      color: 0x1b6d80,
      metalness: 0.65,
      roughness: 0.3,
    });

    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.5,
    });

    // Bal Sansad Assembly Column
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.8, 2.6, 8), tealMat);
    column.position.y = -0.3;
    group.add(column);

    // Podium Crown
    const crown = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.12, 12, 32), tealMat);
    crown.rotation.x = Math.PI / 2;
    crown.position.y = 1.0;
    group.add(crown);

    // Civic Voice Flame
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.1, 16), flameMat);
    flame.position.y = 1.65;
    flame.name = 'beaconFlame';
    group.add(flame);

    // Concentric Soundwave Rings
    const soundwaveGroup = new THREE.Group();
    soundwaveGroup.position.y = 1.65;

    for (let r = 1; r <= 3; r++) {
      const wave = new THREE.Mesh(
        new THREE.TorusGeometry(r * 0.75, 0.035, 8, 32),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 })
      );
      wave.rotation.x = Math.PI / 2;
      wave.name = `soundwaveRing${r}`;
      soundwaveGroup.add(wave);
    }

    soundwaveGroup.name = 'soundwaveGroup';
    group.add(soundwaveGroup);

    group.name = 'voiceBeaconModel';
  }

  buildSafetyShieldGeometry(group, data) {
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0xd04f36,
      metalness: 0.72,
      roughness: 0.28,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd54f,
      metalness: 0.85,
      roughness: 0.2,
    });

    // Curved Protective Shield
    const shield = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 0.9, 2.6, 16, 1, false, 0, Math.PI), shieldMat);
    shield.rotation.y = -Math.PI / 2;
    shield.scale.set(0.38, 1, 1);
    group.add(shield);

    // 1098 Beacon Ring in Center
    const emblem = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.09, 12, 32), goldMat);
    emblem.position.set(0, 0.2, 0.38);
    emblem.name = 'shield1098Beacon';
    group.add(emblem);

    // Protective Translucent Sanctuary Forcefield Dome
    const domeMat = new THREE.MeshPhysicalMaterial({
      color: 0x22c55e,
      transmission: 0.7,
      transparent: true,
      opacity: 0.45,
      roughness: 0.15,
    });
    const sanctuaryDome = new THREE.Mesh(new THREE.SphereGeometry(2.6, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
    sanctuaryDome.position.y = -1.2;
    sanctuaryDome.scale.set(0.001, 0.001, 0.001);
    sanctuaryDome.name = 'sanctuaryDome';
    group.add(sanctuaryDome);

    group.name = 'safetyShieldModel';
  }

  buildEducationScrollGeometry(group, data) {
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x2a7a4c, roughness: 0.4, metalness: 0.3 });
    const parchmentMat = new THREE.MeshStandardMaterial({ color: 0xfffcf0, roughness: 0.6 });

    // Schoolhouse Portal Frame
    const leftPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 2.8, 16), woodMat);
    leftPillar.position.set(-1.4, 0, 0);
    group.add(leftPillar);

    const rightPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 2.8, 16), woodMat);
    rightPillar.position.set(1.4, 0, 0);
    group.add(rightPillar);

    const arch = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.24, 0.3), woodMat);
    arch.position.set(0, 1.45, 0);
    group.add(arch);

    // Two Wooden Gates (swing open when RTE choice is made)
    const leftGate = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.4, 0.06), woodMat);
    leftGate.position.set(-0.65, 0.1, 0);
    leftGate.name = 'leftSchoolGate';
    group.add(leftGate);

    const rightGate = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.4, 0.06), woodMat);
    rightGate.position.set(0.65, 0.1, 0);
    rightGate.name = 'rightSchoolGate';
    group.add(rightGate);

    // Unfurling Article 21A Golden Parchment
    const parchment = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 0.08), parchmentMat);
    parchment.position.set(0, 0.2, 0.2);
    parchment.name = 'article21AParchment';
    group.add(parchment);

    group.name = 'educationScrollModel';
  }

  buildRemediesCrestGeometry(group, data) {
    const crestMat = new THREE.MeshStandardMaterial({ color: 0x3b5998, metalness: 0.85, roughness: 0.2 });
    const rayMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.75 });

    // Octagonal Pillar of Constitutional Justice
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.55, 3.0, 8), crestMat);
    group.add(pillar);

    // Apex Diamond Seal
    const apex = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x60a5fa, emissiveIntensity: 1.5 })
    );
    apex.position.y = 1.8;
    apex.name = 'remedyApex';
    group.add(apex);

    // 5 Radial Crystal Rays (the 5 Constitutional Writs)
    const raysGroup = new THREE.Group();
    for (let r = 0; r < 5; r++) {
      const angle = (r * Math.PI * 2) / 5;
      const ray = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.2, 8), rayMat);
      ray.position.set(Math.cos(angle) * 1.1, 0.8, Math.sin(angle) * 1.1);
      ray.rotation.z = Math.PI / 4;
      ray.rotation.y = angle;
      raysGroup.add(ray);
    }
    raysGroup.name = 'writsRaysGroup';
    group.add(raysGroup);

    group.name = 'remediesCrestModel';
  }

  // ── TRIGGER SPATIAL CONSEQUENCE ANIMATIONS ────────────────────────────────

  triggerSpatialEffect(effectName) {
    this.activeSpatialEffect = effectName;
    this.effectTimer = 0;

    switch (effectName) {
      case 'scale-balanced':
        this.targetScaleTilt = 0;
        this.setMitraEmotion('celebrating');
        break;
      case 'scale-tilted':
        this.targetScaleTilt = 0.42;
        this.setMitraEmotion('concerned');
        break;
      case 'beacon-pulse':
        this.beaconPulseScale = 1.0;
        this.setMitraEmotion('celebrating');
        break;
      case 'beacon-quench':
        this.setMitraEmotion('thinking');
        break;
      case 'shield-expand':
        this.targetShieldDomeScale = 1.0;
        this.setMitraEmotion('celebrating');
        break;
      case 'shield-shatter':
        this.targetShieldDomeScale = 0.001;
        this.setMitraEmotion('concerned');
        break;
      case 'scroll-unfurl':
        this.targetGateAngle = 1.45;
        this.targetScrollUnfurl = 2.4;
        this.setMitraEmotion('celebrating');
        break;
      case 'scroll-roll-up':
        this.targetGateAngle = 0;
        this.targetScrollUnfurl = 0.1;
        this.setMitraEmotion('concerned');
        break;
      case 'remedy-prisms-fire':
        this.setMitraEmotion('celebrating');
        break;
      case 'chakra-glow-full':
        this.setMitraEmotion('celebrating');
        break;
      default:
        this.setMitraEmotion('explaining');
    }
  }

  // ── WEBXR AUGMENTED REALITY LIFECYCLE ──────────────────────────────────────

  async startArSession() {
    if (!navigator.xr) {
      throw new Error('WebXR is not supported on this browser.');
    }

    const isSupported = await navigator.xr.isSessionSupported('immersive-ar');
    if (!isSupported) {
      throw new Error('WebXR immersive-ar mode is not supported on this device.');
    }

    // Request immersive-ar session with hit-test feature
    const session = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['dom-overlay'],
      domOverlay: { root: document.body },
    });

    this.currentSession = session;
    this.isArActive = true;
    this.isPlacedInAr = false;
    this.renderer.xr.setSession(session);

    // Hide the virtual pedestal so real physical floor/table is the surface
    if (this.exhibitionPedestal) {
      this.exhibitionPedestal.visible = false;
    }

    // Scale to real-world meters
    this.mainStageGroup.scale.set(0.32, 0.32, 0.32);
    this.mainStageGroup.position.set(0, 0, -1.2);
    this.mitraGroup.scale.set(0.24, 0.24, 0.24);
    this.mitraGroup.position.set(0.42, -0.2, -1.1);

    const viewerSpace = await session.requestReferenceSpace('viewer');
    const localSpace = await session.requestReferenceSpace('local');

    try {
      this.hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
    } catch {
      this.hitTestSource = null;
    }

    session.addEventListener('select', this.handleSelect);
    session.addEventListener('end', () => {
      this.isArActive = false;
      this.isPlacedInAr = false;
      this.currentSession = null;
      this.hitTestSource = null;
      this.reticle.visible = false;

      if (this.exhibitionPedestal) {
        this.exhibitionPedestal.visible = true;
      }

      this.mainStageGroup.scale.set(1, 1, 1);
      this.mainStageGroup.position.set(0, 0, 0);
      this.mitraGroup.scale.set(0.68, 0.68, 0.68);
      this.mitraGroup.position.set(2.6, -0.9, 0.6);

      if (this.onArSessionEnd) this.onArSessionEnd();
      this.startAnimationLoop();
    });

    if (this.onPlacementStatus) {
      this.onPlacementStatus('Scan your room surface. Tap screen to anchor constitutional station.');
    }

    this.renderer.setAnimationLoop((timestamp, frame) => {
      this.renderArFrame(timestamp, frame, localSpace);
    });
  }

  handleSelect() {
    if (!this.isArActive) return;

    if (this.reticle.visible) {
      this.mainStageGroup.position.setFromMatrixPosition(this.reticle.matrix);
      this.mitraGroup.position.set(
        this.mainStageGroup.position.x + 0.35,
        this.mainStageGroup.position.y + 0.08,
        this.mainStageGroup.position.z + 0.1
      );
      this.isPlacedInAr = true;
      if (this.onPlacementStatus) {
        this.onPlacementStatus('Station anchored! Tap 3D elements to explore constitutional rights.');
      }
    }
  }

  renderArFrame(timestamp, frame, referenceSpace) {
    if (frame && this.hitTestSource && !this.isPlacedInAr) {
      const hitTestResults = frame.getHitTestResults(this.hitTestSource);
      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0];
        const pose = hit.getPose(referenceSpace);
        this.reticle.visible = true;
        this.reticle.matrix.fromArray(pose.transform.matrix);
      } else {
        this.reticle.visible = false;
      }
    } else {
      this.reticle.visible = false;
    }

    this.updateSpatialAnimations();
    this.renderer.render(this.scene, this.camera);
  }

  stopArSession() {
    if (this.currentSession) {
      this.currentSession.end();
    }
  }

  // ── 3D DESKTOP / FALLBACK ANIMATION LOOP ──────────────────────────────────

  startAnimationLoop() {
    if (this.renderer.xr.isPresenting) return;

    const animate = () => {
      if (this.isArActive) return;
      this.animationFrameId = requestAnimationFrame(animate);

      // Inertial rotation
      if (!this.isDragging && this.currentStationGroup) {
        this.currentStationGroup.rotation.y += this.rotationVelocity.y;
        this.currentStationGroup.rotation.x += this.rotationVelocity.x;
        this.rotationVelocity.x *= 0.95;
        this.rotationVelocity.y = this.rotationVelocity.y * 0.95 + 0.002 * 0.05;
      }

      this.updateSpatialAnimations();
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  updateSpatialAnimations() {
    const elapsed = this.clock.getElapsedTime();

    // 1. Mitra organic idle breathing & tail wag
    if (this.mitraGroup) {
      this.mitraGroup.position.y += Math.sin(elapsed * 2.2) * 0.0018;

      const tail = this.mitraGroup.getObjectByName('mitraTail');
      if (tail) {
        tail.rotation.z = Math.sin(elapsed * 3.5) * 0.15;
      }

      const lantern = this.mitraGroup.getObjectByName('mitraLantern');
      if (lantern) {
        lantern.position.y = 0.7 + Math.sin(elapsed * 2.8) * 0.04;
        const r1 = lantern.getObjectByName('lanternRing1');
        const r2 = lantern.getObjectByName('lanternRing2');
        if (r1) r1.rotation.y = elapsed * 1.5;
        if (r2) r2.rotation.z = elapsed * 1.2;
      }
    }

    // 2. Dust particles floating
    if (this.particlesGroup) {
      this.particlesGroup.rotation.y = elapsed * 0.03;
    }

    // 3. Equality Balance Scale Animation
    if (this.currentStationGroup && this.currentStationGroup.name === 'equalityBalanceModel') {
      const beamGroup = this.currentStationGroup.getObjectByName('balanceBeamGroup');
      if (beamGroup) {
        this.scaleTiltAngle += (this.targetScaleTilt - this.scaleTiltAngle) * 0.08;
        beamGroup.rotation.z = this.scaleTiltAngle;

        // Counter-rotate pans so bowls stay upright
        const leftPan = beamGroup.getObjectByName('leftPanGroup');
        const rightPan = beamGroup.getObjectByName('rightPanGroup');
        if (leftPan) leftPan.rotation.z = -this.scaleTiltAngle;
        if (rightPan) rightPan.rotation.z = -this.scaleTiltAngle;
      }
    }

    // 4. Voice Beacon Soundwave expansion
    if (this.currentStationGroup && this.currentStationGroup.name === 'voiceBeaconModel') {
      const waves = this.currentStationGroup.getObjectByName('soundwaveGroup');
      if (waves && this.activeSpatialEffect === 'beacon-pulse') {
        const pulse = 1 + (Math.sin(elapsed * 4) * 0.2 + 0.2);
        waves.scale.set(pulse, pulse, pulse);
      }
    }

    // 5. Safety Shield Sanctuary Dome Expansion
    if (this.currentStationGroup && this.currentStationGroup.name === 'safetyShieldModel') {
      const dome = this.currentStationGroup.getObjectByName('sanctuaryDome');
      if (dome) {
        this.shieldDomeScale += (this.targetShieldDomeScale - this.shieldDomeScale) * 0.08;
        const s = Math.max(0.001, this.shieldDomeScale);
        dome.scale.set(s, s, s);
      }
    }

    // 6. Education Schoolhouse Gates & Scroll Unfurl
    if (this.currentStationGroup && this.currentStationGroup.name === 'educationScrollModel') {
      const leftGate = this.currentStationGroup.getObjectByName('leftSchoolGate');
      const rightGate = this.currentStationGroup.getObjectByName('rightSchoolGate');
      const parchment = this.currentStationGroup.getObjectByName('article21AParchment');

      this.gateAngle += (this.targetGateAngle - this.gateAngle) * 0.08;
      this.scrollUnfurlProgress += (this.targetScrollUnfurl - this.scrollUnfurlProgress) * 0.08;

      if (leftGate) leftGate.rotation.y = -this.gateAngle;
      if (rightGate) rightGate.rotation.y = this.gateAngle;
      if (parchment) parchment.scale.y = Math.max(0.05, this.scrollUnfurlProgress);
    }
  }

  // ── MOUSE / TOUCH INTERACTION CONTROLS ─────────────────────────────────────

  handlePointerDown(e) {
    if (this.isArActive) return;
    this.isDragging = true;
    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  handlePointerMove(e) {
    if (!this.isDragging || this.isArActive || !this.currentStationGroup) return;

    const deltaX = e.clientX - this.previousMousePosition.x;
    const deltaY = e.clientY - this.previousMousePosition.y;

    this.currentStationGroup.rotation.y += deltaX * 0.008;
    this.currentStationGroup.rotation.x += deltaY * 0.008;

    this.rotationVelocity = {
      x: deltaY * 0.002,
      y: deltaX * 0.002,
    };

    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  handlePointerUp() {
    this.isDragging = false;
  }

  handleWheel(e) {
    if (this.isArActive) return;
    this.zoomLevel = Math.max(3.8, Math.min(9.5, this.zoomLevel + e.deltaY * 0.005));
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
      while (hitObj.parent && hitObj.parent !== this.mainStageGroup && hitObj.parent !== this.scene) {
        hitObj = hitObj.parent;
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

  disposeObject(obj) {
    if (!obj) return;
    obj.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => mat.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.stopArSession();

    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    this.canvas.removeEventListener('wheel', this.handleWheel);
    this.canvas.removeEventListener('click', this.handleCanvasClick);
    window.removeEventListener('resize', this.handleResize);

    this.disposeObject(this.scene);
    this.renderer.dispose();
  }
}
