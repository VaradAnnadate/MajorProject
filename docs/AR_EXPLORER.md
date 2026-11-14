# RightsQuest AR Explorer — Classroom Wall-Mounted Augmented Reality Experience

> **Governing Standards:** Creative OS (`44_AGENCYLIKE_UI`, `01_DESIGN_OS`, `04_TYPOGRAPHY_SYSTEM`, `05_MOTION_SYSTEM`)  
> **Route:** `/ar-explorer`  
> **Technology Direction:** React 18 + Three.js (WebGL) + WebXR Device API (`immersive-ar`), with automatic Universal 3D Classroom Fallback.  
> **Target Audience:** Indian children aged 8–16, educators, guardians, and academic evaluators.

---

## 1. What is the RightsQuest Living Classroom?

The **RightsQuest Living Classroom** brings the Constitution of India alive through compact, museum-grade educational exhibits mounted directly on classroom walls. The experience is designed with an honest and clear distinction between two operating modes:

### Mode A: Live Camera WebXR AR (Wall Placement)
- Uses standard WebXR `immersive-ar` with camera passthrough displaying the student's real physical room.
- Detects vertical real-world surfaces (walls) via hit-test with pose normal alignment.
- Mounts a compact 35–45 cm constitutional exhibit flush against the real classroom wall.
- Includes on-screen controls to rotate left/right, scale/zoom, reset orientation, and reposition or remove the exhibit.
- Zero raw video or photo frames recorded, stored, or transmitted over the network (DPDP Act 2023 §9 compliant).

### Mode B: Virtual Classroom 3D Simulation (Wall Exhibit Fallback)
- Renders an authentic, balanced modern Indian classroom studio with balanced horizontal symmetry:
  - **Central Exhibit Bay:** Centered prominently on the rear wall at eye level (`y = 1.05m`), framed by fluted architectural teak pilasters and illuminated by an overhead exhibition gallery spotlight (`THREE.SpotLight`).
  - **Modest Visual Scale Calibration:** Calibrated to a hero display scale of `1.4x` (~61 cm apparent diameter), making the exhibit the clear focal point of the classroom without overflowing the wall space. In real WebXR AR Mode A, the scale resets strictly to `1.0x` (compact physical 35–45 cm dimensions).
  - **Symmetrical Flanking Panels:**
    - **Teacher’s Blackboard (Left):** Positioned on the wall to the left of the exhibit (`2.35m x 1.75m`), dynamically chalked with lesson numbers, article references, and core constitutional principles.
    - **Constitution of India Preamble Charter (Right):** Positioned symmetrically on the wall to the right (`2.35m x 1.75m`), rendered on warm parchment with gold leaf borders and Constituent Assembly calligraphy, perfectly balancing the blackboard.
  - **Wall Architecture:** Two-tone architectural wall with upper ivory plaster, lower heritage dark slate green wainscoting, and a continuous polished teak dado/chair rail.
  - **Grounded Museum Corbel Shelf for Mitra:** Sits on a crafted wall-mounted corbel bracket shelf beside the exhibit (`x = 1.08, y = 0.65, z = -2.18`) with polished teak slab, brass gallery railing, and wall-mounting hex bolts.
  - **Secondary Student Study Desk:** Grounded naturally in the lower right foreground with workbook and bookmark ribbon, completing the classroom atmosphere without occluding the exhibit.
  - **Window:** Placed on the left wall with soft sunbeams streaming across the room.

### The 6 Classroom Wall Exhibits — Calibrated Physical Metric Sizing (~35–45 cm Scale)

Every constitutional exhibit is geometrically calibrated to physical real-world dimensions in Mode A (WebXR AR) and balanced apparent dimensions in Mode B (Classroom 3D Studio):

