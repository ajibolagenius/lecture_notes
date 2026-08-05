# Week 3: Data Structures: Arrays & Objects

This week, you'll learn about the two most important building blocks for storing data in JavaScript: **Objects** and **Arrays**. Mastering these is the key to managing complex data in any application.

---

## Module 5: Objects

An **Object** is an "un-ordered" collection of related data, stored as **key-value pairs**. Think of an object as a noun (e.g., a "person," a "car," a "product") and its properties as descriptions.

### 1. Object Literals

* **Lecture & Concepts:**
    * The easiest way to create an object is using the "object literal" syntax: `{}`.
    * **Key:** The "name" of the property (a string).
    * **Value:** The data stored at that key (can be any data type: string, number, boolean, array, or even another object).
    * We use `const` to declare objects because the *reference* to the object (the "box") doesn't change, even if the contents *inside* the box do.

* **In-Depth Example:**
    ```javascript
    // A 'person' object
    const person = {
      // key: value
      firstName: "Alice",
      lastName: "Johnson",
      age: 30,
      isStudent: false,
      "favorite-color": "blue" // Quotes are needed for keys with special characters
    };

    console.log(person);
    ```
    *In the console, this will output the entire object.*

---

### 2. Accessing, Adding & Modifying Properties

* **Lecture & Concepts:**
    * You can get, set, or add properties to an object at any time. There are two ways to do this:

    * **1. Dot Notation (`.`)**
        * **What:** The easiest, most common way.
        * **When:** Use it 90% of the time.
        * **Limitation:** *Cannot* be used for keys that have spaces/hyphens or are stored in a variable.

    * **2. Bracket Notation (`[]`)**
        * **What:** A more powerful, flexible way. The key *must* be a string inside the brackets.
        * **When:**
            1.  When your key has special characters (e.g., `person["favorite-color"]`).
            2.  When your key is stored in a **variable**. This is a critical concept.

* **In-Depth Example:**
    ```javascript
    const person = {
      firstName: "Alice",
      age: 30
    };

    // 1. ACCESSING with Dot Notation
    console.log(person.firstName); // Output: "Alice"

    // 2. MODIFYING with Dot Notation
    person.age = 31;
    console.log(person.age); // Output: 31

    // 3. ADDING with Dot Notation
    person.location = "New York";
    console.log(person.location); // Output: "New York"

    // --- Bracket Notation ---

    // Accessing a key with special characters
    const car = {
      make: "Toyota",
      "model-year": 2021
    };
    // console.log(car.model-year); // This will BREAK!
    console.log(car["model-year"]); // Output: 2021

    // Accessing with a VARIABLE
    let keyToAccess = "make";
    console.log(car[keyToAccess]); // Output: "Toyota"
    // (This is the same as car["make"])
    // console.log(car.keyToAccess); // Output: undefined (it's looking for a key named "keyToAccess")
    ```

---

### 3. Object Methods & the `this` Keyword

* **Lecture & Concepts:**
    * When a function is a property of an object, it's called a **method**.
    * Methods define an object's *behavior* (what it can *do*).
    * **`this` Keyword:** Inside a method, the special keyword `this` refers to **the object itself**. It's how the object can access its *own* properties.

* **In-Depth Example:**
    ```javascript
    // We can write methods in two ways:

    // 1. Traditional function expression
    const person_old = {
      firstName: "Bob",
      greet: function() {
        // 'this' refers to the 'person_old' object
        console.log(`Hello, my name is ${this.firstName}.`);
      }
    };

    // 2. Modern ES6 Method Syntax (Cleaner, preferred)
    const person = {
      firstName: "Alice",
      lastName: "Johnson",

      // This is a method
      greet() {
        // 'this' refers to 'person'
        console.log(`Hello, my name is ${this.firstName}!`);
      },

      // Another method
      getFullName() {
        return this.firstName + " " + this.lastName;
      }
    };

    // How to CALL a method:
    person.greet(); // Output: "Hello, my name is Alice!"

    let fullName = person.getFullName();
    console.log(fullName); // Output: "Alice Johnson"
    ```

---

### 4. Nesting Objects

* **Lecture & Concepts:**
    * Real-world data is complex. An object's property can hold *another object*. This is called "nesting."
    * You access nested properties by "chaining" the dot notation.

* **In-Depth Example:**
    ```javascript
    const user = {
      id: 101,
      username: "ajohnson",
      profile: {
        firstName: "Alice",
        lastName: "Johnson",
        avatar: "image.png"
      },
      settings: {
        theme: "dark",
        notifications: true
      }
    };

    // How to access nested data:
    console.log(user.username); // "ajohnson"
    console.log(user.profile.firstName); // "Alice"
    console.log(user.settings.theme); // "dark"

    // You can modify nested data, too
    user.settings.notifications = false;
    ```

