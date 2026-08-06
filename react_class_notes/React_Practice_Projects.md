# React Capstone Projects: 4 Standalone Builds

## How to Use These

These are **4 independent projects** for 4 different students — not a sequence where one builds on the next. Assign one per student. Each is its own standalone app, separate codebase, separate repo; nothing is shared between them.

To keep grading fair across four different apps, all 4 are held to the **same rubric** below — the same one the course's own [Week 6 Final Project](<Week 6_ Advanced React & Final Project.md>) uses for the portfolio, just applied to a different domain each time. Every project must exercise all six weeks of the course: components/props (Wk 1-2), state/events (Wk 2), effects/data fetching (Wk 3), forms/styling/refs (Wk 4), routing/Context (Wk 5), and custom hooks/performance/testing/deployment (Wk 6).

## Shared Rubric (applies to all 4)

- [ ] **Components:** at least 4 reusable, prop-driven components (destructured props, no hardcoded content).
- [ ] **Local state:** `useState` for real UI state (not just a demo counter) plus a `.map()`+stable-`key` list somewhere.
- [ ] **Data fetching:** a real public API, fetched in `useEffect` (or a custom hook), with explicit loading / error / empty / success states — not just a happy-path fetch.
- [ ] **Custom hook:** the fetch logic extracted into its own reusable hook (`useX`), used by at least two components.
- [ ] **Routing:** React Router with **3+ routes**, including one dynamic route (`:id`/`:name`), a shared `Layout` with `<Outlet />`, and an `ErrorBoundary`.
- [ ] **Global state:** one Context (not prop-drilled), persisted to `localStorage`.
- [ ] **Forms:** one controlled, multi-field form as a single `formData` object, validated on submit with inline errors.
- [ ] **Styling:** CSS Modules with at least one conditionally-applied class.
- [ ] **Performance:** `React.memo` on a list-item component, `useMemo` on a derived/filtered value, `React.lazy`+`Suspense` on one route.
- [ ] **Testing:** Vitest + React Testing Library tests for at least 2 components.
- [ ] **Deployment:** config moved to `.env`/`import.meta.env`, live on Netlify or Vercel.

If a project brief below doesn't spell out how to hit one of these boxes, that's deliberate — figuring out where it fits in an unfamiliar domain is part of the assignment, same as the real Week 6 final project.

| # | Student's Project | Domain | Dynamic Route | Context |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Task & Productivity Hub | Personal task management | `/task/:id` | Category/theme, persisted |
| 2 | Weather Dashboard | Multi-city weather | `/city/:name` | Units (°C/°F), persisted |
| 3 | Recipe Explorer | Recipe search & favorites | `/recipes/:id` | Favorites, persisted |
| 4 | Mini Store | Product catalog & cart | `/products/:id` | Cart, persisted |

---

## Project 1: Task & Productivity Hub

**Pitch:** A real task manager — not a toy to-do list — with categories, an edit page per task, and a live "Upcoming Holidays" panel pulled from a public API.

