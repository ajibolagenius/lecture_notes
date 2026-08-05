# Week 6: Asynchronous JavaScript & The Future

This week, we tackle one of the most essential parts of JavaScript: **Asynchrony**. Your portfolio has been running entirely on data you typed by hand. This week, it fetches **real, live data** from the GitHub REST API, and your contact form gets a genuine (simulated) network submission instead of just an inline validation check.

---

## Module 12: Asynchronous JavaScript Concepts

### 1. Synchronous vs. Asynchronous

* **Lecture & Concepts:**
    * **Synchronous (Sync):** **Blocking.** Code runs line-by-line; line 2 waits for line 1.
        * *Analogy:* A single-lane drive-thru — everyone waits for the car in front.
    * **Asynchronous (Async):** **Non-blocking.** You start a task, move on, and come back when it's done.
        * *Analogy:* A sit-down restaurant — the waiter starts your order, then serves other tables while the kitchen cooks, and comes back when your food's ready.
    * Fetching your real GitHub repos is exactly this: it takes time (a network round-trip), and your page shouldn't freeze while it waits.

* **In-Depth Example:**
    ```javascript
    console.log("1. Requesting repos...");

    setTimeout(() => {
      console.log("2. (Later) Repos arrived.");
    }, 2000);

    console.log("3. Meanwhile, the rest of the page keeps working.");
    // Output order: 1, 3, then (2 seconds later) 2
    ```

### 2. The Event Loop (High-Level)

* **Lecture & Concepts:**
    * JavaScript is **single-threaded** — one thing at a time on the **Call Stack**. Async tasks (like `fetch`) get handed off to the browser's **Web APIs**, which notify JS via the **Task Queue** once done. The **Event Loop** constantly checks: "Is the Call Stack empty? If so, run the next queued callback."

### 3. Callbacks & Why We Moved Past Them

* **Lecture & Concepts:**
    * The old way: pass a function to run "later." Chaining several of these (Login → Get Profile → Get Repos) nests deeper and deeper — **"Callback Hell."** Promises (and `async`/`await`) exist specifically to fix this.

---

## Module 13: Promises & Async/Await

### 1. What is a Promise?

* **Lecture & Concepts:**
    * A **Promise** represents the eventual result of an async operation.
    * *Analogy:* Ordering at a counter and getting a buzzer. The buzzer (the Promise) doesn't have your food yet, but it *promises* a result.
    * **3 States:** **Pending** → **Fulfilled** (resolved) or **Rejected**.
    * **`.then()`** runs on success, **`.catch()`** on failure, **`.finally()`** always.

### 2. Async/Await

* **Lecture & Concepts:**
    * **`async`/`await`** is syntactic sugar over Promises that makes async code *read* like normal, synchronous code.
    * **`async function`**: automatically returns a Promise.
    * **`await`**: pauses *that function* (not the whole browser) until the Promise resolves.
    * **Error handling:** wrap `await` calls in `try...catch`.

* **In-Depth Example:**
    ```javascript
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function loadSequence() {
      console.log("Starting...");
      await wait(1000);
      console.log("1 second passed.");
      await wait(1000);
      console.log("2 seconds passed. Done!");
    }

    loadSequence();
    console.log("This logs immediately — loadSequence() doesn't block anything else.");
    ```

---

## Module 14: Making Real API Calls

### 1. The `fetch()` API

* **Lecture & Concepts:**
    * `fetch()` is the browser's built-in method for network requests. It returns a **Promise**.
    * **Two-step process:** `fetch()` resolves to a `Response` object; you then call `.json()` (which *also* returns a Promise) to get the actual data.

