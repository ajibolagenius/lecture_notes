# 🎨 CSS — Tutor's Master Outline
### Deejoft Coding School | Web Development Track
**Duration:** 2 Weeks · 4 Classes · ~2 hours per class
**Level:** Beginner (requires HTML completion)

---

> **Dear Tutor,**
> CSS has evolved dramatically. In 2025, a professional does not need CSS frameworks like Bootstrap to build polished, responsive layouts — modern CSS is that powerful. This course teaches students to use the language confidently and systematically, not to hack their way through trial and error. The emphasis is on understanding *why* something works, not just that it does. By the end of four classes, students should be able to build a pixel-accurate, responsive, theme-aware UI from a design mockup — without touching a framework.

---

## 🗺️ Course Map

| Class | Title | Core Skill Unlocked |
|-------|-------|---------------------|
| Class 1 | Selectors, Cascade & the Box Model | Predict exactly which CSS rule wins and why |
| Class 2 | Typography, Colour & Custom Properties | Build a consistent, reusable design token system |
| Class 3 | Flexbox & CSS Grid | Build any layout — nav, card grid, full page — from scratch |
| Class 4 | Responsive Design, Transitions & Modern CSS | Build a fully responsive, theme-aware page with smooth interactions |

**Prerequisites:** HTML (all 4 classes)  
**Tools:** VS Code + Live Server, Chrome DevTools (open every session)  
**Next Course:** JavaScript

---

## 🎯 Three Mental Models to Build

```
1. THE CASCADE            →  CSS rules are applied in a specific order of priority.
                              Understanding it means you never need !important.

2. THE BOX MODEL          →  Every element is a box with 4 layers.
                              Mastering spacing means mastering layout.

3. LAYOUT IS A CHOICE     →  Normal flow, Flexbox, and Grid are three different tools.
                              Knowing which to reach for is the mark of a competent developer.
```

---

## 📅 Class 1 — Selectors, Cascade & the Box Model

**Duration:** ~2 hours  
**Objective:** Students understand CSS syntax, can target any element precisely, predict which rule wins in a conflict, and use the box model intentionally.

---

### Part A — CSS Syntax & Linking (20 min)

**The One Way to Link CSS in Production:**
```html
<!-- In <head>, after all <meta> tags, before </head> -->
<link rel="stylesheet" href="./css/main.css">
```

> Inline styles (`style=""`) and `<style>` blocks exist, but only use them in very specific situations (e.g., critical CSS for performance). The default for everything is an external `.css` file.

**CSS Syntax:**
```css
/*
  selector    { property:   value;   }
  ↓             ↓           ↓
*/
h1            { color:      #1a1a2e; }

/* Multiple declarations in one rule */
.card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px hsl(0 0% 0% / 12%);
}

/* CSS comment syntax — always double-slash is NOT valid in CSS */
/* This is correct — CSS uses  /* */  for comments */
```

---

### Part B — Selectors (30 min)

**The Selector Toolkit:**
```css
/* ── Type Selector ── targets all elements of this type */
p { line-height: 1.7; }
h2 { font-size: 1.75rem; }

/* ── Class Selector ── targets elements with class="..." */
.badge { background-color: #e94560; color: white; padding: 2px 8px; border-radius: 4px; }

/* ── ID Selector ── targets the ONE element with id="..." — use sparingly */
#skip-to-content { position: absolute; top: -100%; }
#skip-to-content:focus { top: 0; }   /* Accessibility: skip link */

/* ── Attribute Selector ── targets elements based on their attributes */
a[href^="https"]   { /* All links that START WITH https */  }
a[href$=".pdf"]    { /* All links that END WITH .pdf */ }
input[type="email"]{ /* Specifically email inputs */ }

/* ── Pseudo-class Selector ── element in a specific STATE */
a:hover          { text-decoration: underline; }
a:focus-visible  { outline: 3px solid #e94560; outline-offset: 2px; }
button:disabled  { opacity: 0.5; cursor: not-allowed; }
li:first-child   { margin-top: 0; }
li:last-child    { margin-bottom: 0; }
li:nth-child(odd){ background-color: #f8f8f8; } /* Zebra striping */
p:not(.intro)    { color: #555; }               /* All p EXCEPT .intro */

/* ── Pseudo-element Selector ── a part of an element that doesn't exist in HTML */
p::first-line    { font-weight: 600; }
::selection      { background-color: #e94560; color: white; } /* Highlighted text */
.card::before    { content: ''; display: block; height: 4px; background: #e94560; }

/* ── Combinator Selectors ── relationships between elements */
nav a            { color: white; }          /* Any <a> ANYWHERE INSIDE <nav> (descendant) */
ul > li          { list-style: disc; }     /* <li> that is a DIRECT child of <ul> */
h2 + p           { font-size: 1.1rem; }   /* <p> immediately AFTER an <h2> (adjacent sibling) */
h2 ~ p           { color: #555; }         /* ALL <p>s after an <h2> (general sibling) */
```

