# 🐍 Python — Tutor's Master Outline
### Deejoft Coding School | Python Programming Track
**Duration:** 4 Weeks · 8 Classes · ~2 hours per class
**Level:** Beginner–Intermediate (standalone track, no web dev prerequisite)

---

> **Dear Tutor,**
> Python 3.13 is the current stable release and the version this course teaches. Relevant new features include a much-improved interactive REPL with syntax highlighting, the experimental free-threaded mode (no GIL), and better error messages that actually explain what went wrong. Teach the error messages — Python 3.13's tracebacks are the best they've ever been, and students who learn to read them become self-sufficient faster.
>
> Tooling note: this course uses **`uv`** instead of `pip` for package management. `uv` is written in Rust, installs packages 10–100× faster than pip, and handles virtual environments automatically. It has become the industry standard in 2024–2025. Students who learn `uv` are immediately more productive than those who learned the old pip/venv workflow.

---

## 🗺️ Course Map

| Week | Classes | Focus | Deliverable |
|------|---------|-------|-------------|
| Week 1 | 1–2 | Python Fundamentals: Setup, Types, Control Flow | CLI expense logger |
| Week 2 | 3–4 | Data Structures, Functions & File I/O | Personal finance CSV reporter |
| Week 3 | 5–6 | OOP, Error Handling & External APIs | Student grade management system |
| Week 4 | 7–8 | Type Hints, Testing, Packaging & Automation | Packaged CLI tool or Desktop GUI |

---

## 🎯 Course Philosophy — Three Rules

```
1. READABLE > CLEVER          →  Python code should read like English.
                                  If your teammate can't read it at a glance, rewrite it.

2. ERRORS ARE INFORMATION     →  Read the full traceback. The last line tells you what went wrong.
                                  The second-to-last line tells you where. Never ignore it.

3. THE STANDARD LIBRARY FIRST →  Check if Python already has what you need before installing
                                  a third-party library. It usually does.
```

---

## 📅 Week 1 — Python Fundamentals

### Class 1 — Setup, Variables & Types

**Tutor Guidance:** Python 3.13's new REPL (type `python` in the terminal) now has syntax highlighting, multi-line editing, and better error messages. Use it for all Class 1 demos — students get immediate feedback without creating files.

#### Tooling Setup with `uv`

```bash
# Install uv — the modern Python package manager
# Windows (PowerShell):
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Verify
uv --version      # uv 0.5.x

# Create and activate a virtual environment (uv does this automatically per project)
uv init my-project    # Creates a new project with pyproject.toml
cd my-project
uv run python         # Run Python in the project's virtual env

# Install packages (100x faster than pip)
uv add requests       # Installs and adds to pyproject.toml
uv add --dev pytest   # Dev-only dependency
uv sync               # Install all dependencies from pyproject.toml (for collaborators)

# VS Code setup
# → Install 'Python' extension by Microsoft
# → Ctrl+Shift+P → "Python: Select Interpreter" → choose the .venv version
```

---

#### Variables and Data Types

