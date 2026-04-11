# 🏆 Capstone Project — Autonomous Maze Navigator
### Python for Robotics | Final Project Brief

---

## Overview

You will build a **fully packaged Python simulator** for an autonomous mobile robot navigating a grid-based maze. The robot must find a path from start to finish, avoid obstacles, log its telemetry, and report a full session summary.

Everything runs in pure Python — no hardware required. But the patterns you'll use (state machines, sensor abstraction, path planning, exception handling, telemetry logging) are the same ones used in real robot software and ROS nodes.

---

## The World

```
# Example 10×10 maze (0 = free, 1 = wall, S = start, G = goal)

. . . # . . . . . .
. # . # . # # # . .
. # . . . . . # . .
. # # # # . . # . .
. . . . # . # . . .
# # . # # . # # # .
. . . . . . . . # .
. # # # . # . . . .
. . . . . . # . . .
. . . . . . . . . G

# Your robot starts at (0, 0) and must reach G.
# It may only move up, down, left, right (no diagonals).
```

---

## Requirements

### 1. Core Classes

**`Maze` class**
- Loads a maze from a JSON config file (`maze_config.json`)
- `is_passable(x, y) -> bool` — returns False for walls and out-of-bounds
- `neighbours(x, y) -> list[tuple[int, int]]` — returns passable adjacent cells
- `__str__` — renders the maze as a grid with robot position marked

**`Robot` class** (extend or adapt from class exercises)
- Tracks `position: tuple[int, int]` (grid coordinates)
- `move(direction: str)` — moves one cell in direction (`"N"`, `"S"`, `"E"`, `"W"`)
  - Raises `CollisionError` if the target cell is a wall
  - Raises `BoundaryError` if the target cell is out of bounds
- `battery: float` — decreases by 1 per move
- Raises `BatteryDepletedError` when battery reaches 0

**`PathFinder` class**
- `bfs(start, goal, maze) -> list[tuple[int, int]]` — breadth-first search
  - Returns a list of grid cells from start to goal
  - Returns `[]` if no path exists
- Bonus: implement `a_star()` for extra challenge

**`MissionController` class**
- Orchestrates `Robot`, `Maze`, and `PathFinder`
- `run() -> MissionResult` — executes the full mission
- Handles all exceptions, logs telemetry, returns a result object

---

### 2. Custom Exceptions

```python
class RobotError(Exception): pass
class CollisionError(RobotError): pass
class BoundaryError(RobotError): pass
class BatteryDepletedError(RobotError): pass
class NoPathFoundError(RobotError): pass
```

---

### 3. Telemetry Logging

- Every move is logged to `telemetry/session_<timestamp>.csv`
- Fields: `step`, `x`, `y`, `direction`, `battery`, `state`
- On mission end: write a `summary.json` with:
  - `robot_id`, `total_steps`, `battery_used`, `path_length`, `result` (`"SUCCESS"` or `"FAILED"`), `reason`

---

### 4. Config File (`maze_config.json`)

```json
{
  "robot_id": "NAV-001",
  "battery": 200,
  "maze": [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  "start": [0, 0],
  "goal":  [9, 9]
}
```

---

### 5. CLI Commands

```bash
# Run a full mission
uv run python maze_cli.py run

# Replay the last mission step-by-step
uv run python maze_cli.py replay

# Print the session report
uv run python maze_cli.py report
```

---

### 6. Type Hints & Testing

- All functions and methods must have complete type hints
- pytest suite with **at least 8 passing tests** covering:
  - `Maze.is_passable` — wall, free cell, out-of-bounds
  - `Robot.move` — valid move, collision, boundary, battery depletion
  - `PathFinder.bfs` — solvable maze, unsolvable maze, start == goal
  - `MissionController.run` — successful mission, battery failure

---

## Deliverables

```
maze_navigator/
├── pyproject.toml
├── maze_config.json
├── robot.py            # Robot class
├── maze.py             # Maze class
├── pathfinder.py       # PathFinder class
├── mission.py          # MissionController class
├── maze_cli.py         # typer CLI
├── telemetry/
│   └── session_*.csv   # Auto-generated
└── tests/
    └── test_*.py       # pytest suite
```

---

## Marking Rubric

| Criterion | Description | Points |
|-----------|-------------|--------|
| **`Maze` class** | Loads JSON, `is_passable`, `neighbours`, renders to string | 10 |
| **`Robot` class** | Position, move, battery drain, correct exceptions | 15 |
| **`PathFinder.bfs`** | Correct BFS, returns empty list for unsolvable | 15 |
| **`MissionController`** | Orchestrates run, catches all exceptions, returns result | 10 |
| **Custom exceptions** | Proper hierarchy, descriptive messages | 10 |
| **Telemetry** | CSV per session, summary JSON | 10 |
| **Type hints** | Complete throughout all classes and functions | 10 |
| **pytest suite** | ≥ 8 tests, covers all listed scenarios | 15 |
| **CLI** | `run`, `replay`, `report` commands work correctly | 10 |
| **Packaging** | `uv` project, `pyproject.toml`, `robot-nav` command works | 5 |
| **Bonus: A\*** | Correct A* pathfinder (faster than BFS) | +10 |
| **Total** | | **110** |

---

## Getting Started — Suggested Order

1. Start with `Maze` — it has no dependencies and is easy to test immediately.
2. Then `Robot` — depends only on `Maze` for boundary/collision checks.
3. Then `PathFinder` — depends on `Maze`.
4. Then `MissionController` — brings everything together.
5. Write tests as you build each class (or before — TDD!).
6. Build the CLI last, once the logic is solid.

---

## Extension Challenges (Optional)

- **Visualiser:** Use `rich` to animate the robot moving through the maze in the terminal, step by step.
- **Random maze generator:** Implement recursive backtracking to generate solvable mazes of any size.
- **Multiple robots:** Spawn two robots with different start positions. Which one reaches the goal faster? Use `asyncio` to run them concurrently.
- **Dynamic obstacles:** Add obstacles that move each turn. The robot must replan its route if its path becomes blocked.

---

*Deejoft Coding School — Python for Robotics Capstone*
*Concepts: BFS, OOP, exceptions, file I/O, type hints, pytest, typer, uv*
