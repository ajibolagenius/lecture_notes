# Comprehensive HTML5 Course: From Beginner to Semantic Expert

## Course Overview

This course is the required starting point for all web development. It takes students with zero prior knowledge and teaches them how to build the structure of modern, accessible, and search-engine-optimized (SEO) websites. This course provides the essential "skeleton" (HTML) upon which all CSS and JavaScript code is built.

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
| Code Editors (VS Code) vs. Text Editors (Notepad). | - Web Browsers (Chrome, Firefox) and Dev Tools. | - Install VS Code and create `index.html`. |
| **Your First Webpage** | 30 mins | 30 mins |
| The `<!DOCTYPE html>` declaration. | - The `<html>`, `<head>`, and `<body>` tags. | - Write a "Hello, World!" page with the basic structure. |
| **The `<head>` Element** | 45 mins | 15 mins |
| The `<title>` tag (for the browser tab). | - The `<meta charset="UTF-8">` tag. | - Add a title and meta tag to your `index.html`. |

### Module 2: Core Content Tags
* **Learning Objectives:**
    * Structure text content using headings and paragraphs.
    * Create hyperlinks to other pages.
    * Add images to a page.
    * Understand the concept of "attributes."

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Headings & Paragraphs** | 45 mins | 30 mins |
| `<h1>` through `<h6>` (Hierarchical importance). | - The `<p>` tag. | - Create a simple blog post structure with one `h1` and several `h2`s and `p` tags. |
| **Attributes** | 30 mins | 15 mins |
| What is an attribute? (`name="value"`). | - `id` (unique) vs. `class` (reusable). | - Add `id` and `class` attributes to your elements. |
| **Links (Anchor Tags)** | 45 mins | 30 mins |
| The `<a>` tag and `href` attribute. | - Linking to external sites (with `http://`). | - Add a link to Google. |
| Relative vs. Absolute paths. | - Linking to other pages (`/about.html`). | - Add a link to a "contact.html" page (even if it doesn't exist yet). |
| **Images** | 45 mins | 30 mins |
| The `<img>` tag (self-closing). | - The `src` and `alt` attributes. | - Find an image and add it to your page. |
| Importance of `alt` text for accessibility. | - Image paths (relative vs. absolute). | - Write meaningful `alt` text for your image. |

**Week 1 Assignment:** Build a "Simple Bio Page".
* A single `index.html` file.
* Must contain: A main `<h1>`, an `<img>` of yourself or a hobby (with `alt` text), a few `<h2>` sections (e.g., "About Me," "Hobbies"), and `<p>` tags with text.
* Must include one `<a>` link to an external website (like your LinkedIn or favorite site).

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
| The `<ul>` and `<li>` (list item) tags. | - Use for navigation, feature lists, etc. | - Create a bulleted list of your hobbies. |
| **Ordered Lists** | 45 mins | 30 mins |
| The `<ol>` and `<li>` tags. | - Use for "Top 10" lists, recipes, steps. | - Create a numbered list of steps for making coffee. |
| **Description Lists** | 30 mins | 30 mins |
| The `<dl>`, `<dt>` (term), and `<dd>` (description) tags. | - Use for glossaries, key/value pairs. | - Create a list of 2-3 new HTML tags and their descriptions. |
| **Inline Semantics** | 45 mins | 30 mins |
| `<strong>` (importance) vs. `<b>` (bold). | - `<em>` (stress/emphasis) vs. `<i>` (italic). | - Write a paragraph and correctly use `<strong>` and `<em>`. |
| Other tags: `<br>`, `<hr>`, `<sub>`, `<sup>` | - `<code>`, `<pre>` | - Write a "code" block using `<pre>` and `<code>`. |
| **Generic Containers** | 45 mins | 15 mins |
| `<div>` (a "division" or block-level box). | - `<span>` (an inline container). | - Wrap your hobbies list in a `<div>` with a class of "hobbies". |
| When to use `div` vs. a semantic tag. | - Use `<span>` to style part of a paragraph. | - Use `<span>` to make one word in a `<p>` tag a different color (using an inline `style` attribute for now). |

**Week 2 Assignment:** Build a "Recipe Page".
* Use `<h1>` for the recipe name.
* Use an `<img>` for a picture of the food.
* Use an `<h2>` for "Ingredients" followed by a `<ul>`.
* Use an `<h2>` for "Instructions" followed by an `<ol>`.
* Use `<strong>` to highlight important parts of an instruction (e.t., "**Preheat oven to 350°F**").

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
| "Divitis" and the problem with `<div>`. | - How screen readers navigate a page. | - Analyze a website (like a news site) and identify its semantic regions. |
| Accessibility (a11y) and SEO. | - The Document Outline. | |
| **Layout Tags** | 1.5 hours | 45 mins |
| `<header>` (the top of the page/section). | - `<footer>` (the bottom of the page/section). | - Refactor your Week 1 Bio Page to use these tags. |
| `<nav>` (for main navigation links). | - Wrap your `<ul>` of links in a `<nav>` tag. |
| `<main>` (for the *one* main content area). | - The `<main>` tag must be unique. |
| **Content Sectioning** | 1.5 hours | 30 mins |
| `<section>` (a thematic group of content). | - `<article>` (a self-contained, distributable piece). | - Create a blog layout with `<article>` tags for each post. |
| `<aside>` (for sidebars, callouts). | - When to use `section` vs. `article` vs. `div`. | - Add an `<aside>` to your blog layout. |

### Module 5: Tables for Data
* **Learning Objectives:**
    * Create a table with a header, body, and rows.
    * Understand how to merge cells with `colspan` and `rowspan`.
    * Use table-specific semantic tags (`<thead>`, `<tbody>`, `<caption>`).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Basic Table Structure** | 45 mins | 30 mins |
| `<table>`, `<tr>` (row), `<td>` (data cell). | - `<th>` (header cell). | - Create a simple 2x2 table. |
| **Advanced Table Structure** | 1 hour | 45 mins |
| `<thead>`, `<tbody>`, `<tfoot>`. | - `<caption>` (for the table's title). | - Create a table of "User Data" (Name, Email, Role) using a proper header and body. |
| Merging Cells | - `colspan` (merge columns). | - Add a row that spans all columns. |
| | - `rowspan` (merge rows). | - Create a "schedule" table that uses `rowspan`. |
| Accessibility (`scope` attribute) | - `scope="col"` and `scope="row"`. | - Add the `scope` attribute to your `<th>` elements. |

**Week 3 Assignment:** Build a "Company Homepage" Layout.
* Build the *semantic structure* of a homepage. **No CSS is required**, the goal is perfect structure.
* Use `<header>` for the top, containing a `<nav>`.
* Use `<main>` to wrap the content.
* Inside `<main>`, use a `<section>` for "About Us."
* Use another `<section>` for "Our Team" (with `div`s for team members).
* Use an `<article>` for a recent "Blog Post" snippet.
* Use `<footer>` for the copyright info.

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
| The `action` and `method` (GET vs. POST) attributes. | - How forms "submit" data. | - Create a basic `<form>` tag. |
| **The `<input>` Element** | 1 hour | 30 mins |
| The `type` attribute (`text`, `password`, `email`). | - The `name` attribute (essential for data). | - Create a "Login" form with email, password, and a button. |
| The `placeholder` attribute. | - The `value` attribute. | |
| **Labels (Accessibility)** | 1 hour | 45 mins |
| The `<label>` tag. | - Why labels are critical for screen readers. | - Add `<label>`s to your login form. |
| The `for` attribute (links to `id`). | - Implicit vs. Explicit labels. | - Ensure every input has a linked label. |

### Module 7: Advanced Form Controls
* **Learning Objectives:**
    * Use interactive controls like radio buttons, checkboxes, and dropdowns.
    * Organize long forms with fieldsets.
    * Implement form validation.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Buttons** | 45 mins | 30 mins |
| `<input type="submit">` (the old way). | - `<button type="submit">` (the modern way). | - Change your login button to a `<button>` element. |
| `<button type="button">` vs. `type="submit"`. | |
| **Choice Elements** | 1.5 hours | 1 hour |
| `<input type="radio">` (for single choice). | - Using `name` to group radio buttons. | - Add a radio button group for "Account Type" (Personal/Business). |
| `<input type="checkbox">` (for multiple choice). | - `<textarea>` for multi-line text. | - Add a checkbox for "Remember Me" and a "Comments" textarea. |
| **Dropdowns** | 1 hour | 30 mins |
| The `<select>` and `<option>` tags. | - The `value` attribute on `<option>`. | - Add a `<select>` dropdown for "Country". |
| **Form Structure & Validation** | 1 hour | 30 mins |
| `<fieldset>` (grouping related fields). | - `<legend>` (a title for the fieldset). | - Wrap your login fields in a `<fieldset>`. |
| HTML5 Validation: `required`, `minlength`. | - `type="number"`, `type="date"`. | - Make the email and password fields `required`. |

**Week 4 Assignment:** Build a "Registration Form".
* A complete `<form>` that includes:
* A "User Details" `<fieldset>` with inputs for `name`, `email`, and `password`.
* A "Preferences" `<fieldset>` with:
    * Radio buttons for "Preferred Contact Method" (Email/Phone).
    * Checkboxes for "Interests" (e.g., "Tech," "Music," "Art").
    * A `<select>` dropdown for "Experience Level" (Beginner, Intermediate, Expert).
* A `<textarea>` for "Bio."
* A `<button type="submit">` to submit the form.
* **Crucially:** Every single input must have a correctly linked `<label>`.

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
| The `src` attribute. | - The `controls`, `autoplay` (muted), `loop`, `poster`. | - Find a sample `.mp4` video and embed it. |
| The `<source>` Element | - Providing multiple formats (mp4, webm, ogg). | - Add `<source>` tags for different video types. |
| Fallback content. | - Add fallback text for old browsers. |
| **The `<audio>` Element** | 1 hour | 30 mins |
| The `src` attribute. | - `controls`, `autoplay`, `loop`. | - Find a sample `.mp3` file and embed it. |
| Using `<source>` for audio (mp3, ogg, wav). | - Add `<source>` tags and fallback text. |

### Module 9: Advanced Media & Embedding
* **Learning Objectives:**
    * Embed content from other websites (like YouTube or Google Maps).
    * Use the `<picture>` element for responsive images.
    * Understand the basics of `<svg>`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Embedding with `<iframe>`** | 1 hour | 30 mins |
| What is an `iframe`? (Security implications). | - How to get the "embed" code from YouTube. | - Embed a YouTube video on your page. |
| Google Maps embedding. | - `width`, `height`, `frameborder`, `allowfullscreen`. | - Embed a Google Map of your city. |
| **Responsive Images** | 1.5 hours | 45 mins |
| The `<picture>` element. | - Using `<source>` with `media` queries. | - Create a `<picture>` element that loads a "wide.jpg" on desktop and a "tall.jpg" on mobile. |
| The `srcset` attribute (for resolution switching). | - Art direction vs. Resolution switching. | |
| **Intro to `<svg>`** | 1 hour | 15 mins |
| Vector vs. Raster (Bitmap) images. | - Why SVG is great for logos and icons. | - Find a simple SVG logo online and paste it directly into your HTML. |

**Week 5 Assignment:** Create a "Media Showcase" page.
* The page should feature your "Top 3 Favorite Songs/Videos."
* For one, use the `<video>` element to self-host a video (you can find free samples online).
* For another, use the `<audio>` element to self-host a song (find free samples).
* For the third, use an `<iframe>` to embed a YouTube video.
* Use the `<picture>` element for the page's header image, providing different images for mobile and desktop.

---

## Week 6: Advanced HTML & Best Practices

### Module 10: Accessibility (a11y)
* **Learning Objectives:**
    * Understand why web accessibility is a legal and ethical requirement.
    * Use ARIA roles to enhance semantic meaning.
    * Write "landmark" roles and `aria-label`s.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is A11y?** | 1 hour | 30 mins |
| Who benefits? (Visual, motor, auditory, cognitive). | - Screen readers (VoiceOver, NVDA). | - Install a screen reader extension (like ChromeVox) and try to navigate your site. |
| **ARIA Roles (Basics)** | 1.5 hours | 45 mins |
| What is ARIA? (Accessible Rich Internet Applications). | - When to use it (only when HTML isn't enough). | - Go back to your Week 3 layout. Add `role="navigation"` to your `<nav>`, `role="main"` to `<main>`, etc. |
| Landmark Roles: `navigation`, `main`, `banner`, `contentinfo`. | - (Note: HTML5 tags like `<nav>` do this automatically, but it's good to know). | |
| **ARIA Attributes** | 1 hour | 30 mins |
| `aria-label` (for "icon-only" buttons). | - `aria-hidden="true"` (to hide decorative icons). | - Create a `<button>` with just an "X" icon. Add an `aria-label="Close"`. |

### Module 11: SEO & Modern HTML
* **Learning Objectives:**
    * Use `<meta>` tags to improve SEO and social sharing.
    * Understand Open Graph protocol.
    * Be aware of other modern HTML features.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **SEO Meta Tags** | 1 hour | 30 mins |
| `<meta name="description">` | - `<meta name="keywords">` (less important now). | - Add a meta description to your Week 3 project. |
| **Social Media Tags** | 1 hour | 30 mins |
| The Open Graph Protocol (og:). | - `og:title`, `og:description`, `og:image`. | - Add Open Graph tags to your Week 3 project so it looks good when shared on Facebook/Twitter. |
| **Other HTML5 Features** | 1.5 hours | 30 mins |
| `<template>` tag (for JS). | - `<canvas>` (for 2D/3D graphics with JS). | - (Lecture-only) High-level overview of these features and how they set the stage for JavaScript. |
| Microdata and Structured Data (schema.org). | - What these are and why they matter for SEO. | |

**Week 6 / Final Project:** Build a "Professional Portfolio Website".
* **Goal:** Combine *everything* from all 6 weeks.
* **Structure:**
    * A main `index.html` (Homepage), an `about.html`, and a `contact.html` page.
    * Use all semantic layout tags (`<header>`, `<nav>`, `<main>`, `<footer>`).
    * Your `<nav>` should link to all 3 pages.
* **Content:**
    * **Homepage:** A `<section>` for your bio, an `<article>` for a "Featured Project" (using `<img>` and `<ul>` for tech used).
    * **About Page:** Use `<video>` to embed a personal intro, use `<aside>` for a "Fun Facts" box.
    * **Contact Page:** A full-fledge, accessible `<form>` (from Week 4) with `<label>`s and `<fieldset>`s.
* **Best Practices (The "Expert" part):**
    * The entire site must be **fully accessible**. All images must have `alt` text. All form inputs must have `<label>`s.
    * All pages must have a unique `<title>` and a `<meta name="description">`.
    * Add ARIA labels to any ambiguous links (e.g., a "Read More" link should have `aria-label="Read more about Project X"`).
