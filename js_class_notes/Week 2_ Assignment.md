# Week 2: Control Flow & Functions

This week is all about making your code smart. You'll learn how to make it make decisions (Control Flow) and how to package it into reusable blocks (Functions).

## Module 3: Control Flow

Control flow is how you make your program "decide" what to do next. Instead of just running from top to bottom, it can take different paths based on different conditions.

### 1. Conditional Statements (`if`, `else if`, `else`)

* **Lecture & Concepts:**
    * This is the most common way to make a decision. The analogy is a fork in the road: "IF a condition is true, THEN go this way, ELSE go that way."
    * **`if`:** The block that runs *only if* the condition is `true`.
    * **`else if`:** An *optional* second check if the first `if` was `false`. You can chain as many as you want.
    * **`else`:** An *optional* "catch-all" block that runs if *all* previous `if` and `else if` conditions were `false`.

* **In-Depth Example (Grading):**
    ```javascript
    let score = 82;

    if (score >= 90) {
      console.log("You get an A!");
    } else if (score >= 80) {
      // The score is not >= 90, but is it >= 80?
      // 82 is, so this block runs.
      console.log("You get a B.");
    } else if (score >= 70) {
      console.log("You get a C.");
    } else {
      // Runs if score is 69 or less
      console.log("You need to study more.");
    }
    // Output: "You get a B."
    ```
[Image of a simple if-else flowchart]

* **Crucial Concept: Truthy & Falsy**
    * JavaScript's `if` statement doesn't just check for `true`. It checks if a value is **"truthy"** or **"falsy"**.
    * **Falsy Values:** There are only 6 values that are "falsy." You must memorize them!
        * `false`
        * `0` (the number zero)
        * `""` (an empty string)
        * `null`
        * `undefined`
        * `NaN` (Not a Number)
    * **Truthy Values:** *Everything else.* Any string with content ("hello", "0"), any number (1, -10), objects, and arrays are all **truthy**.
    * **Modern Example (Checking for input):**
        ```javascript
        let username = ""; // This is a falsy value

        if (username) { // This is the same as (username === true)
          console.log(\`Welcome, ${username}\`);
        } else {
          console.log("Please enter your username!");
        }
        // Output: "Please enter your username!"
        ```

---

### 2. `switch` Statement

* **Lecture & Concepts:**
    * A `switch` statement is a *cleaner alternative* to a long `if...else if...else` chain, but *only* when you are checking a **single variable** against **multiple exact values**.
    * **`case`:** Defines one of the values to check for.
    * **`break`:** This is **CRITICAL**. It tells JS to "break out" of the `switch` block. If you forget it, the code will "fall through" and run the next `case`'s code, which is almost always a bug.
    * **`default`:** This is the same as the `else` block. It runs if no other `case` matches.

* **In-Depth Example (Day of the Week):**
    ```javascript
    // new Date().getDay() returns a number: 0 = Sunday, 1 = Monday, etc.
    let dayNumber = 3; // Let's pretend it's Wednesday
    let dayName;

    switch (dayNumber) {
      case 0:
        dayName = "Sunday";
        break; // Stop!
      case 1:
        dayName = "Monday";
        break;
      case 2:
        dayName = "Tuesday";
        break;
      case 3:
        dayName = "Wednesday";
        break; // This one matches
      case 4:
        dayName = "Thursday";
        break;
      case 5:
        dayName = "Friday";
        break;
      case 6:
        dayName = "Saturday";
        break;
      default:
        dayName = "Invalid day number";
    }

    console.log(\`Today is ${dayName}.\`);
    // Output: "Today is Wednesday."
    ```

---

### 3. Ternary Operator

* **Lecture & Concepts:**
    * A clean, one-line "shorthand" for a simple `if/else` statement. It's an "operator" because it returns a value.
    * **Syntax:** `condition ? valueIfTrue : valueIfFalse;`

* **In-Depth Example (Access Control):**
    * **The `if/else` way (5 lines):**
        ```javascript
        let age = 20;
        let message;
        if (age >= 18) {
          message = "Access Granted";
        } else {
          message = "Access Denied";
        }
        ```
    * **The Ternary way (1 line):**
        ```javascript
        let age = 20;
        let message = (age >= 18) ? "Access Granted" : "Access Denied";

        console.log(message);
        // Output: "Access Granted"
        ```

---

### 4. Loops (`for`, `while`)

