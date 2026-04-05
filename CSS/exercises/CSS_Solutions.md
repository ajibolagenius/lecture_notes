# ✅ CSS Exercises — Solutions
### Deejoft Coding School | Tutor Reference Only

---

## Class 1 Solutions

---

### Exercise 1.1 Solution — The Reset

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  min-height: 100dvh;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
```

---

### Exercise 1.2 Solution — Predict the Winner

**Scenario A:** `<p class="intro" id="lead">`

| Selector | Score |
|----------|-------|
| `p` | 0-0-1 |
| `.intro` | 0-1-0 |
| `#lead` | 1-0-0 |
| `p.intro` | 0-1-1 |

Applied colour: **green** (`#lead`) — ID selector wins with 1-0-0.

**Scenario B:** `<a class="btn">` inside `<nav id="main-nav">`

| Selector | Score |
|----------|-------|
| `a` | 0-0-1 |
| `.btn` | 0-1-0 |
| `nav a` | 0-0-2 |
| `#main-nav a` | 1-0-1 |

Applied colour: **green** (`#main-nav a`) — ID in the selector wins with 1-0-1.

**Scenario C:** Two identical selectors — the **second wins** (same specificity, order decides).
Applied font-size: **1.5rem** — the later rule wins when specificity is equal.

---

### Exercise 1.3 Solution — Box Model Inspector

**Box 1** (no `box-sizing`): `200 + 20+20 (padding) + 4+4 (border) = 248px`
**Box 2** (with `border-box`): `200px` — exactly as declared
**Box 3**: Yes, centred — `margin: 20px auto` centres block-level elements horizontally
**Box 4**: Gap is **32px** — margin collapse takes the MAX (32 vs 16), not the SUM
**Box 5**: `.inner` width is constrained by `.outer` content area — the `.outer` padding does not add to `.inner`'s width, but it does reduce the available width for `.inner`

---

### Exercise 1.5 Solution — Debug the Broken Styles

**Problem 1:** `p.highlight` has specificity 0-1-1. `.sidebar p` has specificity 0-1-1 too — but `.sidebar p` comes first, so `p.highlight` should win. If not applying: check the HTML — is the `.highlight` paragraph actually inside `.sidebar`? If so, `.sidebar p.highlight` would need to be considered. **Fix:** Increase specificity: `.highlight { color: red; }` → already loses to `.sidebar p`. The real fix is `p.highlight` which is 0-1-1 — same as `.sidebar p`, but order decides. Move `p.highlight` AFTER `.sidebar p`.

**Problem 2:** `.btn` rule is missing a semicolon — `background: blue` with no `;`. This makes the entire rule invalid, so the `:hover` rule has nothing to override. **Fix:** Add the semicolon: `background: blue;`

**Problem 3:** No `box-sizing: border-box`. Width is 200 + padding 40 + border 4 = 244px. **Fix:** Add `box-sizing: border-box;` to the rule.

**Problem 4:** Images are `inline` by default — they sit on the text baseline, creating a gap for descenders. **Fix:** Add to reset: `img { display: block; }` (already in the reset — check that the reset is linked before the gallery CSS).

**Problem 5:** The second `.intro { color: blue; }` is overridden by `p { color: red; }` which comes LATER. Even though `p` has lower specificity (0-0-1) than `.intro` (0-1-0), the `.intro` rule wins — because `.intro` IS still higher specificity. Wait — actually `.intro` (0-1-0) beats `p` (0-0-1) by specificity alone. Re-check: **the issue is a different one**: if the student sees only the second `.intro` being blue, it could be because the first `.intro` has been overridden by `p` incorrectly. The real answer: `.intro` has 0-1-0 specificity which beats `p` at 0-0-1, so ALL `.intro` paragraphs should be blue. If only the second is blue, the student has likely made a structural HTML error (missing `class="intro"` on the first paragraph). **Fix:** Verify the HTML class attributes.

---