```python
# Python is dynamically typed — types are inferred, not declared
# But in modern Python, we add type hints for clarity (Week 4)

# ── Strings ──
name:   str = "Ada Lovelace"
school: str = 'Deejoft Coding School'

# f-strings — the modern way (Python 3.12+ added = for debug expressions)
age = 30
print(f"Name: {name}, Age: {age}")          # Name: Ada Lovelace, Age: 30
print(f"{age = }")                           # age = 30  (debug shorthand, Python 3.8+)
print(f"{age * 2 = }")                       # age * 2 = 60
print(f"Upper: {name.upper()}")              # Upper: ADA LOVELACE
print(f"Price: ₦{49_999:.2f}")              # Price: ₦49999.00 (underscore in numbers)

# Multi-line f-strings
receipt = f"""
{'=' * 35}
 DEEJOFT — Payment Receipt
{'=' * 35}
 Student : {name}
 Course  : JavaScript (4 Weeks)
 Amount  : ₦79,999
 Date    : {__import__('datetime').date.today()}
{'=' * 35}
"""

# ── Numbers ──
cohort:  int   = 7
price:   float = 79_999.00    # Underscore separators for readability
pi:      float = 3.14159_265
big:     int   = 1_000_000    # Also valid for integers

# Integer division and modulo (very useful)
print(17 // 5)   # 3  — floor division (how many times does 5 fit into 17?)
print(17 %  5)   # 2  — remainder (what's left over?)
print(2  ** 10)  # 1024 — exponentiation

# ── Booleans ──
is_enrolled: bool = True
has_paid:    bool = False

# Truthy / Falsy — important for conditionals
# Falsy values: False, 0, 0.0, '', [], {}, None
# Everything else is truthy
print(bool(""))      # False
print(bool("hello")) # True
print(bool(0))       # False
print(bool([]))      # False
print(bool([0]))     # True — a list with one item (even if it's 0) is truthy

# ── None — Python's "no value" ──
result = None   # Intentionally empty — not yet calculated, not found, not applicable
print(result is None)     # True   — use 'is' for None comparison, never ==
print(result is not None) # False
```

#### String Methods

```python
text = "  Hello, Deejoft World!  "

# Whitespace
text.strip()             # "Hello, Deejoft World!"
text.lstrip()            # "Hello, Deejoft World!  "  — left only
text.rstrip()            # "  Hello, Deejoft World!"  — right only

# Case
text.lower()             # "  hello, deejoft world!  "
text.upper()             # "  HELLO, DEEJOFT WORLD!  "
text.title()             # "  Hello, Deejoft World!  "
text.capitalize()        # "  hello, deejoft world!  " — only first char

# Search & Replace
text.find("Deejoft")     # 9  — index of first occurrence (-1 if not found)
text.count("l")          # 3
text.replace("World", "Cohort 7")
"deejoft" in text.lower()  # True — membership test

# Split & Join
"apple,banana,mango".split(",")     # ['apple', 'banana', 'mango']
", ".join(["HTML", "CSS", "JS"])    # "HTML, CSS, JS"
text.strip().split()                # Split on any whitespace: ["Hello,", "Deejoft", "World!"]

# Modern string methods (Python 3.9+)
"Hello World".removeprefix("Hello ")  # "World"
"Hello World".removesuffix(" World")  # "Hello"
```

---

### Class 2 — Control Flow & Loops

```python
# ── Conditionals ──
score = 78

# match/case — Python 3.10+ (like switch/case in other languages but more powerful)
match score:
    case n if n >= 90: print(f"{n}/100 — Grade A (Distinction)")
    case n if n >= 75: print(f"{n}/100 — Grade B (Credit)")
    case n if n >= 50: print(f"{n}/100 — Grade C (Pass)")
    case _:            print(f"{score}/100 — Grade F (Fail)")

# Ternary expression
status = "Pass" if score >= 50 else "Fail"

# ── Loops ──

# for — iterate over any iterable
courses = ["HTML", "CSS", "JavaScript", "React", "Python"]

for course in courses:
    print(f"📚 {course}")

# enumerate — get index AND value (no manual counter needed)
for index, course in enumerate(courses, start=1):
    print(f"{index:2}. {course}")

# zip — iterate over multiple iterables in parallel
prices  = [49_999, 49_999, 79_999, 89_999, 79_999]
for course, price in zip(courses, prices):
    print(f"{course}: ₦{price:,}")

# range
for i in range(1, 6):       # 1 2 3 4 5
    print(i, end=" ")

for i in range(10, 0, -2):  # 10 8 6 4 2 (count down, step -2)
    print(i, end=" ")

# while — for unknown iteration count
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    answer = input(f"Attempt {attempts + 1}: Enter the password: ")
    attempts += 1
    if answer == "deejoft2025":
        print("✅ Access granted")
        break
    print(f"❌ Incorrect. {max_attempts - attempts} attempts remaining.")
else:
    # The else block on a while loop runs when the condition becomes False (not on break)
    print("🔒 Account locked after 3 failed attempts.")

# List comprehension — the Pythonic loop
squares      = [n**2 for n in range(1, 11)]
even_squares = [n**2 for n in range(1, 11) if n % 2 == 0]
matrix_flat  = [cell for row in [[1,2],[3,4],[5,6]] for cell in row]  # Nested

# Walrus operator (:=) — assign and test in one expression (Python 3.8+)
import re
data = ["Ada: 95", "Alan: invalid", "Grace: 88"]
scores = [int(m.group(1)) for item in data if (m := re.search(r"(\d+)$", item))]
print(scores)  # [95, 88]  — skips "Alan: invalid" because re.search returns None
```

