# 📋 HTML Class 1 — Lesson Plan (Tutor Script)
### Document Structure & Content Tags
**Duration:** ~2 hours | **Format:** Live coding + guided practice

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:20 | Hook: How the web works |
| 0:20 – 0:50 | The HTML document skeleton |
| 0:50 – 1:35 | Content tags: headings, paragraphs, links, images |
| 1:35 – 2:00 | Guided exercise: Personal Bio Page |

---

## 🛠 Setup (Do Before Students Arrive)
- Projector showing `example.com` in Chrome
- VS Code open with a blank `index.html` file
- Chrome DevTools docked to the right
- Live Server extension installed and ready
- Validator tab open: `validator.w3.org`

---

## 🎤 PART A — How the Web Works (0:00 – 0:20)

### Opening Hook (5 min)

**[SAY]:**
> "Before we write a single line of code, I want to show you something. Look at this website — example.com. Looks simple, right? Now watch this."

**[DO]:** Right-click anywhere on the page → **View Page Source**

**[SAY]:**
> "This is what your browser actually receives from the internet. Text. That's it. Everything you've ever seen on a website — the Facebook feed, Google Maps, YouTube — it all started as text that looks like this. That text is HTML. And by the end of this class, you will be able to read and write it."

**[DO]:** Close source view. Press `F12` to open DevTools.

**[SAY]:**
> "Now look at DevTools. The Elements panel shows the same HTML but in a live, interactive tree. Watch what happens when I click this `<h1>` tag."

**[DO]:** Click the `<h1>` element in DevTools. Show it highlights on the page.

**[SAY]:**
> "I can see it, select it, even edit it right here in the browser. DevTools is your most powerful tool as a web developer. We will use it every single class."

---

### The Three-Layer Model (10 min)

**[SAY]:**
> "Web development has three layers. Write this down — you will hear these words every day for the rest of your career."

**[WRITE ON BOARD]:**
```
HTML  ──▶  Structure     "What is ON the page?"      The skeleton
CSS   ──▶  Presentation  "What does it LOOK like?"   The skin & clothes
JS    ──▶  Behaviour     "What does it DO?"           The muscles & brain
```

**[SAY]:**
> "Today and next class are HTML only. We are building the skeleton. We will not worry about making it beautiful yet — that is CSS. We will not add interactivity — that is JavaScript. Perfect HTML structure first. Everything else builds on top of it."

> "A common mistake beginners make is adding `style` attributes to HTML to make it look nice. Resist that completely. If you write `<h1 style='color: red'>`, you are mixing structure and presentation. We never do that. Structure stays in HTML. Appearance stays in CSS. Clean separation."

---

### Anticipated Question: "Why does it matter which tags I use if it looks the same?"

**[SAY]:**
> "Great question — and I want you to ask this every time you're tempted to use a `<div>` instead of a semantic tag. Two reasons. First: screen readers — software that blind users depend on — read the tag names aloud. A `<nav>` tag tells a screen reader 'this is navigation.' A `<div>` tells it nothing. Second: Google reads your tags when indexing your site. An `<h1>` tells Google 'this is the main topic of this page.' A `<div class='big-text'>` tells Google nothing. Meaning matters."

---

## 🎤 PART B — The HTML Document Skeleton (0:20 – 0:50)

### Live Coding: Build the Skeleton from Scratch (20 min)

**[SAY]:**
> "Open VS Code. Create a new file. Save it as `index.html` on your Desktop or in a new folder called `deejoft-html`. Now watch me type this — do not copy-paste. Type every character."

**[TYPE — pause after each line to explain]:**

```html
<!DOCTYPE html>
```

**[SAY]:**
> "Line one. This is NOT a tag — it is a declaration. It tells the browser: use modern HTML5 rules. Without it, browsers enter what's called 'quirks mode' — they try to guess the HTML version and often get it wrong. Your layouts will break in strange ways. Always start with this."

```html
<html lang="en">
```

**[SAY]:**
> "The root element. Everything else goes inside it. `lang='en'` is important — screen readers use it to determine pronunciation. If you are building a Yoruba language site, you write `lang='yo'`. If you forget it, screen readers may read Nigerian text with an American accent. That's an accessibility failure."

```html
  <head>
    <meta charset="UTF-8">
```

**[SAY]:**
> "The `<head>` is invisible to the user — it contains metadata, instructions for the browser. `charset='UTF-8'` is the character encoding. UTF-8 supports every character in the world: emojis, Arabic script, Yoruba characters with tonal marks — all of it. Without this, those characters show as garbled symbols."

