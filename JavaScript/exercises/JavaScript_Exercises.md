# ✏️ JavaScript Exercises
### Deejoft Coding School — All 8 Classes

**Setup:** Week 1–2 exercises run in the browser console. Week 3–4 use a `.js` file run with `node`. Week 5–8 use a linked `<script type="module">` in an HTML page or a Vite project.

---

## Week 1 — Variables, Types, Control Flow & Functions

---

### Exercise 1.1 — Predict the Output ⭐

Without running the code, predict what each expression returns. Then run them to verify.

```javascript
// What does each evaluate to? Give the value AND the type.

1.  typeof null
2.  typeof undefined
3.  typeof []
4.  typeof function() {}
5.  0 ?? 'default'
6.  null ?? 'default'
7.  '' || 'fallback'
8.  '' ?? 'fallback'
9.  false && 'never'
10. false || null || undefined || 'found!'
11. const u = { profile: null };
    u.profile?.avatar ?? 'anon'
12. 5 === '5'
13. null == undefined
14. null === undefined
```

Write your predictions here before running:
```
1: ________    8: ________
2: ________    9: ________
3: ________    10: _______
4: ________    11: _______
5: ________    12: _______
6: ________    13: _______
7: ________    14: _______
```

---

### Exercise 1.2 — Fix the Bugs ⭐

Each snippet has one or more bugs. Find and fix them.

```javascript
// Bug A — wrong variable keyword
function addToCart(item) {
  var cart = getCart();   // BUG
  cart.push(item);
  return cart;
}

// Bug B — wrong equality operator
function isAdmin(user) {
  return user.role == 'admin';   // BUG
}

// Bug C — operator choice
const score = 0;
const display = score || 'No score yet';   // BUG — should show '0' not the fallback
console.log(display);

// Bug D — potential crash
const config = null;
const theme = config.theme;   // BUG — crashes if config is null
```

---

### Exercise 1.3 — Grade Calculator ⭐⭐

Write a `getGrade(score)` function:
- Score ≥ 90 → `'A'`
- Score ≥ 75 → `'B'`
- Score ≥ 50 → `'C'`
- Below 50 → `'F'`

Then write `formatResult(name, score)` that returns a string like:
`"Ada Lovelace — 95/100 (Grade A)"`

Requirements:
- No `var`
- `getGrade` uses `if/else if/else`
- `formatResult` uses a template literal
- Both functions are tested with at least 4 different inputs

---

### Exercise 1.4 — FizzBuzz with Flavour ⭐⭐

Print numbers 1–50. But:
- If divisible by 3: print `'Deejoft'`
- If divisible by 5: print `'Code'`
- If divisible by both: print `'DeejoftCode'`
- Otherwise: print the number

Use a `for` loop and the modulo operator `%`.

---

### Exercise 1.5 — Function Toolkit ⭐⭐⭐

Write these three functions:

```javascript
// 1. clamp(value, min, max) — returns value constrained between min and max
clamp(5, 0, 10)   // 5
clamp(-3, 0, 10)  // 0
clamp(15, 0, 10)  // 10

// 2. sum(...numbers) — sums any number of arguments
sum(1, 2, 3)         // 6
sum(10, 20, 30, 40)  // 100

// 3. pick(obj, ...keys) — returns a new object with only the specified keys
pick({ a: 1, b: 2, c: 3, d: 4 }, 'a', 'c')
// { a: 1, c: 3 }
```

---

## Week 2 — Arrays & Objects

---

### Exercise 2.1 — Array Method Chain ⭐

Given:
```javascript
const products = [
  { id: 1, name: 'HTML Course',   price: 49999, category: 'web',    rating: 4.8 },
  { id: 2, name: 'JS Course',     price: 79999, category: 'web',    rating: 4.6 },
  { id: 3, name: 'React Course',  price: 89999, category: 'web',    rating: 4.9 },
  { id: 4, name: 'Python Course', price: 79999, category: 'python', rating: 4.7 },
  { id: 5, name: 'RN Course',     price: 89999, category: 'mobile', rating: 4.5 },
];
```

Using only array methods (no `for` loops):
1. Get all web courses sorted by rating (highest first)
2. Get the names of courses under ₦80,000
3. Calculate the total price of all courses
4. Find the highest-rated course
5. Check if ALL courses have a rating above 4.0
6. Group courses by category using `Object.groupBy`

---

### Exercise 2.2 — Immutable State Operations ⭐⭐

Given:
```javascript
const state = {
  user: { name: 'Ada', email: 'ada@deejoft.com', role: 'student' },
  courses: [
    { id: 1, title: 'JavaScript', enrolled: false },
    { id: 2, title: 'React',      enrolled: false },
  ],
  notifications: 0,
};
```

Write these functions. Each must return a **new state object** — the original `state` must be unchanged:

```javascript
// 1. updateUserRole(state, newRole) → new state with updated role
// 2. enrollInCourse(state, courseId) → new state with that course's enrolled=true
// 3. incrementNotifications(state) → new state with notifications + 1
// 4. addCourse(state, course) → new state with course added to courses array
// 5. removeCourse(state, courseId) → new state without that course
```

After each function, `console.log(state)` to verify it is unchanged.

---

### Exercise 2.3 — Grade Registry ⭐⭐⭐

Build a student grade registry using only pure functions and immutable patterns:

