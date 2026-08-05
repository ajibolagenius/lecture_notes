# Part 4: Deployment & Interfaces (Enhanced with Real World Practice)

This part shows you how to build Windows friendly interfaces and how to package your work so other people can run it.

## Module 10: GUI Development (Windows Apps with Tkinter)

GUI development allows you to build windows, buttons, and forms that users can click.

### Core concepts

• Tkinter basics: Python’s built in GUI library, works natively on Windows  
• Widgets: the building blocks of your app  
  • Labels: display text  
  • Buttons: trigger actions  
  • Entries: text input boxes  
  • Text: multi line input

• Event handling: connect a button click to a function that runs logic

### Real world examples

• A small data entry form that saves entries into a CSV  
• An internal “quick calculator” for receipts or discounts  
• A support tool where a user enters a ticket ID and clicks Search

### Mini project: Data Entry App (Save to CSV)

Goal  
• User types name and amount  
• Click Save  
• Data is appended to a CSV file with today’s date

```python
import tkinter as tk
from tkinter import messagebox
import csv
from datetime import date
from pathlib import Path

file_path = Path("entries.csv")

def save_entry():
    name = name_entry.get().strip()
    amt_text = amount_entry.get().strip()

    if not name:
        messagebox.showwarning("Input error", "Name is required.")
        return

    try:
        amount = float(amt_text)
    except ValueError:
        messagebox.showwarning("Input error", "Amount must be a number.")
        return

    is_new = not file_path.exists()
    with file_path.open("a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if is_new:
            writer.writerow(["date", "name", "amount"])
        writer.writerow([date.today().isoformat(), name, f"{amount:.2f}"])

    messagebox.showinfo("Saved", "Entry saved successfully.")
    name_entry.delete(0, tk.END)
    amount_entry.delete(0, tk.END)

window = tk.Tk()
window.title("Quick Entry Tool")
window.geometry("320x180")

tk.Label(window, text="Name").pack(pady=3)
name_entry = tk.Entry(window)
name_entry.pack(pady=3)

tk.Label(window, text="Amount").pack(pady=3)
amount_entry = tk.Entry(window)
amount_entry.pack(pady=3)

tk.Button(window, text="Save", command=save_entry).pack(pady=10)
window.mainloop()
```

Checkpoint tasks
• Add a third field called Category  
• Prevent negative amounts  
• Add a button called Open File that opens the CSV location using `os.startfile`

***

## Module 11: Virtual Environments & Distribution

Once your app is finished, prepare it to run cleanly on other computers.

### Virtual environments (venv)

A virtual environment is an isolated bubble for one project.

Why this matters (real world)
• Project A needs older libraries, Project B needs newer libraries  
• Without venv, installs collide and break projects  
• With venv, each project stays stable and repeatable

Windows workflow (typical)
• Create venv: `python -m venv .venv`  
• Activate (PowerShell): `.venv\Scripts\Activate.ps1`  
• Install packages: `pip install requests`  
• Save requirements: `pip freeze > requirements.txt`

### Packaging to an exe

• auto py to exe can package a script into a Windows exe so users can run it without installing Python  
• Alternative: PyInstaller is another widely used packager

Real world examples
• Sending a simple tool to a teammate  
• Building a small internal utility for non technical staff

Checkpoint tasks
• Create a venv in a new folder and install one library  
• Generate requirements.txt  
• Explain what problem requirements.txt solves

***

## Implementation Example: Simple Greet App (Improved Notes)

This demonstrates a basic Tkinter window with a label, an entry box, and a button that triggers an event.

```python
import tkinter as tk
from tkinter import messagebox

def handle_click():
    name = entry.get().strip()
    if name:
        messagebox.showinfo("Windows App", f"Hello, {name}. Your GUI is working.")
    else:
        messagebox.showwarning("Input error", "Please enter a name.")

window = tk.Tk()
window.title("My First Windows App")
window.geometry("300x150")

tk.Label(window, text="Enter your name").pack(pady=5)
entry = tk.Entry(window)
entry.pack(pady=5)

tk.Button(window, text="Greet me", command=handle_click).pack(pady=10)
window.mainloop()
```

Practice extension
• Add a second button: Clear  
• Add validation: block numbers in the name field
