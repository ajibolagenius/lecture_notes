# Comprehensive CSS Course for Beginners: Timetable & Content

## Course Overview

This course is designed to take absolute beginners with basic HTML knowledge to a level where they can confidently style modern, responsive websites. Every week you'll style more of **the exact same personal portfolio site** you built the semantic skeleton for in the HTML course — the same `index.html`, `about.html`, and `contact.html`, growing from plain black-and-white text into a fully responsive, animated, professional site. By Week 6, you'll deploy the finished, styled version to the same live URL.

* **Target Audience:** Students who have completed the HTML course (or have equivalent knowledge of semantic HTML, forms, and basic accessibility).
* **Tools:** A code editor (VS Code recommended), a modern browser with dev tools (Chrome/Firefox), Google Fonts.
* **Goal:** By the end of this course, students will be able to independently style any semantic HTML page — using the Box Model, Flexbox, Grid, responsive media queries, and modern polish techniques (variables, transitions, animations, BEM) — and will have a fully styled, deployed portfolio site to show for it.

---

## Week 1: The Fundamentals

### Module 1: Introduction to CSS (The "What" and "Why")

* **Learning Objectives:**
    * Explain what CSS is and its role in web development.
    * Implement CSS in a web page using inline, internal, and external methods.
    * Read and write basic CSS syntax (selectors, properties, values).
    * Use CSS comments effectively.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is CSS?** | 30 mins | 15 mins |
| Role of CSS (Structure vs. Presentation). | - Lecture: Relationship between HTML & CSS. | - "Before & After" look at your own unstyled `index.html`. |
| **How to Add CSS** | 45 mins | 30 mins |
| Inline (`style` attribute) | - Pros and cons of each method. | - Create `portfolio/style.css`. |
| Internal (`<style>` tag) | - Setting up the file structure. | - Link it from all 3 of your portfolio pages. |
| External (`<link>` tag) | - The clear winner: External sheets. | - Confirm one shared stylesheet controls all 3 pages. |
| **Basic CSS Syntax** | 30 mins | 30 mins |
| The "Rule": Selector { Property: Value; } | - Anatomy of a CSS rule. | - Write your first rules: style `body`, `#page-title`, `.section-heading`. |
| Comments `/* ... */` | - How to comment. | - Add comments labeling each section of your stylesheet. |

### Module 2: Selectors and The Cascade (The "How")

* **Learning Objectives:**
    * Target any HTML element using type, class, and ID selectors.
    * Combine selectors to apply styles to multiple elements or create specific rules.
    * Explain the concepts of "The Cascade" and "Specificity" at a basic level.
    * Predict which CSS rule will be applied to an element.
    * Understand how `inheritance` works.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Basic Selectors** | 45 mins | 30 mins |
| Type (`p`, `h2`, `div`) | - When to use each selector. | - Style all `<p>` tags site-wide, then override `.bio` specifically. |
| Class (`.section-heading`) | - The power of classes. | - Style every `.section-heading` (the class already on your `<h2>`s from HTML Week 1) with one rule. |
| ID (`#page-title`) | - Class vs. ID. | - Style your `<h1 id="page-title">` uniquely. |
| **Grouping & Chaining** | 30 mins | 15 mins |
| Grouping (`h1, h2, h3`) | - How to be efficient. | - Group all heading elements to share a font. |
| Chaining (`p.bio`) | - How to be specific. | - Chain a tag and class selector on your bio paragraph. |
| **The Cascade & Specificity** | 45 mins | 30 mins |
| How browsers read CSS. | - Lecture: The "tie-breaking" rules. | - Add `project-card`/`project-title`/`project-description` classes to your real Featured Work `<article>`s (foreshadowed back in HTML Week 1) and create a specificity conflict to resolve. |
| Specificity hierarchy (ID > Class > Type) | - Calculating specificity. | - Predict which rule will "win." |
| `!important` | - Why and when (not) to use it. | - (Briefly) Use `!important` to override a style, then remove it. |
| **Inheritance** | 30 mins | 15 mins |
| What is inherited (e.g., `font-family`). | - Properties that inherit vs. those that don't. | - Set a `font-family` on `<body>` and watch all 3 pages inherit it. |

