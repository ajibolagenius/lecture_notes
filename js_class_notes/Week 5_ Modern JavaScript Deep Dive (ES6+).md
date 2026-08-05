# Week 5: Modern JavaScript Deep Dive (ES6+)

Welcome to Week 5! You've already built a solid foundation. Now, we're going to "modernize" your code. This week is all about **ES6+ features**—a set of powerful tools added to JavaScript that make your code more concise, more readable, and more powerful.

We'll focus on two key areas: a new, cleaner way to write **functions** (Arrow Functions), a powerful set of **array methods** that replace loops, and handy "syntactic sugar" like **destructuring** and **template literals** that make your code a joy to write.

---

## Module 10: Modern Iteration & ES6+ Functions

This module will revolutionize how you write functions and loop over data. We will move away from `for` loops and start using the methods built directly onto arrays.

### 1. Arrow Functions (`=>`)

* **Lecture & Concepts:**
    * An arrow function is a compact, modern syntax for writing a function expression. It's one of the most popular ES6 features.
    * **The "Old" Way (Function Expression):**
        ```javascript
        const add = function(a, b) {
          return a + b;
        };
        ```
    * **The "New" Way (Arrow Function):**
        ```javascript
        const add = (a, b) => {
          return a + b;
        };
        ```
    * **Magic Feature: Implicit Return**
        * If your function is *only one line* and that line is a `return` statement, you can remove the `{}` and the `return` keyword.
        ```javascript
        // This is the same as the function above:
        const add = (a, b) => a + b;
        ```
    * **Parentheses Rule:**
        * If you have *exactly one* parameter, you can even drop the `()`:
        * `const double = x => x * 2;`
        * If you have *zero* parameters, you must use empty `()`:
        * `const greet = () => console.log('Hello');`
    * **The `this` Keyword (Advanced):** Arrow functions do *not* get their own `this` keyword. They *inherit* `this` from their parent scope. This is a massive feature that solves many old bugs, especially with event listeners.

* **⭐️ Class Exercise: Convert a Function**
    * Take the following function expression and convert it to a one-line arrow function with an implicit return.
    ```javascript
    // Convert this:
    const square = function(number) {
      return number * number;
    }

    // Answer:
    // const square = number => number * number;
    ```

---

### 2. Array Method: `.forEach()`

* **Lecture & Concepts:**
    * **Replaces the `for` loop for iteration.**
    * **What it does:** Executes a provided function (a "callback") *once for each element* in an array.
    * **What it returns:** `undefined`. It *does not* return a new array. It's purely for running a "side effect," like `console.log()` or updating the DOM.

* **In-Depth Example:**
    ```javascript
    const colors = ['red', 'green', 'blue'];

    // The "Old Way" (for loop)
    for (let i = 0; i < colors.length; i++) {
      console.log(colors[i]);
    }

    // The "New Way" (.forEach)
    // We pass it an anonymous arrow function.
    // The function gets the current item as its first parameter.
    colors.forEach(color => {
      console.log(color);
    });
    ```

* **⭐️ Class Exercise: Log Array Items**
    1.  Create an array: `const fruits = ['Apple', 'Banana', 'Cherry'];`
    2.  Use the `.forEach()` method to `console.log()` each fruit.

---

### 3. Array Method: `.map()`

* **Lecture & Concepts:**
    * **The "Transformation" Method.**
    * **What it does:** Creates a **brand new array** by running a callback function on *every* element and returning the *result* of that function.
    * **What it returns:** A **new array** of the *exact same length* as the original, but with transformed values.
    * **Analogy:** It's a "factory" that takes in an array of raw materials and produces a new array of finished products.

* **In-Depth Example (Doubling Numbers):**
    ```javascript
    const numbers = [1, 2, 3, 4, 5];

    const doubled = numbers.map(num => {
      return num * 2;
    });
    // With implicit return:
    // const doubled = numbers.map(num => num * 2);

    console.log(numbers); // [1, 2, 3, 4, 5] (Original is unchanged)
    console.log(doubled); // [2, 4, 6, 8, 10] (The new array)
    ```
