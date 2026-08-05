# Week 4: Forms, Styling, & Refs

Welcome to Week 4! We are moving from viewing data to **collecting** data. This week is crucial because almost every useful application requires user input—whether it's logging in, searching, or creating content.

We will cover:
1.  **Advanced Forms:** Managing complex user input with "Controlled Components."
2.  **Styling:** Keeping your CSS organized and collision-free using **CSS Modules**.
3.  **Refs:** accessing the DOM directly and storing data without re-rendering using the `useRef` hook.

---

## 📝 Module 8: Advanced Forms

**Objective:** Master the "Controlled Component" pattern to handle single and multiple input fields.

### 1. The "Controlled Component" Pattern

In standard HTML, an `<input>` keeps track of its own data. In React, we want our **State** to be the "Single Source of Truth."

* **The Loop:**
    1.  **State → Input:** The input's `value` is set to the React state.
    2.  **Input → State:** When the user types (`onChange`), we update the React state.



```jsx
import { useState } from 'react';

export default function SimpleForm() {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    // 2. Update state when user types
    setName(e.target.value);
  };

  return (
    <form>
      <label>Name:</label>
      {/* 1. Value is controlled by state */}
      <input
        type="text"
        value={name}
        onChange={handleChange}
      />
      <p>Current Value: {name}</p>
    </form>
  );
}
````

### 2\. Handling Multiple Inputs (The Professional Way)

Imagine a form with 10 fields. Creating 10 separate `useState` variables (`const [name, setName]...`, `const [email, setEmail]...`) is messy.

**The Solution:** Use a **single object** for state and a generic handler function.

  * **The `name` Attribute:** We give each input a `name` attribute that matches the property key in our state object.
  * **Computed Property Names:** We use square brackets `[e.target.name]` to dynamically update the correct key.

<!-- end list -->

```jsx
import { useState } from 'react';

