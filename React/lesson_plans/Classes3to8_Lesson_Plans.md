# 📋 React Class 3 — Lesson Plan (Tutor Script)
### useState & Event Handling
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap: what makes React re-render? |
| 0:10 – 0:50 | useState — primitives, immutable objects, immutable arrays |
| 0:50 – 1:30 | Event handling, functional updates, derived state |
| 1:30 – 2:00 | Build: interactive task board |

---

## 🎤 PART A — The Re-render Contract (0:10 – 0:25)

**[SAY:]:**
> "React re-renders a component when its state changes or its props change. That is the entire rule. When a component re-renders, React calls the function again and compares the new JSX with the previous. It then applies the minimum DOM changes needed. This is why state is separate from regular variables."

**[DEMONSTRATE the problem:]**
```jsx
// ❌ This does NOT work — React has no idea this changed
function BrokenCounter() {
  let count = 0
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => { count++; console.log(count) }}>+</button>
    </div>
  )
}
// The console shows 1, 2, 3... but the UI never updates
// Because changing a local variable does NOT trigger a re-render

// ✅ useState — React watches this value and re-renders when it changes
function Counter() {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

---

## 🎤 PART B — useState Patterns (0:25 – 1:30)

**[TYPE — three essential patterns:]**

```jsx
import { useState } from 'react'

// Pattern 1: Primitive state
function Counter() {
  const [count, setCount] = useState(0)

  // ✅ Functional update — use when new value depends on previous
  const increment = () => setCount(prev => prev + 1)
  const decrement = () => setCount(prev => prev - 1)
  const reset     = () => setCount(0)    // Direct value — OK when independent of prev

  return (
    <div>
      <button onClick={decrement}>−</button>
      <output>{count}</output>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// Pattern 2: Object state — ALWAYS spread to create new object
function ProfileEditor() {
  const [profile, setProfile] = useState({ name: '', email: '', role: 'student' })

  const updateField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    // NEVER: profile.name = 'new name'  — mutation, React won't re-render
  }

  return (
    <form>
      <input value={profile.name}
        onChange={e => updateField('name', e.target.value)} />
      <input value={profile.email}
        onChange={e => updateField('email', e.target.value)} />
    </form>
  )
}

// Pattern 3: Array state — always produce a new array
function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build project', done: false },
  ])

  // ADD: spread existing + new item
  const addTask = (text) => {
    setTasks(prev => [...prev, { id: Date.now(), text, done: false }])
  }

  // TOGGLE: map returns new array with one item changed
  const toggleTask = (id) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ))
  }

  // DELETE: filter returns new array without the item
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
          <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
          {task.text}
          <button onClick={() => deleteTask(task.id)}>×</button>
        </li>
      ))}
    </ul>
  )
}
```

**[SAY — emphasise the mutation rule:]:**
> "This comes up constantly. Write it on your hand if you need to: never modify state directly. `tasks.push(newTask)` does NOT trigger a re-render. `setTasks([...tasks, newTask])` does. React uses shallow reference comparison to detect changes. If the reference is the same object, React thinks nothing changed, even if the contents were mutated."

---

## 🎤 PART C — Build: Task Board (1:30 – 2:00)

Build a full task board with: add task (text input + button), filter tabs (All / Active / Done), task list with check and delete, task count display.

---

*Deejoft Coding School | React Class 3*

---
---

# 📋 React Class 4 — Lesson Plan (Tutor Script)
### useReducer & Controlled Forms
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:50 | useReducer — when and why |
| 0:50 – 1:30 | Controlled forms with validation |
| 1:30 – 2:00 | Build: enrolment form |

---

## 🎤 PART A — useReducer (0:10 – 0:50)

**[SAY:]:**
> "`useReducer` is `useState` for complex state that has multiple sub-values and multiple ways to change. The pattern: instead of calling different setters for different state changes, you dispatch named actions to a single reducer function. The reducer decides what the new state looks like."

**[TYPE:]**
```jsx
import { useReducer } from 'react'