---

## 📅 Week 2 — Data Structures, Functions & File I/O

### Class 3 — Data Structures

```python
# ── Lists ── ordered, mutable, duplicates allowed
students = ["Ada", "Alan", "Grace", "Linus", "Dennis"]

students.append("Tim")              # Add to end
students.insert(0, "Charles")       # Insert at index
students.remove("Alan")             # Remove first occurrence by value
students.pop(2)                     # Remove by index, returns the item
students.sort()                     # Sort in place
sorted_copy = sorted(students)      # Return new sorted list (non-destructive)
students.reverse()
students.count("Ada")               # Number of occurrences
students.index("Grace")             # Index of first occurrence

# Slicing — [start:stop:step]  — stop is EXCLUSIVE
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
nums[2:5]      # [2, 3, 4]
nums[:4]       # [0, 1, 2, 3]
nums[6:]       # [6, 7, 8, 9]
nums[::2]      # [0, 2, 4, 6, 8]  — every other element
nums[::-1]     # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  — reversed


# ── Dictionaries ── key:value pairs, ordered (Python 3.7+), mutable
student = {
    "name":    "Ada Lovelace",
    "cohort":  7,
    "courses": ["HTML", "CSS", "JavaScript"],
    "scores":  {"HTML": 95, "CSS": 88, "JavaScript": 92},
    "active":  True,
}

# Access
student["name"]                      # "Ada Lovelace"
student.get("email", "Not set")      # "Not set" — safe, no KeyError
student["scores"]["CSS"]             # 88  — nested access

# Modify
student["email"] = "ada@deejoft.com" # Add or update
del student["active"]                # Remove key
student.pop("cohort", None)          # Remove and return, with default if missing

# Iteration
for key in student:                  print(key)
for value in student.values():       print(value)
for key, value in student.items():   print(f"{key}: {value}")

# Dictionary comprehension
squared = {n: n**2 for n in range(1, 6)}    # {1:1, 2:4, 3:9, 4:16, 5:25}
uppercase = {k: v.upper() for k, v in {"a": "apple"}.items()}


# ── Tuples ── ordered, immutable — use for data that should not change
point     = (3.5, 7.2)           # 2D coordinate — should not be mutated
rgb_red   = (255, 0, 0)
http_ok   = (200, "OK")

x, y = point                     # Unpacking (works on any iterable)
status_code, message = http_ok

# Named tuples — self-documenting tuples (excellent for structured data without OOP)
from collections import namedtuple
Student = namedtuple("Student", ["name", "cohort", "score"])
ada = Student(name="Ada", cohort=7, score=95)
print(ada.name)   # "Ada"   — dot access like an object
print(ada[0])     # "Ada"   — index access like a tuple


# ── Sets ── unordered, unique values — O(1) lookup
active_ids = {101, 102, 103, 104}
vip_ids    = {102, 104, 106}

102 in active_ids           # True  — O(1)
active_ids | vip_ids        # {101, 102, 103, 104, 106}  — union
active_ids & vip_ids        # {102, 104}                 — intersection
active_ids - vip_ids        # {101, 103}                 — difference

# Deduplication
emails = ["a@b.com", "c@d.com", "a@b.com", "e@f.com"]
unique_emails = list(set(emails))
```

---

### Class 4 — Functions & File I/O

