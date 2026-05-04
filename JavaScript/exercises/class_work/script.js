// Control Flow

// Conditional Statements - if/else statement
// if (condition) {
//     // block of code - if the condition is true
// }

const score = 82

// if (score >= 90) {
//     console.log(`Grade A - Distinction`)
// } else if (score >= 75) {
//     console.log(`Grade B - Credit`)
// } else if (score >= 50) {
//     console.log(`Grade C - Pass`)
// } else {
//     console.log(`Grade F - Fail`)
// }

// let day = 3

// if (day === 0) {
//     console.log(`Sunday`)
// } else if (day === 1) {
//     console.log(`Monday`)
// } else if (day === 2) {
//     console.log(`Tuesday`)
// } else if (day === 3) {
//     console.log(`Wednesday`)
// } else if (day === 4) {
//     console.log(`Thursday`)
// } else if (day === 5) {
//     console.log(`Friday`)
// } else if (day === 6) {
//     console.log(`Saturday`)
// } else {
//     console.log(`Incorrect day!`)
// }

// let gender = 'boy'
// if (gender === 'girl') {
//     console.log(`Blue`)
// } else {
//     console.log(`Pink`)
// }


// Ternary Operation
// let grade = 49

// // if (grade >= 50) { console.log(`You passed!`) }
// // else {console.log(`You failed!`)}

// console.log(
//     grade >= 50 ? 'You passed!' : 'You failed!'
// )

const level = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 50 ? 'C' : 'F';
console.log(level)