**Week 1 Assignment:** Wire up your portfolio's stylesheet.
* Create `portfolio/style.css` and link it from `index.html`, `about.html`, and `contact.html`.
* Style `body`, `#page-title`, and every `.section-heading` and `.bio`.
* Add `project-card` / `project-title` / `project-description` classes to your real Featured Work articles.
* Use comments to label sections of your CSS.

---

## Week 2: The Core Concept: The Box Model

### Module 3: The Box Model & Dimensions

* **Learning Objectives:**
    * Define and visualize the four layers of the box model (Content, Padding, Border, Margin).
    * Confidently use `padding` and `margin` to create space.
    * Apply various `border` styles.
    * Control element dimensions using `width` and `height`.
    * Use `box-sizing: border-box` to create more predictable layouts.
    * Differentiate between `block`, `inline`, and `inline-block` elements.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Visualizing the Box Model** | 45 mins | 30 mins |
| Every element is a box. | - Using browser dev tools to inspect the box model. | - Inspect your own `.project-card` and `#page-title` in dev tools. |
| **The Four Layers** | 1 hour | 45 mins |
| `padding` | - Space *inside* the border. | - Add `padding` inside each `.project-card`. |
| `border` | - `border-width`, `border-style`, `border-color`. | - Add a subtle `border` and `border-radius` to each card. |
| `margin` | - Space *outside* the border. | - Add `margin` between stacked project cards. |
| Shorthand properties | - `padding: 10px 20px;` | - Refactor styles to use shorthand. |
| **Controlling Dimensions** | 45 mins | 30 mins |
| `width` and `height` | - Fixed vs. percentage-based widths. | - Give `.project-card` a `width`, then see what overflow does to the image inside it. |
| `max-width` | - A key for responsive design. | - Use `max-width: 100%` on every project image (the fluid image trick). |
| `aspect-ratio` | - Preventing layout shift while images load. | - Add `aspect-ratio` + `object-fit: cover` to every project image. |
| **`box-sizing: border-box`** | 30 mins | 30 mins |
| The "old" way vs. the "new" way. | - Why `border-box` is essential. | - Apply the universal `border-box` reset to your whole stylesheet. |
| **The `display` Property** | 1 hour | 45 mins |
| `display: block` | - Takes up its own line. | - Observe your `<article>` and `<p>` (block). |
| `display: inline` | - Flows with text. | - Observe your nav `<a>` links and footer `<span>`s (inline). |
| `display: inline-block` | - Best of both worlds. | - Use it if you need a project tag/pill to sit inline but take padding. |

**Week 2 Assignment:** Give your project cards real shape.
* Apply `box-sizing: border-box` globally.
* Style every `.project-card` with `padding`, `border`, `border-radius`, and `margin` between cards.
* Ensure every project image uses `max-width: 100%; height: auto;` plus `aspect-ratio` so it never overflows its card or shifts layout while loading.
* Center any single-card sections with `margin: 0 auto`.

---

## Week 3: Styling Content

### Module 4: Styling Text and Fonts

* **Learning Objectives:**
    * Control all common font properties (`color`, `size`, `family`, `weight`).
    * Use relative units (`em`, `rem`) for font sizes.
    * Format text alignment, decoration, and line height.
    * Embed custom fonts from services like Google Fonts.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Basic Font Styling** | 45 mins | 30 mins |
