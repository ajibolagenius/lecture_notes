# ⚡ JavaScript — Tutor's Master Outline
### Deejoft Coding School | Web Development Track
**Duration:** 4 Weeks · 8 Classes · ~2 hours per class
**Level:** Beginner–Intermediate (requires HTML + CSS)

---

> **Dear Tutor,**
> JavaScript is the first general-purpose programming language for most students. The shift from declarative (HTML/CSS) to imperative thinking is real and takes time. Two rules for this course: (1) Never let a student copy-paste code they cannot explain line by line. (2) The error message is the lesson — teach students to read the console before reaching for Google or AI. Students who develop these habits early become strong developers. Those who skip them plateau.
>
> This course teaches **modern JavaScript only** — ES2020 through ES2024. There is no `var`, no `function` keyword as the default, and no jQuery. Everything is written the way a professional would write it today.

---

## 🗺️ Course Map

| Week | Classes | Focus | Deliverable |
|------|---------|-------|-------------|
| Week 1 | 1–2 | Core Language: Variables, Types, Control Flow, Functions | CLI-style quiz game |
| Week 2 | 3–4 | Data Structures & Modern Syntax | Student grade tracker |
| Week 3 | 5–6 | The DOM & Browser APIs | Interactive component library |
| Week 4 | 7–8 | Async JS, Modules & Tooling | Live data dashboard |

---

## 🎯 Non-Negotiable Rules (Write on the board — Week 1, Session 1)

```
1.  const  by default. let  when it must change. Never  var.
2.  ===  always. ==  never.
3.  Arrow functions for callbacks. Named functions for top-level declarations.
4.  Read the error. The full error. All of it.
5.  If you can't explain it, you haven't learned it.
```

---

## 📅 Week 1 — Core Language

### Class 1 — Variables, Types & Operators

**Tutor Guidance:** Open the browser DevTools Console (`F12`) immediately. All of Week 1 should be demonstrated live in the console before students write a single file. Immediate feedback in the REPL builds intuition faster than any editor.

---

#### Variables

```javascript
// const — a binding that cannot be reassigned. Use this FIRST, always.
const schoolName = 'Deejoft';
const MAX_STUDENTS = 30;        // Convention: ALL_CAPS for true constants
const PI = Math.PI;

// let — a binding that CAN be reassigned. Use only when reassignment is necessary.
let score = 0;
let currentUser = null;
score += 10;            // OK — reassigning a let
currentUser = { id: 1 }; // OK

// var — DO NOT USE. It has function scope, not block scope, which causes bugs.
// var count = 0; ← never write this

// ✅ Correct mental model:
// Start with const. If you get a "cannot reassign" error, switch to let.
// That constraint is usually intentional — const forces you to think about mutation.
```

#### Data Types

```javascript
// ── Primitives ── (immutable, passed by value)

const name    = 'Ada Lovelace';       // String
const age     = 30;                    // Number (integers and floats are the same type)
const score   = 99.5;                 // Number
const isActive = true;                // Boolean
const nothing  = null;                // Null — explicitly empty, intentional absence
let   pending;                        // Undefined — declared but not yet given a value
const id      = Symbol('user-id');    // Symbol — unique identifier
const bigNum  = 9007199254740993n;    // BigInt — for integers larger than 2^53

// ── Reference Types ── (mutable, passed by reference)
const user    = { name: 'Ada', age: 30 };    // Object
const courses = ['HTML', 'CSS', 'JS'];       // Array (a specialised object)
const greet   = (name) => `Hello, ${name}`;  // Function (also an object)

// Checking types
console.log(typeof name);        // 'string'
console.log(typeof age);         // 'number'
console.log(typeof isActive);    // 'boolean'
console.log(typeof null);        // 'object' ← historical JS quirk, not a real object
console.log(typeof pending);     // 'undefined'
console.log(typeof user);        // 'object'
console.log(typeof courses);     // 'object' ← arrays are objects
console.log(Array.isArray(courses)); // true ← correct way to check for arrays
```

