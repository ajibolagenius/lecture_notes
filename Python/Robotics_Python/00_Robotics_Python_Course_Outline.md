# 🤖 Python for Robotics — Companion Curriculum
### Specialized Track | Mapped to University Robotics Course
**Duration:** 4 Weeks · 8 Classes · ~2 hours per class
**Level:** Beginner–Intermediate
**Context:** Every concept is taught through robotics simulations, sensor data, and autonomous control systems

---

> **Dear Tutor,**
> This companion curriculum runs *in parallel* with the standard Python track. The concepts are identical — variables, control flow, OOP, file I/O, testing — but every example, exercise, and project is grounded in robotics. The student's university course will reinforce the programming theory; this track makes her Python sessions feel immediately relevant to what she's doing in lectures.
>
> No physical hardware is required. All robot simulations are pure Python. Where libraries are introduced (like `numpy` for sensor math), they are introduced gently — the focus is always on Python fundamentals, not the library.
>
> The student's robotics course likely covers: kinematics, sensors (lidar, ultrasonic, IMU), control loops (PID), state machines, and ROS (Robot Operating System). This curriculum surfaces those concepts in Python context at each step.

---

## 🗺️ Course Map

| Week | Classes | Robotics Theme | Python Concepts | Deliverable |
|------|---------|---------------|-----------------|-------------|
| Week 1 | 1–2 | Robot Identity & Decision-Making | Variables, Types, Control Flow | CLI robot status monitor |
| Week 2 | 3–4 | Navigation & Sensor Processing | Data Structures, Functions, File I/O | Sensor data logger with path recorder |
| Week 3 | 5–6 | Robot as an Object & Fault Tolerance | OOP, Error Handling, APIs | Simulated robot fleet management system |
| Week 4 | 7–8 | Production-Ready Robot Code | Type Hints, Testing, Packaging | Packaged autonomous robot simulator CLI |

---

## 🎯 Robotics–Python Concept Map

```
ROBOTICS CONCEPT              ←→   PYTHON CONCEPT
─────────────────────────────────────────────────────
Robot state (position, speed) ←→   Variables & Types
Sensor threshold checks        ←→   if/elif/else
Control loops (PID loop)       ←→   while loops
Waypoint sequences             ←→   Lists & Iteration
Sensor configuration           ←→   Dictionaries
Joint angles (fixed)           ←→   Tuples
Unique active robot IDs        ←→   Sets
Robot behaviour (move, turn)   ←→   Functions
Robot as a software model      ←→   Classes & OOP
Sensor hardware failure        ←→   Exception Handling
Telemetry logging              ←→   File I/O (CSV/JSON)
Robot specification file       ←→   JSON config
Behaviour unit testing         ←→   pytest
Robot command interface        ←→   CLI with typer
```

---

## 📅 Week 1 — Robot Identity & Decision-Making

### Class 1 — Setup, Variables & Types in a Robotics Context

**Tutor Guidance:** Frame every data type around a real robot. A robot has a name (str), an ID number (int), a battery level (float), an active flag (bool), and sometimes a "no reading" state (None). Use the REPL to explore types interactively — have the student model her university robot before writing any logic.

#### Tooling Setup

```bash
# Same uv setup as the standard track
uv init robot-sim
cd robot-sim
uv run python   # REPL — start here for demos
```

---

#### Variables and Data Types — Robot Context

```python
# ── Modelling a Robot ──
robot_name:    str   = "Rover-7"
robot_id:      int   = 42
battery_level: float = 87.5          # percentage
is_active:     bool  = True
last_error:    str | None = None     # None = no error recorded yet

# f-strings for telemetry output
print(f"Robot  : {robot_name} (ID #{robot_id})")
print(f"Battery: {battery_level:.1f}%")
print(f"Status : {'ACTIVE' if is_active else 'INACTIVE'}")
print(f"Error  : {last_error if last_error is not None else 'None'}")

# Debug shorthand — very useful when tuning sensor values
speed = 1.25   # m/s
print(f"{speed = }")        # speed = 1.25
print(f"{speed * 3.6 = }")  # speed * 3.6 = 4.5  (convert m/s → km/h)

# ── Sensor Readings — numeric types ──
ultrasonic_distance: float = 0.42    # metres
lidar_angle:         int   = 270     # degrees (0–359)
encoder_ticks:       int   = 15_320  # underscore separators for readability
wheel_circumference: float = 0.314_159  # metres

# Useful calculations
distance_m = (encoder_ticks / 360) * wheel_circumference
print(f"Distance travelled: {distance_m:.3f} m")

# Integer division and modulo in robotics
full_rotations = encoder_ticks // 360   # How many full wheel rotations?
partial_ticks  = encoder_ticks %  360   # Remaining partial rotation
print(f"{full_rotations} full rotations + {partial_ticks} ticks")

# ── None in robotics — "no reading yet" ──
gps_lat:  float | None = None   # GPS not yet initialised
gps_lon:  float | None = None

if gps_lat is None:
    print("⚠️  GPS not ready — waiting for fix...")
```

