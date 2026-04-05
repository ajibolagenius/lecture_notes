# 📘 HTML5 Course — Tutor's Master Outline
### Deejoft Coding School | Web Development Track
**Instructor Notes — Beginner to Semantic Expert**

---

> **Dear Tutor,**
> This document is your master guide for the HTML5 course. Before each session, review the relevant module section. The goal is not just to teach tags — it is to build *confident thinkers* who understand **why** HTML is structured the way it is. Always connect every concept back to a real website students can open in their browser.

---

## 🗺️ Course at a Glance

| Week | Focus | Key Deliverable |
|------|-------|-----------------|
| Week 1 | Absolute Fundamentals | Simple Bio Page |
| Week 2 | Structuring Content | Recipe Page |
| Week 3 | Semantic Layout & Tables | Company Homepage (Structure Only) |
| Week 4 | Forms | Registration Form |
| Week 5 | Multimedia & Embedding | Media Showcase Page |
| Week 6 | Accessibility, SEO & Best Practices | Professional Portfolio Website |

**Total Duration:** 6 Weeks · ~3–4 contact hours per week  
**Prerequisites:** None (absolute beginners welcome)  
**Next Course:** CSS (students should complete this before styling anything)

---

## 🎯 Course Philosophy

HTML is the **skeleton** of every website. CSS is the clothes; JavaScript is the brain. Students who skip or rush HTML end up writing brittle, inaccessible code that breaks under pressure. Spend time here. Do it right.

**Three principles to instil from Day 1:**
1. **Semantics first** — Always choose the most meaningful tag, not the most convenient one.
2. **Accessibility always** — The web is for everyone. Screen readers are real users.
3. **Structure before style** — Never touch CSS until the HTML structure is solid.

---

## 📅 Week 1: The Absolute Fundamentals

### Module 1 — Introduction to Web Development

**Tutor Guidance:**
Start by *showing*, not telling. Open a browser, visit a simple website (e.g., `example.com`), right-click → "View Page Source." Let students see the raw HTML. Then open DevTools (`F12`). This builds immediate excitement.

**The "Skeleton, Clothes, Brain" Analogy:**
Draw this on the board (or share your screen with a diagram):

```
HTML  =  Skeleton   → gives the page its structure and bones
CSS   =  Clothes    → makes it look good (colours, fonts, layout)
JS    =  Brain      → makes it interactive and smart
```

Ask: *"If you had to build a house, which comes first — the interior design or the foundation?"* HTML is the foundation.

**Key Concepts to Cover:**

**1. The DOCTYPE Declaration**
```html
<!DOCTYPE html>
```
> **Explain:** This is NOT an HTML tag. It is a *declaration* that tells the browser: "This document follows the HTML5 standard." Without it, older browsers enter "quirks mode" and display things unpredictably. Always put this on line 1.

**2. The Basic HTML Skeleton**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>My name is Ada.</p>
  </body>
</html>
```

Walk through each line:
- `<html lang="en">` — The root element. `lang="en"` helps screen readers and search engines.
- `<head>` — The "backstage" of your page. Nothing in here is visible to users.
- `<meta charset="UTF-8">` — Ensures your page can display characters from any language (emojis, accented letters, etc.).
- `<title>` — What appears on the browser tab and in Google search results.
- `<body>` — Everything the user *sees and interacts with* goes here.

**⚠️ Common Mistake:** Students often write content directly inside `<head>`. Demonstrate what happens: the text disappears. "If you can't see it, it belongs in `<head>`. If you can see it, it belongs in `<body>`."

---

### Module 2 — Core Content Tags

**Tutor Guidance:**
This module builds students' "vocabulary" of HTML. Teach tags in *groups of related purpose* (text tags together, links together, images together). Use real examples — news articles, Wikipedia pages — to show each tag in context.

**Headings — The Document Hierarchy**

```html
<h1>My Blog</h1>            <!-- ONE per page — the main title -->
  <h2>My Latest Posts</h2>  <!-- Major sections -->
    <h3>Post Title</h3>     <!-- Sub-sections -->
      <h4>...</h4>
        <h5>...</h5>
          <h6>...</h6>
