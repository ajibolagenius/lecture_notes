# 📄 JavaScript Class 2 — Student Handout
### Control Flow & Functions
**Deejoft Coding School**

---

## A. Control Flow

```javascript
// if / else if / else — always use curly braces
if (score >= 90) {
  console.log('A');
} else if (score >= 75) {
  console.log('B');
} else {
  console.log('F');
}

// Ternary — one-line either/or (do not nest)
const grade = score >= 50 ? 'Pass' : 'Fail';

// for...of — iterate values
for (const course of courses) { console.log(course); }
for (const [i, course] of courses.entries()) { console.log(i, course); }

// for...in — iterate object keys
for (const key in obj) { console.log(key, obj[key]); }

// while — unknown iteration count
while (attempts < 3) { attempts++; }

// Loop control
break;    // Exit the loop entirely
continue; // Skip to the next iteration
```

> ✏️ **Fill in:** Which loop is best for "iterate over every item in an array"? ___________

---

## B. Functions — The Three Patterns

```javascript
// 1. Named declaration — hoisted, use for top-level reusable functions
function greet(name, cohort = 1) {
  return `Welcome, ${name}! Cohort ${cohort}.`;
}

// 2. Arrow function — use for callbacks and short transformations
const double = n => n * 2;                    // Single expression — implicit return
const greet  = (name) => `Hello, ${name}`;
const makeUser = (name) => ({ name, id: 1 }); // Return object — wrap in ()

// 3. Multi-line arrow — explicit return required
const formatCard = (course) => {
  const price = `₦${course.price.toLocaleString()}`;
  return `${course.title} — ${price}`;
};
```

> ✏️ **Fill in:** Why do you need `() =>` (parentheses) when returning an object literal with an arrow function?
>
> ___________________________________________________________________

---

## C. Rest & Spread

```javascript
// Rest (...) — collects remaining items INTO an array
function sum(...nums) { return nums.reduce((t, n) => t + n, 0); }
sum(1, 2, 3, 4);   // 10

// Spread (...) — expands OUT of an array or object
const a = [1, 2, 3];
const b = [...a, 4, 5];       // [1, 2, 3, 4, 5]
Math.max(...a);                // 3

const base = { theme: 'dark' };
const extended = { ...base, lang: 'en' }; // { theme: 'dark', lang: 'en' }
```

> ✏️ **Fill in:** `...` is used for TWO things. In a function parameter it **___________ INTO** an array. In a call or assignment it **___________ OUT OF** an array/object.

---

## D. Destructuring

```javascript
// Array destructuring
const [first, second, ...rest] = ['a', 'b', 'c', 'd'];
// first='a', second='b', rest=['c','d']

// Object destructuring
const { name, age, email = 'none' } = { name: 'Ada', age: 30 };
// Rename: const { name: studentName } = obj;

// Function parameter destructuring
function display({ name, cohort, score = 0 }) {
  console.log(`${name} | Cohort ${cohort} | ${score}/100`);
}
display({ name: 'Ada', cohort: 7, score: 95 });
```

---

## ⚡ Class 2 Quick Reference

| Concept | Syntax |
|---------|--------|
| Default parameter | `function fn(x, y = 10)` |
| Arrow function | `(param) => expression` |
| Rest params | `function fn(...args)` — last param only |
| Spread array | `[...arr, newItem]` — new array |
| Spread object | `{ ...obj, key: newVal }` — new object |
| Array destructure | `const [a, b] = arr;` |
| Object destructure | `const { name, age } = obj;` |
| Rename | `const { name: n } = obj;` |
| Default in destructure | `const { x = 0 } = obj;` |

---

*Deejoft Coding School | JavaScript Class 2 | Bring to Class 3*

---
---

# 📄 JavaScript Class 3 — Student Handout
### Arrays & Higher-Order Methods
**Deejoft Coding School**

---

## A. Array Methods Reference

