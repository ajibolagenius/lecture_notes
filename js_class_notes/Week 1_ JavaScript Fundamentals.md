# Week 1: JavaScript Fundamentals

## Module 1: Introduction to JavaScript

### 1. What is JavaScript?

* **Lecture & Concepts:**
    * JavaScript (JS) is the **programming language of the web**.
    * Think of a website as a person:
        * **HTML (HyperText Markup Language):** The **skeleton**. It provides the structure and content (headings, paragraphs, images).
        * **CSS (Cascading Style Sheets):** The **skin, clothes, and appearance**. It provides the style (colors, fonts, layout).
        * **JavaScript (JS):** The **muscles and brain**. It provides **behavior and interactivity**.
    * Without JS, a website is just a static document. With JS, you can create image sliders, validate forms, show pop-up messages, fetch new content without reloading the page, create games, and much more. It makes the web *dynamic*.
    * **Client-Side Scripting:** This means the JS code is downloaded to the user's browser (the "client") and runs *there*. This allows the page to react to user input (like clicks and mouse-overs) instantly.

* **In-Depth Example (The "Aha!" Moment):**
    * **`index.html` (The "Before"):**
        ```html
        <!DOCTYPE html>
        <html>
        <head>
          <title>My First JS Page</title>
        </head>
        <body>
          <h1>Hello, World!</h1>
          <button id="myButton">Click Me</button>
        </body>
        </html>
        ```
    * **Problem:** If you open this file, the button exists, but it *does nothing*. It's just a skeleton.
    * **The "After" (with a little JS):**
        * We'll add a file `script.js` to *make the button work*.
        ```javascript
        // This code finds the button and the heading.
        // Don't worry about the syntax yet, just see what it *does*.

        const button = document.getElementById('myButton');
        const heading = document.querySelector('h1');

        // Tell the button: "When you are clicked, run this code."
        button.onclick = function() {
          heading.textContent = 'You clicked the button!';
        }
        ```
    * **Result:** Now, when you click the button, the `<h1>` text *changes*. That's interactivity! That's JavaScript.

---

### 2. How to Add JS

* **Lecture & Concepts:** There are three ways, just like CSS.

    1.  **External JS (Best Practice):**
        * You write all your JS in a separate file (e.g., `script.js`).
        * You link it from your HTML, **usually right before the closing `</body>` tag.**
        * **Why at the bottom?** The browser parses HTML from top to bottom. If your JS runs *before* the HTML elements (like your button) exist, it will crash, saying "button not found." By placing it at the end, we ensure all HTML is loaded *before* the JS tries to find it.
        * **Syntax:** `<script src="script.js"></script>`

    2.  **Internal JS:**
        * You write your JS code directly in your HTML file inside `<script>` tags.
        * **Pros:** Good for very small, quick tests.
        * **Cons:** Clutters your HTML and can't be reused on other pages.
        * **Syntax:**
            ```html
            <script>
              alert('This is internal JS!');
            </script>
            ```

    3.  **Inline JS (Avoid):**
        * You add JS directly to an HTML attribute, like `onclick`.
        * **Cons:** This is the old way. It's messy, hard to read, and mixes your logic (JS) with your structure (HTML).
        * **Syntax:** `<button onclick="alert('You clicked me!')">Click Me</button>`

* **In-Depth (Modern): `defer` and `async`**
    * What if you *want* to put your script in the `<head>`?
    * `<script **defer** src="script.js"></script>`: This is the **modern best practice**. It tells the browser: "Download this script *while* you keep parsing the HTML, but don't run it until *after* you're finished parsing." It's fast and safe.
    * `<script **async** src="script.js"></script>`: This is for 3rd-party scripts (like Google Analytics) that don't need to interact with your HTML. It means "Download and run this script as soon as you can, I don't care about the order."

---

### 3. The Browser Console