```python
# ── Modern Function Features ──

# Type hints (Python 3.5+, strongly recommended in 2025)
def calculate_grade(score: float, max_score: float = 100.0) -> str:
    percentage = (score / max_score) * 100
    match percentage:
        case p if p >= 90: return "A"
        case p if p >= 75: return "B"
        case p if p >= 50: return "C"
        case _:            return "F"

# *args and **kwargs
def log_event(event_type: str, *messages: str, **metadata) -> None:
    print(f"[{event_type.upper()}]", *messages)
    for key, value in metadata.items():
        print(f"  {key}: {value}")

log_event("info", "Student enrolled", "Payment confirmed",
          student="Ada", course="React", cohort=7)

# Keyword-only arguments (force callers to use keyword syntax)
def create_student(name: str, *, cohort: int, course: str) -> dict:
    return {"name": name, "cohort": cohort, "course": course}

create_student("Ada", cohort=7, course="React")  # ✅
# create_student("Ada", 7, "React")              # ❌ TypeError — cohort must be keyword


# ── File I/O ──
from pathlib import Path

# Pathlib — the modern, object-oriented way to work with paths
data_dir = Path("data")
data_dir.mkdir(exist_ok=True)   # Create if doesn't exist, no error if it does

report = data_dir / "report.txt"  # / operator builds paths (cross-platform!)

# Writing
report.write_text("Deejoft Cohort 7 Report\n", encoding="utf-8")

# Appending
with report.open("a", encoding="utf-8") as f:
    f.write("Student: Ada Lovelace — Grade A\n")
    f.write("Student: Alan Turing  — Grade B\n")

# Reading
content = report.read_text(encoding="utf-8")
lines   = report.read_text(encoding="utf-8").splitlines()

# Path utilities
print(report.exists())        # True
print(report.suffix)          # '.txt'
print(report.stem)            # 'report'
print(report.parent)          # data/

# Iterate all CSV files recursively
for csv_file in data_dir.rglob("*.csv"):
    print(csv_file)


# ── CSV Files ──
import csv

EXPENSES_FILE = Path("data/expenses.csv")
FIELDNAMES = ["date", "category", "description", "amount"]

def write_expenses(expenses: list[dict]) -> None:
    with EXPENSES_FILE.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        writer.writeheader()
        writer.writerows(expenses)

def read_expenses() -> list[dict]:
    if not EXPENSES_FILE.exists():
        return []
    with EXPENSES_FILE.open("r", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def get_total_by_category(expenses: list[dict]) -> dict[str, float]:
    totals: dict[str, float] = {}
    for expense in expenses:
        cat    = expense["category"]
        amount = float(expense["amount"])
        totals[cat] = totals.get(cat, 0.0) + amount
    return dict(sorted(totals.items(), key=lambda x: x[1], reverse=True))


# ── JSON Files ──
import json

config_file = Path("config.json")

def load_config() -> dict:
    if not config_file.exists():
        return {"theme": "dark", "language": "en", "notifications": True}
    return json.loads(config_file.read_text(encoding="utf-8"))

def save_config(config: dict) -> None:
    config_file.write_text(
        json.dumps(config, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )
```

---

## 📅 Week 3 — OOP, Error Handling & APIs

### Class 5 — Object-Oriented Programming

