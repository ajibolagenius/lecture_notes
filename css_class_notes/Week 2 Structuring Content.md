# Week 2: Structuring Content

This week is all about adding richer structure to your content. You'll move beyond simple paragraphs and learn to group content into lists, format text with semantic meaning, and use generic containers (`<div>` and `<span>`) to prepare your document for styling with CSS.

---

## Module 3: Lists & Text Formatting

### 1. Grouping Content with Lists

* **Lecture & Concepts:**
    HTML gives us three ways to group related items into lists. Choosing the right one is about *semantics* (the meaning of the content).

    * **`<ul>` (Unordered List):**
        * This is for a list of items where the **order does not matter**.
        * It's a "bullet point" list.
        * It uses `<ul>` as the container and `<li>` (List Item) for each item.
        * **Use Case:** Navigation menus, feature lists, ingredients.

    * **`<ol>` (Ordered List):**
        * This is for a list of items where the **order *does* matter**.
        * It's a "numbered" list (1, 2, 3...).
        * It uses `<ol>` as the container and `<li>` for each item.
        * **Use Case:** Step-by-step instructions, "Top 10" rankings, legal documents.

    * **`<dl>` (Description List):**
        * The least common, but very useful. This is a list of **key-value pairs**.
        * It uses `<dl>` (Description List) as the container.
        * It has two children: `<dt>` (Description Term) and `<dd>` (Description Definition).
        * **Use Case:** Glossaries, dictionaries, product specifications (e.G., "Color: Red").

* **In-Depth Example (All Three Lists):**
    ```html
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about.html">About</a></li>
      <li><a href="/contact.html">Contact</a></li>
    </ul>
    
    <ol>
      <li>Boil water.</li>
      <li>Grind coffee beans.</li>
      <li>Pour water over beans in a filter.</li>
      <li>Wait 4 minutes.</li>
    </ol>
    
    <dl>
      <dt>HTML</dt>
      <dd>HyperText Markup Language. The skeleton of all websites.</dd>
      
      <dt>CSS</dt>
      <dd>Cascading Style Sheets. The "skin" or style of a website.</dd>
    </dl>
    ```

* **⭐️ Class Exercise: Create a "Shopping List"**
    1.  Create an `<h1>` that says "My Shopping List".
    2.  Create an `<h2>` for "Fruits" and add an **unordered list** (`<ul>`) of 3-4 fruits.
    3.  Create an `<h2>` for "Tasks" and add an **ordered list** (`<ol>`) of 3-4 tasks you need to do (e.g., "Go to store," "Pay bills").
    4.  Save and check your work.

---

### 2. Formatting Text (Inline Semantics)

