# ✏️ Python for Robotics — Exercises & Solutions
### All 8 Classes | Mapped to University Robotics Course

---

## Week 1 — Robot State, Types & Decision-Making

---

### Exercise 1.1 — Predict the Output ⭐
*Sensor and state data types — predict before running*

```python
import math

# Predict the output of each expression:
1.  type(None)
2.  type(True)
3.  type(0.42)                          # Sensor reading
4.  100 // 3                            # Battery thirds
5.  270 % 360                           # Heading normalisation
6.  2 ** 10                             # 10-bit encoder resolution
7.  'obstacle' in 'obstacle_detected'
8.  not True or False
9.  None is None                        # Uninitialised GPS
10. f"{'STOP' if 12.5 < 15 else 'GO'}"  # Threshold check
```

<details>
<summary>✅ Answers</summary>

```
1.  <class 'NoneType'>
2.  <class 'bool'>
3.  <class 'float'>
4.  33
5.  270
6.  1024
7.  True
8.  False
9.  True
10. 'STOP'
```
</details>

---

### Exercise 1.2 — Fix the Bugs ⭐
*All bugs relate to common robotics programming mistakes*

```python
# Bug A — wrong None comparison (GPS not ready)
def is_gps_ready(lat):
    return lat == None   # BUG

# Bug B — naming + argument issue (sensor function)
def ReadUltrasonicCM(Distance_CM):   # BUG (two issues)
    return Distance_CM * 0.01   # convert cm → m

# Bug C — truthy/falsy bug (0 distance is valid!)
def is_obstacle_present(distance_m):
    label = 'OBSTACLE' if distance_m else 'CLEAR'   # BUG — 0.0m will say CLEAR
    return label

# Bug D — missing return (movement calculator)
def compute_arc_length(radius, angle_deg):
    result = radius * math.radians(angle_deg)   # BUG

# Bug E — mutable default argument (sensor history)
def add_reading(value, history=[]):   # BUG
    history.append(value)
    return history
```

<details>
<summary>✅ Solutions</summary>

```python
# A — use 'is' for None
def is_gps_ready(lat):
    return lat is not None

# B — snake_case naming, meaningful parameter name
def read_ultrasonic_cm(distance_cm: float) -> float:
    return distance_cm * 0.01

# C — check for None explicitly; 0.0 is a valid reading
def is_obstacle_present(distance_m: float | None) -> str:
    if distance_m is None:
        return 'NO_READING'
    return 'OBSTACLE' if distance_m < 0.20 else 'CLEAR'

# D — add return
def compute_arc_length(radius: float, angle_deg: float) -> float:
    return radius * math.radians(angle_deg)

# E — use None as default, create list inside
def add_reading(value: float, history: list | None = None) -> list:
    if history is None:
        history = []
    history.append(value)
    return history
```
</details>

---

### Exercise 1.3 — Robot State Reporter ⭐⭐

```python
# Build three functions:

# 1. battery_status(level: float) -> str
#    >= 80 → 'FULL', >= 40 → 'OK', >= 20 → 'LOW', below 20 → 'CRITICAL'

# 2. format_telemetry(robot_id: str, x: float, y: float, battery: float) -> str
#    Returns: "R-001 | pos=(3.14, 2.72) | battery=87.5% [OK]"

# 3. summarise_fleet(robots: list[dict]) -> dict
#    Each dict has 'id', 'battery', 'state'
#    Returns: {'total': N, 'active': N, 'critical': N, 'avg_battery': N}
#    Sorted by battery descending

fleet = [
    {'id': 'R-001', 'battery': 92.0, 'state': 'MOVING'},
    {'id': 'R-002', 'battery': 14.5, 'state': 'CHARGING'},
    {'id': 'R-003', 'battery': 67.2, 'state': 'IDLE'},
    {'id': 'R-004', 'battery': 8.1,  'state': 'ERROR'},
]

# Expected output of summarise_fleet(fleet):
# {'total': 4, 'active': 3, 'critical': 2, 'avg_battery': 45.45}
```

<details>
<summary>✅ Solution</summary>

```python
def battery_status(level: float) -> str:
    if level >= 80: return 'FULL'
    if level >= 40: return 'OK'
    if level >= 20: return 'LOW'
    return 'CRITICAL'

def format_telemetry(robot_id: str, x: float, y: float, battery: float) -> str:
    return f"{robot_id} | pos=({x:.2f}, {y:.2f}) | battery={battery:.1f}% [{battery_status(battery)}]"

def summarise_fleet(robots: list[dict]) -> dict:
    batteries = [r['battery'] for r in robots]
    return {
        'total':       len(robots),
        'active':      sum(1 for r in robots if r['state'] not in ('CHARGING', 'ERROR')),
        'critical':    sum(1 for r in robots if r['battery'] < 20),
        'avg_battery': round(sum(batteries) / len(batteries), 2),
    }
```
</details>

