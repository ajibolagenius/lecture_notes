# 📄 HTML Class 4 — Student Handout
### Media, Accessibility & Production HTML
**Deejoft Coding School** | This handout includes the full HTML Quick Reference at the end.

---

## A. Responsive Images — `<picture>` & `srcset`

Why one image file is not enough:
- A 2400px wide image sent to a 375px phone wastes data and slows page load
- Modern browsers support AVIF and WebP — smaller files, better quality than JPEG
- The `<picture>` element solves both: right format **and** right size

```html
<picture>
  <!--  Browser reads <source> elements top to bottom.
        Picks the FIRST one it supports.
        Falls back to <img> if nothing matches.  -->

  <source
    type="image/avif"                   ←  AVIF first — best compression (2024 standard)
    srcset="
      ./images/hero-400.avif  400w,     ←  File + its actual width (w = width descriptor)
      ./images/hero-800.avif  800w,
      ./images/hero-1200.avif 1200w
    "
    sizes="
      (max-width: 600px) 100vw,         ←  On screens ≤600px: image is 100% of viewport width
      (max-width: 1200px) 50vw,         ←  On screens ≤1200px: image is 50% of viewport
      800px                             ←  Otherwise: image is 800px wide
    "
  >

  <source
    type="image/webp"                   ←  WebP second — great support, good compression
    srcset="
      ./images/hero-400.webp  400w,
      ./images/hero-800.webp  800w,
      ./images/hero-1200.webp 1200w
    "
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
  >

  <img
    src="./images/hero-800.jpg"         ←  JPEG fallback — always required
    alt="Students at coding workstations in the Deejoft lab"
    width="1200"
    height="600"
    fetchpriority="high"                ←  First above-the-fold image: load immediately
  >

</picture>

<!--  All other images: use loading="lazy" instead of fetchpriority="high"  -->
<img src="./images/card.jpg" alt="..." width="400" height="300" loading="lazy">
```

> ✏️ **Fill in:** What is the difference between `fetchpriority="high"` and `loading="lazy"`?
>
> `fetchpriority="high"`: ___________________________________________
>
> `loading="lazy"`: ________________________________________________

> ✏️ **Fill in:** The `<img>` inside `<picture>` is necessary even if you have `<source>` elements. Why?
>
> _________________________________________________________________

---

## B. Video & Captions

```html
<video
  poster="./videos/poster.webp"   ←  Image shown before play. Always include it.
  controls                         ←  Show browser play/pause/volume controls
  preload="metadata"               ←  Load only metadata (duration, size) — not full video
  width="854"
  height="480"
>
  <source src="./videos/intro.webm" type="video/webm">  ←  WebM first (smaller)
  <source src="./videos/intro.mp4" type="video/mp4">    ←  MP4 fallback (universal)

  <track
    kind="subtitles"               ←  'subtitles' | 'captions' | 'descriptions' | 'chapters'
    src="./captions/intro.en.vtt"  ←  WebVTT caption file
    srclang="en"
    label="English"
    default                        ←  This track is on by default
  >

  <p>
    Your browser doesn't support HTML video.
    <a href="./videos/intro.mp4">Download the video</a> instead.
  </p>
</video>
```

> ⚠️ **Accessibility requirement:** Every video must have a `<track>` for captions. It is not optional.

### WebVTT Caption File Format

```
WEBVTT

00:00:01.000 --> 00:00:04.000
Welcome to Deejoft Coding School.

00:00:05.000 --> 00:00:09.000
Today we'll learn HTML5 from the beginning.
```

> ✏️ **Fill in:** What file extension does a WebVTT caption file use?
>
> Extension: ______________

---

## C. Embedding with `<iframe>`

```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Introduction to Deejoft Coding School — YouTube video"
  ↑ REQUIRED for accessibility — screen readers announce this
  width="560"
  height="315"
  loading="lazy"                        ←  Defer loading until user scrolls near it
  allowfullscreen
  referrerpolicy="strict-origin-when-cross-origin"
></iframe>
```

