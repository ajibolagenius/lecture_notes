# Week 1: The Absolute Fundamentals

Welcome to HTML! This week is all about building a solid foundation — and starting the one project you'll keep building all course long: **your own personal portfolio site**. We'll go from a blank file to a real, structured webpage that is genuinely the first version of `index.html` you'll ship in Week 7. We'll focus on *what* HTML is, why it's the "skeleton" of all websites, and how to write the most essential "content" tags.

---

## Module 1: Introduction to Web Development

### 1. What is a Website? (The "Big 3")

* **Lecture & Concepts:**
    * A website is a collection of files interpreted by a browser. At its core, every modern website is built with three "languages," and it's crucial to understand their distinct roles.
    * **The "Blueprint & Construction" Analogy:**
        1.  **HTML (HyperText Markup Language):** This is the **Blueprint** or **Skeleton**. It defines the *structure* and *content* of a page. It says "This is a heading," "This is a paragraph," "This is an image." It provides the raw materials and meaning.
        2.  **CSS (Cascading Style Sheets):** This is the **Interior Design** or **Appearance**. It defines the *presentation* and *style*. It says "Make that heading blue and use a 'Roboto' font," "Put that image on the right," "Give this box a red border."
        3.  **JavaScript (JS):** This is the **Plumbing & Electricity** or **Behavior**. It defines the *interactivity* and *functionality*. It says "When the user clicks this button, show a popup," "Fetch new data from a server," "Change this image every 5 seconds."
    * **Our Focus:** We *always* start with HTML. You must have a skeleton before you can put clothes on it or make it move. This course builds the skeleton of a real portfolio site; the CSS course puts clothes on that exact same skeleton; the JavaScript course wires up its behavior.

* **Class Exercise: Analyze the "Big 3"**
    1.  Open a real developer's portfolio site (search "web developer portfolio example" if you don't know one).
    2.  Identify the **HTML:** Look at the text, the headings, the images, the project list. This is all the *content*.
    3.  Identify the **CSS:** Look at the colors, the fonts, the layout.
    4.  Identify the **JS:** Click a project filter or a "dark mode" toggle if there is one. The *reaction* is JavaScript.

---

### 2. Tools of the Trade

* **Lecture & Concepts:**
    * You only need two things to build a website: a **code editor** and a **web browser**.
    * **Code Editor:** This is a text editor built for programming. It gives you syntax highlighting (colors), auto-completion, and other tools.
        * **Recommendation:** We will use **Visual Studio Code (VS Code)**. It's free, modern, and the industry standard.
    * **Web Browser:** This is what *interprets* your code and displays the final website. We will use **Google Chrome** or **Firefox** because they have excellent "Developer Tools."
    * **Browser Dev Tools:** Your most important debugging tool. You can open them by pressing **F12** (or `Cmd+Opt+I` on Mac).
        * **"View Page Source":** Right-click on any website and select "View Page Source." This shows you the raw HTML file the server sent. It's often messy!
        * **"Inspect":** Right-click on any element and select "Inspect." This shows you the *live DOM* (what the browser built) and the CSS that applies to it.

* **Class Exercise: Set Up Your Portfolio Project**
    1.  Install VS Code from `code.visualstudio.com`.
    2.  Create a new folder on your computer named `portfolio`. This is the project you'll keep working in for the rest of this course — and the CSS/JS/React courses after it.
    3.  Open this *folder* in VS Code (File > Open Folder).
    4.  Go to a real portfolio site, right-click, and "View Page Source." Just look at the raw HTML. Don't worry about understanding it yet — just see that it's all text and tags.

---

### 3. Your First Webpage (The Boilerplate)

