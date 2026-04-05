# ✅ HTML Exercises — Solutions
### Deejoft Coding School | Tutor Reference Only

---

## Class 1 Solutions

---

### Exercise 1.1 Solution — The Skeleton

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ada Lovelace</title>
    <meta name="description" content="Personal page for Ada Lovelace, developer.">
  </head>
  <body>

    <h1>Ada Lovelace</h1>

  </body>
</html>
```

**What to look for when marking:**
- `<!DOCTYPE html>` — uppercase DOCTYPE, lowercase html ✓
- `lang="en"` on `<html>` ✓
- `charset` before `viewport` ✓
- Non-empty, descriptive `<title>` ✓
- `<meta name="description">` present ✓

---

### Exercise 1.2 Solution — Fix the Broken Document

**The 6 errors:**

1. `<!DOCTYPE HTML>` — `HTML` in uppercase is valid but non-standard. The conventional correct form is `<!DOCTYPE html>` (lowercase). Accept either but explain the convention.

2. `<html>` has no `lang` attribute — should be `<html lang="en">`.

3. `<title></title>` is empty — the title must be non-empty and descriptive.

4. Heading hierarchy is skipped: `<h1>` then `<h3>` then `<h2>`. The correct order must be `<h1>` → `<h2>` → `<h3>` — you cannot skip from `<h1>` to `<h3>`.

5. The external link is missing `rel="noopener noreferrer"` — required with `target="_blank"`.

6. The `<img>` is missing the `alt` attribute entirely — it must always be present (empty string for decorative images, descriptive text for meaningful ones).

**Fixed version:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Deejoft Coding School</title>
  <meta name="description" content="Learn modern web development at Deejoft.">
</head>
<body>

  <h1>Welcome to Deejoft</h1>
  <h2>Our Courses</h2>
  <h3>HTML & CSS</h3>

  <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>

  <img src="./logo.png" alt="Deejoft Coding School logo" width="200" height="60">

</body>
</html>
```

---

### Exercise 1.3 Solution — Personal Bio Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ada Lovelace — Developer & Student</title>
  <meta name="description" content="Bio page for Ada Lovelace, student at Deejoft Coding School.">
</head>
<body>

  <h1>Ada Lovelace</h1>

  <img
    src="https://i.pravatar.cc/200"
    alt="Profile photo of Ada Lovelace"
    width="200"
    height="200"
    loading="lazy"
  >

  <h2 id="about">About Me</h2>
  <p>
    I am a software engineering student at Deejoft Coding School in Lagos, Nigeria.
    I am passionate about building tools that solve real-world problems.
  </p>
  <p>
    Before joining Deejoft, I worked as a graphic designer for three years.
    I decided to transition into development after realising how much impact
    software has on the businesses I was designing for.
  </p>

  <h2 id="learning">What I'm Learning</h2>
  <ul>
    <li>HTML5 — semantic structure and accessibility</li>
    <li>CSS — modern layout with Flexbox and Grid</li>
    <li>JavaScript — interactive web applications</li>
    <li>React — component-based UI development</li>
  </ul>

  <p>
    <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
      MDN Web Docs — my go-to reference
    </a>
  </p>

  <p>
    <a href="#learning">Jump to What I'm Learning</a>
  </p>

</body>
</html>
```

**Marking checklist:**
- Skeleton from memory (no copy-paste) — tutor to verify by asking student to write it again
- `<h1>` used once ✓
- Two `<h2>` sections each with `id` for in-page link target ✓
- Two or more `<p>` tags in "About Me" ✓
- `<ul>` with 4+ `<li>` items ✓
- `<img>` with `alt`, `width="200"`, `height="200"`, `loading="lazy"` ✓
- External link with `rel="noopener noreferrer"` and `target="_blank"` ✓
- In-page `href="#learning"` link pointing to the `id` of a section ✓
- Zero validation errors ✓

---

### Exercise 1.4 Solution — Two-Page Site

**`index.html` (abbreviated — full bio from 1.3 + nav):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ada Lovelace — Home</title>
  <meta name="description" content="Ada Lovelace's personal website.">
</head>
<body>

  <nav>
    <a href="./index.html" aria-current="page">Home</a>
    <a href="./portfolio.html">Portfolio</a>
  </nav>

  <h1>Ada Lovelace</h1>
  <!-- ... rest of bio page ... -->

</body>
</html>
```

