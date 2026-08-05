# Week 1: Setup, Git, & React Fundamentals

Welcome to Week 1! This week is all about building a solid foundation. We'll set up a professional development environment, learn the fundamentals of version control with Git, and write our very first React components.

---

## 🚀 Module 1: The Modern React Environment

**Objective:** Understand what React is, why it's used, and set up a complete, modern toolchain including Vite and Git.

### 1. What is React?

* **Lecture & Concepts:**
    * **What it is:** React is a free and open-source JavaScript **library** for building user interfaces (UIs). It is *not* a full framework (like Angular).
    * **The Core Philosophy:** Its goal is to let you build complex UIs from small, isolated pieces of code called **components**.
    * **Declarative vs. Imperative:**
        * **Imperative (The "Old Way"):** Manually telling the browser *how* to change. (e.g., "Find the element with ID 'user-name', then set its `textContent` to 'Alex'").
        * **Declarative (The "React Way"):** You just *describe* what the UI should look like for a given state, and React figures out the *how*. ($UI = f(state)$). You tell React you want the name to be "Alex," and React handles updating the DOM.
    * **The Virtual DOM (VDOM):** This is *how* React is declarative and fast. Instead of re-building the entire webpage on every change, React builds a lightweight copy of the DOM in memory (the VDOM). When your data changes, it creates a *new* VDOM, compares it to the *old* one, and calculates the most minimal, efficient set of changes needed for the *real* DOM.

* **Practical Application:**
    * **Analysis:** Open any modern web app (e.g., Facebook, Airbnb, Netflix).
    * **Discussion:** Identify the "components."
        * The main navigation bar is a `<Navbar>` component.
        * The search bar is a `<SearchBar>` component.
        * Each movie card in a list is a `<MovieCard>` component.
        * The "Like" button is a `<LikeButton>` component, likely *inside* the `<MovieCard>`.
    * This exercise trains you to "think in components."

### 2. Tools & Setup (The "Dev Environment")

* **Lecture & Concepts:**
    * **Node.js & npm:** Why do we need Node.js if React runs in the browser? Node.js is a **JavaScript runtime** for your *computer*. We use it to run our development server (Vite) and to manage our project's packages (dependencies) via **npm** (Node Package Manager). We will use the **LTS (Long-Term Support)** version.
    * **VS Code:** Your code editor. We'll install key extensions to make life easier.

