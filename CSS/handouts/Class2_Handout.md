# 📄 CSS Class 2 — Student Handout
### Design Tokens, Colour & Typography
**Deejoft Coding School**

---

## A. CSS Custom Properties — The Two-Tier Token System

```css
:root {

  /* ── TIER 1: Palette tokens — raw values, neutral names ──
     Never reference these in component styles directly.          */
  --palette-neutral-900: #0f0f11;
  --palette-neutral-400: #888899;
  --palette-neutral-100: #f8f8fc;
  --palette-white:       #ffffff;
  --palette-brand:       #e94560;
  --palette-brand-light: #ff7a90;

  /* ── TIER 2: Semantic tokens — describe PURPOSE, not colour ──
     These are what every component rule uses.                    */
  --colour-text:          var(--palette-neutral-900);
  --colour-text-muted:    var(--palette-neutral-400);
  --colour-bg:            var(--palette-white);
  --colour-bg-subtle:     var(--palette-neutral-100);
  --colour-border:        #e2e2e8;
  --colour-primary:       var(--palette-brand);
  --colour-primary-hover: var(--palette-brand-light);

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

### Why Two Tiers?

```css
/* ❌ Without tokens — one colour change = find/replace everywhere */
.btn     { background: #e94560; }
.badge   { background: #e94560; }
.link:hover { color: #e94560; }

/* ✅ With tokens — one colour change = update one line in :root */
.btn        { background: var(--colour-primary); }
.badge      { background: var(--colour-primary); }
.link:hover { color:      var(--colour-primary); }
```

> ✏️ **Fill in:** Why use semantic tokens (`--colour-primary`) rather than palette tokens (`--palette-brand`) in component styles?
>
> _________________________________________________________________

---

## B. Dark Mode — Swap Semantic Tokens Only

```css
/* Light mode is the default (already in :root above) */

/* Dark mode — ONLY semantic tokens change */
@media (prefers-color-scheme: dark) {
  :root {
    --colour-text:       var(--palette-neutral-100);
    --colour-text-muted: var(--palette-neutral-400);
    --colour-bg:         var(--palette-neutral-900);
    --colour-bg-subtle:  #1a1a2a;
    --colour-border:     #2a2a3a;
    /* --colour-primary stays the same — brand colour works in both modes */
  }
}

/* Component styles do NOT change at all — they use semantic tokens */
.card {
  background: var(--colour-bg);     /* Automatically white or dark */
  color:      var(--colour-text);   /* Automatically dark or light */
  border:     1px solid var(--colour-border);
}
```

> ✏️ **Fill in:** Complete the dark mode media query for a site that should have a `#1a1a2e` background in dark mode. Add it to your `:root`:
>
> ```css
> @media (prefers-color-scheme: ________) {
>   :root {
>     --colour-bg: ____________;
>   }
> }
> ```

---

## C. Colour — Modern Approaches

```css
/* HEX — concise, most common */
color: #e94560;

/* HSL — most readable; easy to tweak by feel */
/* hsl(hue 0–360°, saturation%, lightness%) */
color: hsl(350 80% 59%);         /* Red */
color: hsl(142 60% 40%);         /* Green */
color: hsl(220 80% 55%);         /* Blue */
color: hsl(350 80% 59% / 50%);   /* Red at 50% opacity — slash syntax */

/* OKLCH — perceptually uniform; best for design systems */
/* oklch(lightness 0–1, chroma, hue 0–360) */
color: oklch(0.60 0.18 15);      /* Brand red */
color: oklch(0.60 0.18 142);     /* Same lightness, different hue */

/* color-mix() — mix two colours natively */
background: color-mix(in oklch, var(--colour-primary) 15%, white);
/* → A very light tint of the primary colour */
```

> ✏️ **Fill in:** You want a semi-transparent dark overlay for a modal backdrop. Complete this rule using HSL:
>
> ```css
> .modal-backdrop {
>   background: hsl(240 10% 5% / ____);   /* 60% opacity */
> }
> ```

---

## D. Typography — Fluid Scale with `clamp()`

```css
/* clamp(minimum, preferred, maximum) */
/* Size never goes below minimum or above maximum.
   It scales proportionally between them based on viewport width. */

font-size: clamp(1rem, 0.9rem + 0.5vw, 1.5rem);
/*                ↑          ↑               ↑
             never <1rem  scales with vw  never >1.5rem  */
```

### Fluid Type Scale (generated from utopia.fyi)

```css
:root {
  --step--1: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);   /* Small */
  --step-0:  clamp(1rem, 0.9rem + 0.5vw, 1.125rem);        /* Body */
  --step-1:  clamp(1.2rem, 1.05rem + 0.75vw, 1.5rem);      /* h4 */
  --step-2:  clamp(1.44rem, 1.2rem + 1.2vw, 2rem);         /* h3 */
  --step-3:  clamp(1.73rem, 1.4rem + 1.65vw, 2.75rem);     /* h2 */
  --step-4:  clamp(2.07rem, 1.6rem + 2.35vw, 3.75rem);     /* h1 */
}
```

### Applying the Scale

```css
body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size:   var(--step-0);
  line-height: 1.6;
  color:       var(--colour-text);
  background:  var(--colour-bg);
}

h1 { font-size: var(--step-4); line-height: 1.1; font-weight: 800; letter-spacing: -0.03em; }
h2 { font-size: var(--step-3); line-height: 1.2; font-weight: 700; letter-spacing: -0.02em; }
h3 { font-size: var(--step-2); line-height: 1.3; font-weight: 600; }
h4 { font-size: var(--step-1); line-height: 1.4; font-weight: 600; }

/* Prose container — optimal reading line length */
.prose { max-width: 65ch; margin-inline: auto; }
/*       ↑ ch = width of '0'. 65ch ≈ 45–75 chars per line (ideal for reading) */

/* Text utilities */
.text-muted   { color: var(--colour-text-muted); }
.text-small   { font-size: var(--step--1); }
.text-balance { text-wrap: balance; }   /* No orphaned words */
.text-pretty  { text-wrap: pretty; }   /* No widows in paragraphs */
```

> ✏️ **Fill in:** What does `max-width: 65ch` mean, and why is `ch` better than `px` for prose containers?
>
> `ch` = _______________________________________________________
>
> Better than `px` because: ______________________________________

---

## E. Class 2 Exercise Checklist

- [ ] Created `tokens.css` with two-tier colour tokens (palette + semantic)
- [ ] Spacing tokens: `--space-xs` through `--space-xl`
- [ ] Radius and shadow tokens
- [ ] Dark mode `@media (prefers-color-scheme: dark)` swapping semantic tokens only
- [ ] `tokens.css` linked before `main.css` in HTML head
- [ ] Fluid type scale (`--step--1` through `--step-4`) using `clamp()`
- [ ] `body` styles: font-family, font-size, line-height, color, background using tokens
- [ ] All headings styled using `--step-*` tokens

---

## ⚡ Class 2 Quick Reference

| Concept | Rule |
|---------|------|
| Custom property syntax | `--name: value;` (two dashes) |
| Reading a custom property | `var(--name)` — always with parentheses |
| Where to define tokens | `:root { }` — makes them globally accessible |
| Tier 1 tokens | Palette — raw colours with scale names |
| Tier 2 tokens | Semantic — names that describe purpose, not colour |
| Dark mode | `@media (prefers-color-scheme: dark)` — redefine semantic tokens only |
| `clamp(min, preferred, max)` | Fluid sizing — scales with viewport, respects limits |
| `65ch` | Optimal prose line length — scales with font |
| `text-wrap: balance` | Prevents orphaned single words at end of headings |
| `color-mix()` | Mix colours natively in CSS — no preprocessor needed |

---

*Deejoft Coding School | CSS Class 2 | Bring to Class 3*
