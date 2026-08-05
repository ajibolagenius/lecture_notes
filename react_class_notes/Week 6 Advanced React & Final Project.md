# Week 6: Advanced React & Final Project

Welcome to the finish line! You have built a solid foundation in React. You know how to create components, manage state, handle side effects, route between pages, and share global data.

This final week is about **leveling up** from "Junior" to "Intermediate." We will cover:
1.  **Custom Hooks:** Writing your own hooks to reuse logic (not just UI).
2.  **Performance:** Understanding why apps get slow and how to fix it (`useMemo`, `useCallback`).
3.  **Complex State:** Using `useReducer` for state that is too complicated for `useState`.
4.  **The Capstone:** Building and deploying a complete E-Commerce application.

---

## 🎣 Module 13: Creating Custom Hooks

**Objective:** Learn to extract component logic into reusable functions.

### 1. The "DRY" Principle (Don't Repeat Yourself)
You know how to reuse UI (Components). But what about logic?
* *Scenario:* You fetch data in the `UserList` component. You also fetch data in the `ProductList` component. You are rewriting the same `useEffect`, `loading` state, and `error` state handling twice.

**Custom Hooks** allow you to extract that logic into a standard JavaScript function that *uses other hooks*.

### 2. Rules of Custom Hooks
1.  **Must start with "use"**: (e.g., `useFetch`, `useWindowSize`, `useAuth`). This tells React that this function follows Hook rules (handling state/effects).
2.  **Can call other Hooks**: They can use `useState`, `useEffect`, etc.

### 3. Practical Example: `useFetch`
Let's build a hook that handles all the API boilerplate we wrote in Week 3.

**`src/hooks/useFetch.js`**
```javascript
import { useState, useEffect } from 'react';

// 1. Accepts a URL as an argument
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state when URL changes
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Could not fetch data");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-run if URL changes

  // 2. Returns the state variables
  return { data, loading, error };
}
````

**Using the Hook in a Component:**

```jsx
import useFetch from '../hooks/useFetch';

export default function ProductList() {
  // One line of code to handle all fetching logic!
  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}
```

-----

## ⚡ Module 14: Performance & Advanced Hooks

**Objective:** Understand rendering optimization and managing complex state.

### 1\. Optimization: `useMemo` & `useCallback`

React is fast, but sometimes we accidentally make it slow.

  * **The Problem:** Every time a parent re-renders, all logic inside it runs again, and all children re-render (unless optimized).
  * **Memoization:** "Caching" a result so you don't have to recalculate it unless the inputs change.

#### A. `useMemo` (Caching Values)

Use this when you have an **expensive calculation** (e.g., filtering a list of 10,000 items).

```jsx
import { useMemo, useState } from 'react';

function ExpensiveComponent({ numbers }) {
  // Without useMemo, this slowSort runs on EVERY render (even if only 'count' changes)
  // With useMemo, it only runs when 'numbers' changes.
  const sortedNumbers = useMemo(() => {
    console.log("Sorting...");
    return numbers.sort((a, b) => a - b);
  }, [numbers]);

  return <div>{sortedNumbers.join(', ')}</div>;
}
```

#### B. `useCallback` (Caching Functions)

Use this when you pass a **function** to a child component that is optimized with `React.memo`. It prevents the function from being "re-created" on every render, which would force the child to re-render.

```jsx
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []); // dependency array works just like useEffect
```

### 2\. Complex State: `useReducer`

When `useState` gets messy (e.g., you have 5 different `useState` calls that depend on each other), `useReducer` is the better option. It mimics Redux.

  * **Reducer:** A function `(state, action) => newState`.
  * **Dispatch:** A function you call to send an "action" (instruction) to the reducer.

**Example: A Shopping Cart Reducer**

```jsx
// The Reducer Function (Logic)
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

// The Component
function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: { id: 1, name: 'Shoe' } })}>
      Add Shoe
    </button>
  );
}
```

-----

## 🚀 Module 15: Final Project Workshop

**Objective:** Plan, Build, and Deploy the Capstone Project.

### 1\. Deployment (The "Go Live" Moment)

You cannot send people a `localhost:5173` link. You must build and deploy.

  * **Build:** `npm run build`. This creates a `dist` folder with optimized HTML/CSS/JS.
  * **Deploy:** We use **Netlify** or **Vercel**.
    1.  Push code to Github.
    2.  Log into Netlify/Vercel with Github.
    3.  Import the Repo.
    4.  It detects Vite automatically. Click "Deploy".
    5.  Every time you `git push`, the site updates automatically (CI/CD).

-----

## 🎓 Week 6 Capstone: "React E-Commerce Store"

**Objective:** Build a professional-grade E-Commerce application. This is the centerpiece of your portfolio.

### 1\. Project Requirements

You must combine **Routing**, **Context**, **API Fetching**, and **Custom Hooks**.

  * **API:** Use [FakeStoreAPI](https://fakestoreapi.com/) (Free, no key required).
  * **Pages:**
    1.  **Home (`/`):** Hero section, "Featured Products" (limit 3).
    2.  **Shop (`/products`):** Grid of all products. Filter by category (optional).
    3.  **Product Detail (`/products/:id`):** Large image, description, price, "Add to Cart" button.
    4.  **Cart (`/cart`):** List of items, total price calculation, "Checkout" button (just clears cart).
    5.  **404:** Custom error page.

### 2\. Technical Requirements

1.  **`useFetch` Hook:** Create and use a custom hook to fetch the product data.
2.  **Context API:** Create a `CartContext`.
      * State should be managed using `useState` or `useReducer`.
      * Must handle: Adding items, Removing items, Calculating Total Price.
      * Must persist data: Use `localStorage` so the cart survives a page refresh.
3.  **UI/UX:**
      * Show a loading spinner while fetching.
      * Show a "toast" notification or alert when an item is added to the cart.
      * Responsive design (Grid layout for products).

### 3\. Suggested Architecture

```
src/
├── components/
│   ├── Navbar.jsx (Shows Cart Count)
│   ├── ProductCard.jsx
│   ├── CartItem.jsx
│   └── LoadingSpinner.jsx
├── context/
│   └── CartContext.jsx (Global State)
├── hooks/
│   └── useFetch.js
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetail.jsx
│   └── Cart.jsx
├── App.jsx (Routes setup)
└── main.jsx (Providers setup)
```

### 4\. Implementation Steps

1.  **Setup:** Scaffold Vite app, install `react-router-dom`, setup Github repo.
2.  **Logic First:** Build the `useFetch` hook. Test it in a simple component to ensure you get data from FakeStoreAPI.
3.  **Routing:** Set up the empty pages and the Router in `App.jsx`. Verify navigation works.
4.  **Global State:** Build the `CartContext`. Wrap the app in it.
5.  **Build Shop:** Use `useFetch` in `Shop.jsx`. Map over data to render `ProductCard`s.
6.  **Build Detail:** Use `useParams` and `useFetch` (single product URL) in `ProductDetail.jsx`.
7.  **Connect Cart:** Make the "Add to Cart" button update the Context. Make the Navbar read the Context.
8.  **Polish:** Add CSS Modules or Tailwind. Add Loading states.
9.  **Deploy:** Push to Github and deploy to Netlify/Vercel.

### 5\. Submission

  * **Repo Link:** Your Github URL.
  * **Live Link:** Your Netlify/Vercel URL.
  * **Reflection:** A short paragraph in your `README.md` explaining the hardest bug you encountered and how you fixed it.

**Congratulations\!** You are now a React Developer. ⚛️
