# Week 3: Styling Content

This week, we move from the "boxes" (Box Model) to the "paint and wallpaper." You'll learn how to control all the visual details that make a site beautiful, starting with typography and then moving to colors and backgrounds.

## Module 4: Styling Text and Fonts

### 1. Basic Font Properties

* **Lecture & Concepts:**
    * **`color`**: Sets the color of the text.
    * **`font-family`**: This is your "font stack." The browser reads it from left to right. It will use the *first* font it finds on the user's computer. The last item is *always* a generic fallback (`serif` or `sans-serif`).
        * **Serif:** Fonts with small decorative strokes (e.g., Times New Roman, Georgia).
        * **Sans-Serif:** Fonts without strokes (e.g., Arial, Helvetica, Roboto). Generally cleaner for screens.

    * **`font-weight`**: Controls the "boldness" (`normal`, `bold`, or numbers like `100`, `400`, `700`, `900`).
    * **`font-style`**: `normal` or `italic`.

* **In-Depth Example:**
    ```css
    body {
      /* This is a "font stack". The browser will try:
        1. 'Roboto' (a web font we'll load)
        2. 'Arial' (very common on Windows/Mac)
        3. 'Helvetica' (common on Mac)
        4. 'sans-serif' (ANY sans-serif font available)
      */
      font-family: 'Roboto', Arial, Helvetica, sans-serif;
    }

    h1 {
      /* A different font stack for headings */
      font-family: 'Merriweather', 'Georgia', serif;
      font-weight: 700; /* 'bold' */
    }

    .callout {
      font-style: italic;
      color: #555; /* A dark gray */
    }
    ```

---

### 2. Sizing Your Text (px vs. em vs. rem)

* **Lecture & Concepts:** This is one of the most important modern CSS concepts for accessibility and scalability.
    * **`px` (Pixels):** An **absolute** unit. `font-size: 16px;` is *always* 16 pixels. This is bad for accessibility because it ignores the user's browser-level font size settings.
    * **`em` (Em):** A **relative** unit. `1em` is equal to the `font-size` of the **parent element**. This is powerful but can be confusing, as it "compounds." If a `div` has `2em` and a `p` inside it has `2em`, the `p` will be `4em`!
    * **`rem` (Root Em):** **The Modern Best Practice.** A **relative** unit. `1rem` is *always* equal to the `font-size` of the **`<html>` (root) element**.
        * The browser default `font-size` for `<html>` is `16px`.
        * Therefore, by default: `1rem = 16px`, `2rem = 32px`, `0.8rem = 12.8px`.
        * **Why is this best?** It's not confusing like `em`, and if a user changes their browser's default font size (e.g., to 24px for readability), `1rem` becomes `24px` and your *entire site scales up perfectly.*

* **In-Depth Example:**
    ```css
    /* Set the 1rem baseline (optional, but good practice) */
    html {
      font-size: 16px;
    }

    body {
      font-size: 1rem; /* 1 * 16px = 16px */
    }

    p {
      font-size: 1rem; /* 1 * 16px = 16px */
    }

    h1 {
      font-size: 2.5rem; /* 2.5 * 16px = 40px */
    }

    .small-text {
      font-size: 0.875rem; /* 0.875 * 16px = 14px */
    }
    ```

---

### 3. Text Formatting for Readability

* **Lecture & Concepts:**
    * **`text-align`**: `left`, `right`, `center`, or `justify`.
    * **`text-decoration`**: `underline`, `line-through`, `overline`, or `none`.
        * **Most common use:** Removing the default underline from links: `a { text-decoration: none; }`
    * **`line-height`**: This is the most critical property for readability. It controls the space *between* lines of text.
        * **Best Practice:** Use a **unitless** value. This means it's a *multiplier* of the element's `font-size`.
        * `p { line-height: 1.6; }` (This means the line height is 1.6 times the `font-size`, whatever it may be).
    * **`letter-spacing`**: Adds space *between* letters. Often used for headings.
    * **`word-spacing`**: Adds space *between* words.

