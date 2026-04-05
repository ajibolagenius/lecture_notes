# JavaScript Starter — Vite Vanilla

A pre-configured Vite project with utility modules for DOM manipulation, data fetching, and localStorage.

## Quick Start

```bash
# 1. Copy this folder, rename it to your project
cp -r JavaScript my-project
cd my-project

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# → http://localhost:5173
```

## Project Structure

```
my-project/
├── index.html              ← HTML entry point
├── src/
│   ├── main.js             ← Your code starts here
│   ├── style.css           ← Your styles
│   └── utils/
│       ├── dom.js          ← DOM helpers: $, $$, createElement
│       ├── api.js          ← Fetch helpers: fetchJSON, fetchAll, fetchWithTimeout
│       └── storage.js      ← localStorage helpers: storageGet, storageSet
├── vite.config.js
└── package.json
```

## Utility Reference

### DOM (`src/utils/dom.js`)

```javascript
import { $, $$, createElement, showLoading, showError } from './utils/dom.js'

const heading = $('#main-title')            // First match
const cards   = $$('.card')                 // All matches (Array, not NodeList)

const card = createElement('article', {
  cls: 'card',
  text: 'Hello',                            // Safe — uses textContent
  attrs: { 'aria-label': 'Course card' },
  data: { id: '123' },                      // Sets data-id="123"
})

showLoading(container)                      // Shows "Loading…"
showError(container, 'Something broke')     // Shows error with role="alert"
```

### API (`src/utils/api.js`)

```javascript
import { fetchJSON, fetchAll, fetchWithTimeout } from './utils/api.js'

// Single request
const user = await fetchJSON('https://api.example.com/users/1')

// Parallel requests (tolerates failures)
const [users, courses] = await fetchAll([
  'https://api.example.com/users',
  'https://api.example.com/courses',
])

// With timeout (default: 8 seconds)
const data = await fetchWithTimeout('https://api.example.com/data', 5000)
```

### Storage (`src/utils/storage.js`)

```javascript
import { storageGet, storageSet, storageRemove } from './utils/storage.js'

storageSet('user', { name: 'Ada', cohort: 7 })
const user = storageGet('user', null)       // Second arg is the default
storageRemove('user')
```

## Build for Production

```bash
npm run build   # → /dist folder ready to deploy
npm run preview # → Preview the production build locally
```
