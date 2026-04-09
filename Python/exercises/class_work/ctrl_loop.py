# Conditionals and loops are fundamental programming constructs that allow us to control the flow of our programs.
# In this exercise, we will explore how to use conditionals and loops in Python.

# 1. Conditionals

score = 59

# if score >= 90:
#     print('Grade A - Excellent!')
# elif score >= 80:
#     print('Grade B - Very Good!')
# elif score >= 70:
#     print('Grade C - Good!')
# elif score >= 60:
#     print('Grade D - Pass!')
# else:
#     print('Grade F - Fail!')

# # Ternary Expression
# status = "Pass" if score >= 60 else "Fail"
# print(status)

# switch-case statement
# command = input(str('Enter a command: ')).lower()

# match command:
#     case 'quit' | 'exit' | 'q':
#         print("Exiting the program...")
#     case 'help' | 'h' | '--help':
#         print("Available commands: quit, help")
#     case str(c) if c.startswith('add '):
#         print(f"Adding: {c[4:]}")
#     case _:
#         print(f"Unknown command: {command}")

# Loops

# for loop - with enumerate

# courses = ["Math", "Science", "English", "History", "Geography", "Art", "Music", "Physical Education", "Biology", "Chemistry"]

# for sub in courses:
#     print(f"{sub}")

# print("\n===============\n")

# for i, sub in enumerate(courses, start=1):
#     print(f"{i:2}. {sub}")

# print("\n===============\n")

# prices = [49999, 49999, 79999, 89999, 79999]
# for sub, price in zip(courses, prices):
#     print(f"{sub}: ₦{price}")

# print("\n===============\n")

# # range
# colors = ["Red", "Green", "Blue", "Yellow", "Purple"]
# for i in range(len(colors)):
#     print(f"{i + 1}. {colors[i]}")

# print("\n===============\n")

# # while loop
# for i in range(1, 6):
#     print(i)

# print("\n===============\n")


# while loop
# count = 1
# while count <= 5:
#     print(count)
#     count += 1

# print("\n===============\n")

# attempts = 0
# while attempts < 3:
#     answer = input("Password: ")
#     attempts += 1
#     if answer == "deejoft2026":
#         print("✅ Access granted")
#         break
#     else:
#         print("❌ Access denied")

#  List comrehension - the pythonic loop
squares = [x**2 for x in range(1, 11)]
even_squares = [x**2 for x in range(1, 11) if x % 2 == 0]
matrix_flat = [cell for row in [[1,2],[3,4],[5,6]] for cell in row]

print(squares)
print("\n===============\n")
print(even_squares)
print("\n===============\n")
print(matrix_flat)
print("\n===============\n")