```javascript
// Starting state
const initial = { students: [] };

// Functions to build (all return a new state object):
// addStudent(state, { name, course })
//   - generates an id with crypto.randomUUID()
//   - new student has scores: []
//
// recordScore(state, studentId, subject, score)
//   - adds { subject, score } to the student's scores array
//   - throws Error if score < 0 or > 100
//
// getReport(state)
//   - returns array of students with their average score and grade letter
//   - sorted by average descending
//
// getTopStudents(state, n = 3)
//   - returns top n students by average

// Test your system:
let s = initial;
s = addStudent(s, { name: 'Ada', course: 'React' });
s = addStudent(s, { name: 'Alan', course: 'HTML' });
const [adaId, alanId] = s.students.map(st => st.id);
s = recordScore(s, adaId, 'Week 1', 92);
s = recordScore(s, adaId, 'Week 2', 88);
s = recordScore(s, alanId, 'Week 1', 75);
console.log(getReport(s));
```

---

## Week 3 — DOM Manipulation

---

### Exercise 3.1 — DOM Reading ⭐

Open your HTML portfolio in the browser. In the console, write code to:

1. Select the `<h1>` and read its text content
2. Select all `<a>` elements inside `<nav>` and count them
3. Find the first `<article>` and read its `data-id` attribute
4. Check if the `<footer>` has the class `site-footer`
5. Read the current value of the CSS custom property `--colour-primary`
   (Hint: `getComputedStyle(document.documentElement).getPropertyValue('--colour-primary')`)

---

### Exercise 3.2 — Dynamic Card Builder ⭐⭐

Using `createElement` and `textContent` only (no `innerHTML`), build a function `renderCourseCard(course)` that creates and returns this DOM structure:

```html
<article class="card" data-id="[course.id]">
  <header class="card__header">
    <h3 class="card__title">[course.title]</h3>
    <span class="badge">[course.level]</span>
  </header>
  <p class="card__price">₦[formatted price]</p>
  <button class="btn" data-action="enrol" data-course-id="[course.id]">
    Enrol Now
  </button>
</article>
```

Then write `renderAllCourses(courses, container)` that clears the container and renders all cards.

---

### Exercise 3.3 — Event Delegation System ⭐⭐

Build an interactive task list using event delegation:

```javascript
// Tasks:
// 1. Add a task — input field + Add button
// 2. Complete a task — clicking the task text toggles a 'done' class
// 3. Delete a task — a × button on each task removes it
// 4. ALL three actions use ONE event listener on the <ul> container
// 5. New tasks added dynamically must work immediately (no new listeners)
```

---

### Exercise 3.4 — Animated Portfolio ⭐⭐⭐

Wire up the HTML portfolio page with JavaScript:

1. **Navigation:** smooth scroll to sections on nav link click
2. **Modal:** clicking a project card opens a `<dialog>` with project title, description, and a GitHub link. Close on Escape or clicking outside.
3. **Contact form:** 
   - Validate: name required, email must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   - Show error messages using `aria-describedby` linked `<span>` elements
   - On valid submit: show a success `<dialog>`, reset the form
4. **Scroll animation:** `IntersectionObserver` adds `is-visible` class to cards entering the viewport
5. **Theme toggle:** a button that toggles `data-theme="dark"` on `<html>`, saving preference in `localStorage`

---

## Week 4 — Async, Modules & Tooling

---

### Exercise 4.1 — Async Error Handling ⭐⭐

```javascript
// Given this function that might fail:
async function fetchUserProfile(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!response.ok) throw new Error(`User ${id} not found`);
  return response.json();
}

// Write:
// 1. fetchWithFallback(id) — calls fetchUserProfile, returns null on any error
// 2. fetchMultiple(ids) — fetches all ids in PARALLEL, returns array (null for failed ones)
// 3. fetchWithTimeout(id, ms) — cancels with AbortController if takes longer than ms
// 4. retryFetch(id, attempts=3) — retries up to 3 times with 500ms delay between attempts
//    (Hint for delay: await new Promise(resolve => setTimeout(resolve, 500)))
```

---

### Exercise 4.2 — Module System ⭐⭐

Refactor the grade registry from Exercise 2.3 into a module system:

```
registry/
├── registry.js        — the pure state functions (addStudent, recordScore, etc.)
├── formatting.js      — display helpers (formatGrade, formatPrice, etc.)
├── storage.js         — localStorage helpers (saveState, loadState)
└── main.js            — imports from all modules, connects to DOM
```

Requirements:
- Each module only exports what is needed
- `main.js` imports from all three
- State is saved to `localStorage` on every change and loaded on startup
- `main.js` is connected to a simple HTML UI: add student form, record score form, report table

---

### Exercise 4.3 — Live Data Dashboard ⭐⭐⭐

Build a complete Vite project: a searchable country explorer.

**API:** `https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region`

**Requirements:**

| Feature | Details |
|---------|---------|
| Vite project | `vanilla` template, modules in `src/` |
| Fetch | `async/await` with loading spinner and error state |
| Display | Card per country: flag, name, capital, population formatted |
| Search | Live filter by country name using `input` event |
| Filter | Dropdown to filter by region |
| Sort | By population (asc/desc) |
| Persistence | Last search query and region filter saved in `localStorage` |
| Event delegation | One click listener on the grid handles "View Details" |
| Details | Clicking a card shows more info in a `<dialog>` |
| Parallel fetch | Use `Promise.all` to also fetch a random trivia fact from a second API |
| Commits | At least 6 meaningful Git commits |

---

*Deejoft Coding School | JavaScript Exercises | Run in console (Week 1–2) · Node (Week 2–3) · Browser/Vite (Week 3–4)*
