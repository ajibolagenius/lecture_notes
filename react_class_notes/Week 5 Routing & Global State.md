# Week 5: Routing & Global State

Welcome to Week 5! Up until now, we've been building "Single Page Applications" that literally felt like single pages. Everything was crammed into `App.jsx` or conditionally rendered manually.

This week, we unlock the full potential of React:
1.  **Routing:** creating a multi-page experience (Home, About, Contact) without the browser ever reloading.
2.  **Global State:** solving the "Prop Drilling" problem using the **Context API** to share data across your entire app easily.

---

## 🗺️ Module 11: Client-Side Routing with React Router

**Objective:** Transform your application from a single view into a navigable website using `react-router-dom`.

### 1. SPA vs. Traditional Routing

* **Traditional (MPA):** When you click a link (`<a href="/about">`), the browser destroys the current page, requests a new HTML file from the server, and paints the screen white while loading.
* **Single Page App (SPA):** When you click a link, JavaScript intercepts the click. It prevents the browser refresh, updates the URL bar, and simply swaps the components on the screen. It feels instant.



### 2. Setup & Configuration

We use the standard library: **React Router**.

**Installation:**
```bash
npm install react-router-dom
````

**The Modern Setup (`createBrowserRouter`):**
In older React tutorials, you might see `<BrowserRouter>`. The modern standard (v6.4+) uses a data-driven router definition in `main.jsx`.

**`src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx' // This will be our "Layout"
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import './index.css'

// 1. Define the Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App is the "Wrapper" or Layout
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/", // The default index route
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

// 2. Provide the router to the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```

### 3\. The Layout Pattern (`<Outlet />`)

In the setup above, `App` is the parent. We want the `Navbar` to stay visible while the page content changes. We use a special component called `<Outlet />` to tell React *where* to render the child route.

**`src/App.jsx`**

```jsx
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <nav>
        {/* CRITICAL: Use Link, not <a>. <a> causes a reload! */}
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <main>
        {/* The child route (Home or About) renders here */}
        <Outlet />
      </main>

      <footer>© 2023 My Website</footer>
    </>
  );
}
```

### 4\. Dynamic Routes (`useParams`)

What if we have a blog with 100 posts? We can't write 100 routes. We use a **Dynamic Segment** (starts with a colon `:`) in the path.

**Step 1: Define the Route in `main.jsx`**

```javascript
{
  path: "/posts/:postId", // :postId is a variable
  element: <PostDetail />,
}
```

**Step 2: Read the Variable in `PostDetail.jsx`**
We use the `useParams` hook to read the URL.

```jsx
import { useParams } from 'react-router-dom';

export default function PostDetail() {
  // If URL is /posts/42, params.postId will be "42"
  const { postId } = useParams();

  return <h1>Now viewing Post ID: {postId}</h1>;
}
```

-----

## 📡 Module 12: Global State with Context API

**Objective:** Eliminate "Prop Drilling" by sharing state directly between distant components.

### 1\. The "Prop Drilling" Problem

Imagine you have a `user` object in `App`. You want to display the username in the `Navbar` (child) -\> `ProfileMenu` (grandchild) -\> `Avatar` (great-grandchild).

You have to pass `props={user}` through every single layer, even if the middle layers don't use it. This is **Prop Drilling**.

### 2\. The Context Solution

Context allows you to "teleport" data from a high-level component to any component below it, skipping the middle.

There are three steps: **Create**, **Provide**, and **Consume**.

### 3\. Step-by-Step Implementation (Theme Example)

We will build a Light/Dark mode toggler.

**Step A: Create the Context**
Best practice is to do this in a separate file.

**`src/context/ThemeContext.jsx`**

```jsx
import { createContext, useState } from 'react';

// 1. Create the Context (The "Radio Frequency")
export const ThemeContext = createContext();

// 2. Create a Custom Provider Component (The "Broadcast Tower")
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    // We pass both the data (theme) and function (toggleTheme)
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

**Step B: Provide the Context**
Wrap your *entire* application (or the part that needs the data) in `main.jsx`.

**`src/main.jsx`**

```jsx
import { ThemeProvider } from './context/ThemeContext';

// ... router setup ...

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
     <RouterProvider router={router} />
  </ThemeProvider>
)
```

**Step C: Consume the Context**
Any component inside the provider can now "tune in" to the data using `useContext`.

**`src/components/ThemeButton.jsx`**

```jsx
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Import the "Frequency"

export default function ThemeButton() {
  // Destructure the values we put in the Provider
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff'
      }}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}
```

-----

## 🏗️ Week 5 Assignment: "Multi-Page E-Store"

**Objective:** Build a multi-page application with routing, dynamic product pages, and a global "Cart" state using Context.

### 1\. Setup

1.  Create a new Vite project.
2.  Install React Router: `npm install react-router-dom`.
3.  Clean up `App.jsx` to act as your Layout (Navbar + Outlet + Footer).

### 2\. Routing Structure

Configure `createBrowserRouter` in `main.jsx` with these routes:

  * `/` -\> **Home**: A welcome banner and a "Shop Now" button.
  * `/products` -\> **Shop**: Lists products (fetched from API).
  * `/products/:id` -\> **ProductDetail**: Shows info for one product.
  * `/cart` -\> **Cart**: Shows items added to the global cart.
  * `*` (wildcard) -\> **NotFound**: A 404 page.

### 3\. Data Fetching

  * In **Shop**, fetch products from `https://fakestoreapi.com/products`.
  * In **ProductDetail**, fetch a single product: `https://fakestoreapi.com/products/${id}` (use `useParams` to get the ID).

### 4\. Global Cart Context (The Core Challenge)

Create `src/context/CartContext.jsx`.

**Requirements:**

1.  **State:** `cart` (an array of objects).
2.  **Function `addToCart(product)`:**
      * Adds a product to the array.
      * *Bonus:* If the product is already in the cart, increase a `quantity` property instead of adding a duplicate.
3.  **Function `removeFromCart(id)`:** Removes the item.
4.  **Function `cartTotal`:** Calculates the total price.
5.  **Provide:** Wrap your App in `CartProvider`.

### 5\. Integration

  * **Navbar:** Display a link to "Cart". *Bonus:* Show the count of items in the cart next to the link (e.g., `Cart (3)`). You need to `useContext(CartContext)` in the Navbar to get this number\!
  * **ProductDetail:** Add an "Add to Cart" button. When clicked, call the `addToCart` function from context.
  * **Cart Page:** Render the list of items in the global cart state.

### 6\. Submission

  * `git commit -m "feat: Setup Router and Routes"`
  * `git commit -m "feat: Implement Cart Context"`
  * `git commit -m "feat: Connect Product pages to Cart"`
  * Push to Github.
