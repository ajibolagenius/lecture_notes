# 📋 Python for Robotics — Lesson Plans (All 8 Classes)
### Tutor's Guide | Robotics-Contextualized Python Track

---

> **How to use these plans:**
> Each plan is structured as a 2-hour session. The robotics context is intentional — it reinforces what the student is learning in her university course. Reference her university content wherever possible (ask her what topic she covered that week and tie it directly into the Python lesson).

---

## Class 1 — Robot Identity: Setup, Variables & Types
**Duration:** 2 hours | **University link:** Introduction to robotics, robot anatomy

### Learning Objectives
By the end of this class, the student will be able to:
- Model a robot's attributes using Python's core data types
- Explain why `None` is used for uninitialised sensor values
- Write f-strings to format telemetry output
- Use the `uv` REPL for immediate experimentation

### Session Plan

| Time | Activity | Notes |
|------|----------|-------|
| 0:00–0:10 | **Welcome & connection** | Ask: what robots has she seen in her university lectures? Map each robot attribute to a data type. |
| 0:10–0:30 | **Setup & REPL demo** | Install uv, `uv init robot-sim`, launch REPL. Type-check a robot's attributes live. |
| 0:30–0:50 | **Variables & Types demo** | Build a robot profile in the REPL: `robot_id`, `battery_level`, `is_active`, `last_error = None`. Show `type()`. |
| 0:50–1:05 | **f-strings for telemetry** | Format a telemetry line. Introduce the debug shorthand `f"{reading = }"` — extremely useful for sensor tuning. |
| 1:05–1:30 | **Guided coding** | Student builds her own robot profile. Walk through Exercise 1.1 and 1.2 together. |
| 1:30–1:50 | **Pair exercise** | Exercise 1.3 (Robot State Reporter). Help only when stuck. |
| 1:50–2:00 | **Wrap-up** | Summarise: every robot attribute is a Python value. Assign: bring a list of 5 attributes from her university robot and their types. |

### Tutor Notes
- **Key analogy:** A robot in Python is like a dictionary of values. Everything about its state — position, battery, heading — is a variable. This is exactly how ROS (Robot Operating System) stores robot state.
- Watch for the `== None` vs `is None` mistake — it will appear again in sensor code.
- If she's ahead: introduce `match/case` early using robot states.

---

## Class 2 — Robot Brain: Control Flow & Loops
**Duration:** 2 hours | **University link:** Robot control loops, finite state machines

### Learning Objectives
- Model robot states with `match/case`
- Implement a sensor threshold decision chain
- Build a robot control loop with `while`
- Iterate over waypoints with `for` and `enumerate`

### Session Plan

| Time | Activity | Notes |
|------|----------|-------|
| 0:00–0:10 | **Connect to university** | Ask: has she seen a finite state machine (FSM) diagram yet? Draw the robot states (IDLE, MOVING, OBSTACLE, CHARGING, ERROR) on paper. |
| 0:10–0:30 | **match/case demo** | Show `match state:` with all robot states. This IS an FSM in code. |
| 0:30–0:50 | **Sensor thresholds** | Build the distance decision chain (< 10 → STOP, < 25 → SLOW, etc.). Have her change the thresholds and explain why. |
| 0:50–1:10 | **The control loop** | Build the battery/obstacle `while` loop live. Emphasise: *this is the inner loop of every real robot*. |
| 1:10–1:30 | **Waypoint iteration** | Iterate a waypoint list with `enumerate`. Introduce `zip` using parallel speed/waypoint lists. |
| 1:30–1:50 | **Exercise** | Exercise 1.4 (Robot State Machine). Let her implement it; hint only when asked. |
| 1:50–2:00 | **Wrap-up** | Mini project assigned: CLI robot status monitor (prints current state, battery, and sensor reading, updates each loop cycle). |

### Tutor Notes
- **Key analogy:** A PID control loop is a `while True:` loop. The error signal is a variable updated every cycle. The controller is a function called inside the loop. Plant this seed now — they'll implement PID in Exercise 4 (Challenge).
- The `for/else` and `while/else` constructs are confusing. Skip `for/else`. Only use `while/else` if you've already explained the main loop pattern confidently.
- Ask her: "When would you want to use `break` vs setting `running = False`?" (Answer: `break` for emergency stops; `running = False` for clean exits)

