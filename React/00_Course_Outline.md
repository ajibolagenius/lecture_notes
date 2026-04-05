# ⚛️ React — Tutor's Master Outline
### Deejoft Coding School | Web Development Track
**Duration:** 4 Weeks · 8 Classes · ~2 hours per class
**Level:** Intermediate (requires JS completion)

---

> **Dear Tutor,**
> React 19 is a significant release. Actions, the `use()` hook, and Server Components change how we think about async state, form handling, and data loading. Teach these as first-class concepts, not advanced topics. Students who learn the modern patterns from the start write cleaner, more maintainable apps than those who learn the old patterns and have to unlearn them.
>
> This course is **100% functional components**. Zero class components. All hooks. All modern. The toolchain is **Vite** (not Create React App, which is deprecated) and routing is **React Router v7**, which now supports both SPA and full-stack (framework) modes. Git and GitHub are used from day one — every week's work is committed.

---

## 🗺️ Course Map

| Week | Classes | Focus | Deliverable |
|------|---------|-------|-------------|
| Week 1 | 1–2 | React Foundations: Vite, JSX, Components, Props | Component library: Card, Badge, Avatar |
| Week 2 | 3–4 | State, Events, Controlled Forms & Lists | Task board with filtering |
| Week 3 | 5–6 | Data Fetching, `useEffect`, React Router v7 | Multi-page app with live API data |
| Week 4 | 7–8 | Context, Custom Hooks, React 19 APIs, Deployment | Full capstone app |

**Prerequisites:** All JavaScript topics — especially: destructuring, spread, array methods, `async/await`, ES modules  
**Tools:** Node.js LTS, VS Code, Vite, Git & GitHub, Vercel (for deployment)

---

## 🎯 Mental Models for the Whole Course

```
1. UI = f(state)           →  The UI is a pure function of state.
                               Change the state, React re-renders the UI. That's it.

2. Data flows DOWN         →  Props pass data from parent to child. Never the reverse.

3. Events flow UP          →  Callbacks let children notify parents of actions.

4. Never mutate state      →  Always create a new value and pass it to the setter.

5. Keys identify reality   →  Without stable, unique keys, React cannot reconcile lists correctly.
```

---

## 📅 Week 1 — React Foundations

### Class 1 — Environment, JSX & Components

**Tutor Guidance:** Don't spend more than 20 minutes on setup. If a student can't get Vite running after 20 minutes, pair them with someone who can and return to their machine later. The most common issue: Node version too old. The minimum is Node 20 LTS.

#### Scaffold with Vite

```bash
npm create vite@latest deejoft-app -- --template react
cd deejoft-app
npm install
npm run dev   # → http://localhost:5173
```

**Vite Project Structure:**
```
deejoft-app/
├── src/
│   ├── components/          ← All reusable components
│   ├── pages/               ← Route-level components
│   ├── hooks/               ← Custom hooks
│   ├── context/             ← Context providers
│   ├── utils/               ← Helper functions, API calls
│   ├── assets/              ← Images, fonts
│   ├── App.jsx              ← Root component — routes live here
│   ├── main.jsx             ← Entry — renders <App /> into index.html
│   └── index.css            ← Global styles / design tokens
├── index.html
├── vite.config.js
└── package.json
```

#### JSX — What It Really Is

```jsx
// JSX is syntactic sugar over React.createElement() calls.
// This JSX:
const element = <h1 className="title">Hello, {name}</h1>;

// Compiles to this:
const element = React.createElement('h1', { className: 'title' }, `Hello, ${name}`);

// You never need to write createElement — but knowing it explains:
// - Why you need one root element (one createElement call returns one thing)
// - Why className not class (it's a JS object property, not HTML)
// - Why self-closing tags are required (<img /> not <img>)
```

**JSX Rules & Differences from HTML:**

```jsx
// Rule 1: One root element (or use a Fragment)
// ❌
return (
  <h1>Title</h1>
  <p>Body</p>
)

// ✅ Option A: Wrap in a container
return (
  <div>
    <h1>Title</h1>
    <p>Body</p>
  </div>
)

// ✅ Option B: Fragment — no extra DOM node
return (
  <>
    <h1>Title</h1>
    <p>Body</p>
  </>
)

// Rule 2: className, not class
<div className="card">...</div>

// Rule 3: htmlFor, not for
<label htmlFor="email">Email</label>

// Rule 4: camelCase event handlers
<button onClick={handleClick}>Click</button>
<input onChange={handleChange} onBlur={handleBlur} />

// Rule 5: Inline styles are objects with camelCase properties
<p style={{ fontSize: '1.25rem', color: '#1a1a2e', marginBottom: '8px' }}>...</p>

// Rule 6: All tags must be closed
<input type="text" />   // ← self-closing required
<br />
<img src="..." alt="..." />

// Rule 7: JavaScript expressions in {}
const items = ['HTML', 'CSS', 'JS'];
<p>{items.length} courses</p>
<p>{2 + 2}</p>
<p>{isLoggedIn ? 'Welcome back' : 'Please sign in'}</p>
```

