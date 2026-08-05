# Week 4: Layout (Part 1)

This week, we move from styling individual boxes to arranging them on the page. You'll learn the "old way" of doing layout (which you *must* understand to work on existing sites) and then begin the "modern way" with Flexbox — starting with your own site's `<header>`.

---

## Module 6: CSS Layout (The Old Way)

Before Flexbox and Grid, creating layouts was much harder. These are the two main techniques you'll see in older codebases.

### 1. The `position` Property

* **Lecture & Concepts:**
    * The `position` property controls how an element is positioned in the document. It breaks elements out of the **normal document flow**.
    * **Normal Document Flow:** By default, block elements (like your `.project-card`) stack vertically, and inline elements flow horizontally. `position` changes this.

* **The `position` Values:**
    * **`position: static;`** — The **default**. The element just sits in the normal document flow. `top`/`right`/`bottom`/`left` do **nothing**.
    * **`position: relative;`** — **Analogy: "Anchoring."** Still in the normal flow, taking up its original space. But you can now "nudge" it with `top`/`right`/`bottom`/`left`, and — **most importantly** — it becomes the **"nearest positioned ancestor"** for any `absolute` element inside it.
    * **`position: absolute;`** — **Analogy: "The Flier."** Completely removed from the normal flow. Positioned *relative to its nearest positioned ancestor*.
    * **`position: fixed;`** — **Analogy: "Stuck to the Glass."** Removed from flow, positioned relative to the **browser window**, doesn't scroll with the page.
    * **`position: sticky;`** — **Analogy: "The Hybrid."** Acts like `relative` until you scroll past a threshold, then "sticks" like `fixed`. **This is exactly what you'll use for your own site's header.**

* **In-Depth Example (Positioning Your Real "Featured" Badge):**
    * Back in Week 3, you added a `<span class="badge">Featured</span>` inside one project's title. Right now it just sits inline next to the text. Let's pull it into the corner of the card instead — the classic `relative` + `absolute` pair.
    * **`index.html`:**
        ```html
        <article class="project-card">
          <span class="badge">Featured</span>
          <h3 class="project-title">Weather App</h3>
          <p class="project-description">A React Native app that fetches live weather data.</p>
        </article>
        ```
    * **`style.css`:**
        ```css
        .project-card {
          padding: 20px;
          border: 1px solid #ddd;

          /* 1. This is the ANCHOR.
             It creates the "positioning context" for the badge.
             It doesn't move, but tells the badge: "position yourself relative to ME."
          */
          position: relative;
        }

        .badge {
          /* 2. This is the FLIER. Pulled out of the normal flow. */
          position: absolute;

          /* 3. Position it relative to the .project-card's edges */
          top: 12px;
          right: 12px;

          /* 4. Styling from Week 3 */
          background-color: #336699;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
        }
        ```

### 2. Floating Elements (`float`)

* **Lecture & Concepts:**
    * **Original Purpose:** `float` was designed for one thing: letting text wrap around an image (like in a newspaper). `img { float: left; margin-right: 10px; }`
    * **Abused Purpose (The "Old Layout"):** For a decade, developers used `float` to build entire multi-column layouts. **This is no longer necessary. Use Flexbox or Grid** — which is exactly what you'll do next for your own header.
    * **The Problem (Parent Collapse) & The "Clearfix":** A floated element is removed from flow; if a parent *only* contains floated elements, its height collapses to `0`. The fix was a "clearfix" hack (`content: ""; display: table; clear: both;`).
    * **You should understand `float`, but you won't need it for your portfolio.**

---
---

## Module 7 (Partial): Modern Layout with Flexbox

**Flexbox (the Flexible Box Layout Module)** is the modern, 1-dimensional layout system. It's designed to distribute space and align items within a container — a perfect fit for your `<header>`.

### 1. The Core Concept: Container & Items