#### String Methods — Telemetry Messages

```python
# Raw telemetry often comes in as dirty strings
raw_message = "  ERROR: obstacle_detected at sector_B  "

# Clean and parse
clean  = raw_message.strip()
parts  = clean.split(": ", maxsplit=1)   # ['ERROR', 'obstacle_detected at sector_B']
level  = parts[0]                        # 'ERROR'
detail = parts[1]                        # 'obstacle_detected at sector_B'

# Log formatting
def format_log(level: str, message: str) -> str:
    import datetime
    ts = datetime.datetime.now().strftime("%H:%M:%S.%f")[:-3]
    return f"[{ts}] [{level:<7}] {message}"

print(format_log("INFO",    "Robot initialised"))
print(format_log("WARNING", "Battery below 20%"))
print(format_log("ERROR",   "Ultrasonic timeout"))
```

---

### Class 2 — Control Flow: Robot Decision-Making

**Tutor Guidance:** Control flow is the *brain* of any robot. A robot senses its environment, evaluates a condition, and chooses an action. This is literally if/elif/else. The PID control loop that the student covers in her university course is a while loop. Connect these explicitly.

```python
# ── State Machine Pattern — fundamental in robotics ──
# Robots are almost always modelled as finite state machines (FSM)

state = "IDLE"   # Possible states: IDLE, MOVING, OBSTACLE, CHARGING, ERROR

# match/case — perfect for robot state machines (Python 3.10+)
match state:
    case "IDLE":
        print("🤖 Waiting for command...")
    case "MOVING":
        print("➡️  Moving to waypoint")
    case "OBSTACLE":
        print("🛑 Obstacle detected — stopping")
    case "CHARGING":
        print("🔋 Charging — do not disturb")
    case "ERROR":
        print("❌ Fault — require manual intervention")
    case _:
        print(f"⚠️  Unknown state: {state}")

# ── Sensor threshold decision chain ──
distance_cm = 18.5   # ultrasonic reading in cm

if distance_cm < 10:
    action = "STOP_IMMEDIATELY"
elif distance_cm < 25:
    action = "SLOW_DOWN"
elif distance_cm < 50:
    action = "CAUTION"
else:
    action = "FULL_SPEED"

print(f"Distance {distance_cm}cm → Action: {action}")

# ── The Control Loop — while in robotics ──
# A robot's main loop runs continuously until told to stop.
# This is the most important while loop pattern in robotics.

import time

battery       = 100.0
obstacle_dist = 150.0   # cm — simulated
running       = True

MAX_CYCLES = 10   # Limit for simulation (real robots run indefinitely)
cycle      = 0

while running and cycle < MAX_CYCLES:
    cycle += 1

    # Simulate sensor changes
    battery       -= 2.5
    obstacle_dist -= 12.0

    print(f"[Cycle {cycle:02d}] Battery: {battery:.1f}% | Obstacle: {obstacle_dist:.1f}cm")

    # Safety checks — a real robot would actuate motors here
    if obstacle_dist < 20:
        print("🛑 STOP — obstacle too close")
        running = False
    elif battery < 15:
        print("🔋 LOW BATTERY — returning to dock")
        running = False
else:
    if not running:
        print("Loop exited by safety condition")
    else:
        print("Simulation cycle limit reached")

# ── Iterating waypoints ──
waypoints = [
    (0.0, 0.0),
    (1.5, 0.0),
    (1.5, 2.0),
    (0.0, 2.0),
    (0.0, 0.0),  # Return to origin
]

for index, (x, y) in enumerate(waypoints):
    is_last = index == len(waypoints) - 1
    tag     = "HOME" if is_last else f"WP-{index}"
    print(f"  → Navigating to {tag}: ({x:.1f}, {y:.1f})")

# List comprehension — filter only waypoints in positive quadrant
safe_wps = [(x, y) for (x, y) in waypoints if x >= 0 and y >= 0]
```

