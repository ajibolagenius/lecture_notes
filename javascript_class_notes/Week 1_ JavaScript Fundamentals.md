# Week 1: JavaScript Fundamentals

Welcome to JavaScript! Your portfolio site has a real structure (HTML) and real style (CSS) — but right now, nothing on it actually *does* anything. That hamburger icon you may have styled doesn't open a menu. That badge just sits there. This week, you write your first `script.js` and give your real site its first taste of interactivity.

## Module 1: Introduction to JavaScript

### 1. What is JavaScript?

* **Lecture & Concepts:**
    * JavaScript (JS) is the **programming language of the web**.
    * Think of a website as a person:
        * **HTML:** The **skeleton**. Structure and content.
        * **CSS:** The **skin, clothes, and appearance**. Style.
        * **JavaScript (JS):** The **muscles and brain**. Behavior and interactivity.
    * Without JS, your portfolio is a static document. With JS, you can toggle a mobile nav menu, validate a contact form before it submits, render your projects from real data, and fetch your actual GitHub repos live. It makes the web *dynamic*.
    * **Client-Side Scripting:** Your JS code downloads to the visitor's browser and runs *there*, reacting instantly to clicks and input.

* **In-Depth Example (The "Aha!" Moment, on Your Real Header):**
    * **`index.html` (what you already have):**
        ```html
        <header>
          <h1 id="page-title">Alice Chen</h1>
          <button id="nav-toggle">☰</button>
          <nav>
            <ul class="nav-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </nav>
        </header>
        ```
        *(If you don't yet have a `<button id="nav-toggle">☰</button>` in your header, add it now — it's what this week brings to life.)*
    * **Problem:** Right now, clicking that button does nothing. It's just a skeleton.
    * **The "After" (with a little JS):**
        ```javascript
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        navToggle.addEventListener('click', function() {
          navLinks.classList.toggle('nav-open');
        });
        ```
    * **Result:** Now, clicking the button shows or hides your nav links. That's interactivity! That's JavaScript. Don't worry about the syntax yet — you'll understand every piece of this by the end of the week.

---

### 2. How to Add JS

* **Lecture & Concepts:** There are three ways, just like CSS.

    1.  **External JS (Best Practice):**
        * You write all your JS in a separate file (e.g., `script.js`) and link it from your HTML.
        * **Why:** Keeps logic separate from structure. One file can power all 3 of your portfolio pages.

    2.  **Internal JS:**
        * JS code directly inside `<script>` tags in your HTML file.
        * **Cons:** Clutters your HTML, can't be reused across your 3 pages.

    3.  **Inline JS (Avoid):**
        * JS directly in an HTML attribute, like `onclick="..."`.
        * **Cons:** Messy, mixes logic with structure. **You will not use this for your portfolio.**

* **In-Depth (Modern): `defer`**
    * Historically, scripts were placed right before `</body>` so the HTML existed before the JS tried to find it.
    * **The modern best practice** is to put your script in `<head>` with the `defer` attribute:
        * `<script defer src="script.js"></script>`
        * This tells the browser: "Download this in the background *while* you keep parsing the HTML, but don't run it until the HTML is fully parsed." It's fast, safe, and keeps all your `<script>` tags in one predictable place — the `<head>`.

* **⭐️ Class Exercise: Link Your Real Script**
    1.  Create `portfolio/script.js`.
    2.  In the `<head>` of `index.html`, `about.html`, and `contact.html`, add:
        ```html
        <script defer src="script.js"></script>
        ```
    3.  In `script.js`, log `"script.js loaded"` and confirm it appears in the console on all 3 pages.

---

### 3. The Browser Console & Strict Mode

* **Lecture & Concepts:**
    * The console is your **most important debugging tool**. Open it with **F12** or **Cmd+Opt+I** (Mac).
    * **`console.log()`:** Prints a message to the console. You'll use this constantly to "see" what your code is doing.
    * **`'use strict';`:** Modern JavaScript should start with this. It prevents silly, hard-to-spot mistakes (like accidentally creating a global variable by forgetting `let`/`const`) and makes your code behave more predictably. Add it as the very first line of `script.js`.

