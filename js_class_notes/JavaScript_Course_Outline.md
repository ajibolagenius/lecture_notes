# Comprehensive JavaScript Course: From Fundamentals to Modern JS

## Course Overview

This course is designed for beginners who want to learn JavaScript from the ground up. It covers core programming concepts, modern ES6+ syntax, DOM manipulation, and asynchronous JavaScript. Each week includes practical exercises and builds toward hands-on projects to solidify your learning.

---

## Week 1: JavaScript Fundamentals

### Module 1: Introduction to JavaScript

* **Learning Objectives:**
    * Explain what JavaScript is and its role in web development.
    * Add JavaScript to an HTML page (inline, internal, and external).
    * Use the browser console to run code and log messages.
    * Write JavaScript comments.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is JavaScript?** | 30 mins | 15 mins |
| JS vs. HTML vs. CSS | - Client-Side Scripting | - "Hello, World!" with `alert()`. |
| **How to Add JS** | 45 mins | 30 mins |
| Internal (`<script>` tag) | - `async` and `defer` attributes. | - Create an HTML file and a `.js` file. |
| External (`<script src="...">`) | - Best Practice: External file at end of `<body>`. | - Link the external JS file and log a message. |
| **The Browser Console** | 30 mins | 30 mins |
| Using `console.log()` | - Debugging with the console. | - Use `console.log()` to output text, numbers, and variables. |
| Comments `//` and `/* ... */` | - Writing effective comments. | - Comment your code from the previous exercise. |

### Module 2: Variables, Data Types & Operators

* **Learning Objectives:**
    * Declare variables using `let` and `const` (and understand `var`).
    * Identify and use common JavaScript data types (String, Number, Boolean, Null, Undefined).
    * Perform operations using arithmetic, assignment, comparison, and logical operators.
    * Understand type coercion and concatenation.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Variables** | 45 mins | 30 mins |
| `let` (re-assignable) | - `const` (constant) | - Declare variables for a user (e.g., `firstName`, `age`, `isLoggedIn`). |
| `var` (the old way) | - Scope differences (briefly). | - Try re-assigning a `const` and see the error. |
| **Data Types** | 1 hour | 45 mins |
| Primitives: String, Number, Boolean | - `null` vs. `undefined` | - Create variables of each type. |
| `typeof` operator | - Dynamic Typing | - Use `typeof` to check the type of each variable. |
| **Strings & Concatenation** | 30 mins | 30 mins |
| String concatenation (`+`) | - Basic string properties/methods (`.length`). | - Create a `fullName` variable by combining `firstName` and `lastName`. |
| **Operators** | 1 hour | 45 mins |
| Arithmetic (`+`, `-`, `*`, `/`, `%`) | - Assignment (`=`, `+=`, `-=`) | - Create a simple calculator: take two numbers, add/subtract/multiply them, and log the result. |
| Comparison (`==`, `===`, `!=`, `!==`, `>`, `<`) | - `==` vs. `===` (Type Coercion) | - Write expressions that evaluate to `true` or `false` using comparison operators. |
| Logical (`&&`, `||`, `!`) | - Order of operations. | - Write an expression to check if `age` is over 18 AND `isLoggedIn` is true. |

**Week 1 Assignment:** Build a "Temperature Converter".
* Create an HTML file (no JS in it) and a JS file.
* In your JS file:
    1.  Create a `const` variable for a temperature in Celsius (e.g., `celsius = 25`).
    2.  Calculate the temperature in Fahrenheit using the formula: $F = (C \times 9/5) + 32$.
    3.  Log the result to the console in a human-readable string, e.g., "25°C is 77°F".

---

## Week 2: Control Flow & Functions

### Module 3: Control Flow

* **Learning Objectives:**
    * Make decisions in code using `if`/`else if`/`else` statements.
    * Use the `switch` statement for multi-way branching.
    * Write a ternary operator for simple conditions.
    * Repeat tasks using `for` and `while` loops.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Conditional Statements** | 1 hour | 45 mins |