**Data:** [Nager.Date Public Holiday API](https://date.nager.at/) (`GET /api/v3/PublicHolidays/{year}/{countryCode}`) — free, no key. Powers a small "Upcoming Holidays" sidebar.

**Routes:** `/` (active tasks), `/archive` (completed tasks), `/task/:id` (edit a single task — lazy-loaded).

**Feature checklist:**
1. `tasks` state: `[{ id, text, category, priority, done, createdAt }]`.
2. `TaskForm.jsx` — controlled multi-field form (text, category, priority) as one `formData` object; validates non-empty text.
3. `TaskList.jsx`/`TaskItem.jsx` (memoized) — toggle done, delete, link to `/task/:id` to edit.
4. Filter by category *and* status at once (two independent filter states combined before `.map()`).
5. `CategoryContext` — category → color mapping, persisted, consumed by `Badge.jsx` (`props.children`) anywhere without prop drilling.
6. `useHolidays(countryCode)` custom hook wrapping the Nager.Date fetch; loading/error/empty states in the sidebar.
7. `useMemo` for the filtered task list; `React.lazy` the `/task/:id` edit page.
8. `.env` for the default `countryCode`.
9. Tests: submitting `TaskForm` with empty text shows an error; the category+status filter combo returns the right subset.

**Stretch goals:** due dates with an "overdue" visual state; drag-to-reorder within a list.

---

## Project 2: Weather Dashboard

**Pitch:** The "Weather App" the portfolio's own project data has been name-dropping since Week 2, finally built — as a multi-city dashboard, not a single search box.

**Data:** [Open-Meteo](https://open-meteo.com/) — free, no key. Geocoding endpoint (city name → lat/lon) + Forecast endpoint (lat/lon → weather).

**Routes:** `/` (dashboard of saved cities), `/city/:name` (extended forecast — lazy-loaded), `/settings` (default city + unit preference).

**Feature checklist:**
1. `SearchBar.jsx` — controlled input, geocodes on submit, adds the resolved city to a `savedCities` list persisted to `localStorage`.
2. `useWeather(lat, lon)` custom hook wrapping fetch/loading/error; used by both dashboard cards and the detail page.
3. `Dashboard.jsx` renders a `CityCard.jsx` (memoized) per saved city via `.map()`+key, each independently fetching.
4. `/city/:name` — `useParams`, extended forecast, lazy-loaded.
5. `UnitsContext` — global °C/°F toggle, persisted, consumed by every card and the detail page.
6. `SettingsForm.jsx` — controlled multi-field form (default city, default unit) as one `formData` object, validated.
7. `useMemo` so removing/reordering one city doesn't re-fetch every other card.
8. Removing a saved city updates `localStorage` and re-renders without a full reload.
9. Tests: the units toggle changes displayed values app-wide; an invalid city search shows a real error state.

**Stretch goals:** a "Use my location" button via `navigator.geolocation`; a 7-day trend mini-chart per city.

---

## Project 3: Recipe Explorer

**Pitch:** Search recipes, view a full detail page, favorite the ones you like — built to the same rigor as the portfolio's own Week 5 routing+Context requirement, just applied to new content.

**Data:** [TheMealDB](https://www.themealdb.com/api.php) — free, no signup (public test key `1`). Search-by-name, filter-by-category, lookup-by-id endpoints.

**Routes:** `/` (search/browse), `/recipes/:id` (detail — lazy-loaded), `/favorites`.

**Feature checklist:**
1. `useMealSearch(query)` / `useMealDetail(id)` custom hooks (or one shared `useFetch`) wrapping the fetch/loading/error pattern.
2. `Layout.jsx` — header with `<Link>` nav (Search / Favorites), `<Outlet />`, wrapped in an `ErrorBoundary`.
3. `SearchBar.jsx` — controlled input, validated non-empty before firing a search; a `CategoryFilterForm.jsx` (or combined into one form) as a second controlled field.
4. `RecipeGrid.jsx` → `RecipeCard.jsx` (memoized), `.map()`+key, `<Link to="/recipes/:id">` plus a heart button.
5. `FavoritesContext` — favorites array + `toggleFavorite(recipe)`, persisted to `localStorage`.
6. `RecipeDetail.jsx` — `useParams`, ingredients (`.map()`) and instructions, lazy-loaded.
7. `FavoritesPage.jsx` — renders `FavoritesContext`'s list, with its own empty state.
8. `useMemo` for the category-filtered grid.
9. Tests: toggling a favorite persists across a reload (mock `localStorage` or re-mount); an empty search shows the empty state, not a blank screen.

**Stretch goals:** a "Random Recipe" button; a shopping-list view that de-duplicates ingredients across all favorites.

---

## Project 4: Mini Store

**Pitch:** A small product catalog with a real cart and checkout flow — the closest of the four to a real e-commerce take-home assessment.

**Data:** [Fake Store API](https://fakestoreapi.com/) — free, no key, stable.

**Routes:** `/` (catalog), `/products/:id` (detail — lazy-loaded), `/cart`.

**Feature checklist:**
1. `useFetch(url)` custom hook powering both the catalog and the detail page.
2. `ProductGrid.jsx` — category + price-range filters, `useMemo`'d so filtering doesn't force every unfiltered card to re-render.
3. `ProductCard.jsx` (`React.memo`) — the `onAddToCart` handler passed down wrapped in `useCallback` so memoization actually holds; verify with React DevTools' render highlighting, not just by assumption.
4. `CartContext` — items + quantities, `useMemo`-derived subtotal/total, persisted to `localStorage`.
5. `/products/:id` — `useParams`, full detail, lazy-loaded.
6. `CartPage.jsx` — line items, quantity controls, running total.
7. `CheckoutForm.jsx` — controlled multi-field form (name, email, address) as one `formData` object, validated on submit (email format, required fields), inline errors; submitting clears the cart.
8. `.env` → `VITE_API_URL`, read via `import.meta.env`.
9. Tests: cart total math is correct with mixed quantities; `CheckoutForm` rejects an invalid email.

**Stretch goals:** an order-confirmation screen with a fake order number; persist a small order-history list after checkout.
