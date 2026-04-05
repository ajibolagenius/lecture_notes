# 📋 JavaScript Class 3 — Lesson Plan (Tutor Script)
### Arrays & Higher-Order Methods
**Duration:** ~2 hours | **Format:** Console + exercises

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Homework review |
| 0:10 – 0:55 | Array creation, read methods, non-destructive transforms |
| 0:55 – 1:30 | Chaining, `reduce`, checking methods, `flatMap` |
| 1:30 – 2:00 | ES2024: `Object.groupBy`, exercise |

---

## 🎤 PART A — The Case for Array Methods (0:10 – 0:30)

**[SAY:]:**
> "Arrays have two categories of methods: destructive (modify the original) and non-destructive (return a new array). In modern JavaScript, we almost always prefer non-destructive. The reason: predictability. A function that does not mutate its inputs is easier to test, easier to reason about, and safer in React."

**[WRITE ON BOARD:]**
```
NON-DESTRUCTIVE (prefer these)   →  map, filter, reduce, slice, find, findIndex, includes
DESTRUCTIVE (use carefully)      →  push, pop, shift, unshift, splice, sort, reverse
```

**[TYPE — the core transforms:]**
```javascript
const students = [
  { name: 'Ada',   score: 95, course: 'React'  },
  { name: 'Alan',  score: 72, course: 'HTML'   },
  { name: 'Grace', score: 88, course: 'React'  },
  { name: 'Linus', score: 41, course: 'Python' },
  { name: 'Tim',   score: 79, course: 'HTML'   },
];

// map — transform every item, returns a new array of equal length
const names = students.map(s => s.name);
// ['Ada', 'Alan', 'Grace', 'Linus', 'Tim']

const summary = students.map(s => ({
  name: s.name,
  passed: s.score >= 50,
  grade: s.score >= 90 ? 'A' : s.score >= 75 ? 'B' : s.score >= 50 ? 'C' : 'F',
}));

// filter — keep items that pass the test, return shorter array
const passing = students.filter(s => s.score >= 50);
const reactStudents = students.filter(s => s.course === 'React');

// find — first item that passes (or undefined)
const firstTopped = students.find(s => s.score >= 90);  // Ada

// findIndex — index of first match (or -1)
const adaIndex = students.findIndex(s => s.name === 'Ada');  // 0

// includes — boolean membership (for primitives)
['HTML', 'CSS', 'JS'].includes('CSS')  // true

// .at() — index from end with negative numbers
students.at(0)    // Ada (first)
students.at(-1)   // Tim (last) ← cleaner than students[students.length - 1]
```

---

## 🎤 PART B — Chaining & Reduce (0:55 – 1:30)

**[SAY:]:**
> "The power of non-destructive methods is that they can be chained. Each returns a new array, which you can immediately call another method on."

**[TYPE:]**
```javascript
// Chaining — read left to right, each step produces a new array
const topPassers = students
  .filter(s => s.score >= 50)         // Keep only passing students
  .sort((a, b) => b.score - a.score)  // Sort by score descending
  .slice(0, 3)                         // Take the top 3
  .map(s => `${s.name}: ${s.score}`); // Format for display

console.log(topPassers);
// ['Ada: 95', 'Grace: 88', 'Tim: 79']

// reduce — the power tool. Transforms an array into any single value.
// reduce(callback, initialValue)
// callback receives (accumulator, currentItem) each iteration

const totalScore = students.reduce((sum, s) => sum + s.score, 0);
const average = totalScore / students.length;

// reduce to build an object (very common pattern)
const scoreByCourse = students.reduce((acc, s) => {
  if (!acc[s.course]) acc[s.course] = [];
  acc[s.course].push(s.score);
  return acc;
}, {});
// { React: [95, 88], HTML: [72, 79], Python: [41] }
```

**[SAY for `reduce`:]:**
> "Think of the accumulator as a bucket. You start with an empty bucket (the initial value). For each item in the array, you decide how to add it to the bucket. At the end, you have one thing — whatever you put in the bucket. If the initial value is `0`, you build a number. If it is `{}`, you build an object. If it is `[]`, you build a new array (though `map`/`filter` are cleaner for that)."

**[TYPE:]**
```javascript
// every & some
students.every(s => s.score >= 50)   // false — Linus failed
students.some(s => s.score >= 90)    // true  — Ada passed

// flatMap — map then flatten (very useful for nested data)
const words = ['Hello World', 'Good Morning'];
words.flatMap(s => s.split(' '))
// ['Hello', 'World', 'Good', 'Morning']

// Object.groupBy (ES2024) — group into an object by key
const grouped = Object.groupBy(students, s => s.course);
// { React: [{Ada}, {Grace}], HTML: [{Alan}, {Tim}], Python: [{Linus}] }
```

---

## 📅 Class 3 Exercise (1:30 – 2:00)

**Build a grade reporter:**
```javascript
const cohort = [
  { name: 'Ada',   scores: [95, 88, 92] },
  { name: 'Alan',  scores: [72, 68, 75] },
  { name: 'Grace', scores: [88, 91, 85] },
  { name: 'Linus', scores: [41, 55, 48] },
];

// TODO:
// 1. Add an 'average' property to each student (sum/length)
// 2. Add a 'grade' property (A/B/C/F based on average)
// 3. Filter to only passing students (average >= 50)
// 4. Sort by average, highest first
// 5. Print a formatted report line for each
```

---

*Deejoft Coding School | JavaScript Class 3*
