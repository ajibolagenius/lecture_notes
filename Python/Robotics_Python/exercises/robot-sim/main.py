from http.client import CONFLICT
from dataclasses import dataclass, field
from typing import ClassVar
from itertools import cycle
from pathlib import Path
from datetime import datetime
import csv, json, math
from os import name
import pstats
import random
import time


def main():
    print("Hello from robot-sim!")
    print("Class 5 — OOP: Modelling a Robot")
    print("======================================")

    # Class 5 — OOP: Modelling a Robot

    class Robot:
        """
        Software model of a differential-drive mobile robot.
        This mirrors how ROS (Robot Operating System) models robots
        as classes with state, sensors, and behaviours.
        """

        fleet: ClassVar[list["Robot"]] = []

        def __init__(self, robot_id: str, max_speed: float = 1.0):
            self.robot_id:          str     = robot_id
            self.max_speed:         float   = max_speed

            # State
            self.x:                 float   = 0.0
            self.y:                 float   = 0.0
            self.heading:           float   = 0.0
            self.speed:             float   = 0.0
            self.battery:           float   = 100.0
            self.state:             str     = "IDLE"

            # History
            self.path:              list[tuple[float, float]] = [(0.0, 0.0)]
            self.log:               list[str] = []

            Robot.fleet.append(self)

            # Dunder Methods
        def __str__(self) -> str:
                return f"Robot {self.robot_id} at ({self.x:.2f}, {self.y:.2f}) heading {self.heading:.1f}° | {self.state}"

        def __repr__(self) -> str:
                return f"Robot(robot_id={self.robot_id!r}, max_speed={self.max_speed})"
        def __len__(self)  -> int:
                return len(self.path)

            # Properties
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

            # Class Methods
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


if __name__ == "__main__":
    main()