```javascript
const nums = [88, 92, 75, 95, 67];

// ── Read ──
nums.at(0)               // 88  (first)
nums.at(-1)              // 67  (last — cleaner than nums[nums.length-1])
nums.indexOf(75)         // 2
nums.includes(95)        // true
nums.find(n => n > 90)   // 92  (first match, or undefined)
nums.findIndex(n => n > 90)  // 1

// ── NON-DESTRUCTIVE transforms (return NEW arrays) ──
nums.map(n => n * 2)         // [176, 184, 150, 190, 134]
nums.filter(n => n >= 75)    // [88, 92, 75, 95]
nums.slice(1, 3)             // [92, 75] — from index 1 up to (not including) 3
[...nums].sort((a,b) => b-a) // [95, 92, 88, 75, 67] — copy first, then sort

// ── Reduce — transforms array into ONE value ──
const total = nums.reduce((sum, n) => sum + n, 0);  // 417

// ── Checking ──
nums.every(n => n >= 50)   // false
nums.some(n => n >= 90)    // true

// ── Chaining ──
nums
  .filter(n => n >= 75)
  .sort((a, b) => b - a)
  .map(n => `${n}%`);
// ['95%', '92%', '88%', '75%']

// ── ES2024 ──
Object.groupBy(students, s => s.course);
// { React: [...], HTML: [...] }
```

> ✏️ **Fill in:** `map` always returns an array of the **_________ length** as the original. `filter` returns an array of **_________ or _________ length**.

> ✏️ **Fill in:** What is the initial value for this reduce: `arr.reduce((acc, n) => acc + n, ___)`?

---

## B. Destructive vs Non-Destructive

| Non-destructive (prefer) | Destructive (modifies original!) |
|--------------------------|----------------------------------|
| `map`, `filter`, `slice` | `push`, `pop`, `shift`, `unshift` |
| `find`, `findIndex`      | `splice`, `sort`, `reverse` |
| `[...arr].sort(...)`     | `arr.sort(...)` |

> ⚠️ Always copy before `sort`: `[...arr].sort(...)` — never `arr.sort()` on shared state.

---

## ⚡ Class 3 Quick Reference

| Method | Returns | Mutates? |
|--------|---------|---------|
| `.map(fn)` | New array, same length | No |
| `.filter(fn)` | New array, shorter | No |
| `.reduce(fn, init)` | Single value | No |
| `.find(fn)` | First match or `undefined` | No |
| `.findIndex(fn)` | Index or `-1` | No |
| `.slice(s, e)` | New sub-array | No |
| `.at(i)` | Item at index (neg ok) | No |
| `.some(fn)` | `true` if any match | No |
| `.every(fn)` | `true` if all match | No |
| `.flatMap(fn)` | Mapped + flattened | No |
| `.push(item)` | New length | YES |
| `.sort(fn)` | Same array sorted | YES |
| `Object.groupBy(arr, fn)` | Object of groups | No |

---

*Deejoft Coding School | JavaScript Class 3 | Bring to Class 4*

---
---

# 📄 JavaScript Class 4 — Student Handout
### Objects, Maps, Sets & Immutable Patterns
**Deejoft Coding School**

---

## A. Immutable Object Patterns

```javascript
const user = { name: 'Ada', role: 'student', cohort: 7 };

// ❌ Mutation — changes the original (dangerous for state)
user.role = 'instructor';

// ✅ Spread — creates a NEW object with the change
const promoted = { ...user, role: 'instructor' };

// ✅ Nested update
const profile = { user: { name: 'Ada', city: 'Lagos' }, score: 95 };
const moved = { ...profile, user: { ...profile.user, city: 'Abuja' } };

// ✅ structuredClone — deep copy
const original = { name: 'Ada', scores: [88, 92] };
const deep = structuredClone(original);
deep.scores.push(100);  // original.scores unchanged ✅
```

> ✏️ **Fill in:** Why does `const copy = { ...original }` fail to protect nested arrays?
>
> ___________________________________________________________________

---

## B. Object Utility Methods