| `if`, `else`, `else if` | - Truthy and Falsy values. | - Write an `if` statement that checks a user's `age`. Log "Access Granted" if 18 or over, "Access Denied" otherwise. |
| `switch` statement | - When to use `switch` vs. `if`. | - Write a `switch` statement for `dayOfWeek` (e.g., 1 = "Monday", 2 = "Tuesday"). |
| **Ternary Operator** | 30 mins | 30 mins |
| `condition ? exprIfTrue : exprIfFalse` | - A clean shorthand for `if/else`. | - Refactor your "Access Granted" exercise to use a ternary operator. |
| **Loops** | 1.5 hours | 1 hour |
| `for` loop | - `for` vs. `while`. | - Write a `for` loop that counts from 1 to 10 and logs each number. |
| `while` loop | - `do...while` loop. | - Write a `while` loop that does the same. |
| `break` and `continue` | - Controlling loop execution. | - Write a `for` loop from 1-20, but use `continue` to skip 13 and `break` to stop at 18. |

### Module 4: Functions (The Building Blocks)

* **Learning Objectives:**
    * Write and call functions using "function declarations" and "function expressions".
    * Pass data to functions using parameters and arguments.
    * Get data back from functions using the `return` keyword.
    * Understand variable scope (Global, Function/Local).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Function Basics** | 45 mins | 30 mins |
| What are functions? (DRY principle) | - Declaring a function. | - Write a function `greet()` that logs "Hello, world!". Call it. |
| **Parameters & Arguments** | 45 mins | 30 mins |
| Passing data into functions. | - Default parameters (ES6). | - Modify `greet()` to `greetUser(name)` that logs "Hello, [name]!". Call it with your name. |
| **`return` Keyword** | 45 mins | 30 mins |
| Getting data out of functions. | - Using returned values in variables. | - Write a function `add(num1, num2)` that `return`s their sum. Log the result of `add(5, 10)`. |
| **Scope** | 1 hour | 30 mins |
| Global Scope | - Function (Local) Scope | - Create a global variable and a local variable with the same name. Log both inside and outside the function to see the difference. |
| **Function Expressions** | 30 mins | 30 mins |
| Function Declarations vs. Expressions. | - Anonymous functions. | - Rewrite your `add` function as a function expression assigned to a `const`. |

**Week 2 Assignment:** Refactor your "Temperature Converter" into functions.
* Create a function `celsiusToFahrenheit(celsius)` that takes a Celsius value, calculates, and `return`s the Fahrenheit value.
* Create a function `fahrenheitToCelsius(fahrenheit)` that does the reverse.
* Log the results of calling both functions with different values.
* **Bonus:** Use a `for` loop to log a conversion table from 0°C to 20°C.

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
| Key/Value pairs. | - Creating objects. | - Create a `person` object with properties: `firstName`, `lastName`, `age`, `isStudent`. |
| **Accessing Properties** | 45 mins | 30 mins |
| Dot notation (`person.firstName`) | - Bracket notation (`person['firstName']`) | - Log the person's full name. |
| When to use bracket notation. | - Update the person's `age` and add a new property `location`. |
| **Object Methods** | 1 hour | 45 mins |
| Functions as properties. | - What is a method? | - Add a `greet` method to the `person` object that logs "Hello, my name is [firstName]". |
| The `this` keyword | - How `this` refers to the object itself. | - Modify the `greet` method to use `this.firstName`. |
| **Nesting Objects** | 30 mins | 30 mins |
| Objects inside objects. | - Accessing nested properties. | - Add an `address` object inside `person` with `street`, `city`, `country`. Log the city. |

### Module 6: Arrays

* **Learning Objectives:**
    * Create and use array literals.
    * Access and modify array elements using bracket notation (index).
    * Use common array properties and methods (`.length`, `push`, `pop`, `shift`, `unshift`).
    * Loop over arrays using a `for` loop.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Array Literals** | 45 mins | 30 mins |
