# Week 1: CSS: The Fundamentals

Welcome to CSS! In the HTML course, you built a real, semantic, three-page portfolio (`index.html`, `about.html`, `contact.html`) — but right now it's still plain black-and-white text. This week, you write your first `style.css` file, link it to all three pages, and start giving your real content its first bit of color and personality.

## Module 1: Introduction to CSS (The "What" and "Why")

### 1. What is CSS?

* **Lecture & Concepts:**
    * CSS stands for **Cascading Style Sheets**.
    * Think of web development as building a person:
        * **HTML (HyperText Markup Language):** This is the **skeleton** and structure. You already built this — a head, a body, headings, paragraphs, images.
        * **CSS (Cascading Style Sheets):** This is the **skin, clothes, and appearance**. It's the presentation. It defines the `font-size`, `color`, `width`, `height`, `border`, and `position`. It makes the website look good.
        * **JavaScript (JS):** This is the **muscles and brain**. It's the behavior and interactivity — a later course.
    * Without CSS, the web would be a plain, black-and-white text document — which is exactly what your portfolio looks like right now. CSS separates the content (HTML) from the presentation (CSS), which makes websites incredibly flexible and easier to maintain.

* **In-Depth Example (Your Portfolio, Before vs. After):**
    * **`index.html` (The "Before" — what you have right now):**
        ```html
        <header>
          <h1 id="page-title">Alice Chen</h1>
          <nav>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </nav>
        </header>
        ```
    * **The "After" (with a little CSS):**
        ```css
        /* This CSS would make your portfolio look completely different */
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
        }
        #page-title {
          color: #336699;
          text-align: center;
        }
        ```

### 2. How to Add CSS to a Web Page