---

## Class 3 — Robot Memory: Data Structures
**Duration:** 2 hours | **University link:** Sensor arrays, occupancy grids, configuration files

### Learning Objectives
- Use lists to store sensor scan data and perform analysis
- Use dictionaries for robot configuration and sensor registries
- Choose between tuple, list, and dict for the right use case
- Use sets for unique IDs and obstacle zone tracking

### Session Plan

| Time | Activity | Notes |
|------|----------|-------|
| 0:00–0:10 | **Review + connect** | Quick quiz: name a list, dict, tuple, and set use case in robotics. |
| 0:10–0:30 | **Lists & lidar data** | Build the 10-reading lidar scan. Find min, angle, filter obstacles. Show the rolling buffer. |
| 0:30–0:50 | **Dictionaries: sensor registry** | Build the sensor config dictionary. Show nested access, `.get()` with fallback, iteration over `.items()`. |
| 0:50–1:10 | **Tuples & Named Tuples** | Why position should be a tuple (immutable). Build a `Pose` named tuple. Unpack coordinates. |
| 1:10–1:20 | **Sets: unique zones** | Show deduplication of obstacle zones. Union/intersection for fleet zones. |
| 1:20–1:50 | **Exercise** | Exercise 2.1 (Lidar Scan Analysis) and 2.2 (Sensor Registry). |
| 1:50–2:00 | **Wrap-up** | Introduce File I/O for next class. Ask: where should a robot save its sensor readings? |

### Tutor Notes
- **Data structure decision tree (teach this):**
  - "Is the data ordered and may change?" → `list`
  - "Is it key-value lookup?" → `dict`
  - "Is it a fixed record that shouldn't be changed?" → `tuple` (or named tuple)
  - "Do I need uniqueness or set math?" → `set`
- List comprehensions on sensor data are very natural here — filter by threshold, transform units. Don't rush past them.
- Occupancy grids (from university) are just 2D lists — make this connection explicitly.

---

## Class 4 — Robot Actions: Functions & Telemetry Logging
**Duration:** 2 hours | **University link:** Robot behaviours, data logging, ROS topics

### Learning Objectives
- Write functions that model robot behaviours with type hints
- Use keyword-only arguments to prevent dangerous argument order bugs
- Write and read CSV telemetry logs using pathlib
- Load robot configuration from JSON

### Session Plan

| Time | Activity | Notes |
|------|----------|-------|
| 0:00–0:15 | **Motivate with real robotics** | Show a real ROS bag (or describe it): robots log everything. CSV is the simplest version of this. |
| 0:15–0:35 | **Function design for robots** | Build `euclidean_distance`, `calculate_heading`, `smooth_readings`. Introduce `*` for keyword-only. |
| 0:35–0:55 | **Pathlib & file operations** | Create `telemetry/` dir, build path, write/read a log. Show `.rglob("*.csv")`. |
| 0:55–1:15 | **CSV Logger** | Build `log_telemetry`, `read_telemetry`, `summarise_session` together. |
| 1:15–1:35 | **JSON Config** | `load_robot_config` and `save_robot_config`. Show how config changes persist. |
| 1:35–1:55 | **Exercise** | Exercise 2.3 (Telemetry Logger). |
| 1:55–2:00 | **Wrap-up** | Mini-project deliverable: sensor data logger + path recorder. |

### Tutor Notes
- Keyword-only arguments (`*`) are especially important in robotics. `drive(0.5, 90.0, 2.0)` — which is speed, which is direction? Mandatory keyword args prevent this. Emphasise this with a real-world story.
- The `pathlib` `/` operator for paths is modern Python; avoid `os.path.join`. Show the cross-platform benefit.
- The `summarise_session` function naturally leads into OOP next week (encapsulate it in a class).

---

## Class 5 — The Robot Object: OOP
**Duration:** 2 hours | **University link:** Software architecture for robots, ROS nodes as objects

### Learning Objectives
- Build a `Robot` class with instance variables, properties, and methods
- Use `@property` for computed state (battery_ok, total_distance)
- Use `@classmethod` for fleet-wide operations
- Extend with inheritance for specialised robot types

