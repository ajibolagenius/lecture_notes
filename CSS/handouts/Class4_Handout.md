# 📄 CSS Class 4 — Student Handout
### Responsive Design, Transitions & Modern CSS
**Deejoft Coding School** | Includes the full CSS Quick Reference at the end.

---

## A. Responsive Design — Mobile-First

**The approach:** Write base styles for the smallest screen first. Then add complexity with `min-width` media queries as the screen gets bigger.

```css
/* Base: mobile (all screens) */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;   /* Single column */
  gap: var(--space-m);
}

/* Tablet and up: 2 columns */
@media (min-width: 48rem) {     /* 48rem = 768px at default font size */
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop and up: 3 columns */
@media (min-width: 64rem) {     /* 64rem = 1024px */
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Why `rem` not `px` in media queries?**  
If a user increases their browser font size (an accessibility setting), `rem`-based breakpoints scale with it. `px`-based ones do not.

**Standard breakpoints:**

| Breakpoint | Rem value | Targets |
|------------|-----------|---------|
| Base | — | Small phones (320px+) |
| `min-width: 36rem` | 576px | Large phones |
| `min-width: 48rem` | 768px | Tablets |
| `min-width: 64rem` | 1024px | Laptops |
| `min-width: 90rem` | 1440px | Large desktops |

> ✏️ **Fill in:** You want a navigation list to stack vertically on mobile and display as a horizontal row on tablet. Complete:
>
> ```css
> .nav-list {
>   display: flex;
>   flex-direction: _________;   /* mobile: stacked */
> }
> @media (min-width: _________) {
>   .nav-list { flex-direction: _________; }
> }
> ```

---

## B. Container Queries — Responsive to the Component's Container

**The problem with media queries:** They respond to the viewport, not the component. A card in a wide main area vs. a narrow sidebar should look different — but the viewport width is the same.

**Container queries** respond to the parent element's width:

```css
/* Step 1: Enable container queries on the WRAPPER element */
.card-wrapper {
  container-type: inline-size;    /* Watch my inline (horizontal) size */
  container-name: card;           /* Name it (optional) */
}

/* Step 2: Write rules that fire when the wrapper reaches a width */
@container card (min-width: 25rem) {
  .card {
    display: grid;
    grid-template-columns: 180px 1fr;   /* Image + text side by side */
  }
}
```

> ⚠️ `container-type` goes on the **parent/wrapper**, not the card itself.

> ✏️ **Fill in:** You have a `.sidebar-widget` that should get extra padding when its container is wider than `20rem`. Write the container query:
>
> ```css
> .widget-wrapper {
>   container-type: _____________;
> }
>
> @container (min-width: _________) {
>   .sidebar-widget {
>     padding: var(--space-l);
>   }
> }
> ```

---

## C. The `:has()` Selector

`:has()` styles a parent based on what it contains:

```css
/* Style a card differently if it contains an image */
.card:has(img) {
  display: grid;
  grid-template-rows: auto 1fr;
}

/* Form validation — style the group when input is invalid AND touched */
.form-group:has(input:invalid:not(:placeholder-shown)) {
  border-color: hsl(0 80% 50%);
  background: hsl(0 80% 50% / 5%);
}

/* Remove bullets from a list with only one item */
ul:has(li:only-child) {
  list-style: none;
  padding-left: 0;
}
```

> ✏️ **Fill in:** Write a rule that applies `font-weight: 700` to an `<h2>` that has a `.badge` element directly inside it:
>
> ```css
> h2:has(________) {
>   font-weight: 700;
> }
> ```

---

## D. Transitions

```css
.btn {
  background-color: var(--colour-primary);
  /* List specific properties — never use 'transition: all' */
  transition:
    background-color var(--transition-fast),
    transform        var(--transition-fast),
    box-shadow       var(--transition-fast);
}

.btn:hover {
  background-color: var(--colour-primary-hover);
  transform: translateY(-2px);   /* Lift up on hover */
  box-shadow: var(--shadow-m);
}

.btn:active {
  transform: translateY(0);      /* Press down on click */
  box-shadow: none;
}
```

**Transition property syntax:**
```css
transition: property  duration  timing-function  delay;
transition: color     250ms     ease             0ms;
```

> ⚠️ **Always include this in your reset:**
> ```css
> @media (prefers-reduced-motion: reduce) {
>   *, *::before, *::after {
>     animation-duration:        0.01ms !important;
>     transition-duration:       0.01ms !important;
>   }
> }
> ```

---

## E. CSS Animations

```css
/* 1. Define the animation */
@keyframes fade-in-up {
  from {
    opacity:  0;
    translate: 0 1rem;   /* Start below and transparent */
  }
  to {
    opacity:  1;
    translate: 0 0;      /* End at natural position, fully visible */
  }
}

/* 2. Apply it */
.card {
  animation: fade-in-up  0.4s  ease  both;
  /*         name      duration  easing  fill-mode */
  /* 'both' = apply 'from' state before start, hold 'to' state after end */
}

/* 3. Stagger with CSS custom property */
.card:nth-child(1) { --i: 0; }
.card:nth-child(2) { --i: 1; }
.card:nth-child(3) { --i: 2; }