---

### Exercise 1.4 — Robot State Machine ⭐⭐⭐

```python
# Implement a robot control loop using match/case and while.
#
# Simulate a robot that:
#   1. Starts in 'IDLE' state
#   2. Each cycle: battery drops by 3%, obstacle distance drops by 8cm
#   3. State transitions:
#      - battery < 20%    → CHARGING (exit loop)
#      - obstacle < 20cm  → OBSTACLE (rotate 90°, reset obstacle to 150cm)
#      - otherwise        → MOVING
#   4. Print state each cycle
#   5. After loop: print total cycles and reason for stopping

# Starter:
battery       = 100.0
obstacle_dist = 150.0  # cm
cycle         = 0
state         = 'IDLE'

# Your implementation here...
```

<details>
<summary>✅ Solution</summary>

```python
battery       = 100.0
obstacle_dist = 150.0
cycle         = 0
state         = 'IDLE'
stop_reason   = ''

while True:
    cycle         += 1
    battery       -= 3.0
    obstacle_dist -= 8.0

    match True:
        case _ if battery < 20:
            state       = 'CHARGING'
            stop_reason = f'battery at {battery:.1f}%'
        case _ if obstacle_dist < 20:
            state         = 'OBSTACLE'
            obstacle_dist = 150.0   # Reset after avoidance
        case _:
            state = 'MOVING'

    print(f"Cycle {cycle:02d}: {state:<9} | battery={battery:.1f}% | obstacle={obstacle_dist:.1f}cm")

    if state == 'CHARGING':
        break

print(f"\nStopped after {cycle} cycles. Reason: {stop_reason}")
```
</details>

---

## Week 2 — Navigation & Sensor Processing

---

### Exercise 2.1 — Lidar Scan Analysis ⭐⭐

```python
# A 360° lidar returns 36 readings (one every 10°)
lidar_360 = [
    2.10, 1.95, 1.80, 0.83, 0.41, 0.39, 0.44, 0.90, 1.20, 2.05,
    2.33, 2.41, 2.50, 2.48, 2.30, 1.90, 1.70, 1.65, 1.80, 2.10,
    2.20, 2.15, 2.00, 1.85, 1.70, 1.60, 1.55, 1.50, 1.60, 1.75,
    1.90, 2.00, 2.10, 2.05, 1.95, 1.80,
]
# Each index i corresponds to angle i * 10 degrees

# Tasks:
# 1. Find the closest reading and the angle it came from
# 2. Find all readings below 0.50m — list them as (angle, distance) tuples
# 3. Calculate the average of the FRONT sector (315°–45°, i.e. last 5 + first 5 readings)
# 4. Using list comprehension, produce a 'zone_status' list:
#    'DANGER' if dist < 0.5, 'CAUTION' if dist < 1.0, 'CLEAR' otherwise
```

<details>
<summary>✅ Solution</summary>

```python
# 1. Closest reading
min_dist  = min(lidar_360)
min_angle = lidar_360.index(min_dist) * 10
print(f"Closest: {min_dist}m at {min_angle}°")

# 2. Obstacles under 50cm
obstacles = [(i * 10, d) for i, d in enumerate(lidar_360) if d < 0.50]
print(f"Obstacles (<0.5m): {obstacles}")

# 3. Front sector average (readings 31–35 + 0–4)
front_readings = lidar_360[31:] + lidar_360[:5]
front_avg = sum(front_readings) / len(front_readings)
print(f"Front sector average: {front_avg:.2f}m")

# 4. Zone status
zone_status = [
    'DANGER'  if d < 0.5  else
    'CAUTION' if d < 1.0  else
    'CLEAR'
    for d in lidar_360
]
print(zone_status)
```
</details>

---

### Exercise 2.2 — Sensor Registry ⭐⭐

```python
# Build a sensor registry as a dictionary.
# Each sensor: {'type', 'max_range', 'reading', 'status'}
# status is 'OK' if reading is not None, else 'FAILED'

# Tasks:
# 1. Build the registry from these raw inputs:
sensor_data = [
    ('front_us', 'ultrasonic', 400, 45.2),
    ('left_us',  'ultrasonic', 400, None),
    ('right_us', 'ultrasonic', 400, 120.0),
    ('lidar',    'lidar',      800, 0.83),
    ('imu_yaw',  'imu',        360, 92.3),
    ('gps',      'gps',        None, None),  # Not yet initialised
]

# 2. Print all FAILED sensors
# 3. Find the closest ultrasonic reading (ignore None values)
# 4. Dictionary comprehension: {name: reading} for OK sensors only
```