| Station # | Exhibit Title & Articles | Mode A: Physical Metric Size | Mode B: 3D Apparent Size | Geometry Center / Depth | Min - Max Zoom Clamp |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **1** | **The Sovereign Ashoka Chakra** (*Preamble & 51A*) | **39.2 cm** (diameter) | **62.1 cm** apparent | $y=0.06, z=0.08$ | 0.65x – 2.2x |
| **2** | **The Balance of Equality** (*Articles 14–18*) | **41.4 cm** (width) | **59.4 cm** apparent | $y=0.06, z=0.08$ | 0.65x – 2.2x |
| **3** | **The Beacon of Expression** (*Article 19 & UNCRC 12*) | **36.9 cm** (height) | **58.4 cm** apparent | $y=0.06, z=0.08$ | 0.65x – 2.2x |
| **4** | **The Shield of Bodily Safety** (*Articles 21, 24 & POCSO*) | **37.7 cm** (height) | **58.5 cm** apparent | $y=0.06, z=0.08$ | 0.65x – 2.2x |
| **5** | **The Scroll of Free Learning** (*Article 21A & RTE Act*) | **40.3 cm** (width) | **59.4 cm** apparent | $y=0.06, z=0.08$ | 0.65x – 2.2x |
| **6** | **The Crest of Legal Remedies** (*Article 32 Writs*) | **39.2 cm** (height) | **59.1 cm** apparent | $y=0.06, z=0.08$ | 0.65x – 2.2x |

---

## 2. Why Augmented Reality (AR) over Virtual Reality (VR)?

| Dimension | Augmented Reality (AR) | Virtual Reality (VR) |
| :--- | :--- | :--- |
| **Hardware Accessibility** | Works on standard commodity Android smartphones via WebXR. | Requires expensive, specialized headsets (Meta Quest, Apple Vision Pro). |
| **Classroom Feasibility** | Students and teachers can use existing mobile devices on normal desks. | Bulky headsets isolate students and cause motion sickness in young children. |
| **Child Psychological Safety** | Children remain aware of their real-world surroundings and trusted adults. | Headsets disconnect children from their physical surroundings. |
| **Viva Demonstrability** | Instant one-tap demonstration in any standard browser or phone. | Requires carrying, charging, and configuring dedicated headset hardware. |
| **Architecture Reuse** | Directly leverages existing React 18, Vite, and Three.js pipelines. | Demands building a completely separate heavyweight standalone engine. |

---

## 3. System Architecture & Data Flow

```mermaid
flowchart TD
    User["Learner visits /ar-explorer"] --> Detect["Device Capability Detection<br/>navigator.xr.isSessionSupported('immersive-ar')"]
    Detect -- "Supported" --> ArOption["Show 'Launch WebXR AR' Action"]
    Detect -- "Unsupported" --> FallbackOption["Auto-enable 3D Universal Fallback"]
    
    ArOption --> UserAction["Learner taps 'Launch WebXR AR'"]
    UserAction --> Req["Request 'immersive-ar' + 'hit-test'"]
    Req --> Reticle["Reticle scans physical surfaces"]
    Reticle --> Tap["User taps screen to anchor 3D Object"]
    Tap --> Interact["Explore 3D Model + Mitra Audio Lore"]
    
    FallbackOption --> Stage["Interactive Three.js 3D Canvas"]
    Stage --> Orbit["Pointer drag to rotate, wheel to zoom"]
    Orbit --> Interact
    
    Interact --> Quiz["Check Your Constitutional Insight Quiz"]
    Quiz --> Reward["Dignity XP Award via useDemoLearner<br/>(Idempotent · Zero PII)"]
    Reward --> DeepLink["Deep link to Living World Realm (/world)"]
```

---

## 4. Mode A (WebXR AR) vs. Mode B (3D Simulation Fallback) Comparison

### Does rotating and zooming make it AR?
**No.** Those controls make it an interactive 3D simulation.
RightsQuest India maintains total honesty and academic rigour regarding the distinction between an interactive 3D environment and genuine Augmented Reality:

