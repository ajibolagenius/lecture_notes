# ✏️ CSS Exercises
### Deejoft Coding School — All 4 Classes

Build on the HTML portfolio page from the HTML course. Validate CSS by checking for expected visual results in the browser and using the DevTools Styles panel.

---

## Class 1 Exercises — Selectors, Cascade & Box Model

---

### Exercise 1.1 — Write the Reset From Memory ⭐

Without looking at your notes, create `css/reset.css` and write the complete modern CSS reset. Verify it applies by confirming:
- All default `margin` and `padding` are gone
- Images have no gap below them
- Body fills the full viewport height

---

### Exercise 1.2 — Predict the Winner ⭐

For each set of CSS rules, write which colour applies to the element described. Do not run the code — calculate the specificity scores first.

**Scenario A:** `<p class="intro" id="lead">`
```css
p          { color: black;   }   /* score: ___-___-___ */
.intro     { color: blue;    }   /* score: ___-___-___ */
#lead      { color: green;   }   /* score: ___-___-___ */
p.intro    { color: purple;  }   /* score: ___-___-___ */
```
Applied colour: __________ because ___________________________________

**Scenario B:** `<a class="btn" href="#">` inside `<nav id="main-nav">`
```css
a              { color: black;  }   /* score: ___-___-___ */
.btn           { color: red;    }   /* score: ___-___-___ */
nav a          { color: blue;   }   /* score: ___-___-___ */
#main-nav a    { color: green;  }   /* score: ___-___-___ */
```
Applied colour: __________ because ___________________________________

**Scenario C:** Two rules, same selector — which wins?
```css
h2 { font-size: 2rem; }
h2 { font-size: 1.5rem; }
```
Applied font-size: __________ because ________________________________

---

### Exercise 1.3 — Box Model Inspector ⭐⭐

Create `box-demo.html` and `box-demo.css` with five boxes:

**Box 1:** `width: 200px`, `padding: 20px`, `border: 4px solid`, no `box-sizing`.
- Open DevTools, inspect the element. Computed width in the browser: __________

**Box 2:** Same as Box 1 but with `box-sizing: border-box`.
- Computed width: __________

**Box 3:** `width: 50%`, `margin: 20px auto`, `padding: 16px`.
- This box should be centred. Is it? __________

**Box 4:** Two adjacent boxes with `margin-bottom: 32px` and `margin-top: 16px`.
- Measure the gap between them in DevTools. Gap is: __________ because: __________

**Box 5:** A nested box — `.outer` contains `.inner`. Set `padding: 30px` on `.outer`, no padding on `.inner`. Does the `.inner` width include the `.outer` padding? __________

---

### Exercise 1.4 — Style a Card Component ⭐⭐

Style `.card` elements in the portfolio page using only the selectors covered in Class 1. Requirements:
- `.card` — white background, `border-radius`, `padding`, box shadow, `border`
- `.card__title` — larger font size, bold, dark colour
- `.card:hover` — deeper shadow, `cursor: pointer`
- `.card a:hover` — brand colour underline
- `.card:nth-child(1)` — a distinct border-top accent colour
- `.card:last-child` — no `margin-bottom`
- No `!important` anywhere

---

### Exercise 1.5 — Debug the Broken Styles ⭐⭐⭐

The following CSS is not working as expected. Find the reason for each problem using DevTools and explain the fix.

```css
/* Problem 1: The paragraph is supposed to be red but it's black */
.sidebar p { color: black; }
p.highlight { color: red; }

/* Problem 2: The button hover state does nothing */
.btn { background: blue }   /* intentional no semicolon */
.btn:hover { background: darkblue; }

/* Problem 3: This box should be 200px wide but is 244px in the browser */
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid;
}

/* Problem 4: This image has a gap below it */
.gallery img { width: 100%; }

/* Problem 5: Both paragraphs are supposed to be blue, but only the second is */
.intro { color: blue; }
.intro { color: blue; }
p      { color: red;  }   /* This was added later */
```

For each: identify the problem, explain the cause, write the fix.

---

## Class 2 Exercises — Design Tokens & Typography

---

### Exercise 2.1 — Identify the Token Tier ⭐

Classify each of these as **Palette**, **Semantic**, or **Neither** (not a token at all):

```css
--palette-brand:     #e94560;    → ___________
--colour-primary:    var(--...); → ___________
--blue:              #0066cc;    → ___________
--colour-text:       #0f0f11;    → ___________
--big-red:           crimson;    → ___________
--space-m:           1.5rem;     → ___________
```

