# Week 1: From Web to Native — Expo & Core Components

Welcome to the React Native course! You already know React — components, JSX, props, hooks. What changes on mobile isn't React itself, it's *what you're rendering to*. Over the next six weeks you're building **one real app**: a Reminders app, an Apple Reminders clone, running on your actual phone. This week: get a project running, and build your very first real, reusable native component.

This course is designed to run alongside the **Node.js & Express course** — starting Week 5, this exact app will talk to the real API you (or a partner) build there.

---

## Module 1: Setting Up Your Expo Project

**Objective:** Get a real Expo project running on your phone, and understand what's fundamentally different about building for native.

### 1. What Is React Native? What Is Expo?

**React Native** lets you write UI in JSX and have it render to *real native components* — an actual iOS `UILabel` or Android `TextView` under the hood — instead of HTML elements in a browser. There's no DOM here at all.

**Expo** is the standard tooling layer almost everyone uses on top of React Native in 2026: a dev client, a huge library of pre-built native modules (camera, location, notifications...) that you don't have to write native code for, and a cloud build service (EAS) so you don't need a Mac to build an iOS app.

Install the **Expo Go** app on your phone from the App Store or Play Store — that's how you'll preview your app as you build it this week.

### 2. Scaffolding the Project

```bash
npx create-expo-app reminders-app --template blank-typescript
cd reminders-app
npx expo start
```

This gives you a TypeScript project — we'll use `.tsx` files throughout this course, matching the real reference this course is built from.

`npx expo start` prints a QR code in your terminal. Scan it with your phone's camera (iOS) or the Expo Go app (Android), and the default starter app loads on your actual device.

**⭐️ Class Exercise: Confirm Hot Reload**

With the app running on your phone, open `App.tsx` (or `app/index.tsx`, depending on template version), change some visible text, and save. Watch it update on your phone within a second or two — that's hot reload, and you'll rely on it constantly.

### 3. Web React vs. React Native — What Actually Changes

| Web React | React Native |
| :--- | :--- |
| `<div>`, `<span>`, `<p>` | `<View>`, `<Text>` |
| CSS files / classNames | `StyleSheet.create({...})` — JS objects |
| Default layout: block (stacks vertically by default for block elements) | Default layout: **Flexbox, `flexDirection: 'column'`**, always |
| `onClick` | `onPress` |
| Renders to the DOM | Renders to real native UI components |

Nothing about *how* you think in components, props, and state changes. What changes is the vocabulary of what you render and how you style it.

---

## Module 2: Your First Real Component — `ReminderListItem`

**Objective:** Learn the core building-block components, then build your first real, reusable component the same way the reference app does it — hardcode first, then extract.

### 1. `View` and `Text`

```tsx
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
      <Text>Buy milk</Text>
      <Text>Whole milk, not skim</Text>
    </View>
  );
}
```

* `View` is the native equivalent of a `<div>` — a generic container.
* `Text` is required to wrap **any** text at all. Unlike web, you can't put a raw string inside a `View` — it has to be inside a `Text`.

> **Note:** why `{}` inside `<Text>`? JSX treats everything inside a tag as plain text by default. To render a dynamic JavaScript value — a variable, an expression, a function call — you wrap it in curly braces so JSX knows to *evaluate* it instead of printing it literally. `<Text>{reminderItem.title}</Text>` prints the title's actual value; `<Text>reminderItem.title</Text>` would print the literal string "reminderItem.title".

### 2. Displaying a Reminder (Hardcoded First)