#### Strings & Template Literals

```javascript
const firstName = 'Ada';
const lastName  = 'Lovelace';
const cohort    = 3;
const score     = 94.5;

// ❌ Concatenation — messy, error-prone
const intro = 'Welcome, ' + firstName + ' ' + lastName + '. Cohort: ' + cohort;

// ✅ Template literal — clean, readable, no quote escaping needed
const introModern = `Welcome, ${firstName} ${lastName}. Cohort: ${cohort}`;

// Expressions inside ${} — any valid JS expression works
console.log(`Score: ${score.toFixed(1)}%`);        // "Score: 94.5%"
console.log(`Status: ${score >= 50 ? 'Pass' : 'Fail'}`); // "Status: Pass"
console.log(`Next cohort: ${cohort + 1}`);          // "Next cohort: 4"

// Essential string methods
const code = '  Hello, World!  ';

code.trim()                   // 'Hello, World!'       — remove whitespace
code.toLowerCase()            // '  hello, world!  '
code.toUpperCase()            // '  HELLO, WORLD!  '
code.includes('World')        // true
code.startsWith('  Hello')    // true
code.replace('World', 'Ada')  // '  Hello, Ada!  '
code.split(', ')              // ['  Hello', 'World!  ']
'Ada'.padStart(10, '-')       // '-------Ada'
'Ada'.repeat(3)               // 'AdaAdaAda'
```

#### Operators

```javascript
// Arithmetic
console.log(17 % 5);    // 2  ← modulo (remainder) — use this for even/odd, cyclical logic
console.log(2 ** 10);   // 1024 ← exponentiation

// Comparison — ALWAYS use strict equality
console.log(5 === 5);     // true  — same value, same type
console.log(5 === '5');   // false — same value, DIFFERENT type
console.log(5 == '5');    // true  — loose equality coerces types ← NEVER USE

console.log(null === undefined); // false — they are different types
console.log(null == undefined);  // true  — loose equality quirk ← don't rely on this

// Logical operators — short-circuit evaluation
console.log(false && 'hello');  // false  — stops at false, never evaluates 'hello'
console.log(true  && 'hello');  // 'hello' — truthy, returns second operand
console.log(null  || 'default'); // 'default' — null is falsy, falls back to 'default'
console.log('ada' || 'default'); // 'ada'     — 'ada' is truthy, returns first operand

// Nullish coalescing (??) — only falls back for null/undefined, not for 0 or ''
const username = '';
console.log(username || 'Guest');  // 'Guest'  — empty string is falsy, falls back
console.log(username ?? 'Guest');  // ''       — empty string is NOT null/undefined, keeps it

// Optional chaining (?.) — safely access nested properties
const user = { profile: { avatar: 'ada.jpg' } };
console.log(user.profile?.avatar);        // 'ada.jpg'
console.log(user.settings?.theme);        // undefined — no error thrown
console.log(user.settings?.theme ?? 'light'); // 'light' — combine with nullish coalescing
```

---

### Class 2 — Control Flow & Functions

#### Control Flow

```javascript
// ── if / else if / else ──
const score = 82;

if (score >= 90) {
  console.log('Grade A — Distinction');
} else if (score >= 75) {
  console.log('Grade B — Credit');
} else if (score >= 50) {
  console.log('Grade C — Pass');
} else {
  console.log('Grade F — Fail');
}

// Ternary — for simple, single-expression conditions (not nested)
const grade = score >= 50 ? 'Pass' : 'Fail';

// ── Loops ──

// for...of — the modern way to iterate over any iterable
const courses = ['HTML', 'CSS', 'JavaScript', 'React'];
for (const course of courses) {
  console.log(`📚 ${course}`);
}

// for...in — iterate over object keys (use Object.entries() for better control)
const student = { name: 'Ada', age: 30, cohort: 3 };
for (const key in student) {
  console.log(`${key}: ${student[key]}`);
}

// while — when you don't know the number of iterations upfront
let attempts = 0;
while (attempts < 3) {
  attempts++;
  console.log(`Attempt ${attempts}`);
}

// Loop control
for (let i = 0; i < 10; i++) {
  if (i === 3) continue;  // Skip this iteration
  if (i === 7) break;     // Exit the loop entirely
  console.log(i);
}
```