---

## 📅 Week 2 — Navigation & Sensor Processing

### Class 3 — Data Structures: Sensor Arrays & Maps

```python
# ── Lists — ordered sequences of sensor readings ──
lidar_scan: list[float] = [
    2.10, 1.95, 0.83, 0.41, 0.39, 0.44, 1.20, 2.05, 2.33, 2.41
]  # 10 distance readings from a 360° lidar, 36° apart

# Useful list operations on sensor data
min_dist  = min(lidar_scan)            # Closest object
max_dist  = max(lidar_scan)            # Farthest object
avg_dist  = sum(lidar_scan) / len(lidar_scan)
obstacles = [d for d in lidar_scan if d < 0.50]   # Readings under 50cm

# Index of the closest obstacle (which sector?)
min_idx   = lidar_scan.index(min(lidar_scan))
sector_angle = min_idx * 36  # Each sector is 36° apart
print(f"Nearest obstacle at ~{sector_angle}° — {min_dist:.2f}m away")

# Rolling buffer — keep only last N readings (sliding window)
MAX_BUFFER = 5
sensor_buffer: list[float] = []

for reading in [0.90, 0.85, 0.80, 0.76, 0.72, 0.68, 0.65]:
    sensor_buffer.append(reading)
    if len(sensor_buffer) > MAX_BUFFER:
        sensor_buffer.pop(0)   # Remove oldest
    smoothed = sum(sensor_buffer) / len(sensor_buffer)
    print(f"Buffer: {sensor_buffer} → Smoothed: {smoothed:.3f}")


# ── Dictionaries — robot configuration and sensor registry ──
robot_config: dict = {
    "id":         "R2D2-7",
    "type":       "differential_drive",
    "max_speed":  1.5,          # m/s
    "wheel_base": 0.30,         # metres between wheels
    "sensors": {
        "ultrasonic": {"pin": 4,  "max_range": 400},  # cm
        "lidar":      {"port": "/dev/ttyUSB0", "frequency": 10},
        "imu":        {"i2c_address": 0x68},
    },
    "status":     "READY",
}

# Nested access
imu_address = robot_config["sensors"]["imu"]["i2c_address"]
print(f"IMU I²C address: 0x{imu_address:02X}")

# Safe access with .get()
heading = robot_config.get("heading", 0.0)   # Default 0° if not set

# Sensor registry — track all active sensors
sensor_readings: dict[str, float | None] = {
    "front_us": 45.2,
    "left_us":  None,    # Sensor not responding
    "right_us": 120.0,
    "imu_yaw":  92.3,
}

# Find all failed sensors
failed = [name for name, val in sensor_readings.items() if val is None]
print(f"Failed sensors: {failed}")


# ── Tuples — immutable coordinate pairs and joint angles ──
# Tuples are ideal for positions: they should NOT be accidentally modified
current_pos: tuple[float, float] = (3.14, 2.71)
goal_pos:    tuple[float, float] = (5.00, 5.00)

# Euclidean distance calculation
import math
dx  = goal_pos[0] - current_pos[0]
dy  = goal_pos[1] - current_pos[1]
dist = math.sqrt(dx**2 + dy**2)
print(f"Distance to goal: {dist:.3f}m")

# Named tuple — self-documenting position
from collections import namedtuple
Pose = namedtuple("Pose", ["x", "y", "theta"])   # x, y in m; theta in radians
start = Pose(x=0.0, y=0.0, theta=0.0)
goal  = Pose(x=3.0, y=4.0, theta=math.pi / 2)
print(f"Start: {start}")
print(f"Goal heading: {math.degrees(goal.theta):.1f}°")


# ── Sets — unique robot IDs, active zones ──
all_robot_ids:    set[str] = {"R1", "R2", "R3", "R4", "R5"}
active_robot_ids: set[str] = {"R1", "R3", "R5"}
charging_ids:     set[str] = {"R2", "R4"}

idle_ids = all_robot_ids - active_robot_ids - charging_ids
print(f"Idle robots: {idle_ids}")

# Unique obstacle zones detected (remove duplicates from sensor sweeps)
detected_zones = ["B2", "B3", "B2", "C1", "B3", "C1", "C2"]
unique_zones   = list(set(detected_zones))
print(f"Unique obstacle zones: {sorted(unique_zones)}")
```

---