## Class 2 Solutions

---

### Exercise 2.1 Solution — Token Tier Classification

```css
--palette-brand     → Palette (raw colour value, neutral name)
--colour-primary    → Semantic (describes purpose)
--blue              → Neither (not a good token — describes colour, not palette or semantic)
--colour-text       → Semantic (describes purpose)
--big-red           → Neither (describes appearance, not a real token system)
--space-m           → Semantic (spacing token — describes purpose/scale position)
```

---

### Exercise 2.2 Solution — Token System

```css
:root {
  /* Palette */
  --palette-neutral-900: #0f0f11;
  --palette-neutral-700: #3a3a4a;
  --palette-neutral-400: #888899;
  --palette-neutral-100: #f8f8fc;
  --palette-white:       #ffffff;
  --palette-brand:       #e94560;
  --palette-brand-light: #ff7a90;

  /* Semantic */
  --colour-text:          var(--palette-neutral-900);
  --colour-text-muted:    var(--palette-neutral-400);
  --colour-bg:            var(--palette-white);
  --colour-bg-subtle:     var(--palette-neutral-100);
  --colour-border:        #e2e2e8;
  --colour-primary:       var(--palette-brand);
  --colour-primary-hover: var(--palette-brand-light);

  /* Spacing */
  --space-xs: 0.5rem;
  --space-s:  1rem;
  --space-m:  1.5rem;
  --space-l:  2.5rem;
  --space-xl: 4rem;

  /* Shape */
  --radius-s:    4px;
  --radius-m:    8px;
  --radius-l:    16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-s: 0 1px 3px hsl(0 0% 0% / 8%);
  --shadow-m: 0 4px 6px hsl(0 0% 0% / 7%), 0 2px 4px hsl(0 0% 0% / 5%);
  --shadow-l: 0 10px 15px hsl(0 0% 0% / 7%);

  /* Transitions */
  --transition-fast:   150ms ease;
  --transition-normal: 250ms ease;
}

@media (prefers-color-scheme: dark) {
  :root {
    --colour-text:       var(--palette-neutral-100);
    --colour-text-muted: var(--palette-neutral-400);
    --colour-bg:         var(--palette-neutral-900);
    --colour-bg-subtle:  #1a1a2a;
    --colour-border:     #2a2a3a;
  }
}
```

---

## Class 3 Solutions

---

### Exercise 3.1 Solution — Flexbox Fill-In

A → `justify-content: flex-start`  
B → `justify-content: center`  
C → `justify-content: space-between`  
D → `justify-content: space-around`

---

### Exercise 3.2 Solution — Navigation

```css
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-s) var(--space-l);
  background: var(--colour-bg);
  border-bottom: 1px solid var(--colour-border);
  box-shadow: var(--shadow-s);
}

.site-nav {
  display: flex;
  gap: var(--space-m);
  list-style: none;
  padding: 0;
}

.site-nav a {
  color: var(--colour-text);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.site-nav a:hover {
  color: var(--colour-primary);
}

.site-nav a[aria-current="page"] {
  color: var(--colour-primary);
  font-weight: 700;
}
```

---

### Exercise 3.3 Solution — Page Shell

```css
body {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main"
    "footer";
  min-height: 100dvh;
}

.site-header {
  grid-area: header;
  background: var(--colour-bg);
  box-shadow: var(--shadow-s);
  position: sticky;
  top: 0;
  z-index: 10;
}

main {
  grid-area: main;
  padding: var(--space-xl) var(--space-l);
}

.site-footer {
  grid-area: footer;
  background: var(--colour-bg-subtle);
  border-top: 1px solid var(--colour-border);
  padding: var(--space-m);
  text-align: center;
  color: var(--colour-text-muted);
  font-size: var(--step--1);
}
```

---

### Exercise 3.5 Solution — Pricing Cards (Key Parts)

