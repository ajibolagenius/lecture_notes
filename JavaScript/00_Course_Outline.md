# ⚡ JavaScript Course — Tutor's Master Outline
### Deejoft Coding School | Web Development Track
**Instructor Notes — Fundamentals to Modern JS (ES6+)**

---

> **Dear Tutor,**
> JavaScript is the first *programming language* most of your students will encounter. This is a major shift from HTML and CSS — students now have to think logically, not just descriptively. Expect confusion, frustration, and then breakthroughs. Your job is to normalise the struggle, celebrate the breakthroughs, and never let a student copy-paste code they don't understand. If they can't explain it, they haven't learned it.

---

## 🗺️ Course at a Glance

| Week | Focus | Key Deliverable |
|------|-------|-----------------|
| Week 1 | Fundamentals: Variables, Types, Operators | Temperature Converter |
| Week 2 | Control Flow: Conditionals & Loops | FizzBuzz + Number Guessing Game |
| Week 3 | Functions & Scope | Calculator Functions Library |
| Week 4 | Arrays, Objects & ES6+ | Student Grade Tracker |
| Week 5 | DOM Manipulation | Interactive To-Do List |
| Week 6 | Async JS: Fetch & Promises | Live Weather Widget |

**Prerequisites:** HTML5 + CSS (Weeks 1–6)  
**Next Course:** React

---

## 🎯 Course Philosophy

Four rules to teach from Day 1 and reinforce constantly:

1. **`const` by default, `let` when you must, never `var`** — Modern JavaScript convention.
2. **`===` not `==`** — Always use strict equality. Always.
3. **Read the error message** — The browser console is your best teacher. Never ignore it.
4. **Break it down** — If a problem feels overwhelming, solve the smallest possible piece first.

---

## 📅 Week 1: JavaScript Fundamentals

### Module 1 — Introduction to JavaScript

**Tutor Guidance:**
Show JavaScript in action *before* explaining it. Open the browser console (`F12` → Console tab) on any website and type `document.body.style.backgroundColor = 'hotpink'`. The page turns pink instantly. The room reacts. *Now* explain what JavaScript is.

**Adding JavaScript to a Page:**
```html
<!-- ✅ Best practice: External JS file, loaded at end of <body> -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My JS Project</title>
</head>
<body>
  <h1>My Page</h1>
  
  <!-- Place <script> at the END of <body> so HTML loads first -->
  <script src="./js/app.js"></script>
</body>
</html>
```

> **Why at the end of `<body>`?** If the script is in `<head>` and it tries to find an element like `document.getElementById('title')`, the element doesn't exist yet because the browser hasn't read the `<body>`. Loading JS last prevents this.

**The Browser Console:**
```javascript
// Print to the console — your most important debugging tool
console.log('Hello, World!');
console.log(42);
console.log(true);

// Print multiple values at once
const name = 'Ada';
const age = 30;
console.log('Name:', name, 'Age:', age);

// Different log levels
console.warn('This is a warning');   // Yellow warning icon
console.error('This is an error');   // Red error icon
```

---

### Module 2 — Variables, Data Types & Operators

