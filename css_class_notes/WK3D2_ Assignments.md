# Week 4: Layout (Part 1)

This week, we move from styling individual boxes to arranging them on the page. You'll learn the "old way" of doing layout (which you *must* understand to work on existing sites) and then begin the "modern way" with Flexbox.

---

## Module 6: CSS Layout (The Old Way)

Before Flexbox and Grid, creating layouts was much harder. These are the two main techniques you'll see in older codebases.

### 1. The `position` Property

* **Lecture & Concepts:**
    * The `position` property controls how an element is positioned in the document. It breaks elements out of the **normal document flow**.
    * **Normal Document Flow:** By default, block elements stack vertically, and inline elements flow horizontally. `position` changes this.

* **The `position` Values:**
    * **`position: static;`**
        * This is the **default** value.
        * "Static" means the element just sits in the normal document flow.
        * The properties `top`, `right`, `bottom`, and `left` do **nothing** to a static element.

    * **`position: relative;`**
        * **Analogy:** "Anchoring."
        * This element is *still* in the normal flow. It takes up its original space.
        * **BUT,** you can now use `top`, `right`, `bottom`, and `left` to "nudge" it *relative to its original position*.
        * **Most Important Use:** It creates a "positioning context" for its children. It becomes the **"nearest positioned ancestor"** for `absolute` elements inside it.

    * **`position: absolute;`**
        * **Analogy:** "The Flier."
        * This element is **completely removed from the normal flow**. Other elements will act like it doesn't even exist.
        * It is positioned *relative to its nearest positioned ancestor* (i.e., the closest parent that has `position: relative`, `absolute`, `fixed`, or `sticky`).
        * If it has no positioned ancestor, it positions itself relative to the `<html>` element (the viewport).
        * You control its position with `top`, `right`, `bottom`, and `left`.

    * **`position: fixed;`**
        * **Analogy:** "Stuck to the Glass."
        * This element is **removed from the normal flow**.
        * It is *always* positioned relative to the **browser window (the viewport)**.
        * It does *not* scroll with the page.
        * **Use Case:** "Back to Top" buttons, cookie banners, fixed navigation headers.

    * **`position: sticky;`**
        * **Analogy:** "The Hybrid."
        * This element acts like `position: relative` *until* you scroll past a certain point (defined by `top`, `bottom`, etc.).
        * Once you hit that threshold, it "sticks" and acts like `position: fixed`.
        * **Use Case:** Modern navigation bars that scroll with the page and then stick at the top.

* **In-Depth Example (The classic `relative` + `absolute` pair):**
    * This is the most common and important pattern. We want to put a "New!" badge in the corner of a product card.
    * **`index.html`:**
        ```html
        <div class="product-card">
          <span class="badge">New!</span>
          <h3>Product Title</h3>
          <p>This is a great product.</p>
        </div>
        ```
    * **`style.css`:**
        ```css
        .product-card {
          width: 250px;
          border: 1px solid #ccc;
          padding: 16px;

          /* 1. This is the ANCHOR.
             It creates the "positioning context" for the badge.
             It doesn't move, but it tells the badge: "position yourself relative to ME."
          */
          position: relative;
        }

        .badge {
          /* 2. This is the FLIER. It's pulled out of the normal flow. */
          position: absolute;

          /* 3. Position it relative to the .product-card's padding edge */
          top: 0;
          right: 0;

          /* 4. Just styling */
          background-color: red;
          color: white;
          padding: 4px 8px;
          font-size: 12px;
        }
        ```


### 2. Floating Elements (`float`)