---

## D. ARIA Essentials

**ARIA = Accessible Rich Internet Applications**

> **The First Rule of ARIA:** Use the correct native HTML element first. Only use ARIA when no native element exists for what you need.

```html
<!-- 1. aria-label — visible text name for an element -->
<!--    Use for icon-only buttons that have no visible text  -->
<button aria-label="Close modal">
  <svg aria-hidden="true" focusable="false"><!-- icon --></svg>
  <!--    aria-hidden="true" on the icon — screen reader skips it   -->
</button>

<!-- 2. aria-describedby — link hint/error text to an input -->
<label for="password">Password</label>
<input type="password" id="password" aria-describedby="pw-rules">
<ul id="pw-rules">
  <li>At least 8 characters</li>
  <li>One uppercase letter</li>
</ul>
<!--  Screen reader: "Password. At least 8 characters. One uppercase letter."  -->

<!-- 3. aria-live — announce dynamic content changes -->
<div role="status" aria-live="polite" id="form-feedback">
  <!-- JS updates this text; screen readers announce the change automatically -->
</div>

<!-- 4. aria-expanded — state of a toggle button (menu, accordion) -->
<button aria-expanded="false" aria-controls="menu" id="menu-btn">Menu</button>
<ul id="menu" hidden>...</ul>
<!--  JavaScript changes aria-expanded to "true" when the menu opens  -->

<!-- 5. aria-current — marks the current item in a set -->
<nav>
  <a href="/" aria-current="page">Home</a>
  <a href="/courses">Courses</a>
</nav>
```

> ✏️ **Fill in:** You have an icon button showing a heart icon (for "like"). There is no visible text. What attribute do you add to tell screen readers what the button does?
>
> Add __________________ to the `<button>` with the value ____________________

> ✏️ **Fill in:** What does `aria-hidden="true"` do to an element?
>
> _________________________________________________________________

---

## E. Production `<head>` Reference

```html
<head>
  <!-- Core — never omit these two -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Identity & SEO -->
  <title>Page Title | Site Name</title>
  <meta name="description" content="155-character description for search engines.">
  <link rel="canonical" href="https://yoursite.com/this-page">

  <!-- Open Graph — controls WhatsApp/LinkedIn/Facebook preview cards -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yoursite.com/this-page">
  <meta property="og:title" content="Same as <title>">
  <meta property="og:description" content="Same as meta description">
  <meta property="og:image" content="https://yoursite.com/og/preview.png">

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Same as <title>">
  <meta name="twitter:image" content="https://yoursite.com/og/preview.png">

  <!-- Favicon — modern setup -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">

  <!-- Stylesheet — always last -->
  <link rel="stylesheet" href="./css/main.css">
</head>
```

> ✏️ **Fill in:** Which meta tags control the preview card that appears when someone shares your page on WhatsApp?
>
> The __________________ tags (prefix: `og:`)

---

## F. Final Project Checklist

- [ ] Full production `<head>` — charset, viewport, title, description, OG tags, favicon links
- [ ] Semantic layout: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- [ ] `<article>` for a project, `<section>` for skills, `<figure>` for a screenshot
- [ ] `<picture>` with at least AVIF + WebP + JPEG `<source>` elements
- [ ] `<video>` or `<iframe>` embed with `title` / `<track>`
- [ ] Contact form with `<fieldset>`, all inputs labelled, `required` on mandatory fields
- [ ] Icon button with `aria-label`
- [ ] `<dialog>` used as a "Thank You" modal
- [ ] Data table with `<caption>`, `<thead>`, `scope` on all `<th>`
- [ ] Zero W3C validation errors at `validator.w3.org`

---

## ⚡ HTML Master Quick Reference

### Document Structure

