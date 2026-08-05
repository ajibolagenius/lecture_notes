# Comprehensive Node.js & Express Course: Building a Production-Ready REST API

## Course Overview

* **Target Audience:** Developers who have completed the JavaScript course in this program (comfortable with ES6+, `async/await`, arrays/objects, and modules).
* **Tools:** Node.js 24.x (LTS), VS Code, a terminal, Postman or Thunder Client, a free [Neon](https://neon.tech/) serverless PostgreSQL account, and Git/Github.
* **Goal:** Design and ship a real, production-style REST API from an empty folder to a live, deployed URL — learning Express, raw SQL with PostgreSQL, layered architecture (Controller/Service/Model), validation, authentication, and deployment along the way.

This course has one product for its entire duration: **the Reminders API** — the backend for an Apple Reminders-style app. Every module is a real build-step on this one API, not a disposable example; by Week 6 it is a fully authenticated, validated, tested, and deployed service. This course is designed to be taken alongside the **React Native course**, whose Week 5-6 consumes this exact API to finish a full-stack mobile app. We deliberately build on **raw SQL via the `pg` library instead of an ORM** for the first pass — understanding what an ORM abstracts away is more valuable early on than hiding behind one, and it mirrors how many real engineering teams still hand-roll their data layer for small services.

---

## Week 1: Node.js & Express Fundamentals — Bootstrapping the API

### Module 1: Your First Express Server

* **Learning Objectives:**
    * Explain what Node.js is and why it lets JavaScript run outside the browser.
    * Initialize a Node project with `npm init` and understand `package.json`.
    * Install and set up Express 5.
    * Create an entry file (`src/index.js`) and start a listening server.
    * Define the five CRUD routes for a `reminders` resource directly on the `app` object.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What is Node.js / Express?** | 30 mins | 15 mins |
| The JS runtime outside the browser; Express as a minimal web framework on top of Node's `http` module. | - Why a framework instead of raw `http`. | - Run `node -e "console.log(process.version)"`, confirm Node 24.x. |
| **Project Setup** | 30 mins | 30 mins |
| `mkdir reminders-api && npm init -y`. | - `npm install express`. | - Scaffold `reminders-api`, install Express, create `src/index.js`. |
| **Your First Server** | 45 mins | 45 mins |
| `express()`, `app.listen(PORT, callback)`. | - `process.env.PORT \|\| 3000`. | - Start a server that logs "Example app listening on port 3000". |
| **Defining Routes** | 1 hour | 45 mins |
| `app.get/post/patch/delete(path, handler)`. | - `(req, res) => res.send(...)`. | - Add `GET /reminders`, `GET /reminders/:id`, `POST /reminders`, `PATCH /reminders/:id`, `DELETE /reminders/:id`, each sending a placeholder string. |

### Module 2: Routers & Middleware

* **Learning Objectives:**
    * Explain why cramming every route into one file doesn't scale.
    * Use `express.Router()` to group related routes.
    * Mount a router under a path prefix with `app.use()`.
    * Understand what Express middleware is and enable JSON body parsing with `express.json()`.
    * Run the server on file changes with `nodemon`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The `routes/` Folder** | 45 mins | 45 mins |
| `Router()` creates a mini, mountable Express app. | - One router per resource. | - Create `src/routes/reminderRoutes.js`, move all five reminder routes into it using `router.get/post/patch/delete`. |
| **Mounting Routers** | 30 mins | 30 mins |
| `app.use('/reminders', reminderRoutes)`. | - Paths inside the router become relative (`/` instead of `/reminders`). | - Import and mount `reminderRoutes` in `src/index.js`; confirm all 5 routes still work. |
| **What Is Middleware?** | 45 mins | 30 mins |
| A function that runs *before* your route handler: `(req, res, next) => {}`. | - `express.json()` parses a JSON request body into `req.body`. | - Add `app.use(express.json())` as the very first `app.use()` call. |
| **Dev Workflow** | 30 mins | 30 mins |
| `nodemon` restarts the server on save. | - `npm install --save-dev nodemon`, add an `npm run dev` script. | - Add a `"dev": "nodemon src/index.js"` script and use it from now on. |

**Week 1 Assignment:** Push the bootstrapped Reminders API.
* A `reminders-api` repo on Github with `src/index.js` and `src/routes/reminderRoutes.js`.
* All five reminder routes (`GET /reminders`, `GET /reminders/:id`, `POST /reminders`, `PATCH /reminders/:id`, `DELETE /reminders/:id`) respond with a placeholder message when hit in Postman.
* `express.json()` is registered and `npm run dev` restarts the server on save.
* **Commit your changes** with meaningful messages (e.g., "feat: scaffold Express server with reminder route stubs").

---

## Week 2: Designing & Building a REST API (MVC + Service)

### Module 3: The Controller Layer

* **Learning Objectives:**
    * Explain the Controller → Service → Model pattern and why large companies structure backends this way.
    * Extract route logic into a dedicated `controllers/reminderController.js`.
    * Read URL parameters (`req.params`) and request body data (`req.body`).
    * Understand that controllers should only handle HTTP concerns, not business logic.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Why Layer an API?** | 45 mins | 15 mins |
| The restaurant analogy: Controller = waiter, Service = kitchen, Model = ingredients. | - Each layer has exactly one job. | - (Lecture) Trace one request through all three layers on a whiteboard/diagram. |
| **Building the Controller** | 1 hour | 45 mins |
| `ReminderController.getAllReminders`, `.getReminderById`, etc. | - One exported object with one method per route. | - Create `src/controllers/reminderController.js`; move each route's logic in as a method. |
| **Reading Request Data** | 45 mins | 45 mins |
| `req.params.id`, `parseInt(..., 10)`. | - `const { reminder, notes } = req.body`. | - In `getReminderById`, read and respond with the requested `:id`. In `createReminder`, read and respond with the submitted `reminder`/`notes`. |
| **Wiring the Router to the Controller** | 30 mins | 30 mins |
| `router.get('/', ReminderController.getAllReminders)`. | - The router no longer contains any logic, only wiring. | - Update `reminderRoutes.js` to call controller methods instead of inline handlers. |

### Module 4: The Service and Model Layers

* **Learning Objectives:**
    * Create a Service layer that holds business logic, decoupled from HTTP.
    * Create a Model layer responsible only for data access.
    * Wire Controller → Service → Model together for all five operations.
    * Return proper JSON responses with correct HTTP status codes (200, 500 for now).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The Service Layer** | 45 mins | 45 mins |
| Business logic lives here, not in the controller. | - `src/services/reminderService.js`, one method per operation. | - Create `ReminderService` with methods that (for now) operate on an in-memory array. |
| **The Model Layer** | 45 mins | 45 mins |
| Only this layer will ever talk to the database. | - `src/models/reminderModel.js` — still backed by the in-memory array this week. | - Create `ReminderModel.getAll/findById/create/update/delete` operating on the shared array. |
| **Wiring It All Together** | 1 hour | 1 hour |
| Controller calls Service, Service calls Model. | - `res.status(200).json(data)` on success, `res.status(500).json(...)` in a `catch`. | - Update `ReminderController` to call `ReminderService`, and `ReminderService` to call `ReminderModel`, for all five routes. |
| **Testing With Postman** | 30 mins | 45 mins |
| A saved collection is a real deliverable, not busywork. | - One request per route, with example bodies for POST/PATCH. | - Build a Postman collection covering all 5 reminder routes and save it to the repo as `postman/reminders-api.postman_collection.json`. |

**Week 2 Assignment:** A fully layered, in-memory Reminders API.
* `routes/reminderRoutes.js` contains only routing — no logic.
* `controllers/reminderController.js` handles req/res only, delegating to the service.
* `services/reminderService.js` holds the business logic, delegating to the model.
* `models/reminderModel.js` reads/writes an in-memory array of reminders.
* A Postman collection in the repo exercises all 5 routes successfully.
* **Commit your changes**: e.g., "refactor: introduce Controller/Service/Model layers".

---

## Week 3: Databases with PostgreSQL (Raw SQL)

### Module 5: Connecting to a Real Database

* **Learning Objectives:**
    * Explain the tradeoffs between self-hosted, managed, and serverless databases.
    * Create a free serverless PostgreSQL database on Neon.
    * Install and configure `pg` (node-postgres) with a connection pool.
    * Store the database connection string safely in a `.env` file and load it with Node's native `--env-file` flag.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Choosing a Database** | 45 mins | 15 mins |
| Self-hosted vs. managed (AWS RDS) vs. serverless (Neon). | - Why serverless Postgres suits small, spiky projects. | - (Lecture) Compare the three on setup effort, cost, and control. |
| **Creating a Neon Project** | 30 mins | 30 mins |
| One project, one region close to your users. | - Copying the `DATABASE_URL` connection string. | - Create a free Neon account and project; copy the connection string into a `.env` file (never committed). |
| **Connecting with `pg`** | 1 hour | 45 mins |
| `npm install pg`; `new pg.Pool({ connectionString })`. | - Connection pooling vs. one connection per request. | - Create `src/config/db.js` exporting a configured `pg.Pool`. |
| **Verifying the Connection** | 30 mins | 30 mins |
| `node --env-file=.env src/config/db.js` runs a `SELECT version()` sanity check. | - Native `--env-file` needs no `dotenv` package on Node 20.6+. | - Run the check and confirm you see a real PostgreSQL version string back. |

### Module 6: Hand-Rolled Migrations & Raw SQL Queries

* **Learning Objectives:**
    * Explain what a database migration is and why schema changes need to be version-controlled.
    * Write `up()`/`down()` migration scripts using raw SQL (no migration library).
    * Create the `users` and `reminders` tables, including a foreign key relationship.
    * Rewrite `reminderModel.js` to run real parameterized SQL instead of touching an array.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What Are Migrations?** | 45 mins | 15 mins |
| Tools like Knex/Prisma automate this; here we hand-write it to see what they do under the hood. | - Timestamped filenames keep migrations ordered. | - (Lecture) Read through one `up()`/`down()` pair together. |
| **Creating the Tables** | 1 hour | 1 hour |
| `CREATE TABLE IF NOT EXISTS ...`, `SERIAL PRIMARY KEY`, `REFERENCES ... ON DELETE CASCADE`. | - `users(id, email UNIQUE, password_hash, created_at)`. | - Write `migrations/<timestamp>_create_users_table.js` and `..._create_reminders_table.js`; run both with `node --env-file=.env`. |
| **Parameterized Queries** | 1 hour | 1 hour |
| `db.query('SELECT * FROM reminders WHERE id = $1', [id])` — never string-concatenate SQL. | - Why `$1`/`$2` placeholders prevent SQL injection. | - Rewrite every `ReminderModel` method to run real SQL against the `reminders` table instead of the in-memory array. |
| **Dynamic Updates** | 45 mins | 30 mins |
| Building a `SET col = $1, col2 = $2` clause from whichever fields were sent. | - `Object.keys()`/`Object.values()` over the request body. | - Implement `update()` so a `PATCH` with just `{ completed: true }` only touches that column. |

**Week 3 Assignment:** The same layered API, now backed by real PostgreSQL.
* `users` and `reminders` tables exist in your Neon database, created by your own migration scripts.
* Every `ReminderModel` method runs parameterized SQL — no in-memory array left.
* Restarting the server does **not** lose any data — prove it in your PR description with a before/after `GET /reminders`.
* **Commit your changes**: e.g., "feat: persist reminders to PostgreSQL via raw SQL".

---

## Week 4: Authentication & Authorization

*(This week goes beyond the original reference tutorial, which hardcodes a single user id — here we build real login, because a real mobile app needs real accounts.)*

### Module 7: Signup & Login

* **Learning Objectives:**
    * Explain the difference between authentication (who are you) and authorization (what can you do).
    * Hash passwords with `bcrypt` — never store plaintext passwords.
    * Issue a signed JWT on successful signup/login.
    * Build `POST /auth/signup` and `POST /auth/login` as their own Controller/Service/Model trio.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Auth vs. Authorization** | 30 mins | 15 mins |
| "Who are you?" vs. "What are you allowed to do?" | - Where each check belongs in the request lifecycle. | - (Lecture) Diagram a login flow end to end. |
| **Hashing Passwords** | 1 hour | 45 mins |
| `npm install bcryptjs`; `bcrypt.hash(password, 10)` / `bcrypt.compare(...)`. | - Why hashing (not encrypting) passwords, and why a salt round cost of ~10-12. | - Build `authService.signup(email, password)`: hash the password, insert into `users`. |
| **Issuing a JWT** | 1 hour | 1 hour |
| `npm install jsonwebtoken`; `jwt.sign({ sub: user.id, email }, secret, { expiresIn: '1h' })`. | - Store `JWT_SECRET` in `.env`, never hardcode it. | - Build `authService.login(email, password)`: verify the hash, sign and return a token. |
| **The Auth Routes** | 45 mins | 45 mins |
| `routes/authRoutes.js` → `authController.js` → `authService.js` → `userModel.js`. | - Same layering as the reminders resource. | - Wire up `POST /auth/signup` and `POST /auth/login`, test both in Postman. |

### Module 8: Protecting Routes

* **Learning Objectives:**
    * Write Express middleware that verifies a JWT from the `Authorization` header.
    * Attach the authenticated user to `req.user`.
    * Protect every `/reminders` route with the auth middleware.
    * Scope every reminders query to the logged-in user, replacing any hardcoded user id.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The Auth Middleware** | 1 hour | 1 hour |
| `Authorization: Bearer <token>`; `jwt.verify(token, secret)`. | - Return `401` if the header is missing or the token is invalid. | - Write `middlewares/authMiddleware.js`; on success, set `req.user = { id: payload.sub, email: payload.email }`. |
| **Applying It to Reminders** | 45 mins | 45 mins |
| `router.use(authMiddleware)` at the top of `reminderRoutes.js`. | - Every reminders route now requires a valid token. | - Protect all 5 reminder routes; confirm Postman requests fail with 401 until a token is attached. |
| **Scoping Data to the User** | 1 hour | 1 hour |
| Add a `user_id` column via a new migration if not already present; every query filters `WHERE user_id = $1`. | - `getAllReminders(req.user.id)` instead of fetching everyone's reminders. | - Update every layer (Model → Service → Controller) so reminders are always scoped to `req.user.id`. |
| **Ownership on Delete/Update** | 45 mins | 30 mins |
| Check `reminder.user_id === req.user.id` before mutating; `403 Forbidden` otherwise. | - Never trust a client-supplied user id. | - Add this ownership check to `updateReminder` and `deleteReminder`. |

**Week 4 Assignment:** The same API, now with real accounts.
* `POST /auth/signup` and `POST /auth/login` work end to end, returning a JWT.
* Every `/reminders` route requires `Authorization: Bearer <token>` and returns `401` without one.
* Two different signed-up users only ever see their own reminders — prove it with two Postman requests using two different tokens.
* **Commit your changes**: e.g., "feat: add JWT authentication and scope reminders to the logged-in user".

---

## Week 5: Input Validation, Error Handling & Connecting the Mobile Client

### Module 9: Validation with Zod & Centralized Error Handling

* **Learning Objectives:**
    * Define Zod schemas describing exactly what a valid reminder looks like.
    * Build reusable `create`/`update` schema variants from one base schema.
    * Write a `validateData` middleware that runs a Zod schema against `req.body`.
    * Replace ad-hoc `throw new Error()` calls with a `CustomError` class carrying an HTTP status code, caught by one centralized error-handling middleware.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Why Validate at the Edge?** | 30 mins | 15 mins |
| Invalid data breaks things silently further downstream; validate before it enters the system. | - `npm install zod`. | - (Lecture) Show what happens today if `title` is missing from a `POST /reminders` body. |
| **Building the Schemas** | 1 hour | 1 hour |
| `z.object({...})`; `.omit({...})` to derive a create schema; a separate schema with everything `.optional()` for updates. | - `reminderSchema`, `createReminderSchema`, `updateReminderSchema` in `schemas/reminderSchema.js`. | - Write all three schemas matching the real `reminders` table shape (`title`, `notes`, `due_date`, `completed`). |
| **The Validation Middleware** | 45 mins | 45 mins |
| `validateData(schema)` returns `(req, res, next) => { schema.parse(req.body); next(); }`. | - On `ZodError`, respond `400` with readable field-level messages. | - Write `middlewares/validationMiddleware.js`; apply it to `POST` and `PATCH` reminder routes. |
| **Custom Errors + Central Handler** | 1 hour | 1 hour |
| `class CustomError extends Error { constructor(message, statusCode) {...} }`; one `errorHandlerMiddleware` registered last. | - `constants/errorMessages.js` keeps messages consistent and typo-free. | - Replace every `throw new Error(...)` in the service layer with `throw new CustomError(...)`; forward all controller catches to `next(error)`. |

### Module 10: Talking to a Real Mobile Client

* **Learning Objectives:**
    * Configure CORS so a mobile app can call this API from a different origin.
    * Review response shapes against what the React Native app (companion course) actually expects.
    * Test every endpoint from the real Expo app running on a phone/simulator, not just Postman.
    * Handle the practical reality of local development URLs (localhost vs. LAN IP vs. tunneled).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **CORS for Mobile** | 45 mins | 30 mins |
| `npm install cors`; `app.use(cors())`. | - Why CORS matters less for native apps than browsers, but still needs configuring for Expo's dev tools/web preview. | - Add and configure `cors` middleware. |
| **Reviewing the Contract** | 45 mins | 45 mins |
| Cross-check every response shape against the React Native course's expectations (Week 5 there). | - Consistent field naming (`title`, not `reminder`) end to end. | - Walk through each endpoint's JSON response with a partner (or the RN course notes) and fix any mismatches. |
| **Real-Device Testing** | 1 hour | 1.5 hours |
| `localhost` doesn't exist from a physical phone; use your machine's LAN IP or a tunnel. | - Finding your LAN IP; when to reach for `ngrok`/Expo tunnel instead. | - Point the actual Expo app (from the RN course) at this API and successfully sign up, log in, and load reminders on a real device. |
| **Fixing Real Integration Bugs** | 45 mins | 1 hour | 
| Integration bugs (CORS errors, shape mismatches, silent 401s) only show up once two real apps talk to each other. | - Reading React Native network errors and mapping them back to the Express side. | - Fix whatever actually breaks during the real-device test above. |

**Week 5 Assignment:** A validated, well-integrated API.
* Every `POST`/`PATCH` reminder request is validated by a Zod schema; invalid input returns a clear `400` with field-level messages.
* All thrown errors flow through the central `errorHandlerMiddleware` and return a consistent JSON error shape.
* The real Expo app from the React Native course can sign up, log in, and load/create/update/delete reminders against this API from a physical device or simulator.
* **Commit your changes**: e.g., "feat: add Zod validation and centralized error handling".

---

## Week 6 / Final Project: Testing, Security & Deployment

### Module 11: Automated Testing

* **Learning Objectives:**
    * Explain why automated tests catch regressions that manual Postman testing won't.
    * Write integration tests with Vitest and Supertest against the real auth + reminders endpoints.
    * Use a disposable test database (or a dedicated Neon branch) so tests don't corrupt real data.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Why Test an API?** | 30 mins | 15 mins |
| Manual testing doesn't scale and doesn't run automatically. | - Unit vs. integration tests. | - (Lecture) Show a regression that manual testing would likely miss. |
| **Setting Up Vitest + Supertest** | 45 mins | 45 mins |
| `npm install -D vitest supertest`. | - `supertest(app)` sends real HTTP requests to your Express app in-process. | - Configure Vitest, write a smoke test for `GET /health`. |
| **Testing the Real Endpoints** | 1.5 hours | 1.5 hours |
| Cover signup/login, and full reminders CRUD for an authenticated user. | - A Neon database branch as an isolated, disposable test database. | - Write tests for: signup, login, create/read/update/delete a reminder, and the 401/403 cases. |

### Module 12: Hardening & Shipping

* **Learning Objectives:**
    * Add baseline security middleware (`helmet`, rate limiting).
    * Add structured request logging.
    * Deploy the API to a free-tier host (Railway or Render) with a production Neon database.
    * Confirm the deployed API is the one the shipped React Native app talks to.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Security Headers & Rate Limiting** | 45 mins | 30 mins |
| `npm install helmet express-rate-limit`. | - Sensible defaults for a small public API. | - Add both middlewares to `src/index.js`. |
| **Logging** | 30 mins | 30 mins |
| A basic request logger (method, path, status, response time). | - Why silent failures in production are worse than noisy logs. | - Add a small logging middleware (or `morgan`). |
| **Deploying** | 1 hour | 1.5 hours |
| Railway/Render: connect the Github repo, set environment variables (`DATABASE_URL`, `JWT_SECRET`). | - Production vs. development environment variables. | - Deploy `reminders-api`; confirm the live URL responds to `GET /health`. |
| **Final Integration** | 30 mins | 1 hour |
| Point the React Native app's production build at the deployed URL. | - Environment-specific API base URLs. | - Confirm the shipped RN app (from the companion course) works end to end against the deployed API. |

**Week 6 / Final Project:** Ship the Reminders API.
* **Goal:** Combine everything from all 6 weeks into one live service.
* **Requirements:**
    1. **Architecture:** Full Controller/Service/Model layering for both `reminders` and `auth`.
    2. **Persistence:** Real PostgreSQL (Neon) via parameterized raw SQL — no in-memory data left anywhere.
    3. **Auth:** Signup/login with hashed passwords and JWTs; every reminder scoped to its owner.
    4. **Validation & Errors:** Every write endpoint validated with Zod; all errors flow through one central handler with correct status codes.
    5. **Tests:** Vitest + Supertest covering auth and full reminders CRUD, passing in CI or locally.
    6. **Deployment:** Live on Railway or Render, backed by a production Neon database, with environment secrets configured (not committed).
* **Final Deliverable:** A live API URL, a passing test suite, and a working end-to-end demo with the deployed React Native app from the companion course.