> **Tutor Guidance:** Don't teach all of these in one go. Teach type, class, and pseudo-class `:hover` / `:focus-visible` in Class 1. Introduce others as students need them in exercises. The reference above is for when students ask "how do I target X?"

---

### Part C — Specificity & the Cascade (25 min)

**The Three Sources of Styles (highest to lowest priority):**
1. **Author styles** — the CSS you write
2. **User styles** — the browser user's accessibility preferences
3. **Browser (user-agent) styles** — the browser's built-in defaults

**Specificity — The "Who Wins?" Algorithm:**

```
Each selector scores points in three columns (not actual columns, but the metaphor holds):

  [  ID  ]  [  Class / Attribute / Pseudo-class  ]  [  Type / Pseudo-element  ]
  [  0   ]  [                 0                  ]  [            0            ]

Examples:
  p                         →  0-0-1
  .card                     →  0-1-0
  p.intro                   →  0-1-1
  #header                   →  1-0-0
  #header .nav a:hover      →  1-1-1
```

```css
/* Live demonstration — what colour is this <p id="intro" class="lead">? */

p           { color: black;  }   /* 0-0-1 */
.lead       { color: blue;   }   /* 0-1-0 */
#intro      { color: green;  }   /* 1-0-0 */
p.lead      { color: purple; }   /* 0-1-1 */

/* Answer: green — the ID selector wins with the highest score */
```

> **The `!important` Warning:**
> ```css
> /* !important overrides everything — including inline styles.
>    In professional code, it signals a broken specificity structure.
>    Use it ONLY for utility classes that must always win (e.g., .sr-only, .hidden). */
> .hidden { display: none !important; }
> ```

**The `all` Property and the CSS Reset:**
```css
/*
  Browsers ship with opinionated default styles (margin on <body>, blue links, etc.)
  We neutralise these first before building our own system.
  This is your opening block in every main.css file.
*/

*, *::before, *::after {
  box-sizing: border-box;   /* Critical — explained in Part D */
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;          /* Respects user's browser font size preference */
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  min-height: 100dvh;       /* dvh = dynamic viewport height — better than 100vh on mobile */
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img, video, canvas, svg {
  display: block;           /* Removes the mysterious gap below inline images */
  max-width: 100%;          /* Images never overflow their container */
}

input, button, textarea, select {
  font: inherit;            /* Form elements don't inherit font by default — fix this */
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word; /* Long words don't overflow containers */
}
```

---

### Part D — The Box Model (25 min)

```
Every single HTML element is a rectangular box with four layers:

┌─────────────── MARGIN ──────────────────┐  ← Transparent. Pushes other elements away.
│                                         │     Collapses vertically between siblings.
│  ┌─────────────── BORDER ────────────┐  │
│  │                                   │  │
│  │  ┌─────────── PADDING ─────────┐  │  │  ← Space inside the border.
│  │  │                             │  │  │     Has the background colour.
│  │  │  ┌──────── CONTENT ──────┐  │  │  │
│  │  │  │                       │  │  │  │  ← Where text and child elements live.
│  │  │  │     width × height    │  │  │  │
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**The `box-sizing` Fix — Why It's First in Your Reset:**
```css
/* ❌ Default: content-box
   width/height applies to the CONTENT only.
   A box set to width: 300px with padding: 20px is actually 340px wide.
   This makes layout arithmetic very annoying. */

