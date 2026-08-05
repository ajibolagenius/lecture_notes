# Week 3: Semantic Layout & Tables

Welcome to Week 3! Now that you know how to structure individual pieces of content, it's time to build the *layout* of your portfolio's homepage properly. This week, we'll learn the "right" way to structure a page using modern, semantic HTML5 tags, refactor `index.html` to use them, and add its first real data table.

---

## Module 4: Building with Semantic HTML5

This module is about moving *away* from "divitis" (using `<div>` for everything) and using smart, descriptive tags that give your page meaning.

### 1. The "Why" of Semantics

* **Lecture & Concepts:**
    * **What is "Semantic"?** It just means "relating to meaning." Semantic HTML tags are tags that *describe the meaning* of the content inside them.
    * **The Old Way ("divitis"):** For years, people built layouts like this:
        ```html
        <div id="header">...</div>
        <div id="nav">...</div>
        <div id="main-content">...</div>
        <div id="sidebar">...</div>
        <div id="footer">...</div>
        ```
    * **The Problem:** A `<div>` has **no semantic meaning**. It's just a generic box. This is bad for:
        1.  **Accessibility (a11y):** A screen reader for a visually impaired user just hears "div, div, div." It has no way to know which part is the main content or the navigation. It can't provide a "skip to main content" link.
        2.  **SEO (Search Engine Optimization):** A search engine like Google has a harder time understanding your page's structure.
    * **The Solution (HTML5):** Modern HTML5 introduced "landmark" tags that replace these generic `<div>`s. Using `<nav>` instead of `<div id="nav">` tells both browsers and screen readers, "This is the main navigation."

* **⭐️ Class Exercise: Audit a Real Portfolio**
    1.  Open a real developer portfolio site and "Inspect" it.
    2.  Try to find its `<header>`, `<nav>`, `<main>`, and `<footer>` in the DOM.
    3.  Note anywhere it still relies on unlabeled `<div>`s where a semantic tag would have been clearer.

### 2. The Main Layout Tags

* **Lecture & Concepts:**
    * These tags define the high-level "regions" or "landmarks" of your page. A typical page uses all of them.

    * **`<header>`:**
        * Represents the introductory content for a page (or a section).
        * This is where you put your logo, the main `<h1>`, a tagline, and often the main `<nav>`.

    * **`<nav>`:**
        * Represents a section of **major navigation links**.
        * Use this for your main site menu.

    * **`<main>`:**
        * This is one of the most important tags. It represents the **main, unique content** of your page.
        * It should **NOT** contain things that repeat on every page (like your main header, nav, or footer).
        * You should only have **ONE** `<main>` tag per page.

    * **`<footer>`:**
        * Represents the "footer" for a page (or a section).
        * This is where you put copyright info, contact links, and social links.

* **In-Depth Example (A full-page layout):**
    ```html
    <body>
      <header>
        <h1>Alice Chen</h1>
        <nav>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>About Me</h2>
        <p>Bio goes here...</p>
      </main>

      <footer>
        <p>&copy; 2026 Alice Chen. All rights reserved.</p>
      </footer>
    </body>
    ```

* **⭐️ Class Exercise: Refactor Your Homepage's Layout**
    1.  Open your `index.html` from Weeks 1-2.
    2.  Wrap your `<h1>` in a `<header>`, along with a real `<nav>` containing links to `index.html`, `about.html`, and `contact.html`.
    3.  Wrap everything else (About Me, Skills, Journey, Tools) in a single `<main>`.
    4.  Add a `<footer>` with a copyright line and your external profile link.

---

### 3. Content Sectioning Tags

* **Lecture & Concepts:**
    * These tags are used *inside* your `<main>` tag to break up your content into logical parts. The choice between them is important.

    * **`<section>`:**
        * This is the most generic sectioning tag. It represents a **thematic group of content** that *doesn't* make sense on its own.
        * It almost *always* needs a heading (`<h2>` - `<h6>`) to explain what the section is.
        * **Use Case:** "About Me," "Featured Work," "Skills." These are all "sections" of a larger page.

    * **`<article>`:**
        * This represents a **complete, self-contained, and distributable** piece of content.
        * **The "RSS Feed" Test:** Ask yourself, "If I took this content out of my site and put it in an RSS feed or on another person's blog, would it make sense on its own?"
        * **Use Case:** A single project in a "Featured Work" list is a perfect fit — each one is self-contained.

    * **`<aside>`:**
        * Represents content that is **tangentially related** to the main content.
        * It's a "sidebar" or a "pull quote."
        * **Use Case:** A "Fun Facts" box next to your bio, a list of related links.

    * **`<div>` (The "Box of Last Resort"):**
        * If you need a box *just for styling* (e.g., to create a "card" or a "flex container") and the content doesn't have a shared semantic meaning, **then** you use a `<div>`.

* **In-Depth Example (A Featured Work section):**
    ```html
    <main>
      <section>
        <h2>Featured Work</h2>

        <article>
          <h3>Weather App</h3>
          <img src="assets/weather-app.png" alt="Screenshot of the weather app showing a 5-day forecast">
          <p>A React Native app that fetches live weather data.</p>
          <ul>
            <li>React Native</li>
            <li>Expo</li>
          </ul>
        </article>

        <article>
          <h3>Task Tracker</h3>
          <img src="assets/task-tracker.png" alt="Screenshot of the task tracker's list view">
          <p>A Python CLI tool for tracking daily tasks.</p>
        </article>
      </section>

      <aside>
        <h3>Fun Facts</h3>
        <ul>
          <li>Started coding in 2025</li>
          <li>Favorite language: JavaScript</li>
        </ul>
      </aside>
    </main>
    ```