```python
from datetime import date
from typing import ClassVar

class Student:
    """Represents a student at Deejoft Coding School."""

    # Class variable — shared by all instances
    school: ClassVar[str] = "Deejoft Coding School"
    _count: ClassVar[int] = 0

    def __init__(self, name: str, cohort: int, course: str) -> None:
        self.name:    str        = name
        self.cohort:  int        = cohort
        self.course:  str        = course
        self.grades:  list[dict] = []
        self.enrolled_on:  date  = date.today()
        Student._count += 1

    # ── Dunder methods — define how objects behave ──
    def __str__(self)  -> str: return f"{self.name} (Cohort {self.cohort}, {self.course})"
    def __repr__(self) -> str: return f"Student(name={self.name!r}, cohort={self.cohort})"
    def __len__(self)  -> int: return len(self.grades)
    def __lt__(self, other: "Student") -> bool: return self.average < other.average

    # ── Properties — computed attributes with @property ──
    @property
    def average(self) -> float:
        if not self.grades:
            return 0.0
        return sum(g["score"] for g in self.grades) / len(self.grades)

    @property
    def grade_letter(self) -> str:
        avg = self.average
        if avg >= 90: return "A"
        if avg >= 75: return "B"
        if avg >= 50: return "C"
        return "F"

    # ── Class methods — alternative constructors ──
    @classmethod
    def from_dict(cls, data: dict) -> "Student":
        return cls(name=data["name"], cohort=data["cohort"], course=data["course"])

    @classmethod
    def total_count(cls) -> int:
        return cls._count

    # ── Static methods — utilities that don't need self or cls ──
    @staticmethod
    def is_valid_score(score: float) -> bool:
        return 0.0 <= score <= 100.0

    # ── Instance methods ──
    def add_grade(self, subject: str, score: float) -> None:
        if not self.is_valid_score(score):
            raise ValueError(f"Score {score} is not between 0 and 100")
        self.grades.append({"subject": subject, "score": score, "date": date.today()})

    def report(self) -> str:
        separator = "=" * 40
        lines = [
            separator,
            f"  {self.school}",
            f"  Student Report — Cohort {self.cohort}",
            separator,
            f"  Name   : {self.name}",
            f"  Course : {self.course}",
            f"  Average: {self.average:.1f}/100 (Grade {self.grade_letter})",
            separator,
        ]
        for g in self.grades:
            lines.append(f"  {g['subject']:<20} {g['score']:>5.1f}")
        return "\n".join(lines)


# ── Inheritance ──
class InternationalStudent(Student):
    def __init__(self, name: str, cohort: int, course: str, country: str) -> None:
        super().__init__(name, cohort, course)
        self.country: str = country

    def __str__(self) -> str:
        return f"{super().__str__()} from {self.country}"

    def report(self) -> str:
        return super().report() + f"\n  Country: {self.country}\n{'=' * 40}"


# ── Dataclasses — less boilerplate for data-focused classes (Python 3.7+) ──
from dataclasses import dataclass, field

@dataclass(order=True)
class Course:
    title:     str
    duration:  str
    price:     float
    level:     str = "Beginner"
    students:  list[str] = field(default_factory=list)  # Mutable default must use field()

    def enrol(self, student_name: str) -> None:
        if student_name not in self.students:
            self.students.append(student_name)

react = Course(title="React", duration="4 Weeks", price=89_999, level="Intermediate")
react.enrol("Ada Lovelace")
print(react)
```

---

### Class 6 — Error Handling & External APIs

