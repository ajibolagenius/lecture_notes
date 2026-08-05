# Comprehensive HTML5 Course: From Beginner to Semantic Expert

## Course Overview

* **Target Audience:** Complete beginners to web development — no prior coding experience assumed.
* **Tools:** VS Code, a modern browser (Chrome or Firefox) with Dev Tools, and a free Github/Netlify account for Week 7's deployment.
* **Goal:** Build the structure of modern, accessible, and search-engine-optimized websites — and finish with your own live, deployed personal portfolio site.

This course is the required starting point for all web development. It takes students with zero prior knowledge and teaches them how to build the structure of modern, accessible websites. This course provides the essential "skeleton" (HTML) upon which all CSS and JavaScript code is built. **You will build one continuous project all course long: your own personal portfolio site** — starting from a single unstyled page in Week 1, and finishing with a deployed, accessible, three-page site in Week 7. The Portfolio you build here is the exact same one you'll style in the CSS course, make interactive in the JavaScript course, and rebuild as an app in the React course.

---

## Week 1: The Absolute Fundamentals

### Module 1: Introduction to Web Development
* **Learning Objectives:**
    * Explain the relationship between HTML, CSS, and JavaScript.
    * Understand the roles of a web browser and a code editor.
    * Set up a development environment (VS Code, browser).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is a Website?** | 30 mins | 15 mins |
| The "Skeleton, Clothes, Brain" analogy (HTML, CSS, JS). | - Why HTML is the first step. | - Tour a few websites and "View Source". |
| **Tools of the Trade** | 45 mins | 30 mins |
| Code Editors (VS Code) vs. Text Editors (Notepad). | - Web Browsers (Chrome, Firefox) and Dev Tools. | - Install VS Code and create a `portfolio` project folder with `index.html`. |
| **Your First Webpage** | 30 mins | 30 mins |
| The `<!DOCTYPE html>` declaration. | - The `<html>`, `<head>`, and `<body>` tags. | - Write the boilerplate for your portfolio's `index.html`. |
| **The `<head>` Element** | 45 mins | 15 mins |
| The `<title>` tag (for the browser tab). | - The `<meta charset="UTF-8">` tag. | - Add a title (e.g., "[Your Name] — Portfolio") and meta tag to your `index.html`. |

