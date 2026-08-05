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

```python
# tracker.py (continued) — now genuinely an Expense AND Task tracker
from models import Expense, Task

expenses = []  # list of Expense objects, not dicts, from here on
tasks = []     # a brand-new list — the app's first Task feature

def add_task(description):
    task = Task(description)
    tasks.append(task)
    return task

# Example usage inside run():
# expenses.append(Expense(category, amount))
# add_task("Submit October expense report")
```

**Checkpoint tasks**
* Add a method `Expense.as_dict()` that returns a plain dictionary version of an expense — useful anywhere you still need dict-shaped data (like your Module 6 CSV code).
* Create three `Task` objects, mark one as done with `.mark_done()`, and print all three using their `__str__` method to confirm the ✅/⬜️ status shows correctly.
* Explain, in a comment, why bundling `is_over_budget()` as a *method* on `Expense` is more reliable than a separate function that takes an amount — what could go wrong with the separate-function version that can't happen with the method?

---

## Module 9: Consuming a Real API

Every number in your tracker so far has come from the keyboard. This module connects it to the outside world for the first time: a real, live currency exchange rate.

### Core concepts

* **What is an API?** A server that hands back data (usually JSON) when you ask it correctly — no browser needed.
* **`requests`:** the standard third-party library for making HTTP requests in Python (installed via pip last module).
* **Parsing JSON:** `response.json()` turns the API's response straight into a Python dictionary.
* **Handling failure:** networks fail, APIs go down, or you might be offline — always handle this, never assume success.

### Project Milestone: Live Currency Conversion

```python
# tracker.py (continued)
import requests

def get_usd_to_ngn_rate() -> float:
    """
    Fetches a live USD -> NGN exchange rate from a free public API.
    Falls back to a hardcoded estimate if the request fails, so the
    app still works offline instead of crashing.
    """
    try:
        response = requests.get("https://open.er-api.com/v6/latest/USD", timeout=5)
        response.raise_for_status()
        data = response.json()
        return data["rates"]["NGN"]
    except (requests.RequestException, KeyError) as error:
        print(f"Could not fetch live rate ({error}). Using fallback rate.")
        return 1600.0  # a rough fallback so the app keeps working offline

def convert_to_ngn(amount_usd: float, rate: float) -> float:
    return amount_usd * rate
```

Wire it into your summary:

```python
rate = get_usd_to_ngn_rate()
total_usd = sum(expense.amount for expense in expenses)
print(f"\nTotal spent: ${total_usd:.2f} USD (~₦{convert_to_ngn(total_usd, rate):.2f} NGN at today's rate)")
```

**Checkpoint tasks**
* Run the app with an active internet connection and confirm you get a real, current exchange rate (compare it against a quick web search).
* Temporarily disconnect from the internet (or mistype the URL) and confirm the app prints the fallback message and keeps running — it should never crash just because the network failed.
* Explain, in a comment, why the `except` clause catches `requests.RequestException` specifically instead of a bare `except:` — what's the risk of catching *everything*?