* **Lecture & Concepts:**
    * Every single HTML page in the world follows a fundamental structure. We call this the "boilerplate." It's the minimum required to be a valid HTML5 document.
    * **`<!DOCTYPE html>`:** The **D**ocument **T**ype **D**eclaration. This *must* be the very first line. It tells the browser, "Warning! The file you are about to read is an HTML5 document."
    * **`<html>`:** The root element. This tag wraps *all* other content on the page (except the `DOCTYPE`).
    * **`<head>`:** The "invisible" section. This contains metadata *about* the page (like the title, character encoding, and links to CSS). It's not displayed on the page itself.
    * **`<body>`:** The "visible" section. This contains *all* the content you can see: headings, paragraphs, images, links, etc.

* **In-Depth Example (The Boilerplate):**
    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <!-- Metadata goes here -->
      </head>
      <body>
        <!-- Visible content goes here -->
      </body>
    </html>
    ```
    * **`lang="en"` on `<html>`:** Not optional, even though the browser won't complain if you skip it. It tells screen readers which language to pronounce your content in, and it's an actual accessibility requirement (WCAG 3.1.1) — not a "nice to have." Set it once, here, and it's done for the whole site.

* **Class Exercise: Create `index.html`**
    1.  In VS Code, inside your `portfolio` folder, create a new file named `index.html`. This is your portfolio's homepage, and it's the file this entire course builds on.
    2.  Type (don't copy-paste!) the full boilerplate above — including `lang="en"` on the `<html>` tag.
    3.  Inside the `<body>` tags, temporarily write `Hello, World!`.
    4.  Save the file. Find it in your computer's file explorer and double-click it to open it in Chrome. You've made the first version of your portfolio!

---

### 4. The `<head>` Element

* **Lecture & Concepts:**
    * The `<head>` is the "brain" of your page. It's crucial but invisible.
    * **`<title>`:** This is the *only required* tag inside the `<head>`. It defines the text that appears in the **browser tab**. This is also what Google uses as the main blue link in search results.
    * **`<meta charset="UTF-8">`:** This tells the browser which "character set" (alphabet) to use. `UTF-8` is the universal standard that includes all international characters and emojis (like "😊"). You should *always* include this as the first or second line in your `<head>`.
    * **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`:** Without this line, mobile browsers quietly render your page as a shrunk-down desktop layout — every phone visitor gets a tiny, pinch-to-zoom version of your site instead of one that fits their screen. It looks like nothing when you're only testing on a laptop, which is exactly why it's so easy to forget. Add it now, in the boilerplate, and every page you build for the rest of this course inherits it for free.

* **In-Depth Example:**
    ```html
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My First Awesome Website</title>
    </head>
    ```

* **Class Exercise: Title Your Portfolio**
    1.  Go back to your `index.html` file.
    2.  Inside the `<head>` tags, add the `<meta charset="UTF-8">` tag, then the `<meta name="viewport" ...>` tag above it.
    3.  Add a `<title>` tag with your name in it (e.g., `<title>Alice Chen — Portfolio</title>`).
    4.  Save and refresh the page in your browser. Look at the browser tab. It should now show your title! Then open Dev Tools (F12), toggle the device toolbar, and pick a phone size — the page should already behave better with the viewport tag than without it, even with zero CSS yet.

---

### 5. Version Control: Saving Your Work with Git

* **Lecture & Concepts:**
    * Right now, your only backup is whatever's on your hard drive. **Git** is a version control system — it saves snapshots ("commits") of your project over time, so you can always go back, and so your code can live somewhere other than one laptop.
    * **`git init`:** Turns your `portfolio` folder into a git repository. Run it once, at the start.
    * **`git add <file>`** (or `git add .` for everything): *Stages* changes — tells git "these are the changes I want to include in the next snapshot."
    * **`git commit -m "message"`:** Saves a snapshot of everything staged, with a short description of what changed. Commit often, in small chunks — "add viewport meta tag" is a better commit than "stuff."
    * **GitHub** is not the same thing as git. Git is the tool that tracks history *on your machine*; GitHub is a website that *hosts* a copy of that history remotely, so you have a backup and a shareable URL. `git remote add origin <url>` connects the two; `git push` uploads your commits.

