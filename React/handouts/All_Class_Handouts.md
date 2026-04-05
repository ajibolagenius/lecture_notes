# 📄 React Class 1 — Student Handout
### Environment, JSX & First Components
**Deejoft Coding School**

---

## A. The React Mental Model

```
VANILLA JS (imperative)    REACT (declarative)
"Here is HOW to update."   "Here is WHAT it should look like."
You manage every DOM step. React computes the minimum DOM changes.

UI = f(state)
The UI is a pure function of state. Change state → React re-renders.
```

**5 Rules — keep visible all course:**
```
1. UI = f(state)           — describe WHAT, not HOW
2. Data flows DOWN         — props: parent → child only
3. Events flow UP          — callbacks: child notifies parent
4. Never mutate state      — always create a new value
5. Keys identify items     — stable + unique on all list elements
```

---

## B. JSX Rules vs HTML

```jsx
// JSX compiles to React.createElement() — it is JavaScript, not HTML

// 1. One root element (or Fragment)
return (                   // ✅
  <>
    <h1>Title</h1>
    <p>Body</p>
  </>
)

// 2. className, not class
<div className="card">     // ✅
<div class="card">         // ❌ 'class' is a JS reserved word

// 3. htmlFor, not for
<label htmlFor="email">    // ✅

// 4. camelCase events
<button onClick={fn}>      // ✅  (not onclick)
<input onChange={fn} />

// 5. Expressions in {}
<p>{name}</p>              // Variable
<p>{2 + 2}</p>             // Expression
<p>{x > 0 ? 'Yes' : 'No'}</p>  // Ternary — OK
<p>{if (x) ...}</p>        // ❌ if is a statement, not expression

// 6. Self-close void elements
<input type="text" />      // ✅  (not <input>)
<br />  <img src="" alt="" />

// 7. Inline styles = JS object with camelCase
<p style={{ fontSize: '1rem', marginBottom: '8px' }}>
```

> ✏️ **Fill in:** What does JSX compile to? `<h1>Hello</h1>` →
>
> `React.___________('h1', ____, 'Hello')`

---

## C. Component Structure

```jsx
// A component is a function that returns JSX.
// PascalCase name REQUIRED — how React tells your component from a <div>

import Badge from './Badge'      // Default import

function CourseCard({ title, price, level, isNew = false }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      {isNew && <Badge variant="new">New</Badge>}
      <p>₦{price.toLocaleString()}</p>
    </article>
  )
}

export default CourseCard        // Default export

// Usage:
<CourseCard title="React" price={89999} level="Intermediate" isNew />
// isNew alone = isNew={true}
```

---

## D. Rendering Lists

```jsx
// Always use .map() — always provide a key
const courses = [{ id: 1, title: 'HTML' }, { id: 2, title: 'JS' }]

courses.map(course => (
  <CourseCard key={course.id} {...course} />
))

// key rules:
// ✅ Stable, unique among siblings (id from data, URL slug)
// ❌ Never the array index (if items can be reordered or deleted)
// Goes on the outermost element returned from .map()
```

---

## ⚡ Class 1 Quick Reference

| Concept | Rule |
|---------|------|
| Component name | Always PascalCase |
| `class` attribute | Use `className` in JSX |
| `for` attribute | Use `htmlFor` in JSX |
| Boolean prop | `<Comp disabled />` = `disabled={true}` |
| Spread props | `{...obj}` passes all object keys as props |
| `key` | Required on all list items — use data id |
| Fragment | `<>...</>` — no extra DOM node |
| Default export | One per file, imported without `{}` |
| Named export | Multiple per file, imported with `{}` |

---

*Deejoft Coding School | React Class 1 | Bring to Class 2*

---
---

# 📄 React Class 2 — Student Handout
### Props, Composition & Component Trees
**Deejoft Coding School**

---

## A. Props Reference

```jsx
// Props are READ-ONLY. Never modify them.
// Derive new values from props — never mutate them.

function Component({
  // Primitives
  title,          // string
  count = 0,      // number with default
  isActive,       // boolean

  // Functions (callbacks)
  onClick,        // () => void
  onChange,       // (value) => void

  // React elements
  icon,           // <SvgIcon />
  children,       // Everything between opening and closing tags

  // With default
  variant = 'default',
}) { ... }
```

