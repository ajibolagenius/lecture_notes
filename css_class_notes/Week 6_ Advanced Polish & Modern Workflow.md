# Week 6: Advanced Polish & Modern Workflow

Welcome to the final week! You've learned how to build and lay out a full website. This week is all about adding the professional polish that makes a site feel "alive," plus the best practices and next steps that separate beginners from pros. You'll finish by redeploying your portfolio, fully styled, to the same live URL from HTML Week 7.

---

## Module 9: Interactivity: Transitions, Transforms & Animations

This module is about making your site *react* to the user, moving from static pages to dynamic experiences.

### 1. Pseudo-Classes (Responding to State)

* **Lecture & Concepts:**
    * A pseudo-class is a keyword added to a selector that specifies a special **state** of that element.
    * **`:hover`**: Applies a style *only when* the mouse hovers over the element.
    * **`:active`**: Applies a style *only when* the user is actively clicking.
    * **`:focus`**: Applies a style *only when* the element is "focused" (e.g., tabbing to a contact-form input). Critical for accessibility.
    * **`:focus-visible`**: A refinement of `:focus` that only fires when the browser thinks a focus indicator should actually be *shown* — keyboard tabbing, essentially — not when a mouse click happens to focus something. This is now the modern default for focus styling: keyboard users still get their focus ring, mouse users don't see one flash after every click.
    * **`:nth-child()`**: A "structural" pseudo-class, selecting an element by its *position* among siblings (e.g., `tr:nth-child(even)` for "zebra striping" your Skills & Experience table rows).

* **In-Depth Example (Visible Focus, the Modern Way):**
    ```css
    /* Fires for keyboard users tabbing through the nav or a project card —
       not for a mouse click, which doesn't need the extra ring */
    nav a:focus-visible,
    .project-card:focus-visible {
      outline: 3px solid #336699;
      outline-offset: 2px;
    }
    ```

### 2. The `transform` Property

* **Lecture & Concepts:**
    * `transform` changes the shape, size, and position of an element *without* affecting the normal document flow.
    * `transform: scale(1.03)` — 3% larger. `transform: rotate(45deg)` — rotates. `transform: translateY(-2px)` — nudges up.
    * Almost always paired with `transition` to create smooth effects.

### 3. CSS Transitions

* **Lecture & Concepts:**
    * A transition **smoothly animates** a change from one state to another (e.g., normal → `:hover`). It's the fix for abrupt, instant changes.
    * **`transition-property`**: *What* to animate (`background-color`, `transform`, or `all`).
    * **`transition-duration`**: *How long* (`0.3s`).
    * **`transition-timing-function`**: The speed curve (`ease`, `ease-in-out`, `linear`).
    * **Shorthand:** `transition: [property] [duration] [timing-function];`

* **In-Depth Example (Your Real Project Cards, Made Interactive):**
    ```css
    .project-card {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;

      /* Animate ALL property changes over 0.3s */
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }

    .project-card:hover {
      transform: scale(1.03);
      box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    }

    nav a {
      border-bottom: 2px solid transparent;
      transition: border-bottom 0.2s ease, color 0.2s ease;
    }

    nav a:hover {
      color: #336699;
      border-bottom: 2px solid #336699;
    }
    ```

### 4. CSS Animations (`@keyframes`)

* **Lecture & Concepts:**
    * `transition` animates from state A to state B. `animation` is for complex, multi-step animations that run *without* a trigger like `:hover`.
    * **Step 1: The "Story" (`@keyframes`):** Define the animation's timeline.
    * **Step 2: The "Actor" (`animation`):** Apply it to an element.
    * **`prefers-reduced-motion`:** Some users get real physical discomfort — dizziness, nausea — from movement on screen; others just prefer a calmer UI. Both are asking their OS for less motion, and `@media (prefers-reduced-motion: reduce)` lets you detect that and turn animations off for them. Treat this as part of *shipping* any animation, not an optional extra.