* **Lecture & Concepts:**
    * The console is your **most important debugging tool**. It's like a stethoscope for your code.
    * It's where the browser will report errors, and it's where you can print your own messages to "see" what your code is doing.
    * **How to Open:** In Chrome/Firefox, press **F12** or **Ctrl+Shift+I** (Cmd+Opt+I on Mac) and click the "Console" tab.
    * **`console.log()`:** This is the primary command. It "logs" (prints) a message to the console.

* **In-Depth Example:**
    * In your `script.js` file, you can write:
        ```javascript
        console.log("My script file has loaded!");

        let x = 10;
        let y = 20;

        console.log("The value of x is:");
        console.log(x); // Will print 10

        console.log("The value of x + y is:", x + y); // Will print "The value of x + y is: 30"

        // Other useful console commands:
        console.warn("This is a warning message."); // Yellow warning
        console.error("This is an error message."); // Red, scary error
        ```
    * Go ahead! Open your `index.html` file in the browser, open the console, and you'll see these messages.

---

### 4. Comments

* **Lecture & Concepts:**
    * Comments are notes for humans (you, your team, or your future self). The browser's JavaScript engine completely ignores them.
    * **Single-Line Comment:** Starts with `//`. Everything after it on that line is ignored.
    * **Multi-Line Comment:** Starts with `/*` and ends with `*/`. Everything in between is ignored.

* **In-Depth Example (Best Practices):**
    * Comments should explain the **"why,"** not the **"what."**
    * **Bad Comment (The "what"):**
        ```javascript
        // This adds 1 to the score
        score = score + 1;
        ```
        (Duh, we can read that.)
    * **Good Comment (The "why"):**
        ```javascript
        // Increment score when user clicks the correct answer
        score = score + 1;
        ```
        (Ah, *that's* why we're doing this.)

---

## Module 2: Variables, Data Types & Operators

### 1. Variables (`let`, `const`, `var`)

* **Lecture & Concepts:**
    * A variable is like a **labeled box** where you can store information (data).
    * To create a box, you "declare" it. To put stuff in it, you "assign" it.
    * **Modern JavaScript (ES6) uses `let` and `const`.**
    * **`const` (constant):** This creates a box that is **locked**. You *must* put a value in it when you create it, and you can *never* change the value. This is the **default choice.** Use it whenever you can.
    * **`let`:** This creates a box where you **can** change the value later. Use this *only* when you know the value needs to be re-assigned (like a counter or a game score).
    * **`var` (The "Old Way"):** You will see this in old tutorials. **Do not use it.** It has confusing "scoping" rules that `let` and `const` were invented to fix.

* **In-Depth Example:**
    ```javascript
    // Using const (Best Practice)
    const myName = "Alice";
    const birthYear = 1995;

    // myName = "Bob"; // This will cause an ERROR! (TypeError: Assignment to constant variable)
    // const score;   // This will cause an ERROR! (SyntaxError: Missing initializer)

    // Using let (When you need to change it)
    let currentScore = 0;
    console.log("Your score is:", currentScore); // 0

    currentScore = 100;
    console.log("Your score is:", currentScore); // 100

    // The 'var' problem (why we don't use it)
    // 'var' "leaks" out of blocks. This is confusing.
    if (true) {
      var oldWay = "I'm here";
    }
    console.log(oldWay); // "I'm here" -- It leaked!

    if (true) {
      let newWay = "I'm here";
    }
    // console.log(newWay); // This causes an ERROR (ReferenceError), which is GOOD. It protects us.
    ```

---

### 2. Data Types (Primitives)

