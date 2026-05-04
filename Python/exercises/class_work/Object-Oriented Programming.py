from datetime import date
from typing import ClassVar

class Student:
    """Represent a student at Deejoft"""

    # Class variable
    school: ClassVar[str] = "Deejoft Coding School"
    _count: ClassVar[int] = 0

    def __init__(self, name: str, cohort: int, course: str) -> None:
        self.name:              str                 = name
        self.cohort:            int                 = cohort
        self.course:            str                 = course
        self.grades:            list[dict]          = []
        self.enrolled_on:       date                = date.today()
        Student._count                              += 1

        # Dunder methods
        def __str__(self)  -> str: return f"{self.name} (Cohort {self.cohort}, {self.course})"
        def __repr__(self) -> str: return f"Student(name={self.name!r}, cohort={self.cohort})"
        def __len__(self)  -> int: return len(self.grades)
        def __lt__(self, other: "Student") -> bool: return self.average < other.average

        # Properties
        @property
        def average(self) -> float:
            if not self.grades:
                return 0.0
            return sum(g["score"] for g in self.grade) / len(self.grades)

        @property
        def grade_letter(self) -> str:
            avg             =   self.average
            if avg >= 90    :   return "A"
            if avg >= 75    :   return "B"
            if avg >= 50    :   return "C"
            return "F"
