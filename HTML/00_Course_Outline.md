# 📘 HTML5 — Tutor's Master Outline
### Deejoft Coding School | Web Development Track
**Duration:** 2 Weeks · 4 Classes · ~2 hours per class
**Level:** Absolute Beginner

---

> **Dear Tutor,**
> HTML is taught in two focused weeks. The goal is not exhaustive tag memorisation — it is to wire in three instincts that will serve students for their entire career: write *meaningful* structure, keep *accessibility* in mind from the first line, and always think about *document hierarchy* before touching a keyboard. Every exercise in this course should be done in the browser with DevTools open.

---

## 🗺️ Course Map

| Class | Title | Core Skill Unlocked |
|-------|-------|---------------------|
| Class 1 | Document Structure & Content | Build a valid, well-structured HTML page from memory |
| Class 2 | Semantic HTML & Data | Replace every `<div>` with the right tag; build accessible tables |
| Class 3 | Forms & Interactive Controls | Build a fully labelled, validated, accessible form |
| Class 4 | Media, Accessibility & Modern HTML | Embed media responsively; audit a page with a screen reader |

**Prerequisites:** None  
**Tools:** VS Code + Live Server extension, Google Chrome + DevTools  
**Next Course:** CSS (starts immediately after)

---

## 🎯 Three Instincts to Build

Write these on the board on Day 1. Come back to them every class.

```
1. MEANING BEFORE APPEARANCE  →  Choose the tag that describes what the content IS,
                                  not what you want it to look like.

2. STRUCTURE BEFORE STYLE     →  Perfect HTML first. CSS comes in the next course.

3. EVERY USER MATTERS         →  If a screen reader user or search engine can't
                                  understand your page, your HTML is wrong.
```

---

## 📅 Class 1 — Document Structure & Content Tags

**Duration:** ~2 hours  
**Objective:** Students can write a valid HTML5 page from a blank file, with correct document structure, headings, paragraphs, links, and images.

---

### Part A — How the Web Works (20 min)

**Tutor Guidance:** Open `example.com` → right-click → View Page Source. Let the class read it raw for 60 seconds. Then open DevTools (`F12`). This moment — seeing that a real website is "just text" — is the hook. Use it.

**The Three-Layer Model:**
```
HTML  ──▶  Structure   "What is on the page?"         The skeleton
CSS   ──▶  Presentation "What does it look like?"     The skin & clothes
JS    ──▶  Behaviour    "What does it do?"             The muscles & brain
```

> This course is **only** the skeleton. Resist adding `style=""` attributes for visual results — it builds a bad habit that CSS class will have to undo.

---

### Part B — The HTML Document (30 min)

**The Minimal Valid HTML5 Page:**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deejoft | Home</title>
    <meta name="description" content="Learn to code at Deejoft Coding School in Lagos.">
  </head>
  <body>

    <h1>Hello, World.</h1>

  </body>
</html>
```

Walk through every line. No line is optional. No line is "just boilerplate" — each has a specific job:

| Line | What It Does | What Breaks Without It |
|------|-------------|------------------------|
| `<!DOCTYPE html>` | Tells the browser: use modern HTML5 standards | Browser enters "quirks mode" — layout behaves unpredictably |
| `<html lang="en">` | Declares the page language | Screen readers use wrong pronunciation; SEO penalty |
| `<meta charset="UTF-8">` | Enables all Unicode characters | Accented letters, emojis, and Arabic/Yoruba text break |
| `<meta name="viewport" ...>` | Makes the page respect the device width | Page appears zoomed-out and tiny on mobile |
| `<title>` | Sets the browser tab and Google result title | Tab shows blank or file path; SEO penalty |
| `<meta name="description">` | Sets the Google search snippet | Google writes its own — often worse |

---

### Part C — Content Tags (45 min)

**Headings — The Document Outline:**
```html
<h1>Deejoft Coding School</h1>        <!-- ONE per page. The page's main title. -->
  <h2>Our Courses</h2>                <!-- Major sections -->
    <h3>Web Development Track</h3>    <!-- Sub-sections within a major section -->
      <h4>HTML & CSS Fundamentals</h4>
