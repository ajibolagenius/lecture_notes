# 📄 CSS Class 3 — Student Handout
### Flexbox & CSS Grid
**Deejoft Coding School**

---

## A. When to Use Which

```
NORMAL FLOW   →  Use when blocks stacking top-to-bottom IS what you want.
FLEXBOX       →  One dimension. Items in a row OR a column.
GRID          →  Two dimensions. Rows AND columns. You have a layout in mind.
```

**They work together:** Grid for the page shell. Flexbox inside grid cells.

---

## B. Flexbox — Full Reference

### The Two Axes

```
flex-direction: row (default)

CONTAINER
┌────────────────────────────────────────────────┐
│  [ A ]  [ B ]  [ C ]                           │
│  ──────────── Main Axis (→) ──────────────▶    │
│  ↕  Cross Axis                                 │
└────────────────────────────────────────────────┘

flex-direction: column

CONTAINER
┌──────────┐
│  [ A ]   │ ↕ Main Axis
│  [ B ]   │
│  [ C ]   │
│  ──▶ Cross│
└──────────┘
```

### Container Properties

```css
.container {
  display: flex;

  flex-direction: row;            /* row | column | row-reverse | column-reverse */
  flex-wrap:      wrap;           /* nowrap | wrap | wrap-reverse */
  justify-content: space-between; /* MAIN AXIS */
  align-items:    center;         /* CROSS AXIS — for the whole row */
  align-content:  flex-start;     /* CROSS AXIS — for multi-line containers */
  gap: 16px;                      /* Space between all items */
  gap: 12px 24px;                 /* row-gap  column-gap */
}
```

**`justify-content` values (main axis):**

| Value | What it does |
|-------|-------------|
| `flex-start` | Items packed at the start |
| `flex-end` | Items packed at the end |
| `center` | Items centred |
| `space-between` | First/last flush to edges, equal space between |
| `space-around` | Equal space around each item (half-space at edges) |
| `space-evenly` | Equal space everywhere including edges |

> ✏️ **Fill in:** To centre items both horizontally and vertically in a `flex-column` container, I use `justify-content: ________` and `align-items: ________`.

### Item Properties

```css
.item {
  flex: 1;               /* grow=1, shrink=1, basis=0 — fill all available space */
  flex: 0 0 260px;       /* grow=0, shrink=0, basis=260px — fixed size, never change */
  flex: 1 1 240px;       /* grow+shrink around 240px */

  align-self: stretch;   /* Override container's align-items for this item only */
  order: -1;             /* Change visual order (does not change DOM order) */
}
```

### Common Patterns

```css
/* Navigation bar — logo left, links right */
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-m);
}

/* Card row with wrapping */
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-m);
}
.card-row .card {
  flex: 1 1 260px;  /* Min width 260px, grows to fill, wraps when it can't fit */
}

/* Perfect centring (both axes) */
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80dvh;
}

/* Sticky footer — body as flex container */
body {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
main { flex: 1; }   /* Takes all remaining space, pushes footer down */
```

> ✏️ **Fill in:** Write the CSS to make `.item` take exactly `200px` of space in a flex row, without growing or shrinking:
>
> ```css
> .item {
>   flex: ___ ___ ____;
> }
> ```

---

## C. CSS Grid — Full Reference

### Defining Columns and Rows

```css
.grid {
  display: grid;

  /* Columns */
  grid-template-columns: 1fr 1fr 1fr;          /* 3 equal columns */
  grid-template-columns: repeat(3, 1fr);        /* Same — cleaner */
  grid-template-columns: 260px 1fr;             /* Fixed + flexible */
  grid-template-columns: repeat(12, 1fr);       /* 12-column grid */

  /* Rows */
  grid-template-rows: auto 1fr auto;            /* header, main, footer */

  gap: var(--space-m);
}
```

**The `fr` unit:** A fraction of remaining space after fixed values.

> ✏️ **Fill in:** What does `grid-template-columns: 1fr 3fr` produce? Describe the two columns:
>
> Column 1: ________________________ Column 2: ________________________

### Placing Items

```css
.item {
  grid-column: span 2;         /* Span 2 columns */
  grid-column: 1 / -1;        /* From first line to last line — all columns */
  grid-column: 2 / 4;         /* From line 2 to line 4 (columns 2 and 3) */
  grid-row:    1 / 3;          /* From row line 1 to row line 3 */
}
```

### Named Areas — Most Readable Approach

```css
.page {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows:    64px 1fr 56px;
  grid-template-areas:
    "header  header "
    "sidebar main   "
    "footer  footer ";
  min-height: 100dvh;
}

/* Assign elements to areas */
header  { grid-area: header;  }
.sidebar { grid-area: sidebar; }
main    { grid-area: main;    }
footer  { grid-area: footer;  }
```

> ✏️ **Fill in:** Write the `grid-template-areas` for a page with: full-width header, full-width footer, and TWO equal content columns (left, right) in the middle:
>
> ```css
> grid-template-areas:
>   "_______  _______"
>   "_______  _______"
>   "_______  _______";
> ```

### Responsive Grid — No Media Queries Needed

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-m);
}
/* "Give me as many 240px+ columns as will fit — no more, no less" */
/* Column count adjusts automatically as the viewport resizes */
```

| Value | Behaviour |
|-------|-----------|
| `auto-fill` | Creates as many columns as fit; maintains empty columns |
| `auto-fit` | Creates as many columns as fit; collapses empty columns so items can grow |

---

## D. Flexbox vs Grid Decision Guide

| Layout problem | Best tool |
|---------------|-----------|
| Navigation bar (logo + links) | Flexbox |
| Cards in a wrapping row | Flexbox with `flex-wrap` |
| Page shell (header/sidebar/main/footer) | Grid with named areas |
| Photo / product gallery | Grid `auto-fill minmax` |
| Items centred in a box | Flexbox (`justify-content: center`, `align-items: center`) |
| Content inside a card | Flexbox |
| Overlapping elements | Grid (`grid-column` / `grid-row`) |

---

## ⚡ Class 3 Quick Reference

| Property | Where | Controls |
|----------|-------|---------|
| `display: flex` | Container | Activate Flexbox |
| `flex-direction` | Container | Row or column axis |
| `justify-content` | Container | Main axis distribution |
| `align-items` | Container | Cross axis alignment (single line) |
| `flex-wrap: wrap` | Container | Allow items to wrap |
| `gap` | Container | Space between items |
| `flex: 1` | Item | Grow to fill available space equally |
| `flex: 0 0 Xpx` | Item | Fixed size — no grow, no shrink |
| `align-self` | Item | Override container's `align-items` |
| `display: grid` | Container | Activate Grid |
| `grid-template-columns` | Container | Define column widths |
| `grid-template-areas` | Container | Named layout map |
| `grid-area` | Item | Assign to a named area |
| `grid-column: span N` | Item | Span N columns |
| `grid-column: 1 / -1` | Item | Span all columns |
| `1fr` | Value | One fraction of available space |
| `repeat(N, 1fr)` | Value | N equal columns |
| `auto-fill minmax(X, 1fr)` | Value | Responsive columns without media queries |

---

*Deejoft Coding School | CSS Class 3 | Bring to Class 4*