---

### Exercise 2.2 — Build the Token System ⭐⭐

Create `tokens.css`. It must contain:

- **Palette:** At least 5 colour values — neutrals (dark, mid, light), brand, accent
- **Semantic:** `--colour-text`, `--colour-text-muted`, `--colour-bg`, `--colour-bg-subtle`, `--colour-border`, `--colour-primary`, `--colour-primary-hover`
- **Spacing:** `--space-xs` through `--space-xl` (5 levels using `rem` values)
- **Shape:** `--radius-s`, `--radius-m`, `--radius-l`, `--radius-full`
- **Shadows:** `--shadow-s`, `--shadow-m`, `--shadow-l`
- **Transitions:** `--transition-fast` (150ms), `--transition-normal` (250ms)
- **Dark mode:** `@media (prefers-color-scheme: dark)` that changes only semantic colour tokens

Verify: toggle your OS to dark mode. The page should flip. No component styles should need to change.

---

### Exercise 2.3 — Apply Fluid Typography ⭐⭐

Add to `tokens.css`:
1. A fluid type scale (`--step--1` through `--step-4`) using `clamp()` — generate values at `utopia.fyi/type`
2. Font family tokens: `--font-sans` and `--font-mono`

Then create `typography.css`:
- `body` styles: `font-family`, `font-size`, `line-height`, `color`, `background-color` — all using tokens
- Headings `h1` through `h4`: `font-size`, `line-height`, `font-weight`, `letter-spacing` — all using `--step-*` tokens
- A `.prose` class: `max-width: 65ch`, `margin-inline: auto`, paragraph spacing
- Text utilities: `.text-muted`, `.text-small`, `.text-balance`

---

### Exercise 2.4 — Dark Mode Manual Test ⭐⭐⭐

After completing Exercise 2.2:

1. Open your page and record the colours (bg, text, border) in light mode: ________________
2. Switch your OS to dark mode. Record the colours: ________________
3. Open DevTools → Media Queries panel. Force `prefers-color-scheme: dark`. Does it toggle? ________
4. Open DevTools → Elements → Computed. Find `--colour-bg` in the computed custom properties. Does the value change in dark mode? ________
5. Now deliberately break it: move a palette token (`--palette-brand`) directly into a component rule instead of through a semantic token. Does dark mode break that component? ________ Explain: ________________

---

## Class 3 Exercises — Flexbox & Grid

---

### Exercise 3.1 — Flexbox Fill-In ⭐

Match each layout to the correct CSS:

**Layouts:**
```
A: [ item ] [ item ] [ item ]     (left-aligned row)
B:           [ item ]             (centred)
C: [ item ]          [ item ]     (space between, first + last flush)
D:    [ item ]    [ item ]        (space around — equal outer gaps)
```

**CSS options:**
```css
justify-content: center;
justify-content: flex-start;
justify-content: space-between;
justify-content: space-around;
```

A → ________________
B → ________________
C → ________________
D → ________________

---

### Exercise 3.2 — Build the Navigation ⭐⭐

Style the `<header>` of your portfolio page using Flexbox:

- Logo (`<a>` with site name or `<img>`) on the left
- Navigation links (`<ul>` with `<li>` items) on the right
- Both vertically centred within the header
- `gap` between nav links using `--space-m` token
- Header has `border-bottom` using `--colour-border` token
- On hover, nav links change colour to `--colour-primary`
- The currently active nav link has `--colour-primary` colour always (not just on hover)

---

### Exercise 3.3 — Build the Page Shell ⭐⭐

Style the page layout using CSS Grid with named areas:

**Design:**
```
┌────────────── header ─────────────────┐
├────────────── main ───────────────────┤
└────────────── footer ─────────────────┘
```

Requirements:
- Grid rows: `auto 1fr auto`
- Header and footer span full width
- Main fills all remaining height
- Apply `min-height: 100dvh` to the grid
- Header `background: var(--colour-bg)`, with a subtle shadow
- Footer `background: var(--colour-bg-subtle)`, centred text

---

### Exercise 3.4 — Responsive Project Grid ⭐⭐

Style the project cards section using CSS Grid:

