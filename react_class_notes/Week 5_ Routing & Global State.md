# Week 5: Routing & Global State

Welcome to Week 5! Up until now, everything has lived in one big `App.jsx`. This week, you unlock the full potential of React: turning your portfolio into a real, **multi-page** experience with **React Router** — including a project detail page your static site never had — and rebuilding your JS course's dark-mode toggle as real global state with the **Context API**.

---

## 🗺️ Module 11: Client-Side Routing with React Router

**Objective:** Transform your single `App.jsx` into a real, navigable, multi-page portfolio.

### 1. SPA vs. Traditional Routing

* **Traditional (MPA):** Clicking `<a href="/about">` destroys the page and requests a new HTML file — exactly what your HTML/CSS/JS courses did with `index.html`/`about.html`/`contact.html`.
* **Single Page App (SPA):** JavaScript intercepts the click, updates the URL, and swaps components — no reload, no flash of white.

### 2. Setup & Configuration

```bash
npm install react-router-dom
```

**The Modern Setup (`createBrowserRouter`):**

```jsx
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx' // Now your Layout, not your whole page
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Contact from './pages/Contact.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:id", element: <ProjectDetail /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```
*These four routes replace your three static pages — `Home` absorbs your old `index.html` intro/bio, `Projects` is your Featured Work grid, `Contact` is your form, and `ProjectDetail` is a genuinely new page your static site never had.*

### 3. The Layout Pattern (`<Outlet />`)

* **Lecture & Concepts:**
    * You want your `Header` and `Footer` to stay visible while the page content changes. `<Outlet />` tells React *where* to render the current child route.

* **Practical Application (Your Real Header, Now With `<Link>`):**
    ```jsx
    // src/App.jsx (this is now your Layout, not a page)
    import { Outlet, Link } from "react-router-dom";
    import Header from './components/Header.jsx';
    import Footer from './components/Footer.jsx';

    export default function App() {
      return (
        <>
          <Header /> {/* Update Header's nav to use <Link>, shown below */}
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      );
    }
    ```
    ```jsx
    // src/components/Header.jsx, updated
    import { Link } from "react-router-dom";

    export default function Header() {
      return (
        <header>
          <h1>Alice Chen</h1>
          <nav>
            {/* CRITICAL: Link, not <a> — <a> would cause a full reload */}
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>
      );
    }
    ```

### 4. Dynamic Routes (`useParams`)

* **Lecture & Concepts:**
    * A dynamic segment (`:id`) lets one route definition serve every project, without writing one route per project.

* **Practical Application (Your Real Project Detail Page):**
    ```jsx
    // src/pages/ProjectDetail.jsx
    import { useParams } from 'react-router-dom';

    export default function ProjectDetail() {
      const { id } = useParams();

      // For now, find it in your static array (Week 6's useFetch will generalize this)
      const project = projects.find(p => String(p.id) === id);

      if (!project) return <p>Project not found.</p>;

      return (
        <article>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <ul>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </article>
      );
    }
    ```
    * On your `Projects` page, wrap each card's title in a `<Link to={`/projects/${project.id}`}>` so clicking a project navigates to its own real page.

---

## 📡 Module 12: Global State with Context API

**Objective:** Rebuild your JS course's dark-mode toggle as real, prop-drilling-free global state.

### 1. The "Prop Drilling" Problem

* Imagine passing `theme` from `App` down through `Header` → `Nav` → `ThemeButton`, even though `Header` and `Nav` never use it themselves. That's **prop drilling**.

### 2. The Context Solution: Create, Provide, Consume

**Step A: Create the Context**

```jsx
// src/context/ThemeContext.jsx
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Read the saved theme on first load — same idea as your JS course's localStorage check
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```
*Compare this to your JS Week 5 dark-mode code: same `localStorage` persistence, same `??` fallback — but now the state lives in one place (the Provider) instead of being manually read/written every time the button is clicked.*

**Step B: Provide the Context**

```jsx
// src/main.jsx
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
)
```

**Step C: Consume the Context, Anywhere**

```jsx
// src/components/ThemeToggleButton.jsx
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
```
* Drop `<ThemeToggleButton />` into your real `Header` — no prop drilling needed, even though `Header` lives several files away from `ThemeProvider`.

---

## 🏗️ Week 5 Assignment: Turn Your Portfolio Into a Real, Routed SPA

**Objective:** Real multi-page navigation and app-wide dark mode.

### 1. Setup
1.  `npm install react-router-dom`.
2.  Turn `App.jsx` into your Layout (`Header` + `<Outlet />` + `Footer`).

### 2. Routing Structure

Configure `createBrowserRouter` with:
* `/` → **Home**: your real bio/intro (from HTML Week 1-2).
* `/projects` → **Projects**: your real, filterable, GitHub-fetched Featured Work grid (Weeks 2-3).
* `/projects/:id` → **ProjectDetail**: a real page per project, using `useParams`.
* `/contact` → **Contact**: your real controlled form (Week 4).

### 3. Global Theme Context

1.  Build `ThemeContext.jsx` exactly as shown above, including `localStorage` persistence.
2.  Wrap your router in `<ThemeProvider>`.
3.  Add a real `ThemeToggleButton` to your `Header`, visible on every route.
4.  Confirm the theme survives navigating between pages *and* a full page refresh.

### 4. Submission
* `git commit -m "feat: Setup Router with real portfolio routes"`
* `git commit -m "feat: Build ProjectDetail dynamic route"`
* `git commit -m "feat: Implement ThemeContext with localStorage persistence"`
* Push to Github.
