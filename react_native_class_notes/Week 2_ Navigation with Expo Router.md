# Week 2: Navigation with Expo Router

Right now `reminders-app` has exactly one screen. This week we add a second one — the screen where reminders actually get created — and learn Expo Router, the file-based navigation system almost every modern Expo app uses.

---

## Module 3: File-Based Routing Fundamentals

**Objective:** Understand how Expo Router turns files into screens, and set up your app's root layout.

### 1. How Expo Router Works

Unlike traditional React Native navigation libraries (where you manually register every screen in code), **Expo Router** scans your `app/` directory and turns almost every file inside it into a screen automatically. If you've used Next.js, this will feel immediately familiar.

* `app/index.tsx` → the screen at `/` (your home screen — this is the file you built last week).
* `app/about.tsx` → a screen at `/about`.
* And so on, for any file you add.

> **Note:** `expo-router` is built on top of `react-navigation` under the hood — if you ever need lower-level control, that knowledge transfers directly.

### 2. Introducing `_layout.tsx`

By default, each route fills the entire screen, and moving between them is a full-screen transition. But native apps expect certain things to *persist* across screens — a header, a tab bar. That's what a **layout route** (`_layout.tsx`) is for: it wraps every screen nested inside it.

Create the root layout:

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack />;
}
```

`<Stack />` is a **stack navigator** — screens push on top of each other and can be popped back off, like a stack of cards. This root layout wraps *every* screen in the app, no matter where you navigate.

### 3. Navigating with `<Link>`

```tsx
// app/index.tsx (temporary, just to see navigation work)
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View>
      <Link href="/about">Go to About</Link>
    </View>
  );
}
```

```tsx
// app/about.tsx (temporary)
import { View, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <View>
      <Text>This is the about screen.</Text>
    </View>
  );
}
```

`<Link href="...">` is the declarative way to navigate — conceptually similar to an `<a>` tag, except Expo Router handles it natively (there's no real "page load" on native anyway).

**⭐️ Class Exercise: Navigate and Clean Up**

Confirm tapping the link takes you to the About screen and you can navigate back. Once you've seen it work, **delete** `app/about.tsx` and the `<Link>` — it was only there to demonstrate navigation; it's not part of the Reminders app.

---

## Module 4: The Create/Update Reminder Modal

**Objective:** Add the screen that will handle both creating and editing a reminder, presented as a modal.

### 1. Why One Screen for Both Create and Update?

Creating a new reminder and editing an existing one need the exact same fields and the exact same form UI — the only difference is whether you're starting from a blank reminder or from one that already has data. Rather than build two nearly-identical screens, the real app this course is based on uses **one** screen — `createUpdateReminder` — for both. Later, whether it's in "create" or "update" mode will just depend on whether an id was passed to it.

### 2. Adding the Screen

```tsx
// app/createUpdateReminder.tsx
import { View, Text } from 'react-native';

export default function CreateUpdateReminderScreen() {
  return (
    <View>
      <Text>New Reminder</Text>
    </View>
  );
}
```

Just creating this file already makes `/createUpdateReminder` a valid route — that's the whole point of file-based routing.

### 3. Presenting It as a Modal

Register it in the root layout with a **modal presentation** and a custom header:

```tsx
// app/_layout.tsx
import { Stack, router } from 'expo-router';
import { Text } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="createUpdateReminder"
        options={{
          presentation: 'modal',
          headerTitle: 'New Reminder',
          headerLeft: () => (
            <Text style={{ color: '#0E7AFE' }} onPress={() => router.back()}>
              Cancel
            </Text>
          ),
        }}
      />
    </Stack>
  );
}
```

* `presentation: 'modal'` makes this screen slide up from the bottom, like a native modal, instead of pushing in from the side.
* `headerLeft` lets you render a completely custom element in place of the default back button — here, a "Cancel" text that calls `router.back()`.
* `headerShown: false` on `index` hides the default header on the home screen, since we'll build our own title/add-button UI there.

### 4. Triggering Navigation From the Home Screen

```tsx
// app/index.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reminders</Text>
      <Pressable
        style={[styles.addButton, { bottom: 24 + insets.bottom }]}
        onPress={() => router.push('/createUpdateReminder')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 28, fontWeight: '700' },
  addButton: {
    position: 'absolute',
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0E7AFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { color: 'white', fontSize: 28 },
});
```

`Pressable` is React Native's general-purpose tappable component (a more flexible alternative to the older `TouchableOpacity`) — its `onPress` is the native equivalent of a web `onClick`.

> **Why `useSafeAreaInsets` instead of a hardcoded `bottom: 24`:** a hardcoded value looks fine on the simulator you happen to be testing on, then quietly collides with the home indicator on a real notched phone (or the navigation bar on Android) — because that reserved space isn't part of your layout at all unless you account for it. `react-native-safe-area-context` is already a transitive dependency of Expo Router, so nothing new to install here. `insets.bottom` is the exact height of whatever system UI is reserved at the bottom of *this specific device*, so `24 + insets.bottom` keeps the button a consistent 24px above it on every phone, notched or not.

**⭐️ Class Exercise: Full Round Trip**

Confirm tapping the "+" button slides up the modal with "New Reminder" as its title, and tapping "Cancel" dismisses it back to the home screen. This is the exact navigation shape the rest of this course builds on. On a physical device (not just the simulator), confirm the "+" button sits clearly above the home indicator / gesture bar, not overlapping it.

---

## 📝 Week 2 Assignment: "Two Connected Screens"

**Objective:** A home screen and a create-reminder modal, properly wired together via Expo Router.

### Requirements

1. `app/_layout.tsx` renders a root `<Stack />` registering both `index` (header hidden) and `createUpdateReminder` (modal presentation, "New Reminder" title, custom Cancel action).
2. `app/index.tsx` has a visible "+" button that navigates to `/createUpdateReminder`.
3. The modal's "Cancel" action correctly returns to the home screen via `router.back()`.
4. Any temporary demo files/links from Module 3 (`about.tsx`, the demo `<Link>`) have been removed.

### Git Workflow

* `git commit -m "feat: add Expo Router root layout with stack navigation"`
* `git commit -m "feat: add createUpdateReminder screen as a modal"`
* `git commit -m "feat: wire up navigation from home screen to the create modal"`
