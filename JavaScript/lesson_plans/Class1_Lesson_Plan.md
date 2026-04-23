# 📋 JavaScript Class 1 — Lesson Plan (Tutor Script)
### Variables, Types & Operators
**Duration:** ~2 hours | **Format:** Console-first, no files yet

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:15 | The shift from declarative to imperative — what JS is |
| 0:15 – 0:50 | Variables: `const`, `let`, why never `var` |
| 0:50 – 1:20 | Data types: primitives, strings, template literals |
| 1:20 – 1:50 | Operators: arithmetic, comparison, logical, nullish, optional chaining |
| 1:50 – 2:00 | Exercise |

---

## 🛠 Setup (Do Before Students Arrive)
- Chrome open with DevTools console visible (`F12` → Console tab)
- No files needed — all of Week 1 lives in the console
- Projector showing the console at a comfortable font size (`Ctrl +`)

---

## 🎤 PART A — What JavaScript Is (0:00 – 0:15)

### The Mental Shift (10 min)

**[SAY]:**
> "HTML tells the browser *what* to show. CSS tells it *how* it looks. JavaScript tells it *what to do*. That is a completely different kind of instruction. HTML and CSS are declarative — you describe a result and the browser figures out how to produce it. JavaScript is imperative — you write step-by-step instructions that the browser executes in order."

**[WRITE ON BOARD:]**
```
HTML / CSS   →   Declarative    "Here is what I want."
JavaScript   →   Imperative     "Here is how to do it, step by step."
```

**[SAY]:**
> "The mental shift is real. In CSS, you can write rules in any order and they all apply. In JavaScript, order matters. Line 2 cannot use something defined on line 5. An instruction on line 10 can change everything set up on lines 1–9. You are writing a program."

**[DO — type this in the console. Just this.]:**
```javascript
document.body.style.background = 'hotpink';
```

**[SAY]:**
> "One line of JavaScript just modified a live website. The page you are looking at — any page — can be controlled with JavaScript right now. Everything you have built in HTML and CSS is accessible from this console."

---

### The Console Is Your Classroom (5 min)

**[SAY]:**
> "For all of Week 1 and most of Week 2, we are working entirely in the browser console. No files, no setup. Just you, the console, and instant feedback. If you make an error, you see it immediately. If it works, you see it immediately. This is the fastest way to learn a programming language."

**[DEMONSTRATE:]**
```javascript
// Type an expression — console evaluates and returns the result
2 + 2            // → 4
'Hello' + ' ' + 'World'  // → "Hello World"
typeof 42        // → "number"

// Errors show in red immediately — and they tell you what went wrong
connsole.log('hi')  // ReferenceError: connsole is not defined
```

**[SAY]:**
> "I want you to develop one habit above all others: read the error. The full error. Not just the red colour — the message. 'ReferenceError: connsole is not defined' tells you exactly what broke and why. Beginners who learn to read errors become independent quickly. Those who ignore them and ask for help with every red line do not."

---

## 🎤 PART B — Variables (0:15 – 0:50)

### The Three Keywords — And Why Two Are Dead (10 min)

**[SAY]:**
> "JavaScript has three keywords for declaring variables: `var`, `let`, and `const`. One of them is legacy and should never be written in 2026. Two of them we use every day. Let me explain the difference."

**[TYPE in console:]**
```javascript
// var — function-scoped, hoisted, can be re-declared
// These are the properties that cause bugs
var x = 10;
var x = 20;   // No error! Re-declared the same name. In real code: a disaster.

// let — block-scoped, not hoisted, cannot be re-declared
let score = 0;
score = 10;      // OK — reassignment
let score = 20;  // SyntaxError — cannot re-declare

// const — block-scoped, cannot be reassigned at all
const MAX = 100;
MAX = 200;   // TypeError — cannot reassign a const
```

**[SAY]:**
> "`var` is function-scoped — it ignores block boundaries like `if` and `for`. This means a variable declared inside an `if` block with `var` leaks out to the surrounding function. `let` and `const` are block-scoped — they stay inside the `{ }` where they were declared. `var` is also hoisted — you can use it before it is declared and JavaScript will not error. These two behaviours together cause bugs that are extremely hard to track down."

**[WRITE THE RULE on board:]**
```
Rule 1: const by default.
Rule 2: let when you need to reassign.
Rule 3: Never var. Not in any new code. Ever.
```

---

### `const` vs `let` — The Practical Decision (10 min)

**[SAY]:**
> "How do you decide which to use? Start every variable as `const`. If you get a 'cannot assign to const' error later, change it to `let`. That error is the code telling you: 'I reassign this later — let me be mutable.' Usually, more variables in your program are `const` than you expect. Immutability by default makes code easier to reason about."