<details>
<summary>✅ Solution</summary>

```python
# 1. Build registry
registry = {
    name: {'type': stype, 'max_range': max_r,
           'reading': reading,
           'status': 'OK' if reading is not None else 'FAILED'}
    for name, stype, max_r, reading in sensor_data
}

# 2. Failed sensors
failed = [name for name, s in registry.items() if s['status'] == 'FAILED']
print(f"Failed: {failed}")

# 3. Closest ultrasonic
us_readings = [
    s['reading'] for s in registry.values()
    if s['type'] == 'ultrasonic' and s['reading'] is not None
]
print(f"Closest ultrasonic: {min(us_readings):.1f}cm")

# 4. OK sensors only
active_readings = {
    name: s['reading']
    for name, s in registry.items()
    if s['status'] == 'OK'
}
print(active_readings)
```
</details>

---

### Exercise 2.3 — Telemetry Logger ⭐⭐⭐

```python
# Build a complete telemetry logger with these functions:
# 1. log_pose(entries, x, y, heading, battery, state) → appends to entries list
# 2. save_to_csv(entries, filepath) → write CSV with headers
# 3. load_from_csv(filepath) → return list of dicts
# 4. compute_total_distance(entries) → sum of step-by-step Euclidean distances

# Test with this simulated route:
route = [
    (0.0,  0.0,  0.0,   100.0, 'IDLE'),
    (1.0,  0.0,  90.0,  98.5,  'MOVING'),
    (2.0,  0.0,  90.0,  97.0,  'MOVING'),
    (2.0,  1.5,  0.0,   95.2,  'MOVING'),
    (2.0,  3.0,  0.0,   93.4,  'IDLE'),
]
# Expected total distance: 1 + 1 + 1.5 + 1.5 = 5.0m
```

<details>
<summary>✅ Solution</summary>

```python
from pathlib import Path
import csv, math

FIELDS = ['x', 'y', 'heading', 'battery', 'state']

def log_pose(entries, x, y, heading, battery, state):
    entries.append({'x': x, 'y': y, 'heading': heading,
                    'battery': battery, 'state': state})

def save_to_csv(entries: list[dict], filepath: str) -> None:
    p = Path(filepath)
    with p.open('w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(entries)

def load_from_csv(filepath: str) -> list[dict]:
    p = Path(filepath)
    if not p.exists():
        return []
    with p.open('r', encoding='utf-8') as f:
        return list(csv.DictReader(f))

def compute_total_distance(entries: list[dict]) -> float:
    if len(entries) < 2:
        return 0.0
    total = 0.0
    for a, b in zip(entries, entries[1:]):
        dx = float(b['x']) - float(a['x'])
        dy = float(b['y']) - float(a['y'])
        total += math.sqrt(dx**2 + dy**2)
    return round(total, 4)

# Test
entries = []
for x, y, h, bat, st in route:
    log_pose(entries, x, y, h, bat, st)

save_to_csv(entries, 'telemetry.csv')
loaded = load_from_csv('telemetry.csv')
print(f"Total distance: {compute_total_distance(entries)}m")  # 5.0m
```
</details>

---

## Week 3 — Robot as an Object

---

### Exercise 3.1 — Design a Sensor Class ⭐⭐

```python
# Build a Sensor class with:
# - __init__(name, sensor_type, max_range)
# - add_reading(value) — raises ValueError if value > max_range or < 0
# - latest property — most recent reading, or None
# - average property — average of all readings, or None
# - is_healthy property — True if at least one reading in the last 5 was non-None
# - __len__ — number of readings stored
# - __repr__

# Test:
us = Sensor("front_ultrasonic", "ultrasonic", max_range=400)
us.add_reading(45.2)
us.add_reading(39.8)
us.add_reading(12.1)
print(len(us))        # 3
print(us.latest)      # 12.1
print(us.average)     # ~32.37
print(us.is_healthy)  # True
us.add_reading(500)   # Should raise ValueError
```

<details>
<summary>✅ Solution</summary>