* **Flexbox has two parts:**
    1.  **The Flex Container:** The parent element you turn *into* a flexbox — your `<header>`.
    2.  **The Flex Items:** The direct children *inside* it — your `#page-title` and `<nav>`.

* **To start, you only do one thing:**
    ```css
    header {
      display: flex;
    }
    ```
* As soon as you do this, `#page-title` and `<nav>` immediately become **flex items** and align **in a row**.

### 2. The Two Axes: Main & Cross

This is the most important concept to understand:
* **Main Axis:** The primary direction your items are laid out in.
* **Cross Axis:** The direction *perpendicular* to the Main Axis.
* By default: Main Axis is **horizontal**, Cross Axis is **vertical**.

### 3. `flex-direction` (Changing the Main Axis)

* **`flex-direction: row;`** (Default) — Main Axis horizontal.
* **`flex-direction: column;`** — Flips everything: Main Axis vertical.
* Your header stays `row` — that's the default, so you don't need to write it.

### 4. `justify-content` (Main Axis Alignment)

* Aligns items along the **Main Axis**.
    * `flex-start` (Default), `flex-end`, `center`
    * **`space-between`** **(Most useful!)** — First item at the start, last at the end, space distributed evenly between. **This is exactly what puts your name on the left and your nav on the right.**
    * `space-around`

### 5. `align-items` (Cross Axis Alignment)

* Aligns items along the **Cross Axis**.
    * `stretch` (Default), `flex-start`, `flex-end`
    * **`center`** **(Most useful!)** — Vertically centers your title and nav links with each other.

### 6. `flex-wrap` (Handling Overflow)

* **`flex-wrap: nowrap;`** (Default) — Items overflow rather than wrap.
* **`flex-wrap: wrap;`** — Items wrap onto the next line when they run out of space. Useful for your nav `<ul>` on narrow screens (we'll properly handle mobile in Week 5).

* **In-Depth Example (Your Real Header, Made Flex):**
    * **`index.html` (already built, HTML Week 3):**
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
    * **`style.css`:**
        ```css
        header {
          display: flex;
          justify-content: space-between; /* title left, nav right */
          align-items: center;            /* vertically centered */
          padding: 16px 24px;

          /* Make it stick to the top while scrolling */
          position: sticky;
          top: 0;
          background-color: white;
          z-index: 10;
        }

        nav ul {
          display: flex;          /* turn the nav list into a row too */
          list-style: none;
          gap: 24px;
          margin: 0;
          padding: 0;
        }
        ```

* **⭐️ Class Exercise: Style Your Real Header**
    1.  Turn your `<header>` into a flex container with `justify-content: space-between` and `align-items: center`.
    2.  Turn your nav's `<ul>` into a flex row using `display: flex` and `gap`.
    3.  Add `position: sticky; top: 0;` to `<header>` and scroll the page to confirm it stays put.
    4.  Apply the `relative`/`absolute` badge positioning from Module 6 to your Featured project card.

---

### Week 4: Comprehensive Assignment

**Objective:** Turn your site's real header into a sticky Flexbox layout, and position your Featured badge with `position`.

**Files to Use:**
1.  `index.html`, `about.html`, `contact.html` (the header must match across all 3)
2.  `style.css`

**Requirements:**

1.  **Flexbox Header:** `display: flex`, `justify-content: space-between`, `align-items: center` on `<header>`.
2.  **Flexbox Nav:** `display: flex` on your nav `<ul>`, replacing any default block-list stacking.
3.  **Sticky Header:** `position: sticky; top: 0;` so the header stays visible while scrolling, on all 3 pages.
4.  **Positioned Badge:** `.project-card` gets `position: relative`; `.badge` gets `position: absolute`, placed in a corner of the card.
5.  **Consistency:** Confirm the header looks and behaves identically on `index.html`, `about.html`, and `contact.html` — one shared stylesheet, one shared header.

**Bonus Challenge:** Add a subtle `box-shadow` to the sticky header so it visually separates from the page content once you scroll.
