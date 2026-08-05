# Layout (Part 2) & Responsive Design

This week, you will master layout. We'll finish Flexbox by learning how to control individual items, then move to **CSS Grid**, the powerful 2-dimensional layout system. Finally, you'll learn how to make your layouts *responsive* using Media Queries.

---

## Module 7 (Continued): Advanced Flexbox & CSS Grid

### 1. Advanced Flexbox: Controlling Flex Items

So far, we've only put properties on the *flex container*. Now we'll put properties on the *flex items* (the children) to control them individually.

* **Lecture & Concepts:**
    * **`flex-grow` (How to grow):**
        * A number that dictates how much of the *extra space* an item should take up.
        * Default is `0` (don't grow).
        * If all items have `flex-grow: 1;`, they will share the extra space equally.
        * If one item has `flex-grow: 2;` and another has `flex-grow: 1;`, the first item will take *twice* as much extra space.
    * **`flex-shrink` (How to shrink):**
        * A number that dictates how much an item should shrink if there *isn't enough* space.
        * Default is `1` (all items shrink equally).
        * If you set `flex-shrink: 0;` on an item, it will *refuse* to shrink, even if it overflows.
    * **`flex-basis` (The starting size):**
        * This is the item's default size *before* any growing or shrinking happens.
        * It's like a "starting width" (if `flex-direction: row`).
        * You can use `px`, `%`, `rem`, or `auto` (default, uses the item's `width` or content size).

* **The `flex` Shorthand (Modern Practice):**
    * You will almost always use the shorthand property `flex` in this order:
    * `flex: [flex-grow] [flex-shrink] [flex-basis];`
    * **Common Values:**
        * `flex: 0 1 auto;` (Default: Don't grow, shrink equally, basis is auto)
        * `flex: 1 1 auto;` (Grow, shrink, basis is auto. A "fluid" item)
        * `flex: 1;` (Shorthand for `flex: 1 1 0;`. Grow and shrink, but start at 0)
        * `flex: auto;` (Shorthand for `flex: 1 1 auto;`)
        * `flex: none;` (Shorthand for `flex: 0 0 auto;`. Don't grow, don't shrink. A "rigid" item)

* **In-Depth Example (Creating a common layout):**
    * We want a header where the logo stays on the left, the nav stays on the right, and a title *grows to fill the middle*.
    * **`index.html`:**
        ```html
        <header class="main-header">
          <div class="logo">Logo</div>
          <h1 class="title">My Dashboard</h1>
          <nav class="main-nav">Nav</nav>
        </header>
        ```
    * **`style.css`:**
        ```css
        .main-header {
          display: flex;
          align-items: center; /* Vertically center everything */
          width: 100%;
        }

        .logo, .main-nav {
          /* These are "rigid". They won't grow or shrink. */
          flex: none;
          padding: 10px;
        }

        .title {
          /* This is "fluid". It will grow to take all extra space. */
          flex: 1; /* Same as 'flex: 1 1 0' */
          text-align: center;
        }
        ```
    [Image of flex-grow example layout]

---

### 2. Introduction to CSS Grid

* **Lecture & Concepts:**
    * **Flexbox is 1-Dimensional.** It's for laying items out in a single row *OR* a single column.
    * **Grid is 2-Dimensional.** It's for laying items out in **rows AND columns at the same time**.
    * **Analogy:**
        * **Flexbox** is like a row of books on a shelf. You control their alignment *along that one shelf*.
        * **CSS Grid** is like a full checkerboard. You control the alignment of *every single square* in both directions.
    * Just like Flexbox, Grid has a **Grid Container** (`display: grid;`) and **Grid Items** (the direct children).

[Image of flexbox 1D vs grid 2D layout]

---

### 3. Defining the Grid (`grid-template-columns`)

* **Lecture & Concepts:**
    * This is the "magic" property. It defines the number and size of your columns.
    * **The `fr` Unit (Fractional Unit):**
        * This is the new, amazing unit for Grid.
        * `1fr` means "1 fraction of the available space."
        * `grid-template-columns: 1fr 1fr 1fr;` = Creates **three equal-width columns**.
        * `grid-template-columns: 2fr 1fr;` = Creates **two columns**. The first is *twice as wide* as the second.
    * **Mixing Units:** You can mix `fr` with `px`, `%`, etc.
        * `grid-template-columns: 200px 1fr;` = Creates a **fixed 200px sidebar** and a **fluid main content area** that takes the rest of the space.
    * **The `repeat()` Function:** A cleaner way to write repeating tracks.
        * `repeat(3, 1fr)` is the *exact same* as `1fr 1fr 1fr`.
        * `repeat(12, 1fr)` = The classic 12-column layout.
    * **`grid-template-rows`:** Works the exact same way, but for defining the height of your rows.

---

### 4. Controlling Spacing (`gap`)

* **Lecture & Concepts:**
    * This is the beautiful, simple part of Grid. No more weird margin hacks!
    * **`gap: 20px;`** = Creates a 20px "gutter" *between all rows and all columns*.
    * You can also be specific:
        * `column-gap: 30px;` (Only space between columns)
        * `row-gap: 10px;` (Only space between rows)

* **In-Depth Example (A 3-Column Layout):**
    * **`index.html`:**
        ```html
        <div class="grid-container">
          <div class="grid-item">Item 1</div>
          <div class="grid-item">Item 2</div>
          <div class="grid-item">Item 3</div>
          <div class="grid-item">Item 4</div>
          <div class="grid-item">Item 5</div>
          <div class="grid-item">Item 6</div>
        </div>
        ```
    * **`style.css`:**
        ```css
        .grid-container {
          /* 1. Turn it into a grid */
          display: grid;

          /* 2. Define 3 equal-width columns */
          grid-template-columns: repeat(3, 1fr);

          /* 3. Add a 1rem (16px) gap between all items */
          gap: 1rem;
        }

        .grid-item {
          background-color: #336699;
          color: white;
          padding: 20px;
        }
        ```
    * **Result:** A perfect, 3-column, 2-row grid with gutters, in just 4 lines of CSS.

---
---

## Module 8 (Partial): Responsive Design

Your layout looks great on your desktop, but it's a disaster on a phone. **Responsive Design** is the practice of building one website that *adapts* (responds) to any screen size.

### 1. What is Responsive Design?

* **Lecture & Concepts:**
    * It means your layout, font sizes, and images *change* based on the screen width.
    * **The Mobile-First Approach (Best Practice):**
        * This is the modern standard.
        * You write your CSS **by default** for the **smallest screen** (a phone).
        * Then, you use **Media Queries** to *add* more complex styles (like columns or bigger fonts) as the screen gets *wider*.
        * **Why?** It's easier to *add* complexity than to *remove* it. It also results in faster-loading sites on mobile.

[Image of mobile-first responsive design]

### 2. The Viewport Meta Tag (CRITICAL)

* **Lecture & Concepts:**
    * You **must** add this tag to the `<head>` of *all* your HTML files.
    * `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
    * **What it does:** Phones *lie*. A new iPhone might have a 1080px wide screen, but to fit websites, it "pretends" to be `980px` wide and just zooms out. This makes your site unreadable.
    * This meta tag tells the phone: "Stop lying. Set your *virtual width* to your *actual device width* (e.g., 390px) and don't zoom in (set the `initial-scale` to 1.0)."
    * **Without this tag, media queries will not work correctly.**

### 3. Media Queries (`@media`)

* **Lecture & Concepts:**
    * A media query is a special `@rule` in CSS that "asks" the browser a question. If the answer is yes, it applies the CSS inside it.
    * **Syntax:** `@media (condition) { ...css rules... }`
    * **The Condition (Mobile-First):** We will almost always use `min-width`.
        * `min-width: 600px` asks the question: "Is the browser window *at least* 600px wide?"
    * **"Breakpoints":** These are the `min-width` values where your design "breaks" and needs to change. Common breakpoints are:
        * `~600px` (Tablets)
        * `~900px` (Small desktops)
        * `~1200px` (Large desktops)

* **In-Depth Example (Mobile-First Layout):**
    * We want a 1-column layout on mobile and a 2-column layout on tablets.
    * **`index.html`:**
        ```html
        <div class="responsive-grid">
          <div class="item">A</div>
          <div class="item">B</div>
        </div>
        ```
    * **`style.css`:**
        ```css
        /* 1. --- Mobile-First Styles (Default) --- */
        /* These styles apply to ALL screen sizes */

        .responsive-grid {
          display: grid;
          /* By default: a 1-column layout */
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .item {
          background-color: hotpink;
          padding: 20px;
        }

        /* 2. --- Tablet Styles (Media Query) --- */

        /* This is the breakpoint */
        @media (min-width: 600px) {

          /* If the screen is 600px or WIDER, apply these rules */
          .responsive-grid {
            /* OVERRIDE the default and change to 2 columns */
            grid-template-columns: 1fr 1fr;
          }

          .item {
            /* We can change other things, too! */
            background-color: steelblue;
          }
        }
        ```
    * **Result:** On a phone, you see one pink `A` stacked on top of one pink `B`. On a tablet, you see a blue `A` side-by-side with a blue `B`.

---

### Comprehensive Assignment

**Objective:** Build a "Responsive Grid Gallery" that combines CSS Grid and Mobile-First Media Queries.

**Files to Create:**
1.  `index.html`
2.  `style.css`

#### Part 1: The HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Week 5 Assignment</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <h1>My Photo Gallery</h1>

  <div class="gallery-grid">
    <div class="card">
      <img src="[https://via.placeholder.com/300x200.png?text=Photo+1](https://via.placeholder.com/300x200.png?text=Photo+1)" alt="Photo">
    </div>
    <div class="card">
      <img src="[https://via.placeholder.com/300x200.png?text=Photo+2](https://via.placeholder.com/300x200.png?text=Photo+2)" alt="Photo">
    </div>
    <div class="card">
      <img src="[https://via.placeholder.com/300x200.png?text=Photo+3](https://via.placeholder.com/300x200.png?text=Photo+3)" alt="Photo">
    </div>
    <div class="card">
      <img src="[https://via.placeholder.com/300x200.png?text=Photo+4](https://via.placeholder.com/300x200.png?text=Photo+4)" alt="Photo">
    </div>
    <div class="card">
      <img src="[https://via.placeholder.com/300x200.png?text=Photo+5](https://via.placeholder.com/300x200.png?text=Photo+5)" alt="Photo">
    </div>
    <div class="card">
      <img src="[https://via.placeholder.com/300x200.png?text=Photo+6](https://via.placeholder.com/300x200.png?text=Photo+6)" alt="Photo">
    </div>
    <div class="card">
      <img src="[https://via.placeholder.com/300x200.png?text=Photo+7](https://via.placeholder.com/300x200.png?text=Photo+7)" alt="Photo">
    </div>
    <div class="card">
      <img src="[https://via.placeholder.com/300x200.png?text=Photo+8](https://via.placeholder.com/300x200.png?text=Photo+8)" alt="Photo">
    </div>
    <div class="card">
      <img src="[https://via.placeholder.com/300x200.png?text=Photo+9](https://via.placeholder.com/300x200.png?text=Photo+9)" alt="Photo">
    </div>
  </div>

</body>
</html>
```

#### Part 2: The CSS (`style.css`)
```css
/* --- Basic Setup & Fluid Images --- */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
}

.card img {
  /* Fluid Image Trick! */
  max-width: 100%;
  height: auto;
  display: block;
}

.card {
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* --- STEP 1: Mobile-First Styles (The Default) ---
  This is our 1-column layout for small screens.
*/
.gallery-grid {
  display: grid;

  /* By default, we are a 1-column grid */
  grid-template-columns: 1fr;

  gap: 20px;
}


/* --- STEP 2: Tablet Breakpoint ---
  This query asks: "Is the screen AT LEAST 600px wide?"
*/
@media (min-width: 600px) {
  .gallery-grid {
    /* If yes, override the grid to be 2 columns */
    grid-template-columns: repeat(2, 1fr);
  }
}


/* --- STEP 3: Desktop Breakpoint ---
  This query asks: "Is the screen AT LEAST 900px wide?"
*/
@media (min-width: 900px) {
  .gallery-grid {
    /* If yes, override the grid to be 3 columns */
    grid-template-columns: repeat(3, 1fr);
  }
}
```
