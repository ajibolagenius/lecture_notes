# utils.py
# ============================================================
# Deejoft Coding School | Python Course Starter
# Common utility functions
# ============================================================
from pathlib import Path
import json
import csv


# ── File I/O ──────────────────────────────────────────────────

def read_json(path: str | Path, default=None):
    """
    Read and parse a JSON file.
    Returns `default` if the file does not exist or JSON is invalid.

    Usage:
        data = read_json('data/students.json', default=[])
    """
    try:
        content = Path(path).read_text(encoding='utf-8')
        return json.loads(content)
    except FileNotFoundError:
        return default
    except json.JSONDecodeError as e:
        print(f"[read_json] Invalid JSON in {path}: {e}")
        return default


def write_json(path: str | Path, data, indent: int = 2) -> None:
    """
    Write data to a JSON file, creating parent directories if needed.

    Usage:
        write_json('data/students.json', students_list)
    """
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(data, indent=indent, ensure_ascii=False),
        encoding='utf-8'
    )


def read_csv(path: str | Path, default=None) -> list[dict]:
    """
    Read a CSV file into a list of dicts (using the header row as keys).
    Returns `default` (empty list) if the file does not exist.

    Usage:
        rows = read_csv('data/expenses.csv')
    """
    if default is None:
        default = []
    try:
        with Path(path).open(encoding='utf-8', newline='') as f:
            return list(csv.DictReader(f))
    except FileNotFoundError:
        return default


def write_csv(path: str | Path, rows: list[dict], fieldnames: list[str]) -> None:
    """
    Write a list of dicts to a CSV file.

    Usage:
        write_csv('data/expenses.csv', expenses, ['date', 'category', 'amount'])
    """
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


# ── Input Helpers ─────────────────────────────────────────────

def get_float(prompt: str) -> float:
    """
    Keep asking until the user enters a valid float.

    Usage:
        price = get_float("Enter price (₦): ")
    """
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Please enter a valid number.")


def get_int(prompt: str, min_val: int | None = None, max_val: int | None = None) -> int:
    """
    Keep asking until the user enters a valid integer within optional bounds.

    Usage:
        choice = get_int("Enter choice (1-3): ", min_val=1, max_val=3)
    """
    while True:
        try:
            value = int(input(prompt))
            if min_val is not None and value < min_val:
                print(f"Please enter a value of at least {min_val}.")
                continue
            if max_val is not None and value > max_val:
                print(f"Please enter a value of at most {max_val}.")
                continue
            return value
        except ValueError:
            print("Please enter a whole number.")


# ── Number Formatting ─────────────────────────────────────────

def format_naira(amount: float) -> str:
    """
    Format a number as Nigerian Naira.

    Usage:
        print(format_naira(79999))   # → ₦79,999.00
    """
    return f"₦{amount:,.2f}"
