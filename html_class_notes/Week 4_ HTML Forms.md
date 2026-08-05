# Week 4: HTML Forms

This week, we turn our static portfolio into a dynamic, two-way conversation. Forms are the primary way users interact with websites — and your portfolio needs a real way for people to reach you. This week you'll build `contact.html`, the third page of your site.

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
        * **`action`**: The URL *where* the data is sent (e.g., `/send-message`). If left empty, it submits to the current page.
        * **`method`**: *How* the data is sent.
            * **`GET`**: Data is appended to the URL. Use this for **search bars** or retrieving data. Never use for passwords!
            * **`POST`**: Data is sent invisibly in the request body. Use this for **contact form messages**, passwords, or changing data.

* **In-Depth Example:**
    ```html
    <form action="#" method="POST">
      <!-- inputs go here -->
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
        * `type="email"`: Validates that the text looks like an email.

* **In-Depth Example:**
    ```html
    <input type="text" name="visitor_name" placeholder="Your name">

    <input type="email" name="visitor_email" placeholder="you@example.com">
    ```

* Create `contact.html` in your `portfolio` folder now (reuse the boilerplate + header/nav/footer from Week 3), and start the `<form>` with a `name` and `email` input.

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
    <label for="visitor-email">Email Address:</label>
    <input type="email" id="visitor-email" name="visitor_email">
    ```

* **⭐️ Class Exercise: Label Your Contact Fields**
    1.  In `contact.html`, add `<label>`s for both your `name` and `email` inputs.
    2.  **Crucial Step:** Link each one using `for` and a matching `id`.

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
    <button type="submit">Send Message</button>
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
    <p>Preferred contact method (pick ONE):</p>

    <label>
      <input type="radio" name="contact_method" value="email" checked>
      Email
    </label>

    <label>
      <input type="radio" name="contact_method" value="phone">
      Phone
    </label>
    ```

### 3. Dropdowns & Textareas

* **Lecture & Concepts:**
    * **`<select>`**: Creates a dropdown menu. Great for saving space.
        * **`<option>`**: The items inside the list.
        * **`value` attribute**: The data sent to the server (e.g., `value="job"`). The text inside the tag is what the user sees.
    * **`<textarea>`**: A multi-line text input (for messages, comments).
        * It is **not** self-closing. `<textarea>Default text here</textarea>`.

* **In-Depth Example:**
    ```html
    <label for="reason">Reason for contact:</label>
    <select id="reason" name="reason">
      <option value="">--Please choose an option--</option>
      <option value="job">Job Opportunity</option>
      <option value="collab">Collaboration</option>
      <option value="hi">Just Saying Hi</option>
    </select>

    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="5"></textarea>
    ```

### 4. Structure (`<fieldset>`) & Validation

* **Lecture & Concepts:**
    * **`<fieldset>`**: Used to group related inputs.
    * **`<legend>`**: The title for the fieldset.
    * **HTML5 Validation**: The browser can check your data *before* sending it.
        * **`required`**: Prevents submission if empty.
        * **`minlength="8"`**: Requires at least N characters.
        * **`pattern`**: Allows regex checks (advanced).

* **In-Depth Example:**
    ```html
    <form action="#" method="POST">
      <fieldset>
        <legend>Get In Touch</legend>

        <label for="visitor-name">Name:</label>
        <input type="text" id="visitor-name" name="visitor_name" required>

        <label for="visitor-email">Email:</label>
        <input type="email" id="visitor-email" name="visitor_email" required>
      </fieldset>

      <button type="submit">Send Message</button>
    </form>
    ```

* **⭐️ Class Exercise: Build the Rest of the Contact Form**
    1.  Wrap your `name`/`email` inputs in a `<fieldset>` with a `<legend>` of "Get In Touch".
    2.  Add a radio group for "Preferred Contact Method" (Email/Phone). Remember to share the `name`!
    3.  Add a `<select>` for "Reason for Contact" (Job Opportunity/Collaboration/Just Saying Hi).
    4.  Add a `<textarea>` for the message, and a `<button type="submit">` to "Send Message".

---

### Week 4: Comprehensive Assignment

**Objective:** Build "Portfolio Contact Form" — the third and final page of your portfolio's core structure.

**Project:**
Finish `contact.html`, started earlier this week, with a robust, accessible contact form.

**Requirements:**

1.  **Form Setup:** Use `<form>` with `method="POST"`.
2.  **Contact Details (Fieldset):**
    * Inputs for `Name` and `Email`, both **required**, with `type="email"` on the email field.
    * Proper `<label>` tags linked with `for`/`id`.
3.  **Preferences:**
    * A `<select>` dropdown for "Reason for Contact" (Job Opportunity, Collaboration, Just Saying Hi).
    * Radio buttons for "Preferred Contact Method" (Email/Phone).
4.  **Message:**
    * A `<textarea>` for "Your Message", with a `minlength` of 20 characters.
5.  **Submission:**
    * A `<button type="submit">` labeled "Send Message".
6.  **Navigation:** Update your `<nav>` on all 3 pages (`index.html`, `contact.html`, and the placeholder `about.html` from Week 1's bonus) so every page links to every other page.

**Semantic Bonus:** Confirm `contact.html` reuses the exact same `<header>`/`<nav>`/`<footer>` structure you built in Week 3 — a portfolio's pages should feel like one consistent site, not three unrelated documents.
