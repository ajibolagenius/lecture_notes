# ✏️ Python Exercises & Solutions
### Deejoft Coding School — All 8 Classes

---

## Week 1 — Variables, Types, Control Flow & Functions

---

### Exercise 1.1 — Predict the Output ⭐

Without running the code, predict what each expression returns:

```python
1.  type(None)
2.  type(True)
3.  type([])
4.  10 // 3
5.  10 % 3
6.  2 ** 8
7.  'hello' in 'hello world'
8.  not True or False
9.  None is None
10. f"{'Pass' if 80 >= 50 else 'Fail'}"
```

---

### Exercise 1.2 — Fix the Bugs ⭐

```python
# Bug A — wrong comparison
def is_complete(result):
    return result == None   # BUG

# Bug B — wrong naming convention
def calculateStudentAverage(Scores):   # BUG (two issues)
    return sum(Scores) / len(Scores)

# Bug C — will crash for a 0 score
def get_label(score):
    label = 'Pass' if score else 'Fail'   # BUG
    return label

# Bug D — function does not return
def double(n):
    result = n * 2   # BUG — missing return

# Bug E — wrong default argument
def greet(name, greeting=[]):   # BUG — mutable default
    greeting.append(f"Hello, {name}")
    return greeting
```

---

### Exercise 1.3 — Grade Calculator ⭐⭐

```python
# Write these three functions:

# 1. get_grade(score: float) -> str
#    90+ → 'A', 75+ → 'B', 50+ → 'C', below 50 → 'F'

# 2. format_result(name: str, score: float) -> str
#    Returns: "Ada Lovelace — 95.0/100 (Grade A)"

# 3. process_cohort(students: list[dict]) -> list[dict]
#    Each dict has 'name' and 'score'
#    Returns a new list with 'grade' added to each student dict
#    Sorted by score descending

cohort = [
    {'name': 'Ada',   'score': 95},
    {'name': 'Alan',  'score': 72},
    {'name': 'Grace', 'score': 88},
    {'name': 'Linus', 'score': 41},
]

# Expected output of process_cohort(cohort):
# [{'name': 'Ada', 'score': 95, 'grade': 'A'},
#  {'name': 'Grace', 'score': 88, 'grade': 'B'},
#  {'name': 'Alan', 'score': 72, 'grade': 'C'},
#  {'name': 'Linus', 'score': 41, 'grade': 'F'}]
```

---

### Exercise 1.4 — FizzBuzz Variants ⭐⭐

```python
# Part A: Classic FizzBuzz 1-50
# If divisible by 3: 'Deejoft', by 5: 'Code', by both: 'DeejoftCode', else: number

# Part B: Write fizzbuzz(n) as a generator
# yield 'Deejoft', 'Code', etc. for values 1 through n

# Part C: Use match/case instead of if/elif
# Hint: match (n % 3 == 0, n % 5 == 0):
#   case (True, True):  ...
#   case (True, False): ...
```

---

### Exercise 1.5 — Function Toolkit ⭐⭐⭐

```python
# Write these five functions with type hints:

# 1. clamp(value: float, min_val: float, max_val: float) -> float
# 2. flatten(nested: list[list]) -> list     — flatten one level deep
# 3. group_by(items: list[dict], key: str) -> dict[str, list]
#    group_by([{'cat':'A','v':1},{'cat':'B','v':2},{'cat':'A','v':3}], 'cat')
#    → {'A': [{'cat':'A','v':1},{'cat':'A','v':3}], 'B': [...]}
# 4. safe_divide(a: float, b: float, default: float = 0.0) -> float
# 5. retry(fn, attempts: int = 3, delay: float = 0.5)
#    — calls fn() up to `attempts` times, sleeping `delay` secs between tries
#    — returns the result on success, raises the last exception on failure
```

---

## Week 2 — Data Structures & File I/O

---

### Exercise 2.1 — List Comprehension Challenge ⭐

```python
courses = [
    {'id': 1, 'title': 'HTML & CSS',   'price': 49999, 'level': 'Beginner'},
    {'id': 2, 'title': 'JavaScript',   'price': 79999, 'level': 'Beginner'},
    {'id': 3, 'title': 'React',        'price': 89999, 'level': 'Intermediate'},
    {'id': 4, 'title': 'React Native', 'price': 89999, 'level': 'Intermediate'},
    {'id': 5, 'title': 'Python',       'price': 79999, 'level': 'Beginner'},
]

# Using list/dict comprehensions only (no for loops):
# 1. List of all course titles
# 2. List of titles for courses under ₦80,000
# 3. Total cost of all courses
# 4. Dict: {title: price} for all courses
# 5. Courses grouped by level (dict[str, list[dict]])
# 6. List of titles in ALL CAPS, sorted alphabetically
```

---

### Exercise 2.2 — Finance Tracker ⭐⭐

Build a CSV-backed expense tracker:

