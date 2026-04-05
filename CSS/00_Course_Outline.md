# 🎨 CSS Course — Tutor's Master Outline
### Deejoft Coding School | Web Development Track
**Instructor Notes — Fundamentals to Responsive Design**

---

> **Dear Tutor,**
> CSS is where students first experience the *magic* of web development — they see their page transform visually in real time. Leverage that excitement. The danger is that students start hacking CSS randomly, applying `!important` everywhere and guessing at values. Your job is to build *systematic thinkers* who understand the Box Model, the Cascade, and layout tools well enough to predict what their code will do before they write it.

---

## 🗺️ Course at a Glance

| Week | Focus | Key Deliverable |
|------|-------|-----------------|
| Week 1 | CSS Fundamentals & Selectors | Styled "About Me" Page |
| Week 2 | The Box Model | Styled Card Component |
| Week 3 | Typography & Colours | Brand Style Guide Page |
| Week 4 | Flexbox | Navigation Bar + Card Row |
| Week 5 | CSS Grid | Full Page Layout |
| Week 6 | Responsive Design & Best Practices | Responsive Portfolio Site |

**Prerequisites:** HTML5 (Weeks 1–6) — students must have solid HTML before styling  
**Next Course:** JavaScript

---

## 🎯 Course Philosophy

Three mental models to teach from Week 1 and reinforce every week:

1. **The Cascade** — CSS is read top-to-bottom. When rules conflict, specificity and order determine the winner.
2. **The Box Model** — Every element is a box. Mastering padding, margin, and border is mastering layout.
3. **Flow vs. Flex vs. Grid** — The browser has three layout systems. Know when to use each one.

---

## 📅 Week 1: The Fundamentals

### Module 1 — Introduction to CSS

**Tutor Guidance:**
The best way to open this course is with a before-and-after. Have a plain HTML page on the projector. Apply a stylesheet live while students watch. The reaction is always positive — use that energy.

**The Three Ways to Add CSS (And Why One Wins):**

```html
<!-- Method 1: Inline — styles go directly on the element -->
<!-- ❌ Avoid: Hard to maintain, only affects one element, can't be reused -->
<h1 style="color: red; font-size: 32px;">Hello</h1>

<!-- Method 2: Internal — styles go inside a <style> tag in <head> -->
<!-- ⚠️ Use for: Single-page demos, quick prototypes -->
<head>
  <style>
    h1 { color: red; }
  </style>
</head>

<!-- Method 3: External — styles live in a separate .css file -->
<!-- ✅ Always use this in real projects -->
<head>
  <link rel="stylesheet" href="./styles/main.css">
</head>
```

**Anatomy of a CSS Rule:**
```css
/* Selector { Property: Value; } */

h1 {
  color: #1a1a2e;        /* Property: Value */
  font-size: 2rem;
  margin-bottom: 16px;
}
```

> **Teach the vocabulary:** The full block is a *rule*. `h1` is the *selector*. `color: #1a1a2e;` is a *declaration*. `color` is the *property*. `#1a1a2e` is the *value*.

---

### Module 2 — Selectors and The Cascade

**Tutor Guidance:**
Specificity is the concept students struggle with most in their first month. Teach it visually. Draw the three columns on the board.

**The Three Core Selectors:**
```css
/* Type selector — targets ALL elements of this type */
p {
  color: #333;
}

/* Class selector — targets elements with class="btn" */
/* The dot (.) is the class identifier */
.btn {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
}

/* ID selector — targets the ONE element with id="main-header" */
/* The hash (#) is the ID identifier */
#main-header {
  background-color: #1a1a2e;
}
```

**Grouping and Combining Selectors:**
```css
/* Grouping — apply the same rule to multiple selectors */
h1, h2, h3, h4 {
  font-family: 'Georgia', serif;
  font-weight: bold;
}

/* Chaining — element MUST match all conditions */
/* This targets <p class="intro"> but NOT <div class="intro"> */
p.intro {
  font-size: 1.2rem;
  color: #555;
}

/* Descendant — targets any <a> that is INSIDE a <nav> */
nav a {
  text-decoration: none;
  color: white;
}
```

**Specificity — The Tie-Breaking System:**

> **The Three-Column Rule:**
> Each selector scores points in three columns. The browser applies the rule with the highest score.

```
|  ID  |  Class  |  Type  |
|  0   |   0     |   0    |
```

