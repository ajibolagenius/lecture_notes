# 👋 Welcome to Deejoft Coding School
### Student Onboarding Guide — Web & Mobile Development Track

---

## Hello and welcome.

You have made a decision that many people talk about and few actually follow through on. You are here. That already puts you in a different category.

This guide covers everything you need to know before your first class — what to install, what to expect, how we work, and how to get the most out of your time here. Read it once now and keep it as a reference.

---

## 📅 Your Course Track

Depending on your enrolled track, your courses run in this sequence:

| # | Course | Duration | What You Build |
|---|--------|----------|----------------|
| 1 | HTML | 2 weeks | Portfolio page structure |
| 2 | CSS | 2 weeks | Styled, responsive portfolio |
| 3 | JavaScript | 4 weeks | Interactive dashboard |
| 4 | React | 4 weeks | Deployed web application |
| 5 | React Native | 4 weeks | Published mobile app |
| 6 | Python | 4 weeks | CLI tool & API client |

Each course builds on the one before it. Your HTML portfolio becomes your CSS project. Your CSS project becomes your JavaScript project. By the end of the track, you have a body of connected work — not six isolated exercises.

---

## 🖥 What to Install Before Day 1

Set aside **90 minutes** to complete this. Do not leave it for the morning of your first class. If you hit a problem, message us — we will help you resolve it before class starts.

---

### 1. A Modern Web Browser — Google Chrome

We use Chrome throughout the course because its developer tools (DevTools) are the most fully featured.

**Download:** `chrome.google.com`

After installing, verify it is up to date:
`Menu (⋮) → Help → About Google Chrome → Update if available`

---

### 2. VS Code — Your Code Editor

VS Code is the editor used by the majority of professional web and mobile developers.

**Download:** `code.visualstudio.com`

After installing, open VS Code and install these extensions. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac) to open the Extensions panel, then search each name:

| Extension | Publisher | Why You Need It |
|-----------|-----------|-----------------|
| **Live Server** | Ritwick Dey | Opens HTML files in the browser and auto-refreshes on save |
| **Prettier** | Prettier | Automatically formats your code on save |
| **ESLint** | Microsoft | Highlights JavaScript errors as you type |
| **Python** | Microsoft | Python language support, IntelliSense, debugging |
| **GitLens** | GitKraken | Shows who changed what and when in git history |

**Configure Prettier as your default formatter:**
1. Press `Ctrl+Shift+P` → type `Open User Settings (JSON)`
2. Add these lines inside the `{}`:
```json
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
"editor.tabSize": 2,
"editor.wordWrap": "on"
```

---

### 3. Node.js — JavaScript Runtime

Node.js lets you run JavaScript outside the browser and is required for all our tooling (Vite, React, Expo, etc.).

**Download:** `nodejs.org` — choose the **LTS** version (not Current)

After installing, open a terminal and verify:
```bash
node --version    # Should show v20.x.x or higher
npm --version     # Should show 10.x.x or higher
```

> **Windows users:** After installing, close and reopen any terminal windows. If `node` is not found, restart your computer.

---

### 4. Git — Version Control

Git tracks every change you make to your code. You will use it every single class.

**Download:** `git-scm.com/downloads`

After installing, open a terminal and configure your identity:
```bash
git --version   # Verify installation

git config --global user.name  "Your Full Name"
git config --global user.email "your@email.com"
git config --global core.editor "code --wait"   # Use VS Code for git messages
```

---

### 5. GitHub Account

GitHub is where you store and share your code. It is also where all your assignments are submitted and where employers look at your work.

1. Go to `github.com` and create a free account
2. Use a professional username — ideally your name or a close variation
3. Add a profile photo (any clear photo)
4. Share your GitHub username with your instructor

---

### 6. Python 3.13 + uv (Python Track Only)

If you are enrolled in the Python course:

**Install `uv` — the modern Python package manager:**
```bash
# Windows (PowerShell):
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Mac / Linux:
curl -LsSf https://astral.sh/uv/install.sh | sh
```

After installing, restart your terminal and verify:
```bash
uv --version    # Should show uv 0.5.x or higher
uv run python --version   # Should show Python 3.13.x
```

> `uv` installs and manages Python versions automatically — you do not need to separately install Python if you use `uv`.

---

### 7. Expo Go — Mobile App (React Native Track Only)

If you are enrolled in React Native, install **Expo Go** on your personal phone:

- **iPhone:** Search "Expo Go" in the App Store
- **Android:** Search "Expo Go" in the Google Play Store

You will use this to run your apps on your real device during every class. Make sure your phone and laptop are on the **same Wi-Fi network** during class.

---

### ✅ Pre-Class Checklist

Tick each item before your first session:

- [ ] Chrome installed and up to date
- [ ] VS Code installed with all 5 extensions
- [ ] Prettier configured with `formatOnSave: true`
- [ ] Node.js v20+ installed (`node --version` works)
- [ ] Git installed and configured with your name and email
- [ ] GitHub account created — username shared with instructor
- [ ] *(Python track)* `uv` installed and `uv run python --version` shows 3.13+
- [ ] *(React Native track)* Expo Go installed on your phone

---

## 📐 How Classes Work

### Class Structure

Each class runs for approximately 2 hours. The structure varies but typically follows:

```
First 10 min   →  Homework review or warm-up quiz
Most of class  →  Live coding: tutor types, you type along
Last 20-30 min →  Guided exercise: you build something yourself
```