**Tutor Guidance:**
Students often confuse `null` and `undefined`. Use the analogy: a glass with no water in it (`null`, deliberately empty) vs. a glass that was never given to you (`undefined`, doesn't exist yet).

**Variables:**
```javascript
// const — for values that NEVER change (use this first, always)
const PI = 3.14159;
const SCHOOL_NAME = 'Deejoft';

// let — for values that WILL change
let score = 0;
let playerName = 'Ada';
score = score + 10; // This is fine — let can be re-assigned

// var — OLD. Do not use in modern JavaScript.
// var has confusing scoping rules that have been replaced by let/const
```

**Data Types:**
```javascript
// String — any text, wrapped in quotes
const greeting = 'Hello, World!';
const school = "Deejoft Coding School";
const template = `Welcome, ${playerName}!`;  // Template literal (ES6)

// Number — integers and decimals are the same type in JS
const age = 25;
const price = 99.99;
const negative = -10;

// Boolean — only two values
const isLoggedIn = true;
const hasSubscription = false;

// null — intentionally empty value
const selectedProduct = null;

// undefined — variable declared but not given a value
let userChoice;
console.log(userChoice); // undefined

// Checking types
console.log(typeof greeting);       // "string"
console.log(typeof age);            // "number"
console.log(typeof isLoggedIn);     // "boolean"
console.log(typeof null);           // "object" ← known JS quirk, not a real object
console.log(typeof userChoice);     // "undefined"
```

**Template Literals (Modern String Syntax):**
```javascript
const firstName = 'Ada';
const lastName = 'Lovelace';
const age = 30;

// ❌ Old way (concatenation) — messy
const intro = 'My name is ' + firstName + ' ' + lastName + ' and I am ' + age + ' years old.';

// ✅ Modern way (template literal) — clean and readable
const introModern = `My name is ${firstName} ${lastName} and I am ${age} years old.`;

// Template literals can span multiple lines too
const multiLine = `
  <div>
    <h1>${firstName}</h1>
    <p>Age: ${age}</p>
  </div>
`;
```

**Operators:**
```javascript
// Arithmetic
console.log(10 + 3);   // 13
console.log(10 - 3);   // 7
console.log(10 * 3);   // 30
console.log(10 / 3);   // 3.333...
console.log(10 % 3);   // 1 (remainder/modulo — very useful)
console.log(2 ** 8);   // 256 (exponentiation)

// Comparison — ALWAYS use === (strict), not == (loose)
console.log(5 === 5);     // true
console.log(5 === '5');   // false — different types!
console.log(5 == '5');    // true  — loose equality does type coercion (AVOID)
console.log(5 !== '5');   // true

// Logical
console.log(true && false);  // false (AND — both must be true)
console.log(true || false);  // true  (OR — at least one must be true)
console.log(!true);          // false (NOT — flip the value)

// Practical logical example
const age = 20;
const hasTicket = true;
const canEnter = age >= 18 && hasTicket;
console.log(canEnter); // true
```

---

## 📅 Week 2: Control Flow

### Module 3 — Conditionals

**Tutor Guidance:**
Use real-world scenarios. "You're building a login page. If the username and password match, show the dashboard. Otherwise, show an error message." Real context makes abstract concepts concrete.

**`if`, `else if`, `else`:**
```javascript
const score = 75;

if (score >= 90) {
  console.log('Grade: A — Distinction');
} else if (score >= 75) {
  console.log('Grade: B — Credit');
} else if (score >= 60) {
  console.log('Grade: C — Pass');
} else {
  console.log('Grade: F — Fail');
}
// Output: "Grade: B — Credit"
```

**Ternary Operator (for simple conditions):**
```javascript
// condition ? valueIfTrue : valueIfFalse
const age = 20;
const status = age >= 18 ? 'Adult' : 'Minor';
console.log(status); // "Adult"

// Useful in template literals
const userName = 'Ada';
const message = `Welcome back, ${userName ? userName : 'Guest'}!`;
```

**Switch Statement (for many specific values):**
```javascript
const day = 'Monday';

switch (day) {
  case 'Monday':
  case 'Tuesday':
  case 'Wednesday':
  case 'Thursday':
  case 'Friday':
    console.log('It\'s a weekday. Time to code!');
    break;
  case 'Saturday':
  case 'Sunday':
    console.log('It\'s the weekend. Rest and review!');
    break;
  default:
    console.log('That\'s not a valid day.');
}
```

### Module 4 — Loops

```javascript
// for loop — when you know how many iterations
for (let i = 1; i <= 5; i++) {
  console.log(`Lap ${i}`);
}

// while loop — when you don't know how many iterations
let attempts = 0;
let isCorrect = false;
while (!isCorrect && attempts < 3) {
  // (In real code, this would get user input)
  attempts++;
  isCorrect = attempts === 2; // Simulate correct on attempt 2
}
console.log(`Solved in ${attempts} attempts`);

// FizzBuzz — classic interview exercise
for (let i = 1; i <= 20; i++) {
  if (i % 15 === 0) {
    console.log('FizzBuzz');
  } else if (i % 3 === 0) {
    console.log('Fizz');
  } else if (i % 5 === 0) {
    console.log('Buzz');
  } else {
    console.log(i);
  }
}
```

---

## 📅 Week 3: Functions & Scope

### Module 5 — Functions

**Tutor Guidance:**
The DRY principle (Don't Repeat Yourself) is your anchor for this module. Show the same code written twice, then refactored into a function. The improvement is immediately obvious.

**Three Ways to Write Functions:**
```javascript
// 1. Function Declaration — Hoisted (can be called before it's defined)
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet('Ada')); // "Hello, Ada!"

// 2. Function Expression — Not hoisted
const greet = function(name) {
  return `Hello, ${name}!`;
};

// 3. Arrow Function (ES6) — Modern, concise, preferred
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Arrow function shorthand (for single-expression returns)
const greet = name => `Hello, ${name}!`;
const add = (a, b) => a + b;
const getPI = () => 3.14159; // No parameters = empty parentheses required
```

**Parameters, Arguments & Default Values:**
```javascript
// Default parameter values (ES6)
function createGreeting(name, greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

console.log(createGreeting('Ada'));            // "Hello, Ada!"
console.log(createGreeting('Ada', 'Welcome')); // "Welcome, Ada!"

// Multiple parameters and return values
function calculateBMI(weightKg, heightM) {
  const bmi = weightKg / (heightM ** 2);
  return bmi.toFixed(1); // toFixed(1) = 1 decimal place
}

const myBMI = calculateBMI(70, 1.75);
console.log(`Your BMI is ${myBMI}`); // "Your BMI is 22.9"
```

**Scope — The Visibility of Variables:**
```javascript
const globalVar = 'I am global';  // Accessible everywhere

function myFunction() {
  const localVar = 'I am local'; // Only accessible inside this function
  console.log(globalVar); // ✅ Can access global
  console.log(localVar);  // ✅ Can access local
}

myFunction();
console.log(globalVar); // ✅ Works
console.log(localVar);  // ❌ ReferenceError: localVar is not defined
```

---

## 📅 Week 4: Arrays, Objects & ES6+

### Module 6 — Arrays

```javascript
// Creating an array
const fruits = ['apple', 'banana', 'cherry'];

// Accessing elements (zero-indexed!)
console.log(fruits[0]); // 'apple'
console.log(fruits[2]); // 'cherry'
console.log(fruits.length); // 3

// Common array methods
fruits.push('date');          // Add to END
fruits.unshift('avocado');    // Add to START
fruits.pop();                 // Remove from END
fruits.shift();               // Remove from START

// indexOf and includes
console.log(fruits.indexOf('banana'));  // 1 (or -1 if not found)
console.log(fruits.includes('cherry')); // true

// slice — extract a portion (non-destructive)
const citrus = fruits.slice(1, 3); // From index 1 up to (not including) 3

// splice — remove/replace items (destructive — modifies original)
fruits.splice(1, 2); // Remove 2 items starting at index 1
```

**Array Iteration Methods (Modern & Powerful):**
```javascript
const students = [
  { name: 'Ada', grade: 92 },
  { name: 'Alan', grade: 78 },
  { name: 'Grace', grade: 95 },
  { name: 'Linus', grade: 61 },
];

// forEach — loop through every item (no return value)
students.forEach(student => {
  console.log(`${student.name}: ${student.grade}`);
});

// map — transform every item into something new (returns NEW array)
const names = students.map(student => student.name);
console.log(names); // ['Ada', 'Alan', 'Grace', 'Linus']

const grades = students.map(student => student.grade);
console.log(grades); // [92, 78, 95, 61]

// filter — keep items that pass a test (returns NEW array)
const passing = students.filter(student => student.grade >= 70);
console.log(passing); // Ada, Alan, Grace

// find — returns FIRST item that passes the test
const topStudent = students.find(student => student.grade > 90);
console.log(topStudent); // { name: 'Ada', grade: 92 }

// reduce — condense array to a single value
const totalScore = grades.reduce((accumulator, grade) => accumulator + grade, 0);
const average = totalScore / grades.length;
console.log(`Class average: ${average}`); // 81.5
```

### Module 7 — Objects

```javascript
// Creating an object
const student = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  age: 30,
  isEnrolled: true,
  address: {           // Nested object
    city: 'Lagos',
    country: 'Nigeria'
  },
  courses: ['HTML', 'CSS', 'JavaScript'],  // Array inside object

  // Method — a function inside an object
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  introduce() {
    return `Hi, I'm ${this.getFullName()}, ${this.age} years old, from ${this.address.city}.`;
  }
};

