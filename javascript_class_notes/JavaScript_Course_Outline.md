# Comprehensive JavaScript Course: From Fundamentals to Modern JS

## Course Overview

This course is designed for beginners who want to learn JavaScript from the ground up. It covers core programming concepts, modern ES6+ syntax, DOM manipulation, and asynchronous JavaScript. Every week, you add real interactivity to **the same personal portfolio site** you built in HTML and styled in CSS — the same `index.html`, `about.html`, and `contact.html` — turning it from a static page into a dynamic, data-driven, API-connected application.

* **Target Audience:** Students who have completed the HTML and CSS courses (or have equivalent knowledge of semantic HTML and CSS layout).
* **Tools:** A code editor (VS Code recommended), a modern browser with dev tools (Chrome/Firefox), the browser console.
* **Goal:** By the end of this course, students will be able to independently add real interactivity to any site — DOM manipulation, event handling, data modeling, modern ES6+ syntax, and asynchronous API calls — and will have a fully interactive, dark-mode-capable portfolio that renders its own project data and fetches live data from a real API.

---

## Week 1: JavaScript Fundamentals

### Module 1: Introduction to JavaScript

* **Learning Objectives:**
    * Explain what JavaScript is and its role in web development.
    * Add JavaScript to an HTML page (inline, internal, and external), using modern `defer` loading.
    * Use the browser console to run code and log messages, and set a breakpoint to pause and inspect execution.
    * Write JavaScript comments that explain "why," not "what."
    * Set up ESLint and Prettier so a linter and formatter run on every save.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is JavaScript?** | 30 mins | 15 mins |
| JS vs. HTML vs. CSS | - Client-Side Scripting | - Open your real `index.html` and note everything that's currently "dead" (the nav, the badge) — JS will bring it to life. |
| **How to Add JS** | 45 mins | 30 mins |
| External (`<script src="..." defer>`) | - Why `defer` beats a bottom-of-body script tag. | - Create `portfolio/script.js` and link it from all 3 of your real HTML pages. |
| **The Browser Console & Strict Mode** | 30 mins | 30 mins |
| Using `console.log()` | - `'use strict';` as a modern default. | - Log a message confirming your script loaded, on all 3 pages. |
| Breakpoints (Sources tab) | - Pausing execution to inspect live variables. | - Set a breakpoint inside your nav-toggle's click handler. |
| Comments `//` and `/* ... */` | - Writing effective, "why"-focused comments. | - Comment your code from the previous exercise. |
| **Linting & Formatting** | 30 mins | 30 mins |
| ESLint (catches likely bugs). | - Prettier (auto-formatting) + Format on Save. | - Install both; confirm ESLint flags a deliberate `==` mistake. |

### Module 2: Variables, Data Types & Operators

* **Learning Objectives:**
    * Declare variables using `let` and `const` (and understand why we avoid `var`).
    * Identify and use common JavaScript data types (String, Number, Boolean, Null, Undefined).
    * Perform operations using arithmetic, assignment, comparison, and logical operators.
    * Understand type coercion, `===` vs. `==`, and the modern nullish coalescing operator (`??`).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Variables** | 45 mins | 30 mins |
| `let` (re-assignable) | - `const` (constant, the default choice) | - Declare `const` variables for your real nav toggle button and header. |
| **Data Types** | 1 hour | 45 mins |
| Primitives: String, Number, Boolean | - `null` vs. `undefined` | - Use `typeof` on a few of your own variables. |
| **Strings & Template Literals** | 30 mins | 30 mins |
| Template literals (`` `${...}` ``) | - Why they beat `+` concatenation. | - Log a greeting using a template literal. |
| **Operators** | 1 hour | 45 mins |
| Comparison (`===` vs. `==`) | - `??` (Nullish Coalescing, briefly) | - Write a comparison expression and predict its output before logging it. |
| Logical (`&&`, `||`, `!`) | - Short-circuiting. | - Use `&&` to only run code if your nav button was actually found. |

