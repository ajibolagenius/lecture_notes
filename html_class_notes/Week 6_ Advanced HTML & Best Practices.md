# Week 6: Advanced HTML & Best Practices

Congratulations on reaching the final structural week of the HTML course! By now you have three real pages — `index.html`, `about.html`, and `contact.html` — with semantic layout, forms, and media all built in. You know how to structure content, build forms, and embed media.

This week is about the "invisible" qualities that separate amateur sites from professional ones: **Accessibility (a11y)** and **Search Engine Optimization (SEO)**. We'll polish the three pages you already have rather than build anything new from scratch.

---

## Module 10: Accessibility (a11y)

**"The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect."** — Tim Berners-Lee, Inventor of the Web.

### 1. What is Accessibility?

* **Lecture & Concepts:**
    * **a11y**: A numeronym for "Accessibility" (there are 11 letters between 'a' and 'y').
    * It means building websites that can be used by people with:
        * **Visual impairments:** Blind users (using screen readers like NVDA or VoiceOver), color blind users, or those with low vision.
        * **Motor impairments:** Users who cannot use a mouse and rely on a keyboard or voice commands.
        * **Cognitive impairments:** Users who need clear, consistent layouts and simple instructions.
    * **Legal Requirement:** In many countries, accessible websites are required by law (ADA in the US, EAA in Europe). For a portfolio specifically, an inaccessible site is also a bad first impression on any employer who checks.

### 2. Semantic HTML is the Foundation

* **Lecture & Concepts:**
    * The best way to be accessible is to write **valid, semantic HTML** — which is exactly what Weeks 1-5 already did.
    * If you use `<button>` for a button, the browser automatically handles keyboard focus (`Tab` key) and screen reader announcements ("Button, click me").
    * If you use `<div class="button">`, you have to rebuild all that functionality yourself (which is hard and error-prone).

### 3. ARIA (Accessible Rich Internet Applications)

* **Lecture & Concepts:**
    * Sometimes HTML isn't enough. If you build a complex widget (like a custom dropdown or a popup modal), HTML doesn't have a tag for that.
    * **ARIA** is a set of attributes you add to HTML to "describe" these custom elements to screen readers.
    * **The First Rule of ARIA:** Don't use ARIA if a native HTML element will do the job.

* **Common ARIA Attributes:**
    * **`aria-label="Text"`**: Used when an element has no visible text (like an icon button). It tells the screen reader what to say.
    * **`aria-hidden="true"`**: Tells screen readers to **ignore** an element. Used for decorative icons that add no meaning.
    * **`role="..."`**: Defines what an element *is* (e.g., `role="alert"` for an error message).

* **In-Depth Example (An Icon-Only Social Link):**
    A visual user sees a Github logo. A blind user hears nothing useful unless we label it.

    ```html
    <!-- Bad: no label -->
    <a href="https://github.com/yourusername"><svg>...</svg></a>

    <!-- Good: labeled -->
    <a href="https://github.com/yourusername" aria-label="My Github profile">
      <svg aria-hidden="true">...</svg>
    </a>
    ```

### 4. Visual Focus & Navigation

* **Lecture & Concepts:**
    * **Keyboard Navigation:** You must be able to navigate your entire site using only the `Tab` key.
    * **Focus States:** Never remove the blue outline (`outline: none`) on buttons/inputs unless you replace it with a custom style. Keyboard users rely on this to know where they are.
    * **Skip Links:** A hidden link at the very top of the page that lets keyboard users "Skip to Main Content."

* **⭐️ Class Exercise: Audit Your Own Footer**
    1.  Go to your `<footer>` (built in Week 3). If you have any icon-only social links (Github, LinkedIn icons instead of text), add `aria-label`s to each one describing where they go (e.g., `aria-label="My Github profile"`).
    2.  Add `aria-hidden="true"` to any decorative icon SVGs inside those links.
    3.  Try tabbing through all three of your pages using only your keyboard — confirm you can reach every link, nav item, and form field in a logical order.

### 5. Automated Accessibility Auditing