**`portfolio.html`:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio — Ada Lovelace</title>
  <meta name="description" content="Ada Lovelace's software development projects.">
</head>
<body>

  <nav>
    <a href="./index.html">Home</a>
    <a href="./portfolio.html" aria-current="page">Portfolio</a>
  </nav>

  <h1>My Portfolio</h1>

  <h2>HTML & CSS Landing Page</h2>
  <p>A fully responsive landing page built with semantic HTML5 and modern CSS Grid.</p>
  <a href="https://github.com/ada/html-landing" target="_blank" rel="noopener noreferrer">View on GitHub</a>

  <h2>JavaScript Quiz App</h2>
  <p>An interactive quiz app with 20 JavaScript questions, a timer, and score tracking.</p>
  <a href="https://github.com/ada/js-quiz" target="_blank" rel="noopener noreferrer">View on GitHub</a>

  <h2>React Task Board</h2>
  <p>A drag-and-drop task management board built with React 19 and local storage persistence.</p>
  <a href="https://github.com/ada/react-tasks" target="_blank" rel="noopener noreferrer">View on GitHub</a>

</body>
</html>
```

**Key points to mark:**
- `aria-current="page"` is on `index.html` in `index.html`, and on `portfolio.html` in `portfolio.html` — not the same value in both files ✓
- Relative paths used (`./index.html`, not `/index.html` or absolute URLs) ✓
- Both files validate ✓

---

## Class 2 Solutions

---

### Exercise 2.1 Solution — The Article Test

1. A customer review → **`<article>`** — a review can be copied to a "best reviews" compilation site and still make sense on its own.

2. A "How It Works" section → **`<section>`** — this content only makes sense as part of this specific landing page.

3. A job posting → **`<article>`** — a job listing can be syndicated to Indeed or LinkedIn and still makes complete sense.

4. A chapter in a tutorial → **`<section>`** — Chapter 3 only makes sense if you have read Chapters 1 and 2.

5. A single tweet → **`<article>`** — a tweet is self-contained by definition; it was created independently and can be embedded anywhere.

---

### Exercise 2.2 Solution — Semantic Refactor

```html
<header>
  <span>Deejoft</span>
  <nav aria-label="Primary navigation">
    <a href="/" aria-current="page">Home</a>
    <a href="/courses">Courses</a>
    <a href="/contact">Contact</a>
  </nav>
</header>

<main>
  <section aria-labelledby="articles-heading">
    <h2 id="articles-heading">Latest Articles</h2>

    <article>
      <header>
        <h3>Learning HTML in 2025</h3>
        <p>Published <time datetime="2025-06-15">June 15, 2025</time></p>
      </header>
      <p>HTML5 has powerful new elements that make the web more accessible...</p>
      <a href="/posts/html-2025">Read more</a>
    </article>

    <article>
      <header>
        <h3>Why CSS Grid Changed Everything</h3>
        <p>Published <time datetime="2025-05-28">May 28, 2025</time></p>
      </header>
      <p>Before Grid, layout required complex hacks. Now, with two lines of CSS...</p>
      <a href="/posts/css-grid">Read more</a>
    </article>

  </section>

  <aside aria-label="About this blog">
    <h2>About This Blog</h2>
    <p>Weekly articles from the Deejoft instructors.</p>
  </aside>
</main>

<footer>
  <p><small>© 2025 Deejoft Coding School</small></p>
