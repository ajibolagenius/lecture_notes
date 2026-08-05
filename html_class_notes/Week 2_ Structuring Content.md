# Week 2: Structuring Content

This week is all about adding richer structure to your portfolio's content. You'll move beyond simple paragraphs and learn to group content into lists, format text with semantic meaning, and use generic containers (`<div>` and `<span>`) to prepare your document for styling with CSS. Every example this week builds directly onto the `index.html` you started last week.

---

## Module 3: Lists & Text Formatting

### 1. Grouping Content with Lists

* **Lecture & Concepts:**
    HTML gives us three ways to group related items into lists. Choosing the right one is about *semantics* (the meaning of the content).

    * **`<ul>` (Unordered List):**
        * This is for a list of items where the **order does not matter**.
        * It's a "bullet point" list.
        * It uses `<ul>` as the container and `<li>` (List Item) for each item.
        * **Use Case:** Navigation menus, feature lists, skills.

    * **`<ol>` (Ordered List):**
        * This is for a list of items where the **order *does* matter**.
        * It's a "numbered" list (1, 2, 3...).
        * It uses `<ol>` as the container and `<li>` for each item.
        * **Use Case:** Step-by-step instructions, "Top 10" rankings, a timeline.

    * **`<dl>` (Description List):**
        * The least common, but very useful. This is a list of **key-value pairs**.
        * It uses `<dl>` (Description List) as the container.
        * It has two children: `<dt>` (Description Term) and `<dd>` (Description Definition).
        * **Use Case:** Glossaries, dictionaries, tool/technology descriptions.

* **In-Depth Example (All Three Lists):**
    ```html
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>

    <ol>
      <li>Learned HTML fundamentals.</li>
      <li>Built my first semantic layout.</li>
      <li>Shipped my portfolio site.</li>
    </ol>

    <dl>
      <dt>VS Code</dt>
      <dd>The code editor I use every day.</dd>

      <dt>Git</dt>
      <dd>Version control — tracks every change I make to my code.</dd>
    </dl>
    ```

* **⭐️ Class Exercise: Add a "Skills" Section**
    1.  In your `index.html`, add an `<h2>` that says "Skills".
    2.  Add an **unordered list** (`<ul>`) of 3-5 skills/technologies you're learning.
    3.  Add an `<h2>` that says "My Journey".
    4.  Add an **ordered list** (`<ol>`) of 3-4 milestones so far (e.g., "Wrote my first HTML page," "Built my first semantic layout").
    5.  Save and check your work.

---

### 2. Formatting Text (Inline Semantics)

* **Lecture & Concepts:**
    * How do you make one word bold or italic? You *don't* just "make it bold." You give it *meaning*, and the browser's default style is to make it bold. This is a core concept: **Semantics over Style**.
    * **`<strong>` vs. `<b>`:**
        * **`<strong>`**: Use this tag to indicate that the text has **serious importance, seriousness, or urgency**. Screen readers will announce this with a different tone. Browsers *style* it as bold by default. (e.g., "**Currently open to work.**")
        * **`<b>` (Bold)**: Use this tag to draw attention to text *without* implying extra importance. It's purely a visual style.
        * **Rule:** Always default to `<strong>`. Only use `<b>` if you're 100% sure it's just for visual style.

    * **`<em>` vs. `<i>`:**
        * **`<em>` (Emphasis)**: Use this tag to add **stress or emphasis** to a word, changing the meaning of the sentence. Screen readers will change their inflection. Browsers *style* it as italic. (e.g., "I *really* enjoy building for the web.")
        * **`<i>` (Italic)**: Use this to mark text that is in an "alternate voice," such as a technical term, a foreign phrase, or a thought.
        * **Rule:** Always default to `<em>`.

    * **Other Useful Tags:**
        * **`<code>`**: Marks a snippet of computer code or a technology name (e.g., `React`).
        * **`<pre>` (Preformatted Text)**: Wraps a *block* of text (often with `<code>` inside) and tells the browser to respect all spaces and line breaks. Essential for displaying code blocks.
        * **`<br>` (Line Break)**: A self-closing tag that forces a new line. Use this *sparingly*! **Do not use `<br>` to create space between paragraphs.** (That's what `<p>` tags and CSS `margin` are for).
        * **`<hr>` (Thematic Break)**: A self-closing tag that creates a "horizontal rule" (a line). This represents a *scene change* or a topic break within a section.

* **In-Depth Example:**
    ```html
    <p>
      I'm a self-taught developer <strong>currently open to junior roles</strong>,
      and I <em>really</em> enjoy working with <code>HTML</code>, <code>CSS</code>,
      and <code>JavaScript</code>.
    </p>
    ```

* **⭐️ Class Exercise: Format Your Bio**
    1.  Go back to your bio `<p>` from Week 1.
    2.  Wrap one meaningful phrase in an `<em>` tag (something you genuinely want to emphasize).
    3.  If you mention a technology by name anywhere in your bio, wrap it in `<code>`.
    4.  Save and observe how the browser styles them differently.

---

### 3. Generic Containers (`<div>` and `<span>`)

* **Lecture & Concepts:**
    * These are the most common tags in all of HTML, but they have **no semantic meaning**.
    * They are "generic" boxes whose only purpose is to **group other elements** so you can style them with CSS or grab them with JavaScript.
    * **`<div>` (Division):**
        * A **block-level** container.
        * It's a "big box" used to group larger sections (e.g., a "card," a "post," a "sidebar," a "wrapper" for your whole page).
        * It always starts on a new line and takes up the full available width.
    * **`<span>` (Span):**
        * An **inline-level** container.
        * It's a "small box" used to group a *part* of text *inside* a block-level element (e.g., a few words, an icon, a single letter).
        * It flows with the text and does not start a new line.

* **In-Depth Example:**
    ```html
    <div class="skills-section">
      <h2>Skills</h2>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
    </div>
    ```

* **⭐️ Class Exercise: Group Your Skills**
    1.  Go back to your "Skills" section from earlier this week.
    2.  Wrap the `<h2>` and its `<ul>` in a single `<div class="skills-section">`.
    3.  Inside your "Journey" list, find your first milestone.
    4.  Wrap one key word in it in a `<span class="highlight">`.
    5.  Save. You will see **no visual change**. These tags are invisible "hooks" for CSS.

---

### Week 2: Comprehensive Assignment

**Objective:** Expand "Portfolio Home Page" with real structured content.

**Project:**
Continue working in the same `index.html` you started in Week 1 — nothing new is created from scratch this week.

**Requirements:**

1.  **Skills Section:** An `<h2>` "Skills" followed by an **unordered list** (`<ul>`) of at least 3 skills/technologies, wrapped in a `<div class="skills-section">`.
2.  **Journey Section:** An `<h2>` "My Journey" followed by an **ordered list** (`<ol>`) of at least 3 milestones.
3.  **Tools List:** An `<h2>` "Tools I Use" followed by a **description list** (`<dl>`) pairing at least 2 tools with a one-line description each.
4.  **Formatting:** Your bio paragraph from Week 1 now uses `<strong>` and/or `<em>` meaningfully — not just for decoration.
5.  **Grouping:** The Skills section is wrapped in a `<div>`; at least one word somewhere on the page uses a `<span>`.