- On mobile: 1 column
- On tablet (`min-width: 48rem`): 2 columns
- On desktop (`min-width: 64rem`): 3 columns — using `auto-fill, minmax(280px, 1fr)`
- Each card: background, padding, border-radius, shadow — all using tokens
- Card title: `--step-1` font size, bold
- Card hover: lifted shadow with `transition`

---

### Exercise 3.5 — Flexbox vs Grid Challenge ⭐⭐⭐

Build a `pricing.html` page with a 3-tier pricing table. Requirements:
- Flex row for the three pricing cards on desktop, stacked on mobile
- The middle card is visually highlighted (different border/background)
- Inside each card: icon, name, price, features list, CTA button
- The CTA button is always at the bottom of the card regardless of content length
  (Hint: `display: flex; flex-direction: column` on the card, `margin-top: auto` on the button)
- A feature comparison table below the cards, built with CSS Grid
  - Left column: feature names (fixed width)
  - Remaining columns: one per plan (`fr` units)
  - Alternate row backgrounds using `:nth-child(even)` on grid rows

---

## Class 4 Exercises — Responsive, Transitions & Modern CSS

---

### Exercise 4.1 — Media Query Debugging ⭐

The following CSS is supposed to be mobile-first, but it has two structural errors. Find and fix them:

```css
/* This should be: 1 col on mobile, 2 on tablet, 3 on desktop */

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

.grid {
  grid-template-columns: 1fr;
}
```

Errors:
1. _______________________________________________________________
2. _______________________________________________________________

Fixed version:
```css
/* Write the corrected mobile-first version below: */
```

---

### Exercise 4.2 — Container Query Component ⭐⭐

Build a `ArticleCard` component that adapts to its container:

- **Narrow container (< 400px):** Single-column stacked card — image on top, text below
- **Wide container (≥ 400px):** Two-column card — image on left, text on right

Requirements:
- `container-type: inline-size` on the wrapper
- `@container` query for the layout switch
- The card should look correct in BOTH a full-width main content area AND a narrow sidebar
  (Add both to the page and verify both look right simultaneously)

---

### Exercise 4.3 — Button Interaction Design ⭐⭐

Create a complete interactive button system with these states:

```
Default  →  [  Primary Action  ]   Brand colour background
Hover    →  Lifted 2px, lighter colour, deeper shadow
Active   →  Pressed down (back to 0px lift, no shadow)
Focus    →  Visible outline (3px, brand colour, offset)
Disabled →  50% opacity, `not-allowed` cursor, no hover effect
```

Requirements:
- All colours via tokens (`--colour-primary`, `--colour-primary-hover`)
- `transition` on specific properties only — NOT `all`
- `prefers-reduced-motion` respected (transitions disabled for those users)
- `:focus-visible` not `:focus` for the outline style

---

### Exercise 4.4 — Staggered Entrance Animation ⭐⭐

Add entrance animations to the project cards:

- Cards start transparent and slightly below their final position (`opacity: 0; translate: 0 1rem`)
- They animate to their final position on page load (`fade-in-up` keyframe)
- Cards animate with a stagger — card 2 starts 80ms after card 1, card 3 starts 80ms after card 2
- Animation uses the CSS custom property `--i` approach (not JavaScript)
- The entire animation system is disabled by `prefers-reduced-motion`

---

### Exercise 4.5 — Full CSS Refactor ⭐⭐⭐

Apply the full CSS system to your HTML portfolio page. Acceptance criteria:

| Requirement | How to verify |
|-------------|--------------|
| `tokens.css` linked first | Check `<head>` — `tokens.css` before `main.css` |
| No raw hex values in component CSS | Search `main.css` for `#` — none should appear |
| No raw `px` values for font sizes | All font sizes use `var(--step-*)` |
| All spacing uses tokens | All `padding`/`margin` use `var(--space-*)` |
| Dark mode works | Toggle OS dark mode — full page flips |
| Responsive at 320px | Test in DevTools at 320px width — nothing overflows |
| Responsive at 768px | Test at 768px — layout shifts to tablet version |
| Responsive at 1440px | Test at 1440px — full desktop layout |
| Transitions on interactive elements | Hover buttons, links, cards — all animate smoothly |
| Reduced motion respected | In DevTools, force `prefers-reduced-motion: reduce` — no transitions |
| CSS nesting used | At least one component uses `& { }` nesting |
| Container query present | At least one `@container` rule |

---

*Deejoft Coding School | CSS Exercises | Use DevTools to verify every visual result*
