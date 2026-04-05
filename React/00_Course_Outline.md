# ⚛️ React Course — Tutor's Master Outline
### Deejoft Coding School | Web Development Track
**Instructor Notes — Fundamentals to Modern Web Apps**

---

> **Dear Tutor,**
> React is where students transition from "person who can build web pages" to "frontend developer." The mental shift from imperative DOM manipulation (telling the browser *how* to update the page) to declarative components (describing *what* the UI should look like given the current state) is significant. Be patient with this shift. Everything in this course should be taught with **functional components and hooks only** — class components are legacy code that students shouldn't be writing in 2025.

---

## 🗺️ Course at a Glance

| Week | Focus | Key Deliverable |
|------|-------|-----------------|
| Week 1 | Setup, Git, JSX & First Components | Static Bio Card (3 components) |
| Week 2 | Props & Component Composition | Reusable Product Card with Props |
| Week 3 | State & Events | Interactive Counter + Toggle |
| Week 4 | Lists, Keys & Forms | Controlled Input Form |
| Week 5 | useEffect, Data Fetching & React Router | Multi-Page App with Live Data |
| Week 6 | Context, Custom Hooks & Deployment | Full Capstone App |

**Prerequisites:** HTML + CSS + JavaScript (ES6+), including: arrow functions, destructuring, spread operator, array methods, async/await  
**Tools:** Node.js (LTS), VS Code, Vite, Git & GitHub  
**Next Course:** React Native (or full-stack with Node/Express)

---

## 🎯 Course Philosophy

Five principles to reinforce throughout the course:

1. **One component, one responsibility** — If a component does two things, it should be two components.
2. **Data flows down, events flow up** — Props go from parent to child. Callbacks go from child to parent.
3. **Never mutate state directly** — Always use the state setter function.
4. **Keys are for React, not for humans** — A `key` must be unique and stable. Never use array index as a key in dynamic lists.
5. **Lift state to the nearest common ancestor** — If two siblings need the same state, lift it to their parent.

---

## 📅 Week 1: Setup, Git & React Fundamentals

### Module 1 — The Modern React Environment

**Tutor Guidance:**
This session is heavy on setup. Have students follow along step by step. Common issues: Node not installed, wrong version, Git not configured. Solve these one by one. By end of session, every student should have a running Vite React app pushed to GitHub.

**Scaffolding a Project with Vite:**
```bash
# In your terminal, navigate to where you keep projects
cd ~/projects

# Create a new React + Vite project
npm create vite@latest my-first-app -- --template react

# Navigate into the project
cd my-first-app

# Install dependencies
npm install

# Start the development server
npm run dev
# → Open http://localhost:5173 in your browser
```

**Vite Project Structure:**
```
my-first-app/
├── public/             ← Static assets (favicon, images that don't need processing)
├── src/
│   ├── assets/         ← Images, fonts imported by JS
│   ├── App.jsx         ← Root component — your app starts here
│   ├── App.css         ← Styles for App
│   ├── index.css       ← Global styles
│   └── main.jsx        ← Entry point — renders <App /> into index.html
├── index.html          ← The ONE HTML file in your app
├── vite.config.js
└── package.json
```

**Setting Up Git & GitHub:**
```bash
# Configure Git (one-time setup)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Initialize a repo (if not already)
git init

# Stage all files
git add .

# First commit
git commit -m "feat: initial Vite React project setup"

# Connect to GitHub (create repo on github.com first)
git remote add origin https://github.com/yourusername/my-first-app.git
git branch -M main
git push -u origin main
```

> **Commit Message Convention:** Teach students to write meaningful commit messages from Day 1.  
> - `feat:` — a new feature  
> - `fix:` — a bug fix  
> - `style:` — CSS/formatting changes  
> - `refactor:` — code restructure without feature change  
> - `docs:` — documentation updates

---

### Module 2 — JSX & Your First Components

**Tutor Guidance:**
JSX is not HTML. This distinction must be established clearly. Show the differences side by side. The most common early errors: forgetting `className`, returning multiple elements without a wrapper.

**JSX vs. HTML — Key Differences:**
```jsx
// ❌ HTML syntax — DOES NOT work in JSX
<div class="container">
  <label for="name">Name</label>
  <input type="text">
</div>

// ✅ JSX syntax
<div className="container">
  <label htmlFor="name">Name</label>
  <input type="text" />  {/* Self-closing required! */}
</div>
```

| HTML Attribute | JSX Equivalent | Note |
|----------------|----------------|------|
| `class` | `className` | `class` is a reserved JS keyword |
| `for` | `htmlFor` | `for` is a reserved JS keyword |
| `onclick` | `onClick` | camelCase in JSX |
| `style="color: red"` | `style={{ color: 'red' }}` | Object syntax |
| `<input>` | `<input />` | Self-closing required |

