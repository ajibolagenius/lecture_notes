# 📱 React Native Course — Tutor's Master Outline
### Deejoft Coding School | Mobile Development Track
**Instructor Notes — Fundamentals to Production-Ready Mobile Apps**

---

> **Dear Tutor,**
> React Native is the natural next step after React. Students arrive here with a solid understanding of components, props, state, and hooks — and those skills transfer almost entirely. The shift is not about learning a new language. It is about learning a **new environment**: no browser, no DOM, no CSS files, no `<div>` tags. Everything renders as native UI elements on iOS and Android. Your job is to manage that mental transition smoothly, connect every concept back to what they already know from React, and help them feel the uniqueness of building something that lives on a real phone.
>
> This course uses **Expo** with the managed workflow and **Expo Router** for file-based navigation. This is the fastest, most beginner-friendly path to a real app. Students on both Windows and Mac can follow along — Expo removes most platform-specific friction.

---

## 🗺️ Course at a Glance

| Week | Module | Focus | Key Deliverable |
|------|--------|-------|-----------------|
| Week 1 | 1–2 | Environment, Core Components & Styling | Static Profile Screen |
| Week 2 | 3–4 | Layouts with Flexbox & Navigation | Multi-Screen App Shell |
| Week 3 | 5–6 | State, Lists & User Input | Interactive Notes App |
| Week 4 | 7–8 | Data Fetching, Storage & Device APIs | News Reader with Bookmarks |
| Week 5 | 9–10 | Authentication Flow & Advanced UI | Login & Onboarding Screens |
| Week 6 | 11–12 | Performance, Testing & App Deployment | Capstone App — Published to Expo |

**Prerequisites:**
- React (Weeks 1–6 at Deejoft) — *this is non-negotiable*
- Comfortable with: components, props, useState, useEffect, async/await, arrow functions, destructuring