#### Components

```jsx
// A component is a function that returns JSX.
// Component names MUST be PascalCase — this is how React distinguishes
// components from native DOM elements (lowercase = DOM tag, PascalCase = component).

// src/components/CourseCard.jsx
function CourseCard({ title, duration, price, level, isNew = false }) {
  return (
    <article className="course-card">
      <header className="course-card__header">
        <h3 className="course-card__title">{title}</h3>
        {isNew && <span className="badge badge--new">New</span>}
      </header>

      <dl className="course-card__meta">
        <dt>Duration</dt>  <dd>{duration}</dd>
        <dt>Level</dt>     <dd>{level}</dd>
        <dt>Price</dt>     <dd>₦{price.toLocaleString()}</dd>
      </dl>

      <a href={`/courses/${title.toLowerCase().replace(/ /g, '-')}`} className="btn btn--primary">
        View Course
      </a>
    </article>
  );
}

export default CourseCard;


// src/App.jsx
import CourseCard from './components/CourseCard';

const courses = [
  { id: 1, title: 'HTML & CSS',   duration: '2 Weeks', price: 49999, level: 'Beginner',     isNew: false },
  { id: 2, title: 'JavaScript',   duration: '4 Weeks', price: 79999, level: 'Beginner',     isNew: false },
  { id: 3, title: 'React',        duration: '4 Weeks', price: 89999, level: 'Intermediate', isNew: false },
  { id: 4, title: 'React Native', duration: '4 Weeks', price: 89999, level: 'Intermediate', isNew: true  },
];

function App() {
  return (
    <main>
      <h1>Our Courses</h1>
      <div className="course-grid">
        {courses.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </main>
  );
}

export default App;
```

---

### Class 2 — Props, Composition & Thinking in Components

```jsx
// ── children prop — composition pattern ──
function Card({ children, className = '' }) {
  return (
    <article className={`card ${className}`}>
      {children}
    </article>
  );
}

function CardHeader({ children }) {
  return <header className="card__header">{children}</header>;
}

function CardBody({ children }) {
  return <div className="card__body">{children}</div>;
}

// Usage — highly composable, no prop-drilling needed for layout
<Card className="card--featured">
  <CardHeader>
    <h2>React 19</h2>
    <Badge>New</Badge>
  </CardHeader>
  <CardBody>
    <p>Learn the latest React features...</p>
  </CardBody>
</Card>


// ── Conditional Rendering Patterns ──
function UserGreeting({ user, isLoading, error }) {
  // Pattern 1: Early return for loading/error states
  if (isLoading) return <Spinner />;
  if (error)     return <ErrorMessage message={error} />;
  if (!user)     return null;

  return (
    <div className="greeting">
      {/* Pattern 2: && for simple show/hide */}
      {user.isNew && <NewUserBanner />}

      {/* Pattern 3: Ternary for either/or */}
      <h1>
        {user.firstName
          ? `Welcome back, ${user.firstName}!`
          : 'Welcome!'}
      </h1>

      {/* Pattern 4: Helper function for complex conditions */}
      {renderSubscriptionStatus(user.subscription)}
    </div>
  );
}

function renderSubscriptionStatus(subscription) {
  const statusMap = {
    active:   <span className="badge badge--green">Active</span>,
    trial:    <span className="badge badge--yellow">Trial</span>,
    expired:  <span className="badge badge--red">Expired</span>,
  };
  return statusMap[subscription] ?? null;
}
```

---

## 📅 Week 2 — State, Events & Forms

### Class 3 — useState & Event Handling