* **Lecture & Concepts:** There are three ways to add CSS, but only one is the modern best practice.

    1.  **External CSS (Best Practice):**
        * You write all your CSS in a separate file (e.g., `style.css`).
        * You link this file from the `<head>` of your HTML document.
        * **Pros:** Keeps HTML and CSS separate (Separation of Concerns). One `style.css` file can control your *entire* portfolio — all 3 pages at once. The browser can cache this file, making your site load faster.
        * **This is the method you should use 99% of the time — and the only method you'll use for your portfolio.**

    2.  **Internal CSS:**
        * You write your CSS rules inside a `<style>` tag directly in the `<head>` of your HTML document.
        * **Pros:** Useful for single-page demos or quick tests.
        * **Cons:** Mixes your styles with your structure. You'd have to repeat it on all 3 of your pages.

    3.  **Inline CSS:**
        * You write your CSS directly inside an HTML tag using the `style` attribute.
        * **Pros:** Quick for a single, tiny change.
        * **Cons:** Extremely difficult to maintain. It mixes content and presentation and has the highest *specificity* (which we'll learn about), making it hard to override. **Avoid this.**

* **In-Depth Example (Linking Your Real Stylesheet):**
    * Create a new file: `portfolio/style.css`.
    * In **all three** of your HTML files (`index.html`, `about.html`, `contact.html`), add this line inside `<head>`, right before the closing `</head>` tag:
        ```html
        <link rel="stylesheet" href="style.css">
        ```
    * One file. Three pages. Any rule you write in `style.css` now applies everywhere it matches.

### 3. Basic CSS Syntax

* **Lecture & Concepts:**
    * A CSS "rule" is the fundamental building block. It's made of two parts: a **Selector** and a **Declaration Block**.
    * `selector { property: value; }`
        * **Selector** (`body`): The "who." This targets the HTML element(s) you want to style.
        * **Declaration Block** (`{ ... }`): The "what." This contains one or more declarations.
        * **Declaration** (`color: #333;`): The style rule itself.
        * **Property** (`color`): The specific style attribute you want to change (e.g., `font-size`, `background-color`, `border`).
        * **Value** (`#333`): The setting you want to apply to that property.
    * You **must** end each declaration with a semi-colon (`;`). This is the most common beginner mistake!

* **In-Depth Example (Your First Real Rules):**
    ```css
    /* portfolio/style.css */

    /* This sets a base font and color for the ENTIRE site */
    body {
      font-family: Arial, sans-serif;
      color: #222;
    }

    /* This targets the h1 you already gave id="page-title" in HTML Week 1 */
    #page-title {
      font-size: 40px;
    }
    ```

* **⭐️ Class Exercise: Wire Up Your Stylesheet**
    1.  Create `portfolio/style.css`.
    2.  Link it from all 3 of your HTML pages.
    3.  Write a `body` rule setting a `font-family` and a `color`.
    4.  Add a code comment above it explaining what it does.

---

## Module 2: Selectors and The Cascade (The "How")

### 1. Basic Selectors (Type, Class, ID)

* **Lecture & Concepts:** Selectors are how you *target* HTML elements. You've actually already prepped your HTML for this — back in HTML Week 1, you added `id="page-title"` to your `<h1>` and `class="section-heading"` to your `<h2>`s, specifically so CSS could hook into them later. That "later" is now.
    1.  **Type Selector (or Element/Tag Selector):**
        * **What it is:** Targets *all* elements of a specific type.
        * **Syntax:** `p`, `h2`, `nav`, `li`
        * **When to use:** For broad, default styles (e.g., "I want *all* paragraphs on my site to have a `line-height` of 1.6").
    2.  **Class Selector:**
        * **What it is:** Targets all elements that have a specific `class="..."` attribute.
        * **Syntax:** `.section-heading`, `.bio`, `.project-card` (Note the **dot `.`** at the beginning).
        * **When to use:** **This is your most-used, most-important selector.** It's reusable — every `<h2 class="section-heading">` on every page gets styled by one rule.
    3.  **ID Selector:**
        * **What it is:** Targets *one single element* that has a specific `id="..."` attribute.
        * **Syntax:** `#page-title` (Note the **hash `#`** at the beginning).
        * **When to use:** For unique, one-per-page elements. An ID **must be unique** on the page — you can't have two.

* **In-Depth Example (Styling Your Real Portfolio):**
    * **`index.html` (already built, HTML Week 1-3):**
        ```html
        <h1 id="page-title">Alice Chen</h1>

        <h2 class="section-heading">About Me</h2>
        <p class="bio">I'm a junior developer learning to build real things.</p>

        <h2 class="section-heading">Featured Work</h2>
        ```
    * **`style.css`:**
        ```css
        /* --- TYPE Selectors (broad) --- */
        p {
          line-height: 1.6;
        }

        /* --- ID Selectors (unique) --- */
        #page-title {
          font-size: 2.5rem;
          color: #336699;
        }

        /* --- CLASS Selectors (reusable) --- */
        /* This ONE rule styles EVERY section heading: "About Me", "Featured Work", etc. */
        .section-heading {
          color: #336699;
          border-bottom: 2px solid #eee;
        }

        .bio {
          font-style: italic;
        }
        ```

### 2. Grouping & Chaining Selectors

* **Lecture & Concepts:**
    * **Grouping (DRY Principle):** "DRY" stands for "Don't Repeat Yourself." If `h1`, `h2`, and `h3` all need the same font, don't write it three times — group them with a comma (`,`).
    * **Chaining (Specificity):** Write selectors *without* a space to target elements that meet *multiple* conditions. `p.bio` targets a `<p>` that *also* has the class `bio` — more specific than either `p` or `.bio` alone.

* **In-Depth Example:**
    ```css
    /* GROUPING: one font for all headings */
    h1, h2, h3 {
      font-family: 'Georgia', serif;
      font-weight: bold;
    }

    /* CHAINING: only the <p> that is ALSO .bio */
    p.bio {
      font-size: 1.1rem;
    }
    ```

### 3. The Cascade & Specificity

* **Lecture & Concepts:**
    * This is the most important concept in CSS. "Cascading" means styles can come from multiple places. The browser needs a "tie-breaker" system to decide which rule wins. This system is **Specificity**.
    * **The Cascade (Rule 1):** If two rules have the *exact same* specificity, the one that comes **last** in the stylesheet wins.
    * **Specificity (Rule 2):** If rules conflict, the *most specific* selector wins, regardless of order.
    * **The Specificity Hierarchy (Simplified):**
        1.  **Inline Style** (`style="..."`): Almost always wins.
        2.  **ID Selector** (`#page-title`): Beats all classes and types.
        3.  **Class Selector** (`.project-title`): Beats all types.
        4.  **Type Selector** (`h3`): The weakest.
    * **`!important` (The Nuclear Option):**
        * `color: red !important;` wins no matter what.
        * **This is a very bad practice.** It breaks the cascade and leads to messy, unmaintainable code. Avoid it 99.9% of the time.

* **In-Depth Example (Adding Real Classes to Your Featured Work):**
    * Your Featured Work `<article>`s (from HTML Week 3) don't have any classes yet — just semantic tags. Add them now:
    * **`index.html`:**
        ```html
        <section>
          <h2 class="section-heading">Featured Work</h2>

          <article class="project-card">
            <h3 class="project-title">Weather App</h3>
            <img src="assets/weather-app.png" alt="Screenshot of the weather app">
            <p class="project-description">A React Native app that fetches live weather data.</p>
          </article>
        </section>
        ```
    * **`style.css` (a specificity war):**
        ```css
        /* Rule 1: Type Selector (weak) */
        h3 {
          color: black;
        }

        /* Rule 2: Class Selector (stronger — WINS over Rule 1) */
        .project-title {
          color: #336699;
        }

        /* Rule 3: Chained Selector (stronger still — WINS over Rule 2) */
        h3.project-title {
          color: #003366;
        }
        ```

* **⭐️ Class Exercise: Bring Your Featured Work to Life**
    1.  In `index.html`, add `class="project-card"` to every project `<article>`, `class="project-title"` to every project `<h3>`, and `class="project-description"` to every project `<p>`.
    2.  In `style.css`, write a `.project-title` rule that changes its `color`.
    3.  Add a *more specific* `h3.project-title` rule below it with a *different* `color`. Confirm the more specific rule wins.
    4.  Delete the more specific rule once you've confirmed it — you don't need it permanently.

### 4. Inheritance

* **Lecture & Concepts:**
    * Some CSS properties are *inherited* by child elements (descendants).
    * **Inherited properties:** `font-family`, `font-size`, `color`, `line-height`, `text-align`. (Mostly text-related.)
    * **NON-Inherited properties:** `border`, `padding`, `margin`, `width`, `background-color`. (Mostly box-related — you'll meet these next week.)
    * This is why setting `font-family` and `color` once on `<body>` styles every paragraph, heading, and list item on all 3 of your pages.

* **In-Depth Example:**
    ```css
    body {
      /* INHERITED by every element on all 3 pages */
      font-family: 'Georgia', serif;
      color: #333;
    }

    .project-card {
      /* NOT inherited by the h3/p/img inside it */
      border: 2px solid #ddd;
      padding: 20px;
    }
    ```

---

### Week 1: Comprehensive Assignment

**Objective:** Wire up your portfolio's stylesheet and apply your first real selectors.

**Files to Use:**
1.  `index.html`, `about.html`, `contact.html` (from the HTML course)
2.  `portfolio/style.css` (new)

**Requirements:**

1.  **Linking:** Create `style.css` and link it from all 3 HTML pages with `<link rel="stylesheet">`.
2.  **Base Styles:** Style `body` with a `font-family` and `color` that all 3 pages inherit.
3.  **ID Selector:** Style your `#page-title` uniquely (size, color).
4.  **Class Selector:** Style `.section-heading` once and confirm it applies to every section heading on `index.html`.
5.  **New Classes:** Add `project-card`, `project-title`, and `project-description` classes to your real Featured Work articles, and give each a rule in your stylesheet.
6.  **Comments:** Label each section of your stylesheet with a comment (e.g., `/* Base Styles */`, `/* Featured Work */`).

**Bonus Challenge:** Add a `!important` rule somewhere, observe it winning against a more specific selector, then remove it and write a comment explaining why you removed it.
