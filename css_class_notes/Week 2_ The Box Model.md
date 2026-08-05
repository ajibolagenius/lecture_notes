# Week 2: The Core Concept: The Box Model

## Module 3: The Box Model & Dimensions

This module is the most important foundation in all of CSS. Every single element on your page is a rectangular box. How you control that box is the key to layout — and this week, you use it to turn your bare `.project-card` articles into real, shaped cards.

### 1. Visualizing the Box Model

* **Lecture & Concepts:**
    * Every HTML element — a paragraph, a heading, your `.project-card`, an image — is treated by the browser as a rectangular box.
    * This box is made of four layers, stacked from the inside out.
    * **The best analogy is a picture frame:**
        * **Content:** The photo itself (your project title, description, image).
        * **Padding:** The matting *inside* the frame. It's the space between the content and the frame.
        * **Border:** The frame itself.
        * **Margin:** The empty wall space *around* the frame. It's the space that pushes *other* project cards away.

* **Developer Tools:** The #1 skill for a CSS developer is using the browser's "Inspect Element" tool.
    * **Practical:** Right-click on your `#page-title` or a `.project-card` and choose "Inspect."
    * In the "Styles" or "Computed" tab, you will see a diagram just like the one above, showing you the exact `margin`, `border`, `padding`, and `content` size of the element you selected.

---

### 2. The Four Layers: Properties

* **Lecture & Concepts:**

    * **`padding` (The "Inside" Space):**
        * Clears space *inside* the border.
        * **Shorthand:** This is the modern way to write it.
            * `padding: 10px;` (Applies 10px to **all four** sides).
            * `padding: 10px 20px;` (Applies 10px to **top/bottom**, 20px to **left/right**).
            * `padding: 10px 20px 30px 40px;` (Applies in clockwise order: **Top, Right, Bottom, Left**).

    * **`border` (The "Frame"):**
        * Requires three properties to be visible:
            1.  `border-width:` (e.g., `1px`)
            2.  `border-style:` (e.g., `solid`, `dotted`, `dashed`)
            3.  `border-color:` (e.g., `#ddd`)
        * **Shorthand (Best Practice):** You almost always write it in one line:
            * `border: 1px solid #ddd;`

    * **`margin` (The "Outside" Space):**
        * Creates space *outside* the border. It pushes other elements away.
        * **Shorthand:** Works exactly the same as `padding`.
            * `margin: 20px;` (20px on all four sides).

* **In-Depth Example (Your Real Project Card):**
    * **`index.html` (already has these classes from Week 1):**
        ```html
        <article class="project-card">
          <img src="assets/weather-app.png" alt="Screenshot of the weather app">
          <h3 class="project-title">Weather App</h3>
          <p class="project-description">A React Native app that fetches live weather data.</p>
        </article>
        ```
    * **`style.css`:**
        ```css
        .project-card {
          /* 20px of space INSIDE the border, around your content */
          padding: 20px;

          /* A subtle 1px frame */
          border: 1px solid #ddd;

          /* 24px of space OUTSIDE, pushing the next card away */
          margin-bottom: 24px;
        }
        ```

---

### 3. Controlling Dimensions (`width`, `height`, `max-width`)

* **Lecture & Concepts:**
    * By default, `width` and `height` properties control the size of the **content area only**.
    * `width: 350px;` (The content box is 350px wide).
    * **`max-width` (Crucial for Responsive Design):**
        * This is *much* more useful than `width` for responsive layouts.
        * `max-width: 800px;` means "Be as wide as your content needs, *until* you hit 800px. Then, stop growing."
        * **The Fluid Image Trick:** To make your project screenshots scale down on mobile but never distort:
            * `img { max-width: 100%; height: auto; }`
        * **The Problem the Fluid Image Trick Doesn't Solve:** With `height: auto`, the image's height is unknown *until it finishes downloading*. On a slow connection, everything below it — the project title, the description — visibly jumps down the moment the image pops in. This is called **layout shift**, and it's a real, measurable metric (Cumulative Layout Shift) that search engines and users both notice.
        * **`aspect-ratio` (The Fix):** Tells the browser the image's width-to-height ratio *before* it downloads, so it can reserve the correct space immediately — no jump, no shift.
            * `img { aspect-ratio: 16 / 9; }` (or whatever ratio your actual screenshots are).

