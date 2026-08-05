# Week 6: Advanced Polish & Modern Workflow

Welcome to the final week! You've learned how to build and lay out a full website. This week is all about adding the professional polish that makes a site feel "alive" and responsive to the user. We'll also cover the best practices and next steps that separate beginners from pros.

---

## Module 9: Interactivity: Transitions, Transforms & Animations

This module is about making your site *react* to the user, moving from static pages to dynamic experiences.

### 1. Pseudo-Classes (Responding to State)

* **Lecture & Concepts:**
    * A pseudo-class is a keyword added to a selector that specifies a special **state** of that element.
    * **`:hover`**: The most common. Applies a style *only when* the user's mouse is hovering over the element.
    * **`:active`**: Applies a style *only when* the user is actively clicking on the element.
    * **`:focus`**: Applies a style *only when* the element is "focused" (e.g., an `<input>` field you've clicked into, or a `<button>` you've tabbed to). This is critical for accessibility.
    * **`:nth-child()`**: A "structural" pseudo-class. It selects an element based on its *position* in a list of siblings (e.g., `li:nth-child(even)` to select every even list item for "zebra striping").

### 2. The `transform` Property

* **Lecture & Concepts:**
    * The `transform` property lets you *change the shape, size, and position* of an element *without* affecting the normal document flow.
    * **`transform: scale(1.1)`**: Makes the element 10% larger.
    * **`transform: rotate(45deg)`**: Rotates the element 45 degrees clockwise.
    * **`transform: translate(50px, 20px)`**: Moves the element 50px to the right and 20px down.
    * This property is almost always paired with `transition` to create smooth effects.

### 3. CSS Transitions

* **Lecture & Concepts:**
    * A transition allows you to **smoothly animate** a change from one state to another (e.g., the change from a normal state to a `:hover` state).
    * It's the "fix" for abrupt, instant changes.
    * **`transition-property`**: *What* to animate (e.g., `background-color`, `transform`, or `all`).
    * **`transition-duration`**: *How long* to animate (e.g., `0.3s` or `300ms`).
    * **`transition-timing-function`**: The "speed curve" of the animation (e.g., `ease`, `ease-in-out`, `linear`).
    * **Shorthand (Best Practice):** You combine these into one line:
        * `transition: [property] [duration] [timing-function];`
        * `transition: all 0.3s ease-in-out;`

* **In-Depth Example (A "Smooth" Button):**
    ```css
    .my-button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;

      /* 1. Tell the button to animate ALL property changes,
         take 0.3 seconds, and use a smooth speed curve. */
      transition: all 0.3s ease-in-out;
    }

    .my-button:hover {
      /* 2. Define the 'hover' state */
      background-color: #0056b3; /* Darker blue */
      transform: scale(1.05); /* Make it 5% larger */
    }

    .my-button:active {
      /* 3. Define the 'active' (click) state */
      transform: scale(0.98); /* "Press" it down */
    }
    ```
    [Image of a CSS button hover transition]

### 4. CSS Animations (`@keyframes`)

* **Lecture & Concepts:**
    * `transition` is simple: it animates from state A to state B.
    * `animation` is for complex, multi-step animations that can run on their own *without* a trigger like `:hover`.
    * **Step 1: The "Story" (`@keyframes`):** You define the animation's timeline.
    * **Step 2: The "Actor" (`animation`):** You apply the animation to an element.

* **In-Depth Example (A "Fade-In" Animation):**
    ```css
    /* 1. Define the "story" and name it "fadeIn" */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .hero-title {
      /* 2. Apply the "fadeIn" story to this element */
      animation-name: fadeIn;
      animation-duration: 1s;
      animation-timing-function: ease-out;
    }
    ```
    [Image of a CSS @keyframes fade-in animation]

### ⭐️ Class Exercise (Module 9)

1.  Create an HTML file with `<div class="box"></div>`.
2.  Style the `.box` to be `100px` wide, `100px` tall, with a `background-color` of `red`.
3.  Add a `transition` for the `background-color` and `transform` properties, lasting `0.4s`.
4.  Add a `.box:hover` rule.
5.  In the `:hover` rule, change the `background-color` to `blue` and `transform: rotate(180deg);`.
6.  Open the file and test it. The box should smoothly spin and change color on hover.