#### Functions — The Most Important Topic in Week 1

```javascript
// ── Named Function Declaration ── hoisted, callable before definition
function calculateVAT(price, rate = 0.075) {
  const vat = price * rate;
  return { vat, total: price + vat };
}

const result = calculateVAT(10000);
console.log(`VAT: ₦${result.vat}, Total: ₦${result.total}`);

// ── Arrow Function Expression ── modern, concise, non-hoisted
const add = (a, b) => a + b;                   // Single expression — implicit return
const square = n => n ** 2;                    // Single param — parentheses optional
const greet = () => 'Hello, World!';           // No params — parentheses required
const makeUser = (name, age) => ({ name, age }); // Return object — wrap in ()

// ── When to use which ──
// Named function declaration → top-level reusable functions, recursive functions
// Arrow function            → callbacks, short transformations, methods in objects

// ── Rest Parameters & Spread ──
function sum(...numbers) {         // ...rest collects remaining args into an array
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4, 5));  // 15

const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];
const combined = [...nums1, ...nums2, 7]; // spread into new array: [1,2,3,4,5,6,7]

// ── Destructuring ──
// Array destructuring
const [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log(first);  // 10
console.log(rest);   // [30, 40, 50]

// Object destructuring — with rename and default value
const { name: studentName, age = 18, cohort } = { name: 'Ada', cohort: 3 };
console.log(studentName); // 'Ada'
console.log(age);         // 18 (default used — age wasn't in the object)

// Function parameter destructuring
function displayCard({ title, author, date = 'Unknown' }) {
  console.log(`${title} by ${author} (${date})`);
}
displayCard({ title: 'The Pragmatic Programmer', author: 'Hunt & Thomas' });
```

---

## 📅 Week 2 — Data Structures & Modern Syntax

### Class 3 — Arrays & Their Methods

**Tutor Guidance:** Arrays and their higher-order methods (`map`, `filter`, `reduce`) are the most-used JavaScript feature after variables. Every subsequent topic — React, data fetching, state management — depends on fluency here. Take the full class.

```javascript
// ── Array Creation ──
const scores = [88, 92, 75, 95, 67, 81];
const names  = new Array(3).fill('');   // ['', '', '']
const range  = Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]

// ── Read Operations ──
scores.at(0);         // 88  — same as scores[0], but supports negative index
scores.at(-1);        // 81  — last element (modern, clean)
scores.indexOf(75);   // 2
scores.includes(95);  // true
scores.find(n => n > 90);       // 92  — first match
scores.findIndex(n => n > 90);  // 1   — index of first match

// ── Non-Destructive Transformations (return new arrays) ──
const doubled   = scores.map(n => n * 2);
const passing   = scores.filter(n => n >= 70);
const total     = scores.reduce((sum, n) => sum + n, 0);
const average   = total / scores.length;
const sorted    = [...scores].sort((a, b) => b - a);  // [...scores] copies first — sort mutates
const top3      = sorted.slice(0, 3);
const combined  = [...scores, 78, 90];                // Add items

// ── Chaining ──
const topPassers = scores
  .filter(n => n >= 70)
  .sort((a, b) => b - a)
  .slice(0, 3)
  .map(n => `${n}%`);
console.log(topPassers); // ['95%', '92%', '88%']

// ── Checking ──
scores.every(n => n >= 50);  // false — checks ALL
scores.some(n => n >= 90);   // true  — checks ANY

// ── Destructive Operations (modify the original — avoid when possible) ──
const arr = [1, 2, 3];
arr.push(4);         // [1, 2, 3, 4]  — add to end
arr.pop();           // [1, 2, 3]     — remove from end
arr.unshift(0);      // [0, 1, 2, 3]  — add to start
arr.shift();         // [1, 2, 3]     — remove from start
arr.splice(1, 1);    // [1, 3]        — remove from index 1, count 1

// ── Flat & FlatMap ──
const nested = [[1, 2], [3, 4], [5, 6]];
nested.flat();       // [1, 2, 3, 4, 5, 6]

const sentences = ['Hello World', 'Good Morning'];
sentences.flatMap(s => s.split(' ')); // ['Hello', 'World', 'Good', 'Morning']

// ── Object.groupBy (ES2024) ── 
const students = [
  { name: 'Ada',   grade: 'A' },
  { name: 'Alan',  grade: 'B' },
  { name: 'Grace', grade: 'A' },
  { name: 'Linus', grade: 'C' },
];
const byGrade = Object.groupBy(students, s => s.grade);
// { A: [{Ada}, {Grace}], B: [{Alan}], C: [{Linus}] }
```

