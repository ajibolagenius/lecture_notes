# 🐍 Python Course — Tutor's Master Outline
### Deejoft Coding School | Python Programming Track
**Instructor Notes — Beginner to Intermediate (Windows Focus)**

---

> **Dear Tutor,**
> Python is often students' first experience with a general-purpose programming language. Unlike HTML/CSS, everything here is abstract — there's no visual feedback on screen until you deliberately create it. Your job is to keep students grounded in *real-world applications*. At Deejoft, we frame everything around Windows automation, file management, and practical utilities. If a student can see how a concept helps them automate a boring task, they stay motivated.

---

## 🗺️ Course at a Glance

| Part | Module | Focus | Key Outcome |
|------|--------|-------|-------------|
| Part 1 | 1 | Setup & Environment | Run a Python script from PowerShell |
| Part 1 | 2 | Building Blocks | Receipt calculator or bio generator |
| Part 2 | 4 | Loops & Lists | Batch file renaming tool |
| Part 2 | 5 | Functions & Modules | Reusable toolkit |
| Part 2 | 6 | File I/O & Error Handling | Expense tracker that reads/writes CSV |
| Part 3 | 7 | Advanced Data Handling | Data cleaning utilities |
| Part 3 | 8 | Object-Oriented Programming | Inventory management system |
| Part 4 | 10 | GUI Development (Tkinter) | Windows desktop app |
| Part 4 | 11 | Virtual Environments & Distribution | Shareable `.exe` tool |
| Capstone | — | Choose one of 3 projects | Portfolio-ready project |

**Prerequisites:** None (absolute beginners welcome, but logical thinking helps)  
**Platform:** Windows (PowerShell + VS Code)  
**Python Version:** 3.10+ (always recommend installing the latest stable release)

---

## 🎯 Course Philosophy

Three principles to build from the start:

1. **Readable code is correct code** — Python's philosophy is readability. If your code is hard to read, it's probably wrong.
2. **Automate your own life** — Every concept should be linked to a real task the student might actually want to automate.
3. **Errors are teachers** — Read every error message. Understand it. Then fix it.

---

## 📦 Part 1: The Foundation

### Module 1 — The Launchpad (Setup & Environment)

**Tutor Guidance:**
Nothing is more demoralising than spending the first session fighting installation issues. Arrive early. Have a checklist. The two most common issues on Windows: (1) Python not added to PATH, (2) VS Code not recognising the Python interpreter.

**Python Installation Checklist:**
```
✅ Download from python.org — choose the latest stable version
✅ On the installer, CHECK "Add Python to PATH" (critical!)
✅ After install, open PowerShell and verify:
   python --version     → Should print Python 3.x.x
   pip --version        → Should print pip x.x.x
✅ Install VS Code extensions: Python (Microsoft), Pylance
✅ In VS Code, press Ctrl+Shift+P → "Python: Select Interpreter" → choose correct version
```

**Essential PowerShell Commands for Students:**
```powershell
# Print current folder
pwd

# List files in current folder
ls  (or dir)

# Change directory
cd Documents
cd ..          # Go up one level
cd ~           # Go to home directory

# Create a folder
mkdir my_project

# Run a Python file
python script.py

# Open current folder in VS Code
code .
```

**Your First Python Script:**
```python
# hello.py

# This is a comment — Python ignores this line
# Comments explain your code to humans

print("Hello, World!")
print("Welcome to Deejoft Coding School!")
print(2 + 2)  # Python can evaluate expressions directly
```

---

### Module 2 — The Building Blocks

**Tutor Guidance:**
Start with the REPL (interactive Python shell) — type `python` in PowerShell and start typing expressions. This gives instant feedback and helps students understand types and operators before writing files.

**Variables and Data Types:**
```python
# Variables store data — Python figures out the type automatically (dynamic typing)

# String — text, always in quotes
first_name = "Ada"
last_name = 'Lovelace'   # Single or double quotes both work
school = "Deejoft Coding School"

# Integer — whole numbers
age = 30
students_enrolled = 48

# Float — decimal numbers
price = 99.99
tax_rate = 0.075

# Boolean — True or False (capital first letter in Python!)
is_active = True
has_paid = False

# Check what type a variable is
print(type(age))          # <class 'int'>
print(type(price))        # <class 'float'>
print(type(first_name))   # <class 'str'>
print(type(is_active))    # <class 'bool'>
```

