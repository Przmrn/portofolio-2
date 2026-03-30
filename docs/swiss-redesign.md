# Swiss Design Modernism Redesign Specification

**Date:** 2026-03-26
**Project:** Ammar Portfolio
**Style:** International Typographic Style (Swiss Modernism)

---

## 1. Design Philosophy

> "Form follows function. Discipline over decoration. Grid over intuition."

### User Experience Goals
The visitor should feel:
- **Clarity + Trust** — Clean, structured code thinking made visible
- **Precision + Expertise** — Every pixel intentional, no mistakes
- **Calm + Focus** — No noise, pure signal, concentration on work
- **Bold + Confident** — Craft mastery, work speaks for itself
- **Timeless + Professional** — Built to last, not trend-following

### Core Principles
1. **Restraint** — Nothing decorative exists
2. **Precision** — Grid governs all placement
3. **Honesty** — Structure is revealed, not hidden
4. **Asymmetry** — Dynamic balance, not centered symmetry
5. **Typography as Architecture** — Type *is* the structure

---

## 2. Typography System

### Font Stack
```css
--font-sans: 'Geist Sans', system-ui, -apple-system, sans-serif;
--font-mono: 'Geist Mono', monospace;
```

### Hierarchy
| Element | Size | Weight | Tracking | Leading |
|---------|------|--------|----------|---------|
| Display (AMMAR) | 180px / clamp(80px, 15vw, 180px) | Black 900 | -0.05em | 0.8 |
| H1 | 72px | Bold 700 | -0.04em | 0.9 |
| H2 | 48px | SemiBold 600 | -0.03em | 1.0 |
| H3 | 24px | Medium 500 | 0 | 1.2 |
| Body | 16px | Regular 400 | 0 | 1.6 |
| Small | 14px | Regular 400 | 0.05em | 1.5 |
| Micro | 12px | Regular 400 | 0.1em | 1.4 |
| Nav | 14px | Regular 400 | 0 | 2.0 |

### Rules
- Server Components default (Next.js 16)
- Tight tracking on display/headings
- Loose tracking on micro/nav text
- No font-weight < 400 (no Light/UltraLight)
- No font-weight > 900 (no extrabold decoration)

---

## 3. Color Palette

### Retained Palette (Bone/Ink/Accent)
```css
--color-bg:      #E8E8E5;  /* Bone — main background */
--color-bg-dark: #111111;  /* Ink — dark section background */
--color-ink:     #111111;  /* Primary text */
--color-muted:   #888888;  /* Secondary text */
--color-border:  #CCCCCA;  /* Grid lines, dividers */
--color-accent:  #FF2D00;  /* Orange — functional highlight */
--color-white:   #E8E8E5;  /* Same as bone for dark bg contrast */
```

### Usage Rules
- Background: bone everywhere except About section (ink)
- Text: ink primary, muted secondary
- Borders: border color at 1px
- Accent: ONLY for active states, availability indicator, year markers
- No gradients, no shadows, no glassmorphism

---

## 4. Grid System

### 12-Column Modular Grid
```css
--grid-columns: 12;
--grid-gutter:  80px;
--grid-margin:  5vw;
```

### Layout Structure
```
┌────────────────────────────────────────────────────────────┐
│ SIDEBAR (200px fixed) │ MAIN CONTENT (grid offset)         │
│                       │                                    │
│ AMMAR                 │ [Hero content flows in columns]    │
│                       │                                    │
│ 01. PROJECTS          │                                    │
│ 02. ABOUT             │                                    │
│ 03. CONTACT           │                                    │
│                       │                                    │
│ Banda Aceh            │                                    │
│ 2026                  │                                    │
└────────────────────────────────────────────────────────────┘
```

### Visible Grid Lines
```css
.grid-line {
  position: absolute;
  background: var(--color-border);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.grid-line.active {
  opacity: 1;
}
```

**Behavior:**
- Default: `opacity: 0`
- On scroll: fade in based on velocity
- On hover: fade in at cursor proximity
- Pulse: gentle 2s cycle on active sections