```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**[SAY]:**
> "This one line is why mobile websites work. Without it, your page renders at desktop width and then gets zoomed out on a phone — everything tiny and unreadable. This tells the browser: use the device's actual screen width. Type it on every project, every time."

```html
    <title>Deejoft | Home</title>
    <meta name="description" content="Learn to code at Deejoft Coding School in Lagos.">
  </head>
```

**[SAY]:**
> "The `<title>` appears in the browser tab and in Google search results. Make it descriptive. `description` is what Google shows under your link in search results. If you leave it out, Google writes its own — and it's usually worse."

```html
  <body>

    <h1>Hello, World.</h1>

  </body>
</html>
```

**[SAY]:**
> "The `<body>` is everything the user sees and interacts with. For now, just this one heading. Save the file — Ctrl+S. Now right-click the file in VS Code's Explorer panel and click 'Open with Live Server'. Your first web page."

**[DO]:** Open with Live Server. Show it in the browser.

---

### The Document Table — Line by Line (10 min)

**[SAY]:**
> "I want you to understand why each line exists — not just that it does. Open your handout and look at the table in Section B. Let's go through each row."

**[GO THROUGH TOGETHER]:**

| Line | Without it, what breaks? |
|------|--------------------------|
| `<!DOCTYPE html>` | Browser guesses HTML version — layout bugs |
| `<html lang="en">` | Screen readers mispronounce content |
| `<meta charset="UTF-8">` | Non-ASCII characters show as `â€™` or worse |
| `<meta name="viewport">` | Mobile shows zoomed-out desktop layout |
| `<title>` | Browser tab shows file path. Google penalises missing titles. |
| `<meta name="description">` | Google writes its own snippet — usually less relevant |

---

## 🎤 PART C — Content Tags (0:50 – 1:35)

### Headings (10 min)

**[SAY]:**
> "HTML has six heading levels. Think of them like a newspaper. The front-page headline is `<h1>` — big, bold, one per page. Section headlines are `<h2>`. Article sub-headings are `<h3>`. You never skip levels — you would not put an article sub-heading on a page that has no section headline."

**[TYPE — in the `<body>`]:**
```html
<h1>Deejoft Coding School</h1>
  <h2>Our Courses</h2>
    <h3>Web Development Track</h3>
      <h4>HTML & CSS Fundamentals</h4>
    <h3>Python Track</h3>
  <h2>About Us</h2>
    <h3>Our Story</h3>
```

**[SAY]:**
> "Notice how I indented these. The indentation mirrors the hierarchy — it is not required by the browser, but it helps you see the structure at a glance. Now, a critical rule: one `<h1>` per page. It is the page's main topic. Screen readers and Google use it as the primary identifier. Two `<h1>` tags confuse both."

---

### Paragraphs & Text (5 min)

**[TYPE]:**
```html
<p>Welcome to Deejoft Coding School. We teach modern web development, 
mobile apps, and Python programming in intensive, hands-on courses 
based in Lagos, Nigeria.</p>

<p>Our instructors are active developers with real industry experience. 
Every course produces a working project you can add to your portfolio.</p>
```

**[SAY]:**
> "Browsers collapse all whitespace — multiple spaces, line breaks in your code — into a single space. The only way to create a paragraph break is with a `<p>` tag. Never use `<br>` to fake spacing between paragraphs. `<br>` is for line breaks within content that genuinely needs them — like an address or a poem."

---

### Links (15 min)

**[TYPE]:**
```html
<!-- External link -->
<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
  MDN Web Docs
</a>
```

**[SAY]:**
> "The `<a>` tag creates a hyperlink. `href` is the destination — stands for Hypertext Reference. `target='_blank'` opens in a new tab. Now — these two attributes — `rel='noopener noreferrer'` — are a **security requirement** whenever you use `target='_blank'`. Without them, the page you are linking to can access and control the tab it was opened from using `window.opener`. Write them together every single time: `target='_blank' rel='noopener noreferrer'`."

**[TYPE]:**
```html
<!-- Internal link — relative path -->
<a href="./about.html">About Us</a>

<!-- Jump to a section on the same page -->
<a href="#courses">Skip to Our Courses</a>

<!-- Email link -->
<a href="mailto:hello@deejoft.com">Email Us</a>
```

**[SAY]:**
> "For internal links — pages on the same site — use relative paths. `./about.html` means 'look for about.html in the same folder as this file'. For in-page navigation, the `href` value must match the `id` of the target element exactly."

**[Do a live demo — add `id="courses"` to the `<h2>Our Courses</h2>` and click the skip link.]**

---

### Images (15 min)

**[TYPE]:**
```html
<img
  src="./images/campus.jpg"
  alt="Students coding at laptops in the Deejoft open classroom"
  width="800"
  height="500"
  loading="lazy"
