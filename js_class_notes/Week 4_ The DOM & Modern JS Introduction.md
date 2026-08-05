# The DOM & Modern JS Introduction

This week is a major turning point. You move from writing code in the console (the "lab") to controlling and changing a *real webpage* (the "real world"). This is where JavaScript becomes visible.

## Module 7: Introduction to the DOM

### 1. What is the DOM?

* **Lecture & Concepts:**
    * **DOM** stands for **D**ocument **O**bject **M**odel.
    * It's *not* your HTML file. Your HTML file is a text document (a blueprint).
    * The DOM is the **live, interactive model** of your webpage that the browser creates in memory. It's the "actual house" built from the blueprint.
    * The browser "reads" your HTML and builds a **tree structure** of "nodes" (objects). This tree is the DOM.
    * JavaScript does *not* read your HTML file. It **interacts with the DOM**.
    * The **`document` object** is your entry point. It's a massive, built-in object that represents the *entire* page. You will always start with `document.` to find or change something.

[Image of DOM tree structure diagram]

### 2. Selecting Elements (The "Old Way")

* **Lecture & Concepts:**
    * These methods are fast but less flexible. You will see them in older code.
    * **`document.getElementById('id-name')`**
        * The fastest and most reliable selector.
        * Grabs *one* element with a specific `id`. Returns that element object.
    * **`document.getElementsByClassName('class-name')`**
        * Grabs *all* elements with a specific class.
        * Returns an **`HTMLCollection`** (an *array-like* object).
        * **Important:** An `HTMLCollection` is **live**. If you add a new element with that class later, the collection *automatically updates*.
    * **`document.getElementsByTagName('tag-name')`**
        * Grabs *all* elements of a specific tag (e.g., `'p'`, `'li'`).
        * Also returns a **live `HTMLCollection`**.

* **In-Depth Example:**
    * **`index.html`:**
        ```html
        <h1 id="main-title">My Page</h1>
        <p class="content">This is a paragraph.</p>
        <p class="content">This is another paragraph.</p>
        ```
    * **`script.js`:**
        ```javascript
        // 1. Get by ID
        const title = document.getElementById('main-title');
        console.log(title); // <h1 id="main-title">...</h1>

        // 2. Get by Class
        const paragraphs = document.getElementsByClassName('content');
        console.log(paragraphs); // HTMLCollection [p.content, p.content]
        console.log(paragraphs[0]); // <p class="content">...</p>

        // 3. Get by Tag
        const allParagraphs = document.getElementsByTagName('p');
        console.log(allParagraphs); // HTMLCollection [p.content, p.content]
        ```

### 3. Selecting Elements (The "Modern Way" - ES6+)

* **Lecture & Concepts:**
    * These are the methods you should **use 99% of the time**. They are more flexible because they use **CSS selector syntax**.
    * **`document.querySelector('css-selector')`**
        * The "query" (search) for *one* element.
        * It returns the **very first element** that matches the CSS selector.
        * If it finds nothing, it returns `null`.
    * **`document.querySelectorAll('css-selector')`**
        * The "query" for *all* elements.
        * It returns a **`NodeList`** (another *array-like* object).
        * **Important:** A `NodeList` is **static** (not live). If you add new elements, the list does *not* update. This is usually safer and more predictable.

* **In-Depth Example:**
    * **`index.html`:**
        ```html
        <div id="container">
          <h1 id="main-title">My Page</h1>
          <p class="content">This is a paragraph.</p>
          <ul>
            <li class="item">Item 1</li>
            <li class="item important">Item 2</li>
            <li class="item">Item 3</li>
          </ul>
        </div>
        ```
    * **`script.js`:**
        ```javascript
        // 1. querySelector (gets the FIRST match)
        const firstItem = document.querySelector('.item');
        console.log(firstItem); // <li class="item">Item 1</li>

        // 2. You can use ANY CSS selector!
        const importantItem = document.querySelector('#container .important');
        console.log(importantItem); // <li class="item important">Item 2</li>

        // 3. querySelectorAll (gets ALL matches)
        const allItems = document.querySelectorAll('.item');
        console.log(allItems); // NodeList [li.item, li.item.important, li.item]

        // You can loop over a NodeList!
        allItems.forEach(item => {
          console.log(item);
        });

        // 4. What if it's not found?
        const missingEl = document.querySelector('.nonexistent');
        console.log(missingEl); // null
        ```

