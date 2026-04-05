# ✏️ React Exercises
### Deejoft Coding School — All 8 Classes

**Setup:** All exercises use a Vite React project. Run `npm create vite@latest my-app -- --template react` if you need a fresh project.

---

## Week 1 — Components & Props

---

### Exercise 1.1 — JSX Debug & Predict ⭐

Each snippet has one or more bugs. Fix them without running the code first.

```jsx
// Bug A
function Card() {
  return (
    <h2>Title</h2>
    <p>Body text here.</p>
  )
}

// Bug B
function Button({ label, onClick }) {
  return <button class="btn" onclick={onClick}>{label}</button>
}

// Bug C — this form label will not work correctly in browsers
function Field() {
  return (
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" />
    </div>
  )
}

// Bug D — what is wrong with how this event is attached?
<button onClick={handleSubmit()}>Submit</button>

// Bug E — why will this not update the UI?
function Counter() {
  let count = 0
  return <button onClick={() => count++}>{count}</button>
}
```

---

### Exercise 1.2 — Build a Component Library ⭐⭐

Create these four components in `src/components/`. Each in its own file.

**`Avatar.jsx`** — props: `src`, `name`, `size` (default `'md'`)
- Renders an `<img>` with correct `alt` text (`name`)
- Size variants: `'sm'` (32px), `'md'` (48px), `'lg'` (96px)
- Circular (border-radius: 50%)

**`Badge.jsx`** — props: `children`, `variant` (default `'default'`)
- Variants: `'default'` (grey), `'success'` (green), `'error'` (red), `'new'` (brand)
- Renders a `<span>` with appropriate styling

**`StatCard.jsx`** — props: `label`, `value`, `icon` (optional)
- Renders the label, a large value, and optionally an icon
- Use in a stats row to show "Students: 340", "Courses: 12"

**`SiteHeader.jsx`** — props: none (hardcode content)
- Contains a logo text, and a nav with 4 links: Home, Courses, About, Contact
- All links are `<a>` tags for now (router comes in Week 3)

---

### Exercise 1.3 — Compose a Profile Page ⭐⭐

In `App.jsx`, compose a profile page for a fictional Deejoft student using the components from 1.2 and any new components you need.

Requirements:
- `Avatar` with the user's photo and name
- Three `StatCard` components in a row: Projects, Courses, Streak
- A `SiteHeader` at the top
- At least one `Badge` showing the student's level
- All data stored in a `const student = {}` object at the top of `App.jsx`
- No hardcoded text inside components — all content comes from props

---

### Exercise 1.4 — Course Catalogue ⭐⭐⭐

Build a course catalogue from this data:

```jsx
const courses = [
  { id: 1, title: 'HTML & CSS',   price: 49999, level: 'Beginner',     weeks: 2, isNew: false },
  { id: 2, title: 'JavaScript',   price: 79999, level: 'Beginner',     weeks: 4, isNew: false },
  { id: 3, title: 'React',        price: 89999, level: 'Intermediate', weeks: 4, isNew: true  },
  { id: 4, title: 'React Native', price: 89999, level: 'Intermediate', weeks: 4, isNew: true  },
  { id: 5, title: 'Python',       price: 79999, level: 'Beginner',     weeks: 4, isNew: false },
]
```

Requirements:
- A `CourseCard` component with title, price, level, weeks, and a `Badge` for new courses
- `CoursesSection` component that receives the courses array and renders a grid of cards
- A `CourseSummary` component that shows: total courses, total cost, and how many are new
- All components in their own files with named exports where appropriate

---

## Week 2 — State & Forms

---

### Exercise 2.1 — useState Predict & Trace ⭐

Trace through this component. For each button click described, write the new state value.