| What are arrays? | - Zero-based indexing. | - Create an array `colors` with "red", "green", "blue". |
| Accessing/Modifying Elements | - `array[0]`, `array[1] = 'new'`. | - Log the first color. Change "green" to "yellow". |
| **Common Methods** | 1 hour | 45 mins |
| `.length` property | - `push()` (add to end) | - Log the length of the `colors` array. |
| `pop()` (remove from end) | - `unshift()` (add to start) | - Use `push()` to add "orange". Use `pop()` to remove it. |
| `shift()` (remove from start) | - `indexOf()`, `includes()` | - Use `shift()` and `unshift()` to modify the array. |
| **Looping Arrays** | 45 mins | 30 mins |
| Using a `for` loop. | - `for (let i = 0; i < arr.length; i++)` | - Write a `for` loop to iterate over your `colors` array and log each color. |
| Arrays of Objects | - A common data structure. | - Create an array of `person` objects. Loop through it and log each person's name. |

**Week 3 Assignment:** Build a "Simple Blog" data structure.
* Create an array called `posts`.
* Each element in `posts` should be an object with properties: `title`, `author`, `content`, and `tags` (which should be an array of strings).
* Create at least 2 post objects.
* Write a `for` loop that iterates over the `posts` array and logs the `title` and `author` of each post.
* **Bonus:** Add a method to a post object called `displayPost()` that logs the title, author, and content.

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
| The `document` object. | - The DOM as a tree structure. | - Create an HTML file with `h1`, `p`, `ul`, `li`. |
| **Selecting Elements** | 1.5 hours | 1 hour |
| `getElementById()` | - `getElementsByClassName()` | - Select the `h1` by its ID. |
| `getElementsByTagName()` | - `querySelector()` (the modern way) | - Select the `p` using `querySelector`. |
| `querySelectorAll()` | - `HTMLCollection` vs. `NodeList` | - Select all `li` elements using `querySelectorAll` and loop through them. |

### Module 8: Manipulating the DOM

* **Learning Objectives:**
    * Change the text and HTML content of elements.
    * Modify element styles using JavaScript.
    * Add, remove, and modify element attributes.
    * Create and append new elements to the page.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Changing Content** | 45 mins | 30 mins |
| `textContent` vs. `innerText` | - `innerHTML` (and security risks) | - Select your `h1` and change its text content. |
| **Changing Styles & Attributes** | 45 mins | 30 mins |
| `element.style.property` | - `setAttribute()`, `getAttribute()` | - Change the `h1`'s `color` to "red". |
| `classList.add()`, `.remove()`, `.toggle()` | - Working with CSS classes. | - Add a CSS class `.highlight` to your `p` tag. |
| **Creating & Appending** | 1 hour | 45 mins |
| `document.createElement()` | - `element.append()` / `appendChild()` | - Create a new `li` element. |
| `element.remove()` | - `prepend()` | - Set its `textContent` and append it to your `ul`. |

### Module 9: Events

* **Learning Objectives:**
    * Attach event listeners to DOM elements.
    * Respond to common events like `click`, `submit`, and `input`.
    * Use the `event` object to get information about an event.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Event Listeners** | 1 hour | 45 mins |
| `element.addEventListener('event', func)` | - The "callback" function. | - Add a "click" event listener to a button that logs "Button clicked!". |
| **Common Events** | 1 hour | 45 mins |
| `click`, `mouseover`, `mouseout` | - `keydown`, `keyup` | - Change the `h1` text on `mouseover`. |
| `input` (for form fields) | - `submit` (for forms) | - Add an `input` field. Log its value to the console every time it changes. |
| **The `event` Object** | 30 mins | 30 mins |
| `event.target` | - `event.preventDefault()` | - For the form `submit` event, use `event.preventDefault()` to stop the page from reloading. |