### Class 4 — Functions & File I/O: Telemetry Logging

```python
from pathlib import Path
from datetime import datetime
import csv, json, math

# ── Robot movement functions ──

def calculate_heading(from_pos: tuple[float, float],
                      to_pos:   tuple[float, float]) -> float:
    """Return heading in degrees (0=North, 90=East) from one pose to another."""
    dx = to_pos[0] - from_pos[0]
    dy = to_pos[1] - from_pos[1]
    angle_rad = math.atan2(dx, dy)   # Note: atan2(x, y) for North-up convention
    return (math.degrees(angle_rad) + 360) % 360

def euclidean_distance(a: tuple[float, float],
                       b: tuple[float, float]) -> float:
    """Euclidean distance between two 2D points."""
    return math.sqrt((b[0] - a[0])**2 + (b[1] - a[1])**2)

def normalise_angle(angle_deg: float) -> float:
    """Normalise any angle to [0, 360)."""
    return angle_deg % 360

def smooth_readings(readings: list[float], window: int = 3) -> list[float]:
    """Moving average filter for sensor noise reduction."""
    if len(readings) < window:
        return readings
    return [
        sum(readings[i:i + window]) / window
        for i in range(len(readings) - window + 1)
    ]

# ── Keyword-only arguments — prevent argument order mistakes ──
def drive(*, speed: float, direction: float, duration: float) -> dict:
    """
    Simulate a robot drive command.
    All arguments keyword-only to prevent (0.5, 90.0, 2.0) order confusion.
    """
    distance = speed * duration
    return {
        "speed":     speed,
        "direction": normalise_angle(direction),
        "duration":  duration,
        "distance":  round(distance, 4),
    }

cmd = drive(speed=0.8, direction=45.0, duration=3.0)
print(cmd)


# ── Telemetry CSV Logger ──
LOG_DIR  = Path("telemetry")
LOG_DIR.mkdir(exist_ok=True)
LOG_FILE = LOG_DIR / f"session_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"

TELEMETRY_FIELDS = ["timestamp", "x", "y", "heading", "speed", "battery", "state"]

def log_telemetry(entries: list[dict]) -> None:
    with LOG_FILE.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=TELEMETRY_FIELDS)
        writer.writeheader()
        writer.writerows(entries)
    print(f"✅ Logged {len(entries)} entries → {LOG_FILE}")

def read_telemetry() -> list[dict]:
    if not LOG_FILE.exists():
        return []
    with LOG_FILE.open("r", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def summarise_session(entries: list[dict]) -> dict:
    if not entries:
        return {}
    speeds    = [float(e["speed"])   for e in entries]
    batteries = [float(e["battery"]) for e in entries]
    return {
        "duration_s":     len(entries),
        "avg_speed":      round(sum(speeds)    / len(speeds),    3),
        "battery_used":   round(batteries[0]   - batteries[-1],  1),
        "final_x":        entries[-1]["x"],
        "final_y":        entries[-1]["y"],
    }


# ── Robot config (JSON) ──
CONFIG_FILE = Path("robot_config.json")

def load_robot_config() -> dict:
    if not CONFIG_FILE.exists():
        default = {
            "robot_id":    "R-001",
            "max_speed":   1.5,
            "wheel_base":  0.30,
            "sensor_rate": 10,
        }
        CONFIG_FILE.write_text(json.dumps(default, indent=2))
        return default
    return json.loads(CONFIG_FILE.read_text(encoding="utf-8"))

def save_robot_config(config: dict) -> None:
    CONFIG_FILE.write_text(json.dumps(config, indent=2, ensure_ascii=False))
```

---

## 📅 Week 3 — Robot as an Object & Fault Tolerance

### Class 5 — OOP: Modelling a Robot

