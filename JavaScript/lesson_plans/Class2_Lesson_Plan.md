# 📋 JavaScript Class 2 — Lesson Plan (Tutor Script)
### Control Flow & Functions
**Duration:** ~2 hours | **Format:** Console then first `.js` file

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap quiz |
| 0:10 – 0:40 | Control flow: if/else, ternary, for...of, for...in, while |
| 0:40 – 1:30 | Functions: declarations, arrows, params, rest/spread, destructuring |
| 1:30 – 1:50 | First `.js` file: CLI-style quiz |
| 1:50 – 2:00 | Wrap-up |

---

## 🛠 Setup (Do Before Students Arrive)
- VS Code open with a blank `quiz.js`
- Terminal panel open in VS Code (`` Ctrl+` ``)
- Node.js verified: `node --version` should return v20+

---

## 🎤 PART A — Recap (0:00 – 0:10)

**[IN CONSOLE — no looking at notes:]**
```javascript
// Ask students to predict the output BEFORE running each line
typeof null          // Expected: 'object' (the bug)
0 ?? 'default'       // Expected: 0
'' || 'fallback'     // Expected: 'fallback'
const u = null;
u?.name ?? 'Unknown' // Expected: 'Unknown'
```

---

## 🎤 PART B — Control Flow (0:10 – 0:40)

**[SAY:]:**
> "Programs make decisions. They repeat tasks. They respond to conditions. Control flow is the structure that makes all of that possible."

### if / else if / else (10 min)

**[TYPE:]**
```javascript
const score = 82;

if (score >= 90) {
  console.log('Grade A — Distinction');
} else if (score >= 75) {
  console.log('Grade B — Credit');
} else if (score >= 50) {
  console.log('Grade C — Pass');
} else {
  console.log('Grade F — Fail. Retake recommended.');
}
```

**[SAY:]:**
> "Always use curly braces. Even for single-line bodies. `if (x) doThing()` is valid JavaScript but it is a maintenance trap — someone adds a second line and forgets the braces, and suddenly only the first line is conditional. Always brace it."

**[TYPE:]**
```javascript
// Ternary — one expression, three parts: condition ? if-true : if-false
const grade = score >= 50 ? 'Pass' : 'Fail';

// ✅ Use ternary for simple either/or assignments
const label = isLoggedIn ? 'Log Out' : 'Log In';

// ❌ Do NOT nest ternaries — use if/else instead
// Hard to read:
const level = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 50 ? 'C' : 'F';
// Cleaner as a function (which we will build shortly)
```

---

### Loops (20 min)

**[SAY:]:**
> "Three loop patterns cover almost everything you will ever need. `for...of` for iterating values. `for...in` for iterating object keys. `while` when you do not know the count upfront."

**[TYPE:]**
```javascript
// for...of — iterate over any iterable (arrays, strings, Sets, Maps)
const courses = ['HTML', 'CSS', 'JavaScript', 'React', 'Python'];

for (const course of courses) {
  console.log(`📚 ${course}`);
}

// for...of with index using entries()
for (const [index, course] of courses.entries()) {
  console.log(`${index + 1}. ${course}`);
}

// Iterating over a string
for (const char of 'Deejoft') {
  console.log(char);   // D, e, e, j, o, f, t
}
```

**[TYPE:]**
```javascript
// for...in — iterate over object keys
const student = { name: 'Ada', cohort: 7, score: 95 };

for (const key in student) {
  console.log(`${key}: ${student[key]}`);
}
// Output: name: Ada  |  cohort: 7  |  score: 95

// ⚠️ for...in also iterates inherited properties — use Object.hasOwn() to be safe
for (const key in student) {
  if (Object.hasOwn(student, key)) {
    console.log(`${key}: ${student[key]}`);
  }
}
```

**[TYPE:]**
```javascript
// while — unknown iteration count
let attempts = 0;
const password = 'deejoft2025';

while (attempts < 3) {
  const input = prompt(`Attempt ${attempts + 1}/3: Enter password`);
  attempts++;
  if (input === password) {
    console.log('✅ Access granted');
    break;
  }
  console.log('❌ Incorrect');
}
// break exits the loop; continue skips to the next iteration
```

---

## 🎤 PART C — Functions (0:40 – 1:30)

**[SAY:]:**
> "Functions are the most important concept in programming. Not just in JavaScript — in all programming. A function is a named, reusable block of instructions. Everything in modern JavaScript revolves around functions: events, data transformations, async operations, React components. Understand functions deeply and everything else becomes approachable."

### Function Declarations (10 min)

**[TYPE:]**
```javascript
// Function declaration — hoisted (can be called before the function appears in code)
function greetStudent(name, cohort) {
  const message = `Welcome to Deejoft, ${name}! You are in Cohort ${cohort}.`;
  return message;
}

const greeting = greetStudent('Ada', 7);
console.log(greeting);

// Default parameters — used when argument is not provided or is undefined
function calculateFee(basePrice, discount = 0, currency = '₦') {
  const finalPrice = basePrice * (1 - discount);
  return `${currency}${finalPrice.toLocaleString()}`;
}

console.log(calculateFee(79999));          // ₦79,999
console.log(calculateFee(79999, 0.1));     // ₦71,999.1 (10% discount)
```

**[SAY for `return`:]:**
> "Every function either returns a value or returns `undefined`. If you do not write `return`, the function returns `undefined` automatically. `return` also exits the function immediately — any code after a `return` statement is unreachable."

---

### Arrow Functions (15 min)

**[SAY:]:**
> "Arrow functions are the modern syntax. They are shorter and handle `this` differently (which matters in classes and event handlers). Learn when to use each."

**[TYPE:]**
```javascript
// Named function declaration — use for top-level, reusable functions
function calculateVAT(price) {
  return price * 0.075;
}

// Arrow function expression — use for callbacks and short transformations
const calculateVAT = (price) => price * 0.075;   // Implicit return — single expression
const double = n => n * 2;                         // One param — parentheses optional
const greet = () => 'Hello!';                      // No params — parentheses required
const makeUser = (name, age) => ({ name, age });   // Return object — wrap in ()

// Multi-line arrow function — explicit return required
const formatCourse = (course) => {
  const title = course.title.toUpperCase();
  const price = `₦${course.price.toLocaleString()}`;
  return `${title} — ${price}`;
};
```

**[WRITE THE GUIDE on board:]**
```
When to use named declaration:
  → Top-level functions you call by name from multiple places
  → Recursive functions (they need to reference themselves)

When to use arrow:
  → Callbacks: [].map(item => ...), addEventListener('click', () => ...)
  → Short transformations
  → Methods inside objects (with care)
```

---

### Rest Parameters & Spread Operator (10 min)

**[TYPE:]**
```javascript
// Rest (...) — collect remaining arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4, 5));    // 15
console.log(sum(10, 20));            // 30

// Rest must be the last parameter
function log(level, ...messages) {
  console.log(`[${level.toUpperCase()}]`, ...messages);
}
log('info', 'User enrolled', 'Payment confirmed');
// [INFO] User enrolled Payment confirmed

// Spread (...) — expand an array or object into individual elements
const scores = [88, 92, 75, 95];
const moreScores = [...scores, 67, 81];    // [88, 92, 75, 95, 67, 81]
const copy = [...scores];                   // Shallow copy

Math.max(...scores)   // 95 — spread into individual arguments

// Spread with objects
const base = { theme: 'dark', lang: 'en' };
const updated = { ...base, lang: 'fr' };   // { theme: 'dark', lang: 'fr' }
```

---

### Destructuring (15 min)

**[SAY:]:**
> "Destructuring is syntax for unpacking values from arrays and objects into named variables. It is not new functionality — it is a cleaner way to write code you could already write. Once you see it, you will use it everywhere."

**[TYPE:]**
```javascript
// Array destructuring
const colours = ['red', 'green', 'blue', 'yellow'];
const [primary, secondary, ...rest] = colours;
// primary = 'red', secondary = 'green', rest = ['blue', 'yellow']

// Skip values
const [first, , third] = colours;   // first = 'red', third = 'blue'

// Object destructuring
const user = { name: 'Ada', age: 30, role: 'student', cohort: 7 };
const { name, age } = user;
// name = 'Ada', age = 30

// Rename while destructuring
const { name: studentName, role: studentRole } = user;
// studentName = 'Ada', studentRole = 'student'

// Default values
const { name: n, email = 'Not set' } = user;
// n = 'Ada', email = 'Not set' (not in the object)

// Function parameter destructuring — the most useful pattern
function displayStudent({ name, cohort, score = 0 }) {
  console.log(`${name} | Cohort ${cohort} | Score: ${score}/100`);
}

displayStudent({ name: 'Ada', cohort: 7, score: 95 });
displayStudent({ name: 'Alan', cohort: 7 });   // score defaults to 0
```

**[SAY:]:**
> "Parameter destructuring is what you will use in React constantly. Every React component receives a `props` object. Instead of `function Card(props) { return props.title }`, you write `function Card({ title, author, date }) { return title }`. The function signature tells you exactly what data the component needs."

---

## 🎤 PART D — First `.js` File: The Quiz (1:30 – 1:50)

**[SAY:]:**
> "Let's move out of the console and write a real file. We will build a short quiz game that runs in Node."

**[OPEN `quiz.js` in VS Code. TYPE TOGETHER:]**

```javascript
// quiz.js — run with: node quiz.js

const questions = [
  {
    question: 'What keyword declares a variable that cannot be reassigned?',
    answer: 'const',
  },
  {
    question: 'What does typeof null return?',
    answer: 'object',
  },
  {
    question: 'Which operator only falls back for null and undefined?',
    answer: '??',
  },
];

let correct = 0;

for (const { question, answer } of questions) {
  // In Node, we use a synchronous readline — but prompt() doesn't work
  // For simplicity, we will hardcode answers and check them
  const userAnswer = answer;  // Replace with readline for interactive version

  if (userAnswer.trim().toLowerCase() === answer.toLowerCase()) {
    correct++;
    console.log('✅ Correct!');
  } else {
    console.log(`❌ Wrong. The answer was: ${answer}`);
  }
}

const percentage = ((correct / questions.length) * 100).toFixed(0);
console.log(`\nYou scored ${correct}/${questions.length} (${percentage}%)`);
console.log(parseInt(percentage) >= 70 ? '🎉 Pass!' : '📚 Keep studying.');
```

**[RUN:]**
```bash
node quiz.js
```

**[SAY:]:**
> "Notice how we used destructuring in the `for...of` loop: `for (const { question, answer } of questions)`. Instead of `item.question` and `item.answer`, we destructure directly in the loop variable. This is idiomatic JavaScript."

---

## 🔚 Wrap-Up (Last 5 min)

**[SAY:]:**
> "You have the core of the language: variables, types, control flow, functions. Next week we move to data structures — arrays with their powerful methods, objects, and the new ES2024 additions. Then in Week 3 we connect JavaScript to the browser — DOM manipulation, events, and making your HTML portfolio interactive."

**[HOMEWORK:]**
> "Extend the quiz. Add at least 3 more questions. Add a function `getGrade(score)` that returns 'A', 'B', 'C', or 'F' based on the percentage. Call it at the end and print the grade."

---

## 📎 Tutor Notes

**The most commonly confused concept this class:** the difference between rest (`...params` in a function signature — collects) and spread (`...array` in a call or assignment — expands). They use the same syntax in opposite contexts. Always describe the direction: rest **collects INTO** an array. Spread **expands OUT OF** one.

**Destructuring pitfall:** When renaming during destructuring, the colon means "rename to", not "value of key". `const { name: studentName }` reads as "from the object, get `name`, and call it `studentName` here". Students often invert this.
