# Week 6: Advanced HTML & Best Practices

Congratulations on reaching the final week of the HTML course! You now know how to structure content, build forms, and embed media.

This week is about the "invisible" qualities that separate amateur sites from professional ones: **Accessibility (a11y)** and **Search Engine Optimization (SEO)**. We will also look at the bleeding edge of HTML features.

---

## Module 10: Accessibility (a11y)

**"The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect."** — Tim Berners-Lee, Inventor of the Web.

### 1. What is Accessibility?

* **Lecture & Concepts:**
    * **a11y**: A numeronym for "Accessibility" (there are 11 letters between 'a' and 'y').
    * It means building websites that can be used by people with:
        * **Visual impairments:** Blind users (using screen readers like NVDA or VoiceOver), color blind users, or those with low vision.
        * **Motor impairments:** Users who cannot use a mouse and rely on a keyboard or voice commands.
        * **Cognitive impairments:** Users who need clear, consistent layouts and simple instructions.
    * **Legal Requirement:** In many countries, accessible websites are required by law (ADA in the US, EAA in Europe).

### 2. Semantic HTML is the Foundation

* **Lecture & Concepts:**
    * The best way to be accessible is to write **valid, semantic HTML**.
    * If you use `<button>` for a button, the browser automatically handles keyboard focus (`Tab` key) and screen reader announcements ("Button, click me").
    * If you use `<div class="button">`, you have to rebuild all that functionality yourself (which is hard and error-prone).

### 3. ARIA (Accessible Rich Internet Applications)

* **Lecture & Concepts:**
    * Sometimes HTML isn't enough. If you build a complex widget (like a custom dropdown or a popup modal), HTML doesn't have a tag for that.
    * **ARIA** is a set of attributes you add to HTML to "describe" these custom elements to screen readers.
    * **The First Rule of ARIA:** Don't use ARIA if a native HTML element will do the job.

* **Common ARIA Attributes:**
    * **`aria-label="Text"`**: Used when an element has no visible text (like an icon button). It tells the screen reader what to say.
    * **`aria-hidden="true"`**: Tells screen readers to **ignore** an element. Used for decorative icons that add no meaning.
    * **`role="..."`**: Defines what an element *is* (e.g., `role="alert"` for an error message).

* **In-Depth Example (The "Hamburger" Menu):**
    A visual user sees three lines (≡). A blind user sees nothing unless we label it.

    ```html
    <button> <img src="menu-icon.svg"> </button>

    <button aria-label="Main Menu">
      <img src="menu-icon.svg" alt="" aria-hidden="true">
    </button>
    ```

### 4. Visual Focus & Navigation

* **Lecture & Concepts:**
    * **Keyboard Navigation:** You must be able to navigate your entire site using only the `Tab` key.
    * **Focus States:** Never remove the blue outline outline (`outline: none`) on buttons/inputs unless you replace it with a custom style. Keyboard users rely on this to know where they are.
    * **Skip Links:** A hidden link at the very top of the page that lets keyboard users "Skip to Main Content," avoiding the need to tab through 50 navigation links on every page.