* **In-Depth Example (Sizing Your Project Card):**
    ```css
    .project-card {
      /* A sensible fixed width for now — you'll make this responsive in Week 5 */
      width: 350px;
      padding: 20px;
      border: 1px solid #ddd;
      margin-bottom: 24px;
    }

    /* THE FLUID IMAGE TRICK — apply this to every image on your site */
    img {
      max-width: 100%;
      height: auto;
      aspect-ratio: 16 / 9; /* reserves the space before the image even loads */
      object-fit: cover;    /* crops instead of distorting if the real image doesn't match 16:9 */
    }
    ```

---

### 4. `box-sizing: border-box` (The Modern "Must-Know")

* **Lecture & Concepts:**
    * **The Problem (Default: `content-box`):**
        * If you write:
            ```css
            .project-card {
              width: 350px;
              padding: 20px;
              border: 1px solid #ddd;
            }
            ```
        * What's the *actual* on-screen width? It's **392px**! (350px `width` + 20px padding-left + 20px padding-right + 1px border-left + 1px border-right). This makes layout math a nightmare.
    * **The Solution (Modern: `border-box`):**
        * `box-sizing: border-box;` tells the browser: "If I say `width: 350px;`, I want the *total width, including padding and border*, to be 350px. You do the math for me."
    * **Best Practice:** Apply this rule to *every* element on the page with this universal "reset" — add it to the very top of your stylesheet:
        ```css
        html {
          box-sizing: border-box;
        }
        *, *::before, *::after {
          box-sizing: inherit;
        }
        ```

---

### 5. The `display` Property (Block vs. Inline)

* **Lecture & Concepts:** This property controls *how* a box behaves in the page flow.

    * **`display: block;` (The "Brick")**
        * **Behavior:** Starts on a new line. Takes up the full available width by default.
        * **Examples on your portfolio:** `<h1>`, `<p>`, `<article>` (your `.project-card`), `<section>`, `<footer>`

    * **`display: inline;` (The "Word")**
        * **Behavior:** Flows with text, does *not* start on a new line. Is only as wide as its content. **Ignores `width`/`height`**.
        * **Examples on your portfolio:** your nav `<a>` links, `<span>`, `<strong>`, `<em>`

    * **`display: inline-block;` (The "Best of Both")**
        * **Behavior:** Flows with other elements like a "word" (inline), but respects `width`, `height`, `margin`, and `padding` like a "brick" (block).
        * **Use Case:** A good fit for a tag/pill (e.g., "React Native") if you want to list technologies used per project — a topic we'll return to in Week 3.

* **⭐️ Class Exercise: Inspect Your Own Boxes**
    1.  Open `index.html` in the browser and right-click → Inspect on your `.project-card`.
    2.  In the "Computed" or "Box Model" tab, note the current padding/border/margin (probably all `0` right now).
    3.  Apply the box model rules below, then re-inspect and confirm the numbers changed.

---

### Week 2: Comprehensive Assignment

**Objective:** Give your Featured Work project cards real shape using the Box Model.

**Files to Use:**
1.  `index.html` (from HTML course + Week 1 classes)
2.  `style.css` (from Week 1)

**Requirements:**

1.  **Modern Reset:** Add the universal `box-sizing: border-box` reset to the top of your stylesheet.
2.  **Card Shape:** Style `.project-card` with `padding`, `border`, `border-radius`, and `margin-bottom` (to space cards apart).
3.  **Sizing:** Give `.project-card` a sensible `width`, and apply the fluid image trick (`max-width: 100%; height: auto;`) plus `aspect-ratio` to every image site-wide, so nothing jumps around as images load.
4.  **Display Check:** Confirm in dev tools that your `<article>` (block), nav `<a>` (inline), and any pill/tag you add (inline-block) all behave as expected.

**Bonus Challenge:** Add a `box-shadow` to `.project-card` (e.g., `box-shadow: 0 4px 8px rgba(0,0,0,0.1);`) to make it feel "lifted" off the page.
