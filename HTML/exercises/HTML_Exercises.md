# ✏️ HTML Exercises
### Deejoft Coding School — All 4 Classes

Complete each exercise in a new `.html` file. Validate every file at `validator.w3.org` before marking it done.

---

## Class 1 Exercises — Document Structure & Content

---

### Exercise 1.1 — Write the Skeleton From Memory ⭐

**Without looking at your notes**, create a new file called `skeleton.html` and write a valid HTML5 document.

Requirements:
- All five required lines in `<head>`
- A `<body>` with a single `<h1>` that says your name
- Validate — zero errors

**Acceptance criteria:** You wrote every character yourself. No copy-paste.

---

### Exercise 1.2 — Fix the Broken Document ⭐

The following HTML has **6 deliberate errors**. Find and fix all of them.

```html
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
</head>
<body>

  <h1>Welcome to Deejoft</h1>
  <h3>Our Courses</h3>
  <h2>HTML & CSS</h2>
  
  <a href="https://github.com" target="_blank">GitHub</a>
  
  <img src="./logo.png">

</body>
```

List the errors you found:
1. _______________________________________________________________
2. _______________________________________________________________
3. _______________________________________________________________
4. _______________________________________________________________
5. _______________________________________________________________
6. _______________________________________________________________

---

### Exercise 1.3 — Personal Bio Page ⭐⭐

Build `bio.html` — a personal bio page about yourself (or a fictional person). This is your first full page.

**Requirements:**
- Full valid HTML5 skeleton written from memory
- `<h1>` — your full name
- `<h2>` section: "About Me" — at least 2 `<p>` tags
- `<h2>` section: "What I'm Learning" — a `<ul>` or `<ol>` with at least 4 items
- One `<img>` using this URL: `https://i.pravatar.cc/200` — with meaningful `alt`, `width="200"`, `height="200"`, `loading="lazy"`
- One external link to MDN or GitHub with `rel="noopener noreferrer"`
- One in-page link using `href="#section-id"` that jumps to one of your sections
- Zero validation errors

---

### Exercise 1.4 — Two-Page Site ⭐⭐⭐

Extend Exercise 1.3 into a two-page site.

**Requirements:**
- `index.html` — the bio page from Exercise 1.3
- `portfolio.html` — a portfolio page with:
  - A valid skeleton
  - `<h1>My Portfolio</h1>`
  - Three project entries, each with: project name as `<h2>`, description as `<p>`, a link to GitHub
- A `<nav>` on both pages with links between them using relative paths (`./index.html`, `./portfolio.html`)
- The link to the *current page* should have `aria-current="page"` on it
- Both files validate — zero errors

---

## Class 2 Exercises — Semantic HTML & Tables

---

### Exercise 2.1 — The Article Test ⭐

For each content block below, decide: `<article>` or `<section>`? Write your reasoning.

1. A customer review on an e-commerce site
   → _____________ because _____________________________________

2. A "How It Works" section of a landing page
   → _____________ because _____________________________________

3. A job posting on a careers board
   → _____________ because _____________________________________

4. A chapter in an online tutorial document
   → _____________ because _____________________________________

5. A single tweet embedded in an article
   → _____________ because _____________________________________

---

### Exercise 2.2 — Semantic Refactor ⭐⭐

Rewrite this div-heavy HTML using correct semantic elements. Do not change the visible content — only the tags.

```html
<div class="header">
  <div class="logo">Deejoft</div>
  <div class="nav">
    <a href="/">Home</a>
    <a href="/courses">Courses</a>
    <a href="/contact">Contact</a>
  </div>
</div>

<div class="main">
  <div class="posts">
    <h2>Latest Articles</h2>

    <div class="post">
      <div class="post-header">
        <h3>Learning HTML in 2025</h3>
        <div class="post-date">June 15, 2025</div>
      </div>
      <div class="post-body">
        <p>HTML5 has powerful new elements that make the web more accessible...</p>
      </div>
      <a href="/posts/html-2025">Read more</a>
    </div>

    <div class="post">
      <div class="post-header">
        <h3>Why CSS Grid Changed Everything</h3>
        <div class="post-date">May 28, 2025</div>
      </div>
      <div class="post-body">
        <p>Before Grid, layout required complex hacks. Now, with two lines of CSS...</p>
      </div>
      <a href="/posts/css-grid">Read more</a>
    </div>

  </div>

  <div class="sidebar">
    <h2>About This Blog</h2>
    <p>Weekly articles from the Deejoft instructors.</p>
  </div>
</div>

<div class="footer">
  <p>© 2025 Deejoft Coding School</p>
</div>
```