>
```

**[SAY]:**
> "The `<img>` tag embeds an image. It has no closing tag — it is self-closing. Now — `alt` is not optional. I want to walk through three scenarios to show you why."

**[SAY — tick off on fingers]:**
> "Scenario one: a blind user on a screen reader. The screen reader reads the `alt` text aloud. If `alt` is empty or missing, the reader either skips it or reads the file name — `campus-photo-v3-final-FINAL.jpg`. That user has no idea what they're missing."
>
> "Scenario two: the image URL is broken. The browser renders the `alt` text in its place. The user still understands what was there."
>
> "Scenario three: Google Images. It ranks images by their `alt` text. `alt='photo'` ranks nowhere. A descriptive sentence ranks well."

**[SAY]:**
> "Now — `width` and `height` are also not just cosmetic. Before the browser has downloaded the image, it needs to know how much space to reserve for it. If you do not give it these numbers, the page jumps around as images load — called 'layout shift'. Google measures this and penalises sites that do it. Always set both."

**[SAY]:**
> "`loading='lazy'` is a one-attribute performance win. It tells the browser: only load this image when the user is about to scroll to it. Images off-screen are not downloaded at all on initial load. Your page loads faster. The exception: the first, above-the-fold image should use `fetchpriority='high'` instead, so it loads immediately."

### Anticipated Student Question: "What if an image is just decorative?"

**[SAY]:**
> "Great edge case. If the image is purely decorative — a background pattern, a divider line — write `alt=''`. Empty string. This tells screen readers to skip it completely. Do NOT leave the `alt` attribute out entirely — that is a different signal and causes screen readers to read the file name."

---

## ✏️ PART D — Guided Exercise (1:35 – 2:00)

**[SAY]:**
> "Now you build it. Close your notes. Create a new file called `index.html` in a new folder called `bio-page`. Build a personal bio page from memory. You have the handout if you get truly stuck — but try without it first."

**[WRITE ON BOARD — requirements]:**
```
✅ Full valid HTML5 skeleton — from memory
✅ <h1> with your full name
✅ Two <h2> sections: "About Me" and "What I'm Learning"
✅ At least three <p> tags with real content
✅ One <img> with a meaningful alt attribute (use any image URL)
✅ One external link with rel="noopener noreferrer"
✅ One internal link that jumps to a section on the same page
```

**[WHILE STUDENTS WORK — circulate and look for]:**
- Missing `<!DOCTYPE html>` or `lang` attribute
- `<img>` with empty or missing `alt`
- External links without `rel="noopener noreferrer"`
- `var` or `style=""` (if they've coded before — break the habit early)
- Missing `width` and `height` on images

**[At 10 minutes remaining]:**

**[SAY]:**
> "Let's validate. Go to `validator.w3.org`. Paste in your HTML or upload your file. Read every error and warning. If you have any errors — fix them before next class. Zero errors is the standard."

**[DEMO — show what a validation error looks like and how to read the line number.]**

---

## 🔚 Wrap-Up (Last 5 min)

**[SAY]:**
> "What did we build today? A valid HTML document from memory. That is not nothing — most people who call themselves 'developers' cannot write a correct HTML skeleton without looking it up."
>
> "Three things to remember before next class: `<!DOCTYPE html>` first, always. `alt` on every image, always. `rel='noopener noreferrer'` on every `target='_blank'` link, always."
>
> "Next class: semantic HTML. We will take everything we built today and restructure it so a screen reader and a search engine can fully understand it. Bring your bio page."

**[SET HOMEWORK]:**
- Complete the bio page — all requirements met
- Zero W3C validation errors
- Validate and screenshot the result

---

## 📎 Tutor Notes

**Common first-class errors to watch for:**
- Students writing `<IMG>` or `<BR>` in uppercase — valid in HTML5, but bad habit
- Forgetting to close `<html>`, `<head>`, or `<body>` (validator catches these)
- Nesting block elements inside inline elements — e.g., `<a><p>text</p></a>` (invalid)
- Using heading levels for visual size instead of document hierarchy

**If time runs short:** Cut the `loading="lazy"` and `fetchpriority` explanation — cover it in Class 4 with the media session. Do not cut links or alt attributes.

**If students finish early:** Ask them to create an `about.html` file and link back and forth between the two pages using relative paths.