```

> **The newspaper analogy:** `<h1>` is the front-page headline. `<h2>` is a section headline. `<h3>` is an article sub-heading. You would never have a sub-heading without a section headline above it. The same rule applies in HTML — never skip levels.

> ⚠️ **One `<h1>` per page.** This is both an SEO and accessibility rule. Screen readers and Google use it as the page's primary identifier.

**Links:**
```html
<!-- External link — always HTTPS, always opens in new tab for external sites -->
<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
  MDN Web Docs
</a>

<!-- Internal link — relative path, no leading slash for same directory -->
<a href="about.html">About Us</a>
<a href="./courses/html.html">HTML Course</a>

<!-- Jump to a section on the same page — the href matches an element's id -->
<a href="#contact">Skip to Contact</a>
...
<section id="contact">...</section>

<!-- Email link -->
<a href="mailto:hello@deejoft.com">Email Us</a>
```

> **`rel="noopener noreferrer"` is a security requirement** when using `target="_blank"`. Without it, the new tab can access and manipulate the original tab via `window.opener`. Always write these two attributes together.

**Images:**
```html
<!-- Basic image — src and alt are always required -->
<img
  src="./images/campus.jpg"
  alt="Students coding at laptops in the Deejoft open classroom"
  width="800"
  height="500"
  loading="lazy"
>
```

> **`alt` is not optional.** Run through these three scenarios every time a student writes an `<img>`:
> 1. **Screen reader:** reads the `alt` text aloud. An empty or useless `alt` fails blind users.
> 2. **Broken image:** `alt` text is shown in its place. Users still understand what was there.
> 3. **Search engine:** Google Images ranks images by their `alt` text. "photo.jpg" wins nothing.
>
> **Decorative images** (purely visual, no meaning) get an empty `alt=""` — this tells screen readers to skip them entirely. Do NOT leave `alt` out entirely.

> **`width` and `height` attributes** prevent Cumulative Layout Shift (CLS) — a Core Web Vital metric Google uses for ranking. Always set them.

---

### ✏️ Class 1 Exercise — Personal Bio Page (40 min)

Build `index.html` from scratch without copying code. Must include:
- Full valid HTML5 skeleton (from memory by the end)
- `<h1>` with full name
- Two `<h2>` sections: "About Me" and "What I'm Learning"
- At least three `<p>` tags with real text
- One `<img>` with a meaningful `alt` attribute
- One external `<a>` link and one internal link to an `about.html`

**Marking Focus:** Does the file validate at `validator.w3.org`? Zero errors = full marks.

---

## 📅 Class 2 — Semantic HTML & Structured Data

**Duration:** ~2 hours  
**Objective:** Students can build a complete page layout using semantic HTML5 elements and structure tabular data correctly.

---

### Part A — The "Divitis" Problem (25 min)

**Show this side-by-side on the projector:**

```html
<!-- ❌ MEANINGLESS — What is any of this? Robots and screen readers are lost. -->
<div class="top-thing">
  <div class="logo-area">Deejoft</div>
  <div class="link-area">
    <div class="link">Home</div>
    <div class="link">Courses</div>
  </div>
</div>
<div class="big-content">
  <div class="writing-box">
    <div class="writing-title">Welcome</div>
    <div class="writing-body">We teach modern coding.</div>
  </div>
</div>
<div class="bottom-thing">© 2025 Deejoft</div>
```

```html
<!-- ✅ MEANINGFUL — Self-documenting. Accessible. SEO-friendly. -->
<header>
  <span>Deejoft</span>
  <nav>
    <a href="/">Home</a>
    <a href="/courses">Courses</a>
  </nav>
