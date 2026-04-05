# 📄 HTML Class 2 — Student Handout
### Semantic HTML5 & Structured Data
**Deejoft Coding School** | Bring this to class.

---

## A. What Is Semantic HTML?

**Semantic** means "meaningful". A semantic HTML element tells the browser, search engine, and screen reader **what the content IS** — not just what it looks like.

| ❌ Not semantic | ✅ Semantic | What the semantic version communicates |
|----------------|------------|----------------------------------------|
| `<div class="top">` | `<header>` | "This is the site header" |
| `<div class="links">` | `<nav>` | "These are navigation links" |
| `<div class="content">` | `<main>` | "This is the page's unique content" |
| `<div class="post">` | `<article>` | "This is a self-contained piece of content" |
| `<div class="sidebar">` | `<aside>` | "This is supplementary content" |
| `<div class="bottom">` | `<footer>` | "This is the closing section" |

> ✏️ **Fill in:** Why does it matter which tags you use if the page looks the same in the browser?
>
> _________________________________________________________________
>
> _________________________________________________________________

---

## B. The Semantic Layout Elements — Full Reference

```html
<header>
  <!-- ✅ Site identity + primary navigation
       ✅ Can also appear inside <article> or <section>
       ❌ Do NOT nest <header> inside another <header> -->
</header>

<nav aria-label="Primary navigation">
  <!-- ✅ Sets of navigation links
       ✅ Use aria-label when there are multiple <nav> elements on the page
       ❌ Not every group of links — only major navigation blocks -->
</nav>

<main>
  <!-- ✅ The unique content of THIS page (not repeated across pages)
       ✅ ONE per page
       ❌ Never put <main> inside <article>, <aside>, <header>, or <footer> -->
</main>

<section aria-labelledby="section-heading-id">
  <!-- ✅ A thematic group you would give a heading to
       ✅ Use aria-labelledby to connect it to its visible heading
       ❌ Don't use if there is no heading inside it -->
</section>

<article>
  <!-- ✅ Self-contained content that makes sense on its own
       ✅ Blog posts, news stories, product cards, comments, forum replies
       ❌ Not for content that only makes sense in the context of the page -->
</article>

<aside aria-label="Related links">
  <!-- ✅ Supplementary to the main content — sidebars, author bios
       ❌ Not for decorative or unrelated elements -->
</aside>

<footer>
  <!-- ✅ Closing content — copyright, footer links, contact info
       ✅ Can also appear inside <article> or <section>
       ❌ Not for main content or navigation (use <nav> for navigation) -->
</footer>
```

### The `<article>` vs `<section>` Test

Ask yourself: **"If I copied this block to a completely different website, would it still make complete sense?"**

- **YES** → `<article>` (a blog post, product card, forum reply, tweet)
- **NO** → `<section>` (a chapter that only makes sense in this document)

> ✏️ **Fill in:** Label each as `<article>` or `<section>`:
>
> A list of reviews on an e-commerce product page: _____________
>
> A single customer review: _____________
>
> The "Why Choose Us" section of a homepage: _____________
>
> A news article on a news site: _____________

---

## C. Additional Semantic Elements

```html
<!-- <figure> — self-contained content referenced from the main text -->
<figure>
  <img src="./chart.png" alt="Bar chart showing monthly enrolments">
  <figcaption>Fig. 1 — Monthly enrolments at Deejoft, Jan–Jun 2025.</figcaption>
</figure>

<!-- <time> — machine-readable date/time -->
<time datetime="2025-06-15">June 15, 2025</time>
<time datetime="14:30">2:30 PM</time>

<!-- <details> + <summary> — native collapsible section, no JavaScript needed -->
<details>
  <summary>What is the class schedule?</summary>
  <p>Classes run Monday, Wednesday, and Friday from 9am to 12pm.</p>
</details>

<!-- <dialog> — native modal/overlay -->
<dialog id="enrol-modal">
  <h2>Enrol Today</h2>
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>
<button onclick="document.getElementById('enrol-modal').showModal()">Open</button>

<!-- <address> — contact information for nearest <article> or the whole page -->
<address>
  <p>Deejoft Coding School</p>
  <p>14 Tech Hub Crescent, Lekki, Lagos</p>
  <a href="tel:+2348012345678">+234 801 234 5678</a>
</address>
```

