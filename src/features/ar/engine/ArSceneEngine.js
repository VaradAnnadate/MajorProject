import * as THREE from 'three';

/**
 * ArSceneEngine
 * Premium Spatial Three.js Classroom Engine for RightsQuest India.
 *
 * Implements:
 * 1. Living Classroom Wall-Mounted 3D Studio (Universal Fallback - Mode B):
 *    - Compact constitutional learning exhibit mounted on the classroom rear wall (~35-45 cm display scale).
 *    - Slim architectural wall mounting frame with corner brackets, subtle wall contact shadow, and brass plaque.
 *    - Secondary classroom context: Teacher's blackboard to the left, student study desk below/to the side.
 *    - Mitra the Sun-Fox companion on a dedicated wall display perch beside the exhibit.
 * 2. WebXR Classroom Augmented Reality Mode (Mode A):
 *    - Real-world surface hit-testing with wall plane detection and pose alignment.
 *    - Mounts compact exhibit flush against student's real physical classroom wall.
 *    - Explicit on-screen inspection controls: rotate, scale/zoom, reset, reposition/remove.
 *    - Dynamic hide/show of virtual classroom geometry during real AR passthrough.
 *    - Zero camera frames recorded, saved, or uploaded (DPDP Act 2023 §9 compliant).
 */
/**
 * Calibrated Station Transform and Metric Sizing Configurations
 * Strictly defines physical AR metric scale (~35-45 cm physical size in Mode A)
 * and balanced hero apparent scale (~58-62 cm apparent size in Mode B 3D studio).
 */
export const STATION_TRANSFORM_CONFIGS = {
  'ashoka-chakra': {
    id: 'ashoka-chakra',
    title: 'The Sovereign Ashoka Chakra',
    geometryType: 'chakra',
    baseScale3D: 0.130, // ~62 cm apparent diameter on classroom wall
    baseScaleAr: 0.082, // 39.2 cm physical diameter in WebXR AR
    baseMetricCm: 39.2,
    metricUnit: 'cm (diameter)',
    baseApparentCm: 62.1,
    minZoomFactor: 0.65,
    maxZoomFactor: 2.2,
    defaultRotationY: 0,
    modelCenterY: 0.06,
    depthOffset: 0.08,
  },
  'right-to-equality': {
    id: 'right-to-equality',
    title: 'The Balance of Equality',
    geometryType: 'pillar',
    baseScale3D: 0.165, // ~59 cm apparent width on classroom wall
    baseScaleAr: 0.115, // 41.4 cm physical width in WebXR AR
    baseMetricCm: 41.4,
    metricUnit: 'cm (width)',
    baseApparentCm: 59.4,
    minZoomFactor: 0.65,
    maxZoomFactor: 2.2,
    defaultRotationY: 0,
    modelCenterY: 0.06,
    depthOffset: 0.08,
  },
  'right-to-freedom': {
    id: 'right-to-freedom',
    title: 'The Beacon of Expression',
    geometryType: 'beacon',
    baseScale3D: 0.155, // ~58 cm apparent height on classroom wall
    baseScaleAr: 0.098, // 36.9 cm physical height in WebXR AR
    baseMetricCm: 36.9,
    metricUnit: 'cm (height)',
    baseApparentCm: 58.4,
    minZoomFactor: 0.65,
    maxZoomFactor: 2.2,
    defaultRotationY: 0,
    modelCenterY: 0.06,
    depthOffset: 0.08,
  },
  'right-against-exploitation': {
    id: 'right-against-exploitation',
    title: 'The Shield of Bodily Safety',
    geometryType: 'shield',
    baseScale3D: 0.225, // ~59 cm apparent height on classroom wall
    baseScaleAr: 0.145, // 37.7 cm physical height in WebXR AR
    baseMetricCm: 37.7,
    metricUnit: 'cm (height)',
    baseApparentCm: 58.5,
    minZoomFactor: 0.65,
    maxZoomFactor: 2.2,
    defaultRotationY: 0,
    modelCenterY: 0.06,
    depthOffset: 0.08,
  },
  'right-to-education': {
    id: 'right-to-education',
    title: 'The Scroll of Free Learning',
    geometryType: 'scroll',
    baseScale3D: 0.165, // ~59 cm apparent width on classroom wall
    baseScaleAr: 0.112, // 40.3 cm physical width in WebXR AR
    baseMetricCm: 40.3,
    metricUnit: 'cm (width)',
    baseApparentCm: 59.4,
    minZoomFactor: 0.65,
    maxZoomFactor: 2.2,
    defaultRotationY: 0,
    modelCenterY: 0.06,
    depthOffset: 0.08,
  },
  'constitutional-remedies': {
    id: 'constitutional-remedies',
    title: 'The Crest of Legal Remedies',
    geometryType: 'crest',
    baseScale3D: 0.178, // ~59 cm apparent height on classroom wall
    baseScaleAr: 0.118, // 39.2 cm physical height in WebXR AR
    baseMetricCm: 39.2,
    metricUnit: 'cm (height)',
    baseApparentCm: 59.1,
    minZoomFactor: 0.65,
    maxZoomFactor: 2.2,
    defaultRotationY: 0,
    modelCenterY: 0.06,
    depthOffset: 0.08,
  },
};

