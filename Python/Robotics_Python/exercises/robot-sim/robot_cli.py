# robot_cli.py
# uv add typer rich

import typer
from rich.console import Console
from rich.table   import Table
from rich.live    import Live
import json, time
from pathlib import Path
from main import Robot  # The class we built in Class 5

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