**Writing and Exporting Components:**
```jsx
// src/components/ProfileCard.jsx

// A component is just a function that returns JSX
function ProfileCard() {
  // JavaScript logic lives ABOVE the return
  const name = 'Ada Lovelace';
  const role = 'Full-Stack Developer';
  const joinYear = 2023;
  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - joinYear;

  // The return contains JSX — must return ONE parent element
  return (
    <div className="profile-card">
      <img 
        src="./images/ada.jpg" 
        alt={`Profile photo of ${name}`}  // Dynamic attribute with {}
      />
      <h2>{name}</h2>
      <p className="role">{role}</p>
      <p>{yearsActive} year{yearsActive !== 1 ? 's' : ''} in the community</p>
    </div>
  );
}

// Named export (can have multiple per file)
export { ProfileCard };

// Default export (one per file — use for the main component of a file)
export default ProfileCard;
```

**Using the Component in App.jsx:**
```jsx
// src/App.jsx
import ProfileCard from './components/ProfileCard';

function App() {
  return (
    <div className="app">
      <h1>Our Team</h1>
      {/* Use it like an HTML tag, but PascalCase */}
      <ProfileCard />
      <ProfileCard />  {/* Components are reusable! */}
    </div>
  );
}

export default App;
```

---

## 📅 Week 2: Props & Component Composition

### Module 3 — Props

**Tutor Guidance:**
Props are how components receive data — like function arguments, but for JSX. Emphasise: props flow **only downward** (parent to child). A child cannot change its own props.

**Passing and Receiving Props:**
```jsx
// Parent passes props like HTML attributes
function App() {
  return (
    <div>
      <ProductCard 
        name="Wireless Headphones"
        price={129.99}
        rating={4.5}
        inStock={true}
        imageUrl="./images/headphones.jpg"
      />
      <ProductCard 
        name="Mechanical Keyboard"
        price={89.99}
        rating={4.8}
        inStock={false}
        imageUrl="./images/keyboard.jpg"
      />
    </div>
  );
}

// Child receives props as an object parameter
// Destructure immediately for cleaner code
function ProductCard({ name, price, rating, inStock, imageUrl }) {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p className="price">₦{price.toLocaleString()}</p>
      <p className="rating">⭐ {rating} / 5</p>
      
      {/* Conditional rendering */}
      {inStock 
        ? <button className="btn-primary">Add to Cart</button>
        : <p className="out-of-stock">Out of Stock</p>
      }
    </div>
  );
}
```

**PropTypes (Validation — Teach as Best Practice):**
```jsx
import PropTypes from 'prop-types'; // npm install prop-types

function ProductCard({ name, price, rating, inStock, imageUrl }) {
  // ... component JSX
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number,
  inStock: PropTypes.bool,
  imageUrl: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {
  rating: 0,
  inStock: true,
};
```

**The `children` Prop:**
```jsx
// A generic "wrapper" component using children
function Card({ children, className }) {
  return (
    <div className={`card ${className || ''}`}>
      {children}
    </div>
  );
}

// Usage — anything between the tags becomes `children`
function App() {
  return (
    <Card className="featured">
      <h2>Welcome</h2>
      <p>This content is the children prop.</p>
    </Card>
  );
}
```

---

## 📅 Week 3: State & Events

### Module 4 — useState & Event Handling

**Tutor Guidance:**
State is the most important concept in React. Before touching code, use an analogy: a light switch. The *state* is either ON or OFF. When you *flip the switch* (an event), the *state changes*, and the *UI updates* to reflect the new state. React manages this cycle automatically.

**The useState Hook:**
```jsx
import { useState } from 'react';

function Counter() {
  // useState returns [currentValue, setterFunction]
  // The argument to useState is the INITIAL value
  const [count, setCount] = useState(0);
  
  // When setCount is called, React re-renders this component
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <h2>Score: {count}</h2>
      <button onClick={decrement}>−</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

**⚠️ Never Mutate State Directly:**
```jsx
// ❌ WRONG — React won't detect this change and won't re-render
count = count + 1;
count++;
myArray.push(newItem);
myObject.name = 'New Name';

// ✅ CORRECT — Always use the setter function
setCount(count + 1);
setMyArray([...myArray, newItem]);      // New array with spread
setMyObject({ ...myObject, name: 'New Name' }); // New object with spread
```

**Functional Updates (When new state depends on old state):**
```jsx
// ✅ Use callback form when new value depends on previous
setCount(prevCount => prevCount + 1);

