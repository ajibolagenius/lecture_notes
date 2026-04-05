# 📋 React Native Class 1 — Lesson Plan (Tutor Script)
### Environment, Core Components & NativeWind Styling
**Duration:** ~2 hours | **Format:** Scaffold together, then build

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:20 | Web → Mobile mental model shift |
| 0:20 – 0:45 | Expo scaffold + project tour |
| 0:45 – 1:20 | Core components and NativeWind styling |
| 1:20 – 1:55 | Build: profile screen |
| 1:55 – 2:00 | Homework brief |

---

## 🛠 Setup (Do Before Students Arrive)
- Node.js v20+ verified
- Expo Go installed on your phone — test QR scan works
- Terminal open, ready to scaffold
- The Web vs Mobile comparison table drawn on the board (or projected)

---

## 🎤 PART A — The Web to Mobile Shift (0:00 – 0:20)

### The Core Difference (10 min)

**[SAY:]:**
> "You already know React. You already know hooks, props, state, components. About 60% of what you wrote in the React course transfers directly to React Native. What changes is the environment — no browser, no DOM, no HTML tags, no CSS files. Instead of a browser rendering HTML, a JavaScript engine running on the device tells iOS and Android to create real native UI elements."

**[DRAW on board:]**
```
React Web                    React Native
─────────────────────────    ─────────────────────────
<div>              →         <View>
<p>, <h1>, <span>  →         <Text>          (ALL text must be in <Text>)
<img>              →         <Image>
<input>            →         <TextInput>
<button>           →         <Pressable>
<ul> with .map()   →         <FlatList>      (virtualised — required for perf)
CSS file           →         NativeWind      (Tailwind classes in RN)
React Router       →         Expo Router     (same file-based concept)
localStorage       →         AsyncStorage    (async — must await)
```

**[SAY:]:**
> "The most important rule on this board: ALL text must be inside a `<Text>` component. Every single string. `<View>Hello</View>` is a fatal error in React Native. On the web, you can put text directly in a `<div>` — here you cannot. Let me show you."

**[DEMO — type this, run it, show the error:]**
```jsx
// ❌ Fatal error
<View>Hello World</View>

// ✅ Correct
<View><Text>Hello World</Text></View>
```

**[SAY:]:**
> "The second critical difference: `flexDirection` defaults to `'column'` in React Native, not `'row'` like on the web. Items stack vertically by default. To make a horizontal row, you must explicitly write `flex-row` in NativeWind or `flexDirection: 'row'` in StyleSheet. I guarantee you will forget this at some point this course and be confused for 90 seconds. Now you know why."

---

### The New Architecture (5 min)

**[SAY:]:**
> "React Native used to work through a bridge — a serialised JSON channel between JavaScript and native code. It was the main performance bottleneck. The New Architecture (now default in Expo SDK 52) replaces this with JSI — JavaScript Interface — which allows synchronous, direct calls between JavaScript and native code. No bridge, no serialisation overhead. This is why modern React Native apps feel fast and native."

---

## 🎤 PART B — Scaffold with Expo (0:20 – 0:45)

**[DO with students:]**
```bash
npx create-expo-app@latest DeejoftMobile --template default
cd DeejoftMobile

# Install NativeWind
npx expo install nativewind tailwindcss
npx tailwindcss init

npx expo start
# → Scan QR code with Expo Go on your phone
```

**[SETUP NativeWind together:]**

```js
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: '#e94560',
        dark:  '#1a1a2e',
        muted: '#888899',
      },
    },
  },
}
```

```js
// babel.config.js — add NativeWind preset
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  }
}
```

**[WALK THROUGH the project structure:]**
```
DeejoftMobile/
├── app/
│   ├── _layout.jsx         ← Root layout — providers go here
│   └── index.jsx           ← Home screen
├── components/             ← Reusable components
├── assets/                 ← Images, fonts
├── app.json                ← Expo config: name, icon, permissions
└── tailwind.config.js
```