**Tools:**
- Node.js LTS, VS Code, Git & GitHub
- Expo CLI (`npx expo`)
- Expo Go app (installed on student's physical phone — iOS or Android)
- Optional: Android Studio / Xcode (for emulators)

**Target Platforms:** iOS & Android (simultaneously, from one codebase)

---

## 🎯 Course Philosophy

Five principles to establish on Day 1 and revisit every week:

1. **"Learn once, write anywhere"** — React Native shares React's mental model. If students understand React, they already understand 60% of React Native. Reinforce this constantly to build confidence.
2. **No DOM, no CSS files, no browser** — React Native compiles to *native* components. A `<View>` is not a `<div>`. A `<Text>` is not a `<p>`. Styles are JavaScript objects, not stylesheets.
3. **Mobile-first by nature** — Touch targets, safe areas, keyboard behaviour, network conditions — mobile UX constraints are different from web. Address them explicitly, not as afterthoughts.
4. **Test on a real device** — Simulators lie. Encourage every student to install Expo Go and test on their own phone from Week 1.
5. **Ship early, iterate often** — With Expo, students can share a working app link after Week 1. Use this to build pride and momentum.

---

## 📅 Week 1: Environment, Core Components & Styling

### Module 1 — Setting Up the React Native & Expo Environment

**Tutor Guidance:**
Setup is the highest-friction session of the course. Do this live, slowly, and wait for every student before moving on. The most common issues: outdated Node, wrong Expo CLI version, phone not connecting to the same Wi-Fi as the laptop. Have solutions ready.

#### What is React Native? — The 5-Minute Explanation

Draw this on the board:

```
┌─────────────────────────────────────────────────────┐
│                  Your React Native Code              │
│         (JavaScript — runs in a JS engine)           │
└──────────────────────────┬──────────────────────────┘
                           │ Bridge / JSI
           ┌───────────────┴───────────────┐
           ▼                               ▼
   ┌───────────────┐               ┌───────────────┐
   │   iOS Native  │               │Android Native │
   │  UIKit Views  │               │  View System  │
   └───────────────┘               └───────────────┘
```

> **Explain:** When you write `<View>` in React Native, it doesn't become an HTML `<div>`. It compiles into a real native iOS `UIView` on iPhone and a real Android `View` on Android. That's why the app feels fast and native — because it *is* native.

**Web vs. React Native — Side-by-Side Comparison (Pin this for the whole course):**

| Web (React) | React Native | Purpose |
|---|---|---|
| `<div>` | `<View>` | Generic container |
| `<p>`, `<h1>`, `<span>` | `<Text>` | All text — must be inside `<Text>` |
| `<img>` | `<Image>` | Display images |
| `<input>` | `<TextInput>` | Text entry field |
| `<button>` | `<TouchableOpacity>` / `<Pressable>` | Tappable element |
| `<ul>` / `<ol>` | `<FlatList>` / `<SectionList>` | Scrollable lists |
| `<ScrollView>` (browser default) | `<ScrollView>` | Explicit scrollable area |
| `window.alert()` | `Alert.alert()` | Native alert dialog |
| CSS files / `className` | `StyleSheet.create({})` / `style` prop | Styling |

#### Scaffolding a Project with Expo:

```bash
# Create a new Expo project using the latest template
npx create-expo-app@latest DeejoftApp --template blank

# Navigate in
cd DeejoftApp

# Start the development server
npx expo start

# Options shown in terminal:
# Press 'a' → open Android emulator
# Press 'i' → open iOS simulator (Mac only)
# Scan the QR code with Expo Go app on your phone → RECOMMENDED
```

**Expo Project Structure:**
```
DeejoftApp/
├── app/                  ← Your screens live here (when using Expo Router)
│   ├── _layout.jsx       ← Root layout — wraps all screens
│   └── index.jsx         ← Home screen (maps to '/' route)
├── components/           ← Reusable components
├── assets/               ← Images, fonts, icons
├── constants/            ← Colours, spacing, typography tokens
├── hooks/                ← Custom hooks
├── app.json              ← Expo app configuration (name, icon, splash)
├── package.json
└── babel.config.js
```

> **Expo Router:** This course uses file-based routing (like Next.js). A file at `app/profile.jsx` automatically becomes the `/profile` screen. Students coming from React web will find this familiar.

---

### Module 2 — Core Components & React Native Styling

**Tutor Guidance:**
Students will immediately try to write CSS. Stop that instinct early. Show them `StyleSheet.create()` and explain why: JavaScript objects, camelCase properties, no units (numbers = dp/density-independent pixels), and no class selectors.

#### The Core Components in Action:

```jsx
// app/index.jsx — Home Screen

import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    // SafeAreaView prevents content going under notches and status bars
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* All text MUST be inside <Text> — never directly in <View> */}
        <Text style={styles.heading}>Welcome to Deejoft</Text>
        <Text style={styles.subheading}>Your mobile dev journey starts here.</Text>

        <Image
          source={{ uri: 'https://picsum.photos/200/200' }}   // Remote image
          style={styles.avatar}
          // For local images: source={require('../assets/logo.png')}
        />

        <Text style={styles.body}>
          React Native lets you build iOS and Android apps using the same
          React knowledge you already have. Let's go! 🚀
        </Text>

      </View>
    </SafeAreaView>
  );
}

// Styles — JavaScript objects, not CSS
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    alignItems: 'center',      // Cross axis (horizontal when flexDirection is column)
    justifyContent: 'center',  // Main axis (vertical when flexDirection is column)
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,           // Half of width/height = perfect circle
    marginBottom: 24,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,             // lineHeight is a number, not '1.6' like CSS
    color: '#444',
    textAlign: 'center',
  },
});
```

#### React Native Styling Rules — Key Differences from CSS:

```javascript
// ❌ These CSS concepts DO NOT exist in React Native:
// - No class selectors (.card, #header)
// - No descendant selectors (nav a)
// - No 'px', 'rem', 'em', '%' units (for most properties)
// - No 'display: block', 'display: inline' — everything is Flexbox by default
// - No 'float', 'position: sticky', 'z-index' in the same way
// - No shorthand for border: 2px solid red — must split into 3 properties:
//   borderWidth: 2, borderStyle: 'solid', borderColor: 'red'

// ✅ React Native style equivalents:
const styles = StyleSheet.create({
  box: {
    width: 200,              // dp (density-independent pixels) — no unit needed
    height: 100,
    backgroundColor: '#007bff',

    // Padding & Margin — same concept, just numbers
    padding: 16,
    paddingHorizontal: 24,   // paddingLeft + paddingRight
    paddingVertical: 12,     // paddingTop + paddingBottom
    margin: 8,
    marginBottom: 16,

    // Border — MUST be split
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,

    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Shadow (Android) — different property!
    elevation: 4,
  },
});
```

#### Platform-Specific Code:
```jsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    // Apply shadow correctly on BOTH platforms at once:
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
```

---

### 📝 Week 1 Assignment: Static Profile Screen

**Task:** Build a static profile screen (no navigation, no state yet) that looks polished on a real phone.

**Requirements:**
- `SafeAreaView` as root wrapper
- Profile photo using `<Image>` (use any public image URL)
- Name, role, and bio using `<Text>` components
- A row of "stat" cards (e.g., Projects: 12, Followers: 340) using `<View>` + `<Text>`
- A "Follow" button using `<TouchableOpacity>` (no action needed yet — styling only)
- All styles in `StyleSheet.create()` — no inline styles

**Tutor Marking Criteria:**
- [ ] `SafeAreaView` used as root container
- [ ] No text directly inside `<View>` (all text in `<Text>`)
- [ ] `StyleSheet.create()` used (not inline `style={{ }}`)
- [ ] Correct use of `borderRadius` on the avatar image for a circle
- [ ] Cross-platform shadow applied (both `shadow*` and `elevation`)
- [ ] Screen renders correctly on phone via Expo Go

---

## 📅 Week 2: Layouts with Flexbox & Navigation

### Module 3 — Flexbox in React Native

**Tutor Guidance:**
Students already know CSS Flexbox. React Native uses it too, but with two critical differences: (1) `flexDirection` defaults to `'column'`, not `'row'`; (2) there are no `fr` units. These two points cause the most confusion — address them before any code.

#### Flexbox Differences — React Native vs. CSS:

| Property | CSS Default | React Native Default |
|---|---|---|
| `flexDirection` | `row` | **`column`** |
| `alignContent` | `stretch` | `flex-start` |
| `flexShrink` | `1` | `0` |

```jsx
import { View, Text, StyleSheet } from 'react-native';

// ===== COMMON LAYOUT PATTERNS =====

// Pattern 1: Full-screen centered content
const CenteredScreen = () => (
  <View style={styles.fullScreen}>
    <Text>I am perfectly centered</Text>
  </View>
);

// Pattern 2: Row of equally-spaced items (e.g., a tab bar)
const TabBar = () => (
  <View style={styles.tabBar}>
    <Text style={styles.tabItem}>Home</Text>
    <Text style={styles.tabItem}>Search</Text>
    <Text style={styles.tabItem}>Profile</Text>
  </View>
);

// Pattern 3: Card with header row (icon + title + timestamp on same line)
const CardHeader = () => (
  <View style={styles.cardHeader}>
    <View style={styles.headerLeft}>
      {/* Avatar circle */}
      <View style={styles.avatarSmall} />
      <View>
        <Text style={styles.authorName}>Ada Lovelace</Text>
        <Text style={styles.timestamp}>2 mins ago</Text>
      </View>
    </View>
    <Text style={styles.menuDots}>•••</Text>
  </View>
);

// Pattern 4: flex: 1 — "take up all remaining space"
const TwoColumnLayout = () => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <View style={{ width: 80, backgroundColor: '#1a1a2e' }}>
      {/* Fixed-width sidebar */}
    </View>
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      {/* flex: 1 takes all remaining horizontal space */}
    </View>
  </View>
);

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,                      // Fill the entire screen
    justifyContent: 'center',     // Vertical centering (column direction)
    alignItems: 'center',         // Horizontal centering (column direction)
    backgroundColor: '#f8f9fa',
  },
  tabBar: {
    flexDirection: 'row',         // Must explicitly set row for horizontal layout
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 56,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabItem: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ddd',
  },
  authorName: { fontSize: 14, fontWeight: '600', color: '#1a1a2e' },
  timestamp: { fontSize: 12, color: '#999' },
  menuDots: { fontSize: 18, color: '#999' },
});
```

---

### Module 4 — Navigation with Expo Router

**Tutor Guidance:**
Expo Router uses a file-based approach that mirrors Next.js. Students who saw React Router in the React course will find this intuitive. The key difference: instead of declaring routes in code, the file structure *is* the route structure.

#### Setting Up Expo Router:

```bash
# Install Expo Router (if not already in your template)
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

```
app/
├── _layout.jsx          → Root layout (wraps everything — set fonts, themes, global providers here)
├── index.jsx            → Home screen      → Route: '/'
├── explore.jsx          → Explore screen   → Route: '/explore'
├── profile.jsx          → Profile screen   → Route: '/profile'
└── post/
    ├── _layout.jsx      → Layout for post routes
    ├── index.jsx        → Post list        → Route: '/post'
    └── [id].jsx         → Single post      → Route: '/post/42' (dynamic!)
```

#### Root Layout — The App Shell:

```jsx
// app/_layout.jsx

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Expo includes this icon pack

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#e94560',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: '#eee',
        },
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

