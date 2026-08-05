# Week 3: Lists, Forms & User Input

Your app has two screens and a component that can render one reminder — but you're still hardcoding two `<ReminderListItem />`s by hand, and the "New Reminder" modal doesn't actually do anything yet. This week: a real dynamic list, and a real, working form.

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
import ReminderListItem from '../components/ReminderListItem';

const reminders = [
  { id: 1, title: 'Buy milk', notes: 'Whole milk, not skim' },
  { id: 2, title: 'Call the dentist' },
  { id: 3, title: 'Finish React Native assignment', notes: 'Due Friday' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ReminderListItem reminderItem={item} />}
      />
      <Pressable style={styles.addButton} onPress={() => router.push('/createUpdateReminder')}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  addButton: {
    position: 'absolute', right: 24, bottom: 24, width: 56, height: 56,
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

---

## Module 6: Building the Reminder Form

**Objective:** Turn the placeholder modal into a real form that adds a reminder to the list.

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
import ReminderListItem from '../components/ReminderListItem';
import { getReminders, subscribe } from '../state/remindersStore';

export default function HomeScreen() {
  const [reminders, setReminders] = useState(getReminders());

  useEffect(() => subscribe(() => setReminders(getReminders())), []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ReminderListItem reminderItem={item} />}
      />
      <Pressable style={styles.addButton} onPress={() => router.push('/createUpdateReminder')}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  addButton: { position: 'absolute', right: 24, bottom: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#0E7AFE', alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: 'white', fontSize: 28 },
});
```

> **Note:** this `remindersStore.ts` is deliberately temporary scaffolding — a minimal shared store so two screens can see the same data before a real backend exists. In Week 5, it gets replaced entirely by TanStack Query talking to the real Node/Express API. Don't over-invest in it.

**⭐️ Class Exercise: Full Create Flow**

Tap "+", fill in a title (and optionally notes), tap "Save", and confirm the new reminder appears immediately in the `FlatList` on the home screen. Then try tapping "Save" with an empty title and confirm the validation alert appears instead of a broken reminder being added.

---

## 📝 Week 3 Assignment: "A Working Create Flow"

**Objective:** Reminders render dynamically via `FlatList`, and the create form actually works.

### Requirements

1. `app/index.tsx` renders reminders through `FlatList` with a proper `keyExtractor` — no hardcoded `<ReminderListItem />` calls remain.
2. `app/createUpdateReminder.tsx` has working, controlled `title` and `notes` inputs, plus an optional due-date picker.
3. Saving with an empty title is blocked with a validation message; saving with a valid title adds the reminder and returns to the home screen.
4. The newly created reminder is immediately visible in the list — no manual refresh needed.

### Git Workflow

* `git commit -m "feat: render reminders dynamically with FlatList"`
* `git commit -m "feat: build the create reminder form with validation"`
* `git commit -m "feat: add a due date picker to the reminder form"`