| `color` | - `font-family` and "font stacks". | - Style all text across your 3 pages. |
| `font-size` (px vs. em vs. rem) | - `font-weight` and `font-style`. | - Set a base `font-size` on `html` in `rem`. |
| `rem` vs `em` | - The benefits of relative units. | - Size your headings and body text using `rem`. |
| `clamp()` for fluid type | - Min/preferred/max in one line, no media queries. | - Make `#page-title` fluid with `clamp()`. |
| **Text Formatting** | 30 mins | 30 mins |
| `text-align` | - `text-decoration` | - Remove the underline from your nav links; center your `#page-title`. |
| `line-height` | - `letter-spacing` / `word-spacing` | - Increase `line-height` on your `.bio` and project descriptions for readability. |
| **Using Web Fonts** | 30 mins | 30 mins |
| `@import` / `<link>` from Google Fonts. | - How to find and embed fonts. | - Go to Google Fonts, select a heading font and a body font. |
| Applying `font-family` | - Setting fallback fonts. | - Implement them across `index.html`, `about.html`, and `contact.html`. |

### Module 5: Colors and Backgrounds

* **Learning Objectives:**
    * Write colors using keywords, HEX, RGB, and RGBA.
    * Set background colors and images.
    * Control background image properties like `size`, `position`, and `repeat`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Color Definitions** | 45 mins | 30 mins |
| Keywords (e.g., `red`) | - HEX (`#FF0000`) | - Change all your colors to use HEX codes. |
| RGB (`rgb(255, 0, 0)`) | - RGBA (`rgba(255, 0, 0, 0.5)`) | - Add a semi-transparent RGBA overlay behind your `#page-title`. |
| Contrast Checking | - WCAG's 4.5:1 minimum for body text. | - Run every text/background pair through a contrast checker before locking it in. |
| **Background Properties** | 1 hour | 45 mins |
| `background-color` | - `background-image` | - Set a `background-color` for `<body>`. |
| `background-size` (`cover`, `contain`) | - `background-position` | - Give your `<header>` a subtle background. |
| `background-repeat` | - `background-attachment` (`fixed`) | - Experiment with `background-size: cover` vs. `contain`. |
| Shorthand | - The `background` shorthand. | - Add a "Featured" `<span class="badge">` to one project's title and style it with a background color. |

**Week 3 Assignment:** Style your content.
* Load two Google Fonts (a heading font, a body font) and apply them site-wide.
* Set a readable `line-height` and `rem`-based type scale, with `#page-title` made fluid via `clamp()`.
* Change every color in your stylesheet to HEX or RGB(A), each pair checked against a 4.5:1 contrast minimum.
* Add a "Featured" badge `<span>` to one project card's title, styled with `background-color`, `color`, `padding`, and `border-radius`.

---

## Week 4: Layout (Part 1)

### Module 6: CSS Layout (The Old Way)

* **Learning Objectives:**
    * Explain the "document flow".
    * Use the `position` property (`relative`, `absolute`, `fixed`, `sticky`) to place elements.
    * Understand the "nearest positioned ancestor" concept for `absolute` positioning.
    * Use `float` to wrap text around an image.
    * Use the "clearfix" hack to contain floats.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The `position` Property** | 1.5 hours | 1 hour |
| `static` (default) | - How `position` breaks document flow. | - Inspect your `<header>` and `.project-card` — both are currently `static`. |
| `relative` | - `relative` vs. `absolute`. | - Set `.project-card` to `position: relative`. |
| `absolute` | - "Nearest positioned ancestor". | - Position your Week 3 "Featured" badge `absolute`, in the top-right corner *of its card*. |
| `fixed` | - `fixed` vs. `absolute`. | - (Briefly) Discuss when you'd use `position: fixed` (e.g., a cookie banner). |
| `sticky` | - The modern "sticky" nav. | - Make your `<header>` `position: sticky` so it stays visible while scrolling. |
| **Floating Elements** | 45 mins | 45 mins |
| `float: left` / `right` | - How floats were used for columns. | - (Lecture only) See how `float: left` wraps text around an image. |
| The `clear` property | - The "clearfix" hack. | - (Lecture only) Understand why modern layout uses Flexbox/Grid instead. |

### Module 7 (Partial): Modern Layout with Flexbox

