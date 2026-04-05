# 📋 React Native Class 3 — Lesson Plan (Tutor Script)
### State, FlatList & Gestures
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:55 | FlatList — virtualisation, performance props |
| 0:55 – 1:30 | TextInput, KeyboardAvoidingView, haptics |
| 1:30 – 2:00 | Build: news feed with FlatList |

---

## 🎤 PART A — FlatList vs ScrollView (0:10 – 0:35)

**[SAY:]:**
> "On the web, you can `.map()` inside a `ScrollView` and it works. In React Native this is a hidden performance trap. `ScrollView` renders ALL its children at once — hidden or visible. On a list of 500 articles, all 500 are in memory simultaneously. `FlatList` is virtualised: it only renders what is visible on screen plus a small buffer. Scroll down — it renders more. Scroll back up — it recycles the cells. This is why `FlatList` is non-negotiable for any dynamic list."

**[DRAW on board:]**
```
ScrollView:      [ card ][ card ][ card ][ card ][ card ]...  ALL in memory
FlatList:        [ card ][ card ][ card ]  ← only visible ones
                 ← recycles cells as you scroll →
```

**[TYPE:]**
```jsx
import { FlatList, View, Text, Image, Pressable } from 'react-native'
import * as Haptics from 'expo-haptics'

function ArticleCard({ item, onBookmark, isBookmarked }) {
  return (
    <Pressable
      className="bg-white rounded-2xl overflow-hidden mb-4 mx-4"
      style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }]}
      onPress={() => console.log('Open article', item.id)}
      onLongPress={async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        onBookmark(item.id)
      }}
    >
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} className="w-full h-48" resizeMode="cover" />
      )}
      <View className="p-4 gap-2">
        <Text className="text-xs font-bold text-brand uppercase tracking-wide">
          {item.category}
        </Text>
        <Text className="text-lg font-bold text-dark leading-snug" numberOfLines={2}>
          {item.title}
        </Text>
        <Text className="text-sm text-muted" numberOfLines={2}>
          {item.summary}
        </Text>
      </View>
    </Pressable>
  )
}

function NewsFeed({ articles, bookmarks, onBookmark, onRefresh, isRefreshing, onLoadMore }) {
  return (
    <FlatList
      data={articles}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <ArticleCard
          item={item}
          onBookmark={onBookmark}
          isBookmarked={bookmarks.includes(item.id)}
        />
      )}

      // ── Performance props ──
      removeClippedSubviews      // Unmount off-screen items (Android)
      initialNumToRender={6}     // Render 6 items on first load
      maxToRenderPerBatch={4}    // Render 4 new items per scroll batch
      windowSize={10}            // Keep 10 viewports' worth of items mounted

      // ── Pull-to-refresh ──
      refreshing={isRefreshing}
      onRefresh={onRefresh}

      // ── Infinite scroll ──
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.3}   // Fire when 30% from bottom

      // ── Empty state ──
      ListEmptyComponent={() => (
        <View className="flex-1 items-center justify-center py-20 gap-3">
          <Text className="text-6xl">📭</Text>
          <Text className="text-lg font-bold text-dark">No articles yet</Text>
          <Text className="text-muted">Pull down to refresh</Text>
        </View>
      )}

      // ── Header ──
      ListHeaderComponent={() => (
        <Text className="text-2xl font-bold text-dark px-4 pt-4 pb-2">Latest News</Text>
      )}

      contentContainerClassName="pb-8"
    />
  )
}
```

**[SAY for `numberOfLines`:]:**
> "`numberOfLines={2}` truncates text after 2 lines with an ellipsis. Essential for cards where you need predictable heights. Without it, long titles break your card layout."

---

## 🎤 PART B — TextInput & KeyboardAvoidingView (0:55 – 1:30)

**[SAY:]:**
> "The keyboard in mobile is not like the web. It physically covers half the screen. If you have an input at the bottom of the screen — a chat input, a comment field — the keyboard will cover it completely. `KeyboardAvoidingView` pushes the content up when the keyboard appears."