#### Navigating Between Screens:

```jsx
// Method 1: Link component (declarative — like <a> in web)
import { Link } from 'expo-router';

<Link href="/profile">
  <Text>Go to Profile</Text>
</Link>

// Method 2: useRouter hook (imperative — for navigation inside logic/functions)
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function PostListScreen() {
  const router = useRouter();

  const openPost = (postId) => {
    // Navigate programmatically — e.g., after an API call succeeds
    router.push(`/post/${postId}`);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => openPost(42)}>
        <Text>Open Post #42</Text>
      </TouchableOpacity>
    </View>
  );
}

// Dynamic route — reading the URL param
// app/post/[id].jsx
export default function PostDetailScreen() {
  const { id } = useLocalSearchParams(); // Reads the [id] from the URL

  return (
    <View>
      <Text>Showing post with ID: {id}</Text>
    </View>
  );
}
```

---

### 📝 Week 2 Assignment: Multi-Screen App Shell

**Task:** Build the navigation shell for a social feed app with 3 tabs.

**Requirements:**
- Tab bar with 3 tabs: Feed, Search, Profile — each with an icon
- Feed screen: a header + a static `<ScrollView>` with 3 manually written "post" cards
- Search screen: a `<TextInput>` search bar at the top + placeholder "results" text
- Profile screen: the polished profile screen from Week 1 Assignment
- Tapping a post card navigates to a `post/[id]` dynamic route that shows the post ID