---

## B. The `children` Prop — Composition Pattern

```jsx
// Card is a flexible container, not a controller
function Card({ children, className = '' }) {
  return <article className={`card ${className}`}>{children}</article>
}

// Parent decides what goes inside
<Card className="card--featured">
  <h2>React 19</h2>
  <p>Learn the latest React features.</p>
  <Badge variant="new">New</Badge>
</Card>
```

> ✏️ **Fill in:** What does React render if `children` is `undefined`?
>
> ___________________________________________________________________

---

## C. Component Tree Decomposition

**Process:**
1. Draw boxes around UI regions
2. Name each with a noun
3. Identify what data each needs (props)
4. Find repeated elements (parameterise them)
5. Identify who owns the data (nearest common ancestor)

---

## D. Common Pitfall: Calling vs Passing Functions

```jsx
// ❌ Calls immediately on render — not on click
<button onClick={handleClick()}>Click</button>

// ✅ Passes the function — called only on click
<button onClick={handleClick}>Click</button>

// ✅ Arrow wrapper — when you need to pass arguments
<button onClick={() => handleDelete(item.id)}>Delete</button>
```

---

## ⚡ Class 2 Quick Reference

| Pattern | Code |
|---------|------|
| `children` prop | `function Card({ children }) { return <div>{children}</div> }` |
| Conditional render | `{condition && <Element />}` |
| Either/or render | `{a ? <A /> : <B />}` |
| Pass callback | `<Child onAction={handleAction} />` |
| Call with args | `onClick={() => doThing(arg)}` |
| Never call on render | `onClick={fn}` not `onClick={fn()}` |

---

*Deejoft Coding School | React Class 2 | Bring to Class 3*

---
---

# 📄 React Class 3 — Student Handout
### useState & Event Handling
**Deejoft Coding School**

---

## A. useState

```jsx
import { useState } from 'react'

const [value, setValue] = useState(initialValue)
// value    — the current state
// setValue — function to update state (triggers re-render)
// initialValue — evaluated ONCE, on first render only

// ✅ Functional update — use when new value depends on previous
setCount(prev => prev + 1)

// ✅ Direct value — use when independent of previous
setCount(0)
```

---

## B. The Immutable Update Patterns (Memorise These)

```jsx
// Object — spread to create new
const updateField = (field, val) =>
  setState(prev => ({ ...prev, [field]: val }))

// Array ADD — spread + new item
setItems(prev => [...prev, newItem])

// Array TOGGLE — map returns new array
setItems(prev => prev.map(i =>
  i.id === id ? { ...i, done: !i.done } : i
))

// Array DELETE — filter returns new array
setItems(prev => prev.filter(i => i.id !== id))

// ❌ NEVER do this — mutation, React won't re-render
state.name = 'new'
items.push(newItem)
```

> ✏️ **Fill in:** Why does `items.push(newItem)` not trigger a re-render?
>
> ___________________________________________________________________

---

## C. Multiple State Values

```jsx
// Related data — one object (use update helper)
const [form, setForm] = useState({ name: '', email: '' })
const update = (field, val) => setForm(p => ({ ...p, [field]: val }))

// Independent data — separate state variables
const [count, setCount]     = useState(0)
const [isOpen, setIsOpen]   = useState(false)
const [error, setError]     = useState(null)
```

---

## ⚡ Class 3 Quick Reference

| Task | Pattern |
|------|---------|
| Increment | `setState(prev => prev + 1)` |
| Reset | `setState(initialValue)` |
| Update object field | `setState(prev => ({ ...prev, key: val }))` |
| Add to array | `setState(prev => [...prev, item])` |
| Toggle item | `.map(i => i.id===id ? {...i, done:!i.done} : i)` |
| Remove item | `.filter(i => i.id !== id)` |

---

*Deejoft Coding School | React Class 3 | Bring to Class 4*

---
---

