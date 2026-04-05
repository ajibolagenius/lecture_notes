# 📋 HTML Class 2 — Lesson Plan (Tutor Script)
### Semantic HTML5 & Structured Data
**Duration:** ~2 hours | **Format:** Live refactor + guided practice

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Homework review & warm-up |
| 0:10 – 0:40 | The Divitis Problem + semantic elements |
| 0:40 – 1:10 | Building a full semantic page layout |
| 1:10 – 1:35 | Tables for tabular data |
| 1:35 – 2:00 | Refactor exercise |

---

## 🛠 Setup (Do Before Students Arrive)
- Two browser tabs: one with a `<div>`-heavy starter file, one with a semantic version
- VS Code open with the Class 1 `index.html` as a starting refactor target
- `validator.w3.org` tab ready
- MDN open to the `<article>` element page for reference

---

## 🎤 PART A — Homework Review (0:00 – 0:10)

**[SAY]:**
> "Before we start — let's see your bio pages. Whoever wants to, share their screen for 60 seconds. I will only look at two things: does it open in the browser, and does it validate."

**[Pick 2–3 volunteers — briefly check]:**
- `validator.w3.org` — paste the code or URL
- Note the most common errors publicly so the whole class learns

**[SAY]:**
> "The most common issue I saw was [X]. That is exactly the kind of mistake the validator catches before your users do. Get used to running the validator on every file before you call something done."

---

## 🎤 PART B — The Divitis Problem (0:10 – 0:40)

### The Side-by-Side Demo (15 min)

**[SAY]:**
> "I want to show you two pages. They look absolutely identical in the browser. But one of them is deeply broken — and the other is production quality."

**[OPEN FILE 1 — `divitis.html`]:**
```html
<div class="top-thing">
  <div class="logo">Deejoft</div>
  <div class="links">
    <div class="link">Home</div>
    <div class="link">Courses</div>
  </div>
</div>
<div class="big-area">
  <div class="post">
    <div class="post-title">How to Learn HTML</div>
    <div class="post-words">Practice every day...</div>
  </div>
</div>
<div class="bottom-area">© 2025 Deejoft</div>
```

**[SAY]:**
> "This works visually. It renders fine. But ask yourself: what is `.top-thing`? What is `.big-area`? You need to read the class names just to guess. A screen reader reaches the first `<div>` and announces... 'div'. Nothing. No context. No meaning."

**[OPEN FILE 2 — `semantic.html`]:**
```html
<header>
  <span>Deejoft</span>
  <nav>
    <a href="/">Home</a>
    <a href="/courses">Courses</a>
  </nav>
</header>
<main>
  <article>
    <h1>How to Learn HTML</h1>
    <p>Practice every day...</p>
  </article>
</main>
<footer>
  <p>© 2025 Deejoft</p>
</footer>
```

**[SAY]:**
> "Now a screen reader reaches `<header>` and announces 'banner landmark'. It reaches `<nav>` and announces 'navigation'. It reaches `<main>` and announces 'main content'. The user can jump between these sections with a single keystroke — without reading every word on the page. That is the power of semantic HTML."
>
> "And from Google's perspective: `<article>` with an `<h1>` inside it is a clearly identified piece of content. The `<div>` version is just noise."

---

### Why Does This Feel Like Extra Work? (5 min)

**[SAY]:**
> "I know what you might be thinking: 'Can't I just use divs and add class names that describe what things are?' Here is the problem with that: you have to invent the naming system, keep it consistent, document it, train your team on it, and then still add ARIA attributes to make it accessible. Semantic HTML gives you all of that for free. The browser already knows what `<nav>` means. You do not have to explain it."

---

### The Semantic Toolkit (10 min)

**[SAY]:**
> "There are eight layout elements you need to know cold. I am going to go through them with a simple test for each one."

**[WRITE ON BOARD — reference as you explain each]:**

| Element | Question to Ask |
|---------|----------------|
| `<header>` | Is this the introductory section of the page or an article? |
| `<nav>` | Is this a set of navigation links? |
| `<main>` | Is this the unique, primary content of this page? |
| `<section>` | Is this a thematic group I would give a heading to? |
| `<article>` | Would this make sense if I copied it to another website? |
| `<aside>` | Is this supplementary to the main content? |
| `<footer>` | Is this closing information for the page or an article? |
| `<address>` | Is this contact information for the author or business? |

