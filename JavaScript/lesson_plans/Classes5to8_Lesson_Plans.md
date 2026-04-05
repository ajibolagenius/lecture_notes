# 📋 JavaScript Class 5 — Lesson Plan (Tutor Script)
### DOM Manipulation & Selectors
**Duration:** ~2 hours | **Format:** Live browser manipulation

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:50 | Selecting, reading, writing DOM elements |
| 0:50 – 1:30 | Creating elements, inserting, removing |
| 1:30 – 2:00 | Building a dynamic card list exercise |

---

## 🎤 PART A — What the DOM Is (0:10 – 0:20)

**[SAY:]:**
> "When the browser loads your HTML, it parses it into a tree of objects in memory — the Document Object Model. The DOM is the live representation of your page. It is a JavaScript object. Every element, attribute, and piece of text is a node you can read, create, move, and delete with JavaScript."

**[DO in console on the portfolio page:]**
```javascript
// The document object is the root
document.title                   // Read the page title
document.title = 'New Title';    // Write it — watch the tab change

// Body is the root of visible content
document.body.style.background = 'salmon';   // Live visual change
```

---

## 🎤 PART B — Selecting Elements (0:20 – 0:45)

**[TYPE:]**
```javascript
// querySelector — first CSS match
const heading = document.querySelector('h1');
const btn     = document.querySelector('.submit-btn');
const first   = document.querySelector('article:first-of-type');

// querySelectorAll — ALL CSS matches → NodeList
const cards   = document.querySelectorAll('.card');

// NodeList to Array (to use map, filter, etc.)
const cardsArray = Array.from(cards);
// or: const cardsArray = [...cards];

// Scoped query — search WITHIN an element
const nav = document.querySelector('nav');
const navLinks = nav.querySelectorAll('a');   // Only links inside nav

// getElementById — fast, by ID
const hero = document.getElementById('hero');
```

**[SAY:]:**
> "`querySelector` and `querySelectorAll` accept the same CSS selector syntax you learned in the CSS course. Any valid CSS selector works. This means you can use `:nth-child()`, attribute selectors, combinators — all of it. You do not need a new syntax; you already know how to target elements."

**[TYPE:]**
```javascript
// Reading and writing content
const title = document.querySelector('h1');

title.textContent              // Get plain text — safe, no HTML parsing
title.textContent = 'New!';    // Set plain text

title.innerHTML                // Get HTML string — DANGER: user input can cause XSS
title.innerHTML = '<em>New!</em>';  // Set HTML — only with trusted content

// Attributes
const link = document.querySelector('a');
link.getAttribute('href')          // Get attribute value
link.setAttribute('href', '/new'); // Set attribute value
link.removeAttribute('target');    // Remove attribute
link.hasAttribute('disabled');     // Check if attribute exists
link.href                          // Direct property access (same as getAttribute)

// Data attributes
const card = document.querySelector('[data-id]');
card.dataset.id                   // Read data-id
card.dataset.userId = '123';      // Set data-user-id
```

---

## 🎤 PART C — Creating & Manipulating Elements (0:45 – 1:30)

**[TYPE:]**
```javascript
// Creating elements
function createCourseCard({ id, title, instructor, price }) {
  const article = document.createElement('article');
  article.className = 'card';
  article.dataset.id = id;

  article.innerHTML = `
    <h3 class="card__title">${title}</h3>
    <p class="card__instructor">By ${instructor}</p>
    <p class="card__price">₦${price.toLocaleString()}</p>
    <button class="btn btn--primary">Enrol Now</button>
  `;
  // ⚠️ innerHTML is OK here because title/instructor/price come from our own data
  // NEVER use innerHTML with user-typed input

  return article;
}

const grid = document.querySelector('#course-grid');
const newCard = createCourseCard({ id: 1, title: 'React', instructor: 'Ada', price: 89999 });
grid.append(newCard);         // Insert at end
grid.prepend(newCard);        // Insert at start
grid.before(newCard);         // Insert before the grid itself
newCard.remove();             // Remove from DOM

// classList
newCard.classList.add('card--featured');
newCard.classList.remove('hidden');
newCard.classList.toggle('active');           // Add if absent, remove if present
newCard.classList.contains('featured');       // true/false
newCard.classList.replace('old', 'new');

// Styling via CSS custom properties (keep logic in CSS, not JS)
document.documentElement.style.setProperty('--colour-primary', '#00d4aa');
```