**Week 1 Assignment:** Wire up your real header's mobile nav toggle.
* Create `portfolio/script.js` and link it (with `defer`) from `index.html`, `about.html`, and `contact.html`.
* Add a hamburger `<button>` to your real header (next to your nav) and select it with `querySelector`.
* Add a `click` event listener that toggles an `.nav-open` class on your `<nav>`.
* **Bonus (console-only practice):** Build a small "Temperature Converter" using `const`, arithmetic operators, and template literals, to drill the fundamentals before we lean fully on the DOM in Week 4.

---

## Week 2: Control Flow & Functions

### Module 3: Control Flow

* **Learning Objectives:**
    * Make decisions in code using `if`/`else if`/`else` statements.
    * Understand truthy and falsy values.
    * Use the `switch` statement and the ternary operator.
    * Repeat tasks using `for` and `while` loops.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Conditional Statements** | 1 hour | 45 mins |
| `if`, `else`, `else if` | - Truthy and Falsy values. | - Write an `if` statement checking whether a sample "message" string is empty. |
| **Ternary Operator** | 30 mins | 30 mins |
| `condition ? exprIfTrue : exprIfFalse` | - A clean shorthand for `if/else`. | - Refactor your check into a ternary. |
| **Loops** | 1.5 hours | 1 hour |
| `for` loop | - `for` vs. `while`. | - Loop over a sample array of contact-form field names and log each one. |

### Module 4: Functions (The Building Blocks)

* **Learning Objectives:**
    * Write and call functions using declarations, expressions, and arrow functions.
    * Pass data to functions using parameters and arguments; get data back with `return`.
    * Understand variable scope (Global, Function/Local, Block).
    * Understand closures well enough to use them for simple, private state.
    * Write real, automated tests for pure functions using Vitest.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Function Basics** | 45 mins | 30 mins |
| Declarations vs. Expressions | - Hoisting differences. | - Write a function `isNotEmpty(value)` that returns `true`/`false`. |
| **Parameters, Arguments & Return** | 1 hour | 45 mins |
| Passing data in, getting data out. | - Default parameters (ES6). | - Write `isValidEmail(email)` using a simple check (contains `"@"` and `"."`). |
| **Scope** | 45 mins | 30 mins |
| Global, Function, Block Scope. | - Why minimizing globals matters. | - Confirm a variable declared inside your validator function isn't visible outside it. |
| **Closures (a first look)** | 1 hour | 45 mins |
| Functions that "remember" their outer variables. | - Why this matters for private state. | - Write `createFieldValidator(minLength)` that returns a function checking a string's length — a closure "remembering" `minLength`. |
| **Testing Your Validators** | 1 hour | 45 mins |
| Vitest — a real test runner, not `console.log` by eye. | - The `module.exports` guard that lets `script.js` work in both the browser and Node. | - Write and run real Vitest tests for `isValidEmail`/`isMessageLongEnough`. |