* **In-Depth Example:**
    ```css
    body {
      line-height: 1.6; /* Sets a great, readable default for all text */
    }

    h1 {
      text-align: center;
      letter-spacing: 1px;
    }

    a {
      text-decoration: none;
      color: #0066cc;
    }

    /* Add the underline back on hover for usability */
    a:hover {
      text-decoration: underline;
    }
    ```

---

### 4. Using Web Fonts (Google Fonts)

* **Lecture & Concepts:** You don't have to rely on the user's built-in fonts. You can load custom fonts from the web. The easiest way is with Google Fonts.

* **The 3-Step Process:**
    1.  **Find:** Go to `fonts.google.com`. Find a font you like (e.g., "Roboto" or "Lato").
    2.  **Select & Link:** Select the styles you want (e.g., 400 Regular and 700 Bold). Google will give you a `<link>` tag.
        ```html
        <link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)">
        <link rel="preconnect" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" crossorigin>
        <link href="[https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:wght@700&display=swap](https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:wght@700&display=swap)" rel="stylesheet">
        ```
    3.  **Use:** Google will also give you the CSS `font-family` rule to use in your stylesheet.
        ```css
        /* Now you can use these in your font stack */
        body {
          font-family: 'Lato', sans-serif;
        }
        h1, h2 {
          font-family: 'Merriweather', serif;
        }
        ```

---

## Module 5: Colors and Backgrounds

### 1. How to Define Color

* **Lecture & Concepts:** There are several ways to tell the browser what color you want.
    * **Keywords:** `red`, `blue`, `tomato`. Good for testing, but too limited for real design.
    * **HEX (Hexadecimal):** The most common. A `#` followed by 6 characters (RRGGBB).
        * `#FF0000` (Pure Red)
        * `#00FF00` (Pure Green)
        * `#0000FF` (Pure Blue)
        * `#FFFFFF` (White), `#000000` (Black), `#333333` (Dark Gray)
        * Shorthand: `#F00` is the same as `#FF0000`.
    * **RGB (Red, Green, Blue):** Uses numbers from 0-255.
        * `rgb(255, 0, 0)` (Pure Red)
        * `rgb(51, 51, 51)` (Dark Gray)
    * **RGBA (Red, Green, Blue, Alpha):** **The most powerful.** Same as RGB, but adds an "Alpha" (transparency) channel from `0` (fully transparent) to `1` (fully opaque).
        * `rgba(255, 0, 0, 0.5)` (A 50% transparent red)
        * This is perfect for creating overlays without making the *text* inside an element transparent.

* **In-Depth Example (RGBA Overlay):**

    ```css
    .hero-banner {
      /* ... (background image set here) ... */
    }

    .hero-overlay {
      /* This is a 'div' inside the hero-banner.
        It creates a "tinted glass" effect over the image,
        making the white text on top much easier to read.
      */
      background-color: rgba(0, 0, 0, 0.6); /* 60% transparent black */
    }
    ```

---

### 2. Styling Backgrounds

* **Lecture & Concepts:** These properties control the background of any box.
    * `background-color`: Sets a solid color.
    * `background-image`: Sets an image. `url('path/to/your/image.jpg')`
    * `background-repeat`: `repeat` (default), `repeat-x`, `repeat-y`, or `no-repeat`.
    * `background-position`: Where to align the image. `center`, `top left`, `50% 50%`, etc.

* **In-Depth Example (Full-Page Background):**
    ```css
    body {
      background-color: #f4f4f4; /* A fallback color */
      background-image: url('images/subtle-pattern.png');
      background-repeat: repeat; /* Tile the pattern */
    }
    ```

---

### 3. In-Depth: The `background-size` Property

* **Lecture & Concepts:** This is a modern, essential property for handling images.
    * `background-size: cover;`
        * **"Fill the box."** The image scales up or down to fill the *entire* container.
        * It will *not* stretch or warp.
        * Some parts of the image may be **cropped** off if the aspect ratio doesn't match.
        * **Use Case:** Hero banners, image-heavy sections.
    * `background-size: contain;`
        * **"Fit the image."** The image scales down until it fits *entirely* inside the container.
        * It will *not* be cropped.
        * There may be **empty space** (letterboxing) if the aspect ratio doesn'Ect match.
        * **Use Case:** Logos, icons, detailed photos you can't crop.


