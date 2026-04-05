# 📋 CSS Class 1 — Lesson Plan (Tutor Script)
### Selectors, the Cascade & the Box Model
**Duration:** ~2 hours | **Format:** Live coding + DevTools exploration

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:15 | Welcome back + connecting CSS to the HTML they already know |
| 0:15 – 0:40 | CSS syntax, linking, the reset |
| 0:40 – 1:10 | Selectors — type, class, pseudo-class, attribute, combinators |
| 1:10 – 1:40 | Specificity & the cascade |
| 1:40 – 2:00 | The box model |

---

## 🛠 Setup (Do Before Students Arrive)
- The HTML portfolio page from the HTML final project open in VS Code
- A blank `css/main.css` file linked from it
- Chrome DevTools open — Styles panel visible
- `specificity.keegan.st` open in a tab for live specificity calculation demos

---

## 🎤 PART A — Connecting CSS to HTML (0:00 – 0:15)

### Opening (5 min)

**[SAY]:**
> "Last course we built a skeleton — valid, semantic, accessible HTML. Today we start making it look like something. But before we write a single CSS rule, I want to set one expectation: CSS is not magic, and it is not guesswork. It has a precise, learnable logic. Every time a style does not apply the way you expect, there is an exact reason — and today we are going to learn how to find it."

**[DO]:** Open the HTML portfolio page in the browser. Show it with no CSS — plain, unstyled.

**[SAY]:**
> "This is what the browser applies by default — called the user-agent stylesheet. It is different in every browser. Our first job is to cancel those defaults so we start from a known, consistent baseline. That is the CSS reset."

---

### Linking CSS (5 min)

**[SAY]:**
> "There are three ways to write CSS. Two of them are mostly wrong."

**[WRITE ON BOARD:]**
```
1. External file  →  <link rel="stylesheet" href="./css/main.css">  ← USE THIS
2. <style> block  →  inside <head>                                   ← only for critical CSS
3. Inline style   →  style="color: red" on the element              ← almost never
```

**[SAY]:**
> "Inline styles have the highest specificity of anything except `!important`. They are nearly impossible to override cleanly. They mix structure and presentation — exactly what HTML and CSS separation is meant to prevent. You will see them in React's JSX for dynamic values — but in plain HTML, they are a last resort."

**[DO]:** Show the `<link>` already in the HTML portfolio `<head>`. Save an empty `main.css`. Show the browser reloading — nothing changes yet, but the link works.

---

## 🎤 PART B — CSS Syntax & the Modern Reset (0:15 – 0:40)

### CSS Syntax (5 min)

**[TYPE in `main.css`]:**
```css
/*
  CSS rule anatomy:

  selector  {  property:    value;    }
  ↓            ↓            ↓
*/
h1         {  color:        #1a1a2e;  }
```

**[SAY]:**
> "One rule, three parts. The selector — who gets styled. The property — what changes. The value — how it changes. The semicolon after each declaration is required. The curly braces wrap the declarations. The comment syntax is `/* */` — not `//` like in JavaScript."

**[TYPE]:**
```css
/* Multiple declarations, one selector */
.card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
}
```

**[SAY]:**
> "Convention: one declaration per line. Properties in a consistent order — layout properties first (`display`, `width`, `height`), then box model (`padding`, `margin`, `border`), then visual (`color`, `background`, `font`). Your team may have different conventions but the key is: be consistent."

---

### The Modern CSS Reset (15 min)

**[SAY]:**
> "Before writing any design styles, we write a reset. This is a set of rules that cancel browser defaults and set sane global baselines. Open your handout, Section B — we are going to type this together and I will explain each block."

**[TYPE — block by block, explain as you go]:**

```css
/* === RESET === */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

**[SAY]:**
> "The universal selector `*` targets every element. `*::before` and `*::after` extend that to pseudo-elements. We are doing three things: setting `box-sizing: border-box` — I will explain this in depth at the end of class. Zeroing all `margin` and `padding` — browsers add their own defaults that vary between Chrome, Firefox, and Safari. We cancel them all and add our own intentionally."

```css
html {
  font-size: 100%;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}
