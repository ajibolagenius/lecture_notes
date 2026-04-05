# 📋 HTML Class 4 — Lesson Plan (Tutor Script)
### Media, Accessibility & Production HTML
**Duration:** ~2 hours | **Format:** Live demo + final project launch

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap quiz |
| 0:10 – 0:40 | Responsive images: `<picture>` and `srcset` |
| 0:40 – 1:00 | Video, captions & `<iframe>` |
| 1:00 – 1:20 | ARIA essentials |
| 1:20 – 1:40 | Production `<head>` — OG tags, favicon, SEO |
| 1:40 – 2:00 | Final project briefing + start |

---

## 🛠 Setup (Do Before Students Arrive)
- Browser tab showing a slow-loading page (throttle to "Slow 3G" in DevTools) — for image demo
- A page with a broken `<picture>` fallback to demonstrate format selection
- `metatags.io` tab open for previewing OG tags
- `realfavicongenerator.net` tab open

---

## 🎤 PART A — Recap Quiz (0:00 – 0:10)

**[SAY]:**
> "Quick fire. First hand up gets the point. No looking at notes."

**Ask these questions:**
1. "What is the one rule about `<h1>` tags per page?" → *One per page*
2. "What two attributes must you include with `target='_blank'`?" → *`rel='noopener noreferrer'`*
3. "What does `alt=''` (empty string) tell a screen reader?" → *Skip this image entirely — it is decorative*
4. "What is the difference between `<article>` and `<section>`?" → *Article = self-contained, lifts out; Section = only makes sense in context*
5. "What attribute connects a `<label>` to an `<input>`?" → *`for` on label matches `id` on input*

**[SAY]:**
> "Today is the final HTML class before we move to CSS. We are covering the last 20% that separates a technically valid page from a production-grade page."

---

## 🎤 PART B — Responsive & Modern Images (0:10 – 0:40)

### Why One Image Is Not Enough (10 min)

**[SAY]:**
> "Open DevTools. Go to the Network tab. Throttle to 'Slow 3G'. Reload a page with a large hero image."

**[DO — show the image taking 4–6 seconds to load]**

**[SAY]:**
> "That image was 2.4 megabytes — designed for a desktop monitor. A user on a 375px wide phone downloaded 2.4MB to display an image at 375px. That is a waste of data, a waste of time, and a failure of craft."
>
> "The solution is three things working together: the right **format**, the right **size**, and **loading strategy**."

---

### Image Formats (5 min)

**[WRITE ON BOARD]:**
```
AVIF   → Best compression, best quality. 2024 standard. Not supported in very old browsers.
WebP   → Great compression. Excellent browser support.
JPEG   → Universal fallback. Every browser, every device.
PNG    → For images with transparency. Otherwise use WebP.
SVG    → For logos and icons. Scales infinitely. Text-based.
```

**[SAY]:**
> "The strategy: serve AVIF to browsers that support it. Fall back to WebP. Fall back to JPEG. The `<picture>` element handles this for us automatically."

---

### `<picture>` with Format and Size Selection (15 min)

**[TYPE — build this incrementally]:**

```html
<picture>
```

**[SAY]:**
> "`<picture>` is a container. It does not render anything itself. The browser reads its `<source>` children top to bottom and picks the first one it supports. If nothing matches, it falls back to the `<img>` element inside it."

```html
  <source
    type="image/avif"
    srcset="
      ./images/hero-400.avif  400w,
      ./images/hero-800.avif  800w,
      ./images/hero-1200.avif 1200w
    "
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
  >
```

**[PAUSE — SAY]:**
> "`srcset` is a list of image files and their widths. The `w` suffix means 'this file is this many pixels wide'. The browser uses this list and the current viewport width to decide which file to download."
>
> "`sizes` tells the browser how wide the image will actually appear on screen — because the browser needs to know this BEFORE it downloads the image (before CSS has run). Read it left to right: 'On screens up to 600px wide, this image takes up 100% of the viewport. On screens up to 1200px wide, it takes up 50%. Otherwise, it's 800px.' These values come from your CSS layout."

```html
  <source
    type="image/webp"
    srcset="
      ./images/hero-400.webp  400w,
      ./images/hero-800.webp  800w,
      ./images/hero-1200.webp 1200w
    "
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
  >

  <img
    src="./images/hero-800.jpg"
    alt="Students collaborating at coding workstations in the Deejoft lab"
    width="1200"
    height="600"
    fetchpriority="high"
  >

</picture>
```

