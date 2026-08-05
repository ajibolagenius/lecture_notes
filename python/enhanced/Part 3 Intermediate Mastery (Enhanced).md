# Part 3: Intermediate Mastery (Enhanced with Real World Practice)

This part moves you from basic scripting into stronger data handling and better program design.

## Module 7: Advanced Data Handling (Dictionaries, Sets, Comprehensions, Pip)

These tools allow you to handle data with more precision and speed.

### Dictionaries and sets

• Dictionaries store data in key value pairs  
  Think customer_id → customer_record  
  They are fast for lookups

• Sets store unique items and remove duplicates automatically  
  Think “unique emails” or “unique transaction IDs”

Real world examples
• Create a lookup table of product_code → price  
• Remove duplicate phone numbers before sending messages  
• Build a quick frequency counter (how many times each category appears)

Mini project: “Category Totals”
Goal: sum amounts per category using a dictionary

```python
transactions = [
    ("transport", 15.0),
    ("food", 8.5),
    ("transport", 12.0),
    ("data", 5.0),
]

totals = {}
for category, amount in transactions:
    totals[category] = totals.get(category, 0) + amount

print(totals)
```

### List comprehensions

A Pythonic way to create lists by transforming or filtering an existing list.

Real world examples
• Keep only amounts above a threshold  
• Convert strings to cleaned versions  
• Generate a quick report list

Example
```python
amounts = [10, 60, 45, 120]
high_value = [a for a in amounts if a > 50]
print(high_value)
```

### Intro to pip

Pip is the package installer for Python.

Real world examples
• Install pandas to read CSV and Excel files  
• Install requests to fetch data from an API  
• Save project requirements so your setup is repeatable

Checkpoint steps
• Install a library: `pip install requests`  
• Confirm install: `pip show requests`  
• Export requirements: `pip freeze > requirements.txt`

Checkpoint tasks
• Turn a list with duplicates into unique items using a set  
• Write a dictionary that maps three usernames to roles  
• Write a comprehension that converts names to title case

***

## Module 8: Object Oriented Programming (OOP)

OOP is a way of organizing code so data and behavior live together.

### Core concepts

• Class: a blueprint  
• Object: an instance created from the blueprint  
• Attributes: what it is (stored data)  
• Methods: what it does (functions attached to the object)  
• Inheritance: make specialized versions without rewriting the basics

Real world examples
• A Transaction object that can validate itself and print a summary  
• An InventoryItem object with `sell()` and `restock()`  
• A SupportTicket object with `open()` `close()` and timestamps

Mini project: “Bank Transaction” Class

```python
from datetime import datetime

class Transaction:
    def __init__(self, txn_id: str, amount: float, txn_type: str):
        self.txn_id = txn_id
        self.amount = amount
        self.txn_type = txn_type  # "cr" or "dr"
        self.created_at = datetime.now()

    def is_valid(self) -> bool:
        return self.txn_type in {"cr", "dr"} and self.amount >= 0

    def summary(self) -> str:
        direction = "Credit" if self.txn_type == "cr" else "Debit"
        return f"{self.txn_id} | {direction} | {self.amount:.2f} | {self.created_at:%Y-%m-%d %H:%M}"

t1 = Transaction("TXN001", 250.0, "cr")
print(t1.summary(), "Valid:", t1.is_valid())
```

Checkpoint tasks
• Add a method `as_dict()` that returns a dictionary version of the transaction  
• Create three transactions and filter only valid ones  
• Explain why classes make large projects easier to maintain

***

## Implementation Example: System User Manager (Upgraded)

This example combines a dictionary lookup with a class.

```python
class User:
    def __init__(self, username, role):
        self.username = username
        self.role = role
        self.permissions = {"Guest": "Read Only", "Admin": "Full Access"}

    def get_access_level(self):
        return self.permissions.get(self.role, "No Access")

usernames = ["Alice", "Bob", "Charlie"]
users = [User(name, "Admin" if name == "Alice" else "Guest") for name in usernames]

print("System Access Audit")
for u in users:
    print(f"User: {u.username} | Role: {u.role} | Access: {u.get_access_level()}")
```

Practice extension
• Add a new role called Manager with a custom access level  
• Add input so the script asks for a username and role before creating the user
