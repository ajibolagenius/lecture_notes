# Week 7: Modern Interactions & Performance Tuning

We have built the structure, made it accessible, and optimized it for search engines. Now, we take a step into the "Expert" territory. This week focuses on two things:
1.  **Native HTML Interactivity:** Using powerful tags that behave like JavaScript components without writing a single line of script.
2.  **Performance & Launch:** Optimizing how the browser loads your portfolio and finally putting it on the internet, live.

---

## Module 12: Native Interactive Elements

HTML5 introduced several tags that provide complex UI behavior natively. Using these is always better for performance and accessibility than building them from scratch with `<div>`s.

### 1. The Native Accordion (`<details>` & `<summary>`)

* **Lecture & Concepts:**
    * Before HTML5, creating an "accordion" (click to expand/collapse) required JavaScript. Now, it is native.
    * **`<details>`**: The wrapper. By default, it hides its content.
    * **`<summary>`**: The visible "trigger" or title. Clicking this toggles the content.
    * **Attribute `open`**: If present, the details show by default.

* **In-Depth Example:**
    ```html
    <details>
      <summary>What's your tech stack?</summary>
      <p>HTML, CSS, JavaScript, and I'm currently learning React and React Native.</p>
    </details>

    <details>
      <summary>Are you open to work?</summary>
      <p>Yes! Reach out via the contact form on this site.</p>
    </details>
    ```
    *Note: You can style these heavily with CSS (e.g., removing the default marker) — that's a CSS course topic.*

### 2. Visualizing Data (`<progress>` & `<meter>`)

* **Lecture & Concepts:**
    * **`<progress>`**: Represents the completion progress of a task (like a download or file upload). It is "indeterminate" (unknown duration) or "determinate" (specific value).
    * **`<meter>`**: Represents a scalar measurement within a known range (like disk usage, battery level, or a skill proficiency). It allows for "low", "high", and "optimum" zones.

* **In-Depth Example (A Skill Proficiency Bar):**
    ```html
    <label for="html-skill">HTML</label>
    <meter id="html-skill" value="0.75" min="0" max="1" low="0.3" high="0.8" optimum="1">75%</meter>
    ```

### 3. The Web App Manifest

* **Lecture & Concepts:**
    * A `site.webmanifest` is a small JSON file that tells mobile browsers how your site should behave if someone adds it to their home screen — its name, its icons, its background color. It's what turns "Add to Home Screen" into something that looks like a real app icon instead of a bare bookmark.
    * Link it from the `<head>` with `<link rel="manifest" href="site.webmanifest">`, right next to the favicon links you're about to add below.
    * This pairs directly with the favicon work in this same module — you already have the icon artwork; the manifest just describes it properly so mobile OSes know what to do with it.

* **In-Depth Example:**
    ```json
    {
      "name": "Alice Chen — Portfolio",
      "short_name": "Alice Chen",
      "icons": [
        { "src": "assets/icon-192.png", "sizes": "192x192", "type": "image/png" },
        { "src": "assets/icon-512.png", "sizes": "512x512", "type": "image/png" }
      ],
      "start_url": "/",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#0E7AFE"
    }
    ```
    ```html
    <link rel="manifest" href="site.webmanifest">
    ```

* **⭐️ Class Exercise: Make Your Site Installable**
    1.  Create `site.webmanifest` in your project root, with your own name and the same PNG icons you're about to set up as your favicon below.
    2.  Link it from the `<head>` of all three pages.
    3.  Once your site is deployed later this week, open it on your phone and try "Add to Home Screen" — confirm your icon and name show up correctly.

* **⭐️ Class Exercise: Add an FAQ and Skill Meters to `about.html`**
    1.  Add a small "FAQ" section using two or three `<details>`/`<summary>` pairs (e.g., "What's your stack?", "Are you open to work?").
    2.  Next to each skill in your "Skills & Experience" table (from Week 3/6), add a `<meter>` showing rough proficiency.

---

## Module 13: Performance, Optimization & Deployment

Writing code is only half the battle. The other half is making sure it loads fast and gets to the user.

### 1. Modern Favicons (The SVG Way)