---

### Class 4 — Objects, Maps & Immutable Patterns

```javascript
// ── Object Creation & Shorthand ──
const name = 'Ada';
const age  = 30;

// Old way
const user1 = { name: name, age: age };

// Shorthand property names (ES6) — when variable name = key name
const user2 = { name, age };

// Computed property names
const field = 'email';
const user3 = { [field]: 'ada@deejoft.com' };   // { email: 'ada@deejoft.com' }

// ── Methods ──
const calculator = {
  value: 0,
  add(n)      { this.value += n; return this; },  // method shorthand
  subtract(n) { this.value -= n; return this; },  // return this enables chaining
  reset()     { this.value = 0;  return this; },
  result()    { return this.value; },
};
console.log(calculator.add(10).add(5).subtract(3).result()); // 12

// ── Immutable Update Patterns ── (critical for React)
const original = { name: 'Ada', age: 30, role: 'student' };

// ❌ Mutation — modifies the original object
original.age = 31;

// ✅ Create a new object with the change
const updated = { ...original, age: 31 };         // { name, age: 31, role }
const promoted = { ...original, role: 'instructor' };

// Nested update
const userWithAddress = {
  name: 'Ada',
  address: { city: 'Lagos', country: 'Nigeria' }
};
const movedUser = {
  ...userWithAddress,
  address: { ...userWithAddress.address, city: 'Abuja' }
};

// ── Object Utility Methods ──
const config = { theme: 'dark', lang: 'en', font: 'Inter' };

Object.keys(config);    // ['theme', 'lang', 'font']
Object.values(config);  // ['dark', 'en', 'Inter']
Object.entries(config); // [['theme','dark'], ['lang','en'], ['font','Inter']]
Object.fromEntries([['theme', 'dark'], ['lang', 'en']]); // recreate object from entries

// ── structuredClone — deep copy (ES2022) ──
const original2 = { name: 'Ada', scores: [88, 92] };
const shallow = { ...original2 };           // Shallow — scores array is shared!
const deep    = structuredClone(original2); // Deep — fully independent copy

shallow.scores.push(95);   // Also modifies original2.scores ← dangerous
deep.scores.push(95);      // Safe — original2.scores unchanged

// ── Map — when keys aren't strings ──
const userCache = new Map();
const userKey = { id: 1 };

userCache.set(userKey, { name: 'Ada', score: 95 });
userCache.get(userKey);  // { name: 'Ada', score: 95 }
userCache.has(userKey);  // true
userCache.size;          // 1

// ── Set — unique values ──
const raw = ['ada', 'alan', 'ada', 'grace', 'alan'];
const unique = [...new Set(raw)];  // ['ada', 'alan', 'grace']

// Fast existence check (O(1) vs array O(n))
const activeUsers = new Set(['ada', 'grace']);
activeUsers.has('ada');   // true
activeUsers.has('alan');  // false
```

---

## 📅 Week 3 — The DOM & Browser APIs

