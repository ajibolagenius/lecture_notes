# Week 6: Asynchronous JavaScript & The Future

This week, we tackle one of the most challenging but essential parts of JavaScript: **Asynchrony**. The web is not static; it requires fetching data, waiting for timers, and handling user interactions without freezing the screen. You will move from simple, line-by-line code execution to handling operations that happen "in the future."

---

## Module 12: Asynchronous JavaScript Concepts

### 1. Synchronous vs. Asynchronous

* **Lecture & Concepts:**
    * **Synchronous (Sync):** This is how you've written code so far. It is **blocking**. Code executes line-by-line. Line 2 cannot start until Line 1 finishes.
        * *Analogy:* A single-lane drive-thru. The car behind cannot order until the car in front has received their food and left. If the order takes 10 minutes, everyone waits 10 minutes.
    * **Asynchronous (Async):** This is **non-blocking**. You can start a task, move on to other code, and come back to the first task when it's done.
        * *Analogy:* A sit-down restaurant. The waiter takes Table 1's order and sends it to the kitchen. While the kitchen cooks (the "async" operation), the waiter doesn't stand there waiting; they go take Table 2's order. The kitchen "calls back" the waiter when the food is ready.

* **In-Depth Example:**
    ```javascript
    // --- Synchronous (Blocking) ---
    console.log("1. Customer orders soup.");
    console.log("2. Chef cooks soup (imagine this takes 5 seconds)...");
    // In sync code, the browser freezes here for 5 seconds!
    console.log("3. Soup is served.");

    // --- Asynchronous (Non-Blocking) ---
    console.log("1. Customer orders soup.");

    // setTimeout simulates an async operation (like a server request)
    setTimeout(() => {
      console.log("2. (5 seconds later) Chef finishes cooking soup.");
    }, 5000);

    console.log("3. Waiter takes next table's order.");

    // Output:
    // 1. Customer orders soup.
    // 3. Waiter takes next table's order.
    // ... (5 seconds pass) ...
    // 2. (5 seconds later) Chef finishes cooking soup.
    ```

### 2. The Event Loop (High-Level)

* **Lecture & Concepts:**
    * JavaScript is **Single-Threaded**. It can technically only do *one thing at a time*. So how does it multitask?
    * **The Call Stack:** Where JS tracks what function is currently running.
    * **Web APIs:** When you do something async (like `setTimeout` or `fetch`), JS hands that task off to the browser (Web APIs). The browser handles the timer or the network request in the background.
    * **The Task Queue:** When the browser finishes the task, it puts the callback function into a "queue" (line).
    * **The Event Loop:** This is the traffic cop. It constantly checks: *"Is the Call Stack empty?"* If yes, it takes the first item from the Task Queue and pushes it onto the Stack to run.


### 3. Callbacks & "Callback Hell"

* **Lecture & Concepts:**
    * In the old days, we handled async tasks using **Callbacks**: passing a function into another function to run *later*.
    * **The Problem:** If you need to do 3 async things in a row (e.g., Login -> Get User Data -> Get Recent Posts), you have to nest callbacks inside callbacks.
    * This creates a pyramid shape in your code known as **"Callback Hell"**. It is hard to read and debug.

* **In-Depth Example (Callback Hell):**
    ```javascript
    // Imagine these are network requests
    loginUser(email, password, (user) => {
        console.log("User logged in");

        getUserData(user.id, (profile) => {
            console.log("Profile received");

            getRecentPosts(profile.username, (posts) => {
                console.log("Posts received");
                // This "pyramid of doom" keeps growing rightward...
            });
        });
    });
    ```

---

## Module 13: Promises

Promises were invented to solve Callback Hell. They provide a cleaner, flatter way to handle async operations.

### 1. What is a Promise?

* **Lecture & Concepts:**
    * A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation.
    * **Analogy:** You order a custom burger. The cashier gives you a **buzzer**.
        * The buzzer is the **Promise**. You don't have the burger yet, but the buzzer *promises* you will get a result eventually.
    * **3 States of a Promise:**
        1.  **Pending:** The burger is cooking. (The operation is in progress).
        2.  **Fulfilled (Resolved):** The buzzer goes off. You get your burger. (Operation successful).
        3.  **Rejected:** The kitchen ran out of meat. You get an error message. (Operation failed).

