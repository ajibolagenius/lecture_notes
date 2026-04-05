# 📋 Python Class 1 — Lesson Plan (Tutor Script)
### Setup, Variables & Types
**Duration:** ~2 hours | **Format:** REPL-first, then first script

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:20 | What Python is for; `uv` setup |
| 0:20 – 0:55 | Variables, types, f-strings |
| 0:55 – 1:30 | Operators, type conversion, input() |
| 1:30 – 2:00 | First script: expense logger |

---

## 🎤 PART A — What Python Is For (0:00 – 0:20)

**[SAY:]:**
> "You have built web apps and mobile apps. Python is the language of the backend — the server that your apps talk to, the data analysis pipeline, the machine learning model, the automation script. Anything that does not have a user interface, or where the compute work is heavy, is probably Python."

**[SAY:]:**
> "Python's superpower is readability. A Python program reads almost like plain English. Compare this to JavaScript, which has a lot of punctuation and syntax to learn. Python enforces readable code by making indentation part of the syntax — you cannot write messy Python."

**[SETUP — do together:]**
```bash
# Install uv — the modern Python package manager (10-100x faster than pip)
# Windows:
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
# Mac/Linux:
curl -LsSf https://astral.sh/uv/install.sh | sh

uv --version

# Create a project
uv init deejoft-python
cd deejoft-python

# Launch the Python REPL
uv run python
# Python 3.13.x (date) on ...
# >>>
```

**[SAY:]:**
> "The `>>>` is the Python REPL — Read, Evaluate, Print, Loop. Just like the browser console for JavaScript. Type an expression, press Enter, see the result immediately. We will live here for all of Class 1."

---

## 🎤 PART B — Variables & Types (0:20 – 0:55)

**[TYPE in the REPL:]**
```python
# Variables — no keyword needed, just assign
name = 'Ada Lovelace'
cohort = 7
price  = 79_999.00       # Underscore separator — visual only
is_enrolled = True

# Python is dynamically typed — type is inferred from value
type(name)          # <class 'str'>
type(cohort)        # <class 'int'>
type(price)         # <class 'float'>
type(is_enrolled)   # <class 'bool'>
type(None)          # <class 'NoneType'>

# Naming convention: snake_case (not camelCase like JS)
student_name = 'Ada'      # ✅
MAX_STUDENTS = 30         # SCREAMING_SNAKE for constants
class_cohort = 7          # lowercase, words separated by underscores
```

**[SAY for naming:]:**
> "Python uses `snake_case` for variables and functions. `camelCase` is not wrong in Python — it just looks wrong to every Python developer reading your code. Conventions matter in professional teams."

**[TYPE:]**
```python
# f-strings — Python's template literals (backtick equivalent)
name = 'Ada'
cohort = 7
score = 94.5

# Basic
f"Welcome, {name}! Cohort {cohort}."

# Expressions inside {}
f"Score: {score:.1f}%"             # Format spec: 1 decimal place
f"Status: {'Pass' if score >= 50 else 'Fail'}"
f"Next cohort: {cohort + 1}"
f"Uppercase: {name.upper()}"

# Python 3.12 debug syntax — prints the expression AND its value
f"{score = }"                       # score = 94.5
f"{cohort + 1 = }"                  # cohort + 1 = 8
```

---

## 🎤 PART C — Operators & Input (0:55 – 1:30)

**[TYPE:]**
```python
# Arithmetic
10 // 3     # 3  — floor division (integer result)
10 %  3     # 1  — modulo
2  ** 10    # 1024 — exponentiation

# Boolean operators — English words, not symbols!
True and False   # False
True or  False   # True
not True         # False

# Comparison
5 == 5       # True  — equality
5 != 4       # True  — inequality
5 is None    # False — identity (object is the same object)
'a' in 'ada' # True  — membership test

# None comparison — always use 'is', not '=='
result = None
result is None     # True
result is not None # False
```

**[TYPE — getting input from the user:]**
```python
# input() always returns a string — convert if you need a number
name  = input("What is your name? ")
age   = int(input("What is your age? "))   # Convert to int
price = float(input("Enter price: "))      # Convert to float

print(f"Hello, {name}! You are {age} years old.")
print(f"Price with VAT: ₦{price * 1.075:.2f}")
```

---

## 🎤 PART D — First Script (1:30 – 2:00)

