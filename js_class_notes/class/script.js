/*
    1. Conditional Statements
 */

// Score Grade System
/*
let score = 82

if (score >= 90) {
    console.log(`Grade: A`)
} else if (score >= 80) {
    console.log(`Grade: B`)
} else if (score >= 70) {
    console.log(`Grade: C`)
} else if (score >= 60) {
    console.log(`Grade: D`)
} else if (score >= 50) {
    console.log(`Grade: E`)
} else {
    console.log(`Grade: F`)
}
 */

/*
    Switch Statement
 */

// Day of the week
/*
let dayNumber = new Date().getDay()
let dayName

switch (dayNumber) {
    case 0:
        dayName = "Sunday"
        break
    case 1:
        dayName = "Monday"
        break
    case 2:
        dayName = "Tuesday"
        break
    case 3:
        dayName = "Wednesday"
        break
    case 4:
        dayName = "Thursday"
        break
    case 5:
        dayName = "Friday"
        break
    case 6:
        dayName = "Saturday"
        break
    default:
        dayName = "Invalid day number"
}
console.log(`Today is ${dayName}`)
 */

/*
    Ternary Operator
*/

// Old Way
let age = 17; let message;

// if (age >= 18) {
//     message = "OLD: Access Granted";
// } else {
//     message = "OLD: Access Denied";
// }
// console.log(message);

// New Way (Ternary Operator)
message = (age >= 18) ? "NEW: Access Granted" : "NEW: Access Denied";

console.log(message);