---

## 🎤 PART C — Core Components & NativeWind (0:45 – 1:20)

**[SAY:]:**
> "Let me show you the five most important components you will use on almost every screen."

**[TYPE — working profile screen, explain each component:]**
```jsx
// app/index.jsx
import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  return (
    // SafeAreaView — keeps content clear of notches, status bar, and home indicator
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-8 items-center gap-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Image — requires explicit width and height */}
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
          className="w-24 h-24 rounded-full border-4 border-brand"
        />

        {/* Text — ALL strings must be inside Text */}
        <View className="items-center gap-1">
          <Text className="text-2xl font-bold text-dark">Ada Lovelace</Text>
          <Text className="text-base text-muted">Full-Stack Developer</Text>
        </View>

        {/* Stats row */}
        <View className="flex-row gap-8">
          {[
            { label: 'Projects', value: '12' },
            { label: 'Courses',  value: '4'  },
            { label: 'Streak',   value: '21d' },
          ].map(stat => (
            <View key={stat.label} className="items-center gap-1">
              <Text className="text-2xl font-bold text-dark">{stat.value}</Text>
              <Text className="text-sm text-muted">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Pressable — the modern tap target */}
        <Pressable
          className="w-full bg-brand rounded-2xl py-4 items-center active:opacity-80"
          onPress={() => console.log('Edit profile')}
        >
          <Text className="text-white font-bold text-base">Edit Profile</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  )
}
```

**[PAUSE after each component — explain:]:**

**After `SafeAreaView`:**
> "This is not optional. Without it, your content goes under the device's notch, status bar, and the home indicator at the bottom. Always wrap your screen root in `SafeAreaView`."

**After `Image`:**
> "React Native's `Image` needs explicit dimensions unlike web images. If you do not provide `width` and `height` (or equivalent NativeWind classes), the image will not render. It also uses `source={{ uri: url }}` for remote images and `source={require('../assets/photo.png')}` for local files — note the double curly braces for remote URLs."

**After `Pressable`:**
> "`Pressable` is the modern tap target. It receives a `state` object in its `style` prop for pressed/focused/hovered states. The NativeWind `active:opacity-80` class applies when pressed. Never use a plain `<View>` for something the user should tap — it has no touch feedback and no accessibility semantics."

**[SAY for NativeWind differences:]:**
> "NativeWind brings Tailwind to React Native, but with key differences. There is no `display: block` — everything is Flexbox. No `overflow: hidden` by default. No `position: sticky`. And most importantly: `flex-direction` defaults to column, so you need `flex-row` explicitly for horizontal layouts."

---

## 🎤 PART D — Build: Profile Screen (1:20 – 1:55)

**[SAY:]:**
> "Now build it yourselves. Take the profile screen we just wrote and add: a bio paragraph below the stats, a horizontal row of skill badges (HTML, CSS, JavaScript, React), and a second button 'View Portfolio' below 'Edit Profile'."

**[CIRCULATE and watch for:]**
- Text strings not wrapped in `<Text>` — most common error
- Forgetting `flex-row` for horizontal layouts
- Missing `key` on mapped items
- `onPress={fn()}` instead of `onPress={fn}` (same bug as React)

---

## 🔚 Homework

> "Before Class 2: create a `components/` folder and extract the stats row into a `StatsRow` component that takes a `stats` prop (array of `{ label, value }` objects). Also extract the skill badges into a `SkillBadge` component."

---

## 📎 Tutor Notes

**Expo Go tip:** If QR scan fails, students on the same Wi-Fi network can tunnel. In the Expo console press `t` to switch to tunnel mode. Slower but more reliable across different network configurations.

**The most common error in this class:** `Text strings must be rendered within a <Text> component` — students concatenate template literals or put static text directly in `<View>`. Catch it early and reinforce the rule.

---
---

# 📋 React Native Class 2 — Lesson Plan (Tutor Script)
### Expo Router & Tab Navigation
**Duration:** ~2 hours

