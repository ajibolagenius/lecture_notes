# Comprehensive React Course: From Fundamentals to Modern Web Apps

## Course Overview

This course is designed for developers with a solid understanding of HTML, CSS, and modern JavaScript (ES6+). It takes you from the core concepts of React to building complex, interactive, and fast single-page applications (SPAs). We will focus 100% on functional components and hooks, using modern tools like **Vite** for development and **Git/Github** for version control from day one.

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
| The "Why": Declarative, Component-Based. | - Virtual DOM (briefly). | - Analyze a website and break it down into "components." |
| **Tools & Setup** | 45 mins | 30 mins |
| Installing Node.js & npm. | - VS Code setup (extensions like ES7+ React snippets). | - Install Node and recommended VS Code extensions. |
| **Intro to Git & Github** | 45 mins | 30 mins |
| What is version control? | - `git init`, `add`, `commit`. | - Create a new repository on Github. |
| Why Git is essential. | - `git remote add`, `push`. | - Initialize Git in a new local folder and make your first commit. |
| **Scaffolding with Vite** | 30 mins | 30 mins |
| Vite vs. Create React App (CRA). | - Why Vite is faster (ESM, HMR). | - Run `npm create vite@latest` to scaffold a new React project. |
| Project structure (`index.html`, `main.jsx`, `App.jsx`). | - `npm install` and `npm run dev`. | - Run the dev server. Push your new Vite project to your Github repo. |

### Module 2: JSX & Your First Components

* **Learning Objectives:**
    * Write and understand JSX syntax.
    * Differentiate JSX from HTML (e.g., `className`, `htmlFor`).
    * Embed JavaScript expressions (variables, functions) inside JSX.
    * Create and render your first functional component.
    * Understand how to import and export components (ES6 modules).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is JSX?** | 45 mins | 30 mins |
| JavaScript XML. | - JSX is *not* HTML. | - Clean out the default `App.jsx` file. |
| JSX Rules: Single parent element, `className`. | - Self-closing tags. | - Write a simple "Hello, React!" `<h1>` in `App.jsx`. |
| **JavaScript in JSX** | 45 mins | 30 mins |
| Using curly braces `{}`. | - Variables, simple math, function calls. | - Create a `const name = 'User'` and render `<h1>Hello, {name}</h1>`. |
| Attributes in JSX. | - JS objects for inline `style` (briefly). | - Add an `img` tag with `src` and `alt` attributes. |
| **Functional Components** | 1 hour | 45 mins |
| What is a component? | - Creating a function that returns JSX. | - Create a new file: `Header.jsx`. |
| Reusability (DRY). | - Exporting (`export default`) and Importing (`import`). | - Build a `<Header />` component in its own file. |
| Nesting components. | - PascalCase naming convention. | - Import and render your `<Header />` component inside `App.jsx`. |

**Week 1 Assignment:** Build a "Static Bio Page".
* Create a new Vite project and push it to a new Github repo.
* Create a main `App.jsx` component.
* Create **three** separate child components:
    1.  `ProfilePicture.jsx` (displays an `<img>`).
    2.  `Bio.jsx` (contains an `<h1>` with your name and `<p>` with a description).
    3.  `ContactLinks.jsx` (contains a `<ul>` of `<a>` tags to your social media).
* Assemble all three components inside `App.jsx` to build the page.
* Style it using a simple external `index.css` file.
* **Commit your changes** with a meaningful message (e.g., "feat: Build static bio page").

---

## Week 2: State, Props, & Interactivity

### Module 3: Props (Passing Data)

* **Learning Objectives:**
    * Pass data from a parent component to a child component using `props`.
    * Destructure `props` in the child component.
    * Use `props.children` to wrap components.
    * Understand that `props` are read-only (immutable).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What are Props?** | 45 mins | 30 mins |
| Passing data "down the tree." | - `props` is an object. | - Create a `User.jsx` component. |
| **Passing & Receiving** | 1 hour | 45 mins |
| Passing as attributes: `<User name="Alex" />`. | - Receiving the `props` object. | - In `App.jsx`, render `<User name="Alex" age={30} />`. |
| Destructuring: `function User({ name, age })`. | - Passing non-string types (`{}`). | - In `User.jsx`, receive and display the `name` and `age` props. |
| **`props.children`** | 30 mins | 30 mins |
| Creating "wrapper" components. | - `function Card({ children })`. | - Create a `Card.jsx` component. |
| | | - In `App.jsx`, use it: `<Card><h1>Hello</h1></Card>`. The `Card` should render this content. |

