# 📄 Python — Student Handouts (All 8 Classes)
### Deejoft Coding School

---

# Class 1 — Setup, Variables & Types

## A. uv Setup

```bash
uv init my-project    # creates pyproject.toml
cd my-project
uv run python         # launches Python 3.13 REPL in project venv
uv add requests       # install a package
uv add --dev pytest   # dev-only dependency
uv run pytest         # run tests
```

## B. Variables & Naming

```python
# No keyword — just assign
student_name = 'Ada Lovelace'   # snake_case for variables/functions
COHORT_LIMIT = 30               # SCREAMING_SNAKE for constants
class_count  = 4

type(42)           # <class 'int'>
type(3.14)         # <class 'float'>
type('hello')      # <class 'str'>
type(True)         # <class 'bool'>
type(None)         # <class 'NoneType'>
type([1, 2])       # <class 'list'>
type({'a': 1})     # <class 'dict'>
```

## C. f-strings

```python
name = 'Ada'
score = 94.5
cohort = 7

f"Hello, {name}!"
f"Score: {score:.2f}%"              # 2 decimal places
f"Next: {cohort + 1}"               # Expression
f"{'Pass' if score >= 50 else 'Fail'}"   # Ternary
f"{score = }"                        # Debug: prints 'score = 94.5'
```

> ✏️ **Fill in:** Write an f-string that prints `"₦79,999.00"` given `price = 79999`:
>
> `f"₦{price:_______}"`

## D. None vs undefined

```python
# Python has None — similar to JavaScript's null
result = None       # Intentionally empty
result is None      # True  — always use 'is' for None, never ==
result is not None  # False
```

## ⚡ Class 1 Quick Reference

| Concept | Python | JavaScript equivalent |
|---------|--------|-----------------------|
| Variable | `x = 5` | `const x = 5` |
| No value | `None` | `null` |
| Boolean | `True`, `False` | `true`, `false` |
| AND | `and` | `&&` |
| OR | `or` | `\|\|` |
| NOT | `not` | `!` |
| In list | `x in lst` | `lst.includes(x)` |
| String format | `f"Hello, {name}"` | `` `Hello, ${name}` `` |

---

# Class 2 — Control Flow & Functions

## A. Control Flow

```python
# if / elif / else — colon + indentation, no braces
if score >= 90:
    grade = 'A'
elif score >= 75:
    grade = 'B'
elif score >= 50:
    grade = 'C'
else:
    grade = 'F'

# Ternary
grade = 'Pass' if score >= 50 else 'Fail'

# match/case (Python 3.10+)
match command:
    case 'quit' | 'exit': print('Bye!')
    case 'help':          print('Commands: ...')
    case _:               print(f'Unknown: {command}')

# for loop
for item in my_list:          print(item)
for i, item in enumerate(lst, start=1):  print(i, item)
for a, b in zip(list1, list2):           print(a, b)

# while
while attempts < 3:
    attempts += 1
    if correct: break
else:
    print("Max attempts reached")  # runs when while condition is False
```

> ✏️ **Fill in:** Python uses __________ and __________ instead of `&&` and `||`.

## B. Functions

```python
# Type hints + default values
def greet(name: str, cohort: int = 1) -> str:
    """Docstring: describe what the function does."""
    return f"Welcome, {name}! Cohort {cohort}."

# *args — collect extra positional args as tuple
def total(*amounts: float) -> float:
    return sum(amounts)

# **kwargs — collect keyword args as dict
def make(**fields) -> dict:
    return fields

# Keyword-only (force keyword syntax at call)
def register(name: str, *, cohort: int, course: str) -> dict:
    return {'name': name, 'cohort': cohort, 'course': course}
```

---

# Class 3 — Data Structures

## A. Lists

```python
items = ['HTML', 'CSS', 'JS']

# Read
items[0]          # 'HTML' (first)
items[-1]         # 'JS' (last)
items[1:3]        # ['CSS', 'JS'] — slice (stop is EXCLUSIVE)
items[::-1]       # ['JS', 'CSS', 'HTML'] — reversed

# Non-destructive (prefer)
[x.upper() for x in items]             # List comprehension
[x for x in items if x != 'CSS']      # With filter
sorted(items, reverse=True)             # Sorted copy

# Destructive (use carefully)
items.append('React')
items.sort()
items.pop()         # removes and returns last
items.remove('CSS') # removes first occurrence by value
```

## B. Dictionaries

```python
student = {'name': 'Ada', 'cohort': 7, 'score': 95}

# Safe read
student.get('email', 'Not set')    # Returns default if key missing

# Iterate
for key in student:                  print(key)
for key, val in student.items():     print(f"{key}: {val}")

# Dict comprehension
doubled = {k: v * 2 for k, v in {'a': 1, 'b': 2}.items()}
```

## C. File I/O with pathlib

```python
from pathlib import Path

path = Path('data') / 'students.csv'
Path('data').mkdir(exist_ok=True)

path.write_text("name,score\n", encoding='utf-8')
with path.open('a') as f:
    f.write("Ada,95\n")
content = path.read_text()
```

---

# Class 4 — OOP

## A. Class Structure

```python
class Student:
    school = 'Deejoft'   # class variable

    def __init__(self, name: str, cohort: int) -> None:
        self.name   = name    # instance variable
        self.grades = []

    def __str__(self) -> str:   return f"{self.name}"
    def __len__(self) -> int:   return len(self.grades)

    @property
    def average(self) -> float:   # computed, read-only attribute
        return sum(self.grades) / len(self.grades) if self.grades else 0.0

    @classmethod
    def from_dict(cls, d: dict) -> 'Student':   # alternative constructor
        return cls(d['name'], d['cohort'])

    @staticmethod
    def is_valid_score(s: float) -> bool:  # utility — no self/cls needed
        return 0 <= s <= 100
```

