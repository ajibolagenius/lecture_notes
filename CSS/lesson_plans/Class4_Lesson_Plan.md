# 📋 CSS Class 4 — Lesson Plan (Tutor Script)
### Responsive Design, Transitions & Modern CSS
**Duration:** ~2 hours | **Format:** Live coding + final project launch

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap quiz |
| 0:10 – 0:45 | Responsive design — mobile-first, media queries, container queries |
| 0:45 – 1:05 | `:has()` selector |
| 1:05 – 1:30 | Transitions, animations & `prefers-reduced-motion` |
| 1:30 – 1:45 | CSS Nesting |
| 1:45 – 2:00 | Final project brief + start |

---

## 🛠 Setup (Do Before Students Arrive)
- A mobile device (or DevTools device simulation) ready for live demo
- Two versions of the same component: one using media queries, one using container queries — to show the difference
- DevTools open, device toolbar visible

---

## 🎤 PART A — Recap (0:00 – 0:10)

**[WRITE on the board — answer as a class:]**
1. "What `justify-content` value puts space between items but NOT on the outside edges?" → `space-between`
2. "What is the `flex` shorthand for 'grow to fill space, shrink if needed, start at 0'?" → `flex: 1`
3. "What does `grid-column: 1 / -1` mean?" → Span from the first to the last column line
4. "What CSS function makes a grid column count automatically responsive?" → `repeat(auto-fill, minmax(...))`
5. "What property assigns an element to a named grid area?" → `grid-area`

---

## 🎤 PART B — Responsive Design (0:10 – 0:45)

### Mobile-First vs Desktop-First (10 min)

**[SAY]:**
> "Responsive design is not about screen sizes. It is about content. The question is not 'what should this look like at 768px?' The question is 'at what point does this layout start to break or feel wrong?'"

**[SAY]:**
> "Two approaches: mobile-first and desktop-first. Mobile-first means you write your base styles for the smallest screen, then use `min-width` media queries to progressively add complexity for larger screens. Desktop-first is the reverse — you write for large screens, then use `max-width` to simplify for smaller ones."

**[WRITE ON BOARD:]**
```
MOBILE FIRST  →  base styles = small screen
              →  add complexity with min-width queries as screen gets bigger
              →  CORRECT, MODERN approach ✓

DESKTOP FIRST →  base styles = large screen
              →  simplify with max-width queries as screen gets smaller
              →  Results in heavier mobile CSS, harder to maintain ✗
```

**[SAY:]:**
> "The practical reason mobile-first wins: mobile networks are slower, mobile processors are less powerful, and mobile users now outnumber desktop users globally. You serve the least capable device the simplest CSS and layer on complexity only for devices that can handle it."

---

### Media Queries (15 min)

**[SAY:]:**
> "I use four breakpoints consistently. Not arbitrary pixel values — logical breakpoints based on common device categories."

**[WRITE ON BOARD:]**
```
Base styles     =  all screens (mobile first)
min-width: 36rem  =  ~576px — large phones / small tablets
min-width: 48rem  =  ~768px — tablets
min-width: 64rem  =  ~1024px — laptops / small desktops
min-width: 90rem  =  ~1440px — large desktops
```

**[SAY:]:**
> "I write these in `rem`, not `px`. Why? If a user increases their browser's base font size — an accessibility setting — `rem`-based media queries scale with that. `px` media queries do not. `48rem` with a `20px` browser font becomes `960px` — the user gets a layout appropriate for their effective viewport."

**[TYPE — the mobile-first card grid pattern:]**
```css
.card-grid {
  display: grid;
  grid-template-columns: 1fr;         /* Single column on mobile */
  gap: var(--space-m);
}

@media (min-width: 48rem) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);  /* 2 columns on tablet */
  }
}

@media (min-width: 64rem) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);  /* 3 columns on desktop */
  }
}
```

**[DEMO — open DevTools → Toggle Device Toolbar. Slowly drag the viewport from 320px up to 1440px. Show the layout snap at each breakpoint.]**

---

### Container Queries — The 2024 Game-Changer (10 min)

**[SAY:]:**
> "Media queries are good but they have a fundamental limitation: they respond to the viewport, not the component. Watch what happens."

**[DO — show this scenario:]**
> "I have a card component. In the main content area, it gets a two-column layout. In the sidebar, there's not enough room, so it should be single-column. With a media query on the card itself, I cannot do this — the media query fires based on the screen width, not the card's container width."

