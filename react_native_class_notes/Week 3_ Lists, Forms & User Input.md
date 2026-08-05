# Week 3: Lists, Forms & User Input

Your app has two screens and a component that can render one reminder — but you're still hardcoding two `<ReminderListItem />`s by hand, and the "New Reminder" modal doesn't actually do anything yet. This week: a real dynamic list (tuned to stay smooth as it grows), and a real, working form that creates, edits, *and* deletes a reminder.

---

## Module 5: Rendering a Real List with `FlatList`

**Objective:** Replace hardcoded components with a real, dynamic, scrollable list.

### 1. The Problem With Hardcoding

Right now, adding a reminder means writing a new `<ReminderListItem reminderItem={...} />` by hand in `index.tsx`. That doesn't scale to real usage — you'd need hundreds of copy-pasted lines for a user with hundreds of reminders, and there's no way to reflect reminders added *after* the app was built.

### 2. Introducing `FlatList`

`FlatList` is React Native's component for efficiently rendering large, scrollable lists — think an Instagram feed. It only renders what's actually visible on screen, which matters a lot once a list gets long.

`FlatList` needs two key props:
* `data` — the array of items to render.
* `renderItem` — a function describing how to render *each* item.

```tsx
// app/index.tsx
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ReminderListItem from '../components/ReminderListItem';

const reminders = [
  { id: 1, title: 'Buy milk', notes: 'Whole milk, not skim' },
  { id: 2, title: 'Call the dentist' },
  { id: 3, title: 'Finish React Native assignment', notes: 'Due Friday' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ReminderListItem reminderItem={item} />}
      />
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
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  addButton: {
    position: 'absolute', right: 24, width: 56, height: 56,
    borderRadius: 28, backgroundColor: '#0E7AFE', alignItems: 'center', justifyContent: 'center',
  },
  addButtonText: { color: 'white', fontSize: 28 },
});
```

> **Note:** `keyExtractor` tells `FlatList` how to get a stable, unique string key for each item — exactly the same purpose the `key` prop served on `.map()` in the React course, just spelled differently for `FlatList`'s API.

### 3. Why `{ item }`, Not `data[0]`?

`renderItem` gets called **once per element** in the array. The `{ item }` you destructure inside `renderItem={({ item }) => ...}` is *that specific element* — not always the first one. If you wrote `data[0]` instead, every single row would render the exact same (first) reminder, no matter how many are in the array.

**⭐️ Class Exercise: Prove It Scales**

Add three more hardcoded reminders to the `reminders` array (six total) and confirm all six render correctly and scroll smoothly — without touching a single line of `ReminderListItem` or the `FlatList` setup itself. That's the payoff of doing this properly.

### 4. Performance: Keeping Long Lists Smooth

* **Lecture & Concepts:**
    * `FlatList` already only renders what's on screen — but two more things matter once a list gets genuinely long (hundreds of reminders): how aggressively it renders ahead of the visible area, and whether re-rendering the parent screen forces every visible row to re-render too, even ones whose own data didn't change.
    * **`React.memo`** wraps a component so it skips re-rendering when its props haven't changed — the exact same tool from the React course, just as relevant here.
    * **`initialNumToRender`/`windowSize`** tune how many rows `FlatList` renders up front and around the visible area. The defaults are reasonable for most lists, but worth knowing they exist and what they control once a list is genuinely large.

* **In-Depth Example:**
    ```tsx
    // components/ReminderListItem.tsx
    import { memo } from 'react';
    // ...component body unchanged...

    export default memo(ReminderListItem);
    ```
    ```tsx
    // app/index.tsx
    <FlatList
      data={reminders}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <ReminderListItem reminderItem={item} />}
      initialNumToRender={10}
      windowSize={5}
    />
    ```

* **⭐️ Class Exercise: Confirm `memo` Actually Helps**
    1.  Wrap `ReminderListItem` in `React.memo`, as shown above.
    2.  Add a throwaway `useState` counter and a button to `HomeScreen` that increments it on every press — this forces the whole screen to re-render.
    3.  Add a temporary `console.log('rendering', reminderItem.title)` inside `ReminderListItem`, and confirm that pressing the counter button does **not** re-log every row — none of their actual props changed, so `memo` skips them. Remove the counter and the log once you've confirmed it.