* **In-Depth Example (Fade In Your Name; Pulse Your Badge):**
    ```css
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

    #page-title {
      animation: fadeIn 1s ease-out;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.08); }
      100% { transform: scale(1); }
    }

    .badge {
      animation: pulse 2s infinite ease-in-out;
    }

    /* Respect users who've asked their OS for reduced motion */
    @media (prefers-reduced-motion: reduce) {
      #page-title,
      .badge {
        animation: none;
      }
    }
    ```

* **⭐️ Class Exercise (Module 9): Animate Your Real Cards and Badge**
    1.  Add a `transition` to `.project-card` for `transform` and `box-shadow`.
    2.  Add a `.project-card:hover` rule that scales it up slightly and deepens its shadow.
    3.  Add a `fadeIn` `@keyframes` animation to `#page-title`.
    4.  Add a `pulse` `@keyframes` animation to your `.badge`.
    5.  Wrap both animations in a `@media (prefers-reduced-motion: reduce)` block that turns them off. In Chrome DevTools, open the **Rendering** tab and emulate "prefers-reduced-motion: reduce" to confirm it actually works without changing your OS settings.
    6.  Add the `:focus-visible` outline from above to your nav links and project cards, and confirm with `Tab` that it appears — and that clicking with a mouse doesn't show it.

---

## Module 10: Advanced Selectors & Best Practices

### 1. CSS Variables (Custom Properties)

* **Lecture & Concepts:**
    * This is the **most important modern CSS best practice** for managing real projects.
    * Instead of repeating a HEX code 20 times across your stylesheet, store it in a **variable**. Change the theme in *one place*.
    * **Declare** inside `:root` (variables must start with `--`). **Use** with `var()`.

* **In-Depth Example (Refactoring Your Whole Stylesheet):**
    ```css
    /* 1. DECLARE your portfolio's design system, once */
    :root {
      --font-heading: 'Merriweather', serif;
      --font-body: 'Lato', sans-serif;
      --color-primary: #336699;
      --color-text: #222;
      --color-bg: #f8f9fa;
      --color-white: #ffffff;
      --shadow: 0 4px 8px rgba(0,0,0,0.1);
      --transition-speed: 0.3s;
    }

    /* 2. USE your variables everywhere */
    body {
      font-family: var(--font-body);
      color: var(--color-text);
      background-color: var(--color-bg);
    }

    #page-title,
    .section-heading,
    .project-title {
      font-family: var(--font-heading);
      color: var(--color-primary);
    }

    .project-card {
      box-shadow: var(--shadow);
      transition: transform var(--transition-speed) ease-in-out;
    }

    .badge {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
    ```

### 2. Dark Mode with `prefers-color-scheme`

* **Lecture & Concepts:**
    * Your `:root` variables above aren't just for tidiness — they're what makes a real dark mode possible with almost no extra work. `@media (prefers-color-scheme: dark)` detects the user's OS-level light/dark preference; redefine your variables inside it, and every rule that already uses `var(--color-text)` etc. updates automatically. You don't touch a single component rule.
    * This is the "future dark-mode switch" the Sass section later on refers to — CSS variables can do this *because* they're resolved live in the browser, unlike a Sass `$variable`, which is baked into a fixed value at compile time and can't respond to anything at runtime.

* **In-Depth Example:**
    ```css
    :root {
      --color-primary: #336699;
      --color-text: #222;
      --color-bg: #f8f9fa;
      --color-white: #ffffff;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --color-primary: #7aa6d1;
        --color-text: #eaeaea;
        --color-bg: #14161a;
        --color-white: #1e2126;
      }
    }
    ```
    Nothing else in your stylesheet changes. `body { color: var(--color-text); background-color: var(--color-bg); }` picks up the new values automatically on a device set to dark mode — no JavaScript, no extra classes.