* **Learning Objectives:**
    * Define Flexbox and its use case (1-dimensional layout).
    * Create a "flex container" using `display: flex`.
    * Control the main axis direction using `flex-direction`.
    * Align items on the main axis using `justify-content`.
    * Align items on the cross axis using `align-items`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Intro to Flexbox** | 45 mins | 30 mins |
| Main Axis & Cross Axis | - 1-dimensional layout. | - Turn your `<header>` into a flex container. |
| `display: flex` | - The Flex Container vs. Flex Items. | - Watch your logo/`#page-title` and `<nav>` line up in a row. |
| **Flex Container Properties** | 1 hour | 45 mins |
| `flex-direction` (`row`, `column`) | - Changing the Main Axis. | - Keep `row` for the header. |
| `justify-content` | - `flex-start`, `center`, `flex-end`, `space-between`, `space-around`. | - Use `space-between` to push your title left and nav right. |
| `align-items` | - `flex-start`, `center`, `flex-end`, `stretch`. | - Use `center` to vertically align them. |
| `flex-wrap` (`wrap`) | - How to handle overflowing items. | - Turn your nav `<ul>` into a flex row too, and add `flex-wrap: wrap` for small screens. |

**Week 4 Assignment:** Style the site header and position the Featured badge.
* Turn your `<header>` into a Flex container: `justify-content: space-between`, `align-items: center`, so your name/logo sits left and nav sits right.
* Make the `<header>` `position: sticky` so it stays at the top while scrolling.
* Turn your `<nav>`'s `<ul>` into a flex row using Flexbox.
* Position your "Featured" badge `absolute`, relative to its `.project-card` (which you set to `position: relative`).

---

## Week 5: Layout (Part 2) & Responsive Design

### Module 7 (Continued): Advanced Flexbox & CSS Grid

* **Learning Objectives:**
    * Control individual "flex items" using `flex-grow`, `flex-shrink`, and `flex-basis`.
    * Define CSS Grid and its use case (2-dimensional layout).
    * Create a "grid container" using `display: grid`.
    * Define columns and rows using `grid-template-columns` and `grid-template-rows`.
    * Use the `fr` unit for flexible grid tracks.
    * Control spacing with `gap`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Flex Items** | 45 mins | 30 mins |
| `flex-grow` | - How items can "grow" to fill space. | - Let your `#page-title` grow to fill space between a logo and nav, if you have both. |
| `flex-shrink` | - How items shrink. | - Keep your nav "rigid" with `flex-shrink: 0`. |
| `flex-basis` | - The default size. | - (Briefly) `flex` shorthand. |
| **Intro to CSS Grid** | 1 hour | 45 mins |
| 2-dimensional layout | - Grid vs. Flexbox. | - Turn your Featured Work `<section>`'s container into a grid. |
| `display: grid` | - Grid Container vs. Grid Items. | - Apply `display: grid` to the Featured Work wrapper. |
| **Defining the Grid** | 1 hour | 45 mins |
| `grid-template-columns` | - Using `px`, `%`, `auto`, and `fr`. | - Set `1fr` columns for your project cards. |
| `grid-template-rows` | - The `repeat()` function. | - Refactor with `repeat()`. |
| `gap` (`grid-gap`) | - `column-gap`, `row-gap`. | - Add a `gap` between your project cards, replacing the Week 2 margin hack. |
| **Placing Items** | 45 mins | 30 mins |
| `grid-column` | - `grid-row` | - (Briefly) Make your "Featured" project's card span 2 columns on desktop. |
| **A Fluid Alternative** | 30 mins | 30 mins |
| `repeat(auto-fit, minmax(250px, 1fr))`. | - Why real teams often reach for this over fixed breakpoints. | - Compare it against your breakpoint version at an in-between width. |

### Module 8 (Partial): Responsive Design

* **Learning Objectives:**
    * Explain "Responsive Design" and the "Mobile-First" approach.
    * Confirm the viewport meta tag is present.
    * Write a basic media query to change styles based on screen width.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Responsive Concepts** | 45 mins | 30 mins |