### Session Plan

| Time | Activity | Notes |
|------|----------|-------|
| 0:00–0:15 | **OOP motivation** | "A robot IS an object. It has state (variables) and behaviour (methods). ROS models every node as a class." Draw Robot class diagram on paper first. |
| 0:15–0:40 | **Build Robot class together** | `__init__`, `__str__`, `position` property, `move_to`. Run it in the REPL after each method. |
| 0:40–1:00 | **Properties & class methods** | `total_distance` property (requires path history). `Robot.get_active_robots()`. Emphasise: class methods are for fleet-level queries. |
| 1:00–1:20 | **Dunder methods** | `__len__` (path length), `__repr__`. Contrast `__str__` (for humans) vs `__repr__` (for devs). |
| 1:20–1:40 | **Inheritance** | Build `ArmRobot(Robot)`. Show `super().__init__()`. Override `__str__`. Polymorphism: call `status_report()` without knowing the type. |
| 1:40–1:55 | **Dataclass: Sensor** | Show `@dataclass` as a lighter alternative for data-only classes. Compare to full class. |
| 1:55–2:00 | **Wrap-up** | Exercise 3.1–3.3 assigned. |

### Tutor Notes
- **Key insight:** Every ROS node is a Python class that inherits from `Node`. OOP is not abstract here — it is literally how professional robot software is written.
- The `@property` pattern is crucial for robot code: `robot.is_low_battery` reads much more naturally than `robot.check_battery_low()`. Properties are for attributes that compute from state; methods are for actions that change state.
- If the student has done C++ in university, contrast Python's approach: no access modifiers, convention-based (`_private`).

---

## Class 6 — Fault Tolerance: Error Handling
**Duration:** 2 hours | **University link:** Fault detection and recovery, robot safety systems

### Learning Objectives
- Build a custom exception hierarchy for robot faults
- Apply try/except to sensor reading with retry logic
- Decide when to recover vs escalate vs crash
- Use context managers for resource safety

### Session Plan

| Time | Activity | Notes |
|------|----------|-------|
| 0:00–0:15 | **Motivate: what happens when sensors fail?** | Real-world case: a self-driving car's lidar returns None. What should the software do? Category: recover (retry), degrade gracefully (use backup), or halt (safety critical). |
| 0:15–0:30 | **Custom exceptions** | Build `RobotError → SensorFailureError, BatteryDepletedError, ObstacleCollisionError`. Show the hierarchy matters. |
| 0:30–0:50 | **Retry pattern** | Build `safe_read_sensor()` with loop and retry. Return `None` on exhaustion — don't crash. |
| 0:50–1:10 | **Full mission try/except** | Build `execute_mission()`. Show: specific exception types catch specific faults. `finally` always runs. |
| 1:10–1:25 | **Context manager** | Build `Timer` context manager. Show `@contextmanager`. Emphasise: `with` guarantees cleanup. |
| 1:25–1:50 | **Exercise** | Exercise 3.2 (Fault-Tolerant Sensor Hub). |
| 1:50–2:00 | **Wrap-up** | Discussion: where should a robot log errors? (Telemetry CSV from Class 4 — bring it back.) |

### Tutor Notes
- **Key teaching point:** There are three responses to a fault: (1) retry and recover, (2) degrade gracefully (continue without that sensor), (3) halt and escalate. Students often think exceptions = crash. Show that `try/except` is how you *prevent* crashes.
- `finally` is very important for robots: motor off, log written, status updated — these must happen even if an exception occurs.
- Don't skip the exception hierarchy. `except RobotError` catching all robot errors is a powerful pattern that mirrors how real robot safety systems work.

---

## Class 7 — Reliable Robot Code: Type Hints & Testing
**Duration:** 2 hours | **University link:** Software verification, unit testing in engineering

### Learning Objectives
- Add complete type hints to all robot functions and classes
- Write a pytest test suite for the `Robot` class
- Apply parametrised tests for multiple sensor thresholds
- Use `pytest.raises` for exception testing

### Session Plan

