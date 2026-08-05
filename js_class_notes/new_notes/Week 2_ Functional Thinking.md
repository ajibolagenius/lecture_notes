# Week 2: Functional Thinking

**The Goal:** We've learned how the engine reads code. In Week 2, we learn how to architect it. JavaScript is a "Functional Language" at its core. Mastering functions—not just as reusable code blocks, but as data that can be passed around and remembered—is the key to unlocking the true power of the language.

---

## Module 4: Functions are First-Class Citizens

In many languages, functions are just "subroutines"—sets of instructions. In JavaScript, functions are **Values**, just like numbers or strings. We call them "First-Class Citizens" because they are treated with the same rights as any other data type.

### 1. Anatomy of a Function (The 3 Ways)

* **Function Declaration (The Old Reliable):**
    * Uses the `function` keyword.
    * **Hoisted:** You can call it *before* you define it in the file.
    ```javascript
    sayHello(); // Works!

    function sayHello() {
        console.log("Hello!");
    }
    ```

* **Function Expression (The Variable Way):**
    * You create a function and assign it to a variable (`const` or `let`).
    * **Not Hoisted:** You must define it before you call it.
    * **Why use it?** It enforces a cleaner code structure (define first, use later).
    ```javascript
    // sayHi(); // Error! Cannot access 'sayHi' before initialization

    const sayHi = function() {
        console.log("Hi!");
    };
    ```

* **Arrow Functions (The Modern Standard):**
    * Introduced in ES6. Shorter syntax.
    * **Implicit Return:** If you have one line of code, you don't need `{}` or `return`.
    * **Lexical `this`:** (Advanced) They don't create their own context. They inherit `this` from the parent. This solves 90% of "scope bugs" in modern apps.

    ```javascript
    // Old
    const add = function(a, b) {
        return a + b;
    };

    // Modern (Implicit Return)
    const addArrow = (a, b) => a + b;
    ```

### 2. Functions as Data

This is the hardest concept for beginners to grasp, but the most important.

* **You can store a function in an array:**
    `const funcs = [console.log, alert];`
* **You can pass a function into another function:**
    `myButton.addEventListener('click', runThisCode);`
* **You can return a function from a function:** (This creates a Closure—see Module 5).

> **💡 The "Worker" Analogy:**
> Think of a Function not as a "Recipe", but as a **"Specialist Worker"** (e.g., a plumber).
> * You can hire the plumber and assign them a name (`const plumber = ...`).
> * You can send the plumber to a job site (`doWork(plumber)`).
> * The plumber is an *object* (a person), not just a list of instructions.

---

## Module 5: Scope & Closures

This is widely considered the most difficult concept in JavaScript interviews.

### 1. The Scope Chain (The Tinted Windows)

Scope defines "who can see who."
* **Global Scope:** Variables defined outside everything. Accessible everywhere.
* **Function Scope:** Variables defined inside a function. Accessible *only* inside that function.
* **Block Scope (`let`/`const`):** Variables defined inside `{}` (if statements, loops). Accessible only in that block.

**The Rule:** You can look **OUT**, but you can't look **IN**.
* An inner function can access global variables.
* The global scope cannot access inner function variables.



[Image of JavaScript Scope Chain Diagram]


### 2. Closures (The "Backpack")

Normally, when a function finishes running, its local variables are deleted from memory (Garbage Collected). **Closures break this rule.**

* **Definition:** A Closure is when a function "remembers" its lexical scope (the variables around it) even when that function is executed outside that scope.

> **💡 The "Backpack" Analogy:**
> Imagine a function `createCounter`. Inside, you define a variable `count = 0`.
> You return a small inner function that adds `1` to `count`.
> When that small function leaves the `createCounter` house, it takes a **Backpack** with it. Inside the backpack is the variable `count`. Even though `createCounter` is finished, the small function still carries the backpack wherever it goes.