```css
/* Card layout */
.pricing-grid {
  display: flex;
  gap: var(--space-m);
  align-items: stretch;   /* All cards equal height */
}

.pricing-card {
  flex: 1 1 0;            /* Equal width */
  display: flex;
  flex-direction: column;  /* Stack content vertically */
  padding: var(--space-l);
  background: var(--colour-bg);
  border: 1px solid var(--colour-border);
  border-radius: var(--radius-l);
}

/* Button always at the bottom — regardless of content height */
.pricing-card__cta {
  margin-top: auto;       /* Pushes to bottom by consuming all available space */
}

/* Featured card */
.pricing-card--featured {
  border: 2px solid var(--colour-primary);
  background: color-mix(in oklch, var(--colour-primary) 5%, white);
  transform: scale(1.03);   /* Slightly larger */
  box-shadow: var(--shadow-l);
}

/* Mobile: stack vertically */
@media (max-width: 47.9375rem) {
  .pricing-grid {
    flex-direction: column;
  }
  .pricing-card--featured {
    transform: none;     /* No scale on mobile — looks wrong stacked */
  }
}
```

---

## Class 4 Solutions

---

### Exercise 4.1 Solution — Media Query Debugging

**Errors:**
1. The structure is **desktop-first** (uses `max-width`), not mobile-first. The base styles should be for the smallest screen.
2. The base `.grid` rule comes **after** the media queries — it should come **before**.

**Fixed version:**
```css
/* Base: single column on mobile */
.grid {
  grid-template-columns: 1fr;
}

/* Tablet: 2 columns */
@media (min-width: 48rem) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop: 3 columns */
@media (min-width: 64rem) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

### Exercise 4.2 Solution — Container Query Component

```css
.article-card-wrapper {
  container-type: inline-size;
  container-name: article-card;
}

.article-card {
  display: grid;
  grid-template-rows: auto 1fr;   /* Image top, content bottom — default */
  background: var(--colour-bg);
  border-radius: var(--radius-l);
  overflow: hidden;
  border: 1px solid var(--colour-border);
}

.article-card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

/* When the container is wide enough — side-by-side layout */
@container article-card (min-width: 25rem) {
  .article-card {
    grid-template-columns: 180px 1fr;
    grid-template-rows: 1fr;       /* Reset to single row */
  }

  .article-card__image {
    aspect-ratio: unset;           /* Let the image fill its grid cell height */
    height: 100%;
  }
}
```

---

### Exercise 4.3 Solution — Button Interaction System

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);

  background-color: var(--colour-primary);
  color: white;
  padding: var(--space-xs) var(--space-m);
  border-radius: var(--radius-m);
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: var(--step-0);
  font-weight: 600;
  text-decoration: none;

  transition:
    background-color var(--transition-fast),
    transform        var(--transition-fast),
    box-shadow       var(--transition-fast),
    opacity          var(--transition-fast);
}

.btn:hover:not(:disabled) {
  background-color: var(--colour-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-m);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: none;
}

.btn:focus-visible {
  outline: 3px solid var(--colour-primary);
  outline-offset: 3px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}
```

---

### Exercise 4.4 Solution — Staggered Entrance Animation

```css
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

.card {
  animation: fade-in-up 0.4s ease both;
  animation-delay: calc(var(--i, 0) * 80ms);
}

/* Set --i on each card */
.card:nth-child(1) { --i: 0; }
.card:nth-child(2) { --i: 1; }
.card:nth-child(3) { --i: 2; }
.card:nth-child(4) { --i: 3; }
.card:nth-child(5) { --i: 4; }
.card:nth-child(6) { --i: 5; }

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .card {
    animation: none;
  }
}
```

**Marking note:** Award full marks if the student uses JavaScript to set `--i` via inline style (`card.style.setProperty('--i', index)`) — this is equally valid and actually better for dynamic lists. The pure-CSS approach only works for a fixed, known number of cards.

---

*Deejoft Coding School | CSS Solutions | Tutor Reference — Do Not Distribute*