---

## 📅 Week 3: State, Lists & User Input

### Module 5 — State & User Input in React Native

**Tutor Guidance:**
`useState` is identical to React. The only new concept here is `TextInput`, which requires you to be explicit about its value (controlled component). Also introduce the `Keyboard` API and `KeyboardAvoidingView` — phone keyboards cover half the screen and break forms if not handled.

#### `TextInput` — The Mobile Input Field:

```jsx
import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback,
} from 'react-native';

export default function AddNoteScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;
    console.log('Saving note:', { title, body });
    setTitle('');
    setBody('');
    Keyboard.dismiss(); // Hide the keyboard programmatically
  };

  return (
    // TouchableWithoutFeedback: tap outside input to dismiss keyboard
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/*
        KeyboardAvoidingView: pushes content up when keyboard appears
        behavior is platform-specific — always check both iOS and Android
      */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}          // Called on every keystroke
            placeholder="Note title..."
            placeholderTextColor="#aaa"
            maxLength={80}
            returnKeyType="next"             // Shows "Next" on keyboard
            autoFocus                        // Focus this input on mount
          />

          <Text style={styles.label}>Body</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={body}
            onChangeText={setBody}
            placeholder="Start writing..."
            placeholderTextColor="#aaa"
            multiline                        // Multi-line text area
            numberOfLines={6}
            textAlignVertical="top"          // Android: start text from top
            returnKeyType="done"
          />

          <TouchableOpacity
            style={[styles.saveBtn, !title.trim() && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={!title.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.saveBtnText}>Save Note</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1a1a2e',
    marginBottom: 16,
  },
  multilineInput: {
    height: 140,
    paddingTop: 12,
  },
  saveBtn: {
    backgroundColor: '#e94560',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnDisabled: { backgroundColor: '#ccc' },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
});
```

