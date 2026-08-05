# Part 4: Deployment & Interfaces

This final part turns `tracker.py` from a console script into a real Windows desktop app, and packages it so someone without Python installed can run it.

## Module 10: GUI Development (Windows Apps with Tkinter)

### Core concepts

* **Tkinter:** Python's built-in GUI library — no extra install needed, works natively on Windows.
* **Widgets:** Labels (display text), Entries (text input boxes), Buttons (trigger actions), Text (multi-line input/output).
* **Event handling:** connect a button's `command=` to a function that runs your existing tracker logic.

### Project Milestone: The Expense & Task Tracker, as a Real Window

This reuses every function and class you already built in Parts 2 and 3 — `Expense`, `Task`, `category_totals()`, `get_usd_to_ngn_rate()` — and simply gives them a GUI instead of `input()`/`print()`.

```python
# gui.py
import tkinter as tk
from tkinter import messagebox
from models import Expense, Task
from tracker import save_expense, load_expenses, category_totals, get_usd_to_ngn_rate, convert_to_ngn

expenses = load_expenses()
tasks = []

def handle_add_expense():
    category = category_entry.get().strip().title()
    amount_text = amount_entry.get().strip()

    if not category:
        messagebox.showwarning("Input error", "Category is required.")
        return

    try:
        amount = float(amount_text)
    except ValueError:
        messagebox.showwarning("Input error", "Amount must be a number.")
        return

    expense = Expense(category, amount)
    expenses.append(expense)
    save_expense(expense.as_dict())

    output.insert(tk.END, f"{expense}\n")
    category_entry.delete(0, tk.END)
    amount_entry.delete(0, tk.END)

def handle_add_task():
    description = task_entry.get().strip()
    if not description:
        messagebox.showwarning("Input error", "Task description is required.")
        return

    task = Task(description)
    tasks.append(task)
    output.insert(tk.END, f"{task}\n")
    task_entry.delete(0, tk.END)

def handle_show_totals():
    totals = category_totals([e.as_dict() for e in expenses])
    output.insert(tk.END, "\n--- Category Totals ---\n")
    for category, total in totals.items():
        output.insert(tk.END, f"{category}: {total:.2f}\n")

window = tk.Tk()
window.title("Expense & Task Tracker")
window.geometry("420x480")

tk.Label(window, text="Category").pack(pady=(10, 0))
category_entry = tk.Entry(window)
category_entry.pack()

tk.Label(window, text="Amount").pack(pady=(10, 0))
amount_entry = tk.Entry(window)
amount_entry.pack()

tk.Button(window, text="Add Expense", command=handle_add_expense).pack(pady=8)

tk.Label(window, text="New Task").pack(pady=(10, 0))
task_entry = tk.Entry(window)
task_entry.pack()
tk.Button(window, text="Add Task", command=handle_add_task).pack(pady=8)

tk.Button(window, text="Show Category Totals", command=handle_show_totals).pack(pady=8)

output = tk.Text(window, height=12)
output.pack(pady=10, fill="both", expand=True)

window.mainloop()
```

*Notice `gui.py` doesn't reimplement any logic — it imports and reuses `Expense`, `Task`, `save_expense()`, and `category_totals()` straight from the modules you already built. The GUI is a new *front end*; the app's actual brain hasn't changed.*

**Checkpoint tasks**
* Add expenses and tasks through the window and confirm they appear in the output box.
* Confirm `expenses.csv` is still being written to correctly — open it after adding a few entries through the GUI.
* Add a "Convert to NGN" button that calls `get_usd_to_ngn_rate()` and displays the converted total in the output box.

---

## Module 11: Virtual Environments & Distribution

Once your app works, prepare it to run cleanly — and be shareable — on other computers.

### Virtual environments (`venv`)

A virtual environment is an isolated bubble for one project.

Why this matters (real world)
* Project A needs older libraries, Project B needs newer ones. Without `venv`, installs collide and break projects. With `venv`, each project stays stable and repeatable.

Windows workflow
* Create: `python -m venv .venv`
* Activate (PowerShell): `.venv\Scripts\Activate.ps1`
* Install packages: `pip install requests`
* Save requirements: `pip freeze > requirements.txt` (you already did this once in Module 7 — now it matters for real, since `requests` needs to be installed on whatever machine runs your `.exe` build).

### Packaging to a `.exe`

* **`auto-py-to-exe`** packages a script into a Windows `.exe` so users can run it without installing Python at all.
* Install it inside your `.venv`: `pip install auto-py-to-exe`
* Run it: `auto-py-to-exe` (opens a GUI of its own) → point it at `gui.py`, choose "One File," and build.

Real-world examples
* Sending a simple tool to a teammate who has never installed Python.
* Building a small internal utility for non-technical staff.

**Checkpoint tasks**
* Create `.venv` inside your `expense_tracker` folder, activate it, and reinstall `requests` inside it.
* Regenerate `requirements.txt` from inside the activated `.venv`.
* Package `gui.py` into a standalone `.exe` using `auto-py-to-exe`, and confirm it launches on double-click without needing `python` installed.

---

## Final Capstone: The Expense & Task Tracker

**Objective:** Ship the finished, packaged desktop app — the same file you started as `tracker.py` v0.1 back in Module 1, now a real Windows application.

**Requirements checklist:**

* [ ] **Data model (Module 8):** Real `Expense` and `Task` classes, not raw dictionaries.
* [ ] **Persistence (Module 6):** Expenses saved to and loaded from `expenses.csv`; the app remembers everything between runs.
* [ ] **Reporting (Module 7):** Category totals and duplicate-category detection both working correctly.
* [ ] **Live data (Module 9):** A real, live USD→NGN exchange rate fetched via `requests`, with a graceful offline fallback.
* [ ] **Interface (Module 10):** A real Tkinter window — no more `input()`/`print()` for end users.
* [ ] **Packaging (Module 11):** A working `requirements.txt` and a standalone `.exe` built with `auto-py-to-exe`.

**Submission:**
1.  **Code it:** Your finished `models.py`, `tracker.py`, and `gui.py`.
2.  **Document it:** Comments explaining what each function/class does — focus on *why*, not *what*.
3.  **Debug it:** Use the F5 debugger to trace at least one real logic path (e.g., what happens when the budget limit is exceeded, or when the exchange-rate API fails).
4.  **Package it:** The final `.exe`, plus `requirements.txt`.

This is your portfolio piece — one continuously-grown application, not a picked-from-a-menu toy project.
