import * as THREE from 'three';

/**
 * ArSceneEngine
 * Unified Three.js Engine powering both:
 * 1. WebXR Augmented Reality Mode (immersive-ar session on compatible mobile hardware)
 * 2. Interactive 3D Inspection Mode (accessible desktop & non-WebXR fallback)
 *
 * Child Safeguarding & Privacy Guarantees:
 * - Camera feeds are processed strictly in-browser by WebXR; ZERO frames are captured or saved.
 * - Zero tracking cookies, zero external telemetry, zero child biometric data.
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
    this.mainStageGroup = null;
    this.currentObjectGroup = null;
    this.mitraGroup = null;
    this.realmsGroup = null;
    this.reticle = null;
    this.hitTestSource = null;
    this.hitTestSourceRequested = false;

    // Interaction controls for 3D inspection
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0.005 };
    this.zoomLevel = 6.5;

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
    const height = this.canvas.clientHeight || (window.innerHeight * 0.7);

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    this.camera.position.set(0, 0.8, this.zoomLevel);
    this.camera.lookAt(0, 0, 0);

    // 3. Renderer with transparent alpha and WebXR readiness
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

    // 4. Lighting
    this.setupLighting();

    // 5. Main Content Container
    this.mainStageGroup = new THREE.Group();
    this.scene.add(this.mainStageGroup);

    // 6. Mitra 3D Mascot Companion
    this.mitraGroup = this.buildMitraCompanion();
    this.mitraGroup.position.set(2.8, -1.2, 0.5);
    this.mitraGroup.scale.set(0.65, 0.65, 0.65);
    this.scene.add(this.mitraGroup);

    // 7. Reticle for WebXR surface placement
    this.reticle = this.buildReticle();
    this.scene.add(this.reticle);

    // 8. Attach interaction listeners
    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    this.canvas.addEventListener('wheel', this.handleWheel, { passive: true });
    this.canvas.addEventListener('click', this.handleCanvasClick);
    window.addEventListener('resize', this.handleResize);

    // Start 3D animation loop
    this.startAnimationLoop();
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    keyLight.position.set(5, 8, 5);
    this.scene.add(keyLight);

    const saffronFillLight = new THREE.DirectionalLight(0xde7215, 1.2);
    saffronFillLight.position.set(-6, -2, -3);
    this.scene.add(saffronFillLight);

    const peacockRimLight = new THREE.PointLight(0x1b6d80, 2.5, 20);
    peacockRimLight.position.set(0, 4, -4);
    this.scene.add(peacockRimLight);
  }

  buildReticle() {
    const ringGeo = new THREE.RingGeometry(0.18, 0.22, 32).rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xde7215,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const reticleMesh = new THREE.Mesh(ringGeo, ringMat);
    reticleMesh.matrixAutoUpdate = false;
    reticleMesh.visible = false;
    return reticleMesh;
  }

  buildMitraCompanion() {
    const group = new THREE.Group();

    // Stylized low-poly cute Sun-Fox / Lantern companion
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xde7215, // Warm saffron
      roughness: 0.4,
      metalness: 0.1,
    });

    const creamMat = new THREE.MeshStandardMaterial({
      color: 0xfbf8f3,
      roughness: 0.5,
    });

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111827 });
    const lanternMat = new THREE.MeshStandardMaterial({
      color: 0xffe082,
      emissive: 0xffb300,
      emissiveIntensity: 0.8,
    });

    // Body sphere
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), bodyMat);
    body.scale.set(0.9, 1.1, 0.85);
    group.add(body);

    // Cream Belly patch
    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), creamMat);
    belly.position.set(0, -0.1, 0.35);
    belly.scale.set(0.7, 0.8, 0.3);
    group.add(belly);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), bodyMat);
    head.position.set(0, 1.05, 0.1);
    group.add(head);

    // Muzzle
    const muzzle = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.35, 12), creamMat);
    muzzle.rotation.x = Math.PI / 2;
    muzzle.position.set(0, 0.95, 0.55);
    group.add(muzzle);

    // Cute Ears
    const leftEar = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.4, 8), bodyMat);
    leftEar.position.set(-0.35, 1.55, 0.05);
    leftEar.rotation.z = 0.25;
    group.add(leftEar);

    const rightEar = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.4, 8), bodyMat);
    rightEar.position.set(0.35, 1.55, 0.05);
    rightEar.rotation.z = -0.25;
    group.add(rightEar);

    // Eyes
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), eyeMat);
    leftEye.position.set(-0.16, 1.1, 0.55);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), eyeMat);
    rightEye.position.set(0.16, 1.1, 0.55);
    group.add(rightEye);

    // Floating Golden Wisdom Lantern (Mitra's Beacon)
    const lantern = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 1), lanternMat);
    lantern.position.set(0.75, 0.6, 0.3);
    lantern.name = 'mitraLantern';
    group.add(lantern);

    group.name = 'mitraCompanion';
    return group;
  }

  loadConstitutionalObject(objectData) {
    if (!objectData) return;

    // Clear previous object
    if (this.currentObjectGroup) {
      this.mainStageGroup.remove(this.currentObjectGroup);
      this.disposeObject(this.currentObjectGroup);
    }

    const newGroup = new THREE.Group();

    switch (objectData.geometryType) {
      case 'chakra':
        this.buildAshokaChakraGeometry(newGroup, objectData);
        break;
      case 'pillar':
        this.buildPillarGeometry(newGroup, objectData);
        break;
      case 'beacon':
        this.buildBeaconGeometry(newGroup, objectData);
        break;
      case 'shield':
        this.buildShieldGeometry(newGroup, objectData);
        break;
      case 'scroll':
        this.buildScrollGeometry(newGroup, objectData);
        break;
      case 'crest':
        this.buildCrestGeometry(newGroup, objectData);
        break;
      default:
        this.buildPillarGeometry(newGroup, objectData);
    }

    // Attach metadata for raycaster picking
    newGroup.userData = { ...objectData };
    this.currentObjectGroup = newGroup;
    this.mainStageGroup.add(newGroup);

    // If in 3D fallback mode, position at center
    if (!this.isArActive) {
      this.mainStageGroup.position.set(0, 0, 0);
    }
  }

  buildAshokaChakraGeometry(group, data) {
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xde7215,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x3d1c00,
      emissiveIntensity: 0.2,
    });

    const navyHubMat = new THREE.MeshStandardMaterial({
      color: 0x1b6d80,
      metalness: 0.6,
      roughness: 0.3,
    });

    const outerRadius = 2.2;
    const hubRadius = 0.55;

    // Outer Torus Ring
    const outerRing = new THREE.Mesh(new THREE.TorusGeometry(outerRadius, 0.12, 16, 64), goldMat);
    group.add(outerRing);

    // Secondary concentric inner rim
    const innerRim = new THREE.Mesh(new THREE.TorusGeometry(outerRadius - 0.25, 0.04, 12, 64), goldMat);
    group.add(innerRim);

    // Central Navy Hub
    const centralHub = new THREE.Mesh(new THREE.CylinderGeometry(hubRadius, hubRadius, 0.25, 32), navyHubMat);
    centralHub.rotation.x = Math.PI / 2;
    group.add(centralHub);

    // 24 Radial Spokes
    const spokeLength = outerRadius - 0.28 - hubRadius;
    const spokeGeo = new THREE.CylinderGeometry(0.025, 0.05, spokeLength, 8);

    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI * 2) / 24;
      const spoke = new THREE.Mesh(spokeGeo, goldMat);
      spoke.position.set(
        Math.cos(angle) * (hubRadius + spokeLength / 2),
        Math.sin(angle) * (hubRadius + spokeLength / 2),
        0
      );
      spoke.rotation.z = angle - Math.PI / 2;
      group.add(spoke);
    }

    // 4 Cardinal Medallions of Rights (Survival, Development, Protection, Participation)
    for (let m = 0; m < 4; m++) {
      const angle = (m * Math.PI) / 2;
      const med = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.16, 16), goldMat);
      med.rotation.x = Math.PI / 2;
      med.position.set(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius, 0.05);
      group.add(med);
    }

    group.name = 'ashokaChakraModel';
  }

  buildPillarGeometry(group, data) {
    const pillarMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(data.color || 0xd4a017),
      metalness: 0.5,
      roughness: 0.3,
    });

    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.7,
      opacity: 1,
      transparent: true,
      roughness: 0.15,
      ior: 1.5,
    });

    // Pedestal
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.35, 1.4), pillarMat);
    base.position.y = -1.6;
    group.add(base);

    // Two balanced crystal pillars
    const leftPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 2.4, 16), pillarMat);
    leftPillar.position.set(-0.8, -0.25, 0);
    group.add(leftPillar);

    const rightPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 2.4, 16), pillarMat);
    rightPillar.position.set(0.8, -0.25, 0);
    group.add(rightPillar);

    // Horizontal Balance Beam (Article 14)
    const beam = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 0.18), pillarMat);
    beam.position.y = 1.0;
    group.add(beam);

    // Center Floating Diamond of Justice
    const diamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.45, 0), crystalMat);
    diamond.position.y = 1.5;
    group.add(diamond);

    group.name = 'equalityPillarModel';
  }

  buildBeaconGeometry(group, data) {
    const beaconMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(data.color || 0x1b6d80),
      metalness: 0.7,
      roughness: 0.2,
    });

    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: new THREE.Color(data.color || 0x1b6d80),
      emissiveIntensity: 1.2,
    });

    const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.7, 2.6, 6), beaconMat);
    tower.position.y = -0.3;
    group.add(tower);

    const crown = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.1, 8, 24), beaconMat);
    crown.rotation.x = Math.PI / 2;
    crown.position.y = 1.0;
    group.add(crown);

    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.9, 16), flameMat);
    flame.position.y = 1.6;
    group.add(flame);

    group.name = 'voiceBeaconModel';
  }

  buildShieldGeometry(group, data) {
    const shieldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(data.color || 0xd04f36),
      metalness: 0.7,
      roughness: 0.3,
    });

    const goldTrim = new THREE.MeshStandardMaterial({
      color: 0xffd54f,
      metalness: 0.8,
      roughness: 0.2,
    });

    // Curved shield face
    const shield = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 0.8, 2.4, 16, 1, false, 0, Math.PI), shieldMat);
    shield.rotation.y = -Math.PI / 2;
    shield.scale.set(0.35, 1, 1);
    group.add(shield);

    // Emblem in center (Helpline 1098 Beacon)
    const emblem = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.08, 12, 32), goldTrim);
    emblem.position.set(0, 0.2, 0.35);
    group.add(emblem);

    group.name = 'safetyShieldModel';
  }

  buildScrollGeometry(group, data) {
    const scrollMat = new THREE.MeshStandardMaterial({
      color: 0xfffaea,
      roughness: 0.6,
    });

    const woodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(data.color || 0x2a7a4c),
      metalness: 0.3,
      roughness: 0.4,
    });

    // Parchment curve
    const parchment = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.4, 0.08), scrollMat);
    group.add(parchment);

    // Upper and lower scroll handles
    const topHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.4, 16), woodMat);
    topHandle.rotation.z = Math.PI / 2;
    topHandle.position.y = 1.25;
    group.add(topHandle);

    const bottomHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.4, 16), woodMat);
    bottomHandle.rotation.z = Math.PI / 2;
    bottomHandle.position.y = -1.25;
    group.add(bottomHandle);

    group.name = 'educationScrollModel';
  }

  buildCrestGeometry(group, data) {
    const crestMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(data.color || 0x3b5998),
      metalness: 0.8,
      roughness: 0.2,
    });

    const centerPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 2.8, 8), crestMat);
    group.add(centerPillar);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.08, 12, 32), crestMat);
    group.add(ring);

    group.name = 'remedyCrestModel';
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

    // Reposition objects for real-world meters
    this.mainStageGroup.scale.set(0.3, 0.3, 0.3);
    this.mainStageGroup.position.set(0, 0, -1.2);
    this.mitraGroup.scale.set(0.25, 0.25, 0.25);
    this.mitraGroup.position.set(0.45, -0.2, -1.1);

    // Request XR reference space
    const viewerSpace = await session.requestReferenceSpace('viewer');
    const localSpace = await session.requestReferenceSpace('local');

    try {
      this.hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
    } catch {
      // Hit-test unavailable; default to fixed distance floating
      this.hitTestSource = null;
    }

    // Session event handlers
    session.addEventListener('select', this.handleSelect);
    session.addEventListener('end', () => {
      this.isArActive = false;
      this.isPlacedInAr = false;
      this.currentSession = null;
      this.hitTestSource = null;
      this.reticle.visible = false;

      // Reset scale for 3D inspection
      this.mainStageGroup.scale.set(1, 1, 1);
      this.mainStageGroup.position.set(0, 0, 0);
      this.mitraGroup.scale.set(0.65, 0.65, 0.65);
      this.mitraGroup.position.set(2.8, -1.2, 0.5);

      if (this.onArSessionEnd) this.onArSessionEnd();
      this.startAnimationLoop();
    });

    if (this.onPlacementStatus) {
      this.onPlacementStatus('Scan your room surface. Tap screen to anchor constitutional object.');
    }

    // AR render loop
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
        this.mainStageGroup.position.y + 0.1,
        this.mainStageGroup.position.z + 0.1
      );
      this.isPlacedInAr = true;
      if (this.onPlacementStatus) {
        this.onPlacementStatus('Object anchored! Tap the object to explore fundamental rights.');
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

    // Subtle gentle floating hover animation for Mitra
    const elapsed = this.clock.getElapsedTime();
    if (this.mitraGroup) {
      this.mitraGroup.position.y += Math.sin(elapsed * 2.5) * 0.0015;
      const lantern = this.mitraGroup.getObjectByName('mitraLantern');
      if (lantern) {
        lantern.rotation.y = elapsed * 1.5;
        lantern.position.y = 0.6 + Math.sin(elapsed * 3) * 0.05;
      }
    }

    // Slow rotation of selected learning object
    if (this.currentObjectGroup) {
      this.currentObjectGroup.rotation.y += 0.006;
    }

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

      const elapsed = this.clock.getElapsedTime();

      // Inertial rotation
      if (!this.isDragging && this.currentObjectGroup) {
        this.currentObjectGroup.rotation.y += this.rotationVelocity.y;
        this.currentObjectGroup.rotation.x += this.rotationVelocity.x;
        this.rotationVelocity.x *= 0.95;
        this.rotationVelocity.y = this.rotationVelocity.y * 0.95 + 0.003 * 0.05;
      }

      // Mitra idle floating
      if (this.mitraGroup) {
        this.mitraGroup.position.y = -1.2 + Math.sin(elapsed * 2.0) * 0.12;
        const lantern = this.mitraGroup.getObjectByName('mitraLantern');
        if (lantern) {
          lantern.rotation.y = elapsed * 2.0;
          lantern.rotation.x = Math.sin(elapsed) * 0.2;
        }
      }

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  // ── MOUSE / TOUCH INTERACTION CONTROLS ─────────────────────────────────────

  handlePointerDown(e) {
    if (this.isArActive) return;
    this.isDragging = true;
    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  handlePointerMove(e) {
    if (!this.isDragging || this.isArActive || !this.currentObjectGroup) return;

    const deltaX = e.clientX - this.previousMousePosition.x;
    const deltaY = e.clientY - this.previousMousePosition.y;

    this.currentObjectGroup.rotation.y += deltaX * 0.008;
    this.currentObjectGroup.rotation.x += deltaY * 0.008;

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
    this.zoomLevel = Math.max(3.5, Math.min(10.0, this.zoomLevel + e.deltaY * 0.005));
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
    const height = this.canvas.clientHeight || (window.innerHeight * 0.7);

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

