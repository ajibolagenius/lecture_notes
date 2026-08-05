# Week 1: Setup, Git, & React Fundamentals

Welcome to Week 1! You've built your portfolio three times now — as static HTML, styled with CSS, and made interactive with vanilla JavaScript. This week, you start rebuilding it a fourth time: as a real React application. Same name, same bio, same projects — but now as reusable, composable components.

---

## 🚀 Module 1: The Modern React Environment

**Objective:** Understand what React is, why it's used, and set up a complete, modern toolchain including Vite and Git.

### 1. What is React?

* **Lecture & Concepts:**
    * **What it is:** React is a free and open-source JavaScript **library** for building user interfaces (UIs). It is *not* a full framework (like Angular).
    * **The Core Philosophy:** Its goal is to let you build complex UIs from small, isolated pieces of code called **components**.
    * **Declarative vs. Imperative:**
        * **Imperative (what your JS course did):** You manually told the browser *how* to change things — `document.createElement`, `element.append()`, `classList.toggle()`. You were responsible for every DOM update, step by step.
        * **Declarative (The "React Way"):** You just *describe* what the UI should look like for a given state, and React figures out the *how*. ($UI = f(state)$). Instead of manually creating and appending a `<li>` for each project (like your `renderProjects()` function did), you'll write `projects.map(project => <ProjectCard {...project} />)` and let React handle the DOM.
    * **The Virtual DOM (VDOM):** React builds a lightweight copy of the DOM in memory. When your data changes, it creates a *new* VDOM, compares it to the *old* one, and calculates the most minimal, efficient set of real DOM changes needed.

* **Practical Application:**
    * **Analysis:** Open your own real portfolio (`index.html`, `about.html`, `contact.html`) from the HTML/CSS/JS courses.
    * **Discussion:** Identify the "components" already hiding in your markup:
        * The `<header>` with your name and nav is a `<Header>` component.
        * Each `.project-card` `<article>` is a `<ProjectCard>` component.
        * The `<form>` on `contact.html` is a `<ContactForm>` component.
    * This exercise trains you to "think in components" — and previews exactly what you'll build this week.

### 2. Tools & Setup (The "Dev Environment")

* **Lecture & Concepts:**
    * **Node.js & npm:** A **JavaScript runtime** for your *computer*, used to run the Vite dev server and manage dependencies via **npm**. Use the **LTS** version.
    * **VS Code:** Install key extensions: **`ES7+ React/Redux/React-Native snippets`** (try typing `rfce` in a `.jsx` file), **`Prettier`**, and **`ESLint`**.