| Mobile-First vs. Desktop-First | - Why "Mobile-First" is the standard. | - Confirm the viewport meta tag from HTML Week 1 is on all 3 pages. |
| The Viewport Meta Tag | - `max-width: 100%` for images. | - Re-check every image uses the fluid image trick. |
| **Media Queries** | 1 hour | 45 mins |
| `@media` rule syntax | - `min-width` (Mobile-First) | - Default: 1-column grid for Featured Work. |
| Breakpoints | - `max-width` (Desktop-First) | - `@media (min-width: 600px)`: 2 columns. |
| | | - `@media (min-width: 900px)`: 3 columns. |
| **Container Queries** | 45 mins | 30 mins |
| `container-type: inline-size` + `@container`. | - Responding to a container's width, not the viewport's. | - Make `.project-card`'s internal layout respond to `.work-grid`'s width via `@container`. |

**Week 5 Assignment:** Make your portfolio responsive.
* Turn your Featured Work section into a CSS Grid: single column by default, 2 columns at `min-width: 600px`, 3 columns at `min-width: 900px`.
* Confirm your contact form and about page also read comfortably on a narrow (mobile) viewport — adjust padding/font-size inside a media query if needed.
* Bonus: compare against an `auto-fit`/`minmax()` version, and add one `@container` query on `.project-card`.
* Submit screenshots of all 3 pages at mobile, tablet, and desktop widths.

---

## Week 6: Advanced Polish & Modern Workflow

### Module 9: Interactivity: Transitions, Transforms & Animations

* **Learning Objectives:**
    * Use pseudo-classes (`:hover`, `:active`, `:focus`) to add interactivity.
    * Use pseudo-elements (`::before`, `::after`) to add decorative content.
    * Use `transform` to move, scale, and rotate elements.
    * Create smooth, animated effects using the `transition` property.
    * Build complex, multi-step animations using `@keyframes`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Pseudo-Classes** | 45 mins | 30 mins |
| `:hover`, `:active`, `:focus`, `:focus-visible` | - Responding to user state; why `:focus-visible` beats `:focus` for click vs. keyboard. | - Add a `:hover` effect and a `:focus-visible` outline to your `.project-card`s and nav links. |
| `:nth-child` | - Targeting specific children. | - Zebra-stripe the rows of your "Skills & Experience" table. |
| **Pseudo-Elements** | 30 mins | 30 mins |
| `::before` & `::after` | - The `content: ""` property. | - Use `::before` to add a decorative mark to your `.bio` or a blockquote. |
| **CSS Transitions & Transforms** | 45 mins | 30 mins |
| `transition` property | - `transform`: `scale()`, `rotate()`, `translate()` | - Add a `transition` to every `.project-card` and nav link. |
| The `transition` shorthand | - `ease-in-out` | - Make cards lift (`transform: scale(1.03)`) on `:hover`. |
| **CSS Animations** | 45 mins | 30 mins |
| `animation` property | - Defining `@keyframes` (the "story") | - Add a pulsing glow `@keyframes` animation to your "Featured" badge. |
| `animation-duration` | - `animation-iteration-count` | - Fade in `#page-title` on page load. |
| `prefers-reduced-motion` | - Respecting an OS-level accessibility preference. | - Wrap both animations in `@media (prefers-reduced-motion: reduce)`. |

### Module 10: Advanced Selectors & Best Practices

* **Learning Objectives:**
    * Declare and use CSS Variables (Custom Properties) to manage styles.
    * Use advanced selectors to write cleaner, more efficient CSS.
    * Understand the importance of code organization and naming conventions (like BEM).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **CSS Variables** | 30 mins | 30 mins |