# 📄 React Class 4 — Student Handout
### useReducer & Controlled Forms
**Deejoft Coding School**

---

## A. useReducer

```jsx
// reducer: (currentState, action) => newState
// Always returns a NEW state — never mutates

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, items: [...state.items, action.payload] }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    default:
      return state  // Always have a default
  }
}

const [state, dispatch] = useReducer(reducer, { items: [] })

// Dispatch an action
dispatch({ type: 'ADD', payload: { id: 1, text: 'Learn React' } })
dispatch({ type: 'REMOVE', payload: 1 })
```

**useState vs useReducer:**

| Use `useState` when | Use `useReducer` when |
|---------------------|----------------------|
| 1–2 independent values | 3+ related state values |
| Simple set/reset | Multiple ways to update |
| No related transitions | State changes are named actions |

---

## B. Controlled Form Pattern

```jsx
const [form, setForm] = useState({ name: '', email: '' })
const [errors, setErrors] = useState({})

// One handler for all inputs — uses the input's name attribute
const handleChange = (e) => {
  const { name, value } = e.target
  setForm(prev => ({ ...prev, [name]: value }))
  if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
}

// Input wired to state
<input
  id="name"
  name="name"          // ← must match the state key
  value={form.name}    // ← controlled: value always comes from state
  onChange={handleChange}
  aria-invalid={!!errors.name}
/>
{errors.name && <p role="alert">{errors.name}</p>}
```

> ✏️ **Fill in:** An input is "controlled" when its `value` prop is set to a __________ value.

---

## ⚡ Class 4 Quick Reference

| Concept | Code |
|---------|------|
| Dispatch action | `dispatch({ type: 'ACTION', payload: data })` |
| Reducer signature | `(state, action) => newState` |
| Controlled input | `value={state.field} onChange={handleChange}` |
| Read input name | `const { name, value } = e.target` |
| Show error | `{error && <p role="alert">{error}</p>}` |
| Disable on submit | `<button disabled={isPending}>` |

---

*Deejoft Coding School | React Class 4 | Bring to Class 5*

---
---

# 📄 React Class 5 — Student Handout
### useEffect & Data Fetching
**Deejoft Coding School**

---

## A. useEffect

```jsx
// Runs AFTER render — never blocks it

// Once on mount
useEffect(() => { ... }, [])

// When dependency changes
useEffect(() => { ... }, [userId])

// Every render (rarely correct)
useEffect(() => { ... })

// With cleanup
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)   // ← cleanup runs before next effect or on unmount
}, [])
```

---

## B. Data Fetching Template

```jsx
function DataPage() {
  const [data, setData]     = useState(null)
  const [status, setStatus] = useState('loading')  // loading | success | error
  const [error, setError]   = useState(null)

  useEffect(() => {
    let cancelled = false       // ← prevents state update after unmount

    async function load() {
      setStatus('loading')
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!cancelled) { setData(json); setStatus('success') }
      } catch (err) {
        if (!cancelled) { setError(err.message); setStatus('error') }
      }
    }

    load()
    return () => { cancelled = true }
  }, [url])   // ← re-fetch when url changes

  if (status === 'loading') return <Spinner />
  if (status === 'error')   return <Error message={error} />
  return <Content data={data} />
}
```

---

## C. useMemo & useCallback

```jsx
// useMemo — cache expensive computed value
const filtered = useMemo(
  () => items.filter(i => i.name.includes(q)),
  [items, q]  // only recalculate when these change
)

// useCallback — stable function reference for memo'd children
const handleClick = useCallback(
  (id) => doThing(id),
  []  // no dependencies = same function every render
)

// memo — skip render if props unchanged
const Card = memo(function Card({ data, onClick }) { ... })
```

> ⚠️ Don't add `useMemo`/`useCallback` by default. Profile first. They have overhead.

---

## ⚡ Class 5 Quick Reference

| Hook | When to use |
|------|-------------|
| `useEffect(fn, [])` | Fetch on mount, set up subscriptions |
| `useEffect(fn, [x])` | Re-run when `x` changes |
| `useMemo(fn, deps)` | Cache expensive computation |
| `useCallback(fn, deps)` | Stable function for `memo`'d children |
| `memo(Component)` | Skip re-render if props unchanged |

