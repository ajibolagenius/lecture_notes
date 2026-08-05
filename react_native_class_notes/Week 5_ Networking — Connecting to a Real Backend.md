# Week 5: Networking — Connecting to the Real Backend

Everything up to now has been local: an in-memory store, then AsyncStorage. This week, `reminders-app` finally talks to a real server — the Reminders API from the companion Node/Express course. If you haven't already, make sure that API is up and running (either your own, or a partner's) through at least its Week 4 (real login working) before starting this week.

This is the single biggest architectural shift in the whole course: real accounts, and a real backend as the single source of truth.

---

## Module 9: Real Authentication

**Objective:** Add real login/signup screens, and split the app into "logged out" and "logged in" sections.

### 1. Route Groups: `(auth)` and `(protected)`

Expo Router supports **route groups** — folders wrapped in parentheses, like `(auth)` or `(protected)`. The parentheses mean the folder name is purely organizational: it does **not** appear in the actual URL. This lets you organize screens by *purpose* — which ones require login, and which ones don't — without it leaking into your routes.

Restructure your `app/` folder:

```
app/
  _layout.tsx
  (auth)/
    login.tsx
    signup.tsx
  (protected)/
    index.tsx              ← moved from app/index.tsx
    createUpdateReminder.tsx ← moved from app/createUpdateReminder.tsx
```

> **Note:** this is the exact pattern Expo Router's own documentation uses to *explain* how the router resolves an initial screen (searching subdirectories for the first `index.tsx`) — we're now actually building it for real, not just reading about it.

### 2. Building the Auth Screens

```tsx
// app/(auth)/login.tsx
import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { login } from '../../services/authService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin() {
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      router.replace('/(protected)');
    } catch (error: any) {
      Alert.alert('Login failed', error.message ?? 'Please try again');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={styles.button} onPress={handleLogin} disabled={submitting}>
        <Text style={styles.buttonText}>{submitting ? 'Logging in...' : 'Log In'}</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/(auth)/signup')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', gap: 12 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  button: { backgroundColor: '#0E7AFE', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  link: { color: '#0E7AFE', textAlign: 'center', marginTop: 8 },
});
```

`app/(auth)/signup.tsx` follows the same shape, calling a `signup(email, password)` function instead — build it yourself as this week's first exercise.

### 3. Storing the Token Securely

A JWT is sensitive — treat it differently from ordinary app data. `expo-secure-store` uses the device's encrypted keychain/keystore instead of plain storage.

```bash
npx expo install expo-secure-store
```

```tsx
// services/authService.ts
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL; // e.g. http://192.168.1.42:3000

const TOKEN_KEY = 'authToken';

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message ?? 'Login failed');
  }
  const { token } = await response.json();
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  return token;
}

export async function signup(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message ?? 'Signup failed');
  }
  const { token } = await response.json();
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  return token;
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function logout() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
```

> **Note:** `process.env.EXPO_PUBLIC_API_URL` comes from a `.env` file at your project root (any variable prefixed `EXPO_PUBLIC_` is inlined into the app at build time). Set it to your machine's LAN IP while developing (`http://192.168.1.42:3000`), matching whatever you configured on the Node/Express course's side.

### 4. Redirecting Based on Auth State

```tsx
// app/_layout.tsx
import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { getToken } from '../services/authService';

export default function RootLayout() {
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        router.replace('/(protected)');
      } else {
        router.replace('/(auth)/login');
      }
      setCheckingAuth(false);
    })();
  }, []);

  if (checkingAuth) return null; // or a loading spinner

  return <Stack screenOptions={{ headerShown: false }} />;
}
```

`router.replace()` (instead of `router.push()`) swaps the current screen instead of stacking on top of it — so a logged-in user can't tap "back" and end up staring at the login screen again.

**⭐️ Class Exercise: Full Auth Round Trip**

Build `(auth)/signup.tsx`. Then: sign up with a new account, confirm you land on the reminders list; force-quit and reopen the app, and confirm you're taken straight back to the reminders list (not login) because the token was found. Then call `logout()` from a temporary button, restart, and confirm you land on login instead.

---

## Module 10: Real Data with TanStack Query

**Objective:** Replace all local storage with live calls to the real Reminders API.

### 1. Why TanStack Query?

Compare what you'd need to hand-roll for every screen — loading state, error state, refetching, caching, avoiding duplicate requests — against what TanStack Query gives you for free:

```tsx
// Without TanStack Query
const [reminders, setReminders] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchReminders = async () => {
    try {
      const data = await getReminders();
      setReminders(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  fetchReminders();
}, []);
```