**[TYPE:]**
```jsx
import { TextInput, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'

function AddNoteScreen() {
  const [title, setTitle] = useState('')
  const [body, setBody]   = useState('')

  const handleSave = () => {
    if (!title.trim()) return
    console.log({ title, body })
    setTitle('')
    setBody('')
    Keyboard.dismiss()
  }

  return (
    // Tapping outside dismisses keyboard
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 p-5 gap-4">
          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-dark"
            value={title}
            onChangeText={setTitle}
            placeholder="Title..."
            placeholderTextColor="#888"
            returnKeyType="next"
            autoFocus
          />
          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-dark"
            value={body}
            onChangeText={setBody}
            placeholder="Start writing..."
            placeholderTextColor="#888"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            returnKeyType="done"
          />
          <Pressable
            className={`rounded-2xl py-4 items-center ${!title.trim() ? 'bg-gray-300' : 'bg-brand'}`}
            onPress={handleSave}
            disabled={!title.trim()}
          >
            <Text className="text-white font-bold text-base">Save Note</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
```

**[SAY for `behavior` platform split:]:**
> "The behaviour of `KeyboardAvoidingView` is different on iOS and Android. On iOS, `'padding'` adds padding at the bottom to push the content up. On Android, `'height'` reduces the view height. This `Platform.OS` ternary is something you will write dozens of times in React Native — save it in your notes."

---

*Deejoft Coding School | React Native Class 3*

---
---

# 📋 React Native Class 4 — Lesson Plan (Tutor Script)
### Device APIs & AsyncStorage
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:55 | AsyncStorage — the mobile localStorage |
| 0:55 – 1:30 | Device APIs: Location, ImagePicker |
| 1:30 – 2:00 | Build: bookmarks with AsyncStorage |

---

## 🎤 PART A — AsyncStorage (0:10 – 0:55)

**[SAY:]:**
> "AsyncStorage is the React Native equivalent of `localStorage`, with one critical difference: it is async. Every read and every write returns a Promise. You cannot call `AsyncStorage.getItem()` and use the result on the next line — you must `await` it."

```bash
npx expo install @react-native-async-storage/async-storage
```

**[TYPE — the storage service pattern:]**
```javascript
// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Storage = {
  async get(key) {
    try {
      const raw = await AsyncStorage.getItem(key)
      return raw ? JSON.parse(raw) : null
    } catch (e) {
      console.error('Storage.get error:', e)
      return null
    }
  },

  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('Storage.set error:', e)
    }
  },

  async remove(key) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.error('Storage.remove error:', e)
    }
  },
}

// Using it in a component
const BOOKMARKS_KEY = '@deejoft/bookmarks'

function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([])

  // Load on mount
  useEffect(() => {
    Storage.get(BOOKMARKS_KEY).then(saved => {
      if (saved) setBookmarks(saved)
    })
  }, [])

  const toggleBookmark = async (articleId) => {
    const next = bookmarks.includes(articleId)
      ? bookmarks.filter(id => id !== articleId)
      : [...bookmarks, articleId]
    setBookmarks(next)
    await Storage.set(BOOKMARKS_KEY, next)
  }

  return { bookmarks, toggleBookmark }
}
```

---

## 🎤 PART B — Device APIs (0:55 – 1:30)

```bash
npx expo install expo-location expo-image-picker expo-haptics
```

**[TYPE:]**
```javascript
// Location
import * as Location from 'expo-location'

async function getCity() {
  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    Alert.alert('Permission needed', 'Location access is required for this feature.')
    return null
  }
  const { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  })
  const [place] = await Location.reverseGeocodeAsync(coords)
  return `${place.city}, ${place.country}`
}

// Image Picker
import * as ImagePicker from 'expo-image-picker'

async function pickAvatar() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (status !== 'granted') return null

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],    // Square crop
    quality: 0.8,
  })

  if (result.canceled) return null
  return result.assets[0].uri
}
```

**[SAY — always request permission first:]:**
> "Every sensitive API — location, camera, microphone, contacts, notifications — requires explicit permission from the user. The permission request shows a system dialog. If the user denies it, you must handle that gracefully — no crashing, no infinite loading. Show a message explaining why the permission is needed and provide an alternative where possible."

