# **Phase 2: The Beginner Curriculum**

## **Module 1: First Steps & Syntax**

This module focuses on the "grammar" of Python and how to interact with your computer using code.

### **1. VS Code Workflow**

* **Creating a Project:** Always keep your files organized. Create a folder on your computer, then in VS Code, go to `File > Open Folder` to make that your workspace.
* **Creating a Script:** Click the **New File** icon and ensure it ends in `.py` (e.g., `hello.py`). This tells VS Code to use the Python engine.
* **The Integrated Terminal:** Instead of switching windows, press **`Ctrl + \``** (the backtick key) to open the terminal inside VS Code. Run your code by typing: `python hello.py`.

### **2. The "Whitespace Rule" (Indentation)**

In many languages, curly braces `{}` are used to group code. In Python, we use **indentation** (usually 4 spaces or one Tab).

* Incorrect indentation will lead to an `IndentationError`.

### **3. Comments and Variables**

* **Comments (`#`):** Used to explain what code does. Python ignores anything after the `#`.
* **Variables:** Think of these as labeled boxes storing data.
* **Naming Convention:** Use `snake_case` (all lowercase, words separated by underscores).
* *Good:* `user_age`, `total_price`
* *Bad:* `UserAge`, `totalprice`



### **4. Input & Output**

* `print()`: Displays information to the user.
* `input()`: Pauses the program to let the user type something in. **Note:** `input()` always treats the data as a string (`str`).

#### **Example: The Greeter**

```python
# This is a comment: Greeting the user
user_name = input("Enter your name: ")
print("Hello, " + user_name + "!")

```

---

## **Module 2: Data Types & Operators**

### **1. Primitive Types & Casting**

Python needs to know what *kind* of data it is handling:

* `str`: Text (e.g., "Lagos").
* `int`: Whole numbers (e.g., 50).
* `float`: Decimals (e.g., 10.5).
* `bool`: True or False.

**Type Casting:** Converting one type to another using `int()`, `float()`, or `str()`.

* *Example:* `age = int("25")` converts the string "25" into a number you can do math with.

### **2. Operators**

* **Arithmetic:** `+`, `-`, `*`, `/`. Use `%` (Modulo) to find the remainder of a division.
* **Comparison:** `==` (Equal to), `!=` (Not equal), `>` (Greater than).
* **Logical:** `and`, `or`, `not` (Used to combine multiple conditions).

### **3. String Power-Ups**

* **Slicing:** Get a part of a string using `[start:end]`.
* **f-strings:** The modern way to format text. Use `f"Text {variable}"`.
* **Methods:** `.upper()` (MAKES LOUD), `.strip()` (removes extra spaces).

#### **Example: The Calculator**

```python
# Simple addition with casting
num1 = input("Enter first number: ")
num2 = input("Enter second number: ")

# Convert strings to floats to allow decimals
result = float(num1) + float(num2)

print(f"The total sum is: {result}")

```

---

## **Assignment: The Personal Profile Generator**

**Goal:** Create a script that collects user data and performs basic operations.

1. **Task 1:** Ask the user for their **name**, **birth year**, and **favorite food**.
2. **Task 2:** Calculate their age (Current Year - Birth Year). *Hint: You will need to cast the input to an integer.*
3. **Task 3:** Create a "Username" by slicing the first 3 letters of their name and adding the last two digits of their birth year.
4. **Task 4:** Print a summary using an **f-string**.
* *Example Output:* "Hello Ajibola! You are 28 years old. Your suggested username is Aji98."



**Bonus Challenge:** Use a string method to ensure the favorite food is printed in all capital letters regardless of how the user types it.

---

## **Module 3: Control Flow (Logic)**

Control flow allows your program to make decisions and repeat tasks. This is where your code starts to feel "smart."

### **1. Decision Making (`if`, `elif`, `else`)**

Python uses these statements to execute code only when certain conditions are met.

* **`if`**: The initial check.
* **`elif`**: Short for "else if," used to check multiple conditions.
* **`else`**: The fallback if no conditions are met.

### **2. Loops: Doing Things Repeatedly**

* **`for` loops**: Best for iterating over a sequence (like a list or a range of numbers).
* *Example:* `for i in range(5):` runs 5 times.


* **`while` loops**: Runs as long as a condition is `True`.
* **`break`**: Stops the loop immediately.
* **`continue`**: Skips the rest of the current turn and jumps to the next iteration.

### **3. VS Code Skill: The Debugger (F5)**

Instead of just running your code, you can "watch" it happen.

1. Click to the left of a line number to set a **Breakpoint** (a red dot).
2. Press **F5**.
3. Use the controls to step through your `if` statements line-by-line to see which path the computer takes.

---

## **Module 4: Data Structures (Collections)**

In Python, we often need to store groups of data together.

| Structure | Syntax | Characteristics | Use Case |
| --- | --- | --- | --- |
| **List** | `[1, 2, 3]` | Ordered & **Mutable** (Changeable) | A shopping list or a queue of tasks. |
| **Tuple** | `(1, 2, 3)` | Ordered & **Immutable** (Cannot change) | Fixed data like GPS coordinates. |
| **Set** | `{1, 2, 3}` | Unordered & **Unique** (No duplicates) | Finding unique tags in a blog post. |
| **Dictionary** | `{"id": 1}` | **Key-Value** pairs | User profiles or database records. |

### **Key Methods to Remember**

* **Lists:** Use `.append()` to add, `.remove()` to delete by value, and `.pop()` to delete by index.
* **Dictionaries:** Access data using the key: `user["name"]`. Use `.items()` to loop through both keys and values simultaneously.

---

## **Practical Example: The Arsenal Fan Club Manager**

Since you are active in the Arsenal Nigeria Community, let's use a football context:

```python
# A list of members
members = ["Ajibola", "Tunde", "Sarah"]

# A dictionary for club info
club_stats = {"name": "Arsenal", "location": "London"}

# Logic to check membership
search_name = input("Enter name to check: ")

if search_name in members:
    print(f"Welcome back, {search_name}! Support {club_stats['name']}!")
else:
    print("Member not found.")

```

---

## **Assignment: The Inventory & Security System**

**Task 1: The Loop Challenge**
Write a `for` loop that prints numbers from 1 to 20. However, if the number is a multiple of 3, print "Gunners" instead of the number. If it is a multiple of 5, print "Victory".

**Task 2: The Data Organizer**

1. Create a **List** of 5 fruits.
2. Create a **Dictionary** representing a student with keys: `name`, `score`, and `passing_status` (a Boolean).
3. **The Logic:** Ask the user for the student's score. Update the dictionary with that score. If the score is 50 or above, set `passing_status` to `True`; otherwise, set it to `False`.
4. Print the final dictionary.

**Task 3: Debugging**
Set a breakpoint on your `if` statement from Task 2. Press **F5** and use the "Step Over" button to watch how the `passing_status` changes based on the input you provide.

---
