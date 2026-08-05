# Part 1: The Foundation

This part prepares your Windows computer to run Python reliably, teaches the core building blocks, and gets your first real script running: the very first version of your Expense & Task Tracker.

## Module 1: The Launchpad (Setup & Environment)

Before we write a single line of code, we need to ensure your Windows environment is ready to execute Python.

### 1. Installing Python

* The source: download the latest version from python.org (not the Microsoft Store, to avoid permission quirks).
* The golden rule: during installation, you **must** check **Add Python to PATH**.
* Why it matters (real world): if PATH is not set, running `python` in PowerShell fails — which breaks running scripts from a project folder, scheduled tasks, or simple automation from the terminal.

Practical Windows checks
* Confirm install: `python --version`
* Confirm pip: `pip --version`
* Confirm where Python is: `where python`

Common mistakes
* Installing Python but forgetting PATH.
* Having multiple Python installs and using the wrong one in the terminal.
* Installing packages with the wrong `pip` (tied to a different Python).

### 2. The Development Environment (VS Code)

* Setup: install VS Code, open Extensions (Ctrl+Shift+X), install **Python (Microsoft)**.
* Interpreter: confirm VS Code is using the correct Python interpreter (this matters a lot once you start using virtual environments in Part 4).

Real-world use case
* You open a project from a USB drive or a new folder and your code fails because VS Code is pointing to the wrong interpreter. Selecting the correct interpreter fixes it in seconds.

Quick practice
* Create a folder called `expense_tracker` — this is your project folder for the **entire course**. Every module from here on edits a file inside it.
* Open it in VS Code.

### 3. The Windows Terminal (CLI Basics)

Survival commands for Command Prompt / PowerShell:
* `cd <folder>`: change directory.
* `dir`: list files in the current folder.
* `cls`: clear the terminal.
* `mkdir <name>`: create a new folder.

Real-world examples
* You downloaded 100 files into Downloads and want to batch-organize them.
* You want to run a script inside a project folder without clicking around in File Explorer.

### 4. Your First Script: `tracker.py`

Inside your `expense_tracker` folder, create `tracker.py` — this is the file every module in this course will grow. Start it small:

```python
print("Expense & Task Tracker — v0.1")
```

Run it: open the terminal in that folder and type `python tracker.py`.

Mini extension (real world)
* Add a second `print()` line that shows today's date using the `datetime` module — you'll use `datetime` for real, on every logged expense, starting next module.

---

## Module 2: The Building Blocks (Data, Input, Math, Strings)

Now that the engine is running, let's look at how Python handles data — and use it to log your very first real expense.

### 1. Variables & Data Types

Variables are containers for storing values. Python figures out the type automatically.
* **String (`str`):** text wrapped in quotes. `category = "Transport"`
* **Integer (`int`):** whole numbers.
* **Float (`float`):** decimal numbers. `amount = 1500.0`

Real-world examples
* Expense tracking: amounts are floats, categories are strings.
* Reporting: totals and averages are usually floats too.

### 2. User Input

`input()` makes a program interactive. It **always** returns a string — even if the user types a number.

```python
category = input("Category: ")
print("Logging an expense for: " + category)
```

Common mistake: trying to do math directly with a raw `input()` string.

### 3. Basic Math & Type Casting

Python uses standard operators: `+` `-` `*` `/`. If you want to do math with a user's input, convert it first with `int()` or `float()`.

```python
amount = float(input("Amount: "))
running_total = amount + 10  # this only works because we cast it to float first
```

### 4. Strings in Depth

* Concatenation: joining strings with `+`.
* f-strings: the modern, clean way to format text: `f"Category: {category}"`.
* Methods: `.strip()` (removes stray whitespace from input), `.title()` (neatens casing).

---

## Project Milestone: `tracker.py` v0.2 — Your First Real Expense Entry

This combines variables, input, math, and string formatting into the first real version of your tracker.

```python
# tracker.py
from datetime import date

print("Expense & Task Tracker — v0.2")

category = input("Category: ").strip().title()
amount_text = input("Amount: ").strip()
amount = float(amount_text)

print("\n--- Expense Logged ---")
print(f"Date:     {date.today()}")
print(f"Category: {category}")
print(f"Amount:   {amount:.2f}")
```

How to run
1. Save this as `tracker.py` in your `expense_tracker` folder.
2. Run `python tracker.py`, enter a category and amount, and confirm the printed summary looks right.

**Checkpoint tasks**
* Run it twice with different categories and amounts — confirm the date always shows today's date correctly.
* Use `.strip()` to confirm the category still prints cleanly even if you type extra spaces around it.

**Stretch goal**
* Reject a negative amount: if `amount < 0`, print an error message instead of the summary. (You'll formalize this kind of check properly with `if`/`elif`/`else` next module.)
