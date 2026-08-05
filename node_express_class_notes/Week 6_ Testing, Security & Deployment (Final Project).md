# Week 6: Testing, Security & Deployment — Ship the Reminders API

This is it — the last week. The Reminders API already works end to end against a real mobile app. This week we make sure it *keeps* working (automated tests), harden it against the basics (security middleware), and put it on the public internet where the real, shipped React Native app can actually reach it.

---

## Module 11: Automated Testing

**Objective:** Write real integration tests so future changes can't silently break signup, login, or reminders CRUD.

### 1. Why Automate What You've Been Testing By Hand?

You've been testing every endpoint manually in Postman for five weeks. That works, but it doesn't scale, and it's easy to forget to re-check something after a change. **Integration tests** send real HTTP requests to your actual Express app and assert on the response — the same thing you've been doing by hand, just repeatable in seconds.

### 2. Setting Up Vitest + Supertest

```bash
npm install --save-dev vitest supertest
```

Supertest lets you send requests directly to your Express `app` object, in-process — no need for the server to actually be listening on a port.

```javascript
// src/app.js — export the app itself, separate from app.listen()
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/auth', authRoutes);
app.use('/reminders', reminderRoutes);

app.use(errorHandlerMiddleware);

export default app;
```

```javascript
// src/index.js — now just imports app and starts listening
import app from './app.js';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Reminders API listening on port ${PORT}`);
});
```

> **Note:** splitting `app.js` (the Express app itself) from `index.js` (starting the server) is what makes testing possible — tests import `app` and never actually bind to a port.

A smoke test:

```javascript
// tests/health.test.js
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('GET /health', () => {
  it('returns 200 and status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
```

### 3. Testing the Real Endpoints

Use a **dedicated Neon database branch** for tests (Neon supports instant, cheap branching) so tests never touch your real development or production data.

```javascript
// tests/reminders.test.js
import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Reminders API', () => {
  let token;

  beforeAll(async () => {
    const signupRes = await request(app)
      .post('/auth/signup')
      .send({ email: `test-${Date.now()}@example.com`, password: 'password123' });
    token = signupRes.body.token;
  });

  it('rejects requests with no token', async () => {
    const res = await request(app).get('/reminders');
    expect(res.status).toBe(401);
  });

  it('creates and fetches a reminder for the logged-in user', async () => {
    const createRes = await request(app)
      .post('/reminders')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Buy milk', notes: 'Whole milk, not skim' });

    expect(createRes.status).toBe(201);
    expect(createRes.body.title).toBe('Buy milk');

    const listRes = await request(app)
      .get('/reminders')
      .set('Authorization', `Bearer ${token}`);

    expect(listRes.status).toBe(200);
    expect(listRes.body.length).toBeGreaterThan(0);
  });

  it('returns 400 when title is missing', async () => {
    const res = await request(app)
      .post('/reminders')
      .set('Authorization', `Bearer ${token}`)
      .send({ notes: 'no title here' });

    expect(res.status).toBe(400);
  });
});
```

**⭐️ Class Exercise: Write the Missing Tests**

Add tests for: logging in with the wrong password (`401`), updating a reminder (`200`, and the field actually changed), and deleting a reminder you don't own (`403`).

---

## Module 12: Hardening & Shipping

**Objective:** Add baseline production security, then deploy the API to a live URL.

### 1. Security Headers & Rate Limiting

```bash
npm install helmet express-rate-limit
```

```javascript
// src/app.js
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

app.use(helmet()); // sets a batch of sensible security-related HTTP headers

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);
```

`helmet()` protects against a handful of well-known attack vectors (clickjacking, MIME-sniffing, etc.) with one line. Rate limiting protects against brute-force login attempts and basic abuse.

### 2. Structured Logging

A simple request logger tells you what's actually happening in production, instead of finding out something's broken from a user complaint:

```bash
npm install morgan
```

```javascript
// src/app.js
import morgan from 'morgan';
app.use(morgan('combined'));
```

### 3. Deploying

We'll deploy to **Railway** or **Render** — both have a free tier suitable for a course project.

1. Push `reminders-api` to Github if you haven't already.
2. Create a new project on Railway/Render and connect your Github repo.
3. Set environment variables in the platform's dashboard (never commit them):
   * `DATABASE_URL` — your Neon connection string (consider using a **separate production Neon branch/project** from your dev one).
   * `JWT_SECRET` — a long, random production secret, different from your local one.
4. Deploy. Confirm the live URL responds:
   ```bash
   curl https://your-app.up.railway.app/health
   # {"status":"ok"}
   ```

### 4. Final Integration

Update the React Native app's production build (companion course, Week 6) to point at this deployed URL instead of your local machine. Run through the full flow one more time — signup, login, create/edit/complete/delete a reminder — against the **live** API.

**⭐️ Class Exercise: Ship It**

Deploy your API. Send its live `/health` URL to a classmate and have them hit it from their own machine — if they get `{"status":"ok"}` back, it's really live.

---

## 📝 Week 6 / Final Project: Ship the Reminders API

**Goal:** Combine everything from all six weeks into one live, tested, secure service.

### Requirements

1. **Architecture:** Full Controller/Service/Model layering for both `reminders` and `auth`.
2. **Persistence:** Real PostgreSQL (Neon) via parameterized raw SQL — no in-memory data anywhere.
3. **Auth:** Signup/login with hashed passwords and JWTs; every reminder scoped to its owner, with ownership enforced on update/delete.
4. **Validation & Errors:** Every write endpoint validated with Zod; all errors flow through one central handler with correct status codes.
5. **Tests:** Vitest + Supertest covering auth and full reminders CRUD, all passing.
6. **Security:** `helmet` and rate limiting enabled; secrets live in environment variables, never in code.
7. **Deployment:** Live on Railway or Render, backed by a production Neon database.
8. **Integration:** The deployed React Native app (companion course) works end to end against this live API.

### Final Deliverable

Submit: your Github repo URL, your live API URL, and a short screen recording (or live demo) showing the deployed mobile app successfully signing up, logging in, and managing reminders against this deployed API.

### Git Workflow

* `git commit -m "test: add Vitest + Supertest coverage for auth and reminders"`
* `git commit -m "chore: add helmet, rate limiting, and request logging"`
* `git commit -m "chore: deploy reminders-api to production"`

Congratulations — you've built and shipped a real, authenticated, tested backend service from an empty folder. Everything from here (pagination, refresh tokens, background jobs, richer search) is a natural extension of the architecture you already understand.