* **In-Depth Example:**
    ```javascript
    'use strict';

    console.log("script.js loaded");

    let x = 10;
    let y = 20;
    console.log("x + y is:", x + y); // "x + y is: 30"

    console.warn("This is a warning message."); // Yellow
    console.error("This is an error message."); // Red
    ```

* **Beyond `console.log`: Breakpoints.** `console.log` is fast, but for a real bug you often want to *pause* execution entirely and inspect everything at that exact moment. In Chrome DevTools' **Sources** tab, click the line number next to any line of your code to set a breakpoint — the browser pauses there the next time that line runs, and you can hover any variable to see its live value, or step through line-by-line with the controls at the top of the panel. This is the same skill you'll use to inspect a real API response in Week 6.

* **⭐️ Class Exercise: Set Your First Breakpoint**
    1.  In the Sources tab, open `script.js` and click the line number inside your nav-toggle's `click` callback (from section 1's example) to set a breakpoint.
    2.  Click the real nav-toggle button on the page and confirm execution pauses on that line.
    3.  Hover over `navLinks` in the paused code to confirm it shows a real DOM element, not just its name.

---

### 4. Comments

* **Lecture & Concepts:**
    * Comments are notes for humans. The JS engine ignores them entirely.
    * `//` for single-line, `/* ... */` for multi-line.
    * Comments should explain the **"why,"** not the **"what."**
        * Bad: `// select the nav toggle button` (the code already says that).
        * Good: `// we toggle a class instead of setting styles directly, so CSS stays in charge of the look`

---

### 5. Linting & Formatting: Your Safety Net

* **Lecture & Concepts:**
    * Every professional JavaScript codebase runs two tools before code reaches a teammate: **ESLint**, which catches likely bugs and enforces consistent patterns (it flags `==` instead of `===`, an unused variable, a missing `break` in a `switch`), and **Prettier**, which auto-formats your code so nobody argues about spacing, quotes, or semicolons.
    * Turning these on *now*, before you've written much code, matters more than any lecture about them — the habit of writing with a linter watching is what actually sticks.
    * **Format on Save:** Enable VS Code's "Format on Save" setting so Prettier reformats `script.js` automatically every time you save.

* **In-Depth Example (What ESLint Actually Catches):**
    ```javascript
    // ESLint warning: "Expected '===' and instead saw '=='."
    if (username == "") { ... }
    ```

* **⭐️ Class Exercise: Turn On Your Safety Net**
    1.  Install the **ESLint** and **Prettier** extensions in VS Code.
    2.  Turn on "Format on Save" in VS Code's settings.
    3.  In `script.js`, deliberately write `if (1 == 1) { console.log("test"); }` and confirm ESLint underlines the `==`. Fix it to `===` and confirm the warning disappears.

---

## Module 2: Variables, Data Types & Operators

### 1. Variables (`let`, `const`, `var`)

* **Lecture & Concepts:**
    * A variable is a **label pointing to a value** in memory — not just a box, a pointer.
    * **`const` (constant):** **The default choice.** You must assign a value immediately, and it can never be reassigned. Use it 95% of the time.
    * **`let`:** Use only when you *know* the value needs to change later (a counter, a toggle state).
    * **`var` (The "Old Way"):** **Do not use it.** It has confusing scoping rules (`var` "leaks" out of `if`/`for` blocks) that `let` and `const` were invented to fix.

* **In-Depth Example (Your Real Nav Toggle Variables):**
    ```javascript
    // const: these elements never get reassigned to something else
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // navToggle = document.querySelector('h1'); // ERROR! Assignment to constant variable.
    ```

### 2. Data Types (Primitives)

* **Lecture & Concepts:**
    * JavaScript is **dynamically typed** — a variable's type is decided by what you put in it.
    * **The primitives you need to know:**
        1.  **String:** Text, in quotes. `"Alice Chen"`
        2.  **Number:** Any number. `30`, `19.99`
        3.  **Boolean:** `true` or `false`.
        4.  **`undefined`:** Declared but never given a value (usually accidental).
        5.  **`null`:** *Intentionally* empty — you, the developer, set this on purpose.
    * **`typeof` Operator:** Checks a variable's type. `typeof navToggle` → `"object"` (DOM elements are objects).