---

*Deejoft Coding School | React Class 5 | Bring to Class 6*

---
---

# 📄 React Class 6 — Student Handout
### React Router v7
**Deejoft Coding School**

---

## A. Router Setup

```jsx
// main.jsx
<BrowserRouter>
  <App />
</BrowserRouter>

// App.jsx
<Routes>
  <Route element={<RootLayout />}>     {/* Shared shell */}
    <Route index element={<Home />} />              {/* path: "/" */}
    <Route path="courses" element={<Courses />} />  {/* path: "/courses" */}
    <Route path="courses/:slug" element={<Detail />} /> {/* dynamic */}
    <Route path="*" element={<NotFound />} />        {/* 404 */}
  </Route>
</Routes>

// Layout — where child routes render
import { Outlet } from 'react-router'
function RootLayout() {
  return (
    <>
      <SiteHeader />
      <main><Outlet /></main>   {/* ← child route renders here */}
      <SiteFooter />
    </>
  )
}
```

---

## B. Navigation

```jsx
import { NavLink, Link, useNavigate, useParams } from 'react-router'

// NavLink — adds class="active" on current route
<NavLink to="/" end>Home</NavLink>        // end: only active on exact "/"
<NavLink to="/courses">Courses</NavLink>

// Link — no active class
<Link to="/courses/react">React Course</Link>

// useParams — read URL parameters
const { slug } = useParams()   // Reads :slug from the URL

// useNavigate — programmatic navigation
const navigate = useNavigate()
navigate('/courses')                       // Go to route
navigate('/login', { replace: true })      // Replace history (no back button)
navigate(-1)                               // Browser back
```

---

## ⚡ Class 6 Quick Reference

| Concept | Code |
|---------|------|
| Dynamic segment | `path="item/:id"` |
| Read param | `const { id } = useParams()` |
| Active nav link | `<NavLink to="/path">` |
| Shared layout | `<Route element={<Layout />}>` + `<Outlet />` |
| Redirect | `<Navigate to="/login" replace />` |
| Protected route | Check auth in component, `<Navigate>` if not logged in |

---

*Deejoft Coding School | React Class 6 | Bring to Class 7*

---
---

# 📄 React Class 7 — Student Handout
### Context API & Custom Hooks
**Deejoft Coding School**

---

## A. Context — When to Use

**Use for:** current user, theme, language, notification system — data that many components across the tree need.

**Do NOT use for:** state that only 2–3 nearby components share (lift state instead).

```jsx
// 1. Create
const MyContext = createContext(null)

// 2. Provide
<MyContext.Provider value={{ data, doThing }}>
  {children}
</MyContext.Provider>

// 3. Consume — via custom hook (never expose useContext directly)
export function useMyContext() {
  const ctx = useContext(MyContext)
  if (!ctx) throw new Error('Used outside provider')
  return ctx
}

// 4. Use anywhere in the tree
const { data, doThing } = useMyContext()
```

---

## B. Custom Hooks Rules

```jsx
// A custom hook:
// - Function name starts with 'use'
// - Can call other hooks (useState, useEffect, etc.)
// - Extracts reusable stateful logic

// Template
export function useMyHook(param) {
  const [state, setState] = useState(initialValue)
  useEffect(() => { /* side effect */ }, [param])
  return { state, doThing: () => setState(newVal) }
}
```

---

## C. Custom Hooks Reference

```jsx
// useFetch — encapsulates fetch + loading + error
const { data, isLoading, error } = useFetch('/api/courses')

// useLocalStorage — useState that syncs to localStorage
const [prefs, setPrefs] = useLocalStorage('prefs', { theme: 'light' })

// useDebounce — delays state update until user stops typing
const debounced = useDebounce(searchQuery, 400)
// Use debounced in your useEffect/useFetch dependency
```

---

## ⚡ Class 7 Quick Reference

