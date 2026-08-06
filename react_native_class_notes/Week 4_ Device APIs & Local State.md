# Week 4: Device APIs & Local State

Your reminders work great — until you close the app. Right now everything lives in a JS variable that resets the moment the app process ends. This week: real persistence, and a genuinely useful native feature — local notifications that fire when a reminder is due.

---

## Module 7: Persisting Reminders with AsyncStorage

**Objective:** Make reminders survive an app restart.

### 1. Proving the Problem

Add a reminder, then force-quit the app (swipe it away from your phone's app switcher) and reopen it. Your reminder is gone. That's because `remindersStore.ts`'s `reminders` array is just a variable in memory — it only exists while the app process is running.

### 2. Installing AsyncStorage

```bash
npx expo install @react-native-async-storage/async-storage
```

`AsyncStorage` is a simple, async, persistent key-value store — think `localStorage` from the browser, but asynchronous and native. It only stores strings, so anything more complex (like our reminders array) needs to be serialized with `JSON.stringify`/`JSON.parse`.

### 3. Saving on Every Change

```tsx
// state/remindersStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'reminders';

// ...(Reminder type, reminders array, nextId, listeners from Week 3)...

async function persist() {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

export function addReminder(input: { title: string; notes?: string; dueDate?: Date }) {
  reminders = [
    ...reminders,
    {
      id: nextId++,
      title: input.title,
      notes: input.notes,
      dueDate: input.dueDate?.toISOString(),
      completed: false,
    },
  ];
  persist();
  listeners.forEach((listener) => listener());
}
```

### 4. Loading on Startup

```tsx
// state/remindersStore.ts
export async function loadReminders() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw) {
    reminders = JSON.parse(raw);
    const maxId = reminders.reduce((max, r) => Math.max(max, r.id), 0);
    nextId = maxId + 1;
  }
  listeners.forEach((listener) => listener());
}
```

```tsx
// app/_layout.tsx
import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { Text } from 'react-native';
import { loadReminders } from '../state/remindersStore';

export default function RootLayout() {
  useEffect(() => {
    loadReminders();
  }, []);

  return (
    <Stack>
      {/* ...existing Stack.Screen entries... */}
    </Stack>
  );
}
```

> **Note:** on a genuinely first run, `AsyncStorage.getItem` returns `null` — that's why `loadReminders` checks `if (raw)` before parsing, instead of assuming there's always something saved.

**⭐️ Class Exercise: Prove Persistence**

Add two reminders, force-quit the app, and reopen it. Confirm both reminders are still there — this is the actual bug from the start of this module, now fixed.

---

## Module 8: Local Notifications with `expo-notifications`

**Objective:** Schedule a real device notification for a reminder's due date.

### 1. Requesting Permission

Notifications require explicit user permission — and users can say no, so always handle that gracefully.

```bash
npx expo install expo-notifications
```

```tsx
// app/_layout.tsx (added to the existing useEffect)
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

useEffect(() => {
  loadReminders();
  Notifications.requestPermissionsAsync();
}, []);
```

### 2. Scheduling a Notification

When a reminder is saved with a due date, schedule a notification for that exact time:

```tsx
// state/remindersStore.ts
import * as Notifications from 'expo-notifications';

export async function addReminder(input: { title: string; notes?: string; dueDate?: Date }) {
  const id = nextId++;
  let notificationId: string | undefined;

  if (input.dueDate) {
    notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reminder',
        body: input.title,
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: input.dueDate },
    });
  }

  reminders = [
    ...reminders,
    {
      id,
      title: input.title,
      notes: input.notes,
      dueDate: input.dueDate?.toISOString(),
      completed: false,
      notificationId,
    },
  ];
  await persist();
  listeners.forEach((listener) => listener());
}
```

> **Note:** we only schedule a notification `if (input.dueDate)` — not every reminder needs one, and scheduling one for "right now" (no due date) wouldn't make sense.

### 3. Cancelling a Notification

If a reminder gets completed or deleted, its scheduled notification should be cancelled — otherwise the phone notifies about something that's no longer relevant.

```tsx
// state/remindersStore.ts
export async function deleteReminder(id: number) {
  const reminder = reminders.find((r) => r.id === id);
  if (reminder?.notificationId) {
    await Notifications.cancelScheduledNotificationAsync(reminder.notificationId);
  }
  reminders = reminders.filter((r) => r.id !== id);
  await persist();
  listeners.forEach((listener) => listener());
}

export async function toggleCompleted(id: number) {
  const reminder = reminders.find((r) => r.id === id);
  if (!reminder) return;
  reminder.completed = !reminder.completed;
  if (reminder.completed && reminder.notificationId) {
    await Notifications.cancelScheduledNotificationAsync(reminder.notificationId);
  }
  await persist();
  listeners.forEach((listener) => listener());
}
```

Add a way to mark a reminder complete — but tapping the row *already* means something: since Week 3, tapping a `ReminderListItem` navigates to edit it. Reusing the same tap for "toggle complete" would make the two features fight over one gesture, so completing needs its own, separate tappable area: a checkbox.

```tsx
// components/ReminderListItem.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { toggleCompleted } from '../state/remindersStore';

export default function ReminderListItem({ reminderItem }: { reminderItem: Reminder }) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/createUpdateReminder?id=${reminderItem.id}`)}
    >
      <Pressable
        style={styles.checkbox}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={() => toggleCompleted(reminderItem.id)}
      >
        {reminderItem.completed && <View style={styles.checkboxFill} />}
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={[styles.title, reminderItem.completed && styles.completedTitle]}>
          {reminderItem.title}
        </Text>
        {reminderItem.notes ? <Text style={styles.notes}>{reminderItem.notes}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderBottomWidth: 1, borderBottomColor: '#e5e5e5' },
  checkbox: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#D9793F',
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxFill: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#D9793F' },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  completedTitle: { textDecorationLine: 'line-through', color: '#999' },
  notes: { fontSize: 14, color: '#666' },
});
```

> **Two `Pressable`s, one row:** the outer `Pressable` handles tapping the row to edit; the inner one handles tapping just the checkbox to complete. React Native's touch system resolves this correctly on its own — tapping precisely on the checkbox fires only the checkbox's `onPress`, not the row's. **`hitSlop`** expands the checkbox's *tappable* area by 10px on each side without changing its *visual* size — the visible circle stays a clean 24px, but the actual touch target is closer to Apple's 44pt minimum, which a bare 24px box would fail on its own.

**⭐️ Class Exercise: Schedule and Verify**

Create a reminder with a due date 1-2 minutes in the future. Background the app (don't force-quit it) and wait — confirm you get a real notification at the scheduled time. Then create another, tap its checkbox to mark it complete immediately, and confirm its notification does *not* fire. Confirm tapping anywhere else on that same row still opens it for editing, not toggling complete.

---

## 📝 Week 4 Assignment: "Persistent, Notifying Reminders"

**Objective:** Reminders that survive a restart and notify at the right time — still entirely local, no backend yet.

### Requirements

1. Reminders are saved to and loaded from `AsyncStorage`; force-quitting and reopening the app does not lose data.
2. Creating a reminder with a due date schedules a real local notification for that exact time.
3. Marking a reminder complete, or deleting it, cancels its scheduled notification.
4. Tapping a reminder's checkbox toggles its completed state (strikethrough style), without also opening it for editing; tapping the rest of the row still opens it for editing.

### Git Workflow

* `git commit -m "feat: persist reminders with AsyncStorage"`
* `git commit -m "feat: schedule local notifications for reminder due dates"`
* `git commit -m "feat: cancel notifications on complete/delete"`