---
---

## Module 8: Manipulating the DOM

Once you've "selected" an element, you can change it.

### 1. Changing Content (`textContent` vs. `innerHTML`)

* **Lecture & Concepts:**
    * **`element.textContent`**
        * **What:** Gets or sets *only the raw text* inside an element.
        * **Pro:** 100% safe. It ignores all HTML tags.
        * **Use:** **This is your default choice.** Use it whenever you just want to change text.
    * **`element.innerHTML`**
        * **What:** Gets or sets the *entire HTML content* inside an element.
        * **Pro:** Powerful. You can add new elements, bold tags, etc.
        * **Con:** **SECURITY RISK.** If you set `innerHTML` with data from a user (like a comment), they could inject a malicious `<script>` tag (this is a Cross-Site Scripting or **XSS** attack). **Only use this with trusted data.**

* **In-Depth Example:**
    ```html
    <h1 id="title">Hello World</h1>
    <div id="content"></div>
    ```
    ```javascript
    // --- textContent (The Safe Way) ---
    const title = document.querySelector('#title');
    title.textContent = "New Title Here!"; // The H1 now says "New Title Here!"

    // It automatically scrubs HTML
    title.textContent = "<i>This is not italic</i>";
    // The H1 literally says "<i>This is not italic</i>"

    // --- innerHTML (The Powerful/Risky Way) ---
    const content = document.querySelector('#content');

    // This string is "trusted" because WE wrote it.
    content.innerHTML = "<h2>A New Subtitle</h2><p>This is a paragraph.</p>";
    // This works! It adds new HTML elements.
    ```

### 2. Changing Attributes (`setAttribute`, `src`, `href`)

* **Lecture & Concepts:**
    * You can change HTML attributes like `src` (for images), `href` (for links), or `alt`.
    * **Direct Properties:** Many common attributes can be changed as properties.
        * `img.src = "new-image.png";`
        * `a.href = "https://google.com";`
    * **Generic Methods:** For any attribute (especially custom ones).
        * `element.setAttribute('attribute-name', 'new-value')`
        * `element.getAttribute('attribute-name')`

* **In-Depth Example:**
    ```html
    <img id="my-image" src="profile.png" alt="A profile photo">
    <a id="my-link" href="/about">About Us</a>
    ```
    ```javascript
    const img = document.querySelector('#my-image');
    const link = document.querySelector('#my-link');

    // 1. Change the image source
    img.src = "avatar.png";

    // 2. Change the alt text
    img.alt = "A new avatar image";

    // 3. Change the link's destination
    link.href = "[https://example.com](https://example.com)";

    // 4. Using setAttribute (for a custom attribute)
    img.setAttribute('data-user-id', '12345');
    ```

### 3. Changing Styles (`.style` vs. `.classList`)

* **Lecture & Concepts:**
    * **The "Bad" Way (`element.style`):**
        * `element.style.property = 'value'`
        * **Why it's bad:**
            1.  It adds **inline styles** to your HTML (`style="color: red;"`), which have high specificity and are hard to override.
            2.  It mixes your styling logic (CSS) into your behavior logic (JS).
            3.  CSS properties are in **camelCase** (e.g., `backgroundColor`, `fontSize`).
        * **When to use it:** Only for quick tests or for dynamic values (e.g., `element.style.left = x + 'px'`).
    * **The "Good" Way (`element.classList`):**
        * **This is the modern best practice.**
        * You define your styles in CSS, and use JS to *toggle* the classes. This keeps your logic separate.
        * **`.add('class-name')`**: Adds a class.
        * **`.remove('class-name')`**: Removes a class.
        * **`.toggle('class-name')`**: Adds the class if it's missing, removes it if it's present.
        * **`.contains('class-name')`**: Checks if the element has a class (returns `true`/`false`).

