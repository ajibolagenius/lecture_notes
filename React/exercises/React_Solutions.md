# ✅ React Exercises — Solutions
### Deejoft Coding School | Tutor Reference Only

---

## Week 1 Solutions

---

### Exercise 1.1 Solution — JSX Debug

```jsx
// Bug A — Missing root wrapper
function Card() {
  return (
    <>
      <h2>Title</h2>
      <p>Body text here.</p>
    </>
  )
}

// Bug B — class → className, onclick → onClick
function Button({ label, onClick }) {
  return <button className="btn" onClick={onClick}>{label}</button>
}

// Bug C — for → htmlFor
function Field() {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" />
    </div>
  )
}

// Bug D — handleSubmit() calls immediately on render, returns undefined to onClick
// Fix: remove the () to pass the function reference
<button onClick={handleSubmit}>Submit</button>

// Bug E — local variable change doesn't trigger re-render
// Fix: use useState
function Counter() {
  const [count, setCount] = React.useState(0)
  return <button onClick={() => setCount(prev => prev + 1)}>{count}</button>
}
```

---

### Exercise 1.2 Solution — Component Library

```jsx
// Avatar.jsx
const SIZES = { sm: 32, md: 48, lg: 96 }

function Avatar({ src, name, size = 'md' }) {
  const px = SIZES[size] ?? 48
  return (
    <img
      src={src}
      alt={name}
      width={px}
      height={px}
      style={{ borderRadius: '50%', objectFit: 'cover' }}
    />
  )
}
export default Avatar

// Badge.jsx
const BADGE_STYLES = {
  default: { background: '#e2e2e8', color: '#555' },
  success: { background: '#d1fae5', color: '#065f46' },
  error:   { background: '#fee2e2', color: '#991b1b' },
  new:     { background: '#e94560', color: 'white'  },
}

function Badge({ children, variant = 'default' }) {
  return (
    <span style={{
      ...BADGE_STYLES[variant],
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: 600,
    }}>
      {children}
    </span>
  )
}
export default Badge

// StatCard.jsx
function StatCard({ label, value, icon }) {
  return (
    <div style={{ textAlign: 'center', padding: '16px' }}>
      {icon && <span style={{ fontSize: '1.5rem' }}>{icon}</span>}
      <p style={{ fontSize: '2rem', fontWeight: 800 }}>{value}</p>
      <p style={{ color: '#888', fontSize: '0.875rem' }}>{label}</p>
    </div>
  )
}
export default StatCard
```

---

### Exercise 1.4 Solution — Course Catalogue (Key Parts)

```jsx
// CourseCard.jsx
import Badge from './Badge'

function CourseCard({ id, title, price, level, weeks, isNew }) {
  return (
    <article className="card">
      <header className="card__header">
        <h3>{title}</h3>
        {isNew && <Badge variant="new">New</Badge>}
      </header>
      <dl>
        <dt>Level</dt>   <dd><Badge>{level}</Badge></dd>
        <dt>Duration</dt><dd>{weeks} Week{weeks > 1 ? 's' : ''}</dd>
        <dt>Price</dt>   <dd>₦{price.toLocaleString()}</dd>
      </dl>
    </article>
  )
}
export default CourseCard

// CourseSummary.jsx
function CourseSummary({ courses }) {
  const total   = courses.reduce((sum, c) => sum + c.price, 0)
  const newCount = courses.filter(c => c.isNew).length

  return (
    <div className="summary">
      <StatCard label="Total Courses" value={courses.length} />
      <StatCard label="Full Track Cost" value={`₦${total.toLocaleString()}`} />
      <StatCard label="New This Cohort" value={newCount} />
    </div>
  )
}
export default CourseSummary
```

---

## Week 2 Solutions

---

### Exercise 2.1 Solution — Trace

```
Starting:            items = ['apple', 'banana'], count = 0
After addItem('cherry'):  items = ['apple', 'banana', 'cherry'], count = 0
After removeFirst():       items = ['banana', 'cherry'], count = 0
After increment() ×3:     items = ['banana', 'cherry'], count = 3
After double():            items = ['banana', 'cherry'], count = 6
```

---

### Exercise 2.2 Solution — Task Board with useReducer

```jsx
import { useReducer } from 'react'

const initialState = { tasks: [], filter: 'all' }

function reducer(state, action) {
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
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) }
    case 'CLEAR_DONE':
      return { ...state, tasks: state.tasks.filter(t => !t.done) }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    default:
      return state
  }
}

function TaskBoard() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [input, setInput] = useState('')

  const add = () => {
    const text = input.trim()
    if (!text) return
    dispatch({ type: 'ADD_TASK', payload: text })
    setInput('')
  }

  const visible = state.tasks.filter(t => {
    if (state.filter === 'active') return !t.done
    if (state.filter === 'done')   return  t.done
    return true
  })

  const remaining = state.tasks.filter(t => !t.done).length

  return (
    <div>
      <div>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()} />
        <button onClick={add}>Add</button>
      </div>

      <div>
        {['all', 'active', 'done'].map(f => (
          <button key={f} onClick={() => dispatch({ type: 'SET_FILTER', payload: f })}
            style={{ fontWeight: state.filter === f ? 700 : 400 }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {visible.length === 0
        ? <p>No tasks yet. Add one above!</p>
        : (
          <ul>
            {visible.map(task => (
              <li key={task.id}>
                <input type="checkbox" checked={task.done}
                  onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })} />
                <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
                <button onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}>×</button>
              </li>
            ))}
          </ul>
        )
      }

      <footer>
        <span>{remaining} task{remaining !== 1 ? 's' : ''} remaining</span>
        <button onClick={() => dispatch({ type: 'CLEAR_DONE' })}>Clear Done</button>
      </footer>
    </div>
  )
}
```