/* ✅ border-box (applied globally in the reset above)
   width/height includes padding AND border.
   A box set to width: 300px with padding: 20px stays 300px wide.
   The padding eats into the content area instead. This is predictable. */

.card {
  width: 300px;       /* This is the TOTAL width — padding and border included */
  padding: 24px;      /* Does NOT add to the 300px */
  border: 1px solid #ddd; /* Does NOT add to the 300px */
}
```

**Margin Collapse — The Most Common Confusion:**
```css
/* Vertical margins between block elements COLLAPSE to the larger of the two.
   This is not a bug. It is intentional behaviour. */

h2 { margin-bottom: 24px; }
p  { margin-top:    16px; }

/*
  The space between an <h2> and the following <p> is NOT 24 + 16 = 40px.
  It is MAX(24, 16) = 24px.

  This does NOT happen:
  - With horizontal margins
  - With Flexbox or Grid children
  - With elements that have padding or border
*/
```

---

### ✏️ Class 1 Exercise (20 min)

Given an HTML file with this structure: `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` — students write a stylesheet that:
1. Applies the reset block from scratch
2. Uses type, class, and pseudo-class selectors (no IDs for layout)
3. Demonstrates understanding of `box-sizing` by correctly padding a `.card` element
4. Correctly applies `margin: 0 auto` to centre a container

---

## 📅 Class 2 — Typography, Colour & Design Tokens

**Duration:** ~2 hours  
**Objective:** Students build a consistent, reusable design system using CSS Custom Properties, modern colour functions, and fluid typography.

---

### Part A — CSS Custom Properties (Design Tokens) (30 min)

> **Teach this before colour or typography.** Custom properties are the foundation everything else builds on. Once students understand design tokens, they write CSS that is maintainable, themeable, and consistent.

```css
/* Design tokens live on :root — globally accessible */
:root {
  /* ── Colour Palette ── */
  --clr-neutral-900: #0f0f11;
  --clr-neutral-700: #3a3a4a;
  --clr-neutral-400: #888899;
  --clr-neutral-100: #f8f8fc;
  --clr-white:       #ffffff;

  --clr-brand:       #e94560;
  --clr-brand-light: #ff7a90;
  --clr-accent:      #0f3460;

  /* ── Semantic Tokens (reference palette tokens, not raw values) ── */
  --colour-text:         var(--clr-neutral-900);
  --colour-text-muted:   var(--clr-neutral-400);
  --colour-bg:           var(--clr-white);
  --colour-bg-subtle:    var(--clr-neutral-100);
  --colour-border:       #e2e2e8;
  --colour-primary:      var(--clr-brand);
  --colour-primary-hover:var(--clr-brand-light);

  /* ── Typography ── */
  --font-sans:  'Inter', system-ui, sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;

  --step--1: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --step-0:  clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --step-1:  clamp(1.2rem, 1.05rem + 0.75vw, 1.5rem);
  --step-2:  clamp(1.44rem, 1.2rem + 1.2vw, 2rem);
  --step-3:  clamp(1.73rem, 1.4rem + 1.65vw, 2.75rem);
  --step-4:  clamp(2.07rem, 1.6rem + 2.35vw, 3.75rem);

  /* ── Spacing ── */
  --space-3xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.375rem);
  --space-2xs: clamp(0.5rem,  0.45rem + 0.25vw, 0.625rem);
  --space-xs:  clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --space-s:   clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --space-m:   clamp(1.5rem, 1.4rem + 0.5vw, 1.75rem);
  --space-l:   clamp(2rem, 1.85rem + 0.75vw, 2.5rem);
  --space-xl:  clamp(3rem, 2.75rem + 1.25vw, 4rem);
  --space-2xl: clamp(4rem, 3.65rem + 1.75vw, 5.5rem);

  /* ── Shape ── */
  --radius-s:  4px;
  --radius-m:  8px;
  --radius-l:  16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* ── Shadow ── */
  --shadow-s: 0 1px 3px hsl(0 0% 0% / 8%),  0 1px 2px hsl(0 0% 0% / 6%);
  --shadow-m: 0 4px 6px hsl(0 0% 0% / 7%),  0 2px 4px hsl(0 0% 0% / 5%);
  --shadow-l: 0 10px 15px hsl(0 0% 0% / 7%), 0 4px 6px hsl(0 0% 0% / 4%);

  /* ── Transitions ── */
  --transition-fast:   150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow:   400ms ease;
}