### Module 2: Core Content Tags
* **Learning Objectives:**
    * Structure text content using headings and paragraphs.
    * Create hyperlinks to other pages.
    * Add images to a page.
    * Understand the concept of "attributes."

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Headings & Paragraphs** | 45 mins | 30 mins |
| `<h1>` through `<h6>` (Hierarchical importance). | - The `<p>` tag. | - Write your portfolio's intro: one `<h1>` with your name, an `<h2>` "About Me", and a `<p>` bio. |
| **Attributes** | 30 mins | 15 mins |
| What is an attribute? (`name="value"`). | - `id` (unique) vs. `class` (reusable). | - Add `id`/`class` attributes to your portfolio's headings. |
| **Links (Anchor Tags)** | 45 mins | 30 mins |
| The `<a>` tag and `href` attribute. | - Linking to external sites (with `http://`). | - Add a link to your Github or LinkedIn profile. |
| Relative vs. Absolute paths. | - Linking to other pages (`/about.html`). | - Add a relative link to a `contact.html` page (even though it doesn't exist yet). |
| **Images** | 45 mins | 30 mins |
| The `<img>` tag (self-closing). | - The `src` and `alt` attributes. | - Add your profile photo to your portfolio's homepage. |
| Importance of `alt` text for accessibility. | - Image paths (relative vs. absolute). | - Write meaningful `alt` text for your photo. |

**Week 1 Assignment:** Build "Portfolio Home Page v1" (`index.html`).
* A main `<h1>` with your name, an `<img>` profile photo (with `alt` text), an `<h2>` "About Me" section with a `<p>` bio.
* One external link (Github/LinkedIn) and one relative link to `contact.html` (not built yet).
* This is the file you'll keep extending every week for the rest of this course.

---

## Week 2: Structuring Content

### Module 3: Lists & Text Formatting
* **Learning Objectives:**
    * Create ordered, unordered, and description lists.
    * Apply inline semantic formatting to text.
    * Use generic containers (`div` and `span`).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Unordered Lists** | 45 mins | 30 mins |
| The `<ul>` and `<li>` (list item) tags. | - Use for navigation, feature lists, etc. | - Add a "Skills" section to your portfolio with a bulleted `<ul>` of your skills/technologies. |
| **Ordered Lists** | 45 mins | 30 mins |
| The `<ol>` and `<li>` tags. | - Use for "Top 10" lists, recipes, steps. | - Add a numbered `<ol>` of milestones in your learning journey so far. |
| **Description Lists** | 30 mins | 30 mins |
| The `<dl>`, `<dt>` (term), and `<dd>` (description) tags. | - Use for glossaries, key/value pairs. | - Add a "Tools I Use" `<dl>` pairing 2-3 tools with a one-line description each. |
| **Inline Semantics** | 45 mins | 30 mins |
| `<strong>` (importance) vs. `<b>` (bold). | - `<em>` (stress/emphasis) vs. `<i>` (italic). | - Go back to your bio paragraph and correctly use `<strong>` and `<em>`. |
| Other tags: `<br>`, `<hr>`, `<sub>`, `<sup>` | - `<code>`, `<pre>` | - If you mention a technology by name, mark it up with `<code>`. |
| **Generic Containers** | 45 mins | 15 mins |
| `<div>` (a "division" or block-level box). | - `<span>` (an inline container). | - Wrap your Skills list in a `<div class="skills">`. |
| When to use `div` vs. a semantic tag. | - Use `<span>` to style part of a paragraph. | - Use `<span>` to mark up one skill mentioned inline in your bio. |

**Week 2 Assignment:** Expand "Portfolio Home Page" with structured content.
* Add the "Skills" `<ul>`, the "Journey" `<ol>`, and the "Tools I Use" `<dl>` to your existing `index.html` from Week 1.
* Correctly apply `<strong>`/`<em>` somewhere in your bio paragraph.
* Wrap the Skills section in a `<div class="skills">`.

---

## Week 3: Semantic Layout & Tables

### Module 4: Building with Semantic HTML5
* **Learning Objectives:**
    * Understand the "why" behind semantic HTML (Accessibility & SEO).
    * Structure a page layout using modern HTML5 tags.
    * Know the difference between `<section>` and `<article>`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The "Why" of Semantics** | 45 mins | 15 mins |
| "Divitis" and the problem with `<div>`. | - How screen readers navigate a page. | - Analyze a real portfolio site online and identify its semantic regions. |
| Accessibility (a11y) and SEO. | - The Document Outline. | |
| **Layout Tags** | 1.5 hours | 45 mins |
| `<header>` (the top of the page/section). | - `<footer>` (the bottom of the page/section). | - Refactor your `index.html` to wrap its content in `<header>`, `<main>`, and `<footer>`. |
| `<nav>` (for main navigation links). | - Wrap your `<ul>` of links in a `<nav>` tag. | - Build a real `<nav>` linking to Home/About/Contact. |
| `<main>` (for the *one* main content area). | - The `<main>` tag must be unique. | |
| **Content Sectioning** | 1.5 hours | 30 mins |
| `<section>` (a thematic group of content). | - `<article>` (a self-contained, distributable piece). | - Add a "Featured Work" `<section>` with an `<article>` for each of 2-3 projects. |
| `<aside>` (for sidebars, callouts). | - When to use `section` vs. `article` vs. `div`. | - Add an `<aside>` with a "Fun Facts" list next to your bio. |

### Module 5: Tables for Data
* **Learning Objectives:**
    * Create a table with a header, body, and rows.
    * Understand how to merge cells with `colspan` and `rowspan`.
    * Use table-specific semantic tags (`<thead>`, `<tbody>`, `<caption>`).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Basic Table Structure** | 45 mins | 30 mins |
| `<table>`, `<tr>` (row), `<td>` (data cell). | - `<th>` (header cell). | - Create a simple 2-column table. |
| **Advanced Table Structure** | 1 hour | 45 mins |
| `<thead>`, `<tbody>`, `<tfoot>`. | - `<caption>` (for the table's title). | - Build a "Skills & Experience" table (Skill, Years, Level) for your portfolio, with a proper header and body. |
| Merging Cells | - `colspan` (merge columns). | - Add a row that spans both columns for a section divider (e.g., "Languages" vs. "Tools"). |
| | - `rowspan` (merge rows). | |
| Accessibility (`scope` attribute) | - `scope="col"` and `scope="row"`. | - Add the `scope` attribute to your table's `<th>` elements. |

**Week 3 Assignment:** Give your portfolio a real semantic layout.
* Refactor `index.html` to use `<header>` (with `<nav>`), `<main>`, and `<footer>` — no more unstructured content.
* Add a "Featured Work" section with an `<article>` per project (image, title, description, tech-used list).
* Add the "Skills & Experience" `<table>` with `<thead>`/`<tbody>`/`<caption>` and `scope` attributes — you'll reuse this table on the About page in Week 6.

---

## Week 4: HTML Forms

### Module 6: Building Forms
* **Learning Objectives:**
    * Create a form that can send data.
    * Understand the critical importance of the `<label>` tag.
    * Use common input types (text, password, email).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The `<form>` Element** | 45 mins | 30 mins |
| The `action` and `method` (GET vs. POST) attributes. | - How forms "submit" data. | - Create `contact.html` with a basic `<form>` tag. |
| **The `<input>` Element** | 1 hour | 30 mins |
| The `type` attribute (`text`, `password`, `email`). | - The `name` attribute (essential for data). | - Add `name`/`email` inputs to your contact form. |
| The `placeholder` attribute. | - The `value` attribute. | |
| **Labels (Accessibility)** | 1 hour | 45 mins |
| The `<label>` tag. | - Why labels are critical for screen readers. | - Add `<label>`s to your contact form's inputs. |
| The `for` attribute (links to `id`). | - Implicit vs. Explicit labels. | - Ensure every input has a linked label. |

### Module 7: Advanced Form Controls
* **Learning Objectives:**
    * Use interactive controls like radio buttons, checkboxes, and dropdowns.
    * Organize long forms with fieldsets.
    * Implement form validation.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Buttons** | 45 mins | 30 mins |
| `<input type="submit">` (the old way). | - `<button type="submit">` (the modern way). | - Use a `<button>` element for your contact form's submit button. |
| `<button type="button">` vs. `type="submit"`. | |
| **Choice Elements** | 1.5 hours | 1 hour |
| `<input type="radio">` (for single choice). | - Using `name` to group radio buttons. | - Add a radio group for "Preferred Contact Method" (Email/Phone). |
| `<input type="checkbox">` (for multiple choice). | - `<textarea>` for multi-line text. | - Add a `<textarea>` for the message body. |
| **Dropdowns** | 1 hour | 30 mins |
| The `<select>` and `<option>` tags. | - The `value` attribute on `<option>`. | - Add a `<select>` dropdown for "Reason for Contact" (Job Opportunity, Collaboration, Just Saying Hi). |
| **Form Structure & Validation** | 1 hour | 30 mins |
| `<fieldset>` (grouping related fields). | - `<legend>` (a title for the fieldset). | - Wrap your contact fields in a `<fieldset>`. |
| HTML5 Validation: `required`, `minlength`. | - `type="number"`, `type="date"`. | - Make the email and message fields `required`. |

**Week 4 Assignment:** Build "Portfolio Contact Form" (`contact.html`).
* A complete `<form>` with `name`, `email`, a "Reason for Contact" `<select>`, a "Preferred Contact Method" radio group, and a `<textarea>` for the message.
* Every input has a correctly linked `<label>`; email and message are `required`.
* Link your homepage's `<nav>` to this new `contact.html`.

---

## Week 5: Multimedia & Embedding

### Module 8: Audio & Video
* **Learning Objectives:**
    * Embed video and audio files directly into an HTML page.
    * Provide fallbacks for older browsers.
    * Understand and use common attributes like `controls`, `autoplay`, and `loop`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The `<video>` Element** | 1.5 hours | 45 mins |
| The `src` attribute. | - `controls`, `autoplay` (muted), `loop`, `poster`. | - Create `about.html` and embed a short self-recorded intro video (or a placeholder sample). |
| The `<source>` Element | - Providing multiple formats (mp4, webm, ogg). | - Add `<source>` tags for different video types. |
| Fallback content. | - Add fallback text for old browsers. |
| **The `<audio>` Element** | 1 hour | 30 mins |
| The `src` attribute. | - `controls`, `autoplay`, `loop`. | - (Optional) Add a short audio intro instead of/alongside video. |
| Using `<source>` for audio (mp3, ogg, wav). | - Add `<source>` tags and fallback text. |

### Module 9: Advanced Media & Embedding
* **Learning Objectives:**
    * Embed content from other websites (like YouTube or Google Maps).
    * Use the `<picture>` element for responsive images.
    * Understand the basics of `<svg>`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Embedding with `<iframe>`** | 1 hour | 30 mins |
| What is an `iframe`? (Security implications). | - How to get the "embed" code from YouTube. | - Embed a YouTube demo video for one of your Featured Work projects. |
| Google Maps embedding. | - `width`, `height`, `frameborder`, `allowfullscreen`. | - Embed a Google Map of your city on `contact.html`. |
| **Responsive Images** | 1.5 hours | 45 mins |
| The `<picture>` element. | - Using `<source>` with `media` queries. | - Use `<picture>` for your profile photo on `about.html` — a square crop on mobile, wide on desktop. |
| The `srcset` attribute (for resolution switching). | - Art direction vs. Resolution switching. | |
| **Intro to `<svg>`** | 1 hour | 15 mins |
| Vector vs. Raster (Bitmap) images. | - Why SVG is great for logos and icons. | - Create a simple SVG monogram (your initials) to use as your site's logo in the header. |

**Week 5 Assignment:** Build "About Me" Page (`about.html`).
* A self-recorded (or placeholder) intro `<video>` with `controls` and fallback text.
* A responsive `<picture>` of your profile photo (different crop for mobile vs. desktop).
* An embedded YouTube demo for one Featured Work project, and a Google Map on `contact.html`.
* Your SVG monogram in the site header, reused across all three pages.

---

## Week 6 / Final Project: Advanced HTML & Best Practices

### Module 10: Accessibility (a11y)
* **Learning Objectives:**
    * Understand why web accessibility is a legal and ethical requirement.
    * Use ARIA roles to enhance semantic meaning.
    * Write "landmark" roles and `aria-label`s.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is A11y?** | 1 hour | 30 mins |
| Who benefits? (Visual, motor, auditory, cognitive). | - Screen readers (VoiceOver, NVDA). | - Install a screen reader extension and try to navigate your own portfolio. |
| **ARIA Roles (Basics)** | 1.5 hours | 45 mins |
| What is ARIA? (Accessible Rich Internet Applications). | - When to use it (only when HTML isn't enough). | - Audit your Week 3 layout: confirm `<nav>`/`<main>` are doing their job without needing extra roles. |
| Landmark Roles: `navigation`, `main`, `banner`, `contentinfo`. | - (Note: HTML5 tags like `<nav>` do this automatically.) | |
| **ARIA Attributes** | 1 hour | 30 mins |
| `aria-label` (for "icon-only" buttons). | - `aria-hidden="true"` (to hide decorative icons). | - Add `aria-label`s to any icon-only social links in your footer. |

### Module 11: SEO & Modern HTML
* **Learning Objectives:**
    * Use `<meta>` tags to improve SEO and social sharing.
    * Understand Open Graph protocol.
    * Be aware of other modern HTML features.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **SEO Meta Tags** | 1 hour | 30 mins |
| `<meta name="description">` | - `<meta name="keywords">` (less important now). | - Add a unique `<title>` and meta description to each of your 3 pages. |
| **Social Media Tags** | 1 hour | 30 mins |
| The Open Graph Protocol (og:). | - `og:title`, `og:description`, `og:image`. | - Add Open Graph tags to `index.html` so it looks good when shared. |
| **Other HTML5 Features** | 1.5 hours | 30 mins |
| `<template>` tag (for JS). | - `<canvas>` (for 2D/3D graphics with JS). | - (Lecture-only) High-level overview of these features and how they set the stage for JavaScript. |
| Microdata and Structured Data (schema.org). | - What these are and why they matter for SEO. | |

**Week 6 / Final Project:** Finish "The Professional Portfolio".
* **Goal:** Combine and polish everything from Weeks 1-5 into one accessible, three-page site.
* **Structure:** `index.html`, `about.html`, `contact.html`, an `assets/` folder — all already built, now finished and polished.
* **Requirements:**
    * Every page has a unique `<title>` and `<meta name="description">`; `index.html` has Open Graph tags.
    * The "Skills & Experience" table from Week 3 appears on `about.html`.
    * Every image has real `alt` text; every icon-only link has an `aria-label`.
    * The heading outline (`h1` → `h2` → `h3`) is logical on every page, with no skipped levels.

---

## Week 7: Modern Interactions & Performance Tuning

### Module 12: Native Interactive Elements
* **Learning Objectives:**
    * Use `<details>`/`<summary>` for native, JS-free expand/collapse UI.
    * Use `<meter>` to visualize a bounded value.
    * Understand `contenteditable` as a modern HTML feature.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The Native Accordion** | 1 hour | 45 mins |
| `<details>`/`<summary>` — expand/collapse with zero JavaScript. | - The `open` attribute. | - Add an FAQ-style `<details>` section to `about.html` ("Want to work together?", "What's your stack?"). |
| **Visualizing Data** | 45 mins | 45 mins |
| `<meter>` for a bounded value; `<progress>` for task completion. | - `low`/`high`/`optimum` zones. | - Add a `<meter>` proficiency bar next to each skill in your Skills table. |
| **Editable Content** | 30 mins | 15 mins |
| `contenteditable="true"` turns any element into an editor. | - How tools like Notion/Google Docs use this. | - (Lecture-only) Not added to the portfolio — just know it exists. |

### Module 13: Performance, Optimization & Deployment
* **Learning Objectives:**
    * Set up a modern favicon.
    * Use resource hints (`preload`/`preconnect`) and lazy loading.
    * Deploy a static site to a live URL.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Modern Favicons** | 45 mins | 30 mins |
| SVG favicon + PNG/Apple Touch Icon fallbacks. | - Why SVG favicons support light/dark mode. | - Add a favicon (reuse your Week 5 SVG monogram) to all 3 pages. |
| **Resource Hints** | 45 mins | 30 mins |
| `rel="preload"` for critical assets; `rel="preconnect"` for 3rd-party domains. | - When each one actually helps. | - Preload your homepage's profile photo. |
| **Lazy Loading** | 30 mins | 30 mins |
| `loading="lazy"` on images/iframes below the fold. | - `eager` vs. `lazy` — when to use which. | - Add `loading="lazy"` to your project screenshots and embeds. |
| **Deployment** | 1 hour | 1 hour |
| Static hosting: Netlify, Vercel, Github Pages. | - Drag-and-drop vs. Git-based deploys. | - Deploy your finished portfolio and get a live URL. |

**Week 7 Assignment:** Optimize & Deploy Your Portfolio.
* Add a favicon, preload your hero/profile image, and lazy-load everything else (project screenshots, embeds).
* Deploy to Netlify, Vercel, or Github Pages.
* **Submit the live URL** — this is the same site the CSS course will style next.
