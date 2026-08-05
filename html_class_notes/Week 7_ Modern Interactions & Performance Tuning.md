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

### 3. Editable Content (`contenteditable`)

* **Lecture & Concepts:**
    * You can make *any* HTML element editable by the user, turning a `<div>` into a text editor. This is how tools like Notion or Google Docs start.
    * **Attribute:** `contenteditable="true"`.
    * **Spellcheck:** `spellcheck="true/false"` controls red squiggly lines.
    * This one's lecture-only for our purposes — it's genuinely useful to know it exists, but it doesn't have an obvious place in a personal portfolio site.

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
    * Your `index.html` only exists on your computer right now. To share it with the world (or a hiring manager), it must live on a server.
    * **Static Hosting:** Since your portfolio is pure HTML (no database, no backend), we can use free static hosting.
    * **Top Providers:**
        * **Netlify:** Drag and drop your folder to deploy.
        * **Vercel:** Excellent for Git integration.
        * **Github Pages:** Hosted directly from your code repository.

---

### Week 7: Comprehensive Assignment — Optimize & Deploy Your Portfolio

**Objective:** Take the same three-page portfolio you've built since Week 1, tune its performance, and put it on a live URL.

**Requirements:**

1.  **Native Interactivity:** An FAQ using `<details>`/`<summary>` on `about.html`, and `<meter>` proficiency bars next to each skill.
2.  **Favicon:** Your Week 5 SVG monogram, linked as the favicon on all three pages.
3.  **Preloading:** `rel="preload"` on your homepage's hero/profile image.
4.  **Lazy Loading:** `loading="lazy"` on every project screenshot and every `<iframe>` embed (YouTube demo, Google Map).
5.  **Deployment:**
    * Sign up for a free account on **Netlify**, **Vercel**, or **Github Pages**.
    * Deploy your `portfolio` folder.
    * **Submit the LIVE URL** — not just the code. This is the exact same live site the CSS course will style next.

**Bonus Challenge:**
Add a `<link rel="canonical" href="...">` tag to the head of each page (research what this does for SEO!) and a `theme-color` meta tag to change the browser bar color on mobile.