/* Dark mode — swap semantic tokens only, never the palette */
@media (prefers-color-scheme: dark) {
  :root {
    --colour-text:       var(--clr-neutral-100);
    --colour-text-muted: var(--clr-neutral-400);
    --colour-bg:         var(--clr-neutral-900);
    --colour-bg-subtle:  #1a1a2a;
    --colour-border:     #2a2a3a;
  }
}
```

> **The two-tier token system explained:**
> - **Palette tokens** (`--clr-brand`, `--clr-neutral-900`) — the raw colour values. Never use these directly in component styles.
> - **Semantic tokens** (`--colour-primary`, `--colour-text`) — describe *purpose*, not appearance. These are what components use. When you switch themes, you only update semantic tokens — not a single component needs to change.

---

### Part B — Colour in Modern CSS (25 min)

```css
/* ── The colour spaces available in 2025 ── */

/* sRGB (traditional, still most common) */
.element {
  color: #1a1a2e;                   /* Hex */
  color: rgb(26, 26, 46);           /* RGB */
  color: rgba(26, 26, 46, 0.5);     /* RGB with alpha */
}

/* HSL — most intuitive for designers. Hue (0-360°), Saturation (%), Lightness (%) */
.element {
  color: hsl(235, 28%, 14%);             /* Opaque */
  color: hsl(235, 28%, 14% / 50%);      /* With alpha — modern slash syntax */
  background: hsl(var(--hue) 80% 50%);  /* Combine with custom properties */
}

/* OKLCH — perceptually uniform. Best choice for generated colour scales (2024+) */
/* L = Lightness (0–1), C = Chroma (saturation), H = Hue (0–360) */
.element {
  color: oklch(0.35 0.15 265);          /* Dark navy */
  color: oklch(0.65 0.20 15);           /* Brand red */
}

/* color-mix() — mix two colours in CSS without JavaScript */
.element {
  background-color: color-mix(in oklch, var(--colour-primary) 20%, white);
  /* → A very light tint of the brand colour */
}
```

---

### Part C — Typography System (30 min)

```css
/* ── Base Typography on body ── */
body {
  font-family: var(--font-sans);
  font-size: var(--step-0);      /* Fluid: ~16px–18px based on viewport */
  line-height: 1.6;
  color: var(--colour-text);
  background-color: var(--colour-bg);
}

/* ── Heading Scale ── */
h1 { font-size: var(--step-4); line-height: 1.1; font-weight: 800; letter-spacing: -0.03em; }
h2 { font-size: var(--step-3); line-height: 1.2; font-weight: 700; letter-spacing: -0.02em; }
h3 { font-size: var(--step-2); line-height: 1.3; font-weight: 600; }
h4 { font-size: var(--step-1); line-height: 1.4; font-weight: 600; }

/* ── Prose Container ── */
.prose {
  max-width: 65ch;    /* ch unit = width of the "0" character. 65ch ≈ optimal line length */
  margin-inline: auto;
}

.prose p + p { margin-top: var(--space-s); }
.prose h2 { margin-top: var(--space-xl); margin-bottom: var(--space-s); }

/* ── Utility Text Styles ── */
.text-muted    { color: var(--colour-text-muted); }
.text-small    { font-size: var(--step--1); }
.text-mono     { font-family: var(--font-mono); }
.text-balance  { text-wrap: balance; }   /* Prevents awkward single-word last lines */
.text-pretty   { text-wrap: pretty; }   /* Prevents orphans in paragraphs */

/* ── Code blocks ── */
pre {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  background-color: var(--colour-bg-subtle);
  padding: var(--space-m);
  border-radius: var(--radius-m);
  overflow-x: auto;
  border: 1px solid var(--colour-border);
}