**[TYPE:]**
```javascript
// const — the binding cannot change, but the VALUE can (for objects/arrays)
const user = { name: 'Ada', age: 30 };
user.name = 'Alan';     // ✅ OK — we are changing the OBJECT, not the binding
user = { name: 'Ada' }; // ❌ TypeError — cannot reassign the BINDING

const courses = ['HTML', 'CSS'];
courses.push('JavaScript'); // ✅ OK — modifying the array
courses = ['Python'];       // ❌ TypeError — cannot reassign

// let — when the variable itself needs to change
let currentScore = 0;
currentScore += 10;    // ✅ OK — reassignment is the point
currentScore = 0;      // ✅ OK — reset
```

**[SAY:]:**
> "This distinction will matter when we get to React. React's state model is built on this: you cannot mutate state directly — you create new values. The habit of reaching for `const` first is the right instinct."

---

### Naming Conventions (5 min)

**[TYPE:]**
```javascript
// camelCase for variables and functions (most common in JS)
const firstName = 'Ada';
const maxAttempts = 3;
function calculateScore() {}

// PascalCase for classes and React components
class UserProfile {}
function NavBar() {}   // React component

// SCREAMING_SNAKE_CASE for true constants — values that never change in any context
const MAX_RETRY_COUNT = 5;
const API_BASE_URL = 'https://api.deejoft.com';

// Underscore prefix for private/internal (convention, not enforced)
const _internalState = {};
```

**[SAY:]:**
> "Naming is not optional. Code is read far more than it is written. `const x = 3` tells a reader nothing. `const maxLoginAttempts = 3` tells them exactly what this is and why 3. If you cannot name a variable without using 'data', 'info', 'thing', or 'temp' — you probably need to think harder about what the variable actually represents."

---

## 🎤 PART C — Data Types (0:50 – 1:20)

### The Seven Primitives (10 min)

**[SAY:]:**
> "A primitive is the simplest kind of value. It is immutable — it cannot be changed in place. When you 'modify' a string, you are creating a new string, not changing the original."

**[TYPE:]**
```javascript
// String
const name = 'Ada Lovelace';
const school = "Deejoft";        // Single or double quotes — choose one, be consistent
const path = `data/users`;        // Backtick — template literal (more on this shortly)

// Number — integers and floats are the same type
const age = 30;
const price = 79_999.00;          // Underscore as digit separator — purely visual
const billion = 1_000_000_000;

// Boolean
const isEnrolled = true;
const hasCompletedPayment = false;

// null — intentional absence of value
let currentUser = null;           // "Nothing here yet, intentionally"

// undefined — declared but not yet given a value
let pendingResult;
console.log(pendingResult);       // → undefined

// Symbol — unique identifier (advanced — mention, don't dwell)
const id = Symbol('user-id');

// BigInt — integers larger than 2^53 (mention only)
const bigNum = 9007199254740993n;
```

**[SAY for `null` vs `undefined`:]:**
> "Students often confuse these. `null` is intentional — a developer put it there to say 'this is explicitly empty'. `undefined` is the default — the language uses it when something has not been set. When you write `let x;`, JavaScript sets it to `undefined` automatically. `null` is always from a human. `undefined` is often from the runtime."

**[TYPE:]**
```javascript
// typeof — check the type of any value
typeof 'hello'       // → 'string'
typeof 42            // → 'number'
typeof true          // → 'boolean'
typeof undefined     // → 'undefined'
typeof null          // → 'object'  ← famous JS bug — null is NOT an object
typeof []            // → 'object'  ← arrays are objects in JS
typeof {}            // → 'object'
typeof function(){}  // → 'function'

// Correct ways to check:
null === null                    // → true
Array.isArray([])                // → true — the correct array check
```

**[SAY for `typeof null === 'object'`:]:**
> "This is a known JavaScript bug from 1995. It was never fixed because fixing it would break too much existing code. Just memorise: `typeof null` returns `'object'`, which is wrong. To check for null, always use `=== null`."

---

### Template Literals (10 min)

**[TYPE:]**
```javascript
const name = 'Ada';
const cohort = 7;
const score = 94.5;

// ❌ String concatenation — hard to read, easy to miss spaces
const intro = 'Welcome, ' + name + '. You are in cohort ' + cohort + '.';

// ✅ Template literal — backtick, ${expression} for values
const introModern = `Welcome, ${name}. You are in cohort ${cohort}.`;

// Expressions — any valid JS works inside ${}
console.log(`Score: ${score.toFixed(1)}%`);            // "Score: 94.5%"
console.log(`Status: ${score >= 50 ? 'Pass' : 'Fail'}`); // "Status: Pass"
console.log(`Next cohort: ${cohort + 1}`);              // "Next cohort: 8"
console.log(`Name uppercased: ${name.toUpperCase()}`);  // "Name uppercased: ADA"

// Multi-line strings — backticks respect actual line breaks
const receipt = `
  Course: JavaScript
  Student: ${name}
  Amount: ₦79,999
`;
```