```javascript
const config = { theme: 'dark', lang: 'en', font: 'Inter' };

Object.keys(config)     // ['theme', 'lang', 'font']
Object.values(config)   // ['dark', 'en', 'Inter']
Object.entries(config)  // [['theme','dark'], ['lang','en'], ['font','Inter']]
Object.fromEntries([['a', 1], ['b', 2]])  // { a: 1, b: 2 }
```

---

## C. Map & Set

```javascript
// Map — keys of any type, preserves insertion order
const cache = new Map();
cache.set('user:1', { name: 'Ada' });
cache.get('user:1');        // { name: 'Ada' }
cache.has('user:1');        // true
cache.size;                 // 1
for (const [key, val] of cache) { console.log(key, val); }

// Set — unique values only, O(1) lookup
const unique = new Set(['a', 'b', 'a', 'c']);  // Set {'a','b','c'}
unique.has('a');   // true
unique.add('d');
unique.size;       // 4

// Deduplication
const deduped = [...new Set(['x', 'y', 'x', 'z'])];  // ['x','y','z']
```

---

## ⚡ Class 4 Quick Reference

| Pattern | Code |
|---------|------|
| Add property | `{ ...obj, newKey: val }` |
| Update property | `{ ...obj, key: newVal }` |
| Update nested | `{ ...obj, inner: { ...obj.inner, key: val } }` |
| Deep clone | `structuredClone(obj)` |
| Object keys | `Object.keys(obj)` |
| Object entries | `Object.entries(obj)` |
| Rebuild from entries | `Object.fromEntries(entries)` |
| Unique array | `[...new Set(arr)]` |
| Fast lookup | `new Set(arr).has(item)` |

---

*Deejoft Coding School | JavaScript Class 4 | Bring to Class 5*

---
---

# 📄 JavaScript Class 5 — Student Handout
### DOM Manipulation
**Deejoft Coding School**

---

## A. Selecting Elements

```javascript
document.querySelector('.card')         // First CSS match
document.querySelectorAll('.card')       // All matches (NodeList)
[...document.querySelectorAll('.card')]  // Convert NodeList → Array
document.getElementById('hero')         // By ID (fast)
parent.querySelector('a')               // Scoped to parent
```

---

## B. Reading & Writing

```javascript
el.textContent          // Get/set plain text — ALWAYS safe
el.innerHTML            // Get/set HTML — only with TRUSTED data (XSS risk!)
el.getAttribute('href') // Get attribute
el.setAttribute('href', '/') // Set attribute
el.dataset.userId       // Get data-user-id attribute
el.classList.add('active')
el.classList.remove('hidden')
el.classList.toggle('open')
el.classList.contains('active')  // → boolean
document.documentElement.style.setProperty('--colour-primary', '#ff0')
```

---

## C. Creating & Inserting

```javascript
const el = document.createElement('article');
el.className = 'card';
el.dataset.id = course.id;
el.textContent = course.title;   // Always textContent for user data

parent.append(el);     // Insert at end of parent
parent.prepend(el);    // Insert at start of parent
el.remove();           // Remove from DOM
```

> ⚠️ **XSS Rule:** Never put user-typed input into `innerHTML`. Use `textContent` for any text that comes from a user or an external API you do not fully trust.

---

## ⚡ Class 5 Quick Reference

| Task | Code |
|------|------|
| Select first match | `document.querySelector(css)` |
| Select all matches | `[...document.querySelectorAll(css)]` |
| Set text safely | `el.textContent = value` |
| Create element | `document.createElement(tag)` |
| Add to page | `parent.append(el)` |
| Remove | `el.remove()` |
| Toggle class | `el.classList.toggle('name')` |
| Read data attribute | `el.dataset.myKey` |

---

*Deejoft Coding School | JavaScript Class 5 | Bring to Class 6*

---
---

# 📄 JavaScript Class 6 — Student Handout
### Events & Browser APIs
**Deejoft Coding School**

---

## A. Event Listeners

```javascript
el.addEventListener('click', handler);
el.removeEventListener('click', handler);  // Must be same reference

// AbortController — remove multiple listeners at once
const ctrl = new AbortController();
el.addEventListener('click', fn, { signal: ctrl.signal });
ctrl.abort();   // Removes all listeners with this signal
```

