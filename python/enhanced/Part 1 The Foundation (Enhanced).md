# Part 1: The Foundation (Enhanced with Real World Practice)

This part prepares your Windows computer to run Python reliably and teaches the core building blocks you will use in every project.

## Module 1: The Launchpad (Setup & Environment)

Before we write a single line of code, we need to ensure your Windows environment is ready to execute Python.

### 1. Installing Python

• The source: Download the latest version from python.org  
• The golden rule: During installation, you must check **Add Python to PATH**  
• Why it matters (real world): if PATH is not set, running `python` in PowerShell fails, which breaks workflows like running scripts from a project folder, scheduled tasks, or simple automation from the terminal

Practical Windows checks
• Confirm install: `python --version`  
• Confirm pip: `pip --version`  
• Confirm where Python is: `where python`

Common mistakes
• Installing Python but forgetting PATH  
• Having multiple Python installs and using the wrong one in the terminal  
• Installing packages with the wrong pip (pip tied to a different Python)

---

### 2. The Development Environment (VS Code)

While you can write code in Notepad, Visual Studio Code (VS Code) is widely used because it helps you write, run, and debug faster.

• Setup: Install VS Code, then open Extensions (Ctrl+Shift+X) and install **Python (Microsoft)**  
• Interpreter: Make sure VS Code is using the correct Python interpreter (very important when you start using virtual environments)

Real world use case
• You open a project from a USB drive or a new folder and your code fails because VS Code is pointing to the wrong interpreter. Selecting the correct interpreter fixes it in seconds.

Quick practice
• Create a folder called `python_projects`  
• Open it in VS Code  
• Create and run a file named `hello_world.py`

---

### 3. The Windows Terminal (CLI Basics)

You will often interact with your code via Command Prompt or PowerShell. These are the survival commands:

• `cd <folder>`: change directory (move into a folder)  
• `dir`: list files in the current folder  
• `cls`: clear the terminal  
• `mkdir <name>`: create a new folder

Real world examples
• You downloaded 100 files into Downloads and want to batch organize them  
• You want to run a script inside a project folder without clicking around in File Explorer

Quick task
• In PowerShell, create a folder called `practice_cli`  
• Move into it with `cd`  
• Create two empty files in that folder (in PowerShell you can do: `ni file1.txt`, `ni file2.txt`)  
• Use `dir` to confirm they exist

---

### 4. Your First Script: `hello_world.py`

Create a new file in VS Code named `hello_world.py` and type:

```python
print("Hello, Windows!")
```

To run it, open the terminal in that folder and type:
• `python hello_world.py`

Mini extension (real world)
• Add a second print line that shows today’s date using the `datetime` module

---

## Module 2: The Building Blocks (Data, Input, Math, Strings)

Now that the engine is running, let’s look at how Python handles data.

### 1. Variables & Data Types

Variables are containers for storing values. Python figures out the type automatically.

• String (str): text wrapped in quotes. `name = "Alice"`  
• Integer (int): whole numbers. `age = 25`  
• Float (float): decimal numbers. `price = 19.99`

Real world examples
• Finance and receipts: prices are floats, quantities are ints  
• Data cleaning: names and IDs arrive as strings and often need trimming and formatting  
• Reporting: you might store totals and averages as floats

Practice tasks
• Create variables for: `full_name`, `hours_worked`, `hourly_rate`  
• Compute pay: `hours_worked * hourly_rate` and print it neatly

---

### 2. User Input

To make a program interactive, we use `input()`. `input()` always returns a string.

```python
user_name = input("Enter your name: ")
print("Welcome to Python, " + user_name)
```

Real world examples
• A small tool that asks for a folder name to organize  
• A calculator that asks for units and quantities

Common mistake
• Trying to do math with a raw input string

---

### 3. Basic Math

Python uses standard operators: `+` `-` `*` `/`

Important note  
If you want to do math with a user’s input, convert it first using `int()` or `float()`.

```python
total = int(input("Enter a number: ")) + 10
```

Real world mini scenario (discount rule)
• If price is above 50, apply 10 percent discount, otherwise no discount

---

### 4. Strings in Depth

Strings are powerful in Python. Essential tools:

• Concatenation: joining strings with `+`  
• f strings: clean formatting  
• Methods: `.upper()` `.lower()` `.strip()` `.replace()`  

Example f string
```python
name = "david"
age = 20
print(f"Hello, {name.upper()}. You are {age} years old.")
```

Real world examples
• Cleaning messy data: `"  David Jokotoye  ".strip()`  
• Normalizing emails: `email.lower()`  
• Creating neat console reports using f strings

---

## Implementation Example: The Bio Generator (Upgraded)

This combines variables, input, math, and string formatting, but uses `datetime` so your code stays correct every year.

```python
# bio_gen.py
from datetime import date

first_name = input("Enter your first name: ").strip()
birth_year = int(input("Enter the year you were born: ").strip())

current_year = date.today().year
age = current_year - birth_year

print("\nProgrammer Profile")
print(f"Name: {first_name.upper()}")
print(f"Estimated age: {age}")
print("Status: Ready to code on Windows")
```

How to run
1. Save as `bio_gen.py`  
2. In the terminal, run `python bio_gen.py`

---

## End of Part 1 Practice (Recommended)

Build a mini tool: “Simple Receipt”
Requirements  
• Ask for item name, quantity, unit price  
• Compute subtotal and total  
• Print a clean receipt using f strings  
• Use `.strip()` to clean inputs

Stretch goal  
• Reject negative numbers and ask again until valid