// Why? React batches state updates. The callback guarantees you get
// the most recent value, not a potentially stale closure value.
```

**Multiple State Variables:**
```jsx
function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      setIsSubmitted(true);
    }
  };
  
  if (isSubmitted) {
    return <p>Thanks, {name}! We'll email {email}.</p>;
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your name"
      />
      <input 
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
      />
      <button type="submit">Register</button>
    </form>
  );
}
```

---

## 📅 Week 4: Lists, Keys & Controlled Forms

### Module 5 — Rendering Lists

```jsx
const products = [
  { id: 1, name: 'Laptop', price: 450000 },
  { id: 2, name: 'Mouse', price: 8000 },
  { id: 3, name: 'Monitor', price: 120000 },
];

function ProductList() {
  return (
    <ul>
      {products.map(product => (
        // key MUST be unique and stable — use database IDs, never array index
        <li key={product.id}>
          {product.name} — ₦{product.price.toLocaleString()}
        </li>
      ))}
    </ul>
  );
}
```

> **Why keys matter:** React uses `key` to identify which items changed, were added, or removed. Without unique keys, React re-renders the entire list inefficiently and can cause bugs with input state.

---

## 📅 Week 5: useEffect, Routing & Data Fetching

### Module 6 — useEffect

**Tutor Guidance:**
`useEffect` is the second most important hook. It lets you "sync" your component with the outside world — APIs, timers, subscriptions. The dependency array is the part students get wrong most often.

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function runs AFTER the component renders
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // Dependency array — re-run when userId changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

**Dependency Array Rules:**
```jsx
useEffect(() => {
  // Runs ONCE after first render (like componentDidMount)
}, []);

useEffect(() => {
  // Runs after EVERY render (usually not what you want)
});

useEffect(() => {
  // Runs after first render AND whenever count or userId changes
}, [count, userId]);
```

### React Router (Client-Side Navigation):
```bash
npm install react-router-dom
```
```jsx
// src/main.jsx
import { BrowserRouter } from 'react-router-dom';
// Wrap <App /> in <BrowserRouter>

// src/App.jsx
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} /> {/* Dynamic route */}
      </Routes>
    </>
  );
}
```

---

## 📅 Week 6: Context, Custom Hooks & Deployment

### Module 7 — Context API & Custom Hooks

**Tutor Guidance:**
Context solves "prop drilling" — passing props through many layers of components that don't need them. Use a concrete example: a theme (light/dark mode) that every component needs access to, without passing it as a prop 10 levels deep.

**Context API:**
```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

// Provider component — wraps the part of the app that needs this data
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook — cleaner way to consume context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

**Custom Hook — Abstracting Fetch Logic:**
```jsx
// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage in any component — clean and reusable!
function Posts() {
  const { data: posts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <ul>
      {posts?.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
```

**Deploying to Vercel or Netlify:**
```bash
# Build the project
npm run build
# → Creates /dist folder with production-ready files

# Deploy to Vercel (easiest)
npm install -g vercel
vercel  # Follow the prompts — auto-detects Vite

# OR deploy to Netlify via GitHub
# 1. Push your code to GitHub
# 2. Connect GitHub repo to Netlify
# 3. Set: Build command = npm run build, Publish directory = dist
# 4. Click Deploy — done!
```

---

### 🏆 Final Capstone: Full React Application

Students build a multi-page React app of their choice. Suggested ideas:
- **Job Board** — Lists jobs fetched from an API, with detail pages and a filter
- **Movie Finder** — Search movies via TMDB API, save favourites to localStorage
- **Personal Finance Tracker** — CRUD app with context for global state

**Evaluation Rubric:**

| Criterion | Points |
|-----------|--------|
| Project scaffolded with Vite and pushed to GitHub | 5 |
| Minimum 5 functional components, each in its own file | 10 |
| Props used to pass data between components | 10 |
| At least 3 `useState` hooks used correctly | 15 |
| `useEffect` used for data fetching with loading/error states | 15 |
| Lists rendered with `.map()` and unique `key` props | 10 |
| React Router with at least 3 routes | 15 |
| No direct state mutation | 10 |
| App deployed live (Vercel or Netlify) | 10 |
| **Total** | **100** |

---

## 📚 Recommended Resources

- **React Docs:** [react.dev](https://react.dev) — The official, modern React documentation (hooks-based)
- **Vite Docs:** [vitejs.dev](https://vitejs.dev)
- **React Router Docs:** [reactrouter.com](https://reactrouter.com)
- **Free APIs for Projects:** TMDB (movies), Open Library (books), REST Countries, PokéAPI

---

*Deejoft Coding School — Instructor Materials | React Track*  
*Last Updated: 2025*
