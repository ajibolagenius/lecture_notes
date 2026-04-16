from itertools import cycle
import random
import datetime
import time

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
    waypoints = [
    (0.0, 0.0),
    (1.5, 0.0),
    (1.5, 2.0),
    (0.0, 2.0),
    (0.0, 0.0),  # Return to origin
]

    for index, (x, y) in enumerate(waypoints):
        is_last = index == len(waypoints) - 1
        tag = "🏁 Final waypoint" if is_last else f"Waypoint {index}"
        print(f" -> Navigating to {tag}: ({x: .1f}, {y: .1f})")

    # List comprehension — filter only waypoints in positive quadrant
    safe_wps = [(x, y) for (x, y) in waypoints if x >= 0 and y >= 0]
    print(f"Safe waypoints in positive quadrant: {safe_wps}")

if __name__ == "__main__":
    main()