```

**[SAY]:**
> "`font-size: 100%` — this respects whatever the user has set as their browser's base font size. If you write `font-size: 16px` here, you override that preference. Never set an absolute px on `html` — let the user's preference win. `scroll-behavior: smooth` makes anchor link jumps animate instead of jumping instantly."

```css
body {
  min-height: 100dvh;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
```

**[SAY]:**
> "`100dvh` — the `d` stands for 'dynamic'. On mobile browsers, the address bar collapses when you scroll, which changes the viewport height. `100vh` (the old way) calculates before the bar collapses and causes the page to be slightly too tall. `100dvh` recalculates correctly. `line-height: 1.6` is a unitless multiplier — 1.6 times the current font size. Better than `px` because it scales with the text."

```css
img, video, canvas, svg {
  display: block;
  max-width: 100%;
}
```

**[SAY]:**
> "`display: block` on images fixes a persistent beginner mystery: the gap that appears below inline images. Images are `inline` by default — they sit on the text baseline, leaving a small gap underneath. `block` removes that. `max-width: 100%` means images can never overflow their container — essential for responsive layouts."

```css
input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
```

**[SAY]:**
> "Form elements do not inherit the page font by default — a browser quirk. `font: inherit` fixes that: your form fields now use the same font as the rest of the page. `overflow-wrap: break-word` prevents long unspaced strings — URLs, email addresses — from overflowing their container and breaking layouts."

**[RELOAD the browser with just the reset applied.]**

**[SAY]:**
> "Notice: the page looks almost identical to before, but now it is on a neutral baseline. Every browser is showing the same thing. From here, we build intentionally."

---

## 🎤 PART C — Selectors (0:40 – 1:10)

**[SAY]:**
> "Selectors answer one question: 'Which element or elements does this rule apply to?' Let me walk you through the six categories you will use every day."

### Type & Class Selectors (5 min)

**[TYPE]:**
```css
/* Type selector — targets all elements of this type */
p {
  line-height: 1.7;
  color: #444;
}

/* Class selector — targets elements with class="..." */
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
}