```

> **Analogy:** Think of headings like a book. The `<h1>` is the book title. `<h2>`s are chapter names. `<h3>`s are sections within chapters. You would never skip from a book title directly to a sub-section without naming the chapter — the same logic applies here.

> **⚠️ Rule:** There should only be **one `<h1>`** per page. This is both a semantic and an SEO rule.

**Links — The `<a>` Tag**

```html
<!-- Linking to an external website (always use https://) -->
<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
  Visit Google
</a>

<!-- Linking to another page in the same project -->
<a href="/about.html">About Us</a>

<!-- Linking to a section on the same page (using an ID) -->
<a href="#contact-section">Jump to Contact</a>
```

> **Explain `target="_blank"`:** This opens the link in a new tab. Always pair it with `rel="noopener noreferrer"` — this is a *security best practice* that prevents the new tab from being able to control the original tab.

> **Relative vs. Absolute Paths:**
> - **Absolute:** `https://google.com` — the full address, works from anywhere.
> - **Relative:** `about.html` or `./about.html` — relative to the current file's location.

**Images — The `<img>` Tag**

```html
<!-- Self-closing tag — no separate closing tag needed -->
<img 
  src="./images/profile.jpg" 
  alt="A photo of Ada smiling in a blue dress"
  width="300"
  height="300"
>
```

> **The `alt` attribute is NOT optional.** Stress this strongly.
> - Screen readers read `alt` text aloud to visually impaired users.
> - If the image fails to load, `alt` text is shown in its place.
> - Search engines use `alt` text to understand image content.
>
> **Bad `alt` text:** `alt="image"` or `alt="photo1.jpg"`  
> **Good `alt` text:** `alt="A golden retriever puppy sitting on green grass"`

---

### 📝 Week 1 Assignment: Simple Bio Page

**Instructions for Students:**
Create a single `index.html` file that contains:
- A `<h1>` with your full name
- An `<img>` of yourself or a hobby (with meaningful `alt` text)
- At least two `<h2>` sections: "About Me" and "Hobbies"
- `<p>` tags with text under each section
- One `<a>` link to an external website you enjoy

**Tutor Marking Criteria:**
- [ ] Correct `<!DOCTYPE html>` and basic skeleton
- [ ] `<head>` contains `<title>` and `<meta charset>`
- [ ] `<h1>` used exactly once
- [ ] `<img>` has a descriptive `alt` attribute
- [ ] `<a>` tag uses `https://` and opens correctly

---

## 📅 Week 2: Structuring Content

### Module 3 — Lists & Text Formatting

**Tutor Guidance:**
Students find lists intuitive — start here to build confidence. Then move to inline semantics which are trickier (especially the `<strong>` vs. `<b>` distinction).

**Unordered Lists (Bullet Points)**
```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```
Use for: navigation menus, feature lists, ingredient lists, any collection where order doesn't matter.

**Ordered Lists (Numbered)**
```html
<ol>
  <li>Preheat oven to 180°C</li>
  <li>Mix flour and sugar</li>
  <li>Bake for 25 minutes</li>
</ol>
```
Use for: step-by-step instructions, rankings, recipes, tutorials.

**Semantic Inline Tags — The Key Distinction**

| Tag | Meaning | Visual Effect |
|-----|---------|---------------|
| `<strong>` | **Importance** — this text is critically important | Bold |
| `<b>` | Bold — purely visual, no semantic weight | Bold |
| `<em>` | *Emphasis* — stress this word when reading aloud | Italic |
| `<i>` | Italic — for titles, foreign words, technical terms | Italic |

```html
<p>
  <strong>Warning:</strong> Never share your password with anyone.
  The book was called <em>The Great Gatsby</em>.
</p>
```

> **Rule of thumb:** If you're making something bold for *meaning* (like a warning), use `<strong>`. If you're making it bold just for *appearance*, use CSS instead.

**`<div>` vs. `<span>` — The Container Tags**

```html
<!-- div is BLOCK-LEVEL — takes up full width, starts on a new line -->
<div class="card">
  <h2>Card Title</h2>
  <p>Card content goes here.</p>
</div>

<!-- span is INLINE — flows within text, doesn't break the line -->
<p>
  The sky is <span style="color: blue;">bright blue</span> today.
</p>
```

> **Explain:** `<div>` and `<span>` are neutral containers with no semantic meaning. Use them only when no other semantic tag fits. In Week 3, we'll replace many `<div>`s with semantic tags like `<header>`, `<main>`, and `<section>`.

---

### 📝 Week 2 Assignment: Recipe Page

**Instructions for Students:**
Build a recipe page using:
- `<h1>` for the recipe name
- `<img>` of the dish (with `alt` text)
- `<h2>` + `<ul>` for the Ingredients section
- `<h2>` + `<ol>` for the Instructions section
- `<strong>` to highlight at least one important instruction (e.g., "**Do not overmix**")

---

## 📅 Week 3: Semantic Layout & Tables

### Module 4 — Building with Semantic HTML5

**Tutor Guidance:**
This is arguably the most important module in the course. Students often continue using `<div>` for everything ("divitis") unless you clearly show them the problem. Use a real news website in DevTools to show semantic structure in action.

**The "Divitis" Problem:**
```html
<!-- ❌ BAD — What does any of this mean? -->
<div class="top">
  <div class="logo">My Site</div>
  <div class="links">...</div>
</div>
<div class="content">...</div>
<div class="bottom">...</div>

<!-- ✅ GOOD — Self-documenting and accessible -->
<header>
  <h1>My Site</h1>
  <nav>...</nav>
</header>
<main>...</main>
<footer>...</footer>
```

**The Semantic Layout Tags:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Deejoft Blog</title>
</head>
<body>

  <!-- The page header — logo, site title, main navigation -->
  <header>
    <h1>Deejoft Blog</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about.html">About</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- The ONE main content area — use only once per page -->
  <main>

    <!-- A thematic grouping of content — can have many sections -->
    <section id="featured-posts">
      <h2>Featured Posts</h2>

      <!-- A self-contained, distributable piece of content -->
      <article>
        <h3>Getting Started with HTML</h3>
        <p>Published on <time datetime="2025-01-15">January 15, 2025</time></p>
        <p>HTML is the foundation of the web...</p>
      </article>

      <article>
        <h3>Why CSS Grid Changed Everything</h3>
        <p>...</p>
      </article>
    </section>

    <!-- Related content — sidebar, callout, author bio -->
    <aside>
      <h2>About the Author</h2>
      <p>Ada Lovelace is a full-stack developer...</p>
    </aside>

  </main>

  <!-- The page footer — copyright, secondary links -->
  <footer>
    <p>&copy; 2025 Deejoft Coding School. All rights reserved.</p>
  </footer>

</body>
</html>
```

**`<section>` vs. `<article>` — The Key Test:**
> Ask yourself: *"Could I copy this content and paste it somewhere else (another website, an RSS feed, an email) and it would still make complete sense on its own?"*
> - If **YES** → `<article>` (a blog post, a news story, a product card, a comment)
> - If **NO** → `<section>` (a chapter of a page, a group of related things that only make sense in context)

---

### Module 5 — Tables for Data

**Tutor Guidance:**
Tables are *only* for tabular data — grids of information with row and column headers. Emphasize: tables are **never** used for page layout. That mistake was made in the 1990s. We use CSS Grid and Flexbox for layouts now.

**Full Table Structure:**
```html
<table>
  <caption>Student Grades — Term 1</caption>
  <thead>
    <tr>
      <th scope="col">Student Name</th>
      <th scope="col">HTML</th>
      <th scope="col">CSS</th>
      <th scope="col">JavaScript</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ada Lovelace</td>
      <td>95</td>
      <td>88</td>
      <td>92</td>
    </tr>
    <tr>
      <td>Alan Turing</td>
      <td>87</td>
      <td>91</td>
      <td>98</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Class Average</td>
      <td>91</td>
      <td>89.5</td>
      <td>95</td>
    </tr>
  </tfoot>
</table>
```

**Merging Cells:**
```html
<!-- colspan: merge across columns -->
<td colspan="2">This cell spans 2 columns</td>

<!-- rowspan: merge down rows -->
<td rowspan="3">This cell spans 3 rows</td>
```

---

### 📝 Week 3 Assignment: Company Homepage (Structure Only)

**Goal:** Perfect semantic structure. No CSS needed — this is about HTML architecture.
- `<header>` with `<nav>` containing a `<ul>` of links
- `<main>` with:
  - A `<section>` for "About Us"
  - A `<section>` for "Our Services" (with `<article>` tags for each service)
  - A `<table>` showing a pricing plan comparison
- `<aside>` for testimonials
- `<footer>` with copyright

---

## 📅 Week 4: Forms

### Module 6 & 7 — Forms (Basic to Advanced)

**Tutor Guidance:**
Forms are the *most interactive* part of pure HTML. Students are highly engaged here because they can finally see user input. Focus heavily on the `<label>` connection — it is the single most overlooked accessibility feature.

**The Critical Label Connection:**
```html
<!-- ✅ Explicit label — ALWAYS use this method -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" placeholder="you@example.com">

<!-- ❌ Unlabelled input — a screen reader user cannot know what to type here -->
<input type="email" name="email">
```

> **Live Demo:** Open a screen reader (or use the ChromeVox extension). Tab through a form that has labels, then one that doesn't. Students immediately understand why labels matter.

**A Complete Registration Form Example:**
```html
<form action="/register" method="POST">

  <fieldset>
    <legend>Account Details</legend>
    
    <label for="full-name">Full Name</label>
    <input 
      type="text" 
      id="full-name" 
      name="full-name" 
      placeholder="Ada Lovelace" 
      required 
      minlength="2"
    >
    
    <label for="email">Email Address</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      placeholder="ada@example.com" 
      required
    >
    
    <label for="password">Password</label>
    <input 
      type="password" 
      id="password" 
      name="password" 
      minlength="8" 
      required
    >
  </fieldset>

  <fieldset>
    <legend>Preferences</legend>
    
    <p>Preferred Contact Method:</p>
    <input type="radio" id="contact-email" name="contact" value="email">
    <label for="contact-email">Email</label>
    
    <input type="radio" id="contact-phone" name="contact" value="phone">
    <label for="contact-phone">Phone</label>
    
    <label for="experience">Experience Level</label>
    <select id="experience" name="experience">
      <option value="">-- Please choose --</option>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="expert">Expert</option>
    </select>
    
    <input type="checkbox" id="newsletter" name="newsletter" value="yes">
    <label for="newsletter">Subscribe to newsletter</label>
  </fieldset>

  <label for="bio">Tell us about yourself</label>
  <textarea id="bio" name="bio" rows="4" cols="40"></textarea>

  <button type="submit">Create Account</button>
</form>
```

---

## 📅 Week 5: Multimedia & Embedding

### Module 8 & 9 — Audio, Video, iframes & Responsive Images

**Tutor Guidance:**
Use this week to show students how "rich" modern HTML is. Many students think you need JavaScript for video players — demonstrate that HTML5 native elements handle a lot.

**Embedding Video:**
```html
<video 
  src="./videos/intro.mp4" 
  poster="./images/video-thumbnail.jpg"
  controls 
  width="640" 
  height="360"
>
  <!-- Fallback for browsers that don't support video -->
  <p>Your browser doesn't support video. 
     <a href="./videos/intro.mp4">Download it instead</a>.
  </p>
</video>
```

> **`autoplay` Warning:** Never use `autoplay` without `muted`. Browsers block autoplay with sound by default (to protect users). Always write `autoplay muted` together if you need it.

**Embedding Audio:**
```html
<audio controls>
  <source src="./audio/song.mp3" type="audio/mpeg">
  <source src="./audio/song.ogg" type="audio/ogg">
  <p>Your browser doesn't support audio.</p>
</audio>
```

**Responsive Images with `<picture>`:**
```html
<!-- Art Direction: Show a different image crop on mobile vs desktop -->
<picture>
  <source media="(max-width: 768px)" srcset="./images/banner-mobile.jpg">
  <source media="(min-width: 769px)" srcset="./images/banner-desktop.jpg">
  <img src="./images/banner-desktop.jpg" alt="Students coding at Deejoft School">
</picture>
```

> **Explain:** The browser picks the first `<source>` whose `media` condition is true, then loads that image. The final `<img>` is always required as a fallback — it's also what gets the `alt` text.

---

## 📅 Week 6: Accessibility & SEO

### Module 10 & 11 — Accessibility, ARIA & Modern HTML

**Tutor Guidance:**
Frame accessibility not as a "nice to have" extra but as a professional standard. Many countries have legal requirements for web accessibility (WCAG guidelines). Developers who understand accessibility are more hireable.

**ARIA Labels:**
```html
<!-- ❌ Bad: User sees "X" but has no idea what it closes -->
<button>X</button>

<!-- ✅ Good: Screen reader announces "Close dialog" -->
<button aria-label="Close dialog">X</button>

<!-- ✅ Good: Decorative icon hidden from screen readers -->
<button>
  <svg aria-hidden="true" ...></svg>
  Save Changes
</button>
```

**SEO & Open Graph Meta Tags:**
```html
<head>
  <meta charset="UTF-8">
  <title>Ada Lovelace | Full-Stack Developer</title>
  
  <!-- SEO: Description shown in Google search results -->
  <meta name="description" content="Ada Lovelace is a full-stack developer specialising in React and Python, based in Lagos.">
  
  <!-- Open Graph: How the page looks when shared on social media -->
  <meta property="og:title" content="Ada Lovelace | Portfolio">
  <meta property="og:description" content="Full-stack developer. View my projects.">
  <meta property="og:image" content="https://adalovelace.dev/og-image.jpg">
  <meta property="og:url" content="https://adalovelace.dev">
</head>
```

---

### 🏆 Final Project: Professional Portfolio Website

**Requirements:**
Three-page site: `index.html`, `about.html`, `contact.html`

**Evaluation Rubric:**

| Criterion | Points |
|-----------|--------|
| Correct semantic structure on all pages (`header`, `nav`, `main`, `footer`) | 20 |
| Navigation links all 3 pages correctly | 10 |
| Homepage has `section` + `article` elements | 15 |
| About page uses `video` or `audio` + `aside` | 15 |
| Contact page has fully accessible form with `label`s and `fieldset`s | 20 |
| All images have meaningful `alt` text | 10 |
| Each page has unique `title` and `meta description` | 10 |
| **Total** | **100** |

---

## 📚 Recommended Resources

- **MDN Web Docs:** [developer.mozilla.org](https://developer.mozilla.org) — the definitive HTML reference
- **HTML Validator:** [validator.w3.org](https://validator.w3.org) — validate student work before marking
- **WebAIM:** [webaim.org](https://webaim.org) — accessibility checker and resources
- **Can I Use:** [caniuse.com](https://caniuse.com) — browser support for HTML features

---

*Deejoft Coding School — Instructor Materials | HTML5 Track*  
*Last Updated: 2025*
