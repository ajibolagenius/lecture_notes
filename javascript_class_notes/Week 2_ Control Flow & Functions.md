# Week 2: Control Flow & Functions

This week is all about making your code smart. You'll learn how to make it make decisions (Control Flow) and how to package logic into reusable blocks (Functions) — specifically, the real validation logic your contact form will need before it can safely accept a submission.

## Module 3: Control Flow

Control flow is how you make your program "decide" what to do next, instead of just running top to bottom.

### 1. Conditional Statements (`if`, `else if`, `else`)

* **Lecture & Concepts:**
    * The analogy is a fork in the road: "IF a condition is true, THEN go this way, ELSE go that way."
    * **`if`:** Runs *only if* the condition is `true`.
    * **`else if`:** An optional additional check. Chain as many as you need.
    * **`else`:** An optional "catch-all" if every previous check failed.

* **Crucial Concept: Truthy & Falsy**
    * JavaScript's `if` doesn't just check `true`/`false` — it checks if a value is **"truthy"** or **"falsy"**.
    * **The 6 Falsy Values (memorize these):** `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`.
    * **Truthy Values:** *Everything else* — including a non-empty string, any nonzero number, arrays, and objects.

* **In-Depth Example (Checking Your Real Contact Form's Message Field):**
    ```javascript
    let message = ""; // Imagine this came from your form's textarea

    if (message) { // falsy, because "" is one of the 6 falsy values
      console.log(`Message received: ${message}`);
    } else {
      console.log("Please write a message before submitting.");
    }
    // Output: "Please write a message before submitting."
    ```

---

### 2. Ternary Operator

* **Lecture & Concepts:**
    * A clean, one-line shorthand for a simple `if/else`. `condition ? valueIfTrue : valueIfFalse;`

* **In-Depth Example:**
    ```javascript
    let message = "Hello there!";

    // The if/else way
    let status;
    if (message) {
      status = "ready to send";
    } else {
      status = "empty";
    }

    // The ternary way (same result, one line)
    let statusTernary = message ? "ready to send" : "empty";
    ```

---

### 3. Loops (`for`, `while`)

* **Lecture & Concepts:**
    * Loops repeat a block of code — core to the **DRY (Don't Repeat Yourself)** principle.
    * **`for` Loop:** Use when you know *how many times* to loop.
    * **`while` Loop:** Use when you *don't* know how many times, only the condition to stop.
    * **WARNING:** A `while` loop **must** have a way for its condition to become `false`, or it becomes an infinite loop that crashes the browser tab.

* **In-Depth Example (Looping Your Form's Field Names):**
    ```javascript
    const fieldNames = ["name", "email", "message"];

    for (let i = 0; i < fieldNames.length; i++) {
      console.log(`Checking field: ${fieldNames[i]}`);
    }
    ```

* **⭐️ Class Exercise: Validate a Sample Message**
    1.  Create `let message = "";`.
    2.  Write an `if/else` that logs `"Please write a message before submitting."` if it's empty, or the message itself if not.
    3.  Refactor it into a ternary that logs the same result.

---

## Module 4: Functions (The Building Blocks)

Functions are the single most important concept in programming — and this week, you'll write the real ones your contact form depends on.

### 1. Function Basics (DRY)

* **Lecture & Concepts:**
    * A function is a **reusable, named block of code** that performs a specific task.
    * **Analogy:** A function is a **recipe**. Defining it writes the recipe down; calling it actually makes the dish.

* **In-Depth Example (Your First Real Validator):**
    ```javascript
    function isNotEmpty(value) {
      // .trim() removes leading/trailing whitespace, so "   " counts as empty too
      return value.trim().length > 0;
    }

    console.log(isNotEmpty("Hello"));  // true
    console.log(isNotEmpty(""));       // false
    console.log(isNotEmpty("   "));    // false
    ```

---

### 2. Parameters, Arguments & the `return` Keyword

* **Lecture & Concepts:**
    * **Parameter:** The variable name inside the function's parentheses (the "ingredient" placeholder).
    * **Argument:** The actual value you pass in when calling the function.
    * **`return`:** Sends a value back out of the function so you can store or use it. It also **immediately exits** the function — code after `return` never runs.
    * **Default Parameters (ES6):** Give a parameter a fallback value if none is passed: `function greet(name = "Guest") { ... }`.

* **In-Depth Example (Your Real Email Validator):**
    ```javascript
    function isValidEmail(email) {
      // A simple (not perfect, but good enough for a contact form) check
      return email.includes("@") && email.includes(".");
    }

    console.log(isValidEmail("alice@example.com")); // true
    console.log(isValidEmail("not-an-email"));       // false
    ```

---

### 3. Scope (Global, Function, Block)

* **Lecture & Concepts:**
    * Scope defines *where* a variable is accessible.
    * **Global Scope:** Declared outside any function — accessible everywhere. Minimize this.
    * **Function (Local) Scope:** Declared inside a function — only accessible inside it.
    * **Block Scope:** `let`/`const` declared inside `{}` (an `if` or loop) — only accessible in that block.

* **In-Depth Example:**
    ```javascript
    function isMessageLongEnough(message) {
      const minLength = 20; // local to this function
      return message.trim().length >= minLength;
    }

    console.log(isMessageLongEnough("Hi!")); // false
    // console.log(minLength); // ERROR! minLength isn't defined out here.
    ```

---

### 4. Closures (A First Look)

* **Lecture & Concepts:**
    * A **closure** is when a function "remembers" the variables around it, even after the outer function has finished running.
    * **The "Backpack" Analogy:** Imagine a function that returns a smaller function. That smaller function carries a "backpack" containing the variables it needs — even after it leaves the house (the outer function) it was born in.
    * **Why this matters for you right now:** it lets you write *one* function that *creates* validators with different rules, instead of writing a near-identical function for every field.

* **In-Depth Example (A Validator Factory):**
    ```javascript
    function createFieldValidator(minLength) {
      // 'minLength' gets "packed into the backpack" of the function below
      return function(value) {
        return value.trim().length >= minLength;
      };
    }

    // Two different validators, built from the SAME factory function
    const isMessageLongEnough = createFieldValidator(20); // your real form's rule
    const isNameLongEnough = createFieldValidator(2);

    console.log(isMessageLongEnough("Too short"));                          // false
    console.log(isMessageLongEnough("This message is definitely long enough")); // true
    console.log(isNameLongEnough("Al"));                                     // true
    ```

* **⭐️ Class Exercise: Build Your Real Validators**
    1.  Write `isValidEmail(email)`.
    2.  Write `isMessageLongEnough(message)` using your real form's `minlength` of 20 (from HTML Week 4).
    3.  Write `isContactMethodChosen(method)` that returns `true` if `method` is `"email"` or `"phone"`.
    4.  **Bonus:** Rewrite `isMessageLongEnough` using `createFieldValidator(20)` instead, and confirm it still works.

---

### 5. Testing Your Validators (Beyond `console.log`)

* **Lecture & Concepts:**
    * Calling a function and reading its output "by eye" isn't really testing — it leaves no record, no pass/fail signal, and nothing stops you from quietly breaking `isValidEmail` next week without noticing. A real **test** makes an assertion — "I expect exactly this" — and tells you clearly when it's wrong.
    * **Vitest** is a fast, modern JavaScript test runner. It runs in Node (not the browser), reads almost like plain English, and is the same tool you'll meet again in the React course.
    * **The browser-vs-Node wrinkle:** your validator functions live in `script.js`, loaded in the browser with a plain `<script defer>` tag — not as an ES module (that's a bigger change, coming properly in Week 6). But Vitest, running in Node, needs a way to pull a function *out* of `script.js` to test it. The fix is one small, honest guard: `module` only exists in Node, never in a browser, so checking for it first lets the same file work in both places without breaking either one.

* **In-Depth Example:**
    ```javascript
    // script.js
    function isValidEmail(email) {
      return email.includes("@") && email.includes(".");
    }

    function isMessageLongEnough(message) {
      const minLength = 20;
      return message.trim().length >= minLength;
    }

    // This block does nothing in the browser (module is undefined there),
    // but lets Node/Vitest pull these two functions out for testing.
    if (typeof module !== "undefined") {
      module.exports = { isValidEmail, isMessageLongEnough };
    }
    ```
    ```javascript
    // validators.test.js
    const { test, expect } = require('vitest');
    const { isValidEmail, isMessageLongEnough } = require('./script.js');

    test('isValidEmail accepts a real-looking email', () => {
      expect(isValidEmail('alice@example.com')).toBe(true);
    });

    test('isValidEmail rejects a string with no "@"', () => {
      expect(isValidEmail('not-an-email')).toBe(false);
    });

    test('isMessageLongEnough rejects a message under 20 characters', () => {
      expect(isMessageLongEnough('Too short')).toBe(false);
    });

    test('isMessageLongEnough accepts a message at least 20 characters long', () => {
      expect(isMessageLongEnough('This message is definitely long enough')).toBe(true);
    });
    ```

* **⭐️ Class Exercise: Write Your First Real Tests**
    1.  Run `npm init -y`, then `npm install -D vitest` inside your `portfolio` folder.
    2.  Add `"test": "vitest run"` to the `"scripts"` section of the generated `package.json`.
    3.  Add the `if (typeof module !== "undefined") { ... }` guard to the bottom of `script.js`, exporting `isValidEmail` and `isMessageLongEnough`.
    4.  Create `validators.test.js` with the four tests above, then run `npm test`. Confirm all four pass.
    5.  Break `isValidEmail` on purpose (delete the `.includes(".")` check), rerun `npm test`, and watch a test actually fail and explain why. That failure message is the entire point of writing tests — reload `index.html` in the browser too, and confirm the guard didn't break the page.

---

### Week 2: Comprehensive Assignment

**Objective:** Write the real validation logic your contact form will use — as plain functions you test with sample data. You'll connect them to the actual `submit` event once you learn events in Week 4.

**Files to Use:**
1.  `script.js`

**Requirements:**

1.  **`isValidEmail(email)`:** Returns `true`/`false` for a basic `"@"` + `"."` check.
2.  **`isMessageLongEnough(message)`:** Returns `true`/`false` based on your real form's `minlength="20"`.
3.  **`isContactMethodChosen(method)`:** Returns `true`/`false` for `"email"` or `"phone"`.
4.  **Real Tests:** A `validators.test.js` with at least one passing test per function (valid input) and one failing-case test (invalid input), run via `npm test` (Vitest) — not just a `console.log()` you read by eye.
5.  **Comments:** Explain, in a comment, why each function returns a boolean instead of logging directly — think ahead to how Week 4 will *use* that return value.

**Bonus Challenge:** Write `createFieldValidator(minLength)` as a closure, and use it to generate `isMessageLongEnough`. Explain in a comment what the "backpack" is in your version.
