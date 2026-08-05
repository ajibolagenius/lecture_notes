# Week 3: Lifecycle, Conditionals, & Data Fetching

Welcome to Week 3! You now know how to structure components (Props) and make them interactive (State). This week, we bridge the gap to a real-world application: rendering lists properly with stable keys, and — the big one — fetching your **real, live GitHub repos** to feed your Featured Work section, exactly like your JS course did in vanilla JS, but now the React way.

---

## 🔀 Module 5: Conditional Rendering & Lists (Deep Dive)

**Objective:** Properly understand *why* `.map()` needs a `key`, and control what renders when data is empty, loading, or filtered down to nothing.

### 1. Conditional Rendering, Formally

You already used `&&` for your `Badge` last week. Here's the full toolkit:

#### A. The `if` Statement (Early Return)
Best for a component that needs to show a completely different view.

```jsx
function ProjectGrid({ projects }) {
  if (projects.length === 0) {
    return <p>No projects match this tag yet.</p>;
  }

  return (
    <div className="work-grid">
      {projects.map(project => <ProjectCard key={project.id} {...project} />)}
    </div>
  );
}
```

#### B. The Ternary Operator (`? :`)
Best for switching between two different elements inside JSX — exactly what you'll use for loading/error states this week.

#### C. The Logical AND Operator (`&&`)
Best for rendering something **only if true** (your `Badge`, last week).

### 2. The `key` Prop, Properly

* **Lecture & Concepts:**
    * React uses the `key` prop to track which list items changed, were added, or removed between renders.
    * **Rule 1:** Keys must be unique among siblings.
    * **Rule 2:** Do **not** use the array index if the list can reorder or filter — your `id` (which you already used in Week 2) is correct.
    * **Why it matters concretely:** if you used the *index* as your key, filtering by tag (Week 2) would reassign index `0` to a *different* project every time the filter changes, and React could reuse the wrong DOM node — subtly mismatching content and state. Using the real `id` avoids this entirely.

* **⭐️ Practical Check:** Open your `App.jsx` from Week 2 and confirm every `<ProjectCard key={...}>` uses `project.id`, never the `.map()` callback's index parameter.

---

## ⏳ Module 6: The `useEffect` Hook (Side Effects)

**Objective:** Understand how to run code *after* React renders — the hook you need before you can fetch data.

### 1. Pure Rendering vs. Side Effects

* **Lecture & Concepts:**
    * **Pure Rendering:** Components should be pure logic during render (Props/State → JSX). You shouldn't make API calls directly inside the function body.
    * **Side Effects:** Anything touching the outside world — fetching data, timers, subscriptions. We use `useEffect` for these.

### 2. The `useEffect` Syntax & Dependency Array

```javascript
import { useEffect } from 'react';

useEffect(() => {
  console.log("I run after every render!");
}); // no dependency array — runs every time, rarely what you want

useEffect(() => {
  console.log("I run once, after the first render.");
}, []); // empty array — exactly what you need to fetch data on mount
```

| Dependency Array | Behavior | Use Case |
| :--- | :--- | :--- |
| **No Array** | Runs after **every** render. | Rarely used. |
| **Empty Array `[]`** | Runs **only once** (on "mount"). | Fetching your GitHub repos, below. |
| **`[prop, state]`** | Runs on mount **and** whenever they change. | Re-fetching when a search term changes (not needed yet). |

---

## 🌐 Module 7: Real Data Fetching with `useEffect`

**Objective:** Fetch your real GitHub repos and merge them into your Featured Work section — replacing the JS course's manual `fetch()`/`renderProjects()` pattern with React's declarative approach.

### 1. The Three States of Fetching

Every real fetch needs: **Loading**, **Success (data)**, and **Error** states.

### 2. Async/Await in `useEffect`

**Gotcha:** You cannot make the effect function itself `async`.
* ❌ `useEffect(async () => { ... })` — this breaks React.
* ✅ Define an `async` function *inside* the effect, then call it.

### 3. Practical Example: Your Real GitHub Repos

```jsx
import { useState, useEffect } from 'react';
import ProjectCard from './components/ProjectCard.jsx';

const staticProjects = [
  { id: 1, title: "Weather App", description: "A React Native app that fetches live weather data.", tags: ["React Native", "Expo"], featured: false },
  { id: 2, title: "Task Tracker", description: "A Python CLI tool for tracking daily tasks.", tags: ["Python"], featured: false },
  { id: 3, title: "This Portfolio", description: "The very site you're looking at right now.", tags: ["React", "JavaScript"], featured: true }
];

function App() {
  const [githubRepos, setGithubRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/YOUR_USERNAME/repos?sort=updated');

        if (!response.ok) {
          throw new Error('Could not fetch GitHub repos');
        }

        const data = await response.json();

        const mapped = data.slice(0, 3).map(repo => ({
          id: `gh-${repo.id}`,
          title: repo.name,
          description: repo.description ?? "No description yet.",
          tags: [repo.language ?? "Code"],
          featured: false
        }));

        setGithubRepos(mapped);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []); // Run once on mount

  const allProjects = [...staticProjects, ...githubRepos];

  if (loading) return <p>Loading GitHub projects...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="work-grid">
      {allProjects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}

export default App;
```
*Notice this is the exact same GitHub REST API endpoint your JS course fetched in Week 6 — same data, same `?.`/`??` safety for missing fields — but now the fetched data flows into `useState`, and React re-renders your existing `ProjectCard` automatically. No `document.createElement`, no manual DOM clearing.*

* **⭐️ Class Exercise: Fetch Your Own Real Repos**
    1.  Replace `YOUR_USERNAME` with your actual GitHub username.
    2.  Confirm the loading message shows briefly, then your real repos appear alongside your static projects.
    3.  Temporarily break the URL (typo the username) and confirm your error message shows instead of a crash.

---

## 📝 Week 3 Assignment: Fetch Your Real GitHub Repos

**Objective:** Merge live GitHub data into your Featured Work section, with proper loading and error handling.

### 1. Setup
* Continue in `portfolio-react`. This logic can live in `App.jsx` for now — you'll extract it into a reusable `useFetch` hook in Week 6.

### 2. Requirements

1.  **State:** `githubRepos` (array), `loading` (boolean), `error` (string/null).
2.  **The Effect:** `useEffect(..., [])` fetching `https://api.github.com/users/<you>/repos?sort=updated` once, on mount.
3.  **The UI Logic:**
    * **If Loading:** "Loading GitHub projects..."
    * **If Error:** A red error message.
    * **If Success:** Render `[...staticProjects, ...githubRepos]` through your existing `ProjectCard`, each with a stable, unique `key`.
4.  **Keep Week 2's Filter Working:** Your tag filter from last week should still work correctly against this combined list.

### 3. Git Workflow
* `git commit -m "feat: Fetch real GitHub repos with useEffect"`
* `git commit -m "feat: Handle loading and error states"`
* Push to Github.