## B. @dataclass

```python
from dataclasses import dataclass, field

@dataclass
class Course:
    title:    str
    price:    float
    level:    str = 'Beginner'
    students: list = field(default_factory=list)
    # field() required for mutable defaults — never use level: list = []
```

> ✏️ **Fill in:** What is the difference between `@property` and a regular method?
>
> ___________________________________________________________________

---

# Class 5 — Error Handling & APIs

## A. Exception Hierarchy

```python
try:
    risky_operation()
except FileNotFoundError:          # Specific — catches only this type
    return []
except (ValueError, TypeError) as e:   # Multiple types
    print(f"Error: {e}")
except Exception as e:             # Any exception (use sparingly)
    raise                          # re-raise after logging
else:
    print("Success!")              # Only runs if no exception
finally:
    print("Always runs")           # Cleanup — runs always
```

## B. httpx

```python
import httpx

with httpx.Client(timeout=10.0) as client:
    r = client.get('https://api.github.com/users/octocat')
    r.raise_for_status()   # raises HTTPStatusError for 4xx/5xx
    data = r.json()

# Async (parallel requests)
import asyncio
async def main():
    async with httpx.AsyncClient() as client:
        results = await asyncio.gather(
            client.get('https://api.example.com/a'),
            client.get('https://api.example.com/b'),
        )
```

---

# Class 6 — Type Hints & Testing

## A. Modern Type Hints

```python
# Python 3.10+ union: X | Y instead of Optional[X] or Union[X, Y]
def find(items: list[str], query: str) -> str | None: ...

# TypedDict
from typing import TypedDict
class StudentDict(TypedDict):
    name: str; cohort: int; score: float

# Protocol — structural subtyping
from typing import Protocol
class Gradable(Protocol):
    @property
    def average(self) -> float: ...
```

## B. pytest

```python
# tests/test_calculator.py
import pytest
from calculator import add, divide

def test_add_positive():
    assert add(2, 3) == 5

def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

@pytest.fixture
def sample_data():
    return [1, 2, 3, 4, 5]

def test_sum(sample_data):
    assert sum(sample_data) == 15

@pytest.mark.parametrize('a,b,expected', [
    (1, 2, 3), (0, 0, 0), (-1, 1, 0)
])
def test_add_parametrize(a, b, expected):
    assert add(a, b) == expected
```

---

# Classes 7–8 — CLI, Packaging & Deployment

## A. typer + rich CLI

```python
import typer
from rich.console import Console

app = typer.Typer()
console = Console()

@app.command()
def greet(
    name: str = typer.Argument(..., help='Student name'),
    cohort: int = typer.Option(1, '--cohort', '-c'),
):
    """Greet a student."""
    console.print(f"[bold green]Welcome, {name}! Cohort {cohort}.[/]")

if __name__ == '__main__':
    app()
```

## B. pyproject.toml & ruff

```toml
[project]
name = "my-tool"
version = "1.0.0"
requires-python = ">=3.12"
dependencies = ["typer", "rich"]

[project.scripts]
my-tool = "main:app"   # → 'my-tool' becomes a terminal command

[tool.uv]
dev-dependencies = ["pytest", "ruff"]

[tool.ruff]
line-length = 100
```

```bash
uv run ruff check .     # Lint
uv run ruff format .    # Format (like Black)
uv build                # Create distributable package
```

---

## ⚡ Python Master Quick Reference

### Syntax Comparison with JavaScript

| Python | JavaScript |
|--------|-----------|
| `def fn(x):` | `function fn(x) {}` |
| `lambda x: x * 2` | `x => x * 2` |
| `[x for x in lst]` | `lst.map(x => x)` |
| `[x for x in lst if cond]` | `lst.filter(x => cond)` |
| `and` / `or` / `not` | `&&` / `\|\|` / `!` |
| `True` / `False` / `None` | `true` / `false` / `null` |
| `x in lst` | `lst.includes(x)` |
| `f"Hello {name}"` | `` `Hello ${name}` `` |
| `print(x)` | `console.log(x)` |
| Indentation | `{ }` braces |

### Data Structure Methods

| Method | Python list | JavaScript array |
|--------|-------------|-----------------|
| Add to end | `lst.append(x)` | `arr.push(x)` |
| Remove from end | `lst.pop()` | `arr.pop()` |
| Get index | `lst.index(x)` | `arr.indexOf(x)` |
| Filter | `[x for x in lst if pred]` | `arr.filter(fn)` |
| Transform | `[f(x) for x in lst]` | `arr.map(fn)` |
| Reduce | `sum(lst)` or `functools.reduce` | `arr.reduce(fn, init)` |
| Slice | `lst[1:4]` | `arr.slice(1, 4)` |
| Sort copy | `sorted(lst)` | `[...arr].sort()` |

### Error Handling

| Concept | Python | JavaScript |
|---------|--------|-----------|
| Try block | `try:` | `try { }` |
| Catch | `except ExcType as e:` | `catch (e) { }` |
| Finally | `finally:` | `finally { }` |
| Raise | `raise ValueError('msg')` | `throw new Error('msg')` |
| Custom error | `class MyError(Exception): pass` | `class MyError extends Error {}` |

---

*Deejoft Coding School | Python | All Classes — keep permanently*