**[SAY — for `<section>` vs `<article>`]:**
> "The article test: if you took this block of content and pasted it into a completely different website, would it still make complete sense on its own? A blog post — yes. A product card — yes. A forum reply — yes. Those are all `<article>`. A chapter that only makes sense in the context of the rest of this document? That is `<section>`."

---

## 🎤 PART C — Building the Full Semantic Page (0:40 – 1:10)

**[SAY]:**
> "Let's build a complete, properly structured blog page together. Type with me."

**[TYPE — build this incrementally, explaining each element as you add it]:**

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
```

**[PAUSE — SAY]:**
> "Two new attributes here. `aria-label='Primary navigation'` gives the `<nav>` a name — useful when there are multiple `<nav>` elements on a page. `aria-current='page'` tells screen readers which link is the current page. Screen readers announce it as 'current page, Home link'. Without it, users navigating by links have no way to know where they are."

```html
  <main>

    <section aria-labelledby="featured-heading">
      <h2 id="featured-heading">Featured Articles</h2>
```

**[PAUSE — SAY]:**
> "`aria-labelledby` connects the section to its heading using the `id`. This is more robust than `aria-label` because the label comes from visible content — so it updates automatically if the heading text changes. The `id` here is the bridge."

```html
      <article>
        <header>
          <h3>Getting Started with React in 2025</h3>
          <p>
            By <a href="/author/ada">Ada Lovelace</a> ·
            <time datetime="2025-06-15">June 15, 2025</time>
          </p>
        </header>
        <p>React 19 introduced Actions and the <code>use()</code> hook...</p>
        <a href="/blog/react-2025">Read full article →</a>
      </article>
```

**[PAUSE — SAY]:**
> "Three things here. First: `<header>` inside `<article>` — this is valid. `<header>` and `<footer>` can appear inside sectioning elements, not just at the page level. Second: `<time>` with `datetime`. The visible text can say whatever you like — 'June 15, 2025', 'Last Tuesday', 'Yesterday' — but the `datetime` attribute gives the machine-readable, standardised date. Search engines and accessibility tools use it. Third: `<code>` for inline code. Never write code in a `<p>` without wrapping it in `<code>` — it means something different."

```html
    </section>

    <aside aria-label="About this blog">
      <h2>About This Blog</h2>
      <p>Weekly articles from Deejoft instructors on HTML, CSS, and JavaScript.</p>
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

**[PAUSE — SAY]:**
> "`<aside>` is supplementary content — related to the main content but not central to it. Sidebars, related links, author bios. NOT for decorative panels that have nothing to do with the article. `<small>` is for fine print — legal disclaimers, copyright notices, footnotes. It does not just mean 'small text'. It has semantic meaning."

---

### Special Elements: `<figure>`, `<details>`, `<dialog>` (10 min)

**[SAY]:**
> "Three more elements you will use regularly."

**[TYPE separately — live demo, not part of the blog page]:**

```html
<figure>
  <img src="./event-loop.png" alt="Diagram of the JavaScript event loop" width="600" height="400">
  <figcaption>Fig. 1 — The JS event loop. Call stack left, task queue right.</figcaption>
</figure>
```

**[SAY]:**
> "`<figure>` is for self-contained content that is referenced from the main text — diagrams, code blocks, charts, photos with captions. `<figcaption>` is the caption. They belong together."

```html
<details>
  <summary>What is the prerequisite for the JavaScript course?</summary>
  <p>You need to complete our HTML and CSS courses first, or have equivalent experience.</p>
</details>
```

**[SAY]:**
> "A native disclosure widget. Click `<summary>` — the content below expands and collapses. No JavaScript. No library. This is pure HTML. Use it for FAQs, collapsible sections, footnotes."

```html
<dialog id="enrol-modal">
  <h2>Enrol Today</h2>
  <p>Start your coding journey for ₦49,999/month.</p>
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>

<button onclick="document.getElementById('enrol-modal').showModal()">
  Enrol Now
</button>
```