* **⭐️ Class Exercise: Audit a Button**
    1.  Create an HTML file.
    2.  Add a "Search" button that contains *only* a magnifying glass emoji (🔍) and no text.
    3.  Use a screen reader (or your imagination) to realize this is inaccessible.
    4.  Fix it by adding `aria-label="Search"`.
    5.  Add a second button using a `<div>` with an `onclick` attribute. Try to `Tab` to it. (You can't!).
    6.  Fix the second button by changing it to a `<button>` tag.

---

## Module 11: SEO & Modern HTML

### 1. SEO Meta Tags

* **Lecture & Concepts:**
    * **SEO (Search Engine Optimization)** is the practice of formatting your site so Google ranks it higher.
    * The `<head>` is the battleground for SEO.
    * **`<title>`**: The most important factor. It should be unique for every page. `Page Name | Company Name`.
    * **`<meta name="description" content="...">`**: The short paragraph that appears under the blue link in Google results. It doesn't directly affect ranking, but it affects **Click Through Rate (CTR)**.

* **In-Depth Example:**
    ```html
    <head>
      <title>Best Coffee in Seattle | The Bean Hive</title>
      <meta name="description" content="The Bean Hive serves organic, fair-trade coffee in downtown Seattle. Open daily 6am-8pm. Check out our new cold brew menu!">
    </head>
    ```


### 2. The Open Graph Protocol (Social Media Cards)

* **Lecture & Concepts:**
    * Have you noticed that when you paste a link into Twitter, Slack, or WhatsApp, it turns into a beautiful card with an image and title? That is **Open Graph**.
    * It was invented by Facebook but is now the universal standard.
    * **Key Tags:**
        * `og:title`: The title of the card.
        * `og:description`: The description text.
        * `og:image`: **Crucial.** The URL of the image to show.
        * `og:url`: The canonical URL of the page.

* **In-Depth Example:**
    ```html
    <meta property="og:title" content="Best Coffee in Seattle">
    <meta property="og:description" content="Come taste our award-winning espresso.">
    <meta property="og:image" content="[https://mysite.com/images/coffee-social-card.jpg](https://mysite.com/images/coffee-social-card.jpg)">
    <meta property="og:url" content="[https://mysite.com](https://mysite.com)">
    <meta property="og:type" content="website">
    ```

### 3. Modern HTML5 Features (`<dialog>`)

* **Lecture & Concepts:**
    * HTML is evolving. We now have native tags for complex UI components.
    * **`<dialog>`**: A native popup modal / dialog box.
    * In the past, modals required complex DIV structures and lots of ARIA. Now, the browser handles it, including "trapping focus" (accessibility requirement) and closing with the `Esc` key.

* **In-Depth Example (Native Modal):**
    ```html
    <dialog id="myDialog">
      <h2>Newsletter</h2>
      <p>Subscribe for updates!</p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>

    <button onclick="document.getElementById('myDialog').showModal()">Open Modal</button>
    ```

---

### Week 6 / Final Project: The Professional Portfolio

**Objective:** Build a complete, multi-page personal portfolio website. This project serves as the "Final Exam" for the HTML course. It must demonstrate Semantic Structure, Forms, Multimedia, SEO, and Accessibility.

**Project Structure:**
* `index.html` (Homepage)
* `about.html` (About Me)
* `contact.html` (Contact Form)
* `assets/` (Folder for images/media)

#### Requirements Checklist:

**1. Global Structure (All Pages):**
* [ ] Valid HTML5 Boilerplate.
* [ ] **SEO:** Unique `<title>` and `<meta name="description">` for every page.
* [ ] **Social:** Open Graph tags (`og:title`, `og:image`) pointing to a thumbnail of your site.
* [ ] **Layout:** Use `<header>`, `<nav>`, `<main>`, and `<footer>`.
* [ ] **Navigation:** The `<nav>` must link to all three pages using relative links.

**2. Homepage (`index.html`):**
* [ ] **Hero Section:** A `<section>` introducing yourself with an `<h1>`.
* [ ] **Featured Work:** Use `<article>` tags to display 2-3 projects. Each project should have an image (`alt` text required), a title (`<h3>`), and a description.
* [ ] **Semantic Outline:** Ensure the headings (`h1` -> `h2` -> `h3`) follow a logical order without skipping levels.

**3. About Page (`about.html`):**
* [ ] **Media:** Embed a video (self-hosted `<video>` OR YouTube `iframe`) introducing yourself or showing a skill.
* [ ] **Responsive Image:** Use a `<picture>` element for your profile photo (different crops for mobile vs desktop).
* [ ] **Table:** Create a "Skills & Experience" table using `<thead>`, `<tbody>`, and `scope` attributes for accessibility.

**4. Contact Page (`contact.html`):**
* [ ] **Form:** A complete form submitting to a mock URL (or just `#`).
* [ ] **Inputs:** Name, Email, Subject, Message (`textarea`).
* [ ] **Accessibility:** Every input must have an explicitly linked `<label>` (`for`/`id`).
* [ ] **Validation:** Email must be `type="email"`. Required fields must use the `required` attribute.

**5. Accessibility Audit (The "Expert" Polish):**
* [ ] Ensure all images have `alt` attributes (or `aria-hidden="true"` if decorative).
* [ ] Ensure any "Read More" links have `aria-label`s describing *what* they are reading (e.g., `aria-label="Read more about Project One"`).
* [ ] Test that you can tab through your form and navigation in a logical order.

**Bonus Challenge:**
* Add a "Hire Me" button in the header that opens a `<dialog>` modal containing a quick email link.
