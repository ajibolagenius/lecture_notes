# Week 5: Modern JavaScript Deep Dive (ES6+)

Welcome to Week 5! You already have a real, working `renderProjects()` function and a validated contact form. Now we "modernize" your code — replacing `for` loops with array methods, tidying up with destructuring, and adding a genuinely new feature: a real, persistent dark-mode toggle.

---

## Module 10: Modern Iteration & ES6+ Functions

### 1. Arrow Functions (`=>`)

* **Lecture & Concepts:**
    * A compact, modern syntax for function expressions.
    * **Old:** `const isValidEmail = function(email) { return email.includes("@"); };`
    * **New:** `const isValidEmail = (email) => email.includes("@");` (implicit return — no `{}`/`return` needed for a one-liner).
    * **Parentheses rule:** exactly one parameter can drop its `()`: `email => email.includes("@")`.

* **⭐️ Class Exercise: Convert Your Validators**
    * Rewrite your Week 2 `isValidEmail`, `isMessageLongEnough`, and `isContactMethodChosen` as arrow functions.

---

### 2. Array Method: `.forEach()`

* **Lecture & Concepts:**
    * **Replaces the `for` loop for iteration.** Runs a callback once per element. Returns `undefined` — it's for side effects (like appending to the DOM), not building a new array.

* **In-Depth Example (Refactoring `renderProjects`):**
    ```javascript
    function renderProjects(projectList) {
      const workGrid = document.querySelector('.work-grid');
      workGrid.textContent = "";

      // Old: for (let i = 0; i < projectList.length; i++) { ... }
      // New:
      projectList.forEach(project => {
        const card = document.createElement('article');
        card.className = project.featured
          ? 'project-card project-card--featured'
          : 'project-card';

        const title = document.createElement('h3');
        title.className = 'project-card__title';
        title.textContent = project.title;

        const description = document.createElement('p');
        description.className = 'project-card__description';
        description.textContent = project.description;

        card.append(title, description);
        workGrid.append(card);
      });
    }
    ```

---

### 3. Array Method: `.map()`

* **Lecture & Concepts:**
    * **The "Transformation" Method.** Creates a **brand new array** by running a callback on every element and collecting the results. Same length as the original, different content.

* **In-Depth Example (Getting Just the Titles):**
    ```javascript
    const projectTitles = projects.map(project => project.title);
    console.log(projectTitles); // ["Weather App", "Task Tracker", "This Portfolio"]
    ```

---

### 4. Array Method: `.filter()`

* **Lecture & Concepts:**
    * **The "Selection" Method.** Creates a **new, possibly-shorter array** keeping only elements where the callback returns `true`.

* **In-Depth Example (A Real "Show Featured Only" Toggle):**
    ```javascript
    const featuredToggle = document.querySelector('#featured-toggle'); // add this <button> to index.html
    let showFeaturedOnly = false;

    featuredToggle.addEventListener('click', () => {
      showFeaturedOnly = !showFeaturedOnly;

      const projectsToShow = showFeaturedOnly
        ? projects.filter(project => project.featured)
        : projects;

      renderProjects(projectsToShow);
      featuredToggle.textContent = showFeaturedOnly ? "Show All" : "Show Featured Only";
    });
    ```

* **⭐️ Class Exercise: Add the Real Toggle**
    1.  Add a `<button id="featured-toggle">Show Featured Only</button>` near your Featured Work heading.
    2.  Wire it exactly as shown above.
    3.  Click it and confirm the grid re-renders with only your `featured: true` project, then back to all of them.

---

## Module 11: More ES6+ Features & Persistence

### 1. Destructuring

* **Lecture & Concepts:**
    * A shortcut for "unpacking" values from objects (or arrays) into their own variables.

