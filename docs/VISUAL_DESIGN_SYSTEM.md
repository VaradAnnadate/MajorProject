# RightsQuest India — Visual GOAT Design System & Motion Architecture

> **Governing Specifications:** Creative OS (`44_AGENCYLIKE_UI`, `01_DESIGN_OS`, `04_TYPOGRAPHY_SYSTEM`, `10_COLOR_SYSTEM`, `05_MOTION_SYSTEM`, `14_DESIGN_ANTI_PATTERNS`)  
> **Aesthetic Philosophy:** Where high-fashion editorial digital craft meets illustrated storybook warmth and child-friendly dignity.

---

## 1. Creative OS Core Module Activation

The visual system is governed directly by `44_AGENCYLIKE_UI` and Creative OS protocols:

```
[PERSUASION SPINE]  →  [SHARED-ELEMENT CONTINUITY]  →  [LUMINANCE OSCILLATION]  →  [MOTIF LOOP CLOSURE]
```

1. **Luminance Oscillation:** The user experience modulates between deep obsidian contemplation (`#070A11`), warm ivory optimism (`#FBF8F3`), and saturated statutory cards without cognitive fatigue.
2. **The Motif Loop:** The **Compass of Justice & Sovereign Talisman** is introduced in the preloader, persists as the hero dossier seal, navigates the dashboard, and anchors the emergency safety footer.
3. **Physical-Skeuomorphic Hybrid:** Replaces generic dashboard cards with physical field notebooks, wax-stamped dossiers, and tactile folder tabs.
4. **Banned Clichés (14_DESIGN_ANTI_PATTERNS):**
   * ❌ No generic SaaS bento-box card farms.
   * ❌ No muddy frosted glassmorphism overlays that impair reading contrast.
   * ❌ No neon crypto gradients.
   * ❌ No condescending cartoonish graphics that alienate 14–16 year olds.

---

## 2. Typography System

The typography architecture balances literary wonder with razor-sharp editorial precision:

| Typeface | Classification | Application Scope | Visual Rationale |
| :--- | :--- | :--- | :--- |
| **`Cormorant Garamond`** | High-Fashion Serif | **Cinematic Intro Preloader (`RightsQuest`)** | High contrast, razor-sharp delicate serifs, aristocratic luxury aesthetic that sets an awe-inspiring first impression. |
| **`Fraunces`** | Editorial Storybook Serif | **Display Titles, Section Headers, Hero Headlines** | Warm, expressive optical sizing with soft organic serifs giving moral weight to children's rights. |
| **`Plus Jakarta Sans`** | Modern Humanist Sans | **Body Copy, Navigation, Form Descriptions** | Open counter-spaces and clean legibility ensuring effortless reading for children across all age bands. |
| **`Space Mono`** | Monospaced Typeface | **Constitutional Articles, Quest IDs, Timers, 1098 Numbers** | Imparts statutory authority, authentic legal tagging, and archival dossier authenticity. |

### Fluid Clamp Equations (`src/styles/tokens.css`):
* **Hero Display:** `clamp(2.5rem, 5.5vw + 1rem, 4.75rem)`
* **Section Title:** `clamp(1.5rem, 2.5vw + 0.3rem, 2.25rem)`
* **Body Copy:** `clamp(0.95rem, 0.3vw + 0.85rem, 1.05rem)`
* **Utility Tag:** `0.75rem`

---

## 3. Curated Indian HSL Color System

Colors are mathematically calibrated in HSL space, drawing inspiration from Indian textiles, natural clays, and the national flag:

