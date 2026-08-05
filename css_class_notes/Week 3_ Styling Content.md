# Week 3: Styling Content

This week, we move from the "boxes" (Box Model) to the "paint and wallpaper." You'll learn how to control all the visual details that make your portfolio beautiful, starting with typography and then moving to colors and backgrounds.

## Module 4: Styling Text and Fonts

### 1. Basic Font Properties

* **Lecture & Concepts:**
    * **`color`**: Sets the color of the text.
    * **`font-family`**: This is your "font stack." The browser reads it from left to right. It will use the *first* font it finds on the user's computer. The last item is *always* a generic fallback (`serif` or `sans-serif`).
        * **Serif:** Fonts with small decorative strokes (e.g., Times New Roman, Georgia).
        * **Sans-Serif:** Fonts without strokes (e.g., Arial, Helvetica, Roboto). Generally cleaner for screens.
    * **`font-weight`**: Controls the "boldness" (`normal`, `bold`, or numbers like `400`, `700`, `900`).
    * **`font-style`**: `normal` or `italic`.

* **In-Depth Example (Your Portfolio's Font Stack):**
    ```css
    body {
      /* Body text uses a clean sans-serif */
      font-family: 'Lato', Arial, Helvetica, sans-serif;
    }

    #page-title,
    .section-heading,
    .project-title {
      /* Headings use a different, more distinctive stack */
      font-family: 'Merriweather', 'Georgia', serif;
      font-weight: 700;
    }

    .bio {
      font-style: italic;
      color: #555;
    }
    ```

---

### 2. Sizing Your Text (px vs. em vs. rem)

* **Lecture & Concepts:** This is one of the most important modern CSS concepts for accessibility and scalability.
    * **`px` (Pixels):** An **absolute** unit. `font-size: 16px;` is *always* 16 pixels. Bad for accessibility because it ignores the user's browser-level font size settings.
    * **`em` (Em):** A **relative** unit. `1em` equals the `font-size` of the **parent element**. Powerful but confusing, since it "compounds."
    * **`rem` (Root Em):** **The Modern Best Practice.** `1rem` is *always* equal to the `font-size` of the **`<html>` (root) element**.
        * By default: `1rem = 16px`, `2rem = 32px`, `0.8rem = 12.8px`.
        * If a user changes their browser's default font size for readability, your *entire portfolio scales up perfectly*.

* **In-Depth Example (A `rem`-Based Type Scale for Your Portfolio):**
    ```css
    html {
      font-size: 16px; /* the 1rem baseline */
    }

    body {
      font-size: 1rem; /* 16px */
    }

    #page-title {
      font-size: 2.5rem; /* 40px */
    }

    .section-heading {
      font-size: 1.75rem; /* 28px */
    }

    .project-title {
      font-size: 1.25rem; /* 20px */
    }
    ```

---

### 3. Text Formatting for Readability

* **Lecture & Concepts:**
    * **`text-align`**: `left`, `right`, `center`, or `justify`.
    * **`text-decoration`**: `underline`, `line-through`, `overline`, or `none`.
        * **Most common use:** Removing the default underline from your nav links: `nav a { text-decoration: none; }`
    * **`line-height`**: The most critical property for readability. Controls the space *between* lines.
        * **Best Practice:** Use a **unitless** value (a multiplier of `font-size`). `p { line-height: 1.6; }`
    * **`letter-spacing`**: Adds space *between* letters. Often used for headings.

* **In-Depth Example (Your Nav Links and Bio):**
    ```css
    body {
      line-height: 1.6; /* A great, readable default for everything */
    }

    #page-title {
      text-align: center;
      letter-spacing: 1px;
    }

    nav a {
      text-decoration: none;
      color: #0066cc;
    }

    /* Bring the underline back on hover — good for usability */
    nav a:hover {
      text-decoration: underline;
    }

    .bio,
    .project-description {
      line-height: 1.7; /* Extra breathing room for longer text */
    }
    ```

---

### 4. Using Web Fonts (Google Fonts)

* **Lecture & Concepts:** You don't have to rely on the user's built-in fonts. You can load custom fonts from the web. The easiest way is with Google Fonts.

* **The 3-Step Process:**
    1.  **Find:** Go to `fonts.google.com`. Pick a heading font (e.g., "Merriweather") and a body font (e.g., "Lato").
    2.  **Select & Link:** Select the weights you need (e.g., 400 and 700). Add the `<link>` tags to the `<head>` of **all 3 of your HTML pages** — `index.html`, `about.html`, and `contact.html` all need this, since they share one look.
        ```html
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:wght@700&display=swap" rel="stylesheet">
        ```
    3.  **Use:** Reference the font names in your `font-family` stacks, exactly as in the Module 4.1 example above.

* **⭐️ Class Exercise: Load Your Fonts**
    1.  Choose one heading font and one body font from Google Fonts.
    2.  Add the `<link>` tags to all 3 HTML pages.
    3.  Update `body` and your heading selectors (`#page-title`, `.section-heading`, `.project-title`) to use them.

---

## Module 5: Colors and Backgrounds

### 1. How to Define Color

* **Lecture & Concepts:** There are several ways to tell the browser what color you want.
    * **Keywords:** `red`, `blue`, `tomato`. Good for testing, too limited for real design.
    * **HEX (Hexadecimal):** The most common. A `#` followed by 6 characters (RRGGBB). `#336699`, `#ffffff`, `#333333`.
    * **RGB (Red, Green, Blue):** Uses numbers from 0-255. `rgb(51, 102, 153)`.
    * **RGBA (Red, Green, Blue, Alpha):** **The most powerful.** Adds a transparency channel from `0` to `1`. `rgba(0, 0, 0, 0.6)` is a 60% transparent black — perfect for text-readability overlays.

* **In-Depth Example (An Overlay Behind Your Name):**
    ```css
    header {
      position: relative; /* we'll build on this in Week 4 */
    }

    #page-title {
      background-color: rgba(0, 0, 0, 0.05); /* a very subtle tint */
      padding: 8px 16px;
    }
    ```

---

### 2. Styling Backgrounds

* **Lecture & Concepts:** These properties control the background of any box.
    * `background-color`: Sets a solid color.
    * `background-image`: Sets an image. `url('path/to/image.jpg')`
    * `background-repeat`: `repeat` (default), `repeat-x`, `repeat-y`, or `no-repeat`.
    * `background-position`: Where to align the image. `center`, `top left`, etc.

* **In-Depth Example (Full-Page Background):**
    ```css
    body {
      background-color: #f8f9fa; /* a soft, neutral page background */
    }
    ```

---

### 3. In-Depth: The `background-size` Property

* **Lecture & Concepts:** This is a modern, essential property for handling images.
    * `background-size: cover;` — **"Fill the box."** Scales to fill the *entire* container; may crop.
    * `background-size: contain;` — **"Fit the image."** Scales to fit *entirely* inside; may letterbox.

* **In-Depth Example (A Subtle Header Background):**
    ```css
    header {
      background-color: #f0f2f5;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
    ```

* **⭐️ Class Exercise: Add a "Featured" Badge**
    1.  In `index.html`, wrap one project's title text with a badge, right inside its `.project-title`:
        ```html
        <h3 class="project-title">
          Weather App
          <span class="badge">Featured</span>
        </h3>
        ```
    2.  In `style.css`, style `.badge` with `display: inline-block`, a `background-color`, white `color`, `padding`, and `border-radius`.
    3.  Use a HEX or RGB color you haven't used elsewhere on the site.

---

### Week 3: Comprehensive Assignment

**Objective:** Apply real typography and color to your portfolio.

**Files to Use:**
1.  `index.html`, `about.html`, `contact.html`
2.  `style.css`

**Requirements:**

1.  **Google Fonts:** Load one heading font and one body font, linked on all 3 pages.
2.  **Type Scale:** Set a `rem`-based `font-size` for `#page-title`, `.section-heading`, and `.project-title`.
3.  **Readability:** Set a `line-height` of at least `1.6` on body text, and remove the default underline from nav links (adding it back on `:hover`).
4.  **Color System:** Convert every color in your stylesheet to HEX or RGB(A) — no color keywords.
5.  **Featured Badge:** Add a `<span class="badge">Featured</span>` to one project's title, styled with `background-color`, `color`, `padding`, and `border-radius`.

**Bonus Challenge:** Add a subtle `rgba()` background tint behind your `#page-title` to make it stand out from the page background.
