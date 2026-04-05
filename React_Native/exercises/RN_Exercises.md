# ✏️ React Native Exercises
### Deejoft Coding School — All 8 Classes

**Setup:** All exercises use an Expo project. Run `npx create-expo-app@latest MyApp --template default` for a fresh start. Test on your phone via Expo Go.

---

## Week 1 — Components & Navigation

---

### Exercise 1.1 — Debug the RN Errors ⭐

Each snippet has a React Native-specific error. Identify the problem and fix it.

```jsx
// Error A — what does this crash with?
function WelcomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      Welcome to Deejoft
    </View>
  )
}

// Error B — why does the image not appear?
function Avatar({ uri }) {
  return <Image source={{ uri }} className="rounded-full" />
}

// Error C — what is wrong with this layout?
function BadgeRow() {
  return (
    <View>
      <Text>HTML</Text>
      <Text>CSS</Text>
      <Text>React</Text>
    </View>
  )
  // This should display the badges in a horizontal row
}

// Error D — what is the bug here?
<Pressable onPress={handleEnrol()}>
  <Text>Enrol Now</Text>
</Pressable>

// Error E — why does pressing this do nothing on Android?
<View onPress={() => console.log('tapped')}>
  <Text>Tap me</Text>
</View>
```

---

### Exercise 1.2 — Profile Screen ⭐⭐

Build a profile screen for a fictional Deejoft student using only components from Class 1.

**Requirements:**
- `SafeAreaView` as root
- Circular avatar image (use `https://i.pravatar.cc/150?img=12`)
- Name and job title in `<Text>` components
- Stats row: Courses (4), Projects (7), Streak (14d) — each in a separate column
- A `<ScrollView>` for the main content
- Two `<Pressable>` buttons: "Edit Profile" (brand colour) and "Share Profile" (outlined)
- Skills section: a horizontal `<ScrollView>` of skill badge items (HTML, CSS, JS, React, RN)
- All layout uses NativeWind classes only — no `StyleSheet.create`

---

### Exercise 1.3 — Course Catalogue ⭐⭐

Build a scrollable course catalogue screen:

```javascript
const courses = [
  { id: 1, title: 'HTML & CSS',   price: 49999, level: 'Beginner',     weeks: 2 },
  { id: 2, title: 'JavaScript',   price: 79999, level: 'Beginner',     weeks: 4 },
  { id: 3, title: 'React',        price: 89999, level: 'Intermediate', weeks: 4 },
  { id: 4, title: 'React Native', price: 89999, level: 'Intermediate', weeks: 4 },
  { id: 5, title: 'Python',       price: 79999, level: 'Beginner',     weeks: 4 },
]
```

Requirements:
- A `CourseCard` component: title, price (formatted as ₦x,xxx), level badge, weeks
- Render all courses in a `<ScrollView>` — NOT a FlatList yet
- Header text: "Our Courses" above the list
- Each card tappable with `Pressable` — log the course title on press

---

### Exercise 1.4 — Navigation Shell ⭐⭐⭐

Build a 3-tab navigation shell using Expo Router:

**File structure:**
```
app/
├── (tabs)/
│   ├── _layout.jsx    → tab configuration
│   ├── index.jsx      → Feed tab
│   ├── explore.jsx    → Explore tab
│   └── profile.jsx    → Profile tab (from Exercise 1.2)
└── course/
    └── [id].jsx       → Course detail screen
```

Requirements:
- Tabs with Ionicons icons (outline when inactive, filled when active)
- Custom brand colour for active tab
- Feed tab: 3 hardcoded `<Pressable>` cards that navigate to `/course/[id]`
- Course detail screen reads the `id` param and shows `"Viewing course {id}"`
- Correct safe area insets on tab bar

---

## Week 2 — Lists, Forms & Device APIs

---

### Exercise 2.1 — FlatList Migration ⭐

Take the course catalogue from Exercise 1.3 and migrate from `<ScrollView>` + `.map()` to `<FlatList>`.

Additional requirements:
- `keyExtractor` using the course `id`
- A `ListHeaderComponent` showing the course count: "5 courses available"
- A `ListEmptyComponent` shown when the list is empty
- At least three performance props: `removeClippedSubviews`, `initialNumToRender`, `maxToRenderPerBatch`

---

### Exercise 2.2 — Note-Taking App ⭐⭐

Build a note-taking screen with full keyboard handling:

```
State: { notes: [] }  — each note: { id, title, body, createdAt }

UI:
- TextInput for title (single line, autoFocus)
- TextInput for body (multiline, 5 lines)
- "Add Note" button (disabled when title is empty)
- FlatList of note cards below the form
- Long-press on a card deletes it (with Alert confirmation)
- Keyboard: pressing Next from title focuses body; Done from body saves

KeyboardAvoidingView correctly handles both iOS and Android
```

---

### Exercise 2.3 — Bookmark System with AsyncStorage ⭐⭐

Build a news feed with persistent bookmarks:

```javascript
const ARTICLES = [
  { id: '1', title: 'React Native New Architecture', category: 'Tech' },
  { id: '2', title: 'Expo SDK 52 Released',          category: 'Expo' },
  { id: '3', title: 'NativeWind v4 Guide',            category: 'Styling' },
  { id: '4', title: 'Building CLI Tools in Python',   category: 'Python' },
  { id: '5', title: 'useActionState in React 19',     category: 'React' },
]
```