```python
from dataclasses import dataclass, field
from datetime import datetime
from typing import ClassVar
import math

class Robot:
    """
    Software model of a differential-drive mobile robot.
    This mirrors how ROS (Robot Operating System) models robots
    as classes with state, sensors, and behaviours.
    """

    fleet: ClassVar[list["Robot"]] = []  # Class-level fleet registry

    def __init__(self, robot_id: str, max_speed: float = 1.0) -> None:
        self.robot_id:   str   = robot_id
        self.max_speed:  float = max_speed   # m/s

        # State
        self.x:       float = 0.0   # position in metres
        self.y:       float = 0.0
        self.heading: float = 0.0   # degrees, 0 = North
        self.speed:   float = 0.0   # current speed m/s
        self.battery: float = 100.0 # percentage
        self.state:   str   = "IDLE"

        # History
        self.path:    list[tuple[float, float]] = [(0.0, 0.0)]
        self.log:     list[str] = []

        Robot.fleet.append(self)

    # ── Dunder methods ──
    def __str__(self)  -> str:
        return f"Robot({self.robot_id}) at ({self.x:.2f}, {self.y:.2f}) | {self.state}"
    def __repr__(self) -> str:
        return f"Robot(robot_id={self.robot_id!r}, max_speed={self.max_speed})"
    def __len__(self)  -> int:
        return len(self.path)  # Number of positions visited

    # ── Properties ──
    @property
    def position(self) -> tuple[float, float]:
        return (self.x, self.y)

    @property
    def distance_from_origin(self) -> float:
        return math.sqrt(self.x**2 + self.y**2)

    @property
    def is_low_battery(self) -> bool:
        return self.battery < 20.0

    @property
    def total_distance(self) -> float:
        """Total path length travelled."""
        if len(self.path) < 2:
            return 0.0
        return sum(
            math.sqrt((b[0]-a[0])**2 + (b[1]-a[1])**2)
            for a, b in zip(self.path, self.path[1:])
        )

    # ── Class methods ──
    @classmethod
    def get_active_robots(cls) -> list["Robot"]:
        return [r for r in cls.fleet if r.state != "CHARGING"]

    @classmethod
    def find_by_id(cls, robot_id: str) -> "Robot | None":
        return next((r for r in cls.fleet if r.robot_id == robot_id), None)

    # ── Static methods ──
    @staticmethod
    def angle_to_target(from_pos: tuple[float, float],
                        to_pos:   tuple[float, float]) -> float:
        dx, dy = to_pos[0] - from_pos[0], to_pos[1] - from_pos[1]
        return (math.degrees(math.atan2(dx, dy)) + 360) % 360

    # ── Instance methods ──
    def move_to(self, x: float, y: float) -> None:
        """Move robot to absolute coordinates. Drains battery."""
        dist = math.sqrt((x - self.x)**2 + (y - self.y)**2)
        self.heading = self.angle_to_target(self.position, (x, y))
        self.x, self.y = x, y
        self.battery  -= dist * 0.5  # 0.5% per metre
        self.battery   = max(0.0, self.battery)
        self.state     = "IDLE" if self.battery > 0 else "DEAD"
        self.path.append((x, y))
        self._log(f"Moved to ({x:.2f}, {y:.2f}) | Δdist={dist:.2f}m | Battery={self.battery:.1f}%")

    def rotate(self, degrees: float) -> None:
        """Rotate robot by relative degrees (+ve = clockwise)."""
        self.heading = (self.heading + degrees) % 360
        self._log(f"Rotated {degrees:+.1f}° → heading {self.heading:.1f}°")

    def run_waypoints(self, waypoints: list[tuple[float, float]]) -> None:
        """Navigate through a list of (x, y) waypoints."""
        self.state = "MOVING"
        for i, wp in enumerate(waypoints):
            if self.is_low_battery:
                self._log("⚠️  Low battery — aborting mission")
                self.state = "CHARGING"
                return
            self._log(f"--- Waypoint {i+1}/{len(waypoints)}: {wp} ---")
            self.move_to(*wp)
        self.state = "IDLE"

    def status_report(self) -> str:
        lines = [
            "=" * 45,
            f"  Robot ID  : {self.robot_id}",
            f"  Position  : ({self.x:.2f}m, {self.y:.2f}m)",
            f"  Heading   : {self.heading:.1f}°",
            f"  Battery   : {self.battery:.1f}%{'  ⚠️ LOW' if self.is_low_battery else ''}",
            f"  State     : {self.state}",
            f"  Waypoints : {len(self.path)}",
            f"  Total Dist: {self.total_distance:.2f}m",
            "=" * 45,
        ]
        return "\n".join(lines)

    def _log(self, message: str) -> None:
        ts  = datetime.now().strftime("%H:%M:%S")
        entry = f"[{ts}] [{self.robot_id}] {message}"
        self.log.append(entry)
        print(entry)


# ── Inheritance: Specialised Robot Types ──
class ArmRobot(Robot):
    """Industrial arm robot — adds joint angle management."""

    def __init__(self, robot_id: str, num_joints: int = 6) -> None:
        super().__init__(robot_id, max_speed=0.5)
        self.num_joints  = num_joints
        self.joint_angles: list[float] = [0.0] * num_joints

    def set_joint(self, joint: int, angle: float) -> None:
        if not (0 <= joint < self.num_joints):
            raise ValueError(f"Joint {joint} out of range (0–{self.num_joints - 1})")
        if not (-180 <= angle <= 180):
            raise ValueError(f"Angle {angle}° out of safe range (±180°)")
        self.joint_angles[joint] = angle
        self._log(f"Joint {joint} → {angle:.1f}°")

    def __str__(self) -> str:
        return f"{super().__str__()} | Joints: {self.joint_angles}"


# ── Dataclass: Sensor ──
@dataclass
class Sensor:
    name:         str
    sensor_type:  str          # 'ultrasonic', 'lidar', 'imu', 'camera'
    max_range:    float        # metres (or degrees for IMU)
    sample_rate:  int = 10     # Hz
    is_active:    bool = True
    readings:     list[float] = field(default_factory=list)

    def add_reading(self, value: float) -> None:
        if not (0 <= value <= self.max_range):
            raise ValueError(f"{self.name}: reading {value} out of range [0, {self.max_range}]")
        self.readings.append(value)

    @property
    def latest(self) -> float | None:
        return self.readings[-1] if self.readings else None

    @property
    def average(self) -> float | None:
        return sum(self.readings) / len(self.readings) if self.readings else None
```