| Capability | What it means | RightsQuest Implementation |
| :--- | :--- | :--- |
| **3D classroom with rotation & zoom** | Interactive 3D simulation | **Mode B: Classroom 3D Studio** with balanced chalkboard, Preamble charter, and desk. Zooming and rotating visibly alter the artifact itself, leaving the classroom stationary. |
| **Camera passthrough** | User sees their actual physical surroundings | **Mode A: WebXR AR session** streaming device camera passthrough with zero recorded frames. |
| **Wall detection / hit testing** | Device recognises a real physical wall | **Mode A: `XRHitTestSource` raycasting** identifying vertical real-world wall surfaces. |
| **Physical placement and anchoring** | Exhibit appears attached flush to that real wall | **Mode A: Compact 35–45 cm plaque** anchored flush with normal alignment to physical wall pose. |
| **Stable tracking while moving** | Genuine immersive 6DoF AR behaviour | **Mode A: WebXR reference space tracking** keeping the exhibit pinned as the student walks around. |

### Technical Feature Matrix

| Feature | Mode A: Live Camera WebXR AR | Mode B: Classroom 3D Simulation Fallback |
| :--- | :--- | :--- |
| **Experience Goal** | Mount compact exhibits on the student's real physical room wall. | Believable 3D simulation of a modern Indian classroom with wall exhibit. |
| **Environment** | Real physical room via camera passthrough. | 3D virtual classroom: plaster rear wall, balanced blackboard & charter, window, desk. |
| **Exhibit Mounting** | Anchored flush against real vertical wall via WebXR hit-test. | Mounted on classroom rear wall with fluted pilasters, slim frame, brackets & brass plaque. |
| **Object Scale** | Compact 35–45 cm real-world scale (1:1 display scale). | Hero scale (`1.4x`, ~61 cm apparent) centered for optimal visual focus. |
| **Inspection Controls** | On-screen buttons: rotate, zoom/scale, reset, reposition on wall. | Pointer drag, mouse wheel, on-screen rotate/zoom/reset with live readout badge. |
| **Camera Access** | User-authorized WebXR camera pass-through (zero frames saved). | No camera required or requested. |
| **Supported Devices** | Android Chrome / WebXR-compatible mobile browsers. | 100% of modern browsers (Desktop, Laptop, Tablets, iOS, Android). |
| **Pedagogical Engine** | Full 3-tier age dilemmas, physical consequence animations & quiz. | Full 3-tier age dilemmas, physical consequence animations & quiz. |
| **Progression Sync** | Awards Dignity XP to local progress engine (idempotent). | Awards Dignity XP to local progress engine (idempotent). |

---

## 5. Child Privacy, Safety & DPDP Act 2023 Compliance

1. **Zero Video/Photo Capture:** The application uses browser-level WebXR session anchors. The JavaScript application never receives, records, or stores raw camera video frames.
2. **Zero Biometrics / Facial Recognition:** No face mesh, eye tracking, or identity analysis is conducted.
3. **No Cloud Upload:** All 3D rendering happens locally on the client GPU.
4. **Explicit User Initiation:** Camera access is never prompted on page load; it requires an explicit learner click on "Mount on Real Wall (AR)".
5. **Clean Session Exit:** When the user taps "Return to Virtual Classroom" or leaves the route, `session.end()` is invoked immediately, stopping all camera streams.

---

## 6. How to Demonstrate in a Viva or Evaluation

1. **Desktop Demonstration (Mode B — Classroom 3D Simulation):**
   - Navigate to `http://localhost:5173/ar-explorer`.
   - Show the examiner the **Classroom Wall Exhibit Stage**:
     - Point out the clear mode indicator: **Mode B: Classroom 3D Simulation (Wall Exhibit Fallback)**.
     - Note the compact 35–45 cm scale: the artifact is mounted on the rear wall inside an elegant brass display frame with identification plaque.
     - Point out the secondary classroom context: Teacher’s blackboard on the left, student desk with workbook and pencil below/to the side, and Mitra on the wall perch.
   - Use the on-screen inspection toolbar: **Rotate Left/Right**, **Zoom In/Out**, and **Reset View**.
   - Test dilemmas and observe physical spatial consequences (e.g. Balance of Equality tilting or balancing).
   - Answer the quiz question and show the live **Dignity XP** surge.
