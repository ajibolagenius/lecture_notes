import random

def main():
    print("Hello from robot-sim!")
    print("======================================")
    print("This is a placeholder for the robot simulation exercise.")
    print("--------------------------------------")

    # Variables and Data Types — Robot Context

    # --- Modelling the Robot ---

    robot_name: str = "Farha-UV-1" # The name of the robot with a string data type
    robot_id: int = 101 # The unique identifier for the robot with an integer data type
    battery_level: float = 75.5 # The current battery level of the robot with a float data type
    is_active: bool = True # A boolean indicating if the robot is currently active
    last_error: str | None = None # A variable to store the last error message, initialized to None or a string if an error occurs

    # --- Telemetry Data Output ---
    print(f"Robot Name      : {robot_name} (ID: #{robot_id})") # Output the robot's name and ID
    print(f"Battery Level   : {battery_level:.1f}%") # Output the battery level formatted to one decimal place
    print(f"Active Status   : {'Active' if is_active else 'Inactive'}") # Output the active status of the robot
    print(f"Error Status    : {last_error if last_error else 'No errors detected'}") # Output the error status, showing the last error if it exists


    # --- Debug Shorthands ---
    speed = 1.25 # (m/s) The current speed of the robot in meters per second
    print(f"Speed  : {speed:.2f} m/s") # Output the speed formatted to two decimal places
    print(f"Speed  : {speed * 3.6:.2f} km/h") # Convert speed to kilometers per hour and output it formatted to two decimal places

    # --- Sensor Readings ---
    temperature             : float = 22.5 # (°C) The current temperature reading from the robot's sensor in degrees Celsius
    ultrasonic_distance     : float = 0.42 # (m) The distance to the nearest obstacle detected by the ultrasonic sensor in meters
    lidar_angle             : int = 270 # (degrees) The angle at which the LiDAR sensor is currently scanning
    encoder_ticks           : int = 15_320 # The number of encoder ticks counted, representing the distance traveled by the robot
    wheel_circumference    : float = 0.314_159 # (m) The circumference of the robot's wheel in meters

    # Useful Calculations
    distance_traveled      : float = (encoder_ticks / 360) * wheel_circumference # Calculate the distance traveled based on encoder ticks and wheel circumference
    print(f"Distance Traveled : {distance_traveled:.2f} m") # Output the distance traveled formatted to two decimal places

    # --- Integer division and modulo for navigation ---
    full_rotations = encoder_ticks // 360 # Calculate the number of full rotations completed by the robot
    partial_ticks = encoder_ticks % 360 # Calculate the remaining ticks after accounting for full rotations
    print(f"Full Rotations    : {full_rotations} rotations") # Output the number of full rotations
    print(f"Partial Ticks     : {partial_ticks} ticks") # Output the number of partial ticks remaining after full rotations

    # --- None and Optional Types ---
    def generate_random_point():
        latitude = random.uniform(-90.0, 90.0) # Generate a random latitude value between -90 and 90 degrees
        longitude = random.uniform(-180.0, 180.0) # Generate a random longitude value between -180 and 180 degrees
        return round(latitude, 6), round(longitude, 6) # Return the generated latitude and longitude as a tuple


    gps_latitude: float | None = generate_random_point()[0] # The current latitude from the GPS sensor, initialized to None if no data is available
    gps_longitude: float | None = generate_random_point()[1] # The current longitude from the GPS sensor, initialized to None if no data is available

    if gps_latitude is None:
        print("⚠️  GPS not ready — waiting for fix...") # Output a warning message if the GPS data is not available
    else:
        print(f"GPS Coordinates   : ({gps_latitude:.6f}, {gps_longitude:.6f})") # Output the GPS coordinates formatted to six decimal places if data is available














if __name__ == "__main__":
    main()