---

## B. The Event Object

```javascript
el.addEventListener('click', (event) => {
  event.preventDefault();    // Stop default (form submit, link follow)
  event.stopPropagation();   // Stop bubbling to parent elements
  event.target               // Element that was actually clicked
  event.currentTarget        // Element the listener is attached to
});
```

---

## C. Event Delegation — One Listener for Many Elements

```javascript
// Put the listener on the CONTAINER, not each child
container.addEventListener('click', (event) => {
  const card = event.target.closest('.card');
  if (!card) return;    // Click wasn't on a card

  const btn = event.target.closest('[data-action="delete"]');
  if (btn) { card.remove(); return; }
});
// Works for dynamically added cards too ✅
```

---

## D. FormData & IntersectionObserver

```javascript
// FormData — read all form inputs at once
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const values = Object.fromEntries(new FormData(form));
  // { name: 'Ada', email: '...', message: '...' }
});

// IntersectionObserver — run code when element enters viewport
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);  // Stop watching after first trigger
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card').forEach(el => obs.observe(el));
```

---

## ⚡ Class 6 Quick Reference

| Task | Code |
|------|------|
| Listen for click | `el.addEventListener('click', fn)` |
| Prevent default | `event.preventDefault()` |
| Stop bubbling | `event.stopPropagation()` |
| Closest ancestor | `event.target.closest('.selector')` |
| Read form values | `Object.fromEntries(new FormData(form))` |
| Viewport entry | `new IntersectionObserver(fn, { threshold })` |
| Keyboard event | `document.addEventListener('keydown', fn)` |
| Check key | `event.key === 'Escape'` |

---

*Deejoft Coding School | JavaScript Class 6 | Bring to Class 7*

---
---

# 📄 JavaScript Class 7 — Student Handout
### Async JavaScript: Promises & Async/Await
**Deejoft Coding School**

---

## A. async/await Pattern

```javascript
async function getData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();

  } catch (error) {
    if (error.name === 'AbortError') console.log('Request cancelled');
    else console.error('Fetch failed:', error.message);
    return null;   // Always return a safe fallback
  }
}
```

> ✏️ **Fill in:** `await` can only be used inside a function declared with the `________` keyword.

---

## B. Parallel vs Sequential

```javascript
// ❌ Sequential — 300ms + 200ms + 400ms = ~900ms total
const a = await fetchA();
const b = await fetchB();
const c = await fetchC();

// ✅ Parallel — max(300, 200, 400) = ~400ms total
const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);
// ⚠️ If ANY rejects, Promise.all rejects

// ✅ Parallel — tolerates failures
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  else console.error(r.reason);
});
```

---

## C. AbortController

```javascript
const ctrl = new AbortController();
setTimeout(() => ctrl.abort(), 5000);   // Cancel after 5s

try {
  const res = await fetch(url, { signal: ctrl.signal });
} catch (e) {
  if (e.name === 'AbortError') console.log('Timed out');
}
```

---

## ⚡ Class 7 Quick Reference

| Concept | Code |
|---------|------|
| Declare async function | `async function fn() {}` |
| Await a promise | `const data = await promise;` |
| Handle errors | `try { await ... } catch (e) {}` |
| Parallel requests | `await Promise.all([p1, p2, p3])` |
| Tolerant parallel | `await Promise.allSettled([p1, p2])` |
| Check HTTP error | `if (!response.ok) throw new Error(...)` |
| Parse JSON | `await response.json()` |
| Cancel request | `new AbortController()` + `{ signal }` |

---

*Deejoft Coding School | JavaScript Class 7 | Bring to Class 8*

---
---

# 📄 JavaScript Class 8 — Student Handout
### ES Modules, localStorage & Vite
**Deejoft Coding School** | Includes the full JavaScript Quick Reference.

---

## A. ES Modules

