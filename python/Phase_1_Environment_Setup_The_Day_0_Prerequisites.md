# **Phase 1: Environment Setup (The "Day 0" Prerequisites)**

Before we write a single line of code, we need to ensure your computer speaks "Python" and that you have a professional-grade editor to write your scripts.

### **1. Install Python on Windows**

Python is the engine that runs your code. We download it directly from the source to ensure we have the full suite of developer tools.

* **Action:** Go to [python.org]() and download the latest stable version.
* **The Golden Rule:** When the installer opens, you **must** check the box that says **"Add Python to PATH"**.
* *Why?* This allows your computer's Command Prompt to recognize the word `python` as a command from any folder.


* **Verification:** Open your Command Prompt (type `cmd` in the Start menu) and type:
```bash
python --version

```


If it returns something like `Python 3.12.x`, you are ready to go!

---

### **2. Install Visual Studio Code (VS Code)**

While you can write Python in Notepad, VS Code is like a "Power Tool" for programmers. It highlights errors, suggests code, and makes debugging easy.

* **Action:** Download and install the Windows version from [code.visualstudio.com]().
* **Tip:** During installation, check the boxes for **"Add 'Open with Code' action to Windows Explorer context menu"**. This lets you right-click any folder and open it instantly in VS Code.

---

### **3. Configure VS Code for Python**

VS Code is a general editor; we need to "teach" it how to handle Python specifically.

* **The Python Extension:**
1. Open VS Code.
2. Click the **Extensions icon** on the left sidebar (or press `Ctrl+Shift+X`).
3. Search for **"Python"** (the one made by Microsoft).
4. Click **Install**. This adds features like *IntelliSense* (code completion) and *Linting* (spotting typos).


* **Optional - Prettier:** Search for and install the **"Prettier - Code formatter"** extension. This ensures your code looks clean and professional automatically.

---

### **Practical Example: Your First "Hello World"**

Let’s test if your setup is actually working.

1. **Create a Folder:** Create a folder on your Desktop named `Python_Lessons`.
2. **Open in VS Code:** Open VS Code, go to `File > Open Folder`, and select your `Python_Lessons` folder.
3. **New File:** Click the "New File" icon and name it `app.py`.
4. **The Code:** Type the following:
```python
print("Environment Setup Complete!")
print(2 + 2)

```


5. **Run it:** Right-click anywhere in the text editor and select **"Run Python File in Terminal"**.

**Expected Result:** You should see the text and the number `4` appear in the bottom panel.

---

### **Assignment 0: The "Checklist" Challenge**

To ensure every student is truly ready for Week 1, complete the following tasks:

1. **The Screenshot Task:** Take a screenshot of your VS Code window showing the `app.py` file you just ran, with the terminal output visible at the bottom.
2. **The Terminal Discovery:** Open your Windows Command Prompt and type `where python`. Paste the file path it gives you into a comment inside your `app.py` file using the `#` symbol.
* *Example:* `# My python path is C:\Users\Name\AppData\Local\Programs\Python\Python312\python.exe`


3. **Extension Hunt:** Find and install one "Theme" extension in VS Code (e.g., "Dracula", "One Dark Pro", or "GitHub Theme") to customize the look of your editor. Write the name of the theme you chose in your `app.py` file as well.

---
