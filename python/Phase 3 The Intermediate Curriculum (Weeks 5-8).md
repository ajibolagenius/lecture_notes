## **Module 5: Functions & Modular Code**

Functions allow you to wrap a block of code, give it a name, and reuse it whenever needed. This makes your code "DRY" (Don't Repeat Yourself).

### **1. Function Anatomy**

* **`def`**: The keyword used to define a function.
* **Parameters vs. Arguments**: **Parameters** are the placeholders in the function definition; **Arguments** are the actual values you pass in when calling it.
* **Return Values**: Use `return` to send a result back to the caller. Without it, the function returns `None` by default.

### **2. Flexibility with Arguments**

* **Default Parameters**: You can assign a fallback value (e.g., `def greet(name="Guest"):`).
* **Keyword Arguments**: You can specify which parameter a value belongs to regardless of order (e.g., `greet(name="Ajibola")`).
* ***args and **kwargs**: These allow a function to accept any number of positional or keyword arguments, which is useful for highly flexible tools.

### **3. Scope & Modules**

* **Scope**: Variables created inside a function are **Local** (they die when the function ends); variables created outside are **Global**.
* **Modules**: Python comes with "batteries included." Use `import` to access built-in tools like `math` (calculations), `random` (generating choices), and `datetime` (handling time).

---

## **Module 6: Error Handling & File I/O**

Real-world code encounters errors and needs to store data permanently.

### **1. Try...Except (The Safety Net)**

Instead of letting your program crash when an error occurs, you "catch" the error.

* **Common Errors**: `ZeroDivisionError` (dividing by 0) or `ValueError` (trying to turn "abc" into an integer).

```python
try:
    num = int(input("Enter a number: "))
    print(10 / num)
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("You cannot divide by zero.")

```

### **2. File Handling & VS Code Skill**

* **File Paths**: In the VS Code terminal, a **Relative Path** is relative to your current open folder, while an **Absolute Path** is the full address (e.g., `C:\Users\Ajibola\Desktop\file.txt`).
* **The `with` Statement**: This is the best practice for opening files. It acts as a **Context Manager**, automatically closing the file even if an error occurs.
* **Modes**:
* `'r'`: Read only.
* `'w'`: Write (overwrites everything).
* `'a'`: Append (adds to the end).



---

## **Practical Example: The Arsenal Match Logger**

```python
import datetime

def log_match(result, opponent):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    with open("match_history.txt", "a") as file:
        file.write(f"[{timestamp}] Arsenal vs {opponent}: {result}\n")

log_match("3-0 Win", "Chelsea")

```

---

## **Assignment: The Resilient Data Logger**

**Task 1: The Robust Calculator**
Create a function `divide_numbers(a, b)` that returns the result. Use a `try...except` block to handle `ZeroDivisionError`. If an error occurs, return a message saying "Calculation impossible."

**Task 2: The Guest Book**

1. Create a function that asks for a user's name.
2. Use the `with` statement to **append** that name to a file called `guests.txt`.
3. Add a timestamp to each entry using the `datetime` module.

**Task 3: File Reader**
Write a script that reads the `guests.txt` file and prints: "Total guests today: [Number of lines in the file]."

---

## **Module 7: Object-Oriented Programming (OOP) Basics**

OOP is a programming paradigm based on the concept of "objects," which can contain data (attributes) and code (methods). It allows you to model real-world entities.

### **1. Classes vs. Objects**

* **Class:** A blueprint or template for creating objects.
* **Object:** A specific instance of a class.
* *Analogy:* "Car" is the Class; your specific "Silver Toyota" is the Object.



### **2. The `__init__()` Function & `self**`

* **`__init__`**: The "constructor" that runs automatically when you create a new object. It sets the initial values for the object's properties.
* **`self`**: A reference to the current instance of the class. It allows you to access variables that belong to that specific object.

### **3. Inheritance**

Inheritance allows one class (Child) to derive attributes and methods from another class (Parent). This promotes code reuse.

#### **Example: Football Player Class**

```python
class Player:
    def __init__(self, name, team):
        self.name = name
        self.team = team

    def celebrate(self):
        print(f"{self.name} is celebrating a goal for {self.team}!")

# Inheritance: Striker is a type of Player
class Striker(Player):
    def score_goal(self):
        print(f"{self.name} has scored!")

p1 = Striker("Bukayo Saka", "Arsenal")
p1.celebrate()
p1.score_goal()

```

---

## **Module 8: PIP & Virtual Environments**

Professional Python development rarely happens in isolation. We use external packages to add functionality.

### **1. What is PIP?**

PIP is the package manager for Python. It allows you to install and manage additional libraries that are not part of the standard Python library.

* **Command:** `pip install <package_name>`.

### **2. Virtual Environments (`venv`)**

A virtual environment is a self-contained directory that contains a Python installation for a particular version of Python, plus a number of additional packages.

* **Why?** To avoid "package conflicts" between different projects.
* **Creation:** `python -m venv venv`.

### **3. VS Code Skill: Selecting the Interpreter**

When you create a virtual environment, you must tell VS Code to use it.

1. Press **`Ctrl + Shift + P`**.
2. Search for **"Python: Select Interpreter"**.
3. Choose the one that starts with `./venv` or `('venv': venv)`.

---

## **Practical Applications: JSON & RegEx**

* **JSON (`import json`)**: Used for parsing data from web APIs or configuration files. It looks very similar to Python dictionaries.
* **RegEx (`import re`)**: Short for Regular Expressions. It is a powerful tool for searching and manipulating text patterns (like checking if an email address is valid).

---

## **Assignment: The Professional Organizer**

**Task 1: The Membership Class**

1. Create a class named `Member` with an `__init__` method that takes `name` and `membership_type`.
2. Create a child class named `Admin` that inherits from `Member`.
3. Add a method to `Admin` called `delete_user(user_name)` that prints: "Admin [Your Name] has removed [user_name]."

**Task 2: Environment Setup**

1. Open your VS Code terminal and create a new virtual environment: `python -m venv my_env`.
2. Activate it (In Windows: `my_env\Scripts\activate`).
3. Install the `requests` library using PIP: `pip install requests`.

**Task 3: Data Handling**

1. Import the `json` module.
2. Create a dictionary with three keys (name, age, city) and use `json.dumps()` to convert it into a JSON string. Print the result.

---