**[OPEN `main.py` in VS Code. TYPE together:]**
```python
# main.py — run with: uv run python main.py

def get_number(prompt):
    """Keep asking until the user gives a valid number."""
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Please enter a valid number.")

def calculate_vat(price, rate=0.075):
    """Return the VAT amount and total price."""
    vat   = price * rate
    total = price + vat
    return vat, total  # Python can return multiple values!

# Main program
print("=== Deejoft Expense Calculator ===")

name   = input("Your name: ")
item   = input("Item description: ")
price  = get_number("Price (₦): ")

vat, total = calculate_vat(price)

print(f"\n{'=' * 35}")
print(f"  Student : {name}")
print(f"  Item    : {item}")
print(f"  Price   : ₦{price:,.2f}")
print(f"  VAT 7.5%: ₦{vat:,.2f}")
print(f"  Total   : ₦{total:,.2f}")
print(f"{'=' * 35}")
```

**[RUN:]**
```bash
uv run python main.py
```

---

*Deejoft Coding School | Python Class 1*

---
---

# 📋 Python Class 2 — Lesson Plan (Tutor Script)
### Control Flow & Functions
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:45 | Control flow: if/elif/else, match/case, loops |
| 0:45 – 1:30 | Functions: defaults, *args, **kwargs, type hints |
| 1:30 – 2:00 | Build: grade calculator CLI |

---

## 🎤 PART A — Control Flow (0:10 – 0:45)

**[TYPE:]**
```python
score = 82

# if / elif / else
if score >= 90:
    print('Grade A — Distinction')
elif score >= 75:
    print('Grade B — Credit')
elif score >= 50:
    print('Grade C — Pass')
else:
    print('Grade F — Fail')

# match/case (Python 3.10+) — like switch/case but more powerful
command = 'quit'
match command:
    case 'quit' | 'exit' | 'q':
        print('Goodbye!')
    case 'help' | 'h':
        print('Available commands: quit, help, add, list')
    case str(c) if c.startswith('add '):
        print(f'Adding: {c[4:]}')
    case _:
        print(f'Unknown command: {command}')

# Ternary (conditional expression)
label = 'Pass' if score >= 50 else 'Fail'
```

**[TYPE — loops:]**
```python
courses = ['HTML', 'CSS', 'JavaScript', 'React', 'Python']

# for loop — with enumerate (get index + value)
for i, course in enumerate(courses, start=1):
    print(f"{i:2}. {course}")

# zip — iterate two lists in parallel
prices = [49999, 49999, 79999, 89999, 79999]
for course, price in zip(courses, prices):
    print(f"{course}: ₦{price:,}")

# range
for i in range(1, 6):      # 1 2 3 4 5
    print(i, end=' ')

# while with else — else runs when condition becomes False (not on break)
attempts = 0
while attempts < 3:
    answer = input("Password: ")
    attempts += 1
    if answer == 'deejoft2025':
        print("✅ Access granted")
        break
else:
    print("🔒 Account locked")
```

---

## 🎤 PART B — Functions (0:45 – 1:30)

**[TYPE:]**
```python
# Basic function
def greet(name: str, cohort: int = 1) -> str:
    """Return a welcome message for a student."""
    return f"Welcome to Deejoft, {name}! Cohort {cohort}."

# Type hints — Python 3.10+ union syntax
def divide(a: int | float, b: int | float) -> float | None:
    """Divide a by b. Returns None if b is zero."""
    if b == 0:
        return None
    return a / b

# *args — collect extra positional arguments into a tuple
def sum_all(*numbers: float) -> float:
    return sum(numbers)

print(sum_all(1, 2, 3, 4, 5))   # 15.0

# **kwargs — collect keyword arguments into a dict
def create_student(**details) -> dict:
    return details

s = create_student(name='Ada', cohort=7, course='React')
# {'name': 'Ada', 'cohort': 7, 'course': 'React'}

# Keyword-only arguments (force callers to use keyword syntax)
def register(name: str, *, cohort: int, course: str) -> dict:
    return {'name': name, 'cohort': cohort, 'course': course}

register('Ada', cohort=7, course='React')  # ✅
# register('Ada', 7, 'React')               # ❌ TypeError
```

**[SAY for type hints:]:**
> "Type hints do not change how Python runs your code. They are documentation for humans and for tools like VS Code's IntelliSense and the `mypy` type checker. In professional Python today, all new code has type hints. We teach them from the start so they become natural, not something you bolt on later."

---

*Deejoft Coding School | Python Class 2*

---
---

# 📋 Python Classes 3–8 — Lesson Plans
**Deejoft Coding School**

---

# Class 3 — Data Structures

**Key topics:** lists (slicing, comprehensions, walrus operator), dictionaries, tuples (namedtuple), sets, file I/O with pathlib

