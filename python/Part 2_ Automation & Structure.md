# Part 2: Automation & Structure

This part teaches you how to make decisions in code, scale from "one value" to "many values," and structure `tracker.py` so it stays clean, reusable, and reliable.

## Module 3: Control Flow (Logic)

Control flow lets your program make decisions and repeat tasks — this is where `tracker.py` starts to feel "smart" instead of just echoing back what you typed.

### 1. Decision Making (`if`, `elif`, `else`)

* **`if`:** the initial check.
* **`elif`:** short for "else if" — check another condition if the first was false.
* **`else`:** the fallback if nothing else matched.

### 2. Loops: Doing Things Repeatedly (Preview)

* **`for` loops:** best for iterating over a sequence or a `range()` of numbers.
* **`while` loops:** run as long as a condition is `True` — best for menus or "keep going until the user quits."
* `break` stops a loop immediately; `continue` skips to the next iteration.
* *(Module 4 goes deeper on loops applied to real lists of expenses — this module just gets you comfortable with the syntax.)*

### 3. VS Code Skill: The Debugger (F5)

1. Click to the left of a line number to set a **Breakpoint** (a red dot).
2. Press **F5**.
3. Step through your `if` statements line-by-line to see exactly which path the computer takes.

### Project Milestone: Add a Budget Warning to `tracker.py`

Add a `BUDGET_LIMIT` check right after the expense is logged — if this single expense alone exceeds it, warn the user.

```python
# tracker.py (continued from Part 1)
from datetime import date

BUDGET_LIMIT = 5000.0

print("Expense & Task Tracker — v0.3")

category = input("Category: ").strip().title()
amount = float(input("Amount: ").strip())

print("\n--- Expense Logged ---")
print(f"Date:     {date.today()}")
print(f"Category: {category}")
print(f"Amount:   {amount:.2f}")

if amount < 0:
    print("Error: amount cannot be negative.")
elif amount > BUDGET_LIMIT:
    print(f"⚠️  Warning: this expense exceeds your budget limit of {BUDGET_LIMIT:.2f}!")
else:
    print("Within budget.")
```

**Checkpoint tasks**
* Set a breakpoint on the `if amount < 0:` line. Press F5 and step through with a negative amount, then a large amount, then a normal amount — confirm each takes the path you expect.
* Explain in a comment why the negative-amount check needs to come *before* the budget check.

---

## Module 4: Loops & Lists (Efficiency)

This module moves `tracker.py` from handling *one* expense per run to handling *many* — the real reason people write scripts instead of doing arithmetic by hand.

### Core concepts

* **Lists:** ordered collections, `[]`. Each item has an index starting at 0.
* **`for` loops:** repeat an action for every item in a list or a range of numbers.
* **`while` loops:** repeat while a condition is `True` — perfect for "keep asking until the user types `done`."
* **Windows practical:** loops are what enable batch operations — renaming every file in a folder, checking every transaction in a list, and (here) logging several expenses in one sitting.

### Project Milestone: Batch-Import Expenses

Refactor `tracker.py` so it keeps collecting expenses in a `while` loop until the user types `done`, storing each one as a dictionary inside a list.

```python
# tracker.py (continued)
from datetime import date

BUDGET_LIMIT = 5000.0
expenses = []  # each item will be a dict: {"date": ..., "category": ..., "amount": ...}

print("Expense & Task Tracker — v0.4")
print("Type 'done' as the category when you're finished.\n")

while True:
    category = input("Category (or 'done' to finish): ").strip().title()
    if category.lower() == "done":
        break

    amount = float(input("Amount: ").strip())

    if amount > BUDGET_LIMIT:
        print(f"⚠️  Warning: exceeds budget limit of {BUDGET_LIMIT:.2f}!")

    expenses.append({
        "date": str(date.today()),
        "category": category,
        "amount": amount
    })

print(f"\n--- Logged {len(expenses)} Expense(s) ---")
for expense in expenses:
    print(f"{expense['date']} | {expense['category']:<12} | {expense['amount']:.2f}")
```

**Checkpoint tasks**
* Run it and log 3-4 expenses across different categories, then confirm the summary at the end lists all of them, in order.
* Explain, in a comment, why `expenses` needs to be a list of dictionaries rather than a list of plain numbers — what information would you lose otherwise?

---

## Module 5: Functions & Modules

To keep `tracker.py` organized as it grows, we wrap repeated logic into named, reusable functions.

### Core concepts

* **`def`**: wraps logic into a reusable tool.
* **Parameters vs. Arguments:** parameters are the placeholders in the definition; arguments are the actual values passed in.
* **Return values:** `return` sends a result back to the caller. Without it, a function returns `None`.
* **Scope:** variables created inside a function are **local**; variables created outside are **global**.
* **Modules:** `import` built-in tools like `datetime` (already in use) and `pathlib` (next module).

### Project Milestone: Refactor `tracker.py` Into Real Functions