```css
p              { color: black; }   /* 0-0-1 */
.intro         { color: blue; }    /* 0-1-0 */
p.intro        { color: green; }   /* 0-1-1 */
#main          { color: red; }     /* 1-0-0 */
```

> **Interactive Exercise:** Write four rules targeting the same `<p id="main" class="intro">` element. Ask students to predict which colour wins. Then show them in the browser. This *sticks*.

> **`!important` Warning:** Show students what it does, then tell them: "In professional code, using `!important` is usually a sign that your specificity structure needs to be fixed, not overridden. Use it as a last resort."

---

### 📝 Week 1 Assignment: Styled "About Me" Page

Apply CSS to your HTML Week 1 bio page:
- Link an external stylesheet
- Style `h1`, `h2`, `p` using type selectors
- Create a `.highlight` class and apply it to at least one element
- Give the `<body>` a `background-color`
- Use CSS comments to label each section of your stylesheet

---

## 📅 Week 2: The Box Model

### Module 3 — The Box Model & Dimensions

**Tutor Guidance:**
Open Chrome DevTools and navigate to the Elements → Computed panel. Show students the colourful box model diagram. Every student should have DevTools open throughout this module — they should be *seeing* margin, padding, and border update live.

**The Four Layers:**
```
┌─────────────────────────────────────────┐
│               MARGIN (16px)             │   ← Transparent space OUTSIDE
│   ┌─────────────────────────────────┐   │      the border, pushes other
│   │           BORDER (2px)          │   │      elements away
│   │   ┌─────────────────────────┐   │   │
│   │   │       PADDING (12px)    │   │   │   ← Space INSIDE the border,
│   │   │   ┌─────────────────┐   │   │   │      between border & content
│   │   │   │                 │   │   │   │
│   │   │   │    CONTENT      │   │   │   │   ← Where text/images live
│   │   │   │                 │   │   │   │
│   │   │   └─────────────────┘   │   │   │
│   │   └─────────────────────────┘   │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

```css
.card {
  /* Content dimensions */
  width: 300px;
  height: auto;       /* auto = grows with content */

  /* Padding: space inside (top, right, bottom, left) */
  padding: 20px;      /* all four sides = 20px */
  padding: 16px 24px; /* vertical=16px, horizontal=24px */

  /* Border */
  border: 2px solid #ddd;
  border-radius: 8px; /* rounded corners */

  /* Margin: space outside */
  margin: 0 auto;     /* 0 top/bottom, auto left/right = CENTERS the element */
}
```

**The `box-sizing` Fix — Teach This Immediately:**
```css
/* ❌ Default (content-box): width does NOT include padding and border */
/* A 300px element with 20px padding is actually 340px wide — confusing! */

/* ✅ Best practice: Apply to everything, always */
*, *::before, *::after {
  box-sizing: border-box;
  /* Now: width INCLUDES padding and border. A 300px element stays 300px. */
}
```

> **Analogy:** `content-box` is like ordering a box that is exactly 30cm wide on the inside, but you don't know how thick the walls are. `border-box` is like ordering a box whose *outer* dimensions are exactly 30cm. You always know what you're getting.

**Block vs. Inline vs. Inline-Block:**
```css
/* BLOCK elements: Take up full width, stack vertically */
/* Default: div, h1-h6, p, section, article, ul, li */
div { display: block; }

/* INLINE elements: Flow within text, width/height ignored */
/* Default: span, a, strong, em, img */
span { display: inline; }

/* INLINE-BLOCK: Flows like inline, but respects width/height */
/* Great for: navigation items, buttons displayed in a row */
.nav-item { display: inline-block; }
```

---

## 📅 Week 3: Typography & Colours

### Module 4 — Typography

**Tutor Guidance:**
Typography is where students start to develop design taste. Show examples of good and bad typography side by side. The goal is for them to understand that typography is a communication tool, not just decoration.

**Font Properties:**
```css
body {
  /* Font stack: browser tries each font in order */
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  
  font-size: 16px;   /* Base size — 16px is the browser default */
  line-height: 1.6;  /* No unit = multiplier of font-size. 1.6 × 16px = 25.6px */
  font-weight: 400;  /* 100=thin, 400=normal, 700=bold, 900=black */
}

h1 {
  font-size: 2.5rem; /* rem = relative to root font size. 2.5 × 16 = 40px */
  font-weight: 700;
  letter-spacing: -0.5px;  /* Tight tracking for large headings */
  line-height: 1.2;        /* Tighter line-height for headings */
}