---

## Module 10: Advanced Selectors & Best Practices

### 1. CSS Variables (Custom Properties)

* **Lecture & Concepts:**
    * This is the **most important modern CSS best practice** for managing large projects.
    * Instead of repeating a HEX code (`#336699`) 20 times, you store it in a **variable**.
    * **Why?** If the client wants to change the "brand color," you only have to change it in **one place**.
    * **How to Declare:** You declare global variables inside the `:root` pseudo-class (which is just a fancy name for the `<html>` tag). Variables *must* start with two dashes (`--`).
    * **How to Use:** You use the `var()` function to access your variable.

* **In-Depth Example:**
    * **Before (Hard to maintain):**
        ```css
        .btn { background-color: #336699; }
        h1 { color: #336699; }
        .card { border-color: #336699; }
        ```
    * **After (Easy to maintain):**
        ```css
        /* 1. DECLARE your global color palette */
        :root {
          --brand-primary: #336699;
          --text-dark: #333;
          --ui-padding: 15px;
        }

        /* 2. USE your variables */
        .btn {
          background-color: var(--brand-primary);
          padding: var(--ui-padding);
        }
        h1 {
          color: var(--brand-primary);
        }
        .card {
          border-color: var(--brand-primary);
        }
        ```

### 2. Advanced Selectors & Combinators