* **Practical Application:**
    1.  **Install Node.js:** Go to [nodejs.org](https://nodejs.org/) and download the **LTS** version. Verify by opening your terminal and running `node -v` and `npm -v`.
    2.  **Install VS Code:** Go to [code.visualstudio.com](https://code.visualstudio.com/) and install it.
    3.  **Configure VS Code Extensions:** Open VS Code, go to the Extensions tab, and install:
        * **`ES7+ React/Redux/React-Native snippets`**: Invaluable for boilerplate. (Try typing `rfce` in a `.jsx` file after installing).
        * **`Prettier - Code formatter`**: Automatically formats your code on save.
        * **`ESLint`**: Catches errors and style issues as you type.

### 3. Intro to Git & Github

* **Lecture & Concepts:**
    * **Git:** A **distributed version control system**. Think of it as "save points" for your code. It lets you track changes, go back to previous versions, and collaborate with others.
    * **Github:** A **hosting service** for your Git repositories. It's the "cloud" for your code, enabling collaboration, backup, and portfolio building.
    * **The Basic Workflow:**
        1.  **`git init`**: Initialize a new Git repository in your project folder.
        2.  **`git status`**: Check what files have changed.
        3.  **`git add .`**: "Stage" all your changes (add them to the "snapshot" you're about to take).
        4.  **`git commit -m "Your message"`**: Take the snapshot and add a descriptive message.
        5.  **`git push`**: Upload your local "commits" (snapshots) to a remote repository (like Github).
        6.  **`git pull`**: Download changes from a remote repository.

* **Practical Application (The First Commit):**
    1.  **Create Github Repo:** Go to [Github.com](https://github.com/). Create a new, *empty* repository (do *not* add a README or .gitignore).
    2.  **Create Local Project:** On your computer, create a new folder (e.g., `my-first-repo`). `cd` into it.
    3.  **`git init`**: Run this in your terminal.
    4.  **Create a file:** Create `README.md` and write "Hello World" in it.
    5.  **`git status`**: See that your new file is "untracked."
    6.  **`git add .`**: Stage the file.
    7.  **`git commit -m "Initial commit: Add README.md"`**: Save your first snapshot.
    8.  **Link to Github:** Copy the commands from your empty Github repo (the "push an existing repository" part).
        ```bash
        git remote add origin <your-repo-url.git>
        git branch -M main
        git push -u origin main
        ```
    9.  Refresh your Github page. Your file is there!

### 4. ⚡ Scaffolding with Vite

* **Lecture & Concepts:**
    * **What is Vite?** Vite is a modern, extremely fast build tool and development server. It replaces older tools like Create React App (CRA).
    * **Why Vite?** Its speed. It uses native ES modules in the browser during development, so your server starts almost instantly. Its **Hot Module Replacement (HMR)** is lightning-fast, meaning your changes appear in the browser without a full page reload.

* **Practical Application (Creating Your Project):**
    1.  **Run the command:** In your terminal (in the folder *outside* your project), run:
        ```bash
        npm create vite@latest my-react-app -- --template react
        ```
    2.  **Navigate and Install:**
        ```bash
        cd my-react-app
        npm install
        ```
    3.  **Run the Dev Server:**
        ```bash
        npm run dev
        ```
    4.  Open the `localhost` URL in your browser. You have a running React app!
    5.  **Integrate Git:**
        ```bash
        git init
        git add .
        git commit -m "Initial commit: Scaffold React project with Vite"
        ```
    6.  **Project Structure Deep-Dive:**
        * `index.html`: The **single HTML file** for your entire app (it's a Single Page Application, or SPA). Notice the `<div id="root"></div>`. This is where React will "attach."
        * `src/main.jsx`: The **JavaScript entry point**. This file finds the `root` div and tells React to render your `<App />` component inside it.
        * `src/App.jsx`: Your **root component**. This is the top-level component for your application.
        * `src/index.css`: A global stylesheet applied to your whole app.

---

## 🎨 Module 2: JSX & Your First Components

**Objective:** Learn to write JSX (the syntax of React) and build your first reusable, functional components.

### 1. What is JSX?

* **Lecture & Concepts:**
    * **JavaScript XML (JSX):** It's a syntax extension for JavaScript that *looks* like HTML but is actually JavaScript. It's the "language" you use to describe your UI in React.
    * **JSX is *not* HTML:** It's "syntactic sugar" for a JavaScript function call: `React.createElement()`.
    * **Example:**
        * **You write this (JSX):**
            ```jsx
            const element = <h1 className="greeting">Hello, world!</h1>;
            ```
        * **Babel (the compiler) turns it into this (JS):**
            ```javascript
            const element = React.createElement(
              'h1',
              {className: 'greeting'},
              'Hello, world!'
            );
            ```
    * **The "Gotchas" (Key Rules):**
        1.  **Single Parent Element:** A component must return a *single* root element. If you have multiple, wrap them in a **Fragment:** `<> ... </>`.
        2.  **`className` not `class`:** `class` is a reserved word in JavaScript.
        3.  **CamelCase Attributes:** HTML attributes like `onclick` and `for` become `onClick` and `htmlFor` in JSX.
        4.  **All Tags Must Be Closed:** `<img>` is not valid. It must be self-closing: `<img />`. Same for `<input />`, `<br />`, etc.

* **Practical Application:**
    1.  Open `src/App.jsx` in your Vite project.
    2.  Delete all the default content.
    3.  Write your first JSX from scratch:
        ```jsx
        function App() {
          return (
            <>
              <h1 className="main-heading">My First React App</h1>
              <p>This is so cool!</p>
              <label htmlFor="my-input">My Input: </label>
              <input id="my-input" />
            </>
          );
        }
        export default App;
        ```
    4.  Notice the use of `<>`, `className`, and `htmlFor`.

### 2. JavaScript in JSX (The Curly Braces `{}`)

* **Lecture & Concepts:**
    * The curly braces `{}` are your "escape hatch" back into JavaScript. Inside them, you can write any valid JavaScript *expression* (something that evaluates to a value).
    * You can use variables, function calls, math, etc.
    * **You *cannot* put statements** (like `if`, `for`, `switch`).
    * **Inline Styles:** Done with an *object*. The "double curlies" `style={ { ... } }` are not special syntax:
        * The outer `{}` is the JSX "escape hatch."
        * The inner `{}` is the JavaScript object literal.
        * Properties must be camelCased: `background-color` becomes `backgroundColor`.

* **Practical Application:**
    * Modify your `src/App.jsx`:
        ```jsx
        function App() {
          const userName = "Alex";
          const appTitle = "React Basics";
          const styles = {
            color: "blue",
            fontSize: "24px", // Note: camelCase and string value
            backgroundColor: "#f0f0f0"
          };

          return (
            <>
              {/* Variable */}
              <h1>Welcome to {appTitle}, {userName}!</h1>

              {/* Math & Function Call */}
              <p>Your lucky number is {Math.floor(Math.random() * 100)}</p>

              {/* Attribute */}
              <img src="[https://vitejs.dev/logo.svg](https://vitejs.dev/logo.svg)" alt="Vite Logo" />

              {/* Inline Style Object */}
              <p style={styles}>This paragraph is styled with a JS object.</p>

              {/* Direct Inline Style (less common) */}
              <p style={{ color: "red" }}>This one is red.</p>
            </>
          );
        }
        export default App;
        ```

### 3. Functional Components

* **Lecture & Concepts:**
    * **What is a Component?** A component is a reusable, self-contained piece of UI. In modern React, it's **just a JavaScript function that returns JSX**.
    * **Two Core Rules:**
        1.  The function name **must** start with a capital letter (e.g., `MyComponent`, not `myComponent`). This is how React distinguishes components from plain HTML tags.
        2.  The function **must** return JSX (or `null`).
    * **Import/Export (ES6 Modules):**
        * `export default FunctionName`: The standard way to export a single component from a file.
        * `import FunctionName from './path/to/file.jsx'`: How you import that component to use it elsewhere.
    * **File Structure:** Best practice is to create a `src/components` folder and give each component its own file (e.g., `src/components/Header.jsx`).

* **Practical Application (Component-izing Your App):**
    1.  **Create a folder:** `src/components`
    2.  **Create a new file:** `src/components/Header.jsx`
        ```jsx
        // This is a component. It's just a function.
        export default function Header() {
          const appTitle = "React Basics";

          return (
            <header>
              <h1>Welcome to {appTitle}!</h1>
            </header>
          );
        }
        ```
    3.  **Create another file:** `src/components/WelcomeMessage.jsx`
        ```jsx
        export default function WelcomeMessage() {
          const userName = "Alex";

          return (
            <p>
              We're so glad you're here, {userName}.
            </p>
          );
        }
        ```
    4.  **Refactor `src/App.jsx` to use them:**
        ```jsx
        // Import your new components
        import Header from './components/Header.jsx';
        import WelcomeMessage from './components/WelcomeMessage.jsx';

        function App() {
          // App's only job is to assemble other components
          return (
            <>
              <Header />
              <main>
                <WelcomeMessage />
                <p>This is the main content of the page.</p>
              </main>
            </>
          );
        }

        export default App;
        ```
    5.  Your app looks the same, but it's now built from reusable, organized, and maintainable components.

---

## 🏕️ Week 1 Assignment: Static Portfolio Card

**Objective:** Combine all skills from Week 1 (Git, Vite, JSX, Components) to build a static portfolio card.

### 1. Setup
1.  Go to Github and create a **new, empty repository** called `react-week1-portfolio`.
2.  On your computer, `cd` into your main development folder.
3.  Clone your new repo: `git clone <your-repo-url.git>`
4.  `cd react-week1-portfolio`
5.  Scaffold a new Vite project *inside this folder*:
    ```bash
    npm create vite@latest . -- --template react
    ```
    (Note the `.` which means "use the current folder").
6.  `npm install`
7.  `npm run dev` to start the server.
8.  Commit your setup:
    ```bash
    git add .
    git commit -m "Initial commit: Scaffold Vite project"
    git push origin main
    ```

### 2. Tasks

Your goal is to build this component structure:
```
App
└── PortfolioCard
    ├── Avatar
    ├── UserInfo
    └── SkillList
```

1.  **Clean `App.jsx`:** Delete all default content. Its only job should be to import and render your main `<PortfolioCard />` component.
2.  **Create `src/components/PortfolioCard.jsx`:** This component will be the main "card" that wraps everything else. It should import and render the next three components.
3.  **Create `src/components/Avatar.jsx`:** This component should return an `<img>` tag. You can find a profile picture URL online or, for a bonus, add an image to the `public/` folder in Vite and use it (e.g., `<img src="/my-image.png" />`).
4.  **Create `src/components/UserInfo.jsx`:** This component should return an `<h1>` with your name and a `<p>` with a short bio (e.g., "Full-Stack Developer learning React").
5.  **Create `src/components/SkillList.jsx`:** This component should return a `<ul>` with at least three `<li>` elements listing your skills (e.g., "HTML", "CSS", "JavaScript").

### 3. Styling
* You don't need to be a CSS expert. Use the global `src/index.css` file.
* Add some simple styles to make it look like a card. You can use this as a starting point:

```css
/* Add this to index.css */
body {
  font-family: sans-serif;
  background-color: #f4f4f4;
  display: grid;
  place-items: center;
  min-height: 100vh;
}

.portfolio-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 400px;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
}

.user-info h1 {
  margin: 0;
  font-size: 24px;
}

.user-info p {
  font-size: 16px;
  color: #555;
  margin-top: 4px;
}

.skill-list {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.skill-list li {
  background-color: #e0f7fa;
  color: #00796b;
  padding: 8px 12px;
  border-radius: 16px;
  font-weight: bold;
}
```
* To use these styles, add the className attributes in your components (e.g., <div className="portfolio-card">, <img className="avatar" />, etc.).

### 4. Git Workflow

* As you complete each major step (e.g., create all components, add styling), make a commit!

**Example:**

* `git add .`

* `git commit -m "feat: Create all portfolio card components"`

* (After styling...)

* `git add .`

* `git commit -m "style: Add CSS for portfolio card"`

When you are finished, `git push origin main` and submit your Github repository URL.

### Bonus Challenge

* Create a `src/components/Footer.jsx` component.

* Inside, add links (`<a>`) to your (real or fake) Github, LinkedIn, and Twitter profiles.

* Import and render this `<Footer />` component in `App.jsx`, below the `<PortfolioCard />`.
