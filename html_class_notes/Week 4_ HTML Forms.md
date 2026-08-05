# Week 4: HTML Forms

This week, we turn our static websites into dynamic, two-way conversations. Forms are the primary way users interact with websites—whether it's logging in, searching Google, buying a product, or signing up for a newsletter. Building them correctly is essential for usability and accessibility.

---

## Module 6: Building Forms

### 1. The Conversation Starter: `<form>`

* **Lecture & Concepts:**
    * The `<form>` element is the container for all interactive controls. It tells the browser: "Everything inside here is data that belongs together."
    * **How Forms Work:**
        1.  User types data into inputs.
        2.  User hits "Submit".
        3.  The browser bundles the data up and sends it to a **Server**.
    * **Key Attributes:**
        * **`action`**: The URL *where* the data is sent (e.g., `/login.php`). If left empty, it submits to the current page.
        * **`method`**: *How* the data is sent.
            * **`GET`**: Data is appended to the URL (e.g., `search?q=cats`). Use this for **search bars** or retrieving data. Never use for passwords!
            * **`POST`**: Data is sent invisibly in the request body. Use this for **passwords**, credit cards, or changing data.

* **In-Depth Example:**
    ```html
    <form action="/api/login" method="POST">
      </form>

    <form action="/search" method="GET">
       </form>
    ```


---

### 2. The `<input>` Element & The `name` Attribute

* **Lecture & Concepts:**
    * **`<input>`**: The most versatile self-closing tag. Its behavior changes entirely based on the `type` attribute.
    * **The `name` Attribute (CRITICAL):** This is the most common beginner mistake.
        * The `id` is for CSS/JS.
        * The `name` is **for the server**.
        * If an input has no `name`, the server will **not receive the data**.
        * *Analogy:* If you mail a letter without writing what's inside on the form, the receiver just gets a blank envelope.
    * **Common Types:**
        * `type="text"`: Standard one-line text.
        * `type="password"`: Hides characters with dots (•••••).
        * `type="email"`: Validates that the text looks like an email.

* **In-Depth Example:**
    ```html
    <input type="text" name="username" placeholder="Enter your username">

    <input type="password" name="user_pass">
    ```

---

### 3. Labels: The Key to Accessibility

* **Lecture & Concepts:**
    * You must never place an input on a page without a label.
    * **`<label>`**: This tag creates a caption for an item.
    * **The `for` Attribute:** This connects the label to the input. The value of `for` must match the `id` of the input.
    * **Why is this critical?**
        1.  **Screen Readers:** When a blind user focuses on the input, the reader reads the linked label. Without it, they just hear "Edit text."
        2.  **Usability:** Clicking the *text* of the label will automatically focus the input box (great for mobile users with "fat fingers").

* **In-Depth Example (Explicit Association):**
    ```html
    <label for="user-email">Email Address:</label>
    <input type="email" id="user-email" name="email">
    ```

* **⭐️ Class Exercise: Build a Newsletter Sign-up**
    1.  Create a `<form>`.
    2.  Add a `<label>` that says "Subscribe to our news:".
    3.  Add an `<input>` for email.
    4.  **Crucial Step:** Link them using `for` and `id`.
    5.  Add a `name="newsletter_email"` to the input.
    6.  Add a placeholder like "you@example.com".

---
---

## Module 7: Advanced Form Controls

### 1. Buttons: Starting the Engine

* **Lecture & Concepts:**
    * **`<button>`**: The modern way to create buttons. It can contain icons and text.
    * **Types of Buttons:**
        * `type="submit"` (Default): Submits the form data to the server.
        * `type="reset"`: Clears the form (rarely used now due to bad UX).
        * `type="button"`: A "dumb" button. It does nothing until you add JavaScript.

* **In-Depth Example:**
    ```html
    <form>
      <button type="submit">Log In</button>

      <button type="button">Show Password</button>
    </form>
    ```

### 2. Choice Elements: Radio vs. Checkbox