**[TYPE:]**
```css
/* Container query setup */
.card-wrapper {
  container-type: inline-size;    /* Enable container queries — watch my width */
  container-name: card;           /* Optional: name it for targeting */
}

/* When the WRAPPER is at least 400px wide — regardless of viewport width */
@container card (min-width: 25rem) {
  .card {
    display: grid;
    grid-template-columns: 180px 1fr;  /* Image column + text column */
    gap: var(--space-m);
  }
}
```

**[SAY:]:**
> "Now the card adapts to its container. Put it in the main content area — wide container — it goes two-column. Put it in the sidebar — narrow container — it stays single-column. The same component. Zero extra CSS. This is a fundamentally better way to think about responsive components."

**[DEMO — move the same card HTML between a wide and narrow container. Show it changing layout.]**

---

## 🎤 PART C — The `:has()` Selector (0:45 – 1:05)

**[SAY:]:**
> "`:has()` is sometimes called the 'parent selector' — something CSS developers asked for for fifteen years. It lets you style a parent based on its children."

**[TYPE:]**
```css
/* Style a card differently if it HAS an image */
.card:has(img) {
  display: grid;
  grid-template-rows: auto 1fr;
}

/* Style a form group if its input is invalid AND has been touched */
.form-group:has(input:invalid:not(:placeholder-shown)) {
  --colour-border: hsl(0 80% 50%);
  background-color: hsl(0 80% 50% / 5%);
}

/* A nav that has a dropdown open — adjust its z-index */
nav:has(.dropdown:is(:focus-within)) {
  z-index: 100;
}

/* A list that has exactly one item — remove the bullets */
ul:has(li:only-child) {
  list-style: none;
}
```

**[SAY for the form-group example:]:**
> "This is real form validation styling — no JavaScript. When an input is `:invalid` (fails HTML validation) AND `:not(:placeholder-shown)` (the user has typed something — the placeholder is no longer visible), the form group gets a red border and tint. The user only sees the error after they have interacted with the field — not immediately on page load when all fields are empty."

**[DEMO the form validation live — type an invalid email, show the field turning red.]**

---

## 🎤 PART D — Transitions & Animations (1:05 – 1:30)

### Transitions (10 min)

**[SAY:]:**
> "Transitions tell the browser: when a property changes, animate it smoothly instead of snapping."

**[TYPE:]**
```css
.btn {
  background-color: var(--colour-primary);
  color: white;
  padding: var(--space-xs) var(--space-m);
  border-radius: var(--radius-m);
  border: none;
  cursor: pointer;
  font-size: var(--step-0);
  font-weight: 600;

  /* List specific properties — NOT 'all' */
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
```

**[SAY for `transition: all`:]:**
> "Never write `transition: all`. It transitions every property that changes — including ones you do not want to animate, like `height` during a window resize or `color` on text. It causes subtle performance issues and unexpected visual glitches. Always list the specific properties."

**[DEMO live — hover the button. Show the smooth lift. Then remove the transition and show the snap.]**

### Accessibility: `prefers-reduced-motion` (5 min)

**[SAY:]:**
> "Some users experience motion sickness, nausea, or seizures from animated interfaces. Modern operating systems have an 'Reduce Motion' accessibility setting. We respect it with this media query — and it is not optional."

**[TYPE:]**
```css
/* This must be in your reset or utilities section */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration:        0.01ms !important;
    animation-iteration-count: 1      !important;
    transition-duration:       0.01ms !important;
    scroll-behavior:           auto   !important;
  }
}
```

**[SAY:]:**
> "With this rule, anyone who has enabled 'Reduce Motion' in their OS settings gets no transitions or animations. Instant state changes. `!important` is justified here — it is a global accessibility override that must always win."

### Keyframe Animations (10 min)

**[TYPE:]**
```css
/* Define the animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    translate: 0 1rem;    /* Modern syntax — translate instead of transform */
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes skeleton-shimmer {
  0%   { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

/* Apply animations */
.card {
  animation: fade-in-up 0.4s ease both;
  /* 'both' applies the from state before the animation starts
     and holds the to state after it ends */
}

/* Stagger cards — CSS custom property as a delay multiplier */
.card:nth-child(1) { --index: 0; }
.card:nth-child(2) { --index: 1; }
.card:nth-child(3) { --index: 2; }

.card {
  animation-delay: calc(var(--index, 0) * 80ms);
}
```

**[DEMO the fade-in-up on cards. Then show the stagger by adding the `--index` variable.]**