// Accessing properties
console.log(student.firstName);        // Dot notation — use this
console.log(student['lastName']);      // Bracket notation — use when key is dynamic
console.log(student.address.city);    // Accessing nested objects
console.log(student.courses[0]);      // Accessing array in object

// Calling methods
console.log(student.getFullName());   // "Ada Lovelace"
console.log(student.introduce());

// Destructuring — extract values into variables (very common in React)
const { firstName, lastName, age } = student;
console.log(firstName); // 'Ada'

// Spread operator — copy or merge objects
const updatedStudent = { ...student, age: 31, city: 'Abuja' };

// Object.keys(), Object.values(), Object.entries()
console.log(Object.keys(student));    // Array of all property names
console.log(Object.values(student));  // Array of all property values
```

---

## 📅 Week 5: DOM Manipulation

### Module 8 — The DOM

**Tutor Guidance:**
The DOM (Document Object Model) is where HTML meets JavaScript. This module is the payoff — students finally make things *happen* on screen. Start by showing DevTools → Elements panel. The tree structure there is the DOM.

**Selecting Elements:**
```javascript
// Get ONE element by ID (fastest, most specific)
const title = document.getElementById('main-title');

// Get ONE element by CSS selector (most flexible)
const btn = document.querySelector('.submit-btn');
const header = document.querySelector('header');