### Module 4: State (`useState`) & Events

* **Learning Objectives:**
    * Understand the difference between `props` and `state`.
    * Import and use the `useState` hook to manage component state.
    * Handle user events like `onClick` and `onChange`.
    * Write event handler functions to update state.
    * Understand the principle of immutability when updating state.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is State?** | 45 mins | 30 mins |
| Memory for a component. | - `props` vs. `state`. | - Create a new `Counter.jsx` component. |
| The `useState` Hook | - `import { useState } from 'react'`. | - Import `useState`. |
| Array destructuring: `const [count, setCount] = useState(0)`. | | - Initialize a `count` state variable to `0`. |
| **Handling Events** | 45 mins | 30 mins |
| Event listeners in JSX (`onClick`). | - Defining the handler function. | - Add a `<button>` to your `Counter`. |
| Inline vs. separate functions. | | - Add an `onClick` attribute that calls a `handleClick` function. |
| **Updating State** | 1 hour | 45 mins |
| The "setter" function (`setCount`). | - State updates trigger re-renders. | - Inside `handleClick`, call `setCount(count + 1)`. |
| Immutability. | - Updating state based on *previous* state. | - Log the `count` to the console and see the new value. |
| Using a callback: `setCount(prevCount => prevCount + 1)`. | | - Refactor to use the "previous state" callback. |

