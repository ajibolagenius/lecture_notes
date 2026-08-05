# Part 2: Automation & Structure (Enhanced with Real World Practice)

This part teaches you how to scale from “one value” to “many values”, and how to structure your code so it stays clean, reusable, and reliable on Windows.

## Module 4: Loops & Lists (Efficiency)

This module focuses on handling collections of data rather than single values.

### Core concepts

• Lists: ordered collections defined with square brackets `[]`  
  Example: a digital grocery list where each item has an index (starting at 0)

• For loops: repeat an action for every item in a list or a range of numbers

• While loops: repeat while a condition is True  
  Best for menus or programs that run until the user types exit

• Windows practical: loops enable batch operations  
  Example: rename every file in a folder, check file sizes, or move downloads into subfolders

### Real world examples

• Finance checks: scan a list of amounts and flag negatives  
• Customer support: process a list of ticket IDs and print a short summary for each  
• File management: loop through a folder and rename files with a consistent naming pattern

### Mini project: “Transaction Flagging”
Goal: given a list of transaction amounts, print which ones need review

```python
amounts = [1200, 500, -50, 2000, 0, -10]

for a in amounts:
    if a < 0:
        print(f"Review needed: {a}")
    elif a == 0:
        print("Check: zero value transaction")
    else:
        print(f"OK: {a}")
```

Checkpoint tasks
• Create a list of five items and print each with its index  
• Write a while loop that asks for a password until the user types the correct one  
• Explain when you would choose a for loop over a while loop

***

## Module 5: Functions & Modules

To keep your code organized and avoid repeating yourself, you use functions and modules.

### Core concepts

• Defining functions with `def`: wrap logic into a reusable tool  
• Arguments: data passed into a function  
• Return values: the result sent back to the caller  
• Importing modules: use built in tools like `math`, `random`, `pathlib`, `datetime`

### Real world examples

• A data cleaning toolkit  
  `clean_name()` `clean_phone()` `clean_amount()`  

• A reusable discount engine  
  Used across receipts, invoices, and pricing scripts

• Automation helpers  
  `list_files(folder)` `rename_files(folder)` `write_log(message)`

### Mini project: “Reusable Discount Engine”

```python
def apply_discount(price: float, threshold: float = 50.0, rate: float = 0.10) -> float:
    if price > threshold:
        return price * (1 - rate)
    return price

prices = [12.5, 75.0, 49.99, 100.0]
final_prices = [round(apply_discount(p), 2) for p in prices]
print(final_prices)
```

Checkpoint tasks
• Write a function `to_upper(text)` that returns uppercase text  
• Write a function `safe_divide(a, b)` that returns None if b is zero  
• Explain the difference between printing and returning

***

## Module 6: File I O & Error Handling (Windows File System)

This is the bridge between your code and the Windows file system.

### Core concepts

• Reading and writing: create, read, and update `.txt` and `.csv` files  
• Context managers: `with open()` ensures files close properly even if errors happen  
• Error handling: `try` and `except` prevent crashes and allow helpful messages

### Real world examples

• Expense tracking: append daily expenses to a CSV  
• Logs: write errors to a log file instead of stopping the program  
• Automation reliability: handle missing files, wrong paths, or invalid user inputs

### Mini project: “Expense Logger” (CSV)

```python
import csv
from datetime import date
from pathlib import Path

file_path = Path("expenses.csv")
is_new_file = not file_path.exists()

category = input("Category: ").strip()
amount_text = input("Amount: ").strip()

try:
    amount = float(amount_text)
except ValueError:
    print("Amount must be a number.")
    raise SystemExit

with file_path.open("a", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    if is_new_file:
        writer.writerow(["date", "category", "amount"])
    writer.writerow([date.today().isoformat(), category, f"{amount:.2f}"])

print("Saved.")
```

### Pattern to remember (reliable automation)

• Validate input early  
• Use `Path` from `pathlib` for Windows friendly paths  
• Catch predictable errors (missing file, invalid number)  
• Print a clear message for the user

Checkpoint tasks
• Add a second script that reads `expenses.csv` and prints the total  
• Handle the case where the file does not exist yet  
• Add a simple log file `app.log` that records every time you save an expense

***

## Implementation Example: The File Creator (Upgraded)

This script creates multiple text files safely, and writes a message into each one.

```python
from pathlib import Path

files_to_create = ["notes.txt", "tasks.txt", "ideas.txt"]

def create_files(file_list):
    for filename in file_list:
        try:
            Path(filename).write_text(f"This is the start of your {filename} file.", encoding="utf-8")
            print(f"Created: {filename}")
        except OSError as e:
            print(f"Could not create {filename}: {e}")

print("Starting file automation")
create_files(files_to_create)
```

Practice steps
1. Save as `file_tool.py`  
2. Run `python file_tool.py`  
3. Use `dir` to confirm files were created  
4. Open one file and confirm the content is inside

Stretch goal
• Modify it to create files inside a folder called `outputs`
