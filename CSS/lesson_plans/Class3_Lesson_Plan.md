# 📋 CSS Class 3 — Lesson Plan (Tutor Script)
### Flexbox & CSS Grid
**Duration:** ~2 hours | **Format:** Live coding — layout patterns

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap + "when do I use what?" |
| 0:10 – 1:00 | Flexbox — axes, container props, item props, real patterns |
| 1:00 – 1:50 | CSS Grid — tracks, placement, named areas, auto-fill |
| 1:50 – 2:00 | Mini-exercise |

---

## 🛠 Setup (Do Before Students Arrive)
- `flexboxfroggy.com` tab open (warm-up)
- `cssgridgarden.com` tab open
- A starter HTML file with multiple layout challenges: a nav bar, a card grid, a page shell
- The token system from Class 2 already applied

---

## 🎤 PART A — Recap + Layout Decision Framework (0:00 – 0:10)

**[SAY]:**
> "Quick recap: what three things does the CSS reset do? What unit makes font sizes scale with user preferences? What is the difference between a palette token and a semantic token?"

*[Take 2–3 quick answers.]*

**[SAY]:**
> "Today we do layout. All of it. Before we write a line of code, I want to give you the mental model for deciding which tool to use."

**[WRITE ON BOARD:]**
```
NORMAL FLOW   →  Blocks stack vertically, inline elements flow horizontally.
               →  Use it when that natural flow IS the layout you want.

FLEXBOX       →  One axis. You have items and want to arrange them in a ROW or COLUMN.
               →  "How do these items relate to each other in a line?"

GRID          →  Two axes. You have a layout in mind and want to place items into it.
               →  "What is the overall structure of this page or component?"

They WORK TOGETHER: Grid for the outer structure, Flexbox inside Grid cells.
```

**[SAY]:**
> "The question is not 'Flexbox or Grid?' It is 'what shape is this problem?' Is the problem one-dimensional — items in a row or column? Flexbox. Two-dimensional — rows AND columns — or do you have a specific layout you are trying to achieve? Grid."

---

## 🎤 PART B — Flexbox (0:10 – 1:00)

### The Two Axes — Visualise Before Typing (10 min)

**[DRAW ON BOARD — with a row container and three items:]**
```
FLEX CONTAINER (flexDirection: row — default)
┌────────────────────────────────────────────────┐
│                                                │
│  [ Item 1 ]  [ Item 2 ]  [ Item 3 ]           │
│                                                │
│  ───────────── Main Axis (→) ─────────────▶   │
│                                                │
│  ↕  Cross Axis                                │
└────────────────────────────────────────────────┘
```

**[SAY]:**
> "Flexbox has two axes. The main axis runs along `flex-direction`. The cross axis runs perpendicular. The critical concept: `justify-content` controls spacing along the main axis. `align-items` controls positioning on the cross axis. These two properties control 90% of what you want to do."
>
> "Default `flex-direction` is `row`. Main axis is horizontal. `justify-content` → horizontal. `align-items` → vertical. Switch to `flex-direction: column` — everything flips. Main axis becomes vertical. `justify-content` → vertical. `align-items` → horizontal."

---

### Container Properties (15 min)

**[TYPE — live in a flex demo file:]**
```css
.nav {
  display: flex;                    /* Make this a flex container */
  flex-direction: row;              /* Default — items go left to right */
  flex-wrap: wrap;                  /* Allow items to wrap to next line */
  justify-content: space-between;   /* Main axis spacing */
  align-items: center;              /* Cross axis alignment */
  gap: 16px;                        /* Space between items */
}
```

**[DEMO each property live — change `justify-content` to `flex-start`, `center`, `flex-end`, `space-around`, `space-evenly`. Show the items moving each time.]**

**[SAY for `gap`:]:**
> "`gap` replaced the old `margin` hack. Previously, you would do `margin-right: 16px` on items and then undo it on the last one. With `gap`, you just declare the space between items and the browser handles it. `gap: 12px 24px` gives separate row-gap and column-gap."

---

### Item Properties (10 min)

