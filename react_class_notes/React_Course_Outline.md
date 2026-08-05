# Comprehensive React Course: From Fundamentals to Modern Web Apps

## Course Overview

This course is designed for developers with a solid understanding of HTML, CSS, and modern JavaScript (ES6+) — specifically, the same portfolio site you already built in those three courses. Here, you **rebuild that exact portfolio as a React SPA**: the same name, bio, and skills; the same Featured Work projects (now fetched live from GitHub); the same contact form; the same dark-mode toggle — but now as reusable, component-based, routed architecture instead of hand-written DOM manipulation. We focus 100% on functional components and hooks, using **Vite** for development and **Git/GitHub** for version control from day one.

* **Target Audience:** Students who have completed the HTML, CSS, and JavaScript courses (or have equivalent knowledge of semantic HTML, CSS layout, and vanilla JS DOM/fetch work).
* **Tools:** Node.js (LTS), VS Code, Vite, Git/GitHub, a modern browser.
* **Goal:** By the end of this course, students will be able to independently build a routed, component-based React application with real data fetching, global state, and forms — and will have rebuilt their own portfolio as a deployed, professional-grade SPA.

---

## Week 1: Setup, Git, & React Fundamentals

### Module 1: The Modern React Environment

* **Learning Objectives:**
    * Explain what React is, its declarative nature, and the concept of a "component."
    * Set up a local development environment (Node.js, VS Code).
    * Understand the basics of version control with **Git** and **Github**.
    * Initialize a new React project using **Vite**.
    * Understand the Vite project structure and run the dev server.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is React?** | 30 mins | 15 mins |
| Declarative, Component-Based. | - Virtual DOM (briefly). | - Break your own real portfolio (`index.html`/`about.html`/`contact.html`) down into components: `Header`, `Bio`, `ProjectCard`, `ContactForm`. |
| **Tools & Setup** | 45 mins | 30 mins |
| Installing Node.js & npm. | - VS Code setup (ES7+ React snippets). | - Install Node and recommended VS Code extensions. |
| **Intro to Git & Github** | 45 mins | 30 mins |
| What is version control? | - `git init`, `add`, `commit`. | - Create a new Github repo for `portfolio-react`. |
| **Scaffolding with Vite** | 30 mins | 30 mins |
| Vite vs. Create React App. | - Why Vite is faster (ESM, HMR). | - Run `npm create vite@latest portfolio-react -- --template react`. |

### Module 2: JSX & Your First Components

* **Learning Objectives:**
    * Write and understand JSX syntax.
    * Differentiate JSX from HTML (e.g., `className`, `htmlFor`).
    * Embed JavaScript expressions inside JSX.
    * Create and render your first functional components.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is JSX?** | 45 mins | 30 mins |
| JavaScript XML, not HTML. | - Single parent element, self-closing tags. | - Clear the default `App.jsx`; render your real name in an `<h1>`. |
| **JavaScript in JSX** | 45 mins | 30 mins |
| Curly braces `{}` for expressions. | - Inline `style` objects (briefly). | - Render your real bio text using a variable and `{}`. |
| **Functional Components** | 1 hour | 45 mins |
| A component is a function returning JSX. | - `export default` / `import`. | - Build real `Header.jsx`, `Bio.jsx`, and a first, hardcoded `ProjectCard.jsx`. |

**Week 1 Assignment:** Scaffold your portfolio as a React app, and rebuild your header and bio.
* Scaffold `portfolio-react` with Vite, push to a new Github repo.
* Build `Header.jsx` (your real name/logo + nav placeholder), `Bio.jsx` (your real About Me text from HTML Week 1-2), and one hardcoded `ProjectCard.jsx` (your first real Featured Work project).
* Assemble them in `App.jsx`.
* Commit with meaningful messages as you go.

---

## Week 2: State, Props, & Interactivity

### Module 3: Props (Passing Data)

* **Learning Objectives:**
    * Pass data from a parent component to a child component using `props`.
    * Destructure `props` in the child component.
    * Use `props.children` to wrap components.
    * Render a small array of real data with `.map()` and the `key` prop (a first look — Week 3 goes deeper).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What are Props?** | 45 mins | 30 mins |