**Week 2 Assignment:** Build a "Simple To-Do List".
* Create a `TodoList.jsx` component.
* It should have an `input` field and an "Add" `button`.
* Use `useState` to hold the *current text* in the input.
* Use `useState` to hold an *array of to-do items* (e.g., `['Learn React', 'Do laundry']`).
* When the button is clicked, it should add the current input text to the to-do items array.
* Render the array as a `<ul>` below the input.
* **Bonus:** Add a "Remove" button next to each to-do item that, when clicked, removes that item from the array. (Hint: You'll need to `filter` the array and `set` the new array).
* **Commit your changes** to Github.

---

## Week 3: Lifecycle, Conditionals, & Data Fetching

### Module 5: Conditional Rendering & Lists

* **Learning Objectives:**
    * Render JSX conditionally using `if` statements, ternary operators, and `&&`.
    * Render arrays of data into JSX using the `.map()` method.
    * Understand the importance of the `key` prop and how to use it.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Conditional Rendering** | 1 hour | 45 mins |
| Ternary operator: `isLoggedIn ? <User /> : <Guest />`. | - Short-circuiting with `&&`. | - Create a `Login.jsx` component with an `isLoggedIn` state (boolean). |
| Returning `null`. | - Show "Welcome back!" or "Please log in." based on the state. |
| **Rendering Lists** | 1 hour | 45 mins |
| Using `.map()` to transform data to JSX. | - `const jsxElements = data.map(...)`. | - Take your To-Do list array from last week. |
| The `key` prop. | - Why `key` is essential for performance. | - Use `.map()` to render the `<li>` elements dynamically. |
| Using `id` as a `key`. | - What *not* to use as a key (index). | - Add a unique `id` to each to-do object and use it as the `key`. |

### Module 6: The `useEffect` Hook (Side Effects)

* **Learning Objectives:**
    * Explain what a "side effect" is (e.g., API calls, timers, subscriptions).
    * Import and use the `useEffect` hook to run code after render.
    * Understand the "dependency array" (`[]`).
    * Use the dependency array to re-run effects when state or props change.
    * Write a "cleanup" function returned from `useEffect`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What are Side Effects?** | 45 mins | 30 mins |
| Code that affects "the outside world." | - `useEffect(callback, dependencies)`. | - Create a `Timer.jsx` component. |
| **The Dependency Array** | 1.5 hours | 1 hour |
| `[]` (runs once on mount). | - `[prop, state]` (runs when they change). | - Use `useEffect` with `[]` to log "Component mounted" to the console. |
| No array (runs on *every* render - careful!). | - The "cleanup" function (for unmounting). | - Add a `count` state. Add a *second* `useEffect` that logs "Count changed" and put `count` in its dependency array. |
| **Cleanup Function** | 30 mins | 30 mins |
| `return () => { ... }` | - Preventing memory leaks. | - Use `useEffect` to create a `setInterval`. Return a cleanup function that runs `clearInterval`. |

### Module 7: Data Fetching with `useEffect`

* **Learning Objectives:**
    * Fetch data from a public API (e.g., JSONPlaceholder) inside a `useEffect` hook.
    * Store the fetched data in state.
    * Handle loading and error states.
    * Use `async/await` within the `useEffect` hook correctly.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Fetching Strategy** | 1 hour | 45 mins |
| `fetch()` in `useEffect(..., [])`. | - Handling the `Response` (`.json()`). | - Create a `PostFetcher.jsx` component. |
| `async/await` in `useEffect`. | - `async function` *inside* the effect. | - Write an `async function fetchData()` inside your `useEffect`. |
| **Loading & Error States** | 45 mins | 30 mins |
| Using state for `data`, `loading`, `error`. | - `try...catch` for errors. | - Add `loading` (boolean) and `error` (null/string) state. |
| Conditional rendering for states. | | - Set `loading` to true before fetch, false after. |
| | | - Show "Loading...", the error message, or the data list. |

**Week 3 Assignment:** Build a "Blog Post" viewer.
* Use the JSONPlaceholder API (e.g., `https/jsonplaceholder.typicode.com/posts`).
* Create a `PostsList.jsx` component.
* On mount, `useEffect` to fetch all posts.
* Store the posts in state.
* Display "Loading..." while fetching.
* Display an error message if the fetch fails.
* Once loaded, `.map()` over the posts array and render a list of post `title`s.
* **Commit your changes** to Github.

---

## Week 4: Forms, Styling, & Refs

### Module 8: Advanced Forms

* **Learning Objectives:**
    * Create a "controlled component" by linking form `input`s to state.
    * Handle `onChange` for multiple inputs with a single function.
    * Handle form submission with `onSubmit` and `event.preventDefault()`.

| Topic | Lecture/Concept (Est.Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Controlled Components** | 1 hour | 45 mins |
| The "React" way to handle forms. | - `value={state}` and `onChange={setState}`. | - Create a `LoginForm.jsx` component. |
| `input`, `textarea`, `select`. | | - Add state for `username` and `password`. |
| | | - Link the `value` and `onChange` of two inputs to their state. |
| **Handling Form State** | 1 hour | 45 mins |
| Single state object: `useState({ user: '', pass: '' })`. | - Computed property names (`[e.target.name]`). | - Refactor to use a single state object for the form data. |
| **Form Submission** | 30 mins | 30 mins |
| The `<form>` `onSubmit` event. | - `event.preventDefault()`. | - Wrap inputs in a `<form>` tag. |
| | | - Add an `onSubmit` handler that logs the form state. |

### Module 9: Styling React Components

* **Learning Objectives:**
    * Compare different styling strategies (CSS, CSS Modules, CSS-in-JS, Utility).
    * Implement **CSS Modules** for locally-scoped, conflict-free styling.
    * Conditionally apply classes using template literals or a library like `clsx`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Styling Options** | 45 mins | 15 mins |
| Global CSS (the "old" way). | - CSS-in-JS (Styled Components). | - (Lecture) Pros and cons of each. |
| Utility-First (Tailwind CSS). | - **CSS Modules** (the "Vite" way). | |
| **CSS Modules** | 1 hour | 45 mins |
| `[filename].module.css`. | - `import styles from './Button.module.css'`. | - Create a `Button.jsx` component. |
| Using `styles.myClass`. | - Local scope by default. | - Create `Button.module.css` with a `.button` class. |
| | | - Import and apply the class: `className={styles.button}`. |
| **Conditional Classes** | 30 mins | 30 mins |
| Using props to change styles. | - `className={isPrimary ? styles.primary : ''}`. | - Add a `primary` prop to your button. |
| Template literals. | - `clsx` library (briefly). | - Conditionally apply a `styles.primary` class. |

### Module 10: `useRef` Hook

* **Learning Objectives:**
    * Import and use the `useRef` hook to create a "ref."
    * Understand that `useRef` does *not* trigger a re-render.
    * Use a ref to access DOM elements directly (e.g., to focus an input).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is a Ref?** | 30 mins | 15 mins |
| An "escape hatch" to the DOM. | - The `ref.current` property. | - (Lecture) `useRef` vs. `useState`. |
| **Accessing the DOM** | 45 mins | 30 mins |
| The `ref` attribute in JSX. | - `const myRef = useRef(null)`. | - In your `LoginForm.jsx`, create a ref. |
| `ref={myRef}`. | | - Attach the ref to the `username` input. |
| **Practical Use Case** | 30 mins | 30 mins |
| Focusing an input on mount. | - `myRef.current.focus()`. | - Use `useEffect(..., [])` to call `myRef.current.focus()` when the component mounts. |

**Week 4 Assignment:** Build an "Invoice" or "Tip" Calculator.
* Create a form with inputs for "Bill Amount," "Number of People," and "Tip Percentage" (can be a `<select>` or buttons).
* Use **controlled components** for all inputs.
* Style the entire application using **CSS Modules**.
* As the user types, calculate and display the "Tip per person" and "Total per person."
* Add a "Reset" button that clears all inputs and calculations.
* **Bonus:** Use `useRef` to auto-focus the "Bill Amount" input on page load.
* **Commit your changes** to Github.

---

## Week 5: Routing & Global State

### Module 11: Client-Side Routing with React Router

* **Learning Objectives:**
    * Install and set up **React Router** (`react-router-dom`).
    * Configure routes using `createBrowserRouter` and `RouterProvider`.
    * Create `Layout`, `Index`, and `Error` routes.
    * Navigate between pages using the `<Link>` component.
    * Create dynamic routes and access URL parameters using `useParams`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is a SPA?** | 30 mins | 30 mins |
| Client-Side vs. Server-Side routing. | - `npm install react-router-dom`. | - Install React Router. |
| **Configuring Routes** | 1 hour | 45 mins |
| `createBrowserRouter`. | - `RouterProvider`. | - Set up `main.jsx` with a browser router. |
| `<Outlet />` for layouts. | - `element`, `path`, `errorElement`. | - Create `HomePage.jsx` and `AboutPage.jsx`. |
| **Navigation** | 30 mins | 30 mins |
| `<a>` vs. `<Link>`. | - The `to` prop. | - Create a `Navbar.jsx` component. |
| | | - Use `<Link to="/">Home</Link>` and `<Link to="/about">About</Link>`. |
| **Dynamic Routes** | 1 hour | 45 mins |
| `path: "/posts/:postId"`. | - The `useParams` hook. | - Create a `PostDetailPage.jsx` component. |
| | | - Add a dynamic route for it. |
| | | - In the component, use `useParams` to get the `postId` and display it. |

### Module 12: Global State with Context API

* **Learning Objectives:**
    * Explain "prop drilling" and why it's a problem.
    * Use `createContext` to create a new context.
    * Provide a context value using the `<MyContext.Provider>` component.
    * Consume a context value using the `useContext` hook.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The "Prop Drilling" Problem** | 45 mins | 30 mins |
| Passing props through many levels. | - When to use Context (and when not to). | - (Diagram) Show a prop-drilling example. |
| **Creating Context** | 30 mins | 30 mins |
| `createContext(defaultValue)`. | - Creating a `ThemeContext.js` file. | - Create a new context for `theme`. |
| **The Provider** | 45 mins | 30 mins |
| `<MyContext.Provider value={...}>`. | - Wrapping your app (or part of it). | - In `App.jsx`, wrap your app in `<ThemeContext.Provider>`. |
| **Consuming Context** | 45 mins | 30 mins |
| `useContext(MyContext)`. | - Accessing the value. | - Create a `ThemeToggleButton.jsx`. |
| | | - Use `useContext` to get the theme and a function to change it. |

**Week 5 Assignment:** Convert your "Blog Post" app into a multi-page site.
* Use **React Router** to create three routes:
    1.  `/` (Home): A simple welcome page.
    2.  `/posts` (Posts): Your `PostsList.jsx` component from Week 3.
    3.  `/posts/:postId`: A new `PostDetail.jsx` component.
* When a user clicks a post title on the `/posts` page (use `<Link>`), it should navigate them to `/posts/1` (or similar).
* The `PostDetail.jsx` component should:
    1.  Use `useParams` to get the `postId`.
    2.  `useEffect` to fetch data for *only that one post* (e.g., `.../posts/1`).
    3.  Display the full post `title` and `body`.
* **Bonus:** Add a "Dark Mode" toggle using **Context API**. Store the theme (`'light'` or `'dark'`) in context and provide it to the whole app.

---

## Week 6: Advanced React & Final Project

### Module 13: Creating Custom Hooks

* **Learning Objectives:**
    * Identify repetitive logic that can be extracted into a custom hook.
    * Create and use your first custom hook (e.g., `useToggle`, `useFetch`).
    * Follow the `use...` naming convention.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Why Custom Hooks?** | 30 mins | 30 mins |
| Reusing stateful logic. | - `use...` naming convention. | - (Review) The logic in your `PostFetcher.jsx` (data, loading, error). |
| **Building `useFetch`** | 1.5 hours | 1 hour |
| `function useFetch(url) { ... }`. | - `useEffect`, `useState` inside. | - Create a new file `useFetch.js`. |
| Returning `[data, loading, error]`. | | - Move all your fetching, loading, and error logic into it. |
| | | - Refactor your `PostsList` and `PostDetail` components to use your new `useFetch` hook. |

### Module 14: Performance & Advanced Hooks

* **Learning Objectives:**
    * Understand what causes unnecessary re-renders.
    * Use `React.memo` to memoize components.
    * Understand the basics of `useCallback` and `useMemo`.
    * Understand `useReducer` as an alternative to `useState` for complex state.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Memoization** | 1 hour | 30 mins |
| `React.memo` for components. | - `useMemo` for values. | - (Lecture) Demonstrate a component re-rendering unnecessarily. |
| `useCallback` for functions. | | - Wrap the component in `React.memo` and see the change. |
| **`useReducer` Hook** | 1 hour | 45 mins |
| When to use it (complex state). | - `dispatch` and `reducer` function. | - (Lecture) Refactor a complex `useState` (like a to-do list) to use `useReducer`. |
| `switch` statement. | | |

### Module 15: Final Project Workshop

* **Learning Objectives:**
    * Plan a complex React application.
    * Break down UI into a component hierarchy.
    * Identify what state is local vs. global.
    * Deploy a Vite React app to a service like Netlify or Vercel.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Project Planning** | 45 mins | 30 mins |
| Component Hierarchy Diagram. | - Data Flow. | - Plan your final project: draw the components. |
| State Management Plan. | | - Identify where state will live (local, context). |
| **Deployment** | 45 mins | 30 mins |
| `npm run build`. | - The `dist` folder. | - Run the build command. |
| Drag-and-drop to Netlify. | - Connecting to Github for CI/CD. | - Deploy your Week 5 project to Netlify. |

**Week 6 / Final Project:** Build an "E-commerce Store Front".
* **Goal:** Combine everything from all 6 weeks.
* **Repo:** Must be a new, clean Github repository.
* **Features:**
    1.  **Routing:** A multi-page app using **React Router**.
        * `/` (Home Page)
        * `/products` (Product Listing Page)
        * `/products/:productId` (Product Detail Page)
        * `/cart` (Shopping Cart Page)
    2.  **API:** Use a public API (like the [Fake Store API](https://fakestoreapi.com/)) to fetch products.
    3.  **Custom Hook:** Use your `useFetch` custom hook to get data for the product list and detail pages.
    4.  **State & Props:**
        * The Product Listing Page should `.map()` over the fetched products and render `<ProductCard>` components, passing data via `props`.
        * The Product Detail Page should fetch and display data for one product.
    5.  **Global State (Context):**
        * Create a `CartContext`.
        * On the Product Detail Page, add an "Add to Cart" button.
        * This button should add the product to the global cart state (in context).
        * The `/cart` page should consume this context and display all items in the cart.
        * A `Navbar` (in your Layout route) should also consume the context to show a "Cart (3)" item count.
    6.  **Styling:** Style the entire app using **CSS Modules** or **Tailwind CSS**.
* **Deployment:** The final app must be deployed to Netlify or Vercel, with a link to the live site and the Github repo.