* **⭐️ Class Exercise: Ship a Real Dark Mode**
    1.  Duplicate your `:root` variable block inside `@media (prefers-color-scheme: dark) { :root { ... } }`, choosing dark-appropriate values (lighter text, darker background, a slightly desaturated primary color so it doesn't glow on a dark background).
    2.  In Chrome DevTools, open the **Rendering** tab and emulate "prefers-color-scheme: dark" — confirm your whole site switches without changing your OS setting.
    3.  Re-check contrast in dark mode too, using the same method from Week 3. A light-on-dark pairing needs the same 4.5:1 minimum — it's easy to assume dark mode is "automatically fine" when it isn't.

### 3. Advanced Selectors & Combinators

* **Lecture & Concepts:**
    * **Attribute Selectors `[ ]`**: `input[type="email"]` (selects only email inputs in your contact form), `a[href$=".pdf"]` (links ending in ".pdf").
    * **Adjacent Sibling Combinator `+`**: `h2 + p` selects *only* the first `<p>` right after an `<h2>` — e.g., the paragraph directly under your "About Me" `.section-heading`.
    * **General Sibling Combinator `~`**: `h2 ~ p` selects *all* `<p>` tags after an `<h2>` at the same level.
    * **`:not()` Pseudo-Class**: `.project-card:not(.project-card--featured)` selects every card *except* the featured one.
    * **`:focus-within` Pseudo-Class**: `fieldset:focus-within { background-color: #eee; }` highlights your contact form's `<fieldset>` container the moment any input inside it is focused.
    * **`:has()` Pseudo-Class (The "Parent Selector"):** For years, CSS had no way to select a parent based on what's *inside* it. `:has()` finally allows exactly that — `.project-card:has(.project-card__badge)` selects any card that contains a badge, with no separate modifier class needed at all.

* **In-Depth Example (`:has()`):**
    ```css
    /* Style any card that happens to contain a badge — no --featured class required */
    .project-card:has(.project-card__badge) {
      border-color: var(--color-primary);
    }
    ```

* **⭐️ Class Exercise (Module 10): Style With Precision**
    1.  On `contact.html`, write `input[type="email"] { border-color: var(--color-primary); }` to make the email field visually distinct.
    2.  Write a `h2 + p` rule and confirm it only affects the first paragraph after each section heading.
    3.  Add a `fieldset:focus-within` rule that changes the fieldset's background color.
    4.  Write a `.project-card:has(.project-card__badge)` rule and compare it to your `--featured` modifier approach below — same visual result, different mechanism.

### 4. Organization & Naming (BEM)

* **Lecture & Concepts:**
    * When `style.css` grows past a few hundred lines, you need a system to prevent "specificity wars." **BEM (Block\_\_Element--Modifier)** is a popular naming convention for organized, low-specificity CSS.
    * **Block:** The main component — your `.project-card`.
    * **Element:** A *part* of that block, using `__` — `.project-card__title`, `.project-card__description`.
    * **Modifier:** A *variation*, using `--` — `.project-card--featured`.

* **In-Depth Example (Refactoring Your Real Classes to BEM):**
    * **Before (Week 1-5 naming):**
        ```html
        <article class="project-card">
          <span class="badge">Featured</span>
          <h3 class="project-title">Weather App</h3>
          <p class="project-description">...</p>
        </article>
        ```
    * **After (BEM):**
        ```html
        <article class="project-card project-card--featured">
          <span class="project-card__badge">Featured</span>
          <h3 class="project-card__title">Weather App</h3>
          <p class="project-card__description">...</p>
        </article>
        ```
        ```css
        .project-card { /* block: shared by every card */ }
        .project-card__title { /* element: only inside a card */ }
        .project-card__description { /* element */ }
        .project-card__badge { /* element */ }
        .project-card--featured { /* modifier: only on the featured one */
          border-color: var(--color-primary);
        }
        ```

* **⭐️ Class Exercise (Module 10 cont.): Refactor to BEM**
    1.  Rename `project-title` → `project-card__title`, `project-description` → `project-card__description`, `badge` → `project-card__badge`, throughout `index.html` and `style.css`.
    2.  Add `project-card--featured` as a *second* class on your featured card, and move any "featured-only" styling (e.g., a colored border) into that modifier rule.

### 5. Native CSS Nesting

* **Lecture & Concepts:**
    * Everything Sass's nesting does (next module) now works directly in plain CSS, in every current browser — no compiler, no `.scss` file, no build step at all.
    * Write a selector, then nest a related selector inside its curly braces. Use `&` to refer back to the parent — exactly the same symbol Sass uses.
    * This pairs naturally with the BEM refactor you just did: nesting an element/modifier selector inside its block keeps the relationship visible in the code itself, without repeating `.project-card` on every line.

* **In-Depth Example (Native, No Sass Needed):**
    ```css
    .project-card {
      padding: 20px;
      border: 1px solid var(--color-primary);

      & .project-card__title {
        font-family: var(--font-heading);
      }

      &:hover {
        transform: scale(1.03);
      }

      &--featured {
        border-color: var(--color-primary);
      }
    }
    ```

* **⭐️ Class Exercise: Nest Your Real Card Rules**
    1.  Take your existing flat `.project-card`, `.project-card__title`, `.project-card:hover`, and `.project-card--featured` rules and rewrite them nested inside one `.project-card { ... }` block, using `&`.
    2.  Confirm the page looks and behaves identically — nesting is a *writing* convenience; it resolves to the exact same selectors you already had.

---

## Module 11: Beyond CSS: Intro to Sass/SCSS

### 1. What is a CSS Preprocessor?

* **Lecture & Concepts:**
    * Sass (Syntactically Awesome Style Sheets) is a **preprocessor** — "CSS with superpowers." You write `.scss`, and a compiler turns it into normal `.css` the browser understands.
    * **Why?** Nesting, variables, and mixins keep large stylesheets organized and DRY.
    * **How This Actually Ships (In a Real Project):** Sass doesn't run in the browser — something has to compile `.scss` to `.css` *before* it ships. In practice that's almost always one of: the Dart Sass CLI (`sass input.scss output.css --watch`), a bundler handling `.scss` imports automatically (Vite, webpack), or a framework with it built in. None of that changes what you *write* — just know the compiled `.css` file is what the browser actually receives, not your `.scss` source. And before reaching for any newer CSS feature at all (native nesting included), a quick check on caniuse.com tells you exactly which browsers actually support it.

### 2. Sass Variables

* **Lecture & Concepts:**
    * Sass variables use `$` (e.g., `$primary-color: #336699;`) and are "compile-time" — the compiler replaces them before the browser ever sees them. CSS's own `var()` variables are "run-time" — the browser resolves them live, which is why *they're* the right choice for anything a user might toggle (like a future dark-mode switch).

### 3. Nesting Selectors

* **Lecture & Concepts:**
    * You just saw this exact pattern work natively, with zero compiler, back in Module 10. Sass nesting predates the native version by over a decade and works almost identically — worth knowing because a huge share of existing production codebases were written before native nesting shipped, so you'll keep reading `.scss` nesting in the wild constantly. For a brand-new project today, reach for native nesting first; reach for Sass's version when you're already in a codebase that uses it.
    * Lets you write CSS that *mirrors* your HTML structure, making BEM even easier to read. The `&` (parent selector) refers back to the parent, especially for pseudo-classes.

* **In-Depth Example (Your `.project-card` in Sass):**
    ```scss
    .project-card {
      padding: 20px;
      border: 1px solid #ddd;

      &__title {
        font-family: $font-heading;
      }

      &__description {
        line-height: 1.7;
      }

      &:hover {
        transform: scale(1.03);
      }

      &--featured {
        border-color: $color-primary;
      }
    }
    ```
    *This compiles to exactly the flat `.project-card`, `.project-card__title`, `.project-card:hover`, `.project-card--featured` rules you already wrote by hand.*

### 4. Basic Mixins

* **Lecture & Concepts:**
    * A `@mixin` is a reusable "function" for styles. `@mixin` defines it, `@include` uses it.

* **In-Depth Example:**
    ```scss
    @mixin flex-center {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .hero {
      @include flex-center;
    }
    ```

* **⭐️ Class Exercise (Module 11, Optional/Bonus):**
    * Rewrite your `.project-card` block from plain CSS into `.scss` using nesting for `&__title`, `&__description`, `&:hover`, and `&--featured`. You don't need to actually compile or ship it — this is about understanding what the compiled output would look like.

### 5. Beyond One Stylesheet: Scaling CSS

A single `style.css` works great for a 3-page portfolio. On a larger real project, that one file eventually gets split — either into multiple Sass partials imported into one entry file (`_variables.scss`, `_cards.scss`, `_forms.scss`), or into component-scoped styles if you're using a framework (CSS Modules, styled-components) so a class name can only ever affect the one component that imports it. You don't need any of that for this project — just know "one giant stylesheet" is a starting point, not where real codebases end up.

### 6. Beyond Hand-Written CSS: Utility-First Frameworks

Everything this course taught — the Box Model, Flexbox, Grid, BEM — is the exact vocabulary a framework like **Tailwind CSS** is built on top of. It doesn't replace this knowledge; it lets you apply it directly in your HTML via utility classes (`class="flex items-center gap-4"`) instead of writing custom `.project-card` rules in a separate file. It's extremely common in current job postings, so expect to meet it — and don't be surprised the first time a "CSS" codebase you open has almost no separate stylesheet at all.

---

### Week 6 / Final Project: Finish and Deploy "The Professional Portfolio"

**Objective:** Combine and polish everything from Weeks 1-5 into one fully styled, responsive, animated, three-page site — the same `index.html`, `about.html`, and `contact.html` you've been building since HTML Week 1 — then redeploy it.

**Existing Project (nothing new to scaffold):**
* `index.html`, `about.html`, `contact.html` (semantic structure from the HTML course)
* `style.css` (built up across CSS Weeks 1-5)

#### Requirements Checklist:

**1. Design System (Module 10):**
* [ ] All colors, fonts, and spacing refactored into `:root` CSS variables.
* [ ] `box-sizing: border-box` reset still in place from Week 2.
* [ ] A working dark mode via `@media (prefers-color-scheme: dark)` overriding your `:root` variables — verified with DevTools' Rendering tab, contrast re-checked in dark mode too.

**2. Layout (Weeks 4-5):**
* [ ] Sticky, Flexbox header on all 3 pages.
* [ ] Responsive CSS Grid Featured Work section (1 → 2 → 3 columns).

**3. Naming (Module 10):**
* [ ] `.project-card` and its children refactored to BEM (`__title`, `__description`, `__badge`, `--featured`).

**4. Interactivity & Polish (Module 9):**
* [ ] `:hover` transitions on `.project-card` and nav links.
* [ ] At least one `@keyframes` animation (fade-in on `#page-title`, pulse on the badge), wrapped in `@media (prefers-reduced-motion: reduce)`.
* [ ] `:focus-visible` (not `:focus`) styling on nav links and project cards.

**5. Advanced Selectors (Module 10):**
* [ ] At least one of: `h2 + p`, `:not()`, `:focus-within`, `:has()`, or an attribute selector, used somewhere real on the site.

**6. Deployment:**
* [ ] Redeploy the fully-styled `portfolio` folder to the **same live URL** you deployed in HTML Week 7 (Netlify, Vercel, or GitHub Pages).
* [ ] **Submit the LIVE URL** — reviewers should see the styled site, not just the code.

**Bonus Challenge:** Rewrite your entire `.project-card` block in Sass (`.scss`) using nesting and a `$primary-color` variable, and include both the `.scss` source and its compiled `.css` output in your submission.
