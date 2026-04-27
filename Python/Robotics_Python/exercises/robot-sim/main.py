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
    print("======================================")

    # --- Robot Movement Simulation ---
    def calculate_heading(
        from_pos: tuple[float, float], to_pos: tuple[float, float]
    ) -> float:
        """Return heading in degress (0=North, 90=East) from one pose to another."""
        dx = to_pos[0] - from_pos[0]
        dy = to_pos[1] - from_pos[1]
        angle_rad = math.atan2(dx, dy)
        return (math.degrees(angle_rad) + 360) % 360

    def euclidean_distance(a: tuple[float, float], b: tuple[float, float]) -> float:
        """Return the Euclidean distance between two points."""
        return math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2)

    def normalise_angle(angle_deg: float) -> float:
        """Normalise an angle to the range [0, 360)."""
        return angle_deg % 360

    def smooth_readings(readings: list[float], window: int = 3) -> list[float]:
        """Moving average filter for sensor noise reduction."""
        if len(readings) < window:
            return readings
        return [
            sum(readings[i : i + window]) / window
            for i in range(len(readings) - window + 1)
        ]

    # --- Keyword-only arguments - prevent argument order mistakes ---
    def drive(*, speed: float, direction: float, duration: float) -> dict:
        """Simulate a robot drive command."""
        distance = speed * duration
        return {
            "speed": speed,
            "direction": normalise_angle(direction),
            "duration": duration,
            "distance": round(distance, 4),
        }

    cmd = drive(speed=0.8, direction=415.0, duration=3.0)
    print(cmd)


if __name__ == "__main__":
    main()