---

### Module 6 — Lists with `FlatList` and `SectionList`

**Tutor Guidance:**
Students will instinctively try to use `.map()` inside a `<ScrollView>`. This works for small lists but kills performance on large ones. `FlatList` renders only what's visible on screen (virtualisation). Explain this clearly — it's a key mobile performance concept.

#### `FlatList` — The Performant List:

```jsx
import { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Alert, SafeAreaView,
} from 'react-native';

const INITIAL_NOTES = [
  { id: '1', title: 'HTML Revision', body: 'Review semantic tags.', date: 'Today' },
  { id: '2', title: 'CSS Grid Practice', body: 'Build a 3-column layout.', date: 'Yesterday' },
  { id: '3', title: 'React useEffect', body: 'Dependency array rules.', date: 'Mon' },
  { id: '4', title: 'Python Functions', body: 'Practice default args.', date: 'Sun' },
];

export default function NotesListScreen() {
  const [notes, setNotes] = useState(INITIAL_NOTES);

  const deleteNote = (id) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setNotes(prev => prev.filter(note => note.id !== id)),
        },
      ]
    );
  };

  const renderNote = ({ item }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => console.log('Open note:', item.id)}
      onLongPress={() => deleteNote(item.id)}  // Long press to delete
      activeOpacity={0.9}
    >
      <View style={styles.cardTop}>
        <Text style={styles.noteTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.noteDate}>{item.date}</Text>
      </View>
      <Text style={styles.noteBody} numberOfLines={2}>{item.body}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={item => item.id}   // MUST be unique string

        // Optimisation props
        removeClippedSubviews={true}
        initialNumToRender={10}

        // Empty state
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No notes yet.</Text>
            <Text style={styles.emptySubtext}>Tap + to add your first note.</Text>
          </View>
        )}

        // Header and footer
        ListHeaderComponent={() => (
          <Text style={styles.listHeader}>{notes.length} Notes</Text>
        )}

        // Separator between items
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}

        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}
```

#### `SectionList` — For Grouped Data:

```jsx
import { SectionList, Text, View, StyleSheet } from 'react-native';

const SECTIONS = [
  {
    title: 'Today',
    data: [
      { id: '1', title: 'HTML Revision' },
      { id: '2', title: 'CSS Grid Practice' },
    ],
  },
  {
    title: 'This Week',
    data: [
      { id: '3', title: 'React useEffect' },
      { id: '4', title: 'Python Functions' },
    ],
  },
];

<SectionList
  sections={SECTIONS}
  keyExtractor={item => item.id}
  renderItem={({ item }) => (
    <Text style={styles.item}>{item.title}</Text>
  )}
  renderSectionHeader={({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  )}
/>
```

---

## 📅 Week 4: Data Fetching, Storage & Device APIs

### Module 7 — Async Data Fetching & Loading States

**Tutor Guidance:**
`useEffect` and `fetch` / `axios` work exactly as in React web. The only difference is that students should always show a loading state because mobile networks can be slow, and they should handle the case where there is no internet connection.

```jsx
import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';

export default function NewsScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=ng&apiKey=YOUR_API_KEY'
      );
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e94560" />
        <Text style={styles.loadingText}>Fetching latest news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <TouchableOpacity onPress={() => fetchNews()} style={styles.retryBtn}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item, index) => item.url ?? String(index)}
      renderItem={({ item }) => <ArticleCard article={item} />}
      refreshControl={
        // Pull-to-refresh — standard mobile UX pattern
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => fetchNews(true)}
          tintColor="#e94560"
        />
      }
    />
  );
}
```