p {
  font-size: 1rem;    /* 1rem = 16px = base size */
  max-width: 65ch;    /* ch = width of "0" character. Limit line length for readability */
  margin-bottom: 1em; /* em = relative to the element's own font-size */
}
```

**Google Fonts — Adding Custom Fonts:**
```html
<!-- In <head>, BEFORE your stylesheet link -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
```
```css
body {
  font-family: 'Inter', sans-serif;
}
```

**Colour Systems:**
```css
.example {
  /* Keyword colours (fine for learning, avoid in production) */
  color: red;
  background-color: white;

  /* Hex codes — 6 digit code, #RRGGBB */
  color: #1a1a2e;        /* Dark navy */
  color: #e94560;        /* Accent red */
  color: #ffffff;        /* White */

  /* RGB */
  color: rgb(26, 26, 46);

  /* RGBA — A = Alpha (opacity: 0 = transparent, 1 = opaque) */
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */

  /* HSL (Hue, Saturation, Lightness) — easiest to reason about */
  color: hsl(220, 30%, 15%);            /* Dark navy */
  color: hsl(220, 30%, 90%);            /* Light version of same hue */
}
```

---

## 📅 Week 4: Flexbox

### Module 5 — Flexbox

**Tutor Guidance:**
Flexbox is a *turning point* in the course. Before Flexbox, layout in CSS was painful. After Flexbox, students can build things they've always wanted to build. Use visual diagrams heavily. The "flex container vs. flex items" mental model must be solid before anything else.

**The Core Mental Model:**
```
┌─────────────────────────────── FLEX CONTAINER ───────────────────────────┐
│                                                                           │
│  [  Item 1  ]  [  Item 2  ]  [  Item 3  ]  ←── FLEX ITEMS               │
│                                                                           │
│  ───────────────── Main Axis (→ default) ──────────────────▶             │
│                                                                           │
│  Cross Axis (↓)                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

**Key Properties — Always Explain Parent vs. Child:**
```css
/* ===== PROPERTIES ON THE PARENT (container) ===== */
.navbar {
  display: flex;              /* ACTIVATE Flexbox — turns direct children into flex items */
  
  flex-direction: row;        /* Main axis direction: row (→) | column (↓) */
  justify-content: space-between; /* Align items along MAIN axis */
  align-items: center;        /* Align items along CROSS axis */
  flex-wrap: wrap;            /* Allow items to wrap to next line */
  gap: 16px;                  /* Space between items (modern, preferred over margin) */
}

/* justify-content values: */
/* flex-start | flex-end | center | space-between | space-around | space-evenly */

/* align-items values: */
/* flex-start | flex-end | center | stretch | baseline */


/* ===== PROPERTIES ON THE CHILDREN (items) ===== */
.nav-logo {
  flex-shrink: 0;  /* Don't shrink this item even if space is tight */
}

.nav-links {
  flex: 1;         /* Shorthand: grow to fill available space */
}
```

**Practical Example — Navigation Bar:**
```css
/* HTML: <nav class="navbar"><div class="logo">Logo</div><ul class="links">...</ul></nav> */

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background-color: #1a1a2e;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
}

.links {
  display: flex;  /* Flex INSIDE a flex item — totally valid, very common */
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.links a {
  color: white;
  text-decoration: none;
}
```

**Practical Example — Card Grid Row:**
```css
.card-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;  /* Cards drop to next line if they don't fit */
}

.card {
  flex: 1 1 280px;  /* grow: 1, shrink: 1, basis: 280px (minimum width) */
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 24px;
}
```

---

## 📅 Week 5: CSS Grid

### Module 6 — CSS Grid

**Tutor Guidance:**
Grid is Flexbox's "big sibling." Use Grid for two-dimensional layouts (rows AND columns simultaneously). Use Flexbox for one-dimensional layouts (a row of items, or a column of items). Teach them to choose the right tool.

**Flexbox vs. Grid — The Decision Rule:**
> - **Flexbox:** You know what the items are, and you want them to arrange themselves in a line. *"I have 5 nav links and I want them in a row."*
> - **Grid:** You know what the layout looks like, and you want to place items into it. *"I want a 12-column grid with a sidebar and main content area."*