**[TYPE:]**
```css
/* flex: grow  shrink  basis */
.nav__logo { flex: 0 0 auto; }   /* Never grow, never shrink, natural size */
.nav__menu { flex: 1 1 auto; }   /* Grow and shrink to fill remaining space */

/* flex: 1 is the most common shorthand */
/* It means: grow=1, shrink=1, basis=0 — fill all available space */
.sidebar { flex: 0 0 260px; }    /* Fixed 260px — no growing, no shrinking */
.main    { flex: 1; }            /* Takes all space beside the sidebar */

/* align-self — override container's align-items for ONE item */
.card--featured { align-self: stretch; }
```

**[SAY for `flex: 1`:]:**
> "`flex: 1` is the most useful shorthand you will write. It means: I want this item to grow to fill whatever space is available, divided equally among all `flex: 1` siblings. A 3-column layout where all three columns are equal: put `flex: 1` on all three. A layout with a 260px sidebar and a flexible main: `flex: 0 0 260px` on the sidebar, `flex: 1` on main."

---

### Real-World Patterns (25 min)

**[SAY]:**
> "Let me build four patterns you will need in every project. Type with me."

**Pattern 1 — Navigation bar:**
```css
.site-header {
  display: flex;
  justify-content: space-between;  /* Logo left, nav right */
  align-items: center;
  padding: var(--space-s) var(--space-l);
  background: var(--colour-bg);
  border-bottom: 1px solid var(--colour-border);
}

.site-nav {
  display: flex;        /* Nested flex — inside a flex item */
  gap: var(--space-m);
  list-style: none;
  padding: 0;
}
```

**[SAY]:**
> "Nesting Flex inside Flex is completely normal and extremely common. The `<nav>` is a flex item inside `.site-header`, AND it is itself a flex container for the nav links."

**Pattern 2 — Card row with wrapping:**
```css
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-m);
}

.card-row .card {
  flex: 1 1 260px;
  /* Shorthand for: grow=1, shrink=1, basis=260px.
     Each card wants to be 260px.
     If there's room, they all grow equally.
     If there's not enough room, they shrink or wrap. */
}
```

**[DEMO — resize the browser. Show cards wrapping to a new row when the viewport is too narrow.]**

**Pattern 3 — Perfect centering:**
```css
.hero {
  display: flex;
  flex-direction: column;    /* Stack heading and button vertically */
  justify-content: center;  /* Centre vertically */
  align-items: center;       /* Centre horizontally */
  min-height: 80dvh;
  text-align: center;
}
```

**[SAY]:**
> "The most common centering question in CSS: 'How do I center something both horizontally and vertically?' This is the answer. Three lines of Flexbox."

**Pattern 4 — Sticky footer:**
```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;    /* Full viewport height minimum */
}

main { flex: 1; }        /* Main grows to push footer to the bottom */
```

---

## 🎤 PART C — CSS Grid (1:00 – 1:50)

### What Grid Does That Flexbox Cannot (5 min)

**[SAY]:**
> "Flexbox is one-dimensional. It arranges items in a line and allows them to wrap. But it cannot say 'item A should start in column 2, row 1, and span 3 columns'. Grid can. Grid is the tool for two-dimensional layouts where you have a specific structure in mind."

---

### Defining a Grid (10 min)

**[TYPE:]**
```css
.layout {
  display: grid;

  /* Define columns */
  grid-template-columns: 1fr 1fr 1fr;        /* Three equal columns */
  grid-template-columns: repeat(3, 1fr);     /* Same — cleaner */
  grid-template-columns: 260px 1fr;          /* Fixed sidebar + flexible main */
  grid-template-columns: repeat(12, 1fr);    /* Classic 12-column grid */

  /* Define rows */
  grid-template-rows: auto 1fr auto;         /* header, main fills space, footer */

  gap: var(--space-m);
}
```

**[SAY for `fr`:]:**
> "`fr` is the fraction unit — a fraction of available space after fixed lengths are accounted for. `1fr 1fr 1fr` gives three equal columns. `260px 1fr` gives a 260px sidebar and a flexible main that takes all remaining space. `1fr 2fr` gives one column at one-third and one at two-thirds of the available space."

---

### Placing Items (10 min)

