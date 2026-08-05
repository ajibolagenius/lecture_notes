# Comprehensive React Native Course: From Web to Native with Expo

## Course Overview

* **Target Audience:** Developers who have completed the HTML, CSS, JavaScript, and React courses in this program (comfortable with JSX, components, hooks, and state — this course focuses on what's *different* building for mobile, not on re-teaching React itself).
* **Tools:** Node.js 24.x (LTS), the Expo Go app on a physical phone (or Android Studio / Xcode for a simulator), VS Code, an Expo account, and Git/Github.
* **Goal:** Take one real mobile app — a Reminders app, an Apple Reminders clone — from an empty Expo project to a real, installable app on your phone, backed by a real production API.

This course has one product for its entire duration: **the Reminders app**. Every module is a real build-step on this one codebase, not a disposable example — the same components and screens you build in Week 1 are the ones you ship in Week 6. This course is designed to be taken alongside the **Node.js & Express course**, whose Reminders API this app calls starting in Week 5. Reference stack: Expo SDK 54 (React Native 0.81, React 19.1), Expo Router 6 — check for a newer stable Expo SDK before you start, since Expo ships a new one roughly every three months.

---

## Week 1: From Web to Native — Expo & Core Components

### Module 1: Setting Up Your Expo Project

* **Learning Objectives:**
    * Explain what Expo is and why it's the standard way to start a React Native project in 2026.
    * Install the Expo Go app and run a project on a physical device.
    * Scaffold a new TypeScript Expo project and understand its folder structure.
    * Explain the biggest structural differences between web React and React Native.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **What Is React Native / Expo?** | 45 mins | 15 mins |
| React Native renders to real native UI components, not the DOM. Expo is the standard tooling layer on top of it (dev client, build service, native APIs). | - No browser, no DOM, no CSS files. | - Install Expo Go on your phone from the App Store / Play Store. |
| **Scaffolding a Project** | 45 mins | 45 mins |
| `npx create-expo-app`. | - TypeScript template. | - Run `npx create-expo-app reminders-app --template blank-typescript`, `cd` in, `npx expo start`. |
| **Running on a Device** | 30 mins | 30 mins |
| Scanning the QR code with Expo Go. | - Hot reload while you edit. | - Confirm the default app loads on your phone; edit a line of text and watch it hot-reload. |
| **Web React vs. Native** | 45 mins | 30 mins |
| No `<div>`/`<span>` — everything is `View`/`Text`. No CSS — `StyleSheet.create()`. Everything defaults to Flexbox `column` (not `row`, like web's default `block`). | - Why there's no "cascading" stylesheet on native. | - (Lecture) Compare a simple web layout to its RN equivalent side by side. |

### Module 2: Your First Real Component — `ReminderListItem`

* **Learning Objectives:**
    * Use the core components: `View`, `Text`, `StyleSheet`.
    * Understand why hardcoding UI first, then extracting a component, is a useful way to build.
    * Create a reusable `ReminderListItem` component and receive data via props.
    * Understand why curly braces `{}` are needed to render dynamic values inside `<Text>`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Core Components** | 45 mins | 30 mins |
| `View` (like a `div`), `Text` (all text *must* be inside one), `StyleSheet.create()`. | - Styles are JS objects, not CSS strings. | - Render a hardcoded reminder's title and notes inside `app/index.tsx` using `View`/`Text`. |
| **Why `{}` Inside `<Text>`?** | 30 mins | 15 mins |
| JSX treats `<Text>` contents as plain text by default; `{}` tells it to evaluate a JS expression instead. | - `<Text>{reminderItem.title}</Text>` vs. a typo like `<Text>reminderItem.title</Text>`. | - (Lecture) Show what happens if you forget the curly braces. |
| **Extracting `ReminderListItem`** | 1 hour | 1 hour |
| One hardcoded block → a reusable component. | - `components/ReminderListItem.tsx`. | - Create the component, move the reminder-rendering JSX into it, import it back into `index.tsx`. |
| **Passing Props** | 45 mins | 45 mins |
| `<ReminderListItem reminderItem={...} />`; destructure `{ reminderItem }` in the component signature. | - Props flow one direction: parent → child. | - Render **two** different hardcoded reminders using two `<ReminderListItem />` instances with different props. |

**Week 1 Assignment:** A running app showing two real reminders.
* `reminders-app` is a TypeScript Expo project, running on your phone via Expo Go.
* `components/ReminderListItem.tsx` exists and receives a `reminderItem` prop (with `title` and `notes`).
* `app/index.tsx` renders two `<ReminderListItem />` instances with two different hardcoded reminder objects.
* **Commit your changes**: e.g., "feat: scaffold Expo project and build ReminderListItem component".

---

## Week 2: Navigation with Expo Router

### Module 3: File-Based Routing Fundamentals

* **Learning Objectives:**
    * Explain Expo Router's file-based routing model (every file in `app/` becomes a screen).
    * Understand how `index.tsx` becomes a route's default screen.
    * Create a root `_layout.tsx` and understand what a layout route does.
    * Navigate between screens with `<Link>`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **File-Based Routing** | 45 mins | 30 mins |
| Every file inside `app/` automatically becomes a screen at a matching URL. If you know Next.js, this will feel familiar. | - `app/index.tsx` → `/`. | - Confirm `app/index.tsx` (from Week 1) is already being treated as the home screen. |
| **Introducing `_layout.tsx`** | 1 hour | 45 mins |
| Routes fill the whole screen by default; a layout route wraps every screen inside it (shared headers, tab bars, providers). | - `<Stack />` from `expo-router`. | - Create `app/_layout.tsx` exporting a `RootLayout` that renders `<Stack />`. |
| **Navigating with `<Link>`** | 45 mins | 45 mins |
| `<Link href="...">` navigates declaratively, like an `<a>` tag but native-aware. | - No full-page reloads on native anyway — but `<Link>` is still the standard API. | - Add a temporary second screen (`app/about.tsx`) and a `<Link>` to it from `index.tsx`, just to see navigation work, then remove it. |

### Module 4: The Create/Update Reminder Modal

* **Learning Objectives:**
    * Register a second screen in the root layout as a modal presentation.
    * Understand why one screen can serve both "create" and "update" — it's the same form either way.
    * Customize a screen's header (title, a custom "Cancel" action) via `Stack.Screen options`.
    * Navigate to and back from a modal with `router.back()`.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **One Screen, Two Purposes** | 30 mins | 15 mins |
| Creating and editing a reminder need the same fields and the same form — no reason to build two separate screens. | - Whether it's "create" or "update" can be decided by whether an id was passed in. | - (Lecture) Sketch the form once, mentally reuse it for both cases. |
| **Adding `createUpdateReminder.tsx`** | 1 hour | 1 hour |
| A new file in `app/` is automatically a new route. | - For now, just a `View`/`Text` placeholder ("New Reminder"). | - Create `app/createUpdateReminder.tsx` with placeholder content. |
| **Presenting It As a Modal** | 1 hour | 45 mins |
| `<Stack.Screen name="createUpdateReminder" options={{ presentation: 'modal', headerTitle: 'New Reminder' }} />` inside `_layout.tsx`. | - A custom header-left "Cancel" button using `router.back()`. | - Register the screen in `_layout.tsx` with modal presentation and a Cancel action. |
| **Triggering Navigation** | 30 mins | 30 mins |
| A "+" button on the home screen navigating to the modal. | - `router.push('/createUpdateReminder')`. | - Add a floating "+" button to `index.tsx` that opens the modal, and confirm Cancel closes it. |

**Week 2 Assignment:** Two connected screens.
* `app/_layout.tsx` renders a root `<Stack />` registering both `index` and `createUpdateReminder` (as a modal, with a "New Reminder" title and a Cancel action).
* Tapping a "+" button on the home screen opens the create-reminder modal; Cancel returns to the home screen.
* **Commit your changes**: e.g., "feat: add Expo Router root layout and create/update reminder modal".

---

## Week 3: Lists, Forms & User Input

### Module 5: Rendering a Real List with `FlatList`

* **Learning Objectives:**
    * Explain why manually repeating `<ReminderListItem />` doesn't scale.
    * Use `FlatList`'s `data` and `renderItem` props to render an array dynamically.
    * Understand `FlatList`'s built-in performance benefit (only rendering visible items).

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The Problem With Hardcoding** | 30 mins | 15 mins |
| Two hardcoded `<ReminderListItem />`s doesn't scale to hundreds of reminders, and can't reflect new ones added later. | - (Lecture) Imagine 200 reminders — copy-pasting isn't an option. | - (Lecture) Look back at Week 1's hardcoded `index.tsx`. |
| **Introducing `FlatList`** | 1 hour | 1 hour |
| `FlatList` efficiently renders large scrollable lists, only mounting what's on screen (like an Instagram feed). | - `data` (the array) and `renderItem={({ item }) => ...}` (how to render each one). | - Replace the two hardcoded components with a `FlatList` over a local array of 4-5 reminder objects. |
| **Why `{ item }`, Not `data[0]`?** | 30 mins | 15 mins |
| `renderItem` is called once per array element; `item` is *that* element, not always the first one. | - This is what makes it dynamic instead of always showing the same reminder. | - (Lecture) Deliberately use `data[0]` instead of `item` and see every row render identically — then fix it. |

### Module 6: Building the Reminder Form

* **Learning Objectives:**
    * Build controlled `TextInput`s for a reminder's title and notes.
    * Add a date picker for an optional due date.
    * Hold form state with `useState` and validate before submitting.
    * Push a newly created reminder into the shared list state.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Controlled `TextInput`** | 1 hour | 1 hour |
| `<TextInput value={title} onChangeText={setTitle} />` — same controlled-input pattern from the React course, just a different component. | - `multiline` for the notes field. | - Build the form in `createUpdateReminder.tsx` with `title` and `notes` fields, each backed by its own `useState`. |
| **A Due Date Picker** | 1 hour | 45 mins |
| `@react-native-community/datetimepicker` (installed via `npx expo install`). | - Storing the picked date as a JS `Date`, converting to an ISO string for submission. | - Add an optional due-date field using the native date picker. |
| **Submitting the Form** | 1 hour | 1 hour |
| A "Save" button in the header, validating that `title` isn't empty before proceeding. | - `router.back()` after a successful save. | - Wire the Save button to push a new reminder object into a shared list (lifted into `_layout.tsx` or a simple module-level store for now — a real backend arrives in Week 5). |

**Week 3 Assignment:** A working create flow, end to end (locally).
* `app/index.tsx` renders reminders via `FlatList`, not hardcoded components.
* `app/createUpdateReminder.tsx` has working `title`/`notes`/due-date fields.
* Saving the form adds the new reminder to the list, visible immediately back on the home screen.
* **Commit your changes**: e.g., "feat: render reminders with FlatList and build the create reminder form".

---

## Week 4: Device APIs & Local State

### Module 7: Persisting Reminders with AsyncStorage

* **Learning Objectives:**
    * Explain why in-memory state alone doesn't survive an app restart.
    * Install and use `@react-native-async-storage/async-storage`.
    * Load persisted reminders on app start and save on every change.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **The Problem** | 30 mins | 15 mins |
| Close and reopen the app right now — every reminder is gone. State held only in `useState` disappears when the app process ends. | - (Lecture) Demonstrate the data loss. | - Confirm it yourself: add a reminder, force-quit the app, reopen it. |
| **AsyncStorage Basics** | 1 hour | 1 hour |
| `npx expo install @react-native-async-storage/async-storage`; `AsyncStorage.getItem`/`setItem`, both async, storing strings (so `JSON.stringify`/`JSON.parse`). | - A simple key like `'reminders'`. | - Save the reminders array to AsyncStorage every time it changes. |
| **Loading on Startup** | 1 hour | 45 mins |
| Read from AsyncStorage inside a `useEffect(() => {...}, [])` on the home screen (or a shared context/provider). | - Handling the "nothing saved yet" first-run case. | - Load any previously-saved reminders when the app starts, falling back to an empty array. |

### Module 8: Local Notifications with `expo-notifications`

* **Learning Objectives:**
    * Request notification permissions from the user.
    * Schedule a local notification for a reminder's due date.
    * Cancel a scheduled notification when a reminder is completed or deleted.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Requesting Permission** | 45 mins | 30 mins |
| `npx expo install expo-notifications`; `Notifications.requestPermissionsAsync()`. | - Users can deny permission — always handle that case gracefully. | - Ask for notification permission on first app launch. |
| **Scheduling a Notification** | 1 hour | 1 hour |
| `Notifications.scheduleNotificationAsync({ content, trigger })`, with `trigger` set to the reminder's `dueDate`. | - Only schedule one if a due date was actually set. | - When saving a reminder with a due date, schedule a local notification for that time. |
| **Cancelling a Notification** | 45 mins | 45 mins |
| Store the returned notification id alongside the reminder; `Notifications.cancelScheduledNotificationAsync(id)`. | - Cancel when a reminder is marked complete or deleted. | - Wire up cancellation for both cases. |

**Week 4 Assignment:** Reminders that survive and notify.
* Reminders persist in AsyncStorage and reload correctly after a full app restart.
* Creating a reminder with a due date schedules a real local notification.
* Completing or deleting a reminder cancels its scheduled notification.
* **Commit your changes**: e.g., "feat: persist reminders locally and schedule due-date notifications".

---

## Week 5: Networking — Connecting to the Real Backend

*(Depends on the Node/Express course, Weeks 1-4 — you need a real running Reminders API before this week's work makes sense.)*

### Module 9: Real Authentication

* **Learning Objectives:**
    * Add an `(auth)` route group (login/signup) and a `(protected)` route group (the rest of the app) — the exact pattern Expo Router's own docs describe conceptually, now actually used.
    * Build login and signup screens calling the real `/auth/login` and `/auth/signup` endpoints.
    * Store the returned JWT securely with `expo-secure-store`.
    * Redirect between the `(auth)` and `(protected)` groups based on whether a token exists.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Route Groups** | 1 hour | 45 mins |
| `(auth)` and `(protected)` — parenthesized folder names don't appear in the URL, they're purely organizational. | - Expo Router resolves the initial screen by scanning for the first valid `index.tsx`, in this case inside `(protected)`. | - Restructure `app/` into `(auth)/login.tsx`, `(auth)/signup.tsx`, and move the existing screens into `(protected)/`. |
| **Building the Auth Screens** | 1.5 hours | 1.5 hours |
| Controlled `TextInput`s for email/password, calling the real API. | - Showing a clear error message on a failed login. | - Build `(auth)/login.tsx` and `(auth)/signup.tsx`, each calling the Node/Express course's `/auth/login` / `/auth/signup`. |
| **Storing the Token Securely** | 45 mins | 45 mins |
| `npx expo install expo-secure-store`; encrypted, not plain AsyncStorage — appropriate for a JWT. | - `SecureStore.setItemAsync('token', jwt)` / `getItemAsync`. | - Store the token on successful login/signup. |
| **Redirecting Based on Auth State** | 1 hour | 1 hour |
| Check for a stored token on app start; redirect to `(auth)` if missing, `(protected)` if present. | - `router.replace(...)` so the user can't navigate "back" into a screen they shouldn't see. | - Wire up the redirect logic in the root `_layout.tsx`. |

### Module 10: Real Data with TanStack Query

* **Learning Objectives:**
    * Explain what TanStack Query gives you over manual `useState`/`useEffect` data fetching.
    * Build `services/reminderService.ts`, a typed client wrapping every reminders endpoint.
    * Replace AsyncStorage-backed local state with live `useQuery`/`useMutation` calls to the real API.
    * Implement optimistic updates so the UI feels instant.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Why TanStack Query?** | 45 mins | 15 mins |
| Handles loading/error state, caching, deduplication, and background refetching — instead of hand-rolling all of it with `useState`/`useEffect` every time. | - `npx expo install @tanstack/react-query`. | - (Lecture) Compare the manual `useEffect` fetch pattern to `useQuery` side by side. |
| **Setting Up the Query Client** | 45 mins | 45 mins |
| `new QueryClient()`, wrap the app in `<QueryClientProvider>` inside `_layout.tsx`. | - This has to wrap everything that uses `useQuery`/`useMutation`. | - Add the provider to the root layout. |
| **Building `reminderService.ts`** | 1 hour | 1 hour |
| One function per endpoint (`getReminders`, `createReminder`, `updateReminder`, `deleteReminder`), attaching the stored JWT as an `Authorization` header on every call. | - Reading the token from `expo-secure-store` inside the service. | - Create `services/reminderService.ts` wrapping every reminders endpoint from the Node/Express API. |
| **`useQuery` and `useMutation`** | 1.5 hours | 1.5 hours |
| `useQuery({ queryKey: ['reminders'], queryFn: getReminders })` on the home screen; `useMutation` for create/update/delete, calling `queryClient.invalidateQueries` (or an optimistic update) on success. | - Replacing all the AsyncStorage read/write logic from Week 4. | - Wire `index.tsx` and `createUpdateReminder.tsx` to the real API through TanStack Query, removing the local-only storage logic. |

**Week 5 Assignment:** The app, fully backed by the real API.
* `(auth)`/`(protected)` route groups exist; unauthenticated users land on login/signup, authenticated users land on the reminders list.
* Login/signup call the real Node/Express endpoints and store a real JWT in `expo-secure-store`.
* All reminders CRUD goes through `services/reminderService.ts` and TanStack Query — no more local-only data.
* **Commit your changes**: e.g., "feat: add real authentication and connect reminders to the live API".

---

## Week 6 / Final Project: Polish, Testing & Shipping

### Module 11: Polish & Tests

* **Learning Objectives:**
    * Add subtle animation polish with `react-native-reanimated`.
    * Write component tests with Jest (`jest-expo`) and React Native Testing Library.
    * Test `ReminderListItem` and the create/update form in isolation.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Animating the List** | 1 hour | 1 hour |
| `react-native-reanimated`'s `entering`/`exiting` layout animations on `FlatList` items. | - A subtle fade/slide when a reminder is added or removed. | - Add an entrance animation to `ReminderListItem`. |
| **Setting Up Testing** | 45 mins | 45 mins |
| `jest-expo` preset, `@testing-library/react-native`. | - `npx expo install -- --dev jest-expo @testing-library/react-native`. | - Configure Jest for the project. |
| **Writing Component Tests** | 1.5 hours | 1.5 hours |
| Rendering `ReminderListItem` with a mock prop and asserting the title/notes appear; simulating a form submission. | - `render()`, `fireEvent`, `screen.getByText(...)`. | - Write tests for `ReminderListItem` and the create-reminder form's validation (empty title blocked). |

### Module 12: Shipping with EAS

* **Learning Objectives:**
    * Configure EAS Build for iOS and Android.
    * Produce a real installable build and install it on a device.
    * Understand EAS Update for shipping JS-only fixes without a full app-store review.
    * Submit a build to TestFlight or Play Internal Testing.

| Topic | Lecture/Concept (Est. Time) | Practical Exercise (Est. Time) |
| :--- | :--- | :--- |
| **Configuring EAS** | 45 mins | 45 mins |
| `npm install -g eas-cli`; `eas build:configure`. | - `eas.json` build profiles (development/preview/production). | - Configure EAS for this project. |
| **Building** | 1 hour | 1.5 hours |
| `eas build --platform ios` / `--platform android`. | - Cloud builds — no local Xcode/Android Studio setup strictly required. | - Kick off a preview build and install it on a device once it finishes. |
| **EAS Update** | 30 mins | 30 mins |
| Ship a JS-only bug fix instantly, without waiting on app store review. | - What EAS Update can and can't fix (no native code changes). | - (Lecture) Explain when EAS Update applies and when a full rebuild is required. |
| **Submitting for Review** | 45 mins | 1 hour |
| `eas submit`, TestFlight (iOS) or Play Internal Testing (Android). | - Store listing basics: app name, icon, screenshots. | - Submit a build to TestFlight or Play Internal Testing. |

**Week 6 / Final Project:** Ship the Reminders app.
* **Goal:** Combine everything from all 6 weeks into one shipped app.
* **Requirements:**
    1. **Core flow:** login/signup, view reminders (`FlatList`), create/edit a reminder (shared modal), mark complete, delete.
    2. **Backend:** fully connected to the deployed Node/Express API from the companion course — no local-only data left.
    3. **Device features:** local due-date notifications working.
    4. **Polish:** at least one Reanimated animation.
    5. **Tests:** component tests for `ReminderListItem` and the create/update form, passing.
    6. **Shipped build:** a real EAS build installed on a physical device, submitted to TestFlight or Play Internal Testing.
* **Final Deliverable:** A link to your installable build (or TestFlight/Play invite), your Github repo, and a short demo video showing the full flow against the live, deployed API.