* **In-Depth Example (Transforming Objects):**
    ```javascript
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];

    // Let's create a new array of just the names
    const names = users.map(user => user.name);

    console.log(names); // ['Alice', 'Bob']
    ```

* **⭐️ Class Exercise: Stringify Numbers**
    1.  Create an array: `const numbers = [5, 10, 15];`
    2.  Use the `.map()` method to create a *new* array where each number is converted to a string (e.g., `String(num)`).
    3.  Log the new array. (Expected output: `['5', '10', '15']`)

---

### 4. Array Method: `.filter()`

* **Lecture & Concepts:**
    * **The "Selection" Method.**
    * **What it does:** Creates a **brand new array** by testing each element with a callback function. If the callback returns `true`, the element is *kept*. If it returns `false`, it's *discarded*.
    * **What it returns:** A **new array** that is the *same length or shorter* than the original.
    * **Analogy:** It's a "sieve" that only lets certain items pass through.

* **In-Depth Example (Getting Even Numbers):**
    ```javascript
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

    // The callback must return a boolean (true/false)
    const evens = numbers.filter(num => {
      return num % 2 === 0;
    });
    // With implicit return:
    // const evens = numbers.filter(num => num % 2 === 0);

    console.log(numbers); // [1, 2, 3, 4, 5, 6, 7, 8] (Original is unchanged)
    console.log(evens);   // [2, 4, 6, 8] (The new filtered array)
    ```
* **In-Depth Example (Filtering Objects):**
    ```javascript
    const products = [
      { name: 'Laptop', price: 1200 },
      { name: 'Mouse', price: 30 },
      { name: 'Keyboard', price: 80 }
    ];

    const cheapProducts = products.filter(product => product.price < 100);

    console.log(cheapProducts); // [{ name: 'Mouse', ...}, { name: 'Keyboard', ...}]
    ```

* **⭐️ Class Exercise: Filter Long Words**
    1.  Create an array: `const words = ['cat', 'elephant', 'dog', 'hippopotamus'];`
    2.  Use `.filter()` to create a *new* array containing only the words that are *longer than 3 characters*. (Hint: `word.length > 3`).

---

### 5. Array Method: `.reduce()`

* **Lecture & Concepts:**
    * **The "Aggregator" Method.** This is the most powerful and complex of the four.
    * **What it does:** "Reduces" an entire array down to a **single value** (e.g., a number, a string, an object).
    * **The Callback:** It takes two main arguments:
        1.  **`accumulator` (or `acc`)**: The value that "accumulates" with each loop. It's the `total` so far.
        2.  **`currentValue` (or `curr`)**: The current element in the array.
    * **The Initial Value:** `.reduce()` also takes a *second* argument: the **initial value** for the accumulator. This is critical.

* **In-Depth Example (Summing an Array):**
    ```javascript
    const numbers = [1, 2, 3, 4, 5];

    // We pass our callback and an "initial value" of 0.
    const sum = numbers.reduce((accumulator, currentValue) => {
      // Loop 1: accumulator = 0, currentValue = 1. Return 1.
      // Loop 2: accumulator = 1, currentValue = 2. Return 3.
      // Loop 3: accumulator = 3, currentValue = 3. Return 6.
      // ...
      return accumulator + currentValue;
    }, 0); // <-- 0 is the starting value for the accumulator

    console.log(sum); // 15
    ```
* **In-Depth Example (Counting Votes):**
    ```javascript
    const votes = ['yes', 'no', 'yes', 'yes', 'no'];

    // We start with an empty object {}
    const tally = votes.reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

    console.log(tally); // { yes: 3, no: 2 }
    ```

* **⭐️ Class Exercise: Concatenate Strings**
    1.  Create an array: `const letters = ['H', 'e', 'l', 'l', 'o'];`
    2.  Use `.reduce()` to reduce this array to the single string "Hello".
    3.  (Hint: Your initial value should be an empty string `""`).

---

## Module 11: More ES6+ Features

These are "quality of life" features that make your code cleaner and easier to write.

### 1. Template Literals (`` `${...}` ``)