**[SAY]:**
> "`<dialog>` is the native modal/dialog element. Supported in all browsers since 2022. It handles focus trapping, escape key dismissal, and the backdrop automatically — things developers used to write 100 lines of JavaScript to achieve. `showModal()` opens it. `close()` closes it. We will revisit this in Class 4."

---

## 🎤 PART D — Tables for Tabular Data (1:10 – 1:35)

### The Rule First (5 min)

**[SAY]:**
> "Before I show you a single tag, the rule: tables are for data that has rows AND columns. A class timetable. A comparison of features. Pricing data with multiple attributes. They are never used for page layout. Never. Not in 2025. Not ever."
>
> "The reason tables were used for layout in the early internet is that CSS Grid and Flexbox did not exist. Developers hacked tables to build columns and rows. That era is over. CSS does layout. Tables do data."

### Building an Accessible Table (20 min)

**[TYPE]:**
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

**[PAUSE after `<caption>`]:**
> "`<caption>` is the table's title. It is always the first child of `<table>`. Screen readers announce it before reading any data so the user knows what table they are about to hear."

**[PAUSE after `<thead>`]:**
> "`<thead>` groups the header rows. `<tbody>` groups the data rows. `<tfoot>` groups summary or footer rows. These groupings let screen readers associate headers with data cells correctly, even in very large tables."

**[PAUSE after the first `<th scope='col'>`]:**
> "`scope='col'` on a `<th>` tells screen readers: this header applies to everything in my column. Without `scope`, a screen reader user navigating a cell has no idea which header it belongs to. `scope='row'` works the same way for row headers — like the 'Full Track' row in `<tfoot>` here."

**[PAUSE after `colspan`]:**
> "`colspan='3'` makes this cell span 3 columns. `rowspan='2'` would make a cell span 2 rows. Use them for summary cells like this."

---

## ✏️ PART E — Refactor Exercise (1:35 – 2:00)

**[SAY]:**
> "Your task: I am going to give you a `divitis.html` file — a real-world, badly structured page. Your job is to refactor it. Replace every `<div>` and `<span>` with the correct semantic element. Add the right attributes. Build the table at the bottom."

**[DISTRIBUTE or SHOW starter file on projector:]**

The starter file contains:
- A div-heavy page structure (header, nav, main, article, aside, footer all as divs)
- A pricing list currently marked up as a `<div class="pricing">` wrapper with `<div class="row">` items
- No `scope` attributes, no `<caption>`, no `<time>` elements

**[WHILE STUDENTS WORK — circulate and check]:**
- Is the `<nav>` inside `<header>` or standalone?
- Are `<h2>` headings correctly placed inside `<section>` elements?
- Is `aria-labelledby` used to connect sections to their headings?
- Does the table have `<caption>`, `<thead>`, `<tbody>`, and `scope`?

**[5 minutes before end]:**

**[SAY]:**
> "Run it through the validator. The refactored version should have zero errors — the original div version also had zero errors, because HTML does not know you're using divs wrongly. The validator cannot catch semantic problems. That is why you have to understand the rules, not just chase green ticks."

---

## 🔚 Wrap-Up (Last 3 min)

**[SAY]:**
> "The article test. Burn this into memory: if you can copy this block to another site and it still makes sense — `<article>`. If it only makes sense in the context of this page — `<section>`. When in doubt: `<section>`."
>
> "Next class: forms. The most complex HTML you will write — and the most important for accessibility. Think of every form you have ever used that drove you crazy. We are going to learn how to not build those."

---

## 📎 Tutor Notes

**Students who finish early:**
Ask them to: (1) add `aria-current="page"` to the active nav link, (2) wrap the article's publication date in `<time>` with a proper `datetime`, (3) add an `<address>` element in the `<footer>`.

**Common errors in refactor exercises:**
- Putting `<main>` inside `<article>` — only one `<main>` per page, never nested
- Using `<section>` where `<article>` belongs and vice versa
- Forgetting that `<header>` and `<footer>` can appear inside `<article>`, not just at page level
- Writing `aria-label` on the `<section>` when `aria-labelledby` pointing to a visible heading is better

**For the table section:** If any student says "I always use a plugin to make tables" — that is fine for production, but they need to understand the structure. Plugins get it wrong too if you do not know what to look for.