* **Lecture & Concepts:**
    * **Original Purpose:** `float` was designed for one simple thing: to let text wrap around an image (like in a newspaper).
        * `img { float: left; margin-right: 10px; }`
    * **Abused Purpose (The "Old Layout"):** For a decade, developers used `float` to create entire multi-column layouts (e.g., `sidebar { float: left; }`, `main-content { float: right; }`). **This is no longer necessary. Use Flexbox or Grid.**
    * **The Problem (Parent Collapse):**
        * A "floated" element is also removed from the normal flow (similar to `absolute`).
        * If a parent `div` *only* contains floated elements, its `height` will collapse to `0`, because it thinks it's empty. This breaks the layout.
    * **The Solution (The "Clearfix"):**
        * To fix the collapsing parent, you had to add a "clearfix" (a "clear fix"). This is a special rule that tells the parent to "clear" the floats and contain them.
        * **Modern Clearfix Hack:**
            ```css
            .my-parent-div::after {
              content: "";
              display: table;
              clear: both;
            }
            ```
    * **You should understand what `float` is, but you should not use it for new layouts.**

---
---

## Module 7 (Partial): Modern Layout with Flexbox

**Flexbox (the Flexible Box Layout Module)** is the modern, 1-dimensional layout system. It's designed to distribute space and align items within a container.

### 1. The Core Concept: Container & Items

* **Flexbox has two parts:**
    1.  **The Flex Container:** The parent element you turn *into* a flexbox.
    2.  **The Flex Items:** The direct children *inside* the flex container.



* **To start, you only do one thing:**
    ```css
    .my-container {
      display: flex;
    }
    ```
* As soon as you do this, the direct children (`.item-1`, `.item-2`) immediately become **flex items** and will align **in a row**.

### 2. The Two Axes: Main & Cross

This is the most important concept to understand:
* **Main Axis:** The primary direction that your items are laid out in.
* **Cross Axis:** The direction *perpendicular* to the Main Axis.

* By default:
    * Main Axis is **horizontal** (left-to-right).
    * Cross Axis is **vertical** (top-to-bottom).



### 3. `flex-direction` (Changing the Main Axis)

* This property defines the direction of the Main Axis.
    * **`flex-direction: row;`** (Default)
        * Main Axis: Horizontal
        * Cross Axis: Vertical
    * **`flex-direction: column;`**
        * **This flips everything!**
        * Main Axis: Vertical
        * Cross Axis: Horizontal

### 4. `justify-content` (Main Axis Alignment)

* This property aligns items along the **Main Axis**.
    * **`justify-content: flex-start;`** (Default) Items bunch to the start.
    * **`justify-content: flex-end;`** Items bunch to the end.
    * **`justify-content: center;`** Items bunch in the center.
    * **`justify-content: space-between;`** **(Most useful!)** First item is at the start, last item is at the end, and all *space is distributed evenly between them*.
    * **`justify-content: space-around;`** Space is distributed evenly, *including* half-space on the ends.



### 5. `align-items` (Cross Axis Alignment)

* This property aligns items along the **Cross Axis**.
    * **`align-items: stretch;`** (Default) Items stretch to fill the height/width of the container.
    * **`align-items: flex-start;`** Items bunch to the start of the cross axis.
    * **`align-items: flex-end;`** Items bunch to the end of the cross axis.
    * **`align-items: center;`** **(Most useful!)** Items are centered vertically (or horizontally, if `flex-direction: column`).



### 6. `flex-wrap` (Handling Overflow)

* This property controls what happens when your items run out of space.
    * **`flex-wrap: nowrap;`** (Default) Items will *not* wrap. They will overflow the container (or shrink, if allowed).
    * **`flex-wrap: wrap;`** When items run out of space, they will wrap onto the next line. This is essential for responsive design.

---

### Week 4: Comprehensive Assignment

**Objective:** Build a website header that combines **Flexbox** for layout and **`position`** for a "badge."

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
  <title>Week 4 Assignment</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header class="main-header">
    <div class="logo">MySite</div>

    <nav class="navbar">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li class="nav-sale">
          <a href="#">Products</a>
          <span class="sale-badge">SALE</span>
        </li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>

</body>
</html>
```

#### Part 2: The CSS (`style.css`)
