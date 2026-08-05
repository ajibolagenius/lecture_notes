# Week 4: Forms, Styling, & Refs

Welcome to Week 4! We move from viewing data to **collecting** it. This week, you rebuild your real contact form — the same name/email/reason/contact-method/message fields from HTML Week 4 — as a controlled React component, styled with CSS Modules, reusing the exact validation rules you wrote in JS Week 2.

---

## 📝 Module 8: Advanced Forms

**Objective:** Master the "Controlled Component" pattern using your real contact form's fields.

### 1. The "Controlled Component" Pattern

* **Lecture & Concepts:**
    * In standard HTML, an `<input>` tracks its own value. In React, we want **State** to be the "Single Source of Truth."
    * **The Loop:** State → Input's `value`; Input's `onChange` → State.

### 2. Handling Multiple Inputs (The Professional Way)

* **Lecture & Concepts:**
    * Your real form has 4+ fields (name, email, reason, contact method, message) — five separate `useState` calls would be messy.
    * **The Solution:** One state **object**, one generic handler, using the input's `name` attribute and computed property names: `[e.target.name]`.

* **Practical Application (Your Real Contact Form):**
    ```jsx
    // src/components/ContactForm.jsx
    import { useState } from 'react';

    export default function ContactForm() {
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        reason: "",
        contactMethod: "email",
        message: ""
      });

      const [errors, setErrors] = useState({});

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

      // The exact same rules you wrote as plain functions in JS Week 2
      const isValidEmail = (email) => email.includes("@") && email.includes(".");
      const isMessageLongEnough = (message) => message.trim().length >= 20;

      const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!isValidEmail(formData.email)) {
          newErrors.email = "Please enter a valid email address.";
        }
        if (!isMessageLongEnough(formData.message)) {
          newErrors.message = "Your message needs to be at least 20 characters.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
          console.log("Form is valid! Submitting:", formData);
          // Real, simulated submission comes in Week 6's final project
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Get In Touch</legend>

            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </fieldset>

          <label htmlFor="reason">Reason for contact:</label>
          <select id="reason" name="reason" value={formData.reason} onChange={handleChange}>
            <option value="">--Please choose an option--</option>
            <option value="job">Job Opportunity</option>
            <option value="collab">Collaboration</option>
            <option value="hi">Just Saying Hi</option>
          </select>

          <p>Preferred contact method:</p>
          <label>
            <input
              type="radio"
              name="contactMethod"
              value="email"
              checked={formData.contactMethod === "email"}
              onChange={handleChange}
            />
            Email
          </label>
          <label>
            <input
              type="radio"
              name="contactMethod"
              value="phone"
              checked={formData.contactMethod === "phone"}
              onChange={handleChange}
            />
            Phone
          </label>

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <p className="error">{errors.message}</p>}

          <button type="submit">Send Message</button>
        </form>
      );
    }
    ```
    *Every field here matches your real `contact.html` from HTML Week 4 — same names, same options, same validation rules from JS Week 2. The difference is entirely in* how *the state is managed: one object, one `handleChange`, React re-rendering on every keystroke.*

---

## 🎨 Module 9: Styling React Components

**Objective:** Scope your CSS so components don't clash — and port your CSS course's card styling into a component-local file.

### 1. The Problem with Global CSS

If `index.css` has `.card { color: red; }`, *every* card in your app turns red, and names collide as your app grows.

### 2. The Solution: CSS Modules

* **Naming Convention:** `ComponentName.module.css`, imported as `import styles from './ComponentName.module.css'`.

* **Practical Application (Your Real `ProjectCard`, Scoped):**
    ```css
    /* src/components/ProjectCard.module.css */
    .card {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      transition: transform 0.3s ease;
    }
    .card:hover {
      transform: scale(1.03);
    }
    .featured {
      border-color: #336699;
    }
    ```
    ```jsx
    // src/components/ProjectCard.jsx
    import styles from './ProjectCard.module.css';

    export default function ProjectCard({ title, description, tags, featured }) {
      return (
        <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      );
    }
    ```
    *This is your CSS course's `.project-card`/`.project-card--featured` BEM naming, translated into CSS Modules' local scoping — same visual result, different mechanism for avoiding class-name collisions.*

### 3. Conditional Styling

* Template literals are the standard way to combine a base class with a conditional modifier class, exactly as shown above.

---

## 🔗 Module 10: The `useRef` Hook

**Objective:** Auto-focus your real contact form's first field on page load.

### 1. `useState` vs. `useRef`

| Feature | `useState` | `useRef` |
| :--- | :--- | :--- |
| **Purpose** | Data that affects the UI. | Accessing the DOM / "behind the scenes" data. |
| **Re-render?** | Yes. | No. |
| **Access** | `stateVariable` | `refVariable.current` |

### 2. Practical Application (Auto-Focusing Your Real Name Field)

```jsx
import { useRef, useEffect } from 'react';

export default function ContactForm() {
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  // ...formData state and handlers from Module 8...

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        ref={nameInputRef}
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {/* ...the rest of your real fields... */}
    </form>
  );
}
```

---

## 🧾 Week 4 Assignment: Rebuild Your Real Contact Form

**Objective:** A controlled, validated, styled, accessible version of your real contact form.

### 1. Requirements

1.  **Controlled Fields:** All real fields (name, email, reason, contact method, message) linked to one `formData` state object via a single `handleChange`.
2.  **Validation:** Reuse your JS Week 2 rules (`isValidEmail`, message `minLength` of 20) inside `handleSubmit`; show inline errors per field.
3.  **Styling:** `ContactForm.module.css` styling the form to match your CSS course's look (fieldset, spacing, button).
4.  **Auto-Focus:** `useRef` + `useEffect` to focus the name field on mount.

### 2. Git Workflow
* `git commit -m "feat: Build controlled ContactForm component"`
* `git commit -m "feat: Add validation and inline errors"`
* `git commit -m "style: Apply CSS Modules to ContactForm"`
* `git commit -m "feat: Auto-focus name field with useRef"`
* Push to Github.
