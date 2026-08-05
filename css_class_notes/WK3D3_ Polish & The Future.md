# Week 6: Polish & The Future

Welcome to the final week! You've learned how to build and lay out a full website. This week is all about adding the professional polish that makes a site feel "alive" and responsive to the user. We'll also cover the best practices that separate beginners from pros.

---

## Module 9: Transitions and Pseudo-Classes

This module is about adding *interactivity* and *state-driven* styles.

### 1. Pseudo-Classes (Responding to State)

* **Lecture & Concepts:**
    * A pseudo-class is a keyword added to a selector that specifies a special **state** of that element.
    * **`:hover`**: The most common. Applies a style *only when* the user's mouse is hovering over the element.
    * **`:active`**: Applies a style *only when* the user is actively clicking on the element.
    * **`:focus`**: Applies a style *only when* the element is "focused" (e.g., an `<input>` field you've clicked into, or a `<button>` you've tabbed to). This is critical for accessibility.

* **In-Depth Example (An "Abrupt" Button):**
    ```css
    .my-button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
    }

    /* This rule applies ONLY when the mouse is over the button */
    .my-button:hover {
      background-color: #0056b3; /* Darker blue */
    }

    /* This rule applies ONLY when the button is clicked */
    .my-button:active {
      transform: scale(0.98); /* Makes it "press" down */
    }
    ```
    *When you test this, the color change is *instant* and jarring. We'll fix this next.*

---

### 2. CSS Transitions

* **Lecture & Concepts:**
    * A transition allows you to smoothly animate a change from one property value to another. It's the "fix" for the abrupt change we saw with `:hover`.
    * **`transition-property`**: *What* property to animate (e.g., `background-color`, `transform`, or `all`).
    * **`transition-duration`**: *How long* the animation should take (e.g., `0.3s` or `300ms`).
    * **`transition-timing-function`**: The "speed curve" of the animation (e.g., `ease`, `ease-in-out`, `linear`). `ease-in-out` is a very smooth and popular choice.
    * **Shorthand (Best Practice):** You combine these into one line:
    * `transition: [property] [duration] [timing-function];`

* **In-Depth Example (A "Smooth" Button):**
    ```css
    .my-button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;

      /* --- ADD THIS --- */
      /* Tell the button to animate ALL changes over 0.3s */
      transition: all 0.3s ease-in-out;
    }

    .my-button:hover {
      background-color: #0056b3;
      /* We can also add a transform! */
      transform: scale(1.05); /* Slightly enlarge on hover */
    }

    .my-button:active {
      transform: scale(0.98);
    }
    ```
    *Now, when you hover, the button will smoothly change color and size over 0.3 seconds. This feels *much* more professional.*

### ⭐️ Class Exercise: Create an Interactive Link

1.  Create an HTML file with a single link: `<a href="#" class="my-link">Hover Over Me</a>`.
2.  In your CSS, style `.my-link` with a `color` of `blue` and `text-decoration: none;`.
3.  Add a `transition: all 0.2s ease;` to the `.my-link` rule.
4.  Add a `.my-link:hover` rule.
5.  In the `:hover` rule, change the `color` to `red` and add `letter-spacing: 1px;`.
6.  Test it. The link should now smoothly change color and "expand" its letters on hover.

---

### 3. Structural Pseudo-Classes & Pseudo-Elements

* **Lecture & Concepts:**
    * These are different. They don't select a *state*, they select a *part* of your HTML.
    * **`:nth-child()` (Pseudo-Class):** Selects an element based on its *position* in a list of siblings.
        * `:nth-child(1)`: Selects the first child.
        * `:nth-child(odd)`: Selects all odd-numbered children (1, 3, 5...).
        * `:nth-child(even)`: Selects all even-numbered children (2, 4, 6...).
        * `:nth-child(3n)`: Selects every 3rd child.
    * **`::before` & `::after` (Pseudo-Elements):**
        * This is an advanced but powerful "hack." It lets you create a "virtual" element *before* or *after* an element's *content*.
        * **It REQUIRES the `content: "";` property to work.**
        * Used for adding decorative icons, custom bullets, or tooltips.

* **In-Depth Example (Zebra-Striped List):**
    ```html
    <ul class="my-list">
      <li>First Item</li>
      <li>Second Item</li>
      <li>Third Item</li>
      <li>Fourth Item</li>
    </ul>
    ```
    ```css
    /* Style all list items */
    .my-list li {
      padding: 10px;
    }

    /* Select ONLY the even-numbered items and give them a background */
    .my-list li:nth-child(even) {
      background-color: #f0f0f0; /* light gray */
    }

    /* Add a custom bullet with a pseudo-element */
    .my-list li::before {
      content: "✅ "; /* The 'content' is required! */
      margin-right: 8px;
    }
    ```
    *This creates a "to-do list" look without changing your HTML!*

### ⭐️ Class Exercise: Style a Checklist

1.  Create an HTML `<ul>` with 5 `<li>` items.
2.  Use `:nth-child(odd)` to give all *odd* items a `background-color` of `#eee`.
3.  Use the `::before` pseudo-element on *all* `<li>` tags to add a content property of `"👉 "`.

---

## Module 10: Next Steps & Best Practices

This module covers the "pro" techniques for writing CSS that is clean, maintainable, and scalable.

### 1. CSS Variables (Custom Properties)