**[SAY]:**
> "The `<img>` is the fallback — it must always be there. It is also the element that carries the `alt` text. Note `fetchpriority='high'` on the first, above-the-fold image. This tells the browser: load this immediately. Do not wait. For all other images below the fold, use `loading='lazy'` instead."

**[DEMO in DevTools:]** Show that on a narrow screen, the browser picks the 400w file. On a wide screen, it picks 1200w.

---

## 🎤 PART C — Video & iframes (0:40 – 1:00)

### Self-Hosted Video (10 min)

**[TYPE]:**
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

**[SAY]:**
> "Same pattern as `<picture>` — multiple `<source>` elements, browser picks the first it can play. WebM first (smaller file size), MP4 as the universal fallback."

**[SAY — emphasise]:**
> "`<track>` for captions is an accessibility requirement, not optional. The format is WebVTT — a plain text file. I will show you what it looks like."

**[WRITE a minimal `.vtt` file on screen]:**
```
WEBVTT

00:00:01.000 --> 00:00:04.000
Welcome to Deejoft Coding School.

00:00:05.000 --> 00:00:09.000
Today we're going to learn HTML5 from scratch.
```

**[SAY]:**
> "Timestamp in hours:minutes:seconds.milliseconds format. Arrow. Caption text. Blank line between cues. That is it. Every video you publish should have a captions file."

### Embedding with `<iframe>` (5 min)

**[TYPE]:**
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

**[SAY]:**
> "The `title` attribute on `<iframe>` is required for accessibility. Screen readers announce it when the user reaches the embedded content — 'iframe, Introduction to Deejoft Coding School'. Without it, they hear 'iframe' and nothing else. `loading='lazy'` applies to iframes too — defer loading until the user scrolls to it."

---

## 🎤 PART D — ARIA Essentials (1:00 – 1:20)

**[SAY]:**
> "ARIA stands for Accessible Rich Internet Applications. It is a set of attributes that add semantic meaning where HTML alone falls short. The cardinal rule of ARIA: use it as a last resort. A correct native HTML element is always better than a `<div>` with ARIA."

**[WRITE ON BOARD]:**
```
First choice:  Use the correct native HTML element.
Second choice: Use ARIA to fill the gap.
```

**[TYPE — four examples, explain each]:**

```html
<!-- 1. aria-label — give an element a text name that isn't visible on screen -->
<!-- Use for icon-only buttons where there's no visible text label -->
<button aria-label="Close modal">
  <svg aria-hidden="true" focusable="false"><!-- × icon --></svg>
</button>
```

**[SAY]:**
> "`aria-hidden='true'` on the SVG hides it from the accessibility tree completely — the icon is visual decoration. `aria-label` on the button provides the accessible name. Screen readers announce: 'Close modal, button.'"

```html
<!-- 2. aria-describedby — additional description for an input -->
<label for="password">Password</label>
<input type="password" id="password" aria-describedby="pw-rules" required>
<ul id="pw-rules">
  <li>At least 8 characters</li>
  <li>One uppercase letter</li>
  <li>One number</li>
</ul>
```

**[SAY]:**
> "When a screen reader focuses the password input, it reads the label AND the content of `#pw-rules`. The user hears all three requirements automatically."

```html
<!-- 3. aria-live — announce dynamic content changes -->
<div role="status" aria-live="polite" id="form-feedback">
  <!-- JS will update this: "Form submitted successfully!" or "Error: email invalid" -->
</div>
```

**[SAY]:**
> "`aria-live='polite'` tells screen readers: when this element's content changes, announce it at the next natural pause. `aria-live='assertive'` announces immediately, interrupting whatever the reader is saying — use only for genuine errors or urgent alerts."

```html
<!-- 4. aria-expanded — state of toggle buttons -->
<button
  id="menu-toggle"
  aria-expanded="false"
  aria-controls="nav-menu"
>
  Menu
</button>
<ul id="nav-menu" hidden>
  <li><a href="/">Home</a></li>
</ul>
```

**[SAY]:**
> "When JavaScript toggles the menu open, it also changes `aria-expanded` to `'true'`. Screen readers announce the state change: 'Menu, expanded, button'. This is the information users need to understand that something opened. We will wire this up with JavaScript in the JS course."

---

## 🎤 PART E — Production `<head>` (1:20 – 1:40)