</header>
<main>
  <article>
    <h1>Welcome</h1>
    <p>We teach modern coding.</p>
  </article>
</main>
<footer>
  <p>© 2025 Deejoft</p>
</footer>
```

> **Key insight:** Both render identically in the browser without CSS. The difference is invisible to the human eye but enormous to screen readers, search engines, and your future teammates reading your code.

---

### Part B — The Semantic Layout Elements (40 min)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deejoft Blog</title>
</head>
<body>

  <header>
    <!-- The page header: site identity + primary navigation -->
    <a href="/" aria-label="Deejoft home page">
      <img src="./logo.svg" alt="Deejoft Coding School logo" width="120" height="40">
    </a>
    <nav aria-label="Primary navigation">
      <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/courses">Courses</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <!-- main wraps the page's unique content. One per page. Never in a sidebar. -->

    <section aria-labelledby="featured-heading">
      <!-- section: a thematic group. Only use it if you would give it a heading. -->
      <h2 id="featured-heading">Featured Articles</h2>

      <article>
        <!-- article: self-contained content that makes sense if lifted out of the page.
             Blog posts, news stories, product cards, forum comments — all articles. -->
        <header>
          <!-- <header> can also appear inside article/section, not just the page -->
          <h3>Getting Started with React in 2025</h3>
          <p>By <a href="/author/ada">Ada Lovelace</a> ·
             <time datetime="2025-06-15">June 15, 2025</time>
          </p>
        </header>
        <p>React 19 introduced Actions and the <code>use()</code> hook, making
           async state management cleaner than ever before...</p>
        <a href="/blog/react-2025">Read full article →</a>
      </article>

      <article>
        <header>
          <h3>Python 3.13 — What's New</h3>
          <p>By <a href="/author/alan">Alan Turing</a> ·
             <time datetime="2025-05-28">May 28, 2025</time>
          </p>
        </header>
        <p>The new free-threaded mode and improved REPL make Python 3.13
           the most developer-friendly release yet...</p>
        <a href="/blog/python-313">Read full article →</a>
      </article>
    </section>

    <aside aria-label="About this blog">
      <!-- aside: supplementary content related to the main content.
           Sidebars, author bios, pull quotes, related links.
           NOT for decorative panels unrelated to the content. -->
      <h2>About This Blog</h2>
      <p>Weekly articles on HTML, CSS, JavaScript, React, and Python
         from the instructors at Deejoft Coding School.</p>
    </aside>

  </main>

  <footer>
    <nav aria-label="Footer navigation">
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Use</a>
    </nav>
    <p><small>© 2025 Deejoft Coding School. All rights reserved.</small></p>
  </footer>

</body>
</html>
```

**The `<section>` vs. `<article>` test:**
> Ask: *"If I copied this content to a different website, would it still make complete sense?"*
> - YES → `<article>` (a blog post, a product listing, a tweet, a comment)
> - NO → `<section>` (a chapter of *this* page that only makes sense in context)

**Other semantic elements worth knowing:**

```html
<figure>
  <!-- Self-contained content referenced from the main text: diagrams, charts, photos -->
  <img src="./js-event-loop.png" alt="Diagram of the JavaScript event loop">
  <figcaption>Fig. 1 — The JavaScript event loop. Call stack on the left, task queue on the right.</figcaption>
</figure>

<details>
  <!-- Native disclosure widget — no JavaScript needed -->
  <summary>What is the prerequisite for the JavaScript course?</summary>
  <p>You should have completed our HTML and CSS courses, or have equivalent experience.</p>
</details>

<dialog id="enrolment-modal">
  <!-- Native modal/dialog element — part of HTML5, widely supported since 2022 -->
  <h2>Enrol Today</h2>
  <p>Get started for ₦49,999/month.</p>
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>
<button onclick="document.getElementById('enrolment-modal').showModal()">
  Enrol Now
</button>

<address>
  <!-- Contact information for the nearest <article> or <body> -->
  <p>Deejoft Coding School</p>
  <p>14 Tech Hub Crescent, Lekki, Lagos</p>
  <a href="tel:+2348012345678">+234 801 234 5678</a>
</address>
```