* **In-Depth Example:**
    * **`style.css`:**
        ```css
        .highlight {
          background-color: yellow;
          font-weight: bold;
          border: 2px solid red;
        }
        .dark-theme {
          background-color: #333;
          color: white;
        }
        ```
    * **`index.html`:**
        ```html
        <h1 id="my-title">Hello</h1>
        <p id="my-para">Click the button.</p>
        <button id="my-button">Toggle Dark Mode</button>
        ```
    * **`script.js`:**
        ```javascript
        const title = document.querySelector('#my-title');
        const para = document.querySelector('#my-para');
        const btn = document.querySelector('#my-button');

        // The "Bad" Way
        title.style.color = 'blue';
        title.style.backgroundColor = 'lightgray'; // Note camelCase

        // The "Good" Way
        para.classList.add('highlight'); // Instantly adds 3 styles!

        // Example of .toggle()
        btn.addEventListener('click', function() {
          // This one line turns dark mode on or off
          document.body.classList.toggle('dark-theme');
        });
        ```

### 4. Creating & Appending Elements

* **Lecture & Concepts:**
    * You can create brand new elements from scratch and add them to the page.
    * **1. `document.createElement('tag-name')`**
        * Creates a new element (e.g., `document.createElement('li')`).
        * The element is created *in memory*. It's not on the page yet.
    * **2. `element.append(newElement)`**
        * The modern, easy way to add an element. It "appends" it as the *last child* of the parent.
        * (The old way was `element.appendChild(newElement)`).
    * **3. `element.remove()`**
        * Removes the element from the page.

* **In-Depth Example (Adding to a list):**
    ```html
    <ul id="my-list">
      <li>Item 1</li>
    </ul>
    ```
    ```javascript
    // 1. Select the parent
    const list = document.querySelector('#my-list');

    // 2. Create the new element
    const newItem = document.createElement('li');

    // 3. Give it content
    newItem.textContent = "Item 2";

    // 4. Add a class to it
    newItem.classList.add('important');

    // 5. Append it to the page (inside the <ul>)
    list.append(newItem);

    // Let's create and add another one
    const item3 = document.createElement('li');
    item3.textContent = "Item 3";
    list.append(item3);

    // How to remove an element
    const item1 = document.querySelector('li'); // Gets the first <li>
    // item1.remove(); // This would remove "Item 1"
    ```

---
---

### Week 4: Comprehensive Assignment

**Objective:** Build a "Dynamic Profile Card" by manipulating the DOM.

**Files to Create:**
1.  `index.html`
2.  `style.css`
3.  `script.js`

#### Part 1: The HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Week 4 Assignment</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="card">
    <img id="profile-image" src="[https://via.placeholder.com/150](https://via.placeholder.com/150)" alt="placeholder">
    <div class="card-content">
      <h2 id="profile-name">Placeholder Name</h2>
      <p id="profile-desc">
        This is a placeholder description. JavaScript will update this content.
      </p>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

#### Part 2: The CSS (`style.css`)
``` css
body {
  font-family: Arial, sans-serif;
  background-color: #f0f4f8;
  display: grid;
  place-items: center;
  min-height: 100vh;
}

.card {
  width: 300px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
}

#profile-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

#profile-name {
  margin-top: 0;
}

/*
  This is the class we will add with JavaScript!
*/
.online-status {
  font-size: 0.9rem;
  font-weight: bold;
  color: #28a745; /* green */
  margin-left: 8px;
}
```

#### Part 3: The JavaScript (`script.js`)
##### Your mission is to write this file.

