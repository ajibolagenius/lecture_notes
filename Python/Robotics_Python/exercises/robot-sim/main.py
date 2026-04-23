from itertools import cycle
from os import name
import random
import datetime
import time
import math

def main():
    print("Hello from robot-sim!")
    print("======================================")

    # # String Methods
    # raw_message = " ERROR: obstacle_detected at sector_B "

    # # Clean and Parse
    # clean = raw_message.strip() # Remove leading/trailing whitespace
    # parts = clean.split(": ", maxsplit=1) # Split into type and details
    # level = parts[0] # "ERROR"
    # detail = parts[1] # "obstacle_detected at sector_B"

    # # Log Formatting
    # def format_log(level: str, message: str) -> str:
    #     # import datetime
    #     ts = datetime.datetime.now().strftime("%H:%M:%S.%f")[:-3] # Get current time with milliseconds
    #     return f"[{ts}] [{level:<7}] {message}" # Format log with timestamp and level

    # # Printing
    # print(format_log("INFO",    "Robot initialised"))
    # print(format_log("WARNING", "Battery below 20%"))
    # print(format_log("ERROR",   "Ultrasonic timeout"))


    # Control Flow: Robot Decision Making

    # --- State Machine Pattern ---

    # state = "IDLE" # Possible states: IDLE, MOVING, CHARGING, ERROR, OBSTACLE

    # # match/case logic to determine next state
    # match state:
    #     case "IDLE":
    #         print("🤖 Waiting for command...")
    #     case "MOVING":
    #         print("➡️  Moving to waypoint")
    #     case "OBSTACLE":
    #         print("🛑 Obstacle detected — stopping")
    #     case "CHARGING":
    #         print("🔋 Charging — do not disturb")
    #     case "ERROR":
    #         print("❌ Fault — require manual intervention")
    #     case _:
    #         print(f"⚠️  Unknown state: {state}")

    # print("---*20")

    # # --- Sensor threshold decision chain ---
    # distance_cm = random.uniform(0, 100) # Simulate a distance sensor reading in cm

    # if distance_cm < 20:
    #     action = (f"🚨 Obstacle very close: {distance_cm:.1f} cm — stopping immediately!")
    # elif distance_cm < 50:
    #     action = (f"⚠️  Obstacle detected: {distance_cm:.1f} cm — slowing down")
    # elif distance_cm < 80:
    #     action = (f"⚠️  Caution: object at {distance_cm:.1f} cm — maintaining current speed")
    # else:
    #     action = (f"✅ Path clear: {distance_cm:.1f} cm — proceeding at normal speed")

    # print(f"Distance {distance_cm:.1f} cm -> Action: {action}")

    # print("---*20")

    # # --- The Control Loop ---

    # battery         = 100.0
    # obstacle_dist   = random.uniform(0, 100)
    # running         = True

    # MAX_CYCLES      = 10
    # cycle_count     = 0

    # while running and cycle_count < MAX_CYCLES:
    #     print(f"Cycle {cycle_count+1}/{MAX_CYCLES} - Battery: {battery:.1f}% - Obstacle Distance: {obstacle_dist:.1f} cm")

    #     # Decision logic based on sensor data
    #     if battery < 20:
    #         print("🔋 Battery low — seeking charging station")
    #         running = False # For this simulation, we stop when battery is low
    #         state = "CHARGING"
    #     elif obstacle_dist < 20:
    #         print("🚨 Obstacle very close — stopping immediately!")
    #         running = False # For this simulation, we stop when an obstacle is detected
    #         state = "OBSTACLE"
    #     elif obstacle_dist < 50:
    #         print("⚠️  Obstacle detected — slowing down")
    #         state = "MOVING"
    #     else:
    #         print("✅ Path clear — proceeding at normal speed")
    #         state = "MOVING"

    #     # Simulate battery drain and sensor updates
    #     battery -= random.uniform(5, 15) # Drain battery randomly
    #     obstacle_dist = random.uniform(0, 100) # Update obstacle distance

    #     # Check for end conditions
    #     if battery <= 0:
    #         print("🔋 Battery depleted — shutting down")
    #         running = False

    #     cycle_count += 1
    #     time.sleep(1) # Simulate time delay for next cycle

    # --- Iterating over waypoints ---
#     waypoints = [
#     (0.0, 0.0),
#     (1.5, 0.0),
#     (1.5, 2.0),
#     (0.0, 2.0),
#     (0.0, 0.0),  # Return to origin
# ]