**[SAY:]:**
> "The rule: always use template literals when you are embedding a variable or expression into a string. Use regular quotes for plain strings with no interpolation. The backtick is slightly more expensive for the parser, so `const msg = 'Hello'` is fine — but `const msg = 'Hello, ' + name` should always become `` `Hello, ${name}` ``."

---

## 🎤 PART D — Operators (1:20 – 1:50)

### Comparison — The Rule That Cannot Be Broken (10 min)

**[SAY:]:**
> "JavaScript has two equality operators. One of them should never be used. The other must always be used."

**[TYPE:]**
```javascript
// === strict equality — same value AND same type
5 === 5       // true
5 === '5'     // false — different types
0 === false   // false — different types
null === null // true

// == loose equality — coerces types before comparing
// JavaScript tries to convert types to make them match
5 == '5'      // true  ← '5' is coerced to number 5
0 == false    // true  ← false is coerced to 0
null == undefined  // true ← special rule
'' == false   // true  ← both coerce to 0

// The problem: these are unpredictable
[] == false   // true  ← huh?
[] == ![]     // true  ← completely unintuitive
```

**[SAY:]:**
> "The loose equality rules are a memorisation problem. Different browsers at different times have had slightly different coercion rules. The only safe choice: always use `===` and `!==`. Zero exceptions. If you need to check if something is either null OR undefined, use `== null` — that is the one accepted use of `==`."

---

### Logical & Modern Operators (20 min)

**[TYPE:]**
```javascript
// Short-circuit evaluation — JS stops as early as possible
false && 'hello'   // false  — first operand is falsy, never evaluates 'hello'
true  && 'hello'   // 'hello' — first is truthy, returns the second operand
null  || 'default' // 'default' — null is falsy, falls through to 'default'
'ada' || 'default' // 'ada'    — 'ada' is truthy, returns first operand

// Falsy values (everything else is truthy)
// false, 0, -0, 0n, '', "", ``, null, undefined, NaN
Boolean(0)         // false
Boolean('')        // false
Boolean(null)      // false
Boolean(undefined) // false
Boolean([])        // TRUE  ← empty array is truthy!
Boolean({})        // TRUE  ← empty object is truthy!
```

**[TYPE:]**
```javascript
// ?? Nullish coalescing — only falls back for null/undefined (not 0 or '')
const name = '';
name || 'Guest'    // → 'Guest'  — empty string is falsy, falls back
name ?? 'Guest'    // → ''       — empty string is NOT null/undefined, keeps it

// This matters for legitimate falsy values:
const count = 0;
count || 10        // → 10  — zero is falsy, discards it! Wrong.
count ?? 10        // → 0   — zero is not null/undefined, keeps it. Correct.
```

**[SAY for `??`:]:**
> "Nullish coalescing was added specifically because `||` has a bug for legitimate falsy defaults. If a user's score is 0, you do not want to replace it with a default. `count || defaultValue` does. `count ?? defaultValue` does not. Use `??` for defaults."

**[TYPE:]**
```javascript
// ?. Optional chaining — safely access nested properties
const user = { profile: { avatar: 'ada.jpg' } };

// Old way — crashes if profile is null/undefined
user.settings.theme    // TypeError: Cannot read properties of undefined

// Optional chaining — returns undefined instead of crashing
user.settings?.theme   // → undefined — no error
user.profile?.avatar   // → 'ada.jpg'
user.getRole?.()        // → undefined — safe method call that may not exist

// Combine with ??
const theme = user.settings?.theme ?? 'light';
// "Get settings.theme if it exists. If not, use 'light'."
```

---

## ✏️ PART E — Exercise (1:50 – 2:00)

**[SAY:]:**
> "In the console. Five expressions. Write each one, hit Enter, read the result. Then explain to the person next to you why it gives that result."

**[WRITE ON BOARD:]**
```javascript
// What does each of these evaluate to? Why?
1.  typeof (null)
2.  'hello' === 'Hello'
3.  0 ?? 'fallback'
4.  null || undefined || 'found it' || 'too late'
5.  const user = { name: 'Ada' };
    user.age?.toFixed(2) ?? 'No age set'
```

---

## 🔚 Wrap-Up (Last 3 min)

**[SAY:]:**
> "Three rules to live by from today: `const` first, `let` when needed, never `var`. `===` always, `==` never (except `== null`). When a value might be null or undefined and you have a fallback, use `??` — not `||`. Next class: control flow and functions — the tools that let your program make decisions and reuse logic."

---

## 📎 Tutor Notes

**Anticipate this question:** "If `const` objects can be modified, what's the point of `const`?" — The `const` prevents reassignment of the binding (the variable name pointing to the object). You cannot say `user = somethingElse`. But the object the binding points to is still mutable. For deep immutability, you would use `Object.freeze()` or libraries like Immer. In practice, the binding protection is valuable enough.

**Common console mistakes:** Students hit Enter mid-expression and get a syntax error. Teach them: `Shift+Enter` adds a new line in the console without executing. For multi-line code, use `Shift+Enter`.
