To wrap up the curriculum, these Capstone Projects are designed to synthesize everything you've learned—from basic syntax to file management and external modules.

---

## **Project 1: Number Guessing Game**

**Focus:** Logic, Loops, and the `random` module.

In this project, the computer selects a secret number, and the player has to guess it within a certain number of attempts.

* **Requirements:**
* Use `import random` to generate a number between 1 and 100.
* Use a `while` loop to give the user 7 attempts.
* Use `if/elif/else` to tell the user if their guess is "Too High," "Too Low," or "Correct!"
* **Advanced Goal:** Add a `try...except` block to handle cases where the user types something that isn't a number.



---

## **Project 2: To-Do List CLI (Command Line Interface)**

**Focus:** Lists, Dictionaries, and Functions.

Build a tool to manage daily tasks. This project helps you practice data manipulation and program flow.

* **Requirements:**
* Create a list to store tasks. Each task should be a dictionary: `{"task": "Buy Milk", "status": "Pending"}`.
* Create a function `add_task()` that appends a new dictionary to the list.
* Create a function `view_tasks()` that loops through the list and prints them with an index number.
* Create a function `mark_done()` that takes an index number and changes the "status" to "Completed".
* **Advanced Goal:** Use the `json` module to save this list to a file so the tasks don't disappear when the program closes.



---

## **Project 3: Contact Book (The "Pro" Project)**

**Focus:** File I/O, OOP, and JSON handling.

This is the most advanced project. It mimics how real applications handle user databases.

* **Requirements:**
* **The Blueprint:** Create a `Contact` class with attributes like `name`, `phone`, and `email`.
* **Storage:** Use a `with open("contacts.json", "w")` block to save your contacts as a JSON file.
* **The Interface:** Create a menu that allows users to:
1. Add a contact.
2. Search for a contact by name.
3. Delete a contact.


* **VS Code Integration:** Ensure you are using your **Virtual Environment** and the correct **Interpreter** if you decide to use any external styling libraries like `colorama`.



---

## **Final Assignment: The Choice**

To complete your certification in this course, select **one** of the projects above and complete the following:

1. **Code It:** Build the script in VS Code.
2. **Document It:** Add comments (`#`) explaining what each function does.
3. **Debug It:** Use the **F5 Debugger** to trace at least one logic path (e.g., what happens when a user enters an incorrect guess).
4. **Refactor:** Ensure you are using `snake_case` for all variables and functions.
