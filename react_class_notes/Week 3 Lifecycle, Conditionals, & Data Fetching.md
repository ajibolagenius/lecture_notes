# Week 3: Lifecycle, Conditionals, & Data Fetching

Welcome to Week 3! You now know how to structure components (Props) and make them interactive (State).

This week, we bridge the gap between a static app and a real-world application. We will learn how to:
1.  **Think logically:** Show or hide elements based on conditions.
2.  **Handle lists:** Render arrays of data efficiently.
3.  **Manage "Side Effects":** Fetch data from APIs and manage the component "Lifecycle" using `useEffect`.

---

## 🔀 Module 5: Conditional Rendering & Lists

**Objective:** Learn to control *what* gets rendered and *how* to render multiple items efficiently.

### 1. Conditional Rendering

In React, there is no `v-if` or `ng-if`. We use standard JavaScript logic to control what the component returns.

#### A. The `if` Statement (Early Return)
Best for checking if a component should render *at all* or needs to show a completely different view (like a loading screen).

```jsx
function Welcome({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <button>Please Login</button>;
  }

  // If we get here, isLoggedIn must be true
  return <h1>Welcome back, User!</h1>;
}
````

#### B. The Ternary Operator (`? :`)

Best for switching between two different elements inside JSX.
*Syntax:* `condition ? (what to render if true) : (what to render if false)`

```jsx
function LoginControl({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <span>Welcome back! <button>Logout</button></span>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}
```

#### C. The Logical AND Operator (`&&`)

Best for rendering something **only if true**, and nothing otherwise.
*Syntax:* `condition && (what to render)`

```jsx
function Notifications({ unreadMessages }) {
  return (
    <div>
      <h1>Inbox</h1>
      {/* If unreadMessages is 0 (falsy), nothing renders.
          If > 0 (truthy), the div renders. */}
      {unreadMessages.length > 0 && (
        <div className="badge">
          You have {unreadMessages.length} unread messages!
        </div>
      )}
    </div>
  );
}
```

### 2\. Rendering Lists

To render a list of items, we use the JavaScript array method `.map()`. It transforms an array of data into an array of JSX elements.

#### The Importance of `key`

When you render a list, React needs to know which items have changed, been added, or removed. It uses a unique string attribute called a `key` to track items.

  * **Rule 1:** Keys must be unique among siblings.
  * **Rule 2:** Do **not** use the array index (`index`) if the list can change order (sort, filter, delete). Use unique IDs from your data (e.g., database ID).

**Practical Example: A Dynamic Menu**

```jsx
export default function Menu() {
  const dishes = [
    { id: 1, name: 'Pancakes', price: 10 },
    { id: 2, name: 'Waffles', price: 12 },
    { id: 3, name: 'Omelette', price: 11 },
  ];

  return (
    <ul>
      {dishes.map((dish) => (
        // The 'key' goes on the outermost element inside the map
        <li key={dish.id}>
          <strong>{dish.name}</strong> - ${dish.price}
        </li>
      ))}
    </ul>
  );
}
```

-----

## ⏳ Module 6: The `useEffect` Hook (Side Effects)

**Objective:** Understand how to run code *after* React renders, and how to synchronize your component with external systems.

### 1\. Pure Rendering vs. Side Effects

  * **Pure Rendering:** React components should be pure logic during the render phase. (Input Props/State -\> Output JSX). You shouldn't make API calls or change the DOM directly *inside* the main function body.
  * **Side Effects:** Any operation that affects something *outside* the function scope (fetching data, setting timers, manually changing the DOM title). We use `useEffect` for this.

### 2\. The `useEffect` Syntax

`useEffect` tells React that your component needs to do something *after* render.

```javascript
import { useEffect } from 'react';

useEffect(() => {
  // Your side effect code here
  console.log("I run after every render!");
});
```

### 3\. The Dependency Array (`[]`)

The second argument to `useEffect` is the **Dependency Array**. This controls *when* the effect runs. This is the most critical concept to master.

| Dependency Array | Behavior | Use Case |
| :--- | :--- | :--- |
| **No Array** | Runs after **every** render. | Rarely used (can cause infinite loops). |
| **Empty Array `[]`** | Runs **only once** (on "mount"). | API calls, initial setup. |
| **`[prop, state]`** | Runs on mount **AND** whenever `prop` or `state` changes. | Reacting to updates (e.g., auto-save when input changes). |

**Practical Example: The Document Title Updater**

```jsx
import { useState, useEffect } from 'react';

export default function TitleUpdater() {
  const [count, setCount] = useState(0);

  // This effect runs every time 'count' changes
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // <--- Dependency array

  return <button onClick={() => setCount(count + 1)}>Click me</button>;
}
```

### 4\. The Cleanup Function

Sometimes effects create "mess" (event listeners, subscriptions, timers). If we don't clean them up, they cause memory leaks. To clean up, return a function from your effect.

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick...");
  }, 1000);

  // Cleanup function: Runs when component unmounts OR before the effect runs again
  return () => {
    clearInterval(timer);
    console.log("Timer cleared!");
  };
}, []);
```

-----

## 🌐 Module 7: Data Fetching with `useEffect`

**Objective:** Fetch data from an API and display it. This is the "Standard Fetch Pattern" in React.

### 1\. The Three States of Fetching

When fetching data, your UI needs to handle three distinct states:

1.  **Loading:** The request is in progress.
2.  **Success (Data):** The request finished and we have data.
3.  **Error:** The request failed.

### 2\. Async/Await in `useEffect`

**Gotcha:** You cannot make the effect function itself `async`.

  * ❌ `useEffect(async () => { ... })` // This breaks React.
  * ✅ Define an async function *inside* the effect and call it.

### 3\. Practical Example: Fetching Users

```jsx
import { useState, useEffect } from 'react';

export default function UserList() {
  // 1. Define the three states
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2. Define the async fetch logic
    const fetchUsers = async () => {
      try {
        const response = await fetch('[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)');

        // Check for HTTP errors (e.g., 404)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // 3. Update state with data
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        // 4. Turn off loading spinner regardless of success/failure
        setLoading(false);
      }
    };

    // 5. Call the function
    fetchUsers();
  }, []); // Run once on mount

  // 6. Conditional Rendering based on state
  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} ({user.email})</li>
      ))}
    </ul>
  );
}
```

-----

## 📝 Week 3 Assignment: "Blog Explorer"

**Objective:** Build a blog post viewer that fetches data from an API, handles loading states, and renders lists dynamically.

### 1\. Setup

  * Create a new component `src/components/BlogExplorer.jsx`.
  * Import it into `App.jsx`.

### 2\. Requirements

1.  **State Management:**
      * Create state for `posts` (array), `loading` (boolean), and `error` (string/null).
2.  **The Effect:**
      * Use `useEffect` to fetch data from: `https://jsonplaceholder.typicode.com/posts`
      * Ensure it only runs once when the component mounts.
3.  **The UI Logic:**
      * **If Loading:** Display a "Loading Posts..." message (or a spinner CSS animation if you're feeling fancy).
      * **If Error:** Display "Failed to load posts" in red text.
      * **If Success:** Render a list of posts.
4.  **The List:**
      * Use `.map()` to render the posts.
      * For each post, display the `title` in an `<h3>` and the `body` in a `<p>`.
      * **Crucial:** Use the post's `id` as the `key`.
5.  **Bonus Feature (Refetch):**
      * Add a "Refresh" button at the top.
      * When clicked, it should re-trigger the fetch logic (Hint: You might need to move the fetch function *outside* the effect or use a dependency variable).

### 3\. Submission Code Structure (Starter)

```jsx
import { useState, useEffect } from 'react';

export default function BlogExplorer() {
  // TODO: Add state variables

  useEffect(() => {
    // TODO: Add fetch logic
  }, []);

  return (
    <div className="blog-container">
       <h1>Latest Posts</h1>
       {/* TODO: Add Conditional Rendering here */}
    </div>
  );
}
```

### 4\. Git Workflow

  * `git commit -m "feat: Implement data fetching logic"`
  * `git commit -m "style: Style the blog post list"`
  * Push to Github.