---

## Week 3 Solutions

---

### Exercise 3.1 Solution — useEffect Dependency Audit

**A — WRONG.** `userId` is used inside the effect but not in the dependency array. The effect will only run once on mount and will never re-fetch when `userId` changes.
Fix: `}, [userId])`

**B — WRONG.** No dependency array means the effect runs after every render. Setting state triggers a render, which triggers the effect again → infinite loop.
Fix: `}, [])` (if truly only needed once) or reconsider the logic entirely.

**C — CORRECT.** The interval starts on mount, the cleanup cancels it on unmount. No dependencies needed because `setTime` is stable (React guarantees state setters do not change).

**D — CORRECT** (but slightly overcomplicated). The pattern of `useCallback` + `useEffect([cb])` is valid — when `query` changes, `search` gets a new reference, which triggers the effect. An equally valid simpler version: `useEffect(() => { fetchResults(query) }, [query])` without the `useCallback`.

---

### Exercise 3.2 Solution — CountryCard (Key Parts)

```jsx
// hooks/useDebounce.js
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

// CountryCard.jsx
function CountryCard({ name }) {
  const [country, setCountry] = useState(null)
  const [status, setStatus]   = useState('idle')

  useEffect(() => {
    if (!name || name.length < 2) return

    let cancelled = false
    setStatus('loading')

    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(r => { if (!r.ok) throw new Error('Not found'); return r.json() })
      .then(data => {
        if (!cancelled) { setCountry(data[0]); setStatus('success') }
      })
      .catch(err => {
        if (!cancelled) setStatus('error')
      })

    return () => { cancelled = true }
  }, [name])

  if (status === 'idle')    return null
  if (status === 'loading') return <p>Loading…</p>
  if (status === 'error')   return <p>Country not found.</p>

  return (
    <div>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width={80} />
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
    </div>
  )
}
```

---

## Week 4 Solutions

---

### Exercise 4.1 Solution — CartContext

```jsx
// context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addItem = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) { removeItem(id); return }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
```

---

### Exercise 4.2 Solution — useFetch with refetch

```jsx
// hooks/useFetch.js
export function useFetch(url) {
  const [data, setData]     = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError]   = useState(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    if (!url) return
    let cancelled = false
    setStatus('loading')

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(d => { if (!cancelled) { setData(d); setStatus('success') } })
      .catch(e => { if (!cancelled) { setError(e.message); setStatus('error') } })

    return () => { cancelled = true }
  }, [url, trigger])  // trigger changes force a re-fetch

  const refetch = () => setTrigger(t => t + 1)
  return { data, isLoading: status === 'loading', error, status, refetch }
}

// hooks/useOnClickOutside.js
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
```

---

### Exercise 4.3 Solution — useActionState Form

```jsx
import { useActionState } from 'react'

function validate(data) {
  const errors = {}
  if (!data.name?.trim())                               errors.name  = 'Name is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Valid email required'
  if (!data.course)                                    errors.course = 'Select a course'
  return errors
}

async function enrolAction(prevState, formData) {
  const data = Object.fromEntries(formData)
  const errors = validate(data)

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors }
  }

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Uncomment to test error state:
  // return { status: 'error', errors: {}, message: 'Server error. Please try again.' }

  return { status: 'success', message: `Enrolled! Welcome, ${data.name}!` }
}

function EnrolForm() {
  const [state, formAction, isPending] = useActionState(enrolAction, null)

  if (state?.status === 'success') {
    return <div className="success">{state.message}</div>
  }

  const errors = state?.errors ?? {}

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Full Name</label>
        <input id="name" name="name" type="text"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-err' : undefined} />
        {errors.name && <p id="name-err" role="alert">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-err' : undefined} />
        {errors.email && <p id="email-err" role="alert">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="course">Course</label>
        <select id="course" name="course" aria-invalid={!!errors.course}>
          <option value="">-- Select --</option>
          <option value="html-css">HTML & CSS</option>
          <option value="javascript">JavaScript</option>
          <option value="react">React</option>
          <option value="react-native">React Native</option>
          <option value="python">Python</option>
        </select>
        {errors.course && <p role="alert">{errors.course}</p>}
      </div>

      {state?.status === 'error' && !Object.keys(errors).length && (
        <p role="alert" className="form-error">{state.message}</p>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Enrolling…' : 'Enrol Now'}
      </button>
    </form>
  )
}
```

---

*Deejoft Coding School | React Solutions | Tutor Reference — Do Not Distribute*
