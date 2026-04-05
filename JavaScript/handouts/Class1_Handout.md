# 📄 JavaScript Class 1 — Student Handout
### Variables, Types & Operators
**Deejoft Coding School**

---

## A. The Three Variable Rules

```javascript
const name = 'Ada';    // Cannot be reassigned. Use this FIRST, always.
let   score = 0;       // Can be reassigned. Use when you need to change it later.
// var               ← Never write this. Legacy. Block-scope bugs. Hoisting issues.
```

> ✏️ **Fill in:** Start with `const`. Change to `let` only if you get: ___________________________________

---

## B. Data Types

```javascript
// Primitives — immutable, compared by VALUE
const name     = 'Ada Lovelace';    // String — single, double, or backtick quotes
const cohort   = 7;                 // Number — int and float are the same type
const price    = 79_999.00;         // _ is a visual separator — no effect on value
const active   = true;              // Boolean
const empty    = null;              // Intentional absence — set by the developer
let   pending;                      // undefined — declared but not yet assigned

// typeof
typeof 'hello'     // 'string'
typeof 42          // 'number'
typeof null        // 'object' ← famous JS bug — null is NOT an object
typeof []          // 'object' ← use Array.isArray([]) instead
typeof undefined   // 'undefined'
```

> ✏️ **Fill in:** What is the difference between `null` and `undefined`?
>
> `null`: _____________________________________________
>
> `undefined`: ________________________________________

---

## C. Template Literals

```javascript
const name    = 'Ada';
const cohort  = 7;
const score   = 94.5;

// Backtick + ${expression} for any valid JS
const msg = `Welcome, ${name}. Cohort ${cohort}.`;
const fmt = `Score: ${score.toFixed(1)}%`;
const ternary = `Status: ${score >= 50 ? 'Pass' : 'Fail'}`;

// Multi-line — backticks respect actual newlines
const receipt = `
  Student: ${name}
  Amount:  ₦79,999
`;
```

---

## D. Operators Reference

```javascript
// Arithmetic
10 % 3    // 1  — modulo (remainder)
2 ** 8    // 256 — exponentiation

// Comparison — ALWAYS === and !==
5 === 5      // true  — same value, same type
5 === '5'    // false — different type
5 == '5'     // true  ← NEVER use == — unpredictable type coercion

// Logical
false && 'hi'    // false  — short-circuit: stops at false
true  && 'hi'    // 'hi'   — returns second operand when first is truthy
null  || 'ok'    // 'ok'   — falls back when null is falsy
'ada' || 'ok'    // 'ada'  — first truthy value wins

// ?? Nullish coalescing — falls back ONLY for null/undefined (not 0 or '')
0     ?? 'default'    // 0        — 0 is not null/undefined
null  ?? 'default'    // 'default'
''    ?? 'default'    // ''       — empty string is not null/undefined

// ?. Optional chaining — safely access nested properties
const user = { profile: null };
user.profile?.avatar     // undefined — no crash
user.profile?.avatar ?? 'anon.jpg'   // 'anon.jpg'
```

> ✏️ **Fill in:** When should you use `??` instead of `||`?
>
> ___________________________________________________________________

---

## E. Falsy Values (memorise these)

`false` · `0` · `-0` · `0n` · `''` · `""` · ` `` ` · `null` · `undefined` · `NaN`

> Everything else is **truthy** — including `[]`, `{}`, and `'false'`

---

## ⚡ Class 1 Quick Reference

| Concept | Rule |
|---------|------|
| Variable default | `const` first, `let` if reassignment needed, never `var` |
| Equality | Always `===`, never `==` (except `== null` to check null/undefined) |
| Nullish fallback | `??` for null/undefined · `\|\|` for all falsy values |
| Optional chaining | `obj?.prop` — returns `undefined` instead of crashing |
| `typeof null` | Returns `'object'` — a JS bug. Use `=== null` to check for null. |

---

*Deejoft Coding School | JavaScript Class 1 | Bring to Class 2*
