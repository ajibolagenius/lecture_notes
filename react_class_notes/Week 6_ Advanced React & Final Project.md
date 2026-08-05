# Week 6: Advanced React & Final Project

Welcome to the finish line! You've built components, managed state, fetched real data, routed between real pages, and shared global state. This final week is about leveling up: extracting your GitHub-fetching logic into a real custom hook, optimizing performance, and deploying the finished, live version of your portfolio — its fourth and final rebuild.

---

## 🎣 Module 13: Creating Custom Hooks

**Objective:** Extract your Week 3 GitHub-fetching logic into a reusable `useFetch` hook.

### 1. The "DRY" Principle, for Logic

* You fetch in `Projects` (the grid) and, in Week 5's `ProjectDetail`, you'll want to fetch a *single* project too. Rewriting the same `useEffect`/`loading`/`error` handling twice is exactly the kind of repetition **Custom Hooks** solve.

### 2. Rules of Custom Hooks

1.  **Must start with "use"** (e.g., `useFetch`) — this tells React (and linters) it follows Hook rules.
2.  **Can call other Hooks** internally (`useState`, `useEffect`).

### 3. Practical Example: Your Real `useFetch`

```javascript
// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Could not fetch data");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-fetches if the URL changes

  return { data, loading, error };
}
```

**Using It for Your Real GitHub Repos:**

```jsx
// src/pages/Projects.jsx
import useFetch from '../hooks/useFetch';
import ProjectCard from '../components/ProjectCard.jsx';

const staticProjects = [ /* your real 3 projects from Week 2 */ ];

export default function Projects() {
  const { data: repos, loading, error } = useFetch('https://api.github.com/users/YOUR_USERNAME/repos?sort=updated');

  if (loading) return <p>Loading GitHub projects...</p>;
  if (error) return <p>Error: {error}</p>;

  const githubProjects = repos.slice(0, 3).map(repo => ({
    id: `gh-${repo.id}`,
    title: repo.name,
    description: repo.description ?? "No description yet.",
    tags: [repo.language ?? "Code"],
    featured: false
  }));

  const allProjects = [...staticProjects, ...githubProjects];

  return (
    <div className="work-grid">
      {allProjects.map(project => <ProjectCard key={project.id} {...project} />)}
    </div>
  );
}
```
*This is exactly the logic from Week 3's `App.jsx`, just extracted into a reusable hook — one line of code (`useFetch(url)`) replaces the entire `useState`/`useEffect`/`try...catch` block, and you can now reuse it for a single project's data too.*

* **⭐️ Class Exercise:** Refactor your Week 3 fetching logic into `useFetch`, and use it in your Week 5 `Projects` page.

---

## ⚡ Module 14: Performance & Advanced Hooks

**Objective:** Understand rendering optimization, and apply it to your real, filterable project grid.

### 1. `React.memo` (Skipping Unnecessary Re-Renders)

* **Lecture & Concepts:**
    * When a parent re-renders, its children re-render too by default — even if their own props didn't change. Your `ProjectCard` re-renders every time you type in the Week 4 contact form, even though it has nothing to do with the form.
    * **`React.memo`** wraps a component so it only re-renders when its *props* actually change.

* **Practical Application:**
    ```jsx
    // src/components/ProjectCard.jsx
    import { memo } from 'react';

    function ProjectCard({ title, description, tags, featured }) {
      // ...same JSX as before...
    }

    export default memo(ProjectCard);
    ```

### 2. `useMemo` (Caching an Expensive Calculation)

* **Lecture & Concepts:**
    * Use this for a genuinely expensive calculation that shouldn't re-run on every render if its inputs haven't changed — like your Week 2 tag-filtered project list.

* **Practical Application (Your Real Filtered List):**
    ```jsx
    import { useMemo } from 'react';

    const visibleProjects = useMemo(() => {
      return selectedTag === 'All'
        ? allProjects
        : allProjects.filter(project => project.tags.includes(selectedTag));
    }, [allProjects, selectedTag]);
    ```
    *Without `useMemo`, this `.filter()` re-runs on every render of the `Projects` page — including ones caused by unrelated state elsewhere. With it, the filtering only re-runs when `allProjects` or `selectedTag` actually change.*

### 3. `useCallback` (Caching a Function)

* Use this when passing a function to a `React.memo`-wrapped child — otherwise a *new* function reference on every render would defeat the memoization.
    ```jsx
    const handleTagSelect = useCallback((tag) => setSelectedTag(tag), []);
    ```

---

## 🚀 Module 15: Final Project Workshop & Deployment

**Objective:** Deploy the finished, real portfolio SPA.

### 1. Deployment

* **Build:** `npm run build` — creates an optimized `dist` folder.
* **Deploy:** Push to Github, connect the repo to Netlify or Vercel, and it auto-detects Vite. Every future `git push` redeploys automatically (CI/CD).

---

## 🎓 Week 6 / Final Project: Ship Your Portfolio, Rebuilt as a React SPA

**Objective:** Combine everything from all 6 weeks into the finished, deployed, fourth version of your portfolio.

### 1. Requirements

1.  **Routing (Week 5):** `/`, `/projects`, `/projects/:id`, `/contact` — a shared `Layout` with `Header`/`Footer`/`<Outlet />`.
2.  **Real Data, via `useFetch` (this week):** Your static `projects` array merged with live GitHub repos, both flowing through the *same* `ProjectCard`.
3.  **Global State (Week 5):** `ThemeContext` providing app-wide, `localStorage`-persisted dark mode.
4.  **Forms (Week 4):** Your real, controlled, validated contact form.
5.  **Performance (this week):** `ProjectCard` wrapped in `React.memo`; the tag-filtered project list computed with `useMemo`.
6.  **Styling:** CSS Modules throughout, matching your CSS course's visual design.

### 2. Suggested Architecture

```
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProjectCard.jsx (+ .module.css)
│   ├── Badge.jsx
│   ├── ContactForm.jsx (+ .module.css)
│   └── ThemeToggleButton.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   └── useFetch.js
├── pages/
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── ProjectDetail.jsx
│   └── Contact.jsx
├── App.jsx (Layout + <Outlet />)
└── main.jsx (Router + ThemeProvider setup)
```

### 3. Deployment
* **Repo Link:** Your `portfolio-react` Github URL.
* **Live Link:** Your Netlify/Vercel URL — the same portfolio, on its 4th and final rebuild since HTML Week 1.
* **Reflection:** A short paragraph in your `README.md` on what changed most between the vanilla-JS version (JS course) and this React version, and why.

**Congratulations! You've rebuilt the same portfolio four times — static HTML, styled CSS, interactive vanilla JS, and now a real, routed, data-driven React SPA. You are now a React developer. ⚛️**