---

*Deejoft Coding School | React Native Class 4*

---
---

# 📋 React Native Class 5 — Lesson Plan (Tutor Script)
### TanStack Query for Async State
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:55 | TanStack Query — useQuery, caching, background refetch |
| 0:55 – 1:30 | useMutation and optimistic updates |
| 1:30 – 2:00 | Build: news app with TanStack Query |

---

## 🎤 PART A — Why TanStack Query (0:10 – 0:25)

**[SAY:]:**
> "In the React course, we wrote the fetch pattern with a cancellation flag, loading state, error state, and useEffect. That is 15–20 lines per data fetch. TanStack Query replaces all of that with two lines — and adds features you would not have built yourself: automatic caching, background refetching, stale-while-revalidate, request deduplication, and offline support."

```bash
npm install @tanstack/react-query
```

**[SETUP the QueryClient in layout:]**
```jsx
// app/_layout.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:  5 * 60 * 1000,   // 5 min — data is "fresh" for this long
      gcTime:     10 * 60 * 1000,  // 10 min — keep in cache after component unmounts
      retry: 2,
      refetchOnWindowFocus: false,  // Do not refetch when app comes to foreground
    },
  },
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  )
}
```

---

## 🎤 PART B — useQuery & useMutation (0:25 – 1:30)

**[TYPE:]**
```jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// useQuery — fetch and cache
function CoursesScreen() {
  const { data: courses, isLoading, error, refetch } = useQuery({
    queryKey: ['courses'],            // Cache key — array, must be unique
    queryFn: () => fetch('https://api.deejoft.com/courses').then(r => r.json()),
  })

  if (isLoading) return <ActivityIndicator color="#e94560" />
  if (error)     return <Text>Error: {error.message}</Text>

  return (
    <FlatList
      data={courses}
      keyExtractor={c => c.id.toString()}
      renderItem={({ item }) => <CourseCard course={item} />}
      refreshing={false}
      onRefresh={refetch}   // Pull-to-refresh triggers a refetch
    />
  )
}

// useMutation — for data changes that send to server
function EnrolButton({ courseId }) {
  const queryClient = useQueryClient()

  const { mutate: enrol, isPending } = useMutation({
    mutationFn: (id) =>
      fetch(`/api/courses/${id}/enrol`, { method: 'POST' }).then(r => r.json()),

    // Optimistic update — update UI before server responds
    onMutate: async (id) => {
      // Cancel any in-flight refetches
      await queryClient.cancelQueries({ queryKey: ['course', id] })
      // Snapshot the previous value for rollback
      const previous = queryClient.getQueryData(['course', id])
      // Optimistically update
      queryClient.setQueryData(['course', id], old => ({ ...old, isEnrolled: true }))
      return { previous }
    },
    onError: (err, id, context) => {
      // Rollback on error
      queryClient.setQueryData(['course', id], context.previous)
    },
    onSettled: (data, error, id) => {
      // Sync with server truth
      queryClient.invalidateQueries({ queryKey: ['course', id] })
    },
  })

  return (
    <Pressable
      className={`bg-brand rounded-2xl py-4 items-center ${isPending ? 'opacity-60' : ''}`}
      onPress={() => enrol(courseId)}
      disabled={isPending}
    >
      <Text className="text-white font-bold">
        {isPending ? 'Enrolling…' : 'Enrol Now'}
      </Text>
    </Pressable>
  )
}
```

---

*Deejoft Coding School | React Native Class 5*

---
---

# 📋 React Native Class 6 — Lesson Plan (Tutor Script)
### Authentication Flow & SecureStore
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:50 | AuthContext with SecureStore |
| 0:50 – 1:30 | Route guards with Expo Router |
| 1:30 – 2:00 | Build: login flow |

---

## 🎤 PART A — SecureStore & AuthContext (0:10 – 0:50)

**[SAY:]:**
> "AsyncStorage stores data as plain text. For sensitive data — auth tokens, passwords — we use `expo-secure-store`. On iOS it uses the Keychain. On Android it uses the Keystore system. The data is encrypted and protected by the device's hardware security module."

