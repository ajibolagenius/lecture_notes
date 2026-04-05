# 📋 React Class 1 — Lesson Plan (Tutor Script)
### Environment, JSX & Your First Components
**Duration:** ~2 hours | **Format:** Scaffold together, then build

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:20 | What React is and why — the paradigm shift |
| 0:20 – 0:45 | Scaffold with Vite, project tour |
| 0:45 – 1:20 | JSX rules and differences from HTML |
| 1:20 – 1:55 | Writing the first three components |
| 1:55 – 2:00 | Homework brief |

---

## 🛠 Setup (Do Before Students Arrive)
- Node.js v20+ verified (`node --version`)
- A blank terminal, no project open
- The HTML portfolio page available — we will reference it for component ideas
- `react.dev` open in a browser tab

---

## 🎤 PART A — The Paradigm Shift (0:00 – 0:20)

### What Problem Does React Solve? (10 min)

**[SAY:]:**
> "In the JavaScript course, you built the portfolio interaction layer manually: `document.querySelector`, `addEventListener`, `createElement`, `appendChild`. It worked. But imagine scaling that to a real app — a shopping cart that updates dozens of places when you add an item, or a social feed where any action can affect multiple parts of the UI. Manual DOM manipulation becomes unmaintainable."

**[WRITE ON BOARD:]**
```
Manual DOM:
  "Here is how to update the DOM step by step."
  → You manage every change. Complex. Error-prone at scale.

React:
  "Here is what the UI should look like for this data."
  → React figures out the minimum DOM changes needed. You describe. React executes.
```

**[SAY:]:**
> "React introduces two ideas that change everything. First: `UI = f(state)`. The UI is a function of the state. Change the state, React re-renders the relevant parts. You never touch the DOM directly. Second: components. Every piece of the UI is a JavaScript function that returns JSX. A button. A card. A page. All functions."

---

### The Mental Model (10 min)

**[SAY:]:**
> "The shift from JavaScript DOM manipulation to React is the biggest mental shift in the whole course. Let me draw it."

**[DRAW on board:]**
```
VANILLA JS MENTAL MODEL (imperative):
User clicks → You find the element → You change its content → You find related elements → You update those too

REACT MENTAL MODEL (declarative):
User clicks → State changes → React compares new state to old state → React updates ONLY what changed
```

**[SAY:]:**
> "You never say 'change the cart count to 3'. You say 'the cart now has 3 items' and React figures out everything that needs to change to show that correctly. Once this clicks, React becomes the most natural way to build UI."

**[WRITE the 5 rules on the board — keep visible ALL class:]**
```
1.  UI = f(state)           — describe what to show, not how to update
2.  Data flows DOWN         — props pass data from parent to child only
3.  Events flow UP          — callbacks let children notify parents
4.  Never mutate state      — always create a new value for the setter
5.  Keys identify items     — stable unique keys on list items, always
```

---

## 🎤 PART B — Scaffold with Vite (0:20 – 0:45)

**[SAY:]:**
> "Vite is the tool we used at the end of the JavaScript course. Now we use its React template."

**[DO — with students following along:]**
```bash
npm create vite@latest deejoft-react -- --template react
cd deejoft-react
npm install
npm run dev
```

**[SAY:]:**
> "Open `localhost:5173`. You are looking at a running React application. Let me show you where everything lives."

**[WALK THROUGH the project structure, pointing at each:]**

```
deejoft-react/
├── src/
│   ├── App.jsx           ← Root component — everything renders from here
│   ├── App.css           ← Global styles (we will replace with our token system)
│   ├── main.jsx          ← Entry point — renders <App /> into index.html
│   └── index.css         ← Reset + global tokens
├── public/               ← Static assets (favicon, images)
├── index.html            ← The one HTML file — React mounts into #root
└── vite.config.js
```

**[OPEN `main.jsx` and read it together:]**
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**[SAY:]:**
> "`createRoot` takes the `#root` div from `index.html` and hands control to React. From this moment on, everything inside that div is managed by React — not by raw DOM operations. `StrictMode` is a development tool that runs your components twice to catch side effect bugs. It only runs in dev mode — not in production."

**[CLEAN UP the default App.jsx together:]**
```jsx
// Replace App.jsx with this minimal version
function App() {
  return (
    <main>
      <h1>Deejoft Courses</h1>
    </main>
  )
}

export default App
```

**[SHOW the page update live via HMR — no page refresh needed.]**

---

## 🎤 PART C — JSX Rules (0:45 – 1:20)

**[SAY:]:**
> "JSX looks like HTML but it is not HTML. It compiles to JavaScript function calls. Let me show you what I mean and explain every difference."

**[TYPE this in the file, then show what it compiles to:]**
```jsx
// What you write:
const element = <h1 className="title">Hello, {name}</h1>

// What Babel compiles it to:
const element = React.createElement('h1', { className: 'title' }, `Hello, ${name}`)
```

**[SAY:]:**
> "Every JSX element is a function call. `createElement` takes three arguments: the element type, an object of props, and the children. This explains every JSX rule — they are all consequences of it being JavaScript."

### JSX Rules — One by One (25 min)

**[TYPE each rule — let students try to break it and see the error message:]**