export class ArSceneEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = options;
    this.onObjectClick = options.onObjectClick || null;
    this.onInteractivePartClick = options.onInteractivePartClick || null;
    this.onArSessionEnd = options.onArSessionEnd || null;
    this.onPlacementStatus = options.onPlacementStatus || null;
    this.onTransformChange = options.onTransformChange || null;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.currentSession = null;
    this.isArActive = false;
    this.isPlacedInAr = false;
    this.animationFrameId = null;
    this.clock = new THREE.Clock();

    // Scene groups
    this.classroomGroup = null; // Contains desk, blackboard, workbook, floor, walls, window
    this.mainStageGroup = null; // Contains wall mounting frame, plaque, and active constitutional artifact
    this.activeExhibitRoot = null; // Dedicated active transform container for the constitutional exhibit
    this.wallMountingFrame = null;
    this.currentStationGroup = null;
    this.mitraGroup = null;
    this.particlesGroup = null;
    this.reticle = null;
    this.hitTestSource = null;

    // Active Station & Independent Transform States
    this.activeStationId = 'ashoka-chakra';
    this.stationStates = {};
    Object.keys(STATION_TRANSFORM_CONFIGS).forEach((id) => {
      this.stationStates[id] = {
        rotationY: STATION_TRANSFORM_CONFIGS[id].defaultRotationY,
        zoomFactor: 1.0,
      };
    });

    // AR Wall Placement & Pose Tracking State
    this.isWallDetected = false;
    this.placedAnchorPosition = new THREE.Vector3();
    this.placedAnchorQuaternion = new THREE.Quaternion();
    this.currentAnchor = null;
    this.reticleValidMat = null;
    this.reticleInvalidMat = null;
    this.reticleRing = null;
    this.reticleDot = null;

    // Blackboard canvas texture
    this.blackboardCanvas = null;
    this.blackboardTexture = null;
    this.blackboardMesh = null;

    // Plaque canvas texture
    this.plaqueCanvas = null;
    this.plaqueTexture = null;

    // Charter canvas texture
    this.charterCanvas = null;
    this.charterTexture = null;
    this.charterMesh = null;

    // Consequence animation states
    this.activeSpatialEffect = null;
    this.effectTimer = 0;
    this.scaleTiltAngle = -0.22;
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
    this.mitraEmotion = 'welcome';
    this.mitraBlinkTimer = 0;

    // Whole-Classroom Camera Navigation State (Natural pan, orbit, and zoom)
    this.cameraDefaultPosition = new THREE.Vector3(0, 1.05, 2.5);
    this.cameraDefaultTarget = new THREE.Vector3(0, 1.05, -2.18);
    this.cameraTarget = new THREE.Vector3(0, 1.05, -2.18);
    this.desiredCameraTarget = new THREE.Vector3(0, 1.05, -2.18);
    this.desiredCameraPosition = new THREE.Vector3(0, 1.05, 2.5);

    // Orbit angles & distance from wall target (target z = -2.18, camera default z = 2.5 -> distance = 4.68m)
    this.cameraYaw = 0;
    this.cameraPitch = 0;
    this.cameraDistance = 4.68;
    this.desiredCameraYaw = 0;
    this.desiredCameraPitch = 0;
    this.desiredCameraDistance = 4.68;

    this.activeFocusObject = null; // null | 'overview' | 'blackboard' | 'charter' | 'mitra' | 'desk' | 'exhibit'
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0 };
    this.initialPinchDistance = null;

    // Interactive Classroom Spatial Focal Points
    this.classroomFocalPoints = {
      overview: {
        target: new THREE.Vector3(0, 1.05, -2.18),
        cameraPos: new THREE.Vector3(0, 1.05, 2.5),
        title: 'Classroom Overview',
        badge: 'Whole Room',
      },
      exhibit: {
        target: new THREE.Vector3(0, 1.05, -2.18),
        cameraPos: new THREE.Vector3(0, 1.05, -0.65),
        title: 'Constitutional Exhibit',
        badge: 'Constitutional Artifact',
      },
      blackboard: {
        target: new THREE.Vector3(-2.75, 1.25, -2.28),
        cameraPos: new THREE.Vector3(-2.3, 1.25, -0.7),
        title: 'Teacher’s Blackboard',
        badge: 'Lesson Topic',
      },
      charter: {
        target: new THREE.Vector3(2.75, 1.25, -2.28),
        cameraPos: new THREE.Vector3(2.3, 1.25, -0.7),
        title: 'The Constitution Charter',
        badge: 'Preamble Bedrock',
      },
      mitra: {
        target: new THREE.Vector3(1.08, 0.72, -2.05),
        cameraPos: new THREE.Vector3(0.95, 0.72, -1.05),
        title: 'Mitra Companion Perch',
        badge: 'Learning Companion',
      },
      desk: {
        target: new THREE.Vector3(1.65, -0.85, 0.45),
        cameraPos: new THREE.Vector3(1.35, -0.15, 1.45),
        title: 'Student Desk & Civics Journal',
        badge: 'Learner Workbook',
      },
    };

    // Bind event listeners
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
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

    // 2. Camera with student classroom eye-level perspective focused on wall exhibit
    this.camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    this.camera.position.set(0, 1.05, this.zoomLevel);
    this.camera.lookAt(0, 1.05, -2.18);

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

    // 4. Natural Classroom Lighting Setup with Exhibition Spotlight
    this.setupClassroomLighting();

    // 5. Build Balanced 3D Classroom Environment (Rear Wall, Balanced Chalkboard, Charter, Desk, Window)
    this.classroomGroup = this.buildClassroomEnvironment();
    this.scene.add(this.classroomGroup);

    // 6. Floating Ambient Dust Motifs
    this.particlesGroup = this.buildDustParticles();
    this.scene.add(this.particlesGroup);

    // 7. Main Artifact Stage Container (Prominently centered on classroom rear wall)
    this.mainStageGroup = new THREE.Group();
    this.mainStageGroup.position.set(0, 1.05, -2.18);
    this.mainStageGroup.scale.set(1, 1, 1);
    this.scene.add(this.mainStageGroup);

    // Universal Active Exhibit Root Container (Transforms affect this group directly)
    this.activeExhibitRoot = new THREE.Group();
    this.activeExhibitRoot.name = 'activeExhibitRoot';
    this.mainStageGroup.add(this.activeExhibitRoot);

    // 8. Mitra 3D Companion (Grounded securely on crafted museum corbel wall shelf)
    this.mitraGroup = this.buildMitraCompanion();
    this.mitraGroup.position.set(1.08, 0.72, -2.05);
    this.mitraGroup.rotation.y = -0.38; // Looking attentively toward artifact and student
    this.mitraGroup.scale.set(0.42, 0.42, 0.42);
    this.scene.add(this.mitraGroup);

    // 9. Reticle for WebXR Real Surface Placement
    this.reticle = this.buildReticle();
    this.scene.add(this.reticle);

    // 10. Attach event listeners
    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    this.canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    this.canvas.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    this.canvas.addEventListener('touchend', this.handleTouchEnd, { passive: true });
    this.canvas.addEventListener('wheel', this.handleWheel, { passive: false });
    this.canvas.addEventListener('click', this.handleCanvasClick);
    window.addEventListener('resize', this.handleResize);

    // 11. Start animation loop
    this.startAnimationLoop();
  }

  // ── CLASSROOM LIGHTING ───────────────────────────────────────────────────

  setupClassroomLighting() {
    // Soft ambient gallery illumination
    const ambient = new THREE.AmbientLight(0xfff9f0, 1.4);
    this.scene.add(ambient);

    // Sunbeam streaming through classroom window
    const windowSun = new THREE.DirectionalLight(0xfffaea, 2.2);
    windowSun.position.set(-6, 6.5, 3.5);
    windowSun.castShadow = true;
    windowSun.shadow.mapSize.width = 1024;
    windowSun.shadow.mapSize.height = 1024;
    this.scene.add(windowSun);

    // Warm classroom interior fill
    const roomFill = new THREE.DirectionalLight(0xde7215, 0.7);
    roomFill.position.set(5, 3, -1);
    this.scene.add(roomFill);

    // Dedicated Exhibition Spotlight focusing directly on the central constitutional exhibit
    const exhibitSpotlight = new THREE.SpotLight(0xfff8ee, 3.4, 9, Math.PI / 4.2, 0.4, 1.1);
    exhibitSpotlight.position.set(0, 3.6, 0.8);
    exhibitSpotlight.target = this.mainStageGroup || this.scene;
    exhibitSpotlight.castShadow = true;
    this.scene.add(exhibitSpotlight);
  }

  // ── VIRTUAL 3D CLASSROOM ENVIRONMENT ─────────────────────────────────────

  buildClassroomEnvironment() {
    const classroom = new THREE.Group();
    classroom.name = 'virtualClassroomGroup';

    // Materials
    const floorWoodMat = new THREE.MeshStandardMaterial({
      color: 0x5c3a21,
      roughness: 0.55,
      metalness: 0.05,
    });

    const wallPlasterMat = new THREE.MeshStandardMaterial({
      color: 0xf1efe7,
      roughness: 0.88,
      metalness: 0.02,
    });

    const deskWoodMat = new THREE.MeshStandardMaterial({
      color: 0x824b22,
      roughness: 0.38,
      metalness: 0.08,
    });

    const deskMetalMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.45,
      metalness: 0.7,
    });

    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xfffef7,
      roughness: 0.75,
      metalness: 0.02,
    });

    const pencilMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.4,
      metalness: 0.1,
    });

    const brassHolderMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.85,
      roughness: 0.25,
    });

    const wainscotMat = new THREE.MeshStandardMaterial({
      color: 0x1f342b, // Heritage dark classroom green wainscoting
      roughness: 0.72,
      metalness: 0.04,
    });

    // 1. Classroom Hardwood Floor
    const floor = new THREE.Mesh(new THREE.BoxGeometry(16, 0.2, 12), floorWoodMat);
    floor.position.y = -1.8;
    floor.receiveShadow = true;
    classroom.add(floor);

    // 2. Classroom Rear Wall with Two-Tone Architectural Wainscoting
    const rearWall = new THREE.Mesh(new THREE.BoxGeometry(16, 8, 0.2), wallPlasterMat);
    rearWall.position.set(0, 2.1, -2.4);
    rearWall.receiveShadow = true;
    classroom.add(rearWall);

    // Lower Wall Wainscoting Panel
    const lowerWainscot = new THREE.Mesh(new THREE.BoxGeometry(16, 1.88, 0.02), wainscotMat);
    lowerWainscot.position.set(0, -0.86, -2.29);
    lowerWainscot.receiveShadow = true;
    classroom.add(lowerWainscot);

    // Horizontal Teak Dado / Chair Rail
    const dadoRail = new THREE.Mesh(new THREE.BoxGeometry(16, 0.08, 0.05), deskWoodMat);
    dadoRail.position.set(0, 0.08, -2.28);
    dadoRail.castShadow = true;
    classroom.add(dadoRail);

    // Architectural Fluted Teak Pilasters Framing the Central Exhibition Alcove
    const pilasterLeft = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.4, 0.05), deskWoodMat);
    pilasterLeft.position.set(-1.45, 1.45, -2.26);
    pilasterLeft.castShadow = true;
    classroom.add(pilasterLeft);

    const pilasterRight = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.4, 0.05), deskWoodMat);
    pilasterRight.position.set(1.45, 1.45, -2.26);
    pilasterRight.castShadow = true;
    classroom.add(pilasterRight);

    // 3. Left Window with Daylight Sky
    const windowGroup = new THREE.Group();
    windowGroup.position.set(-4.8, 1.8, -0.2);
    windowGroup.rotation.y = Math.PI / 2;

    const windowGlassMat = new THREE.MeshBasicMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.9,
    });
    const windowPane = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 3.4), windowGlassMat);
    windowGroup.add(windowPane);

    const winFrameMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const winBorder = new THREE.Mesh(new THREE.BoxGeometry(2.7, 3.5, 0.06), winFrameMat);
    windowGroup.add(winBorder);
    classroom.add(windowGroup);

    // 4. Symmetrical Left Noticeboard: The Teacher's Classroom Blackboard
    const blackboardGroup = new THREE.Group();
    blackboardGroup.position.set(-2.75, 1.25, -2.28);

    const frameWoodMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.45 });
    const boardFrame = new THREE.Mesh(new THREE.BoxGeometry(2.35, 1.75, 0.08), frameWoodMat);
    boardFrame.castShadow = true;
    blackboardGroup.add(boardFrame);

    this.blackboardCanvas = document.createElement('canvas');
    this.blackboardCanvas.width = 1024;
    this.blackboardCanvas.height = 512;
    this.blackboardTexture = new THREE.CanvasTexture(this.blackboardCanvas);

    const boardMat = new THREE.MeshStandardMaterial({
      map: this.blackboardTexture,
      roughness: 0.65,
      metalness: 0.05,
    });
    this.blackboardMesh = new THREE.Mesh(new THREE.BoxGeometry(2.18, 1.58, 0.04), boardMat);
    this.blackboardMesh.name = 'blackboardMesh';
    this.blackboardMesh.position.z = 0.035;
    blackboardGroup.add(this.blackboardMesh);

    const ledge = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.07, 0.16), frameWoodMat);
    ledge.position.set(0, -0.82, 0.08);
    blackboardGroup.add(ledge);

    const chalkMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
    const chalk1 = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.12, 8), chalkMat);
    chalk1.rotation.z = Math.PI / 2;
    chalk1.position.set(-0.35, -0.78, 0.1);
    blackboardGroup.add(chalk1);

    const goldChalkMat = new THREE.MeshStandardMaterial({ color: 0xfcd34d, roughness: 0.9 });
    const chalk2 = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.1, 8), goldChalkMat);
    chalk2.rotation.z = Math.PI / 2;
    chalk2.position.set(-0.18, -0.78, 0.1);
    blackboardGroup.add(chalk2);

    classroom.add(blackboardGroup);

    // 5. Symmetrical Right Panel: Constitution Preamble Wall Charter (Balances the Blackboard!)
    const charterGroup = new THREE.Group();
    charterGroup.position.set(2.75, 1.25, -2.28);

    const charterFrame = new THREE.Mesh(new THREE.BoxGeometry(2.35, 1.75, 0.08), deskWoodMat);
    charterFrame.castShadow = true;
    charterGroup.add(charterFrame);

    this.charterCanvas = document.createElement('canvas');
    this.charterCanvas.width = 1024;
    this.charterCanvas.height = 512;
    this.charterTexture = new THREE.CanvasTexture(this.charterCanvas);
    this.renderCharterCanvas();

    const charterMat = new THREE.MeshStandardMaterial({
      map: this.charterTexture,
      roughness: 0.45,
      metalness: 0.05,
    });
    this.charterMesh = new THREE.Mesh(new THREE.BoxGeometry(2.18, 1.58, 0.035), charterMat);
    this.charterMesh.name = 'charterMesh';
    this.charterMesh.position.z = 0.03;
    charterGroup.add(this.charterMesh);

    classroom.add(charterGroup);

    // 6. Secondary Student Study Desk (Grounded naturally in lower right foreground)
    const deskGroup = new THREE.Group();
    deskGroup.name = 'studentDeskGroup';
    this.deskGroup = deskGroup;
    deskGroup.position.set(1.9, -1.15, 0.5);
    deskGroup.scale.set(0.85, 0.85, 0.85);

    const tabletop = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.14, 1.8), deskWoodMat);
    tabletop.castShadow = true;
    tabletop.receiveShadow = true;
    deskGroup.add(tabletop);

    const legPositions = [
      [-1.45, -0.45, -0.75],
      [1.45, -0.45, -0.75],
      [-1.45, -0.45, 0.75],
      [1.45, -0.45, 0.75],
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.88, 16), deskMetalMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      deskGroup.add(leg);
    });

    const stationeryGroup = new THREE.Group();
    stationeryGroup.position.set(-0.35, 0.09, 0.1);

    const workbook = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.022, 0.65), paperMat);
    workbook.name = 'studentWorkbookMesh';
    this.workbookMesh = workbook;
    workbook.rotation.y = 0.06;
    workbook.receiveShadow = true;
    stationeryGroup.add(workbook);

    const ribbonMat = new THREE.MeshBasicMaterial({ color: 0xde7215 });
    const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.024, 0.7), ribbonMat);
    ribbon.rotation.y = 0.06;
    stationeryGroup.add(ribbon);

    const pencil = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.38, 8), pencilMat);
    pencil.rotation.z = Math.PI / 2.2;
    pencil.position.set(0.55, 0.015, -0.05);
    stationeryGroup.add(pencil);

    const holder = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.24, 16), brassHolderMat);
    holder.position.set(0.6, 0.12, -0.32);
    holder.castShadow = true;
    stationeryGroup.add(holder);

    deskGroup.add(stationeryGroup);
    classroom.add(deskGroup);

    // 7. Grounded Museum Corbel Wall Shelf for Mitra (Firmly attached to wall beside exhibit)
    const corbelGroup = new THREE.Group();
    corbelGroup.name = 'mitraCorbelShelf';
    this.corbelShelfGroup = corbelGroup;
    corbelGroup.position.set(1.08, 0.65, -2.18);

    // Polished Teak Shelf Slab
    const shelfSlab = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.05, 0.42), deskWoodMat);
    shelfSlab.castShadow = true;
    shelfSlab.receiveShadow = true;
    corbelGroup.add(shelfSlab);

    // Outer Brass Safety Railing
    const railMat = new THREE.MeshStandardMaterial({ color: 0xd4a017, metalness: 0.88, roughness: 0.22 });
    const railFront = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.02, 0.02), railMat);
    railFront.position.set(0, 0.035, 0.2);
    corbelGroup.add(railFront);
    const railSide = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.4), railMat);
    railSide.position.set(0.28, 0.035, 0);
    corbelGroup.add(railSide);

    // Substantial Classical Carved Wooden Wall Corbel Bracket
    const corbelBracket = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.36, 0.32), deskWoodMat);
    corbelBracket.position.set(0, -0.19, -0.05);
    corbelBracket.castShadow = true;
    corbelGroup.add(corbelBracket);

    // Two Brass Wall Mounting Hex Bolts
    const boltMat = new THREE.MeshStandardMaterial({ color: 0x78350f, metalness: 0.92, roughness: 0.3 });
    const bolt1 = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.04, 6), boltMat);
    bolt1.rotation.x = Math.PI / 2;
    bolt1.position.set(0, -0.08, -0.18);
    corbelGroup.add(bolt1);

    const bolt2 = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.04, 6), boltMat);
    bolt2.rotation.x = Math.PI / 2;
    bolt2.position.set(0, -0.28, -0.18);
    corbelGroup.add(bolt2);

    classroom.add(corbelGroup);

    // Draw initial blackboard lesson text
    this.renderBlackboardCanvas(
      'The Sovereign Ashoka Chakra',
      'Preamble & Fundamental Duties',
      'The Constitution belongs to every child — 24 spokes of Dharma guide our democracy.',
      1
    );

    return classroom;
  }

  // Draw Dynamic Constitution Preamble Charter Canvas
  renderCharterCanvas() {
    if (!this.charterCanvas || !this.charterTexture) return;

    const ctx = this.charterCanvas.getContext('2d');
    const w = this.charterCanvas.width;
    const h = this.charterCanvas.height;

    // Warm aged parchment background
    ctx.fillStyle = '#faf6ed';
    ctx.fillRect(0, 0, w, h);

    // Ornate gold and ink border
    ctx.strokeStyle = '#854d0e';
    ctx.lineWidth = 6;
    ctx.strokeRect(16, 16, w - 32, h - 32);

    ctx.strokeStyle = '#d4a017';
    ctx.lineWidth = 2;
    ctx.strokeRect(26, 26, w - 52, h - 52);

    // Header: Ashoka Lion Capital Seal Representation
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 26px monospace';
    ctx.fillText('✦ CONSTITUTION OF INDIA · PREAMBLE ✦', w / 2, 70);

    // Preamble Text Calligraphy
    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillStyle = '#92400e';
    ctx.fillText('WE, THE PEOPLE OF INDIA,', w / 2, 130);

    ctx.font = 'italic 24px Georgia, serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText('having solemnly resolved to constitute India into a', w / 2, 180);

    ctx.font = 'bold 28px Georgia, serif';
    ctx.fillStyle = '#b45309';
    ctx.fillText('SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC', w / 2, 230);

    ctx.font = '22px Georgia, serif';
    ctx.fillStyle = '#334155';
    ctx.fillText('JUSTICE, social, economic and political;', w / 2, 285);
    ctx.fillText('LIBERTY of thought, expression, belief, faith and worship;', w / 2, 330);
    ctx.fillText('EQUALITY of status and of opportunity;', w / 2, 375);
    ctx.fillText('FRATERNITY assuring the dignity of the individual.', w / 2, 420);

    ctx.font = 'bold 18px monospace';
    ctx.fillStyle = '#854d0e';
    ctx.fillText('IN OUR CONSTITUENT ASSEMBLY · 26th DAY OF NOVEMBER, 1949', w / 2, 475);

    this.charterTexture.needsUpdate = true;
  }

  // Draw Dynamic Classroom Blackboard Text
  renderBlackboardCanvas(lessonTitle, articleRef, corePrinciple, lessonNum = 1) {
    if (!this.blackboardCanvas || !this.blackboardTexture) return;

    const ctx = this.blackboardCanvas.getContext('2d');
    const w = this.blackboardCanvas.width;
    const h = this.blackboardCanvas.height;

    // Chalkboard deep slate green background
    ctx.fillStyle = '#142621';
    ctx.fillRect(0, 0, w, h);

    // Subtle chalk dust border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, w - 40, h - 40);

    ctx.strokeStyle = 'rgba(252, 211, 77, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(28, 28, w - 56, h - 56);

    // Header: Class & Lesson Number
    ctx.textAlign = 'center';
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#FCD34D';
    ctx.fillText(`✦ RIGHTSQUEST LIVING CLASSROOM · LESSON ${lessonNum} OF 6 ✦`, w / 2, 65);

    // Lesson Title
    ctx.font = 'bold 44px Georgia, serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(lessonTitle, w / 2, 135);

    // Constitutional Article Reference
    ctx.font = '600 28px sans-serif';
    ctx.fillStyle = '#FBBF24';
    ctx.fillText(articleRef, w / 2, 190);

    // Decorative separator line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.beginPath();
    ctx.moveTo(w / 2 - 220, 215);
    ctx.lineTo(w / 2 + 220, 215);
    ctx.stroke();

    // Core Principle / Classroom Rule
    ctx.font = 'italic 25px Georgia, serif';
    ctx.fillStyle = '#E2E8F0';
    ctx.fillText(`“${corePrinciple}”`, w / 2, 275);

    // Footnote guidance
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('Inspect the wall-mounted learning exhibit · Make your decision below', w / 2, 345);

    this.blackboardTexture.needsUpdate = true;
  }

  // Draw Dynamic Exhibit Brass Identification Plaque Canvas
  renderPlaqueCanvas(stationData) {
    if (!this.plaqueCanvas || !this.plaqueTexture || !stationData) return;

    const ctx = this.plaqueCanvas.getContext('2d');
    const w = this.plaqueCanvas.width;
    const h = this.plaqueCanvas.height;

    // Brushed brass gradient background
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#fef08a');
    grad.addColorStop(0.3, '#d4a017');
    grad.addColorStop(0.7, '#ca8a04');
    grad.addColorStop(1, '#a16207');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Dark engraved bevel border
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    ctx.strokeStyle = '#fef9c3';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Text: Article reference
    ctx.textAlign = 'center';
    ctx.fillStyle = '#451a03';
    ctx.font = 'bold 20px monospace';
    ctx.fillText((stationData.articleRef || 'CONSTITUTION OF INDIA').toUpperCase(), w / 2, 38);

    // Text: Title
    ctx.font = 'bold 30px Georgia, serif';
    ctx.fillText((stationData.title || 'Constitutional Exhibit').toUpperCase(), w / 2, 78);

    // Text: Subtitle
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#78350f';
    ctx.fillText('RIGHTSQUEST CLASSROOM WALL EXHIBIT · COMPACT 35-45 CM', w / 2, 108);

    this.plaqueTexture.needsUpdate = true;
  }

  // ── SLIM WALL-MOUNTED EXHIBIT FRAME & IDENTIFICATION PLAQUE ───────────────

  buildWallMountingFrame(stationData) {
    const frame = new THREE.Group();
    frame.name = 'wallMountingFrame';

    // 1. Subtle contact drop-shadow against the wall
    const shadowGeo = new THREE.PlaneGeometry(0.96, 0.96);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.32,
      side: THREE.DoubleSide,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.z = -0.018;
    shadowMesh.name = 'wallContactShadow';
    frame.add(shadowMesh);

    // 2. Slim architectural mounting backplate (Dark bronze / slate teak)
    const backplateMat = new THREE.MeshStandardMaterial({
      color: 0x1e232a,
      roughness: 0.58,
      metalness: 0.32,
    });
    const backplate = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.88, 0.032), backplateMat);
    backplate.castShadow = true;
    backplate.receiveShadow = true;
    frame.add(backplate);

    // Slim outer gold trim border
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.88,
      roughness: 0.22,
    });
    const topTrim = new THREE.Mesh(new THREE.BoxGeometry(0.89, 0.018, 0.036), trimMat);
    topTrim.position.set(0, 0.44, 0.002);
    frame.add(topTrim);
    const bottomTrim = new THREE.Mesh(new THREE.BoxGeometry(0.89, 0.018, 0.036), trimMat);
    bottomTrim.position.set(0, -0.44, 0.002);
    frame.add(bottomTrim);
    const leftTrim = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.88, 0.036), trimMat);
    leftTrim.position.set(-0.44, 0, 0.002);
    frame.add(leftTrim);
    const rightTrim = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.88, 0.036), trimMat);
    rightTrim.position.set(0.44, 0, 0.002);
    frame.add(rightTrim);

    // 3. Architectural wall mounting brackets with hex bolts at 4 corners
    const boltMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      metalness: 0.92,
      roughness: 0.3,
    });

    const bracketCorners = [
      [-0.38, 0.38],
      [0.38, 0.38],
      [-0.38, -0.38],
      [0.38, -0.38],
    ];

    bracketCorners.forEach(([bx, by]) => {
      const bracket = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.04, 16), trimMat);
      bracket.rotation.x = Math.PI / 2;
      bracket.position.set(bx, by, 0.016);
      frame.add(bracket);

      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.044, 6), boltMat);
      bolt.rotation.x = Math.PI / 2;
      bolt.position.set(bx, by, 0.018);
      frame.add(bolt);
    });

    // 4. Exhibit Brass Identification Plaque
    if (!this.plaqueCanvas) {
      this.plaqueCanvas = document.createElement('canvas');
      this.plaqueCanvas.width = 512;
      this.plaqueCanvas.height = 128;
      this.plaqueTexture = new THREE.CanvasTexture(this.plaqueCanvas);
    }

    const plaqueMat = new THREE.MeshStandardMaterial({
      map: this.plaqueTexture,
      roughness: 0.32,
      metalness: 0.65,
    });
    const plaqueMesh = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.16, 0.018), plaqueMat);
    plaqueMesh.position.set(0, -0.32, 0.024);
    plaqueMesh.name = 'exhibitPlaqueMesh';
    frame.add(plaqueMesh);

    if (stationData) {
      this.renderPlaqueCanvas(stationData);
    }

    return frame;
  }

  // Update Blackboard dynamically when station or age tier changes
  updateBlackboardContent(station, ageKey = '8-10') {
    if (!station) return;
    const lessonNum = station.stationNumber || 1;
    const title = station.title || 'Constitutional Lesson';
    const article = station.articleRef || 'Constitution of India';
    const principle =
      station.classroomBoardSummary ||
      station.scenarios?.[ageKey]?.choices?.[0]?.explanation ||
      station.overview ||
      'Equal dignity and justice for every young citizen.';

    this.renderBlackboardCanvas(title, article, principle, lessonNum);
  }

  // For test script backward compatibility
  buildPedestal() {
    return this.wallMountingFrame || this.classroomGroup || new THREE.Group();
  }

  buildDustParticles() {
    const count = 40;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8.5;
      positions[i + 1] = (Math.random() - 0.5) * 4 + 0.6;
      positions[i + 2] = (Math.random() - 0.5) * 6.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.07,
      transparent: true,
      opacity: 0.6,
    });

    return new THREE.Points(geometry, material);
  }

  buildReticle() {
    const reticleGroup = new THREE.Group();
    reticleGroup.name = 'placementReticle';
    reticleGroup.matrixAutoUpdate = false;
    reticleGroup.visible = false;

    this.reticleValidMat = new THREE.MeshBasicMaterial({
      color: 0x10b981, // Vibrant emerald green for valid vertical wall
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    });

    this.reticleInvalidMat = new THREE.MeshBasicMaterial({
      color: 0xef4444, // Red for invalid horizontal floor/ceiling surface
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    });

    // Flat ring on XY plane (faces camera/wall normal)
    const ringGeo = new THREE.RingGeometry(0.18, 0.22, 36);
    this.reticleRing = new THREE.Mesh(ringGeo, this.reticleValidMat);
    reticleGroup.add(this.reticleRing);

    // Center targeting dot
    const dotGeo = new THREE.CircleGeometry(0.024, 16);
    this.reticleDot = new THREE.Mesh(dotGeo, this.reticleValidMat);
    reticleGroup.add(this.reticleDot);

    // 4 Cardinal Crosshair ticks
    const tickGeo = new THREE.PlaneGeometry(0.016, 0.08);
    const tickN = new THREE.Mesh(tickGeo, this.reticleValidMat);
    tickN.position.y = 0.27;
    reticleGroup.add(tickN);
    const tickS = new THREE.Mesh(tickGeo, this.reticleValidMat);
    tickS.position.y = -0.27;
    reticleGroup.add(tickS);
    const tickE = new THREE.Mesh(tickGeo, this.reticleValidMat);
    tickE.rotation.z = Math.PI / 2;
    tickE.position.x = 0.27;
    reticleGroup.add(tickE);
    const tickW = new THREE.Mesh(tickGeo, this.reticleValidMat);
    tickW.rotation.z = Math.PI / 2;
    tickW.position.x = -0.27;
    reticleGroup.add(tickW);

    this.reticleCrosshairs = [tickN, tickS, tickE, tickW];

    return reticleGroup;
  }

  setReticleState(state) {
    const mat = state === 'valid' ? this.reticleValidMat : this.reticleInvalidMat;
    if (!mat) return;
    if (this.reticleRing) this.reticleRing.material = mat;
    if (this.reticleDot) this.reticleDot.material = mat;
    if (this.reticleCrosshairs) {
      this.reticleCrosshairs.forEach((tick) => {
        tick.material = mat;
      });
    }
  }

  // ── REFINED 3D MITRA MASCOT COMPANION (STUDY BUDDY ON DESK) ───────────────

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

    // Eyes with Highlights
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

    // 5. Floating Golden Wisdom Lantern (Mitra's Classroom Light)
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
          lanternCore.material.emissive.setHex(0x10b981);
          lanternCore.material.emissiveIntensity = 2.2;
          lanternLight.color.setHex(0x10b981);
          lanternLight.intensity = 2.4;
          if (head) head.rotation.z = 0.08;
          break;
        case 'thinking':
          lanternCore.material.emissive.setHex(0x38bdf8);
          lanternCore.material.emissiveIntensity = 1.3;
          lanternLight.color.setHex(0x38bdf8);
          lanternLight.intensity = 1.4;
          if (head) head.rotation.z = -0.12;
          break;
        case 'concerned':
          lanternCore.material.emissive.setHex(0xf97316);
          lanternCore.material.emissiveIntensity = 1.4;
          lanternLight.color.setHex(0xf97316);
          lanternLight.intensity = 1.6;
          if (head) head.rotation.z = 0.15;
          break;
        case 'explaining':
          lanternCore.material.emissive.setHex(0xf59e0b);
          lanternCore.material.emissiveIntensity = 1.6;
          lanternLight.color.setHex(0xf59e0b);
          lanternLight.intensity = 1.8;
          if (head) head.rotation.z = -0.05;
          break;
        default:
          lanternCore.material.emissive.setHex(0xffaa00);
          lanternCore.material.emissiveIntensity = 1.2;
          lanternLight.color.setHex(0xffaa00);
          lanternLight.intensity = 1.3;
          if (head) head.rotation.z = 0;
      }
    }
  }

  getStationConfig(stationId = this.activeStationId) {
    return STATION_TRANSFORM_CONFIGS[stationId] || STATION_TRANSFORM_CONFIGS['ashoka-chakra'];
  }

  getActiveExhibitRoot() {
    return this.activeExhibitRoot || this.currentStationGroup;
  }

  // ── LOAD CONSTITUTIONAL EXHIBIT ONTO WALL MOUNT ──────────────────────────

  loadConstitutionalStation(stationData, ageKey = '8-10') {
    if (!stationData) return;
    const stationId = stationData.id || 'ashoka-chakra';
    this.activeStationId = stationId;

    if (!this.activeExhibitRoot) {
      this.activeExhibitRoot = new THREE.Group();
      this.activeExhibitRoot.name = 'activeExhibitRoot';
      this.mainStageGroup.add(this.activeExhibitRoot);
    }

    if (this.currentStationGroup) {
      this.activeExhibitRoot.remove(this.currentStationGroup);
      this.disposeObject(this.currentStationGroup);
      this.currentStationGroup = null;
    }

    if (this.wallMountingFrame) {
      this.mainStageGroup.remove(this.wallMountingFrame);
      this.disposeObject(this.wallMountingFrame);
      this.wallMountingFrame = null;
    }

    // 1. Build Wall Mounting Frame with contact shadow, corner brackets and brass identification plaque
    this.wallMountingFrame = this.buildWallMountingFrame(stationData);
    this.mainStageGroup.add(this.wallMountingFrame);

    // 2. Build Station Geometry inside scaled model group
    const newGroup = new THREE.Group();

    switch (stationData.geometryType) {
      case 'chakra':
        this.buildAshokaChakraGeometry(newGroup, stationData);
        newGroup.name = 'ashokaChakraModel';
        break;
      case 'pillar':
        this.buildEqualityBalanceGeometry(newGroup, stationData);
        newGroup.name = 'equalityBalanceModel';
        break;
      case 'beacon':
        this.buildVoiceBeaconGeometry(newGroup, stationData);
        newGroup.name = 'voiceBeaconModel';
        break;
      case 'shield':
        this.buildSafetyShieldGeometry(newGroup, stationData);
        newGroup.name = 'safetyShieldModel';
        break;
      case 'scroll':
        this.buildEducationScrollGeometry(newGroup, stationData);
        newGroup.name = 'educationScrollModel';
        break;
      case 'crest':
        this.buildRemediesCrestGeometry(newGroup, stationData);
        newGroup.name = 'remediesCrestModel';
        break;
      default:
        this.buildAshokaChakraGeometry(newGroup, stationData);
        newGroup.name = 'ashokaChakraModel';
    }

    const config = this.getStationConfig(stationId);
    newGroup.position.set(0, 0, 0);
    newGroup.userData = { id: stationId, title: stationData.title };
    this.currentStationGroup = newGroup;
    this.activeExhibitRoot.add(newGroup);

    // Position active exhibit root relative to wall mounting backplate
    this.activeExhibitRoot.position.set(0, config.modelCenterY, config.depthOffset);

    // Apply this station's independent transform state (no leakage!)
    this.applyExhibitTransform();

    // Update Blackboard dynamically
    this.updateBlackboardContent(stationData, ageKey);
    this.renderPlaqueCanvas(stationData);

    if (stationId === 'right-to-equality') {
      this.targetScaleTilt = -0.22;
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
    chakraGroup.position.set(0, 0.65, 0);

    // Rotating Wheel Body (Contains hub, core, rims, and 24 Dharma spokes)
    const chakraWheelBody = new THREE.Group();
    chakraWheelBody.name = 'chakraWheelBody';

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.22, 32), chakraNavy);
    hub.rotation.x = Math.PI / 2;
    chakraWheelBody.add(hub);

    const core = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), chakraGold);
    chakraWheelBody.add(core);

    const outerRim = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.085, 16, 64), chakraNavy);
    chakraWheelBody.add(outerRim);

    const innerRim = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.035, 12, 64), chakraGold);
    chakraWheelBody.add(innerRim);

    // 24 Dharma Spokes
    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI * 2) / 24;
      const spokeGroup = new THREE.Group();
      spokeGroup.rotation.z = angle;

      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.038, 1.38, 8), chakraNavy);
      spoke.position.y = 1.05;
      spokeGroup.add(spoke);

      const tipBead = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), chakraGold);
      tipBead.position.y = 1.76;
      spokeGroup.add(tipBead);

      chakraWheelBody.add(spokeGroup);
    }

    chakraGroup.add(chakraWheelBody);

    // 4 Cardinal Medallions of Rights (Stationary orientation brackets)
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const med = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 16), chakraGold);
      med.position.set(Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0);
      med.rotation.x = Math.PI / 2;
      chakraGroup.add(med);
    }

    const auraDisc = new THREE.Mesh(new THREE.CircleGeometry(2.35, 48), auraMat);
    auraDisc.position.z = -0.05;
    auraDisc.name = 'chakraAura';
    chakraGroup.add(auraDisc);

    chakraGroup.name = 'ashokaChakraModel';
    group.add(chakraGroup);
    group.name = 'ashokaChakraModel';
  }

  // ── 2. THE BALANCE OF EQUALITY ─────────────────────────────────────────────

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

    // 1. Stepped Brass Base
    const baseGroup = new THREE.Group();
    baseGroup.position.set(0, -0.65, 0);

    const baseTier1 = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.25, 0.16, 36), darkBronzeMat);
    baseTier1.receiveShadow = true;
    baseGroup.add(baseTier1);

    const baseTier2 = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.98, 0.14, 36), brassMat);
    baseTier2.position.y = 0.12;
    baseTier2.receiveShadow = true;
    baseGroup.add(baseTier2);

    const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.12, 0.05), brassMat);
    plaque.position.set(0, 0.08, 0.98);
    baseGroup.add(plaque);

    group.add(baseGroup);

    // 2. Classical Fluted Brass Pillar
    const pillarGroup = new THREE.Group();
    pillarGroup.position.set(0, 0.65, 0);

    const pillarShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 2.5, 24), brassMat);
    pillarShaft.castShadow = true;
    pillarGroup.add(pillarShaft);

    const capital = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.16, 0.26, 16), brassMat);
    capital.position.y = 1.28;
    pillarGroup.add(capital);

    group.add(pillarGroup);

    // 3. Calibrated Equilibrium Gauge
    const gaugeGroup = new THREE.Group();
    gaugeGroup.position.set(0, 1.55, 0.15);

    const gaugePlate = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.28, 0.04), gaugeMat);
    gaugeGroup.add(gaugePlate);

    const centerMarker = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.05), brassMat);
    centerMarker.position.set(0, 0, 0.02);
    gaugeGroup.add(centerMarker);

    const leftMarker = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.1, 0.05), darkBronzeMat);
    leftMarker.position.set(-0.32, 0, 0.02);
    gaugeGroup.add(leftMarker);

    const rightMarker = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.1, 0.05), darkBronzeMat);
    rightMarker.position.set(0.32, 0, 0.02);
    gaugeGroup.add(rightMarker);

    group.add(gaugeGroup);

    // 4. Arched Crossbeam Assembly
    const beamGroup = new THREE.Group();
    beamGroup.position.set(0, 1.95, 0);

    const beamBar = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.12, 0.14), brassMat);
    beamBar.castShadow = true;
    beamGroup.add(beamBar);

    const needle = new THREE.Mesh(new THREE.ConeGeometry(0.026, 0.52, 8), brassMat);
    needle.position.set(0, -0.28, 0.16);
    needle.rotation.z = Math.PI;
    beamGroup.add(needle);

    const centerDiamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.36, 0), diamondMat);
    centerDiamond.name = 'equalityDiamond';
    centerDiamond.position.y = 0.22;
    beamGroup.add(centerDiamond);

    const diamondLight = new THREE.PointLight(0xfcd34d, 1.2, 3);
    diamondLight.name = 'diamondGlowLight';
    centerDiamond.add(diamondLight);

    // 5. Left Suspension Assembly & Pan
    const leftPanGroup = new THREE.Group();
    leftPanGroup.position.set(-1.72, -1.05, 0);

    for (let i = 0; i < 3; i++) {
      const theta = (i * Math.PI * 2) / 3;
      const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.1, 6), brassMat);
      cord.position.set(Math.cos(theta) * 0.32, 0.48, Math.sin(theta) * 0.32);
      cord.rotation.z = Math.cos(theta) * -0.28;
      cord.rotation.x = Math.sin(theta) * 0.28;
      leftPanGroup.add(cord);
    }

    const leftBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.42, 0.2, 32, 1, false), brassMat);
    leftBowl.castShadow = true;
    leftPanGroup.add(leftBowl);

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

    const tokenR1 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), tokenGoldMat);
    tokenR1.position.set(-0.15, 0.14, 0);
    rightPanGroup.add(tokenR1);

    const tokenR2 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), tokenGoldMat);
    tokenR2.position.set(0.15, 0.14, 0);
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

    const forumTier = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.3, 0.18, 32), tealMat);
    forumTier.position.y = -0.55;
    group.add(forumTier);

    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.28, 3.2, 16), brassMat);
    spire.position.y = 1.1;
    spire.name = 'beaconSpire';
    group.add(spire);

    const lantern = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 1), flameMat);
    lantern.position.y = 2.8;
    group.add(lantern);

    // Dynamic Concentric Soundwave Ripple Rings
    const waveGroup = new THREE.Group();
    waveGroup.position.set(0, 2.8, 0);

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

    const shieldMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 0.4, 2.6, 24, 1, false, 0, Math.PI), shieldCrimson);
    shieldMesh.rotation.y = Math.PI / 2;
    shieldMesh.position.y = 0.85;
    shieldMesh.scale.set(0.65, 1, 1);
    group.add(shieldMesh);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.065, 12, 32, Math.PI), shieldGold);
    rim.position.set(0, 1.05, 0.25);
    group.add(rim);

    const emblem = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 1), shieldGold);
    emblem.position.set(0, 0.95, 0.4);
    group.add(emblem);

    const dome = new THREE.Mesh(new THREE.SphereGeometry(2.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
    dome.position.y = -0.65;
    dome.scale.set(0.001, 0.001, 0.001);
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

    const archBase = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.22, 1.2), stoneMat);
    archBase.position.y = -0.65;
    group.add(archBase);

    const leftCol = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 2.8, 16), stoneMat);
    leftCol.position.set(-1.45, 0.8, 0);
    group.add(leftCol);

    const rightCol = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 2.8, 16), stoneMat);
    rightCol.position.set(1.45, 0.8, 0);
    group.add(rightCol);

    const pediment = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.35, 0.65), stoneMat);
    pediment.position.y = 2.3;
    group.add(pediment);

    const leftGateGroup = new THREE.Group();
    leftGateGroup.position.set(-1.45, 0.8, 0);
    const leftGateBars = new THREE.Mesh(new THREE.BoxGeometry(1.25, 2.4, 0.06), brassGateMat);
    leftGateBars.position.x = 0.62;
    leftGateGroup.add(leftGateBars);
    leftGateGroup.name = 'leftSchoolGate';
    group.add(leftGateGroup);

    const rightGateGroup = new THREE.Group();
    rightGateGroup.position.set(1.45, 0.8, 0);
    const rightGateBars = new THREE.Mesh(new THREE.BoxGeometry(1.25, 2.4, 0.06), brassGateMat);
    rightGateBars.position.x = -0.62;
    rightGateGroup.add(rightGateBars);
    rightGateGroup.name = 'rightSchoolGate';
    group.add(rightGateGroup);

    const scrollMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 0.04), parchmentMat);
    scrollMesh.position.set(0, 0.8, 0.45);
    scrollMesh.scale.set(1, 0.01, 1);
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

    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.35, 2.2, 6), navyMarbleMat);
    pillar.position.y = 0.45;
    group.add(pillar);

    const apexCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.52, 1), crystalMat);
    apexCrystal.position.y = 2.15;
    apexCrystal.name = 'apexCrystal';
    group.add(apexCrystal);

    const crystalRaysGroup = new THREE.Group();
    crystalRaysGroup.position.set(0, 2.15, 0);

    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const prism = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.65, 5), crystalMat);
      prism.position.set(Math.cos(angle) * 1.5, -0.65, Math.sin(angle) * 1.5);
      group.add(prism);

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
        this.targetScaleTilt = 0;
        this.setMitraEmotion('celebrating');
        break;
      case 'scale-unbalanced':
        this.targetScaleTilt = -0.32;
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
        this.targetGateAngle = 1.57;
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

  // ── WEBXR AUGMENTED REALITY (REAL CLASSROOM WALL PLACEMENT) ───────────────

  async startArSession() {
    if (!navigator.xr) {
      throw new Error('WebXR is not supported on this device/browser.');
    }

    const sessionInit = {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['dom-overlay', 'light-estimation', 'anchors', 'local-floor'],
    };

    const session = await navigator.xr.requestSession('immersive-ar', sessionInit);
    this.currentSession = session;
    this.isArActive = true;
    this.isPlacedInAr = false;
    this.isWallDetected = false;

    await this.renderer.xr.setSession(session);

    // In Real AR mode, hide the virtual 3D classroom (desk, blackboard, walls) so real physical classroom wall shines through
    if (this.classroomGroup) this.classroomGroup.visible = false;
    if (this.particlesGroup) this.particlesGroup.visible = false;

    this.mainStageGroup.visible = false;
    this.mitraGroup.scale.set(0.24, 0.24, 0.24);
    this.mitraGroup.visible = false;

    if (this.onPlacementStatus) {
      this.onPlacementStatus('Point phone camera at classroom wall surface to detect vertical plane.');
    }

    // Try requesting local-floor reference space, falling back to local
    let refSpace;
    try {
      refSpace = await session.requestReferenceSpace('local-floor');
    } catch {
      refSpace = await session.requestReferenceSpace('local');
    }

    const viewerSpace = await session.requestReferenceSpace('viewer');
    this.hitTestSource = await session.requestHitTestSource({ space: viewerSpace });

    // Handle tracking state / visibility change
    session.addEventListener('visibilitychange', () => {
      if (session.visibilityState === 'visible-blurred' || session.visibilityState === 'hidden') {
        if (this.onPlacementStatus) {
          this.onPlacementStatus('Tracking paused. Hold device steady to resume.');
        }
      }
    });

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
      // Strictly enforce vertical wall detection (reject floors, tables, ceilings)
      if (!this.isWallDetected) {
        if (this.onPlacementStatus) {
          this.onPlacementStatus('Cannot mount on floor or table. Please aim at a vertical classroom wall.');
        }
        return;
      }

      const m = this.reticle.matrix.elements;
      const pos = new THREE.Vector3(m[12], m[13], m[14]);

      // WebXR hit test normal: column 1 (+Y) is the surface normal pointing outward
      const normal = new THREE.Vector3(m[4], m[5], m[6]).normalize();
      const worldUp = new THREE.Vector3(0, 1, 0);

      // Construct orthonormal basis where +Z points out along normal and +Y points upright
      const right = new THREE.Vector3().crossVectors(worldUp, normal).normalize();
      const wallUp = new THREE.Vector3().crossVectors(normal, right).normalize();

      const rotMatrix = new THREE.Matrix4().makeBasis(right, wallUp, normal);
      const wallQuat = new THREE.Quaternion().setFromRotationMatrix(rotMatrix);

      this.placedAnchorPosition.copy(pos);
      this.placedAnchorQuaternion.copy(wallQuat);

      // Mount exhibit flush against detected vertical wall surface
      this.mainStageGroup.position.copy(pos);
      this.mainStageGroup.quaternion.copy(wallQuat);
      this.mainStageGroup.scale.set(1, 1, 1);
      this.mainStageGroup.visible = true;

      // Position Mitra alongside the wall exhibit on the right
      const mitraPos = pos.clone().addScaledVector(right, 0.42).addScaledVector(wallUp, -0.12);
      this.mitraGroup.position.copy(mitraPos);
      this.mitraGroup.quaternion.copy(wallQuat);
      this.mitraGroup.scale.set(0.24, 0.24, 0.24);
      this.mitraGroup.visible = true;

      this.isPlacedInAr = true;
      this.reticle.visible = false;

      // Apply AR physical metric scale
      this.applyExhibitTransform();

      if (this.onPlacementStatus) {
        this.onPlacementStatus('Constitutional exhibit mounted flush to wall! Use controls or walk around to inspect.');
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
          const m = pose.transform.matrix;
          // In WebXR hit testing, column 1 (index 5) is the Y component of surface normal (+Y)
          const normalY = m[5];
          const isVerticalWall = Math.abs(normalY) <= 0.45;
          this.isWallDetected = isVerticalWall;

          this.reticle.visible = true;
          this.reticle.matrix.fromArray(m);

          if (isVerticalWall) {
            this.setReticleState('valid');
            if (this.onPlacementStatus) {
              this.onPlacementStatus('Vertical wall surface detected! Tap to mount exhibit.');
            }
          } else {
            this.setReticleState('invalid');
            if (this.onPlacementStatus) {
              this.onPlacementStatus('Horizontal surface detected (floor/desk). Aim camera at a vertical classroom wall.');
            }
          }

          if (this.onTransformChange) {
            this.onTransformChange(this.getExhibitTransformState());
          }
        }
      } else if (this.reticle) {
        this.reticle.visible = false;
        this.isWallDetected = false;
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
    this.isWallDetected = false;
    this.hitTestSource = null;

    // Restore virtual classroom wall environment
    if (this.classroomGroup) this.classroomGroup.visible = true;
    if (this.particlesGroup) this.particlesGroup.visible = true;

    this.mainStageGroup.position.set(0, 1.05, -2.18);
    this.mainStageGroup.rotation.set(0, 0, 0);
    this.mainStageGroup.scale.set(1, 1, 1);
    this.mainStageGroup.visible = true;

    this.mitraGroup.position.set(1.08, 0.72, -2.05);
    this.mitraGroup.rotation.set(0, -0.38, 0);
    this.mitraGroup.scale.set(0.42, 0.42, 0.42);
    this.mitraGroup.visible = true;

    if (this.reticle) this.reticle.visible = false;

    // Reapply 3D studio scale and rotation for active station
    this.applyExhibitTransform();
  }

  // ── UNIVERSAL OBJECT TRANSFORM ARCHITECTURE ───────────────────────────────

  applyExhibitTransform() {
    const stationId = this.activeStationId || 'ashoka-chakra';
    const config = this.getStationConfig(stationId);
    const state = this.stationStates[stationId] || { rotationY: 0, zoomFactor: 1.0 };

    if (this.activeExhibitRoot) {
      this.activeExhibitRoot.rotation.y = state.rotationY;

      if (this.isArActive && this.isPlacedInAr) {
        // Mode A: WebXR AR - Calibrated physical metric scale (~35-45 cm physical size * zoomFactor)
        const scaleMetric = config.baseScaleAr * state.zoomFactor;
        this.activeExhibitRoot.scale.set(scaleMetric, scaleMetric, scaleMetric);
      } else {
        // Mode B: 3D Studio - Calibrated hero apparent scale (~58-62 cm apparent size * zoomFactor)
        const scale3D = config.baseScale3D * state.zoomFactor;
        this.activeExhibitRoot.scale.set(scale3D, scale3D, scale3D);
      }
    }

    if (this.onTransformChange) {
      this.onTransformChange(this.getExhibitTransformState());
    }
  }

  rotateExhibit(deltaAngle = 0.25) {
    const stationId = this.activeStationId || 'ashoka-chakra';
    if (!this.stationStates[stationId]) {
      this.stationStates[stationId] = { rotationY: 0, zoomFactor: 1.0 };
    }
    this.stationStates[stationId].rotationY += deltaAngle;
    this.applyExhibitTransform();
  }

  zoomExhibit(deltaZoom = 0.12) {
    const stationId = this.activeStationId || 'ashoka-chakra';
    const config = this.getStationConfig(stationId);
    if (!this.stationStates[stationId]) {
      this.stationStates[stationId] = { rotationY: 0, zoomFactor: 1.0 };
    }
    const current = this.stationStates[stationId].zoomFactor;
    const next = Math.max(config.minZoomFactor, Math.min(config.maxZoomFactor, current + deltaZoom));
    this.stationStates[stationId].zoomFactor = next;
    this.applyExhibitTransform();
  }

  resetExhibitTransform() {
    const stationId = this.activeStationId || 'ashoka-chakra';
    const config = this.getStationConfig(stationId);
    if (this.stationStates[stationId]) {
      this.stationStates[stationId].rotationY = config.defaultRotationY;
      this.stationStates[stationId].zoomFactor = 1.0;
    }
    this.rotationVelocity = { x: 0, y: 0 };
    this.desiredCameraYaw = 0;
    this.desiredCameraPitch = 0;
    this.desiredCameraDistance = 4.68;
    this.activeFocusObject = null;
    if (!this.isArActive && this.camera) {
      this.camera.position.set(0, 1.05, 2.5);
      this.camera.lookAt(0, 1.05, -2.18);
    }
    this.applyExhibitTransform();
  }

  getExhibitTransformState() {
    const stationId = this.activeStationId || 'ashoka-chakra';
    const config = this.getStationConfig(stationId);
    const state = this.stationStates[stationId] || { rotationY: 0, zoomFactor: 1.0 };
    const rawRot = ((state.rotationY % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);
    const degrees = Math.round(rawRot * (180 / Math.PI));

    return {
      stationId,
      stationTitle: config.title,
      rotationY: state.rotationY,
      rotationDegrees: degrees,
      zoomFactor: state.zoomFactor,
      scalePercent: Math.round(state.zoomFactor * 100),
      apparentSize: `${(config.baseApparentCm * state.zoomFactor).toFixed(1)} cm apparent`,
      physicalMetricSize: `${(config.baseMetricCm * state.zoomFactor).toFixed(1)} ${config.metricUnit}`,
      isArActive: this.isArActive,
      isPlacedInAr: this.isPlacedInAr,
      isWallDetected: this.isWallDetected,
      canPlace: this.isWallDetected && !this.isPlacedInAr,
    };
  }

  repositionExhibit() {
    if (this.isArActive) {
      this.isPlacedInAr = false;
      this.isWallDetected = false;
      this.mainStageGroup.visible = false;
      this.mitraGroup.visible = false;
      if (this.reticle) this.reticle.visible = true;
      if (this.onPlacementStatus) {
        this.onPlacementStatus('Aim phone at a vertical classroom wall surface to remount exhibit.');
      }
      if (this.onTransformChange) {
        this.onTransformChange(this.getExhibitTransformState());
      }
    }
  }

  removeExhibit() {
    this.repositionExhibit();
  }

  // ── UNIVERSAL 3D ANIMATION LOOP ───────────────────────────────────────────

  focusOnObject(key) {
    if (!this.classroomFocalPoints[key]) return;
    this.activeFocusObject = key;
    const fp = this.classroomFocalPoints[key];
    this.desiredCameraTarget.copy(fp.target);
    this.desiredCameraPosition.copy(fp.cameraPos);
    if (key === 'overview') {
      this.desiredCameraYaw = 0;
      this.desiredCameraPitch = 0;
      this.desiredCameraDistance = 4.68;
    }
  }

  resetCameraOverview() {
    this.focusOnObject('overview');
    this.activeFocusObject = null;
    if (this.onInteractivePartClick) {
      this.onInteractivePartClick({
        part: 'overview',
        title: 'Classroom Overview',
        badge: 'Whole Room',
        message: 'Viewing the full constitutional classroom.',
        focalObject: null,
      });
    }
  }

  startAnimationLoop() {
    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);

      if (!this.isArActive) {
        this.updateSpatialAnimations();
        this.updateCameraNavigation();
        this.renderer.render(this.scene, this.camera);
      }
    };

    animate();
  }

  updateCameraNavigation() {
    if (this.isArActive || !this.camera) return;

    if (this.activeFocusObject && this.classroomFocalPoints[this.activeFocusObject]) {
      const fp = this.classroomFocalPoints[this.activeFocusObject];
      this.camera.position.lerp(fp.cameraPos, 0.08);
      this.cameraTarget.lerp(fp.target, 0.08);
      this.camera.lookAt(this.cameraTarget);
    } else {
      // Smooth whole-classroom orbit and zoom navigation
      this.cameraYaw += (this.desiredCameraYaw - this.cameraYaw) * 0.08;
      this.cameraPitch += (this.desiredCameraPitch - this.cameraPitch) * 0.08;
      this.cameraDistance += (this.desiredCameraDistance - this.cameraDistance) * 0.08;

      const target = this.classroomFocalPoints.overview.target;
      const targetX = target.x + Math.sin(this.cameraYaw) * this.cameraDistance;
      const targetY = target.y + Math.sin(this.cameraPitch) * this.cameraDistance * 0.4;
      const targetZ = target.z + Math.cos(this.cameraYaw) * Math.cos(this.cameraPitch) * this.cameraDistance;

      this.desiredCameraPosition.set(targetX, targetY, targetZ);
      this.camera.position.lerp(this.desiredCameraPosition, 0.08);
      this.cameraTarget.lerp(target, 0.08);
      this.camera.lookAt(this.cameraTarget);
    }
  }

  updateSpatialAnimations() {
    const elapsed = this.clock.getElapsedTime();

    // 1. Mitra breathing & tail sway on the corbel shelf
    if (this.mitraGroup) {
      const baseY = this.isArActive ? 0 : 0.72;
      this.mitraGroup.position.y = baseY + Math.sin(elapsed * 2.2) * 0.003;

      const tail = this.mitraGroup.getObjectByName('mitraTail');
      if (tail) {
        tail.rotation.z = Math.sin(elapsed * 3.6) * 0.16;
      }

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

    // 2. Ambient particles
    if (this.particlesGroup && this.particlesGroup.visible) {
      this.particlesGroup.rotation.y = elapsed * 0.02;
    }

    // 3. Equality Balance Scale Animation (Reference Station)
    if (this.currentStationGroup && this.currentStationGroup.name === 'equalityBalanceModel') {
      const beamGroup = this.currentStationGroup.getObjectByName('balanceBeamGroup');
      if (beamGroup) {
        this.scaleTiltAngle += (this.targetScaleTilt - this.scaleTiltAngle) * 0.07;
        beamGroup.rotation.z = this.scaleTiltAngle;

        const leftPan = beamGroup.getObjectByName('leftPanGroup');
        const rightPan = beamGroup.getObjectByName('rightPanGroup');
        if (leftPan) leftPan.rotation.z = -this.scaleTiltAngle;
        if (rightPan) rightPan.rotation.z = -this.scaleTiltAngle;

        const diamondLight = beamGroup.getObjectByName('diamondGlowLight');
        if (diamondLight) {
          if (Math.abs(this.scaleTiltAngle) < 0.05) {
            diamondLight.intensity = 2.0;
          } else {
            diamondLight.intensity = 0.6;
          }
        }
      }
    }

    // 4. Ashoka Chakra Spoke Glow & Automatic Educational Rotation
    if (this.currentStationGroup && this.currentStationGroup.name === 'ashokaChakraModel') {
      const wheelBody = this.currentStationGroup.getObjectByName('chakraWheelBody');
      if (wheelBody) {
        // Continuous dignified automatic educational rotation representing constant civic progress
        wheelBody.rotation.z -= (this.chakraSpinSpeed || 0.003);
      }

      const aura = this.currentStationGroup.getObjectByName('chakraAura');
      if (aura) {
        if (this.activeSpatialEffect === 'chakra-glow-full') {
          aura.material.opacity = 0.45 + Math.sin(elapsed * 3) * 0.15;
        } else {
          aura.material.opacity = 0.22 + Math.sin(elapsed * 1.8) * 0.05;
        }
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

    // 8. Remedies Crystal Rays
    if (this.currentStationGroup && this.currentStationGroup.name === 'remediesCrestModel') {
      const rays = this.currentStationGroup.getObjectByName('remediesCrystalRays');
      if (rays) {
        const targetScale = this.remedyRaysActive ? 1.0 : 0.001;
        rays.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      }
    }
  }

  // ── INTERACTIVE EVENT HANDLERS ────────────────────────────────────────────

  handlePointerDown(e) {
    if (this.isArActive) return;
    this.isDragging = true;
    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  handlePointerMove(e) {
    if (!this.isDragging || this.isArActive) return;
    const deltaX = e.clientX - this.previousMousePosition.x;
    const deltaY = e.clientY - this.previousMousePosition.y;

    // Natural Whole-Classroom Navigation: Orbit camera horizontally and vertically
    this.activeFocusObject = null;
    this.desiredCameraYaw = Math.max(-0.65, Math.min(0.65, this.desiredCameraYaw - deltaX * 0.0035));
    this.desiredCameraPitch = Math.max(-0.30, Math.min(0.35, this.desiredCameraPitch + deltaY * 0.0025));

    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  handlePointerUp() {
    this.isDragging = false;
  }

  handleTouchStart(e) {
    if (this.isArActive) return;
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      this.initialPinchDistance = Math.hypot(dx, dy);
    } else if (e.touches.length === 1) {
      this.isDragging = true;
      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }

  handleTouchMove(e) {
    if (this.isArActive) return;
    if (e.touches.length === 2 && this.initialPinchDistance) {
      if (e.cancelable) e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentPinchDistance = Math.hypot(dx, dy);
      const pinchDelta = (this.initialPinchDistance - currentPinchDistance) * 0.008;
      this.activeFocusObject = null;
      this.desiredCameraDistance = Math.max(1.5, Math.min(5.2, this.desiredCameraDistance + pinchDelta));
      this.initialPinchDistance = currentPinchDistance;
    } else if (e.touches.length === 1 && this.isDragging) {
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;
      this.activeFocusObject = null;
      this.desiredCameraYaw = Math.max(-0.65, Math.min(0.65, this.desiredCameraYaw - deltaX * 0.0035));
      this.desiredCameraPitch = Math.max(-0.30, Math.min(0.35, this.desiredCameraPitch + deltaY * 0.0025));
      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }

  handleTouchEnd(e) {
    if (e.touches.length < 2) {
      this.initialPinchDistance = null;
    }
    if (e.touches.length === 0) {
      this.isDragging = false;
    }
  }

  handleWheel(e) {
    if (this.isArActive) return;
    if (e.cancelable) e.preventDefault();
    // Whole-Classroom Camera Zoom: moves entire camera smoothly closer or farther
    const delta = e.deltaY < 0 ? -0.32 : 0.32;
    this.activeFocusObject = null;
    this.desiredCameraDistance = Math.max(1.5, Math.min(5.2, this.desiredCameraDistance + delta));
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

      // 1. Check if user tapped Mitra or perch
      let checkMitra = hitObj;
      while (checkMitra) {
        if (checkMitra === this.mitraGroup || checkMitra === this.corbelShelfGroup) {
          this.focusOnObject('mitra');
          this.setMitraEmotion('celebrating');
          if (this.onInteractivePartClick) {
            this.onInteractivePartClick({
              part: 'mitra',
              title: 'Mitra the Sun-Fox',
              badge: 'Learning Companion',
              message: '“I’m Mitra! Tap any object in our classroom to inspect it, or drag and scroll around to explore.”',
              focalObject: 'mitra',
            });
          }
          return;
        }
        checkMitra = checkMitra.parent;
      }

      // 2. Check if user tapped the Teacher's Blackboard
      let checkBoard = hitObj;
      while (checkBoard) {
        if (checkBoard === this.blackboardMesh || checkBoard.name === 'blackboardMesh') {
          this.focusOnObject('blackboard');
          this.setMitraEmotion('encouraging');
          if (this.onInteractivePartClick) {
            this.onInteractivePartClick({
              part: 'blackboard',
              title: 'Teacher’s Blackboard',
              badge: 'Lesson Topic',
              message: 'Classroom Topic: Inspect the wall exhibit, resolve the constitutional dilemma, and test your civic understanding.',
              focalObject: 'blackboard',
            });
          }
          return;
        }
        checkBoard = checkBoard.parent;
      }

      // 3. Check if user tapped the Constitution Preamble Charter
      let checkCharter = hitObj;
      while (checkCharter) {
        if (checkCharter === this.charterMesh || checkCharter.name === 'charterMesh') {
          this.focusOnObject('charter');
          this.setMitraEmotion('welcome');
          if (this.onInteractivePartClick) {
            this.onInteractivePartClick({
              part: 'charter',
              title: 'The Constitution Charter',
              badge: 'Preamble Bedrock',
              message: '“WE, THE PEOPLE OF INDIA — Justice, Liberty, Equality, Fraternity.” The fundamental foundation of citizen dignity.',
              focalObject: 'charter',
            });
          }
          return;
        }
        checkCharter = checkCharter.parent;
      }

      // 4. Check if user tapped the Student Desk or Civics Workbook
      let checkDesk = hitObj;
      while (checkDesk) {
        if (checkDesk === this.deskGroup || checkDesk === this.workbookMesh || checkDesk.name === 'studentWorkbookMesh') {
          this.focusOnObject('desk');
          this.setMitraEmotion('encouraging');
          if (this.onInteractivePartClick) {
            this.onInteractivePartClick({
              part: 'desk',
              title: 'Student Desk & Civics Journal',
              badge: 'Learner Workbook',
              message: 'Your personal RightsQuest study desk. Deliberate on real constitutional scenarios and earn Dignity XP.',
              focalObject: 'desk',
            });
          }
          return;
        }
        checkDesk = checkDesk.parent;
      }

      // 5. Check if user tapped active model interactive parts (e.g. Equality Balance pans)
      let checkModel = hitObj;
      while (checkModel && checkModel.parent !== this.mainStageGroup && checkModel.parent !== this.scene) {
        if (checkModel.name === 'leftPanGroup' || checkModel.name === 'rightPanGroup') {
          const nextTilt = this.targetScaleTilt === 0 ? -0.32 : 0;
          this.triggerSpatialEffect(nextTilt === 0 ? 'scale-balanced' : 'scale-unbalanced');
          if (this.onInteractivePartClick) {
            this.onInteractivePartClick({
              part: 'balance-pan',
              tilt: nextTilt,
              message:
                nextTilt === 0
                  ? 'Equilibrium restored! Article 14 ensures equal opportunity.'
                  : 'Notice how the scale tilts lopsided when opportunities are unequal.',
            });
          }
          return;
        }
        checkModel = checkModel.parent;
      }

      // 6. Check if user tapped the Central Constitutional Wall Exhibit
      let checkExhibit = hitObj;
      while (checkExhibit) {
        if (checkExhibit === this.activeExhibitRoot || checkExhibit === this.mainStageGroup) {
          this.focusOnObject('exhibit');
          const config = this.getStationConfig(this.activeStationId || 'ashoka-chakra');
          if (this.onInteractivePartClick) {
            this.onInteractivePartClick({
              part: 'exhibit',
              title: config.title,
              badge: 'Constitutional Artifact',
              message: `Inspecting ${config.title}. Mounted on the classroom wall for constitutional inquiry.`,
              focalObject: 'exhibit',
            });
          }
          return;
        }
        checkExhibit = checkExhibit.parent;
      }

      if (hitObj.userData && hitObj.userData.id && this.onObjectClick) {
        this.onObjectClick(hitObj.userData);
        return;
      }
    }

    // If user tapped empty space or background while inspecting an object, smoothly return to overview
    if (this.activeFocusObject && this.activeFocusObject !== 'overview') {
      this.resetCameraOverview();
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

  // ── DISPOSAL ──────────────────────────────────────────────────────────────

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
    this.canvas.removeEventListener('touchstart', this.handleTouchStart);
    this.canvas.removeEventListener('touchmove', this.handleTouchMove);
    this.canvas.removeEventListener('touchend', this.handleTouchEnd);
    this.canvas.removeEventListener('wheel', this.handleWheel);
    this.canvas.removeEventListener('click', this.handleCanvasClick);
    window.removeEventListener('resize', this.handleResize);

    if (this.blackboardTexture) {
      this.blackboardTexture.dispose();
    }

    if (this.charterTexture) {
      this.charterTexture.dispose();
    }

    if (this.plaqueTexture) {
      this.plaqueTexture.dispose();
    }

    if (this.reticleValidMat) {
      this.reticleValidMat.dispose();
    }

    if (this.reticleInvalidMat) {
      this.reticleInvalidMat.dispose();
    }

    if (this.scene) {
      this.disposeObject(this.scene);
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
  }
}