**[SAY for innerHTML with user data:]:**
> "I want to flag something. We used `innerHTML` to build the card template — and that is fine because the data came from our own JavaScript object. But if you ever put a user's typed input directly into `innerHTML` — anything from a form, a URL parameter, an API response you do not control — that is a Cross-Site Scripting (XSS) vulnerability. A malicious user types `<script>stealYourCookies()</script>` into a name field, and your app executes it. Use `textContent` for user-generated text. Always."

---

## 📅 Class 5 Exercise (1:30 – 2:00)

Build a dynamic card renderer:
```javascript
// Given this data:
const courses = [
  { id: 1, title: 'HTML & CSS',   price: 49999, level: 'Beginner'    },
  { id: 2, title: 'JavaScript',   price: 79999, level: 'Beginner'    },
  { id: 3, title: 'React',        price: 89999, level: 'Intermediate'},
];

// Tasks:
// 1. Create a <section id="courses"> and append it to document.body
// 2. For each course, create a card with title, price, level using createElement
// 3. Add a "Remove" button to each card that removes the card when clicked
// 4. Add a "Highlight" button that toggles a class on the card
// 5. Do NOT use innerHTML for any user-facing text
```

---

*Deejoft Coding School | JavaScript Class 5*

---
---

# 📋 JavaScript Class 6 — Lesson Plan (Tutor Script)
### Events, Forms & the Intersection Observer
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:55 | Event listeners, bubbling, delegation |
| 0:55 – 1:30 | FormData, keyboard events, IntersectionObserver |
| 1:30 – 2:00 | Interactive portfolio exercise |

---

## 🎤 PART A — Events & Bubbling (0:10 – 0:55)

**[SAY:]:**
> "Events are how JavaScript responds to user actions: clicks, keystrokes, form submissions, scroll, resize. Every event has a target — the element it happened on — and it bubbles up through the DOM tree to the root. Understanding bubbling is what enables event delegation."

**[TYPE:]**
```javascript
const btn = document.querySelector('#enrol-btn');

// addEventListener — the only correct way in modern JS
btn.addEventListener('click', function handleClick(event) {
  event.preventDefault();    // Prevent default browser action
  event.stopPropagation();   // Stop event bubbling to parent elements

  console.log(event.target);         // Element that was clicked
  console.log(event.currentTarget);  // Element with the listener attached
  console.log(event.type);           // 'click'
});

// Remove a listener — must pass the SAME function reference
btn.removeEventListener('click', handleClick);

// AbortController — modern way to manage listener lifecycle
const controller = new AbortController();
btn.addEventListener('click', handler, { signal: controller.signal });
controller.abort();   // Removes all listeners using this signal at once
```

**[DRAW on board — bubbling:]**
```
User clicks <button> inside <div class="card"> inside <main>

Event fires on: <button>  →  <div.card>  →  <main>  →  <body>  →  <html>  →  document
                ↑ target     ← bubbles up through each ancestor
```

**[TYPE — event delegation:]**
```javascript
// ❌ Attaching a listener to every card — inefficient, breaks on new cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', handleCardClick);
});

// ✅ Event delegation — one listener on the CONTAINER
const grid = document.querySelector('#card-grid');

grid.addEventListener('click', (event) => {
  // Walk up the DOM to find the closest card from the clicked element
  const card = event.target.closest('.card');
  if (!card) return;   // Click was not inside a card

  const deleteBtn = event.target.closest('[data-action="delete"]');
  if (deleteBtn) {
    card.remove();
    return;
  }

  card.classList.toggle('card--expanded');
});
```