/* Multiple selectors — same rule for both */
h1, h2, h3 {
  font-weight: 700;
  color: #1a1a2e;
}
```

**[SAY]:**
> "The dot before a class name is what makes it a class selector. Without the dot, `card` would be a type selector targeting `<card>` elements — which do not exist. This is the number-one typo in CSS. If a rule is not applying, check for a missing or extra dot."

---

### Pseudo-class Selectors (10 min)

**[SAY]:**
> "Pseudo-classes select elements in a specific state. The colon is the signal."

**[TYPE]:**
```css
/* State-based */
a:hover        { color: #e94560; text-decoration: underline; }
a:focus-visible { outline: 3px solid #e94560; outline-offset: 2px; }
button:disabled { opacity: 0.5; cursor: not-allowed; }

/* Structural */
li:first-child  { margin-top: 0; }
li:last-child   { margin-bottom: 0; }
li:nth-child(odd) { background-color: #f8f8f8; }

/* Negation */
p:not(.intro) { color: #555; }
```

**[DEMO the hover state live in the browser. Then switch to DevTools → Styles → Force :hover. Show the style appearing in the panel.]**

**[SAY]:**
> "Two focus pseudo-classes exist: `:focus` and `:focus-visible`. `:focus` triggers any time an element is focused — including mouse clicks. That means clicking a button shows the focus ring, which looks wrong. `:focus-visible` is smarter — it only shows the focus ring when the user is navigating by keyboard. Use `:focus-visible` for your outline styles."

---

### Attribute Selectors (5 min)

**[TYPE]:**
```css
/* Elements with a specific attribute */
a[target="_blank"] { /* External links */ }

/* Value starts with */
a[href^="https"]   { color: green; }      /* Secure links */

/* Value ends with */
a[href$=".pdf"]    { font-weight: bold; } /* PDF links */

/* Specific input types */
input[type="email"] { border-color: blue; }
input[type="checkbox"] { accent-color: #e94560; }
```

**[SAY]:**
> "Attribute selectors let you target elements based on their HTML attributes, not just class names. The most useful case: `a[href^='https']` for secure links, `a[href$='.pdf']` for PDF downloads, and `input[type='...']` to style different input types differently without needing class names."

---

### Combinator Selectors (5 min)

**[TYPE]:**
```css
nav a              { color: white; }         /* Descendant — any <a> inside <nav> */
ul > li            { list-style: disc; }    /* Child — direct child only */
h2 + p             { font-size: 1.1rem; }   /* Adjacent sibling — <p> immediately after <h2> */
h2 ~ p             { color: #555; }         /* General sibling — ALL <p>s after <h2> */
```

**[SAY]:**
> "The most important distinction: descendant (space) vs. child (`>`). `nav a` targets any `<a>` anywhere inside `<nav>` — three levels deep, ten levels deep, does not matter. `nav > a` targets only `<a>` elements that are direct children of `<nav>`. If your `<a>` is inside a `<li>` inside the `<nav>`, the child selector will not match it."

**[DO — live demo: write `nav a` and `nav > a` on a nav with nested links. Show which ones get styled.]**

---

## 🎤 PART D — Specificity & the Cascade (1:10 – 1:40)

**[SAY]:**
> "This is the topic that frustrates beginners more than anything in CSS. 'Why is my style not applying?' is almost always a specificity question. Once you understand this, you will never need `!important`."

### The Cascade (5 min)

**[SAY]:**
> "CSS stands for Cascading Style Sheets. The cascade is the algorithm that decides which rule wins when two rules conflict. It works in this order:"

**[WRITE ON BOARD:]**
```
1. Origin       → Browser defaults < Author styles < User's accessibility overrides
2. Specificity  → Which selector is more specific?
3. Order        → When all else is equal, the LAST rule wins
```

**[DO]:** Write two conflicting rules. Show order wins when specificity is equal:
```css
p { color: blue; }
p { color: red; }  /* This one wins — comes later */
```

---

### Specificity (20 min)

**[SAY]:**
> "Specificity is a score. Every selector earns points in three columns. The higher the score, the more important the rule. The columns are: ID, Class/Attribute/Pseudo-class, Type/Pseudo-element."

**[DRAW ON BOARD:]**
```
     [ IDs ]   [ Classes · Attrs · Pseudo-classes ]   [ Types · Pseudo-elements ]
        0                      0                                   0
```

**[WALK THROUGH examples, writing the score on the board for each:]**
```css
p                          /* 0-0-1 */
.card                      /* 0-1-0 */
p.intro                    /* 0-1-1 */
.nav a:hover               /* 0-2-1 */
#header                    /* 1-0-0 */
#header .nav a             /* 1-1-1 */
```

**[LIVE DEMO at `specificity.keegan.st` — paste selectors and show the score visualised.]**

**[SAY]:**
> "The columns do not overflow into each other. No matter how many class selectors you add, they can never beat a single ID. Think of it like a phone number: 0-99-99 is still less than 1-0-0."

**[TYPE this conflict — ask students which colour they expect before showing the result:]**
```css
p           { color: black;  }   /* 0-0-1 */
.intro      { color: blue;   }   /* 0-1-0 */
#hero p     { color: green;  }   /* 1-0-1 */
p.intro     { color: purple; }   /* 0-1-1 */

/* Answer for <p class="intro"> inside <div id="hero">:
   All four rules apply. Highest score wins: #hero p at 1-0-1 → green */
```

### The `!important` Warning (5 min)

**[SAY]:**
> "`!important` overrides the entire specificity system — including inline styles. It is the nuclear option. In a professional codebase, `!important` in your component styles is a code smell. It tells anyone reading it: 'I did not understand why my rule was losing, so I forced it.' The fix is almost never `!important` — it is understanding why your selector was being beaten and fixing the specificity properly."

```css
/* The only legitimate uses of !important */
.sr-only { position: absolute !important; }   /* Accessibility utility — must always win */
.hidden  { display: none !important; }        /* Utility that must always override */
```

---

## 🎤 PART E — The Box Model (1:40 – 2:00)

**[SAY]:**
> "Every element on the page is a box. Not metaphorically — literally. It has four rectangular layers around its content. Understanding these layers is what gives you control over spacing."

**[DRAW THE BOX MODEL on the board:]**
```
┌───────────────── MARGIN ─────────────────────┐
│  ┌──────────────── BORDER ──────────────────┐ │
│  │  ┌─────────── PADDING ─────────────────┐ │ │
│  │  │                                     │ │ │
│  │  │           CONTENT                   │ │ │
│  │  │        (width × height)             │ │ │
│  │  └─────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**[SAY]:**
> "Margin: the invisible space outside the border. It pushes other elements away. It is transparent — you can never give it a background colour. Padding: the space inside the border between the border and the content. It has the element's background colour. Border: the line between padding and margin. Content: where your text and children live."

### The `box-sizing` Revelation (10 min)

**[SAY]:**
> "Here is the single most important thing in the box model. Watch closely."

**[TYPE — without the reset, so box-sizing is still content-box]:**
```css
.box {
  width: 300px;
  padding: 20px;
  border: 2px solid black;
}
```

**[SAY]:**
> "How wide do you think `.box` is? 300 pixels?"

**[OPEN DevTools — show the computed width is 344px.]**

**[SAY]:**
> "344 pixels. The browser added the padding on each side (20 + 20 = 40) and the border on each side (2 + 2 = 4). 300 + 40 + 4 = 344. This is `box-sizing: content-box` — the browser default. The `width` applies to the content only, and then padding and border are added on top."
>
> "This makes layout arithmetic impossible. You cannot just look at a design and know what `width` to write."

**[NOW — show the reset's effect:]**
```css
/* Already in our reset: */
*, *::before, *::after { box-sizing: border-box; }

/* Now: */
.box {
  width: 300px;       /* This IS the total width */
  padding: 20px;      /* Eats into content, does not add to 300px */
  border: 2px solid;  /* Eats into content, does not add to 300px */
}
```

**[SHOW DevTools again — width is 300px exactly.]**

**[SAY]:**
> "`border-box` means the `width` is the TOTAL width — padding and border eat into the content area instead of adding to it. The box is always the size you say it is. This is why `box-sizing: border-box` is always the first thing in every reset."

### Margin Collapse (5 min)

**[SAY]:**
> "One more box model behaviour that catches everyone: margin collapse. Vertical margins between adjacent block elements do not add — they collapse to the larger of the two."

**[TYPE and show in browser:]**
```css
h2 { margin-bottom: 24px; }
p  { margin-top: 16px; }
/* The gap between an <h2> and the following <p> is NOT 40px — it is 24px */
```

**[SAY]:**
> "This is not a bug. It is intentional. It ensures consistent spacing in body text — you do not get double spacing between elements. The rule: margin collapse only happens vertically, only between block elements, and does not happen in Flexbox or Grid containers."

---

## 🔚 Wrap-Up (Last 3 min)

**[SAY]:**
> "Three things from today that will save you hours of debugging: one — `box-sizing: border-box` in your reset, always. Two — when a style is not applying, open DevTools and find the rule in the Styles panel — look for a strikethrough, which means it was overridden. Three — specificity beats order, and IDs beat classes."
>
> "Next class: design tokens, colours, and typography. We will build a professional design system in CSS that makes every colour, font size, and spacing value consistent across the whole page."

---

## 📎 Tutor Notes

**Common mistakes in Class 1:**
- Targeting by ID in CSS for component styles — enforce the habit of class selectors
- Adding `!important` to fix a broken style instead of fixing the specificity
- Writing `margin: top right bottom left` — students often confuse the shorthand order (clockwise from top: T R B L, or TRBL, remember as "TRouBLe")
- Forgetting semicolons — the most common parse error

**DevTools tip to teach:** Right-click any element → Inspect → Styles panel. Strikethrough = overridden. Crossed-out rule + line number tells you exactly which rule won. This is the primary debugging tool for all of CSS.