| Passing data "down the tree." | - Props are read-only. | - Make `ProjectCard` accept `{ title, description, tags, imageSrc }` props instead of hardcoded content. |
| **Rendering Your Real Projects** | 1 hour | 45 mins |
| A small `projects` array (matching your JS course's data). | - `.map()` + the `key` prop (first look). | - Render all 3 of your real projects (Weather App, Task Tracker, This Portfolio) via `projects.map(p => <ProjectCard key={p.id} {...p} />)`. |
| **`props.children`** | 30 mins | 30 mins |
| Creating "wrapper" components. | - `function Badge({ children })`. | - Build a `Badge.jsx` and use it for your real "Featured" badge on one card. |

### Module 4: State (`useState`) & Events

* **Learning Objectives:**
    * Understand the difference between `props` and `state`.
    * Import and use the `useState` hook.
    * Handle user events like `onClick`.
    * Filter a real array of data based on state.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is State?** | 45 mins | 30 mins |
| Memory for a component. | - `props` vs. `state`. | - (Warm-up) Build a throwaway `Counter.jsx` to drill `useState` mechanics before applying it for real. |
| **Real Tag Filtering** | 1.5 hours | 1 hour |
| `useState` holding a `selectedTag`. | - Filtering an array before `.map()`-ing it. | - Add tag buttons (e.g., "All", "React Native", "Python") above your Featured Work grid. |
| **Updating State** | 45 mins | 30 mins |
| The setter function. | - State updates trigger re-renders. | - Clicking a tag button calls `setSelectedTag`, and `projects.filter(...)` re-renders only matching cards. |

**Week 2 Assignment:** Make your real Featured Work section prop-driven and filterable.
* Refactor `ProjectCard` to accept props; render your real `projects` array via `.map()`.
* Build `Badge.jsx` using `props.children` for your "Featured" badge.
* Add `useState`-driven tag filter buttons that filter the rendered projects live.

---

## Week 3: Lifecycle, Conditionals, & Data Fetching

### Module 5: Conditional Rendering & Lists (Deep Dive)

* **Learning Objectives:**
    * Render JSX conditionally using `if`, ternary, and `&&`.
    * Understand *why* `.map()` needs a `key`, and why not to use the array index once data can reorder.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Conditional Rendering** | 1 hour | 45 mins |
| Ternary, `&&`, early return. | - Loading/error/empty states. | - Add an early return in your Featured Work section for "No projects match this tag." |
| **The `key` Prop, Properly** | 1 hour | 45 mins |
| Why keys must be stable and unique. | - What breaks if you use the array index. | - Confirm your real `projects` use a real `id`, not their array index, as the `key`. |

### Module 6: The `useEffect` Hook (Side Effects)

* **Learning Objectives:**
    * Explain what a "side effect" is.
    * Use `useEffect` to run code after render, with a dependency array.
    * Write a cleanup function.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What are Side Effects?** | 45 mins | 30 mins |
| Code that affects "the outside world." | - `useEffect(callback, dependencies)`. | - (Lecture) Log "component mounted" with `useEffect(..., [])`. |
| **The Dependency Array** | 1 hour | 45 mins |
| `[]` runs once on mount. | - `[dep]` re-runs on change. | - Preview: an empty array is exactly what you'll use to fetch your GitHub repos once, next. |

### Module 7: Real Data Fetching with `useEffect`

* **Learning Objectives:**
    * Fetch data from a real, public API (the GitHub REST API) inside `useEffect`.
    * Store fetched data in state, alongside your existing static `projects` array.
    * Handle loading and error states.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Fetching Your Real Repos** | 1 hour | 45 mins |
| `fetch()` inside `useEffect(..., [])`. | - `async function` *inside* the effect (not on it). | - Fetch `api.github.com/users/<you>/repos` in a `useEffect`. |
| **Loading & Error States** | 45 mins | 30 mins |
| `data`, `loading`, `error` state. | - `try...catch` for errors. | - Show "Loading GitHub projects..." / an error message / the merged project list. |

**Week 3 Assignment:** Fetch your real GitHub repos into your Featured Work section.
* Add `githubRepos`, `loading`, and `error` state.
* `useEffect(..., [])` to fetch your real repos on mount, mapped into the same shape as your static `projects`.
* Render the combined list (`[...projects, ...githubRepos]`), each still using a stable `key`.
* Handle and display loading/error states.

---

## Week 4: Forms, Styling, & Refs

### Module 8: Advanced Forms

* **Learning Objectives:**
    * Create a "controlled component" by linking form inputs to state.
    * Handle `onChange` for multiple inputs with one function and computed property names.
    * Handle submission with `onSubmit` and validation.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Controlled Components** | 1 hour | 45 mins |
| `value={state}` / `onChange={...}`. | - Your real form: name, email, reason, contact method, message. | - Rebuild your real contact form's fields as controlled inputs. |
| **Single State Object** | 1 hour | 45 mins |
| `useState({ name: '', email: '', ... })`. | - Computed property names (`[e.target.name]`). | - Refactor to one `formData` state object with a single `handleChange`. |
| **Submission & Validation** | 45 mins | 30 mins |
| `onSubmit` + `event.preventDefault()`. | - Reusing your JS course's validation rules. | - Validate email format and message length; show inline errors. |

### Module 9: Styling React Components

* **Learning Objectives:**
    * Compare styling strategies.
    * Implement **CSS Modules** for locally-scoped, conflict-free styling.
    * Conditionally apply classes.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **CSS Modules** | 1 hour | 45 mins |
| `[Component].module.css`. | - `import styles from './X.module.css'`. | - Create `ProjectCard.module.css` and `ContactForm.module.css`. |
| **Conditional Classes** | 30 mins | 30 mins |
| Template literals for combining classes. | - A `--featured` modifier class, ported from your CSS course's BEM naming. | - Apply `styles.featured` conditionally on your Featured project's card. |

### Module 10: `useRef` Hook

* **Learning Objectives:**
    * Use `useRef` to access a DOM element directly.
    * Understand that refs don't trigger re-renders.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Accessing the DOM** | 45 mins | 30 mins |
| `const ref = useRef(null)` / `ref={ref}`. | - `ref.current.focus()`. | - Auto-focus your contact form's name field on mount using `useEffect` + `useRef`. |

**Week 4 Assignment:** Rebuild your real contact form as a controlled, styled, accessible component.
* `ContactForm.jsx` with a single `formData` state object covering all your real fields.
* Validate on submit (email format, message length) and show inline errors.
* Style with `ContactForm.module.css`.
* Auto-focus the first field with `useRef`.

---

## Week 5: Routing & Global State

### Module 11: Client-Side Routing with React Router

* **Learning Objectives:**
    * Install and configure **React Router** (`createBrowserRouter`/`RouterProvider`).
    * Create Layout, Index, and Error routes.
    * Navigate using `<Link>`.
    * Create a dynamic project-detail route with `useParams`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Configuring Routes** | 1 hour | 45 mins |
| `createBrowserRouter`, `RouterProvider`. | - `<Outlet />` for your shared header/footer layout. | - Set up real routes: `/`, `/projects`, `/projects/:id`, `/contact`. |
| **Navigation** | 30 mins | 30 mins |
| `<Link>` vs. `<a>`. | - Update your real `Header`'s nav to use `<Link>`. | - Replace your static nav links with `<Link to="/">`, etc. |
| **Dynamic Routes** | 1 hour | 45 mins |
| `path: "/projects/:id"`. | - `useParams()`. | - Build `ProjectDetail.jsx` — a real, new page each project didn't have as a static site. |

### Module 12: Global State with Context API

* **Learning Objectives:**
    * Explain "prop drilling."
    * Create, provide, and consume a Context.
    * Rebuild your dark-mode toggle from the JS course as real global state.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Creating Context** | 30 mins | 30 mins |
| `createContext`, a custom Provider component. | - `ThemeContext.jsx`. | - Build `ThemeContext` holding `theme` + `toggleTheme`. |
| **Provider & Persistence** | 45 mins | 45 mins |
| Wrapping the whole app. | - Reading/writing `localStorage` inside the Provider. | - Persist the theme choice, same as your JS course's dark mode, but now via Context. |
| **Consuming Context** | 45 mins | 30 mins |
| `useContext(ThemeContext)`. | - A `ThemeToggleButton.jsx`. | - Use it anywhere in the app without prop drilling. |

**Week 5 Assignment:** Turn your portfolio into a real, routed, multi-page SPA with global dark mode.
* Real routes: `/` (Home/About), `/projects` (all projects), `/projects/:id` (detail page), `/contact`.
* A shared `Layout` (Header with `<Link>` nav + `<Outlet />` + Footer).
* `ThemeContext` providing app-wide dark mode, persisted to `localStorage`.

---

## Week 6: Advanced React & Final Project

### Module 13: Creating Custom Hooks

* **Learning Objectives:**
    * Identify repetitive logic to extract into a custom hook.
    * Build and use `useFetch`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Building `useFetch`** | 1.5 hours | 1 hour |
| Extracting Week 3's GitHub-fetch logic. | - Returning `{ data, loading, error }`. | - Refactor your Week 3 GitHub fetching into `useFetch(url)`, used by both `Projects` and `ProjectDetail`. |

### Module 14: Performance & Advanced Hooks

* **Learning Objectives:**
    * Understand unnecessary re-renders.
    * Use `React.memo`, `useMemo`, and `useCallback` appropriately.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Memoization** | 1 hour | 45 mins |
| `React.memo` on `ProjectCard`. | - `useMemo` for the filtered project list. | - Wrap `ProjectCard` in `React.memo`; memoize the tag-filtered list so it's not recomputed on unrelated state changes. |

### Module 15: Final Project Workshop & Deployment

* **Learning Objectives:**
    * Deploy a Vite React app to Netlify or Vercel.
    * Ship the finished, real portfolio SPA.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Deployment** | 45 mins | 45 mins |
| `npm run build`, the `dist` folder. | - Connecting Github to Netlify/Vercel for CI/CD. | - Deploy `portfolio-react` live. |

**Week 6 / Final Project:** Ship your portfolio, rebuilt as a React SPA.
* **Goal:** Combine everything from all 6 weeks into the finished, live version of your portfolio.
* **Routes:** `/`, `/projects`, `/projects/:id`, `/contact` (matching Week 5).
* **Data:** Your real `projects` merged with live GitHub repos, both fetched through your `useFetch` hook.
* **State:** `ThemeContext` for dark mode; local `useState` for the tag filter and contact form.
* **Performance:** `ProjectCard` wrapped in `React.memo`; the filtered list memoized with `useMemo`.
* **Deployment:** Live on Netlify or Vercel — this is the same portfolio from HTML Week 1, now on its 4th and final rebuild.