```python
# List comprehension
squares = [n**2 for n in range(1, 11)]
passing = [s for s in scores if s >= 50]
matrix  = [[i*j for j in range(1, 4)] for i in range(1, 4)]

# Walrus operator := — assign and test in one expression
import re
data = ['Ada: 95', 'Alan: bad', 'Grace: 88']
scores = [int(m.group(1)) for item in data if (m := re.search(r'(\d+)$', item))]

# Dict comprehension
squared = {n: n**2 for n in range(1, 6)}

# namedtuple — self-documenting tuples
from collections import namedtuple
Student = namedtuple('Student', ['name', 'cohort', 'score'])
ada = Student('Ada', 7, 95)
print(ada.name, ada.score)   # Ada  95

# pathlib — modern file I/O
from pathlib import Path
data_dir = Path('data')
data_dir.mkdir(exist_ok=True)

report = data_dir / 'report.txt'
report.write_text(f"Cohort 7 Report\n", encoding='utf-8')

# Append
with report.open('a', encoding='utf-8') as f:
    f.write(f"Ada: Grade A\n")

# Read
content = report.read_text(encoding='utf-8')
lines   = content.splitlines()

# CSV with DictWriter/DictReader
import csv
FIELDS = ['name', 'cohort', 'score']
with Path('students.csv').open('w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=FIELDS)
    w.writeheader()
    w.writerows([{'name': 'Ada', 'cohort': 7, 'score': 95}])
```

**Build:** Personal finance tracker — reads/writes CSV, generates a monthly summary.

---

# Class 4 — OOP Fundamentals

```python
from datetime import date
from dataclasses import dataclass, field

class Student:
    school = 'Deejoft'  # Class variable

    def __init__(self, name: str, cohort: int, course: str) -> None:
        self.name    = name
        self.cohort  = cohort
        self.course  = course
        self.grades: list[dict] = []

    # __dunder__ methods
    def __str__(self)  -> str: return f"{self.name} (Cohort {self.cohort})"
    def __repr__(self) -> str: return f"Student(name={self.name!r}, cohort={self.cohort})"
    def __len__(self)  -> int: return len(self.grades)

    @property
    def average(self) -> float:
        if not self.grades: return 0.0
        return sum(g['score'] for g in self.grades) / len(self.grades)

    @classmethod
    def from_dict(cls, data: dict) -> 'Student':
        return cls(data['name'], data['cohort'], data['course'])

    @staticmethod
    def is_valid_score(score: float) -> bool:
        return 0.0 <= score <= 100.0

    def add_grade(self, subject: str, score: float) -> None:
        if not self.is_valid_score(score):
            raise ValueError(f"Score must be 0–100, got {score}")
        self.grades.append({'subject': subject, 'score': score})

# Inheritance
class InternationalStudent(Student):
    def __init__(self, name: str, cohort: int, course: str, country: str) -> None:
        super().__init__(name, cohort, course)
        self.country = country

    def __str__(self) -> str:
        return f"{super().__str__()} from {self.country}"

# @dataclass — less boilerplate for data-focused classes
@dataclass(order=True)
class Course:
    title:    str
    price:    float
    level:    str = 'Beginner'
    students: list[str] = field(default_factory=list)

    def enrol(self, name: str) -> None:
        if name not in self.students:
            self.students.append(name)
```

**Build:** Student grade management system with OOP — `School`, `Student`, `Course` classes.

---

# Class 5 — Error Handling & APIs

```python
# Custom exceptions
class DeejoftError(Exception): pass
class StudentNotFoundError(DeejoftError):
    def __init__(self, student_id: int) -> None:
        super().__init__(f"Student {student_id} not found")
        self.student_id = student_id

# try/except/else/finally
def load_data(path: str) -> list:
    from pathlib import Path
    import json
    try:
        content = Path(path).read_text()
        data    = json.loads(content)
        if not isinstance(data, list):
            raise ValueError("Expected a JSON array")
        return data
    except FileNotFoundError:
        print(f"File not found: {path}. Starting empty.")
        return []
    except json.JSONDecodeError as e:
        print(f"Invalid JSON: {e}")
        return []
    finally:
        print(f"Attempted to load: {path}")   # Always runs

# Context manager
from contextlib import contextmanager

@contextmanager
def db_transaction(conn):
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise

# httpx — modern HTTP client (replaces requests)
# uv add httpx
import httpx

def get_github_user(username: str) -> dict | None:
    try:
        with httpx.Client(timeout=10.0) as client:
            r = client.get(f"https://api.github.com/users/{username}")
            r.raise_for_status()
            return r.json()
    except httpx.TimeoutException:
        print("Request timed out")
        return None
    except httpx.HTTPStatusError as e:
        print(f"HTTP {e.response.status_code}")
        return None

# Async HTTP — fetch multiple users concurrently
import asyncio

async def fetch_many(usernames: list[str]) -> list[dict | None]:
    async with httpx.AsyncClient(timeout=10.0) as client:
        tasks = [client.get(f"https://api.github.com/users/{u}") for u in usernames]
        responses = await asyncio.gather(*tasks, return_exceptions=True)
        return [r.json() if isinstance(r, httpx.Response) and r.status_code == 200 else None
                for r in responses]
```