---

## ⏱ Session Timeline

| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Homework review |
| 0:10 – 0:50 | Expo Router file structure and tab navigation |
| 0:50 – 1:30 | Navigation between screens, dynamic routes |
| 1:30 – 2:00 | Build: 3-tab app shell |

---

## 🎤 PART A — Expo Router File Structure (0:10 – 0:50)

**[SAY:]:**
> "Expo Router is to React Native what Next.js is to React web — file-based routing. Every file in the `app/` folder is a screen. The folder structure is the route structure. If you understand Next.js file routing, you already understand this. If not, the concept is simple: the name and location of a file determines its URL."

**[TYPE on board or project:]**
```
app/
├── _layout.jsx          → Root layout — wraps everything. Put providers here.
├── index.jsx            → Screen: '/'   (home tab)
├── explore.jsx          → Screen: '/explore'
├── profile.jsx          → Screen: '/profile'
└── course/
    ├── _layout.jsx      → Layout for all /course/* routes
    ├── index.jsx        → Screen: '/course'
    └── [slug].jsx       → Screen: '/course/react' — dynamic, reads slug param
```

**[BUILD the tab layout together:]**

```jsx
// app/(tabs)/_layout.jsx
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TABS = [
  { name: 'index',   title: 'Home',    icon: 'home-outline'    },
  { name: 'explore', title: 'Explore', icon: 'compass-outline' },
  { name: 'profile', title: 'Profile', icon: 'person-outline'  },
]

export default function TabsLayout() {
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          const tab = TABS.find(t => t.name === route.name)
          const iconName = focused
            ? tab.icon.replace('-outline', '')
            : tab.icon
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#e94560',
        tabBarInactiveTintColor: '#888899',
        tabBarStyle: {
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: 'white',
          borderTopColor: '#e2e2e8',
        },
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
      })}
    >
      {TABS.map(tab => (
        <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title }} />
      ))}
    </Tabs>
  )
}
```

**[SAY for `useSafeAreaInsets`:]:**
> "The insets give you the exact pixel height of the bottom safe area — the home indicator bar on modern iPhones and the navigation gesture area on Android. Adding `insets.bottom` to the tab bar height ensures the tab bar sits above the home indicator rather than underneath it."

---

## 🎤 PART B — Navigation Between Screens (0:50 – 1:30)

**[TYPE:]**
```jsx
import { Link, useRouter, useLocalSearchParams } from 'expo-router'

// Method 1: Link component — declarative
<Link href="/profile" asChild>
  <Pressable className="bg-brand px-4 py-2 rounded-xl">
    <Text className="text-white font-bold">View Profile</Text>
  </Pressable>
</Link>

// Method 2: useRouter — programmatic, use inside event handlers
function CourseListScreen() {
  const router = useRouter()

  const openCourse = (slug) => {
    router.push(`/course/${slug}`)
  }

  return (
    <Pressable onPress={() => openCourse('react')}>
      <Text>Open React Course</Text>
    </Pressable>
  )
}

// Method 3: Reading dynamic params
// File: app/course/[slug].jsx
function CourseDetailScreen() {
  const { slug } = useLocalSearchParams()
  return <Text>Course: {slug}</Text>
}

// Navigation methods:
router.push('/path')                    // Add to stack
router.replace('/path')                 // Replace current — no back button
router.back()                           // Go back one screen
router.navigate('/path')                // Smart: if on stack, goes back; otherwise pushes
```

---

## 📅 Class 2 Exercise (1:30 – 2:00)

Build the navigation shell:
- 3-tab layout: Feed, Search, Profile
- Feed tab: hardcoded list of 3 post cards in a `<ScrollView>`
- Tapping a post card navigates to `post/[id]` screen showing the post ID
- Profile tab: the profile screen from Class 1
- Search tab: a `<TextInput>` search bar at the top + placeholder text

---

*Deejoft Coding School | React Native Classes 1–2*