```python
# ── Exception Hierarchy ──
# BaseException
#  └── Exception
#       ├── ValueError      — wrong value (int("hello"))
#       ├── TypeError       — wrong type  (1 + "2")
#       ├── KeyError        — dict key not found
#       ├── IndexError      — list index out of range
#       ├── FileNotFoundError — file doesn't exist
#       ├── PermissionError  — can't access file/directory
#       ├── AttributeError   — object has no such attribute
#       └── (custom exceptions inherit from Exception)

# ── Custom Exception ──
class DeejoftError(Exception):
    """Base exception for all Deejoft application errors."""

class StudentNotFoundError(DeejoftError):
    def __init__(self, student_id: int) -> None:
        super().__init__(f"Student with ID {student_id} was not found.")
        self.student_id = student_id

class InvalidGradeError(DeejoftError):
    pass


# ── Comprehensive try/except ──
def load_student_data(filepath: str) -> list[dict]:
    from pathlib import Path
    import json

    path = Path(filepath)

    try:
        content = path.read_text(encoding="utf-8")
        data = json.loads(content)
        if not isinstance(data, list):
            raise ValueError("Expected a JSON array at the top level")
        return data

    except FileNotFoundError:
        print(f"⚠️  File not found: {filepath}. Starting with empty data.")
        return []

    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON in {filepath}: {e}")
        return []

    except PermissionError:
        print(f"🔒 Permission denied: cannot read {filepath}")
        raise   # Re-raise — this is a system error, not recoverable

    except Exception as e:
        print(f"Unexpected error loading {filepath}: {type(e).__name__}: {e}")
        raise

    finally:
        # Runs ALWAYS — even if an exception is raised and re-raised
        print(f"Attempted to load: {filepath}")


# ── Context Managers (with statement) ──
# The 'with' statement guarantees cleanup even if an exception occurs.
# Used for: files, database connections, network sockets, locks.

class Timer:
    """Context manager that times a block of code."""
    def __enter__(self):
        from time import perf_counter
        self.start = perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        from time import perf_counter
        self.elapsed = perf_counter() - self.start
        print(f"⏱ Elapsed: {self.elapsed:.3f}s")
        return False  # Don't suppress exceptions

with Timer() as t:
    total = sum(range(1_000_000))

# Or use @contextmanager for simpler cases:
from contextlib import contextmanager

@contextmanager
def db_transaction(connection):
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise


# ── HTTP Requests with httpx (modern replacement for requests) ──
# uv add httpx

import httpx

def get_github_user(username: str) -> dict | None:
    """Fetch a GitHub user's public profile."""
    url = f"https://api.github.com/users/{username}"

    try:
        with httpx.Client(timeout=10.0, headers={"User-Agent": "DeejoftApp/1.0"}) as client:
            response = client.get(url)
            response.raise_for_status()  # Raises httpx.HTTPStatusError for 4xx/5xx
            return response.json()

    except httpx.TimeoutException:
        print(f"Request to GitHub timed out after 10 seconds")
        return None

    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            print(f"User '{username}' not found on GitHub")
        else:
            print(f"GitHub API error: {e.response.status_code}")
        return None

    except httpx.RequestError as e:
        print(f"Network error: {e}")
        return None


# ── Async HTTP (for multiple concurrent requests) ──
import asyncio
import httpx

async def fetch_many_users(usernames: list[str]) -> list[dict | None]:
    async with httpx.AsyncClient(timeout=10.0) as client:
        tasks = [client.get(f"https://api.github.com/users/{u}") for u in usernames]
        responses = await asyncio.gather(*tasks, return_exceptions=True)

        results = []
        for r in responses:
            if isinstance(r, Exception):
                results.append(None)
            else:
                results.append(r.json() if r.status_code == 200 else None)
        return results

# users = asyncio.run(fetch_many_users(["ajibolagenius", "torvalds", "gvanrossum"]))
```

---

## 📅 Week 4 — Type Hints, Testing, CLI & GUI

### Class 7 — Type Hints, Testing with pytest