* **In-Depth Example (Terminal):**
    ```bash
    cd portfolio
    git init
    git add .
    git commit -m "Initial commit: portfolio homepage skeleton"

    # After creating an empty repository on github.com:
    git remote add origin https://github.com/yourusername/portfolio.git
    git branch -M main
    git push -u origin main
    ```

* **Class Exercise: Put Your Portfolio Under Version Control**
    1.  In VS Code, open a terminal (Terminal > New Terminal) inside your `portfolio` folder.
    2.  Run `git init`.
    3.  Run `git add .`, then `git commit -m "Initial commit: portfolio homepage skeleton"`.
    4.  On github.com, create a new **empty** repository named `portfolio` (don't add a README — you already have files).
    5.  Copy the two commands GitHub shows you under "…or push an existing repository from the command line" and run them.
    6.  Refresh the repository page on GitHub and confirm `index.html` is there. This is the same repo you'll keep committing to and eventually deploy from, in Week 7.

---

## Module 2: Core Content Tags

These are the tags that give your content *meaning* (semantics).

### 1. Headings & Paragraphs

* **Lecture & Concepts:**
    * **Headings (`<h1>` to `<h6>`):** These define the *hierarchy* of your content. They are **NOT** for making text big or small (that's CSS's job).
        * `<h1>`: The main title of the *entire page*. You should **only have ONE `<h1>` per page** for accessibility and SEO. (e.g., your name).
        * `<h2>`: A main section heading (e.g., "About Me," "Featured Work").
        * `<h3>`: A sub-section heading (e.g., a specific project's title).
        * `<h4>` - `<h6>`: Sub-sub-sections.
    * **Paragraphs (`<p>`):** The most common tag. This wraps a block of text. The browser automatically adds a bit of space (a `margin`) before and after each `<p>` tag.

* **Class Exercise: Write Your Portfolio's Intro**
    1.  Inside your `<body>`, delete "Hello, World!".
    2.  Add an `<h1>` with your name (e.g., "Alice Chen").
    3.  Add an `<h2>` that says "About Me".
    4.  Add a `<p>` tag with two or three sentences introducing yourself — who you are, what you're learning, what you're building toward.
    5.  Save and refresh. Notice the structure and default spacing.

---

### 2. Attributes

* **Lecture & Concepts:**
    * Attributes are extra information you add to an HTML tag. They always go in the *opening* tag and use a `name="value"` syntax.
    * **`id` (Identifier):** A **unique** name for *one* element on a page. It's like a person's Social Security Number. You can *only* use an `id` name **once** per page. Used to link to specific parts of a page or for JavaScript.
    * **`class` (Class):** A **reusable** group name. It's like a category or a tag. You can use the *same class* on *multiple* elements to style them all at once (e.g., `class="button"`, `class="warning-text"`). This is the primary way CSS connects to HTML.

* **In-Depth Example:**
    ```html
    <!-- 'id' is unique -->
    <h1 id="page-title">Alice Chen</h1>

    <!-- 'class' is reusable -->
    <div class="project-card">
      <h3 class="project-title">Project One</h3>
      <p class="project-description">...</p>
    </div>
    <div class="project-card">
      <h3 class="project-title">Project Two</h3>
      <p class="project-description">...</p>
    </div>
    ```

* **Class Exercise: Label Your Content**
    1.  In your `index.html`, add `id="page-title"` to your `<h1>`.
    2.  Add `class="section-heading"` to your `<h2>`.
    3.  Add `class="bio"` to your bio `<p>`.
    4.  Save and refresh. You will see **no visual change**. `id` and `class` are invisible labels *for the code* — the CSS course is where they start paying off.

---

### 3. Links (Anchor Tags)

* **Lecture & Concepts:**
    * The `<a>` (or "anchor") tag is what makes the web a *web*. It creates hyperlinks.
    * It requires the `href` (Hyperlink Reference) attribute to know where to link to.
    * **Absolute Links:** A full URL to an *external* site. Must include `https://`.
    * **Relative Links:** A path to *another file on your own site*.
        * `href="about.html"` (Links to a file in the *same folder*).
        * `href="pages/contact.html"` (Links to a file in a *sub-folder*).
        * `href="/"` (Links to the homepage of your site).

* **In-Depth Example:**
    ```html
    <!-- 1. Absolute Link (to an external site) -->
    <p>Find me on <a href="https://github.com/yourusername">Github</a>.</p>

    <!-- 2. Relative Link (to another page on your site) -->
    <p>Want to work together? <a href="contact.html">Contact me</a>.</p>
    ```

* **Class Exercise: Add Real Links**
    1.  At the bottom of your `index.html` (before the `</body>`), add a new `<p>`.
    2.  Inside it, add an **absolute link** to your Github or LinkedIn profile.
    3.  Add another **relative link** to a file named `contact.html` (even though this file doesn't exist yet — you'll build it in Week 4).

---

### 4. Images

* **Lecture & Concepts:**
    * The `<img>` tag is used to embed an image.
    * It is a **self-closing** (or "void") tag. It has no content, so it doesn't need a closing `</img>` tag.
    * **`src` (Source) Attribute:** **Required.** This is the path to the image, just like `href` for links. It can be absolute (`https://...`) or relative (`images/my-photo.jpg`).
    * **`alt` (Alternative Text) Attribute:** **Required.** This is the single most important accessibility feature. It describes the image for:
        1.  **Screen readers:** For users who are visually impaired.
        2.  **Broken images:** If the image fails to load, the `alt` text will be displayed.
        3.  **SEO:** Google uses `alt` text to understand what an image is.
    * **Rule:** If an image is *content* (like a photo), you *must* write a good description. If it's purely *decorative* (like a swirly border), you should still add the `alt` attribute but leave it empty: `alt=""`.

* **In-Depth Example:**
    ```html
    <!-- 1. Relative image from a sub-folder -->
    <img src="assets/profile-photo.jpg" alt="Alice Chen smiling, standing in front of a laptop.">
    ```

* **Class Exercise: Add Your Profile Photo**
    1.  Create an `assets` folder inside your `portfolio` project.
    2.  Add a photo of yourself (or a placeholder) into it.
    3.  Under your `<h1>`, add an `<img>` tag with a relative `src` pointing to it.
    4.  Write descriptive `alt` text for the photo.
    5.  Save and refresh. You should now have your profile photo on your portfolio homepage!

---

### Week 1: Comprehensive Assignment

**Objective:** Build "Portfolio Home Page v1" — the file you'll keep extending every week for the rest of this course.

**Project:**
Build `index.html` inside your `portfolio` project folder.

**Requirements:**

1.  **Valid Boilerplate:** Your file must start with a `<!DOCTYPE html>` and have the correct `<html lang="en">`, `<head>`, and `<body>` structure.
2.  **Head Content:** Your `<head>` must include `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, and a `<title>` (e.g., "Alice Chen — Portfolio").
3.  **Main Heading:** The `<body>` must have *one* `<h1>` with your name.
4.  **Version Control:** Your `portfolio` folder must be a git repository with at least two real commits, pushed to a GitHub repository.
5.  **Profile Photo:** Include an `<img>` of yourself (or a placeholder). It must have a descriptive `alt` attribute.
6.  **About Me Section:** An `<h2>` "About Me" followed by at least one `<p>` introducing yourself.
7.  **Links:**
    * Include one **external (absolute)** link to your Github, LinkedIn, or another site you want visitors to find.
    * Include one **relative link** to a *new page* you'll create called `contact.html`.
8.  **Bonus Challenge:** Create the `contact.html` file (using the same boilerplate) with just an `<h1>` that says "Contact Me" and a relative link that says "Back to Home" pointing back to `index.html`. You'll build this into a real form in Week 4.
