# 📄 Python for Robotics — Student Handouts (All 8 Classes)
### Reference sheets to keep on your desk during class

---

# Class 1 — Setup, Variables & Types in Robotics

## A. uv Setup (same as standard track)

```bash
uv init robot-sim
cd robot-sim
uv run python         # Python 3.13 REPL
uv add httpx          # Add a package
uv add --dev pytest   # Dev dependency
uv run pytest         # Run tests
```

## B. Robotics Data Types Cheat Sheet

```python
# Every robot attribute maps to a Python type:
robot_id:      str   = "R-001"         # Identifier
encoder_ticks: int   = 15_320          # Integer sensor count
battery_pct:   float = 87.5            # Decimal measurement
is_active:     bool  = True            # Flag
last_error:    str | None = None       # Optional — no error yet
```

| Robot Concept | Python Type | Example |
|---------------|-------------|---------|
| Robot name / ID | `str` | `"Rover-7"` |
| Encoder count | `int` | `15_320` |
| Distance (m) | `float` | `0.42` |
| Active flag | `bool` | `True` |
| No GPS fix yet | `None` | `gps_lat = None` |
| Position (x, y) | `tuple[float, float]` | `(3.14, 2.71)` |
| Waypoint list | `list[tuple]` | `[(0,0), (1,0)]` |
| Sensor config | `dict` | `{"pin": 4, "range": 400}` |

## C. f-strings for Telemetry

```python
robot_id  = "R-001"
battery   = 87.5
distance  = 0.423
heading   = 92.3

print(f"{robot_id} | battery={battery:.1f}% | dist={distance:.3f}m | hdg={heading:.1f}°")
# R-001 | battery=87.5% | dist=0.423m | hdg=92.3°

# Debug shorthand (tuning sensor values)
reading = 45.2
print(f"{reading = }")    # reading = 45.2
```

> ✏️ **Fill in:** Write an f-string that prints `"Speed: 1.250 m/s"` given `speed = 1.25`:
>
> `f"Speed: {speed:_______} m/s"`

## D. None — Uninitialised Sensors

```python
gps_lat = None          # GPS not ready yet
gps_lat is None         # True  — always use 'is', never ==
gps_lat is not None     # False

# Safe guard before using a reading
if gps_lat is not None:
    print(f"Lat: {gps_lat}")
else:
    print("Waiting for GPS fix...")
```

---

# Class 2 — Control Flow: Robot Decisions

## A. Robot State Machine with match/case

```python
state = "OBSTACLE"

match state:
    case "IDLE":    print("Waiting...")
    case "MOVING":  print("Navigating to waypoint")
    case "OBSTACLE":print("Obstacle! Stopping.")
    case "CHARGING":print("Charging — do not disturb")
    case "ERROR":   print("Fault — needs attention")
    case _:         print(f"Unknown state: {state}")
```

## B. Sensor Threshold Decisions

```python
distance_cm = 18.5

if distance_cm < 10:
    action = "EMERGENCY_STOP"
elif distance_cm < 25:
    action = "SLOW_DOWN"
elif distance_cm < 50:
    action = "CAUTION"
else:
    action = "FULL_SPEED"
```

## C. The Control Loop (most important while pattern)

```python
running = True
while running:
    # 1. Read sensors
    # 2. Decide action
    # 3. Execute action
    # 4. Check exit conditions
    if battery < 5 or obstacle_detected:
        running = False
```

## D. Iterating Waypoints

```python
waypoints = [(0.0, 0.0), (1.5, 0.0), (1.5, 2.0)]

for index, (x, y) in enumerate(waypoints, start=1):
    print(f"WP {index}: move to ({x:.1f}, {y:.1f})")
```

> ✏️ **Fill in:** Write a list comprehension that gives only waypoints where `x > 0`:
>
> `positive_x = [_______________ for (x, y) in waypoints if _______________]`

---

# Class 3 — Data Structures: Sensor Arrays & Maps

## A. Lists — Sensor Reading Arrays

```python
lidar = [2.10, 1.95, 0.83, 0.41, 0.39]  # distances in metres

min(lidar)                     # Closest obstacle
max(lidar)                     # Farthest point
sum(lidar) / len(lidar)        # Average
[d for d in lidar if d < 0.5]  # Obstacles only
lidar.index(min(lidar))        # Index of nearest
lidar[::-1]                    # Reversed scan
```

## B. Dictionaries — Sensor Registry

