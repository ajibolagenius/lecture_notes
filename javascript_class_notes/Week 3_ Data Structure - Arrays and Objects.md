# Week 3: Data Structures: Arrays & Objects

This week, you'll learn about the two most important building blocks for storing data in JavaScript: **Objects** and **Arrays**. You'll use them to build the exact data model behind your real Featured Work section — the same array Week 4 will render straight to the page.

---

## Module 5: Objects

An **Object** is an "un-ordered" collection of related data, stored as **key-value pairs**. Think of an object as a noun (a "project") and its properties as descriptions.

### 1. Object Literals

* **Lecture & Concepts:**
    * The easiest way to create an object is the literal syntax: `{}`.
    * **Key:** The property's "name" (a string).
    * **Value:** The data at that key — any type, including arrays and other objects.
    * Use `const` for objects — the *reference* (the "box") doesn't change, even if what's inside it does.

* **In-Depth Example (One Real Project, as an Object):**
    * Recall your real Featured Work section from HTML Week 3 — each project is currently a hardcoded `<article>` with a title, image, description, and tech list. Let's model the first one as data:
    ```javascript
    const weatherApp = {
      title: "Weather App",
      description: "A React Native app that fetches live weather data.",
      tags: ["React Native", "Expo"],
      imageSrc: "assets/weather-app.png",
      featured: false
    };

    console.log(weatherApp);
    ```

---

### 2. Accessing, Adding & Modifying Properties

* **Lecture & Concepts:**
    * **Dot Notation (`.`)**: The easiest, most common way. Use it 90% of the time.
    * **Bracket Notation (`[]`)**: Needed when the key has special characters, or is stored in a variable.

* **In-Depth Example:**
    ```javascript
    console.log(weatherApp.title); // "Weather App"

    weatherApp.featured = true; // Modify an existing property
    weatherApp.year = 2026;     // Add a brand-new property

    // Bracket notation, useful when the key is a variable
    const keyToRead = "description";
    console.log(weatherApp[keyToRead]); // "A React Native app that fetches live weather data."
    ```

---

### 3. Object Methods & the `this` Keyword

* **Lecture & Concepts:**
    * When a function is a property of an object, it's called a **method** — it defines what the object can *do*.
    * **`this`:** Inside a method, `this` refers to **the object itself**, letting a method read the object's own properties.

* **In-Depth Example (A Project That Can Describe Itself):**
    ```javascript
    const weatherApp = {
      title: "Weather App",
      description: "A React Native app that fetches live weather data.",
      tags: ["React Native", "Expo"],

      // ES6 method syntax
      describe() {
        console.log(`${this.title}: ${this.description} (${this.tags.join(", ")})`);
      }
    };

    weatherApp.describe();
    // "Weather App: A React Native app that fetches live weather data. (React Native, Expo)"
    ```

* **A Heads-Up for Week 5:** `this` works the way you just learned *only* for regular functions like `describe()` above. Arrow functions (`=>`, coming in Week 5) handle `this` completely differently — using one as an object method silently breaks it. Nothing to do about that yet; just don't be surprised when Week 5 revisits `this` and gives you a different answer.

* **⭐️ Class Exercise: Model Your First Real Project**
    1.  Create an object for ONE of your real Featured Work projects, with `title`, `description`, `tags` (array), and `imageSrc`.
    2.  Log the `title` alone using dot notation.
    3.  Add a `describe()` method that logs a one-line summary using `this`.

---

## Module 6: Arrays

An **Array** is an **ordered list** of values — perfect for a *collection* of projects.

### 1. Array Literals & Indexing

* **Lecture & Concepts:**
    * Create with `[]`. **Zero-based indexing** — the first item is at index `0`.

* **In-Depth Example (Your Real Projects, as an Array):**
    ```javascript
    const projects = [
      {
        title: "Weather App",
        description: "A React Native app that fetches live weather data.",
        tags: ["React Native", "Expo"],
        imageSrc: "assets/weather-app.png",
        featured: false
      },
      {
        title: "Task Tracker",
        description: "A Python CLI tool for tracking daily tasks.",
        tags: ["Python"],
        imageSrc: "assets/task-tracker.png",
        featured: false
      },
      {
        title: "This Portfolio",
        description: "The very site you're looking at right now — built module by module across four courses.",
        tags: ["HTML", "CSS", "JavaScript"],
        imageSrc: "assets/portfolio-site.png",
        featured: true
      }
    ];

    console.log(projects[0]); // the Weather App object
    console.log(projects[0].title); // "Weather App"
    ```

---

### 2. Common Array Properties & Methods

* **Lecture & Concepts:**
    * `.length`: The count of items.
    * `push(item)`: Add to the **end**. `pop()`: Remove from the **end**.
    * `unshift(item)`: Add to the **start**. `shift()`: Remove from the **start**.

* **In-Depth Example:**
    ```javascript
    console.log(projects.length); // 3

    projects.push({
      title: "New Side Project",
      description: "Something you're currently building.",
      tags: ["JavaScript"],
      imageSrc: "assets/placeholder.png",
      featured: false
    });

    console.log(projects.length); // 4
    ```

---

### 3. Looping Arrays of Objects

* **Lecture & Concepts:**
    * This is the "Aha!" moment: you almost never use *just* an array or *just* an object — you use them **together**. An **array of objects** is the most common data structure in real applications, and it's exactly what your Featured Work section needs.

* **In-Depth Example (Logging Every Real Project):**
    ```javascript
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      console.log(`${project.title}: ${project.description}`);
    }

    // Output:
    // Weather App: A React Native app that fetches live weather data.
    // Task Tracker: A Python CLI tool for tracking daily tasks.
    // This Portfolio: The very site you're looking at right now — built module by module across four courses.
    ```

* **⭐️ Class Exercise: Build Your Real `projects` Array**
    1.  Turn your single project object from Module 5 into the first item of a real `projects` array.
    2.  Add an object for every other project currently hardcoded in your `index.html`'s Featured Work section.
    3.  Write a `for` loop that logs each project's `title` and `tags.join(", ")`.

---

### Week 3: Comprehensive Assignment

**Objective:** Build the real data model behind your Featured Work section — the exact array Week 4 will render to the page.

**Files to Use:**
1.  `script.js`

**Requirements:**

1.  **The `projects` Array:** One object per real project currently hardcoded in your `index.html`.
2.  **Object Shape:** Each object needs `title`, `description`, `tags` (array of strings), `imageSrc`, and `featured` (boolean — `true` for exactly one project).
3.  **Logging:** Write a `for` loop that logs every project's title and description.
4.  **Data Accuracy:** Titles, descriptions, and tags must match what's *actually* in your HTML right now — this array replaces that hardcoded markup next week, so it needs to carry the same real information forward.

**Bonus Challenge:** Add a `describe()` method to every project object (not just one), and write a `for` loop that calls `projects[i].describe()` for each one.