### 2. Creating & Consuming Promises

* **Lecture & Concepts:**
    * **Producing Code:** Code that does something async and returns a Promise.
    * **Consuming Code:** Code that waits for the Promise (`.then`, `.catch`).
    * **`.then(data => ...)`**: Runs if the promise is **Resolved**.
    * **`.catch(error => ...)`**: Runs if the promise is **Rejected**.
    * **`.finally(() => ...)`**: Runs **always**, regardless of the outcome (good for cleanup, like hiding a loading spinner).

* **In-Depth Example:**
    ```javascript
    // 1. PRODUCING code (Creating a Promise)
    const orderBurger = new Promise((resolve, reject) => {
      const isKitchenOpen = true;

      if (isKitchenOpen) {
        // Simulate cooking time
        setTimeout(() => {
          resolve("🍔 Here is your burger!"); // Success!
        }, 2000);
      } else {
        reject("❌ Sorry, the kitchen is closed."); // Failure!
      }
    });

    // 2. CONSUMING code (Using the Promise)
    console.log("Ordering burger...");

    orderBurger
      .then((burger) => {
        console.log(burger); // Runs only if successful
        console.log("Time to eat!");
      })
      .catch((error) => {
        console.error(error); // Runs only if failed
      })
      .finally(() => {
        console.log("Leave the restaurant."); // Runs always
      });
    ```

### 3. Chaining Promises

* **Lecture & Concepts:**
    * We can fix "Callback Hell" by **chaining** `.then()` calls.
    * If a `.then()` callback returns a *new* Promise, the next `.then()` will wait for it.

* **In-Depth Example (Fixing the Pyramid):**
    ```javascript
    loginUser(email, password)
      .then(user => {
        console.log("User logged in");
        return getUserData(user.id); // Return the next promise
      })
      .then(profile => {
        console.log("Profile received");
        return getRecentPosts(profile.username); // Return the next promise
      })
      .then(posts => {
        console.log("Posts received");
      })
      .catch(error => {
        // One catch block handles errors from ANY step above!
        console.error("Something went wrong:", error);
      });
    ```

---

## Module 14: Async/Await (ES7+)

Async/Await is **syntactic sugar** built on top of Promises. It makes asynchronous code look and behave like synchronous code, making it much easier to read.

### 1. The `async` and `await` Keywords

* **Lecture & Concepts:**
    * **`async`**: Placed before a function declaration. It forces the function to automatically return a Promise.
    * **`await`**: Can *only* be used inside an `async` function. It tells JS to **pause** the execution of that function until the Promise is resolved.
    * **Why use it?** It removes the need for `.then()` chains and callback functions.

* **In-Depth Example:**
    ```javascript
    // The Promise-based function (helper)
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // The Async Function
    async function kitchenProcess() {
      console.log("1. Start cooking...");

      // The code PAUSES here for 2 seconds, but doesn't block the browser!
      await wait(2000);

      console.log("2. Chop vegetables...");
      await wait(1000);

      console.log("3. Serve dish!");
      return "Done";
    }

    kitchenProcess();
    console.log("This runs BEFORE the cooking finishes because 'kitchenProcess' is async!");
    ```

### 2. Error Handling with `try...catch`

* **Lecture & Concepts:**
    * Since we don't have `.catch()` chained to the end, we use standard JavaScript `try...catch` blocks to handle errors in async functions.
    * This allows you to handle network errors just like you handle syntax errors.

* **In-Depth Example:**
    ```javascript
    async function getData() {
      try {
        const user = await loginUser("alice", "password");
        const profile = await getUserData(user.id);
        console.log(profile);
      } catch (error) {
        // This catches errors from loginUser OR getUserData
        console.error("Error fetching data:", error);
        alert("Sorry, could not log you in.");
      }
    }
    ```

---

## Module 15: Making API Calls

### 1. What is an API?

* **Lecture & Concepts:**
    * **API** stands for **Application Programming Interface**.
    * In web dev, it usually refers to a **REST API**: a server that provides data (usually in JSON format) when you send it a request.
    * **Analogy:** The Menu. You (the Client) look at the menu (API Documentation). You ask the waiter (HTTP Request) for the Steak (Data). The kitchen (Server) prepares it and the waiter brings it back (Response).