| Concept | Key rule |
|---------|----------|
| Context use case | Global data — user, theme, language |
| Context not for | Data shared by 2–3 nearby components |
| Custom hook naming | Must start with `use` |
| Custom hook can | Call useState, useEffect, other hooks |
| Never expose | `useContext(MyCtx)` directly — wrap in a custom hook |
| Provider location | As high as needed, no higher |

---

*Deejoft Coding School | React Class 7 | Bring to Class 8*

---
---

# 📄 React Class 8 — Student Handout
### React 19, Deployment & Course Wrap-Up
**Deejoft Coding School** | Includes the full React Quick Reference.

---

## A. React 19 — useActionState

```jsx
// useActionState — handles async form state automatically
import { useActionState } from 'react'

async function myAction(prevState, formData) {
  const name = formData.get('name')
  // ... do async work ...
  return { status: 'success', message: `Done, ${name}!` }
  // or: return { status: 'error', message: 'Failed.' }
}

function MyForm() {
  const [state, formAction, isPending] = useActionState(myAction, null)

  return (
    <form action={formAction}>
      <input name="name" required />
      <button disabled={isPending}>
        {isPending ? 'Working…' : 'Submit'}
      </button>
      {state?.status === 'success' && <p>{state.message}</p>}
    </form>
  )
}
```

---

## B. useOptimistic & use()

```jsx
// useOptimistic — optimistic UI update
const [optimisticItem, addOptimistic] = useOptimistic(
  item,
  (current) => ({ ...current, liked: true })
)
// addOptimistic() → UI updates immediately
// If async request fails → React auto-reverts

// use() — read a Promise during render (requires Suspense)
function List({ dataPromise }) {
  const items = use(dataPromise)   // Suspends until resolved
  return items.map(i => <Item key={i.id} {...i} />)
}
<Suspense fallback={<Spinner />}>
  <List dataPromise={fetchedPromise} />
</Suspense>
```

---

## C. Deploy to Vercel

```bash
# CLI
npm i -g vercel && vercel login && vercel

# GitHub (recommended)
# Push to GitHub → vercel.com → Import repo → Deploy
# Every push to main = automatic redeployment
```

---

## ⚡ React Master Quick Reference

### Hooks
| Hook | Purpose |
|------|---------|
| `useState(init)` | Local component state |
| `useReducer(fn, init)` | Complex state with named actions |
| `useEffect(fn, deps)` | Side effects after render |
| `useMemo(fn, deps)` | Cache computed value |
| `useCallback(fn, deps)` | Stable function reference |
| `useContext(Ctx)` | Read context value (wrap in custom hook) |
| `useRef(init)` | Mutable ref, DOM refs |
| `useActionState(fn, init)` | Async form state (React 19) |
| `useOptimistic(val, fn)` | Optimistic UI (React 19) |
| `use(promise)` | Read promise/context in render (React 19) |

### State Patterns
| Operation | Immutable pattern |
|-----------|-------------------|
| Update object field | `{ ...prev, key: val }` |
| Add to array | `[...prev, item]` |
| Update array item | `prev.map(i => i.id===id ? {...i, change} : i)` |
| Remove array item | `prev.filter(i => i.id !== id)` |

### Props
| Concept | Rule |
|---------|------|
| Read-only | Never modify props |
| Default values | `function Comp({ x = 'default' })` |
| Boolean shorthand | `<Comp isActive />` = `isActive={true}` |
| children | Everything between opening/closing tags |
| Spread | `<Comp {...obj} />` passes all keys as props |

### Routing
| Task | Code |
|------|------|
| Navigate | `useNavigate()` → `navigate('/path')` |
| Read param | `useParams()` → `const { id } = useParams()` |
| Active link | `<NavLink to="/path">` |
| Shared layout | `<Outlet />` in layout component |
| Redirect | `<Navigate to="/path" replace />` |

### Context
| Step | Code |
|------|------|
| Create | `const Ctx = createContext(null)` |
| Provide | `<Ctx.Provider value={...}>` |
| Consume | `useContext(Ctx)` inside custom hook |

---

*Deejoft Coding School | React Class 8 | Full React reference — keep permanently*