**[SAY for stagger:]:**
> "CSS custom properties can be set on individual elements and then referenced inside calculations. `--index: 0` on the first card, `--index: 1` on the second. The `animation-delay` uses that to stagger the animation by 80ms each. This is a pure CSS stagger — no JavaScript."

---

## 🎤 PART E — CSS Nesting (1:30 – 1:45)

**[SAY:]:**
> "CSS Nesting arrived natively in all major browsers in 2024. Previously you needed Sass or PostCSS to write nested CSS. Now it is built in."

**[TYPE — show the before-and-after side by side:]**
```css
/* Without nesting — you repeat the selector */
.card { background: var(--colour-bg); border-radius: var(--radius-l); }
.card:hover { box-shadow: var(--shadow-l); }
.card .card__title { font-size: var(--step-1); font-weight: 700; }
.card.card--featured { border: 2px solid var(--colour-primary); }

/* With CSS nesting — everything grouped together */
.card {
  background: var(--colour-bg);
  border-radius: var(--radius-l);
  padding: var(--space-m);
  transition: box-shadow var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-l);
  }

  & .card__title {
    font-size: var(--step-1);
    font-weight: 700;
    margin-bottom: var(--space-xs);
  }

  &.card--featured {
    border: 2px solid var(--colour-primary);
  }

  /* Nested media query */
  @media (min-width: 48rem) {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
```

**[SAY:]:**
> "The `&` refers to the parent selector. `&:hover` means `.card:hover`. `& .card__title` means `.card .card__title`. `&.card--featured` means `.card.card--featured`. Media queries can be nested inside rules — the browser expands them correctly."
>
> "The benefit is not just fewer characters — it is that related rules live together. You can see all of a `.card`'s styles — states, children, breakpoints — in one block."

---

## 🏆 Final Project Brief (1:45 – 2:00)

**[SAY:]:**
> "Your CSS final project is the portfolio page from the HTML course, fully styled. This becomes your React project next, then your JavaScript project. Get it right here."

**[SHOW and WALK THROUGH the requirements from the course outline:]**

| Feature | Requirement |
|---------|-------------|
| Tokens | `tokens.css` — full two-tier system: palette, semantic, space, radius, shadow |
| Dark mode | `prefers-color-scheme: dark` — semantic tokens swap, palette tokens stay |
| Reset | Modern reset block |
| Typography | Fluid `clamp()` scale, all headings styled, `prose` container |
| Navigation | Flexbox nav using token values only |
| Page shell | Grid with named areas |
| Cards | `auto-fill, minmax()` responsive grid |
| Container query | At least one component that adapts to container width |
| Buttons | Hover + active transitions |
| Animation | One `@keyframes` animation |
| Reduced motion | `prefers-reduced-motion` media query in reset |
| CSS Nesting | At least one component uses native nesting |

**Rubric:**

| Criterion | Points |
|-----------|--------|
| Two-tier token system in `tokens.css` | 20 |
| Dark mode via `prefers-color-scheme` | 10 |
| Fluid type scale using `clamp()` | 10 |
| Flexbox navigation | 10 |
| Grid page layout with named areas | 15 |
| Responsive card grid (`auto-fill minmax`) | 10 |
| Container query on at least one component | 5 |
| Transitions on interactive elements | 5 |
| `prefers-reduced-motion` respected | 5 |
| `@keyframes` animation used | 5 |
| CSS nesting used | 5 |
| **Total** | **100** |

---

## 🔚 Wrap-Up (Last 2 min)

**[SAY:]:**
> "You have two tools for layout. You have a token system that makes the entire site consistent and maintainable. You have responsive design that works at every viewport. And you have smooth, accessible interactions. That is a complete, professional CSS foundation."
>
> "In the JavaScript course, you will make it interactive. In React, you will turn it into a component-based application. Everything we have built in HTML and CSS is the foundation — and it holds."

---

## 📎 Tutor Notes

**Container query gotcha:** `container-type: inline-size` must be on the wrapper/parent element, not on the element being styled. A common mistake is putting it on `.card` when it needs to go on `.card-wrapper`.

**`:has()` browser support note:** `:has()` is supported in all major browsers since 2023. Safari 15.4+, Chrome 105+, Firefox 121+. For students targeting older browsers, it degrades gracefully — browsers that do not support it simply skip the rule.

**Transitions tip:** In DevTools, you can slow down animations: Performance → click the '...' menu → Animations panel → change the speed multiplier. Slowing animations to 25% helps students see exactly what is happening.