---

### Part C — Tables for Tabular Data (30 min)

> **Rule before code:** Tables are for data that has rows AND columns. They are never used for page layout. Not in 2025.

```html
<table>
  <caption>Deejoft Course Schedule — Q3 2025</caption>

  <thead>
    <tr>
      <th scope="col">Course</th>
      <th scope="col">Duration</th>
      <th scope="col">Start Date</th>
      <th scope="col">Tuition (₦)</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>HTML & CSS</td>
      <td>2 Weeks</td>
      <td><time datetime="2025-07-07">7 July 2025</time></td>
      <td>49,999</td>
    </tr>
    <tr>
      <td>JavaScript</td>
      <td>4 Weeks</td>
      <td><time datetime="2025-07-21">21 July 2025</time></td>
      <td>79,999</td>
    </tr>
    <tr>
      <td>React</td>
      <td>4 Weeks</td>
      <td><time datetime="2025-08-18">18 August 2025</time></td>
      <td>89,999</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <th scope="row" colspan="3">Full Track (Bundle)</th>
      <td>189,999</td>
    </tr>
  </tfoot>
</table>
```

> `scope="col"` and `scope="row"` on `<th>` elements tell screen readers which data the header applies to. Without these, a screen reader user hearing a data cell has no way of knowing which column or row it belongs to.

---

### ✏️ Class 2 Exercise — Semantic Refactor (30 min)

Given a `<div>`-heavy starter file, students refactor it to use correct semantic HTML5 elements. Bonus: add a data table (e.g., a pricing table or timetable).

---

## 📅 Class 3 — Forms & Interactive Controls

**Duration:** ~2 hours  
**Objective:** Students can build a complete, accessible, validated form using modern HTML5 form elements and attributes.

---

### Part A — Why Forms Are an Accessibility Battleground (15 min)

> Demonstrate live: open a form with no `<label>` tags using the ChromeVox screen reader extension (or Tab through it). Students cannot tell what any field is for. Then demonstrate the same form with correct labels. The difference is stark.

The two rules that matter most:
1. **Every input must have a visible, programmatically linked `<label>`.**
2. **Use the right `type` attribute** — it gives mobile users the right keyboard and gives browsers the right validation rules for free.

---

### Part B — Form Anatomy (50 min)

