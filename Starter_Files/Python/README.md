# Python Starter — uv + Python 3.13

Pre-configured with `uv`, `ruff`, and `pytest`. Includes utility functions for file I/O, input handling, and number formatting.

## Quick Start

```bash
# 1. Copy and rename this folder
cp -r Python my-project
cd my-project

# 2. Initialise the project with uv
uv init .

# 3. Install dependencies
uv sync

# 4. Run the script
uv run python main.py
```

## Project Structure

```
my-project/
├── main.py             ← Entry point — your code starts here
├── utils.py            ← Utility functions (read_json, write_csv, etc.)
├── tests/
│   └── test_utils.py   ← Starter test file — add your tests here
├── pyproject.toml      ← Project config: dependencies, ruff, pytest
└── data/               ← Create this for your CSV/JSON files
```

## Utility Reference (`utils.py`)

```python
from utils import read_json, write_json, read_csv, write_csv, get_float, format_naira

# JSON
students = read_json('data/students.json', default=[])
write_json('data/students.json', students)

# CSV
expenses = read_csv('data/expenses.csv')             # → list[dict]
write_csv('data/expenses.csv', expenses, ['date', 'category', 'amount'])

# Input with validation
price = get_float("Enter price (₦): ")              # Keeps asking until valid
choice = get_int("Choose (1-3): ", min_val=1, max_val=3)

# Formatting
print(format_naira(79999))                           # → ₦79,999.00
```

## Common Commands

```bash
uv run python main.py          # Run the script
uv run pytest -v               # Run all tests
uv run pytest --cov=utils      # Run tests with coverage report
uv run ruff check .            # Lint your code
uv run ruff format .           # Auto-format your code
uv add httpx                   # Add a dependency
uv add --dev pytest-cov        # Add a dev dependency
```

## Adding a CLI with typer

```bash
uv add typer rich
```

```python
# main.py
import typer
from rich.console import Console

app = typer.Typer()
console = Console()

@app.command()
def hello(name: str = typer.Argument(...)):
    console.print(f"[bold green]Hello, {name}![/]")

if __name__ == "__main__":
    app()
```

```bash
uv run python main.py Ada
# → Hello, Ada!
```

## Type Hints Reminder

```python
# Modern Python 3.10+ style — use | not Union or Optional
def find(name: str) -> dict | None: ...
def process(items: list[dict]) -> list[str]: ...
def load(path: str, default: list = None) -> list: ...
```

## Running Tests

```bash
uv run pytest                   # All tests
uv run pytest -v                # Verbose — shows each test name
uv run pytest -k "test_json"    # Only tests matching this pattern
uv run pytest --cov=utils --cov-report=term-missing
```