| Tag | Purpose |
|-----|---------|
| `<!DOCTYPE html>` | Declare HTML5. Always first. |
| `<html lang="en">` | Root. `lang` is required. |
| `<head>` | Metadata — not visible to user. |
| `<body>` | All visible content. |
| `<title>` | Browser tab + Google title. |
| `<meta charset="UTF-8">` | Enable all Unicode characters. |
| `<meta name="viewport">` | Fix mobile scaling. |
| `<link rel="stylesheet">` | Link an external CSS file. |

### Text & Headings

| Tag | Purpose |
|-----|---------|
| `<h1>` – `<h6>` | Headings. `<h1>` once per page. Never skip levels. |
| `<p>` | Paragraph. |
| `<strong>` | Important text (bold meaning). |
| `<em>` | Emphasised text (italic meaning). |
| `<code>` | Inline code snippet. |
| `<pre>` | Preformatted / multiline code. |
| `<br>` | Line break (use sparingly). |
| `<abbr title="">` | Abbreviation with expanded form. |
| `<small>` | Fine print, copyright, footnotes. |
| `<time datetime="">` | Date/time with machine-readable value. |
| `<mark>` | Highlighted / relevant text. |

### Links & Media

| Tag | Key Attributes |
|-----|---------------|
| `<a>` | `href`, `target="_blank"`, `rel="noopener noreferrer"` |
| `<img>` | `src`, `alt` (always), `width`, `height`, `loading` |
| `<picture>` | Container for responsive images |
| `<source>` | Alternate image/video resource |
| `<video>` | `controls`, `poster`, `preload` |
| `<track>` | Captions/subtitles for video |
| `<iframe>` | `src`, `title` (required), `loading="lazy"` |
| `<figure>` | Self-contained media block |
| `<figcaption>` | Caption for `<figure>` |

### Semantic Layout

| Tag | Use When |
|-----|---------|
| `<header>` | Introductory content for page or section |
| `<nav>` | Primary navigation links |
| `<main>` | Unique page content — ONE per page |
| `<section>` | Thematic group with a heading |
| `<article>` | Self-contained — passes the "copy elsewhere" test |
| `<aside>` | Supplementary / sidebar content |
| `<footer>` | Closing / copyright content |
| `<address>` | Contact information |

### Forms

| Tag / Attribute | Purpose |
|----------------|---------|
| `<form action method>` | Form container |
| `<fieldset>` + `<legend>` | Group and name related inputs |
| `<label for="id">` | Connects to input. Always required. |
| `<input type>` | See type reference above |
| `<select>` | Dropdown. Contains `<option>` and `<optgroup>`. |
| `<textarea>` | Multi-line text. Always set `maxlength`. |
| `<button type="submit">` | Submit the form |
| `name` | What gets sent. Required on all inputs. |
| `required` | Must not be empty |
| `autocomplete` | Helps browser autofill |
| `aria-describedby` | Links hint/error to input |

### ARIA

| Attribute | When to use |
|-----------|-------------|
| `aria-label` | Visible text name for icon buttons / unlabelled elements |
| `aria-labelledby` | Points to an existing element as the label |
| `aria-describedby` | Points to hint or error text |
| `aria-hidden="true"` | Hides from accessibility tree (decorative icons) |
| `aria-live="polite"` | Announce dynamic content changes at next pause |
| `aria-expanded` | State of toggles — `"true"` or `"false"` |
| `aria-current="page"` | Current page in a nav |

### Tables

| Tag | Purpose |
|-----|---------|
| `<table>` | Wrapper |
| `<caption>` | Table title — first child of table |
| `<thead>` / `<tbody>` / `<tfoot>` | Row groups |
| `<tr>` | Row |
| `<th scope="col/row">` | Header cell |
| `<td>` | Data cell |
| `colspan` / `rowspan` | Span multiple columns/rows |

---

*Deejoft Coding School | HTML Class 4 | Full course reference — keep permanently*