code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background-color: var(--colour-bg-subtle);
  padding: 0.1em 0.35em;
  border-radius: var(--radius-s);
  border: 1px solid var(--colour-border);
}
pre code { background: none; padding: 0; border: none; font-size: inherit; }
```

---

### ✏️ Class 2 Exercise (20 min)

Students create a `tokens.css` file and a `typography.css` file for their portfolio project. The tokens file must define colour, space, radius, and font-family tokens. Typography must use fluid `clamp()` values and define heading styles using the token scale.

---

## 📅 Class 3 — Flexbox & CSS Grid

**Duration:** ~2 hours  
**Objective:** Students can build navigation bars, card rows, and full-page layouts confidently using Flexbox and Grid.

---

### Part A — Flexbox (55 min)

**The Two Axes — Visualise Before Coding:**
```
┌──────────────────── FLEX CONTAINER ───────────────────────────┐
│                                                               │
│  [ Item ]  [ Item ]  [ Item ]  ←── flex items                │
│                                                               │
│  ────────────────── Main Axis ────────────────────▶          │
│                  (justify-content controls this)              │
│                                                               │
│  ↕  Cross Axis (align-items controls this)                   │
└───────────────────────────────────────────────────────────────┘
```

```css
/* ── CONTAINER PROPERTIES ── */
.nav {
  display: flex;                    /* Activate. Direct children become flex items. */
  flex-direction: row;              /* row (→) | column (↓) | row-reverse | column-reverse */
  flex-wrap: wrap;                  /* nowrap (default) | wrap | wrap-reverse */
  justify-content: space-between;   /* Main axis: flex-start | flex-end | center |
                                       space-between | space-around | space-evenly */
  align-items: center;              /* Cross axis: flex-start | flex-end | center |
                                       stretch (default) | baseline */
  gap: 16px;                        /* Space between items — replaces margin hacks */
  gap: 12px 24px;                   /* row-gap column-gap */
}

/* ── ITEM PROPERTIES ── */
.nav__logo {
  flex-shrink: 0;   /* Never shrink this item */
  flex-grow: 0;     /* Never grow */
  flex-basis: auto; /* Use natural size */
}

.nav__links {
  flex: 1;          /* Shorthand: grow=1, shrink=1, basis=0. Fill remaining space. */
}

.card {
  flex: 1 1 280px;  /* grow=1, shrink=1, basis=280px. Grow/shrink around 280px. */
}

/* align-self: override align-items for a single item */
.card--featured {
  align-self: stretch;
}
```

**Real-World Patterns:**

```css
/* Pattern 1: Navigation Bar */
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-s) var(--space-l);
  background: var(--colour-bg);
  border-bottom: 1px solid var(--colour-border);
}

.nav__links {
  display: flex;          /* Flex inside a flex item — absolutely fine */
  gap: var(--space-m);
  list-style: none;
  padding: 0;
}

/* Pattern 2: Card Row */
.card-row {
  display: flex;
  gap: var(--space-m);
  flex-wrap: wrap;        /* Cards wrap to next line when they don't fit */
}

.card-row .card {
  flex: 1 1 260px;        /* Each card wants to be 260px, grows/shrinks equally */
}

/* Pattern 3: Perfectly Centred (vertical + horizontal) */
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80dvh;
  text-align: center;
}

/* Pattern 4: Sticky footer with flex column */
body {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
main { flex: 1; }         /* main grows to push footer to the bottom */
```

---

### Part B — CSS Grid (55 min)

**When to use what:**
> - **Flexbox:** One axis. You have items and want them to arrange themselves in a line or column.
> - **Grid:** Two axes. You have a layout in mind and want to place items into it.
> - **They work together.** Grid for the outer page layout; Flexbox inside grid cells.

```css
/* ── DEFINING A GRID ── */
.layout {
  display: grid;

  /* 1fr = one fraction of available space */
  grid-template-columns: 1fr 1fr 1fr;       /* Three equal columns */
  grid-template-columns: repeat(3, 1fr);    /* Exactly the same, cleaner */
  grid-template-columns: 280px 1fr;         /* Fixed sidebar + flexible main */
  grid-template-columns: repeat(12, 1fr);   /* Classic 12-column grid */

  grid-template-rows: auto 1fr auto;        /* header height | main fills space | footer height */

  gap: var(--space-m);                      /* Gap between ALL tracks */
  row-gap: var(--space-l);                  /* Row gap separately */
  column-gap: var(--space-m);               /* Column gap separately */
}

/* ── PLACING ITEMS ── */
.card--wide {
  grid-column: span 2;                      /* Item spans 2 columns */
  grid-row: span 2;                         /* Item spans 2 rows */
}

.card--full {
  grid-column: 1 / -1;                      /* -1 = last line. Spans ALL columns. */
}

/* ── NAMED AREAS — Most readable approach for page layouts ── */
.page {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 64px 1fr 56px;
  grid-template-areas:
    "header  header "
    "sidebar main   "
    "footer  footer ";
  min-height: 100dvh;
}

.site-header  { grid-area: header; }
.site-sidebar { grid-area: sidebar; }
.site-main    { grid-area: main; }
.site-footer  { grid-area: footer; }

/* ── AUTO-FILL / AUTO-FIT — Responsive without media queries ── */
.product-grid {
  display: grid;
  /* "Give me as many columns as will fit, each at least 240px wide" */
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-m);
}
/* auto-fill: keeps empty tracks (maintains column count)
   auto-fit: collapses empty tracks (items can grow to fill the space) */