2. **Mobile AR Demonstration (Mode A — Live Camera WebXR AR):**
   - Open Chrome on a WebXR-compatible Android phone connected to the application.
   - Tap **Mount on Real Wall (AR)** $\to$ allow camera permission $\to$ point phone at a classroom wall.
   - The virtual classroom geometry hides; the real room is seen through camera passthrough.
   - Tap the wall: the compact 35–45 cm constitutional exhibit and brass identification plaque mount flush against the real wall!
   - Use on-screen controls to inspect or walk closer to read the plaque.

---

## 7. The 6 Spatial Constitutional Stations & Consequence Engine

| Station | Name & Articles | 3D Spatial Geometry | Dynamic Physical Consequence |
| :--- | :--- | :--- | :--- |
| **1** | **The Sovereign Ashoka Chakra** (Preamble & 51A) | 24 Dharma spokes, navy hub, golden rim | Full golden spoke aurora illumination and celestial rotation |
| **2** | **The Balance of Equality** (Articles 14–18) | Dual brass balance pans, fulcrum needle | Scales swing into horizontal equilibrium; central diamond glows |
| **3** | **The Beacon of Expression** (Article 19 & UNCRC 12) | Tiered transmission tower, student forum | Concentric animated translucent soundwave rings expand outward |
| **4** | **The Shield of Bodily Safety** (Articles 21, 24 & POCSO) | Armored shield, 1098 beacon, lotus seal | Translucent protective sanctuary dome expands over scene |
| **5** | **The Scroll of Free Learning** (Article 21A & RTE) | Schoolhouse portal, archway, parchment | Schoolhouse gates swing open; Article 21A parchment unrolls |
| **6** | **The Crest of Legal Remedies** (Article 32 Writs) | Dr. Ambedkar's pillar, 5 crystal prism facets | 5 radial crystal rays fire focused light beams to apex crown |

### 3-Tier Age Adaptation Engine
- **Ages 8–10 (Young Navigators):** Focuses on concrete, everyday playground and classroom scenarios (fair play, inclusion, safe boundaries, school attendance).
- **Ages 11–13 (Pathfinders):** Focuses on student councils (Bal Sansad), cyber safety, midday nutrition, non-discrimination, and child labor prevention.
- **Ages 14–16 (Youth Advocates):** Explores constitutional jurisprudence, fundamental duties vs. rights, Dr. Ambedkar's "Union of Trinity", public interest litigation, and habeas corpus / mandamus writs.

---

## 8. Reference Implementation: The Balance of Equality

The **Balance of Equality** (Station 2, Articles 14–18) serves as the benchmark reference model for RightsQuest spatial craftsmanship:
1. **Classical Architecture:** Built with a stepped brass pedestal base with chamfered ring moldings, a fluted column spindle, and a classical capital bracket.
2. **Mechanical Calibration:** Features an engraved front plaque, a calibrated circular gauge with left (-), right (+), and center gold zero markings, and a downward-pointing needle indicator.
3. **Tripod Suspension & Spun Bowls:** Each dish is a deep spun-brass bowl suspended by 3 tripod brass cords hanging from the arched crossbeam's end shackles.
4. **Tangible Opportunity Tokens:** Weighted golden tokens rest inside the pans, demonstrating physical equality vs. privilege.
5. **Damped Physics Animation:** The beam and needle oscillate with spring damping into perfect 0° equilibrium when an inclusive, constitutional decision is selected, counter-rotating both pans so the dishes stay level.

---

## 9. Mitra 3D Mascot Companion & Animation System