### Class 5 — DOM Manipulation

**Tutor Guidance:** The DOM is where JavaScript becomes visible. Start the session by typing `document.body.style.background = 'hotpink'` in the console of any website. Then say: "Everything you see on any webpage can be created, changed, or removed with JavaScript. That is what we are learning today."

```javascript
// ── Selecting Elements ──
const title    = document.getElementById('main-title');          // By ID
const btn      = document.querySelector('.submit-btn');          // First CSS match
const allCards = document.querySelectorAll('.card');             // All CSS matches (NodeList)

// NodeList → Array (do this to use array methods)
const cardsArray = Array.from(allCards);
// or: const cardsArray = [...allCards];

// ── Reading & Writing Content ──
title.textContent;                  // Plain text — safe, no HTML parsing
title.textContent = 'New Title';

title.innerHTML;                    // HTML string — DANGEROUS with user input (XSS)
title.innerHTML = '<em>New</em>';   // Use only with trusted, sanitised content

title.dataset.userId;               // Read data-user-id="123" attribute → '123'

// ── Modifying Classes ──
const card = document.querySelector('.card');
card.classList.add('active');
card.classList.remove('hidden');
card.classList.toggle('expanded');       // Add if absent, remove if present
card.classList.replace('old', 'new');
card.classList.contains('active');       // true/false

// ── Modifying Styles via CSS Custom Properties ──
// Prefer this over .style — keeps logic in CSS, not JS
document.documentElement.style.setProperty('--colour-primary', '#00d4aa');

// ── Creating & Inserting Elements ──
function createCard({ title, body, tags = [] }) {
  const article = document.createElement('article');
  article.className = 'card';

  article.innerHTML = `
    <h3 class="card__title">${title}</h3>
    <p class="card__body">${body}</p>
    <ul class="card__tags">
      ${tags.map(tag => `<li class="tag">${tag}</li>`).join('')}
    </ul>
  `;

  return article;
}

const newCard = createCard({
  title: 'React in 2025',
  body: 'Server Components change everything.',
  tags: ['React', 'Frontend'],
});

document.querySelector('#card-grid').append(newCard);

// ── Removing Elements ──
document.querySelector('.old-banner')?.remove();   // Optional chaining for safety

// ── Traversal ──
const list = document.querySelector('ul');
list.children;          // HTMLCollection of direct children
list.firstElementChild; // First child element
list.lastElementChild;  // Last child element
list.parentElement;     // The parent element
btn.closest('.form-group'); // Walk up the DOM until you find .form-group
```

---

### Class 6 — Events & the Browser API

```javascript
// ── Event Listeners ──
const btn = document.querySelector('#add-btn');

// ✅ addEventListener — attach multiple listeners, can be removed
btn.addEventListener('click', handleClick);

function handleClick(event) {
  event.preventDefault();     // Stop default behaviour (form submit, link nav)
  event.stopPropagation();    // Stop event bubbling up to parent elements

  console.log(event.target);  // The exact element that was clicked
  console.log(event.currentTarget); // The element the listener is attached to
}

btn.removeEventListener('click', handleClick); // Remove by reference

// ── Event Delegation — one listener for many elements ──
// Instead of attaching a listener to each card (inefficient, breaks on new cards):
const grid = document.querySelector('#card-grid');

grid.addEventListener('click', (event) => {
  // Find the closest card ancestor of what was clicked
  const card = event.target.closest('.card');
  if (!card) return;   // Click wasn't on a card — exit

  const deleteBtn = event.target.closest('.card__delete');
  if (deleteBtn) {
    card.remove();
    return;
  }

  card.classList.toggle('card--expanded');
});

// ── Useful Events ──
// Input events
input.addEventListener('input',  handler);   // Every keystroke
input.addEventListener('change', handler);   // On blur after change
input.addEventListener('focus',  handler);
input.addEventListener('blur',   handler);

// Form events
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const values = Object.fromEntries(data); // { name: 'Ada', email: '...' }
});

// Keyboard events
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) openCommandPalette(); // Cmd+K
});

// Intersection Observer — "is this element visible?"
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('card--visible');
        observer.unobserve(entry.target); // Stop watching after first reveal
      }
    });
  },
  { threshold: 0.1 } // Trigger when 10% of the element is visible
);

document.querySelectorAll('.card').forEach(card => observer.observe(card));
```