```jsx
// Rule 1: One root element (or Fragment)
// ❌ Two siblings — no wrapper
function Bad() {
  return (
    <h1>Title</h1>
    <p>Body</p>   // SyntaxError
  )
}

// ✅ Fragment — no extra DOM node rendered
function Good() {
  return (
    <>
      <h1>Title</h1>
      <p>Body</p>
    </>
  )
}

// Rule 2: className, not class
<div className="card">...</div>   // ✅
<div class="card">...</div>       // Warning — class is a JS reserved word

// Rule 3: htmlFor, not for
<label htmlFor="email">Email</label>  // ✅

// Rule 4: camelCase event handlers
<button onClick={handleClick}>Click</button>   // ✅
<input onChange={handleChange} />
<form onSubmit={handleSubmit}>

// Rule 5: JavaScript expressions in {}
const name = 'Ada';
const score = 94.5;
<p>{name}</p>                               // Variable
<p>{2 + 2}</p>                              // Expression
<p>{score >= 50 ? 'Pass' : 'Fail'}</p>     // Ternary
<p>{score.toFixed(1)}</p>                   // Method call

// Rule 6: All tags must be self-closed
<input type="text" />    // ✅
<br />                   // ✅
<img src="..." alt="..." />   // ✅

// Rule 7: Inline styles are objects with camelCase properties
<p style={{ fontSize: '1.25rem', color: '#1a1a2e', marginBottom: '8px' }}>...</p>
//      ↑ outer {} = JSX expression, inner {} = JS object

// Rule 8: Conditional rendering
const isLoggedIn = true;
{isLoggedIn && <UserMenu />}           // Render if true
{isLoggedIn ? <UserMenu /> : <Login />}  // Either/or
{!isLoggedIn && null}                  // Explicitly nothing — null renders nothing
```

**[KEY POINT — Say this emphatically:]:**
> "JSX inside `{}` is an expression — a single value. You cannot put an `if` statement inside `{}`. You can put a ternary (which is an expression). You can put `&&`. For complex logic, move it above the `return` and use a variable."

---

## 🎤 PART D — First Three Components (1:20 – 1:55)

**[SAY:]:**
> "Let's build three components. By the end of this you will have the Portfolio page structure in React. I want you to notice: the structure is the same as your HTML page. React components are just reusable pieces of that structure — functions that return JSX."

**[CREATE `src/components/` folder. Build each component together:]**

```jsx
// src/components/Badge.jsx
function Badge({ children, variant = 'default' }) {
  const styles = {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: variant === 'new' ? '#e94560' : '#e2e2e8',
    color: variant === 'new' ? 'white' : '#555',
  }
  return <span style={styles}>{children}</span>
}

export default Badge
```

**[SHOW usage:]**
```jsx
<Badge>Beginner</Badge>
<Badge variant="new">New</Badge>
```

**[SAY:]:**
> "Notice `children` — a special prop that receives whatever you put between the component's opening and closing tags. `variant` is a regular prop with a default value."

```jsx
// src/components/CourseCard.jsx
import Badge from './Badge'

function CourseCard({ title, duration, price, level, isNew = false }) {
  return (
    <article className="card">
      <div className="card__header">
        <h3 className="card__title">{title}</h3>
        {isNew && <Badge variant="new">New</Badge>}
      </div>

      <dl className="card__meta">
        <dt>Duration</dt> <dd>{duration}</dd>
        <dt>Level</dt>    <dd><Badge>{level}</Badge></dd>
        <dt>Price</dt>    <dd>₦{price.toLocaleString()}</dd>
      </dl>

      <a
        href={`/courses/${title.toLowerCase().replace(/ /g, '-')}`}
        className="btn btn--primary"
      >
        View Course
      </a>
    </article>
  )
}

export default CourseCard
```

```jsx
// src/App.jsx
import CourseCard from './components/CourseCard'

const courses = [
  { id: 1, title: 'HTML & CSS',   duration: '2 Weeks', price: 49999, level: 'Beginner'     },
  { id: 2, title: 'JavaScript',   duration: '4 Weeks', price: 79999, level: 'Beginner'     },
  { id: 3, title: 'React',        duration: '4 Weeks', price: 89999, level: 'Intermediate', isNew: true },
]

function App() {
  return (
    <main className="container">
      <h1>Our Courses</h1>
      <div className="course-grid">
        {courses.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </main>
  )
}

export default App
```

**[SAY for the `key` prop:]:**
> "React needs to uniquely identify each item in a list to know what changed, what moved, and what was removed. `key` is that identifier. It must be stable and unique among siblings — an `id` from your data, a URL slug, anything that will not change. Never use the array index as a key if items can be reordered or deleted — it causes bugs."

**[SAY for `{...course}`:]:**
> "Spread props: `{...course}` is equivalent to writing `title={course.title} duration={course.duration} price={course.price} ...` for every property. It is a shorthand — use it when the object shape matches the component's props. Be careful: it passes ALL properties, even ones the component does not expect."

---

## 🔚 Homework (Last 5 min)

**[SAY:]:**
> "Before next class, build two more components: an `Avatar` component that takes `src` and `name` props (renders an image with alt text), and a `StatCard` that takes `label` and `value` props. Both should be in `src/components/`. Add them to `App.jsx` and verify they render correctly."

---

## 📎 Tutor Notes

**JSX common errors today:**
- Opening browser to `localhost:3000` instead of `5173` — Vite uses 5173
- Forgetting the closing `/>` on void elements — the JSX linter catches this
- Writing `{if (x) ...}` inside JSX — explain that JSX only accepts expressions
- `key` on the wrong element — it goes on the outermost element returned from `.map()`, not on a child inside it

**If a student asks about class components:** Tell them class components are legacy. You will not be writing any. All React code written since 2019 (and all code they will write professionally) uses functional components and hooks.