#     for index, (x, y) in enumerate(waypoints):
#         is_last = index == len(waypoints) - 1
#         tag = "🏁 Final waypoint" if is_last else f"Waypoint {index}"
#         print(f" -> Navigating to {tag}: ({x: .1f}, {y: .1f})")

#     # List comprehension — filter only waypoints in positive quadrant
#     safe_wps = [(x, y) for (x, y) in waypoints if x >= 0 and y >= 0]
#     print(f"Safe waypoints in positive quadrant: {safe_wps}")


# Navigation and Sensor Processing
# Data Structures: Sensor Arrays and Maps

# lidar_scan: list[float] = [2.10, 1.95, 0.83, 0.41, 0.39, 0.44, 1.20, 2.05, 2.33, 2.41]

# # Some list operations
# min_dist = min(lidar_scan) # Find minimum distance
# max_dist = max(lidar_scan) # Find maximum distance
# avg_dist = sum(lidar_scan) / len(lidar_scan) # Calculate average distance
# obstacles = [d for d in lidar_scan if d < 0.50] # Filter for close obstacles

# # Index of closest obstacle
# min_idx = lidar_scan.index(min(lidar_scan))
# sector_angle = min_idx * 36 # Assuming 10 readings for 360 degrees
# print(f"Closest obstacle at {min_dist:.2f} m in sector {min_idx} (angle {sector_angle}°)")

# Rolling Buffer for Sensor Data
# MAX_BUFFER = 5
# sensor_buffer: list[float] = []

# for reading in [0.90, 0.85, 0.80, 0.76, 0.72, 0.68, 0.65]:
#     sensor_buffer.append(reading) # Add new reading to buffer
#     if len(sensor_buffer) > MAX_BUFFER:
#         sensor_buffer.pop(0) # Remove oldest reading if buffer exceeds max size
#     smoothed = sum(sensor_buffer) / len(sensor_buffer) # Calculate smoothed value
#     print(f"New reading: {reading:.2f} m -> Smoothed distance: {smoothed:.2f} m (Buffer: {sensor_buffer})")

# Dictionaries - robot config
# robot_config: dict = {
#     "id":           "RX-78",
#     "type":         "differential_drive",
#     "max_speed":    1.5, # m/s
#     "wheel_base":   0.3, # m
#     "sensors":      {
#         "ultrasonic": {"pin": 4,  "max_range": 400},
#         "lidar":      {"port": "/dev/ttyUSB0", "frequency": 10},
#         "imu":        {"i2c_address": 0x68},
#     },
#     "status":       "READY"
# }

# # Nested Acess
# imu_address = robot_config["sensors"]["imu"]["i2c_address"]
# print(f"Robot ID: {robot_config['id']} - Type: {robot_config['type']} - IMU I2C Address: {imu_address:#04x}")

# # Safe access using .get()

# heading = robot_config.get("heading", 0.0) # Default to 0.0 if not present
# print(f"Current heading: {heading} degrees")

# # Sensor registry - tracking all active sensors

# sensor_readings: dict[str, float | None] = {
#     "front_us": 45.2,
#     "left_us":  None,    # Sensor not responding
#     "right_us": 120.0,
#     "imu_yaw":  92.3,
# }

# # Find all failed sensors
# failed = [name for name, val in sensor_readings.items() if val is None]
# print(f"Failed sensors: {failed}")

# Tuples - Waypoint coordinates

current_pos: tuple[float, float] = (0.0, 0.0) # Current position (x, y)
goal_pos: tuple[float, float] = (1.5, 2.0) # Goal position (x, y)

# Euclidean distance calculation

dx = goal_pos[0] - current_pos[0]
dy = goal_pos[1] - current_pos[1]

dist = math.sqrt(dx**2 + dy**2)
print(f"Current position: {current_pos} - Goal position: {goal_pos} - Distance to goal: {dist:.2f} m")

# Named tuples for better readability
from collections import namedtuple

Pose = namedtuple("Pose", ["x", "y", "theta"])

start = Pose(x=0.0, y=0.0, theta=0.0) # Starting pose (x, y, theta)
goal = Pose(x=1.5, y=2.0, theta=math.pi/2) # Goal pose (x, y, theta)

print(f"Start: {start}")
print(f"Goal heading: {math.degrees(goal.theta):.1f}°")



if __name__ == "__main__":
    main()