* **In-Depth Example (Data Privacy):**
    ```javascript
    function createBank() {
        let balance = 0; // This variable is PRIVATE. Nobody can touch it directly.

        return {
            deposit: function(amount) {
                balance += amount;
                console.log(`Deposited ${amount}. New Balance: ${balance}`);
            },
            showBalance: function() {
                console.log(`Current Balance: ${balance}`);
            }
        };
    }

    const myBank = createBank(); // createBank finishes running here.

    myBank.deposit(100); // Output: 100
    myBank.deposit(50);  // Output: 150
    // console.log(balance); // ERROR! 'balance' is not defined. It's hidden in the closure!
    ```


---

## Module 6: Callbacks & Higher-Order Functions

### 1. Higher-Order Functions (HOF)

A function is "Higher-Order" if it does one of two things:
1.  **Takes a function as an argument.** (e.g., `addEventListener`).
2.  **Returns a function.** (e.g., our `createBank` example above).

**Why do we need them?** Abstraction.
Instead of writing a loop to filter an array, we write a function that handles the *logic* of filtering, and we pass it a specific function to decide *what* to filter.

### 2. Callbacks (Don't Call Us, We'll Call You)

A **Callback** is a function you pass into another function to be executed **later**.

* **Synchronous Callback:** Runs immediately (e.g., inside `.forEach`).
* **Asynchronous Callback:** Runs later, when a task is done (e.g., `setTimeout`, getting data from a server).

* **In-Depth Example:**
    ```javascript
    // HOF: This function takes a 'formatter' function as an input
    function greetUser(name, formatter) {
        const formattedName = formatter(name);
        console.log(`Hello, ${formattedName}!`);
    }

    // Callback 1
    const upperCaseFormatter = (text) => text.toUpperCase();

    // Callback 2
    const excitedFormatter = (text) => text + "!!!";

    greetUser("Alice", upperCaseFormatter); // "Hello, ALICE!"
    greetUser("Bob", excitedFormatter);     // "Hello, Bob!!!"
    ```

### 3. Callback Hell (The Pyramid of Doom)

When you chain too many asynchronous callbacks, code becomes unreadable. This is why we invented Promises (Week 6), but you must recognize the problem first.

```javascript
// AVOID THIS PATTERN
getData(function(a) {
    getMoreData(a, function(b) {
        getEvenMoreData(b, function(c) {
            getFinalData(c, function(d) {
                console.log(d);
            });
        });
    });
});
````

-----

## 🛠 Week 2 Project: The "Game State Manager"

**Scenario:** You are building the logic for a simple RPG game. You need to manage a player's stats (Health, XP, Level) securely so that other parts of the code cannot "cheat" and change the stats manually. You also need to trigger events when the player levels up.

**Constraints:** Use Closures for state management. Use Callbacks for events.

### Assignment Requirements:

1.  **Setup:** Create `index.html` and `script.js`.
2.  **The Player Factory (Closure):**
      * Create a function `createPlayer(name, startingHealth)`.
      * Inside, create private variables: `hp`, `xp`, `level`.
      * Return an object with methods:
          * `getName()`: returns name.
          * `getStats()`: returns a string like "HP: 100, Level: 1".
          * `takeDamage(amount)`: decreases HP.
          * `gainXP(amount)`: increases XP.
3.  **The Logic (Conditionals inside Closure):**
      * In `gainXP`, if XP goes over 100, reset XP to 0 and increase Level by 1.
4.  **The Event System (Callbacks):**
      * Add a parameter to `createPlayer` called `onLevelUp`. This is a callback function.
      * When the level increases, **call** this function and pass the new level.
5.  **Implementation:**
      * Create a player "Hero". Pass a callback that alerts: "CONGRATS\! You reached Level X\!".
      * Simulate a game in the console: Gain XP until you level up and verify the callback fires.
      * Try to hack it: Try to access `player.hp` directly. It should be `undefined`.

### 📝 Week 2 Class Exercise (In-Class)

**Topic:** Scope & `var` vs `let`
**Task:**

1.  Write a loop using `var`: `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 1000); }`
2.  Run it. **Question:** Why does it print "3, 3, 3" instead of "0, 1, 2"? (Hint: `var` is function scoped, not block scoped. There is only *one* variable `i` shared by all 3 timeouts).
3.  **Fix it:** Change `var` to `let`. Explain why this fixes the issue (Block Scope creates a *new* `i` for every loop iteration).