Open `app/index.tsx` (Expo Router's default home screen — more on the `app/` folder next week) and render one hardcoded reminder:

```tsx
// app/index.tsx
import { View, Text } from 'react-native';

export default function HomeScreen() {
  const reminderItem = { id: 1, title: 'Buy milk', notes: 'Whole milk, not skim' };

  return (
    <View>
      <Text>{reminderItem.title}</Text>
      <Text>{reminderItem.notes}</Text>
    </View>
  );
}
```

This works, but it has the same problem any hardcoded UI has: adding a second reminder means copy-pasting the whole block, and the file gets messier every time you add more logic.

### 3. Extracting `ReminderListItem`

Move the reminder-rendering logic into its own, reusable component:

```bash
mkdir components
touch components/ReminderListItem.tsx
```

```tsx
// components/ReminderListItem.tsx
import { View, Text } from 'react-native';

export default function ReminderListItem() {
  const reminderItem = { id: 1, title: 'Buy milk', notes: 'Whole milk, not skim' };

  return (
    <View>
      <Text>{reminderItem.title}</Text>
      <Text>{reminderItem.notes}</Text>
    </View>
  );
}
```

```tsx
// app/index.tsx
import { View } from 'react-native';
import ReminderListItem from '../components/ReminderListItem';

export default function HomeScreen() {
  return (
    <View>
      <ReminderListItem />
    </View>
  );
}
```

This is already better: manageable (no copy-pasting to add more), reusable (`ReminderListItem` can go anywhere), and scalable (change it in one place, every usage updates).

### 4. Passing Data with Props

Right now every `<ReminderListItem />` would show the exact same hardcoded reminder. To make it dynamic, pass the actual reminder data down as a **prop** — exactly the same mechanism you already know from web React.

```tsx
// components/ReminderListItem.tsx
import { View, Text } from 'react-native';

type Reminder = {
  id: number;
  title: string;
  notes?: string;
};

export default function ReminderListItem({ reminderItem }: { reminderItem: Reminder }) {
  return (
    <View>
      <Text>{reminderItem.title}</Text>
      {reminderItem.notes ? <Text>{reminderItem.notes}</Text> : null}
    </View>
  );
}
```

```tsx
// app/index.tsx
import { View } from 'react-native';
import ReminderListItem from '../components/ReminderListItem';

const reminders = [
  { id: 1, title: 'Buy milk', notes: 'Whole milk, not skim' },
  { id: 2, title: 'Call the dentist' },
];

export default function HomeScreen() {
  return (
    <View>
      <ReminderListItem reminderItem={reminders[0]} />
      <ReminderListItem reminderItem={reminders[1]} />
    </View>
  );
}
```

We destructure `{ reminderItem }` directly in the function signature instead of writing `props.reminderItem` everywhere — cleaner, and it's the same pattern you used constantly in the React course.

> **Note:** notice `reminderItem.notes ? <Text>...</Text> : null` — the second reminder has no `notes` at all. This is the exact same conditional-rendering pattern (ternary operator) from the React course; it works identically here.

### 5. Basic Styling with `StyleSheet`

```tsx
// components/ReminderListItem.tsx
import { View, Text, StyleSheet } from 'react-native';

// ...

export default function ReminderListItem({ reminderItem }: { reminderItem: Reminder }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{reminderItem.title}</Text>
      {reminderItem.notes ? <Text style={styles.notes}>{reminderItem.notes}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  notes: {
    fontSize: 14,
    color: '#666',
  },
});
```

`StyleSheet.create()` doesn't do anything magical — it's mostly a plain JS object of styles, with a small performance optimization (styles get sent to the native side once instead of on every render). The property names (`fontWeight`, `borderBottomWidth`) are camelCase versions of familiar CSS concepts, but there's no cascading — a style only applies to the exact component you attach it to.

**⭐️ Class Exercise: A Third Reminder**

Add a third hardcoded reminder object (with a due date field, e.g. `dueDate: '2026-08-10'`, even though we won't display or use it until Week 3) and render it as a third `<ReminderListItem />`. Confirm all three render correctly with distinct titles.

---

## 📝 Week 1 Assignment: "Bootstrap the Reminders App"

**Objective:** A running Expo app on your own phone, showing real reminders through a real, reusable component.

### Requirements

1. **Project:** `reminders-app`, a TypeScript Expo project, running via `npx expo start` and viewable on your phone through Expo Go.
2. **Component:** `components/ReminderListItem.tsx` accepts a `reminderItem` prop (`{ id, title, notes? }`) and renders it with `View`/`Text`/`StyleSheet`.
3. **Screen:** `app/index.tsx` renders **at least two** `<ReminderListItem />` instances with different hardcoded reminder data.
4. **Styling:** Each reminder is visually distinct (padding, a separating line, a bold title) — not just plain unstyled text.

### Git Workflow

* `git init`, push to a new `reminders-app` repository on Github.
* Suggested commits:
  * `git commit -m "feat: scaffold Expo TypeScript project"`
  * `git commit -m "feat: build ReminderListItem component"`
  * `git commit -m "feat: render multiple reminders with props"`