**User Input and Type Conversion:**
```python
# input() ALWAYS returns a string
name = input("What is your name? ")     # Returns str
age_str = input("How old are you? ")    # Returns str "25", not int 25

# Type conversion is necessary for calculations
age = int(age_str)            # str → int
price = float(input("Price: "))  # str → float (can chain directly)

# Checking your conversion
print(f"Hello, {name}! In 10 years you'll be {age + 10}.")
```

> **Common Error:** `TypeError: can only concatenate str (not "int") to str`  
> This means a student is trying to do `"Age: " + age` where `age` is an int.  
> Fix: Use an f-string: `f"Age: {age}"` — no conversion needed.

**F-Strings (Modern String Formatting):**
```python
name = "Ada"
language = "Python"
years = 3
hourly_rate = 85.50

# Basic f-string — put f before the opening quote
intro = f"My name is {name} and I have {years} years of {language} experience."

# Expressions inside f-strings
daily_rate = f"At ${hourly_rate:.2f}/hr, 8 hours = ${hourly_rate * 8:.2f}"
# :.2f = format as float with 2 decimal places

# Multi-line f-string
receipt = f"""
========== RECEIPT ==========
Item:  Python Course
Price: ${hourly_rate * 40:.2f}
Tax:   ${hourly_rate * 40 * 0.075:.2f}
TOTAL: ${hourly_rate * 40 * 1.075:.2f}
=================================
"""
print(receipt)
```

---

## 📦 Part 2: Automation and Structure

### Module 4 — Loops and Lists

**Tutor Guidance:**
Loops are where programming starts to feel powerful. Show the *without loops* version first — manually printing 100 lines — then show the loop version. The contrast is dramatic.

**Lists:**
```python
# A list stores multiple values in order
courses = ["HTML", "CSS", "JavaScript", "React", "Python"]
scores = [88, 92, 75, 95, 81]
mixed = ["Ada", 30, True, 99.99]  # Lists can hold any types

# Accessing items (zero-indexed, just like JavaScript)
print(courses[0])   # "HTML"
print(courses[-1])  # "Python" — negative index counts from end

# Slicing — get a portion of the list
print(courses[1:4]) # ["CSS", "JavaScript", "React"]

# List methods
courses.append("React Native")   # Add to end
courses.insert(0, "Command Line")  # Insert at index 0
courses.remove("HTML")           # Remove by value
popped = courses.pop()           # Remove and return last item
print(len(courses))              # Number of items
print("CSS" in courses)          # True/False membership check
courses.sort()                   # Sort in place
```

**For Loops:**
```python
# Loop over a list
for course in courses:
    print(f"📚 {course}")

# Loop with index — use enumerate()
for index, course in enumerate(courses, start=1):
    print(f"{index}. {course}")

# Loop over a range of numbers
for i in range(1, 6):       # 1, 2, 3, 4, 5
    print(f"Lesson {i}")

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8 (step of 2)
    print(i)

# Practical example: Process a list of numbers
scores = [88, 92, 75, 95, 81, 67]
total = 0
for score in scores:
    total = total + score   # or: total += score

average = total / len(scores)
print(f"Class average: {average:.1f}")
```

**Windows Automation Example — Batch File Renaming:**
```python
# Rename all .txt files in a folder to add a date prefix
from pathlib import Path
from datetime import date

folder = Path("C:/Users/YourName/Documents/Reports")
today = date.today().strftime("%Y-%m-%d")  # e.g., "2025-06-15"

renamed_count = 0
for file in folder.iterdir():
    if file.suffix == ".txt":
        new_name = f"{today}_{file.name}"
        file.rename(folder / new_name)
        renamed_count += 1
        print(f"Renamed: {file.name} → {new_name}")

print(f"\nDone! Renamed {renamed_count} files.")
```

**While Loops:**
```python
# while loops run as long as a condition is True
attempts = 0
max_attempts = 3
correct_pin = "1234"

while attempts < max_attempts:
    pin = input("Enter PIN: ")
    attempts += 1
    
    if pin == correct_pin:
        print("Access granted! ✅")
        break  # Exit the loop
    else:
        remaining = max_attempts - attempts
        if remaining > 0:
            print(f"Incorrect. {remaining} attempts remaining.")
        else:
            print("Account locked. ❌")
```

---

### Module 5 — Functions and Modules