| Declaring (`:root { --main-color: ... }`) | - Why they are essential for large projects. | - Refactor your entire site's colors, fonts, and spacing into CSS variables. |
| Using (`var(--main-color)`) | - Global vs. Local scope. | - Change your whole site's theme by editing one variable. |
| **Dark Mode** | 30 mins | 30 mins |
| `@media (prefers-color-scheme: dark)`. | - Why CSS variables (not Sass variables) make this possible. | - Ship a real dark mode by overriding your `:root` variables; re-check contrast. |
| **Advanced Selectors** | 45 mins | 30 mins |
| Attribute Selectors `[type="email"]` | - `[data-state="active"]` | - Style your contact form's `input[type="email"]` differently from `input[type="text"]`. |
| Sibling Combinators `+` and `~` | - `h2 + p` (Adjacent Sibling) | - Select the first `<p>` after each `.section-heading`. |
| `:not()`, `:focus-within`, and `:has()` | - `:not(.project-card--featured)`; `:has()` as a "parent selector". | - Highlight your contact form's `<fieldset>` with `:focus-within`; select a card via `:has()`. |
| **Best Practices (BEM)** | 30 mins | 15 mins |
| Naming conventions | - Block (`.project-card`), Element (`.project-card__title`) | - Refactor `.project-card`/`.project-title`/`.project-description` into BEM: `.project-card__title`, `.project-card__description`, `.project-card--featured`. |
| Browser Dev Tools (Computed) | - Modifier (`.project-card--featured`) | - Debug a specificity problem using the "Computed" tab. |
| **Native CSS Nesting** | 30 mins | 30 mins |
| Nesting selectors with `&`, no compiler needed. | - How it pairs with BEM to mirror your HTML structure. | - Rewrite your `.project-card` rules nested, using `&`. |

### Module 11: Beyond CSS: Intro to Sass/SCSS

* **Learning Objectives:**
    * Understand what a CSS Preprocessor is and why it's used.
    * Write basic Sass/SCSS syntax.
    * Understand how Nesting and Sass Variables work.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is Sass/SCSS?** | 30 mins | 15 mins |
| "CSS with superpowers" | - How it actually compiles in a real project (Dart Sass CLI, Vite/webpack, or a framework) — and checking caniuse.com before using any new feature. | - (Lecture) See your `style.css` rewritten as `.scss`. |
| **Sass Variables** | 15 mins | 15 mins |
| `$primary-color: #333` | - Sass variables vs. CSS variables. | - (Bonus, optional) Convert your `:root` variables to Sass variables. |
| **Nesting Selectors** | 30 mins | 30 mins |
| How nesting keeps code DRY. | - The `&` (parent) selector; why native nesting (Module 10) is now the default choice for new projects. | - (Bonus, optional) Rewrite `.project-card` in Sass nesting. |
| **Basic Mixins** | 30 mins | 15 mins |
| `@mixin` and `@include` | - Reusing blocks of styles (e.g., flex-center). | - (Bonus, optional) Create a `@mixin` for your button style. |
| **Scaling CSS & Utility Frameworks** | 30 mins | — |
| Splitting one stylesheet into partials/scoped components. | - Utility-first frameworks (Tailwind) as an alternative way to apply the same Box Model/Flexbox/Grid knowledge. | - (Lecture-only) No exercise — awareness for your next project. |

**Week 6 / Final Project:** Finish and deploy your fully styled portfolio.
* **Goal:** Combine everything you've learned into one polished, responsive, three-page site — the same `index.html`, `about.html`, and `contact.html` from the HTML course, now fully styled.
* **Requirements:**
    * Must be **Mobile-First**, with your Week 5 grid and breakpoints intact.
    * Must use **CSS Variables** for all colors, fonts, and spacing — including a working **dark mode** via `prefers-color-scheme`.
    * Must use **BEM** naming for your project cards.
    * Must include **`:hover` transitions** on cards, buttons, and links, plus **`:focus-visible`** (not `:focus`) styling.
    * Must include at least one **`@keyframes` animation**, wrapped in `prefers-reduced-motion`.
    * Must use at least one **advanced selector** (e.g., `h2 + p`, `:focus-within`, `:has()`).
    * Redeploy the updated, now fully-styled site to the same live URL from HTML Week 7.
