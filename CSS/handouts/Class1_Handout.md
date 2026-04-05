# 📄 CSS Class 1 — Student Handout
### Selectors, the Cascade & the Box Model
**Deejoft Coding School** | Keep this — you'll reference it all course.

---

## A. The CSS Reset — Type This First on Every Project

```css
/* === RESET === */
*, *::before, *::after {
  box-sizing: border-box;   ← Width/height always means the TOTAL box size
  margin: 0;                ← Cancel all browser default margins
  padding: 0;               ← Cancel all browser default padding
}

html {
  font-size: 100%;          ← Respect user's browser font size setting
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  min-height: 100dvh;       ← dvh = dynamic viewport height (correct on mobile)
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img, video, canvas, svg {
  display: block;           ← Removes the gap that appears below inline images
  max-width: 100%;          ← Images never overflow their container
}

input, button, textarea, select {
  font: inherit;            ← Form controls use the page's font (they don't by default)
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word; ← Long URLs/words won't overflow containers
}
```

> ✏️ **Fill in:** Why do we set `font-size: 100%` on `html` instead of `font-size: 16px`?
>
> _________________________________________________________________

---

## B. CSS Selector Reference

```css
/* Type — all elements of this tag */
p { color: #444; }

/* Class — all elements with class="card" */
.card { background: white; }

/* ID — the one element with id="hero" */
#hero { min-height: 80dvh; }

/* Attribute — elements with a specific attribute or value */
a[target="_blank"]  { }   /* Has target="_blank" */
a[href^="https"]    { }   /* href STARTS WITH https */
a[href$=".pdf"]     { }   /* href ENDS WITH .pdf */

/* Pseudo-class — element in a specific state */
a:hover             { }   /* Mouse is over the link */
a:focus-visible     { }   /* Focused by keyboard navigation */
button:disabled     { }   /* Button is disabled */
li:first-child      { }   /* First <li> in its parent */
li:last-child       { }   /* Last <li> in its parent */
li:nth-child(odd)   { }   /* 1st, 3rd, 5th... items */
p:not(.intro)       { }   /* All <p> EXCEPT those with class="intro" */

/* Pseudo-element — a generated part of an element */
p::first-line       { }   /* First rendered line of a paragraph */
::selection         { }   /* Text the user has highlighted */
.card::before       { }   /* Generated content before .card's content */

/* Combinators */
nav a              { }   /* Any <a> INSIDE <nav> (descendant) */
ul > li            { }   /* <li> that is a DIRECT child of <ul> */
h2 + p             { }   /* <p> immediately AFTER an <h2> (adjacent) */
h2 ~ p             { }   /* ALL <p>s after an <h2> (general sibling) */
```

> ✏️ **Fill in:** Write a selector for all checkboxes (`type="checkbox"`) that are disabled:
>
> `___________________________________________`

---

## C. Specificity — The Score System

Every selector earns points in 3 columns. **Higher score = rule wins.**

```
  [  IDs  ]  [  Classes · Attributes · Pseudo-classes  ]  [  Types · Pseudo-elements  ]
      0                          0                                      0
```

> ✏️ **Fill in the specificity score for each:**

| Selector | ID | Class | Type | Score |
|----------|-----|-------|------|-------|
| `p` | ___ | ___ | ___ | 0-0-__ |
| `.card` | ___ | ___ | ___ | 0-__-0 |
| `p.intro` | ___ | ___ | ___ | 0-1-__ |
| `#hero` | ___ | ___ | ___ | __-0-0 |
| `#hero .nav a` | ___ | ___ | ___ | __-1-__ |
| `.card:hover` | ___ | ___ | ___ | 0-__-0 |

**When all else is equal — the rule that appears LAST wins.**

> ⚠️ Avoid `!important`. It signals broken specificity, not a fix. The only legitimate uses are accessibility utilities (`.sr-only`, `.hidden`).

---

## D. The Box Model

```
Every element is a box with 4 layers:

┌─────────────────────── MARGIN ──────────────────────────┐
│   Transparent. Pushes other elements away.              │
│   COLLAPSES vertically between adjacent block elements. │
│  ┌──────────────────── BORDER ──────────────────────┐   │
│  │  ┌─────────────── PADDING ─────────────────────┐ │   │
│  │  │  Has the background colour.                  │ │   │
│  │  │  ┌──────────── CONTENT ──────────────────┐  │ │   │
│  │  │  │  Text, child elements live here.       │  │ │   │
│  │  │  │  width × height applies here           │  │ │   │
│  │  │  │  (with content-box — the old default)  │  │ │   │
│  │  │  └──────────────────────────────────────── ┘  │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  └───────────────────────────────────────────────────── ┘   │
└─────────────────────────────────────────────────────────────┘
```

### `box-sizing: border-box` (in the reset)

```css
/* Without border-box: content-box (browser default) */
.box {
  width: 300px;   /* content is 300px */
  padding: 20px;  /* +20px each side = 300 + 40 = 340px TOTAL */
  border: 2px solid; /* +2px each side = 340 + 4 = 344px TOTAL */
}
/* The box is actually 344px wide — impossible to predict */

/* With border-box (our reset applies this globally) */
.box {
  width: 300px;   /* 300px is the TOTAL — padding eats into content */
  padding: 20px;  /* Does NOT add to the 300px */
  border: 2px solid; /* Does NOT add to the 300px */
}
/* The box is always exactly 300px — predictable */
```

### Margin Shorthand

```css
/* 4 values: top right bottom left (clockwise — TRouBLe) */
margin: 10px 20px 10px 20px;

/* 2 values: top/bottom  left/right */
margin: 10px 20px;

/* 1 value: all four sides */
margin: 10px;

/* Centre horizontally */
margin-inline: auto;   /* Modern logical property */
margin: 0 auto;        /* Traditional — same result */
```

> ✏️ **Fill in:** The space between an `<h2>` with `margin-bottom: 24px` and a `<p>` with `margin-top: 16px` is NOT 40px. What is it, and why?
>
> It is ________ px because _____________________________________________

---

## ⚡ Class 1 Quick Reference

| Concept | Rule |
|---------|------|
| Linking CSS | `<link rel="stylesheet" href="./css/main.css">` in `<head>` |
| CSS comment | `/* comment */` — not `//` |
| Semicolons | Required after every declaration |
| Class selector | Starts with `.` — `.card` |
| ID selector | Starts with `#` — `#hero` |
| `:focus-visible` | Use this instead of `:focus` for outline styles |
| Descendant vs child | Space = any depth. `>` = direct child only. |
| Specificity rule | IDs > Classes > Types. Later rule wins ties. |
| `!important` | Avoid except for accessibility utilities |
| `box-sizing: border-box` | First line of every reset. Width = total size. |
| Margin collapse | Vertical margins between blocks take the MAX, not the sum |

---

*Deejoft Coding School | CSS Class 1 | Bring to Class 2*