```

---

### ✏️ Class 3 Exercise (10 min)

Rebuild this layout using Grid named areas:
```
┌──────────────── header ───────────────────┐
│                                           │
├─── sidebar ──┬──────── main ─────────────┤
│              │                           │
│              │                           │
├──────────────┴───────── footer ───────────┤
│                                           │
└───────────────────────────────────────────┘
```
Then inside `main`, build a responsive card grid using `auto-fill, minmax(280px, 1fr)`.

---

## 📅 Class 4 — Responsive Design, Transitions & Modern CSS

**Duration:** ~2 hours  
**Objective:** Students build fully responsive, theme-switching, smoothly-animated UIs using only CSS.

---

### Part A — Responsive Design (40 min)

**The Viewport Meta Tag (must already be in HTML):**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Mobile-First Media Queries:**
```css
/*
  Mobile First: write your base styles for the SMALLEST screen first.
  Then progressively ENHANCE for larger screens using min-width.
  This is the correct, modern approach.
*/

/* Base styles — applies to ALL screens (mobile by default) */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;   /* Single column on mobile */
  gap: var(--space-m);
}

/* Tablet and up */
@media (min-width: 48rem) {     /* 768px / 16 = 48rem */
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop and up */
@media (min-width: 64rem) {     /* 1024px */
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Large desktop */
@media (min-width: 90rem) {     /* 1440px */
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

**Container Queries — The 2024 Game Changer:**
```css
/*
  Problem with media queries: they respond to the VIEWPORT width,
  not the container's width. This breaks component-level responsiveness.

  Container queries respond to the PARENT ELEMENT's width.
  A component now adapts to wherever it is placed.
*/

.card-wrapper {
  container-type: inline-size;   /* Enable container queries on this element */
  container-name: card;          /* Optional: name for targeting */
}

/* When the .card-wrapper is at least 400px wide: */
@container card (min-width: 25rem) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

/* The card is now responsive based on ITS CONTEXT,
   not the viewport — works the same whether it's in a sidebar or main content */
```

**The `:has()` Selector — "If this contains that":**
```css
/* Style a form group differently if its input is in an error state */
.form-group:has(input:invalid:not(:placeholder-shown)) {
  border-color: red;
  background-color: hsl(0 100% 95%);
}

/* A card that has an image gets a different layout */
.card:has(img) {
  display: grid;
  grid-template-rows: auto 1fr;
}

/* A nav that has a submenu open gets padding adjustment */
nav:has(.dropdown:is([open], :focus-within)) {
  padding-bottom: 0;
}
```

---

### Part B — Transitions & Animations (30 min)

```css
/* ── TRANSITIONS — smooth state changes ── */

.btn {
  background-color: var(--colour-primary);
  color: white;
  padding: var(--space-xs) var(--space-m);
  border-radius: var(--radius-m);
  border: none;
  cursor: pointer;
  font-size: var(--step-0);
  font-weight: 600;

  /* Only transition specific properties, not 'all' — for performance */
  transition:
    background-color var(--transition-fast),
    transform        var(--transition-fast),
    box-shadow       var(--transition-fast);
}

.btn:hover {
  background-color: var(--colour-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-m);
}

.btn:active {
  transform: translateY(0);
  box-shadow: none;
}

/* ── Always respect user motion preferences ── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration:   0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration:  0.01ms !important;
    scroll-behavior: auto !important;
  }
}


/* ── CSS ANIMATIONS ── */

@keyframes fade-in-up {
  from {
    opacity: 0;
    translate: 0 1rem;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.card--animate {
  animation: fade-in-up 0.4s ease both;
  animation-delay: calc(var(--index, 0) * 80ms); /* Stagger with CSS variable */
}

/* Skeleton loading state */
.skeleton {
  background-color: var(--colour-border);
  border-radius: var(--radius-s);
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}
```

---

### Part C — CSS Nesting (Native, 2024+) (15 min)

```css
/*
  CSS Nesting is now supported in all major browsers without a preprocessor.
  It reduces repetition and keeps related rules together.
*/

.card {
  background: var(--colour-bg);
  border: 1px solid var(--colour-border);
  border-radius: var(--radius-l);
  padding: var(--space-m);
  transition: box-shadow var(--transition-normal);

  /* Nested state — equivalent to .card:hover */
  &:hover {
    box-shadow: var(--shadow-l);
  }

  /* Nested child — equivalent to .card .card__title */
  & .card__title {
    font-size: var(--step-1);
    font-weight: 700;
    color: var(--colour-text);
    margin-bottom: var(--space-xs);
  }

  /* Nested modifier — equivalent to .card.card--featured */
  &.card--featured {
    border-color: var(--colour-primary);
    border-width: 2px;
  }

  /* Nested media query */
  @media (min-width: 48rem) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

---

### 🏆 Class 4 & Final Project — Responsive Portfolio Site

Students take their HTML portfolio page and apply a complete, professional CSS stylesheet.

**Requirements:**

| Feature | Must Include |
|---------|-------------|
| Design tokens | `tokens.css` with colour, space, type, radius tokens; dark mode via `prefers-color-scheme` |
| Reset | Modern CSS reset block |
| Typography | Fluid type scale using `clamp()`, all headings and body defined |
| Layout | Grid named areas for page shell; Flexbox for navigation |
| Cards | Responsive card grid using `auto-fill, minmax()` |
| Container query | At least one component adapts to its container width |
| Transitions | Button and link hover states using `transition` |
| Responsive | Mobile-first media queries at 3 breakpoints |
| Animation | One `@keyframes` animation (e.g., hero fade-in, skeleton loader) |
| Reduced motion | `prefers-reduced-motion` respected |

**Rubric:**

| Criterion | Points |
|-----------|--------|
| Design token system (2-tier: palette + semantic) | 20 |
| Fluid typography using `clamp()` | 10 |
| Dark mode via `prefers-color-scheme` | 10 |
| Correct Flexbox navigation | 10 |
| Grid page layout with named areas | 15 |
| Responsive card grid (container query or media query) | 15 |
| Smooth transitions on interactive elements | 10 |
| `prefers-reduced-motion` respected | 5 |
| Zero layout breakage on mobile, tablet, desktop | 5 |
| **Total** | **100** |

---

## 📚 Essential References

| Resource | URL | Use For |
|----------|-----|---------|
| MDN CSS Reference | `developer.mozilla.org/en-US/docs/Web/CSS` | Any property or concept |
| CSS Tricks Flexbox Guide | `css-tricks.com/snippets/css/a-guide-to-flexbox` | Flexbox visual reference |
| CSS Tricks Grid Guide | `css-tricks.com/snippets/css/complete-guide-grid` | Grid visual reference |
| Utopia (fluid scale generator) | `utopia.fyi` | Generate `clamp()` type & space scales |
| Flexbox Froggy | `flexboxfroggy.com` | Gamified Flexbox practice |
| Grid Garden | `cssgridgarden.com` | Gamified Grid practice |
| Can I Use | `caniuse.com` | Check browser support for `:has()`, nesting, etc. |

---

*Deejoft Coding School — Instructor Materials | CSS Track*
*Rebuilt 2025 — Covers CSS Nesting, `:has()`, Container Queries, OKLCH, `dvh`*
