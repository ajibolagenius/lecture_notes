# Week 3: Semantic Layout & Tables

Welcome to Week 3! Now that you know how to structure individual pieces of content, it's time to build the *layout* of a full webpage. This week, we'll learn the "right" way to structure a page using modern, semantic HTML5 tags. We'll also cover how to properly display tabular data.

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
        2.  **SEO (Search Engine Optimization):** A search engine like Google has a harder time understanding your page's structure. It can't easily tell which content is a blog post and which is a footer.
    * **The Solution (HTML5):** Modern HTML5 introduced "landmark" tags that replace these generic `<div>`s. Using `<nav>` instead of `<div id="nav">` tells both browsers and screen readers, "This is the main navigation."

### 2. The Main Layout Tags

* **Lecture & Concepts:**
    * These tags define the high-level "regions" or "landmarks" of your page. A typical page uses all of them.

    * **`<header>`:**
        * Represents the introductory content for a page (or a section).
        * This is where you put your logo, the main `<h1>`, a tagline, and often the main `<nav>`.
        * You can have *multiple* `<header>`s (e.g., one for the whole page and one for an `<article>`).

    * **`<nav>`:**
        * Represents a section of **major navigation links**.
        * Use this for your main site menu. Don't use it for *every* group of links (e.g., a list of links in a footer is fine in a `<footer>`).

    * **`<main>`:**
        * This is one of the most important tags. It represents the **main, unique content** of your page.
        * It should **NOT** contain things that repeat on every page (like your main header, nav, or footer).
        * You should only have **ONE** `<main>` tag per page.

    * **`<footer>`:**
        * Represents the "footer" for a page (or a section).
        * This is where you put copyright info, contact links, sitemaps, and "back to top" links.

* **In-Depth Example (A full-page layout):**
    ```html
    <body>
      <header>
        <h1>My Awesome Website</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about.html">About</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Welcome to the Home Page</h2>
        <p>This is the main content...</p>
      </main>

      <footer>
        <p>&copy; 2025 My Awesome Website. All rights reserved.</p>
      </footer>
    </body>
    ```

---

### 3. Content Sectioning Tags

* **Lecture & Concepts:**
    * These tags are used *inside* your `<main>` tag to break up your content into logical parts. The choice between them is important.

    * **`<section>`:**
        * This is the most generic sectioning tag. It represents a **thematic group of content** that *doesn't* make sense on its own.
        * It almost *always* needs a heading (`<h2>` - `<h6>`) to explain what the section is.
        * **Use Case:** "About Me," "Our Team," "Contact Form," "Features." These are all "sections" of a larger page.

    * **`<article>`:**
        * This represents a **complete, self-contained, and distributable** piece of content.
        * **The "RSS Feed" Test:** Ask yourself, "If I took this content out of my site and put it in an RSS feed or on another person's blog, would it make sense on its own?"
        * **Use Case:** A blog post, a news article, a forum post, a single product in a list, a single comment.

    * **`<aside>`:**
        * Represents content that is **tangentially related** to the main content.
        * It's a "sidebar" or a "pull quote."
        * **Use Case:** A list of related links, an author bio at the end of a post, an advertisement.

    * **`<div>` (The "Box of Last Resort"):**
        * If you need a box *just for styling* (e.g., to create a "card" or a "flex container") and the content doesn't have a shared semantic meaning, **then** you use a `<div>`.

* **In-Depth Example (A blog layout):**
    ```html
    <main>
      <article>
        <header>
          <h2>My First Blog Post</h2>
          <p>Posted on Nov 16, 2025</p>
        </header>
        <p>This is the main content of my blog post...</p>
        <section class="comments">
          <h3>Comments</h3>
          <p>This is a comment...</p>
        </section>
      </article>

      <aside>
        <h3>Related Posts</h3>
        <ul>
          <li>Another Post</li>
          <li>A Third Post</li>
        </ul>
      </aside>
    </main>
    ```

* **⭐️ Class Exercise: Structure a Page**
    1.  Create a new HTML file.
    2.  Add the basic boilerplate (head, body, etc.).
    3.  Create a "landmark" structure: `<header>`, `<nav>`, `<main>`, and `<footer>`.
    4.  Inside `<main>`, add an `<h1>` (e.g., "My Services").
    5.  Below the `<h1>`, add *two* `<section>` blocks.
    6.  Give the first `<section>` an `<h2>` of "Web Design" and a `<p>`.
    7.  Give the second `<section>` an `<h2>` of "SEO" and a `<p>`.

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
        <th>Name</th>
        <th>Email</th>
      </tr>

      <tr>
        <td>Alice Smith</td>
        <td>alice@example.com</td>
      </tr>

      <tr>
        <td>Bob Johnson</td>
        <td>bob@example.com</td>
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