* **Lecture & Concepts:**
    * Manual tabbing catches keyboard-navigation bugs, but it won't catch everything — a missing `alt`, insufficient color contrast, or a skipped heading level. **Automated audits** catch these systematically, in seconds.
    * **Lighthouse** is built directly into Chrome DevTools (the "Lighthouse" tab). It scores your page on Accessibility, Performance, SEO, and Best Practices out of 100, and lists exactly what's failing and why.
    * **axe DevTools** is the other industry-standard tool (a free browser extension) — many real engineering teams gate pull requests on an axe scan passing before merge. Knowing the name matters as much as running it once here.

* **⭐️ Class Exercise: Run a Real Audit**
    1.  Open Chrome DevTools on `index.html`, go to the **Lighthouse** tab, and run an audit for **Accessibility** and **SEO**.
    2.  Aim for a score of **90+** on Accessibility. Fix whatever it flags — usually things you technically already know (missing `alt`, low contrast) but haven't checked systematically until now.
    3.  Repeat for `about.html` and `contact.html`. Note your three scores — you'll want them at 90+ before Week 7's deploy.

---

## Module 11: SEO & Modern HTML

### 1. SEO Meta Tags

* **Lecture & Concepts:**
    * **SEO (Search Engine Optimization)** is the practice of formatting your site so Google ranks it higher.
    * The `<head>` is the battleground for SEO.
    * **`<title>`**: The most important factor. It should be unique for every page. `Page Name | Your Name`.
    * **`<meta name="description" content="...">`**: The short paragraph that appears under the blue link in Google results. It doesn't directly affect ranking, but it affects **Click Through Rate (CTR)**.

* **In-Depth Example:**
    ```html
    <head>
      <title>About | Alice Chen</title>
      <meta name="description" content="Alice Chen is a junior web developer building projects in HTML, CSS, JavaScript, and React. See her work and get in touch.">
    </head>
    ```

### 2. The Open Graph Protocol (Social Media Cards)

* **Lecture & Concepts:**
    * Have you noticed that when you paste a link into Twitter, Slack, or WhatsApp, it turns into a beautiful card with an image and title? That is **Open Graph**.
    * It was invented by Facebook but is now the universal standard.
    * **Key Tags:**
        * `og:title`: The title of the card.
        * `og:description`: The description text.
        * `og:image`: **Crucial.** The URL of the image to show.
        * `og:url`: The canonical URL of the page.

* **In-Depth Example:**
    ```html
    <meta property="og:title" content="Alice Chen — Web Developer Portfolio">
    <meta property="og:description" content="See my projects and get in touch.">
    <meta property="og:image" content="https://alicechen.dev/assets/social-card.jpg">
    <meta property="og:url" content="https://alicechen.dev">
    <meta property="og:type" content="website">
    ```

### 3. Structured Data (schema.org & JSON-LD)

* **Lecture & Concepts:**
    * SEO tags and Open Graph tell search engines and social platforms what your page *looks like*. **Structured data** tells them what your page actually *is*, in a format machines can parse directly instead of guessing at from prose.
    * The vocabulary is **schema.org**; the easiest way to add it is a `<script type="application/ld+json">` block in your `<head>` — no need to sprinkle microdata attributes through your visible markup.
    * For a personal portfolio, the natural type is `Person`: your name, job title, and links to your other profiles. Search engines can use this to build a richer result for your name.

* **In-Depth Example:**
    ```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Alice Chen",
      "jobTitle": "Junior Web Developer",
      "url": "https://alicechen.dev",
      "sameAs": [
        "https://github.com/yourusername",
        "https://www.linkedin.com/in/yourusername"
      ]
    }
    </script>
    ```

* **⭐️ Class Exercise: Describe Yourself to a Machine**
    1.  Add this `<script type="application/ld+json">` block to the `<head>` of `index.html`.
    2.  Fill in your real name, job title, site URL, and your real GitHub/LinkedIn URLs in `sameAs`.
    3.  Once your site is deployed in Week 7, paste the live URL into Google's Rich Results Test to confirm it parses without errors.

### 4. Validating Your Markup

* **Lecture & Concepts:**
    * Browsers are extremely forgiving — they'll render broken HTML (a missing closing tag, a duplicate `id`) without complaining, which means real bugs can hide for weeks.
    * The **W3C Markup Validator** (validator.w3.org) checks your actual HTML against the HTML5 specification and reports every error, browser-independent of what any one browser happens to tolerate.
    * This isn't optional polish — it's the closest thing HTML has to a compiler. A page with validation errors has structural bugs you haven't found yet.

