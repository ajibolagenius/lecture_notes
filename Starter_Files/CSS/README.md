# CSS Starter Files

## File Structure

```
your-project/
├── index.html      ← from the HTML starter
└── css/
    ├── tokens.css  ← design tokens (link FIRST)
    └── main.css    ← reset + base styles (link SECOND)
```

## How to Link in Your HTML

Add both links inside `<head>`, in this order:

```html
<link rel="stylesheet" href="./css/tokens.css">
<link rel="stylesheet" href="./css/main.css">
```

Order matters — `main.css` uses variables defined in `tokens.css`.

## What's Already Done

**`tokens.css` includes:**
- Colour palette tokens (`--palette-*`)
- Semantic colour tokens (`--colour-text`, `--colour-bg`, etc.)
- Dark mode via `prefers-color-scheme: dark`
- Fluid type scale (`--step--1` through `--step-4`) using `clamp()`
- Spacing scale (`--space-xs` through `--space-xl`)
- Radius, shadow, and transition tokens

**`main.css` includes:**
- Modern CSS reset (`box-sizing: border-box`, margin/padding zero)
- `prefers-reduced-motion` media query
- Base typography using token values
- `.container` layout wrapper
- `.prose` reading width container
- Text utility classes
- `.sr-only` accessibility utility

## What You Add

Write all your component and page styles **below the marked line** in `main.css`. Use token values for all colours, spacing, and sizes — no raw hex codes or pixel values in your component rules.

```css
/* Example */
.card {
  background: var(--colour-bg);
  padding: var(--space-m);
  border-radius: var(--radius-l);
  border: 1px solid var(--colour-border);
  box-shadow: var(--shadow-s);
}
```