---
---

## Module 6: Arrays

An **Array** is an **ordered list** of values. Think of it as a numbered row of boxes, perfect for storing a *collection* of items (e.g., a list of `tasks`, a list of `users`, a list of `colors`).

### 1. Array Literals & Indexing

* **Lecture & Concepts:**
    * The easiest way to create an array is with "array literal" syntax: `[]`.
    * **Zero-Based Indexing:** This is a critical concept. The **first** item in an array is at **index 0**. The second is at index 1, and so on.
    * You access items in an array using bracket notation with the index number.

* **In-Depth Example:**
    ```javascript
    // An array of strings
    const colors = ["red", "green", "blue"];

    // Accessing by index:
    console.log(colors[0]); // Output: "red"
    console.log(colors[1]); // Output: "green"
    console.log(colors[2]); // Output: "blue"

    // What happens if you try to access an index that doesn't exist?
    console.log(colors[3]); // Output: undefined

    // Modifying an item by its index:
    colors[1] = "yellow";
    console.log(colors); // Output: ["red", "yellow", "blue"]
    ```

---

### 2. Common Array Properties & Methods

* **Lecture & Concepts:**
    * Arrays come with built-in properties and methods to make them useful.
    * **Property:** `.length` (Gives you the *count* of items).
    * **Mutating Methods (These *change* the original array):**
        * `push(item)`: **Adds** an item to the **end**. (Most common)
        * `pop()`: **Removes** an item from the **end** (and returns it).
        * `unshift(item)`: **Adds** an item to the **start**. (Slower, use less)
        * `shift()`: **Removes** an item from the **start** (and returns it).

* **In-Depth Example:**
    ```javascript
    let tasks = ["Buy milk", "Clean room"];

    // 1. Get the length
    console.log(tasks.length); // Output: 2

    // 2. Add to the END (push)
    tasks.push("Go to the gym");
    console.log(tasks); // ["Buy milk", "Clean room", "Go to the gym"]

    // 3. Remove from the END (pop)
    let lastTask = tasks.pop();
    console.log(lastTask); // "Go to the gym"
    console.log(tasks); // ["Buy milk", "Clean room"]

    // 4. Add to the START (unshift)
    tasks.unshift("Wake up");
    console.log(tasks); // ["Wake up", "Buy milk", "Clean room"]

    // 5. Remove from the START (shift)
    let firstTask = tasks.shift();
    console.log(firstTask); // "Wake up"
    console.log(tasks); // ["Buy milk", "Clean room"]
    ```

---

### 3. Looping Arrays (with a `for` loop)

* **Lecture & Concepts:**
    * You'll often need to "iterate" or "loop over" an array to do something with each item. The `for` loop is the fundamental way to do this.
    * We combine the `for` loop syntax with the array's `.length` property and its index `[i]`.

* **In-Depth Example:**
    ```javascript
    const fruits = ["Apple", "Banana", "Cherry", "Date"];

    // i = 0 (start at index 0)
    // i < fruits.length (stop when i is no longer less than the length)
    // i++ (add 1 to i after each loop)

    for (let i = 0; i < fruits.length; i++) {
      // 1st loop: i = 0, fruits[0] is "Apple"
      // 2nd loop: i = 1, fruits[1] is "Banana"
      // ...
      console.log(`Item at index ${i} is ${fruits[i]}`);
    }

    // Output:
    // Item at index 0 is Apple
    // Item at index 1 is Banana
    // Item at index 2 is Cherry
    // Item at index 3 is Date
    ```

---

### 4. Arrays of Objects (The Most Common Structure)

* **Lecture & Concepts:**
    * This is the "Aha!" moment. You almost *never* use *just* an array or *just* an object. You use them **together**.
    * The most common data structure is an **array of objects**.
    * **Analogy:** A "To-Do List" (the Array) where each item *on* the list is a "Task" (an Object).

* **In-Depth Example:**
    ```javascript
    const users = [
      { id: 101, name: "Alice", role: "admin" },
      { id: 102, name: "Bob", role: "user" },
      { id: 103, name: "Charlie", role: "user" }
    ];

    // How to access data:
    // Get the SECOND user in the list (index 1)
    console.log(users[1]); // { id: 102, name: "Bob", role: "user" }

    // Get the NAME of the SECOND user
    console.log(users[1].name); // "Bob"

    // How to loop over them:
    for (let i = 0; i < users.length; i++) {
      let user = users[i]; // Get the object at the current index
      console.log(`${user.name} has the role of ${user.role}.`);
    }

    // Output:
    // Alice has the role of admin.
    // Bob has the role of user.
    // Charlie has the role of user.
    ```

