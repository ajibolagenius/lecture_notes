# Comprehensive Python for Windows: Beginner to Intermediate

This course takes you from a fresh installation to a packaged, distributable Windows desktop app. Every module builds one continuous project: a **Personal Expense & Task Tracker** that grows from a single console script into a GUI application you can hand to someone who has never installed Python. It aligns with the topics found in the W3Schools Python Tutorial, taught with **Visual Studio Code (VS Code)** on **Windows**.

## Course Overview

* **Target Audience:** Beginners with basic computer literacy.
* **Tools:** Windows 10/11, Python 3.x, Visual Studio Code.
* **Goal:** Build a solid foundation in Python syntax, data structures, and functional programming, culminating in OOP, real API consumption, GUI development, and packaging — by building and shipping one real, continuously-growing application: the Expense & Task Tracker.

---

## Part 1: The Foundation

### Module 1: The Launchpad (Setup & Environment)
* Install Python (with PATH), install VS Code, configure the Python extension, learn the essential Windows terminal commands, put the project under version control with Git.
* **Real-world outcome:** You can open any folder in the terminal, run a Python script confidently, and have a real commit history from day one.

### Module 2: The Building Blocks (Data, Input, Math, Strings)
* Variables and data types, `input()` and type casting, basic math, f-strings and string methods.
* **Project milestone:** Build `tracker.py` — a single-expense-entry CLI tool. It asks for a category and amount, and prints a clean, formatted confirmation. This one file is what every later module edits and grows.

---

## Part 2: Automation & Structure

### Module 3: Control Flow (Logic)
* `if`/`elif`/`else`, `while` loops, `for` loops and `range()`, using the VS Code debugger (F5).
* **Project milestone:** Add a `budget_limit` check to `tracker.py` — if a new expense pushes the running total over the limit, print a warning.

### Module 4: Loops & Lists (Efficiency)
* Lists, `for`/`while` loops over collections, batch operations.
* **Project milestone:** Refactor `tracker.py` to hold expenses in a list and support *batch-importing* several expenses in one run, instead of only ever handling one.

### Module 5: Functions & Modules
* `def`, parameters/arguments, return values, default/keyword arguments, type hints, `import`ing built-in modules (`datetime`, `pathlib`).
* **Project milestone:** Refactor every piece of `tracker.py`'s logic into named, type-hinted, reusable functions: `add_expense()`, `calculate_total()`, `is_over_budget()` — and write real `pytest` tests for them.

### Module 6: File I/O & Error Handling
* Reading/writing files, `with open()` as a context manager, CSV files, `try`/`except`, custom exceptions, the `logging` module.
* **Project milestone:** `tracker.py` now saves expenses to `expenses.csv` and loads them back on startup — your data survives closing the program for the first time. A custom `BudgetExceededError` and `logging` (instead of bare `print()`) handle errors properly.

---

## Part 3: Intermediate Mastery

### Module 7: Advanced Data Handling (Dictionaries, Sets, Comprehensions, Pip)
* Dictionaries for fast lookups, sets for deduplication, list comprehensions, `pip install`.
* **Project milestone:** Add `category_totals()` (a dictionary comprehension summing expenses per category) and use a set to detect/warn about duplicate entries.

### Module 8: Object-Oriented Programming (OOP)
* Classes vs. objects, `__init__`/`self`, methods, inheritance, `@dataclass` as a modern shortcut.
* **Project milestone:** Refactor the plain-dictionary expenses into a real `Expense` class — and introduce a brand-new `Task` class, turning `tracker.py` into a genuine *Expense & Task* Tracker for the first time, complete with real `tasks.json` persistence via the `json` module.

### Module 9: Consuming a Real API
* What an API is, the `requests` library, parsing JSON responses, handling network errors, reading config from environment variables instead of hardcoding it.
* **Project milestone:** Add live currency conversion — fetch a real USD→NGN exchange rate from a free public API so expenses logged in either currency can be compared on one dashboard.

---

## Part 4: Deployment & Interfaces

### Module 10: GUI Development (Windows Apps with Tkinter)
* Tkinter basics, widgets (Label, Entry, Button, Text), event handling.
* **Project milestone:** Wrap the entire tracker — expenses *and* tasks, category totals, currency conversion — in a real Tkinter window, so it's no longer a console-only tool.

### Module 11: Virtual Environments & Distribution
* `venv`, `requirements.txt`, packaging to a standalone `.exe` with `auto-py-to-exe`, linting with `ruff`, and a look at real package layout (`pyproject.toml`) as the next step beyond a flat folder.
* **Project milestone:** Package the finished app as `ExpenseTaskTracker.exe` — something you could hand to a friend with no Python installed.

---

## Final Capstone: The Expense & Task Tracker

**One deliverable, not a menu of options.** By Module 11 you will have a single, packaged, installable Windows desktop application that:
* Has a real git history from Module 1 onward.
* Logs expenses with categories, running totals, and a budget-limit warning (Modules 2-4).
* Is backed by real `pytest` tests for its core functions (Module 5).
* Persists expenses to CSV *and* tasks to JSON, surviving restarts — including through the GUI (Modules 6 & 8).
* Handles errors with a custom `BudgetExceededError` and logs everything via `logging`, not bare `print()` (Module 6).
* Reports category totals and flags duplicates (Module 7).
* Models expenses and tasks as real classes (Module 8).
* Converts between currencies using a live exchange-rate API, with its URL read from an environment variable (Module 9).
* Runs as a real Windows GUI app (Module 10), passes a clean `ruff` lint, and is packaged as a standalone `.exe` (Module 11).

This is your portfolio piece — the same file you started in Module 2, grown module by module into something real.