---

## 📅 Week 4 — Async JavaScript, Modules & Tooling

### Class 7 — Promises, Async/Await & Error Handling

**Tutor Guidance:** The "ordering food" analogy is still the best. You place your order (fetch), get a ticket (Promise), continue talking with your friends (non-blocking), and the food comes when it's ready (resolved). The key point: JavaScript does not wait. It registers a callback and moves on.

```javascript
// ── Why Async Matters ──

// The event loop: JS is single-threaded.
// Network requests can take 500ms. The UI freezes if we block.
// Async lets JS register "do this when done" and continue.

// ── Fetch & Promises ──
fetch('https://api.github.com/users/ajibolagenius')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();                   // Also returns a Promise
  })
  .then(user => console.log(user.name))
  .catch(error => console.error(error));

// ── Async/Await — cleaner syntax for the same thing ──
async function getGitHubUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`GitHub user not found (HTTP ${response.status})`);
    }

    const user = await response.json();
    return user;

  } catch (error) {
    // Handle: network failure, bad status, JSON parse error
    console.error('Failed to fetch user:', error.message);
    return null;    // Return a safe fallback — don't let callers deal with undefined
  }
}

// ── Parallel Requests — Promise.all ──
async function getDashboardData() {
  try {
    // ❌ Sequential — each waits for the previous (300ms + 200ms + 400ms = 900ms total)
    // const users    = await fetchUsers();
    // const courses  = await fetchCourses();
    // const stats    = await fetchStats();

    // ✅ Parallel — all start at the same time (max of 300, 200, 400 = 400ms total)
    const [users, courses, stats] = await Promise.all([
      fetchUsers(),
      fetchCourses(),
      fetchStats(),
    ]);

    return { users, courses, stats };

  } catch (error) {
    // If ANY request fails, this catch runs
    throw error;
  }
}

// ── Promise.allSettled — get results even if some fail ──
const results = await Promise.allSettled([
  fetch('/api/users'),
  fetch('/api/courses'),
  fetch('/api/broken-endpoint'),
]);

results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log('Success:', result.value);
  } else {
    console.error('Failed:', result.reason);
  }
});

// ── AbortController — cancel requests ──
const controller = new AbortController();

// Cancel the request after 5 seconds
const timeout = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch('/api/data', { signal: controller.signal });
  clearTimeout(timeout);
  const data = await response.json();
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request timed out');
  }
}
```

---

### Class 8 — ES Modules, Local Storage & Tooling

#### ES Modules — Organising Code

```javascript
// ── utils/api.js ── (a utility module)
const BASE_URL = 'https://api.deejoft.com';

export async function fetchCourses() {
  const response = await fetch(`${BASE_URL}/courses`);
  if (!response.ok) throw new Error('Failed to fetch courses');
  return response.json();
}

export async function enrolStudent(courseId, studentData) {
  const response = await fetch(`${BASE_URL}/courses/${courseId}/enrol`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData),
  });
  if (!response.ok) throw new Error('Enrolment failed');
  return response.json();
}

export const DEFAULT_PAGE_SIZE = 12;

// ── utils/dom.js ──
export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

export function $$(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

export function createElement(tag, { className, text, html, dataset } = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text)      el.textContent = text;
  if (html)      el.innerHTML = html;
  if (dataset)   Object.assign(el.dataset, dataset);
  return el;
}


// ── main.js ── (the entry point)
import { fetchCourses, DEFAULT_PAGE_SIZE } from './utils/api.js';
import { $, $$, createElement } from './utils/dom.js';

const grid = $('#course-grid');

async function init() {
  grid.innerHTML = '<p>Loading...</p>';

  try {
    const courses = await fetchCourses();
    grid.innerHTML = '';

    courses.slice(0, DEFAULT_PAGE_SIZE).forEach(course => {
      const card = createElement('article', {
        className: 'card',
        dataset: { id: course.id },
      });
      card.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
      grid.append(card);
    });

  } catch (error) {
    grid.innerHTML = `<p class="error">Failed to load courses: ${error.message}</p>`;
  }
}

init();
```