**[SAY for delegation:]:**
> "Delegation works because of bubbling. When you click anywhere inside a card — the title, the image, the button — the click event bubbles up through the card and reaches the grid listener. `closest()` walks UP the DOM to find the matching ancestor. This one listener handles ALL cards, including cards added dynamically after the page loads. This is the correct pattern for dynamic lists."

---

## 🎤 PART B — Forms, Keyboard & IntersectionObserver (0:55 – 1:30)

**[TYPE:]**
```javascript
// Form events
const form = document.querySelector('#contact-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();   // Prevent page reload

  const data = new FormData(form);  // Reads all named inputs
  const values = Object.fromEntries(data);
  // { name: 'Ada', email: 'ada@...', message: '...' }

  console.log(values);
  form.reset();   // Clear all inputs
});

// Input validation feedback
const emailInput = document.querySelector('#email');
emailInput.addEventListener('input', () => {
  const isValid = emailInput.validity.valid;
  emailInput.setAttribute('aria-invalid', !isValid);
});

// Keyboard events
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
  if (event.key === 'k' && (event.metaKey || event.ctrlKey)) openSearch();
});
```

**[TYPE:]**
```javascript
// IntersectionObserver — fire when elements enter/leave the viewport
// Perfect for: lazy animations, lazy loading, infinite scroll triggers

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);  // Fire once, then stop watching
      }
    });
  },
  {
    threshold: 0.15,   // Fire when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px',  // Virtual shrink of viewport bottom by 50px
  }
);

// Observe every card
document.querySelectorAll('.card').forEach(card => observer.observe(card));
```

---

## 📅 Class 6 Exercise (1:30 – 2:00)

Make the HTML portfolio interactive:
```
1. Navigation — clicking a nav link smoothly scrolls to the section (use scrollIntoView)
2. Project cards — clicking a card opens a <dialog> modal with the full project details
3. Contact form — on submit, validate name (required) and email (valid format),
   show inline error messages, on success show a confirmation message
4. Scroll animations — use IntersectionObserver to fade-in cards as they enter the viewport
5. Keyboard — pressing Escape closes any open modal
```

---

*Deejoft Coding School | JavaScript Class 6*

---
---

# 📋 JavaScript Class 7 — Lesson Plan (Tutor Script)
### Async JavaScript: Promises & Async/Await
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:40 | The event loop — why async exists |
| 0:40 – 1:15 | fetch, Promises, async/await, error handling |
| 1:15 – 1:50 | Promise.all, Promise.allSettled, AbortController |
| 1:50 – 2:00 | Exercise setup |

---

## 🎤 PART A — The Event Loop (0:10 – 0:40)

**[SAY:]:**
> "JavaScript is single-threaded. There is one thread, one call stack, and one thing happening at a time. But network requests take hundreds of milliseconds. If JavaScript waited for each request before continuing, the UI would freeze every time you fetched data. Async JavaScript solves this without multiple threads."

**[DRAW on board:]**
```
CALL STACK         WEB APIS          CALLBACK QUEUE
──────────         ────────          ──────────────
main()          → setTimeout(fn,0) → fn waiting...
fetch()         → Network request  → when done → push to queue
                                      ↓
                              EVENT LOOP checks:
                              "Is call stack empty?"
                              "Yes" → move fn from queue to stack
```

**[SAY:]:**
> "The event loop checks constantly: is the call stack empty? If yes, move the next callback from the queue onto the stack and run it. This is how JavaScript is non-blocking despite being single-threaded. Your `fetch()` goes to the browser API. JavaScript keeps running. When the response arrives, the callback joins the queue. When the stack is empty, the event loop picks it up."

---

## 🎤 PART B — Fetch & Async/Await (0:40 – 1:15)