**Tutor Guidance:**
The DRY principle (Don't Repeat Yourself) is the motivation for functions. Show the same calculation written 3 times in a row, then refactored into a function. The improvement is obvious.

**Defining and Calling Functions:**
```python
# Basic function — no parameters, no return value
def print_separator():
    print("=" * 40)

print_separator()  # Call it
print_separator()  # Reuse it

# Function with parameters
def greet(name, greeting="Hello"):  # Default parameter
    print(f"{greeting}, {name}!")

greet("Ada")               # Hello, Ada!
greet("Ada", "Welcome")    # Welcome, Ada!

# Function with return value
def calculate_vat(price, rate=0.075):
    vat_amount = price * rate
    total = price + vat_amount
    return total  # Returns the result to the caller

course_total = calculate_vat(500)
print(f"Total with VAT: ₦{course_total:.2f}")

# Returning multiple values (as a tuple)
def get_name_parts(full_name):
    parts = full_name.strip().split()
    first = parts[0]
    last = parts[-1] if len(parts) > 1 else ""
    return first, last  # Returns a tuple

first, last = get_name_parts("Ada Lovelace")
print(first)  # Ada
print(last)   # Lovelace
```

**Importing Built-in Modules:**
```python
# pathlib — modern file path handling
from pathlib import Path

desktop = Path.home() / "Desktop"
new_folder = desktop / "MyProject"
new_folder.mkdir(exist_ok=True)  # Create folder (no error if it exists)

# List all Python files recursively
for py_file in desktop.rglob("*.py"):
    print(py_file)

# datetime — working with dates and times
from datetime import datetime, date, timedelta

now = datetime.now()
print(now.strftime("%d %B %Y at %H:%M"))  # e.g., "15 June 2025 at 14:30"

today = date.today()
next_week = today + timedelta(days=7)
print(f"Today: {today}, Next week: {next_week}")

# random — for games, simulations, sampling
import random

print(random.randint(1, 6))        # Random die roll
print(random.choice(["HTML", "CSS", "Python"]))  # Pick randomly from list
numbers = list(range(1, 11))
random.shuffle(numbers)            # Shuffle in place
sample = random.sample(numbers, 3) # Pick 3 without repetition
```

---

### Module 6 — File I/O and Error Handling

**Tutor Guidance:**
Error handling is a professional skill. Students often write "happy path" code that assumes everything works. Show them what happens when a file doesn't exist, when the user types text instead of a number, when the network is down. Then show them `try/except`.

**Reading and Writing Files:**
```python
# Writing a text file
with open("expenses.txt", "w", encoding="utf-8") as file:
    file.write("Date,Item,Amount\n")
    file.write("2025-06-01,Coffee,3.50\n")
    file.write("2025-06-01,Lunch,12.00\n")
# 'with' automatically closes the file — always use this

# Reading a text file
with open("expenses.txt", "r", encoding="utf-8") as file:
    content = file.read()        # Read entire file as one string
    # OR
    lines = file.readlines()     # Read as a list of lines
    # OR (most Pythonic for large files)
    for line in file:
        print(line.strip())

# Appending to a file (doesn't overwrite)
with open("expenses.txt", "a", encoding="utf-8") as file:
    file.write("2025-06-02,Transport,2.00\n")
```

**Working with CSV Files:**
```python
import csv

# Writing CSV
expenses = [
    {"date": "2025-06-01", "item": "Coffee", "amount": 3.50},
    {"date": "2025-06-01", "item": "Lunch", "amount": 12.00},
    {"date": "2025-06-02", "item": "Books", "amount": 45.00},
]

with open("expenses.csv", "w", newline="", encoding="utf-8") as file:
    fieldnames = ["date", "item", "amount"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    writer.writeheader()          # Writes the column headers
    writer.writerows(expenses)    # Writes all rows at once

# Reading CSV
with open("expenses.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)  # Each row becomes a dictionary
    total = 0
    for row in reader:
        amount = float(row["amount"])
        total += amount
        print(f"{row['date']} — {row['item']}: ${amount:.2f}")
    
    print(f"\nTotal spent: ${total:.2f}")
```

**Error Handling with try/except:**
```python
# Without error handling — script crashes on bad input
age = int(input("Enter your age: "))  # Crashes if user types "abc"

# With error handling — graceful failure
def get_age():
    while True:
        try:
            age = int(input("Enter your age: "))
            if age < 0 or age > 120:
                raise ValueError("Age must be between 0 and 120")
            return age
        except ValueError as e:
            print(f"Invalid input: {e}. Please enter a valid number.")

# Handling file errors
def load_config(filepath):
    try:
        with open(filepath, "r") as file:
            return file.read()
    except FileNotFoundError:
        print(f"Config file not found: {filepath}")
        print("Using default settings.")
        return None
    except PermissionError:
        print(f"Permission denied: Cannot read {filepath}")
        return None
    except Exception as e:
        print(f"Unexpected error reading config: {e}")
        return None
```

---

## 📦 Part 3: Intermediate Mastery

### Module 7 — Advanced Data Handling

```python
# Dictionaries — fast key:value lookups
student = {
    "name": "Ada Lovelace",
    "age": 30,
    "courses": ["HTML", "Python"],
    "scores": {"HTML": 95, "Python": 88}
}

print(student["name"])                     # "Ada Lovelace"
print(student.get("email", "Not set"))     # .get() with a default — no KeyError

# Iterating a dictionary
for key, value in student.items():
    print(f"{key}: {value}")

# List comprehension — compact, readable transformations
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Old way:
evens = []
for n in numbers:
    if n % 2 == 0:
        evens.append(n)

# Comprehension way: [expression for item in iterable if condition]
evens = [n for n in numbers if n % 2 == 0]
squares = [n ** 2 for n in numbers]
upper_names = [name.upper() for name in ["ada", "alan", "grace"]]

# Sets — unordered, unique values (great for deduplication)
emails = ["ada@test.com", "alan@test.com", "ada@test.com", "grace@test.com"]
unique_emails = set(emails)
print(unique_emails)  # {'ada@test.com', 'alan@test.com', 'grace@test.com'}
```

---

### Module 8 — Object-Oriented Programming (OOP)

**Tutor Guidance:**
OOP is abstract for beginners. Always ground it in a real-world model. "Let's model a bank account" or "let's model a student record." Students understand objects when they can relate to what's being modelled.

```python
class Student:
    # Class variable — shared by ALL instances
    school_name = "Deejoft Coding School"
    total_students = 0
    
    def __init__(self, name, age, course):
        """Constructor — runs automatically when a new Student is created"""
        # Instance variables — unique to each Student object
        self.name = name
        self.age = age
        self.course = course
        self.grades = []
        self.is_active = True
        Student.total_students += 1
    
    def add_grade(self, subject, score):
        """Add a grade to the student's record"""
        self.grades.append({"subject": subject, "score": score})
    
    def get_average(self):
        """Calculate and return the student's average score"""
        if not self.grades:
            return 0
        total = sum(g["score"] for g in self.grades)
        return total / len(self.grades)
    
    def get_report(self):
        """Return a formatted student report"""
        avg = self.get_average()
        grade_letter = "A" if avg >= 90 else "B" if avg >= 75 else "C" if avg >= 60 else "F"
        return (
            f"{'=' * 35}\n"
            f"Student: {self.name}\n"
            f"Course:  {self.course}\n"
            f"Average: {avg:.1f} ({grade_letter})\n"
            f"{'=' * 35}"
        )
    
    def __str__(self):
        """What prints when you print(student) — always define this"""
        return f"Student({self.name}, {self.course})"
    
    def __repr__(self):
        """Developer-friendly representation"""
        return f"Student(name={self.name!r}, course={self.course!r})"


# Inheritance — a specialised version of Student
class InternationalStudent(Student):
    def __init__(self, name, age, course, country):
        super().__init__(name, age, course)  # Call parent __init__
        self.country = country
    
    def get_report(self):
        """Override parent method to add country info"""
        base_report = super().get_report()  # Get parent's report
        return base_report + f"\nCountry: {self.country}"


# Using the classes
ada = Student("Ada Lovelace", 30, "Python")
ada.add_grade("Loops", 92)
ada.add_grade("Functions", 88)
ada.add_grade("OOP", 95)
print(ada.get_report())
print(f"Total students: {Student.total_students}")

alan = InternationalStudent("Alan Turing", 28, "Python", "UK")
alan.add_grade("OOP", 98)
print(alan.get_report())
```

---

## 📦 Part 4: Deployment and Interfaces

### Module 10 — GUI Development (Tkinter)

```python
import tkinter as tk
from tkinter import ttk, messagebox

def create_tip_calculator():
    root = tk.Tk()
    root.title("Tip Calculator")
    root.geometry("350x250")
    root.resizable(False, False)

    # === INPUT SECTION ===
    tk.Label(root, text="Bill Amount (₦):").grid(row=0, column=0, padx=10, pady=10, sticky="w")
    bill_entry = tk.Entry(root, width=20)
    bill_entry.grid(row=0, column=1, padx=10, pady=10)

    tk.Label(root, text="Tip Percentage (%):").grid(row=1, column=0, padx=10, pady=5, sticky="w")
    tip_var = tk.IntVar(value=15)
    tip_spinbox = ttk.Spinbox(root, from_=0, to=50, textvariable=tip_var, width=18)
    tip_spinbox.grid(row=1, column=1, padx=10, pady=5)

    # === RESULT SECTION ===
    result_label = tk.Label(root, text="", font=("Arial", 12, "bold"), fg="green")
    result_label.grid(row=3, column=0, columnspan=2, pady=10)

    # === BUTTON & LOGIC ===
    def calculate():
        try:
            bill = float(bill_entry.get())
            tip_pct = tip_var.get()
            tip_amount = bill * (tip_pct / 100)
            total = bill + tip_amount
            result_label.config(
                text=f"Tip: ₦{tip_amount:.2f}  |  Total: ₦{total:.2f}"
            )
        except ValueError:
            messagebox.showerror("Invalid Input", "Please enter a valid bill amount.")

    def clear():
        bill_entry.delete(0, tk.END)
        result_label.config(text="")

    tk.Button(root, text="Calculate", command=calculate, bg="#007bff", fg="white", width=12).grid(row=2, column=0, padx=5, pady=10)
    tk.Button(root, text="Clear", command=clear, width=12).grid(row=2, column=1, padx=5, pady=10)

    root.mainloop()

create_tip_calculator()
```

---

### Module 11 — Virtual Environments & Distribution

```powershell
# Create a virtual environment inside your project
python -m venv venv

# Activate it (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# You should see (venv) at the start of the prompt

# Install packages (they stay isolated to this project)
pip install requests pyinstaller

# Save all installed packages to requirements.txt
pip freeze > requirements.txt

# Someone else clones your project and installs everything
pip install -r requirements.txt

# Deactivate when done
deactivate
```

**Packaging as an `.exe`:**
```powershell
# Install auto-py-to-exe (GUI wrapper for PyInstaller)
pip install auto-py-to-exe

# Launch the GUI
auto-py-to-exe

# OR use PyInstaller directly
pyinstaller --onefile --windowed tip_calculator.py
# --onefile: pack into a single .exe
# --windowed: no console window (for GUI apps)
# Output: /dist/tip_calculator.exe
```

---

### 🏆 Capstone Project Options

**Option A: Automated File Organizer**
```
Goal: Sort ~/Downloads into subfolders by file type
Folders: Images/, Documents/, Videos/, Audio/, Archives/, Others/
Features: Dry-run mode (preview changes), logging to a .txt file, config.json for custom rules
```

**Option B: Desktop Weather App**
```
Goal: Tkinter GUI that fetches live weather from OpenWeatherMap API
Features: City search, temperature display, weather icon, error handling for invalid city/no internet
Stretch: Cache last result, dark/light mode toggle
```

**Option C: Task Manager**
```
Goal: Add, complete, and delete tasks. Data persists between sessions.
Storage: JSON or CSV file
Features: Priority levels, due dates, filter by status (all/active/done)
Stretch: Tkinter GUI
```

---

**Capstone Evaluation Rubric:**

| Criterion | Points |
|-----------|--------|
| Code runs without errors from PowerShell | 10 |
| Virtual environment + requirements.txt present | 10 |
| Uses functions (no repeated logic blocks) | 15 |
| Uses at least one module (pathlib, csv, datetime, etc.) | 10 |
| Error handling with try/except | 15 |
| Reads/writes to a file for persistence | 15 |
| Code is readable (clear variable names, comments) | 10 |
| Achieves the stated goal of the project | 15 |
| **Total** | **100** |

---

## 📚 Recommended Resources

- **Official Docs:** [docs.python.org/3](https://docs.python.org/3)
- **Automate the Boring Stuff:** [automatetheboringstuff.com](https://automatetheboringstuff.com) — free online, very practical
- **Python Tutor:** [pythontutor.com](https://pythontutor.com) — visualise code execution step by step
- **Real Python:** [realpython.com](https://realpython.com) — high-quality tutorials

---

*Deejoft Coding School — Instructor Materials | Python Track*  
*Last Updated: 2025*