```jsx
function Tracker() {
  const [items, setItems] = useState(['apple', 'banana'])
  const [count, setCount] = useState(0)

  const addItem = (item) => setItems(prev => [...prev, item])
  const removeFirst = () => setItems(prev => prev.slice(1))
  const increment = () => setCount(prev => prev + 1)
  const double = () => setCount(prev => prev * 2)
}

// Starting state: items = ['apple', 'banana'], count = 0
// After addItem('cherry'):         items = ______________, count = ___
// After removeFirst():              items = ______________, count = ___
// After increment() three times:   items = ______________, count = ___
// After double():                   items = ______________, count = ___
```

---

### Exercise 2.2 — Interactive Task Board ⭐⭐

Build a task board with `useReducer`:

```
State shape: { tasks: [], filter: 'all' }
Actions: ADD_TASK, TOGGLE_TASK, DELETE_TASK, SET_FILTER, CLEAR_DONE

UI:
- Input field + Add button → dispatches ADD_TASK
- Filter tabs: All | Active | Done → dispatches SET_FILTER
- Each task: checkbox (TOGGLE_TASK) + × button (DELETE_TASK)
- Footer: "{n} tasks remaining" + "Clear Done" button (CLEAR_DONE)
- Empty state: "No tasks yet. Add one above!"
```

Requirements:
- Pure reducer — no mutation
- `crypto.randomUUID()` for task IDs
- Filtered tasks computed from state in the component
- Keyboard: press Enter in the input to add

---

### Exercise 2.3 — Enrolment Form ⭐⭐

Build a fully controlled enrolment form:

**Fields:**
- Full name: required, minLength 2
- Email: required, must match email regex
- Phone: optional
- Course: `<select>`, required — options for all 5 Deejoft courses
- Schedule: radio group (Weekday Morning / Weekday Evening / Weekend), required
- Message: `<textarea>`, optional, maxLength 500

**Validation rules:**
- Run validation on submit only (not on every keystroke)
- Clear an individual field's error when the user starts typing in it
- Show each error below its field with `role="alert"` and `aria-invalid` on the input
- On valid submit: show a success message and reset the form
- Submit button shows "Submitting…" and is disabled while status === 'loading' (simulate with a 1.5s timeout)

---

### Exercise 2.4 — Shopping Cart ⭐⭐⭐

Build a product listing with a shopping cart:

```
State: { cart: [] }  — each cart item: { id, title, price, quantity }

Products page:
- Grid of product cards (use the courses data from Exercise 1.4)
- "Add to Cart" button on each card
- If item already in cart: show "In Cart ✓" instead, allow remove

Cart sidebar / panel:
- List of cart items with quantity controls (+/−) and remove button
- Running total
- "Checkout" button (show alert for now)
- Empty state: "Your cart is empty"

State rules (all immutable):
- Adding an item that is already in cart → increment quantity
- Decrementing quantity to 0 → remove item
- Cart state persisted to localStorage (load on mount)
```

---

## Week 3 — Effects & Routing

---

### Exercise 3.1 — useEffect Dependency Audit ⭐

For each `useEffect`, identify whether the dependency array is correct. If not, explain what will go wrong and fix it.

```jsx
// A
const [userId, setUserId] = useState(1)
useEffect(() => {
  fetch(`/api/users/${userId}`).then(r => r.json()).then(setUser)
}, [])   // Is this correct?

// B
const [data, setData] = useState(null)
useEffect(() => {
  setData(Math.random())
})   // Is this correct?

// C
useEffect(() => {
  const id = setInterval(() => setTime(new Date()), 1000)
  return () => clearInterval(id)
}, [])   // Is this correct?

// D
const [query, setQuery] = useState('')
const search = useCallback(() => fetchResults(query), [query])
useEffect(() => {
  search()
}, [search])   // Is this correct?
```

---

### Exercise 3.2 — Data Fetching Component ⭐⭐

Build a `CountryCard` that fetches a country by name from the REST Countries API:

```
URL: https://restcountries.com/v3.1/name/{name}?fullText=true

Component: CountryCard({ name })
- Shows loading spinner while fetching
- Shows error message if fetch fails or country not found
- On success shows: flag, country name, capital, population (formatted), region
- Re-fetches when name prop changes
- Cancels in-flight request on unmount (use cancellation flag)
```