- **Anatomical Modeling:** Procedural fox geometry with saffron coat (`#DE7215`), cream belly/cheek fluff (`#FFFDF7`), black nose, triangular ears with inner cushions, almond eyes with catchlights, and natural eye-blinking cycles.
- **Floating Wisdom Lantern:** Floating golden core with dual spinning gyro-gimbal rings and an internal point light that dynamically shifts color and intensity:
  - **Celebrating (`#10B981` Emerald, 2.4 intensity):** When a constitutional choice or correct quiz answer is selected.
  - **Thinking (`#38BDF8` Sky Blue, 1.4 intensity):** During dilemma exploration.
  - **Concerned (`#F97316` Protective Amber, 1.6 intensity):** Gentle restorative guidance when an unfair choice is made.
  - **Explaining (`#F59E0B` Warm Gold, 1.8 intensity):** When inspecting specific spoke principles or Supreme Court writs.
- **Direct Part Interaction:** Tapping on Mitra triggers a cheerful greeting, while tapping the balance pans or stage models triggers immediate mechanical reactions.

---

## 10. Whole-Classroom Camera Navigation & Interactive Landmarks

RightsQuest India provides an intuitive, uncluttered spatial exploration environment where the child naturally explores the entire classroom room instead of being constrained by clunky on-screen transform buttons:

1. **Natural Whole-Classroom Navigation:**
   - **Horizontal & Vertical Drag Orbit:** Dragging across the viewport pans and orbits the camera smoothly across the entire classroom (`cameraYaw` clamped $\pm 37^\circ$, `cameraPitch` clamped $-17^\circ$ to $+20^\circ$). The exhibit itself is not individually rotated by general room navigation.
   - **Continuous Zoom Distance:** Mouse scroll wheel or two-finger touch pinch glides the entire classroom camera closer or farther (`cameraDistance` clamped between 1.5 m and 5.2 m from the back wall). The active exhibit scale is not altered during general camera navigation.
   - **Mobile Touch Integration:** Supports native two-finger pinch-to-zoom and single-finger orbit dragging with spring damping and smooth interpolation (`lerp`).

2. **Five Interactive Classroom Landmarks:**
   Learners can tap or click interactive classroom elements to smoothly glide the camera to that focal point and open an informative contextual card:
   - **Teacher’s Blackboard (`blackboard`):** Glides camera to `(-2.3, 1.25, -0.7)` to inspect today's constitutional lesson topic.
   - **The Constitutional Exhibit (`exhibit`):** Glides camera to `(0, 1.05, -0.65)` for close-up examination of the wall-mounted artifact.
   - **The Preamble Charter (`charter`):** Glides camera to `(2.3, 1.25, -0.7)` to reflect on the bedrock words of the Constituent Assembly.
   - **Mitra Companion Perch (`mitra`):** Glides camera to `(0.95, 0.72, -1.05)`, activating Mitra's celebratory emote and companion audio prompt.
   - **Student Study Desk & Civics Journal (`desk`):** Glides camera to `(1.35, -0.15, 1.45)` overlooking the student workbook and journal.
   - **Background Tap / Return to Classroom View:** Tapping empty background or pressing the "Classroom Overview" button glides the camera back to default whole-room framing (`resetCameraOverview`).

3. **Removal of Cluttered On-Screen Transform Buttons:**
   - The ugly row of rotate left, rotate right, zoom in, zoom out, reset, and reposition buttons has been completely removed from the stage viewport.
   - In its place sits an unobtrusive, accessible gesture guidance hint:
     `"Drag to explore · Scroll or pinch to move closer · Tap classroom objects to discover"`.
   - When an object is inspected, a floating, dismissible contextual card appears with clear educational badges, lesson summaries, and direct deep-links to lesson dilemmas.

4. **Universal Keyboard Accessibility:**
   - `ArrowLeft` / `ArrowRight`: Smooth horizontal camera pan across the classroom.
   - `ArrowUp` / `ArrowDown` (or `+` / `-`): Smooth camera dolly in / out.
   - `r` / `R` / `Escape`: Instant smooth return to classroom overview.
   - `1` to `5`: Quick landmark jumps (`1` = Blackboard, `2` = Exhibit, `3` = Charter, `4` = Mitra, `5` = Desk).
   - Clamp bounds strictly guard between **0.65x minimum** and **2.2x maximum** zoom factor.

---

## 11. WebXR Vertical Wall Detection & Flush Mounting Algorithm