```python
sensor_config = {
    "front_us": {"type": "ultrasonic", "max_range": 400},
    "lidar":    {"type": "lidar",      "port": "/dev/ttyUSB0"},
}

# Access
sensor_config["front_us"]["max_range"]   # 400
sensor_config.get("gps", "not fitted")  # Safe fallback

# Iterate
for name, cfg in sensor_config.items():
    print(f"{name}: {cfg['type']}")
```

## C. Tuples — Fixed Positions (don't change!)

```python
start_pos: tuple[float, float] = (0.0, 0.0)   # Immutable
goal_pos:  tuple[float, float] = (5.0, 3.0)

x, y = goal_pos   # Unpack

# Named tuple for readability
from collections import namedtuple
Pose = namedtuple("Pose", ["x", "y", "theta"])
pose = Pose(x=1.0, y=2.0, theta=0.0)
print(pose.theta)   # 0.0
```

## D. Sets — Unique IDs & Zones

```python
active = {"R1", "R3", "R5"}
charging = {"R2", "R4"}

"R1" in active          # True  (O(1) lookup)
active | charging       # {"R1", "R2", "R3", "R4", "R5"}  union
active & charging       # set()  intersection (no overlap)
active - charging       # {"R1", "R3", "R5"}  difference

# Remove duplicates from sensor zone log
zones = ["B2", "B3", "B2", "C1", "B3"]
unique = list(set(zones))   # ['B2', 'B3', 'C1']
```

---

# Class 4 — Functions & File I/O: Telemetry Logging

## A. Functions — Robot Behaviours

```python
import math

def euclidean_distance(a: tuple[float, float],
                       b: tuple[float, float]) -> float:
    return math.sqrt((b[0]-a[0])**2 + (b[1]-a[1])**2)

# Keyword-only: prevents argument order errors
def drive(*, speed: float, direction: float, duration: float) -> dict:
    return {"speed": speed, "direction": direction % 360,
            "distance": speed * duration}

cmd = drive(speed=0.8, direction=45.0, duration=3.0)  # ✅
# drive(0.8, 45.0, 3.0) would raise TypeError              ❌
```

## B. File I/O with pathlib

```python
from pathlib import Path

log_dir = Path("telemetry")
log_dir.mkdir(exist_ok=True)

log_file = log_dir / "session.csv"    # / builds paths safely
log_file.write_text("data", encoding="utf-8")
content = log_file.read_text(encoding="utf-8")
log_file.exists()   # True
```

## C. CSV Telemetry

```python
import csv

FIELDS = ["x", "y", "heading", "battery", "state"]

# Write
with log_file.open("w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=FIELDS)
    writer.writeheader()
    writer.writerows(entries)   # entries = list of dicts

# Read
with log_file.open("r", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))
```

## D. JSON Robot Config

```python
import json

config_file = Path("robot_config.json")

config = json.loads(config_file.read_text(encoding="utf-8"))
config_file.write_text(json.dumps(config, indent=2))
```

> ✏️ **Fill in:** Write a function `total_distance(entries)` that computes the sum of step-by-step distances from a list of `{'x': ..., 'y': ...}` dicts.

---

# Class 5 — OOP: Modelling a Robot

## A. Class Structure Reference

```python
class Robot:
    fleet: ClassVar[list["Robot"]] = []    # class variable

    def __init__(self, robot_id: str) -> None:
        self.robot_id = robot_id           # instance variable
        Robot.fleet.append(self)

    def __str__(self)  -> str: ...         # print(robot)
    def __repr__(self) -> str: ...         # Robot in REPL
    def __len__(self)  -> int: ...         # len(robot)

    @property
    def battery_ok(self) -> bool:          # robot.battery_ok
        return self.battery > 20

    @classmethod
    def get_all(cls) -> list["Robot"]:     # Robot.get_all()
        return cls.fleet

    @staticmethod
    def is_valid_id(rid: str) -> bool:     # Robot.is_valid_id("R1")
        return rid.startswith("R")
```

## B. When to Use Each Method Type

| Method Type | Use When | How to Call |
|-------------|----------|-------------|
| `def method(self)` | Needs instance data | `robot.move()` |
| `@property` | Computed attribute, no args | `robot.battery_ok` |
| `@classmethod` | Alternative constructor or fleet-wide | `Robot.find("R1")` |
| `@staticmethod` | Pure utility, no self/cls needed | `Robot.is_valid("R1")` |

## C. Inheritance

```python
class DroneRobot(Robot):
    def __init__(self, robot_id: str) -> None:
        super().__init__(robot_id)    # Always call super().__init__()
        self.altitude = 0.0

    def __str__(self) -> str:
        return f"{super().__str__()} | alt={self.altitude:.1f}m"
```