* **Lecture & Concepts:**
    * **Radio Buttons (`type="radio"`):**
        * Used when the user must select **exactly one** option from a list.
        * **The Grouping Trick:** To make radios mutually exclusive (only one selectable at a time), they must all share the **exact same `name`**.
    * **Checkboxes (`type="checkbox"`):**
        * Used when the user can select **zero, one, or many** options.
        * Each checkbox is independent.

* **In-Depth Example:**
    ```html
    <p>Choose your shipping method (Pick ONE):</p>

    <label>
      <input type="radio" name="shipping" value="standard" checked>
      Standard (3-5 days)
    </label>

    <label>
      <input type="radio" name="shipping" value="express">
      Express (1 day)
    </label>

    <hr>

    <p>Extras (Pick ANY):</p>
    <label>
      <input type="checkbox" name="gift_wrap"> Gift Wrap
    </label>
    <label>
      <input type="checkbox" name="insurance"> Shipping Insurance
    </label>
    ```

### 3. Dropdowns & Textareas

* **Lecture & Concepts:**
    * **`<select>`**: Creates a dropdown menu. Great for saving space.
        * **`<option>`**: The items inside the list.
        * **`value` attribute**: The data sent to the server (e.g., `value="US"`). The text inside the tag is what the user sees (e.g., "United States").
    * **`<textarea>`**: A multi-line text input (for bios, comments).
        * It is **not** self-closing. `<textarea>Default text here</textarea>`.

* **In-Depth Example:**
    ```html
    <label for="country">Country:</label>
    <select id="country" name="country">
      <option value="">--Please choose an option--</option>
      <option value="US">United States</option>
      <option value="CA">Canada</option>
      <option value="UK">United Kingdom</option>
    </select>

    <label for="bio">Biography:</label>
    <textarea id="bio" name="bio" rows="5"></textarea>
    ```

### 4. Structure (`<fieldset>`) & Validation

* **Lecture & Concepts:**
    * **`<fieldset>`**: Used to group related inputs (like "Billing Address" vs "Shipping Address").
    * **`<legend>`**: The title for the fieldset.
    * **HTML5 Validation**: The browser can check your data *before* sending it.
        * **`required`**: Prevents submission if empty.
        * **`minlength="8"`**: Requires at least 8 characters.
        * **`pattern`**: Allows regex checks (advanced).

* **In-Depth Example:**
    ```html
    <form action="/register" method="POST">
      <fieldset>
        <legend>Account Security</legend>

        <label for="pass">Password:</label>
        <input type="password" id="pass" name="password" required minlength="8">

      </fieldset>

      <button type="submit">Create Account</button>
    </form>
    ```

* **⭐️ Class Exercise: Pizza Order**
    1.  Create a `<fieldset>` with a `<legend>` of "Build Your Pizza".
    2.  Add Radio buttons for Size (Small, Medium, Large). Remember to share the `name`!
    3.  Add Checkboxes for Toppings (Pepperoni, Mushrooms).
    4.  Add a `<button>` to "Place Order".

---

### Week 4: Comprehensive Assignment

**Objective:** Build a complete "Conference Registration Form".

**Project:**
Create a single `index.html` file containing a robust registration form. This form should collect personal details, preferences, and payment info (mockup).

**Requirements:**

1.  **Form Setup:** Use `<form>` with `method="POST"`.
2.  **Personal Info (Fieldset 1):**
    * Inputs for `First Name`, `Last Name`, and `Email`.
    * Make them all **required**.
    * Use proper `<label>` tags linked with `for`/`id`.
3.  **Ticket Options (Fieldset 2):**
    * A `<select>` dropdown for "Ticket Type" (options: General Admission, VIP, Student).
    * Radio buttons for "T-Shirt Size" (S, M, L, XL).
    * Checkboxes for "Dietary Restrictions" (Vegetarian, Gluten-Free, Nut Allergy).
4.  **Bio:**
    * A `<textarea>` for "Why do you want to attend?"
5.  **Submission:**
    * A styled `<button type="submit">`.
6.  **Validation:**
    * The email must have `type="email"`.
    * The bio must have a `minlength` of 20 characters.

**Semantic Bonus:** Wrap the form in a `<main>` tag and give the page a `<header>` with an `<h1>` title.