* **In-Depth Example (A full, semantic table):**
    ```html
    <table>
      <caption>Monthly Expenses</caption>
      <thead>
        <tr>
          <th>Item</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Rent</td>
          <td>$1000</td>
        </tr>
        <tr>
          <td>Groceries</td>
          <td>$400</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>$1400</td>
        </tr>
      </tfoot>
    </table>
    ```

---

### 3. Merging Cells (`colspan` & `rowspan`)

* **Lecture & Concepts:**
    * What if you want a cell to take up multiple columns or rows?
    * **`colspan="2"`:** An attribute you add to a `<td>` or `<th>` to make it "span" across **2 columns**.
    * **`rowspan="2"`:** An attribute you add to a `<td>` or `<th>` to make it "span" down across **2 rows**.

* **In-Depth Example (A schedule):**
    ```html
    <table>
      <caption>Class Schedule</caption>
      <thead>
        <tr>
          <th>Time</th>
          <th>Monday</th>
          <th>Tuesday</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>9:00 AM</th>
          <td>Math</td>
          <td>English</td>
        </tr>
        <tr>
          <th>10:00 AM</th>
          <td colspan="2">Study Hall</td>
        </tr>
        <tr>
          <th>11:00 AM</th>
          <td rowspan="2">Gym</td>
          <td>History</td>
        </tr>
        <tr>
          <th>12:00 PM</th>
          <td>Art</td>
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
    * This allows a screen reader user to navigate a cell (e.g., "$1000") and have the browser tell them, "Row: Rent, Column: Cost."

* **In-Depth Example (The *best* way to write a table):**
    ```html
    <table>
      <caption>Monthly Expenses</caption>
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Rent</th>
          <td>$1000</td>
        </tr>
        <tr>
          <th scope="row">Groceries</th>
          <td>$400</td>
        </tr>
      </tbody>
    </table>
    ```

* **⭐️ Class Exercise: Create a "User List" Table**
    1.  Create a `<table>` with a `<caption>` of "Active Users".
    2.  Create a `<thead>` with a row (`<tr>`) containing three `<th>`s: "First Name", "Last Name", and "Email".
    3.  Add `scope="col"` to each `<th>`.
    4.  Create a `<tbody>` with two data rows (`<tr>`) for two fictional users.
    5.  Make sure each row has the correct number of `<td>` cells.

---

### Week 3: Comprehensive Assignment

**Objective:** Build the semantic HTML structure for a "Company Homepage" layout.

**Project:**
Create a single `index.html` file. **You are not allowed to use any CSS.** The *only* goal is to create a perfect, logical, and semantic HTML structure that is ready for styling.

**Requirements:**

1.  **Boilerplate:** Your file must be a valid HTML5 document.
2.  **Landmarks:** Your `<body>` must be organized with:
    * A `<header>` at the top.
    * A `<nav>` element *inside* the `<header>`.
    * A `<main>` element to wrap the page's unique content.
    * A `<footer>` at the bottom.
3.  **Header & Nav:**
    * The `<header>` should contain an `<h1>` (e.g., "MegaCorp Inc.").
    * The `<nav>` should contain an **unordered list** (`<ul>`) of links (e.g., "Home," "About," "Services").
4.  **Main Content:** Inside your `<main>` tag, you must have:
    * A "Hero" section. A `<section>` tag is appropriate. Give it an `<h2>` (e.g., "Welcome to MegaCorp") and a `<p>`.
    * A "Services" section. Use a `<section>` tag with an `<h2>` (e.g., "Our Services").
    * Inside the "Services" section, create three "service" blocks.
        * **Challenge:** Should these be `<article>`s or `<div>`s? (A `<div>` is fine, as "Web Design" isn't a self-contained article. You could also use `<section>`s).
        * Each block should have an `<h3>` (e.g., "Web Design," "Marketing") and a `<p>`.
    * A "Latest News" section. Use a `<section>` with an `<h2>`.
    * Inside "Latest News," include one `<article>` for a blog post snippet. It should have an `<h3>` (the post title) and a `<p>` (the snippet).
5.  **Aside (Bonus):**
    * Add an `<aside>` element next to your "Latest News" article.
    * Inside the `<aside>`, add an `<h2>` ("Related Links") and a `<ul>` of links.
6.  **Table:**
    * Inside your `<main>` content, add a "Pricing" section (`<section>`).
    * Include a "Pricing Tiers" `<table>`.
    * The table **must** have a `<caption>`, a `<thead>`, and a `<tbody>`.
    * The `<thead>` should have headers (`<th>`) for "Plan," "Features," and "Price." (Don't forget the `scope` attribute!).
    * The `<tbody>` should have at least two rows (`<tr>`) for "Basic Plan" and "Pro Plan."
7.  **Footer:**
    * The `<footer>` should contain a `<p>` with a copyright notice.