> **Type along — do not copy-paste.** This is not a courtesy rule. It is a learning mechanism. Your fingers need to know where the semicolons go, not just your eyes. Students who copy-paste consistently fall behind students who type along, even when the copy-pasters produce the same code.

### Attendance

We run a small cohort by design. When you miss a class, you miss live coding, live debugging, and peer questions that are not in any notes. Miss a class and:
1. Read the lesson plan for that class (in the GitHub repo)
2. Watch the recorded session if one exists
3. Complete the exercise before the next class

More than 2 unexcused absences in a single course may require repeating that course before progressing.

---

## 🧰 Tools We Use in Class

| Tool | Purpose | URL |
|------|---------|-----|
| **VS Code** | Writing code | Installed locally |
| **Chrome DevTools** | Debugging HTML, CSS, JS in the browser | `F12` in Chrome |
| **GitHub** | Storing and submitting code | `github.com` |
| **Vite** | Development server for JS/React projects | Installed via npm |
| **Expo Go** | Testing React Native apps on device | Installed on phone |
| **MDN Web Docs** | Reference for HTML, CSS, JavaScript | `developer.mozilla.org` |
| **W3C Validator** | Checking HTML for errors | `validator.w3.org` |
| **Utopia** | Generating fluid type scales for CSS | `utopia.fyi` |

---

## 🗂 Submitting Your Work

All assignments are submitted by pushing code to GitHub.

**The workflow for every assignment:**

```bash
# 1. Create a folder for the project
mkdir my-project
cd my-project

# 2. Initialise git
git init
git branch -M main

# 3. Write your code, then stage and commit
git add .
git commit -m "feat: initial project setup"

# 4. Create a repo on github.com (click +, then New repository)
# Name it to match your project folder
# Copy the repo URL

# 5. Connect and push
git remote add origin https://github.com/YOUR-USERNAME/my-project.git
git push -u origin main
```

**For all subsequent changes:**
```bash
git add .
git commit -m "describe what you changed"
git push
```

Your instructor will review your code by visiting your GitHub repository. Make sure it is **public** and the link is shared by the deadline.

---

## 💬 How to Ask for Help

Learning to ask good questions is itself a skill — and it will serve you beyond this school.

**In class:** Raise your hand or unmute. No question is too basic. If you are confused, someone else is too.

**Outside class (WhatsApp group):**

Write messages in this format:
```
What I'm trying to do:
[Describe the goal in one sentence]

What I expected:
[What you thought would happen]

What actually happened:
[The actual result — include error messages exactly as they appear]

What I've already tried:
[List at least two things you tried before asking]

Code / screenshot:
[Paste the relevant code block or attach a screenshot]
```

> **Do not send:** "It's not working" or "Help" with no context. These messages cannot be answered without asking follow-up questions that delay the help you need.

**Reading error messages:** Before asking for help, read the error message fully. The last line usually tells you what went wrong. The line before it usually tells you where. Copy the error into Google exactly as written (in quotes) — this solves the majority of common problems.

---

## 🤝 Code of Conduct

We keep this short because it comes down to one principle: **treat everyone the way you want to be treated when you are struggling.**

**In practice:**
- Ask questions without apologising for asking — there are no stupid questions, only unasked ones
- Share what you learn — if you figured something out, tell the person next to you
- Do not copy another student's work and submit it as your own — you are only cheating your own learning
- Respect everyone's time — be on time, be present, be in the moment
- Keep the WhatsApp group on-topic during class hours

Violations of the code of conduct that affect other students' learning experience are addressed by the instructor directly. Repeated issues may result in removal from the cohort.

---

## 🧠 Getting the Most Out of This Course

Five habits that separate students who get jobs from students who complete the course but struggle afterward:

**1. Code every day — even for 20 minutes.**
The brain consolidates programming skills during the spaces between sessions, not during them. A 20-minute daily review beats a 4-hour cramming session the day before class.

**2. Build something you actually want to exist.**
The exercises are designed to teach specific skills. But the best learning happens when you take those skills and apply them to something you personally care about — a tool for your own life, a problem you actually have. Start that side project early.

**3. Read other people's code.**
GitHub has millions of public projects. After each topic, find one well-regarded open-source project that uses what you just learned and spend 30 minutes reading it. You will pick up patterns and conventions that no course can explicitly teach.

**4. Write code before you look up the answer.**
When you hit a problem: spend 20 minutes trying to solve it yourself before going to Google, MDN, or asking for help. That struggle is where learning actually happens. The answer you find after 20 minutes of effort sticks. The answer you copy immediately does not.

**5. Take notes in your own words.**
The lesson plans and handouts are a reference, not a substitute for your own understanding. After each class, close the notes and write a one-paragraph summary in plain English: what did this class teach me, and how does it connect to what came before it?

---

## 📞 Contact & Important Links

| What | Where |
|------|-------|
| Class notes & assignments | `github.com/ajibolagenius/lecture_notes` |
| WhatsApp group | *Link shared on enrolment* |
| Email | `tutor@deejoft.com` |
| Website | `deejoft.com` |

---

## 🎯 One Last Thing

You will feel lost during this course. Everyone does — including the people sitting next to you who look like they understand. The feeling of confusion is not a signal that you are bad at this. It is the signal that learning is happening.

The only students who do not make it through are the ones who stop. Keep typing.

See you in class.

---

*Deejoft Coding School — Student Welcome Guide*
*Last updated: 2025*