```python
# expenses.csv — columns: date, category, description, amount

# Functions to write:
# add_expense(category, description, amount) → appends to CSV
# read_expenses() → list[dict] from CSV
# get_total_by_category() → dict[str, float] sorted by amount desc
# get_monthly_total(year: int, month: int) → float
# generate_report() → prints a rich table with totals by category

# Run the script with a mini CLI:
# python main.py add "Food" "Jollof rice" 1500
# python main.py report
# python main.py total
```

---

### Exercise 2.3 — OOP Registry ⭐⭐⭐

Build a student grade registry using OOP:

```python
# Classes to build:

class Student:
    # Properties: name, cohort, course, grades (list of Grade objects)
    # @property: average, grade_letter, passed
    # Methods: add_grade(subject, score), generate_report() -> str
    # @classmethod: from_csv_row(row: dict)

class Grade:
    # Properties: subject, score, date

class Registry:
    # Properties: students (list[Student])
    # Methods:
    #   enrol(name, cohort, course) -> Student
    #   find(name) -> Student | None
    #   top_students(n=3) -> list[Student]
    #   save_to_csv(path)
    #   load_from_csv(path)

# Test:
reg = Registry()
ada = reg.enrol('Ada', 7, 'React')
ada.add_grade('Week 1', 95)
ada.add_grade('Week 2', 88)
print(reg.top_students())
reg.save_to_csv('registry.csv')
```

---

## Week 3 — Error Handling & APIs

---

### Exercise 3.1 — Exception Audit ⭐

Identify what each `except` clause catches — too broad, too narrow, or correct?

```python
# A — is this correct?
try:
    data = json.loads(user_input)
except Exception:
    print("Invalid JSON")

# B — is this correct?
try:
    path.write_text(content)
except PermissionError:
    raise   # re-raise

# C — will this catch a network timeout?
try:
    response = httpx.get(url)
except httpx.HTTPStatusError:
    print("Request failed")

# D — is there a bug in the finally block?
def read_file(path):
    f = open(path)
    try:
        return f.read()
    except FileNotFoundError:
        return ''
    finally:
        f.close()   # Is this safe?
```

---

### Exercise 3.2 — API Client ⭐⭐

Build a GitHub profile fetcher:

```python
# fetch_user(username: str) -> dict | None
# — Fetches from https://api.github.com/users/{username}
# — Returns the user dict on success
# — Returns None on 404 (user not found)
# — Raises on other HTTP errors
# — Handles timeout (10 seconds)

# fetch_multiple(usernames: list[str]) -> list[dict | None]
# — Fetches all users CONCURRENTLY using asyncio + httpx.AsyncClient
# — Returns a list with None for any that failed

# save_profiles(users: list[dict], path: Path) -> None
# — Saves the list of user dicts to a JSON file

# CLI:
# python fetcher.py ada grace alan linus
# → prints a rich table of: login, name, public_repos, followers
# → saves results to profiles.json
```

---

## Week 4 — Testing, CLI & Packaging

---

### Exercise 4.1 — Write the Tests ⭐⭐

Given this module, write a complete pytest test suite:

```python
# calculator.py
def add(a: float, b: float) -> float:
    return a + b

def divide(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b

def clamp(value: float, lo: float, hi: float) -> float:
    return max(lo, min(value, hi))

def get_grade(score: float) -> str:
    if score >= 90: return 'A'
    if score >= 75: return 'B'
    if score >= 50: return 'C'
    return 'F'
```

Requirements:
- At least 12 test functions across 4 test classes
- `@pytest.fixture` for shared test data
- `@pytest.mark.parametrize` on `get_grade` (test all four branches)
- Test that `divide(10, 0)` raises `ZeroDivisionError` with the right message
- Run with `uv run pytest -v --cov=calculator`

---

### Exercise 4.2 — CLI Tool ⭐⭐

Build a `deejoft-grades` CLI using typer + rich:

```
Commands:
  add     <name> --cohort INT --course STR   → adds student to JSON file
  grade   <student-id> --subject STR --score FLOAT  → records a grade
  report  [--sort name|average] [--cohort INT]       → prints rich table

Features:
- Data stored in students.json
- Rich table output with colour-coded grades (A=green, B=yellow, C=blue, F=red)
- Friendly error messages (student not found, invalid score, etc.)
- `add --help` shows documentation for each option

Run:
  uv run python main.py add "Ada Lovelace" --cohort 7 --course React
  uv run python main.py grade <id> --subject "Week 1" --score 95
  uv run python main.py report --sort average
```

---

### Exercise 4.3 — Capstone CLI ⭐⭐⭐

Package and distribute the grade management system.

Requirements:
- `pyproject.toml` with correct metadata, dependencies, and `[project.scripts]`
- `uv run deejoft-grades report` works as a CLI command
- Full `pytest` suite with ≥ 80% coverage
- `ruff check .` returns zero errors
- `uv build` generates a `.whl` file
- `README.md` with install instructions and usage examples
- GitHub repo with at least 8 meaningful commits

---

## ✅ Exercise Solutions (Tutor Reference)

---

### 1.1 Answers

