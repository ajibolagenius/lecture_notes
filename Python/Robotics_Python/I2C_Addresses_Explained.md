# I²C Addresses Explained

## What is I²C (Inter-Integrated Circuit)?

I²C is a **communication protocol** that allows multiple devices (sensors, displays, etc.) to communicate with a microcontroller using just **two wires**:
- **SDA** (Serial Data) — carries the data
- **SCL** (Serial Clock) — synchronizes communication

---

## I²C Bus Architecture

```
┌─────────────────────┐
│   Microcontroller   │
│   (I²C Master)      │
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    │ SDA   SCL   │
    │ (2 wires)   │
    └──────┬──────┘
           │
    ┌──────┴──────────────────┐
    │                         │
 ┌──┴───┐  ┌──────┐  ┌─────┐│
 │ IMU  │  │ OLED │  │ RTC ││
 │0x68  │  │ 0x3C │  │0x68*││
 └──────┘  └──────┘  └─────┘│
                            │
                    ┌──────┐│
                    │ Lidar││
                    │ 0x29 ││
                    └──────┘│
                    (* Alternate address possible)
```

---

## How I²C Addresses Work

Each device on the I²C bus has a **unique 7-bit address** (0–127). When the microcontroller wants to communicate with a specific device:

1. **Master sends address byte** on the bus (e.g., `0x68`)
2. **All slaves listen** for their address
3. **Only the matching device responds**

### Example from Robot Config

```python
robot_config = {
    "sensors": {
        "imu":        {"i2c_address": 0x68},      # IMU
        "lidar":      {"i2c_address": 0x29},      # Lidar
        "oled":       {"i2c_address": 0x3C},      # Display
    }
}

# Access the IMU address
imu_address = robot_config["sensors"]["imu"]["i2c_address"]
print(f"IMU I²C address: 0x{imu_address:02X}")  # Output: 0x68
```

---

## Common I²C Addresses in Robotics

| Device | Hex Address | Decimal | Notes |
|--------|-------------|---------|-------|
| **IMU (MPU6050)** | `0x68` | 104 | Default; `0x69` if AD0 pin is HIGH |
| **Barometer (BMP280)** | `0x76`, `0x77` | 118, 119 | Selectable via SDO pin |
| **OLED Display** | `0x3C`, `0x3D` | 60, 61 | Common for small displays |
| **Real-time Clock (DS3231)** | `0x68` | 104 | Same as IMU! Needs address jumper |
| **Lidar (VL53L0X)** | `0x29` | 41 | Programmable address |
| **Pressure Sensor** | `0x77` | 119 | Alternative address available |

---

## Address Collisions

⚠️ **Problem:** Two sensors have the same default address (e.g., IMU and RTC both at `0x68`)

**Solutions:**
1. **Use alternate address**: Many sensors have a jumper/pin to select alternate address
2. **Change address via software**: Some devices allow reprogramming their address
3. **Use different protocols**: Switch one sensor to SPI, UART, or analog

### Robot Configuration with Address Changes

```python
robot_config = {
    "sensors": {
        "imu":  {"i2c_address": 0x68},    # Default
        "rtc":  {"i2c_address": 0x69},    # Alternate (jumper set)
        "oled": {"i2c_address": 0x3C},    # Default
    }
}
```

---

## Why Hex Notation?

**Hex notation (`0x68`) is industry standard because:**
- Datasheets use hex for I²C addresses
- It's more compact than decimal (104)
- Hardware engineers think in hex
- Binary representation is clearer: `0x68` = `0110_1000` in binary

**Format in Python:**
```python
address = 0x68
print(f"0x{address:02X}")  # 0x68 (uppercase, 2-digit padding)
print(f"0x{address:02x}")  # 0x68 (lowercase)
print(f"{address:08b}")    # 01101000 (binary)
print(f"{address}")        # 104 (decimal)
```

---

## Key Takeaway for Your Robot

In your robotics course, I²C is the standard protocol for connecting:
- **IMU** (gyro + accelerometer) → measures rotation and acceleration
- **Barometer** → measures altitude/pressure
- **Compass** → measures heading
- **OLED displays** → shows status
- **Real-time clocks** → keeps time

All on just **2 wires**, uniquely identified by their I²C addresses.

---

*Reference: See `00_Robotics_Python_Course_Outline.md`, Line 273 (Class 3 — Data Structures)*