* **Lecture & Concepts:**
    * These are the different *types* of data you can put in your variable boxes.
    * JavaScript is **dynamically typed**, meaning you don't have to tell the box what type of data it holds.
    * **The 5 Primitives you need to know:**
        1.  **String:** Text. Must be in quotes (`"`, `'`, or `` ` ``).
            * `const name = "Jane";`
        2.  **Number:** Any number (integers, decimals, negatives).
            * `const age = 25;`
            * `const price = 19.99;`
        3.  **Boolean:** Logical `true` or `false`. (Like a light switch).
            * `const isLoggedIn = true;`
        4.  **`undefined`:** A variable that has been declared but has no value. The box is empty. This is usually accidental.
            * `let car; // car is 'undefined'`
        5.  **`null`:** An *intentional* absence of value. You, the developer, set it to `null` to say "This box is *intentionally* empty."
            * `let selectedUser = null;`
    * **`typeof` Operator:** A tool to check the type of a variable.
        * `console.log(typeof name);` // "string"
        * `console.log(typeof age);` // "number"
        * `console.log(typeof isLoggedIn);` // "boolean"

---

### 3. Strings & Concatenation

* **Lecture & Concepts:**
    * "Concatenation" is just a fancy word for "joining strings together."
    * **The "Old Way" (`+` operator):**
        ```javascript
        const firstName = "John";
        const lastName = "Doe";
        const greeting = "Hello, " + firstName + " " + lastName + "!";
        // greeting is "Hello, John Doe!"
        ```
    * **Type Coercion:** This is a major "gotcha." If you use `+` with a string and a number, JavaScript will "coerce" (force) the number to become a string.
        * `"The answer is " + 42`  // Becomes `"The answer is 42"`
        * `"5" + 10` // Becomes `"510"` (Uh oh!)
        * `5 + 10 + "Hello"` // Becomes `15 + "Hello"` -> `"15Hello"`
    * **The "Modern Way" (ES6 Template Literals):**
        * This is the **best practice**. Use backticks (`` ` ``) instead of regular quotes.
        * Inside backticks, you can embed variables directly using `${...}`. It's cleaner, easier to read, and avoids coercion weirdness.
        ```javascript
        const name = "Sarah";
        const age = 30;

        // The modern, clean way:
        const message = \`Hello, my name is ${name} and I am ${age} years old.\`;
        // message is "Hello, my name is Sarah and I am 30 years old."
        ```

---

### 4. Operators

* **Lecture & Concepts:** Operators are symbols that *perform operations* on your variables.

    * **1. Arithmetic Operators:**
        * `+` (Add), `-` (Subtract), `*` (Multiply), `/` (Divide)
        * `%` (Modulo): The **remainder** operator. This is surprisingly useful.
            * `10 % 3` // 1 (10 / 3 is 3 with a remainder of 1)
            * `11 % 2` // 1 (It's an odd number)
            * `12 % 2` // 0 (It's an even number)

    * **2. Assignment Operators:**
        * `=` (Assign a value): `let x = 10;`
        * `+=` (Add and assign): `x += 5;` (Same as `x = x + 5;`)
        * `-=` (Subtract and assign): `x -= 2;` (Same as `x = x - 2;`)

    * **3. Comparison Operators (CRITICAL):**
        * These operators compare two values and **always** return a boolean (`true` or `false`).
        * `>` (Greater than), `<` (Less than), `>=` (Greater or equal), `<=` (Less or equal)
        * **`==` vs. `===` (The MOST IMPORTANT rule):**
            * `==` (Loose Equality): **AVOID.** Checks *value* only, and will coerce types. This is a source of many bugs.
                * `5 == "5"` // `true` (Bad!)
                * `0 == false` // `true` (Bad!)
            * `===` (Strict Equality): **ALWAYS USE.** Checks *value AND type*.
                * `5 === "5"` // `false` (Good!)
                * `0 === false` // `false` (Good!)
            * (The same applies to `!=` (loose) vs. `!==` (strict). **Always use `!==`**.)

    * **4. Logical Operators:**
        * Used to combine boolean expressions.
        * `&&` (AND): **Both** sides must be `true`.
            * `const canDrive = (age > 16) && (hasLicense === true);`
        * `||` (OR): **At least one** side must be `true`.
            * `const canEnter = (isMember === true) || (hasGuestPass === true);`
        * `!` (NOT): Flips the value.
            * `const isLoggedOut = !isLoggedIn;` (If `isLoggedIn` is `true`, `isLoggedOut` is `false`)

---

### Week 1: Comprehensive Assignment

**Objective:** Build a "Temperature Converter" in the console, using all the concepts from this week.

**Files to Create:**
1.  `index.html` (It can be mostly empty, just make sure to link your script!)
2.  `script.js`

#### Part 1: The HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Week 1 Assignment</title>
</head>
<body>
  <h1>JavaScript Fundamentals - Week 1</h1>
  <p>Open the console (F12) to see the assignment results!</p>

  <script src="script.js"></script>
</body>
</html>
```

#### Part 2: The JavaScript (`script.js`)

```javascript
// --- Week 1 Assignment ---

console.log("--- Starting Week 1 Assignment ---");

// 1. VARIABLE & DATA TYPE
//    Create a \`const\` variable named \`celsiusTemp\` and set its value to 25.
const celsiusTemp = 25;


// 2. ARITHMETIC OPERATORS & CONSOLE LOG
//    Use the formula F = (C * 9/5) + 32 to convert Celsius to Fahrenheit.
//    Create a \`const\` variable named \`fahrenheitTemp\` for the result.
//    Log the result in a human-readable way.
const fahrenheitTemp = (celsiusTemp * 9/5) + 32;

console.log("--- Temperature Conversion ---");
console.log(celsiusTemp + "°C is " + fahrenheitTemp + "°F");


// 3. TEMPLATE LITERALS (MODERN)
//    Re-do the log from step 2, but this time using a Template Literal (backticks).
//    This is the preferred modern way.
console.log(\`${celsiusTemp}°C is ${fahrenheitTemp}°F\`);


// 4. COMPARISON & LOGICAL OPERATORS
//    Let's set a "comfortable" range.
const comfortableMinC = 15;
const comfortableMaxC = 25;

//    Use comparison and logical operators (&&) to check if \`celsiusTemp\` is
//    within this range (inclusive).
//    Store the result (true or false) in a \`const\` named \`isComfortable\`.
const isComfortable = (celsiusTemp >= comfortableMinC) && (celsiusTemp <= comfortableMaxC);

//    Log the comfort status.
console.log("--- Comfort Check ---");
console.log(\`Is ${celsiusTemp}°C a comfortable temperature? ${isComfortable}\`);


// --- STRETCH GOALS ---

// STRETCH 1: Fahrenheit to Celsius
//    Create a \`const\` \`fTemp\` and set it to 68.
//    Create a \`const\` \`cTemp\` and calculate Celsius ( C = (F - 32) * 5/9 ).
//    Log the result using a template literal.
console.log("--- Stretch Goal 1: F to C ---");
const fTemp = 68;
const cTemp = (fTemp - 32) * 5/9;
console.log(\`${fTemp}°F is ${cTemp}°C\`);


// STRETCH 2: Modulo Operator
//    Use the modulo operator (%) to check if \`fTemp\` is an even or odd number.
//    Log a message like "The temperature 68°F is an even number."
console.log("--- Stretch Goal 2: Even/Odd ---");
const isEven = (fTemp % 2) === 0;
// We can use a ternary operator (a mini if-statement) for a clean log:
const evenOddString = (isEven === true) ? "even" : "odd";
console.log(\`The temperature ${fTemp}°F is an ${evenOddString} number.\`);


// STRETCH 3: Loose vs. Strict Equality
//    Add these lines and predict the output in a comment *before* running.
console.log("--- Stretch Goal 3: Equality ---");
console.log(25 == "25");    // Prediction: true
console.log(25 === "25");   // Prediction: false
console.log(0 == false);    // Prediction: true
console.log(0 === false);   // Prediction: false
console.log(null == undefined); // Prediction: true

console.log("--- End of Week 1 Assignment ---");
```
