# Part 3: Intermediate Mastery

This part moves `tracker.py` from basic scripting into stronger data handling, real program design with classes, and its first connection to the outside world via a live API.

## Module 7: Advanced Data Handling (Dictionaries, Sets, Comprehensions, Pip)

### Core concepts

* **Dictionaries** store data in key-value pairs and are fast for lookups — you've already been using them for each expense.
* **Sets** store unique items and remove duplicates automatically.
* **List/dict comprehensions** are a compact, Pythonic way to build a new collection by transforming or filtering an existing one.
* **Pip** is the package installer you'll use in Module 9 to install `requests`.

Real-world examples
* A lookup table of category → total spent (exactly what you're about to build).
* Deduplicating near-identical expense entries.
* A quick frequency counter for how often each category appears.

### Project Milestone: Category Totals & Duplicate Detection

```python
# tracker.py (continued)
def category_totals(expenses):
    """Returns a dict mapping each category to its total spend, using a comprehension-friendly pattern."""
    totals = {}
    for expense in expenses:
        category = expense["category"]
        totals[category] = totals.get(category, 0) + expense["amount"]
    return totals

def find_duplicate_categories(expenses):
    """Returns categories that appear more than once, using a set for fast membership checks."""
    seen = set()
    duplicates = set()
    for expense in expenses:
        category = expense["category"]
        if category in seen:
            duplicates.add(category)
        seen.add(category)
    return duplicates

# A comprehension version of the same totals report, for categories over a threshold:
def high_spend_categories(totals, threshold=1000.0):
    return [category for category, total in totals.items() if total > threshold]
```

Wire these into your summary at the end of `run()`:

```python
totals = category_totals(expenses)
print("\n--- Category Totals ---")
for category, total in totals.items():
    print(f"{category:<12}: {total:.2f}")

flagged = high_spend_categories(totals)
if flagged:
    print(f"High-spend categories (>1000): {', '.join(flagged)}")
```

**Checkpoint tasks**
* Log two expenses in the same category and confirm `category_totals()` correctly sums them instead of overwriting.
* Install a library with pip for the first time: `pip install requests` (you'll use it for real next module). Confirm with `pip show requests`.
* Export your environment's installed packages: `pip freeze > requirements.txt` — you'll need this file again in Part 4.

---

## Module 8: Object-Oriented Programming (OOP)

Up to now, an "expense" has just been a dictionary — nothing stops a bug from typing `expense["catgory"]` and getting a silent `KeyError` somewhere unrelated. Classes fix this, and let us introduce **Tasks** as a real, first-class part of the app for the first time.

### Core concepts

* **Class:** a blueprint. **Object:** a specific instance created from that blueprint.
* **`__init__`** is the constructor — it runs automatically when you create a new object and sets up its starting values.
* **`self`** refers to the current instance, letting a method read/change that specific object's own data.
* **Inheritance** lets one class reuse another's structure — not needed for `Expense`/`Task` (they're siblings, not parent/child), but worth knowing for later projects.

### Project Milestone: Real `Expense` and `Task` Classes

```python
# models.py — a new file, imported by tracker.py
from datetime import date

class Expense:
    def __init__(self, category: str, amount: float, entry_date: str = None):
        self.category = category
        self.amount = amount
        self.date = entry_date or str(date.today())

    def is_over_budget(self, limit: float) -> bool:
        return self.amount > limit

    def as_row(self) -> list:
        """For writing to CSV."""
        return [self.date, self.category, f"{self.amount:.2f}"]

    def __str__(self) -> str:
        return f"{self.date} | {self.category:<12} | {self.amount:.2f}"


class Task:
    def __init__(self, description: str, completed: bool = False):
        self.description = description
        self.completed = completed

    def mark_done(self):
        self.completed = True

    def __str__(self) -> str:
        status = "✅" if self.completed else "⬜️"
        return f"{status} {self.description}"
```

**A Modern Equivalent — `@dataclass`:** `Task` is a small class that's really just three lines of `__init__` boilerplate wrapped around two plain fields. The `dataclasses` module (built into Python) generates that boilerplate for you:
```python
from dataclasses import dataclass

@dataclass
class Task:
    description: str
    completed: bool = False

    def mark_done(self):
        self.completed = True

    def __str__(self) -> str:
        status = "✅" if self.completed else "⬜️"
        return f"{status} {self.description}"
```
*Same behavior, no hand-written `__init__` — `@dataclass` generates it (and a few other things, like a useful default `__repr__`) from the type-hinted fields alone. Worth knowing as the modern default for classes that are mostly just data with a couple of methods attached; `Expense` is written the "manual" way in this course specifically so you see what `@dataclass` is actually doing under the hood before reaching for the shortcut.*

```python
# tracker.py (continued) — now genuinely an Expense AND Task tracker
import json
from pathlib import Path
from models import Expense, Task

TASKS_FILE = Path("tasks.json")

def load_tasks() -> list[Task]:
    """Reads tasks.json into a list of Task objects. Returns [] if the file doesn't exist yet."""
    if not TASKS_FILE.exists():
        return []
    with TASKS_FILE.open("r", encoding="utf-8") as f:
        raw_tasks = json.load(f)
    return [Task(t["description"], completed=t["completed"]) for t in raw_tasks]

def save_tasks(tasks: list[Task]) -> None:
    """Overwrites tasks.json with the current in-memory task list."""
    with TASKS_FILE.open("w", encoding="utf-8") as f:
        json.dump(
            [{"description": t.description, "completed": t.completed} for t in tasks],
            f,
            indent=2
        )

expenses = []        # list of Expense objects, not dicts, from here on
tasks = load_tasks()  # tasks now survive closing the program, exactly like expenses do

def add_task(description: str) -> Task:
    task = Task(description)
    tasks.append(task)
    save_tasks(tasks)  # persist immediately — same pattern as Module 6's save_expense()
    return task

# Example usage inside run():
# expenses.append(Expense(category, amount))
# add_task("Submit October expense report")
```
*This is the fix for a gap that would otherwise follow this app all the way to the GUI in Part 4: without `load_tasks()`/`save_tasks()`, "Task" would be a feature that only ever exists in memory — every task would silently vanish the moment the program closes, while expenses correctly survive. JSON (not CSV) is the natural format here since a task is a simple flat object, not tabular data with many rows of the same shape needing a header row.*

**Checkpoint tasks**
* Add a method `Expense.as_dict()` that returns a plain dictionary version of an expense — useful anywhere you still need dict-shaped data (like your Module 6 CSV code).
* Create three `Task` objects, mark one as done with `.mark_done()`, and print all three using their `__str__` method to confirm the ✅/⬜️ status shows correctly.
* Add a few tasks, close and reopen the program, and confirm they're still there — open `tasks.json` directly in a text editor to confirm the completed/incomplete state was saved correctly too.
* Explain, in a comment, why bundling `is_over_budget()` as a *method* on `Expense` is more reliable than a separate function that takes an amount — what could go wrong with the separate-function version that can't happen with the method?

---

## Module 9: Consuming a Real API

Every number in your tracker so far has come from the keyboard. This module connects it to the outside world for the first time: a real, live currency exchange rate.

### Core concepts

* **What is an API?** A server that hands back data (usually JSON) when you ask it correctly — no browser needed.
* **`requests`:** the standard third-party library for making HTTP requests in Python (installed via pip last module).
* **Parsing JSON:** `response.json()` turns the API's response straight into a Python dictionary.
* **Handling failure:** networks fail, APIs go down, or you might be offline — always handle this, never assume success.
* **Don't hardcode config, even when it "just works":** it's tempting to type the API's URL directly into the function that uses it. That's fine for this specific API — it's free and needs no key — but the same habit applied to almost any *other* API (nearly all of which require a secret key) means that key sits in plain text in your source code, visible to anyone who opens the file or looks through your git history. The fix is the same either way: read config from an environment variable with `os.environ.get(...)`, so the real value lives outside your code entirely.

### Project Milestone: Live Currency Conversion

```python
# tracker.py (continued)
import os
import logging
import requests

API_URL = os.environ.get("EXCHANGE_RATE_API_URL", "https://open.er-api.com/v6/latest/USD")

def get_usd_to_ngn_rate() -> float:
    """
    Fetches a live USD -> NGN exchange rate from a free public API.
    Falls back to a hardcoded estimate if the request fails, so the
    app still works offline instead of crashing.
    """
    try:
        response = requests.get(API_URL, timeout=5)
        response.raise_for_status()
        data = response.json()
        return data["rates"]["NGN"]
    except (requests.RequestException, KeyError) as error:
        logging.error("Could not fetch live exchange rate: %s", error)
        print(f"Could not fetch live rate ({error}). Using fallback rate.")
        return 1600.0  # a rough fallback so the app keeps working offline

def convert_to_ngn(amount_usd: float, rate: float) -> float:
    return amount_usd * rate
```

*Notice `API_URL` now has a sensible default (this API needs no key, so a hardcoded fallback is genuinely fine here) but can be overridden with an environment variable without touching the code. If a future API you use **does** need a secret key, the same `os.environ.get()` pattern applies — you'd load it from a `.env` file (via `pip install python-dotenv`) instead of retyping it every session, and that `.env` file goes straight into `.gitignore`, never committed.*

Wire it into your summary:

```python
rate = get_usd_to_ngn_rate()
total_usd = sum(expense.amount for expense in expenses)
print(f"\nTotal spent: ${total_usd:.2f} USD (~₦{convert_to_ngn(total_usd, rate):.2f} NGN at today's rate)")
```

**Checkpoint tasks**
* Run the app with an active internet connection and confirm you get a real, current exchange rate (compare it against a quick web search).
* Temporarily disconnect from the internet (or mistype the URL) and confirm the app prints the fallback message, logs the same failure to `tracker.log`, and keeps running — it should never crash just because the network failed.
* Set `EXCHANGE_RATE_API_URL` to a deliberately broken URL as an environment variable (not in the code) and confirm the app picks it up and falls back gracefully — then unset it and confirm the real API is used again.
* Explain, in a comment, why the `except` clause catches `requests.RequestException` specifically instead of a bare `except:` — what's the risk of catching *everything*?