</footer>
```

**Changes to call out:**
- `<div class="header">` → `<header>`
- `<div class="nav">` → `<nav aria-label="Primary navigation">` with `aria-current="page"` on the active link
- `<div class="main">` → `<main>`
- `<div class="posts">` → `<section aria-labelledby="...">` with the `<h2>` given an `id`
- `<div class="post">` → `<article>` with nested `<header>`
- `<div class="post-date">` → `<time datetime="...">`
- `<div class="sidebar">` → `<aside aria-label="...">`
- `<div class="footer">` → `<footer>` with `<small>` on copyright

---

### Exercise 2.3 Solution — Data Table

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deejoft Course Schedule</title>
  <meta name="description" content="Weekly class schedule for Deejoft Coding School.">
</head>
<body>

  <h1>Course Schedule</h1>

  <table>
    <caption>Deejoft Coding School — Weekly Class Schedule, Q3 2025</caption>
    <thead>
      <tr>
        <th scope="col">Day</th>
        <th scope="col">Time</th>
        <th scope="col">Course</th>
        <th scope="col">Instructor</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Monday</td>
        <td><time datetime="09:00">9:00 AM</time> – <time datetime="12:00">12:00 PM</time></td>
        <td>HTML & CSS</td>
        <td>Instructor Femi</td>
      </tr>
      <tr>
        <td>Tuesday</td>
        <td><time datetime="09:00">9:00 AM</time> – <time datetime="12:00">12:00 PM</time></td>
        <td>JavaScript</td>
        <td>Instructor Ada</td>
      </tr>
      <tr>
        <td>Wednesday</td>
        <td><time datetime="14:00">2:00 PM</time> – <time datetime="17:00">5:00 PM</time></td>
        <td>React</td>
        <td>Instructor Kola</td>
      </tr>
      <tr>
        <td>Thursday</td>
        <td><time datetime="14:00">2:00 PM</time> – <time datetime="17:00">5:00 PM</time></td>
        <td>React Native</td>
        <td>Instructor Ada</td>
      </tr>
      <tr>
        <td>Friday</td>
        <td><time datetime="09:00">9:00 AM</time> – <time datetime="12:00">12:00 PM</time></td>
        <td>Python</td>
        <td>Instructor Emeka</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row" colspan="3">Total scheduled sessions</th>
        <td>5 per week</td>
      </tr>
    </tfoot>
  </table>

</body>
</html>
```

---

## Class 3 Solutions

---

### Exercise 3.1 Solution — Fix the Inaccessible Form

**The problems:**

1. First `<input type="text">` has no `<label>` — screen reader announces "edit text" with no context.
2. Second `<input type="text">` for email should use `type="email"` AND has no `<label>`.
3. `<select>` has no `<label>` connected with `for`/`id`.
4. Radio buttons have no `<fieldset>` + `<legend>` grouping — "Beginner" and "Intermediate" have no context.
5. `<textarea>` has no `<label>`.

**Fixed version:**
```html
<form action="/contact" method="POST">

  <div class="field">
    <label for="contact-name">Your Name</label>
    <input type="text" id="contact-name" name="name" required autocomplete="name">
  </div>

  <div class="field">
    <label for="contact-email">Your Email</label>
    <input type="email" id="contact-email" name="email" required autocomplete="email">
  </div>

  <div class="field">
    <label for="contact-course">Course</label>
    <select id="contact-course" name="course" required>
      <option value="" disabled selected>-- Select a course --</option>
      <option value="html">HTML</option>
      <option value="javascript">JavaScript</option>
      <option value="react">React</option>
    </select>
  </div>

  <fieldset>
    <legend>Your Experience Level</legend>
    <div class="field field--inline">
      <input type="radio" id="level-beginner" name="level" value="beginner">
      <label for="level-beginner">Beginner</label>
    </div>
    <div class="field field--inline">
      <input type="radio" id="level-intermediate" name="level" value="intermediate">
      <label for="level-intermediate">Intermediate</label>
    </div>
  </fieldset>

  <div class="field">
    <label for="contact-message">Your Message</label>
    <textarea id="contact-message" name="message" rows="5" maxlength="1000"></textarea>
  </div>

  <button type="submit">Send</button>
</form>
```

---

### Exercise 3.3 Solution — Job Application Form (Key Sections)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apply — Deejoft Coding School</title>
  <meta name="description" content="Apply for an instructor position at Deejoft Coding School.">
</head>
<body>

<h1>Application Form</h1>
<p>Fields marked <abbr title="required">*</abbr> are required.</p>

