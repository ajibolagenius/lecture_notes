# 🗂 Starter Files
### Deejoft Coding School — Project Templates

Use these templates at the start of each new exercise or project. They include the boilerplate that would otherwise cost 10–20 minutes of setup time per session.

---

## How to Use

Each folder is a standalone starter for its course. Copy the folder, rename it to your project name, and follow the README inside.

```bash
# General pattern
cp -r Starter_Files/React my-project
cd my-project
npm install
npm run dev
```

---

## What's in Each Folder

### 📘 HTML
A ready-to-go `index.html` with the full valid skeleton:
- `<!DOCTYPE html>` + `<html lang="en">`
- All five required `<head>` tags
- `<link>` to `./css/main.css` pre-written

**Usage:** Copy `index.html` into your project folder. Open with Live Server.

---

### 🎨 CSS
Two linked stylesheets:

**`tokens.css`** — complete design token system:
- Colour palette + semantic tokens with dark mode
- Fluid type scale (`--step--1` to `--step-4`) using `clamp()`
- Spacing, radius, shadow, and transition tokens

**`main.css`** — modern reset + base styles:
- `box-sizing: border-box` reset
- `prefers-reduced-motion` media query
- Base typography using token values
- `.container`, `.prose`, `.sr-only` utilities

**Usage:** Link `tokens.css` then `main.css` in your HTML `<head>`. Write your component styles below the marked line in `main.css`.

---

### ⚡ JavaScript
A Vite vanilla JS project with three utility modules:

**`src/utils/dom.js`** — DOM helpers:
- `$()` — `querySelector` shorthand
- `$$()` — `querySelectorAll` returning an Array
- `createElement()` — create elements with class, text, attributes
- `showLoading()` / `showError()` — standard loading states

**`src/utils/api.js`** — Fetch helpers:
- `fetchJSON()` — fetch with error handling
- `fetchAll()` — parallel fetch using `Promise.allSettled`
- `fetchWithTimeout()` — fetch with AbortController timeout

**`src/utils/storage.js`** — localStorage wrapper:
- `storageGet()` / `storageSet()` / `storageRemove()`
- All automatically JSON-serialise/deserialise

**Usage:** `cp -r JavaScript my-project && cd my-project && npm install && npm run dev`

---

### ⚛️ React
A Vite React 19 project with React Router v7 and three custom hooks:

**`src/hooks/index.js`**:
- `useFetch(url)` — data fetching with loading, error, refetch
- `useLocalStorage(key, initial)` — `useState` synced to localStorage
- `useDebounce(value, delay)` — delays state updates

**Usage:** `cp -r React my-project && cd my-project && npm install && npm run dev`

---

### 📱 React Native
An Expo SDK 52 project with everything configured:

**Root layout** — `GestureHandlerRootView`, `SafeAreaProvider`, `QueryClientProvider` all pre-wrapped

**`utils/storage.js`** — AsyncStorage wrapper with `get`, `set`, `remove`, `clear`

**Pre-installed:** NativeWind v4, TanStack Query, Reanimated 3, Gesture Handler, AsyncStorage, SecureStore, expo-image, FlashList, expo-haptics, expo-location, expo-image-picker

**`eas.json`** — Build profiles for development, preview (APK), and production ready to use

**Usage:** `cp -r React_Native my-app && cd my-app && npm install && npx expo start`

---

### 🐍 Python
A `uv`-managed Python 3.13 project:

**`utils.py`** — utility functions with docstrings:
- `read_json()` / `write_json()` — JSON file I/O with error handling
- `read_csv()` / `write_csv()` — CSV using `csv.DictReader/DictWriter`
- `get_float()` / `get_int()` — validated user input (keeps asking until valid)
- `format_naira()` — currency formatting

**`tests/test_utils.py`** — starter test file with examples of:
- Basic assertions
- `tmp_path` fixture for file I/O tests
- Class-based test organisation

**`pyproject.toml`** — pre-configured with `ruff` and `pytest`

**Usage:** `cp -r Python my-project && cd my-project && uv init . && uv sync && uv run python main.py`

---

## Quick Reference — First Commands per Course

| Course | First command |
|--------|--------------|
| HTML | Open `index.html` with Live Server in VS Code |
| CSS | Open `index.html` (now linked to both CSS files) with Live Server |
| JavaScript | `npm install && npm run dev` |
| React | `npm install && npm run dev` |
| React Native | `npm install && npx expo start` |
| Python | `uv init . && uv sync && uv run python main.py` |