* **Lecture & Concepts:**
    * How do you make one word bold or italic? You *don't* just "make it bold." You give it *meaning*, and the browser's default style is to make it bold. This is a core concept: **Semantics over Style**.
    * **`<strong>` vs. `<b>`:**
        * **`<strong>`**: Use this tag to indicate that the text has **serious importance, seriousness, or urgency**. Screen readers will announce this with a different tone. Browsers *style* it as bold by default. (e.g., "**Warning:** Do not touch.")
        * **`<b>` (Bold)**: Use this tag to draw attention to text *without* implying extra importance. It's purely a visual style. (e.g., "The keyword in this sentence is **HTML**.").
        * **Rule:** Always default to `<strong>`. Only use `<b>` if you're 100% sure it's just for visual style.

    * **`<em>` vs. `<i>`:**
        * **`<em>` (Emphasis)**: Use this tag to add **stress or emphasis** to a word, changing the meaning of the sentence. Screen readers will change their inflection. Browsers *style* it as italic. (e.G., "You *must* be joking.")
        * **`<i>` (Italic)**: Use this to mark text that is in an "alternate voice," such as a technical term, a foreign phrase, or a thought. (e.g., "The Latin term is *et cetera*.").
        * **Rule:** Always default to `<em>`.

    * **Other Useful Tags:**
        * **`<code>`**: Marks a snippet of computer code (e.g., `const x = 10;`).
        * **`<pre>` (Preformatted Text)**: Wraps a *block* of text (often with `<code>` inside) and tells the browser to respect all spaces and line breaks. Essential for displaying code blocks.
        * **`<br>` (Line Break)**: A self-closing tag that forces a new line. Use this *sparingly*! (e.g., inside a poem or an address). **Do not use `<br>` to create space between paragraphs.** (That's what `<p>` tags and CSS `margin` are for).
        * **`<hr>` (Thematic Break)**: A self-closing tag that creates a "horizontal rule" (a line). This represents a *scene change* or a topic break within a section.

* **In-Depth Example:**
    ```html
    <p>
      In JavaScript, a variable is declared with the <code>let</code> or 
      <code>const</code> keyword. You <em>must</em> use <code>const</code> 
      if the variable will not be reassigned.
    </p>
    
    <p>
      <strong>Warning:</strong> Be careful when using <code><pre></code>,
      as it will respect *all* whitespace, like this:
    </p>
    
    <pre>
      <code>
    function greet() {
      console.log("Hello!");
    }
      </code>
    </pre>
    
    <p>
      The term for this is <i>What You See Is What You Get</i>.
    </p>
    ```

* **⭐️ Class Exercise: Format a Paragraph**
    1.  Create a new `<p>` tag.
    2.  Write a sentence: "To make a new variable, I use the 'let' keyword. I must remember to add a semicolon."
    3.  Wrap the word "must" in an `<em>` tag.
    4.  Wrap the word "let" in a `<code>` tag.
    5.  Save and observe how the browser styles them differently.

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
    <div class="product-card">
      <h2>SuperWidget</h2>
      
      <p>
        This is the best widget ever. Get it now for 
        <span class="price">$19.99</span>!
      </p>
    </div>
    ```

* **⭐️ Class Exercise: Group Your Content**
    1.  Go back to your "Shopping List" exercise.
    2.  Wrap *everything* (from the `<h1>` to the last `</ol>`) in a single `<div class="list-wrapper">`.
    3.  Inside your ordered list ("Tasks"), find your first task.
    4.  Wrap the *first word* of the first task in a `<span class="priority">`.
    5.  Save. You will see **no visual change**. These tags are invisible "hooks" for CSS.

---

### Week 2: Comprehensive Assignment

**Objective:** Build a "Recipe Page" using all the structuring and formatting tags you learned this week.

**Project:**
Create a single `index.html` file that details a recipe. This file should be well-structured and semantically correct.

**Requirements:**

1.  **Main Title:** The page must have a single `<h1>` for the recipe's name (e.g., "Classic Tomato Pasta").
2.  **Image:** Include an `<img>` of the finished dish (with `alt` text!).
3.  **Description:** Include a `<p>` tag describing the dish. Inside this paragraph, use `<strong>` to highlight an important fact (e.g., "**Ready in 30 minutes**").
4.  **Ingredients Section:**
    * Add an `<h2>` that says "Ingredients".
    * Below it, add an **unordered list** (`<ul>`) of at least 5 ingredients.
    * One of the ingredients should use an `<em>` tag (e.g., "Two *large* cloves of garlic").
5.  **Instructions Section:**
    * Add an `<h2>` that says "Instructions".
    * Below it, add an **ordered list** (`<ol>`) of at least 4 steps.
6.  **Notes Section:**
    * Add an `<h2>` that says "Chef's Notes".
    * Add a **description list** (`<dl>`) with at least two terms and definitions. (e.g., `<dt>Al Dente</dt><dd>...cooking pasta until it is 'firm to the bite'.</dd>`).
7.  **Code Snippet (Bonus):**
    * Add a paragraph that says: "To save this recipe, you can run the `saveRecipe()` function in the console."
    * Correctly format `saveRecipe()` as inline code.
8.  **Grouping:**
    * Wrap the entire "Ingredients" section (the `<h2>` and `<ul>`) in a `<div class="ingredients-list">`.
    * Wrap the entire "Instructions" section (the `<h2>` and `<ol>`) in a `<div class="instructions-list">`.