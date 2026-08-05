# Week 2: State, Props, & Interactivity

Welcome to Week 2! Last week, we built static pages—beautiful, but they didn't *do* anything. This week, we bring our applications to life. We'll learn how to pass data dynamically between components using **Props** and how to make components "remember" things using **State**.

---

## 📦 Module 3: Props (Passing Data)

**Objective:** Learn how to make components reusable and dynamic by passing data *down* the component tree.

### 1. What are Props?

* **Lecture & Concepts:**
    * **The Concept:** "Props" stands for **properties**. If components are like JavaScript functions, then props are the **arguments** you pass into them.
    * **The Flow:** Data in React flows **unidirectionally** (one-way binding). It flows *down* from Parent → Child. Parents pass props; Children receive them.
    * **Immutability:** Props are **read-only**. A child component *cannot* change its own props. If it needs to change something, it must ask the parent to do it (we'll cover this in Module 4).

### 2. Passing and Receiving Props

* **Lecture & Concepts:**
    * **Passing:** You pass props exactly like HTML attributes.
        ```jsx
        <UserProfile name="Alex" age={25} isAdmin={true} />
        ```
        *Note: Strings use quotes `""`. Numbers, booleans, and variables use curly braces `{}`.*
    * **Receiving (The Modern Way):** React components receive a single object argument called `props`. However, in modern React, we almost always **destructure** it immediately in the function signature.

* **Practical Application (Reusable Components):**
    1.  **Create `src/components/Button.jsx`:**
        Instead of hardcoding a button that says "Click Me", let's make it dynamic.
        ```jsx
        // Destructure 'text' and 'color' from the props object
        export default function Button({ text, color }) {
          // Dynamic style object based on the prop
          const buttonStyle = {
            backgroundColor: color,
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
            fontSize: "16px"
          };

          return <button style={buttonStyle}>{text}</button>;
        }
        ```
    2.  **Use it in `App.jsx`:**
        ```jsx
        import Button from './components/Button';

        function App() {
          return (
            <div style={{ display: 'flex', gap: '10px', padding: '20px' }}>
              {/* Reusing the same component with different data */}
              <Button text="Login" color="blue" />
              <Button text="Delete" color="red" />
              <Button text="Sign Up" color="green" />
            </div>
          );
        }
        export default App;
        ```

### 3. The Special `children` Prop

* **Lecture & Concepts:**
    * Sometimes you don't want to pass data *attributes*, you want to pass **content** *inside* the tags, just like `<div className="box">Content here</div>`.
    * React creates a special prop called `children` for this.
    * This is known as the **Composition** pattern (or "Slot" pattern in other frameworks). It allows you to create generic "wrapper" components.

* **Practical Application (The Card Component):**
    1.  **Create `src/components/Card.jsx`:**
        ```jsx
        export default function Card({ title, children }) {
          return (
            <div className="card-container">
              <div className="card-header">
                <h2>{title}</h2>
              </div>
              <div className="card-body">
                {/* This is where the nested content will appear */}
                {children}
              </div>
            </div>
          );
        }
        ```
        *(Assume some basic CSS for `.card-container` in your index.css to give it a border and shadow).*
    2.  **Use it in `App.jsx`:**
        ```jsx
        import Card from './components/Card';
        import Button from './components/Button';

        function App() {
          return (
            <div style={{ padding: '20px' }}>
              <Card title="User Profile">
                {/* All this JSX is passed as the 'children' prop */}
                <img src="[https://via.placeholder.com/150](https://via.placeholder.com/150)" alt="User" />
                <p>Name: Alex</p>
                <p>Role: Developer</p>
                <Button text="Edit Profile" color="#333" />
              </Card>

              <Card title="Warning">
                <p>Are you sure you want to delete this?</p>
                <Button text="Yes, Delete" color="red" />
              </Card>
            </div>
          );
        }
        ```

---

## ⚡ Module 4: State (`useState`) & Events

**Objective:** Learn how to make components interactive and "remember" data using the `useState` hook.

### 1. State vs. Variables

* **Lecture & Concepts:**
    * **The Problem:** If you use a regular JavaScript variable (`let count = 0`), updating it (`count++`) will change the variable in memory, but **React won't know**. It won't update (re-render) the screen.
    * **The Solution:** **State**. State is a special variable that, when changed, triggers React to **re-render** the component, updating the UI to match the new data.
    * **The Hook:** We use `useState`, a React Hook.

### 2. The `useState` Hook

* **Syntax Anatomy:**
    ```javascript
    import { useState } from 'react';

    //   1. Variable   2. Setter      3. Hook & Initial Value
    const [ count,     setCount ] = useState(0);
    ```
    1.  **`count`**: The current value of the state. Use this in your JSX.
    2.  **`setCount`**: The function you *must* use to update the state.
    3.  **`0`**: The initial value when the component first loads.

* **Practical Application (The Counter):**
    1.  Create `src/components/Counter.jsx`.
    2.  Implement a simple counter:
        ```jsx
        import { useState } from 'react';

        export default function Counter() {
          // Initialize state to 0
          const [count, setCount] = useState(0);

          // Event Handler Function
          const handleIncrement = () => {
            // NEVER do this: count = count + 1;
            // ALWAYS use the setter:
            setCount(count + 1);
          };

          return (
            <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
              <h3>Current Count: {count}</h3>
              {/* Connect the event */}
              <button onClick={handleIncrement}>Increment</button>
            </div>
          );
        }
        ```

### 3. Handling Events

* **Lecture & Concepts:**
    * React events are camelCased: `onClick`, `onChange`, `onSubmit`.
    * **Crucial Rule:** Pass the function *definition*, don't call it immediately.
        * ✅ Correct: `onClick={handleClick}` (Passes the function reference).
        * ❌ Wrong: `onClick={handleClick()}` (Calls the function immediately when the page loads, often causing infinite loops).

### 4. Updating State: The Right Way

* **Concept: Functional Updates**
    * If your new state depends on the *previous* state (like a counter), it's safer to use the **callback version** of the setter. This prevents bugs if state updates happen very quickly.
    ```javascript
    // Good for simple updates
    setCount(count + 1);

    // Best Practice for updates based on previous value
    setCount((prevCount) => prevCount + 1);
    ```

* **Concept: Objects in State**
    * State updates are **replacements**, not merges. If your state is an object, you must copy the old properties manually.
    ```javascript
    const [user, setUser] = useState({ name: "Alex", age: 25 });

    // ❌ Wrong: This wipes out 'name'!
    // setUser({ age: 26 });

    // ✅ Correct: Use the Spread Operator (...) to copy existing fields
    setUser({ ...user, age: 26 });
    ```

---

## 📝 Week 2 Assignment: "Interactive To-Do List"

**Objective:** Build a fully interactive To-Do List application. You will use `useState` to manage the list of tasks and the input field, and `props` to structure your components.

### 1. Setup
* Continue in your `react-week1-portfolio` repo or create a new Vite project.
* Clean out `App.jsx`.

### 2. Component Structure
Create these files:
* `TodoItem.jsx` (Displays a single task).
* `TodoList.jsx` (Holds the state and logic).

### 3. Step-by-Step Instructions

#### Step A: The `TodoItem` Component
This component should just receive data via props and display it.
1.  It accepts a prop called `taskName`.
2.  It returns a `<li>` containing the `taskName`.

#### Step B: The `TodoList` Component (The Brains)
This is where the magic happens.
1.  **State 1 (The Input):** Create a state variable `inputValue` (string) to track what the user types.
2.  **State 2 (The List):** Create a state variable `todos` (array) to hold the list of tasks. Initialize it with some dummy data: `['Learn React', 'Build a Project']`.
3.  **The Input Handler:** Create a function `handleInputChange(e)` that takes the event object, extracts `e.target.value`, and calls `setInputValue`.
4.  **The Add Function:** Create a function `handleAddTodo()`.
    * It should take `inputValue` and add it to the `todos` array.
    * *Hint:* You need to create a *new* array. `setTodos([...todos, inputValue])`.
    * Clear the input field after adding (`setInputValue("")`).
5.  **Render:**
    * Return a `<div>` containing:
        * An `<input>` (value linked to `inputValue`, onChange linked to `handleInputChange`).
        * A `<button>` (onClick linked to `handleAddTodo`).
        * A `<ul>`. Inside the UL, use `.map()` to render a `<TodoItem />` for every string in your `todos` array.
        * **Remember Keys:** For now, you can use the index as a key (e.g., `key={index}`), though we'll learn why that's not ideal later.

#### Step C: Assembly
Import and render `<TodoList />` inside your `App.jsx`.

### 🏆 Bonus Challenge: "The Delete Button"
1.  Update your `todos` state to store **Objects** instead of strings.
    * Example: `[{ id: 1, text: "Learn React" }, { id: 2, text: "Sleep" }]`
2.  Pass a **function** down to `TodoItem` as a prop called `onDelete`.
3.  In `TodoItem`, add a "Delete" button. When clicked, it calls `onDelete`.
4.  In `TodoList`, write the `deleteTodo(id)` function.
    * Use the `.filter()` method to create a new array excluding the item with that ID.
    * Update the state with the filtered array.

### Submission
* Commit your code: `git commit -m "feat: Complete Week 2 To-Do List assignment"`
* Push to Github.