* **In-Depth Example (Your Real GitHub Repos):**
    ```javascript
    async function loadGitHubRepos(username) {
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);

      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`);
      }

      const repos = await res.json();
      return repos;
    }
    ```

### 2. Optional Chaining (`?.`)

* **Lecture & Concepts:**
    * Real API data is messy — fields can be `null` or missing entirely. Reaching into nested data with plain dot notation (`repo.license.name`) **crashes** if `license` is `null`.
    * **`?.`** safely short-circuits to `undefined` instead of throwing, if anything along the chain is missing.
    * Combine it with `??` (from Week 1) for a clean fallback.

* **In-Depth Example:**
    ```javascript
    const licenseName = repo.license?.name ?? "No license";
    const homepage = repo.homepage?.trim() || "No live demo yet";
    ```

### 3. Loading & Error States

* **Lecture & Concepts:**
    * Real network requests take time and can fail (offline, rate-limited, typo'd username). Always show the user *something* while waiting, and a friendly message if it goes wrong — never leave them staring at a blank section.

* **In-Depth Example (Fetching Real Repos Into Your Real Grid):**
    ```javascript
    async function loadGitHubRepos(username) {
      const workGrid = document.querySelector('.work-grid');
      workGrid.textContent = "";

      const loadingMessage = document.createElement('p');
      loadingMessage.textContent = "Loading your latest projects from GitHub...";
      workGrid.append(loadingMessage);

      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

        const repos = await res.json();

        const githubProjects = repos.slice(0, 3).map(repo => ({
          title: repo.name,
          description: repo.description ?? "No description yet.",
          tags: [repo.language ?? "Code"],
          url: repo.html_url,
          featured: false
        }));

        renderProjects(githubProjects); // your Week 4/5 function, unchanged
      } catch (error) {
        workGrid.textContent = "";
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Couldn't load projects from GitHub right now. Please try again later.";
        workGrid.append(errorMessage);
        console.error(error);
      }
    }

    loadGitHubRepos("your-github-username");
    ```
    *Notice `renderProjects()` itself needed zero changes — it doesn't care whether its data came from your hand-written Week 3 array or a live API. That's the payoff of building it around a clean data shape from the start.*

* **⭐️ Class Exercise: Fetch Your Own Real Repos**
    1.  Write `loadGitHubRepos(username)` using your *actual* GitHub username.
    2.  Show a loading message while the request is in flight.
    3.  On success, map the response into your existing `projects` shape and call `renderProjects()`.
    4.  On failure (try changing the username to something invalid to test this), show a friendly error message instead of a crash.

---

### Week 6 / Final Project: Fetch Real Projects, and Finish the Contact Form

**Objective:** Bring everything together — data modeling, DOM rendering, events, and async JavaScript — for the finished, fully-interactive portfolio.

**Files to Use:**
1.  `index.html`, `about.html`, `contact.html`
2.  `script.js`

**Requirements:**

1.  **Real GitHub Data:** `loadGitHubRepos(username)` fetches your real repos via `async`/`await`, with `try...catch` error handling and Optional Chaining for any field that might be missing (`description`, `language`).
2.  **Loading & Error States:** A visible loading message while fetching, and a friendly error message on failure — never a blank or broken section.
3.  **Reuse, Don't Duplicate:** The fetched data must flow through your *existing* `renderProjects()` function — don't write a second rendering function.
4.  **Async Contact Form:** Turn your Week 4 submit handler into an `async` function. After your Week 2 validators pass, simulate a network submission — either a fake `Promise` that resolves after ~1 second, or a real request to a mock endpoint (e.g., a service like Formspree). Show a "Sending..." state, then a success or error message.
5.  **Deployment:** Redeploy your finished, fully-interactive portfolio to the same live URL from HTML Week 7 / CSS Week 6. This is the site the React course will rebuild as a component-based SPA next.

**Bonus Challenge:** Combine your static `projects` array (Week 3) with your live GitHub repos using the spread operator (`[...projects, ...githubProjects]`), so your hand-picked "Featured" project always appears alongside your real, live repo data.

**What's Next:** You've now written a real, working vanilla-JS application spread across a global `script.js`. The React course picks up right here — but instead of one script manipulating the DOM by hand, you'll learn to describe your UI *declaratively* as components, and let a library handle the DOM updates for you.