```css
:root {
  /* Canvas Ground */
  --color-canvas-primary: #FBF8F3;        /* Warm Ivory Parchment */
  --color-canvas-secondary: #F4EFE6;      /* Soft Linen */
  --color-canvas-dark: #121927;           /* Deep Midnight Obsidian */
  --color-canvas-dark-surface: #1B2438;   /* Indigo Dossier Surface */

  /* Inks */
  --color-ink-primary: #151A26;           /* Charcoal Obsidian Ink */
  --color-ink-secondary: #48536B;         /* Slate Secondary */
  --color-ink-muted: #7A869E;             /* Editorial Metadata */
  --color-ink-inverse: #FBF8F3;           /* Crisp Parchment White */

  /* Sovereign Brand Accents */
  --color-saffron-500: #DE7215;           /* Radiant Saffron / Quest Energy */
  --color-saffron-100: #FDF1E3;           /* Saffron Light Wash */
  --color-terracotta-500: #D04F36;        /* Terracotta Protection / 1098 */
  --color-terracotta-100: #FDEEEA;        /* Terracotta Wash */
  --color-peacock-500: #1B6D80;           /* Indian Peacock Teal / Wisdom */
  --color-peacock-100: #E4F3F6;           /* Peacock Wash */
  --color-forest-500: #297652;            /* Forest Growth / Safety */
  --color-forest-100: #E4F6ED;            /* Forest Wash */
}
```

---

## 4. Laser Beam Effects & Kinetic Animations

### A. Perimeter Traveling Laser Ring (`.laser-beam-card`)
A continuous rotating conic gradient laser beam travels along the perimeter of primary mission cards:

```css
.laser-beam-card::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg 280deg,
    rgba(222, 114, 21, 0.6) 320deg,
    #DE7215 345deg,
    #FFFFFF 355deg,
    transparent 360deg
  );
  animation: laserRotate 4s linear infinite;
  opacity: 0.65;
  transition: opacity 0.35s ease, filter 0.35s ease;
  pointer-events: none;
  z-index: 1;
}

.laser-beam-card:hover::before {
  opacity: 1;
  animation-duration: 2.2s;
  filter: drop-shadow(0 0 8px rgba(222, 114, 21, 0.8));
}
```

### B. Top-Border Photon Laser Beam on All Cards (`.interactive-card`, `.card-story`)
Hovering over any interactive card triggers a high-speed laser streak traveling across the top border:

```css
.interactive-card::before, .card-story::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2.5px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(222, 114, 21, 0.4) 20%,
    #DE7215 45%,
    #FFFFFF 50%,
    #1B6D80 55%,
    rgba(27, 109, 128, 0.4) 80%,
    transparent 100%
  );
  box-shadow: 0 0 12px #DE7215, 0 0 20px #FFFFFF;
  transform: translateX(-100%);
  opacity: 0;
  transition: opacity 0.25s ease;
  z-index: 5;
  pointer-events: none;
}

.interactive-card:hover::before, .card-story:hover::before {
  opacity: 1;
  animation: laserBorderSweep 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}
```

### C. Diagonal Laser Sheen (`.laser-sweep-btn`, `.interactive-card::after`)
A skewed diagonal laser light sheen passes across buttons and cards on hover at a $-22^{\circ}$ angle.

---

## 5. Kinetic Intro Choreography (`IntroPreloader.jsx`)

```
0.0s                  1.0s             1.7s       2.3s                  3.2s
├─────────────────────┼────────────────┼──────────┼─────────────────────┼─────────────────────►
│ OBSIDIAN STILLNESS  │ LETTERS IN     │ HOLD     │ TEXT FADES UP       │ CURVED CURTAIN LIFT
│ #070A11 Ground      │ Cormorant      │ 650ms    │ translateY(-55px)   │ Bottom Arc (-105%)
│ Dark Atmospheric    │ Garamond       │ Presence │ Optical Blur (8px)  │ Landing Page Glides
│ Light Pool          │ 38ms Stagger   │ Weight   │ Dissolve            │ Upwards into View
```