**[SAY]:**
> "The `<head>` is often where quality separates a beginner from a professional. Most students write the minimum. Let me show you what a production-grade `<head>` looks like — and why each line matters."

**[TYPE — build this block by block, explain each group]:**

```html
<head>
  <!-- ── Core ── -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**[PAUSE]:** Already covered — quick review. "These two: non-negotiable. First two lines, every project."

```html
  <!-- ── Identity & SEO ── -->
  <title>HTML & CSS Course | Deejoft Coding School</title>
  <meta name="description" content="Learn modern HTML5 and CSS in 2 intensive weeks in Lagos. Small classes, real projects, job-ready skills.">
  <link rel="canonical" href="https://deejoft.com/courses/html-css">
```

**[SAY]:**
> "`canonical` tells Google: this is the authoritative URL for this content. If your page is accessible via multiple URLs (with/without trailing slash, with query parameters), canonical prevents Google treating them as duplicates."

```html
  <!-- ── Open Graph (social previews) ── -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://deejoft.com/courses/html-css">
  <meta property="og:title" content="HTML & CSS Course | Deejoft Coding School">
  <meta property="og:description" content="Learn modern HTML5 and CSS in 2 intensive weeks.">
  <meta property="og:image" content="https://deejoft.com/og/html-css.png">
  <meta property="og:locale" content="en_NG">
```

**[DEMO — go to `metatags.io` or `opengraph.xyz`. Paste the URL of any major site. Show what the preview card looks like on WhatsApp/Twitter.]**

**[SAY]:**
> "These Open Graph tags control the preview card when someone shares your URL on WhatsApp, LinkedIn, Twitter, or Facebook. Without them, the platform picks random text and image from your page — often something ugly. With them, you control exactly what people see."

```html
  <!-- ── Twitter / X ── -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@deejoftschool">
  <meta name="twitter:title" content="HTML & CSS Course | Deejoft Coding School">
  <meta name="twitter:image" content="https://deejoft.com/og/html-css.png">
```

```html
  <!-- ── Favicon ── -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

**[SAY]:**
> "Modern favicon setup: SVG first (infinitely scalable, supports dark mode), PNG fallback, Apple touch icon for iOS home screen. Generate the PNG variants for free at `realfavicongenerator.net`."

```html
  <!-- ── Stylesheet ── -->
  <link rel="stylesheet" href="./css/main.css">
</head>
```

---

## 🏆 Final Project Briefing (1:40 – 2:00)

**[SAY]:**
> "Your final HTML project is the foundation for everything. When we get to CSS, you will style it. When we get to JavaScript, you will add behaviour to it. Get the HTML right now and the rest of the course builds cleanly on top of it."

**[DISTRIBUTE or show the requirements from the course outline. Walk through each item.]**

**Requirements:**
- Full valid `<head>` with all meta, OG, favicon
- Semantic layout: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- `<article>` for a project, `<section>` for skills, `<figure>` for a screenshot
- `<picture>` with AVIF/WebP/JPEG sources
- `<video>` or `<iframe>` embed
- Fully labelled contact form
- `<dialog>` for a "Thank You" modal
- Data table with `<caption>`, `scope`, `<time>`
- Zero W3C validation errors

**[SAY]:**
> "You have until [next session date]. Your HTML file should validate at zero errors. Bring it to the CSS course — it becomes your CSS project too."

---

## 🔚 Wrap-Up (Last 2 min)

**[SAY]:**
> "You have spent two weeks learning a language that has no runtime errors, no compilation step, and immediate browser feedback. You know structure, semantics, forms, media, and accessibility. That is the foundation that every great web page is built on."
>
> "In the CSS course, we will make it beautiful. In JavaScript, we will make it smart. But nothing works without clean HTML underneath."

---

## 📎 Tutor Notes

**`<picture>` common errors:**
- `<img>` placed before the `<source>` elements (browser stops at `<img>` first)
- `sizes` written as CSS units (`px`, `%`) instead of `vw` — `sizes` uses viewport-relative units
- Forgetting `alt` on the `<img>` — it is still required inside `<picture>`

**ARIA teaching tip:** Don't over-teach ARIA — beginners often add ARIA to correct HTML and accidentally make it worse. The key message is: native elements first, ARIA only when there is no native option.

**If final project feels overwhelming:** Encourage students to build one section at a time. Header first. Validate. Then main. Validate. The validator is the checkpoint.
