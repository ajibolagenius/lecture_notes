# Comprehensive CSS Course for Beginners: Timetable & Content

## Course Overview

This course is designed to take absolute beginners with basic HTML knowledge to a level where they can confidently style modern, responsive websites. The course covers fundamental concepts, layout techniques (including Flexbox and Grid), and advanced best practices.

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
| Role of CSS (Structure vs. Presentation). | - Lecture: Relationship between HTML & CSS. | - "Before & After" analysis of a simple HTML page. |
| **How to Add CSS** | 45 mins | 30 mins |
| Inline (`style` attribute) | - Pros and cons of each method. | - Create an HTML file. |
| Internal (`<style>` tag) | - Setting up the file structure. | - Style elements using all three methods. |
| External (`<link>` tag) | - The clear winner: External sheets. | - Refactor all styles into one external `.css` file. |
| **Basic CSS Syntax** | 30 mins | 30 mins |
| The "Rule": Selector { Property: Value; } | - Anatomy of a CSS rule. | - Write your first 5 CSS rules (e.g., change color, font size of `h1`, `p`). |
| Comments `/* ... */` | - How to comment. | - Add comments to the stylesheet. |

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
| Type (`p`, `h2`, `div`) | - When to use each selector. | - Style all paragraphs, a specific `h2`, and a main wrapper `div`. |
| Class (`.button`) | - The power of classes. | - Create a "button" class and apply it to an `<a>` tag and a `<button>` tag. |
| ID (`#main-header`) | - Class vs. ID. | - Give your header an ID and style it uniquely. |
| **Grouping & Chaining** | 30 mins | 15 mins |
| Grouping (`h1, h2, h3`) | - How to be efficient. | - Group all heading elements to have the same font. |
| Chaining (`p.intro`) | - How to be specific. | - Chain a tag and class selector. |
| **The Cascade & Specificity** | 45 mins | 30 mins |
| How browsers read CSS. | - Lecture: The "tie-breaking" rules. | - Create conflicting CSS rules (e.g., an ID vs. a class targeting the same element). |
| Specificity hierarchy (ID > Class > Type) | - Calculating specificity. | - Predict which rule will "win." |
| `!important` | - Why and when (not) to use it. | - (Briefly) Use `!important` to override a style. |
| **Inheritance** | 30 mins | 15 mins |
| What is inherited (e.g., `font-family`). | - Properties that inherit vs. those that don't. | - Set a `font-family` on the `<body>` and watch all text elements inherit it. |