```html
<form
  action="/enrol"
  method="POST"
  novalidate
>
  <!-- novalidate lets us style validation ourselves with CSS/JS, but
       HTML5 built-in validation attributes still work as an API -->

  <!-- ── FIELDSET 1: Personal Details ── -->
  <fieldset>
    <legend>Personal Details</legend>

    <div class="field">
      <label for="full-name">Full Name <span aria-hidden="true">*</span></label>
      <input
        type="text"
        id="full-name"
        name="full_name"
        autocomplete="name"
        placeholder="Ada Lovelace"
        required
        minlength="2"
        maxlength="100"
        aria-describedby="name-hint"
      >
      <span id="name-hint" class="field-hint">Enter your name as it appears on your ID.</span>
    </div>

    <div class="field">
      <label for="email">Email Address <span aria-hidden="true">*</span></label>
      <input
        type="email"
        id="email"
        name="email"
        autocomplete="email"
        placeholder="ada@example.com"
        required
      >
    </div>

    <div class="field">
      <label for="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        autocomplete="tel"
        placeholder="+234 800 000 0000"
      >
    </div>

    <div class="field">
      <label for="dob">Date of Birth</label>
      <input
        type="date"
        id="dob"
        name="dob"
        min="1940-01-01"
        max="2010-12-31"
      >
    </div>
  </fieldset>


  <!-- ── FIELDSET 2: Course Preferences ── -->
  <fieldset>
    <legend>Course Preferences</legend>

    <!-- Select dropdown -->
    <div class="field">
      <label for="course">Choose a Starting Course</label>
      <select id="course" name="course" required>
        <option value="" disabled selected>-- Select a course --</option>
        <optgroup label="Web Development">
          <option value="html-css">HTML & CSS</option>
          <option value="javascript">JavaScript</option>
          <option value="react">React</option>
        </optgroup>
        <optgroup label="Mobile Development">
          <option value="react-native">React Native</option>
        </optgroup>
        <optgroup label="Backend">
          <option value="python">Python</option>
        </optgroup>
      </select>
    </div>

    <!-- Radio buttons — grouped by shared name -->
    <fieldset>
      <legend>Preferred Schedule</legend>
      <div class="field field--inline">
        <input type="radio" id="schedule-morning" name="schedule" value="morning" checked>
        <label for="schedule-morning">Weekday Mornings (9am–12pm)</label>
      </div>
      <div class="field field--inline">
        <input type="radio" id="schedule-evening" name="schedule" value="evening">
        <label for="schedule-evening">Weekday Evenings (6pm–9pm)</label>
      </div>
      <div class="field field--inline">
        <input type="radio" id="schedule-weekend" name="schedule" value="weekend">
        <label for="schedule-weekend">Weekends (10am–4pm)</label>
      </div>
    </fieldset>

    <!-- Checkboxes -->
    <fieldset>
      <legend>How did you hear about us?</legend>
      <div class="field field--inline">
        <input type="checkbox" id="source-twitter" name="source" value="twitter">
        <label for="source-twitter">X / Twitter</label>
      </div>
      <div class="field field--inline">
        <input type="checkbox" id="source-instagram" name="source" value="instagram">
        <label for="source-instagram">Instagram</label>
      </div>
      <div class="field field--inline">
        <input type="checkbox" id="source-referral" name="source" value="referral">
        <label for="source-referral">Friend / Colleague Referral</label>
      </div>
    </fieldset>
  </fieldset>


  <!-- ── FIELDSET 3: Additional Info ── -->
  <fieldset>
    <legend>A Little More</legend>

    <div class="field">
      <label for="experience">Current Coding Experience Level</label>
      <input
        type="range"
        id="experience"
        name="experience"
        min="0"
        max="4"
        step="1"
        value="0"
        list="experience-labels"
      >
      <datalist id="experience-labels">
        <option value="0" label="None"></option>
        <option value="1" label="Beginner"></option>
        <option value="2" label="Some"></option>
        <option value="3" label="Intermediate"></option>
        <option value="4" label="Advanced"></option>
      </datalist>
    </div>

    <div class="field">
      <label for="goals">What do you hope to build?</label>
      <textarea
        id="goals"
        name="goals"
        rows="4"
        placeholder="I want to build a mobile app that helps..."
        maxlength="500"
      ></textarea>
    </div>
  </fieldset>

  <!-- Submission -->
  <p class="form-note">
    Fields marked <abbr title="required">*</abbr> are required.
  </p>

  <button type="submit">Submit Enrolment</button>
  <button type="reset">Clear Form</button>

</form>
```

**Modern `type` attribute values and why they matter on mobile:**

| `type=` | Mobile keyboard shown | Built-in validation |
|---------|----------------------|---------------------|
| `text` | Standard keyboard | None |
| `email` | Keyboard with `@` key prominent | Must contain `@` and domain |
| `tel` | Number pad | None (phone formats vary too much) |
| `number` | Number pad with decimal | Must be a number, respects `min`/`max`/`step` |
| `url` | Keyboard with `.com` button | Must start with `http://` or `https://` |
| `date` | Native date picker | Must be a valid date |
| `password` | Standard, input masked | None |
| `search` | Standard, with clear button | None |

---

### ✏️ Class 3 Exercise — Enrolment Form (30 min)