---

### Exercise 2.3 — Build a Data Table ⭐⭐

Create `schedule.html` with a timetable for the Deejoft course schedule.

**Requirements:**
- `<table>` with a meaningful `<caption>`
- `<thead>` with column headers: Day, Time, Course, Instructor
- `<tbody>` with at least 5 rows of data (invent realistic data)
- `<tfoot>` with a row showing: "Total: 5 classes per week" spanning all columns
- `scope="col"` on all column headers
- At least one `<td>` that uses `colspan`
- All dates in a `<time>` element with `datetime` attribute
- Validate — zero errors

---

### Exercise 2.4 — Full Semantic Page ⭐⭐⭐

Build `blog.html` — a complete blog listing page using only semantic HTML.

**Requirements:**
- Full production skeleton
- `<header>` with logo (`<img>`) and `<nav>` with `aria-label="Primary navigation"` and `aria-current="page"` on the active link
- `<main>` with:
  - A `<section aria-labelledby="...">` containing 3 `<article>` elements
  - Each `<article>` has a `<header>` with `<h3>`, author name, and `<time datetime="...">` date
  - Each `<article>` has a `<p>` excerpt and a "Read more" link
  - One article uses a `<figure>` with `<figcaption>`
- An `<aside>` with a categories list
- A `<details>` + `<summary>` FAQ block
- `<footer>` with a secondary `<nav>` (privacy, terms) and copyright `<small>` text
- Validate — zero errors

---

## Class 3 Exercises — Forms

---

### Exercise 3.1 — Fix the Inaccessible Form ⭐

Find and fix all accessibility errors in this form:

```html
<form>
  <input type="text" placeholder="Your name">
  <input type="text" placeholder="Your email">
  
  <select>
    <option>HTML</option>
    <option>JavaScript</option>
    <option>React</option>
  </select>

  <input type="radio" name="level" value="beginner"> Beginner
  <input type="radio" name="level" value="intermediate"> Intermediate

  <textarea placeholder="Your message"></textarea>

  <button>Send</button>
</form>
```

List every problem you found and how you fixed it:
1. _______________________________________________________________
2. _______________________________________________________________
3. _______________________________________________________________
4. _______________________________________________________________
5. _______________________________________________________________

---

### Exercise 3.2 — Build a Contact Form ⭐⭐

Create `contact.html` with a fully accessible contact form.

**Requirements:**
- `<form action="/contact" method="POST">`
- Two `<fieldset>` groups: "Your Details" and "Your Message"
- "Your Details" fieldset:
  - Full name: `type="text"`, `required`, `autocomplete="name"`, `minlength="2"`
  - Email: `type="email"`, `required`, `autocomplete="email"`
  - Phone: `type="tel"`, `autocomplete="tel"` (optional — no `required`)
- "Your Message" fieldset:
  - Subject: `type="text"`, `required`, `maxlength="100"`
  - Message: `<textarea>`, `required`, `rows="6"`, `maxlength="1000"`
  - How did you hear about us: 3 checkboxes (Instagram, Twitter, Referral)
- Required fields marked with `*` (`aria-hidden="true"`) + note explaining the asterisk
- `<button type="submit">` and `<button type="reset">`
- Validate — zero errors

---

### Exercise 3.3 — Job Application Form ⭐⭐⭐

Build a complete, multi-section job application form at `apply.html`.

**Requirements:**
- `<form action="/apply" method="POST" novalidate>`
- **Section 1: Personal Information**
  - Full name, email, phone, LinkedIn URL (`type="url"`)
  - Date of birth (`type="date"`, `max="2007-12-31"`)
  - Location (`type="text"`, `autocomplete="address-level2"`)
- **Section 2: Role Preferences**
  - Position applied for: `<select>` with at least 3 positions using `<optgroup>`
  - Start date (`type="date"`, `min="[today's date]"`)
  - Availability: radio group (Full Time / Part Time / Contract) — in `<fieldset>` + `<legend>`
  - Expected salary: `type="number"`, `min="0"`, `step="1000"`