```python
class Sensor:
    def __init__(self, name: str, sensor_type: str, max_range: float) -> None:
        self.name        = name
        self.sensor_type = sensor_type
        self.max_range   = max_range
        self.readings: list[float] = []

    def add_reading(self, value: float) -> None:
        if not (0 <= value <= self.max_range):
            raise ValueError(f"{self.name}: {value} out of range [0, {self.max_range}]")
        self.readings.append(value)

    @property
    def latest(self) -> float | None:
        return self.readings[-1] if self.readings else None

    @property
    def average(self) -> float | None:
        if not self.readings:
            return None
        return round(sum(self.readings) / len(self.readings), 4)

    @property
    def is_healthy(self) -> bool:
        recent = self.readings[-5:]
        return any(r is not None for r in recent) if recent else False

    def __len__(self) -> int:
        return len(self.readings)

    def __repr__(self) -> str:
        return f"Sensor(name={self.name!r}, type={self.sensor_type!r}, readings={len(self)})"
```
</details>

---

### Exercise 3.2 — Fault-Tolerant Sensor Hub ⭐⭐⭐

```python
# Build a SensorHub class that manages multiple sensors.
# Requirements:
# - Stores sensors in a dict (name → Sensor)
# - register(sensor) — add a sensor
# - read_all() — returns {name: latest_reading}, uses None for failed sensors
# - failed_sensors() — returns list of sensor names where latest is None
# - healthy_sensors() — returns list of sensor names with a valid reading
# - emergency_stop() — returns True if ANY sensor shows distance < 15cm
#   (only applies to 'ultrasonic' type sensors)

# Custom exception: SensorNotFoundError
```

<details>
<summary>✅ Solution</summary>

```python
class SensorNotFoundError(Exception):
    def __init__(self, name: str) -> None:
        super().__init__(f"Sensor '{name}' not found in hub")

class SensorHub:
    def __init__(self) -> None:
        self._sensors: dict[str, Sensor] = {}

    def register(self, sensor: Sensor) -> None:
        self._sensors[sensor.name] = sensor

    def read_all(self) -> dict[str, float | None]:
        return {name: s.latest for name, s in self._sensors.items()}

    def failed_sensors(self) -> list[str]:
        return [name for name, s in self._sensors.items() if s.latest is None]

    def healthy_sensors(self) -> list[str]:
        return [name for name, s in self._sensors.items() if s.latest is not None]

    def emergency_stop(self) -> bool:
        return any(
            s.latest is not None and s.latest < 15
            for s in self._sensors.values()
            if s.sensor_type == 'ultrasonic'
        )

    def get(self, name: str) -> Sensor:
        if name not in self._sensors:
            raise SensorNotFoundError(name)
        return self._sensors[name]
```
</details>

---

### Exercise 3.3 — Inheritance: Robot Fleet ⭐⭐⭐

```python
# You have a base Robot class (from the course outline).
# Create two subclasses:
#
# 1. DroneRobot(Robot)
#    Extra: altitude: float = 0.0
#    Extra method: fly_to(x, y, altitude) — updates all three
#    Override __str__ to include altitude
#
# 2. CleaningRobot(Robot)
#    Extra: area_cleaned: float = 0.0  (m²)
#    Extra method: clean(area_m2) — add to area_cleaned, drain 1% per m²
#    Override status_report() to include area_cleaned

# Then:
# - Create a fleet with one of each plus a base Robot
# - Use Robot.get_active_robots() to list all
# - Demonstrate polymorphism: call status_report() on each without knowing the type
```

---

## Week 4 — Testing & CLI

---

### Exercise 4.1 — Write the Tests First (TDD) ⭐⭐

```python
# Before implementing, write pytest tests for this function:
#
# def plan_route(
#     start: tuple[float, float],
#     goal:  tuple[float, float],
#     step:  float = 0.5
# ) -> list[tuple[float, float]]:
#     """Returns intermediate waypoints from start to goal."""

# You must test:
# 1. Route ends exactly at the goal
# 2. All intermediate points lie on the line between start and goal
# 3. step=0.5 produces the correct number of waypoints for a 2m straight route
# 4. start == goal returns an empty list (edge case)
# 5. Negative coordinates work correctly
# 6. A parametrised test with at least 3 different (start, goal, step) inputs
```

<details>
<summary>✅ Solution</summary>