**Week 4 Project:** Build a "Simple To-Do List" application.
* **HTML:** An `input` field, a "Add" `button`, and an empty `ul`.
* **JS:**
    1.  Add a `click` event listener to the "Add" button.
    2.  When clicked, get the text from the `input` field.
    3.  If the input is not empty, create a new `li` element.
    4.  Set the `li`'s `textContent` to the input text.
    5.  Append the new `li` to the `ul`.
    6.  Clear the `input` field.
    7.  **Bonus:** Add a `click` event to the `ul` (event delegation) that removes an `li` when it's clicked.

---

## Week 5: Modern JavaScript Deep Dive (ES6+)

### Module 10: Modern Iteration & ES6+ Functions

* **Learning Objectives:**
    * Iterate over arrays using `forEach`, `map`, `filter`, and `reduce`.
    * Understand the difference between these methods and when to use each.
    * Write and use Arrow Functions (`=>`).
    * Understand how `this` behaves differently in arrow functions.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Arrow Functions (`=>`)** | 1 hour | 45 mins |
| New, shorter syntax. | - Single-line, implicit return. | - Rewrite all your previous function expressions as arrow functions. |
| `this` in Arrow Functions | - Lexical `this` (a key difference). | - (Briefly) Show a `this` example that breaks/works. |
| **Array Method: `forEach`** | 30 mins | 30 mins |
| A modern `for` loop. | - `arr.forEach(item => ...)` | - Refactor your `for` loop from Week 3 (logging `colors`) to use `forEach`. |
| **Array Method: `map`** | 1 hour | 45 mins |
| Creates a *new* array. | - Transforming data. | - Given an array of numbers `[1, 2, 3]`, use `map` to create a new array `[2, 4, 6]`. |
| **Array Method: `filter`** | 1 hour | 45 mins |
| Creates a *new* array. | - Selecting a subset of data. | - Given an array of numbers, use `filter` to create a new array with only the even numbers. |
| **Array Method: `reduce`** | 1 hour | 45 mins |
| Reduces an array to a single value. | - Accumulator & Current Value. | - Given an array of numbers, use `reduce` to find their sum. |

### Module 11: More ES6+ Features

* **Learning Objectives:**
    * Write cleaner strings using Template Literals.
    * Unpack values from arrays and objects using Destructuring.
    * Use the Spread (`...`) and Rest (`...`) operators.