#### Web Storage

```javascript
// ── localStorage — persists after the tab/browser closes ──
// Values must be strings — always JSON.stringify/parse for objects

const STORAGE_KEY = 'deejoft_prefs';

// Save
function savePreferences(prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

// Load
function loadPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { theme: 'light', lang: 'en' };
  } catch {
    return { theme: 'light', lang: 'en' };  // Fallback on parse error
  }
}

// Remove
function clearPreferences() {
  localStorage.removeItem(STORAGE_KEY);
}

// ── sessionStorage — cleared when the tab closes ──
// Same API as localStorage, but data is session-scoped
sessionStorage.setItem('draft', JSON.stringify(formData));
```

#### Vite — The Modern Build Tool

```bash
# Create a vanilla JS project with Vite
npm create vite@latest my-dashboard -- --template vanilla

cd my-dashboard
npm install
npm run dev     # → http://localhost:5173

# What Vite gives you:
# - ES Modules resolved automatically (import './utils/api.js' just works)
# - Hot Module Replacement (HMR) — page updates without full reload
# - Optimised production build (tree-shaking, minification, code-splitting)
# - Environment variables (.env file, accessed via import.meta.env.VITE_API_KEY)

# .env file
# VITE_API_KEY=your_secret_key  ← never commit this file

# In code:
const apiKey = import.meta.env.VITE_API_KEY;
```

---

### 🏆 Week 4 Capstone — Live Data Dashboard

Build a data dashboard for a public API (e.g., REST Countries, Open Meteo weather, GitHub Stats).

**Requirements:**

| Feature | Must Include |
|---------|-------------|
| Project structure | Vite project with separate utility modules |
| Data fetching | `async/await` with `try/catch`, loading and error states |
| DOM rendering | Dynamic card rendering from API data |
| Filtering | Live search/filter using `Array.filter()` + input event |
| Sorting | Sort by at least one property using `Array.sort()` |
| Persistence | Save user preferences (e.g., last search, sort order) in `localStorage` |
| Event delegation | One listener on the container handles all card interactions |
| Parallel fetching | At least one `Promise.all()` call |

**Rubric:**

| Criterion | Points |
|-----------|--------|
| Code split into ES modules (no single-file spaghetti) | 10 |
| `const`/`let` used correctly throughout (no `var`) | 5 |
| `===` used for all comparisons | 5 |
| Async functions with `try/catch` and fallback states | 20 |
| Loading and error states rendered in the UI | 10 |
| DOM manipulation with `createElement` (no direct `innerHTML` on user data) | 10 |
| Event delegation on dynamic lists | 10 |
| `localStorage` used for at least one persistent preference | 10 |
| Functional array methods (`map`, `filter`, `sort`) used throughout | 10 |
| Vite project structure with clean module separation | 10 |
| **Total** | **100** |

---

## 📚 Essential References

| Resource | URL | Use For |
|----------|-----|---------|
| MDN JavaScript | `developer.mozilla.org/en-US/docs/Web/JavaScript` | Every method, every API |
| javascript.info | `javascript.info` | Best free in-depth JS textbook |
| What the f*ck JavaScript | `github.com/denysdovhan/wtfjs` | JS quirks explained |
| Roadmap.sh JS | `roadmap.sh/javascript` | Visual learning path |

---

*Deejoft Coding School — Instructor Materials | JavaScript Track*
*Rebuilt 2025 — ES2024, native modules, Vite, structuredClone, Object.groupBy*