// The reducer — a pure function: (state, action) => newState
function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { id: crypto.randomUUID(), text: action.payload, done: false }]
      }
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        )
      }
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload)
      }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    default:
      return state
  }
}

const initialState = { tasks: [], filter: 'all' }

function TaskBoard() {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  // Clean action dispatchers — easier to read at call sites
  const addTask    = (text) => dispatch({ type: 'ADD_TASK',    payload: text })
  const toggleTask = (id)   => dispatch({ type: 'TOGGLE_TASK', payload: id })
  const deleteTask = (id)   => dispatch({ type: 'DELETE_TASK', payload: id })
  const setFilter  = (f)    => dispatch({ type: 'SET_FILTER',  payload: f })

  const visible = state.tasks.filter(t => {
    if (state.filter === 'active') return !t.done
    if (state.filter === 'done')   return t.done
    return true
  })

  return ( /* ... render using visible, addTask, toggleTask, deleteTask */ )
}
```

**[SAY — when to choose which:]:**
> "Rule of thumb: `useState` when you have one or two independent pieces of state. `useReducer` when three or more state values always change together in related ways. The task board is a classic `useReducer` case — the task list and the filter are deeply related: changing the filter does not change tasks, but both are always used together."

---

## 🎤 PART B — Controlled Forms with Validation (0:50 – 1:30)

**[TYPE:]**
```jsx
const INITIAL = { name: '', email: '', course: '', message: '' }

function EnrolmentForm() {
  const [form, setForm]     = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())                               e.name    = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email   = 'Valid email required'
    if (!form.course)                                    e.course  = 'Please select a course'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      await submitEnrolment(form)
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') return <SuccessMessage />

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Full Name</label>
        <input id="name" name="name" type="text"
          value={form.name} onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="field-error" role="alert">{errors.name}</p>
        )}
      </div>
      {/* ...similar fields for email, course, message... */}
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting…' : 'Enrol Now'}
      </button>
    </form>
  )
}
```

---

*Deejoft Coding School | React Class 4*

---
---

# 📋 React Class 5 — Lesson Plan (Tutor Script)
### useEffect & Data Fetching
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:55 | useEffect — lifecycle, dependencies, cleanup |
| 0:55 – 1:30 | Data fetching patterns, loading/error states |
| 1:30 – 2:00 | useMemo and useCallback |

---

## 🎤 PART A — useEffect (0:10 – 0:55)

**[SAY:]:**
> "`useEffect` runs side effects after render — things that are not part of the rendering itself: fetching data, subscribing to events, setting up timers, updating the document title. React renders first, then the effect runs. This ordering is deliberate: you never block the render for side effects."

**[TYPE — the three forms:]**
```jsx
import { useState, useEffect } from 'react'

// Form 1: No dependency array — runs after EVERY render (rarely what you want)
useEffect(() => { console.log('Rendered') })

// Form 2: Empty dependency array — runs ONCE after the initial render
useEffect(() => {
  console.log('Mounted — like componentDidMount')
}, [])

// Form 3: With dependencies — runs when specified values change
useEffect(() => {
  console.log('userId changed:', userId)
}, [userId])  // Re-runs when userId changes
```

**[TYPE — the standard fetch pattern:]**
```jsx
function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [status, setStatus]   = useState('loading')
  const [error, setError]     = useState(null)

  useEffect(() => {
    // Cancellation flag — prevents state update after unmount
    let cancelled = false

    async function loadCourses() {
      setStatus('loading')
      try {
        const res = await fetch('/api/courses')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!cancelled) {
          setCourses(data)
          setStatus('success')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setStatus('error')
        }
      }
    }

    loadCourses()
    return () => { cancelled = true }  // Cleanup on unmount
  }, [])   // Empty array = run once on mount

  if (status === 'loading') return <Spinner />
  if (status === 'error')   return <ErrorMessage message={error} />

  return (
    <div className="course-grid">
      {courses.map(c => <CourseCard key={c.id} {...c} />)}
    </div>
  )
}
```

**[SAY — explain the cancellation flag:]:**
> "This is subtle but important. If the component unmounts before the fetch completes — the user navigated away — the callback will still try to call `setCourses` on an unmounted component. The cancellation flag prevents this. Modern alternatives like TanStack Query (which we mention in React Native) handle this automatically."

---

## 🎤 PART B — useMemo & useCallback (0:55 – 1:30)

**[TYPE:]**
```jsx
import { useState, useMemo, useCallback, memo } from 'react'