<form action="/apply" method="POST" novalidate>

  <!-- Section 1: Personal Information -->
  <fieldset>
    <legend>Personal Information</legend>

    <div class="field">
      <label for="app-name">Full Name <span aria-hidden="true">*</span></label>
      <input type="text" id="app-name" name="full_name"
        autocomplete="name" required minlength="2" maxlength="100">
    </div>

    <div class="field">
      <label for="app-email">Email <span aria-hidden="true">*</span></label>
      <input type="email" id="app-email" name="email"
        autocomplete="email" required>
    </div>

    <div class="field">
      <label for="app-phone">Phone</label>
      <input type="tel" id="app-phone" name="phone" autocomplete="tel">
    </div>

    <div class="field">
      <label for="app-linkedin">LinkedIn Profile URL</label>
      <input type="url" id="app-linkedin" name="linkedin"
        placeholder="https://linkedin.com/in/your-name">
    </div>

    <div class="field">
      <label for="app-dob">Date of Birth</label>
      <input type="date" id="app-dob" name="dob" max="2007-12-31">
    </div>

    <div class="field">
      <label for="app-location">City / Town</label>
      <input type="text" id="app-location" name="location"
        autocomplete="address-level2">
    </div>
  </fieldset>

  <!-- Section 2: Role Preferences -->
  <fieldset>
    <legend>Role Preferences</legend>

    <div class="field">
      <label for="app-role">Position <span aria-hidden="true">*</span></label>
      <select id="app-role" name="role" required>
        <option value="" disabled selected>-- Select a position --</option>
        <optgroup label="Web Development">
          <option value="html-css-instructor">HTML & CSS Instructor</option>
          <option value="js-instructor">JavaScript Instructor</option>
          <option value="react-instructor">React Instructor</option>
        </optgroup>
        <optgroup label="Other">
          <option value="python-instructor">Python Instructor</option>
          <option value="ta">Teaching Assistant</option>
        </optgroup>
      </select>
    </div>

    <div class="field">
      <label for="app-start">Earliest Start Date</label>
      <input type="date" id="app-start" name="start_date" min="2025-07-01">
    </div>

    <fieldset>
      <legend>Availability <span aria-hidden="true">*</span></legend>
      <div class="field field--inline">
        <input type="radio" id="avail-full" name="availability" value="full-time" required>
        <label for="avail-full">Full Time</label>
      </div>
      <div class="field field--inline">
        <input type="radio" id="avail-part" name="availability" value="part-time">
        <label for="avail-part">Part Time</label>
      </div>
      <div class="field field--inline">
        <input type="radio" id="avail-contract" name="availability" value="contract">
        <label for="avail-contract">Contract</label>
      </div>
    </fieldset>

    <div class="field">
      <label for="app-salary">Expected Monthly Salary (₦)</label>
      <input type="number" id="app-salary" name="salary" min="0" step="1000"
        placeholder="300000">
    </div>
  </fieldset>

  <!-- Section 3: Experience -->
  <fieldset>
    <legend>Experience</legend>

    <div class="field">
      <label for="app-exp">Years of Experience</label>
      <input type="range" id="app-exp" name="experience"
        min="0" max="20" step="1" value="0" list="exp-ticks">
      <datalist id="exp-ticks">
        <option value="0"  label="0"></option>
        <option value="5"  label="5"></option>
        <option value="10" label="10"></option>
        <option value="15" label="15"></option>
        <option value="20" label="20+"></option>
      </datalist>
    </div>

    <fieldset>
      <legend>Skills (select all that apply)</legend>
      <div class="field field--inline">
        <input type="checkbox" id="skill-html" name="skills" value="html">
        <label for="skill-html">HTML & CSS</label>
      </div>
      <div class="field field--inline">
        <input type="checkbox" id="skill-js" name="skills" value="javascript">
        <label for="skill-js">JavaScript</label>
      </div>
      <div class="field field--inline">
        <input type="checkbox" id="skill-react" name="skills" value="react">
        <label for="skill-react">React</label>
      </div>
      <div class="field field--inline">
        <input type="checkbox" id="skill-rn" name="skills" value="react-native">
        <label for="skill-rn">React Native</label>
      </div>
      <div class="field field--inline">
        <input type="checkbox" id="skill-python" name="skills" value="python">
        <label for="skill-python">Python</label>
      </div>
    </fieldset>

    <div class="field">
      <label for="app-cover">Cover Letter <span aria-hidden="true">*</span></label>
      <textarea id="app-cover" name="cover_letter"
        rows="8" maxlength="2000" required
        placeholder="Tell us about yourself, your teaching experience, and why you want to join Deejoft..."
      ></textarea>
    </div>
  </fieldset>

  <button type="submit">Submit Application</button>
  <button type="reset">Clear Form</button>