```python
# tracker.py (continued)
from datetime import date

BUDGET_LIMIT = 5000.0

def add_expense(expenses, category, amount):
    """Appends a new expense dict to the list and returns it."""
    expense = {"date": str(date.today()), "category": category, "amount": amount}
    expenses.append(expense)
    return expense

def calculate_total(expenses):
    """Returns the sum of every expense's amount."""
    return sum(expense["amount"] for expense in expenses)

def is_over_budget(amount, limit=BUDGET_LIMIT):
    """Returns True if a single expense exceeds the given limit."""
    return amount > limit

def print_summary(expenses):
    print(f"\n--- Logged {len(expenses)} Expense(s) ---")
    for expense in expenses:
        print(f"{expense['date']} | {expense['category']:<12} | {expense['amount']:.2f}")
    print(f"Total spent: {calculate_total(expenses):.2f}")

def run():
    expenses = []
    print("Expense & Task Tracker — v0.5")
    print("Type 'done' as the category when you're finished.\n")

    while True:
        category = input("Category (or 'done' to finish): ").strip().title()
        if category.lower() == "done":
            break

        amount = float(input("Amount: ").strip())
        if is_over_budget(amount):
            print(f"⚠️  Warning: exceeds budget limit of {BUDGET_LIMIT:.2f}!")

        add_expense(expenses, category, amount)

    print_summary(expenses)

run()
```

*Notice `run()` no longer does any of the actual logic itself — it just calls the four functions above in the right order. Every function is small, named, and testable on its own.*

**Checkpoint tasks**
* Call `calculate_total()` directly with a small hardcoded list of expense dicts (no `input()` involved) and confirm it returns the right number — this is how you'll write real tests later.
* Explain the difference between a function that `print()`s something and one that `return`s something — why does `calculate_total()` need to `return` rather than just `print()`?

---

## Module 6: File I/O & Error Handling (Windows File System)

Right now, every expense you log disappears the moment you close `tracker.py`. This module fixes that.

### Core concepts

* **Reading and writing:** create, read, and update `.csv` files.
* **Context managers:** `with open()` ensures a file closes properly even if an error happens partway through.
* **Error handling:** `try`/`except` prevents crashes and lets you show a helpful message instead.
* **Modes:** `'r'` (read), `'w'` (write, overwrites), `'a'` (append, adds to the end).

### Pattern to remember (reliable automation)
* Validate input early.
* Use `Path` from `pathlib` for Windows-friendly file paths.
* Catch predictable errors (missing file, invalid number).
* Print a clear message for the user.

### Project Milestone: Save & Load Expenses to `expenses.csv`

```python
# tracker.py (continued)
import csv
from datetime import date
from pathlib import Path

BUDGET_LIMIT = 5000.0
EXPENSES_FILE = Path("expenses.csv")

def load_expenses():
    """Reads expenses.csv into a list of dicts. Returns [] if the file doesn't exist yet."""
    if not EXPENSES_FILE.exists():
        return []

    with EXPENSES_FILE.open("r", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return [
            {"date": row["date"], "category": row["category"], "amount": float(row["amount"])}
            for row in reader
        ]

def save_expense(expense):
    """Appends one expense to expenses.csv, writing the header if the file is new."""
    is_new_file = not EXPENSES_FILE.exists()
    with EXPENSES_FILE.open("a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if is_new_file:
            writer.writerow(["date", "category", "amount"])
        writer.writerow([expense["date"], expense["category"], f"{expense['amount']:.2f}"])

def add_expense(category, amount):
    expense = {"date": str(date.today()), "category": category, "amount": amount}
    save_expense(expense)
    return expense

def calculate_total(expenses):
    return sum(expense["amount"] for expense in expenses)

def run():
    expenses = load_expenses()
    print("Expense & Task Tracker — v0.6")
    print(f"Loaded {len(expenses)} expense(s) from a previous session.\n")
    print("Type 'done' as the category when you're finished.\n")

    while True:
        category = input("Category (or 'done' to finish): ").strip().title()
        if category.lower() == "done":
            break

        try:
            amount = float(input("Amount: ").strip())
        except ValueError:
            print("Amount must be a number. Try again.")
            continue

        if amount > BUDGET_LIMIT:
            print(f"⚠️  Warning: exceeds budget limit of {BUDGET_LIMIT:.2f}!")

        expenses.append(add_expense(category, amount))

    print(f"\nTotal spent (all time): {calculate_total(expenses):.2f}")

run()
```

*Notice this now survives closing the terminal. Run `tracker.py`, log an expense, close the terminal, reopen it, and run it again — your previous expenses load right back in.*

**Checkpoint tasks**
* Delete `expenses.csv`, run `tracker.py`, and confirm it correctly reports "Loaded 0 expense(s)" instead of crashing.
* Type letters instead of a number for an amount, and confirm you get the friendly error message instead of a crash.
* Open `expenses.csv` in a text editor (or Excel) and confirm the data looks right.