**Grid Fundamentals:**
```css
.page-layout {
  display: grid;
  
  /* Define columns: 3 equal columns */
  grid-template-columns: 1fr 1fr 1fr;
  
  /* Shorthand for the above: */
  grid-template-columns: repeat(3, 1fr);
  
  /* Mixed column widths: fixed sidebar + flexible main */
  grid-template-columns: 260px 1fr;
  
  /* Define rows */
  grid-template-rows: 64px 1fr auto;
  
  /* Gap between cells */
  gap: 24px;
  
  /* Named areas — most readable approach for page layouts */
  grid-template-areas:
    "header  header"
    "sidebar main  "
    "footer  footer";
  
  min-height: 100vh;
}

/* Place items into named areas */
.site-header  { grid-area: header; }
.site-sidebar { grid-area: sidebar; }
.site-main    { grid-area: main; }
.site-footer  { grid-area: footer; }
```

**Card Grid with Auto-Fill:**
```css
/* "Give me as many columns as will fit, each at least 280px wide" */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
```

---

## 📅 Week 6: Responsive Design

### Module 7 — Responsive Design & Media Queries

**Tutor Guidance:**
In 2025, more than half of web traffic comes from mobile devices. Responsive design is not optional. Teach Mobile First: start with small screens, add complexity as the viewport grows.

**Viewport Meta Tag — Must Be in Every Page:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
> Without this, mobile browsers zoom out to show the "desktop" version. This tag tells the browser: "Use the actual device width."

**Media Queries:**
```css
/* ===== MOBILE FIRST (Start small, add breakpoints upward) ===== */

/* Base styles: Mobile (< 768px) */
.card-container {
  display: flex;
  flex-direction: column;  /* Stack cards vertically on mobile */
  gap: 16px;
}

/* Tablet (768px and up) */
@media (min-width: 768px) {
  .card-container {
    flex-direction: row;    /* Side by side on tablet */
    flex-wrap: wrap;
  }
  
  .card {
    flex: 1 1 calc(50% - 8px); /* Two per row */
  }
}

/* Desktop (1024px and up) */
@media (min-width: 1024px) {
  .card {
    flex: 1 1 calc(33.333% - 16px); /* Three per row */
  }
}
```

**Common Breakpoints (as a guide, not a rule):**
```css
/* Mobile first breakpoints */
@media (min-width: 480px)  { /* Large mobile  */ }
@media (min-width: 768px)  { /* Tablet        */ }
@media (min-width: 1024px) { /* Small desktop */ }
@media (min-width: 1280px) { /* Large desktop */ }
```

**CSS Custom Properties (Variables):**
```css
/* Declare in :root to make available globally */
:root {
  /* Colours */
  --colour-primary:    #1a1a2e;
  --colour-accent:     #e94560;
  --colour-bg:         #f8f9fa;
  --colour-text:       #333333;
  
  /* Typography */
  --font-sans:         'Inter', sans-serif;
  --font-size-base:    1rem;
  
  /* Spacing */
  --space-sm:   8px;
  --space-md:   16px;
  --space-lg:   24px;
  --space-xl:   48px;
  
  /* Border */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  16px;
}

/* Use variables everywhere */
.btn-primary {
  background-color: var(--colour-accent);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
}
```

---

### 🏆 Final Project: Responsive Portfolio Website

Students take their HTML Portfolio from the HTML course and apply professional CSS.

**Evaluation Rubric:**

| Criterion | Points |
|-----------|--------|
| External stylesheet linked correctly | 5 |
| CSS Variables used for colours and spacing | 10 |
| Box Model applied correctly (no overflow or unintended spacing) | 15 |
| Navigation built with Flexbox | 15 |
| Card/Project section built with CSS Grid | 15 |
| Page fully responsive (mobile, tablet, desktop) | 20 |
| Typography is readable (good font-size, line-height, max-width) | 10 |
| `box-sizing: border-box` applied globally | 5 |
| Consistent colour palette using CSS Variables | 5 |
| **Total** | **100** |

---

## 📚 Recommended Resources

- **MDN CSS Reference:** [developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **Flexbox Froggy:** [flexboxfroggy.com](https://flexboxfroggy.com) — gamified Flexbox practice
- **Grid Garden:** [cssgridgarden.com](https://cssgridgarden.com) — gamified Grid practice
- **CSS Tricks:** [css-tricks.com/snippets/css/a-guide-to-flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox)

---

*Deejoft Coding School — Instructor Materials | CSS Track*  
*Last Updated: 2025*