```jsx
import { useState } from 'react';

// ── Basic State ──
function Counter() {
  const [count, setCount] = useState(0);

  // ✅ Use functional update when new state depends on previous state
  // This guarantees you always have the latest value (avoids stale closures)
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset     = () => setCount(0);

  return (
    <div className="counter">
      <button onClick={decrement} aria-label="Decrease count">−</button>
      <output className="counter__value">{count}</output>
      <button onClick={increment} aria-label="Increase count">+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}


// ── Object State — Never Mutate ──
function ProfileEditor({ initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);

  const updateField = (field, value) => {
    // ✅ Spread creates a new object — React detects the change
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // ❌ WRONG — mutates the existing object. React won't re-render.
  // profile.name = 'New Name';
  // setProfile(profile);  ← same object reference, React skips re-render

  return (
    <form>
      <input
        value={profile.name}
        onChange={e => updateField('name', e.target.value)}
      />
      <input
        value={profile.email}
        onChange={e => updateField('email', e.target.value)}
      />
    </form>
  );
}


// ── Array State — Immutable Patterns ──
function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build a project', done: false },
  ]);

  // ADD — spread existing items, add new one
  const addTask = (text) => {
    const newTask = { id: Date.now(), text, done: false };
    setTasks(prev => [...prev, newTask]);
  };

  // TOGGLE — map returns a new array with the changed item
  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // DELETE — filter returns a new array without the removed item
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(task.id)}
          />
          <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.text}`}>
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}
```

---

### Class 4 — Controlled Forms, useReducer & Lists

```jsx
// ── Controlled Form — Full Example ──
import { useState } from 'react';

const INITIAL_FORM = { name: '', email: '', course: '', message: '' };

function EnrolmentForm() {
  const [form, setForm]     = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim())                         newErrors.name    = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.course)                              newErrors.course  = 'Please select a course';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    try {
      await submitEnrolment(form);
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') return <SuccessMessage />;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p id="name-error" className="field-error" role="alert">{errors.name}</p>}
      </div>

      {/* ... similar fields for email, course, message ... */}

      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting...' : 'Submit Enrolment'}
      </button>

      {status === 'error' && <p role="alert" className="form-error">Something went wrong. Please try again.</p>}
    </form>
  );
}


// ── useReducer — for complex state with multiple actions ──
import { useReducer } from 'react';

const initialState = {
  tasks: [],
  filter: 'all',    // 'all' | 'active' | 'done'
  sortBy: 'newest', // 'newest' | 'oldest' | 'alpha'
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [{ id: Date.now(), text: action.payload, done: false }, ...state.tasks] };
    case 'TOGGLE_TASK':
      return { ...state, tasks: state.tasks.map(t => t.id === action.payload ? { ...t, done: !t.done } : t) };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}

function TaskBoard() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask    = (text) => dispatch({ type: 'ADD_TASK',    payload: text });
  const toggleTask = (id)   => dispatch({ type: 'TOGGLE_TASK', payload: id });
  const deleteTask = (id)   => dispatch({ type: 'DELETE_TASK', payload: id });

  const visibleTasks = state.tasks.filter(task => {
    if (state.filter === 'active') return !task.done;
    if (state.filter === 'done')   return task.done;
    return true;
  });

  // ... render
}
```

---

## 📅 Week 3 — Data Fetching & Routing

### Class 5 — useEffect & Data Fetching Patterns

```jsx
import { useState, useEffect, useRef } from 'react';

// ── Standard Fetch Pattern ──
function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [status, setStatus]   = useState('loading'); // 'loading' | 'success' | 'error'
  const [error, setError]     = useState(null);

  useEffect(() => {
    // Cleanup flag — prevents setting state after unmount
    let cancelled = false;

    async function loadCourses() {
      setStatus('loading');
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        if (!cancelled) {
          setCourses(data);
          setStatus('success');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setStatus('error');
        }
      }
    }

    loadCourses();
    return () => { cancelled = true; }; // Cleanup on unmount

  }, []); // Empty array = run once after mount

  if (status === 'loading') return <CourseSkeleton count={6} />;
  if (status === 'error')   return <ErrorBoundaryUI message={error} />;

  return (
    <div className="course-grid">
      {courses.map(course => <CourseCard key={course.id} {...course} />)}
    </div>
  );
}

// ── useEffect Dependency Rules ──
useEffect(() => { /* runs once after mount */ },    []);
useEffect(() => { /* runs after EVERY render */ }    /* no array — rarely what you want */ );
useEffect(() => { /* runs when userId changes */ }, [userId]);
useEffect(() => { /* runs when userId OR page changes */ }, [userId, page]);

// ── useMemo & useCallback ──
import { useMemo, useCallback } from 'react';