```bash
npx expo install expo-secure-store
```

**[TYPE:]**
```jsx
// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { useSegments, useRouter } from 'expo-router'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const segments = useSegments()
  const router   = useRouter()

  // Load stored session on app start
  useEffect(() => {
    SecureStore.getItemAsync('session')
      .then(raw => setSession(raw ? JSON.parse(raw) : null))
      .finally(() => setIsReady(true))
  }, [])

  // Route guard — runs whenever session or location changes
  useEffect(() => {
    if (!isReady) return
    const inAuthGroup = segments[0] === '(auth)'
    if (!session && !inAuthGroup) router.replace('/(auth)/login')
    if  (session &&  inAuthGroup) router.replace('/(tabs)')
  }, [session, isReady, segments])

  const signIn = async (email, password) => {
    // Real app: POST to your API, get back a token
    const mockSession = { userId: '1', name: 'Ada', email, token: 'mock-jwt' }
    await SecureStore.setItemAsync('session', JSON.stringify(mockSession))
    setSession(mockSession)
  }

  const signOut = async () => {
    await SecureStore.deleteItemAsync('session')
    setSession(null)
  }

  if (!isReady) return null  // Splash screen

  return (
    <AuthContext.Provider value={{ session, user: session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
```

**[SAY for `useSegments`:]:**
> "`useSegments` returns an array of the current route path segments. `segments[0] === '(auth)'` means the user is currently on a route inside the `(auth)` group — like `/login` or `/register`. The route guard uses this to redirect: no session and not in auth group → go to login. Has session and in auth group → go to main app."

---

*Deejoft Coding School | React Native Class 6*

---
---

# 📋 React Native Class 7 — Lesson Plan (Tutor Script)
### Reanimated 3 & Gesture Handler
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:55 | Reanimated 3 — shared values, animated styles, entering animations |
| 0:55 – 1:30 | Gesture Handler — tap, swipe, bottom sheet |
| 1:30 – 2:00 | Build: animated card list with swipe-to-delete |

---

## 🎤 PART A — Why Reanimated (0:10 – 0:20)

**[SAY:]:**
> "React Native's built-in `Animated` API runs on the JavaScript thread. Heavy animations can drop frames because the JS thread handles everything else too — state updates, event handling, re-renders. Reanimated 3 runs animations on the UI thread directly, in native code, via worklets — small functions that execute on the UI thread without going through JavaScript. The result is 60fps animations even during heavy JS work."

```bash
npx expo install react-native-reanimated react-native-gesture-handler
```

---

## 🎤 PART B — Reanimated 3 Patterns (0:20 – 0:55)

**[TYPE:]**
```jsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeInDown,
  Layout,
} from 'react-native-reanimated'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'

// Entering animation — cards fade in and slide up staggered
function ArticleCard({ item, index }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 60).springify()}
      layout={Layout.springify()}   // Animate layout changes (deletion, reorder)
      className="bg-white rounded-2xl p-4 mb-3 mx-4"
    >
      <Text className="font-bold text-dark">{item.title}</Text>
    </Animated.View>
  )
}

// Interactive scale animation on press
function AnimatedCard({ children }) {
  const scale  = useSharedValue(1)
  const shadow = useSharedValue(0.04)

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: shadow.value,
  }))

  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value  = withSpring(0.97, { damping: 15 })
      shadow.value = withTiming(0.12)
    })
    .onFinalize(() => {
      scale.value  = withSpring(1, { damping: 15 })
      shadow.value = withTiming(0.04)
    })

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[animStyle, { backgroundColor: 'white', borderRadius: 16, padding: 16 }]}>
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

// Swipeable row — delete on swipe left
import { Swipeable } from 'react-native-gesture-handler'

function SwipeableItem({ item, onDelete }) {
  const renderRightAction = () => (
    <Pressable
      className="bg-red-500 justify-center items-center w-20 rounded-r-2xl"
      onPress={() => onDelete(item.id)}
    >
      <Ionicons name="trash-outline" size={22} color="white" />
    </Pressable>
  )

  return (
    <Swipeable renderRightActions={renderRightAction} rightThreshold={40}>
      <View className="bg-white p-4 flex-row items-center gap-3">
        <Text className="flex-1 text-base text-dark">{item.text}</Text>
      </View>
    </Swipeable>
  )
}
```