* **In-Depth Example (Hero Banner):**
    ```css
    .hero-banner {
      width: 100%;
      height: 400px;
      background-image: url('images/mountains.jpg');

      /* The 3 essential properties for a modern hero image: */
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
    ```

---

### 4. Bonus Trick: The Parallax Effect

* **Lecture & Concepts:** A simple trick to create a sense of depth.
    * `background-attachment: fixed;`
    * This tells the browser to "fix" the background image relative to the *viewport* (the browser window), not the element. As you scroll, the content moves *over* the "fixed" image.

* **In-Depth Example:**
    ```css
    .parallax-section {
      width: 100%;
      height: 500px;
      background-image: url('images/large-photo.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      /* This is the magic line: */
      background-attachment: fixed;
    }
    ```

---

### Week 3: Comprehensive Assignment (Enhancement)

**Objective:** Enhance your "Recipe Card" from Week 2 using all the new typography and color/background properties.

**Files to Use:**
1.  `index.html` (from Week 2)
2.  `style.css` (from Week 2)

#### Part 1: The HTML (`index.html`)

You need to add two things:
1.  The `<link>` tags for **Google Fonts** in the `<head>`.
2.  A `<span>` for the **badge** inside the `<h2>`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Week 3 Assignment</title>

  <link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)">
  <link rel="preconnect" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" crossorigin>
  <link href="[https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:wght@700&display=swap](https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:wght@700&display=swap)" rel="stylesheet">

  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="recipe-card">
    <img src="[https://via.placeholder.com/400x200.png?text=Yummy+Food](https://via.placeholder.com/400x200.png?text=Yummy+Food)" alt="A photo of the recipe">
    <div class="card-content">
      <h2>
        Classic Tomato Pasta
        <span class="badge">New!</span>
      </h2>
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
  (No change from Week 2)
*/
html {
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}

/*
  STEP 2: Style the body
  (UPDATED for Week 3)
*/
body {
  /* NEW: Use a HEX code for a subtle background */
  background-color: #f0f2f5;

  /* NEW: Set our default 'Lato' font from Google Fonts */
  font-family: 'Lato', sans-serif;

  /* NEW: Set a readable baseline line-height */
  line-height: 1.6;
}

/*
  STEP 3: The Card Container
  (UPDATED for Week 3)
*/
.recipe-card {
  width: 350px;
  margin: 40px auto;

  /* NEW: Use a HEX code for white */
  background-color: #ffffff;

  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* RGBA in action! */
  overflow: hidden;
}

/*
  STEP 4: The Image
  (No change from Week 2)
*/
.recipe-card img {
  max-width: 100%;
  height: auto;
  display: block;
}

/*
  STEP 5: The Card Content
  (No change from Week 2)
*/
.card-content {
  padding: 20px;
}

/*
  STEP 6: Content Typography
  (UPDATED for Week 3)
*/
.card-content h2 {
  margin-top: 0;
  margin-bottom: 10px;

  /* NEW: Use our 'Merriweather' heading font */
  font-family: 'Merriweather', serif;
  font-weight: 700;

  /* NEW: Use a HEX code for a dark, but not black, color */
  color: #333;
}

.card-content p {
  margin-bottom: 0;

  /* NEW: Use rem units for the font size */
  font-size: 0.95rem; /* 0.95 * 16px = 15.2px */

  /* NEW: Use a HEX code for a lighter gray text color */
  color: #555;
}

/*
  STEP 7: The Badge
  (NEW for Week 3)
*/
.badge {
  display: inline-block; /* Allows us to set padding & margin */

  /* NEW: Use RGB for the background */
  background-color: rgb(40, 167, 69); /* A nice green */
  color: #ffffff; /* White text */

  padding: 4px 8px; /* Box Model! */
  margin-left: 10px; /* Box Model! */
  border-radius: 4px; /* Box Model! */

  /* NEW: Typography for the badge */
  font-family: 'Lato', sans-serif; /* Match the body text */
  font-size: 0.75rem; /* 12px */
  font-weight: 700;
  line-height: 1; /* Reset line-height for the small badge */
  vertical-align: middle; /* Aligns it nicely with the h2 text */
}
```