* **Lecture & Concepts:**
    * This is the **most important modern CSS best practice.**
    * Instead of repeating a HEX code (`#007bff`) 20 times in your stylesheet, you can store it in a **variable**.
    * **Why?** If the client wants to change the "main brand color," you only have to change it in **one place**, not 20.
    * **How to Declare:** You declare global variables inside the `:root` pseudo-class (which is just a fancy name for the `<html>` tag). Variables *must* start with two dashes (`--`).
    * **How to Use:** You use the `var()` function to access your variable.

* **In-Depth Example:**
    * **Before (Hard to maintain):**
        ```css
        .my-button { background-color: #007bff; }
        .my-button:hover { background-color: #0056b3; }
        h1 { color: #007bff; }
        ```
    * **After (Easy to maintain):**
        ```css
        /* 1. DECLARE your global color palette */
        :root {
          --brand-primary: #007bff;
          --brand-primary-dark: #0056b3;
          --text-color: #333;
        }

        /* 2. USE your variables */
        .my-button {
          background-color: var(--brand-primary);
        }

        .my-button:hover {
          background-color: var(--brand-primary-dark);
        }

        h1 {
          color: var(--brand-primary);
        }
        ```

### ⭐️ Class Exercise: Refactor with Variables

1.  Take the "Interactive Link" CSS from the previous exercise.
2.  Create a `:root` block.
3.  Create two variables: `--color-link-primary: blue;` and `--color-link-hover: red;`.
4.  Replace the hard-coded `blue` and `red` values in your `.my-link` and `.my-link:hover` rules with the new `var()` functions.

---

### 2. Organization & Naming (BEM)

* **Lecture & Concepts:**
    * When your `style.css` file gets to 2000 lines, how do you find anything? You need a system.
    * **BEM (Block__Element--Modifier)** is a popular *naming convention* that makes your CSS organized and readable.
    * **Block:** The main component (e.g., a "card", a "navbar").
        * `.card { ... }`
    * **Element:** A *part* of that block. Uses two underscores (`__`).
        * `.card__title { ... }`
        * `.card__image { ... }`
    * **Modifier:** A *variation* of that block. Uses two dashes (`--`).
        * `.card--featured { ... }` (A special, featured card)
        * `.card__button--disabled { ... }` (A disabled button)

* **In-Depth Example:**
    ```html
    <div class="card">
      <img class="card__image" src="..." alt="...">
      <h3 class="card__title">Title</h3>
    </div>

    <div class="card card--featured">
      <img class="card__image" src="..." alt="...">
      <h3 class="card__title">Featured Title</h3>
    </div>
    ```
    ```css
    /* Block */
    .card {
      border: 1px solid #ccc;
      background-color: white;
    }

    /* Modifier */
    .card--featured {
      border: 2px solid gold;
    }

    /* Element */
    .card__title {
      font-size: 1.5rem;
    }
    ```
    *You don't have to use BEM, but you *must* have a consistent naming system.*

---

### 3. Debugging (Browser Dev Tools)

* **Lecture & Concepts:**
    * We've used the "Inspect" tool, but now you can use its full power.
    * **Computed Tab:** This is your best friend. In the "Elements" panel, select an element and then click the "Computed" tab. It shows you the **final, calculated CSS** that is being applied to an element after all the rules, cascades, and specificity have been applied.
    * **Why is my text not blue?** The Computed tab will show you *exactly* which rule is overriding your `color: blue;` rule and why it's winning (e.g., "a more specific selector `div .my-text` won").
    * **Box Model Diagram:** The computed tab also shows you a visual diagram of the element's `margin`, `border`, `padding`, and `content` size. It's the #1 tool for debugging layout problems.

---

### Week 6: Comprehensive Final Project

**Objective:** Build a complete, responsive, one-page portfolio website from scratch, combining *all* concepts from the 6-week course.

**Project:** "Your Name" Portfolio Page
* This will be a "skeleton" file. Your job is to fill in all the CSS rules to bring it to life, following the comments.

#### `index.html` (The Skeleton - You don't need to change this)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Your Name] - Web Developer</title>

  <link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)">
  <link rel="preconnect" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" crossorigin>
  <link href="[https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@700&display=swap](https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@700&display=swap)" rel="stylesheet">

  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header id="main-header">
    <nav id="main-nav">
      <div class="logo">[Your Name]</div>
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#contact" class="btn-primary">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="hero">
      <h1>I'm [Your Name],<br>a Creative Web Developer.</h1>
      <a href="#work" class="btn-primary btn-large">View My Work</a>
    </section>

    <section id="work" class="container">
      <h2>My Work</h2>
      <div class="work-grid">
        <div class="card">
          <img src="[https://via.placeholder.com/400x250.png?text=Project+1](https://via.placeholder.com/400x250.png?text=Project+1)" alt="Screenshot of Project 1">
          <div class="card__content">
            <h3>Project One</h3>
            <p>A description of the project and the tech used.</p>
          </div>
        </div>
        <div class="card card--featured">
          <div class="card__badge">Featured</div>
          <img src="[https://via.placeholder.com/400x250.png?text=Project+2](https://via.placeholder.com/400x250.png?text=Project+2)" alt="Screenshot of Project 2">
          <div class="card__content">
            <h3>Project Two</h3>
            <p>A description of the project and the tech used.</p>
          </div>
        </div>
        <div class="card">
          <img src="[https://via.placeholder.com/400x250.png?text=Project+3](https://via.placeholder.com/400x250.png?text=Project+3)" alt="Screenshot of Project 3">
          <div class="card__content">
            <h3>Project Three</h3>
            <p>A description of the project and the tech used.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer id="main-footer">
    <p>&copy; 2025 [Your Name]. All rights reserved.</p>
  </footer>

</body>
</html>