**[SAY for `useSharedValue`:]:**
> "`useSharedValue` is the Reanimated equivalent of a React ref — a mutable container that does not trigger re-renders. But unlike a ref, shared values live on the UI thread. When you call `withSpring` or `withTiming` on a shared value, the animation runs entirely on the UI thread — no communication with JavaScript until it finishes."

---

*Deejoft Coding School | React Native Class 7*

---
---

# 📋 React Native Class 8 — Lesson Plan (Tutor Script)
### Performance, EAS Build & Publishing
**Duration:** ~2 hours

---

## ⏱ Session Timeline
| Time | Segment |
|------|---------|
| 0:00 – 0:10 | Recap |
| 0:10 – 0:45 | Performance: memo, FlashList, expo-image |
| 0:45 – 1:15 | EAS Build — eas.json, building an APK |
| 1:15 – 1:45 | app.json configuration and permissions |
| 1:45 – 2:00 | Capstone brief + wrap-up |

---

## 🎤 PART A — Performance (0:10 – 0:45)

**[TYPE:]**
```jsx
import { memo, useCallback } from 'react'
import { FlashList } from '@shopify/flash-list'

// memo — skip re-render if props unchanged
const CourseCard = memo(function CourseCard({ course, onEnrol }) {
  return (
    <Pressable onPress={() => onEnrol(course.id)} className="bg-white rounded-xl p-4 mb-3">
      <Text className="font-bold text-dark">{course.title}</Text>
    </Pressable>
  )
})

// useCallback — stable reference so memo'd children don't re-render
function CourseList({ courses }) {
  const handleEnrol = useCallback((id) => {
    router.push(`/course/${id}/enrol`)
  }, [])

  // FlashList — drop-in FlatList replacement (10× faster for large lists)
  return (
    <FlashList
      data={courses}
      renderItem={({ item }) => <CourseCard course={item} onEnrol={handleEnrol} />}
      estimatedItemSize={100}   // Required — estimated height of each item
      keyExtractor={c => c.id.toString()}
    />
  )
}

// expo-image — faster loading, blurhash placeholder, hardware decoding
import { Image } from 'expo-image'

<Image
  source={{ uri: imageUrl }}
  placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk"
  className="w-full h-48 rounded-xl"
/>
```

---

## 🎤 PART B — EAS Build (0:45 – 1:15)

```bash
npm install -g eas-cli
eas login
eas build:configure    # Creates eas.json
```

```json
// eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "android": { "buildType": "app-bundle" }
    }
  }
}
```

```bash
# Build a shareable APK — no Play Store account needed
eas build --platform android --profile preview
# → Builds in the cloud, returns a download link in ~15 min
# → Share the link — anyone with the link can install on Android

# Over-the-air JS update — no new build
eas update --branch preview --message "Fix: card layout"
```

**[SAY:]:**
> "EAS builds in the cloud. Students do not need Android Studio or Xcode installed. The build takes 10–20 minutes and returns a shareable download link. OTA updates push JavaScript changes instantly without going through the app store — within seconds of `eas update`, users get the new code."

---

## 🏆 Capstone Project Brief (1:45 – 2:00)

**[SAY:]:**
> "Your React Native capstone can be any of three projects. Each must be a working EAS APK — not just running in Expo Go."

**Options:**
- **Deejoft Mobile** — Course listing, enrolment flow, student profile, push notifications for class reminders
- **Habit Tracker** — Daily check-ins, streak tracking, animated progress rings, weekly charts
- **Local Events Finder** — Device location, nearby events from a public API, interactive map, save events

**Requirements for all:** EAS APK build, Expo Router with 4+ screens, NativeWind styling, FlatList or FlashList, TanStack Query, AsyncStorage or SecureStore, at least one Reanimated 3 animation, haptic feedback, GitHub repo with 8+ commits.

---

*Deejoft Coding School | React Native Classes 3–8*