* **Lecture & Concepts:**
    * Use these to write cleaner CSS with fewer classes.
    * **Attribute Selectors `[ ]`**: Selects an element based on one of its attributes.
        * `a[href$=".pdf"]` (Selects any link whose `href` *ends with* ".pdf")
        * `input[type="submit"]` (Selects submit buttons)
        * `[data-state="active"]` (Selects any element with this data-attribute, often used with JS)
    * **Adjacent Sibling Combinator `+`**: Selects an element that *immediately follows* another element.
        * `h2 + p` (Selects *only* the first `<p>` tag right after an `<h2>`)
    * **General Sibling Combinator `~`**: Selects *all* elements that follow another element.
        * `h2 ~ p` (Selects *all* `<p>` tags that come after an `<h2>` at the same level)
    * **:not() Pseudo-Class**: Selects everything *except* what's in the parentheses.
        * `.card:not(.featured-card)` (Selects all cards that *don't* have the "featured" class)
    * **:focus-within Pseudo-Class**: A modern powerhouse. It styles a *parent* element when any of its *children* are focused.
        * `.form-group:focus-within { background-color: #eee; }` (Highlights a form field's container when you click the input)

### 3. Organization & Naming (BEM)

* **Lecture & Concepts:**
    * When your `style.css` file gets to 2000 lines, you need a system to prevent "specificity wars" (where your rules stop working and you don't know why).
    * **BEM (Block__Element--Modifier)** is a popular *naming convention* that makes your CSS organized, readable, and "flat" (low specificity).
    * **Block:** The main component (e.g., a "card", a "navbar").
        * `.card { ... }`
    * **Element:** A *part* of that block. Uses two underscores (`__`).
        * `.card__title { ... }`
        * `.card__image { ... }`
    * **Modifier:** A *variation* of that block. Uses two dashes (`--`).
        * `.card--featured { ... }` (A special, featured card)
        * `.card__button--disabled { ... }` (A disabled button)
[Image of BEM naming convention example]

### ⭐️ Class Exercise (Module 10)

1.  Create this HTML:
    ```html
    <h2>A Heading</h2>
    <p>This is the first paragraph.</p>
    <p>This is the second paragraph.</p>
    ```
2.  Write a CSS rule using the **Adjacent Sibling Combinator (`+`)** to make *only* the first paragraph have a `font-weight: bold;` and `color: green;`.
3.  Write a rule using CSS Variables: Create a `:root` variable `--alert-color: red;` and apply it to the `<h2>`.

---

## Module 11: Beyond CSS: Intro to Sass/SCSS

### 1. What is a CSS Preprocessor?

* **Lecture & Concepts:**
    * Sass (Syntactically Awesome Style Sheets) is a **preprocessor**. It's "CSS with superpowers."
    * You write your code in a `.scss` file, which has features that CSS doesn't (like nesting, mixins, and better logic).
    * A special program (a "compiler") then takes your `.scss` file and **compiles** it into a normal `.css` file that the browser can understand.
    * **Why?** It keeps your code incredibly organized and DRY (Don't Repeat Yourself).

### 2. Sass Variables

* **Lecture & Concepts:**
    * Sass variables look different from CSS variables. They use a dollar sign (`$`).
    * `$primary-color: #336699;`
    * **Key Difference:** Sass variables are "compile-time." The compiler replaces all instances of `$primary-color` with `#336699` in the *final CSS file*. CSS `var()` variables are "run-time," meaning the browser handles them live (which is why they are great for dark mode toggles).

### 3. Nesting Selectors

* **Lecture & Concepts:**
    * This is the most popular feature. It lets you write your CSS in a structure that *mirrors* your HTML, making BEM even easier.
    * The `&` (parent selector) is used to refer to the parent, especially for pseudo-classes like `:hover`.

* **In-Depth Example:**
    * **Before (BEM in regular CSS):**
        ```css
        .card { ... }
        .card__title { ... }
        .card__content { ... }
        .card:hover { ... }
        ```
    * **After (With Sass Nesting):**
        ```scss
        .card {
          // ... card styles ...

          &__title {
            // ... title styles ...
          }

          &__content {
            // ... content styles ...
          }

          &:hover {
            // ... hover styles ...
          }
        }
        ```

### 4. Basic Mixins

* **Lecture & Concepts:**
    * A `@mixin` is a reusable "function" for styles. If you find yourself writing the same 5 lines of code for flexbox centering, you can put it in a mixin.
    * `@mixin` defines the block of styles.
    * `@include` uses the block of styles.

* **In-Depth Example:**
    ```scss
    // 1. DEFINE the mixin
    @mixin flex-center {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    // 2. USE the mixin
    .hero {
      @include flex-center;
      height: 100vh;
    }

    .icon-wrapper {
      @include flex-center;
      width: 50px;
    }
    ```
    * This will compile to two separate rules in your CSS, both with the `display: flex` properties.

### ⭐️ Class Exercise (Module 11)

* **Question:** Look at this block of Sass code. What will the *final, compiled CSS* look like?
    ```scss
    $text-color: #333;

    .alert {
      border: 1px solid red;
      color: $text-color;

      &--warning {
        border-color: orange;
      }

      &:hover {
        opacity: 0.8;
      }
    }
    ```
* **Answer:**
    ```css
    .alert {
      border: 1px solid red;
      color: #333;
    }

    .alert--warning {
      border-color: orange;
    }

    .alert:hover {
      opacity: 0.8;
    }
    ```

---

### Week 6: Comprehensive Final Project

**Objective:** Build a complete, responsive, one-page portfolio website from scratch, combining *all* concepts from the 6-week course.

**Project:** "Your Name" Portfolio Page
* This will be a "skeleton" file. Your job is to fill in all the CSS rules to bring it to life, following the comments.

#### `index.html` (The Skeleton)
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
      <h1 class="hero__title">I'm [Your Name],<br>a Creative Web Developer.</h1>
      <a href="#work" class="btn-primary btn-large">View My Work</a>
    </section>

    <section id="work" class="container">
      <h2>My Work</h2>
      <div class="work-grid">
        <div class="card">
          <img src="[https://via.placeholder.com/400x250.png?text=Project+1](https://via.placeholder.com/400x250.png?text=Project+1)" alt="Screenshot of Project 1">
          <div class="card__content">
            <h3 class="card__title">Project One</h3>
            <p>A description of the project and the tech used.</p>
          </div>
        </div>
        <div class="card card--featured">
          <div class="card__badge">Featured</div>
          <img src="[https://via.placeholder.com/400x250.png?text=Project+2](https://via.placeholder.com/400x250.png?text=Project+2)" alt="Screenshot of Project 2">
          <div class="card__content">
            <h3 class="card__title">Project Two</h3>
            <p>A description of the project and the tech used.</p>
          </div>
        </div>
        <div class="card">
          <img src="[https://via.placeholder.com/400x250.png?text=Project+3](https://via.placeholder.com/400x250.png?text=Project+3)" alt="Screenshot of Project 3">
          <div class="card__content">
            <h3 class="card__title">Project Three</h3>
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
```

#### `style.css` (Your To-Do List)

```css
/* --- MODULE 10: CSS VARIABLES --- */
:root {
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Lato', sans-serif;
  --color-primary: #337ab7;
  --color-dark: #222;
  --color-light: #f4f4f4;
  --color-white: #ffffff;
  --shadow: 0 4px 8px rgba(0,0,0,0.1);
  --transition-speed: 0.3s;
}

/* --- MODULE 3 & 4: GLOBAL STYLES --- */
html {
  box-sizing: border-box;
  scroll-behavior: smooth; /* For smooth anchor link scrolling */
}
*, *::before, *::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  background-color: var(--color-white);
  color: var(--color-dark);
}

h1, h2, h3 {
  font-family: var(--font-heading);
  margin-bottom: 1rem;
}

img {
  max-width: 100%;
  display: block;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
}

/* --- MODULE 9: BUTTONS & LINKS --- */
.btn-primary {
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 700;

  /* Add transition */
  transition: all var(--transition-speed) ease-in-out;
}
.btn-primary:hover {
  /* Add hover state */
  background-color: #286090; /* A darker primary */
  transform: scale(1.05);
}

.btn-large {
  font-size: 1.2rem;
  padding: 1rem 2rem;
}

/* --- MODULE 6 & 7: HEADER & NAV --- */
#main-header {
  position: sticky;
  top: 0;
  background-color: var(--color-white);
  box-shadow: var(--shadow);
  z-index: 10;
}

#main-nav {
  /* Use Flexbox */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-links {
  /* Use Flexbox */
  display: flex;
  list-style: none;
  align-items: center;
}

.nav-links li {
  margin-left: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--color-dark);
  font-weight: 700;
  padding-bottom: 5px;
  /* Add transition for border */
  transition: border-bottom var(--transition-speed) ease;
  border-bottom: 2px solid transparent;
}

.nav-links a:hover:not(.btn-primary) {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}


/* --- MODULE 5, 7, 9: HERO SECTION --- */
.hero {
  /* Use Flexbox to center .hero-content */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 60vh;
  text-align: center;
  padding: 2rem;

  /* Background with gradient overlay */
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('[https://via.placeholder.com/1500x800.png?text=My+Background](https://via.placeholder.com/1500x800.png?text=My+Background)');
  background-size: cover;
  background-position: center;
  color: var(--color-white);
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* --- MODULE 9: ANIMATION --- */
.hero__title {
  /* Apply a fade-in animation */
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* --- MODULE 5, 8, 9, 10: WORK GRID --- */
#work {
  background-color: var(--color-light);
}
#work h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.work-grid {
  /* --- MOBILE FIRST (Module 8) --- */
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.card {
  background-color: var(--color-white);
  box-shadow: var(--shadow);
  border-radius: 8px;
  overflow: hidden; /* To contain the image */
  position: relative; /* For the badge */

  /* Add transition for hover */
  transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
}
.card:hover {
  /* Add hover effect */
  transform: scale(1.03);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.card__content {
  padding: 1.5rem;
}

/* BEM Modifier (Module 10) */
.card--featured {
  border: 2px solid var(--color-primary);
}
.card__badge {
  /* Position this "Featured" badge (Module 6) */
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 700;

  /* Add a pulse animation */
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* --- MODULE 8: RESPONSIVE MEDIA QUERIES --- */
@media (min-width: 768px) {
  /* --- TABLET --- */
  .work-grid {
    /* Change grid to 2 columns */
    grid-template-columns: 1fr 1fr;
  }

  .hero h1 {
    font-size: 4rem;
  }
}

@media (min-width: 1024px) {
  /* --- DESKTOP --- */
  .work-grid {
    /* Change grid to 3 columns */
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* --- MODULE 2 & 4: FOOTER --- */
#main-footer {
  text-align: center;
  padding: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #ddd;
  background-color: var(--color-dark);
  color: var(--color-light);
}
```
