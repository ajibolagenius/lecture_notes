# 📄 HTML Class 1 — Student Handout
### Document Structure & Content Tags
**Deejoft Coding School** | Keep this — you will reference it all course.

---

## A. The Three Layers of the Web

Every website is built from three languages that each have one job:

| Layer | Language | Job | The analogy |
|-------|----------|-----|-------------|
| Structure | **HTML** | What is on the page | The skeleton |
| Presentation | **CSS** | What it looks like | The skin & clothes |
| Behaviour | **JavaScript** | What it does | The muscles & brain |

> ✏️ **Fill in:** In your own words, what is HTML responsible for?
>
> _____________________________________________________________
>
> _____________________________________________________________

---

## B. The HTML Document Skeleton

Every HTML file must start with this exact structure. Memorise it.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title Here</title>
    <meta name="description" content="A short description for search engines.">
  </head>
  <body>

    <!-- Your visible content goes here -->

  </body>
</html>
```

### Why each line matters:

| Line | Without it, what breaks? |
|------|--------------------------|
| `<!DOCTYPE html>` | ✏️ ___________________________________ |
| `<html lang="en">` | Screen readers mispronounce content |
| `<meta charset="UTF-8">` | ✏️ ___________________________________ |
| `<meta name="viewport" ...>` | Mobile shows zoomed-out desktop layout |
| `<title>` | ✏️ ___________________________________ |
| `<meta name="description">` | Google writes its own snippet — usually worse |

---

## C. Heading Hierarchy

HTML has **six** heading levels. Use them like a document outline.

```html
<h1>Page Title — ONE per page only</h1>
  <h2>Major Section</h2>
    <h3>Sub-section within the major section</h3>
      <h4>Sub-sub-section</h4>
```

> ⚠️ **Rule:** Never skip heading levels. Do not jump from `<h2>` to `<h4>`.
>
> ⚠️ **Rule:** Only **one** `<h1>` per page — it is the page's main identifier for Google and screen readers.

> ✏️ **Fill in:** You are building a recipe website. A page is about "Nigerian Street Food". Write what the h1, h2, and h3 headings might be:
>
> `<h1>` _______________________________________________
>
> `<h2>` _______________________________________________
>
> `<h3>` _______________________________________________

---

## D. Links — Annotated Reference

```html
<!-- External link — opens in a new tab safely -->
<a
  href="https://developer.mozilla.org"   ← The destination URL (always HTTPS)
  target="_blank"                         ← Open in new tab
  rel="noopener noreferrer"              ← SECURITY REQUIRED with target="_blank"
>
  MDN Web Docs
</a>

<!-- Internal link — same website, relative path -->
<a href="./about.html">About Us</a>      ← "./" means same folder

<!-- Jump to a section on the same page -->
<a href="#contact">Skip to Contact</a>   ← # + the id of the target element

<!-- Email link -->
<a href="mailto:hello@deejoft.com">Email Us</a>
```

> ⚠️ **Security rule:** Always write `rel="noopener noreferrer"` when using `target="_blank"`. Without it, the linked page can control the tab it was opened from.

> ✏️ **Fill in:** Write an external link to `https://github.com` that opens in a new tab. Include all required security attributes:
>
> ```html
> <a ___________________________________________>GitHub</a>
> ```

---

## E. Images — Annotated Reference

```html
<img
  src="./images/campus.jpg"        ← Path to the image file
  alt="Students at coding workstations in the Deejoft classroom"
  ↑ REQUIRED — describes the image for screen readers and when image fails to load
  width="800"                      ← Always set — prevents layout shift while loading
  height="500"                     ← Always set — same reason
  loading="lazy"                   ← Only load when user scrolls near the image
>
```

### The three `alt` scenarios:

| Situation | What `alt` does |
|-----------|-----------------|
| Screen reader user | Reads the `alt` text aloud |
| Broken image URL | Displays the `alt` text in place of the image |
| Google Images | Uses `alt` to index and rank the image |

### `alt` rules:

| Image type | What to write |
|------------|---------------|
| Meaningful image | A full, descriptive sentence |
| Decorative image (no meaning) | `alt=""` — empty string, NOT missing |
| Image that is already described by nearby text | `alt=""` |

> ✏️ **Fill in:** Write an `<img>` tag for a photo of the Lagos skyline at sunset. Use a placeholder image URL (`https://picsum.photos/800/400`). Include `alt`, `width`, `height`, and `loading`:
>
> ```html
>
>
>
>
>
> ```

---

## F. Paragraphs & Text

```html
<p>A paragraph of text. Browsers collapse all whitespace in your code — 
   line breaks inside the HTML do not create line breaks on the page.</p>

<p>To create a new paragraph, use a new <code>&lt;p&gt;</code> tag.</p>

<!-- For genuinely needed line breaks (addresses, poems) -->
<p>
  14 Tech Hub Crescent<br>
  Lekki, Lagos
</p>
```

> ✏️ **Fill in:** What should you use to create a visual gap between two paragraphs — `<br>` tags or two separate `<p>` tags? Why?
>
> Answer: _________________________________________________________
>
> Because: ________________________________________________________

---

## G. Class 1 Exercise Checklist

Before your next class, check every box:

- [ ] Created `index.html` with the full valid skeleton — **from memory**
- [ ] One `<h1>` with your full name
- [ ] Two `<h2>` sections: "About Me" and "What I'm Learning"
- [ ] At least three `<p>` tags with real content
- [ ] One `<img>` with a meaningful `alt`, `width`, and `height`
- [ ] One external `<a>` link with `rel="noopener noreferrer"`
- [ ] One internal link that uses `#id` to jump to a section
- [ ] Validated at `validator.w3.org` — **zero errors**

---

## ⚡ Quick Reference — Class 1 Tags

| Tag | Purpose | Key Attributes |
|-----|---------|----------------|
| `<!DOCTYPE html>` | Declares HTML5 — must be first | None |
| `<html lang="en">` | Root element | `lang` — page language |
| `<head>` | Metadata container | None |
| `<meta charset="UTF-8">` | Character encoding | `charset` |
| `<meta name="viewport">` | Mobile scaling | `content` |
| `<title>` | Browser tab + Google title | None |
| `<body>` | All visible content | None |
| `<h1>` – `<h6>` | Headings (hierarchy) | None |
| `<p>` | Paragraph | None |
| `<a>` | Hyperlink | `href`, `target`, `rel` |
| `<img>` | Image | `src`, `alt`, `width`, `height`, `loading` |
| `<br>` | Line break (use sparingly) | None |
| `<strong>` | Important text (bold) | None |
| `<em>` | Emphasised text (italic) | None |
| `<code>` | Inline code | None |

---

*Deejoft Coding School | HTML Class 1 | Keep and review before Class 2*
