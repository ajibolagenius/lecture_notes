# Functions - are blocks of code that perform a specific task.

max_score: float = 100.0

def calculate_grade(score: float) -> str:
    percentage = (score / max_score) * 100
    match percentage:
        case p if p >= 90:
            return "A"
        case p if p >= 80:
            return "B"
        case p if p >= 70:
            return "C"
        case p if p >= 60:
            return "D"
        case _:
            return "F"


score = float(input("Enter the score: "))
grade = calculate_grade(score)
print(f"The grade is: {grade}")