| # | Answer |
|---|--------|
| 1 | `<class 'NoneType'>` |
| 2 | `<class 'bool'>` |
| 3 | `<class 'list'>` |
| 4 | `3` |
| 5 | `1` |
| 6 | `256` |
| 7 | `True` |
| 8 | `False` (`not True` = `False`, `False or False` = `False`) |
| 9 | `True` |
| 10 | `'Pass'` |

---

### 1.2 Solution — Fix the Bugs

```python
# A — use 'is None'
def is_complete(result):
    return result is None

# B — snake_case function, lowercase param
def calculate_student_average(scores: list[float]) -> float:
    return sum(scores) / len(scores)

# C — check explicitly for >= 50, not truthiness (0 is falsy)
def get_label(score):
    return 'Pass' if score >= 50 else 'Fail'

# D — return the result
def double(n):
    return n * 2

# E — mutable default argument bug — use None as default
def greet(name, greeting=None):
    if greeting is None:
        greeting = []
    greeting.append(f"Hello, {name}")
    return greeting
```

---

### 1.3 Solution — Grade Calculator

```python
def get_grade(score: float) -> str:
    if score >= 90: return 'A'
    if score >= 75: return 'B'
    if score >= 50: return 'C'
    return 'F'

def format_result(name: str, score: float) -> str:
    grade = get_grade(score)
    return f"{name} — {score:.1f}/100 (Grade {grade})"

def process_cohort(students: list[dict]) -> list[dict]:
    return sorted(
        [{ **s, 'grade': get_grade(s['score']) } for s in students],
        key=lambda s: s['score'],
        reverse=True
    )
```

---

### 1.5 Solution — Function Toolkit

```python
import time
from typing import Callable, TypeVar

T = TypeVar('T')

def clamp(value: float, min_val: float, max_val: float) -> float:
    return max(min_val, min(value, max_val))

def flatten(nested: list[list]) -> list:
    return [item for sublist in nested for item in sublist]

def group_by(items: list[dict], key: str) -> dict[str, list]:
    result: dict[str, list] = {}
    for item in items:
        k = item[key]
        result.setdefault(k, []).append(item)
    return result

def safe_divide(a: float, b: float, default: float = 0.0) -> float:
    return a / b if b != 0 else default

def retry(fn: Callable[[], T], attempts: int = 3, delay: float = 0.5) -> T:
    last_error: Exception | None = None
    for i in range(attempts):
        try:
            return fn()
        except Exception as e:
            last_error = e
            if i < attempts - 1:
                time.sleep(delay)
    raise last_error   # type: ignore
```

---

### 3.1 Solution — Exception Audit

**A — TOO BROAD.** `except Exception` catches everything including `MemoryError`, `KeyboardInterrupt` (not quite — those are `BaseException` subclasses), and programming errors. Better: `except json.JSONDecodeError`.

**B — CORRECT.** `PermissionError` is specific, and re-raising with `raise` preserves the full traceback. This is the right pattern when you cannot handle the error here.

**C — WRONG — will NOT catch a timeout.** `httpx.HTTPStatusError` is raised for 4xx/5xx responses, not for network timeouts. Add `except httpx.TimeoutException` and `except httpx.RequestError` separately.

**D — BUG in the finally block.** If `open(path)` raises `FileNotFoundError` (before `f` is assigned), the `finally` block runs and tries to call `f.close()` — but `f` is not defined, causing a `NameError`. Fix: use `with open(path) as f:` so the context manager handles closing.

---

### 4.1 Solution — Test Suite (Key Parts)

```python
import pytest
from calculator import add, divide, clamp, get_grade

class TestAdd:
    def test_positive_numbers(self):
        assert add(2, 3) == 5

    def test_negative_numbers(self):
        assert add(-1, -2) == -3

    def test_floats(self):
        assert add(1.5, 2.5) == pytest.approx(4.0)

class TestDivide:
    def test_normal_division(self):
        assert divide(10, 2) == 5.0

    def test_divide_by_zero_raises(self):
        with pytest.raises(ZeroDivisionError, match='Cannot divide by zero'):
            divide(10, 0)

    def test_float_division(self):
        assert divide(1, 3) == pytest.approx(0.333, rel=1e-3)

class TestClamp:
    @pytest.fixture
    def bounds(self):
        return (0.0, 100.0)

    def test_value_in_range(self, bounds):
        lo, hi = bounds
        assert clamp(50.0, lo, hi) == 50.0

    def test_value_below_min(self, bounds):
        lo, hi = bounds
        assert clamp(-10.0, lo, hi) == lo

    def test_value_above_max(self, bounds):
        lo, hi = bounds
        assert clamp(150.0, lo, hi) == hi

class TestGetGrade:
    @pytest.mark.parametrize('score,expected', [
        (95, 'A'), (90, 'A'),
        (85, 'B'), (75, 'B'),
        (60, 'C'), (50, 'C'),
        (49, 'F'), (0,  'F'),
    ])
    def test_grade_boundaries(self, score, expected):
        assert get_grade(score) == expected
```

---

*Deejoft Coding School | Python Exercises & Solutions | Tutor Reference*
