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

* **What This Doesn't Handle (And What Does, in Production):** `useFetch` re-fetches on every URL change, but it has no cache — navigate away from `/projects` and back, and it fetches your GitHub repos all over again, even though nothing changed. It also can't easily de-duplicate two components requesting the same URL at once, or automatically refetch when the user re-focuses the tab. **TanStack Query** (formerly React Query) is the library real teams reach for to solve exactly these problems — worth knowing the name even though this course builds `useFetch` by hand, since understanding *why* a hand-rolled version is limited is what makes a library like that click later.

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

### 4. Code-Splitting with `React.lazy` and `Suspense`

* **Lecture & Concepts:**
    * Right now, `npm run build` bundles all four of your pages — `Home`, `Projects`, `ProjectDetail`, `Contact` — into one JavaScript file the visitor downloads before seeing anything. A visitor who only ever looks at `Home` still pays to download `ProjectDetail`'s code.
    * `React.lazy()` turns a regular `import` into a **lazy** one — the component's code splits into its own file and only downloads the first time that route is actually visited. `<Suspense>` provides a fallback to show while that chunk is downloading.

* **In-Depth Example (Lazy-Loading `ProjectDetail`):**
    ```jsx
    // src/main.jsx
    import { lazy, Suspense } from 'react';

    const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'));

    const router = createBrowserRouter([
      {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/projects", element: <Projects /> },
          {
            path: "/projects/:id",
            element: (
              <Suspense fallback={<p>Loading project...</p>}>
                <ProjectDetail />
              </Suspense>
            ),
          },
          { path: "/contact", element: <Contact /> },
        ],
      },
    ]);
    ```

* **⭐️ Class Exercise: Lazy-Load a Real Route**
    1.  Convert your `ProjectDetail` import to `React.lazy()` as shown above, wrapping its route element in `<Suspense>`.
    2.  Run `npm run build`, then check the `dist` folder (or the build output in your terminal) — confirm `ProjectDetail` now compiles into its own separate chunk file, instead of being bundled into the main one.
    3.  In the Network tab, reload on `/` and confirm `ProjectDetail`'s chunk *isn't* downloaded until you actually navigate to a project's detail page.

---

## 🧪 Module 15: Testing Your Components

**Objective:** Write real, automated tests for your components — not just "it looked right when I clicked around."

### 1. Why Test Components?

* **Lecture & Concepts:**
    * Every course before this one eventually introduced real automated testing — JS Week 2 (Vitest for your validators), Node/Express Week 6 (integration tests), and React Native Week 5 (Jest + component tests) all expect it. React is no exception: a component with zero tests is one refactor away from silently breaking.
    * **Vitest** (the same test runner from your JS course) pairs with **React Testing Library (RTL)** for components specifically. RTL's philosophy: test what a *user* would see and do — the rendered text, a button they'd click — not your component's internal state or implementation details.

* **Setup:**
    ```bash
    npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
    ```

* **In-Depth Example (Testing Your Real `ProjectCard`):**
    ```jsx
    // src/components/ProjectCard.test.jsx
    import { render, screen } from '@testing-library/react';
    import { test, expect } from 'vitest';
    import ProjectCard from './ProjectCard.jsx';

    test('renders the project title and description', () => {
      render(
        <ProjectCard
          title="Weather App"
          description="A React Native app that fetches live weather data."
          tags={["React Native"]}
        />
      );

      expect(screen.getByText('Weather App')).toBeInTheDocument();
      expect(screen.getByText(/fetches live weather data/)).toBeInTheDocument();
    });

    test('shows the Featured badge only when featured is true', () => {
      render(<ProjectCard title="Weather App" description="..." featured={true} />);
      expect(screen.getByText('Featured')).toBeInTheDocument();
    });
    ```