* **Practical Application:**
    1.  Install Node.js (LTS) from [nodejs.org](https://nodejs.org/). Verify with `node -v` and `npm -v`.
    2.  Install VS Code and the extensions above.

### 3. Intro to Git & Github

* **Lecture & Concepts:**
    * **Git:** A **distributed version control system** — "save points" for your code.
    * **Github:** A hosting service for your Git repositories.
    * **The Basic Workflow:** `git init` → `git add .` → `git commit -m "..."` → `git push`.

* **Practical Application (The First Commit):**
    1.  Create a new, empty repo on Github called `portfolio-react`.
    2.  On your computer, you'll scaffold directly into this repo below — hold off on `git init` until after Vite scaffolds the project.

### 4. ⚡ Scaffolding with Vite

* **Lecture & Concepts:**
    * **What is Vite?** A modern, extremely fast build tool and dev server, replacing older tools like Create React App.
    * **Why Vite?** Native ES modules during development mean an almost-instant server start, and lightning-fast **Hot Module Replacement (HMR)**.

* **Practical Application (Creating Your Real Project):**
    1.  **Scaffold:**
        ```bash
        npm create vite@latest portfolio-react -- --template react
        cd portfolio-react
        npm install
        npm run dev
        ```
    2.  Open the `localhost` URL — you have a running React app.
    3.  **Integrate Git:**
        ```bash
        git init
        git add .
        git commit -m "Initial commit: Scaffold portfolio-react with Vite"
        git remote add origin <your-repo-url.git>
        git branch -M main
        git push -u origin main
        ```
    4.  **Project Structure Deep-Dive:**
        * `index.html`: The single HTML file for this SPA. Note `<div id="root"></div>` — where React attaches.
        * `src/main.jsx`: The entry point. Renders your `<App />` into `#root`.
        * `src/App.jsx`: Your root component.
        * `src/index.css`: A global stylesheet.

---

## 🎨 Module 2: JSX & Your First Components

**Objective:** Learn to write JSX and build your first reusable, functional components — starting with your real header, bio, and first project card.

### 1. What is JSX?

* **Lecture & Concepts:**
    * **JavaScript XML (JSX):** A syntax extension for JavaScript that *looks* like HTML but compiles to `React.createElement()` calls.
    * **The "Gotchas" (Key Rules):**
        1.  **Single Parent Element:** Wrap multiple elements in a **Fragment:** `<> ... </>`.
        2.  **`className` not `class`.**
        3.  **CamelCase Attributes:** `onclick` → `onClick`, `for` → `htmlFor`.
        4.  **All Tags Must Be Closed:** `<img />`, not `<img>`.

* **Practical Application (Your Real Name, in JSX):**
    1.  Open `src/App.jsx` and delete the default content.
    2.  Write your first real JSX:
        ```jsx
        function App() {
          return (
            <>
              <h1>Alice Chen</h1>
              <p>Junior developer building projects in HTML, CSS, JavaScript, and React.</p>
            </>
          );
        }
        export default App;
        ```
        *(Use your own real name and bio line from HTML Week 1-2 here — not the placeholder above.)*

### 2. JavaScript in JSX (The Curly Braces `{}`)

* **Lecture & Concepts:**
    * Curly braces `{}` are your "escape hatch" back into JavaScript — for variables, function calls, and expressions (not statements like `if`/`for`).

* **Practical Application:**
    ```jsx
    function App() {
      const name = "Alice Chen";
      const tagline = "Building things, one module at a time.";

      return (
        <>
          <h1>{name}</h1>
          <p>{tagline}</p>
        </>
      );
    }
    export default App;
    ```

### 3. Functional Components

* **Lecture & Concepts:**
    * A component is **just a JavaScript function that returns JSX**.
    * **Two Core Rules:** the function name must start with a capital letter, and it must return JSX (or `null`).
    * Best practice: a `src/components` folder, one file per component.

* **Practical Application (Building Your Real Components):**
    1.  **`src/components/Header.jsx`:**
        ```jsx
        export default function Header() {
          return (
            <header>
              <h1>Alice Chen</h1>
              {/* Real nav links come in Week 5 once you have React Router */}
            </header>
          );
        }
        ```
    2.  **`src/components/Bio.jsx`:** (Reuse your real "About Me" text from HTML Week 1-2, verbatim.)
        ```jsx
        export default function Bio() {
          return (
            <section>
              <h2>About Me</h2>
              <p>
                Junior developer building projects in HTML, CSS, JavaScript, and React.
                Currently learning how to turn a static site into a real application.
              </p>
            </section>
          );
        }
        ```
    3.  **`src/components/ProjectCard.jsx`:** (Hardcoded for now — you'll make this reusable with props next week.)
        ```jsx
        export default function ProjectCard() {
          return (
            <article>
              <h3>Weather App</h3>
              <p>A React Native app that fetches live weather data.</p>
            </article>
          );
        }
        ```
    4.  **Assemble in `src/App.jsx`:**
        ```jsx
        import Header from './components/Header.jsx';
        import Bio from './components/Bio.jsx';
        import ProjectCard from './components/ProjectCard.jsx';

        function App() {
          return (
            <>
              <Header />
              <main>
                <Bio />
                <ProjectCard />
              </main>
            </>
          );
        }
        export default App;
        ```

---

## 🏕️ Week 1 Assignment: Rebuild Your Header & Bio in React

**Objective:** Scaffold your portfolio as a real React app, and rebuild the first pieces of it as components.

### 1. Setup
1.  Create the empty `portfolio-react` repo on Github.
2.  Scaffold: `npm create vite@latest portfolio-react -- --template react`.
3.  `npm install`, `npm run dev`, confirm it runs.
4.  `git init`, connect to your Github repo, and make your first commit.

### 2. Tasks

Build this real component structure:
```
App
├── Header (your real name)
├── Bio (your real About Me text)
└── ProjectCard (your first real project, hardcoded for now)
```

1.  **`Header.jsx`:** Your real name in an `<h1>`.
2.  **`Bio.jsx`:** Your real "About Me" paragraph, ported from HTML Week 1-2.
3.  **`ProjectCard.jsx`:** One of your real Featured Work projects (title + description), hardcoded — no props yet.
4.  **Assembly:** `App.jsx` imports and renders all three, in order.

### 3. Styling
* Add basic styles to `src/index.css` — reuse ideas from your CSS course (a `.card` look with padding/border/shadow is a good start for `ProjectCard`). You don't need to match your CSS course pixel-for-pixel; that convergence happens naturally as the course progresses.

### 4. Git Workflow
* Commit after each component: `git commit -m "feat: Add Header component"`, `git commit -m "feat: Add Bio component"`, etc.
* `git push origin main` when done.

### Bonus Challenge
* Create `src/components/Footer.jsx` with your real social links (from HTML Week 6's footer), and render it below your `<main>`.