* **Lecture & Concepts:**
    * Gone are the days of generating 20 different `.ico` files.
    * **The Modern Stack:**
        1.  **SVG Favicon:** For modern browsers (Light/Dark mode support!).
        2.  **PNG Favicon (192x192):** For Android/Chrome fallback.
        3.  **Apple Touch Icon:** For iPhone home screens.
        4.  **`favicon.ico`:** Legacy fallback (put it in the root folder, don't link it).

* **In-Depth Example:**
    ```html
    <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
    ```

* Reuse your Week 5 SVG monogram as this favicon — you already have the artwork, no need to make something new.

### 2. Resource Hints (Preloading)

* **Lecture & Concepts:**
    * You can tell the browser to load important things *before* it finds them in the HTML.
    * **`rel="preload"`**: "Download this NOW." Use for hero images, custom fonts, or critical CSS.
    * **`rel="preconnect"`**: "Shake hands with this server." Use for 3rd party domains (like Google Fonts or Analytics).

* **In-Depth Example:**
    ```html
    <head>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link rel="preload" as="image" href="assets/profile-wide.jpg">
    </head>
    ```

### 3. The `loading` Attribute (Lazy Loading)

* **Lecture & Concepts:**
    * Images and iframes are heavy. By default, the browser downloads *all* of them immediately, slowing down the page load.
    * **`loading="lazy"`**: Tells the browser, "Don't download this image until the user scrolls near it."
    * **`loading="eager"`**: The default. Download immediately.
    * **Best Practice:** Use `eager` (or default) for the "above the fold" content (your profile photo/hero). Use `lazy` for *everything else* — your project screenshots, embeds.

### 4. Deployment (Going Live)

* **Lecture & Concepts:**
    * Your code has been living in a GitHub repository since Week 1's `git push` — that repo is what actually goes live now, not a raw folder on your computer.
    * **Static Hosting:** Since your portfolio is pure HTML (no database, no backend), any of these deploy directly off the GitHub repo you already have:
        * **Github Pages:** Free, built into the repo itself. `Settings → Pages → Branch: main → Folder: / (root) → Save`. GitHub gives you a live URL in about a minute.
        * **Netlify** / **Vercel:** Connect your GitHub repo once in their dashboard; every future `git push` automatically redeploys — no more drag-and-drop.
    * Whichever you pick, the workflow is the same one from Week 1: commit, push, then flip one setting to make it public.

* **In-Depth Example (Commit, Push, then Enable Pages):**
    ```bash
    git add .
    git commit -m "Week 7: performance tuning + deploy"
    git push
    ```
    Then on GitHub: **Settings → Pages → Branch: `main` → Folder: `/ (root)` → Save.**

* **⭐️ Class Exercise: Ship It**
    1.  Commit and push your final Week 7 changes using the commands above.
    2.  Turn on GitHub Pages for your repo (or connect it to Netlify/Vercel instead, if you'd rather).
    3.  Once live, open the URL in a **second browser** you haven't used all course long (Firefox if you've lived in Chrome, or vice versa) and on your **phone** — confirm it looks right in both. Same cross-browser habit from Week 5, now applied to the real deployed site.
    4.  Bookmark the live URL — you'll deploy to this exact same address for the rest of this course.

---

### Week 7: Comprehensive Assignment — Optimize & Deploy Your Portfolio

**Objective:** Take the same three-page portfolio you've built since Week 1, tune its performance, and put it on a live URL.

**Requirements:**

1.  **Native Interactivity:** An FAQ using `<details>`/`<summary>` on `about.html`, and `<meter>` proficiency bars next to each skill.
2.  **Installable:** A `site.webmanifest` linked from every page, tested via "Add to Home Screen" on your phone.
3.  **Favicon:** Your Week 5 SVG monogram, linked as the favicon on all three pages.
4.  **Preloading:** `rel="preload"` on your homepage's hero/profile image.
5.  **Lazy Loading:** `loading="lazy"` on every project screenshot and every `<iframe>` embed (YouTube demo, Google Map).
6.  **Deployment:**
    * Commit and push your final changes to the same GitHub repo from Week 1.
    * Enable GitHub Pages (or connect Netlify/Vercel) so the repo deploys automatically.
    * Confirm the live URL renders correctly in a second browser and on your phone.
    * **Submit the LIVE URL** — not just the code. This is the exact same live site the CSS course will style next.

**Bonus Challenge:**
Add a `<link rel="canonical" href="...">` tag to the head of each page (research what this does for SEO!) and a `theme-color` meta tag to change the browser bar color on mobile.
