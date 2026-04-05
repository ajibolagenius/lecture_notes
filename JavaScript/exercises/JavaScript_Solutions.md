# ✅ JavaScript Exercises — Solutions
### Deejoft Coding School | Tutor Reference Only

---

## Week 1 Solutions

---

### Exercise 1.1 Solution — Predict the Output

| # | Expression | Result | Type |
|---|-----------|--------|------|
| 1 | `typeof null` | `'object'` | string (bug) |
| 2 | `typeof undefined` | `'undefined'` | string |
| 3 | `typeof []` | `'object'` | string |
| 4 | `typeof function(){}` | `'function'` | string |
| 5 | `0 ?? 'default'` | `0` | number |
| 6 | `null ?? 'default'` | `'default'` | string |
| 7 | `'' \|\| 'fallback'` | `'fallback'` | string |
| 8 | `'' ?? 'fallback'` | `''` | string |
| 9 | `false && 'never'` | `false` | boolean |
| 10 | `false \|\| null \|\| undefined \|\| 'found!'` | `'found!'` | string |
| 11 | `u.profile?.avatar ?? 'anon'` | `'anon'` | string |
| 12 | `5 === '5'` | `false` | boolean |
| 13 | `null == undefined` | `true` | boolean |
| 14 | `null === undefined` | `false` | boolean |

---

### Exercise 1.2 Solution — Fix the Bugs

```javascript
// Bug A — var → const (or let if reassigned)
function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  return cart;
}

// Bug B — == → ===
function isAdmin(user) {
  return user.role === 'admin';
}

// Bug C — || → ?? (0 is a valid value, not a fallback case)
const score = 0;
const display = score ?? 'No score yet';
console.log(display);   // 0

// Bug D — use optional chaining
const config = null;
const theme = config?.theme;   // undefined — no crash
// Or: const theme = config?.theme ?? 'light';
```

---

### Exercise 1.3 Solution — Grade Calculator

```javascript
function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 50) return 'C';
  return 'F';
}

function formatResult(name, score) {
  const grade = getGrade(score);
  return `${name} — ${score}/100 (Grade ${grade})`;
}

// Tests
console.log(formatResult('Ada Lovelace', 95));   // Ada Lovelace — 95/100 (Grade A)
console.log(formatResult('Alan Turing', 80));    // Alan Turing — 80/100 (Grade B)
console.log(formatResult('Grace Hopper', 60));   // Grace Hopper — 60/100 (Grade C)
console.log(formatResult('Linus Torvalds', 40)); // Linus Torvalds — 40/100 (Grade F)
```

---

### Exercise 1.4 Solution — FizzBuzz

```javascript
for (let i = 1; i <= 50; i++) {
  if (i % 15 === 0) console.log('DeejoftCode');
  else if (i % 3 === 0) console.log('Deejoft');
  else if (i % 5 === 0) console.log('Code');
  else console.log(i);
}
```

**Mark as correct if:** `% 15` (or `% 3 && % 5`) is checked FIRST, before the individual checks.

---

### Exercise 1.5 Solution — Function Toolkit

```javascript
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const sum = (...numbers) => numbers.reduce((total, n) => total + n, 0);

const pick = (obj, ...keys) =>
  Object.fromEntries(keys.map(key => [key, obj[key]]));

// Tests
console.log(clamp(5, 0, 10));    // 5
console.log(clamp(-3, 0, 10));   // 0
console.log(clamp(15, 0, 10));   // 10
console.log(sum(1, 2, 3));       // 6
console.log(pick({ a:1, b:2, c:3 }, 'a', 'c'));  // { a:1, c:3 }
```

---

## Week 2 Solutions

---

### Exercise 2.1 Solution — Array Method Chain

```javascript
// 1. Web courses sorted by rating (highest first)
const webCourses = products
  .filter(p => p.category === 'web')
  .sort((a, b) => b.rating - a.rating);

// 2. Names of courses under ₦80,000
const affordable = products
  .filter(p => p.price < 80000)
  .map(p => p.name);

// 3. Total price
const total = products.reduce((sum, p) => sum + p.price, 0);

// 4. Highest rated course
const topRated = products.reduce((best, p) => p.rating > best.rating ? p : best);
// OR: [...products].sort((a,b) => b.rating - a.rating).at(0);

// 5. All courses rated above 4.0
const allGood = products.every(p => p.rating > 4.0);

// 6. Group by category
const byCategory = Object.groupBy(products, p => p.category);
```

---

### Exercise 2.2 Solution — Immutable State Operations

```javascript
function updateUserRole(state, newRole) {
  return { ...state, user: { ...state.user, role: newRole } };
}

function enrollInCourse(state, courseId) {
  return {
    ...state,
    courses: state.courses.map(c =>
      c.id === courseId ? { ...c, enrolled: true } : c
    ),
  };
}

function incrementNotifications(state) {
  return { ...state, notifications: state.notifications + 1 };
}

function addCourse(state, course) {
  return { ...state, courses: [...state.courses, course] };
}

function removeCourse(state, courseId) {
  return {
    ...state,
    courses: state.courses.filter(c => c.id !== courseId),
  };
}

// Verify immutability
const state2 = updateUserRole(state, 'instructor');
console.log(state.user.role);    // 'student' — unchanged
console.log(state2.user.role);   // 'instructor'
```

---

### Exercise 2.3 Solution — Grade Registry