1. **Staggered Letter Reveal:** The letters `R-i-g-h-t-s-Q-u-e-s-t` slide up from an overflow baseline mask, staggered by $38\text{ms}$ per character.
2. **Text Fade-Up Dissolve:** The wordmark glides vertically upward ($\text{translateY}(-55\text{px})$) while dissolving with an $8\text{px}$ optical blur.
3. **Curved Arch Lift:** The canopy lifts vertically (`-105%`) with an elliptical bottom curve (`border-bottom-left-radius: 50% 190px`) and an active cyan/saffron laser streak along the threshold.
4. **Bottom Landing Page Surge:** The main page beneath ascends upward ($\text{translateY}(95\text{px}) \ \text{scale}(0.985) \to \text{translateY}(0\text{px}) \ \text{scale}(1)$) with exposure bloom.

---

## 6. Lenis Smooth Scroll Engine

* Configured in `src/components/layout/AppShell.jsx`.
* Smooth inertia scroll curve: `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` with a `1.15s` duration.
* Touch multiplier set to `1.5` for natural trackpad and touch response.
* Full fallback for `prefers-reduced-motion: reduce`.

---

## 7. Mitra Companion Visual System (`src/styles/mascot.css`)

Mitra the Sun-Fox is engineered as an expressive, scalable vector character adhering to high-craft editorial character principles:

### A. Anatomy & Color Mapping:
* **Terracotta Fur Body:** Multi-stop linear gradient (`#F28B36` $\to$ `#DE7215` $\to$ `#B34C1B`) providing natural physical depth without raster textures.
* **Luminous Chest Bib:** Parchment gradient (`#FFFFFF` $\to$ `#FBF4E4`) creating soft contrast with the warm coat.
* **Sun Jewel / Star Marking:** Sacred eight-point star on the forehead symbolizing the moral compass.
* **Lantern Tail Tip:** Arched fox tail holding a glowing lantern jewel (`#FFFBE6` with radial gradient `#FFF2A3` $\to$ `#FFB834` $\to$ transparent), pulsating with ambient illumination (`lanternGlowPulse`).

### B. Dynamic Facial Geometry:
* **Idle & Curio Eyes:** Open dark ink ellipses with dual white catchlights reflecting ambient light.
* **Happy & Winking Eyes:** Crisp upward strokes (`#151A26` stroke-width 3) forming warm arcs.
* **Concerned / Safeguard Eyes:** Soft caring downward slope with muted brow strokes, providing a serious, protective demeanor for child safety contexts.
* **Celebrating Eyes:** Eight-point golden star sparkle eyes radiating victory.

### C. Procedural Animation Loops:
* `mitraHeadBob`: Subtle $4.8\text{s}$ breathing rotation ($-1.5^{\circ} \to +1.5^{\circ}$) to keep the companion alive.
* `earTwitchLeft` & `earTwitchRight`: Natural periodic ear twitches staggered at $6\text{s}$ and $8.8\text{s}$ intervals.
* `tailSway`: Organic $3.6\text{s}$ tail pendulum swing.

---

## 8. The Living World Vector Terrain Craft (`src/styles/world.css`)

### A. 60fps Native Vector Terrain:
* Eliminates heavy 3D engine downloads (Three.js/Canvas) by leveraging mathematically defined SVG curves:
  * Terracotta Ridges: `linearGradient id="terracottaHills"`
  * Terraced Knowledge Orchards: `radialGradient id="forestCanopy"`
  * The Winding River of Voices: Multi-stop gradient `stroke="url(#riverGradient)"` with an interior dashed wave shimmer path.

### B. Animated Connecting Pathways (`.world-trail-path`):
* Dashed paths (`stroke-dasharray: 8 8`) animate continuously using CSS `@keyframes trailDashFlow` (`stroke-dashoffset: -160` over $24\text{s}$).
* Active quest paths glow saffron with a drop-shadow bloom (`filter: drop-shadow(0 0 6px rgba(222, 114, 21, 0.5))`).

### C. Atmospheric Floating Spores (`.atmosphere-spore`):
* Lightweight blurred particles drifting across the terrain with deterministic coordinates, emulating pollen, sunlight, and fireflies. Paused gracefully when `prefers-reduced-motion` is detected.