```tsx
// With TanStack Query
const { data, isLoading, error } = useQuery({
  queryKey: ['reminders'],
  queryFn: getReminders,
});
```

Same result, far less boilerplate — and you get caching, deduplication, and background refetching for free.

```bash
npx expo install @tanstack/react-query
```

### 2. Setting Up the Query Client

```tsx
// app/_layout.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  // ...auth-check logic from Module 9...

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
```

### 3. Building `services/reminderService.ts`

One typed function per endpoint, each attaching the stored JWT:

```tsx
// services/reminderService.ts
import { getToken } from './authService';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export type Reminder = {
  id: number;
  title: string;
  notes?: string;
  dueDate?: string;
  completed: boolean;
};

async function authedFetch(path: string, options: RequestInit = {}) {
  const token = await getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error ?? 'Request failed');
  }
  return response.json();
}

export function getReminders(): Promise<Reminder[]> {
  return authedFetch('/reminders');
}

export function createReminder(input: { title: string; notes?: string; dueDate?: string }) {
  return authedFetch('/reminders', { method: 'POST', body: JSON.stringify(input) });
}

export function updateReminder(id: number, input: Partial<Reminder>) {
  return authedFetch(`/reminders/${id}`, { method: 'PATCH', body: JSON.stringify(input) });
}

export function deleteReminder(id: number) {
  return authedFetch(`/reminders/${id}`, { method: 'DELETE' });
}
```

### 4. Wiring the Home Screen to `useQuery`

```tsx
// app/(protected)/index.tsx
import { View, Text, Pressable, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import ReminderListItem from '../../components/ReminderListItem';
import { getReminders } from '../../services/reminderService';

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['reminders'],
    queryFn: getReminders,
  });

  if (isLoading) return <ActivityIndicator style={{ marginTop: '20%' }} />;
  if (error) return <Text style={{ alignSelf: 'center', marginTop: '20%' }}>{error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reminders</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ReminderListItem reminderItem={item} />}
      />
      <Pressable style={styles.addButton} onPress={() => router.push('/(protected)/createUpdateReminder')}>
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

### 5. Mutations With Optimistic Updates

```tsx
// app/(protected)/createUpdateReminder.tsx
import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReminder } from '../../services/reminderService';

export default function CreateUpdateReminderScreen() {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      router.back();
    },
    onError: (error: any) => Alert.alert('Could not save reminder', error.message),
  });

  function handleSave() {
    if (!title.trim()) {
      Alert.alert('A title is required');
      return;
    }
    mutation.mutate({ title: title.trim(), notes: notes.trim() || undefined });
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerRight: () => <Text onPress={handleSave} style={{ color: '#0E7AFE' }}>Save</Text> }} />
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

`queryClient.invalidateQueries({ queryKey: ['reminders'] })` tells TanStack Query "the reminders data might be stale now — refetch it" — which is what makes the new reminder show up on the home screen automatically after the modal closes.

> **Note:** `state/remindersStore.ts` and the local AsyncStorage/notification-scheduling logic from Weeks 3-4 should now be retired for the *data* itself — but keep the notification-scheduling call (`Notifications.scheduleNotificationAsync`) and move it into `createReminder`'s `onSuccess`, since that's still a genuinely local, on-device feature independent of the backend.

**⭐️ Class Exercise: Full Round Trip, For Real**

Sign up, create a reminder, and confirm it appears in the list. Then check the Node/Express course's Postman collection (or ask your backend partner) to confirm the reminder really exists in the Postgres database — not just in the app's local cache.

---

## 📝 Week 5 Assignment: "Fully Backend-Connected"

**Objective:** The app now has real accounts and real, server-persisted reminders.

### Requirements

1. `app/` is restructured into `(auth)/` (login, signup) and `(protected)/` (index, createUpdateReminder) route groups.
2. Login and signup call the real Node/Express `/auth/login` and `/auth/signup` endpoints and store a real JWT via `expo-secure-store`.
3. On launch, the app redirects to `(protected)` if a token exists, or `(auth)/login` if not.
4. `services/reminderService.ts` wraps every reminders endpoint, attaching the JWT on every call.
5. The reminders list and the create/update form are both wired through `useQuery`/`useMutation` — no more local-only `remindersStore.ts` data.

### Git Workflow

* `git commit -m "feat: add login and signup screens with secure token storage"`
* `git commit -m "feat: restructure app into (auth) and (protected) route groups"`
* `git commit -m "feat: connect reminders CRUD to the live API via TanStack Query"`