**Week 2 Assignment:** Write your real contact form's validation logic.
* Write `isValidEmail(email)`, `isMessageLongEnough(message)` (using your form's real `minlength` of 20), and `isContactMethodChosen(method)` functions.
* Write real Vitest tests for each — not just sample calls read by eye — you'll wire these to the real form's `submit` event in Week 4.
* **Bonus:** Write `createFieldValidator(minLength)` (a closure) and use it to build both your message-length validator and a second, differently-sized validator, proving the same function factory works for both.

---

## Week 3: Data Structures: Arrays & Objects

### Module 5: Objects

* **Learning Objectives:**
    * Create and use object literals to store related data.
    * Access, add, and modify properties using dot and bracket notation.
    * Define and call methods (functions) on an object.
    * Understand the basics of the `this` keyword.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Object Literals** | 1 hour | 45 mins |
| Key/Value pairs. | - Creating objects. | - Create ONE real `project` object modeling a single Featured Work project: `title`, `description`, `tags`, `imageSrc`. |
| **Accessing Properties** | 45 mins | 30 mins |
| Dot notation | - Bracket notation | - Log the project's `title`, then add a new `featured: true` property. |
| **Object Methods & `this`** | 1 hour | 45 mins |
| Functions as properties. | - How `this` refers to the object itself. | - Add a `describe()` method to your project object that logs a formatted summary using `this`. |

### Module 6: Arrays

* **Learning Objectives:**
    * Create and use array literals.
    * Access and modify array elements using bracket notation (index).
    * Use common array properties and methods (`.length`, `push`, `pop`, `shift`, `unshift`).
    * Loop over arrays of objects using a `for` loop.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Array Literals** | 45 mins | 30 mins |
| What are arrays? | - Zero-based indexing. | - Turn your single `project` object into the first item of a real `projects` array. |
| **Common Methods** | 1 hour | 45 mins |
| `.length`, `push()`, `pop()` | - `unshift()`, `shift()` | - Add your other real Featured Work projects (from HTML Week 3) as more objects in the array. |
| **Looping Arrays of Objects** | 45 mins | 30 mins |
| `for (let i = 0; i < arr.length; i++)` | - A common, critical data structure. | - Write a `for` loop that logs each project's `title` and `tags`. |

**Week 3 Assignment:** Build your real Featured Work data model.
* Create a `projects` array in `script.js` containing one object per real project currently hardcoded in your `index.html`'s Featured Work section — same titles, descriptions, and tech tags.
* Give each object a `title`, `description`, `tags` (array), `imageSrc`, and `featured` (boolean, `true` for your one Featured project).
* Write a `for` loop that logs every project's title and description to the console.
* **Bonus:** Add a `describe()` method to each project object.

---

## Week 4: The DOM & Modern JS Introduction

### Module 7: Introduction to the DOM

* **Learning Objectives:**
    * Explain what the DOM (Document Object Model) is.
    * Select elements from the page using `getElementById`, `querySelector`, and `querySelectorAll`.
    * Understand the difference between an `HTMLCollection` and a `NodeList`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is the DOM?** | 45 mins | 30 mins |
| The `document` object. | - The DOM as a tree structure. | - Select your real `.work-grid` container with `querySelector`. |
| **Selecting Elements (Modern)** | 1.5 hours | 1 hour |
| `querySelector()` (the modern way) | - `querySelectorAll()`, `NodeList` | - Select all your existing `.project-card`s with `querySelectorAll` and log how many there are. |

### Module 8: Manipulating the DOM

* **Learning Objectives:**
    * Change the text and HTML content of elements, safely.
    * Modify element styles and classes using JavaScript.
    * Create and append new elements to the page from real data.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Changing Content Safely** | 45 mins | 30 mins |
| `textContent` (safe default) | - `innerHTML` and the XSS risk. | - Discuss why your project data (title/description) should go through `textContent`, not raw `innerHTML`. |
| **Classes** | 30 mins | 30 mins |
| `classList.add/remove/toggle` | - Working with CSS classes, not inline styles. | - Confirm your Week 1 nav toggle uses `classList.toggle`, not `element.style`. |
| **Creating & Appending From Data** | 1.5 hours | 1 hour |
| `document.createElement()` | - `element.append()` | - Write `renderProjects(projects)`: clear `.work-grid`, then create and append one `.project-card` per object in your Week 3 array. |

### Module 9: Events

* **Learning Objectives:**
    * Attach event listeners to DOM elements.
    * Respond to common events like `click` and `submit`.
    * Use the `event` object, including `preventDefault()`.
    * Debounce a live `input` event to avoid running a check on every keystroke.
    * Understand event delegation and why it matters for dynamically-created elements.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Event Listeners & the `event` Object** | 1 hour | 45 mins |
| `element.addEventListener()` | - `event.target`, `event.preventDefault()` | - Wire your real contact `<form>`'s `submit` event, calling `event.preventDefault()`. |
| **Wiring Up Your Validators** | 1 hour | 45 mins |
| Calling Week 2's functions from an event. | - Showing/hiding an error message. | - Call `isValidEmail`/`isMessageLongEnough`/`isContactMethodChosen` inside the submit handler; show an error `<p>` if any fail. |
| **Live Validation with Debounce** | 45 mins | 30 mins |
| Validating on `input`, not just `submit`. | - Why `debounce()` beats running a check on every keystroke. | - Add a debounced live email check, firing 300ms after typing stops. |
| **Event Delegation** | 45 mins | 30 mins |
| The "One Listener" pattern. | - Why it matters for elements created by `renderProjects()`. | - Add ONE click listener on `.work-grid` (not on each card) that logs which project was clicked, using `event.target`. |

**Week 4 Assignment:** Render your real projects from data, and make the contact form actually validate.
* Replace the hardcoded Featured Work `<article>`s in `index.html` with `renderProjects(projects)`, generating them from your Week 3 array via `createElement`/`textContent`/`.append()`.
* Wire the real contact form's `submit` event: call your Week 2 validator functions, `event.preventDefault()`, and show an inline error message for the first failing field (or a success message if all pass).
* Add a debounced `input` listener on the email field for live validation feedback.
* Add ONE delegated click listener on `.work-grid` that logs the clicked project's title (using `event.target.closest('.project-card')`).
* Finish and verify your Week 1 nav toggle now that you understand events fully.

---

## Week 5: Modern JavaScript Deep Dive (ES6+)

### Module 10: Modern Iteration & ES6+ Functions

* **Learning Objectives:**
    * Iterate over arrays using `forEach`, `map`, and `filter` instead of manual `for` loops.
    * Use `.find()`, `.some()`, `.every()`, and `.reduce()` for lookups, checks, and aggregation.
    * Write and use Arrow Functions (`=>`), and recognize where lexical `this` breaks an object method.
    * Refactor existing DOM-rendering code to modern syntax.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Arrow Functions (`=>`)** | 1 hour | 45 mins |
| Concise syntax, implicit return. | - Lexical `this` — and the gotcha where it breaks object methods. | - Rewrite your Week 2 validator functions as arrow functions; try (and watch fail) converting `describe()`. |
| **Array Method: `.map()`** | 1 hour | 45 mins |
| Creates a *new* array. | - Perfect for turning data into DOM elements. | - Refactor `renderProjects()`'s `for` loop into a `.map()` (or `.forEach()` if appending directly). |
| **Array Method: `.filter()`** | 1 hour | 45 mins |
| Creates a *new*, smaller array. | - Selecting a subset of data. | - Add a "Show Featured Only" button that re-renders using `projects.filter(p => p.featured)`. |
| **More Array Methods** | 1 hour | 45 mins |
| `.find()`, `.some()`, `.every()` | - `.reduce()` — collapsing an array to one value. | - Use `.find()` in your click handler; build `tagCounts` with `.reduce()`. |

### Module 11: More ES6+ Features & Persistence

* **Learning Objectives:**
    * Write cleaner code using Template Literals and Destructuring — both object *and* array forms.
    * Use the Spread operator to copy/merge data.
    * Persist user preferences with `localStorage`.

| Topic | Lecture/Concept (Est.Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Destructuring** | 1 hour | 45 mins |
| `const { title, tags } = project;` | - Cleaner function parameters. | - Destructure each project's fields inside `renderProjects()`. |
| Array destructuring `const [a, b] = arr;` | - Why this is exactly React's `useState()` pattern. | - Array-destructure a real project's `tags` into named variables. |
| **Spread (`...`)** | 30 mins | 30 mins |
| Copying and merging arrays/objects. | - `const featured = { ...project, badge: 'New' };` | - Use spread to create a modified copy of one project without mutating the original. |
| **`localStorage` & Dark Mode** | 1.5 hours | 1 hour |
| `localStorage.setItem/getItem` | - `JSON.stringify`/`JSON.parse` for non-string data. | - Build a real dark-mode toggle button that adds/removes a `.dark-mode` class on `<body>` and saves the preference. |

**Week 5 Assignment:** Refactor to modern syntax and add real dark mode.
* Refactor `renderProjects()` to use `.map()`/`.forEach()`, arrow functions, and object + array destructuring instead of a manual `for` loop.
* Add a "Show Featured Only" toggle using `.filter()`, a `.find()`-based project lookup in your click handler, and a `tagCounts` built with `.reduce()`.
* Add a dark-mode toggle button (present on all 3 pages) that adds/removes a `.dark-mode` class on `<body>`, persists the choice to `localStorage`, and re-applies it on page load so the preference survives a refresh and carries across pages.

---

## Week 6: Asynchronous JavaScript & The Future

### Module 12: Asynchronous JavaScript Concepts

* **Learning Objectives:**
    * Explain the difference between synchronous and asynchronous code.
    * Understand the Event Loop (high-level).
    * Understand "Callback Hell" and why Promises replaced it.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Sync vs. Async** | 45 mins | 30 mins |
| The Call Stack & Event Loop. | - `setTimeout(func, 0)` demo. | - Predict the log order of a sync/async mixed snippet. |
| **Callbacks & Callback Hell** | 30 mins | 30 mins |
| The "old" way. | - Why nested callbacks become unreadable. | - (Lecture only) Read a nested-callback example and identify the pyramid. |

### Module 13: Promises & Async/Await

* **Learning Objectives:**
    * Understand what a Promise is and its 3 states.
    * Consume Promises using `.then()`/`.catch()`, and the cleaner `async`/`await` syntax.
    * Handle errors with `try...catch`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Promises** | 45 mins | 30 mins |
| `Pending`, `Fulfilled`, `Rejected`. | - `.then()`, `.catch()`, `.finally()`. | - Create a Promise that resolves after 1 second and consume it with `.then()`. |
| **Async/Await** | 1.5 hours | 1 hour |
| `async function` / `await`. | - `try...catch` for errors. | - Rewrite the same Promise-consuming code using `async`/`await`. |

### Module 14: Making Real API Calls

* **Learning Objectives:**
    * Use the `fetch()` API to make GET requests to a real, public API.
    * Process the `Response` object and parse JSON data.
    * Safely access optionally-missing nested data with Optional Chaining (`?.`).
    * Render fetched data to the DOM, with loading and error states.
    * Debug a real request in DevTools' Network tab, and cancel a stale one with `AbortController`.
    * Split `script.js` into real ES modules (`validators.js`/`render.js`/`api.js`) with `export`/`import`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **`fetch()` with Async/Await** | 1 hour | 1 hour |
| `const res = await fetch(...)` | - `const data = await res.json()` | - Fetch your own real repos from the GitHub REST API (`api.github.com/users/<you>/repos`). |
| **Optional Chaining (`?.`)** | 30 mins | 30 mins |
| Safely reading nested API fields. | - `repo.license?.name ?? 'No license'` | - Log each repo's name and (possibly missing) license safely. |
| **Loading & Error States** | 45 mins | 45 mins |
| Showing a "Loading..." message. | - `try...catch` around the fetch; debugging the real response in the Network tab. | - Show a loading message while fetching, and a friendly error message on failure. |
| **`AbortController`** | 30 mins | 30 mins |
| Cancelling a stale in-flight request. | - Why this matters once a page fetches more than once. | - Add cancellation to `loadGitHubRepos()`; prove it with a "Refresh" button. |
| **Real ES Modules** | 1 hour | 1 hour |
| `export`/`import` across real files. | - Why `type="module"` needs a server, not `file://`. | - Split into `validators.js`/`render.js`/`api.js`; run via Live Server. |

**Week 6 / Final Project:** Fetch real project data, and make the contact form submission feel real.
* **Goal:** Combine everything — data modeling, DOM rendering, events, and async JavaScript — into the finished, live portfolio.
* Write an `async function loadGitHubRepos(username)` that fetches your real public repos from the GitHub REST API and merges or replaces your Week 3 `projects` array with real repo data (name, description, URL), using Optional Chaining for any field that might be missing, and `AbortController` to cancel a stale request.
* Show a loading state while fetching and a friendly error message if the request fails (e.g., rate-limited or offline).
* Split `script.js` into real ES modules (`validators.js`, `render.js`, `api.js`), loaded via `<script type="module">` and served through Live Server or your live deploy.
* Turn your contact form's submission into an `async` function that simulates a network request (e.g., a fake `Promise` that resolves after a short delay, or a real request to a mock endpoint), showing a loading state and a success/error message instead of just an inline validation message — and remember this is a UX layer, not security; a real backend must re-validate everything itself.
* Redeploy the finished, fully-interactive portfolio to the same live URL from HTML Week 7 / CSS Week 6.