---

### Class 6 — Error Handling & Fault Tolerance

```python
# ── Custom Robot Exception Hierarchy ──

class RobotError(Exception):
    """Base class for all robot errors."""

class SensorFailureError(RobotError):
    def __init__(self, sensor_name: str, reason: str) -> None:
        super().__init__(f"Sensor '{sensor_name}' failed: {reason}")
        self.sensor_name = sensor_name

class BatteryDepletedError(RobotError):
    def __init__(self, robot_id: str, level: float) -> None:
        super().__init__(f"Robot {robot_id}: battery at {level:.1f}% — cannot proceed")
        self.level = level

class ObstacleCollisionError(RobotError):
    def __init__(self, distance_cm: float) -> None:
        super().__init__(f"Collision imminent — obstacle at {distance_cm:.1f}cm")
        self.distance_cm = distance_cm

class SafetyZoneViolationError(RobotError):
    pass


# ── Fault-tolerant sensor reading ──
import random

def read_ultrasonic(sensor_id: str) -> float:
    """Simulate reading an ultrasonic sensor (may fail)."""
    # Simulate occasional hardware timeouts
    if random.random() < 0.1:
        raise SensorFailureError(sensor_id, "timeout — no echo received")
    return round(random.uniform(5.0, 300.0), 1)

def safe_read_sensor(sensor_id: str, retries: int = 3) -> float | None:
    """Read a sensor with retry logic — a standard robotics pattern."""
    last_error = None
    for attempt in range(1, retries + 1):
        try:
            value = read_ultrasonic(sensor_id)
            if attempt > 1:
                print(f"  ↳ Recovered on attempt {attempt}")
            return value
        except SensorFailureError as e:
            last_error = e
            print(f"  ⚠️  Attempt {attempt}/{retries} failed: {e}")
    # All retries exhausted
    print(f"  ❌ Sensor {sensor_id} unavailable after {retries} attempts")
    return None  # Return None instead of crashing — robot can continue without it

def execute_mission(robot: Robot, waypoints: list[tuple[float, float]]) -> None:
    """Execute a mission with full fault handling."""
    try:
        if robot.battery < 20:
            raise BatteryDepletedError(robot.robot_id, robot.battery)

        robot.state = "MOVING"

        for wp in waypoints:
            # Check sensors before each move
            front_dist = safe_read_sensor("front_us")

            if front_dist is not None and front_dist < 15:
                raise ObstacleCollisionError(front_dist)

            robot.move_to(*wp)

            if robot.battery < 5:
                raise BatteryDepletedError(robot.robot_id, robot.battery)

    except BatteryDepletedError as e:
        robot.state = "CHARGING"
        print(f"🔋 {e} — returning to dock")

    except ObstacleCollisionError as e:
        robot.state = "OBSTACLE"
        print(f"🛑 {e}")
        robot.rotate(90)  # Attempt avoidance

    except SensorFailureError as e:
        robot.state = "ERROR"
        print(f"🔧 Fatal sensor failure: {e}")
        raise  # Escalate — this needs manual intervention

    except RobotError as e:
        robot.state = "ERROR"
        print(f"❌ Robot error: {e}")

    finally:
        # Always log the final state — even if an exception occurred
        robot._log(f"Mission ended. Final state: {robot.state}")
        print(robot.status_report())
```