**[TYPE:]**
```javascript
// fetch returns a Promise — an object representing a future value
const promise = fetch('https://api.github.com/users/ajibolagenius');
console.log(promise);   // Promise { <pending> }

// .then() — register what to do when the promise resolves
promise
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();   // Also a Promise
  })
  .then(user => console.log(user.name))
  .catch(error => console.error(error));

// async/await — cleaner syntax for the same thing
async function getUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`User not found (HTTP ${response.status})`);
    }

    const user = await response.json();
    return user;

  } catch (error) {
    console.error('Failed to fetch user:', error.message);
    return null;   // Return a safe fallback — never let callers deal with undefined
  }
}

// Usage
const ada = await getUser('ajibolagenius');
console.log(ada?.name);
```

**[SAY:]:**
> "`async` functions always return a Promise — even if you return a plain value. `await` pauses the async function until the Promise resolves, then gives you the value. It does NOT block the thread — other code can run during the wait. The `try/catch` around `await` is equivalent to `.catch()` on a promise chain."

---

## 🎤 PART C — Parallel Requests & AbortController (1:15 – 1:50)

**[TYPE:]**
```javascript
// ❌ Sequential — each waits for the previous (slow)
const user    = await fetchUser(id);      // wait 300ms
const courses = await fetchCourses(id);   // wait 200ms — THEN starts
const grades  = await fetchGrades(id);    // wait 400ms — THEN starts
// Total: ~900ms

// ✅ Promise.all — all start simultaneously (fast)
const [user, courses, grades] = await Promise.all([
  fetchUser(id),      // starts
  fetchCourses(id),   // starts simultaneously
  fetchGrades(id),    // starts simultaneously
]);
// Total: ~400ms (the slowest one)
// ⚠️ If ANY promise rejects, the whole Promise.all rejects

// Promise.allSettled — get all results even if some fail
const results = await Promise.allSettled([
  fetch('/api/users'),
  fetch('/api/courses'),
  fetch('/api/broken'),
]);

results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log('Success:', result.value);
  } else {
    console.error('Failed:', result.reason.message);
  }
});

// AbortController — cancel fetch requests
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch('/api/data', { signal: controller.signal });
  clearTimeout(timeoutId);
  const data = await response.json();
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request timed out or was cancelled');
  } else {
    throw error;
  }
}
```

---

## 📅 Class 7 Exercise (1:50 – 2:00) — Setup

**[SAY:]:**
> "Between now and Class 8 your task: build a function `getDashboardData(userId)` that fetches user info, their enrolled courses, and their latest grade — all in parallel using `Promise.all`. Handle network errors. Return a structured object with all three. We will plug this into the Vite dashboard next class."

---

*Deejoft Coding School | JavaScript Class 7*

---
---

# 📋 JavaScript Class 8 — Lesson Plan (Tutor Script)
### ES Modules, localStorage & Vite Tooling
**Duration:** ~2 hours | **Format:** Vite project build

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Homework review: `getDashboardData` |
| 0:10 – 0:40 | ES Modules — import/export, project structure |
| 0:40 – 1:10 | localStorage, sessionStorage |
| 1:10 – 1:50 | Vite project: live data dashboard |
| 1:50 – 2:00 | Final project brief |

---

## 🎤 PART A — ES Modules (0:10 – 0:40)

**[SAY:]:**
> "As code grows, a single file becomes unmaintainable. ES Modules are the official JavaScript system for splitting code across files and explicitly controlling what each file exposes to others. Vite handles the resolution — you just write `import` and `export`."

**[TYPE — create these files together:]**

```javascript
// utils/api.js
const BASE_URL = 'https://api.deejoft.com';

export async function fetchCourses() {
  const response = await fetch(`${BASE_URL}/courses`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export async function fetchUser(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export const PAGE_SIZE = 12;          // Named export
export default fetchCourses;          // Default export (one per file)
```

```javascript
// utils/dom.js
export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

export function createElement(tag, { cls, text, attrs = {} } = {}) {
  const el = document.createElement(tag);
  if (cls)  el.className = cls;
  if (text) el.textContent = text;
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

export function showLoading(container, message = 'Loading...') {
  container.innerHTML = `<p class="loading">${message}</p>`;
}

export function showError(container, message) {
  container.innerHTML = `<p class="error" role="alert">⚠️ ${message}</p>`;
}
```