**Build:** GitHub profile fetcher — fetches multiple users concurrently, saves to JSON.

---

# Class 6 — Type Hints & Testing

```python
# Modern type hints (Python 3.10+)
from typing import TypedDict, Protocol

# TypedDict — type-safe dict structure
class StudentDict(TypedDict):
    name:   str
    cohort: int
    score:  float

# Protocol — structural subtyping (duck typing with types)
class Gradable(Protocol):
    @property
    def average(self) -> float: ...
    @property
    def grade_letter(self) -> str: ...

def print_report(gradable: Gradable) -> None:
    print(f"{gradable.average:.1f} — {gradable.grade_letter}")
# Any class with .average and .grade_letter satisfies this — no inheritance needed

# pytest
# uv add --dev pytest pytest-cov

# tests/test_student.py
import pytest
from student import Student, InvalidGradeError

class TestStudent:
    @pytest.fixture
    def student(self) -> Student:
        return Student('Ada', 7, 'Python')

    def test_initial_average_is_zero(self, student):
        assert student.average == 0.0

    def test_add_grade_updates_average(self, student):
        student.add_grade('Week 1', 90)
        student.add_grade('Week 2', 80)
        assert student.average == 85.0

    def test_invalid_score_raises(self, student):
        with pytest.raises(InvalidGradeError):
            student.add_grade('Week 1', 150)

    @pytest.mark.parametrize('score,expected', [
        (95, 'A'), (80, 'B'), (60, 'C'), (30, 'F')
    ])
    def test_grade_letters(self, student, score, expected):
        student.add_grade('Test', score)
        assert student.grade_letter == expected
```

**Run:**
```bash
uv run pytest -v
uv run pytest --cov=student
```

---

# Class 7 — CLI Tools

```python
# uv add typer rich
import typer
from rich.console import Console
from rich.table import Table

app = typer.Typer(help='Deejoft Grade Manager')
console = Console()

@app.command()
def report(
    sort: str = typer.Option('name', '--sort', '-s', help='Sort by: name, average'),
):
    """Print the grade report."""
    students = load_students()
    
    table = Table(title='📊 Grade Report', header_style='bold #e94560')
    table.add_column('Name',    style='bold')
    table.add_column('Course',  justify='center')
    table.add_column('Average', justify='right')
    table.add_column('Grade',   justify='center')

    key = (lambda s: s.average) if sort == 'average' else (lambda s: s.name)
    for s in sorted(students, key=key, reverse=(sort == 'average')):
        grade  = s.grade_letter
        colour = {'A': 'green', 'B': 'yellow', 'C': 'blue', 'F': 'red'}[grade]
        table.add_row(s.name, s.course, f'{s.average:.1f}', f'[{colour}]{grade}[/]')

    console.print(table)

@app.command()
def add(
    name:   str = typer.Argument(..., help='Student name'),
    cohort: int = typer.Option(..., '--cohort', '-c'),
    course: str = typer.Option(..., '--course'),
):
    """Add a new student."""
    students = load_students()
    students.append(Student(name, cohort, course))
    save_students(students)
    console.print(f"✅ Added [bold]{name}[/] to Cohort {cohort}")

if __name__ == '__main__':
    app()
```

```bash
# Usage
uv run python main.py add "Ada Lovelace" --cohort 7 --course React
uv run python main.py report --sort average
```

---

# Class 8 — Packaging & Deployment

```toml
# pyproject.toml
[project]
name = "deejoft-grades"
version = "1.0.0"
requires-python = ">=3.12"
dependencies = ["typer>=0.12", "rich>=13", "httpx>=0.27"]

[project.scripts]
deejoft-grades = "main:app"

[tool.uv]
dev-dependencies = ["pytest>=8", "pytest-cov>=5", "ruff>=0.5"]

[tool.ruff]
line-length = 100
```

```bash
uv sync                             # Install all dependencies
uv run deejoft-grades report        # Run as installed CLI tool
uv run pytest --cov=src             # Run tests with coverage
uv run ruff check .                 # Lint
uv run ruff format .                # Format

# Build distributable package
uv build    # → dist/*.whl and dist/*.tar.gz

# Package as standalone executable
uv add --dev pyinstaller
uv run pyinstaller --onefile --name deejoft-grades main.py
```

**Capstone brief:** A fully packaged CLI tool with a pytest suite and `ruff` clean code.

---

*Deejoft Coding School | Python Classes 1–8*