```python
# ── Type Hints in 2025 (Python 3.10+) ──
# Use | for unions instead of Optional[X] or Union[X, Y]

def find_student(students: list[dict], name: str) -> dict | None:
    return next((s for s in students if s["name"] == name), None)

def process_scores(scores: list[int | float]) -> dict[str, float]:
    return {
        "count":  len(scores),
        "total":  sum(scores),
        "mean":   sum(scores) / len(scores),
        "min":    min(scores),
        "max":    max(scores),
    }

# TypedDict — type-safe dictionary structure
from typing import TypedDict

class StudentDict(TypedDict):
    name:   str
    cohort: int
    score:  float

def format_result(student: StudentDict) -> str:
    return f"{student['name']} — {student['score']:.1f}/100"

# Protocol — structural subtyping (duck typing with type safety)
from typing import Protocol

class Gradable(Protocol):
    @property
    def average(self) -> float: ...
    @property
    def grade_letter(self) -> str: ...

def print_grade_summary(gradable: Gradable) -> None:
    print(f"Average: {gradable.average:.1f} (Grade {gradable.grade_letter})")
# Any class with .average and .grade_letter properties satisfies Gradable — no inheritance needed.


# ── Testing with pytest ──
# uv add --dev pytest pytest-cov

# tests/test_student.py
import pytest
from student import Student, InvalidGradeError

class TestStudent:
    @pytest.fixture
    def student(self) -> Student:
        """A fresh Student instance for each test."""
        return Student(name="Ada", cohort=7, course="Python")

    def test_initial_average_is_zero(self, student):
        assert student.average == 0.0

    def test_add_grade_updates_average(self, student):
        student.add_grade("Functions", 90)
        student.add_grade("OOP", 80)
        assert student.average == 85.0

    def test_grade_letter_a(self, student):
        student.add_grade("Test", 95)
        assert student.grade_letter == "A"

    def test_invalid_score_raises_error(self, student):
        with pytest.raises(InvalidGradeError):
            student.add_grade("Test", 150)  # Score > 100

    @pytest.mark.parametrize("score,expected", [
        (95, "A"), (80, "B"), (60, "C"), (30, "F")
    ])
    def test_grade_letters(self, student, score, expected):
        student.add_grade("Test", score)
        assert student.grade_letter == expected

# Run tests:
# uv run pytest                    — run all tests
# uv run pytest -v                 — verbose output
# uv run pytest --cov=student      — with coverage report
```

---

### Class 8 — CLI Tools, GUI & Packaging

#### Building a CLI with `typer`

```python
# uv add typer rich  (rich = beautiful terminal output)
# grades_cli.py

import typer
from rich.console import Console
from rich.table import Table
from pathlib import Path
import json

app     = typer.Typer(help="Deejoft Student Grade Manager CLI")
console = Console()

STUDENTS_FILE = Path("students.json")

def load_students() -> list[dict]:
    return json.loads(STUDENTS_FILE.read_text()) if STUDENTS_FILE.exists() else []

def save_students(students: list[dict]) -> None:
    STUDENTS_FILE.write_text(json.dumps(students, indent=2))

@app.command()
def add(name: str, cohort: int = typer.Option(..., "--cohort", "-c", help="Cohort number")):
    """Add a new student."""
    students = load_students()
    student  = {"id": len(students) + 1, "name": name, "cohort": cohort, "grades": []}
    students.append(student)
    save_students(students)
    console.print(f"✅ [green]Added:[/] {name} (Cohort {cohort})")

@app.command()
def grade(
    student_id: int = typer.Argument(..., help="Student ID"),
    subject:    str = typer.Option(..., "--subject", "-s"),
    score:      float = typer.Option(..., "--score"),
):
    """Record a grade for a student."""
    students = load_students()
    student  = next((s for s in students if s["id"] == student_id), None)
    if not student:
        console.print(f"❌ [red]Student ID {student_id} not found[/]")
        raise typer.Exit(code=1)

    student["grades"].append({"subject": subject, "score": score})
    save_students(students)
    console.print(f"📝 Recorded {subject}: {score}/100 for {student['name']}")

@app.command()
def report():
    """Print a grade report for all students."""
    students = load_students()
    if not students:
        console.print("No students found.")
        return

    table = Table(title="📊 Deejoft Grade Report", show_header=True, header_style="bold #e94560")
    table.add_column("ID",      style="dim",     width=4)
    table.add_column("Name",    style="bold",     min_width=20)
    table.add_column("Cohort",  justify="center", width=8)
    table.add_column("Grades",  justify="center", width=8)
    table.add_column("Average", justify="right",  width=10)
    table.add_column("Grade",   justify="center", width=8)

    for s in students:
        grades  = s.get("grades", [])
        avg     = sum(g["score"] for g in grades) / len(grades) if grades else 0.0
        letter  = "A" if avg >= 90 else "B" if avg >= 75 else "C" if avg >= 50 else "F"
        colour  = {"A":"green", "B":"yellow", "C":"blue", "F":"red"}[letter]
        table.add_row(
            str(s["id"]), s["name"], str(s["cohort"]),
            str(len(grades)), f"{avg:.1f}", f"[{colour}]{letter}[/]"
        )

    console.print(table)

if __name__ == "__main__":
    app()

# Usage:
# uv run python grades_cli.py add "Ada Lovelace" --cohort 7
# uv run python grades_cli.py grade 1 --subject Python --score 95
# uv run python grades_cli.py report
```

