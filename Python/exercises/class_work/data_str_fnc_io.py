# Functions - are blocks of code that perform a specific task.

# max_score: float = 100.0

# def calculate_grade(score: float) -> str:
#     percentage = (score / max_score) * 100
#     match percentage:
#         case p if p >= 90:
#             return "A"
#         case p if p >= 80:
#             return "B"
#         case p if p >= 70:
#             return "C"
#         case p if p >= 60:
#             return "D"
#         case _:
#             return "F"


# score = float(input("Enter the score: "))
# grade = calculate_grade(score)
# print(f"The grade is: {grade}")


# a simple function to greet a user

# user_name = input("Please enter your name: ")

# # function definition
# def greet():
#     print(f"Hello, {user_name}")
#     print(f"Welcome to the Python programming world!")
#     print(2026 * 4 * 22)

# # function call/invocation
# greet()

# def greet2(name, sex, age):
#     print(f"Hello, {name}!")
#     print(f"You are a {age} year old {sex} Python programmer.")
#     print("---"*10)

# greet2("Damilola", "male", 18)
# greet2("Alice", "female", 16)


def log_event(event_type,  *messages, **metadata):
    print(f"[{event_type.upper()}]", *messages)
    for key, value in metadata.items():
        print(f"  {key}: {value}")

log_event("info", "Student enrolled", "Payment confirmed",
          student="Ada", course="React", cohort=7)

def _1love():
    print("I love Python programming!")

def ilove(data):
    pass