function FilterableCourseList({ courses, searchQuery, sortBy }) {
  // Memoize expensive computation — only recalculates when dependencies change
  const filteredCourses = useMemo(() => {
    return courses
      .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => sortBy === 'price' ? a.price - b.price : a.title.localeCompare(b.title));
  }, [courses, searchQuery, sortBy]);

  // Stable function reference — prevents child re-renders when parent re-renders
  const handleEnrol = useCallback((courseId) => {
    console.log('Enrolling in:', courseId);
  }, []); // No dependencies — function never changes

  return (
    <div>
      {filteredCourses.map(course => (
        <CourseCard key={course.id} course={course} onEnrol={handleEnrol} />
      ))}
    </div>
  );
}
```

---

### Class 6 — React Router v7

```bash
npm install react-router
```

```jsx
// src/main.jsx
import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// src/App.jsx
import { Routes, Route, Navigate } from 'react-router';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:slug" element={<CourseDetailPage />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

// src/layouts/RootLayout.jsx
import { Outlet, NavLink } from 'react-router';

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          {/* NavLink automatically adds class="active" on the current route */}
          <NavLink to="/"        end>Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </header>
      <main>
        <Outlet /> {/* Child route renders here */}
      </main>
      <footer>...</footer>
    </>
  );
}

// src/pages/CourseDetailPage.jsx
import { useParams, useNavigate, Link } from 'react-router';

function CourseDetailPage() {
  const { slug } = useParams();           // Read :slug from the URL
  const navigate = useNavigate();          // Programmatic navigation

  const goBack = () => navigate(-1);       // Go back one step in history
  const goToCourses = () => navigate('/courses', { replace: true }); // Replace history entry

  // Fetch course by slug...
  return <div>{slug}</div>;
}
```

---

## 📅 Week 4 — Context, Custom Hooks & React 19

### Class 7 — Context & Custom Hooks

```jsx
// ── Context — for truly global state ──
// Use for: current user, theme, language, notification system
// Do NOT use for: state that only 2–3 components share (just lift state instead)

import { createContext, useContext, useState, useCallback } from 'react';

// 1. Create the context
const NotificationContext = createContext(null);

// 2. Build the provider
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(({ message, type = 'info', duration = 4000 }) => {
    const id = crypto.randomUUID(); // Native browser API — no library needed
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), duration);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      {/* The toast UI lives here, outside the component tree */}
      <div className="toast-region" aria-live="polite" aria-atomic="false">
        {notifications.map(n => (
          <div key={n.id} className={`toast toast--${n.type}`} role="status">
            <span>{n.message}</span>
            <button onClick={() => removeNotification(n.id)} aria-label="Dismiss">×</button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

// 3. Custom hook — never expose useContext directly
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
}

// 4. Usage anywhere in the tree
function EnrolButton({ courseId }) {
  const { addNotification } = useNotifications();

  const handleEnrol = async () => {
    try {
      await enrolInCourse(courseId);
      addNotification({ message: 'Enrolled successfully! 🎉', type: 'success' });
    } catch {
      addNotification({ message: 'Enrolment failed. Please try again.', type: 'error' });
    }
  };

  return <button onClick={handleEnrol}>Enrol Now</button>;
}


// ── Custom Hooks — extract and reuse stateful logic ──

// hooks/useFetch.js
export function useFetch(url) {
  const [data, setData]     = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError]   = useState(null);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setStatus('loading');

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => { if (!cancelled) { setData(d); setStatus('success'); } })
      .catch(e => { if (!cancelled) { setError(e.message); setStatus('error'); } });

    return () => { cancelled = true; };
  }, [url]);

  return { data, status, error, isLoading: status === 'loading' };
}

// hooks/useLocalStorage.js
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setStoredValue = useCallback((newValue) => {
    const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
    setValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  }, [key, value]);

  return [value, setStoredValue];
}

// hooks/useDebounce.js — delay state updates until user stops typing
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// Usage
function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  // Only fires a new fetch when the user pauses typing for 400ms
  const { data, isLoading } = useFetch(
    debouncedQuery ? `/api/search?q=${debouncedQuery}` : null
  );
  // ...
}
```

---

### Class 8 — React 19 APIs & Deployment

```jsx
// ── React 19: The use() hook — read a Promise or Context in render ──
import { use, Suspense } from 'react';

// Before React 19: you needed useEffect + useState to fetch data
// With React 19: you can pass a Promise directly to use()