---

## 5. Navigation (Left Sidebar)

### Structure
```jsx
<aside className="sidebar">
  <div className="identity">
    <span className="logo">AMMAR</span>
    <span className="tagline">Full-Stack Developer · CV Engineer</span>
  </div>

  <nav className="nav-links">
    <a href="#projects"><span className="num">01.</span> PROJECTS</a>
    <a href="#about"><span className="num">02.</span> ABOUT</a>
    <a href="#contact"><span className="num">03.</span> CONTACT</a>
  </nav>

  <div className="meta">
    <span>Banda Aceh, Indonesia</span>
    <span>© 2026</span>
  </div>
</aside>
```

### Styling
- Fixed position: `left: 0, top: 0, width: 200px, height: 100vh`
- Padding: `40px 24px`
- Logo: Geist Black 24px, tight tracking
- Nav items: Geist Regular 14px, numbered prefix, 2em line-height
- Meta: Geist Regular 12px, muted color, bottom-aligned
- Active state: accent color on current section (scroll-linked)

---

## 6. Hero Section

### Layout
```
┌────────────────────────────────────────────────────────────┐
│                       │                                    │
│                       │ AMMAR                              │
│                       │ Full-Stack Developer · CV Eng      │
│                       │                                    │
│                       │                    [data viz]      │
│                       │                                    │
│                       │ Availability ●                     │
│                       │                                    │
└────────────────────────────────────────────────────────────┘
```

### Typography
- "AMMAR": 180px / clamp(80px, 15vw, 180px), Black 900, -0.05em tracking
- Tagline: 14px, Regular 400, muted color
- Availability: 12px, Regular 400, accent dot

### Interactive Data Viz
- Position: bottom-right of hero (grid column 10-12)
- Behavior:
  - Mouse proximity: lines rotate toward cursor
  - Scroll velocity: pulse intensity increases
  - Idle: gentle 2s rotation
- Style: 1px lines, 20% opacity, accent color on hover

---

## 7. Projects Section

### Asymmetric Grid Distribution
```
Project 01: columns 2-9   (8 columns) — largest
Project 02: columns 4-9   (6 columns) — medium, offset
Project 03: columns 6-9   (4 columns) — smallest
```

### Card Structure
```jsx
<article className="project-card" data-size="large|medium|small">
  <div className="grid-lines"></div>
  <span className="project-num">01</span>
  <h3 className="title">Project Title</h3>
  <p className="subtitle">Stack Category</p>
  <p className="description">One-line description</p>
  <div className="tags">
    <span>Tag1</span><span>Tag2</span><span>Tag3</span>
  </div>
  <span className="year">2025 →</span>
</article>
```