Also build a `CountrySearchPage` that:
- Has a text input
- Debounces the input by 500ms using a custom `useDebounce` hook
- Passes the debounced value to `CountryCard`
- Only fetches when input has 2+ characters

---

### Exercise 3.3 — Multi-Page App ⭐⭐⭐

Build a multi-page course explorer using React Router v7:

**Routes:**
```
/                → HomePage    — hero + featured courses
/courses         → CoursesPage — searchable, filterable grid of all courses
/courses/:slug   → CourseDetailPage — details, enrolment CTA
/about           → AboutPage  — team info
```

Requirements:
- `RootLayout` with `<Outlet>` — `SiteHeader` and `SiteFooter` shared
- `NavLink` for navigation with `active` styling
- `CourseDetailPage` reads the slug from `useParams`, finds the course from a local array
- If slug not found, render a "Course not found" message with a link back to `/courses`
- Active `NavLink` gets a visible style change (underline, colour)
- 404 route (`path="*"`) renders a friendly not-found page with a home link

---

## Week 4 — Context, Hooks & React 19

---

### Exercise 4.1 — Context Refactor ⭐⭐

Take the shopping cart from Exercise 2.4 and move the cart state into a `CartContext`:

```
context/CartContext.jsx — creates context, exports CartProvider and useCart
CartProvider — manages state, provides: cart, addItem, removeItem, updateQty, clearCart, total

Components that use context: CartIcon (shows count), CartSidebar (full list), AddToCartButton
```

Requirements:
- No prop drilling — components access cart via `useCart()` only
- `CartProvider` wraps the whole app in `main.jsx`
- `useCart()` throws a helpful error if used outside the provider
- Cart state still persisted to `localStorage`

---

### Exercise 4.2 — Custom Hooks Suite ⭐⭐

Build these four custom hooks:

```jsx
// 1. useFetch(url) — standard fetch hook
// Returns: { data, isLoading, error, refetch }
// refetch() re-triggers the fetch

// 2. useLocalStorage(key, initialValue)
// Returns: [value, setValue] — same API as useState but synced to localStorage

// 3. useDebounce(value, delay = 400)
// Returns: debounced value

// 4. useOnClickOutside(ref, handler)
// Calls handler when a click occurs outside the element referenced by ref
// Useful for closing dropdowns and modals

// Test each hook in a demo component
```

---

### Exercise 4.3 — React 19 Forms ⭐⭐

Refactor the enrolment form from Exercise 2.3 to use `useActionState`:

```jsx
async function enrolAction(prevState, formData) {
  // Extract all fields from formData
  // Validate
  // Simulate API call (setTimeout 1500ms)
  // Return { status: 'success' | 'error', errors?: {}, message?: string }
}
```

Requirements:
- Remove all `useState` for form/errors/status — use `useActionState` instead
- The form uses `action={formAction}` attribute
- `isPending` from `useActionState` drives the disabled button state
- On success: show a confirmation message component
- On error: show field errors from `state.errors`

---

### Exercise 4.4 — Capstone: Deployed Course App ⭐⭐⭐

Build and deploy a complete course marketplace app to Vercel.

**Requirements:**

| Feature | Details |
|---------|---------|
| Pages (Router) | Home, Courses, Course Detail, About, Login |
| Auth (Context) | Mock login/logout — username + password (any values) |
| Protected route | Dashboard page — redirect to Login if not authenticated |
| Data | Fetch from a mock API (use `jsonplaceholder.typicode.com` or your own static JSON) |
| State | Cart (Context + localStorage) — add, remove, clear |
| Forms | Enrolment form with `useActionState` |
| Custom hooks | `useFetch`, `useLocalStorage`, `useDebounce` used throughout |
| Performance | At least one `useMemo` and one `useCallback` in the courses list |
| Deployment | Live on Vercel — share the URL |
| Git | 10+ meaningful commits showing progression |

---

*Deejoft Coding School | React Exercises | All exercises use Vite React project*
