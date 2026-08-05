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

### Week 2: Comprehensive Assignment

**Objective:** Write the real validation logic your contact form will use — as plain functions you test with sample data. You'll connect them to the actual `submit` event once you learn events in Week 4.

**Files to Use:**
1.  `script.js`

**Requirements:**

1.  **`isValidEmail(email)`:** Returns `true`/`false` for a basic `"@"` + `"."` check.
2.  **`isMessageLongEnough(message)`:** Returns `true`/`false` based on your real form's `minlength="20"`.
3.  **`isContactMethodChosen(method)`:** Returns `true`/`false` for `"email"` or `"phone"`.
4.  **Testing:** Call each function with at least 2 sample inputs (one valid, one invalid) and `console.log()` the results.
5.  **Comments:** Explain, in a comment, why each function returns a boolean instead of logging directly — think ahead to how Week 4 will *use* that return value.

**Bonus Challenge:** Write `createFieldValidator(minLength)` as a closure, and use it to generate `isMessageLongEnough`. Explain in a comment what the "backpack" is in your version.