function CourseList({ coursesPromise }) {
  // use() suspends the component until the promise resolves
  // Suspense above catches the "suspension" and shows the fallback
  const courses = use(coursesPromise);

  return (
    <ul>
      {courses.map(c => <li key={c.id}>{c.title}</li>)}
    </ul>
  );
}

function CoursesPage() {
  const [promise] = useState(() => fetch('/api/courses').then(r => r.json()));

  return (
    <Suspense fallback={<CourseSkeleton />}>
      <CourseList coursesPromise={promise} />
    </Suspense>
  );
}


// ── React 19: Actions & useActionState — async form handling ──
import { useActionState } from 'react';

async function submitContactForm(previousState, formData) {
  const name    = formData.get('name');
  const email   = formData.get('email');
  const message = formData.get('message');

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    if (!response.ok) throw new Error('Failed');
    return { status: 'success', message: `Thanks, ${name}! We'll be in touch.` };
  } catch {
    return { status: 'error', message: 'Something went wrong. Please try again.' };
  }
}

function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    <form action={formAction}>
      <input name="name"    type="text"  required />
      <input name="email"   type="email" required />
      <textarea name="message" required />

      <button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </button>

      {state?.status === 'success' && <p className="success">{state.message}</p>}
      {state?.status === 'error'   && <p className="error">{state.message}</p>}
    </form>
  );
}


// ── React 19: useOptimistic — instant UI feedback ──
import { useOptimistic } from 'react';

function LikeButton({ post }) {
  const [optimisticPost, addOptimisticLike] = useOptimistic(
    post,
    (state) => ({ ...state, likeCount: state.likeCount + 1, liked: true })
  );

  const handleLike = async () => {
    addOptimisticLike();            // Update UI immediately
    await likePost(post.id);        // Then send the real request
    // If the request fails, React automatically rolls back to the real state
  };

  return (
    <button onClick={handleLike} aria-pressed={optimisticPost.liked}>
      ♥ {optimisticPost.likeCount}
    </button>
  );
}
```

#### Deployment to Vercel

```bash
# Build
npm run build     # → /dist folder

# Deploy (3 ways)
# 1. Vercel CLI
npm i -g vercel
vercel

# 2. GitHub Integration (recommended)
# → Push to GitHub
# → Connect repo at vercel.com
# → Every push to main auto-deploys

# 3. Netlify — same GitHub integration approach
# Build command: npm run build
# Publish directory: dist
```

---

### 🏆 Capstone Project Options

**Option A: Course Marketplace**
Multi-page app with course listing, search/filter, detail page, cart, and fake checkout. Uses Context for cart state, `useActionState` for checkout form, and React Router for navigation.

**Option B: Developer Portfolio + Blog**
Static pages (About, Projects, Skills) + a Blog section that fetches markdown posts from a free headless CMS (e.g., Contentful free tier). Shows Server-side-inspired fetching patterns.

**Option C: Real-Time Dashboard**
Polls a free API (stock prices, weather, sports scores) every 30 seconds. Uses `useEffect` for polling, `useMemo` for derived stats, charts from Recharts, and `useLocalStorage` for saved preferences.

---

**Rubric:**

| Criterion | Points |
|-----------|--------|
| Vite project pushed to GitHub with clean commit history | 5 |
| Minimum 8 components, each in its own file | 10 |
| Props and children used for composition | 5 |
| `useState` (or `useReducer`) with correct immutable patterns | 15 |
| At least one form using `useActionState` (React 19) | 10 |
| `useEffect` for data fetching with cleanup and error handling | 15 |
| React Router — 4+ routes including one dynamic route | 10 |
| Context + custom hook for global state | 10 |
| `useMemo` or `useCallback` used where appropriate | 5 |
| App deployed live on Vercel | 10 |
| Responsive layout (uses CSS from the CSS course) | 5 |
| **Total** | **100** |

---

## 📚 Essential References

| Resource | URL | Use For |
|----------|-----|---------|
| React Docs (react.dev) | `react.dev` | Official docs — hooks-first, excellent |
| React Router Docs | `reactrouter.com/en/main` | Routing API reference |
| TanStack Query | `tanstack.com/query` | Advanced async state (recommend for capstone) |
| Recharts | `recharts.org` | Charts and data visualisation |
| Radix UI | `radix-ui.com` | Accessible headless UI components |

---

*Deejoft Coding School — Instructor Materials | React Track*
*Rebuilt 2025 — React 19, useActionState, useOptimistic, use(), React Router v7*
