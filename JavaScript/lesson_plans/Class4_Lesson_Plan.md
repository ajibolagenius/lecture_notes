# 📋 JavaScript Class 4 — Lesson Plan (Tutor Script)
### Objects, Maps, Sets & Immutable Patterns
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Array methods quiz |
| 0:10 – 0:50 | Objects: creation, spread, immutable updates, `structuredClone` |
| 0:50 – 1:20 | Object utility methods, Map, Set |
| 1:20 – 2:00 | Exercise: grade tracker with immutable state |

---

## 🎤 PART A — Immutable Object Patterns (0:10 – 0:50)

**[SAY:]:**
> "In React — which you start in two courses — state must never be mutated directly. You must always produce a new object or array. The patterns we learn today are the foundation of everything React state management is built on. Learn them here and they will feel natural when you need them."

**[TYPE:]**
```javascript
// Object shorthand — when variable name matches key name
const name = 'Ada';
const age  = 30;
const user = { name, age };   // { name: 'Ada', age: 30 }

// Computed property names
const field = 'email';
const data  = { [field]: 'ada@deejoft.com' };  // { email: 'ada@deejoft.com' }

// ❌ Mutation — changes the original object (never do this for state)
const original = { name: 'Ada', role: 'student' };
original.role = 'instructor';   // Modified the original!

// ✅ Spread — creates a new object with changes
const promoted = { ...original, role: 'instructor' };
// original is unchanged; promoted is a new object

// Nested immutable update
const user2 = { name: 'Ada', address: { city: 'Lagos', country: 'Nigeria' } };
const moved = {
  ...user2,
  address: { ...user2.address, city: 'Abuja' }
};
// user2.address.city is still 'Lagos'
// moved.address.city is 'Abuja'
```

**[TYPE:]**
```javascript
// structuredClone — deep copy (ES2022, available in all modern browsers and Node 17+)
const original = { name: 'Ada', scores: [88, 92, 95], meta: { active: true } };

const shallow = { ...original };
shallow.scores.push(100);     // Also modifies original.scores! Shallow copy shares arrays.

const deep = structuredClone(original);
deep.scores.push(100);        // original.scores is untouched ✅

// Object utility methods
const config = { theme: 'dark', lang: 'en', font: 'Inter' };
Object.keys(config);          // ['theme', 'lang', 'font']
Object.values(config);        // ['dark', 'en', 'Inter']
Object.entries(config);       // [['theme','dark'], ['lang','en'], ['font','Inter']]
Object.fromEntries([['a', 1], ['b', 2]]); // { a: 1, b: 2 } — reverse of entries

// Useful pattern: update specific entries from Object.entries
const updated = Object.fromEntries(
  Object.entries(config).map(([k, v]) =>
    k === 'lang' ? [k, 'fr'] : [k, v]
  )
);
```

---

## 🎤 PART B — Map & Set (0:50 – 1:20)

**[TYPE:]**
```javascript
// Map — like an object but keys can be ANYTHING, not just strings
const userCache = new Map();
const userKey = { id: 1 };

userCache.set(userKey, { name: 'Ada', score: 95 });
userCache.get(userKey);   // { name: 'Ada', score: 95 }
userCache.has(userKey);   // true
userCache.size;           // 1
userCache.delete(userKey);

// Iterate a Map
for (const [key, value] of userCache) {
  console.log(key, value);
}

// Set — unique values only, O(1) existence check
const raw = ['ada', 'alan', 'ada', 'grace', 'alan'];
const unique = [...new Set(raw)];  // ['ada', 'alan', 'grace']

const roles = new Set(['admin', 'editor', 'viewer']);
roles.has('admin');    // true  — O(1)
roles.add('owner');
roles.delete('viewer');
roles.size;            // 3

// Set operations — union, intersection, difference
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);
const union        = new Set([...setA, ...setB]);         // {1,2,3,4,5,6}
const intersection = new Set([...setA].filter(x => setB.has(x))); // {3,4}
const difference   = new Set([...setA].filter(x => !setB.has(x))); // {1,2}
```

---

## 📅 Class 4 Exercise (1:20 – 2:00)

Build an immutable student registry:
```javascript
let registry = [];

// addStudent(name, course) — returns a new registry with the student added
// updateScore(id, score) — returns a new registry with that student's score updated
// removeStudent(id) — returns a new registry without that student
// getTopStudents(n) — returns top n students by score as a new array

// All functions must be PURE — they return new arrays, never modify registry
// Use crypto.randomUUID() to generate each student's id
```

---

*Deejoft Coding School | JavaScript Class 4*