---

## 📅 Week 4 — Production-Ready Robot Code

### Class 7 — Type Hints & Testing

```python
# ── Type hints in robot code ──
from typing import TypedDict, Protocol

class WaypointList(TypedDict):
    name:      str
    waypoints: list[tuple[float, float]]
    loop:      bool

class Navigable(Protocol):
    """Anything that can navigate to a position."""
    @property
    def position(self) -> tuple[float, float]: ...
    def move_to(self, x: float, y: float) -> None: ...

def plan_route(start: tuple[float, float],
               goal:  tuple[float, float],
               step:  float = 0.5) -> list[tuple[float, float]]:
    """
    Simple straight-line path planner.
    Returns a list of intermediate waypoints from start to goal.
    """
    import math
    dist  = math.sqrt((goal[0]-start[0])**2 + (goal[1]-start[1])**2)
    steps = max(1, int(dist / step))
    return [
        (
            round(start[0] + (goal[0]-start[0]) * i/steps, 3),
            round(start[1] + (goal[1]-start[1]) * i/steps, 3),
        )
        for i in range(1, steps + 1)
    ]


# ── pytest test suite for robot code ──
# tests/test_robot.py

import pytest
from robot import Robot, ArmRobot, BatteryDepletedError, SensorFailureError
import math

class TestRobot:
    @pytest.fixture
    def robot(self) -> Robot:
        r = Robot("TEST-01", max_speed=1.0)
        return r

    def test_initial_position_is_origin(self, robot):
        assert robot.position == (0.0, 0.0)

    def test_move_updates_position(self, robot):
        robot.move_to(3.0, 4.0)
        assert robot.position == (3.0, 4.0)

    def test_total_distance_after_moves(self, robot):
        robot.move_to(3.0, 0.0)  # 3m
        robot.move_to(3.0, 4.0)  # 4m
        assert abs(robot.total_distance - 7.0) < 0.01

    def test_battery_drains_on_move(self, robot):
        robot.move_to(10.0, 0.0)   # 10 metres → 5% drain
        assert robot.battery < 100.0

    def test_low_battery_flag(self, robot):
        robot.battery = 15.0
        assert robot.is_low_battery is True

    def test_arm_robot_joint_out_of_range(self):
        arm = ArmRobot("ARM-01", num_joints=6)
        with pytest.raises(ValueError):
            arm.set_joint(10, 45.0)   # Joint 10 doesn't exist

    def test_arm_robot_angle_out_of_range(self):
        arm = ArmRobot("ARM-01", num_joints=6)
        with pytest.raises(ValueError):
            arm.set_joint(0, 270.0)   # > 180°

    @pytest.mark.parametrize("x,y,expected_dist", [
        (3.0, 4.0, 5.0),   # 3-4-5 triangle
        (0.0, 5.0, 5.0),
        (0.0, 0.0, 0.0),
    ])
    def test_distance_from_origin(self, robot, x, y, expected_dist):
        robot.move_to(x, y)
        assert abs(robot.distance_from_origin - expected_dist) < 0.01


class TestPlanRoute:
    def test_route_ends_at_goal(self):
        route = plan_route((0, 0), (2, 0), step=0.5)
        assert route[-1] == (2.0, 0.0)

    def test_route_has_correct_length(self):
        route = plan_route((0, 0), (2, 0), step=0.5)
        assert len(route) == 4   # 0.5, 1.0, 1.5, 2.0
```

---

### Class 8 — CLI Robot Simulator & Packaging

