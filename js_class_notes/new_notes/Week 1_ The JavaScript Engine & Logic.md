# Week 1: The JavaScript Engine & Logic

**Goal:** Stop guessing. Understand exactly how JavaScript reads your code, stores data in memory, and makes decisions. This week focuses on the "under-the-hood" concepts that separate beginners from engineers.

---

## Module 1: The Environment & Memory

### 1. How JavaScript Works (The "Big Picture")

* **Lecture:**
    * JavaScript is a **High-Level** language (easy for humans to read), **Interpreted** (runs immediately line-by-line), and **Single-Threaded** (can only do one thing at a time).
    * **The Engine:** Code isn't magic. A browser engine (like **V8** in Chrome) reads your file, checks for errors, and executes it.
    * **Strict Mode:** Modern JS should always be written in "Strict Mode". It prevents silly errors (like using undeclared variables) and makes your code safer.
* **Best Practice:** Always start your scripts or modules with `'use strict';`.

### 2. Variables: Labels, Not Boxes

* **Concept:** Beginners think variables are boxes that hold data. Pros know variables are **labels pointing to a space in memory**.
* **`let` vs `const` (The Modern Standard):**
    * **`const`**: The default. Use this 95% of the time. It prevents the *identifier* from being reassigned (you can't point the label to a new thing).
    * **`let`**: Use only when you *know* the value will change (like a counter or a toggle).
    * **`var`**: **Deprecated.** Do not use. It has "function scope" and "hoisting" issues that cause bugs.

### 3. Data Types & Memory (Crucial!)

Understanding how data is stored is the key to avoiding bugs.

* **Primitives (Stored by Value):** String, Number, Boolean, Null, Undefined, Symbol.
    * When you copy a primitive, you create a *real, independent copy*. Changing one does not affect the other.
* **Reference Types (Stored by Reference):** Objects, Arrays, Functions.
    * When you copy an object, you are copying the **address** (the pointer), not the data itself. Changing the copy *changes the original* because they point to the same spot in memory.

* **In-Depth Example (Reference vs. Value):**
    ```javascript
    'use strict';

    // 1. Primitive (Value)
    let a = 10;
    let b = a; // b gets a COPY of the value 10
    b = 20;
    console.log(a); // 10 (Unchanged. Good!)

    // 2. Reference (Object)
    const player1 = { name: "Mario", score: 50 };
    const player2 = player1; // player2 gets the ADDRESS of player1, not a copy!

    player2.score = 100; // We change player2...

    console.log(player1.score); // 100 (Wait, what?! Player 1 changed too!)
    // WHY? Both variables point to the exact same object in memory.
    ```

* **Class Exercise (In-Class):**
    1.  Create an array `originalList = ["Apples", "Bananas"]`.
    2.  Create a new variable `newList = originalList`.
    3.  Add "Oranges" to `newList`.
    4.  Log `originalList`. Explain why "Oranges" is inside the original list.
    5.  **Fix it:** Use the **Spread Operator** (`[...]`) to create a *true copy* (we will cover this in depth later, but try `const newList = [...originalList]`).

---

## Module 2: Logic & Control Flow Deep Dive

### 1. Truthy & Falsy (The Logic Traps)

* **Lecture:** In JS, every value implies a boolean (true/false) when used in an `if` statement.
* **Falsy Values (Memorize these 6):**
    1.  `false`
    2.  `0` (The number zero)
    3.  `""` (Empty string)
    4.  `null`
    5.  `undefined`
    6.  `NaN` (Not a Number)
* **Truthy Values:** Everything else. Including empty arrays `[]` and empty objects `{}`.

### 2. Equality (`==` vs `===`)

* **Strict Equality (`===`):** Checks Value AND Type. **Always use this.**
* **Loose Equality (`==`):** Checks Value only (performs "Type Coercion").
    * `5 == "5"` is `true`. This causes bugs.
    * `5 === "5"` is `false`. This is safe.

### 3. Modern Logic Operators

Stop writing nested `if` statements. Use modern operators.

* **Short-circuiting:**
    * **`||` (OR):** Returns the *first* truthy value.
        * `const name = userInput || "Guest";` (If userInput is empty, use "Guest").
    * **`&&` (AND):** Returns the *first* falsy value, or the last value if all are true.
        * `isLoggedIn && showDashboard();` (If not logged in, stop. If logged in, run function).
    * **`??` (Nullish Coalescing - New!):** Like `||`, but only falls back if the value is `null` or `undefined` (it respects `0` or `""`).
        * `const score = userScore ?? 10;` (If userScore is 0, keep it 0. Only use 10 if score is actually missing).

---

## Module 3: Debugging Like a Pro

### 1. Beyond `console.log`

* **`console.table()`**: Displays arrays/objects in a clean table format.
* **`console.warn()` / `console.error()`**: For visual distinction in the console.
* **`console.dir()`**: View the interactive properties of a DOM element or object.

### 2. The Interactive Debugger

* **Lecture:** Stop guessing. Use the browser tools to pause code execution.
* **The `debugger;` keyword:**
    * Add `debugger;` inside your code.
    * Open Chrome DevTools (F12).
    * Refresh. The code **pauses** at that line.
    * You can hover over variables to see their *current* values in memory at that exact moment.

---

### 🛠 Week 1 Project: The "Smart Budget Calculator"

**Scenario:** You are building the core logic for a banking app. You need to calculate expenses, check for overdrafts, and format the output dynamically.

**Constraint:** No HTML/CSS yet. Pure Logic in the Console.

**Assignment Requirements:**

1.  **Setup:**
    * Create `index.html` and `script.js`. Link them.
    * Enable `'use strict';` at the top of your JS.

2.  **Data Storage:**
    * Create `const` variables for: `income` (Number), `rent` (Number), `food` (Number), `savingsTarget` (Number).
    * Create a variable `accountType` (String: "Basic" or "Premium").

3.  **Calculations:**
    * Calculate `totalExpenses`.
    * Calculate `remainingBalance` (`income - totalExpenses`).

4.  **Logic & Decisions:**
    * Use `if/else if/else` logic:
        * If `remainingBalance` is negative, log **"ERROR: Overdraft alert!"**.
        * If `remainingBalance` is positive but *less* than `savingsTarget`, log **"Warning: Savings target not met."**.
        * Otherwise, log **"Success: Budget on track."**

5.  **Modern Operator Challenge:**
    * Create a variable `actualSavings`.
    * Use the **Nullish Coalescing Operator (`??`)** to assign `actualSavings` a value of `remainingBalance` if it exists (is not null/undefined), or `0` if it is missing.

6.  **Debugging Challenge:**
    * Intentionally make a logical mistake (e.g., subtract income from expenses instead of vice-versa).
    * Add the `debugger;` line before the calculation.
    * Run the code, open DevTools, and step through to find exactly where the numbers go wrong.