```javascript
// main.js — the entry point
import { fetchCourses, PAGE_SIZE } from './utils/api.js';
import { $, $$, createElement, showLoading, showError } from './utils/dom.js';

const grid = $('#course-grid');

async function renderCourses(filter = '') {
  showLoading(grid);
  try {
    const courses = await fetchCourses();
    const filtered = courses
      .filter(c => c.title.toLowerCase().includes(filter.toLowerCase()))
      .slice(0, PAGE_SIZE);

    grid.innerHTML = '';
    if (!filtered.length) {
      grid.textContent = 'No courses match your search.';
      return;
    }

    filtered.forEach((course, i) => {
      const card = createElement('article', { cls: 'card' });
      card.style.setProperty('--i', i);   // For CSS stagger animation
      card.innerHTML = `<h3>${course.title}</h3><p>₦${course.price.toLocaleString()}</p>`;
      grid.append(card);
    });

  } catch (error) {
    showError(grid, error.message);
  }
}

// Search with live filter
const searchInput = $('#search');
searchInput.addEventListener('input', () => renderCourses(searchInput.value));

renderCourses();
```

---

## 🎤 PART B — localStorage (0:40 – 1:10)

**[TYPE:]**
```javascript
// localStorage — persists across sessions (survives page close)
// Values must be strings — always JSON.stringify/parse

const PREFS_KEY = 'deejoft_prefs';

function savePrefs(prefs) {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

function loadPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? JSON.parse(raw) : { theme: 'light', lang: 'en' };
  } catch {
    return { theme: 'light', lang: 'en' };   // Fallback if JSON is corrupted
  }
}

// Practical: save last search query
searchInput.addEventListener('input', () => {
  const q = searchInput.value;
  localStorage.setItem('lastSearch', q);
  renderCourses(q);
});

// Restore on page load
const savedSearch = localStorage.getItem('lastSearch') ?? '';
searchInput.value = savedSearch;
renderCourses(savedSearch);
```

---

## 🎤 PART C — Vite Project (1:10 – 1:50)

**[SAY:]:**
> "Vite resolves ES module imports, serves files over a dev server with Hot Module Replacement, and bundles everything for production. It takes two commands."

**[DO with students:]**
```bash
npm create vite@latest js-dashboard -- --template vanilla
cd js-dashboard
npm install
npm run dev    # → http://localhost:5173
```

**[TYPE — create the `.env` file:]**
```
# .env  (NEVER commit this)
VITE_API_KEY=your_api_key_here

# Access in code:
# const key = import.meta.env.VITE_API_KEY
```

**[Build the full dashboard together using the module structure from Part A:]**
- Connect to REST Countries API (`restcountries.com/v3.1/all`)
- Render a searchable, filterable grid of country cards
- Save search term in `localStorage`
- Load/error states handled
- `Promise.all` to fetch countries + some stats endpoint simultaneously

---

## 🔚 Final Project Brief (1:50 – 2:00)

**[SAY:]:**
> "Your JavaScript final project is this dashboard, completed. Requirements: Vite project pushed to GitHub. Modules in separate files. All data fetched async with loading/error states. Live search using `localStorage`. At least one `Promise.all` call. Event delegation on the card grid. A total of 8 or more commits showing progression."

---

## 📎 Tutor Notes — Class 8

**Vite `.env` security:** Anything prefixed `VITE_` is included in the client bundle — it is visible to users. Never put server-side secrets here. For server-side API keys, use a backend. This is a common misunderstanding.

**`import.meta.env` vs `process.env`:** Node uses `process.env`. Vite uses `import.meta.env`. Both work differently and cannot be swapped. If a student has a Node background, flag this immediately.

---

*Deejoft Coding School | JavaScript Class 8*