</form>

</body>
</html>
```

---

## Class 4 Solutions

---

### Exercise 4.1 Solution — Picture Element Upgrade

```html
<picture>
  <source
    type="image/avif"
    srcset="
      ./images/hero-400.avif  400w,
      ./images/hero-800.avif  800w,
      ./images/hero-1200.avif 1200w
    "
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 1200px"
  >
  <source
    type="image/webp"
    srcset="
      ./images/hero-400.webp  400w,
      ./images/hero-800.webp  800w,
      ./images/hero-1200.webp 1200w
    "
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 1200px"
  >
  <img
    src="./images/hero.jpg"
    alt="A developer at a laptop"
    width="1200"
    height="600"
    fetchpriority="high"
  >
</picture>
```

---

### Exercise 4.2 Solution — ARIA Audit

```html
<nav aria-label="Primary navigation">
  <!-- Added aria-label to distinguish this nav from any others on the page -->
  <a href="/">Home</a>
  <a href="/courses">Courses</a>
  <a href="/blog" aria-current="page">Blog</a>
  <!-- Added aria-current="page" to the active link -->
</nav>

<button aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation menu">
  <!-- Added: aria-label (icon-only button needs a text name)
              aria-expanded (communicates toggle state)
              aria-controls (identifies which element it controls) -->
  <svg aria-hidden="true" focusable="false"><!-- hamburger menu icon --></svg>
  <!-- Added aria-hidden="true" and focusable="false" to the SVG icon -->
</button>

<ul id="mobile-nav" hidden>
  <li><a href="/">Home</a></li>
</ul>

<div id="newsletter-status" role="status" aria-live="polite"></div>
<!-- Added: role="status" and aria-live="polite"
     This ensures screen readers announce the content when JS updates it -->

<label for="email-input">Email</label>
<input type="email" id="email-input" aria-describedby="email-hint">
<!-- Added aria-describedby="email-hint" to link the hint to the input -->
<p id="email-hint">We'll never share your email address.</p>
```

**Changes made:**
1. Added `aria-label="Primary navigation"` to `<nav>` and `aria-current="page"` on the Blog link
2. Added `aria-label`, `aria-expanded="false"`, `aria-controls` to the toggle button; `aria-hidden` + `focusable="false"` to the SVG
3. Added `role="status"` and `aria-live="polite"` to the status div
4. Added `aria-describedby="email-hint"` to the email input

---

### Exercise 4.3 Solution — Production `<head>`

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Learning React in 2025 | Deejoft Coding School</title>
  <meta name="description" content="A practical guide to getting started with React 19, written by Deejoft's lead React instructor.">
  <link rel="canonical" href="https://deejoft.com/blog/learning-react-2025">

  <meta property="og:type" content="article">
  <meta property="og:url" content="https://deejoft.com/blog/learning-react-2025">
  <meta property="og:title" content="Learning React in 2025 | Deejoft Coding School">
  <meta property="og:description" content="A practical guide to getting started with React 19, written by Deejoft's lead React instructor.">
  <meta property="og:image" content="https://deejoft.com/og/react-2025.png">
  <meta property="og:locale" content="en_NG">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@deejoftschool">
  <meta name="twitter:title" content="Learning React in 2025 | Deejoft Coding School">
  <meta name="twitter:image" content="https://deejoft.com/og/react-2025.png">

  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="./css/blog.css">
</head>
```

**Note for marking:** The `og:type` for a blog article should technically be `"article"` rather than `"website"`. Award full marks for `"website"` too — it is not wrong, just less precise.

---

*Deejoft Coding School | HTML Solutions | Tutor Reference — Do Not Distribute*
