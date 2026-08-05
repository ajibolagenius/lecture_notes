# Week 4: Authentication & Authorization

So far, every reminder has technically belonged to "whoever happened to call the API" — there's no concept of a logged-in user yet. This week we fix that properly: real signup, real login, real password hashing, and a real token-based auth system protecting every reminder route. By the end of this week, two different people can use the same API and only ever see their own reminders.

> This week goes a step beyond the original reference tutorial this course is based on, which — being a beginner-focused, single-user demo — just hardcodes a placeholder like `const authenticatedUserId = 3` wherever it needs to know "who's asking." A real mobile app needs real accounts, so we're building that properly here.

---

## Module 7: Signup & Login

**Objective:** Let users create an account and log in, receiving a token that proves who they are.

### 1. Authentication vs. Authorization

These two words get mixed up constantly, but they answer different questions:

* **Authentication** — "Who are you?" (logging in, proving your identity)
* **Authorization** — "What are you allowed to do?" (can *this* user delete *that* reminder?)

This module handles authentication. Module 8 handles authorization.

### 2. Hashing Passwords

We never, ever store a user's actual password. If your database were ever leaked, plaintext passwords would compromise every user's account on every other site where they reused that password. Instead, we store a **hash** — a one-way scramble that's easy to verify but effectively impossible to reverse.

```bash
npm install bcryptjs
```

```javascript
import bcrypt from 'bcryptjs';

const passwordHash = await bcrypt.hash(plainTextPassword, 10);
// passwordHash looks like: $2a$10$N9qo8uLOickgx2ZMRZoMy...

const isMatch = await bcrypt.compare(plainTextPassword, passwordHash);
// true or false
```

The `10` is the **salt round cost** — how much computational work goes into the hash. Higher is more secure but slower; 10-12 is the standard tradeoff in 2026.

### 3. Issuing a JWT

A **JWT (JSON Web Token)** is a signed, self-contained token the client can hold onto and send back on every future request, proving who they are without the server needing to look anything up in a session store.

```bash
npm install jsonwebtoken
```

```javascript
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { sub: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);
```

* `sub` (subject) is the JWT-standard field name for "whose token is this" — we'll store the user's id there.
* `process.env.JWT_SECRET` must be a long, random string kept in `.env` — anyone with this secret can forge valid tokens.
* `expiresIn: '1h'` means the token stops being valid after an hour; the client will need to log in again (or use a refresh token — an advanced topic worth exploring beyond this course).

### 4. Building the Auth Trio

Same layered structure as reminders — its own routes, controller, service, and model:

```bash
mkdir src/models
touch src/models/userModel.js src/services/authService.js src/controllers/authController.js src/routes/authRoutes.js
```

```javascript
// src/models/userModel.js
import db from '../config/db.js';

export const UserModel = {
  async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  async create({ email, passwordHash }) {
    const result = await db.query(
      `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at`,
      [email, passwordHash]
    );
    return result.rows[0];
  },
};
```

```javascript
// src/services/authService.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';

function generateToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

export const AuthService = {
  async signup(email, password) {
    const existing = await UserModel.findByEmail(email);
    if (existing) throw new Error('Email already in use');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, passwordHash });
    const token = generateToken(user);
    return { token, user };
  },

  async login(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) throw new Error('Invalid email or password');

    const token = generateToken(user);
    return { token, user: { id: user.id, email: user.email } };
  },
};
```

```javascript
// src/controllers/authController.js
import { AuthService } from '../services/authService.js';

export const AuthController = {
  async signup(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.signup(email, password);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};
```

```javascript
// src/routes/authRoutes.js
import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

export default router;
```

Mount it alongside the reminders router:

```javascript
// src/index.js
import authRoutes from './routes/authRoutes.js';
// ...
app.use('/auth', authRoutes);
```

**⭐️ Class Exercise: Sign Up and Log In**

In Postman: `POST /auth/signup` with `{ "email": "you@example.com", "password": "correcthorsebattery" }`, confirm you get back a `token` and `user`. Then `POST /auth/login` with the same credentials and confirm you get a token back too. Try logging in with the wrong password and confirm you get a `401`.

---

## Module 8: Protecting Routes