// Get ALL matching elements (returns NodeList, like an array)
const allCards = document.querySelectorAll('.card');
const allLinks = document.querySelectorAll('nav a');

// Looping over multiple elements
allCards.forEach(card => {
  card.style.border = '2px solid blue';
});
```

**Manipulating Elements:**
```javascript
const heading = document.querySelector('h1');

// Change text content
heading.textContent = 'New Heading Text';

// Change HTML (careful — can expose XSS vulnerabilities with user input)
heading.innerHTML = 'New <em>Styled</em> Heading';

// Change CSS styles
heading.style.color = '#e94560';
heading.style.fontSize = '2rem';

// Better approach: toggle CSS classes
heading.classList.add('highlighted');
heading.classList.remove('hidden');
heading.classList.toggle('active');     // Add if absent, remove if present
console.log(heading.classList.contains('highlighted')); // true

// Change attributes
const img = document.querySelector('#profile-img');
img.setAttribute('src', './images/new-photo.jpg');
img.setAttribute('alt', 'Updated profile photo');

// Create and append new elements
const newParagraph = document.createElement('p');
newParagraph.textContent = 'This paragraph was created by JavaScript!';
newParagraph.classList.add('dynamic-text');
document.querySelector('main').appendChild(newParagraph);
```

**Event Listeners:**
```javascript
const button = document.querySelector('#submit-btn');
const input = document.querySelector('#name-input');

// Click event
button.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default form submission
  const name = input.value.trim(); // .trim() removes whitespace
  
  if (name === '') {
    alert('Please enter your name!');
    return;
  }
  
  console.log(`Hello, ${name}!`);
});

// Input event (fires on every keystroke)
input.addEventListener('input', function() {
  console.log('Current value:', this.value);
});

// Keyboard event
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    // Close a modal, for example
    console.log('Escape pressed');
  }
});
```

**Interactive To-Do List Example:**
```javascript
const addBtn = document.querySelector('#add-btn');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