### Hover State
- Border: 1px solid accent
- Background: subtle tint (bone + 5% darker)
- Year arrow: accent color
- Transform: none (Swiss design doesn't lift)

---

## 8. About Section

### Dark Background
- Background: `#111111` (ink)
- Text: `#E8E8E5` (bone) for contrast
- Accent: orange for stats

### Two-Column Asymmetric Layout
```
┌────────────────────────────────────────────────────────────┐
│                       │                                    │
│ BUILDING              │ Skill Group 1                      │
│ SYSTEMS               │ items · items · items              │
│ THAT WORK             │                                    │
│                       │ Skill Group 2                      │
│                       │ items · items · items              │
│                       │                                    │
│                       │ Stats Grid (2x2)                   │
│                       │                                    │
└────────────────────────────────────────────────────────────┘
```

### Statement Typography
- "BUILDING SYSTEMS THAT WORK": 80px / clamp(40px, 5.5vw, 80px)
- Stack vertically, tight leading (0.88)
- Period in accent color

---

## 9. Contact Section

### Minimal CTA
```
┌────────────────────────────────────────────────────────────┐
│                       │                                    │
│                       │ LET'S                              │
│                       │ BUILD                              │
│                       │ IT.                                │
│                       │                                    │
│                       │ [GET IN TOUCH]  GitHub  LinkedIn   │
│                       │                                    │
└────────────────────────────────────────────────────────────┘
```

### Styling
- "LET'S BUILD IT": 172px / clamp(56px, 11vw, 172px), Black 900
- Email button: ink background, bone text, accent hover
- Social links: muted text, ink hover

---

## 10. Motion & Interaction

### GSAP Smooth Scroll (Lerp)
```js
// Custom implementation, no ScrollSmoother (paid)
const lerp = (a, b, n) => (1 - n) * a + n * b;

const ease = {
  power2: 0.025,  // gentle ease
  power4: 0.01    // stronger ease
};

// Track native scroll, apply transform to wrapper
// Velocity affects easing intensity
```

### Grid Line Animation
- Scroll velocity → opacity lerp
- Hover proximity → opacity fade
- Section entry → pulse once

### Data Viz Interaction
- Mouse angle → line rotation (lerp)
- Scroll velocity → scale pulse
- Idle → gentle rotation (2s cycle)

---

## 11. Component Architecture

### Removed
- `CornerLabels.jsx` — decorative, not functional
- `LenisProvider.jsx` — replaced by SmoothScroll
- `MagnetLines.jsx` center placement — moved to data viz position

### New
- `SmoothScroll.jsx` — GSAP lerp wrapper
- `Sidebar.jsx` — extracted from Nav.jsx
- `GridLines.jsx` — reusable grid line component
- `DataViz.jsx` — interactive data visualization

### Modified
- `Nav.jsx` → vertical sidebar
- `Hero.jsx` → single-line AMMAR, data viz repositioned
- `Projects.jsx` → asymmetric grid cards
- `About.jsx` → dark bg, two-column
- `Contact.jsx` → minimal CTA

---

## 12. Technical Implementation

### Dependencies
- Keep: `framer-motion`, `gsap`
- Remove: `lenis` (replaced by custom GSAP)

### CSS Variables (globals.css)
```css
:root {
  --font-sans: 'Geist Sans', sans-serif;
  --font-mono: 'Geist Mono', monospace;

  --color-bg: #E8E8E5;
  --color-bg-dark: #111111;
  --color-ink: #111111;
  --color-muted: #888888;
  --color-border: #CCCCCA;
  --color-accent: #FF2D00;

  --grid-columns: 12;
  --grid-gutter: 80px;
  --grid-margin: 5vw;

  --sidebar-width: 200px;
}
```

### Next.js 16 Compliance
- `'use client'` only where needed (motion, GSAP)
- Async request APIs: `await params`, `await searchParams`
- Server Components default

---

## 13. Success Criteria

### Visual
- [ ] Grid visible on interaction
- [ ] Typography hierarchy clear at 3m distance
- [ ] Asymmetric balance achieved
- [ ] No decorative elements remain

### Technical
- [ ] Smooth scroll feels natural (lerp tuned)
- [ ] Data viz interactive (mouse + scroll)
- [ ] All sections grid-aligned
- [ ] Mobile responsive (stack sidebar, single-column)

### Experiential
- [ ] First impression: "clean, professional"
- [ ] Scroll feels controlled, not floaty
- [ ] No visual noise or distraction
- [ ] Work is the focus, not the chrome

---

## 14. Migration Checklist

- [ ] Install Geist font (or use next/font)
- [ ] Create SmoothScroll.jsx
- [ ] Rewrite Nav.jsx as Sidebar
- [ ] Update Hero.jsx
- [ ] Rewrite Projects.jsx
- [ ] Update About.jsx
- [ ] Update Contact.jsx
- [ ] Remove CornerLabels.jsx
- [ ] Remove LenisProvider.jsx
- [ ] Update globals.css
- [ ] Update layout.js
- [ ] Test mobile breakpoint
- [ ] Tune lerp easing
- [ ] Verify grid lines on all sections

---

**Approved by:** Ammar
**Date:** 2026-03-26