* **Lecture & Concepts:**
    * Loops are for repeating a block of code multiple times. This is a core part of the **DRY (Don't Repeat Yourself)** principle.

    * **`for` Loop:**
        * **When to use:** When you know exactly *how many times* you want to loop. (e.g., "count from 1 to 10," "check all 50 items in this list").
        * **Syntax Breakdown:** `for ( [initialization]; [condition]; [increment] ) { ... }`
            1.  **`let i = 0`:** The *initialization*. Runs *once* at the very beginning. Creates a counter variable `i`.
            2.  **`i < 10`:** The *condition*. Checked *before* every loop. If `true`, the loop runs. If `false`, the loop stops.
            3.  **`i++`:** The *increment*. Runs *after* every loop. (`i++` is shorthand for `i = i + 1`).
[Image of a for loop flowchart]

    * **`while` Loop:**
        * **When to use:** When you *don't* know how many times, but you know the *condition to stop*. (e.g., "keep rolling the dice *while* you don't get a 6," "keep asking for a password *while* it's incorrect").
        * **WARNING:** You **must** include a way for the condition to become `false`. If you forget (e.g., you forget `count++`), you will create an **infinite loop** that crashes the browser!

* **In-Depth Example (`for` vs. `while`):**
    * **`for` loop (counting 1 to 5):**
        ```javascript
        for (let i = 1; i <= 5; i++) {
          console.log(\`[for loop] Counting... ${i}\`);
        }
        // Output:
        // [for loop] Counting... 1
        // [for loop] Counting... 2
        // ...
        // [for loop] Counting... 5
        ```
    * **`while` loop (same task):**
        ```javascript
        let count = 1; // 1. Initialization
        while (count <= 5) { // 2. Condition
          console.log(\`[while loop] Counting... ${count}\`);
          count++; // 3. Increment (CRITICAL!)
        }
        ```
* **`break` and `continue` (Controlling Loops):**
    * **`break`:** Jumps *out* of the loop entirely.
    * **`continue`:** Skips the *rest of the current iteration* and jumps to the next one.
    * **Example (Skipping 13):**
        ```javascript
        for (let i = 10; i <= 15; i++) {
          if (i === 13) {
            console.log("Skipping 13...");
            continue; // Stop this loop, go to i=14
          }
          console.log(\`Number is ${i}\`);
        }
        // Output:
        // Number is 10
        // Number is 11
        // Number is 12
        // Skipping 13...
        // Number is 14
        // Number is 15
        ```

---
---

## Module 4: Functions (The Building Blocks)

Functions are the single most important concept in programming. A function is a **reusable, named block of code** that performs a specific task.

### 1. Function Basics (DRY)

* **Lecture & Concepts:**
    * The **DRY (Don't Repeat Yourself)** principle is key. If you find yourself copying and pasting the same code, you should put it in a function.
    * **Analogy:** A function is like a **recipe** in a cookbook.
        * **Defining the function:** Writing the recipe down (e.g., `function makeSandwich() { ... }`).
        * **Calling the function:** Actually *making* the sandwich (e.g., `makeSandwich();`). You can "call" it as many times as you want.

* **In-Depth Example (Function Declaration):**
    ```javascript
    // 1. DEFINING the function (the "recipe")
    // This code does NOT run yet. It's just being stored.
    function greet() {
      console.log("Hello!");
      console.log("Welcome to the program.");
    }

    // 2. CALLING the function (running the code)
    greet(); // Output: "Hello!" "Welcome to the program."
    greet(); // Output: "Hello!" "Welcome to the program."
    ```

---

### 2. Parameters & Arguments

* **Lecture & Concepts:**
    * Right now, our `greet()` function is static. It does the same thing every time. How do we make it dynamic? With **parameters**.
    * **Parameter:** The variable name *inside the function's parentheses* (the recipe's "ingredient" placeholder, e.g., `breadType`).
    * **Argument:** The *actual value* you "pass in" when you *call* the function (the specific "ingredient" you use, e.g., `"wheat"`).

* **In-Depth Example (Parameters):**
    ```javascript
    // 'name' is a PARAMETER
    function greetUser(name) {
      console.log(\`Hello, ${name}!\`);
    }

    // "Alice" is the ARGUMENT
    greetUser("Alice"); // Output: "Hello, Alice!"

    // "Bob" is the ARGUMENT
    greetUser("Bob");   // Output: "Hello, Bob!"
    ```
* **Modern Feature (ES6 Default Parameters):**
    * What happens if you call `greetUser()` with no argument?
    * `greetUser();` // Output: "Hello, undefined!" (Yuck!)
    * We can set a **default value** for the parameter.
    ```javascript
    // 'name = "Guest"' sets a default value
    function greetUser(name = "Guest") {
      console.log(\`Hello, ${name}!\`);
    }

    greetUser("Alice"); // Output: "Hello, Alice!"
    greetUser();        // Output: "Hello, Guest!" (Much better!)
    ```

---

### 3. The `return` Keyword

* **Lecture & Concepts:**
    * Some functions just *do* things (like `console.log`), but often you want a function to *give you a value back* so you can use it.
    * **Analogy:** A function is a factory. `console.log` is a sign on the factory wall. `return` is the truck that *ships the product* out of the factory.
    * When you `return` a value, you can store it in a variable.
    * `return` also **immediately exits the function**. Any code after `return` is *never* run.

* **In-Depth Example (Calculator):**
    ```javascript
    function add(num1, num2) {
      return num1 + num2;
      // This code is unreachable!
      console.log("This will never print.");
    }

    // Call the function AND store the returned value
    let sum = add(5, 10);

    console.log(sum); // Output: 15

    let total = add(sum, 3); // We can use the variable as an argument!
    console.log(total); // Output: 18
    ```

---

### 4. Scope (Global vs. Local)

* **Lecture & Concepts:**
    * Scope defines *where* your variables are accessible. This is a critical concept for avoiding bugs.
    * **Analogy:** "What happens in Vegas, stays in Vegas." (Vegas is the function).
    * **Global Scope:** Variables declared *outside* any function. They are accessible *everywhere*. This can be dangerous and should be minimized.
    * **Local Scope (or Function Scope):** Variables declared *inside* a function (with `let` or `const`). They are **only** accessible inside that function. They are born when the function is called and "die" when it's over.
    * **Block Scope (`let`/`const`):** Variables declared inside `{...}` (like an `if` or `for` loop) are *only* accessible inside that block. This is a feature of `let` and `const` and is very helpful.

[Image of JavaScript variable scope (global vs local)]
* **In-Depth Example (Scope):**
    ```javascript
    let globalMessage = "I am global"; // Global Scope

    function myFunc() {
      let localMessage = "I am local"; // Local Scope

      console.log(globalMessage); // "I am global" (Functions can see "out")
      console.log(localMessage);  // "I am local"
    }

    myFunc();

    console.log(globalMessage); // "I am global"
    // console.log(localMessage); // ERROR! localMessage is not defined
    // The "outside" cannot see "in" to the function.
    ```

---

### 5. Function Expressions

* **Lecture & Concepts:**
    * So far, we've used **Function Declarations:** `function greet() {}`.
    * There is another way: a **Function Expression**. This is when you assign an *anonymous (unnamed) function* to a variable.
    * This is a very common pattern in modern JavaScript, and it's the foundation for arrow functions (which you'll learn in Week 5).