* **In-Depth Example (Testing Your Real `ContactForm`'s Validation):**
    ```jsx
    // src/components/ContactForm.test.jsx
    import { render, screen, fireEvent } from '@testing-library/react';
    import { test, expect } from 'vitest';
    import ContactForm from './ContactForm.jsx';

    test('shows an error when the email is invalid', () => {
      render(<ContactForm />);

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'not-an-email' } });
      fireEvent.click(screen.getByText(/send message/i));

      expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
    });
    ```

* **⭐️ Class Exercise: Write Your First Component Tests**
    1.  Install the packages above, and add `"test": "vitest run"` to your `package.json` scripts.
    2.  Write `ProjectCard.test.jsx` with at least the two tests shown above, using your real component's actual props.
    3.  Write `ContactForm.test.jsx` with at least one test proving invalid input blocks submission and shows an error.
    4.  Run `npm test` and confirm everything passes — then break one component on purpose (e.g., remove the `Featured` badge's conditional rendering) and confirm the matching test catches it.

---

## 🚀 Module 16: Final Project Workshop & Deployment

**Objective:** Deploy the finished, real portfolio SPA.

### 1. Environment Variables

* **Lecture & Concepts:**
    * Your GitHub username has been a hardcoded string literal (`'YOUR_USERNAME'`) since Week 3 — fine for learning, but a real deploy shouldn't bake a value like that directly into source code, especially once it might differ between your local machine and production, or include something more sensitive than a public username.
    * Vite exposes environment variables prefixed `VITE_` via `import.meta.env`. Create a `.env` file (never committed — add it to `.gitignore`), and reference the value through `import.meta.env` instead of typing it directly.

* **In-Depth Example:**
    ```bash
    # .env (add this file to .gitignore — don't commit it)
    VITE_GITHUB_USERNAME=your-actual-username
    ```
    ```jsx
    // src/pages/Projects.jsx
    const { data: repos, loading, error } = useFetch(
      `https://api.github.com/users/${import.meta.env.VITE_GITHUB_USERNAME}/repos?sort=updated`
    );
    ```

* **⭐️ Class Exercise: Move Your Username Out of Source Code**
    1.  Create `.env` with `VITE_GITHUB_USERNAME=<your real username>`, and confirm `.env` is listed in `.gitignore`.
    2.  Replace every hardcoded username in your fetch calls with `import.meta.env.VITE_GITHUB_USERNAME`.
    3.  Restart `npm run dev` (Vite only reads `.env` on startup) and confirm your real repos still load.
    4.  Set the same variable in your host's dashboard (Netlify: Site Settings → Environment Variables; Vercel: Project Settings → Environment Variables) before deploying — the build will fail or fall back silently if it's missing there.

### 2. Deployment

* **Build:** `npm run build` — creates an optimized `dist` folder.
* **Deploy:** Push to Github, connect the repo to Netlify or Vercel, and it auto-detects Vite. Every future `git push` redeploys automatically (CI/CD).

### 3. Beyond a Single Deploy: Real CI/CD

* Connecting Netlify/Vercel to your repo already gives you two things worth naming explicitly: **PR previews** (every pull request gets its own temporary live URL, so you can review a change before merging it to `main`) and **automatic redeploys** (every `git push` to `main` ships immediately). That's a real, working CI/CD pipeline — you already have one.
* At a larger team, the next step is usually a **GitHub Actions** workflow that runs `npm run lint` and `npm test` (your Week 6 tests) on every pull request, *before* Netlify/Vercel even builds it — so a broken test blocks the merge, not just the deploy. Worth knowing the shape of this even though this course's one-person project doesn't need it yet: a `.github/workflows/ci.yml` file, triggered on `pull_request`, running your existing `npm test`/`npm run lint` scripts.

---

## 🎓 Week 6 / Final Project: Ship Your Portfolio, Rebuilt as a React SPA

**Objective:** Combine everything from all 6 weeks into the finished, deployed, fourth version of your portfolio.

### 1. Requirements

1.  **Routing (Week 5):** `/`, `/projects`, `/projects/:id`, `/contact` — a shared `Layout` with `Header`/`Footer`/`<Outlet />`, and an `ErrorBoundary` around `<Outlet />`.
2.  **Real Data, via `useFetch` (this week):** Your static `projects` array merged with live GitHub repos, both flowing through the *same* `ProjectCard`, fetched using a username from `import.meta.env` — not a hardcoded string.
3.  **Global State (Week 5):** `ThemeContext` providing app-wide, `localStorage`-persisted dark mode.
4.  **Forms (Week 4):** Your real, controlled, validated contact form.
5.  **Performance (this week):** `ProjectCard` wrapped in `React.memo`; the tag-filtered project list computed with `useMemo`; `ProjectDetail` lazy-loaded with `React.lazy`/`Suspense`.
6.  **Testing (this week):** At least one passing test each for `ProjectCard` and `ContactForm`, run via `npm test`.
7.  **Styling:** CSS Modules throughout, matching your CSS course's visual design.

### 2. Suggested Architecture

```
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ErrorBoundary.jsx
│   ├── ProjectCard.jsx (+ .module.css, + .test.jsx)
│   ├── Badge.jsx
│   ├── ContactForm.jsx (+ .module.css, + .test.jsx)
│   └── ThemeToggleButton.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   └── useFetch.js
├── pages/
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── ProjectDetail.jsx (lazy-loaded)
│   └── Contact.jsx
├── App.jsx (Layout + ErrorBoundary + <Outlet />)
└── main.jsx (Router + ThemeProvider setup)

.env (VITE_GITHUB_USERNAME — not committed)
.github/workflows/ci.yml (optional: lint + test on every PR)
```

### 3. Deployment
* **Repo Link:** Your `portfolio-react` Github URL.
* **Live Link:** Your Netlify/Vercel URL — the same portfolio, on its 4th and final rebuild since HTML Week 1.
* **Reflection:** A short paragraph in your `README.md` on what changed most between the vanilla-JS version (JS course) and this React version, and why.

**Congratulations! You've rebuilt the same portfolio four times — static HTML, styled CSS, interactive vanilla JS, and now a real, routed, data-driven React SPA. You are now a React developer. ⚛️**