---

### Module 8 — Local Storage with AsyncStorage & Device APIs

```bash
npx expo install @react-native-async-storage/async-storage
npx expo install expo-location expo-image-picker expo-notifications
```

#### AsyncStorage — Persistent Key-Value Store:

```jsx
// Think of AsyncStorage like localStorage on the web, but async
import AsyncStorage from '@react-native-async-storage/async-storage';

// A helper module — create this as utils/storage.js
const KEYS = {
  BOOKMARKS: '@deejoft/bookmarks',
  USER_PREFS: '@deejoft/user_prefs',
};

export const StorageService = {
  // Save bookmarks (array of article objects)
  async saveBookmarks(bookmarks) {
    try {
      await AsyncStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  },

  // Load bookmarks — returns [] if nothing saved yet
  async loadBookmarks() {
    try {
      const json = await AsyncStorage.getItem(KEYS.BOOKMARKS);
      return json ? JSON.parse(json) : [];
    } catch (e) {
      console.error('Failed to load bookmarks:', e);
      return [];
    }
  },

  // Clear everything (useful for logout)
  async clearAll() {
    await AsyncStorage.clear();
  },
};

// Usage in a component
export default function ArticleCard({ article }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = async () => {
    const current = await StorageService.loadBookmarks();

    if (isBookmarked) {
      const updated = current.filter(b => b.url !== article.url);
      await StorageService.saveBookmarks(updated);
    } else {
      await StorageService.saveBookmarks([...current, article]);
    }

    setIsBookmarked(!isBookmarked);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{article.title}</Text>
      <TouchableOpacity onPress={toggleBookmark}>
        <Ionicons
          name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
          size={22}
          color={isBookmarked ? '#e94560' : '#999'}
        />
      </TouchableOpacity>
    </View>
  );
}
```

#### Location API:

```jsx
import * as Location from 'expo-location';

async function getUserCity() {
  // Always request permission before accessing sensitive APIs
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'Location access is required for this feature.');
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  const [place] = await Location.reverseGeocodeAsync(location.coords);

  return `${place.city}, ${place.country}`;
}
```

---

## 📅 Week 5: Authentication Flow & Advanced UI

### Module 9 — Auth Flow with Context & Secure Storage

**Tutor Guidance:**
Authentication is the first "real app architecture" pattern students encounter. The goal is to teach the pattern: a global auth state (Context), protected routes, and persisted login via SecureStore (like AsyncStorage but encrypted — for tokens).

```bash
npx expo install expo-secure-store
```

```jsx
// context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Check stored token on launch

  // On app start: check if a token exists
  useEffect(() => {
    async function loadStoredUser() {
      try {
        const token = await SecureStore.getItemAsync('auth_token');
        const userData = await SecureStore.getItemAsync('user_data');
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (e) {
        console.error('Failed to load stored auth:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadStoredUser();
  }, []);

  const login = async (email, password) => {
    // In a real app, call your API here
    const mockUser = { id: '1', name: 'Ada Lovelace', email };
    const mockToken = 'mock-jwt-token-12345';

    await SecureStore.setItemAsync('auth_token', mockToken);
    await SecureStore.setItemAsync('user_data', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('auth_token');
    await SecureStore.deleteItemAsync('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

#### Protected Routes with Expo Router:

```jsx
// app/_layout.jsx — Redirect based on auth state

import { useEffect } from 'react';
import { useSegments, useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function RootLayout() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login'); // Not logged in → go to login
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');       // Logged in → go to main app
    }
  }, [user, isLoading, segments]);

  if (isLoading) return <SplashScreen />;

  return <Slot />;
}
```

---

### Module 10 — Advanced UI: Animations, Modals & Gestures

```jsx
// Animated API — for performant, native-driven animations
import { Animated, Easing } from 'react-native';
import { useRef, useEffect } from 'react';

function FadeInView({ children }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start fully transparent

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,                           // Animate to fully opaque
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,                // ALWAYS use this — runs on native thread
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
}

// Modal — built-in overlay component
import { Modal, Pressable } from 'react-native';

