# --- File I/O ---
# File I/O (Input/Output) is a fundamental aspect of programming that allows you to read from and write to files.

# Pathlib is a module in Python that provides an object-oriented interface for working with file paths. It allows you to manipulate file paths and perform various operations on them.

from os import write
from pathlib import Path

data_dir = Path("data")
data_dir.mkdir(exist_ok=True)  # Create the directory if it doesn't exist

report = data_dir / "report.txt"  # Create a Path object for the report file

# Writing to a file
# report.write_text("Deejoft Cohort 7 Report\n", encoding="utf-8")  # Write a string to the file

# Appending to a file
"""with and open() are used to open a file and ensure it is properly closed after the block of code is executed."""

# with report.open("a", encoding="utf-8") as f:
#     f.write("Student: Ada Lovelace — Grade A\n")
#     f.write("Student: Alan Turing  — Grade B\n")

# Reading from a file
content = report.read_text(encoding="utf-8")  # Read the entire content of the file
lines = report.read_text(encoding="utf-8").splitlines()  # Read the content and split it into lines
# print(content)
# print(lines)

# Path utilities
# print(report.exists())        # True
# print(report.suffix)          # '.txt'
# print(report.stem)            # 'report'
# print(report.parent)          # data/

# --- CSV Files ---
# CSV (Comma-Separated Values) is a common file format used for storing tabular data. Python provides a built-in csv module for working with CSV files.

# Iterate all CSV files recursively in the data directory
for csv_file in data_dir.rglob("*.csv"):
    print(csv_file)

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

    print(totals)
    return dict(sorted(totals.items(), key=lambda x: x[1], reverse=True))


write_expenses([
    {"date": "2024-06-01", "category": "Food", "description": "Groceries", "amount": "50.00"},
    {"date": "2024-06-02", "category": "Transport", "description": "Bus ticket", "amount": "2.50"},
    {"date": "2024-06-03", "category": "Food", "description": "Pizza", "amount": "10.00"},
    {"date": "2024-06-04", "category": "Entertainment", "description": "Movie tickets", "amount": "15.00"},
    {"date": "2024-06-05", "category": "Transport", "description": "Taxi", "amount": "20.00"},
])

read_expenses()

get_total_by_category(read_expenses())
