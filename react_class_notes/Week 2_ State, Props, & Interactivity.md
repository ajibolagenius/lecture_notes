# Week 2: State, Props, & Interactivity

Welcome to Week 2! Last week, your `ProjectCard` was hardcoded — one card, one project, no reuse. This week, you make it truly reusable with **Props**, render your real Featured Work data with it, and add your first piece of real interactivity: a tag filter, powered by **State**.

---

## 📦 Module 3: Props (Passing Data)

**Objective:** Make `ProjectCard` reusable and dynamic by passing it real project data.

### 1. What are Props?

* **Lecture & Concepts:**
    * "Props" stands for **properties** — the **arguments** you pass into a component, the same way you'd pass arguments into a function.
    * Data flows **unidirectionally**: Parent → Child.
    * **Immutability:** Props are **read-only**. A child cannot change its own props.

### 2. Passing and Receiving Props

* **Lecture & Concepts:**
    * **Passing:** Exactly like HTML attributes: `<ProjectCard title="Weather App" />`.
    * **Receiving:** Destructure the props object directly in the function signature: `function ProjectCard({ title, description })`.

* **Practical Application (Your Real `ProjectCard`, Made Reusable):**
    ```jsx
    // src/components/ProjectCard.jsx
    export default function ProjectCard({ title, description, tags, imageSrc }) {
      return (
        <article className="project-card">
          <img src={imageSrc} alt={title} />
          <h3>{title}</h3>
          <p>{description}</p>
          <ul>
            {tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
        </article>
      );
    }
    ```
    *Notice the `tags.map()` inside — a first, small look at rendering a list. Module 5 next week covers the `key` prop's importance in depth; for now, just know that `key` needs to be something stable and unique.*

* **Practical Application (Your Real Projects Array):**
    ```jsx
    // src/App.jsx (or a new src/data/projects.js, imported)
    const projects = [
      {
        id: 1,
        title: "Weather App",
        description: "A React Native app that fetches live weather data.",
        tags: ["React Native", "Expo"],
        imageSrc: "/weather-app.png",
        featured: false
      },
      {
        id: 2,
        title: "Task Tracker",
        description: "A Python CLI tool for tracking daily tasks.",
        tags: ["Python"],
        imageSrc: "/task-tracker.png",
        featured: false
      },
      {
        id: 3,
        title: "This Portfolio",
        description: "The very site you're looking at right now.",
        tags: ["React", "JavaScript"],
        imageSrc: "/portfolio-site.png",
        featured: true
      }
    ];

    function App() {
      return (
        <main>
          {projects.map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </main>
      );
    }
    ```
    *This is the exact same data you built in JS Week 3 — the same three real projects. `{...project}` ("prop spreading") passes every field of the object as its own prop, so `ProjectCard` receives `title`, `description`, `tags`, and `imageSrc` all at once.*

### 3. The Special `children` Prop

* **Lecture & Concepts:**
    * React creates a special prop, `children`, for content passed *inside* a component's tags — not as attributes.
    * This "Composition" pattern lets you build generic "wrapper" components.

* **Practical Application (A Real `Badge` Component):**
    ```jsx
    // src/components/Badge.jsx
    export default function Badge({ children }) {
      return <span className="badge">{children}</span>;
    }
    ```
    ```jsx
    // Inside ProjectCard.jsx, for your one real featured: true project:
    <h3>
      {title}
      {featured && <Badge>Featured</Badge>}
    </h3>
    ```
    *That `featured && <Badge>Featured</Badge>` is your first taste of conditional rendering — `&&` only renders the `<Badge>` when `featured` is `true`. You'll see this properly taught next week too.*

---

## ⚡ Module 4: State (`useState`) & Events

**Objective:** Add real interactivity — a tag filter — using the `useState` hook.

### 1. State vs. Variables

* **Lecture & Concepts:**
    * A regular variable (`let count = 0`) can change in memory, but **React won't know** to update the screen.
    * **State** is a special variable that, when changed via its setter, triggers React to **re-render**.

### 2. The `useState` Hook (Warm-Up)

* **Practical Application (Throwaway Counter, to Drill the Mechanics):**
    ```jsx
    import { useState } from 'react';

    export default function Counter() {
      const [count, setCount] = useState(0);
      return (
        <div>
          <h3>Count: {count}</h3>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
    }
    ```
    *Build this, confirm you understand it, then delete it — it's not part of your real portfolio, just practice before the real feature below.*

### 3. Real Tag Filtering

* **Lecture & Concepts:**
    * You already have `.filter()` from your JS course. Combine it with `useState`: keep the *currently selected tag* in state, and filter your `projects` array before `.map()`-ing it.

* **Practical Application (Your Real Filter Buttons):**
    ```jsx
    import { useState } from 'react';

    function App() {
      const [selectedTag, setSelectedTag] = useState('All');

      const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];

      const visibleProjects = selectedTag === 'All'
        ? projects
        : projects.filter(project => project.tags.includes(selectedTag));

      return (
        <main>
          <div className="tag-filters">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                // A simple way to show which tag is active
                style={{ fontWeight: tag === selectedTag ? 'bold' : 'normal' }}
              >
                {tag}
              </button>
            ))}
          </div>

          {visibleProjects.map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </main>
      );
    }
    ```

### 4. Handling Events

* **Lecture & Concepts:**
    * React events are camelCased: `onClick`, `onChange`.
    * **Crucial Rule:** Pass the function *definition*, not the result of calling it.
        * ✅ `onClick={() => setSelectedTag(tag)}`
        * ❌ `onClick={setSelectedTag(tag)}` (calls it immediately on every render!)

---

## 📝 Week 2 Assignment: Make Your Real Projects Filterable

**Objective:** Turn your Week 1 hardcoded `ProjectCard` into a real, prop-driven, filterable component fed by real data.

### 1. Setup
* Continue in `portfolio-react`.

### 2. Tasks

1.  **Props:** Refactor `ProjectCard` to accept `{ title, description, tags, imageSrc, featured }` as props.
2.  **Real Data:** Create your real `projects` array (the same 3 projects from JS Week 3), and render them with `.map()` + a stable `key`.
3.  **`Badge` Component:** Build `Badge.jsx` using `props.children`; show it only on your one `featured: true` project.
4.  **Tag Filter:** Add `useState` for `selectedTag`, buttons for each unique tag (plus "All"), and filter the rendered list live.

### 3. Git Workflow
* `git commit -m "feat: Make ProjectCard reusable with props"`
* `git commit -m "feat: Render real projects array with map"`
* `git commit -m "feat: Add tag filter with useState"`
* Push to Github.

### Bonus Challenge
* Add a "results count" line above the grid (e.g., "Showing 2 of 3 projects") that updates live as the filter changes.