```python
import pytest, math

class TestPlanRoute:
    def test_route_ends_at_goal(self):
        route = plan_route((0,0), (2,0), step=0.5)
        assert route[-1] == (2.0, 0.0)

    def test_intermediate_points_on_line(self):
        route = plan_route((0,0), (3,4), step=1.0)
        # Each point should be collinear with start and goal
        for x, y in route[:-1]:
            # Check ratio: x/3 == y/4
            assert abs(x/3 - y/4) < 0.01

    def test_step_size_produces_correct_count(self):
        route = plan_route((0,0), (2,0), step=0.5)
        assert len(route) == 4   # 0.5, 1.0, 1.5, 2.0

    def test_same_start_and_goal_returns_single_point(self):
        route = plan_route((1,1), (1,1), step=0.5)
        assert route == [(1.0, 1.0)]

    def test_negative_coordinates(self):
        route = plan_route((-2,0), (2,0), step=1.0)
        assert route[-1] == (2.0, 0.0)
        assert len(route) == 4

    @pytest.mark.parametrize("start,goal,step,expected_len", [
        ((0,0), (1,0), 0.5, 2),
        ((0,0), (3,4), 1.0, 5),   # distance=5m, 5 steps
        ((0,0), (0,2), 1.0, 2),
    ])
    def test_parametrised(self, start, goal, step, expected_len):
        route = plan_route(start, goal, step)
        assert len(route) == expected_len
```
</details>

---

### Exercise 4.2 — Type Annotations Audit ⭐

```python
# Add complete type hints to all of these function signatures.
# Some have missing return types, some have missing parameter types.

def read_sensor(sensor_id, retries=3):
    ...

def build_fleet(robot_ids, max_speed):
    ...

def filter_active(robots):   # robots is list[dict]; active means state != 'CHARGING'
    ...

def compute_average(values):   # list of floats or ints, returns float
    ...

def find_robot(fleet, robot_id):   # returns dict or None
    ...
```

<details>
<summary>✅ Solution</summary>

```python
def read_sensor(sensor_id: str, retries: int = 3) -> float | None: ...
def build_fleet(robot_ids: list[str], max_speed: float) -> list[dict]: ...
def filter_active(robots: list[dict]) -> list[dict]: ...
def compute_average(values: list[int | float]) -> float: ...
def find_robot(fleet: list[dict], robot_id: str) -> dict | None: ...
```
</details>

---

### Exercise 4.3 — Complete CLI Command ⭐⭐⭐

```python
# Add a 'patrol' command to the robot CLI:
#
# uv run python robot_cli.py patrol R-001 --waypoints "0,0;3,0;3,3;0,3;0,0"
#
# The command should:
# 1. Parse the waypoints string into list[tuple[float, float]]
# 2. Load the robot from fleet.json
# 3. Navigate through all waypoints (calling move_to for each)
# 4. Save updated state back to fleet.json
# 5. Print a rich table showing each leg: from → to, distance, battery used
# 6. Print final summary: total distance, battery remaining

# Bonus: add --loop flag that repeats the patrol until battery < 20%
```

---

## 🏆 Challenge Exercise — PID Controller in Python ⭐⭐⭐⭐

```python
# A Proportional-Integral-Derivative (PID) controller is fundamental
# in robotics. Implement a simple PID class and use it to simulate
# a robot driving toward a target distance.

# class PIDController:
#     def __init__(self, kp, ki, kd, setpoint)
#     def compute(self, measurement, dt) -> float
#       - error = setpoint - measurement
#       - proportional = kp * error
#       - integral (accumulates over time)
#       - derivative = kd * (error - prev_error) / dt
#       - output = proportional + integral + derivative
#       - clamp output to [-1.0, 1.0]

# Simulate:
# - Robot target: 100.0 cm from wall
# - Starting distance: 200.0 cm
# - Each cycle: distance += output * 10  (output drives the robot)
# - Run for 30 cycles, print distance each cycle
# - Robot should converge to ~100cm

# Suggested gains: kp=0.15, ki=0.001, kd=0.05
```

<details>
<summary>✅ Solution</summary>

```python
class PIDController:
    def __init__(self, kp: float, ki: float, kd: float, setpoint: float) -> None:
        self.kp         = kp
        self.ki         = ki
        self.kd         = kd
        self.setpoint   = setpoint
        self._integral  = 0.0
        self._prev_error = 0.0

    def compute(self, measurement: float, dt: float = 0.1) -> float:
        error          = self.setpoint - measurement
        self._integral += error * dt
        derivative     = (error - self._prev_error) / dt
        output         = (self.kp * error +
                          self.ki * self._integral +
                          self.kd * derivative)
        self._prev_error = error
        return max(-1.0, min(1.0, output))   # Clamp

# Simulation
pid      = PIDController(kp=0.15, ki=0.001, kd=0.05, setpoint=100.0)
distance = 200.0

print(f"{'Cycle':>6} | {'Distance':>10} | {'Output':>8}")
print("-" * 32)
for cycle in range(1, 31):
    output   = pid.compute(distance)
    distance += output * 10
    print(f"{cycle:>6} | {distance:>9.2f}cm | {output:>+8.4f}")
```
</details>