Students rebuild the above form from scratch, without reference to the notes — using only MDN docs if needed. Focus on the `for`/`id` connection being correct on every field.

---

## 📅 Class 4 — Media, Accessibility & Production HTML

**Duration:** ~2 hours  
**Objective:** Students can embed responsive media, audit a page with a screen reader, add comprehensive meta tags, and understand the `<dialog>` and `<template>` elements.

---

### Part A — Responsive & Modern Media Embedding (35 min)

**`<picture>` — Art Direction and Format Selection:**
```html
<!--
  The browser reads <source> elements top to bottom and picks
  the FIRST one it supports. The <img> is always the final fallback
  and is the one that carries the alt text.
-->
<picture>
  <!-- Modern format: AVIF — smallest file size, best quality -->
  <source
    type="image/avif"
    srcset="
      ./images/hero-400.avif  400w,
      ./images/hero-800.avif  800w,
      ./images/hero-1200.avif 1200w
    "
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
  >
  <!-- Fallback format: WebP — widely supported, good compression -->
  <source
    type="image/webp"
    srcset="
      ./images/hero-400.webp  400w,
      ./images/hero-800.webp  800w,
      ./images/hero-1200.webp 1200w
    "
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
  >
  <!-- Final fallback: JPEG — works everywhere -->
  <img
    src="./images/hero-800.jpg"
    alt="Students collaborating at a coding workstation at Deejoft"
    width="1200"
    height="600"
    fetchpriority="high"
  >
</picture>
```

**`<video>` — Self-hosted Video:**
```html
<video
  poster="./videos/intro-poster.webp"
  controls
  preload="metadata"
  width="854"
  height="480"
>
  <source src="./videos/intro.webm" type="video/webm">
  <source src="./videos/intro.mp4" type="video/mp4">
  <track
    kind="subtitles"
    src="./captions/intro.en.vtt"
    srclang="en"
    label="English"
    default
  >
  <p>
    Your browser doesn't support HTML video.
    <a href="./videos/intro.mp4">Download the video</a> instead.
  </p>
</video>
```

> **`<track>` for captions is an accessibility requirement**, not optional. Deaf users, non-native speakers, and anyone watching in a noisy environment depend on it. The file format is WebVTT (`.vtt`) — a plain text format students can write by hand.

**Embedding Third-Party Content with `<iframe>`:**
```html
<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="Introduction to Deejoft Coding School — YouTube video"
  width="560"
  height="315"
  loading="lazy"
  allowfullscreen
  referrerpolicy="strict-origin-when-cross-origin"
></iframe>
```

> `title` on an `<iframe>` is required for accessibility — screen readers announce it to tell users what the embedded content is.

---

### Part B — ARIA & Accessibility (30 min)

**The ARIA First Principle:**
> Use the correct native HTML element first. ARIA should only fill gaps where no native element exists.
```html
<!-- ❌ Do not do this — reinventing a button with ARIA -->
<div role="button" tabindex="0" onclick="doSomething()">Click me</div>

<!-- ✅ Do this — the native element already has all the ARIA built in -->
<button onclick="doSomething()">Click me</button>
```

**When ARIA IS necessary:**
```html
<!-- aria-label: give an element a text name that isn't visible on screen -->
<!-- Use for icon-only buttons, where the visual icon is the only label -->
<button aria-label="Close newsletter modal">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>

<!-- aria-describedby: link extra descriptions to an input -->
<label for="password">Password</label>
<input
  type="password"
  id="password"
  aria-describedby="password-rules"
  required
>
<ul id="password-rules">
  <li>At least 8 characters</li>
  <li>At least one uppercase letter</li>
  <li>At least one number</li>
</ul>

<!-- aria-live: announce dynamic content changes to screen readers -->
<!-- Use for: error messages, notifications, cart updates, search results -->
<div role="status" aria-live="polite" id="search-status">
  <!-- JS will update this text; screen readers will announce it automatically -->
</div>

<!-- aria-expanded: tell screen readers if a toggle (menu, accordion) is open -->
<button aria-expanded="false" aria-controls="nav-menu" id="nav-toggle">
  Menu
</button>
<ul id="nav-menu" hidden>
  <li><a href="/">Home</a></li>
</ul>
```