.card {
  animation-delay: calc(var(--i, 0) * 80ms);
  /* Card 1: 0ms delay. Card 2: 80ms. Card 3: 160ms. */
}
```

---

## F. CSS Nesting (Native — No Preprocessor Needed)

```css
/* Without nesting — repetitive */
.card { background: var(--colour-bg); }
.card:hover { box-shadow: var(--shadow-l); }
.card .card__title { font-weight: 700; }
.card.card--featured { border: 2px solid var(--colour-primary); }

/* With nesting — grouped, readable */
.card {
  background: var(--colour-bg);
  border-radius: var(--radius-l);

  &:hover {
    box-shadow: var(--shadow-l);     /* & = .card */
  }

  & .card__title {
    font-weight: 700;                 /* & .card__title = .card .card__title */
  }

  &.card--featured {
    border: 2px solid var(--colour-primary);  /* &.card--featured = .card.card--featured */
  }

  /* Nested media query */
  @media (min-width: 48rem) {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
```

> ✏️ **Fill in:** Using nesting, write the hover and focus-visible states for a `.link` element:
>
> ```css
> .link {
>   color: var(--colour-primary);
>
>   ___:hover {
>     text-decoration: underline;
>   }
>
>   ___:focus-visible {
>     outline: 3px solid var(--colour-primary);
>   }
> }
> ```

---

## G. Final Project Checklist

- [ ] `tokens.css`: full two-tier tokens (colour, space, radius, shadow, transitions)
- [ ] Dark mode `@media (prefers-color-scheme: dark)` — semantic tokens only
- [ ] Modern CSS reset with `prefers-reduced-motion`
- [ ] Fluid type scale (`--step-*`) applied to all headings and body
- [ ] Flexbox navigation using token values
- [ ] Grid page shell with named areas
- [ ] Responsive card grid with `auto-fill minmax`
- [ ] At least one container query
- [ ] Button transitions (background, transform, box-shadow)
- [ ] At least one `@keyframes` animation
- [ ] CSS nesting used in at least one component

---

## ⚡ CSS Master Quick Reference

### Selectors

| Selector | What it targets |
|----------|----------------|
| `el` | All elements of type `el` |
| `.class` | All elements with `class="class"` |
| `#id` | The element with `id="id"` |
| `el.class` | `el` elements that ALSO have `class` |
| `a, b` | Both `a` and `b` |
| `a b` | `b` anywhere inside `a` (descendant) |
| `a > b` | `b` that is a direct child of `a` |
| `a + b` | `b` immediately after `a` |
| `:hover` | Element under the mouse pointer |
| `:focus-visible` | Element focused by keyboard |
| `:nth-child(n)` | The nth child |
| `:not(x)` | Elements that do NOT match `x` |
| `:has(x)` | Elements that CONTAIN `x` |
| `[attr="val"]` | Elements where `attr` equals `val` |
| `[attr^="val"]` | Attribute starts with `val` |
| `[attr$="val"]` | Attribute ends with `val` |

### Box Model

| Property | What it controls |
|----------|-----------------|
| `width` / `height` | Content size (or total size with `border-box`) |
| `padding` | Space inside the border (has background) |
| `border` | The border line |
| `margin` | Space outside the border (transparent) |
| `box-sizing: border-box` | width/height = total size including padding + border |
| `margin-inline: auto` | Centre block horizontally |
| `overflow: hidden` | Clip content that exceeds the box |

### Layout

| Property | What it does |
|----------|-------------|
| `display: flex` | Flexbox container |
| `display: grid` | Grid container |
| `justify-content` | Main axis distribution (Flex) / column alignment (Grid) |
| `align-items` | Cross axis alignment |
| `gap` | Space between flex or grid items |
| `flex: 1` | Item grows to fill remaining space |
| `flex: 0 0 Xpx` | Item fixed at Xpx, no grow/shrink |
| `grid-template-columns` | Define column track sizes |
| `grid-template-areas` | Named layout map |
| `grid-area` | Assign element to a named area |
| `grid-column: 1 / -1` | Span all columns |
| `repeat(auto-fill, minmax(X, 1fr))` | Responsive column count |

### Responsive

| Feature | Syntax |
|---------|--------|
| Media query (mobile-first) | `@media (min-width: 48rem) { }` |
| Container query | `@container name (min-width: 25rem) { }` |
| Enable container queries | `container-type: inline-size` on parent |
| Dark mode | `@media (prefers-color-scheme: dark) { }` |
| Reduced motion | `@media (prefers-reduced-motion: reduce) { }` |

### Colours & Typography

| Feature | Syntax |
|---------|--------|
| Custom property | `--name: value;` / `var(--name)` |
| HSL colour | `hsl(350 80% 59%)` |
| HSL with alpha | `hsl(350 80% 59% / 50%)` |
| OKLCH colour | `oklch(0.60 0.18 15)` |
| Colour mix | `color-mix(in oklch, red 20%, white)` |
| Fluid size | `clamp(min, preferred, max)` |
| Prose width | `max-width: 65ch` |

### Transitions & Animation

| Property | What it does |
|----------|-------------|
| `transition: prop dur ease` | Smooth state changes |
| `animation: name dur ease fill` | Apply a keyframe animation |
| `@keyframes name { }` | Define an animation |
| `animation-delay: Xms` | Delay before animation starts |
| `translate: 0 1rem` | Modern alternative to `transform: translateY()` |

---

*Deejoft Coding School | CSS Class 4 | Full CSS reference — keep permanently*
