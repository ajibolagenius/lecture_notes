# JavaScript Course Portfolio Project

This repository folder represents the personal portfolio learning project built alongside the **Comprehensive JavaScript Course**.

## Current Progress: Week 2 — Module 3 (Control Flow)

The codebase has completed the lessons up to **Week 2 — Module 3** and is ready to advance into **Module 4: Functions (The Building Blocks)**.

---

### Project Structure

```text
portfolio/
├── index.html       # Main landing page with Hero and Featured Work sections
├── about.html       # About page with bio and core skills
├── contact.html     # Contact page with interactive form layout
├── style.css        # Responsive CSS design system (HSL tokens, Flexbox, CSS Grid, BEM)
├── script.js       # Active JavaScript logic (Strict Mode, DOM toggle, Control Flow)
└── README.md        # Project documentation & progress tracking
```

---

### What Has Been Implemented So Far

#### Week 1: JavaScript Fundamentals
* **Module 1: Introduction to JavaScript**
  * Script inclusion using `<script defer src="script.js"></script>` in `<head>` across all 3 pages.
  * Strict mode (`'use strict';`) enabled at the top of `script.js`.
  * Descriptive comments explaining design decisions (e.g. toggling classes rather than direct style manipulation).
* **Module 2: Variables, Data Types & Operators**
  * Element caching with `const` for `#nav-toggle` and `.nav-links`.
  * Mobile hamburger navigation toggling the `.nav-open` state.
  * Null-safe short-circuiting with `&&`.
  * Practice exercises: strict equality (`===`), template literals, and temperature converter calculations.

#### Week 2: Control Flow & Functions
* **Module 3: Control Flow**
  * Conditional branching (`if`/`else if`/`else`) evaluating truthy and falsy values.
  * Ternary operator shorthand (`condition ? trueVal : falseVal`).
  * Repetitive execution with `for` and `while` loops iterating through form field lists.

---

### Upcoming Modules
* **Module 4:** Functions, parameters, return values, scope, closures, and Vitest test suites (`isValidEmail`, `isMessageLongEnough`).
* **Week 3 (Modules 5 & 6):** Objects and Arrays data modeling (`projects` array).
* **Week 4 (Modules 7, 8 & 9):** DOM rendering (`renderProjects`), event delegation, and real form validation with debouncing.
* **Week 5 (Modules 10 & 11):** Array iteration methods (`map`, `filter`, `reduce`), destructuring, and persistent dark mode (`localStorage`).
* **Week 6 (Modules 12, 13 & 14):** Asynchronous JavaScript, Promises, `async`/`await`, GitHub REST API integration, and ES Modules.