```javascript
function addStudent(state, { name, course }) {
  const newStudent = {
    id: crypto.randomUUID(),
    name,
    course,
    scores: [],
  };
  return { ...state, students: [...state.students, newStudent] };
}

function recordScore(state, studentId, subject, score) {
  if (score < 0 || score > 100) throw new Error(`Score must be 0–100, got ${score}`);
  return {
    ...state,
    students: state.students.map(s =>
      s.id === studentId
        ? { ...s, scores: [...s.scores, { subject, score }] }
        : s
    ),
  };
}

function getAverage(scores) {
  if (!scores.length) return 0;
  return scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
}

function getGradeLetter(avg) {
  if (avg >= 90) return 'A';
  if (avg >= 75) return 'B';
  if (avg >= 50) return 'C';
  return 'F';
}

function getReport(state) {
  return state.students
    .map(s => ({
      name: s.name,
      course: s.course,
      average: +getAverage(s.scores).toFixed(1),
      grade: getGradeLetter(getAverage(s.scores)),
      scoreCount: s.scores.length,
    }))
    .sort((a, b) => b.average - a.average);
}

function getTopStudents(state, n = 3) {
  return getReport(state).slice(0, n);
}
```

---

## Week 3 Solutions

---

### Exercise 3.2 Solution — Dynamic Card Builder

```javascript
function renderCourseCard(course) {
  const article = document.createElement('article');
  article.className = 'card';
  article.dataset.id = course.id;

  const header = document.createElement('header');
  header.className = 'card__header';

  const title = document.createElement('h3');
  title.className = 'card__title';
  title.textContent = course.title;   // Safe — textContent

  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = course.level;

  const price = document.createElement('p');
  price.className = 'card__price';
  price.textContent = `₦${course.price.toLocaleString()}`;

  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.dataset.action = 'enrol';
  btn.dataset.courseId = course.id;
  btn.textContent = 'Enrol Now';

  header.append(title, badge);
  article.append(header, price, btn);
  return article;
}

function renderAllCourses(courses, container) {
  container.innerHTML = '';   // Clear existing
  const fragment = document.createDocumentFragment();
  courses.forEach(c => fragment.append(renderCourseCard(c)));
  container.append(fragment);
}
```

---

### Exercise 3.3 Solution — Event Delegation Task List

```javascript
const form    = document.querySelector('#add-task-form');
const input   = document.querySelector('#task-input');
const list    = document.querySelector('#task-list');

// All three actions — one listener
list.addEventListener('click', (event) => {
  const item = event.target.closest('li');
  if (!item) return;

  // Delete
  if (event.target.closest('[data-action="delete"]')) {
    item.remove();
    return;
  }

  // Complete toggle (clicking the text or the li itself)
  if (event.target.closest('[data-action="toggle"]') || event.target === item) {
    item.classList.toggle('done');
  }
});

// Add task
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const li    = document.createElement('li');
  const span  = document.createElement('span');
  const delBtn = document.createElement('button');

  span.textContent = text;
  span.dataset.action = 'toggle';
  delBtn.textContent = '×';
  delBtn.dataset.action = 'delete';
  delBtn.setAttribute('aria-label', `Delete: ${text}`);

  li.append(span, delBtn);
  list.append(li);
  input.value = '';
  input.focus();
});
```

---

## Week 4 Solutions

---

### Exercise 4.1 Solution — Async Error Handling

```javascript
// 1. fetchWithFallback
async function fetchWithFallback(id) {
  try {
    return await fetchUserProfile(id);
  } catch {
    return null;
  }
}

// 2. fetchMultiple
async function fetchMultiple(ids) {
  const results = await Promise.allSettled(ids.map(fetchUserProfile));
  return results.map(r => r.status === 'fulfilled' ? r.value : null);
}

// 3. fetchWithTimeout
async function fetchWithTimeout(id, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      { signal: controller.signal }
    );
    clearTimeout(timer);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') throw new Error(`Timed out after ${ms}ms`);
    throw error;
  }
}

// 4. retryFetch
async function retryFetch(id, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetchUserProfile(id);
    } catch (error) {
      if (i === attempts - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Retry ${i + 1}/${attempts}...`);
    }
  }
}
```

---

### Exercise 4.2 Solution — Module System (Key Modules)

```javascript
// registry.js
export function addStudent(state, { name, course }) {
  return {
    ...state,
    students: [
      ...state.students,
      { id: crypto.randomUUID(), name, course, scores: [] }
    ]
  };
}

export function recordScore(state, studentId, subject, score) {
  if (score < 0 || score > 100) throw new Error('Score must be 0–100');
  return {
    ...state,
    students: state.students.map(s =>
      s.id === studentId
        ? { ...s, scores: [...s.scores, { subject, score }] }
        : s
    ),
  };
}

export function getReport(state) {
  return state.students
    .map(s => {
      const avg = s.scores.length
        ? s.scores.reduce((t, sc) => t + sc.score, 0) / s.scores.length
        : 0;
      return { ...s, average: +avg.toFixed(1) };
    })
    .sort((a, b) => b.average - a.average);
}

// storage.js
const KEY = 'registry_state';
const DEFAULT = { students: [] };

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : DEFAULT;
  } catch { return DEFAULT; }
}

// main.js
import { addStudent, recordScore, getReport } from './registry.js';
import { saveState, loadState } from './storage.js';

let state = loadState();

function render() {
  const report = getReport(state);
  const tbody = document.querySelector('#report-tbody');
  tbody.innerHTML = '';
  report.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.name}</td><td>${s.course}</td><td>${s.average}</td>`;
    tbody.append(tr);
  });
}

document.querySelector('#add-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const { name, course } = Object.fromEntries(new FormData(e.target));
  state = addStudent(state, { name, course });
  saveState(state);
  render();
  e.target.reset();
});

render();
```

---

*Deejoft Coding School | JavaScript Solutions | Tutor Reference — Do Not Distribute*
