# Week 2: The Core Concept: The Box Model

## Module 3: The Box Model & Dimensions

This module is the most important foundation in all of CSS. Every single element on your page is a rectangular box. How you control that box is the key to layout.

### 1. Visualizing the Box Model

* **Lecture & Concepts:**
    * Every HTML element—a paragraph, a heading, a button, an image—is treated by the browser as a rectangular box.
    * This box is made of four layers, stacked from the inside out.
    * **The best analogy is a picture frame:**
        * **Content:** The photo itself (your text, your image).
        * **Padding:** The matting *inside* the frame. It's the space between the photo and the frame.
        * **Border:** The frame itself.
        * **Margin:** The empty wall space *around* the frame. It's the space that pushes *other* picture frames away.



* **Developer Tools:** The #1 skill for a CSS developer is using the browser's "Inspect Element" tool.
    * **Practical:** Right-click on any element on a webpage and choose "Inspect."
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
            1.  `border-width:` (e.g., `2px`)
            2.  `border-style:` (e.g., `solid`, `dotted`, `dashed`)
            3.  `border-color:` (e.g., `black`)
        * **Shorthand (Best Practice):** You almost always write it in one line:
            * `border: 2px solid black;`

    * **`margin` (The "Outside" Space):**
        * Creates space *outside* the border. It pushes other elements away.
        * **Shorthand:** Works exactly the same as `padding`.
            * `margin: 10px;` (10px on all four sides).
            * `margin: 10px 20px;` (10px top/bottom, 20px left/right).

* **In-Depth Example:**
    * **`index.html`:**
        ```html
        <div class="box box-1">I'm Box 1. I have padding.</div>
        <div class="box box-2">
          I'm Box 2. I have margin, border, and padding.
        </div>
        ```
    * **`style.css`:**
        ```css
        .box {
          background-color: #f0f0f0;
        }

        .box-1 {
          /* 20px of space INSIDE the border */
          padding: 20px;
        }

        .box-2 {
          /* These values add up */
          padding: 20px; /* 20px inside space */
          border: 5px solid red; /* 5px frame */
          margin: 30px; /* 30px outside space, pushing it away from Box 1 */
        }
        ```

---

### 3. Controlling Dimensions (`width`, `height`, `max-width`)

* **Lecture & Concepts:**
    * By default, `width` and `height` properties control the size of the **content area only**.
    * `width: 200px;` (The content box is 200px wide).
    * `width: 50%;` (The content box is 50% of its parent's width).
    * **`max-width` (Crucial for Responsive Design):**
        * This is *much* more useful than `width` for responsive layouts.
        * `max-width: 800px;` means "Be as wide as your content needs, *until* you hit 800px. Then, stop growing."
        * **The Fluid Image Trick:** To make an image scale down on mobile but never get bigger than its original size, you use:
            * `img { max-width: 100%; height: auto; }`
    * **Centering a Box:** The classic `margin: 0 auto;` trick.
        * To center a block-level element, you *must* give it a `width` and set its left/right margin to `auto`.
        * `div { width: 80%; margin: 0 auto; }`

---

### 4. `box-sizing: border-box` (The Modern "Must-Know")

* **Lecture & Concepts:**
    * **The Problem (Default: `content-box`):**
        * If you write:
            ```css
            .my-box {
              width: 200px;
              padding: 20px;
              border: 5px solid black;
            }
            ```
        * What's the *actual* on-screen width?
        * It's **250px**! (200px `width` + 20px `padding-left` + 20px `padding-right` + 5px `border-left` + 5px `border-right`).
        * This makes layout math a nightmare.

    * **The Solution (Modern: `border-box`):**
        * `box-sizing: border-box;` tells the browser: "If I say `width: 200px;`, I want the *total width, including padding and border*, to be 200px. You do the math for me."
        * **In-Depth Example:**

            ```css
            .my-box {
              width: 200px;
              padding: 20px;
              border: 5px solid black;
              box-sizing: border-box; /* The magic property */
            }
            ```
        * Now the *actual* on-screen width is **exactly 200px**. The browser automatically makes the content area smaller (`150px`) to fit the padding and border.

    * **Best Practice:** Most developers apply this rule to *every* element on the page with this universal "reset":
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
        * **Box Model:** Respects `width`, `height`, `margin`, and `padding`.
        * **Examples:** `<h1>`, `<p>`, `<div>`, `<li>`, `<section>`, `<footer>`

    * **`display: inline;` (The "Word")**
        * **Behavior:** Flows with text, does *not* start on a new line. Is only as wide as its content.
        * **Box Model:** **Ignores `width` and `height`**. Only respects horizontal `margin` and `padding` (left/right).
        * **Examples:** `<a>`, `<span>`, `<strong>`, `<em>`

    * **`display: inline-block;` (The "Best of Both")**
        * **Behavior:** Flows with other elements like a "word" (inline).
        * **Box Model:** Respects `width`, `height`, `margin`, and `padding` like a "brick" (block).
        * **Use Case:** Perfect for creating a row of navigation buttons or small cards that need to sit side-by-side but also have a defined size.

---

### Week 2: Comprehensive Assignment

**Objective:** Build a "Recipe Card" using all the Box Model concepts.

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
  <title>Week 2 Assignment</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="recipe-card">
    <img src="[https://via.placeholder.com/400x200.png?text=Yummy+Food](https://via.placeholder.com/400x200.png?text=Yummy+Food)" alt="A photo of the recipe">
    <div class="card-content">
      <h2>Classic Tomato Pasta</h2>
      <p>A simple but delicious pasta recipe that anyone can make in under 30 minutes. Perfect for a weeknight dinner.</p>
    </div>
  </div>

</body>
</html>
```

#### Part 2: The CSS (`style.css`)
``` css
/*
  STEP 1: The "Modern Reset"
  Apply border-box to everything.
*/
html {
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}

/*
  STEP 2: Style the body for good measure.
  This just gives us a nice background.
*/
body {
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
}

/*
  STEP 3: The Card Container (.recipe-card)
  This is the main Box Model work.
*/
.recipe-card {
  /* SIZING: Give it a fixed width, but let it be centered. */
  width: 350px;

  /* CENTERING: Use 'margin: 0 auto' to center a block element */
  margin: 40px auto;

  /* BORDER: Give it a subtle frame */
  border: 1px solid #ddd;

  /* BONUS: Add rounded corners and a shadow to "lift" it */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);

  /* This prevents the image from "leaking" out of the rounded corners */
  overflow: hidden;
}

/*
  STEP 4: The Image
  Use the "fluid image trick"
*/
.recipe-card img {
  /* Make the image responsive and fill its container */
  max-width: 100%;
  height: auto;

  /* This is a 'block' element trick.
    It removes a tiny gap that sometimes appears under images.
  */
  display: block;
}

/*
  STEP 5: The Card Content
  Use PADDING to create the "inside" space.
*/
.card-content {
  /* This is the "matting" inside the frame.
    It pushes the text away from the edges of the card.
  */
  padding: 20px;
}

/*
  STEP 6: Content Typography
  Just some basic styles for the text.
*/
.card-content h2 {
  margin-top: 0; /* Remove the default top margin from h2 */
  margin-bottom: 10px;
}

.card-content p {
  margin-bottom: 0; /* Remove the default bottom margin from p */
}
```