> ✏️ **Fill in:** You are building a FAQ page. What element would you use for each question-and-answer pair that can be expanded and collapsed? (Hint: no JavaScript needed.)
>
> Element: _____________

---

## D. Tables — Structure Reference

Use tables **only for data that has rows AND columns**. Never for page layout.

```html
<table>
  <caption>Deejoft Course Schedule — Q3 2025</caption>
  <!--  ↑ Always the FIRST child of <table>. Visible title for the table.  -->

  <thead>
    <!--  Groups header rows  -->
    <tr>
      <th scope="col">Course</th>     ←  scope="col": this header applies to its COLUMN
      <th scope="col">Duration</th>
      <th scope="col">Price (₦)</th>
    </tr>
  </thead>

  <tbody>
    <!--  Groups data rows  -->
    <tr>
      <td>HTML & CSS</td>
      <td>2 Weeks</td>
      <td>49,999</td>
    </tr>
  </tbody>

  <tfoot>
    <!--  Groups summary/total rows  -->
    <tr>
      <th scope="row" colspan="2">Bundle (All Courses)</th>
      <!--  scope="row": this header applies to its ROW  -->
      <!--  colspan="2": this cell spans 2 columns  -->
      <td>189,999</td>
    </tr>
  </tfoot>
</table>
```

### Table Element Reference

| Element | Purpose |
|---------|---------|
| `<table>` | Wrapper for the entire table |
| `<caption>` | Table title — first child of `<table>` |
| `<thead>` | Groups header rows |
| `<tbody>` | Groups data rows |
| `<tfoot>` | Groups footer/summary rows |
| `<tr>` | A table row |
| `<th>` | A header cell — use `scope="col"` or `scope="row"` |
| `<td>` | A data cell |
| `colspan="n"` | Cell spans n columns |
| `rowspan="n"` | Cell spans n rows |

> ✏️ **Fill in:** Why is `scope="col"` important on `<th>` elements?
>
> _________________________________________________________________

> ✏️ **Fill in:** Draw the structure of a 3×3 table (3 columns, 3 data rows) using only element names:
>
> ```
> <table>
>   <thead>
>     <tr> ___ ___ ___ </tr>
>   </thead>
>   <tbody>
>     <tr> ___ ___ ___ </tr>
>     <tr> ___ ___ ___ </tr>
>     <tr> ___ ___ ___ </tr>
>   </tbody>
> </table>
> ```

---

## E. Class 2 Exercise Checklist

- [ ] Refactored a div-heavy page to use correct semantic elements
- [ ] `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` all correctly placed
- [ ] `<section>` has `aria-labelledby` linking to its heading's `id`
- [ ] At least one `<article>` with a nested `<header>` and `<time>` with `datetime`
- [ ] At least one `<details>` + `<summary>` pair
- [ ] A data table with `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, and `scope` on all `<th>` elements
- [ ] Validated at `validator.w3.org` — zero errors

---

## ⚡ Quick Reference — Class 2 Tags & Attributes

| Tag / Attribute | Key Rule |
|----------------|----------|
| `<header>` | Site or section header. One per page (or one per article/section). |
| `<nav aria-label>` | Navigation. Use `aria-label` when multiple navs on the page. |
| `<main>` | ONE per page. Never nested inside other sectioning elements. |
| `<section aria-labelledby>` | Thematic group. Must have a heading. |
| `<article>` | Self-contained. Passes the "copy it elsewhere" test. |
| `<aside>` | Supplementary. Related but not central. |
| `<footer>` | Closing content. Can be inside article/section too. |
| `<figure>` + `<figcaption>` | Self-contained visual + its caption. |
| `<time datetime="">` | Visible text + machine-readable date/time. |
| `<details>` + `<summary>` | Native collapsible. No JavaScript. |
| `<dialog>` | Native modal. `.showModal()` / `.close()` to control. |
| `<address>` | Contact information for the nearest article or body. |
| `scope="col"` on `<th>` | This header applies to its column. |
| `scope="row"` on `<th>` | This header applies to its row. |
| `colspan="n"` | Cell spans n columns. |

---

*Deejoft Coding School | HTML Class 2 | Bring to Class 3*