**[TYPE:]**
```css
/* Spanning multiple columns or rows */
.card--wide {
  grid-column: span 2;    /* This item spans 2 columns */
}
.card--tall {
  grid-row: span 2;       /* This item spans 2 rows */
}
.banner {
  grid-column: 1 / -1;   /* Span from column line 1 to the last line (-1) */
                          /* -1 always means the last line — works regardless of column count */
}

/* Explicit placement */
.sidebar {
  grid-column: 1 / 2;    /* From line 1 to line 2 */
  grid-row:    1 / 3;    /* From row 1 to row 3 */
}
```

**[SAY for `-1`:]:**
> "`grid-column: 1 / -1` is the most useful placement shorthand. `-1` always means the last grid line, regardless of how many columns you have. So this rule always means 'span all columns' — you never need to update it when the column count changes."

---

### Named Areas — The Most Readable Approach (15 min)

**[SAY]:**
> "For page-level layouts, named areas are the most readable approach. You draw the layout in ASCII art in your CSS."

**[TYPE:]**
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
```

**[SAY:]:**
> "Look at `grid-template-areas`. You can read the layout directly: header spans the full width at the top, sidebar is on the left in the middle, main fills the rest, footer spans the full width at the bottom. The string is visual — spaces are the separators, and each word becomes a named area."

**[TYPE:]**
```css
/* Now assign elements to areas by name */
.site-header  { grid-area: header; }
.site-sidebar { grid-area: sidebar; }
.site-main    { grid-area: main; }
.site-footer  { grid-area: footer; }
```

**[DEMO live — show the layout form instantly when the grid-area assignments are added.]**

---

### Auto-Fill / Auto-Fit — Responsive Without Media Queries (10 min)

**[SAY]:**
> "This is the most impressive single line of CSS in the entire course."

**[TYPE:]**
```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-m);
}
```

**[DEMO — slowly resize the browser. Show the number of columns changing automatically: 4 → 3 → 2 → 1.]**

**[SAY:]:**
> "Let me read this aloud: `repeat(auto-fill, minmax(240px, 1fr))`. 'Repeat as many columns as will fit, where each column is at least 240px wide and at most 1 fraction of the available space.' The browser calculates how many 240px columns fit in the current width and creates exactly that many. Resize the window — it recalculates. No media queries. No breakpoints. The layout is intrinsically responsive."

**[SAY for `auto-fill` vs `auto-fit`:]:**
> "`auto-fill` maintains empty columns. `auto-fit` collapses them so items can grow to fill the space. For card grids, `auto-fill` is usually correct — you want consistent card sizes, not giant cards just because there are only two of them."

---

## ✏️ PART D — Mini Exercise (1:50 – 2:00)

**[SAY]:**
> "Two tasks. Ten minutes."
>
> "Task 1: Style the navigation in your portfolio using Flexbox — logo on the left, links on the right, vertically centred. Token values only — no raw hex or px except for the border."
>
> "Task 2: Apply the page shell Grid to your portfolio. Header, main, and footer using named areas. The sidebar is optional if your portfolio design does not have one."

**[WHILE STUDENTS WORK:]**
- Check for `display: flex` on the nav container, not on the `<a>` elements directly
- Check that named areas are spelled consistently between `grid-template-areas` and `grid-area`
- Watch for `fr` units being misused — `1fr 1fr` for a 50/50 split is correct

---

## 🔚 Wrap-Up (Last 3 min)

**[SAY]:**
> "Flexbox and Grid are not competitors. They are complementary. The page shell is Grid. Navigation is Flexbox. Card rows are Flexbox. Card grids are Grid. An individual card's internal layout is Flexbox again."
>
> "Next class: responsive design, container queries, transitions, and CSS nesting. We take this layout and make it work on every device and feel polished with smooth interactions."

---

## 📎 Tutor Notes

**Common Grid errors:**
- `grid-template-areas` with uneven string lengths — the grid becomes invalid. All rows must have the same number of cells.
- Using a named area without assigning the element's `grid-area` — nothing moves
- Confusing grid lines (1, 2, 3...) with grid tracks (the spaces between lines)

**Flexbox froggy:** If any student is stuck on the conceptual axis explanation, send them to `flexboxfroggy.com` for homework — 24 levels that teach the properties through gameplay. Grid Garden does the same for Grid.

**Tip for visual learners:** DevTools has a Grid overlay. In the Layout tab, check the grid overlay checkbox. It draws the grid lines, area names, and track sizes directly on the page.