---
---

### Week 3: Comprehensive Assignment

**Objective:** Build a "Simple Blog" data structure in the console, combining Objects and Arrays.

**Files to Create:**
1.  `index.html` (Just to link your script)
2.  `script.js`

#### Part 1: The HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Week 3 Assignment</title>
</head>
<body>
  <h1>Week 3: Data Structures</h1>
  <p>Open the console (F12) to see the assignment results!</p>

  <script src="script.js"></script>
</body>
</html>
```

#### Part 2: The JavaScript (`script.js`)
``` javascript
// --- Week 3 Assignment ---

console.log("--- Starting Week 3 Assignment ---");

// 1. CREATE THE DATA STRUCTURE
//    - Create an array named `posts`.
//    - This array should contain 3 objects.
//    - Each object should have the following properties:
//      - `title` (string)
//      - `author` (string)
//      - `content` (string)
//      - `tags` (an ARRAY of strings)

const posts = [
  {
    title: "My First Blog Post",
    author: "Alice",
    content: "Hello world! This is my first post.",
    tags: ["tech", "intro", "general"]
  },
  {
    title: "A Guide to JavaScript Arrays",
    author: "Bob",
    content: "Arrays are powerful and easy to learn. Let's dive in.",
    tags: ["javascript", "coding", "tech"]
  },
  {
    title: "Cooking with CSS",
    author: "Charlie",
    content: "Today we'll be making a delicious 'Box Model' sandwich.",
    tags: ["css", "web-dev", "humor"]
  }
];

// 2. LOG THE DATA
//    - Log the entire `posts` array to the console.
//    - Log the `title` of the *second* post.
//    - Log the *first tag* of the *first* post.

console.log("--- All Posts ---");
console.log(posts);

console.log("--- Title of Second Post ---");
console.log(posts[1].title); // "A Guide to JavaScript Arrays"

console.log("--- First Tag of First Post ---");
console.log(posts[0].tags[0]); // "tech"


// 3. LOOP OVER THE DATA
//    - Write a `for` loop that iterates over the `posts` array.
//    - Inside the loop, log a string for each post:
//      "Title: [title] by [author]"

console.log("--- Post Titles & Authors ---");
for (let i = 0; i < posts.length; i++) {
  console.log(`Title: ${posts[i].title} by ${posts[i].author}`);
}


// --- STRETCH GOAL: OBJECT METHODS ---
//
//    - Go back to your `posts` array.
//    - Add a new method to *each* object called `displayPost()`.
//    - This method should use `this` to `console.log()` a formatted post:
//
//      "--- [TITLE] ---"
//      "By: [AUTHOR]"
//      "[CONTENT]"
//      "Tags: [tag1], [tag2], [tag3]"
//      (Hint: you might need a `for` loop *inside* your method to log the tags,
//       or look up the `.join()` array method for a cleaner way!)
//
//    - After adding the method, write a new `for` loop that simply
//      calls `posts[i].displayPost()` for each post.

console.log("--- Stretch Goal: Full Posts ---");

// We'll re-declare the array for clarity (in a real app, you'd add the method)
const postsWithMethods = [
  {
    title: "My First Blog Post",
    author: "Alice",
    content: "Hello world! This is my first post.",
    tags: ["tech", "intro", "general"],
    displayPost() {
      console.log(`--- ${this.title} ---`);
      console.log(`By: ${this.author}`);
      console.log(this.content);
      // .join() is a method that turns an array into a string
      console.log(`Tags: ${this.tags.join(", ")}`);
    }
  },
  {
    title: "A Guide to JavaScript Arrays",
    author: "Bob",
    content: "Arrays are powerful and easy to learn. Let's dive in.",
    tags: ["javascript", "coding", "tech"],
    displayPost() {
      console.log(`--- ${this.title} ---`);
      console.log(`By: ${this.author}`);
      console.log(this.content);
      console.log(`Tags: ${this.tags.join(", ")}`);
    }
  },
  {
    title: "Cooking with CSS",
    author: "Charlie",
    content: "Today we'll be making a delicious 'Box Model' sandwich.",
    tags: ["css", "web-dev", "humor"],
    displayPost() {
      console.log(`--- ${this.title} ---`);
      console.log(`By: ${this.author}`);
      console.log(this.content);
      console.log(`Tags: ${this.tags.join(", ")}`);
    }
  }
];

// Now our loop is much cleaner!
for (let i = 0; i < postsWithMethods.length; i++) {
  postsWithMethods[i].displayPost();
}

console.log("--- End of Week 3 Assignment ---");
```