**Objective:** Require a valid token on every reminders route, and scope all data to the logged-in user.

### 1. The Auth Middleware

Clients send their token on every request in the `Authorization` header, formatted as `Bearer <token>`. We write one middleware that checks this header, verifies the token, and — if valid — attaches the user's info to `req.user` for every downstream handler to use.

```javascript
// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
```

### 2. Protecting the Reminders Router

```javascript
// src/routes/reminderRoutes.js
import { Router } from 'express';
import { ReminderController } from '../controllers/reminderController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware); // every route below this line now requires a valid token

router.get('/', ReminderController.getAllReminders);
router.get('/:id', ReminderController.getReminderById);
router.post('/', ReminderController.createReminder);
router.patch('/:id', ReminderController.updateReminder);
router.delete('/:id', ReminderController.deleteReminder);

export default router;
```

`router.use(authMiddleware)` applies the middleware to every route defined *after* it in this router — a clean way to protect a whole resource in one line.

### 3. Scoping Data to the Logged-In User

Right now `getAllReminders` returns everyone's reminders. We fix that by threading `req.user.id` all the way down to the SQL query:

```javascript
// src/controllers/reminderController.js
export const ReminderController = {
  async getAllReminders(req, res) {
    try {
      const reminders = await ReminderService.getAllReminders(req.user.id);
      res.status(200).json(reminders);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  // ...
};
```

```javascript
// src/services/reminderService.js
export const ReminderService = {
  async getAllReminders(userId) {
    return ReminderModel.getAll(userId);
  },
  // ...
};
```

`ReminderModel.getAll(userId)` already filters `WHERE user_id = $1` from Week 3 — so this connects a real, previously-unused piece of the schema.

### 4. Checking Ownership Before Mutating

Reading is one thing; updating or deleting someone *else's* reminder is a security bug. Before performing either, confirm the reminder actually belongs to `req.user.id`:

```javascript
// src/services/reminderService.js
async updateReminder(reminderId, newValues, userId) {
  const reminder = await ReminderModel.findById(reminderId);
  if (!reminder) throw new Error('Reminder not found');
  if (reminder.user_id !== userId) {
    const error = new Error('You are not authorized to update this reminder');
    error.statusCode = 403;
    throw error;
  }
  const updated = await ReminderModel.update(reminderId, newValues);
  return updated;
},

async deleteReminder(reminderId, userId) {
  const reminder = await ReminderModel.findById(reminderId);
  if (!reminder) throw new Error('Reminder not found');
  if (reminder.user_id !== userId) {
    const error = new Error('You are not authorized to delete this reminder');
    error.statusCode = 403;
    throw error;
  }
  const rowsDeleted = await ReminderModel.delete(reminderId);
  if (rowsDeleted === 0) throw new Error('Failed to delete the reminder');
  return { message: 'Reminder deleted successfully' };
},
```

> **Note:** compare `reminder.user_id !== userId`, never trust a `userId` sent in the request body — always use the one the auth middleware verified from the token (`req.user.id`).

**⭐️ Class Exercise: Two Users, Two Reminder Lists**

1. Sign up as two different users (two different emails) and save both tokens.
2. Create a reminder as User A.
3. `GET /reminders` as User B — confirm you do **not** see User A's reminder.
4. Try to `DELETE` User A's reminder while authenticated as User B — confirm you get a `403`.

---

## 📝 Week 4 Assignment: "Real Accounts, Real Ownership"

**Objective:** The Reminders API now requires login, and every reminder is owned by exactly one user.

### Requirements

1. `POST /auth/signup` and `POST /auth/login` both work, returning `{ token, user }`.
2. Every `/reminders` route is protected by `authMiddleware` and returns `401` without a valid token.
3. `GET /reminders` only ever returns the logged-in user's own reminders.
4. Attempting to update or delete another user's reminder returns `403 Forbidden`.
5. No hardcoded user ids remain anywhere in the codebase.

### Git Workflow

* `git commit -m "feat: add signup and login with bcrypt and JWT"`
* `git commit -m "feat: add auth middleware and protect reminder routes"`
* `git commit -m "feat: scope reminders to the authenticated user and enforce ownership"`