**Week 1 Assignment:** Build a simple "About Me" page.
* Create a single HTML file and a single CSS file.
* Use `h1`, `h2`, `p`, and `ul` elements.
* Apply styles using Type, Class, and ID selectors.
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
| Every element is a box. | - Using browser dev tools to inspect the box model. | - Use dev tools to inspect the `h1` and `p` tags from last week's homework. |
| **The Four Layers** | 1 hour | 45 mins |
| `padding` | - Space *inside* the border. | - Create a `div` "box". Add content. |
| `border` | - `border-width`, `border-style`, `border-color`. | - Add a `10px` `padding` and a `2px solid red` `border`. |
| `margin` | - Space *outside* the border. | - Add a `20px` `margin`. |
| Shorthand properties | - `padding: 10px 20px;` | - Refactor styles to use shorthand. |
| **Controlling Dimensions** | 45 mins | 30 mins |
| `width` and `height` | - Fixed vs. percentage-based widths. | - Set a `width` and `height` on your box. See what happens when the content overflows. |
| `max-width` | - A key for responsive design. | - Change `width` to `max-width` and resize the browser. |
| **`box-sizing: border-box`** | 30 mins | 30 mins |
| The "old" way vs. the "new" way. | - Why `border-box` is essential. | - Create two boxes with identical `width`, `padding`, and `border`. Apply `box-sizing: border-box` to one and observe the difference. |
| **The `display` Property** | 1 hour | 45 mins |
| `display: block` | - Takes up its own line. | - Observe `div` and `p` (block). |
| `display: inline` | - Flows with text. | - Observe `span` and `a` (inline). Test `width`/`height` (won't work). |
| `display: inline-block` | - Best of both worlds. | - Create three `div`s. Set them to `inline-block` to create a row of items. |

**Week 2 Assignment:** Build a "Recipe Card".
* Create a single card `div` (`.recipe-card`).
* Inside, add an `img`, an `h2` (title), and a `p` (description).
* Use `padding` to give the content space *inside* the card.
* Use `margin` to center the card on the page (`margin: 20px auto;`).
* Add a `border` and a `border-radius` to the card.
* Give the `img` a `max-width: 100%` so it fits in the card.
* Set the card to `width: 400px` and apply `box-sizing: border-box`.

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
| `color` | - `font-family` and "font stacks". | - Style all text on your recipe card. |
| `font-size` (px vs. em vs. rem) | - `font-weight` and `font-style`. | - Set a base `font-size` on `html` in `rem`. |
| `rem` vs `em` | - The benefits of relative units. | - Set `h2` and `p` sizes using `rem`. |
| **Text Formatting** | 30 mins | 30 mins |
| `text-align` | - `text-decoration` | - Center the `h2` text. |
| `line-height` | - `letter-spacing` / `word-spacing` | - Increase the `line-height` of the `p` for readability. |
| **Using Web Fonts** | 30 mins | 30 mins |
| `@import` / `<link>` from Google Fonts. | - How to find and embed fonts. | - Go to Google Fonts, select two fonts (a heading font and a body font). |
| Applying `font-family` | - Setting fallback fonts. | - Implement them in your stylesheet. |

### Module 5: Colors and Backgrounds

* **Learning Objectives:**
    * Write colors using keywords, HEX, RGB, and RGBA.
    * Set background colors and images.
    * Control background image properties like `size`, `position`, and `repeat`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Color Definitions** | 45 mins | 30 mins |
| Keywords (e.g., `red`) | - HEX (`#FF0000`) | - Change all your colors to use HEX codes. |
| RGB (`rgb(255, 0, 0)`) | - RGBA (`rgba(255, 0, 0, 0.5)`) | - Add a semi-transparent RGBA color overlay to an image. |
| **Background Properties** | 1 hour | 45 mins |
| `background-color` | - `background-image` | - Set a `background-color` for the `<body>`. |
| `background-size` (`cover`, `contain`) | - `background-position` | - Add a large `background-image` to the `body`. |
| `background-repeat` | - `background-attachment` (`fixed`) | - Make the image `cover` the whole page and not repeat. |
| Shorthand | - The `background` shorthand. | - Experiment with `background-size: cover` vs. `contain`. |

**Week 3 Assignment:** Enhance the "Recipe Card".
* Integrate two new fonts from Google Fonts.
* Set a `line-height` on the description text.
* Give the `<body>` a subtle `background-color` or a full-page `background-image` (using `background-size: cover`).
* Change all colors to use HEX or RGB.
* Create a "badge" `span` inside the `h2` (e.g., "New!") and style it with a `background-color`, `color`, `padding`, and `border-radius`.

---

## Week 4: Layout (Part 1)

### Module 6: CSS Layout (The Old Way)

* **Learning Objectives:**
    * Explain the "document flow".
    * Use the `position` property (`relative`, `absolute`, `fixed`) to place elements.
    * Understand the "nearest positioned ancestor" concept for `absolute` positioning.
    * Use `float` to wrap text around an image.
    * Use the "clearfix" hack to contain floats.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The `position` Property** | 1.5 hours | 1 hour |
| `static` (default) | - How `position` breaks document flow. | - Create a "parent" `div` and three "child" `div`s. |
| `relative` | - `relative` vs. `absolute`. | - Set parent to `position: relative`. |
| `absolute` | - "Nearest positioned ancestor". | - Set one child to `position: absolute` and position it in the top-right corner *of the parent*. |
| `fixed` | - `fixed` vs. `absolute`. | - Create a "cookie banner" at the bottom of the page using `position: fixed`. |
| `sticky` | - The modern "sticky" nav. | - (Briefly) Make a navigation bar `position: sticky`. |
| **Floating Elements** | 45 mins | 45 mins |
| `float: left` / `right` | - How floats were used for columns. | - Create an article with an `img` and `p`. Use `float: left` on the image to make text wrap around it. |
| The `clear` property | - The "clearfix" hack. | - Add a "footer" after the article. See how it wraps incorrectly. Apply `clear: both` to fix it. |

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
| Main Axis & Cross Axis | - 1-dimensional layout. | - Create a container with 3 boxes. |
| `display: flex` | - The Flex Container vs. Flex Items. | - Apply `display: flex` and watch them form a row. |
| **Flex Container Properties** | 1 hour | 45 mins |
| `flex-direction` (`row`, `column`) | - Changing the Main Axis. | - Switch between `row` and `column`. |
| `justify-content` | - `flex-start`, `center`, `flex-end`, `space-between`, `space-around`. | - Try all 5 `justify-content` properties. |
| `align-items` | - `flex-start`, `center`, `flex-end`, `stretch`. | - Give the boxes different heights. Try all 4 `align-items` properties. |
| `flex-wrap` (`wrap`) | - How to handle overflowing items. | - Add 10 boxes to the container. Apply `flex-wrap: wrap`. |

**Week 4 Assignment:** Build a Website Header.
* Create a `<header>` element.
* Inside, add a logo (can be text or an `img`) and a `<nav>` with a `ul` of links.
* Use **Flexbox** (`display: flex`, `justify-content: space-between`, `align-items: center`) on the `<header>` to space out the logo and the nav.
* Use **Flexbox** on the `ul` to turn the list items into a horizontal navigation bar.
* Use `position: absolute` to add a "Sale" badge to one of the nav links.

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
| `flex-grow` | - How items can "grow" to fill space. | - In your 3-box container, give the middle box `flex-grow: 1`. |
| `flex-shrink` | - How items shrink. | - Give one box `flex-shrink: 0`. |
| `flex-basis` | - The default size. | - (Briefly) `flex` shorthand. |
| **Intro to CSS Grid** | 1 hour | 45 mins |
| 2-dimensional layout | - Grid vs. Flexbox. | - Create a container with 6 items. |
| `display: grid` | - Grid Container vs. Grid Items. | - Apply `display: grid`. (Won't look like much yet). |
| **Defining the Grid** | 1 hour | 45 mins |
| `grid-template-columns` | - Using `px`, `%`, `auto`, and `fr`. | - Set `grid-template-columns: 1fr 1fr 1fr;`. (Instant 3-column layout). |
| `grid-template-rows` | - The `repeat()` function. | - Refactor: `repeat(3, 1fr)`. |
| `gap` (`grid-gap`) | - `column-gap`, `row-gap`. | - Add a `gap: 20px;` between items. |
| **Placing Items** | 45 mins | 30 mins |
| `grid-column` | - `grid-row` | - Make the first item span all 3 columns (`grid-column: 1 / -1;`). |
| `grid-area` | - Naming areas (briefly). | - Re-create the same layout by placing items by line number. |

### Module 8 (Partial): Responsive Design

* **Learning Objectives:**
    * Explain "Responsive Design" and the "Mobile-First" approach.
    * Implement the viewport meta tag.
    * Write a basic media query to change styles based on screen width.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Responsive Concepts** | 45 mins | 30 mins |
| Mobile-First vs. Desktop-First | - Why "Mobile-First" is the standard. | - Set up an HTML file with the viewport meta tag. |
| The Viewport Meta Tag | - `max-width: 100%` for images. | - Add an image and ensure it's fluid. |
| **Media Queries** | 1 hour | 45 mins |
| `@media` rule syntax | - `min-width` (Mobile-First) | - Create a box. Default `background-color: blue;`. |
| Breakpoints | - `max-width` (Desktop-First) | - Write a media query: `@media (min-width: 768px) { ... }` |
| | | - Inside the query, change the box's `background-color: red;`. Resize the browser to test. |

**Week 5 Assignment:** Build a Responsive Grid Gallery.
* Create a photo gallery with 9 items.
* By default (mobile), make it a **single-column** layout (Hint: `grid-template-columns: 1fr;`).
* Use a media query (`min-width: 600px`) to change it to a **2-column** layout (`grid-template-columns: 1fr 1fr;`).
* Use a second media query (`min-width: 900px`) to change it to a **3-column** layout (`grid-template-columns: 1fr 1fr 1fr;`).
* Combine this with your header from last week.

---

## Week 6: Advanced Polish & Modern Workflow

### Module 9: Interactivity: Transitions, Transforms & Animations

* **Learning Objectives:**
    * Use pseudo-classes (`:hover`, `:active`, `:focus`) to add interactivity.
    * Use pseudo-elements (`::before`, `::after`) to add decorative content.
    * Use `transform` to move, scale, and rotate elements.
    * Create smooth, animated effects using the `transition` property.
    * **(New)** Build complex, multi-step animations using `@keyframes`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Pseudo-Classes** | 45 mins | 30 mins |
| `:hover`, `:active`, `:focus` | - Responding to user state. | - Create a button. Change its `background-color` on `:hover`. |
| `:nth-child` | - Targeting specific children. | - Style all `odd` list items ("zebra striping"). |
| **Pseudo-Elements** | 30 mins | 30 mins |
| `::before` & `::after` | - The `content: ""` property. | - Use `::before` on a blockquote to add a decorative quotation mark. |
| **CSS Transitions & Transforms** | 45 mins | 30 mins |
| `transition` property | - `transform`: `scale()`, `rotate()`, `translate()` | - Add a `transition` to your button. |
| The `transition` shorthand | - `ease-in-out` | - Make the button `scale(1.05)` on `:hover`. |
| **CSS Animations** | 45 mins | 30 mins |
| `animation` property | - Defining `@keyframes` (the "story") | - Create a pulsing "glow" effect on a "featured" badge. |
| `animation-duration` | - `animation-iteration-count` | - Make a heading fade in on page load. |

### Module 10: Advanced Selectors & Best Practices

* **Learning Objectives:**
    * Declare and use CSS Variables (Custom Properties) to manage styles.
    * Use advanced selectors to write cleaner, more efficient CSS.
    * Understand the importance of code organization and naming conventions (like BEM).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **CSS Variables** | 30 mins | 30 mins |
| Declaring (`:root { --main-color: ... }`) | - Why they are essential for large projects. | - Refactor your project's main colors into CSS variables. |
| Using (`var(--main-color)`) | - Global vs. Local scope. | - Change the theme of your site by changing one variable. |
| **Advanced Selectors** | 45 mins | 30 mins |
| Attribute Selectors `[href$=".pdf"]` | - `[data-state="active"]` | - Style all links that go to a PDF file differently. |
| Sibling Combinators `+` and `~` | - `h2 + p` (Adjacent Sibling) | - Select *only* the first paragraph after a heading. |
| `:not()` and `:focus-within` | - `:not(.special)` | - Style a form when *any* of its inputs are focused. |
| **Best Practices (BEM)** | 30 mins | 15 mins |
| Naming conventions | - Block (`.card`), Element (`.card__title`) | - Review a BEM example. |
| Browser Dev Tools (Computed) | - Modifier (`.card--featured`) | - Debug a specificity problem using the "Computed" tab. |

### Module 11: Beyond CSS: Intro to Sass/SCSS

* **Learning Objectives:**
    * Understand what a CSS Preprocessor is and why it's used.
    * Write basic Sass/SCSS syntax.
    * Understand how Nesting and Sass Variables work.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is Sass/SCSS?** | 30 mins | 15 mins |
| "CSS with superpowers" | - The "compilation" step. | - (Lecture) Show a `style.scss` file compiling to `style.css`. |
| **Sass Variables** | 15 mins | 15 mins |
| `$primary-color: #333` | - Sass variables vs. CSS variables. | - Convert `:root` variables to Sass variables. |
| **Nesting Selectors** | 30 mins | 30 mins |
| How nesting keeps code DRY. | - The `&` (parent) selector. | - Rewrite a BEM component (`.card`, `.card__title`) using Sass nesting. |
| **Basic Mixins** | 30 mins | 15 mins |
| `@mixin` and `@include` | - Reusing blocks of styles (e.g., flex-center). | - Create a `@mixin` for a button style. |

**Week 6 / Final Project (Updated):** Build a Responsive Portfolio Homepage.
* **Goal:** Combine everything you have learned.
* **Sections:**
    1.  **Header:** A responsive navigation bar (use Flexbox). Make it `sticky`.
    2.  **Hero Section:** A full-width section with a title, a short bio, and a "Contact Me" button.
    3.  **"My Work" Section:** A 3-column grid of your "projects" (use CSS Grid).
    4.  **About Section:** A 2-column layout (use Flexbox or Grid) with an image and text.
    5.  **Footer:** A simple footer with social media links.
* **Requirements:**
    * Must be **Mobile-First**. The layout should be a single column on mobile and expand on larger screens.
    * Must use at least **two media queries**.
    * Must use **Google Fonts**.
    * **(New)** Must use **CSS Variables** for all main colors, fonts, and spacing.
    * **(New)** Must include **`:hover` transitions** on buttons, links, and project cards.
    * **(New)** Must include at least one **`@keyframes` animation** (e.g., a fade-in on the hero `h1` or a pulse on a "featured" project).
    * **(New)** Must use **Advanced Selectors** (e.g., `h2 + p`) to style at least one element.