---

## Module 6: Building the Reminder Form

**Objective:** Turn the placeholder modal into a real form that creates, edits, and deletes a reminder — and write your first tests along the way.

### 1. Controlled `TextInput`

Just like a controlled `<input>` in web React, a controlled `TextInput` has its value driven by state, and updates that state on every keystroke:

```tsx
// app/createUpdateReminder.tsx
import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function CreateUpdateReminderScreen() {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.notesInput}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  titleInput: { fontSize: 20, fontWeight: '600', borderBottomWidth: 1, borderColor: '#ddd', paddingVertical: 8 },
  notesInput: { fontSize: 16, minHeight: 80, textAlignVertical: 'top' },
});
```

`onChangeText` is `TextInput`'s equivalent of a web input's `onChange` — it fires with the new text value directly (no `event.target.value` unwrapping needed).

### 2. A Due Date Picker

```bash
npx expo install @react-native-community/datetimepicker
```

```tsx
import DateTimePicker from '@react-native-community/datetimepicker';

const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
const [showPicker, setShowPicker] = useState(false);

// ...inside the JSX:
<Pressable onPress={() => setShowPicker(true)}>
  <Text>{dueDate ? dueDate.toLocaleString() : 'Set a due date (optional)'}</Text>
</Pressable>
{showPicker && (
  <DateTimePicker
    value={dueDate ?? new Date()}
    mode="datetime"
    onChange={(event, selectedDate) => {
      setShowPicker(false);
      if (selectedDate) setDueDate(selectedDate);
    }}
  />
)}
```

A due date is genuinely optional — that's why `dueDate` starts as `undefined`, not a default `Date`.

### 3. Submitting the Form