### 3. Strings & Template Literals

* **Lecture & Concepts:**
    * The old way joins strings with `+` and is easy to get wrong (`"5" + 10` becomes `"510"`, not `15` — a classic "gotcha" called type coercion).
    * **The modern way: Template Literals.** Use backticks (`` ` ``) and embed variables directly with `${...}`.

* **In-Depth Example:**
    ```javascript
    const name = "Alice";
    const projectCount = 3;

    // Old way (avoid)
    const oldMsg = "Hello, " + name + "! You have " + projectCount + " projects.";

    // Modern way (use this)
    const newMsg = `Hello, ${name}! You have ${projectCount} projects.`;
    ```

### 4. Operators

* **Lecture & Concepts:**
    * **Arithmetic:** `+`, `-`, `*`, `/`, `%` (modulo — the remainder; useful for "every 3rd item" logic).
    * **Assignment:** `=`, `+=`, `-=`.
    * **Comparison (CRITICAL):**
        * `==` (Loose Equality): **AVOID.** Coerces types. `5 == "5"` → `true` (bad, hides bugs).
        * `===` (Strict Equality): **ALWAYS USE.** `5 === "5"` → `false` (correct — different types).
    * **Logical:**
        * `&&` (AND): both sides must be truthy.
        * `||` (OR): at least one side must be truthy.
        * `!` (NOT): flips a boolean.
    * **`??` (Nullish Coalescing — Modern):** Like `||`, but *only* falls back when the left side is `null` or `undefined` — it won't wrongly treat `0` or `""` as "missing."
        * `const theme = savedTheme ?? "light";` (if `savedTheme` is genuinely missing, default to `"light"` — but if it's `0` or `""`, keep it. We'll use this for real in Week 5's dark-mode toggle.)

* **In-Depth Example (Only Run Code If the Button Exists):**
    ```javascript
    const navToggle = document.getElementById('nav-toggle');

    // Short-circuit: only call addEventListener if navToggle was actually found
    navToggle && navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('nav-open');
    });
    ```

* **⭐️ Class Exercise: Finish the Nav Toggle**
    1.  Select your real `#nav-toggle` button and `.nav-links` with `const`.
    2.  Add a `click` listener that calls `navLinks.classList.toggle('nav-open')`.
    3.  Test it in the browser — the class should appear/disappear in dev tools each time you click.
    4.  Use `===` somewhere in your code (even just a `console.log(typeof navToggle === "object")`) to practice strict equality.

---

### Week 1: Comprehensive Assignment

**Objective:** Wire up your real header's mobile nav toggle — your portfolio's first piece of interactivity.

**Files to Use:**
1.  `index.html`, `about.html`, `contact.html` (add the `#nav-toggle` button if missing)
2.  `portfolio/script.js` (new)

**Requirements:**

1.  **Linking:** Create `script.js` and link it with `<script defer src="script.js"></script>` in the `<head>` of all 3 pages.
2.  **Strict Mode:** Start `script.js` with `'use strict';`.
3.  **Variables:** Select your real `#nav-toggle` and `.nav-links` using `const`.
4.  **The Toggle:** Add a `click` event listener that toggles a `.nav-open` class on `.nav-links`.
5.  **Comments:** Add at least one comment explaining *why* you used `classList.toggle` instead of `element.style`.
6.  **Tooling:** ESLint and Prettier installed and running (Format on Save enabled) on `script.js`.

**Bonus (Console-Only Practice):** Build a "Temperature Converter" to drill the fundamentals before Week 4's deep DOM dive:
* Create a `const celsius = 25;`.
* Calculate Fahrenheit using `F = (C * 9/5) + 32`.
* Log the result using a template literal: `` `${celsius}°C is ${fahrenheit}°F` ``.
* Add a comparison: log whether `celsius` is between 15 and 25 (a "comfortable" range) using `&&`.