| Time | Activity | Notes |
|------|----------|-------|
| 0:00–0:15 | **Why types matter in robotics** | Real example: a function expecting `cm` receives `m`. Type hints catch this at review. mypy catches it automatically. |
| 0:15–0:35 | **Type hints review & TypedDict** | Annotate `Robot.__init__`, `move_to`, `drive`. Add `WaypointList` TypedDict. Show `Protocol` for `Navigable`. |
| 0:35–0:55 | **First pytest tests** | Write test for `position`, `move_to`, `total_distance`. Run with `uv run pytest -v`. |
| 0:55–1:15 | **Fixtures & parametrise** | `@pytest.fixture` for Robot instance. `@pytest.mark.parametrize` for battery status thresholds. |
| 1:15–1:30 | **pytest.raises** | Test `ArmRobot.set_joint` for out-of-range. Test sensor for bad reading. |
| 1:30–1:50 | **Exercise** | Exercise 4.1 (Write the Tests First — TDD). Walk through first test, then let her write the rest. |
| 1:50–2:00 | **Wrap-up** | Show `uv run pytest --cov`. Discuss: what is a good coverage target for robot code? (Aim: ≥ 80%) |

### Tutor Notes
- Introduce TDD gently: write one failing test, implement to make it pass, repeat. Don't make it religious — explain it as a design tool.
- Parametrised tests are very natural for sensor thresholds: test all boundary conditions (just below, at, just above) with one test function.
- If time permits: show `ruff check .` and `ruff format .` — teach her to run these before every commit.

---

## Class 8 — Production Robot Code: CLI & Packaging
**Duration:** 2 hours | **University link:** Software deployment, robot tooling

### Learning Objectives
- Build a `typer` CLI for robot simulation with multiple commands
- Use `rich` for professional telemetry output tables
- Package the project with `pyproject.toml`
- Understand the path to building a real robot software package

### Session Plan

| Time | Activity | Notes |
|------|----------|-------|
| 0:00–0:15 | **Motivation: from script to tool** | "Right now, we run `uv run python robot_sim.py`. A real robot tool should be `robot-sim spawn R-001`. That's CLI packaging." |
| 0:15–0:35 | **typer: spawn + status** | Build `spawn` and `status` commands. Show `Argument` vs `Option`. |
| 0:35–0:55 | **rich tables for telemetry** | Build the fleet status table with coloured battery levels. Show why this matters: real robotics dashboards. |
| 0:55–1:10 | **navigate command** | Build `navigate` — load, simulate, save back. Complete the CRUD loop. |
| 1:10–1:30 | **pyproject.toml** | Walk through the full `pyproject.toml`. Show `[project.scripts]` making it a real command. Run `uv sync`. |
| 1:30–1:50 | **Capstone intro** | Introduce the Autonomous Maze Navigator project. Walk through requirements and rubric. Let her choose: implement the maze grid, or the pathfinder first? |
| 1:50–2:00 | **Course celebration** | Review the full journey. Show the Python ↔ Robotics concept map. Point to next steps: numpy, matplotlib for plotting paths; pygame for visualisation; rclpy for actual ROS. |

### Tutor Notes
- By this class, the student should be able to see clearly how the Robot class she built connects directly to how ROS nodes work. Make this explicit.
- The `[project.scripts]` entry in `pyproject.toml` is genuinely exciting — it's the moment Python code becomes a real command-line tool. Let her run `robot-sim` from anywhere in the terminal.
- **Next steps roadmap** (share with her):
  1. `numpy` + `matplotlib` — plot robot paths and lidar scans
  2. `pygame` — visualise the robot moving in a 2D grid
  3. `rclpy` — the actual Python API for ROS2
  4. Hardware integration (Raspberry Pi + GPIO for real sensors)

---

## Session Assessment Rubric (Informal — For Tutor Use)

| Skill | Not Yet | Developing | Confident |
|-------|---------|------------|-----------|
| Chooses the right type for robot data | | | |
| Builds and navigates a control loop | | | |
| Selects list/dict/tuple/set appropriately | | | |
| Writes functions with type hints | | | |
| Builds a class to model a robot | | | |
| Uses try/except to handle sensor faults | | | |
| Writes a passing pytest suite | | | |
| Packages a CLI tool with typer | | | |

---

*Python for Robotics — Lesson Plans | Deejoft Coding School*
*Specialized companion track for university robotics students*