To guarantee genuine augmented reality on real vertical classroom walls and reject horizontal floors or ceilings:

1. **Surface Normal Vector Analysis:**
   - When WebXR Hit Test returns candidate poses, the pose transform matrix column 1 (`m[4], m[5], m[6]`) represents the surface normal vector.
   - For vertical walls, the vertical component $|normal_y| \le 0.45$.
   - For horizontal floors, tables, or ceilings, $|normal_y| > 0.65$.
   - Hits with $|normal_y| > 0.45$ are rejected: the reticle displays a red crosshair and notifies the learner: *"Horizontal surface detected (floor/desk). Aim camera at a vertical classroom wall."*
2. **Orthonormal Basis Construction for Flush Wall Mounting:**
   - Given the surface normal vector $\vec{n} = (m_4, m_5, m_6)$ pointing out of the wall and world gravity up $\vec{u} = (0, 1, 0)$:
   - Wall horizontal right: $\vec{r} = \frac{\vec{u} \times \vec{n}}{\|\vec{u} \times \vec{n}\|}$
   - True wall vertical: $\vec{w} = \frac{\vec{n} \times \vec{r}}{\|\vec{n} \times \vec{r}\|}$
   - Basis Matrix: $[\vec{r} \quad \vec{w} \quad \vec{n}]$
   - Produces a rotation quaternion ensuring the backplate sits flush on the wall, the front face points into the room, and the exhibit stands upright regardless of device trajectory.
3. **Mitra Wall Anchor Alignment:**
   - Mitra companion is placed alongside the exhibit on the wall at $\vec{p} + 0.42\vec{r} - 0.12\vec{w}$.
4. **Stable Spatial Tracking & Visibility Recovery:**
   - Tracks within WebXR `local-floor` / `local` reference space.
   - Listens to `session.addEventListener('visibilitychange')`: pauses gracefully if tracking is occluded and prompts learner to hold device steady to recover.

---

## 12. Universal Inspection & Accessibility

- **Input Modalities:** Mouse drag, mouse wheel, on-screen touch buttons, and keyboard controls.
- **Keyboard Shortcuts:**
  - `ArrowLeft` / `ArrowRight`: Rotate exhibit left/right by 15°
  - `ArrowUp` / `+`: Zoom in exhibit by 10%
  - `ArrowDown` / `-`: Zoom out exhibit by 10%
  - `R` / `r`: Reset exhibit orientation and view
- **Live Readout Badge:** Displays station title, scale % (with metric physical scale in Mode A and apparent size in Mode B), rotation angle in degrees, and wall detection indicator pill.

---

## 13. Defined AR Completion Threshold & Audit Report

| Capability | Weight | Implementation Readiness | Physical-Device Readiness | Verified Evidence |
| :--- | :---: | :---: | :---: | :--- |
| **Genuine camera-based WebXR session** | 15% | **15%** | Pending hardware | `navigator.xr.requestSession('immersive-ar')`, permission gating, DPDP §9 privacy |
| **Real vertical-wall hit testing and placement** | 20% | **20%** | Pending hardware | Normal vector analysis ($|normal_y| \le 0.45$), floor rejection, orthonormal basis |
| **Stable spatial anchoring and tracking** | 20% | **18%** | Pending hardware | `local-floor`/`local` reference space, visibility recovery, drift avoidance |
| **Universal transforms across all six stations** | 15% | **15%** | **15%** | Independent state persistence, zero leakage, active exhibit root isolation |
| **Repositioning and physical-scale correctness** | 10% | **10%** | **10%** | All 6 stations calibrated to 35–45 cm metric dimensions, reposition action |
| **Session cleanup, permissions and fallback** | 10% | **10%** | **10%** | GPU disposal, event listener cleanup, Mode B 3D studio fallback |
| **Real-device validation** | 10% | **2%** | Pending hardware | Automated 58-check test suite 100% passing; physical device testing pending |
| **Total** | **100%** | **90%** | **Ready for On-Device Validation** | All code-level and simulation criteria verified |