* **⭐️ Class Exercise: Add Your Featured Work**
    1.  Inside `<main>`, add a `<section>` with an `<h2>` "Featured Work".
    2.  Add an `<article>` for 2-3 projects (real or planned) — each with an `<h3>` title, an `<img>` (placeholder is fine for now), a `<p>` description, and a `<ul>` of technologies used.
    3.  Add an `<aside>` next to your "About Me" section with an `<h3>` "Fun Facts" and a short `<ul>`.

---

## Module 5: Tables for Data

This module is about one thing: **displaying tabular data** (like a spreadsheet).
**Warning:** For decades, tables (`<table>`) were used for *layout* (e.g., to create a sidebar). **This is an old, terrible practice.** Never use tables for layout. Use them *only* for data.

### 1. Basic Table Structure

* **Lecture & Concepts:**
    * **`<table>`:** The main container for the entire table.
    * **`<tr>` (Table Row):** Defines a new row.
    * **`<td>` (Table Data):** A single "cell" of data.
    * **`<th>` (Table Header):** A "header" cell. It's semantically important (it defines the *title* of a column or row) and is styled as **bold** and **centered** by default.

* **In-Depth Example (A simple 2x2 table):**
    ```html
    <table>
      <tr>
        <th>Skill</th>
        <th>Level</th>
      </tr>
      <tr>
        <td>HTML</td>
        <td>Intermediate</td>
      </tr>
    </table>
    ```

---

### 2. Advanced Semantic Structure

* **Lecture & Concepts:**
    * For longer, more complex tables, you should group your rows just like you group your page layout.
    * **`<thead>`:** Wraps the header row(s) (`<tr>`s with `<th>`s).
    * **`<tbody>`:** Wraps the main data row(s) (`<tr>`s with `<td>`s).
    * **`<tfoot>`:** Wraps the footer row(s) (e.g., a "Total" row).
    * **`<caption>`:** The *title* of the table. It should be the *first* child of the `<table>` and is critical for accessibility.

* **In-Depth Example (Skills & Experience):**
    ```html
    <table>
      <caption>Skills & Experience</caption>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Years</th>
          <th>Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>HTML</td>
          <td>1</td>
          <td>Intermediate</td>
        </tr>
        <tr>
          <td>CSS</td>
          <td>1</td>
          <td>Beginner</td>
        </tr>
      </tbody>
    </table>
    ```

---

### 3. Merging Cells (`colspan` & `rowspan`)

* **Lecture & Concepts:**
    * What if you want a cell to take up multiple columns or rows?
    * **`colspan="3"`:** An attribute you add to a `<td>` or `<th>` to make it "span" across multiple columns — useful for a section-divider row.
    * **`rowspan="2"`:** An attribute you add to a `<td>` or `<th>` to make it "span" down across multiple rows.

* **In-Depth Example (Grouping Skills by Category):**
    ```html
    <table>
      <caption>Skills & Experience</caption>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Years</th>
          <th>Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="3"><strong>Languages</strong></td>
        </tr>
        <tr>
          <td>HTML</td>
          <td>1</td>
          <td>Intermediate</td>
        </tr>
        <tr>
          <td colspan="3"><strong>Tools</strong></td>
        </tr>
        <tr>
          <td>Git</td>
          <td>1</td>
          <td>Beginner</td>
        </tr>
      </tbody>
    </table>
    ```

---

### 4. Accessibility (`scope` attribute)

* **Lecture & Concepts:**
    * The `scope` attribute is crucial for screen readers. It explicitly tells them what a header cell is the "header for."
    * **`scope="col"`:** Add this to all `<th>`s that are headers for a **column**.
    * **`scope="row"`:** Add this to all `<th>`s that are headers for a **row**.
    * This allows a screen reader user to navigate a cell (e.g., "Intermediate") and have the browser tell them, "Row: HTML, Column: Level."

* **In-Depth Example (The *best* way to write the table):**
    ```html
    <table>
      <caption>Skills & Experience</caption>
      <thead>
        <tr>
          <th scope="col">Skill</th>
          <th scope="col">Years</th>
          <th scope="col">Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">HTML</th>
          <td>1</td>
          <td>Intermediate</td>
        </tr>
        <tr>
          <th scope="row">CSS</th>
          <td>1</td>
          <td>Beginner</td>
        </tr>
      </tbody>
    </table>
    ```

* **⭐️ Class Exercise: Build Your "Skills & Experience" Table**
    1.  Add a `<table>` with a `<caption>` of "Skills & Experience" somewhere on your homepage (you'll move it to `about.html` in Week 6).
    2.  Create a `<thead>` with a row containing three `<th>`s: "Skill", "Years", "Level" — each with `scope="col"`.
    3.  Create a `<tbody>` with at least 3 rows, one per skill, using `<th scope="row">` for the skill name.

---

### Week 3: Comprehensive Assignment

**Objective:** Give your portfolio homepage a real semantic layout and its first data table.

**Project:**
Continue working in the same `index.html` from Weeks 1-2.

**Requirements:**

1.  **Landmarks:** Your `<body>` must be organized with a `<header>` (containing a real `<nav>` with links to all 3 planned pages), a `<main>`, and a `<footer>`.
2.  **Featured Work:** Inside `<main>`, a "Featured Work" `<section>` with an `<article>` per project (image, `<h3>` title, `<p>` description, `<ul>` of tech used).
3.  **Aside:** A "Fun Facts" `<aside>` alongside your About Me content.
4.  **Skills & Experience Table:** A `<table>` with `<caption>`, `<thead>`/`<tbody>`, and `scope` attributes on every `<th>`. Keep this table's content — you'll move it to `about.html` in Week 6.