---

# Class 6 — Error Handling: Fault Tolerance

## A. Custom Exception Hierarchy

```python
class RobotError(Exception): pass
class SensorFailureError(RobotError): ...
class BatteryDepletedError(RobotError): ...
class ObstacleCollisionError(RobotError): ...
```

## B. try/except Pattern for Sensor Reads

```python
def safe_read(sensor_id: str, retries: int = 3) -> float | None:
    for attempt in range(1, retries + 1):
        try:
            return read_sensor(sensor_id)
        except SensorFailureError as e:
            print(f"Attempt {attempt}/{retries}: {e}")
    return None   # All retries failed — robot continues without reading
```

## C. Full Mission Exception Pattern

```python
try:
    execute_mission(robot, waypoints)

except BatteryDepletedError:
    robot.state = "CHARGING"

except ObstacleCollisionError as e:
    robot.state = "OBSTACLE"
    robot.rotate(90)

except SensorFailureError:
    robot.state = "ERROR"
    raise   # Escalate — needs manual fix

finally:
    robot.save_log()   # Always runs
```

## D. Exception Decision: Recover or Escalate?

| Exception | Action |
|-----------|--------|
| Sensor timeout | Retry → return None → continue |
| Low battery | Graceful return to dock |
| Collision imminent | Stop → rotate → reroute |
| Hardware failure (fatal) | Halt → escalate → log |

---

# Class 7 — Type Hints & Testing

## A. Type Hints Quick Reference

```python
# Modern syntax (Python 3.10+)
def foo(x: int | None) -> str | None: ...   # Union with |

# Collections
def bar(items: list[float]) -> dict[str, float]: ...

# TypedDict — type-safe dict
from typing import TypedDict
class RobotConfig(TypedDict):
    id:        str
    max_speed: float
```

## B. pytest Patterns for Robot Code

```python
import pytest

class TestRobot:
    @pytest.fixture
    def robot(self):
        return Robot("TEST-01")

    def test_initial_position(self, robot):
        assert robot.position == (0.0, 0.0)

    def test_move_drains_battery(self, robot):
        robot.move_to(10.0, 0.0)
        assert robot.battery < 100.0

    def test_invalid_joint_raises(self):
        arm = ArmRobot("ARM-01")
        with pytest.raises(ValueError):
            arm.set_joint(99, 45.0)

    @pytest.mark.parametrize("battery,expected", [
        (90.0, False), (15.0, True), (20.0, False)
    ])
    def test_low_battery_flag(self, robot, battery, expected):
        robot.battery = battery
        assert robot.is_low_battery == expected
```

```bash
uv run pytest           # Run all tests
uv run pytest -v        # Verbose
uv run pytest --cov     # Coverage report
```

---

# Class 8 — CLI & Packaging

## A. typer CLI Pattern

```python
import typer
app = typer.Typer()

@app.command()
def spawn(robot_id: str,
          speed: float = typer.Option(1.0, "--speed", "-s")):
    """Spawn a new robot."""
    ...

@app.command()
def status(): ...

if __name__ == "__main__":
    app()
```

```bash
uv run python robot_cli.py spawn R-001 --speed 1.5
uv run python robot_cli.py status
```

## B. pyproject.toml for Robot Project

```toml
[project]
name = "robot-sim"
version = "1.0.0"
requires-python = ">=3.12"
dependencies = ["typer>=0.12", "rich>=13.0"]

[project.scripts]
robot-sim = "robot_cli:app"    # Terminal command

[tool.uv]
dev-dependencies = ["pytest>=8.0", "pytest-cov>=5.0", "ruff>=0.5"]
```

---

# Quick Reference — Robotics Formulas in Python

```python
import math

# Euclidean distance between two 2D points
def dist(a, b):
    return math.sqrt((b[0]-a[0])**2 + (b[1]-a[1])**2)

# Heading from point A to point B (degrees, North-up)
def heading(a, b):
    return (math.degrees(math.atan2(b[0]-a[0], b[1]-a[1])) + 360) % 360

# Normalise any angle to [0, 360)
def norm_angle(deg):
    return deg % 360

# Convert encoder ticks to distance
def ticks_to_m(ticks, circumference=0.314, resolution=360):
    return (ticks / resolution) * circumference

# Moving average filter (noise reduction)
def moving_avg(readings, window=3):
    return [sum(readings[i:i+window])/window
            for i in range(len(readings)-window+1)]
```

---

*Python for Robotics — Deejoft Coding School | Companion Track*
*All concepts map 1:1 to the standard Python curriculum*
