# React Capstone Projects: 4 Builds for Course Graduates

## Who These Are For

These are for students who have **finished all 6 weeks** of the [Course Outline](React_Course_Outline.md) and already shipped their portfolio SPA. No concept here is off-limits — hooks, React Router, Context, controlled forms, `React.memo`/`useMemo`/`useCallback`, `React.lazy`, Vitest/RTL, env vars, deployment are all fair game from Project 1 onward.

"Serially" means escalating **scope and production complexity**, not unlocked concepts:

- **Project 1** is a full, polished app — but single-domain, single Context, small API surface. It re-establishes the professional workflow (lint, tests, CI, deploy) as a baseline.
- **Project 2** adds a second axis of state (multiple saved items, not just one search) and a details route per item.
- **Project 3** introduces a more complex state *shape* (data keyed by day/category, not just a flat list) and combines two Contexts.
- **Project 4** is resume-grade: three Contexts, a simulated auth/protected-route flow, a full checkout flow, and a real CI pipeline.

A couple of these deliberately pay off names that sit unused in the portfolio's own `projects` array (`Weather App`, `Task Tracker`) — this finally builds them for real, now with everything the course taught.

Hand these out one at a time; each should be finished, tested, and **deployed** before the next is assigned — that's the actual bar, not just "it renders."

| # | Project | Complexity Signal | Portfolio-Ready Pitch |
| :--- | :--- | :--- | :--- |
| 1 | Task Tracker Pro | Baseline: one Context, one route family | "A full-CRUD productivity app with persistent storage and a real test suite." |
| 2 | Weather Dashboard | Multi-item state + per-item detail route | "A multi-city weather dashboard with saved locations and unit preferences." |
| 3 | Recipe & Meal Planner | Two Contexts, non-flat state shape | "A recipe explorer with a weekly meal-planning feature backed by persistent state." |
| 4 | Storefront (Capstone) | Three Contexts, protected routes, checkout flow, CI | "A full storefront simulation with auth-gated checkout and an automated test/deploy pipeline." |

---

## Project 1: Task Tracker Pro

**Pitch:** Not a to-do toy — a real productivity app with categories, an archive, and persistence, built to professional standard from the first commit.

**Why it's first:** Smallest domain and state shape of the four, so it's really testing *workflow discipline* (repo hygiene, lint, tests, deploy) more than new React skill. Everything after this assumes that workflow is already second nature.

**Skills exercised:** components/props, `useState`, `.map()`+key, `props.children`, a custom `useLocalStorage` hook, React Router (two routes), Context (for category color-coding or theme), controlled multi-field form with validation, CSS Modules, Vitest + RTL, deployment.

**Data:** none — local state only, persisted client-side.

**Build checklist:**
1. Scaffold with Vite, ESLint clean, pushed to GitHub with real commit history (not one giant commit).
2. `tasks` state: `[{ id, text, category, priority, done, createdAt }]`, persisted via a custom `useLocalStorage(key, initialValue)` hook — extract the read/write-to-`localStorage` pattern once, reuse it everywhere in this project.
3. `TaskForm.jsx` — controlled multi-field form (text, category, priority) as one `formData` object; validate that text isn't empty.
4. `TaskList.jsx` / `TaskItem.jsx` — toggle done, delete, inline-edit text.
5. Filter by category *and* status simultaneously (two independent filter states, combined before `.map()`).
6. Routes: `/` (active tasks), `/archive` (completed tasks) — a real second page, not a toggle.
7. `CategoryContext` (or reuse for theme) so category colors are defined once and consumed anywhere without prop drilling.
8. Vitest + RTL: test that submitting `TaskForm` adds a task, and that the filter buttons actually filter.
9. Deploy to Netlify/Vercel; README with a live link and screenshot.

**Stretch goals:** drag-to-reorder within a list; a due-date field with an "overdue" visual state.

---

## Project 2: Weather Dashboard

**Pitch:** The "Weather App" the portfolio's own project data has been name-dropping since Week 2, finally built — as a multi-city dashboard, not a single search box.

**Why it's harder than Project 1:** Introduces a second axis of state (a *collection* of saved cities, each independently fetched) and a real detail route per item, plus a global unit preference that must stay consistent across every card.

**Skills exercised:** `useEffect`/fetch chained across two endpoints, a custom `useWeather(city)` hook, loading/error/empty states per card (not just once globally), React Router with a dynamic `/city/:name` route, a `UnitsContext` (°C/°F) consumed everywhere, `useRef` for search-input focus, CSS Modules, memoization of the city list, tests, deployment.