* **Lecture & Concepts:**
    * A new way to write strings that allows for embedded expressions and multi-line strings.
    * You **must** use backticks (`` ` ``) instead of single or double quotes.
    * To embed a variable or any JavaScript expression, use the "dollar-curly" syntax: `${...}`.
    * They also respect whitespace and line breaks, so you can write multi-line strings without `\n`.

* **In-Depth Example:**
    ```javascript
    const user = { name: 'Alice', age: 30 };

    // The "Old Way" (Painful concatenation)
    const oldGreeting = "Hello, " + user.name + "!\n" +
                        "You are " + user.age + " years old.";

    // The "New Way" (Template Literal)
    const newGreeting = \`Hello, ${user.name}!
    You are ${user.age} years old.\`;
    // newGreeting has the line break in it!

    // You can even do math inside!
    const msg = \`Next year, you will be ${user.age + 1}.\`;
    ```

* **⭐️ Class Exercise: Refactor a String**
    * Convert the following string to use a template literal:
    ```javascript
    const item = { name: 'Apple', price: 1.50, quantity: 3 };
    const receipt = "You bought " + item.quantity + " " + item.name + "s." +
                    "\nTotal price: $" + (item.price * item.quantity);

    // Answer:
    // const receipt = \`You bought ${item.quantity} ${item.name}s.
    // Total price: $${item.price * item.quantity}\`;
    ```

---

### 2. Destructuring

* **Lecture & Concepts:**
    * A *shortcut* for "unpacking" values from objects or arrays into their own, distinct variables.

* **In-Depth Example (Object Destructuring):**
    ```javascript
    const person = {
      firstName: 'Alice',
      lastName: 'Johnson',
      age: 30
    };

    // The "Old Way"
    // const firstName = person.firstName;
    // const lastName = person.lastName;

    // The "New Way" (Destructuring)
    // This creates two new consts: `firstName` and `lastName`
    const { firstName, lastName } = person;

    console.log(firstName); // 'Alice'
    console.log(lastName);  // 'Johnson'

    // You can even rename variables and give defaults
    const { age, location = 'Unknown' } = person;
    console.log(age);       // 30
    console.log(location);  // 'Unknown'
    ```

* **In-Depth Example (Array Destructuring):**
    ```javascript
    const colors = ['red', 'green', 'blue'];

    // This unpacks them *in order*
    const [firstColor, secondColor] = colors;

    console.log(firstColor);  // 'red'
    console.log(secondColor); // 'green'

    // You can skip items with a comma
    const [ , , thirdColor] = colors;
    console.log(thirdColor); // 'blue'
    ```

* **⭐️ Class Exercise: Destructure an Object**
    1.  Given this object: `const settings = { theme: 'dark', fontSize: 16 };`
    2.  Use destructuring to create two new variables, `theme` and `fontSize`, from the object.

---

### 3. Spread (`...`) & Rest (`...`) Operators

* **Lecture & Concepts:**
    * This `...` syntax does two opposite things based on *where* it's used.
    * **Spread (`...`) (in *expressions*):** "Spreads" or "expands" an array or object into its individual items.
        * **Use Case 1: Copying.** The *only* safe way to make a copy of an array or object.
        * **Use Case 2: Merging.** Combining multiple arrays or objects.
    * **Rest (`...`) (in *function parameters*):** "Collects" or "gathers" all remaining arguments into a *new array*.

* **In-Depth Example (Spread Operator):**
    ```javascript
    // 1. Copying an array (so you don't mutate the original)
    const original = ['a', 'b', 'c'];
    const copy = [...original];
    copy.push('d'); // Modifies only the copy

    console.log(original); // ['a', 'b', 'c']
    console.log(copy);     // ['a', 'b', 'c', 'd']

    // 2. Merging arrays
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const combined = [...arr1, 'hello', ...arr2];
    console.log(combined); // [1, 2, 'hello', 3, 4]

    // 3. Copying an object
    const user = { name: 'Alice', age: 30 };
    const userCopy = { ...user, location: 'NY' }; // Copies and adds a new property
    console.log(userCopy); // { name: 'Alice', age: 30, location: 'NY' }
    ```
* **In-Depth Example (Rest Operator):**
    ```javascript
    // This function can now take ANY number of arguments
    function sumAll(...numbers) {
      // 'numbers' is a real array we can .reduce()!
      return numbers.reduce((acc, curr) => acc + curr, 0);
    }

    console.log( sumAll(1, 2) );       // 3
    console.log( sumAll(1, 2, 3, 4) ); // 10
    ```

* **⭐️ Class Exercise: Merge Arrays**
    1.  Create two arrays: `const listA = [1, 2];` and `const listB = [3, 4];`
    2.  Use the **spread operator** to create a *new* array called `fullList` that contains all the items from both, in order. (Expected output: `[1, 2, 3, 4]`).

---
---

### Week 5: Comprehensive Assignment

**Objective:** Upgrade your "To-Do List" data using all the new ES6+ methods. This assignment is **data-only** (you don't need to touch the DOM, just use `console.log`).

**Your "Database" (Start with this):**

```javascript
const tasks = [
  { id: 1, text: 'Buy groceries', isComplete: false, time: 20 },
  { id: 2, text: 'Do laundry', isComplete: true, time: 45 },
  { id: 3, text: 'Code JavaScript', isComplete: true, time: 120 },
  { id: 4, text: 'Go to the gym', isComplete: false, time: 60 },
  { id: 5, text: 'Read a book', isComplete: false, time: 30 }
];
```

**Your Tasks::**
Write your code in a `script.js` file. Use `console.log()` to show your results for each step.

1. Task 1: Get Task Descriptions (Using `.map()`)

Create a new array called `taskDescriptions` that contains only the text of each task.

Expected Output: `['Buy groceries', 'Do laundry', 'Code JavaScript', ...]`

4. Task 2: Find Incomplete Tasks (Using `.filter()`)

Create a new array called `incompleteTasks` that contains only the objects of tasks that are `isComplete: false`.

6. Task 3: Calculate Total Time (Using `.reduce()`)

Calculate the total time (in minutes) of all tasks combined. Store this in a `const` called `totalTime`.

Expected Output: 275

9. Task 4: Log "Quick Tasks" (Using `.forEach()` & `if`)

Use `.forEach()` to loop over the `tasks` array.

Inside the loop, use an `if` statement to `console.log()` the `text` of only the tasks that take 30 minutes or less.

12. Task 5: (BONUS) Chain the Methods!

Try to create one new `const` called `totalTimeForIncompleteTasks` by chaining `.filter()` and `.reduce()`.

You'll need to first `.filter()` for incomplete tasks, and then `.reduce()` that new array to sum its time.

**Example Solution `(script.js):`**
``` javascript
const tasks = [
  { id: 1, text: 'Buy groceries', isComplete: false, time: 20 },
  { id: 2, text: 'Do laundry', isComplete: true, time: 45 },
  { id: 3, text: 'Code JavaScript', isComplete: true, time: 120 },
  { id: 4, text: 'Go to the gym', isComplete: false, time: 60 },
  { id: 5, text: 'Read a book', isComplete: false, time: 30 }
];

// --- Task 1: .map() ---
// All functions are written as arrow functions
const taskDescriptions = tasks.map(task => task.text);
console.log("Task Descriptions:", taskDescriptions);

// --- Task 2: .filter() ---
const incompleteTasks = tasks.filter(task => task.isComplete === false);
console.log("Incomplete Tasks:", incompleteTasks);

// --- Task 3: .reduce() ---
const totalTime = tasks.reduce((sum, task) => sum + task.time, 0);
console.log("Total Time:", totalTime); // 275

// --- Task 4: .forEach() ---
console.log("--- Quick Tasks ---");
tasks.forEach(task => {
  // We can use destructuring here!
  const { text, time } = task;
  if (time <= 30) {
    // We can use a template literal here!
    console.log(\`Quick Task: ${text}\`);
  }
});

// --- Task 5: Chaining ---
const totalTimeForIncompleteTasks = tasks
  .filter(task => task.isComplete === false)
  .reduce((sum, task) => sum + task.time, 0);

console.log("Total Incomplete Time:", totalTimeForIncompleteTasks); // 110
```
