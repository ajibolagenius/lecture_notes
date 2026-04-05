# 📋 CSS Class 2 — Lesson Plan (Tutor Script)
### Design Tokens, Colour & Typography
**Duration:** ~2 hours | **Format:** Live coding — building a design system

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap quiz + homework check |
| 0:10 – 0:45 | CSS Custom Properties — the design token system |
| 0:45 – 1:10 | Colour — modern colour spaces, dark mode |
| 1:10 – 1:45 | Typography — fluid scale, Google Fonts, prose |
| 1:45 – 2:00 | Exercise: build a `tokens.css` file |

---

## 🛠 Setup (Do Before Students Arrive)
- `utopia.fyi/type` open in a tab — fluid type scale generator
- `oklch.com` open — OKLCH colour picker
- A page showing the same design in a bad token system (raw values everywhere) vs. a good token system (semantic custom properties). Prepare two CSS files.
- The reset from Class 1 already in place

---

## 🎤 PART A — Recap (0:00 – 0:10)

**[ASK — no looking at notes]:**
1. "What is the selector for 'all even `<li>` elements'?" → `li:nth-child(even)`
2. "What specificity score does `#main .card a:hover` have?" → `1-2-1`
3. "What does `box-sizing: border-box` change?" → Width/height includes padding and border
4. "What is the DevTools keyboard shortcut to open it?" → `F12` or `Ctrl+Shift+I`
5. "Margin collapse happens between block elements. Where does it NOT happen?" → Inside Flexbox or Grid containers

---

## 🎤 PART B — CSS Custom Properties (Design Tokens) (0:10 – 0:45)

### The Problem First (10 min)

**[SAY]:**
> "Before I show you Custom Properties, I want to show you the problem they solve. Look at this CSS."

**[SHOW this on the projector — a CSS file with no tokens:]**
```css
.btn-primary { background-color: #e94560; color: white; }
.badge       { background-color: #e94560; }
.link:hover  { color: #e94560; }
.border-brand { border-color: #e94560; }
```

**[SAY]:**
> "The brand colour appears four times. Now your client says: 'We rebranded. The new brand colour is `#ff6b35`.' You need to find and replace every single occurrence across every CSS file. Miss one — inconsistency. Worse: what if you used `#e94560` in one place and `#E94560` in another? Those are technically different strings, even though they are the same colour."
>
> "The solution: never write a raw value twice. Give it a name."

---

### Custom Properties — The Syntax (5 min)

**[TYPE]:**
```css
:root {
  --clr-brand: #e94560;
}

.btn-primary { background-color: var(--clr-brand); }
.badge       { background-color: var(--clr-brand); }
.link:hover  { color: var(--clr-brand); }
```

**[SAY]:**
> "Custom properties start with two dashes. That is the syntax — double dash, then your name. They are defined on `:root`, which is the highest-level element — essentially `<html>`. This means they are available everywhere on the page. You read them with `var()`. Change the value in one place — every rule that uses it updates instantly."
>
> "`:root` vs `html` — they are functionally the same element, but `:root` has higher specificity. Use `:root` for your design tokens."

---

### The Two-Tier Token System (20 min)

**[SAY]:**
> "Professional design systems use two tiers of tokens. Tier one: the palette — raw colour values with neutral names. Tier two: semantic tokens — names that describe purpose, not colour. This separation is what makes dark mode trivial."

**[TYPE — build this live, explaining as you type each section]:**

```css
:root {
  /* ── Tier 1: Colour Palette — raw values ── */
  /* Never use these directly in component rules */
  --palette-neutral-900: #0f0f11;
  --palette-neutral-700: #3a3a4a;
  --palette-neutral-400: #888899;
  --palette-neutral-100: #f8f8fc;
  --palette-white:       #ffffff;
  --palette-brand:       #e94560;
  --palette-brand-light: #ff7a90;
  --palette-accent:      #0f3460;
```

**[PAUSE — SAY]:**
> "I'm giving these names that describe what the colour IS — `neutral-900` means a very dark neutral. But I am not calling it `very-dark-blue` because blue might change. `900` is a scale reference — higher numbers are darker. This is the same convention Tailwind CSS uses."

```css
  /* ── Tier 2: Semantic Tokens — purpose, not colour ── */
  /* These are what your component styles actually use */
  --colour-text:          var(--palette-neutral-900);
  --colour-text-muted:    var(--palette-neutral-400);
  --colour-bg:            var(--palette-white);
  --colour-bg-subtle:     var(--palette-neutral-100);
  --colour-border:        #e2e2e8;
  --colour-primary:       var(--palette-brand);
  --colour-primary-hover: var(--palette-brand-light);
```

**[PAUSE — SAY]:**
> "Now I have `--colour-text` and `--colour-bg`. These answer 'what is text colour?' and 'what is background colour?' — not 'what shade of grey?' When I switch to dark mode, I only need to redefine the semantic tokens. My component styles do not change at all."