function FilterableCourseList({ courses }) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('price')

  // useMemo — cache expensive computation
  // Only re-runs when courses, search, or sortBy changes
  const filtered = useMemo(() => {
    return courses
      .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => sortBy === 'price' ? a.price - b.price : a.title.localeCompare(b.title))
  }, [courses, search, sortBy])

  // useCallback — stable function reference
  // Prevents CourseCard from re-rendering when FilterableCourseList re-renders
  const handleEnrol = useCallback((courseId) => {
    console.log('Enrolling in:', courseId)
  }, [])   // No dependencies — never recreated

  return (
    <>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      {filtered.map(c => <CourseCard key={c.id} course={c} onEnrol={handleEnrol} />)}
    </>
  )
}

// memo — skip re-render if props haven't changed
const CourseCard = memo(function CourseCard({ course, onEnrol }) {
  return (
    <article>
      <h3>{course.title}</h3>
      <button onClick={() => onEnrol(course.id)}>Enrol</button>
    </article>
  )
})
```

**[SAY — the golden rule:]:**
> "Do not reach for `useMemo` and `useCallback` by default. They have a cost — the comparison logic runs every render. Use them when you have measured a performance problem, when a child component wrapped in `memo` is re-rendering too often, or when a computation is genuinely expensive. Premature optimisation with these hooks is a common beginner mistake."

---

*Deejoft Coding School | React Class 5*

---
---

# 📋 React Class 6 — Lesson Plan (Tutor Script)
### React Router v7
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:50 | React Router setup, BrowserRouter, Routes, Route |
| 0:50 – 1:30 | NavLink, useParams, useNavigate, protected routes |
| 1:30 – 2:00 | Build: multi-page app with four routes |

---

## 🎤 PART A — Router Setup & Basics (0:10 – 0:50)

```bash
npm install react-router
```

**[TYPE:]**
```jsx
// main.jsx — wrap the whole app in BrowserRouter
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// App.jsx — define your routes
import { Routes, Route, Navigate } from 'react-router'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:slug" element={<CourseDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

// layouts/RootLayout.jsx — shared shell with nav
import { Outlet, NavLink } from 'react-router'

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />   {/* Child route renders here */}
      </main>
      <footer>...</footer>
    </>
  )
}
```

**[SAY for NavLink:]:**
> "`NavLink` automatically adds `class='active'` to the currently active link — no state needed. The `end` prop on the Home link means it is only active when the path is exactly `/`, not when it starts with `/`. Without `end`, the Home link would be active on every page."

---

## 🎤 PART B — Dynamic Routes & Navigation (0:50 – 1:30)

**[TYPE:]**
```jsx
// pages/CourseDetailPage.jsx
import { useParams, useNavigate, Link } from 'react-router'