function ConfirmModal({ visible, message, onConfirm, onCancel }) {
  return (
    <Modal
      visible={visible}
      transparent={true}           // See through to content behind
      animationType="fade"         // 'slide', 'fade', or 'none'
      onRequestClose={onCancel}    // Android back button
    >
      {/* Dark overlay — tap to dismiss */}
      <Pressable style={styles.overlay} onPress={onCancel}>
        {/* Stop tap propagation — tapping the card doesn't close */}
        <Pressable style={styles.modalCard} onPress={e => e.stopPropagation()}>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={{ color: 'white' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
```

---

## 📅 Week 6: Performance, Testing & App Deployment

### Module 11 — Performance & Testing

**Tutor Guidance:**
Performance in React Native is not just about speed — it is about smoothness. A 60fps scroll feels premium. A janky 20fps scroll feels broken, even if the data is correct. Teach students to *feel* the difference on a real device.

#### Performance Best Practices:

```jsx
// 1. useMemo — cache expensive calculations
import { useMemo } from 'react';

function ArticleList({ articles, searchQuery }) {
  // Without useMemo, this filters on every render (even unrelated ones)
  const filteredArticles = useMemo(
    () => articles.filter(a =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [articles, searchQuery] // Only re-run when these change
  );

  return <FlatList data={filteredArticles} ... />;
}

// 2. useCallback — stable function references for child components
import { useCallback } from 'react';

function ParentList({ items }) {
  const handlePress = useCallback((id) => {
    console.log('Pressed:', id);
  }, []); // No dependencies — function never changes

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <ItemCard item={item} onPress={handlePress} />
      )}
    />
  );
}

// 3. React.memo — prevent unnecessary re-renders of pure components
import { memo } from 'react';

const ArticleCard = memo(function ArticleCard({ article, onPress }) {
  // This component only re-renders if article or onPress actually changed
  return (
    <TouchableOpacity onPress={() => onPress(article.id)}>
      <Text>{article.title}</Text>
    </TouchableOpacity>
  );
});

// 4. Image optimisation
import { Image } from 'expo-image'; // expo-image is faster than React Native's built-in

<Image
  source={{ uri: article.imageUrl }}
  style={styles.thumbnail}
  contentFit="cover"
  cachePolicy="memory-disk"  // Aggressive caching
  placeholder={blurhash}     // Show a blurred placeholder while loading
/>
```

---

### Module 12 — Building & Publishing with Expo

**Tutor Guidance:**
Publishing an app is a powerful moment. Even publishing to Expo Go (not the App Store) is something students can share with family and friends. EAS Build is the modern, recommended way. App Store / Play Store submission is shown as a conceptual overview — the actual submission requires developer accounts ($99/year Apple, $25 one-time Google).

#### Expo Application Services (EAS) Setup:

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Log in to your Expo account (create one at expo.dev if needed)
eas login

# Configure the project for EAS
eas build:configure
# → Creates eas.json in your project root

# Build a preview APK for Android (shareable without Play Store)
eas build --platform android --profile preview

# Build for iOS (requires Apple Developer account for physical devices)
eas build --platform ios --profile preview

# Submit to stores (after registering developer accounts)
eas submit --platform android
eas submit --platform ios
```

#### `app.json` — App Configuration:

```json
{
  "expo": {
    "name": "Deejoft App",
    "slug": "deejoft-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1a1a2e"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.deejoft.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1a1a2e"
      },
      "package": "com.deejoft.app"
    },
    "extra": {
      "eas": {
        "projectId": "your-eas-project-id"
      }
    }
  }
}
```

---

## 🏆 Capstone Project Options

Students choose one of the following. Each is designed to exercise the full course stack.

---

### Option A: News Reader App
**Stack:** Expo Router, News API, AsyncStorage, FlatList, Animations

**Features:**
- Bottom tab navigation: Top Stories, Categories, Bookmarks, Profile
- FlatList of articles fetched from a live news API
- Article detail screen with a `<WebView>` to read the full article
- Bookmark/unbookmark articles (persisted with AsyncStorage)
- Pull-to-refresh on the feed
- Animated skeleton loading cards while fetching

---

### Option B: Expense Tracker
**Stack:** Context API, AsyncStorage, React Hook Form, Charts

**Features:**
- Add, edit, delete expense entries (category, amount, date, notes)
- Home screen: monthly total, spending by category (pie/bar chart)
- FlatList of expenses grouped by date (SectionList)
- Filter/search expenses
- Persistent storage (all data survives app close)
- Animated totals update when expenses change

---

### Option C: Fitness Tracker
**Stack:** Expo Location, Expo Sensors (pedometer), AsyncStorage, Animated API

**Features:**
- Home screen: Today's step count (live from pedometer), distance, calories
- Workout log: start/stop timer, record a session
- History screen: past workouts in a SectionList grouped by week
- Animated progress ring on the home screen
- Location permission request with graceful fallback

---

### 📊 Capstone Evaluation Rubric

| Criterion | Points |
|-----------|--------|
| Project scaffolded with Expo Router and pushed to GitHub | 5 |
| Minimum 6 functional components in separate files | 10 |
| File-based navigation with at least 3 screens | 10 |
| Props used correctly — no prop drilling beyond 2 levels | 5 |
| `useState` and `useEffect` used correctly | 10 |
| At least one Context used for global state | 10 |
| `FlatList` or `SectionList` with `keyExtractor` | 10 |
| Data persisted with AsyncStorage (survives app restart) | 10 |
| Loading and error states handled gracefully | 10 |
| `KeyboardAvoidingView` used on screens with inputs | 5 |
| App runs on physical device via Expo Go | 10 |
| EAS build APK generated and shareable | 5 |
| **Total** | **100** |

---

## 📐 Course Reference Card — React Native Quick Cheat Sheet

```
COMPONENT          WHEN TO USE
──────────────────────────────────────────────────────────────
View               Generic container (like <div>)
SafeAreaView       Root screen wrapper — avoids notches
Text               ALL text — must wrap every string
Image              Display images (local or remote)
TextInput          User text entry
TouchableOpacity   Tappable with opacity feedback
Pressable          Tappable with full control (modern, preferred)
ScrollView         Small, static scrollable content
FlatList           Long, dynamic lists — always virtualised
SectionList        Grouped/sectioned lists
Modal              Overlay dialogs
ActivityIndicator  Loading spinner
Alert              Native alert dialog (Alert.alert())
──────────────────────────────────────────────────────────────

HOOK               WHAT IT DOES
──────────────────────────────────────────────────────────────
useState           Local component state (same as React)
useEffect          Side effects — fetch, subscriptions, timers
useContext         Consume a Context value
useRef             Mutable ref — for Animated values, input focus
useMemo            Cache an expensive computed value
useCallback        Cache a function reference
useRouter          Navigate programmatically (Expo Router)
useLocalSearchParams  Read URL params (Expo Router)
──────────────────────────────────────────────────────────────

LAYOUT             RULE
──────────────────────────────────────────────────────────────
flexDirection      Defaults to 'column' (not 'row' like web CSS!)
flex: 1            Fill all remaining space in parent
alignItems         Cross-axis alignment
justifyContent     Main-axis alignment
gap                Space between flex children (RN 0.71+)
StyleSheet.create  Always use this — enables optimisation
```

---

## 📚 Recommended Resources

- **React Native Docs:** [reactnative.dev](https://reactnative.dev) — official documentation
- **Expo Docs:** [docs.expo.dev](https://docs.expo.dev) — everything about Expo, EAS, and APIs
- **Expo Router Docs:** [docs.expo.dev/router/introduction](https://docs.expo.dev/router/introduction)
- **React Native Directory:** [reactnative.directory](https://reactnative.directory) — find community libraries
- **William Candillon (YouTube):** "Can It Be Done in React Native?" — advanced animations
- **Simon Grimm (YouTube):** "Galaxies.dev" — practical Expo tutorials

---

*Deejoft Coding School — Instructor Materials | React Native Mobile Track*  
*Last Updated: 2025*