Requirements:
- FlatList rendering the articles
- Bookmark icon (Ionicons `bookmark-outline` / `bookmark`) on each card
- Tapping bookmark toggles it — bookmarked articles show filled icon in brand colour
- Bookmarks persisted with AsyncStorage — survive app restart
- A "Bookmarks" tab that shows only bookmarked articles (using the same FlatList component)
- Pull-to-refresh on the main feed (simulate: clear and reload after 1s)

---

### Exercise 2.4 — Device API Explorer ⭐⭐⭐

Build a screen that demonstrates three device APIs:

**Location section:**
- "Get My Location" button
- Requests `foregroundPermissions`, shows city and coordinates on success
- Shows a graceful error message if permission denied

**Image Picker section:**
- "Pick from Gallery" button → opens image picker, square crop
- Displays the picked image in a circle (100×100, like an avatar preview)

**Haptics section:**
- Three buttons: "Light", "Medium", "Heavy" impact
- Each triggers `Haptics.impactAsync` with the corresponding `ImpactFeedbackStyle`
- "Notification Success / Warning / Error" buttons triggering `notificationAsync`

---

## Week 3 — TanStack Query & Auth

---

### Exercise 3.1 — TanStack Query Migration ⭐⭐

Take the course catalogue and replace the manual `useEffect` + `useState` fetch pattern with TanStack Query.

**Before (manual):**
```jsx
const [courses, setCourses] = useState([])
const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
  fetch('/api/courses').then(r => r.json()).then(setCourses).finally(() => setIsLoading(false))
}, [])
```

**After (TanStack):** Use `useQuery`. Show a loading spinner, handle errors. Implement pull-to-refresh using `refetch`. Use the REST Countries API as a data source (`https://restcountries.com/v3.1/all?fields=name,capital,flags,region`).

---

### Exercise 3.2 — Auth Flow ⭐⭐⭐

Build a complete login/logout flow using the `AuthContext` pattern from Class 6:

**File structure:**
```
app/
├── (auth)/
│   ├── _layout.jsx
│   └── login.jsx    → email + password form
├── (tabs)/
│   ├── _layout.jsx
│   ├── index.jsx    → protected home
│   └── profile.jsx  → shows user info + logout button
├── _layout.jsx      → AuthProvider wraps everything
└── index.jsx        → redirects based on auth state
```

Requirements:
- Login with any email/password (mock — no real API)
- Token stored in `SecureStore`
- Route guard: unauthenticated → `/login`, authenticated → `/(tabs)`
- Profile screen shows the logged-in user's email and name
- Logout button clears `SecureStore` and returns to `/login`
- Loading state while the initial session check runs (show a splash)

---

## Week 4 — Animation, Performance & Deployment

---

### Exercise 4.1 — Animated Card List ⭐⭐

Add entrance animations to the course catalogue cards:

- Cards enter with `FadeInDown` staggered by 60ms each (first card: 0ms, second: 60ms, etc.)
- Cards use `Layout.springify()` so that when one is deleted, the remaining cards animate into place
- A "Delete" swipe action on each card using `Swipeable` from Gesture Handler

---

### Exercise 4.2 — Animated Press States ⭐⭐

Build an `AnimatedPressable` component using `useSharedValue` and `useAnimatedStyle`:

```
Default state:    scale = 1.0, shadow opacity = 0.04
Pressed state:    scale = 0.97 (withSpring), shadow opacity = 0.12
Released state:   scale = 1.0 (withSpring)

Wrap two components with AnimatedPressable:
1. A course enrol button
2. A profile avatar (tapping should navigate to profile settings)
```

---

### Exercise 4.3 — EAS Build ⭐⭐⭐

Take any of your previous exercises (ideally the auth flow from 3.2) and build it as a shareable Android APK using EAS.

Requirements:
- `eas.json` with a `preview` profile configured for Android APK
- `app.json` updated with:
  - Correct app name: "Deejoft Mobile"
  - `package`: `com.deejoft.mobile`
  - Permissions for any device APIs used (location, photos)
- Run `eas build --platform android --profile preview`
- Share the download link with the tutor
- Push the project to GitHub with at least 8 meaningful commits

---

### Exercise 4.4 — Capstone ⭐⭐⭐

Build and submit an EAS APK for your chosen capstone project (from Class 8 brief).

**Minimum requirements (all must be in the APK):**

| Feature | Details |
|---------|---------|
| Navigation | Expo Router, 4+ screens, tab bar |
| Styling | NativeWind throughout, consistent tokens |
| Lists | `FlatList` or `FlashList` with performance props |
| Data | `useQuery` for all data fetching |
| Persistence | `AsyncStorage` or `SecureStore` |
| Animation | At least one `Reanimated 3` animation |
| Haptics | Meaningful interaction feedback |
| Auth | Login/logout flow (can be mock) |
| Build | Working EAS APK with download link |
| Code | GitHub repo, 8+ commits |

---

*Deejoft Coding School | React Native Exercises | Test every exercise on a real device via Expo Go*