```javascript
console.log("Week 4 Assignment Script Loaded!");

// --- 1. Select The Elements ---
// Select the <img> with the id 'profile-image'
const profileImg = document.querySelector('#profile-image');

// Select the <h2> with the id 'profile-name'
const profileName = document.querySelector('#profile-name');

// Select the <p> with the id 'profile-desc'
const profileDesc = document.querySelector('#profile-desc');


// --- 2. Modify The Content ---
// Change the `textContent` of `profileName` to your name
profileName.textContent = "Alice Smith";

// Change the `textContent` of `profileDesc` to a short bio
profileDesc.textContent = "I am a web developer learning about the DOM. This card was updated dynamically!";


// --- 3. Modify The Attributes ---
// Change the `src` attribute of `profileImg` to a new image URL
// (You can use this one: "[https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500](https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500)")
profileImg.src = "[https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500](https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500)";

// Change the `alt` text of `profileImg` to "A photo of a cat"
profileImg.alt = "A photo of a cat";


// --- 4. Modify The Styles (The "Good" Way) ---
// We'll create this element and add it, which is better than innerHTML.
//
// 1. Create a new <span> element
const statusSpan = document.createElement('span');

// 2. Set its textContent to " (Online)"
statusSpan.textContent = " (Online)";

// 3. Add the class "online-status" to it
statusSpan.classList.add('online-status');

// 4. Append it to the `profileName` <h2>
// This will add the span *inside* the h2, after the text.
profileName.append(statusSpan);


// --- 5. (Bonus) Modify The Styles (The "Bad" Way) ---
// Change the color of the `profileName` to a color of your choice
profileName.style.color = '#0056b3'; // A nice blue

console.log("Profile card updated!");
```

This week, we bridge the gap between abstract JavaScript logic and a real, interactive webpage. You'll learn how to "listen" for user actions (like clicks) and respond to them.

---

## Module 9: Events

### 1. Introduction to Events & `addEventListener`

* **Lecture & Concepts:**
    * **What is an Event?** An event is an action that happens in the browser, like a user clicking a button, hovering over a link, or pressing a key.
    * **What is an Event Listener?** This is the core of interactive JavaScript. It's a function that "listens" for a specific event on a specific HTML element and "fires" (runs) when that event happens.
    * **The Old Way (Avoid):** `<button onclick="...">`. This is bad because it mixes HTML and JS.
    * **The Modern Way (Best Practice): `element.addEventListener()`**
        * This is the standard, flexible, and clean way to handle events.
        * **Syntax:** `element.addEventListener('event-name', callbackFunction);`
            * **`'event-name'`**: A string for the event you're listening for (e.g., `'click'`, `'mouseover'`).
            * **`callbackFunction`**: The function to run *when* the event occurs. A "callback" is a function you pass as an argument to be "called back" later.

* **In-Depth Example (A Click Counter):**
    * **`index.html`:**
        ```html
        <button id="myButton">Click me: 0</button>
        ```
    * **`script.js`:**
        ```javascript
        // 1. Select the element
        const btn = document.querySelector('#myButton');

        // 2. Keep track of the count
        let count = 0;

        // 3. Define the function to run on click
        function handleClick() {
          count++; // Increment the count
          btn.textContent = `Click me: ${count}`; // Update the button's text
          console.log("Button was clicked!");
        }

        // 4. Attach the event listener
        btn.addEventListener('click', handleClick);

        // You can also write the function "anonymously"
        // btn.addEventListener('click', function() {
        //   count++;
        //   btn.textContent = `Click me: ${count}`;
        // });
        ```

* **⭐️ Class Exercise: Hover Me!**
    1.  Create an `index.html` with an `<h1 id="title">Hello World</h1>`.
    2.  In `script.js`, select the `h1`.
    3.  Add an event listener for the `'mouseover'` event.
    4.  When the mouse moves over the `h1`, make the callback function change the `h1.textContent` to "You hovered me!".
    5.  **Bonus:** Add another listener for `'mouseout'` that changes the text back.

---

### 2. The `event` Object & `event.preventDefault()`

* **Lecture & Concepts:**
    * **The `event` Object:** When an event listener fires, the browser *automatically* passes a special object (which we usually call `event` or `e`) as the first argument to your callback function.
    * This object contains tons of information about the event that just happened.
    * **`event.target`**: The *most useful* property. It's the **actual element** that the event occurred on. This is powerful for complex UIs.
    * **`event.preventDefault()`**: The *most important* method. Many HTML elements have a "default" browser behavior.
        * `<a>` (links) try to go to a new URL.
        * `<form>` (forms) try to reload the page and send data.
    * Calling `event.preventDefault()` **stops** that default behavior, allowing your JavaScript to take full control.