#### Packaging & Distribution

```bash
# pyproject.toml — modern Python project configuration (replaces setup.py)
```
```toml
[project]
name = "deejoft-grades"
version = "1.0.0"
description = "Grade management CLI for Deejoft Coding School"
authors = [{ name = "Ada Lovelace", email = "ada@deejoft.com" }]
requires-python = ">=3.12"
dependencies = [
    "typer>=0.12",
    "rich>=13.0",
    "httpx>=0.27",
]

[project.scripts]
deejoft-grades = "grades_cli:app"   # 'deejoft-grades' becomes a terminal command

[tool.uv]
dev-dependencies = [
    "pytest>=8.0",
    "pytest-cov>=5.0",
    "ruff>=0.5",    # Modern linter/formatter — replaces flake8 + black + isort
]

[tool.ruff]
line-length = 100
```

```bash
# Install as a local CLI tool
uv sync
uv run deejoft-grades report

# Build a distributable package
uv build    # Creates dist/*.whl and dist/*.tar.gz

# Package as a standalone executable (no Python needed)
uv add --dev pyinstaller
uv run pyinstaller --onefile --name deejoft-grades grades_cli.py
# → dist/deejoft-grades.exe (Windows) or dist/deejoft-grades (Mac/Linux)
```

---

### 🏆 Capstone Project Options

**Option A: Personal Finance Tracker (CLI)**
Full CRUD for income and expense entries stored in JSON. Monthly summary report with rich tables, category breakdown, and CSV export. Packaged as a `deejoft-finance` terminal command. Full pytest test suite with ≥80% coverage.

**Option B: Student Grade Management System (Full)**
The grades CLI from Class 8 extended with: CSV import/export, cohort-level analytics (mean, median, std deviation using stdlib `statistics`), email report generation (SMTP with `smtplib`), and a persistent SQLite backend using `sqlite3`.

**Option C: Automated Report Generator**
Reads raw data from a folder of CSV files, cleans and processes the data, generates a formatted PDF report using `fpdf2`, and sends it to a list of email addresses. Runs on a schedule using `schedule`.

---

**Capstone Rubric:**

| Criterion | Points |
|-----------|--------|
| `uv` project with `pyproject.toml` and virtual environment | 5 |
| Type hints used throughout all functions | 10 |
| Custom exception class(es) used | 10 |
| `try/except/finally` with specific exception types | 10 |
| OOP with at least one class using `@property` and `@classmethod` | 15 |
| File I/O using `pathlib` (JSON or CSV) | 10 |
| External API call using `httpx` | 10 |
| `pytest` test suite with ≥ 5 passing tests | 15 |
| Code linted and formatted with `ruff` (zero errors) | 5 |
| Packaged as a runnable CLI or `.exe` | 10 |
| **Total** | **100** |

---

## 📚 Essential References

| Resource | URL | Use For |
|----------|-----|---------|
| Python Docs (3.13) | `docs.python.org/3.13` | Official language reference |
| uv Docs | `docs.astral.sh/uv` | Package management and project setup |
| Ruff Docs | `docs.astral.sh/ruff` | Linting and formatting |
| Real Python | `realpython.com` | High-quality tutorials |
| Python Type Hints Cheat Sheet | `mypy.readthedocs.io/en/stable/cheat_sheet_py3.html` | Type annotation reference |
| Typer Docs | `typer.tiangolo.com` | CLI framework |
| httpx Docs | `python-httpx.org` | HTTP client |

---

*Deejoft Coding School — Instructor Materials | Python Track*
*Rebuilt 2025 — Python 3.13, uv, ruff, typer, httpx, match/case, dataclasses, pytest*