| Topic | Lecture/Concept (Est.Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Template Literals** | 30 mins | 30 mins |
| Backticks (`` ` ``) | - Embedded expressions (`${...}`) | - Refactor all your string concatenations (e.g., "Hello, [name]!") to use template literals. |
| **Destructuring** | 1 hour | 45 mins |
| Object Destructuring | - `const { firstName, age } = person;` | - Destructure your `person` object from Week 3 into variables. |
| Array Destructuring | - `const [first, second] = colors;` | - Destructure your `colors` array. |
| **Spread & Rest** | 1 hour | 45 mins |
| Spread (`...`) in Arrays/Objects | - Copying and merging arrays. | - Use Spread to create a *new* array that combines two arrays. |
| Rest (`...`) in Functions | - `function myFunc(...args)` | - Write a function `sumAll(...numbers)` that uses Rest and `reduce` to sum all arguments. |

**Week 5 Assignment:** Upgrade your "To-Do List" app.
* Store your to-do items as an **array of objects** (e.g., `[{ text: 'Buy milk', completed: false }, ...]`).
* Create a function `renderTodos()` that:
    1.  Clears the current `ul`.
    2.  Uses `forEach` to loop through the `todos` array.
    3.  For each todo, creates an `li` and appends it to the `ul`.
* Call `renderTodos()` every time a new todo is added.
* **Bonus:** Use `filter` to add "Show All", "Show Active", and "Show Completed" buttons.

---

## Week 6: Asynchronous JavaScript & The Future

### Module 12: Asynchronous JavaScript Concepts

* **Learning Objectives:**
    * Explain the difference between synchronous and asynchronous code.
    * Understand the concept of the "Event Loop" and "Call Stack" (high-level).
    * Use `setTimeout` to understand async behavior.
    * Understand "Callback Hell" and why it's a problem.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Sync vs. Async** | 45 mins | 30 mins |
| The Call Stack & Event Loop. | - `setTimeout(func, 0)` demo. | - Write a `console.log('1')`, `setTimeout(() => console.log('2'), 0)`, `console.log('3')`. Predict the order. |
| **Callbacks** | 30 mins | 30 mins |
| The "old" way. | - "Callback Hell" (Pyramid of Doom). | - Create nested `setTimeout` functions to see "Callback Hell". |

### Module 13: Promises

* **Learning Objectives:**
    * Understand what a Promise is (a placeholder for a future value).
    * Consume Promises using `.then()` for success and `.catch()` for errors.
    * Use `.finally()` to run code regardless of outcome.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What are Promises?** | 45 mins | 30 mins |
| `Pending`, `Fulfilled`, `Rejected` states. | - Chaining `.then()`. | - Create a simple promise that resolves after 2 seconds. |
| **Consuming Promises** | 1 hour | 45 mins |
| `.then(onFulfilled, onRejected)` | - `.catch(onRejected)` | - Use `.then()` to log the success message from your promise. |
| `.finally()` | - The "Promise Chain". | - Modify the promise to `reject()` and use `.catch()` to log the error. |

### Module 14: Async/Await (ES7+)

* **Learning Objectives:**
    * Write cleaner, more readable async code using `async` and `await`.
    * Handle errors in `async` functions using `try...catch` blocks.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The `async` Keyword** | 1.5 hours | 1 hour |
| `async function myFunc() { ... }` | - `await` keyword (pauses execution). | - Rewrite your promise-consuming code from the last exercise using `async/await`. |
| **Error Handling** | - `try...catch` blocks. | - Use a `try...catch` block to handle the rejected promise. |
| | - `async/await` vs. `.then()/.catch()` | |

### Module 15: Making API Calls

* **Learning Objectives:**
    * Understand what an API is.
    * Use the `fetch()` API to make GET requests.
    * Process the `Response` object and parse JSON data (`.json()`).
    * Render data from an API to the DOM.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Intro to APIs & `fetch()`** | 1 hour | 1 hour |
| What is a (REST) API? JSON? | - The `fetch()` function. | - Use `fetch()` to make a GET request to a free public API (e.g., JSONPlaceholder). |
| **Handling Responses** | - `fetch()` returns a Promise. | - Use `.then()` to get the `response`. |
| - `response.json()` (also returns a Promise) | - Chain another `.then()` to get the JSON data and log it. |
| **`fetch()` with Async/Await** | 45 mins | 30 mins |
| The "clean" way. | - `const res = await fetch(...)` | - Refactor your `fetch()` code to use `async/await` inside a `try...catch` block. |
| | - `const data = await res.json()` | |

**Week 6 / Final Project:** Build a "Weather App" or "Movie Search App".
* **Goal:** Combine DOM manipulation, events, and asynchronous JavaScript.
* **HTML:** An `input` field (for city/movie title), a `button`, and a `div` to display results.
* **JS:**
    1.  Find a free public API (e.g., [OpenWeatherMap](https://openweathermap.org/api), [OMDb API](http://www.omdbapi.com/)).
    2.  Add a `click` event listener to the button.
    3.  When clicked, get the value from the `input`.
    4.  Create an `async` function to `fetch` data from the API based on the user's input.
    5.  Handle loading and error states.
    6.  When the data arrives, parse the JSON.
    7.  Select the relevant data (e.g., temperature, description, movie poster, plot).
    8.  Create HTML elements (e.g., `h2`, `p`, `img`) and display this data in the results `div`.
