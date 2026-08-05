# Week 4: The DOM & Modern JS Introduction

This week is a major turning point. You move from writing code that lives in the console (the "lab") to controlling a *real webpage* (the "real world"). You'll take the `projects` array you built in Week 3 and use it to actually **render** your Featured Work section — replacing hardcoded HTML with real, data-driven markup — and you'll finally make your contact form's validators from Week 2 do something.

## Module 7: Introduction to the DOM

### 1. What is the DOM?

* **Lecture & Concepts:**
    * **DOM** stands for **D**ocument **O**bject **M**odel.
    * It's *not* your HTML file — that's a text blueprint. The DOM is the **live, interactive model** of your page that the browser builds in memory: the "actual house" built from the blueprint.
    * JavaScript doesn't read your HTML file directly — it **interacts with the DOM**.
    * The **`document` object** is your entry point to all of it.

### 2. Selecting Elements (The Modern Way)

* **Lecture & Concepts:**
    * **`document.querySelector('css-selector')`**: Returns the **first** element matching a CSS selector, or `null` if nothing matches.
    * **`document.querySelectorAll('css-selector')`**: Returns a **`NodeList`** of *every* matching element. `NodeList`s are **static** (won't auto-update) and support `.forEach()`.
    * You already used `querySelector` in Week 1 for your nav toggle — now you'll use it on your Featured Work section.

* **In-Depth Example (Selecting Your Real Work Grid):**
    ```javascript
    const workGrid = document.querySelector('.work-grid');
    const existingCards = document.querySelectorAll('.project-card');

    console.log(existingCards.length); // however many you currently have hardcoded
    ```

---

## Module 8: Manipulating the DOM

Once you've selected an element, you can change it — or build entirely new ones from your Week 3 data.

### 1. Changing Content Safely (`textContent` vs. `innerHTML`)

* **Lecture & Concepts:**
    * **`element.textContent`**: Sets *only raw text*. 100% safe — ignores any HTML tags inside the string. **Your default choice.**
    * **`element.innerHTML`**: Sets *actual HTML*. Powerful, but a **security risk (XSS)** if you ever set it using untrusted user input — a malicious visitor could inject a `<script>` tag. Since your `projects` array is data *you* wrote (not user input), it's safe to use here — but get in the habit of reaching for `textContent` by default, and only using `innerHTML` when you understand exactly what's going into it.

### 2. Classes, Not Inline Styles

* **Lecture & Concepts:**
    * **The "Bad" Way:** `element.style.color = 'red'` — adds high-specificity inline styles and mixes CSS logic into JS.
    * **The "Good" Way:** `element.classList.add/remove/toggle('class-name')` — you already did this in Week 1 with `.nav-open`. Keep doing it: let CSS own the *look*, let JS own the *state*.

### 3. Creating & Appending Elements From Real Data

* **Lecture & Concepts:**
    * **`document.createElement('tag-name')`**: Creates a new element in memory — not on the page yet.
    * **`element.append(newElement)`**: Adds it as the last child of a parent.
    * **`element.remove()`**: Removes an element from the page.
    * Putting these together with a loop over your `projects` array is exactly how real applications turn *data* into *UI*.

* **In-Depth Example (`renderProjects` — The Biggest Payoff So Far):**
    ```javascript
    const projects = [
      {
        title: "Weather App",
        description: "A React Native app that fetches live weather data.",
        tags: ["React Native", "Expo"],
        imageSrc: "assets/weather-app.png",
        featured: false
      },
      {
        title: "Task Tracker",
        description: "A Python CLI tool for tracking daily tasks.",
        tags: ["Python"],
        imageSrc: "assets/task-tracker.png",
        featured: false
      },
      {
        title: "This Portfolio",
        description: "The very site you're looking at right now.",
        tags: ["HTML", "CSS", "JavaScript"],
        imageSrc: "assets/portfolio-site.png",
        featured: true
      }
    ];

    function renderProjects(projectList) {
      const workGrid = document.querySelector('.work-grid');

      // 1. Clear whatever hardcoded HTML is currently in there
      workGrid.textContent = "";

      // 2. Build and append one .project-card per object in the array
      for (let i = 0; i < projectList.length; i++) {
        const project = projectList[i];

        const card = document.createElement('article');
        card.className = project.featured
          ? 'project-card project-card--featured'
          : 'project-card';

        const title = document.createElement('h3');
        title.className = 'project-card__title';
        title.textContent = project.title;

        const description = document.createElement('p');
        description.className = 'project-card__description';
        description.textContent = project.description;

        card.append(title, description);

        if (project.featured) {
          const badge = document.createElement('span');
          badge.className = 'project-card__badge';
          badge.textContent = 'Featured';
          card.prepend(badge);
        }

        workGrid.append(card);
      }
    }

    renderProjects(projects);
    ```
    *Notice this uses the exact BEM class names (`project-card`, `project-card__title`, `project-card--featured`) your CSS course already styled — the CSS doesn't change at all. You're just generating the same HTML shape from data instead of typing it by hand.*

* **⭐️ Class Exercise: Render Your Real Projects**
    1.  Copy your real `projects` array from Week 3 into `script.js`.
    2.  Write `renderProjects(projectList)` following the pattern above.
    3.  Call it once, on page load, and confirm your Featured Work section now looks *identical* to before — except it's generated from data.
    4.  Delete the old hardcoded `<article class="project-card">` elements from `index.html`'s HTML — `.work-grid` should now start empty in the markup.

---

## Module 9: Events

### 1. Event Listeners & the `event` Object

* **Lecture & Concepts:**
    * An **event** is an action in the browser — a click, a key press, a form submission.
    * **`element.addEventListener('event-name', callbackFunction)`**: The standard, modern way to respond to events (you used this in Week 1 for `'click'`).
    * **The `event` Object:** Automatically passed to your callback. **`event.target`** is the actual element the event happened on. **`event.preventDefault()`** stops a form's default "reload the page and send data" behavior — critical for handling submission yourself.

* **In-Depth Example (Wiring Your Real Contact Form):**
    ```javascript
    const contactForm = document.querySelector('form');
    const emailInput = document.getElementById('visitor-email');
    const messageInput = document.getElementById('message');
    const errorMessage = document.querySelector('#error-message'); // add this <p> to contact.html

    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // stop the page from reloading

      const email = emailInput.value;
      const message = messageInput.value;

      if (!isValidEmail(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        return;
      }

      if (!isMessageLongEnough(message)) {
        errorMessage.textContent = "Your message needs to be at least 20 characters.";
        return;
      }

      errorMessage.textContent = "";
      console.log("Form is valid! (We'll actually send it in Week 6.)");
    });
    ```
    *Notice `isValidEmail` and `isMessageLongEnough` are the exact functions you wrote in Week 2 — they finally get called for real.*

### 2. Event Delegation

* **Lecture & Concepts:**
    * Adding a separate `click` listener to every single `.project-card` doesn't scale — especially since `renderProjects()` can *recreate* those cards at any time (you'll do this again in Week 5 and Week 6).
    * **Event Delegation:** Add **ONE** listener on the *parent* (`.work-grid`) instead. Because of event **bubbling**, a click on any child (even one created after the listener was added) "bubbles up" to the parent, where you can inspect `event.target` to see exactly what was clicked.

