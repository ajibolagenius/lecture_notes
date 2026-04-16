# 📚 Python for Robotics — Free PDF Resources

This reading list is matched to this repo's curriculum:

- Python fundamentals in a robotics context
- sensor processing and telemetry
- state machines and control loops
- OOP, exceptions, testing, and CLI packaging
- path planning, kinematics, and ROS-adjacent concepts

All links below were checked on **2026-04-16** and point to official or open-access sources.

---

## Recommended Order

1. **Think Python, 2e**
2. **Modeling and Simulation in Python**
3. **Foundations of Robotics**
4. **Modern Robotics**
5. **Feedback Systems**
6. **Planning Algorithms**

---

## Beginner

### 1. Think Python, 2e
**Best for:** variables, control flow, functions, classes, files, exceptions, debugging

Why it fits this repo:
- strengthens the Python basics used throughout the course outline
- useful for the handouts on file I/O, OOP, and exceptions
- a good foundation before moving into robotics-heavy material

Links:
- PDF: https://greenteapress.com/thinkpython2/thinkpython2.pdf
- Official page: https://greenteapress.com/wp/think-python-2e/

### 2. Modeling and Simulation in Python
**Best for:** simulation thinking, numerical reasoning, simple system models

Why it fits this repo:
- bridges simple Python code and robotics-style simulation
- useful for understanding moving averages, sensor behavior, and simple robot world models
- supports the pure-Python simulator approach used in this repo

Links:
- PDF: https://greenteapress.com/modsimpy/ModSimPy3.pdf
- Official page: https://greenteapress.com/wp/modsimpy/

---

## Intermediate

### 3. Foundations of Robotics: A Multidisciplinary Approach with Python and ROS
**Best for:** the closest overall match to this repo

Why it fits this repo:
- directly connects robotics concepts to Python
- includes ROS material without requiring the entire repo to become ROS-dependent
- aligns well with sensors, navigation, control, and software structure

Best chapter PDFs for this codebase:
- Book page: https://link.springer.com/book/10.1007/978-981-19-1983-1
- Python and software foundations: https://link.springer.com/content/pdf/10.1007/978-981-19-1983-1_4
- ROS1 and ROS2: https://link.springer.com/content/pdf/10.1007/978-981-19-1983-1_5
- Sensors, actuators, and algorithms: https://link.springer.com/content/pdf/10.1007/978-981-19-1983-1_7
- Control, navigation, and path planning: https://link.springer.com/content/pdf/10.1007/978-981-19-1983-1_8
- Localisation and mapping: https://link.springer.com/content/pdf/10.1007/978-981-19-1983-1_9

### 4. Modern Robotics
**Best for:** kinematics, motion, planning, manipulation, mobile robots

Why it fits this repo:
- useful when the student wants to go beyond Python syntax into actual robotics math and motion
- especially relevant for kinematics, transforms, and path/motion ideas
- pairs well with simulator extensions after the core course

Links:
- PDF: https://hades.mech.northwestern.edu/images/0/0c/MR-tablet-v2.pdf
- Official page: https://hades.mech.northwestern.edu/index.php/Modern_Robotics

---

## Advanced

### 5. Feedback Systems: An Introduction for Scientists and Engineers
**Best for:** PID intuition, feedback loops, stability, control-system thinking

Why it fits this repo:
- directly reinforces the control-loop material in the course
- useful for the PID challenge and for understanding closed-loop robot behavior
- strong follow-up once the student is comfortable with Python and simulation

Links:
- PDF landing page: https://authors.library.caltech.edu/25062/
- Official record: https://authors.library.caltech.edu/records/yzs24-xsx88/latest

### 6. Planning Algorithms
**Best for:** BFS, A*, search, motion planning, uncertainty, sensor-based planning

Why it fits this repo:
- strongly supports the maze navigator capstone and any path-planning extensions
- connects grid search to broader robotics planning methods
- especially relevant once the student starts building autonomous navigation logic

Links:
- Official page: https://lavalle.pl/planning/
- PDF downloads are listed on the official page under **Download the whole book**

---

## Bonus

### 7. ROBUST: 221 Bugs in the Robot Operating System
**Best for:** software quality, testing mindset, failure patterns in robotics software

Why it fits this repo:
- complements the repo's `pytest`, exceptions, and fault-tolerance material
- useful for students who want to think like robotics software engineers, not only Python learners

Links:
- PDF: https://link.springer.com/content/pdf/10.1007/s10664-024-10440-0.pdf
- Official page: https://link.springer.com/article/10.1007/s10664-024-10440-0

---

## Quick Picks by Repo Topic

- **Python basics, OOP, file I/O, exceptions:** Think Python
- **Simulation and sensor-style numeric thinking:** Modeling and Simulation in Python
- **Python + robotics + ROS overview:** Foundations of Robotics
- **Kinematics and motion:** Modern Robotics
- **PID and control loops:** Feedback Systems
- **Maze navigation, BFS, A*, planning:** Planning Algorithms
- **Testing and reliability mindset:** ROBUST

---

## Best 3 to Start With

If a student should start with only three:

1. **Think Python**
2. **Foundations of Robotics**
3. **Planning Algorithms**
