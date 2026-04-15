# Data Structures - List, Tuple, Set, Dictionary

# List -  ordered, mutable, allows duplicate elements

import numbers


# students = [] # empty list
# students = ["Alice", "Bob", "Charlie"] # list with elements

# second_list = [1, 2, 3, 4, 5, 2] # list with single data type
# mixed_list = ["Alice", 25, 3.14, True] # list with mixed data types

# nested_list = [[1, 2], [3, 4], [5, 6]] # list with nested lists

# print("---- List Examples ----")
# # print(students) # output: ['Alice', 'Bob', 'Charlie']
# # print("---"*10)


# # # List operations
# # students.append("David") # add element to the end of the list
# # students.insert(2, "Eve") # add element at specific index
# # students.extend(["Frank", "Grace"]) # add multiple elements to the end of the list

# # students.remove("Bob") # remove element by value
# # students.pop(0) # remove element by index

# # # students.sort() # sort the list in ascending order

# # sorted_copy = sorted(students) # create a sorted copy of the list

# # students.reverse() # reverse the order of the list

# # slicing
# numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# print("--- Slicing Examples ---")
# print("---"*10)

# print(numbers[2:5])  # output: [3, 4, 5]
# print(numbers[:5])   # output: [1, 2, 3, 4, 5]
# print(numbers[5:])   # output: [6, 7, 8, 9, 10]
# print(numbers[:])    # output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# print(numbers[::2])  # output: [1, 3, 5, 7, 9]
# print(numbers[::-1]) # output: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]


# Dictionary - unordered, mutable, key-value pairs, keys must be unique

students_dict = {} # empty dictionary

name = "Damilola"


student = {
    "name": "Alice",
    "age": 25,
    "grade": "A",
    "is_enrolled": True
}

teacher = {
    "name": "Mr. Smith",
    "subject": "Mathematics",
    "years_of_experience": 10
}

print("--- Dictionary Examples ---")
print(student) # output: {'name': 'Alice', 'age': 25, 'grade': 'A', 'is_enrolled': True}
print("---"*10)
print(student["name"]) # output: Alice
print(student["age"]) # output: 25
print(student["grade"]) # output: A
print(student["is_enrolled"]) # output: True
print("---"*10)
print(f"Good morning, {student['name']}! Your grade is {student['grade']}. I am your teacher, {teacher['name']}. Kindly call me this student with a name of {name}.") # output: Good morning, Alice! Your grade is A. I am your teacher, Mr. Smith.
print("---"*10)

# Dictionary operations
student.get("email", "Not provided") # get value by key with default value if key does not exist
print(student)