```css
  /* ── Spacing ── */
  --space-xs:  0.5rem;
  --space-s:   1rem;
  --space-m:   1.5rem;
  --space-l:   2.5rem;
  --space-xl:  4rem;

  /* ── Shape ── */
  --radius-s:    4px;
  --radius-m:    8px;
  --radius-l:    16px;
  --radius-full: 9999px;

  /* ── Shadows ── */
  --shadow-s: 0 1px 3px hsl(0 0% 0% / 8%);
  --shadow-m: 0 4px 6px hsl(0 0% 0% / 7%), 0 2px 4px hsl(0 0% 0% / 5%);
  --shadow-l: 0 10px 15px hsl(0 0% 0% / 7%);

  /* ── Transitions ── */
  --transition-fast:   150ms ease;
  --transition-normal: 250ms ease;
}
```

**[SAY]:**
> "Spacing, shape, and transitions as tokens too. Now when a designer says 'increase the card border radius', you change `--radius-l` and every card in the app updates."

### Dark Mode — The Payoff (5 min)

**[TYPE]:**
```css
/* Dark mode: ONLY semantic tokens change. Palette tokens stay the same. */
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

**[SAY]:**
> "Eight lines of CSS. That is the entire dark mode implementation. If your components only reference semantic tokens — `var(--colour-text)`, `var(--colour-bg)` — they all flip automatically when the user's OS is in dark mode. Zero component changes. This is the proof that the two-tier system works."

**[DEMO — toggle OS dark mode while the page is open. Show it flip.]**

---

## 🎤 PART C — Colour in Modern CSS (0:45 – 1:10)

### The Colour Spaces (10 min)

**[SAY]:**
> "You already know hex and RGB. In 2025, we have better options for specific use cases."

**[WRITE ON BOARD:]**
```
HEX       #e94560             → Most common, concise, no alpha
RGB       rgb(233, 69, 96)    → Useful when computing values in JavaScript
HSL       hsl(350 80% 59%)    → Most readable for designers. Hue-Saturation-Lightness.
OKLCH     oklch(0.60 0.18 15) → Perceptually uniform. Best for design systems.
```

**[TYPE — show HSL being used:]**
```css
/* HSL — intuitive because you can read it */
/* hsl(hue, saturation%, lightness%)       */
/* Hue: 0-360 degrees on the colour wheel  */
/* 0=red, 120=green, 240=blue              */

.badge-success { background: hsl(142 60% 40%); }  /* Green */
.badge-error   { background: hsl(350 80% 50%); }  /* Red   */
.badge-info    { background: hsl(220 80% 55%); }  /* Blue  */

/* With alpha — the modern slash syntax */
.overlay { background: hsl(240 10% 5% / 50%); }
```

**[SAY]:**
> "HSL is readable because you can tweak it by feel. Want it lighter? Increase the L value. Want less saturated? Decrease the S. Want a completely different colour? Change just the H. No more staring at hex codes trying to figure out what colour they are."

**[TYPE — introduce OKLCH]:**
```css
/* OKLCH — perceptually uniform colour space */
/* L = Lightness 0–1, C = Chroma (saturation), H = Hue 0-360 */

/* Why OKLCH? When you change lightness in HSL, the perceived brightness
   varies by hue — yellow at L:50% looks lighter than blue at L:50%.
   OKLCH corrects for this. Equal L values look equally bright. */

.btn-primary { background: oklch(0.60 0.18 15); }   /* Brand red */
.btn-success { background: oklch(0.60 0.18 142); }  /* Same lightness, different hue */

/* color-mix() — mix two colours in CSS */
.btn-primary-tint {
  background: color-mix(in oklch, var(--colour-primary) 15%, white);
  /* → A very light tint of the brand colour — automatically in sync */
}
```

**[DEMO on `oklch.com` — drag the lightness slider and show perceptual uniformity.]**

---

## 🎤 PART D — Typography System (1:10 – 1:45)

### Loading Fonts (5 min)

**[SAY]:**
> "The `<link>` for Google Fonts already goes in the HTML `<head>` — we covered that in the HTML course. Two things to always include: `rel='preconnect'` on both the Google Fonts and `gstatic` domains, so the browser starts the DNS lookup before it even downloads the CSS."

**[Show already-in-HTML:]**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

**[SAY]:**
> "`display=swap` is critical. Without it, text is invisible until the font loads — the browser waits. `swap` tells it: show the fallback system font immediately, then swap in Inter when it arrives. Users see content instantly. The swap is usually imperceptible."

---

### Fluid Typography with `clamp()` (20 min)

**[SAY]:**
> "The traditional approach to responsive font sizes: write a font size for mobile, write a different font size for desktop inside a media query, and the browser snaps between them at the breakpoint. Abrupt and brittle."
>
> "The modern approach: fluid type. Font sizes that scale smoothly from a minimum at the smallest screen to a maximum at the largest — with no media queries at all. The function is `clamp()`."

**[WRITE ON BOARD:]**
```
clamp( minimum, preferred, maximum )

          ↑          ↑          ↑
    never below   scales    never above
    this value   with vw    this value
```

**[TYPE:]**
```css
/* Font size that is:
   - Never smaller than 1rem (16px)
   - Never larger than 1.5rem (24px)
   - Scales proportionally between those based on viewport width */

