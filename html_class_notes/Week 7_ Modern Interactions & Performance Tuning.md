# Week 7: Modern Interactions & Performance Tuning

We have built the structure, styled it (mentally), and made it accessible. Now, we take a step into the "Expert" territory. This week focuses on two things:
1.  **Native HTML Interactivity:** Using powerful tags that behave like JavaScript components without writing a single line of script.
2.  **Performance & Launch:** Optimizing how browsers load your site and finally putting it on the internet.

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
      <summary>What is the refund policy?</summary>
      <p>You can return any item within 30 days for a full refund.</p>
    </details>

    <details open>
      <summary>How do I contact support?</summary>
      <p>Email us at support@example.com.</p>
    </details>
    ```
    *Note: You can style these heavily with CSS (e.g., removing the default marker).*

### 2. Visualizing Data (`<progress>` & `<meter>`)

* **Lecture & Concepts:**
    * **`<progress>`**: Represents the completion progress of a task (like a download or file upload). It is "indeterminate" (unknown duration) or "determinate" (specific value).
    * **`<meter>`**: Represents a scalar measurement within a known range (like disk usage, battery level, or a review score). It allows for "low", "high", and "optimum" zones.

* **In-Depth Example:**
    ```html
    <label for="file-upload">Upload Progress:</label>
    <progress id="file-upload" value="70" max="100">70%</progress>

    <label for="disk-usage">Disk Usage (Critical):</label>
    <meter id="disk-usage" value="0.9" min="0" max="1" low="0.3" high="0.8" optimum="0.2">90%</meter>
    ```

### 3. Editable Content (`contenteditable`)

* **Lecture & Concepts:**
    * You can make *any* HTML element editable by the user, turning a `<div>` into a text editor. This is how tools like Notion or Google Docs start.
    * **Attribute:** `contenteditable="true"`.
    * **Spellcheck:** `spellcheck="true/false"` controls red squiggly lines.

* **In-Depth Example:**
    ```html
    <div contenteditable="true" spellcheck="true">
      <h3>My Notes</h3>
      <p>Click here and start typing to edit this text!</p>
    </div>
    ```

* **⭐️ Class Exercise: Build a Native Dashboard**
    1.  Create an HTML file.
    2.  Create a "System Status" section using `<details open>`.
    3.  Inside, add a `<meter>` for "Server Load" (make it look critical/high).
    4.  Add a `<progress>` bar for "Backup Status".
    5.  Below that, add a "Personal Notes" section using a `<div>` with `contenteditable="true"`.

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
    <link rel="icon" href="icon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="manifest" href="manifest.json"> ```

### 2. Resource Hints (Preloading)

* **Lecture & Concepts:**
    * You can tell the browser to load important things *before* it finds them in the HTML.
    * **`rel="preload"`**: "Download this NOW." Use for hero images, custom fonts, or critical CSS.
    * **`rel="preconnect"`**: "Shake hands with this server." Use for 3rd party domains (like Google Fonts or Analytics).

* **In-Depth Example:**
    ```html
    <head>
      <link rel="preconnect" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" crossorigin>

      <link rel="preload" as="image" href="images/hero-banner.jpg">
    </head>
    ```

### 3. The `loading` Attribute (Lazy Loading)

* **Lecture & Concepts:**
    * Images and Iframes are heavy. By default, the browser downloads *all* of them immediately, slowing down the page load.
    * **`loading="lazy"`**: Tells the browser, "Don't download this image until the user scrolls near it."
    * **`loading="eager"`**: The default. Download immediately.
    * **Best Practice:** Use `eager` (or default) for the "above the fold" content (header/hero). Use `lazy` for *everything else*.

### 4. Deployment (Going Live)

* **Lecture & Concepts:**
    * Your `index.html` only exists on your computer. To share it, it must live on a server.
    * **Static Hosting:** Since HTML/CSS/JS doesn't need a database (backend), we can use free static hosting.
    * **Top Providers:**
        * **Netlify:** Drag and drop a folder to deploy.
        * **Vercel:** Excellent for Git integration.
        * **GitHub Pages:** Hosted directly from your code repository.

---

### Week 7: Comprehensive Assignment

**Objective:** Optimize and Deploy a "Live Documentation Site".

**Project:**
You will build a documentation page for a fictional software tool, optimize its assets, use native interactive elements for the UI, and deploy it to a live URL.

**Requirements:**

1.  **Structure:**
    * Standard HTML5 Boilerplate with correct `meta` tags.
    * A `<header>` with a logo (SVG) and title.
2.  **Interactive Sidebar (`<aside>`):**
    * Use `<details>` and `<summary>` tags to create a collapsible navigation menu (e.g., "Getting Started", "Advanced Features", "API Reference").
3.  **Main Content:**
    * Use `<section>` tags for content.
    * Include a "System Requirements" section using `<meter>` tags (e.g., "RAM Required: Low", "CPU Usage: Medium").
4.  **Optimization:**
    * Include a large "Hero Screenshot" of the software at the top. Use `rel="preload"` in the head to load this image instantly.
    * Include 3-4 other screenshots further down the page. Add `loading="lazy"` to all of them.
    * Add a modern SVG favicon link.
5.  **Deployment:**
    * Sign up for a free account on **Netlify** (or GitHub Pages).
    * Drag and drop your project folder.
    * **Submit the LIVE URL** (e.g., `https://my-html-project.netlify.app`), not just the code.

**Bonus Challenge:**
Add a `<link rel="canonical" href="...">` tag to the head (research what this does for SEO!) and a `theme-color` meta tag to change the browser bar color on mobile.