addBtn.addEventListener('click', function() {
  const taskText = todoInput.value.trim();
  if (!taskText) return; // Guard clause — exit early if empty
  
  // Create the list item
  const li = document.createElement('li');
  li.textContent = taskText;
  
  // Create a delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  
  deleteBtn.addEventListener('click', function() {
    li.remove(); // Remove the whole list item
  });
  
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
  
  // Clear the input
  todoInput.value = '';
  todoInput.focus(); // Put cursor back in input
});
```

---

## 📅 Week 6: Asynchronous JavaScript

### Module 9 — Fetch, Promises & Async/Await

**Tutor Guidance:**
Async is the hardest concept in this course. Don't rush it. Use the "ordering food" analogy: you place your order (fetch), get a ticket (promise), continue chatting with friends (non-blocking), and the food arrives when ready (resolved promise).

**Why Async Matters:**
```javascript
// ❌ This is NOT how fetch works — you can't do this
const data = fetch('https://api.example.com/users'); // This returns a Promise, not data!
console.log(data); // You'd get a Promise object, not users

// ✅ You must WAIT for the promise to resolve
```

**Promises:**
```javascript
// A Promise is a placeholder for a future value
// It has three states: pending → fulfilled or rejected

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    // response is the HTTP response object
    return response.json(); // Parse JSON — this also returns a Promise
  })
  .then(users => {
    // users is the actual data
    console.log(users);
  })
  .catch(error => {
    // Runs if the network request fails
    console.error('Failed to fetch users:', error);
  });
```

**Async/Await (Modern, Cleaner Syntax):**
```javascript
// async function always returns a Promise
async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users = await response.json();
    return users;
    
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return []; // Return empty array as fallback
  }
}

// Using the async function
async function displayUsers() {
  const users = await getUsers();
  
  users.forEach(user => {
    console.log(`${user.name} — ${user.email}`);
  });
}

displayUsers();
```

**Weather Widget Example (Practical Fetch):**
```javascript
const API_KEY = 'YOUR_API_KEY'; // From openweathermap.org (free tier)

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    
    const data = await response.json();
    
    return {
      city: data.name,
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
    };
    
  } catch (error) {
    throw error; // Re-throw so the caller can handle it
  }
}

// Display in the DOM
const searchBtn = document.querySelector('#search-btn');
const cityInput = document.querySelector('#city-input');
const weatherDisplay = document.querySelector('#weather-display');

searchBtn.addEventListener('click', async function() {
  const city = cityInput.value.trim();
  if (!city) return;
  
  weatherDisplay.textContent = 'Loading...';
  
  try {
    const weather = await getWeather(city);
    weatherDisplay.innerHTML = `
      <h2>${weather.city}</h2>
      <p class="temp">${weather.temp}°C</p>
      <p class="description">${weather.description}</p>
      <p>Humidity: ${weather.humidity}%</p>
    `;
  } catch (error) {
    weatherDisplay.textContent = `Error: ${error.message}`;
  }
});
```

---

### 🏆 Final Project: Live Weather Widget

Students build a weather app combining DOM manipulation, event handling, and async fetch.

**Evaluation Rubric:**

| Criterion | Points |
|-----------|--------|
| HTML structure is semantic and accessible | 10 |
| External JS file linked correctly | 5 |
| Variables use `const`/`let` appropriately (no `var`) | 10 |
| `===` used for all comparisons | 5 |
| Functions defined with arrow syntax | 10 |
| DOM elements selected and updated correctly | 15 |
| Event listeners attached correctly | 10 |
| Fetch uses `async/await` with `try/catch` | 20 |
| Loading state shown while fetching | 5 |
| Error handled and displayed to user | 10 |
| **Total** | **100** |

---

## 📚 Recommended Resources

- **MDN JavaScript Guide:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- **JavaScript.info:** [javascript.info](https://javascript.info) — best free JS textbook
- **Eloquent JavaScript:** [eloquentjavascript.net](https://eloquentjavascript.net) — free online book
- **Free APIs to practice fetch:** JSONPlaceholder, OpenWeatherMap, REST Countries

---

*Deejoft Coding School — Instructor Materials | JavaScript Track*  
*Last Updated: 2025*
