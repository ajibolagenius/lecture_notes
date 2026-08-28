# 📚 Deejoft Notes — Comprehensive Software Engineering Curriculum

Welcome to the **Deejoft Notes** repository. This repository contains a structured, end-to-end software engineering curriculum, comprehensive lecture notes, lesson guides, and accompanying project codebases across modern frontend, backend, mobile, and automation tracks.

---

## 🎯 Curriculum Architecture & Learning Paths

The curriculum is engineered around **continuous, real-world projects** rather than isolated toy examples:

```
                                  ┌──────────────────────────────────────────────┐
                                  │           Full-Stack Web Pathway             │
                                  └──────────────────────────────────────────────┘
                                                         │
                                  ┌──────────────────────▼───────────────────────┐
                                  │       1. HTML5 (Semantic Architecture)       │
                                  │      Continuous Project: Portfolio Skeleton  │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                  ┌──────────────────────▼───────────────────────┐
                                  │      2. CSS3 (Modern Layout & Responsive)    │
                                  │      Continuous Project: Styled Portfolio    │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                  ┌──────────────────────▼───────────────────────┐
                                  │       3. JavaScript (ES6+ & Async/DOM)       │
                                  │    Continuous Project: Interactive Portfolio │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                  ┌──────────────────────▼───────────────────────┐
                                  │          4. React (SPA with Vite)            │
                                  │    Continuous Project: Component Portfolio   │
                                  └──────────────────────────────────────────────┘

         ┌──────────────────────────────────────┐              ┌──────────────────────────────────────┐
         │       Backend API Development        │              │       Mobile App Development         │
         ├──────────────────────────────────────┤              ├──────────────────────────────────────┤
         │ 5. Node.js & Express (REST & SQL)    │◄────────────►│ 6. React Native & Expo (Mobile App)  │
         │ Continuous Project: Reminders API    │   Consumes   │ Continuous Project: Reminders Mobile │
         └──────────────────────────────────────┘   Endpoints  └──────────────────────────────────────┘

                                  ┌──────────────────────────────────────────────┐
                                  │         Python & Desktop Automation          │
                                  ├──────────────────────────────────────────────┤
                                  │ 7. Python Track (Core to GUI & Packaging)    │
                                  │ Continuous Project: Expense & Task Tracker   │
                                  └──────────────────────────────────────────────┘
```

---

## 📁 Repository Overview

```
.
├── html_class_notes/           # 7-Week HTML5 Semantic & Web Structure Track
├── css_class_notes/            # 6-Week CSS3 Box Model, Flexbox, Grid & Responsive Track
├── javascript_class_notes/     # 6-Week Core & Advanced ES6+ JavaScript (+ Portfolio App)
├── react_class_notes/          # 6-Week React Architecture, Hooks & State (+ Vite App)
├── node_express_class_notes/   # 6-Week Node.js, Express, PostgreSQL REST API (+ Reminders API)
├── react_native_class_notes/   # 6-Week React Native, Expo Router Mobile App (+ Project)
└── python_class_notes/         # 4-Part Python Foundations, Automation, OOP & GUI Track
```

---

## 📖 Course Tracks & Detailed Modules

### 🌐 1. HTML5: Semantic Structure & Web Foundations
* **Duration:** 7 Weeks
* **Goal:** Master document structuring, semantic tags, forms, multimedia embedding, web accessibility (a11y), and SEO.
* **Continuous Project:** Personal Portfolio Website Skeleton.