- **Section 3: Experience**
  - Years of experience: `type="range"`, `min="0"`, `max="20"`, with `<datalist>` labels at 0, 5, 10, 15, 20
  - Skills: at least 5 checkboxes (HTML, CSS, JS, React, Python)
  - Cover letter: `<textarea>`, `rows="8"`, `maxlength="2000"`, `required`
- Required fields clearly marked and a note explaining the `*` symbol
- Submit and Reset buttons
- Validate — zero errors

---

## Class 4 Exercises — Media, ARIA & Production HTML

---

### Exercise 4.1 — Upgrade an Image ⭐

Take this basic `<img>` tag and upgrade it to a full `<picture>` element:

```html
<img src="./images/hero.jpg" alt="A developer at a laptop">
```

Your `<picture>` must include:
- An AVIF `<source>` with `srcset` at 400w, 800w, 1200w
- A WebP `<source>` with the same widths
- The original JPEG as the `<img>` fallback
- `sizes` attribute with three breakpoints
- `fetchpriority="high"` (this is the above-the-fold hero image)

---

### Exercise 4.2 — ARIA Audit ⭐⭐

Review this code and add all missing ARIA attributes:

```html
<nav>
  <a href="/">Home</a>
  <a href="/courses">Courses</a>
  <a href="/blog">Blog</a>
  <!-- /blog is the current page -->
</nav>

<button>
  <svg><!-- hamburger menu icon --></svg>
</button>
<!-- The above button opens a mobile menu (#mobile-nav) -->
<ul id="mobile-nav" hidden>
  <li><a href="/">Home</a></li>
</ul>

<div id="newsletter-status"></div>
<!-- The above div gets updated by JS after form submission -->

<label for="email-input">Email</label>
<input type="email" id="email-input">
<p id="email-hint">We'll never share your email address.</p>
<!-- The hint should be programmatically associated with the input -->
```

List every ARIA change you made and why:
1. _______________________________________________________________
2. _______________________________________________________________
3. _______________________________________________________________
4. _______________________________________________________________

---

### Exercise 4.3 — Production `<head>` ⭐⭐

Write a complete, production-quality `<head>` for a page with the following information:

- **Page:** A blog article about "Learning React in 2025"
- **Site name:** Deejoft Coding School
- **URL:** `https://deejoft.com/blog/learning-react-2025`
- **Description:** "A practical guide to getting started with React 19, written by Deejoft's lead React instructor."
- **OG image:** `https://deejoft.com/og/react-2025.png`
- **Twitter handle:** `@deejoftschool`
- **Favicon:** SVG at `/favicon.svg`, PNG at `/favicon-32.png`
- **Font:** Inter from Google Fonts (weights 400 and 700)
- **Stylesheet:** `./css/blog.css`

---

### Exercise 4.4 — Final Portfolio Page ⭐⭐⭐

This is your final HTML project. Build `index.html` — a portfolio homepage.

**Requirements:**

| Feature | Requirement |
|---------|-------------|
| `<head>` | Full production head: charset, viewport, title, description, OG tags (type, url, title, description, image), Twitter card, favicon (SVG + PNG), font link, stylesheet link |
| Navigation | `<header>` + `<nav>` with `aria-label`, `aria-current="page"` on active link |
| Hero | `<section>` with your name, tagline, and a `<picture>` hero image (AVIF + WebP + JPEG, `fetchpriority="high"`) |
| Projects | `<section>` containing 3 `<article>` elements — each with project name, description, `<figure>` + `<figcaption>` screenshot, and a GitHub link |
| Skills | `<section>` with a table of skills: category, skill name, level — with `<caption>`, `<thead>`, `scope` |
| About | `<section>` with bio, embedded `<video>` or `<iframe>` with `title` |
| Contact | `<section>` with a full form (name, email, message — all labelled), submit button |
| Dialog | `<dialog id="thanks-modal">` shown after "submitting" (can be triggered by the submit button's onclick) |
| Footer | `<footer>` with `<address>` and secondary `<nav>` |
| Accessibility | All images have `alt`, all inputs have labels, one icon button with `aria-label` |
| Validation | Zero W3C errors at `validator.w3.org` |

---

*Deejoft Coding School | HTML Exercises | Validate every file before submitting*