* **In-Depth Example (Stopping a Form):**
    * **`index.html`:**
        ```html
        <form id="myForm">
          <input type="text" id="myInput" placeholder="Enter text">
          <button type="submit">Submit</button>
        </form>
        <h2 id="output"></h2>
        ```
    * **`script.js`:**
        ```javascript
        const myForm = document.querySelector('#myForm');
        const myInput = document.querySelector('#myInput');
        const output = document.querySelector('#output');

        // Listen for the 'submit' event on the FORM, not the button
        myForm.addEventListener('submit', function(event) {
          // 1. STOP THE PAGE FROM RELOADING!
          event.preventDefault();

          // 2. Get the value from the input field
          const inputValue = myInput.value;

          // 3. Do something with it
          output.textContent = `You submitted: ${inputValue}`;

          // 4. Clear the input field
          myInput.value = "";
        });
        ```
* **Other Common Events:**
    * **`keydown`**: User presses a key.
    * **`keyup`**: User releases a key.
    * **`input`**: The value of an `<input>`, `<select>`, or `<textarea>` *changes*. (Great for "live search" fields).

---

### Week 4: Comprehensive Assignment

**Objective:** Build a "Simple To-Do List" application. This will combine everything from this week: selecting, creating, appending, and events.

#### `index.html` (The Skeleton)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Week 4 To-Do List</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <main>
    <h1>My To-Do List</h1>
    <form id="todo-form">
      <input type="text" id="todo-input" placeholder="Add a new task..." required>
      <button type="submit">Add</button>
    </form>

    <ul id="todo-list">
      </ul>
  </main>

  <script src="script.js"></script>
</body>
</html>
```

#### `style.css` (The Styles)
```css
/* (Basic styling to make it look decent) */
body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
main { max-width: 500px; margin: 30px auto; background: white; padding: 20px; border-radius: 8px; }
h1 { text-align: center; }
#todo-form { display: flex; }
#todo-input { flex: 1; padding: 10px; border: 1px solid #ccc; }
#todo-form button { padding: 10px; background: #007bff; color: white; border: none; cursor: pointer; }
#todo-list { list-style: none; padding: 0; margin-top: 20px; }
#todo-list li { padding: 10px; border-bottom: 1px solid #eee; }
```

#### `script.js` (Your To-Do List Logic)

``` javascript
// 1. --- SELECT THE ELEMENTS ---
// Select the form
const todoForm = document.querySelector('#todo-form');
// Select the input field
const todoInput = document.querySelector('#todo-input');
// Select the <ul> list
const todoList = document.querySelector('#todo-list');

// 2. --- ADD THE EVENT LISTENER ---
// Listen for the 'submit' event on the form
todoForm.addEventListener('submit', function(event) {

  // 3. --- STOP THE FORM'S DEFAULT BEHAVIOR ---
  event.preventDefault();

  // 4. --- GET THE VALUE FROM THE INPUT ---
  // .value gets the text. .trim() removes extra whitespace.
  const taskText = todoInput.value.trim();

  // 5. --- CHECK IF THE INPUT IS NOT EMPTY ---
  if (taskText !== "") {

    // 6. --- CREATE A NEW <li> ELEMENT ---
    const newTodo = document.createElement('li');

    // 7. --- SET ITS TEXT CONTENT ---
    newTodo.textContent = taskText;

    // 8. --- APPEND THE <li> TO THE <ul> ---
    todoList.append(newTodo);

    // 9. --- CLEAR THE INPUT FIELD ---
    todoInput.value = "";
  }
});

// --- BONUS: REMOVE TASK ON CLICK ---
// We can add an event listener to the *entire list*
todoList.addEventListener('click', function(event) {
  // Check if the thing we clicked on (event.target) was an <li>
  if (event.target.tagName === 'LI') {
    // If yes, remove it
    event.target.remove();
  }
});
```
