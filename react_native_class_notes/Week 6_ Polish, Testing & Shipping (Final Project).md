# Week 6: Polish, Testing & Shipping — Ship the Reminders App

The app works end to end against a real, deployed backend. This final week: make it feel polished, prove it with real tests, and put an actual, installable build in your own hands (and, if you want, in front of real testers).

---

## Module 11: Polish & Tests

**Objective:** Add a touch of animation, and lock in confidence with component tests.

### 1. Animating the List with Reanimated

```bash
npx expo install react-native-reanimated
```

A subtle entrance/exit animation makes adding and removing reminders feel intentional instead of jarring:

```tsx
// components/ReminderListItem.tsx
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Pressable, Text, StyleSheet } from 'react-native';
import { toggleCompleted } from '../state/remindersStore';

// ...

export default function ReminderListItem({ reminderItem }: { reminderItem: Reminder }) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Pressable style={styles.container} onPress={() => toggleCompleted(reminderItem.id)}>
        <Text style={[styles.title, reminderItem.completed && styles.completedTitle]}>
          {reminderItem.title}
        </Text>
        {reminderItem.notes ? <Text style={styles.notes}>{reminderItem.notes}</Text> : null}
      </Pressable>
    </Animated.View>
  );
}
```

`Animated.View` from Reanimated wraps a regular `View` and adds declarative `entering`/`exiting` transitions — no manual `Animated.timing` setup required for this common case.

### 2. Setting Up Component Testing

```bash
npx expo install --dev jest-expo @testing-library/react-native
```

```json
// package.json
{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "preset": "jest-expo"
  }
}
```

### 3. Writing Component Tests

```tsx
// components/__tests__/ReminderListItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react-native';
import ReminderListItem from '../ReminderListItem';

test('renders the reminder title and notes', () => {
  render(
    <ReminderListItem
      reminderItem={{ id: 1, title: 'Buy milk', notes: 'Whole milk', completed: false }}
    />
  );
  expect(screen.getByText('Buy milk')).toBeTruthy();
  expect(screen.getByText('Whole milk')).toBeTruthy();
});

test('renders without notes when none are provided', () => {
  render(<ReminderListItem reminderItem={{ id: 2, title: 'Call the dentist', completed: false }} />);
  expect(screen.getByText('Call the dentist')).toBeTruthy();
  expect(screen.queryByText('Whole milk')).toBeNull();
});
```

**⭐️ Class Exercise: Test the Form's Validation**

Write a test for the create-reminder form: render it, attempt to save with an empty title (simulate pressing "Save" with `fireEvent`), and assert that no navigation/save call happened — the same empty-title validation you built back in Week 3.

---

## Module 12: Shipping with EAS

**Objective:** Produce a real installable build and get it in front of real testers.

### 1. Configuring EAS

```bash
npm install -g eas-cli
eas login
eas build:configure
```

This generates an `eas.json` with build profiles — typically `development`, `preview`, and `production` — each configuring things like whether the build includes dev tools or is store-ready.

### 2. Building

```bash
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

This runs in Expo's cloud build infrastructure — you don't need a Mac to build for iOS, or Android Studio installed locally, to build for Android. When it finishes, EAS gives you a link to install the build directly on a registered test device.

### 3. EAS Update — Shipping Fixes Without a Store Review

Once your app is built and installed, **EAS Update** lets you push JS-only changes (bug fixes, content tweaks) directly to users' installed apps — no app store review required. This only works for changes that don't touch native code; adding a new native module still requires a full rebuild.

```bash
eas update --branch preview --message "Fix reminder due-date formatting"
```

### 4. Submitting for Review

```bash
eas submit --platform ios
eas submit --platform android
```

This uploads your build to TestFlight (iOS) or Google Play's Internal Testing track (Android) — the standard way to get a real, not-yet-public build in front of real testers before a full public release.

**⭐️ Class Exercise: Get It On Your Phone**

Run a `preview` build for whichever platform matches your phone, install it via the link EAS gives you, and confirm it launches and works exactly like it did in Expo Go — but now it's a real, standalone app icon on your home screen.

---

## 📝 Week 6 / Final Project: Ship the Reminders App

**Goal:** Combine everything from all six weeks into one shipped, tested, polished app.

### Requirements

1. **Core flow, fully working:** signup/login, view reminders (`FlatList`), create/edit a reminder (shared modal), mark complete, delete — all against the live, deployed Node/Express API.
2. **Device features:** local due-date notifications still working after the Week 5 backend migration.
3. **Polish:** at least one Reanimated animation (e.g. list item entrance/exit).
4. **Tests:** component tests for `ReminderListItem` and the create/update form's validation, all passing (`npm test`).
5. **Shipped build:** a real EAS `preview` (or `production`) build installed on a physical device.
6. **Submission (stretch):** the build submitted to TestFlight or Play Internal Testing.

### Final Deliverable

Submit: your Github repo URL, a link to install your build (or a TestFlight/Play Store invite), and a short demo video showing the full flow — signup through to a completed, deleted reminder — running against the live, deployed backend.

### Git Workflow

* `git commit -m "feat: add Reanimated entrance/exit animations to reminder list"`
* `git commit -m "test: add component tests for ReminderListItem and the create form"`
* `git commit -m "chore: configure EAS and ship a preview build"`

Congratulations — you've built and shipped a real, full-stack mobile app: a React Native frontend talking to a real Node/Express backend, with real accounts, real persistence, and a real install on a real device. Everything from here (offline support, shared/collaborative lists, richer search) is a natural extension of the app you already understand end to end.