**Data:** [Open-Meteo](https://open-meteo.com/) — free, no key. Geocoding endpoint (name → lat/lon) + Forecast endpoint (lat/lon → weather).

**Build checklist:**
1. `useWeather(lat, lon)` custom hook wrapping the fetch/loading/error pattern — used by both the dashboard cards and the detail page.
2. `SearchBar.jsx` — controlled input, geocodes on submit, adds the resolved city to a `savedCities` list (persisted via Project 1's `useLocalStorage` hook, carried forward).
3. `Dashboard.jsx` renders a `CityCard.jsx` per saved city via `.map()`+key, each independently fetching via `useWeather`.
4. `/city/:name` detail route (`useParams`) with extended forecast — code-split with `React.lazy`+`Suspense`.
5. `UnitsContext` — global °C/°F toggle, persisted, consumed by every card and the detail page without prop drilling.
6. Removing a saved city updates `localStorage` and re-renders the dashboard without a full reload.
7. `useMemo` so re-ordering/removing one city doesn't re-fetch every other card.
8. Tests: `UnitsContext` toggle actually changes displayed values; a card shows an error state for an invalid city.
9. Deploy; env var for any config that shouldn't be hardcoded (even if Open-Meteo needs no key, model the pattern with a base URL).

**Stretch goals:** a "Use my location" button via `navigator.geolocation`; a 7-day trend mini-chart per city.

---

## Project 3: Recipe & Meal Planner

**Pitch:** Goes past a simple search-and-favorite recipe app: recipes can be assigned to days of the week, turning this into a real weekly meal planner with a genuinely different state shape than anything in Projects 1-2.

**Why it's harder than Project 2:** The planner state isn't a flat array — it's data keyed by day (`{ Monday: [...], Tuesday: [...], ... }`), and it has to coexist with a separate `Favorites` Context. Two Contexts interacting correctly is the real new difficulty here, not any single hook.

**Skills exercised:** React Router (`Layout`+`Outlet`, `ErrorBoundary`, dynamic `/recipes/:id`), two coordinated Contexts (`FavoritesContext`, `PlannerContext`), non-flat state persisted to `localStorage`, a custom `useFetch` hook, controlled search + category filters, `React.memo` on recipe cards, tests across both Contexts.

**Data:** [TheMealDB](https://www.themealdb.com/api.php) — free, no signup (public test key `1`). Search-by-name, filter-by-category, and lookup-by-id endpoints.

**Build checklist:**
1. Routes: `/` (search/browse), `/recipes/:id` (detail), `/favorites`, `/planner`.
2. `useFetch(url)` — a real reusable hook (not copy-pasted per component) powering search, category filter, and detail lookups.
3. `FavoritesContext` — same shape as the portfolio's `ThemeContext`: array + toggle, persisted.
4. `PlannerContext` — `{ Monday: [recipeId, ...], ... }`, with `assignToDay(day, recipe)` / `removeFromDay(day, recipeId)`, persisted separately from favorites.
5. `RecipeCard.jsx` (wrapped in `React.memo`) exposes both a favorite-heart button and an "Add to planner" control (a day picker).
6. `PlannerPage.jsx` renders each day as its own section, `.map()`-ing that day's recipes — this is the trickiest render, since it's mapping over an object's entries, not a plain array.
7. `RecipeDetail.jsx` — `useParams`, ingredients/instructions, both context actions available here too.
8. Loading/error/empty states everywhere data is fetched or a list could be empty (an empty planner day, no favorites yet, no search results).
9. Tests: adding the same recipe to a day twice doesn't duplicate it; removing a favorite removes it from `localStorage` too.

**Stretch goals:** a shopping-list view that de-duplicates ingredients across every recipe currently in the planner; drag-and-drop between days.

---

## Project 4: Storefront (Capstone)

**Pitch:** The most complete, resume-grade build of the four — a small storefront with a real checkout flow, a simulated login gate, and an actual CI pipeline. This is meant to look like a genuine take-home assessment a hiring manager could hand out.

**Why it's the capstone:** Three Contexts have to cooperate (`AuthContext`, `CartContext`, `ThemeContext`), routes are protected based on auth state (a pattern the course never explicitly taught — reading React Router's docs for `<Navigate>` is part of the assignment), and the project isn't done until it has a green CI pipeline, not just a working `npm run dev`.

**Skills exercised:** everything from Projects 1-3, plus: a simulated `AuthContext` (fake login/logout, a token-like value in `localStorage`, no real backend), a protected-route wrapper component using `<Navigate>`, `CartContext` with quantity math, `useMemo`/`useCallback` used deliberately (and profiled — show the re-render difference with/without them), `React.lazy` code-splitting on at least two routes, a full checkout form with validation, a `.env`-driven API base URL, and a GitHub Actions workflow running lint+test on every push.

**Data:** [Fake Store API](https://fakestoreapi.com/) — free, no key, stable.

**Build checklist:**
1. Routes: `/` (catalog), `/products/:id` (detail, lazy-loaded), `/cart`, `/login`, `/checkout` (protected), `/orders` (protected).
2. `AuthContext` — `login(email, password)` accepts anything non-empty (this is a simulation, not real auth) and stores a fake token in `localStorage`; `logout` clears it.
3. `ProtectedRoute.jsx` — reads `AuthContext`, redirects to `/login` via `<Navigate>` if there's no token; used to wrap `/checkout` and `/orders`.
4. `CartContext` — items + quantities, `useMemo`-derived subtotal/total, persisted, survives a logout (cart isn't auth-gated, checkout is).
5. `ProductGrid.jsx` — category + price-range filters, `useMemo`'d so filtering doesn't re-render every unfiltered `ProductCard` (wrapped in `React.memo`); the add-to-cart handler passed down wrapped in `useCallback` so memoization actually holds — verify this with React DevTools' render highlighting, not just by assumption.
6. `CheckoutForm.jsx` — controlled multi-field form (shipping address, payment placeholder fields), validated, submitting clears the cart and writes a fake order into an `orders` list in `localStorage`.
7. `/orders` — lists past fake orders for the "logged in" session.
8. `.env` → `VITE_API_URL`, read via `import.meta.env`.
9. Tests: `ProtectedRoute` redirects when logged out and renders its child when logged in; `CheckoutForm` rejects an invalid submission; cart total math is correct with mixed quantities.
10. `.github/workflows/ci.yml` — runs `npm run lint` and `npm test` on every push/PR.
11. Deploy; confirm the env var is set in the host's dashboard, and that CI is green on the deployed commit.

**Stretch goals:** an order-confirmation page with a fake order number; a "session expires after 5 minutes" simulation using `setTimeout` inside `AuthContext` to force students to think about effect cleanup.