function CourseDetailPage() {
  const { slug } = useParams()       // Reads :slug from the URL
  const navigate = useNavigate()

  const [course, setCourse] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/courses/${slug}`)
      .then(r => r.json())
      .then(data => { if (!cancelled) setCourse(data) })
    return () => { cancelled = true }
  }, [slug])  // Re-fetch when the slug changes

  if (!course) return <Spinner />

  return (
    <article>
      <Link to="/courses">← Back to Courses</Link>
      <h1>{course.title}</h1>
      <button onClick={() => navigate('/courses', { replace: true })}>
        Back (replace history)
      </button>
      <button onClick={() => navigate(-1)}>
        Go Back
      </button>
    </article>
  )
}
```

**[SAY for `navigate(-1)` vs `navigate('/path')`:]:**
> "`navigate(-1)` is like the browser back button. `navigate('/path')` goes to a specific route. `navigate('/path', { replace: true })` replaces the current history entry — the user cannot press Back to return. Use `replace` after form submissions or login redirects, where you do not want the user going back to the form."

---

## 🎤 PART C — Protected Routes (1:30 – end)

```jsx
// A simple route guard pattern
function ProtectedRoute({ children }) {
  const { user } = useAuth()   // Context hook — we build this in Class 7
  if (!user) return <Navigate to="/login" replace />
  return children
}

// In App.jsx
<Route
  path="dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

---

*Deejoft Coding School | React Class 6*

---
---

# 📋 React Class 7 — Lesson Plan (Tutor Script)
### Context API & Custom Hooks
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:50 | Context — when to use, how to build |
| 0:50 – 1:30 | Custom hooks: useFetch, useLocalStorage, useDebounce |
| 1:30 – 2:00 | Connect everything: app with auth and shared state |

---

## 🎤 PART A — Context API (0:10 – 0:50)

**[SAY:]:**
> "Context solves prop drilling — when data needs to pass through many components that do not use it just to reach one that does. Think: current user, theme, language, notification system. But Context is not a replacement for props — it is a last resort when props genuinely need to be available everywhere."

**[TYPE:]**
```jsx
// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

// Step 1: Create the context
const AuthContext = createContext(null)

// Step 2: Build the Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load saved session on mount
  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) setUser(JSON.parse(saved))
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    // In real app: call your API
    const mockUser = { id: '1', name: 'Ada', email }
    localStorage.setItem('user', JSON.stringify(mockUser))
    setUser(mockUser)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  if (isLoading) return null  // Or a splash screen

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Step 3: Custom hook — never expose useContext directly
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
```

```jsx
// main.jsx — wrap the app
<BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
</BrowserRouter>

// Any component in the tree can now:
const { user, login, logout } = useAuth()
```

---

## 🎤 PART B — Custom Hooks (0:50 – 1:30)

**[SAY:]:**
> "A custom hook is a function whose name starts with `use` and which calls other hooks. They extract stateful logic so you can reuse it across components without duplicating the state management code."

**[TYPE:]**
```jsx
// hooks/useFetch.js
export function useFetch(url) {
  const [data, setData]     = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError]   = useState(null)

  useEffect(() => {
    if (!url) return
    let cancelled = false
    setStatus('loading')

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(d => { if (!cancelled) { setData(d); setStatus('success') } })
      .catch(e => { if (!cancelled) { setError(e.message); setStatus('error') } })

    return () => { cancelled = true }
  }, [url])

  return { data, status, error, isLoading: status === 'loading' }
}

// Usage — same fetch logic, zero duplication
function CoursesPage() {
  const { data: courses, isLoading, error } = useFetch('/api/courses')
  if (isLoading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  return courses.map(c => <CourseCard key={c.id} {...c} />)
}
```

```jsx
// hooks/useLocalStorage.js
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch { return initialValue }
  })

  const set = (newValue) => {
    const v = typeof newValue === 'function' ? newValue(value) : newValue
    setValue(v)
    localStorage.setItem(key, JSON.stringify(v))
  }

  return [value, set]
}

// hooks/useDebounce.js
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