* **In-Depth Example (Declaration vs. Expression):**
    ```javascript
    // 1. Function DECLARATION
    function add(a, b) {
      return a + b;
    }

    // 2. Function EXPRESSION
    //    We assign an anonymous function to a constant.
    const subtract = function(a, b) {
      return a - b;
    }; // Note the semicolon here

    // You call them the same way:
    console.log( add(10, 5) );      // Output: 15
    console.log( subtract(10, 5) ); // Output: 5
    ```
* **Key Difference (Hoisting):**
    * Function *Declarations* are "hoisted," meaning the browser mentally moves them to the top of the file. You can call them *before* they are defined.
    * Function *Expressions* are *not* hoisted. You must define them *before* you can call them, just like any other variable.

---

### Week 2: Comprehensive Assignment

**Objective:** Refactor your Week 1 "Temperature Converter" into reusable, professional functions.

**Files to Create:**
1.  `index.html` (You can reuse your file from Week 1)
2.  `script.js`

#### Part 1: The HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Week 2 Assignment</title>
</head>
<body>
  <h1>Week 2: Control Flow & Functions</h1>
  <p>Open the console (F12) to see the assignment results!</p>

  <script src="script.js"></script>
</body>
</html>
```

#### Part 2: The JavaScript (`script.js`)
```javascript
// --- Week 2 Assignment ---

console.log("--- Starting Week 2 Assignment ---");

// ===================================
// MODULE 4: FUNCTIONS
// ===================================

console.log("--- Module 4: Functions ---");

// 1. FUNCTION DECLARATION
//    Create a function named `celsiusToFahrenheit`.
//    It should take one PARAMETER: `celsius`
//    It should RETURN the temperature in Fahrenheit.
//    (Formula: F = (C * 9/5) + 32)


/*
YOUR ANSWER
SHOULD BE WRITTEN HERE!
*/


// 2. FUNCTION EXPRESSION
//    Create a function expression named `fahrenheitToCelsius`.
//    It should take one PARAMETER: `fahrenheit`
//    It should RETURN the temperature in Celsius.
//    (Formula: C = (F - 32) * 5/9)

/*
YOUR ANSWER
SHOULD BE WRITTEN HERE!
*/


// 3. CALLING FUNCTIONS & USING RETURN VALUES
//    - Call `celsiusToFahrenheit` with an argument of 25.
//    - Store the result in a `const` named `f1`.
//    - Call `fahrenheitToCelsius` with an argument of 68.
//    - Store the result in a `const` named `c1`.

/*
YOUR ANSWER
SHOULD BE WRITTEN HERE!
*/


// ===================================
// BONUS: COMBINING MODULES
// ===================================

console.log("--- Bonus: Conversion Table ---");

// 1. FOR LOOP + FUNCTION
//    Write a `for` loop that counts from 0 to 20 (inclusive).
//    - Inside the loop, call your `celsiusToFahrenheit` function
//      with the loop's counter variable (e.g., `i`) as the argument.
//    - Store the result in a variable.
//    - Log a message like "0°C = 32°F", "1°C = 33.8°F", etc.
//    - (Bonus challenge: Use a `while` loop to do the same thing!)

/*
YOUR ANSWER
SHOULD BE WRITTEN HERE!
*/

console.log("--- End of Week 2 Assignment ---");
```