* **In-Depth Example (Cleaning Up `renderProjects`):**
    ```javascript
    function renderProjects(projectList) {
      const workGrid = document.querySelector('.work-grid');
      workGrid.textContent = "";

      projectList.forEach(({ title, description, featured }) => {
        // 'title', 'description', and 'featured' are destructured
        // straight out of the parameter — no "project.title" needed anymore
        const card = document.createElement('article');
        card.className = featured ? 'project-card project-card--featured' : 'project-card';

        const titleEl = document.createElement('h3');
        titleEl.className = 'project-card__title';
        titleEl.textContent = title;

        const descriptionEl = document.createElement('p');
        descriptionEl.className = 'project-card__description';
        descriptionEl.textContent = description;

        card.append(titleEl, descriptionEl);
        workGrid.append(card);
      });
    }
    ```

---

### 2. Spread (`...`)

* **Lecture & Concepts:**
    * "Spreads" an array or object into its individual items. The safe way to **copy** or **merge** without mutating the original.

* **In-Depth Example (A Modified Copy, Without Mutating the Original):**
    ```javascript
    const original = projects[0];
    const withBadge = { ...original, tags: [...original.tags, "Live"] };

    console.log(original.tags);  // ["React Native", "Expo"] (unchanged)
    console.log(withBadge.tags); // ["React Native", "Expo", "Live"]
    ```

---

### 3. `localStorage` & a Real Dark Mode Toggle

* **Lecture & Concepts:**
    * **`localStorage`** persists small amounts of data in the browser *across page loads and across your 3 pages* — perfect for "remember the user's theme choice."
    * **`localStorage.setItem(key, value)`** / **`localStorage.getItem(key)`**: values are always **strings**. For anything more complex than a string, use `JSON.stringify()`/`JSON.parse()` — not needed here since `"dark"`/`"light"` are already strings.
    * Recall the **`??`** (nullish coalescing) operator from Week 1 — perfect for "use the saved theme if there is one, otherwise default to light."

* **In-Depth Example (Real, Persistent Dark Mode):**
    ```javascript
    const themeToggle = document.querySelector('#theme-toggle'); // add this <button> to your header, all 3 pages

    function applyTheme(theme) {
      document.body.classList.toggle('dark-mode', theme === 'dark');
      themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }

    // On page load: read the saved theme, or default to 'light'
    const savedTheme = localStorage.getItem('theme') ?? 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      const newTheme = isDark ? 'light' : 'dark';

      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme); // persist it
    });
    ```
    *You'll need a `.dark-mode` rule in your `style.css` (e.g., overriding your CSS variables' values) — that part is CSS, not JS; this is exactly the kind of "JS owns the state, CSS owns the look" split from Week 4.*

* **⭐️ Class Exercise: Add Real Dark Mode**
    1.  Add a `<button id="theme-toggle">🌙 Dark Mode</button>` to your header, on all 3 pages.
    2.  Add the `applyTheme` + `localStorage` logic above to `script.js`.
    3.  Toggle it, then **refresh the page** — confirm the theme you chose is still applied.
    4.  Navigate to a different one of your 3 pages — confirm the theme carries over there too.

---

### Week 5: Comprehensive Assignment

**Objective:** Refactor your rendering code to modern ES6+ syntax, and ship a real, persistent dark-mode toggle.

**Files to Use:**
1.  `index.html`, `about.html`, `contact.html` (add `#theme-toggle` to the header on all 3)
2.  `style.css` (add a `.dark-mode` rule set)
3.  `script.js`

**Requirements:**

1.  **Arrow Functions:** Convert your Week 2 validators and Week 4 `renderProjects` callback to arrow functions.
2.  **`.forEach()`/`.map()`:** Refactor `renderProjects`'s manual `for` loop to use `.forEach()`.
3.  **Destructuring:** Destructure `{ title, description, featured }` directly in the `renderProjects` callback parameter.
4.  **`.filter()`:** Keep (or add) the "Show Featured Only" toggle from Module 10.
5.  **Dark Mode:** A real `#theme-toggle` button, present on all 3 pages, that adds/removes `.dark-mode` on `<body>`, persists the choice via `localStorage`, and re-applies it correctly on every page load.

**Bonus Challenge:** Use the spread operator to build a `projectsWithLiveBadge` array where every project gets an extra `"Live"` tag appended, without mutating the original `projects` array — verify the original is untouched by logging both.
