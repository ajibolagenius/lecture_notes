# Week 5: Layout (Part 2) & Responsive Design

This week, you master layout. We'll finish Flexbox by learning how to control individual items, then move to **CSS Grid** to turn your Featured Work section into a real gallery. Finally, you'll make your entire portfolio *responsive* using Media Queries.

---

## Module 7 (Continued): Advanced Flexbox & CSS Grid

### 1. Advanced Flexbox: Controlling Flex Items

So far, you've only put properties on the *flex container* (your `<header>`). Now we'll put properties on the *flex items* (the children) to control them individually.

* **Lecture & Concepts:**
    * **`flex-grow` (How to grow):** A number dictating how much *extra space* an item should take. Default `0` (don't grow).
    * **`flex-shrink` (How to shrink):** A number dictating how much an item should shrink if there *isn't enough* space. Default `1`.
    * **`flex-basis` (The starting size):** The item's default size *before* growing/shrinking.
    * **The `flex` Shorthand:** `flex: [flex-grow] [flex-shrink] [flex-basis];`
        * `flex: 1;` — Grow and shrink. A "fluid" item.
        * `flex: none;` — Don't grow, don't shrink. A "rigid" item.

* **In-Depth Example (If You Add a Logo Alongside Your Name):**
    ```css
    header {
      display: flex;
      align-items: center;
    }

    .logo,
    nav {
      /* These are "rigid" — they won't grow or shrink */
      flex: none;
    }

    #page-title {
      /* This is "fluid" — grows to fill any extra space between logo and nav */
      flex: 1;
    }
    ```

---

### 2. Introduction to CSS Grid

* **Lecture & Concepts:**
    * **Flexbox is 1-Dimensional.** For laying items out in a single row *OR* a single column — perfect for your header.
    * **Grid is 2-Dimensional.** For laying items out in **rows AND columns at the same time** — perfect for your Featured Work gallery.
    * **Analogy:** Flexbox is a row of books on a shelf. CSS Grid is a full checkerboard.
    * Just like Flexbox, Grid has a **Grid Container** (`display: grid;`) and **Grid Items** (the direct children).

---

### 3. Defining the Grid (`grid-template-columns`)

* **Lecture & Concepts:**
    * **The `fr` Unit (Fractional Unit):** `1fr` means "1 fraction of the available space."
        * `grid-template-columns: 1fr 1fr 1fr;` = **three equal-width columns**.
    * **The `repeat()` Function:** `repeat(3, 1fr)` is the *exact same* as `1fr 1fr 1fr`.
    * **`grid-template-rows`:** Works the same way, for row height.

---

### 4. Controlling Spacing (`gap`)

* **Lecture & Concepts:**
    * **`gap: 20px;`** = Creates a 20px "gutter" *between all rows and columns*. No more margin hacks!

* **In-Depth Example (Your Real Featured Work Section as a Grid):**
    * **`index.html` (already built, from HTML Week 3 + your Week 1-4 CSS classes):**
        ```html
        <section>
          <h2 class="section-heading">Featured Work</h2>

          <div class="work-grid">
            <article class="project-card">...</article>
            <article class="project-card">...</article>
            <article class="project-card">...</article>
          </div>
        </section>
        ```
        *(If your Featured Work `<article>`s aren't already wrapped in a container `<div>`, add one now — `class="work-grid"` — so you have something to turn `display: grid` on.)*
    * **`style.css`:**
        ```css
        .work-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .project-card {
          /* Remove the fixed width and margin-bottom from Week 2 —
             the grid's 'gap' now handles all the spacing */
          width: auto;
          margin-bottom: 0;
        }
        ```

---

## Module 8 (Partial): Responsive Design

Your layout looks great on your desktop, but a 3-column grid is a disaster on a phone. **Responsive Design** is the practice of building one site that *adapts* to any screen size.

### 1. What is Responsive Design?

* **Lecture & Concepts:**
    * **The Mobile-First Approach (Best Practice):** Write your CSS **by default** for the **smallest screen**. Then use **Media Queries** to *add* complexity as the screen gets *wider*.
    * **Why?** It's easier to *add* complexity than to *remove* it, and it results in faster-loading mobile sites.

### 2. The Viewport Meta Tag (Already Done)

* **Lecture & Concepts:**
    * You already added `<meta name="viewport" content="width=device-width, initial-scale=1.0">` back in HTML Week 1 — confirm it's still there on all 3 pages. **Without it, media queries won't work correctly.**

### 3. Media Queries (`@media`)

* **Lecture & Concepts:**
    * **Syntax:** `@media (condition) { ...css rules... }`
    * **The Condition (Mobile-First):** Almost always `min-width`. `min-width: 600px` asks: "Is the browser window *at least* 600px wide?"
    * **"Breakpoints":** `~600px` (tablets), `~900px` (small desktops), `~1200px` (large desktops).

* **In-Depth Example (Your Real Featured Work, Mobile-First):**
    ```css
    /* 1. --- Mobile-First (Default) ---
       This applies to ALL screen sizes, including the smallest phone. */
    .work-grid {
      display: grid;
      grid-template-columns: 1fr; /* single column on mobile */
      gap: 20px;
    }

    /* 2. --- Tablet Breakpoint --- */
    @media (min-width: 600px) {
      .work-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* 3. --- Desktop Breakpoint --- */
    @media (min-width: 900px) {
      .work-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    ```

* **⭐️ Class Exercise: Make Your Gallery Responsive**
    1.  Set `.work-grid` to a single-column grid by default.
    2.  Add a `@media (min-width: 600px)` query switching it to 2 columns.
    3.  Add a `@media (min-width: 900px)` query switching it to 3 columns.
    4.  Resize your browser window from narrow to wide and watch it adapt live.

---

### Week 5: Comprehensive Assignment

**Objective:** Turn your Featured Work section into a responsive CSS Grid, and confirm your whole portfolio holds up on mobile.

**Files to Use:**
1.  `index.html`, `about.html`, `contact.html`
2.  `style.css`

**Requirements:**

1.  **Grid Gallery:** Wrap your Featured Work `<article>`s in a `.work-grid` container and turn it into a CSS Grid.
2.  **Mobile-First Breakpoints:** Single column by default, 2 columns at `min-width: 600px`, 3 columns at `min-width: 900px`.
3.  **Gap, Not Margin:** Replace the `margin-bottom` spacing hack from Week 2 with `gap` on the grid container.
4.  **Full-Site Check:** Resize your browser (or use dev tools' device toolbar) to confirm `index.html`, `about.html`, and `contact.html` — including your Week 4 header and your contact form — all remain usable on a narrow, phone-width screen.
5.  **Screenshots:** Submit screenshots of all 3 pages at mobile, tablet, and desktop widths.

**Bonus Challenge:** Use `grid-column: span 2;` on your "Featured" project card so it visually stands out by taking up two columns on desktop.