h3 { font-size: clamp(1rem, 0.9rem + 0.5vw, 1.5rem); }
```

**[DEMO: resize the browser window slowly while the page is open. Show the text scaling smoothly.]**

**[SAY]:**
> "The middle value is the scaling expression. `0.9rem + 0.5vw` means: start at 0.9rem and add half a percent of the viewport width. On a 320px screen: `0.9rem + 1.6px`. On a 1200px screen: `0.9rem + 6px`. It grows as the viewport grows."

**[SAY]:**
> "You do not need to calculate these numbers by hand. `utopia.fyi` generates an entire fluid type scale from two inputs: your minimum and maximum viewport widths, and your minimum and maximum font sizes. Let me show you."

**[DEMO on `utopia.fyi/type`:]**
1. Set min viewport to 320px, max to 1440px
2. Set min size to 16px, max size to 18px for the base step
3. Show the generated CSS custom properties with `clamp()` values

**[COPY and TYPE the output into `tokens.css`:]**
```css
:root {
  --step--1: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);  /* Small / captions */
  --step-0:  clamp(1rem, 0.9rem + 0.5vw, 1.125rem);       /* Body text */
  --step-1:  clamp(1.2rem, 1.05rem + 0.75vw, 1.5rem);     /* h4 */
  --step-2:  clamp(1.44rem, 1.2rem + 1.2vw, 2rem);        /* h3 */
  --step-3:  clamp(1.73rem, 1.4rem + 1.65vw, 2.75rem);    /* h2 */
  --step-4:  clamp(2.07rem, 1.6rem + 2.35vw, 3.75rem);    /* h1 */
}
```

---

### Base Typography Rules (10 min)

**[TYPE:]**
```css
/* ── Font stack ── */
:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}

/* ── Base ── */
body {
  font-family: var(--font-sans);
  font-size:   var(--step-0);
  line-height: 1.6;
  color:       var(--colour-text);
  background-color: var(--colour-bg);
}

/* ── Headings ── */
h1 { font-size: var(--step-4); line-height: 1.1; font-weight: 800; letter-spacing: -0.03em; }
h2 { font-size: var(--step-3); line-height: 1.2; font-weight: 700; letter-spacing: -0.02em; }
h3 { font-size: var(--step-2); line-height: 1.3; font-weight: 600; }
h4 { font-size: var(--step-1); line-height: 1.4; font-weight: 600; }
```

**[SAY for letter-spacing:]:**
> "Negative `letter-spacing` on large headings is a professional typography touch. At large sizes, letters appear to have too much space between them optically. A small negative value like `-0.03em` tightens them visually. The `em` unit means it is proportional to the font size — it scales correctly at every heading size."

**[TYPE:]**
```css
/* ── Utility text classes ── */
.text-muted   { color: var(--colour-text-muted); }
.text-small   { font-size: var(--step--1); }
.text-balance { text-wrap: balance; }   /* No orphaned single words at end of line */
.text-pretty  { text-wrap: pretty; }   /* Prevents widows in paragraphs */

/* ── Prose container (readable line length) ── */
.prose {
  max-width: 65ch;           /* ch = width of '0'. 65ch ≈ optimal 45–75 chars per line */
  margin-inline: auto;       /* Centre horizontally — logical property */
}
.prose p + p { margin-top: var(--space-s); }
```

**[SAY for `ch`:]:**
> "The `ch` unit is the width of the '0' character in the current font. `65ch` gives you roughly 65 characters per line — which is within the typographically optimal 45–75 characters for comfortable reading. Unlike `px` or `rem`, `ch` automatically adjusts if the font changes."

---

## ✏️ PART E — Exercise (1:45 – 2:00)

**[SAY]:**
> "Fifteen minutes. Open your HTML portfolio project. Create a fresh `tokens.css` file and a `typography.css` file. Your `tokens.css` must have: at least 5 palette tokens, all semantic tokens (text, bg, border, primary), space tokens xs through xl, radius tokens, and shadow tokens. Your `typography.css` must apply the font, set body styles, and style all headings using the fluid scale from Utopia."

**[WHILE STUDENTS WORK:]**
- Check that they are using `var()` in component styles, not raw values
- Check that heading font sizes reference the `--step-*` tokens, not hard-coded `px`
- Check dark mode media query is present

---

## 🔚 Wrap-Up (Last 3 min)

**[SAY]:**
> "The design token system you built today is the foundation every CSS class, component, and layout will reference. If you use it consistently, your whole site can be reskinned in ten minutes. Next class: layout — Flexbox and Grid. We turn this well-styled text into a properly structured, multi-column page."

---

## 📎 Tutor Notes

**Common errors with custom properties:**
- Writing `var --colour-text` (missing the parentheses) — `var()` always needs parens
- Defining tokens outside `:root` — they are then scoped to only that element's subtree
- Using palette tokens directly in component styles — reinforce the two-tier rule

**If a student asks about SASS/SCSS:** Custom properties are better for most use cases now. SASS variables are compile-time and cannot be changed at runtime. Custom properties are live — you can update them with JavaScript, change them inside media queries, override them on individual elements.
