# React Starter — Vite + React 19

Pre-configured with React 19, React Router v7, and three essential custom hooks.

## Quick Start

```bash
cp -r React my-project
cd my-project
npm install
npm run dev   # → http://localhost:5173
```

## Project Structure

```
my-project/
├── index.html
├── src/
│   ├── main.jsx              ← Entry point — renders <App />
│   ├── App.jsx               ← Root component — routes live here
│   ├── index.css             ← Global styles (link your tokens.css here)
│   ├── components/           ← Reusable components
│   ├── pages/                ← Route-level components
│   ├── context/              ← Context providers
│   ├── hooks/
│   │   └── index.js          ← useFetch, useLocalStorage, useDebounce
│   └── utils/                ← Helper functions, API calls
├── vite.config.js
└── package.json
```

## Included Hooks

Import from `./hooks/index.js`:

```jsx
import { useFetch, useLocalStorage, useDebounce } from './hooks/index.js'

// Data fetching
const { data, isLoading, error, refetch } = useFetch('/api/courses')

// Persistent state
const [theme, setTheme] = useLocalStorage('theme', 'light')

// Debounced search
const debouncedQuery = useDebounce(searchInput, 400)
```

## Adding React Router

```jsx
// main.jsx — wrap with BrowserRouter
import { BrowserRouter } from 'react-router'
root.render(<BrowserRouter><App /></BrowserRouter>)

// App.jsx — define routes
import { Routes, Route } from 'react-router'
<Routes>
  <Route path="/"         element={<HomePage />} />
  <Route path="courses"   element={<CoursesPage />} />
  <Route path="courses/:slug" element={<DetailPage />} />
  <Route path="*"         element={<NotFoundPage />} />
</Routes>
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
# or: push to GitHub → connect at vercel.com → auto-deploys on every push
```
