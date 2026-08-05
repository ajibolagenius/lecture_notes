# Week 1: CSS: The Fundamentals

## Module 1: Introduction to CSS (The "What" and "Why")

### 1. What is CSS?

* **Lecture & Concepts:**
    * CSS stands for **Cascading Style Sheets**.
    * Think of web development as building a person:
        * **HTML (HyperText Markup Language):** This is the **skeleton** and structure. It defines the parts: a head (`<head>`), a body (`<body>`), headings (`<h1>`), paragraphs (`<p>`), images (`<img>`), etc.
        * **CSS (Cascading Style Sheets):** This is the **skin, clothes, and appearance**. It's the presentation. It defines the `font-size`, `color`, `width`, `height`, `border`, and `position`. It makes the website look good.
        * **JavaScript (JS):** This is the **muscles and brain**. It's the behavior and interactivity. It makes the website *do* things, like respond to a click, show a popup, or fetch data.
    * Without CSS, the web would be a plain, black-and-white text document. CSS separates the content (HTML) from the presentation (CSS), which makes websites incredibly flexible and easier to maintain.

* **In-Depth Example (Before vs. After):**
    * **`index.html` (The "Before"):**
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>My Page</title>
        </head>
        <body>
          <h1>Welcome to My Website</h1>
          <p>This is a paragraph of text. It's just plain HTML.</p>
          <button>Click Me</button>
        </body>
        </html>
        ```
    * **The "After" (with a little CSS):**

        ```css
        /* This CSS would make the page look completely different */
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
        }
        h1 {
          color: #336699;
          text-align: center;
        }
        p {
          font-size: 18px;
          line-height: 1.6;
        }
        button {
          background-color: #336699;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        ```

### 2. How to Add CSS to a Web Page

* **Lecture & Concepts:** There are three ways to add CSS, but only one is the modern best practice.

    1.  **External CSS (Best Practice):**
        * You write all your CSS in a separate file (e.g., `style.css`).
        * You link this file from the `<head>` of your HTML document.
        * **Pros:** Keeps HTML and CSS separate (Separation of Concerns). You can use the *same* `style.css` file for your *entire* website, making site-wide changes easy. The browser can cache this file, making your site load faster.
        * **This is the method you should use 99% of the time.**

    2.  **Internal CSS:**
        * You write your CSS rules inside a `<style>` tag directly in the `<head>` of your HTML document.
        * **Pros:** Useful for single-page demos or quick tests.
        * **Cons:** Mixes your styles with your structure. Can't be re-used on other pages.

    3.  **Inline CSS:**
        * You write your CSS directly inside an HTML tag using the `style` attribute.
        * **Pros:** Quick for a single, tiny change.
        * **Cons:** Extremely difficult to maintain. It mixes content and presentation and has the highest *specificity* (which we'll learn about), making it hard to override. **Avoid this.**

* **In-Depth Example (All 3 Methods):**
    * **`index.html`:**
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>How to Add CSS</title>

          <link rel="stylesheet" href="style.css">

          <style>
            p {
              color: green; /* This styles the paragraph */
            }
          </style>
        </head>
        <body>
          <h1>Styled by External CSS</h1>

          <p>Styled by Internal CSS</p>

          <button style="background-color: orange; color: white;">
            Styled by Inline CSS
          </button>
        </body>
        </html>
        ```
    * **`style.css` (The External File):**
        ```css
        /* This file is saved as 'style.css' */
        h1 {
          font-family: 'Georgia', serif;
          text-decoration: underline;
        }
        ```

### 3. Basic CSS Syntax

* **Lecture & Concepts:**
    * A CSS "rule" is the fundamental building block. It's made of two parts: a **Selector** and a **Declaration Block**.
    * `selector { property: value; }`
        * **Selector** (`h1`): The "who." This targets the HTML element(s) you want to style.
        * **Declaration Block** (`{ ... }`): The "what." This contains one or more declarations.
        * **Declaration** (`color: blue;`): The style rule itself.
        * **Property** (`color`): The specific style attribute you want to change (e.g., `font-size`, `background-color`, `border`).
        * **Value** (`blue`): The setting you want to apply to that property.
    * You **must** end each declaration with a semi-colon (`;`). This is the most common beginner mistake!

* **In-Depth Example:**
    * Let's break down a complex-looking rule:
        ```css
        /* This is a CSS comment.
          The browser ignores it. Use it for notes.
        */

        .nav-link {
          font-size: 16px;
          font-weight: bold;
          text-decoration: none;
          padding: 8px 12px;
        }
        ```
    * **Selector:** `.nav-link` (This is a "class" selector, which we'll learn next).
    * **Declarations (4 of them):**
        1.  `font-size: 16px;`
        2.  `font-weight: bold;`
        3.  `text-decoration: none;` (This removes the underline from links).
        4.  `padding: 8px 12px;`

---

## Module 2: Selectors and The Cascade (The "How")

### 1. Basic Selectors (Type, Class, ID)

* **Lecture & Concepts:** Selectors are how you *target* HTML elements.
    1.  **Type Selector (or Element/Tag Selector):**
        * **What it is:** Targets *all* elements of a specific type.
        * **Syntax:** `p`, `h2`, `div`, `li`
        * **When to use:** For broad, default styles. (e.g., "I want *all* paragraphs on my site to have a line-height of 1.5").
    2.  **Class Selector:**
        * **What it is:** Targets all elements that have a specific `class="..."` attribute.
        * **Syntax:** `.button`, `.highlight`, `.error-message` (Note the **dot `.`** at the beginning).
        * **When to use:** **This is your most-used, most-important selector.** It's reusable. You can have many elements with the same class (e.g., 10 buttons all with `class="button"`).
    3.  **ID Selector:**
        * **What it is:** Targets *one single element* that has a specific `id="..."` attribute.
        * **Syntax:** `#main-header`, `#footer`, `#contact-form` (Note the **hash `#`** at the beginning).
        * **When to use:** For unique, high-level layout components (e.g., the main header, the main content area, the footer). An ID **must be unique** on the page—you can't have two.

* **In-Depth Example:**
    * **`index.html`:**
        ```html
        <body id="home-page">
          <header id="main-header">
            <h1 class="site-title">My Awesome Blog</h1>
          </header>
          <div class="post">
            <h2 class="post-title">First Post!</h2>
            <p>This is my first post. I'm styling it with CSS.</p>
            <a href="#" class="button">Read More</a>
          </div>
          <div class="post">
            <h2 class="post-title">Second Post</h2>
            <p class="highlight">This post is important!</p>
            <a href="#" class="button">Read More</a>
          </div>
        </body>
        ```
    * **`style.css`:**
        ```css
        /* --- TYPE Selectors (broad) --- */
        p {
          font-family: 'Georgia', serif;
          line-height: 1.6;
        }

        /* --- ID Selectors (unique) --- */
        #main-header {
          background-color: #333;
          padding: 10px;
        }

        /* --- CLASS Selectors (reusable) --- */
        .site-title {
          color: white; /* Only affects the h1 with this class */
        }

        .post {
          border: 1px solid #ccc;
          margin-bottom: 20px;
        }

        .post-title {
          color: #336699;
        }

        .button {
          /* This styles BOTH 'Read More' links */
          background-color: #336699;
          color: white;
          padding: 5px 10px;
          text-decoration: none;
        }

        .highlight {
          background-color: yellow;
          font-weight: bold;
        }
        ```

### 2. Grouping & Chaining Selectors

* **Lecture & Concepts:**
    * **Grouping (DRY Principle):** "DRY" stands for "Don't Repeat Yourself." If you have the exact same style for `h1`, `h2`, and `h3`, don't write it three times. Use a comma (`,`) to group them.
    * **Chaining (Specificity):** Write selectors *without* a space to target elements that meet *multiple* conditions. `p.intro` targets a `<p>` element that *also* has the class `intro`. `h2.post-title` is more specific than just `.post-title`.

* **In-Depth Example:**
    * **`style.css`:**
        ```css
        /* --- BAD (Repetitive) --- */
        h1 {
          font-family: 'Arial', sans-serif;
          font-weight: bold;
        }
        h2 {
          font-family: 'Arial', sans-serif;
          font-weight: bold;
        }
        h3 {
          font-family: 'Arial', sans-serif;
          font-weight: bold;
        }

        /* --- GOOD (Grouping) --- */
        h1, h2, h3 {
          font-family: 'Arial', sans-serif;
          font-weight: bold;
        }

        /* --- Chaining Example --- */
        /* HTML: <p class="intro highlight">Hello</p> */

        p {
          font-size: 16px;
        }

        .highlight {
          background-color: yellow;
        }

        /* This ONLY targets <p> tags that ALSO have class="highlight" */
        /* It will NOT target a <div> with class="highlight" */
        p.highlight {
          font-weight: bold;
        }
        ```

### 3. The Cascade & Specificity

* **Lecture & Concepts:**
    * This is the most important concept in CSS. "Cascading" means styles can come from multiple places. The browser needs a "tie-breaker" system to decide which rule wins. This system is **Specificity**.
    * **The Cascade (Rule 1):** If two rules have the *exact same* specificity, the one that comes **last** in the stylesheet wins.
    * **Specificity (Rule 2):** If rules conflict, the *most specific* selector wins, regardless of its order.
    * **The Specificity Hierarchy (Simplified):**
        1.  **Inline Style** (e.g., `style="..."`): The most powerful. (Score: 1,0,0,0) - Almost always wins.
        2.  **ID Selector** (e.g., `#header`): Super specific. (Score: 0,1,0,0) - Beats all classes and types.
        3.  **Class Selector** (e.g., `.button`): Very specific. (Score: 0,0,1,0) - Beats all types.
        4.  **Type Selector** (e.g., `p`): Not specific at all. (Score: 0,0,0,1) - The weakest.

    * **`!important` (The Nuclear Option):**
        * You can add `!important` to any declaration to make it win, no matter what.
        * `color: red !important;`
        * **This is a very bad practice.** Beginners love it, but it breaks the entire cascade and leads to messy, unmaintainable code. Avoid it 99.9% of the time.

* **In-Depth Example (Specificity War):**
    * **`index.html`:**
        ```html
        <div id="main-content" class="container">
          <p class="intro-text">What color will I be?</p>
        </div>
        ```
    * **`style.css`:**
        ```css
        /* --- Specificity War --- */
        /* Go from top to bottom. Which one wins? */

        /* Rule 1: Type Selector (Specificity: 1) */
        p {
          color: black;
        }

        /* Rule 2: Class Selector (Specificity: 10) */
        /* .intro-text is more specific than p. It WINS. */
        .intro-text {
          color: blue;
        }

        /* Rule 3: Chained Selectors (Specificity: 1 + 10 = 11) */
        /* p.intro-text is more specific than .intro-text. It WINS. */
        p.intro-text {
          color: green;
        }

        /* Rule 4: ID + Type (Specificity: 100 + 1 = 101) */
        /* #main-content p is WAY more specific. It WINS. */
        #main-content p {
          color: red;
        }

        /* Rule 5: ID + Class (Specificity: 100 + 10 = 110) */
        /* #main-content .intro-text is even MORE specific. It WINS. */
        #main-content .intro-text {
          color: purple;
        }

        /* Rule 6: !important (Breaks all rules) */
        /* This rule is the LEAST specific (only 1), but !important
           overrides everything else. It WINS. */
        p {
          color: orange !important;
        }

        /* FINAL COLOR: Orange. (But this is bad code!) */
        ```

### 4. Inheritance

* **Lecture & Concepts:**
    * Some CSS properties are *inherited* by child elements (descendants).
    * **Inherited properties:** `font-family`, `font-size`, `font-weight`, `color`, `line-height`, `text-align`. (Mostly text-related things).
    * **NON-Inherited properties:** `border`, `padding`, `margin`, `width`, `height`, `background-color`. (Mostly box-related things).
    * This is why we can set a main `font-family` and `color` on the `<body>` tag, and *all* the text elements on the page will inherit it.

* **In-Depth Example:**
    * **`index.html`:**
        ```html
        <body>
          <div class="parent-box">
            <p>This is some text inside the box.</p>
          </div>
        </body>
        ```
    * **`style.css`:**
        ```css
        body {
          /* These will be INHERITED by the <p> tag */
          font-family: 'Times New Roman', serif;
          color: #333;
        }

        .parent-box {
          /* These will NOT be inherited by the <p> tag */
          border: 2px solid blue;
          padding: 20px;
          background-color: #eee;
        }

        /* Result:
        - The <p> tag WILL have 'Times New Roman' font and #333 color.
        - The <p> tag will NOT have a border, padding, or light-gray background.
        */
        ```

---

### Week 1: Comprehensive Assignment

**Objective:** Build a simple, single-page "About Me" website. This project will require you to use every concept from Modules 1 and 2.

**Files to Create:**
1.  `index.html`
2.  `style.css`

---

#### Stretch Goals (Bonus Challenge)

1. Find the `p.intro` selector (a `<p>` tag with the class `intro`). Add a new, more specific rule that targets it only when it's inside the `#content` div. (e.g., `#content p.intro`). Change the `font-size` and `font-weight`.

2. Add a `!important` rule to the generic `a { color: red !important; }` rule. What happens to your social links? Why is this a bad way to code? (Write your answer in a comment).

3. Add a new `<ul>` to the footer with `class="footer-links"`. Add links (`<a>`) inside. Notice how they are red. Now, write a new rule `ul.footer-links a { ... }` to style them differently. This demonstrates how you can "scope" your styles to only affect elements in a certain area.