* **In-Depth Example:**
    ```javascript
    const workGrid = document.querySelector('.work-grid');

    workGrid.addEventListener('click', function(event) {
      // .closest() walks UP from whatever was clicked to find the nearest .project-card
      const card = event.target.closest('.project-card');
      if (!card) return; // click landed outside any card

      const titleEl = card.querySelector('.project-card__title');
      console.log(`You clicked on: ${titleEl.textContent}`);
    });
    ```

* **⭐️ Class Exercise: Delegate a Click Listener**
    1.  Add ONE `click` listener on `.work-grid`.
    2.  Use `event.target.closest('.project-card')` to find which card was clicked.
    3.  Log that card's title to the console.
    4.  Click several different cards and confirm each logs the correct title — even though you only wrote one listener.

---

### Week 4: Comprehensive Assignment

**Objective:** Render your real Featured Work section from data, and make your contact form's validation actually run.

**Files to Use:**
1.  `index.html` (remove the hardcoded `.project-card` articles)
2.  `contact.html` (add an `#error-message` element if you don't have one)
3.  `script.js`

**Requirements:**

1.  **`renderProjects(projectList)`:** Clears `.work-grid` and builds one `.project-card` per object in your Week 3 `projects` array, using `createElement`/`textContent`/`.append()` — matching the exact BEM classes your CSS already styles.
2.  **Call It:** Run `renderProjects(projects)` once when the script loads.
3.  **Contact Form Validation:** Wire the real `submit` event: `event.preventDefault()`, then call your Week 2 validator functions (`isValidEmail`, `isMessageLongEnough`, `isContactMethodChosen`) and show the first failing message in an `#error-message` element (or a success message if all pass).
4.  **Event Delegation:** Add exactly ONE click listener on `.work-grid` (not on individual cards) that logs the clicked project's title using `event.target.closest('.project-card')`.
5.  **Nav Toggle Check:** Confirm your Week 1 nav toggle still works now that you understand *why* `classList.toggle` was the right call.

**Bonus Challenge:** Add a "Featured" badge conditionally (only for `project.featured === true`) using the pattern shown in the `renderProjects` example — confirm it renders on exactly one card.