export default function SignupForm() {
  // 1. Single state object for all fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user" // Default value for select
  });

  const handleChange = (e) => {
    // Destructuring for cleaner code
    const { name, value } = e.target;

    // 2. Dynamic Update
    setFormData((prevData) => ({
      ...prevData,        // Keep existing fields
      [name]: value       // Update ONLY the field that changed
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the page from reloading!
    console.log("Submitting:", formData);
    // Send formData to an API here...
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>

      <input
        type="text"
        name="username" // Matches state key
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Sign Up</button>
    </form>
  );
}
```

-----

## 🎨 Module 9: Styling React Components

**Objective:** Learn how to scope your CSS so it doesn't accidentally mess up other parts of your app.

### 1\. The Problem with Global CSS

If you put `.button { color: red; }` in `index.css`, *every* button in your app becomes red. As your app grows, names clash (`.card`, `.header`, `.active`).

### 2\. The Solution: CSS Modules

Vite supports CSS Modules out of the box. A CSS Module is a CSS file where all class names are scoped locally by default.

  * **Naming Convention:** `ComponentName.module.css`
  * **Import Syntax:** `import styles from './ComponentName.module.css'`

**Step 1: Create the CSS file (`Button.module.css`)**

```css
/* Button.module.css */
.btn {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.primary {
  background-color: blue;
  color: white;
}

.secondary {
  background-color: gray;
  color: white;
}
```

**Step 2: Use it in JSX (`Button.jsx`)**
React/Vite will generate unique class names (e.g., `_btn_x9z2a`) so they never clash.

```jsx
import styles from './Button.module.css'; // Import as an object

export default function Button({ type = 'primary', text }) {
  // Access classes as properties of the 'styles' object
  // Logic: Always have .btn, conditionally add .primary or .secondary
  return (
    <button
      className={`${styles.btn} ${type === 'primary' ? styles.primary : styles.secondary}`}
    >
      {text}
    </button>
  );
}
```

### 3\. Conditional Styling Tips

Using template literals (backticks) is the standard way to combine static and dynamic classes.

```jsx
// Is the item active?
<div className={`${styles.item} ${isActive ? styles.activeItem : ''}`}>
```

-----

## 🔗 Module 10: The `useRef` Hook

**Objective:** Learn how to access DOM elements directly and store values that persist without causing re-renders.

### 1\. `useState` vs. `useRef`

| Feature | `useState` | `useRef` |
| :--- | :--- | :--- |
| **Main Purpose** | storing data that affects the UI. | Accessing DOM / Storing "behind the scenes" data. |
| **Re-render?** | **Yes.** Changing state triggers a re-render. | **No.** Changing a ref does not trigger a re-render. |
| **Access** | `stateVariable` | `refVariable.current` |

### 2\. Use Case 1: Accessing the DOM (Focus)

Sometimes you need to do things React can't do easily, like focusing an input, scrolling to a specific element, or measuring an element's size.

```jsx
import { useRef, useEffect } from 'react';

export default function AutoFocusInput() {
  // 1. Create the ref (initially null)
  const inputRef = useRef(null);

  useEffect(() => {
    // 3. Access the DOM element via .current
    // This runs after the component mounts
    inputRef.current.focus();
  }, []);

  return (
    <div>
      {/* 2. Attach the ref to the element */}
      <input ref={inputRef} type="text" placeholder="I will be focused!" />
    </div>
  );
}
```

### 3\. Use Case 2: Persisting Values (Advanced)

If you need to keep track of a value (like a timer ID or previous state) but you **don't** want the UI to update when it changes, use `useRef`.

```jsx
// Example: A stopwatch where the interval ID is stored in a ref
const intervalRef = useRef(null);

const stopTimer = () => {
  clearInterval(intervalRef.current); // accessing the ID to stop it
};
```

-----

## 🧾 Week 4 Assignment: "Tip & Split Calculator"

**Objective:** Build a fully functional utility app using Controlled Forms, CSS Modules for styling, and Refs for user experience.

### 1\. Requirements

1.  **Form Inputs:**
      * **Bill Amount:** (Number input)
      * **Tip Percentage:** (Select dropdown: 10%, 15%, 20%, Custom)
      * **Number of People:** (Number input, minimum 1)
2.  **Calculations (Real-time):**
      * As the user types, calculate:
          * **Total Tip**
          * **Tip Per Person**
          * **Total Bill Per Person**
3.  **Styling:**
      * Use **CSS Modules** (`Calculator.module.css`).
      * Make the "Output" section look distinct (e.g., dark background, large numbers) from the "Input" section.
4.  **UX Improvement:**
      * Use `useRef` to automatically focus the "Bill Amount" input when the app loads.
5.  **Reset:**
      * A "Reset" button that clears all fields and sets focus back to the Bill Amount input.

### 2\. Starter Code Structure

**`Calculator.module.css`** (Start with this)

```css
.container {
  background-color: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  max-width: 400px;
  margin: 2rem auto;
}
.inputGroup {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
.label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}
.input {
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}
.resultCard {
  background-color: #00474b;
  color: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 2rem;
}
```

**`Calculator.jsx`** (Logic Hints)

```jsx
import { useState, useRef, useEffect } from 'react';
import styles from './Calculator.module.css';

export default function Calculator() {
  const [bill, setBill] = useState('');
  const [people, setPeople] = useState(1);
  const [tipPercent, setTipPercent] = useState(0.15);

  const billInputRef = useRef(null);

  // Focus logic
  useEffect(() => {
    billInputRef.current.focus();
  }, []);

  // Calculation Logic (Derived State - no need for useEffect!)
  const billNum = parseFloat(bill) || 0; // Handle empty strings
  const tipAmount = billNum * tipPercent;
  const totalBill = billNum + tipAmount;
  const totalPerPerson = totalBill / people;

  const handleReset = () => {
    setBill('');
    setPeople(1);
    setTipPercent(0.15);
    billInputRef.current.focus();
  };

  return (
    <div className={styles.container}>
      {/* INPUT SECTION */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Bill</label>
        <input
          ref={billInputRef}
          className={styles.input}
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
      </div>

      {/* TODO: Add inputs for Tip Select and People */}

      {/* OUTPUT SECTION */}
      <div className={styles.resultCard}>
        <div>
          <span>Total / Person</span>
          <h2>${totalPerPerson.toFixed(2)}</h2>
        </div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
```

### 3\. Git Workflow

  * `git commit -m "feat: Create Calculator layout and controlled inputs"`
  * `git commit -m "style: Apply CSS Modules"`
  * `git commit -m "feat: Add refs for auto-focus and reset logic"`
  * Push to Github.