---

### Part C — Complete `<head>` for Production (20 min)

```html
<head>
  <!-- ── Character & Viewport ── -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- ── Identity ── -->
  <title>HTML & CSS Course | Deejoft Coding School</title>
  <meta name="description" content="Learn modern HTML5 and CSS in 2 intensive weeks at Deejoft Coding School, Lagos. Small classes, real projects, job-ready skills.">
  <link rel="canonical" href="https://deejoft.com/courses/html-css">

  <!-- ── Open Graph (Facebook, LinkedIn, WhatsApp previews) ── -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://deejoft.com/courses/html-css">
  <meta property="og:title" content="HTML & CSS Course | Deejoft Coding School">
  <meta property="og:description" content="Learn modern HTML5 and CSS in 2 intensive weeks.">
  <meta property="og:image" content="https://deejoft.com/og/html-css.png">
  <meta property="og:locale" content="en_NG">

  <!-- ── Twitter / X Card ── -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@deejoftschool">
  <meta name="twitter:title" content="HTML & CSS Course | Deejoft Coding School">
  <meta name="twitter:image" content="https://deejoft.com/og/html-css.png">

  <!-- ── Favicon (Modern Setup) ── -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <!-- ── Fonts ── -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

  <!-- ── Stylesheet ── -->
  <link rel="stylesheet" href="./css/main.css">
</head>
```

---

### 🏆 Class 4 & Final Project — Portfolio Home Page

Build a single `index.html` that consolidates everything from all four classes.

**Requirements:**

| Feature | Must Include |
|---------|-------------|
| Document structure | Full valid `<head>` with all meta tags, OG tags, and favicon links |
| Semantic layout | `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` |
| Content | `<article>` for a featured project, `<section>` for skills, `<figure>` for a screenshot |
| Media | `<picture>` with AVIF/WebP/JPEG sources; `<video>` or embedded YouTube with `<iframe>` |
| Form | A working contact form with `<fieldset>`, `<label>`, `<input>`, `<select>`, `<textarea>` |
| Accessibility | All images have `alt`, all inputs have `<label>`, one `aria-label` on an icon button |
| Native dialog | `<dialog>` used as a "Thank You" confirmation modal |
| Table | A skills or timeline table with `<caption>`, `<thead>`, `<tbody>`, `scope` attributes |
| Validation | Zero errors at `validator.w3.org` |

**Rubric:**

| Criterion | Points |
|-----------|--------|
| Zero W3C validation errors | 20 |
| Correct semantic structure (no layout `<div>`s where a semantic tag exists) | 20 |
| Fully accessible form (every input labelled) | 20 |
| Correct `<picture>` responsive image setup | 15 |
| Complete production `<head>` (OG, favicon, description) | 15 |
| `<dialog>` element used correctly | 10 |
| **Total** | **100** |

---

## 📚 Essential References

| Resource | URL | Use For |
|----------|-----|---------|
| MDN HTML Reference | `developer.mozilla.org/en-US/docs/Web/HTML` | Looking up any element or attribute |
| W3C Validator | `validator.w3.org` | Validating every assignment before submission |
| Can I Use | `caniuse.com` | Checking browser support before using a new element |
| WebAIM Screen Reader | `webaim.org/articles/nvda` | Accessibility testing guide |
| a11y Project Checklist | `a11yproject.com/checklist` | Pre-submission accessibility audit |

---

*Deejoft Coding School — Instructor Materials | HTML5 Track*
*Rebuilt 2025 — Based on HTML Living Standard & WHATWG spec*