We validate that a title was actually entered, then hand the new reminder back to the list. For now (before Week 5's real backend), we'll lift the reminders array up into a simple shared module so both screens can read and update it:

```tsx
// state/remindersStore.ts — a tiny, temporary shared store (replaced by TanStack Query in Week 5)
export type Reminder = {
  id: number;
  title: string;
  notes?: string;
  dueDate?: string;
  completed: boolean;
};

let reminders: Reminder[] = [];
let nextId = 1;
const listeners = new Set<() => void>();

export function getReminders() {
  return reminders;
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
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
```

```tsx
// app/createUpdateReminder.tsx (Save handling added)
import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { addReminder } from '../state/remindersStore';

export default function CreateUpdateReminderScreen() {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  function handleSave() {
    if (!title.trim()) {
      Alert.alert('A title is required');
      return;
    }
    addReminder({ title: title.trim(), notes: notes.trim() || undefined });
    router.back();
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => <Text style={{ color: '#0E7AFE' }} onPress={handleSave}>Save</Text>,
        }}
      />
      <TextInput style={styles.titleInput} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.notesInput} placeholder="Notes" value={notes} onChangeText={setNotes} multiline />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  titleInput: { fontSize: 20, fontWeight: '600', borderBottomWidth: 1, borderColor: '#ddd', paddingVertical: 8 },
  notesInput: { fontSize: 16, minHeight: 80, textAlignVertical: 'top' },
});
```

And read from the same store on the home screen:

```tsx
// app/index.tsx
import { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ReminderListItem from '../components/ReminderListItem';
import { getReminders, subscribe } from '../state/remindersStore';

export default function HomeScreen() {
  const [reminders, setReminders] = useState(getReminders());
  const insets = useSafeAreaInsets();

  useEffect(() => subscribe(() => setReminders(getReminders())), []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ReminderListItem reminderItem={item} />}
      />
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
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  addButton: { position: 'absolute', right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#0E7AFE', alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: 'white', fontSize: 28 },
});
```

> **Note:** this `remindersStore.ts` is deliberately temporary scaffolding — a minimal shared store so two screens can see the same data before a real backend exists. In Week 5, it gets replaced entirely by TanStack Query talking to the real Node/Express API. Don't over-invest in it.

**⭐️ Class Exercise: Full Create Flow**

Tap "+", fill in a title (and optionally notes), tap "Save", and confirm the new reminder appears immediately in the `FlatList` on the home screen. Then try tapping "Save" with an empty title and confirm the validation alert appears instead of a broken reminder being added.

### 4. Editing an Existing Reminder

Week 2 promised this screen would eventually serve both "create" and "update," decided by whether an id was passed in. So far it's only ever handled create — time to deliver on that, plus add the delete action the app needs too.

* **Lecture & Concepts:**
    * **`useLocalSearchParams()`** reads whatever was passed in the URL — here, an `?id=3` query param, since `createUpdateReminder` is one shared modal screen, not a dynamic `[id]` route.
    * Tapping a `ReminderListItem` now navigates to this same screen **with** an id. The screen fetches that reminder from the store and pre-fills the form; saving now updates instead of creates.
    * Deleting only makes sense once you're editing a reminder that already exists — so the Delete action only appears in "edit" mode, never in "create" mode.

* **In-Depth Example:**
    ```tsx
    // state/remindersStore.ts (add these three functions)
    export function getReminderById(id: number) {
      return reminders.find((r) => r.id === id);
    }

    export function updateReminder(id: number, input: { title: string; notes?: string; dueDate?: Date }) {
      reminders = reminders.map((r) =>
        r.id === id
          ? { ...r, title: input.title, notes: input.notes, dueDate: input.dueDate?.toISOString() }
          : r
      );
      listeners.forEach((listener) => listener());
    }

    export function deleteReminder(id: number) {
      reminders = reminders.filter((r) => r.id !== id);
      listeners.forEach((listener) => listener());
    }
    ```
    ```tsx
    // components/ReminderListItem.tsx (now tappable, navigates to edit)
    import { Text, Pressable, StyleSheet } from 'react-native';
    import { router } from 'expo-router';

    function ReminderListItem({ reminderItem }: { reminderItem: Reminder }) {
      return (
        <Pressable
          style={styles.container}
          onPress={() => router.push(`/createUpdateReminder?id=${reminderItem.id}`)}
        >
          <Text style={styles.title}>{reminderItem.title}</Text>
          {reminderItem.notes ? <Text style={styles.notes}>{reminderItem.notes}</Text> : null}
        </Pressable>
      );
    }
    ```
    ```tsx
    // app/createUpdateReminder.tsx (full create + edit + delete)
    import { useEffect, useState } from 'react';
    import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
    import { router, Stack, useLocalSearchParams } from 'expo-router';
    import { addReminder, getReminderById, updateReminder, deleteReminder } from '../state/remindersStore';

    export default function CreateUpdateReminderScreen() {
      const { id } = useLocalSearchParams<{ id?: string }>();
      const reminderId = id ? Number(id) : undefined;
      const isEditing = reminderId !== undefined;

      const [title, setTitle] = useState('');
      const [notes, setNotes] = useState('');

      useEffect(() => {
        if (reminderId === undefined) return;
        const existing = getReminderById(reminderId);
        if (existing) {
          setTitle(existing.title);
          setNotes(existing.notes ?? '');
        }
      }, [reminderId]);

      function handleSave() {
        if (!title.trim()) {
          Alert.alert('A title is required');
          return;
        }
        if (isEditing) {
          updateReminder(reminderId, { title: title.trim(), notes: notes.trim() || undefined });
        } else {
          addReminder({ title: title.trim(), notes: notes.trim() || undefined });
        }
        router.back();
      }

      function handleDelete() {
        if (reminderId === undefined) return;
        Alert.alert('Delete this reminder?', undefined, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => { deleteReminder(reminderId); router.back(); } },
        ]);
      }

      return (
        <View style={styles.container}>
          <Stack.Screen
            options={{
              headerTitle: isEditing ? 'Edit Reminder' : 'New Reminder',
              headerRight: () => <Text style={{ color: '#0E7AFE' }} onPress={handleSave}>Save</Text>,
            }}
          />
          <TextInput style={styles.titleInput} placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput style={styles.notesInput} placeholder="Notes" value={notes} onChangeText={setNotes} multiline />
          {isEditing && (
            <Pressable onPress={handleDelete} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete Reminder</Text>
            </Pressable>
          )}
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: { flex: 1, padding: 16, gap: 12 },
      titleInput: { fontSize: 20, fontWeight: '600', borderBottomWidth: 1, borderColor: '#ddd', paddingVertical: 8 },
      notesInput: { fontSize: 16, minHeight: 80, textAlignVertical: 'top' },
      deleteButton: { marginTop: 24, alignItems: 'center' },
      deleteButtonText: { color: '#D32F2F', fontSize: 16, fontWeight: '600' },
    });
    ```
    *Notice `_layout.tsx` from Week 2 doesn't need to change at all — it already registers `createUpdateReminder` as a modal with a Cancel action; this screen's own `<Stack.Screen options={{...}}>` just overrides the title and adds the Save button, exactly like it already did for create-only.*

* **⭐️ Class Exercise: Full Edit and Delete Flow**
    1.  Add the three new store functions, make `ReminderListItem` tappable, and update `createUpdateReminder.tsx` as shown.
    2.  Tap an existing reminder in the list and confirm the form opens pre-filled with its real title and notes, with the header reading "Edit Reminder."
    3.  Change the title, tap Save, and confirm the change is reflected immediately in the list — not a new, duplicate reminder.
    4.  Tap into an existing reminder, tap "Delete Reminder," confirm the alert, and confirm it's gone from the list.
    5.  Confirm tapping "+" still opens a blank "New Reminder" form with no Delete button — creating and editing must not interfere with each other.

### 5. A First Look at Testing

Week 6 introduces component testing properly, but there's no reason to wait until the last week to write your very first test. The validation you already built is a perfect, small, pure thing to test right now.

* **Lecture & Concepts:**
    * Pull the validation check out of `handleSave` into its own named function, so it can be tested without rendering anything at all — no screen, no button, just a function and an assertion.

* **In-Depth Example:**
    ```tsx
    // state/validation.ts
    export function isReminderValid(title: string): boolean {
      return title.trim().length > 0;
    }
    ```
    Update `handleSave` to use it:
    ```tsx
    function handleSave() {
      if (!isReminderValid(title)) {
        Alert.alert('A title is required');
        return;
      }
      // ...unchanged
    }
    ```
    Install a test runner now, rather than waiting for Week 6:
    ```bash
    npx expo install -- --dev jest-expo
    ```
    ```tsx
    // state/validation.test.ts
    import { isReminderValid } from './validation';

    test('rejects an empty title', () => {
      expect(isReminderValid('')).toBe(false);
    });

    test('rejects a title that is only whitespace', () => {
      expect(isReminderValid('   ')).toBe(false);
    });

    test('accepts a real title', () => {
      expect(isReminderValid('Buy milk')).toBe(true);
    });
    ```

* **⭐️ Class Exercise: Test Before You Ship**
    1.  Extract `isReminderValid` exactly as shown, and update `handleSave` to call it.
    2.  Add `"test": "jest"` to `package.json` and run it — confirm all three tests pass.
    3.  Break `isReminderValid` on purpose (e.g., make it always `return true`) and confirm a test fails and explains why. Revert it once you've seen the failure.

---

## 📝 Week 3 Assignment: "A Working Create, Edit & Delete Flow"

**Objective:** Reminders render dynamically via `FlatList`, and the form actually creates, edits, and deletes them.

### Requirements

1. `app/index.tsx` renders reminders through `FlatList` with a proper `keyExtractor` and safe-area-aware "+" button — no hardcoded `<ReminderListItem />` calls remain.
2. `ReminderListItem` is wrapped in `React.memo`, and `FlatList` sets `initialNumToRender`/`windowSize`.
3. `app/createUpdateReminder.tsx` has working, controlled `title` and `notes` inputs, plus an optional due-date picker.
4. Saving with an empty title is blocked with a validation message; saving with a valid title adds the reminder and returns to the home screen.
5. The newly created reminder is immediately visible in the list — no manual refresh needed.
6. Tapping an existing reminder opens the same form pre-filled with its data, saves as an update (not a duplicate), and offers a Delete action.
7. `state/validation.ts`'s `isReminderValid` has passing Jest tests, run via `npm test`.

### Git Workflow

* `git commit -m "feat: render reminders dynamically with FlatList"`
* `git commit -m "feat: build the create reminder form with validation"`
* `git commit -m "feat: add edit and delete support to the reminder form"`
* `git commit -m "perf: memoize ReminderListItem and tune FlatList rendering"`
* `git commit -m "test: add first Jest tests for reminder validation"`
* `git commit -m "feat: add a due date picker to the reminder form"`
