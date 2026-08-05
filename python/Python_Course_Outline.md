This curriculum is designed to take students from zero knowledge to an intermediate level, utilizing **Visual Studio Code (VS Code)** on **Windows**. It aligns with the topics found in the W3Schools Python Tutorial.# **Course Overview**

* **Target Audience:** Beginners with basic computer literacy.
* **Tools:** Windows 10/11, Python 3.x, Visual Studio Code.
* **Goal:** Build a solid foundation in Python syntax, data structures, and functional programming, culminating in basic intermediate concepts like OOP and File I/O.

---

### **Phase 1: Environment Setup (The "Day 0" Prerequisites)**

*Before the first lecture, or as the first workshop.*

**1. Install Python on Windows**

* Download the latest version from `python.org` (not the Microsoft Store, to avoid permission quirks).
* **Crucial Step:** During installation, check the box **"Add Python to PATH"**. This allows students to run python from the Command Prompt/Terminal.

**2. Install Visual Studio Code (VS Code)**

* Download from `code.visualstudio.com`.

**3. Configure VS Code for Python**

* Open VS Code.
* Go to the **Extensions View** (Ctrl+Shift+X).
* Search for and install the **"Python"** extension by Microsoft (IntelliSense, Linting, Debugging).
* *Optional but recommended:* Install the **"Prettier"** extension for code formatting.

---

### **Phase 2: The Beginner Curriculum (Weeks 1-4)**

#### **Module 1: First Steps & Syntax**

* **VS Code Skill:** Creating a folder, opening it in VS Code (`File > Open Folder`), and creating a `.py` file.
* **VS Code Skill:** Using the Integrated Terminal (Ctrl+`) to run scripts (`python hello.py`).
* **Topics:**
* Python Syntax & Indentation (The whitespace rule).
* Comments (`#`).
* Variables & Naming Conventions (snake_case).
* **Output:** `print()` function.
* **Input:** `input()` function (Interactivity).



#### **Module 2: Data Types & Operators**

* **Topics:**
* Primitive Types: Strings (`str`), Integers (`int`), Floats (`float`), Booleans (`bool`).
* Type Casting (`int()`, `str()`, `float()`).
* Operators: Arithmetic (`+`, `-`, `*`, `/`, `%`), Comparison (`==`, `!=`, `>`), Logical (`and`, `or`, `not`).
* String Operations: Slicing (`text[0:5]`), Methods (`.upper()`, `.strip()`, `.replace()`), and f-strings (e.g., `f"Hello {name}"`).



#### **Module 3: Control Flow (Logic)**

* **VS Code Skill:** Using the Debugger (F5) to step through `if` statements.
* **Topics:**
* `if`, `elif`, `else` statements.
* `while` loops (and `break`/`continue`).
* `for` loops (iterating over sequences and `range()`).



#### **Module 4: Data Structures (Collections)**

* **Topics:**
* **Lists:** Creation, Indexing, Mutable methods (`.append()`, `.remove()`, `.pop()`, `.sort()`).
* **Tuples:** Immutable sequences (Difference from lists).
* **Sets:** Unordered, unique elements (basic Set math: union/intersection).
* **Dictionaries:** Key-Value pairs, accessing data (`data['key']`), methods (`.keys()`, `.values()`, `.items()`).



---

### **Phase 3: The Intermediate Curriculum (Weeks 5-8)**

#### **Module 5: Functions & Modular Code**

* **Topics:**
* Defining Functions (`def`).
* Parameters vs. Arguments.
* Return Values.
* Default Parameters & Keyword Arguments (`key=value`).
* *Arbitrary Arguments (`*args`, `**kwargs`) - Optional/Advanced.*
* **Scope:** Local vs. Global variables.
* **Modules:** Importing built-in modules (`math`, `random`, `datetime`).



#### **Module 6: Error Handling & File I/O**

* **VS Code Skill:** handling file paths (absolute vs relative paths in the Windows terminal).
* **Topics:**
* **Try...Except:** Handling crashes gracefully (`ZeroDivisionError`, `ValueError`).
* **File Handling:**
* Opening files (`open()`).
* Modes: Read (`'r'`), Write (`'w'`), Append (`'a'`).
* The `with` statement (Context Managers for safe file closing).
* Reading/Writing basic text files.





#### **Module 7: Object-Oriented Programming (OOP) Basics**

* **Topics:**
* Classes vs. Objects.
* The `__init__()` function (Constructors).
* Object Methods and the `self` parameter.
* Inheritance (Parent and Child classes).



#### **Module 8: Python Package Manager (PIP) & Virtual Environments**

* **VS Code Skill:** Selecting the Interpreter (`Ctrl+Shift+P` > `Python: Select Interpreter`).
* **Topics:**
* What is PIP?
* Installing external packages (e.g., `pip install requests` or `pandas`).
* Creating a Virtual Environment (`python -m venv venv`).
* *Brief Intro to:* JSON handling (import `json`) or RegEx (import `re`) as practical applications of modules.



---

### **Recommended "Capstone" Projects**

1. **Number Guessing Game:** Uses `random`, loops, and `if/else`.
2. **To-Do List CLI:** Uses Lists/Dictionaries and functions.
3. **Contact Book:** Uses File I/O to save/load contacts to a text or JSON file.

This video from the official Visual Studio Code channel provides a perfect walkthrough for the exact setup your students will need on Windows.

[Getting Started with Python in VS Code (Official Video)](https://www.youtube.com/watch?v=D2cwvpJSBX4)