### 2. The `fetch()` API

* **Lecture & Concepts:**
    * `fetch()` is the modern, built-in browser method for making network requests.
    * It returns a **Promise**.
    * **The Two-Step Process:**
        1.  `fetch()` returns a `Response` object (which contains headers, status code, etc., but not the body yet).
        2.  You must call `.json()` on the response to parse the actual data. `.json()` *also* returns a Promise.

* **In-Depth Example (Using a public API):**
    ```javascript
    async function getRandomDog() {
      try {
        // 1. Make the request
        const response = await fetch("[https://dog.ceo/api/breeds/image/random](https://dog.ceo/api/breeds/image/random)");

        // 2. Check if the request was successful (Status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 3. Parse the JSON body
        const data = await response.json();

        // 4. Use the data
        console.log("Here is the dog image URL:", data.message);

      } catch (error) {
        console.error("Fetch failed:", error);
      }
    }

    getRandomDog();
    ```


---

### ⭐️ Class Exercise: The Coffee Shop Simulation

**Objective:** Convert legacy callback code into modern Async/Await.

**Scenario:** You have three functions that simulate a coffee order. Currently, they use `setTimeout` with callbacks. Your job is to modernize them.

**Step 1: The "Legacy" Code (Do not write this, just analyze it):**
```javascript
// Old way
function grindBeans(callback) {
  setTimeout(() => {
    console.log("Beans ground.");
    callback();
  }, 1000);
}
function boilWater(callback) {
  setTimeout(() => {
    console.log("Water boiled.");
    callback();
  }, 1500);
}
function pourCoffee(callback) {
  setTimeout(() => {
    console.log("Coffee poured. Enjoy!");
    callback();
  }, 500);
}

// Usage (Callback Hell)
grindBeans(() => {
  boilWater(() => {
    pourCoffee(() => {
      console.log("Done!");
    });
  });
});
```

**Step 2: Your Task**
1. Refactor `grindBeans`, `boilWater`, and `pourCoffee` to return Promises instead of taking callbacks.

2. Write an `async function makeCoffee()` that `awaits` each step in order.

3. Wrap it in a `try...catch` block (simulate an error if you want!).

4. Call `makeCoffee()`.

---
---

### Week 6: Comprehensive Final Assignment

**Objective:** Build a "Movie Search App" using the OMDb API (or similar).

**Project:** Create an app where a user can type a movie name, click search, and see the movie poster, title, year, and plot.

**Files to Create:**
1. `index.html`
2. `style.css`
3. `script.js`

**Requirements:**
1. **API Key:** You will need a free API key from OMDb API. (Or use a mock data function if internet is restricted).

2. **HTML:**
* An `<input>` for the search term.
* A `<button>` to submit.
* A `<div id="movie-container">` to display the result.

3. **JavaScript**:
* Use `const` variables to select DOM elements.
* Add a 'click' event listener to the button.
* Create an async function `fetchMovie(title)`.
* Inside the function, use `fetch()` with template literals: `https://www.omdbapi.com/?t=${title}&apikey=YOUR_KEY`.
* Handle errors: If the movie isn't found (API returns `Error: "Movie not found!"`), display a friendly message to the user.
* If found, inject HTML into the container displaying the `Poster`, `Title`, `Year`, and `Plot`.

4 **Loading State**: Show a "Loading..." text while the data is fetching, and remove it when data arrives.

```javascript
const searchBtn = document.querySelector("#search-btn");
const movieContainer = document.querySelector("#movie-container");

searchBtn.addEventListener("click", async () => {
  const title = document.querySelector("#search-input").value;
  if (!title) return;

  movieContainer.innerHTML = "<p>Loading...</p>"; // Loading state

  try {
    const res = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=YOUR_KEY_HERE`);
    const data = await res.json();

    if (data.Response === "False") {
      movieContainer.innerHTML = `<p>Movie not found!</p>`;
    } else {
      movieContainer.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <img src="${data.Poster}" alt="${data.Title}">
        <p>${data.Plot}</p>
      `;
    }
  } catch (err) {
    movieContainer.innerHTML = "<p>Something went wrong. Try again.</p>";
  }
});
```