* **⭐️ Class Exercise: Validate All Three Pages**
    1.  Go to validator.w3.org and check `index.html`, `about.html`, and `contact.html` one at a time (upload the file, or paste your deployed URL once Week 7 is done).
    2.  Fix every **error**. Read the **warnings** too — a duplicate `id` is a real bug the validator catches instantly, since two elements sharing an `id` silently breaks anything that looks it up.
    3.  Re-run the validator after each fix until all three pages pass clean.

### 5. Modern HTML5 Features (`<dialog>`)

* **Lecture & Concepts:**
    * HTML is evolving. We now have native tags for complex UI components.
    * **`<dialog>`**: A native popup modal / dialog box.
    * In the past, modals required complex DIV structures and lots of ARIA. Now, the browser handles it, including "trapping focus" (accessibility requirement) and closing with the `Esc` key.

* **In-Depth Example (A "Hire Me" Modal):**
    ```html
    <dialog id="hire-me-dialog">
      <h2>Let's Work Together</h2>
      <p>Email me at <a href="mailto:alice@example.com">alice@example.com</a>.</p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>

    <button onclick="document.getElementById('hire-me-dialog').showModal()">Hire Me</button>
    ```

### A Quick Note on Printing

Someone will eventually print your About page alongside a resume. `@media print` is its own media query — separate from the responsive breakpoints you'll meet properly in the CSS course — and it's what lets you hide the `<nav>` and footer social icons (useless on paper) when a page is printed instead of viewed on-screen. Nothing to build yet; just know the query exists and what it's for.

---

### Week 6 / Final Project: Finish "The Professional Portfolio"

**Objective:** Combine and polish everything from Weeks 1-5 into one accessible, SEO-ready, three-page site. This project is the "Final Exam" for the HTML course — it must demonstrate Semantic Structure, Forms, Multimedia, SEO, and Accessibility, all in the same site you've been building since Week 1.

**Existing Project Structure (nothing new to scaffold):**
* `index.html` (Homepage — Weeks 1-3)
* `about.html` (About Me — Week 5)
* `contact.html` (Contact Form — Week 4)
* `assets/` (images, video, SVG logo)

#### Requirements Checklist:

**1. Global Structure (All Pages):**
* [ ] Valid HTML5 Boilerplate.
* [ ] **SEO:** Unique `<title>` and `<meta name="description">` for every page.
* [ ] **Social:** Open Graph tags (`og:title`, `og:image`) on `index.html`.
* [ ] **Structured Data:** A `Person` JSON-LD block in `index.html`'s `<head>`.
* [ ] **Validation:** All three pages pass the W3C Markup Validator with zero errors.
* [ ] **Layout:** The same `<header>`, `<nav>`, `<main>`, and `<footer>` structure on all three pages.

**2. Homepage (`index.html`):**
* [ ] **Hero Section:** Your `<h1>` and bio, from Week 1-2.
* [ ] **Featured Work:** `<article>` tags for 2-3 projects (from Week 3), each with an image (`alt` text required), a title (`<h3>`), and a description.
* [ ] **Semantic Outline:** Ensure the headings (`h1` → `h2` → `h3`) follow a logical order without skipping levels.

**3. About Page (`about.html`):**
* [ ] Your intro `<video>` from Week 5.
* [ ] Your responsive `<picture>` profile photo from Week 5.
* [ ] **Move your "Skills & Experience" `<table>` here from Week 3** — this is its permanent home. Keep the `<thead>`/`<tbody>`/`scope` attributes.

**4. Contact Page (`contact.html`):**
* [ ] Your complete form from Week 4, with every input correctly labeled.
* [ ] Your embedded Google Map from Week 5.

**5. Accessibility Audit (The "Expert" Polish):**
* [ ] Every image has real `alt` text (or `aria-hidden="true"` if purely decorative).
* [ ] Every icon-only social link in your footer has an `aria-label`.
* [ ] Test that you can tab through every page's nav and form in a logical order.
* [ ] Chrome Lighthouse Accessibility score of 90+ on all three pages.

**Bonus Challenge:**
* Add a "Hire Me" button in the header that opens a `<dialog>` modal containing a quick email link.