// Usage
function SearchPage() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)
  const { data } = useFetch(debouncedQuery ? `/api/search?q=${debouncedQuery}` : null)
  // Only fetches after the user pauses typing for 400ms
}
```

---

*Deejoft Coding School | React Class 7*

---
---

# 📋 React Class 8 — Lesson Plan (Tutor Script)
### React 19 APIs & Deployment
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:50 | React 19: useActionState, useOptimistic, use() |
| 0:50 – 1:20 | Capstone project review + refactor |
| 1:20 – 1:50 | Deploy to Vercel |
| 1:50 – 2:00 | Course wrap-up |

---

## 🎤 PART A — React 19 APIs (0:10 – 0:50)

**[SAY:]:**
> "React 19 changed how we handle async form state. Instead of manually managing `isLoading`, `error`, and calling `e.preventDefault()`, we can use the `useActionState` hook which wraps the entire async flow."

**[TYPE:]**
```jsx
// useActionState — the modern way to handle form submission
import { useActionState } from 'react'

async function contactAction(prevState, formData) {
  const name    = formData.get('name')
  const email   = formData.get('email')
  const message = formData.get('message')

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
    if (!res.ok) throw new Error('Failed to send')
    return { status: 'success', message: `Thanks, ${name}! We'll be in touch.` }
  } catch {
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }
}

function ContactForm() {
  const [state, formAction, isPending] = useActionState(contactAction, null)

  return (
    <form action={formAction}>
      <input name="name" type="text" required />
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Sending…' : 'Send Message'}
      </button>
      {state?.status === 'success' && <p className="success">{state.message}</p>}
      {state?.status === 'error'   && <p className="error">{state.message}</p>}
    </form>
  )
}
```

**[TYPE:]**
```jsx
// useOptimistic — show UI change immediately, roll back if server fails
import { useOptimistic } from 'react'

function LikeButton({ post }) {
  const [optimisticPost, addOptimisticLike] = useOptimistic(
    post,
    (state) => ({ ...state, likeCount: state.likeCount + 1, liked: true })
  )

  const handleLike = async () => {
    addOptimisticLike()          // ← UI updates IMMEDIATELY
    await likePost(post.id)      // ← Request happens in background
    // If it fails, React auto-reverts to the real state
  }

  return (
    <button onClick={handleLike} aria-pressed={optimisticPost.liked}>
      ♥ {optimisticPost.likeCount}
    </button>
  )
}

// use() — read a Promise or Context during render
import { use, Suspense } from 'react'

function CourseList({ coursesPromise }) {
  const courses = use(coursesPromise)   // Suspends until resolved
  return courses.map(c => <CourseCard key={c.id} {...c} />)
}

function CoursesPage() {
  const [promise] = useState(() => fetch('/api/courses').then(r => r.json()))
  return (
    <Suspense fallback={<Spinner />}>
      <CourseList coursesPromise={promise} />
    </Suspense>
  )
}
```

---

## 🎤 PART B — Deploy to Vercel (1:20 – 1:50)

**[DO with students:]**
```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel login
vercel   # Answer the project questions, then deployed!

# Option 2: GitHub Integration (recommended)
# 1. Push project to GitHub
git push origin main
# 2. Go to vercel.com → New Project → Import Git Repository
# 3. Select the repo → Framework detected as Vite → Deploy
# From now on, every push to main auto-deploys
```

**[SAY:]:**
> "The GitHub integration is what professionals use. Push to `main`, Vercel builds and deploys automatically. You get a preview URL for every pull request. Your project is now live at `your-project.vercel.app`. Share that URL — this is a real deployment."

---

## 🔚 Course Wrap-Up (1:50 – 2:00)

**[SAY:]:**
> "You have built a React application that is live on the internet. Components, props, state, effects, routing, context, custom hooks, and the newest React 19 APIs. The next course — React Native — takes everything you just learned and moves it to iOS and Android. Same mental model, different rendering target."

---

## 📎 Tutor Notes — Class 8

**useActionState availability:** Requires React 19. Verify `react` version in `package.json` is `^19.0.0`. If students have an older version from `npm create vite`, run `npm install react@latest react-dom@latest`.

**Vercel common issue:** Build fails because `process.env` is used instead of `import.meta.env` for environment variables. Vite does not expose `process.env` by default.

---

*Deejoft Coding School | React Classes 3–8*