```python
# robot_cli.py
# uv add typer rich

import typer
from rich.console import Console
from rich.table   import Table
from rich.live    import Live
import json, time
from pathlib import Path
from robot import Robot  # The class we built in Class 5

app     = typer.Typer(help="🤖 Robot Simulator CLI")
console = Console()

@app.command()
def spawn(robot_id: str,
          max_speed: float = typer.Option(1.0, "--speed", "-s")):
    """Spawn a new robot and save it to the fleet registry."""
    fleet = _load_fleet()
    if any(r["id"] == robot_id for r in fleet):
        console.print(f"[red]Robot '{robot_id}' already exists.[/]")
        raise typer.Exit(1)
    fleet.append({"id": robot_id, "max_speed": max_speed,
                  "x": 0.0, "y": 0.0, "battery": 100.0, "state": "IDLE"})
    _save_fleet(fleet)
    console.print(f"✅ Spawned robot [bold]{robot_id}[/] (max speed {max_speed} m/s)")

@app.command()
def status():
    """Display live status of all robots in the fleet."""
    fleet = _load_fleet()
    if not fleet:
        console.print("No robots in fleet. Use [bold]spawn[/] to add one.")
        return

    table = Table(title="🤖 Robot Fleet Status", header_style="bold cyan")
    table.add_column("ID",        style="bold")
    table.add_column("Position",  justify="center")
    table.add_column("Battery",   justify="right")
    table.add_column("State",     justify="center")

    for r in fleet:
        bat   = r["battery"]
        colour = "green" if bat > 50 else "yellow" if bat > 20 else "red"
        table.add_row(
            r["id"],
            f"({r['x']:.2f}, {r['y']:.2f})",
            f"[{colour}]{bat:.1f}%[/]",
            r["state"],
        )
    console.print(table)

@app.command()
def navigate(robot_id: str,
             x: float = typer.Option(..., "--x"),
             y: float = typer.Option(..., "--y")):
    """Send a robot to absolute coordinates."""
    fleet = _load_fleet()
    entry = next((r for r in fleet if r["id"] == robot_id), None)
    if not entry:
        console.print(f"[red]Robot '{robot_id}' not found.[/]")
        raise typer.Exit(1)

    robot = Robot(robot_id, entry["max_speed"])
    robot.x, robot.y = entry["x"], entry["y"]
    robot.battery     = entry["battery"]
    robot.move_to(x, y)

    entry.update({"x": robot.x, "y": robot.y,
                  "battery": robot.battery, "state": robot.state})
    _save_fleet(fleet)
    console.print(f"[green]→ {robot_id} moved to ({x:.2f}, {y:.2f})[/]")

def _load_fleet() -> list[dict]:
    p = Path("fleet.json")
    return json.loads(p.read_text()) if p.exists() else []

def _save_fleet(fleet: list[dict]) -> None:
    Path("fleet.json").write_text(json.dumps(fleet, indent=2))

if __name__ == "__main__":
    app()

# Usage:
# uv run python robot_cli.py spawn R-001 --speed 1.5
# uv run python robot_cli.py navigate R-001 --x 3.0 --y 4.0
# uv run python robot_cli.py status
```

---

## 🏆 Capstone Project — Autonomous Maze Navigator

**Context:** A mobile robot must navigate a grid-based maze from start to finish, logging its path, avoiding obstacles, and reporting a full telemetry summary. All simulation is pure Python — no hardware required.

### Requirements

| Feature | Python Concept | Points |
|---------|---------------|--------|
| `Robot` class with `@property`, `@classmethod` | OOP | 15 |
| `Maze` class with obstacle detection | OOP + Data structures | 10 |
| BFS or greedy path-finding algorithm | Lists, recursion | 15 |
| Custom exceptions (`RobotError`, `CollisionError`) | Error handling | 10 |
| Telemetry logged to CSV after each run | File I/O | 10 |
| Config loaded from `maze_config.json` | JSON I/O | 5 |
| Full type hints throughout | Type hints | 10 |
| pytest suite with ≥ 6 tests | Testing | 15 |
| CLI: `run`, `replay`, `report` commands | typer CLI | 10 |
| `uv` project with `pyproject.toml` | Packaging | 5 |
| **Total** | | **100** |

---

## 📚 Robotics + Python Reference Map

| Topic (University Course) | Python Resource | Relevant Library |
|--------------------------|-----------------|-----------------|
| PID control loop | `while` loops, classes | `simple-pid` |
| Coordinate transforms | `math`, tuples | `numpy` |
| Sensor data filtering | List operations, functions | `scipy.signal` |
| Path planning (BFS/A*) | Dicts, lists, recursion | (stdlib only) |
| Robot state machines | `match/case`, classes | (stdlib only) |
| ROS topics/messages | Dicts, dataclasses | `rospy` / `rclpy` |
| Simulation | OOP, File I/O | `pygame`, `matplotlib` |
| Computer vision | (future) | `opencv-python` |

---

*Specialized robotics companion track — maps directly to the standard Deejoft Python curriculum*
*All concepts are identical; only the context is changed.*