```javascript
// Exporting (utils/api.js)
export async function fetchCourses() { ... }    // Named export
export const PAGE_SIZE = 12;                     // Named export
export default fetchCourses;                     // Default export (one per file)

// Importing (main.js)
import fetchCourses from './utils/api.js';                    // Default
import { fetchCourses, PAGE_SIZE } from './utils/api.js';     // Named
import fetchCourses, { PAGE_SIZE } from './utils/api.js';     // Both
import * as api from './utils/api.js';                        // All as namespace
```

---

## B. localStorage

```javascript
// Always JSON.stringify/parse — localStorage only stores strings
localStorage.setItem('key', JSON.stringify(value));

const raw = localStorage.getItem('key');
const val = raw ? JSON.parse(raw) : defaultValue;

localStorage.removeItem('key');
localStorage.clear();   // Remove everything
```

---

## C. Vite Quickstart

```bash
npm create vite@latest my-app -- --template vanilla
cd my-app && npm install && npm run dev
npm run build   # → /dist folder for deployment
```

```javascript
// Environment variables — must start with VITE_
// .env file (never commit to git):
// VITE_API_KEY=your_key

const key = import.meta.env.VITE_API_KEY;
```

---

## ⚡ JavaScript Master Quick Reference

### Variables & Types
| Concept | Syntax / Rule |
|---------|--------------|
| `const` | Cannot be reassigned. Use first. |
| `let` | Can be reassigned. Use when needed. |
| Template literal | `` `Hello, ${name}!` `` |
| `typeof null` | `'object'` (bug) — use `=== null` |
| Optional chain | `obj?.prop?.nested` |
| Nullish coalesce | `val ?? 'default'` |
| Strict equality | Always `===`, never `==` |

### Functions
| Concept | Syntax |
|---------|--------|
| Named declaration | `function fn(a, b = 0) { return ... }` |
| Arrow (implicit return) | `(a, b) => a + b` |
| Arrow (explicit return) | `(a) => { return a * 2; }` |
| Return object | `() => ({ key: val })` |
| Rest params | `function fn(...args)` |
| Destructuring param | `function fn({ name, age = 0 })` |

### Array Methods
| Method | Returns | Mutates |
|--------|---------|---------|
| `.map(fn)` | New array, same length | No |
| `.filter(fn)` | New array, filtered | No |
| `.reduce(fn, init)` | Single value | No |
| `.find(fn)` | First match or undefined | No |
| `.some(fn)` / `.every(fn)` | Boolean | No |
| `.at(-1)` | Last item | No |
| `.flatMap(fn)` | Flat mapped array | No |
| `Object.groupBy(arr, fn)` | Grouped object | No |

### Immutable Patterns
```javascript
// Object update
const next = { ...prev, key: newVal };
// Nested update
const next = { ...prev, inner: { ...prev.inner, key: val } };
// Array add
const next = [...arr, newItem];
// Array update
const next = arr.map(i => i.id === id ? { ...i, ...change } : i);
// Array remove
const next = arr.filter(i => i.id !== id);
// Deep clone
structuredClone(obj);
```

### DOM
```javascript
document.querySelector('.css')           // First match
[...document.querySelectorAll('.css')]    // All matches
el.textContent = value                   // Set text (safe)
el.setAttribute('aria-label', val)       // Set attribute
el.classList.toggle('name')              // Toggle class
document.createElement('div')            // Create element
parent.append(el) / el.remove()          // Insert / remove
event.target.closest('.selector')        // Walk up DOM
Object.fromEntries(new FormData(form))   // Read all form inputs
```

### Async
```javascript
async function fn() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) { return null; }
}
await Promise.all([p1, p2])        // Parallel — fails fast
await Promise.allSettled([p1, p2]) // Parallel — tolerates failures
```

### Modules & Tools
```javascript
export function fn() {}      // Named export
export default fn;           // Default export
import fn from './file.js'   // Default import
import { fn } from './file'  // Named import
import.meta.env.VITE_KEY     // Vite env var
localStorage.setItem(k, JSON.stringify(v))
JSON.parse(localStorage.getItem(k) ?? 'null')
```

---

*Deejoft Coding School | JavaScript Class 8 | Full reference — keep permanently*