| Module / Week | Document | Key Topics |
| :--- | :--- | :--- |
| **Course Outline** | [HTML_Course_Outline.md](./html_class_notes/HTML_Course_Outline.md) | Full syllabus, learning outcomes & delivery schedule |
| **Week 1** | [Week 1: The Absolute Fundamentals](./html_class_notes/Week%201_%20The%20Absolute%20Fundamentals.md) | Web intro, developer tools, `<!DOCTYPE>`, head metadata, Git basics |
| **Week 2** | [Week 2: Structuring Content](./html_class_notes/Week%202_%20Structuring%20Content.md) | Headings, paragraphs, lists, links, images, text formatting |
| **Week 3** | [Week 3: Semantic Layout & Tables](./html_class_notes/Week%203_%20Semantic%20Layout%20%26%20Tables.md) | `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, accessible tables |
| **Week 4** | [Week 4: HTML Forms](./html_class_notes/Week%204_%20HTML%20Forms.md) | Input types, validation, labels, textareas, select dropdowns, form attributes |
| **Week 5** | [Week 5: Multimedia & Embedding](./html_class_notes/Week%205_%20Multimedia%20%26%20Embedding.md) | Audio, video, iframes, SVG basics, responsive picture elements |
| **Week 6** | [Week 6: Advanced HTML & Best Practices](./html_class_notes/Week%206_%20Advanced%20HTML%20%26%20Best%20Practices.md) | Microdata, Open Graph metadata, ARIA basics, web accessibility audits |
| **Week 7** | [Week 7: Modern Interactions & Performance](./html_class_notes/Week%207_%20Modern%20Interactions%20%26%20Performance%20Tuning.md) | `<dialog>`, `<details>`, lazy loading, performance optimizations, deployment |

---

### 🎨 2. CSS3: Modern Layout & Responsive Design
* **Duration:** 6 Weeks
* **Goal:** Master the CSS box model, typography, color theory, Flexbox, Grid, animations, and responsive mobile-first design.
* **Continuous Project:** Styling the Personal Portfolio Website.

| Module / Week | Document | Key Topics |
| :--- | :--- | :--- |
| **Course Outline** | [CSS_Course_Outline.md](./css_class_notes/CSS_Course_Outline.md) | Full syllabus & design methodology |
| **Week 1** | [Week 1: The Fundamentals](./css_class_notes/Week%201_%20The%20Fundamentals.md) | Selectors, specificity, cascade, inheritance, color systems, units |
| **Week 2** | [Week 2: The Box Model](./css_class_notes/Week%202_%20The%20Box%20Model.md) | Margin, border, padding, content, `box-sizing: border-box`, display types |
| **Week 3** | [Week 3: Styling Content](./css_class_notes/Week%203_%20Styling%20Content.md) | Web fonts, typography scale, backgrounds, borders, shadows, gradients |
| **Week 4** | [Week 4: Layout (Part 1)](./css_class_notes/Week%204_%20Layout%20%28Part%201%29.md) | Positioning (relative, absolute, fixed, sticky), Flexbox deep dive |
| **Week 5** | [Week 5: Layout (Part 2) & Responsive Design](./css_class_notes/Week%205_%20Layout%20%28Part%202%29%20%26%20Responsive%20Design.md) | CSS Grid systems, media queries, mobile-first responsive architecture |
| **Week 6** | [Week 6: Advanced Polish & Modern Workflow](./css_class_notes/Week%206_%20Advanced%20Polish%20%26%20Modern%20Workflow.md) | CSS Variables, transitions, keyframe animations, modern CSS reset & architecture |

---

### ⚡ 3. JavaScript: Core to Modern ES6+ & Async
* **Duration:** 6 Weeks
* **Goal:** Master core language fundamentals, data structures, DOM manipulation, asynchronous programming, and Fetch API.
* **Included Codebase:** [javascript_class_notes/portfolio](./javascript_class_notes/portfolio)

| Module / Week | Document | Key Topics |
| :--- | :--- | :--- |
| **Course Outline** | [JavaScript_Course_Outline.md](./javascript_class_notes/JavaScript_Course_Outline.md) | Full syllabus & JavaScript mastery map |
| **Week 1** | [Week 1: JavaScript Fundamentals](./javascript_class_notes/Week%201_%20JavaScript%20Fundamentals.md) | Variables (`let`/`const`), data types, operators, type coercion, debugging |
| **Week 2** | [Week 2: Control Flow & Functions](./javascript_class_notes/Week%202_%20Control%20Flow%20%26%20Functions.md) | Conditionals, loops, function declarations/expressions, arrow functions, scope |
| **Week 3** | [Week 3: Data Structures](./javascript_class_notes/Week%203_%20Data%20Structure%20-%20Arrays%20and%20Objects.md) | Arrays & higher-order methods (`map`, `filter`, `reduce`), objects, references |
| **Week 4** | [Week 4: The DOM & Modern JS Intro](./javascript_class_notes/Week%204_%20The%20DOM%20%26%20Modern%20JS%20Introduction.md) | DOM querying, event listeners, DOM manipulation, bubbling & delegation |
| **Week 5** | [Week 5: Modern JavaScript Deep Dive (ES6+)](./javascript_class_notes/Week%205_%20Modern%20JavaScript%20Deep%20Dive%20%28ES6%2B%29.md) | Destructuring, spread/rest, template literals, ES modules, LocalStorage |
| **Week 6** | [Week 6: Asynchronous JavaScript & The Future](./javascript_class_notes/Week%206_%20Asynchronous%20JavaScript%20%26%20The%20Future.md) | Event loop, Callbacks, Promises, `async/await`, Fetch API, GitHub API integration |

---

### ⚛️ 4. React: Modern Single Page Applications
* **Duration:** 6 Weeks
* **Goal:** Component-driven development, state management, hooks, React Router, side-effects, form handling, and build tooling with Vite.
* **Included Codebase:** [react_class_notes/golden](./react_class_notes/golden) (Vite + React SPA)

| Module / Week | Document | Key Topics |
| :--- | :--- | :--- |
| **Course Outline** | [React_Course_Outline.md](./react_class_notes/React_Course_Outline.md) | Full React syllabus & project milestones |
| **Practice Guide** | [React_Practice_Projects.md](./react_class_notes/React_Practice_Projects.md) | Supplementary practice projects and challenges |
| **Week 1** | [Week 1: Setup, Git & Fundamentals](./react_class_notes/Week%201_%20Setup%2C%20Git%2C%20%26%20React%20Fundamentals.md) | Vite tooling, JSX, declarative UI, component decomposition, props |
| **Week 2** | [Week 2: State, Props & Interactivity](./react_class_notes/Week%202_%20State%2C%20Props%2C%20%26%20Interactivity.md) | `useState`, immutable updates, lifting state up, event handling |
| **Week 3** | [Week 3: Lifecycle, Conditionals & Fetching](./react_class_notes/Week%203_%20Lifecycle%2C%20Conditionals%2C%20%26%20Data%20Fetching.md) | `useEffect`, cleanup, conditional rendering, loading & error states, API fetching |
| **Week 4** | [Week 4: Forms, Styling & Refs](./react_class_notes/Week%204_%20Forms%2C%20Styling%2C%20%26%20Refs.md) | Controlled inputs, validation, CSS modules, `useRef` |
| **Week 5** | [Week 5: Routing & Global State](./react_class_notes/Week%205_%20Routing%20%26%20Global%20State.md) | React Router 6/7, layout routes, Context API, state providers |
| **Week 6** | [Week 6: Advanced React & Final Project](./react_class_notes/Week%206_%20Advanced%20React%20%26%20Final%20Project.md) | Custom hooks, performance (`useMemo`, `useCallback`, `React.memo`), unit testing, production build |

---

### 🚀 5. Node.js & Express: Production REST API
* **Duration:** 6 Weeks
* **Goal:** Build a production-ready layered REST API with Node.js, Express, raw SQL queries via PostgreSQL (`pg`), JWT authentication, input validation, and security best practices.
* **Included Codebase:** [node_express_class_notes/reminders-api](./node_express_class_notes/reminders-api)

| Module / Week | Document | Key Topics |
| :--- | :--- | :--- |
| **Course Outline** | [Node_Express_Course_Outline.md](./node_express_class_notes/Node_Express_Course_Outline.md) | Full backend syllabus & API specifications |
| **Week 1** | [Week 1: Fundamentals & Server Setup](./node_express_class_notes/Week%201_%20Node.js%20%26%20Express%20Fundamentals.md) | Node runtime, Express 5 setup, HTTP methods, CRUD routing, Postman/Thunder Client |
| **Week 2** | [Week 2: Designing & Building REST APIs](./node_express_class_notes/Week%202_%20Designing%20%26%20Building%20a%20REST%20API.md) | REST design conventions, Controller-Service-Model architecture, middleware |
| **Week 3** | [Week 3: PostgreSQL with Raw SQL](./node_express_class_notes/Week%203_%20Databases%20with%20PostgreSQL%20%28Raw%20SQL%29.md) | Relational modeling, Neon Postgres, `pg` pool, parameterized queries, migrations |
| **Week 4** | [Week 4: Authentication & Authorization](./node_express_class_notes/Week%204_%20Authentication%20%26%20Authorization.md) | Password hashing (`bcrypt`), JSON Web Tokens (JWT), auth middleware, protected routes |
| **Week 5** | [Week 5: Validation & Error Handling](./node_express_class_notes/Week%205_%20Validation%2C%20Error%20Handling%20%26%20Connecting%20the%20Mobile%20Client.md) | Request validation, centralized error handler, CORS, connecting mobile clients |
| **Week 6** | [Week 6: Testing, Security & Deployment](./node_express_class_notes/Week%206_%20Testing%2C%20Security%20%26%20Deployment%20%28Final%20Project%29.md) | Automated tests (`supertest`/`jest`), rate limiting, Helmet, env variables, production deploy |

---

### 📱 6. React Native & Expo: Cross-Platform Mobile
* **Duration:** 6 Weeks
* **Goal:** Build and ship an installable mobile application with Expo, Expo Router, TypeScript, native device APIs, local persistence, and remote API synchronization.
* **Included Codebase:** [react_native_class_notes/project](./react_native_class_notes/project)

| Module / Week | Document | Key Topics |
| :--- | :--- | :--- |
| **Course Outline** | [React_Native_Course_Outline.md](./react_native_class_notes/React_Native_Course_Outline.md) | Full mobile syllabus & architectural guidelines |
| **Week 1** | [Week 1: Web to Native & Core Components](./react_native_class_notes/Week%201_%20From%20Web%20to%20Native%20%E2%80%94%20Expo%20%26%20Core%20Components.md) | Expo SDK, `View`, `Text`, `Image`, `StyleSheet`, Flexbox in Native, device testing |
| **Week 2** | [Week 2: Navigation with Expo Router](./react_native_class_notes/Week%202_%20Navigation%20with%20Expo%20Router.md) | File-based routing, Stack & Tabs navigation, dynamic routes, headers |
| **Week 3** | [Week 3: Lists, Forms & User Input](./react_native_class_notes/Week%203_%20Lists%2C%20Forms%20%26%20User%20Input.md) | `FlatList`, `SectionList`, `TextInput`, keyboard avoidance, form handling |
| **Week 4** | [Week 4: Device APIs & Local State](./react_native_class_notes/Week%204_%20Device%20APIs%20%26%20Local%20State.md) | Async Storage / Secure Store, Haptics, Camera/Media, theme providers |
| **Week 5** | [Week 5: Networking & Backend Integration](./react_native_class_notes/Week%205_%20Networking%20%E2%80%94%20Connecting%20to%20a%20Real%20Backend.md) | Connecting to Reminders API, token storage, auth flow, offline handling |
| **Week 6** | [Week 6: Polish, Testing & Shipping](./react_native_class_notes/Week%206_%20Polish%2C%20Testing%20%26%20Shipping%20%28Final%20Project%29.md) | App icons, splash screens, EAS Build configuration, release prep |

---

### 🐍 7. Python: Fundamentals, Automation & GUI Applications
* **Duration:** 4 Parts
* **Goal:** Build foundational programming skills, automation scripts, object-oriented systems, API clients, and packaged GUI desktop applications.
* **Continuous Project:** Personal Expense & Task Tracker.

| Part | Document | Key Topics |
| :--- | :--- | :--- |
| **Course Outline** | [Python_Course_Outline.md](./python_class_notes/Python_Course_Outline.md) | Full Python curriculum & milestone guide |
| **Part 1** | [Part 1: The Foundation](./python_class_notes/Part%201_%20The%20Foundation.md) | Environment setup (VS Code, Python PATH), variables, data types, I/O, math, strings |
| **Part 2** | [Part 2: Automation & Structure](./python_class_notes/Part%202_%20Automation%20%26%20Structure.md) | Control flow (`if`/`else`), loops, functions, lists, dictionaries, tuples, file I/O |
| **Part 3** | [Part 3: Intermediate Mastery](./python_class_notes/Part%203_%20Intermediate%20Mastery.md) | OOP (Classes & Objects), modular code, error handling (`try`/`except`), consuming APIs |
| **Part 4** | [Part 4: Deployment & Interfaces](./python_class_notes/Part%204_%20Deployment%20%26%20Interfaces.md) | GUI development with Tkinter, packaging desktop executables with PyInstaller |

---

## 🛠️ Tech Stack & Tooling

* **Frontend:** HTML5, CSS3, JavaScript (ES6+), React 19, Vite, React Router, Context API
* **Backend:** Node.js 24.x LTS, Express 5, PostgreSQL (Neon), `pg` driver, `bcrypt`, JSON Web Tokens (`jsonwebtoken`)
* **Mobile:** React Native 0.81, Expo SDK 54, Expo Router 6, TypeScript
* **Automation & Scripting:** Python 3.x, Tkinter, `requests`, PyInstaller
* **Tooling & Environment:** Visual Studio Code, Git, GitHub, Postman / Thunder Client, Netlify

---

## 🚀 How to Run the Accompanying Projects

### 1. React Web Portfolio (`react_class_notes/golden`)
```bash
cd react_class_notes/golden
npm install
npm run dev
```

### 2. Node.js & Express Reminders API (`node_express_class_notes/reminders-api`)
```bash
cd node_express_class_notes/reminders-api
npm install
# Set your DATABASE_URL and JWT_SECRET in .env
npm run dev
```

### 3. React Native Mobile App (`react_native_class_notes/project`)
```bash
cd react_native_class_notes/project
npm install
npx expo start
```

---

## 📄 License & Attribution

All notes, course outlines, and project code are maintained as part of the **Deejoft Software Engineering Program**. Designed for practical, project-first developer education.
