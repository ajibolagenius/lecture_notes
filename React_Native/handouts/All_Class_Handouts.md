# 📄 React Native Classes 1–8 — Student Handouts
### Deejoft Coding School | Mobile Development Track

---

# Class 1 — Environment, Core Components & NativeWind

## A. Web → Mobile Translation Table

| Web (React) | React Native | Important difference |
|---|---|---|
| `<div>` | `<View>` | Default flex-direction is **column**, not row |
| `<p>`, `<h1>`, `<span>` | `<Text>` | **ALL** text must be inside `<Text>` |
| `<img>` | `<Image>` | Needs explicit width + height |
| `<input>` | `<TextInput>` | Keyboard behaviour is explicit |
| `<button>` | `<Pressable>` | Touch targets + haptic feedback |
| `<ul>` + `.map()` | `<FlatList>` | Virtualised — required for perf |
| CSS file / className | NativeWind | Tailwind classes, no cascade |
| React Router | Expo Router | Same file-based concept |
| `localStorage` | `AsyncStorage` | **Must `await`** — it is async |

> ⚠️ **The two rules you will forget and then remember:**
> 1. ALL text must be inside `<Text>` — putting a string directly in `<View>` is a fatal error.
> 2. `flexDirection` defaults to `'column'` — you need `className="flex-row"` for horizontal layouts.

---

## B. Core Component Reference

```jsx
import { View, Text, Image, Pressable, ScrollView, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// SafeAreaView — root wrapper for every screen (avoids notch/status bar)
<SafeAreaView className="flex-1 bg-white">

// View — container (like div)
<View className="flex-1 px-4 gap-3">

// Text — ALL text (like p, h1, span)
<Text className="text-2xl font-bold text-dark" numberOfLines={2}>Title</Text>

// Image — remote image
<Image
  source={{ uri: 'https://...' }}   // remote
  // source={require('../assets/logo.png')}  // local
  className="w-24 h-24 rounded-full"
  resizeMode="cover"
/>

// Pressable — tap target
<Pressable
  onPress={() => console.log('Tapped')}
  onLongPress={() => console.log('Long pressed')}
  className="bg-brand rounded-xl py-3 px-6 items-center active:opacity-80"
>
  <Text className="text-white font-bold">Press Me</Text>
</Pressable>

// ScrollView — for short, static content only
<ScrollView showsVerticalScrollIndicator={false}>

// TextInput — controlled input
<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Type here..."
  placeholderTextColor="#888"
  returnKeyType="done"
  multiline          // for textarea behaviour
  textAlignVertical="top"  // Android: start text from top when multiline
/>
```

---

## C. NativeWind Differences from Web Tailwind

```jsx
// ✅ flex-row is required for horizontal layouts (default is column!)
<View className="flex-row gap-4 items-center">

// ✅ flex-1 fills available space (equivalent to flex: 1 in StyleSheet)
<View className="flex-1">

// ✅ gap works for spacing between children
<View className="gap-3">

// ✅ active: variant for pressed state
<Pressable className="bg-brand active:opacity-80">

// ❌ No display: block, no float, no position: sticky
// ❌ No shorthand borders — use borderWidth + borderColor separately
// ❌ No CSS cascade — styles are fully scoped to each element
```

> ✏️ **Fill in:** To centre items horizontally in a `flex-row` container, use `justify-content: ____________`. To centre them vertically, use `align-items: ____________`.

---

## ⚡ Class 1 Quick Reference

| Task | Code |
|------|------|
| Root screen wrapper | `<SafeAreaView className="flex-1 bg-white">` |
| Horizontal row | `<View className="flex-row gap-4">` |
| Remote image | `source={{ uri: url }}` |
| Tap handler | `<Pressable onPress={fn}>` |
| Pressed style | `className="... active:opacity-80"` |
| All text | Must be in `<Text>` |
| Image circle | `className="rounded-full"` |

---

# Class 2 — Expo Router & Navigation

## A. File-Based Routes

```
app/
├── _layout.jsx             → root layout
├── (tabs)/
│   ├── _layout.jsx         → tab bar config
│   ├── index.jsx           → '/'  (Home tab)
│   ├── explore.jsx         → '/explore'
│   └── profile.jsx         → '/profile'
├── (auth)/
│   ├── login.jsx           → '/login'
│   └── register.jsx        → '/register'
└── course/
    └── [slug].jsx          → '/course/react' — dynamic
```

## B. Navigation API

```jsx
import { Link, useRouter, useLocalSearchParams } from 'expo-router'

// Declarative
<Link href="/profile" asChild>
  <Pressable><Text>Profile</Text></Pressable>
</Link>

// Programmatic
const router = useRouter()
router.push('/course/react')          // Add to stack
router.replace('/(auth)/login')       // Replace — no back button
router.back()                         // Go back
router.navigate('/courses')           // Smart push/back

// Read URL param — app/course/[slug].jsx
const { slug } = useLocalSearchParams()
```

---

## ⚡ Class 2 Quick Reference

| Concept | Code |
|---------|------|
| Tab layout | `<Tabs>` + `<Tabs.Screen>` in `(tabs)/_layout.jsx` |
| Tab icon | `tabBarIcon: ({ color, size }) => <Ionicons ...>` |
| Safe area padding | `useSafeAreaInsets()` → `insets.bottom` |
| Active tab colour | `tabBarActiveTintColor: '#e94560'` |
| Current route | `useSegments()` → array of path parts |
| Shared layout | `<Stack>` or `<Tabs>` in `_layout.jsx` + `<Slot>` for content |

---

# Class 3 — FlatList, TextInput & Gestures

## A. FlatList — Always Use for Dynamic Lists

```jsx
<FlatList
  data={items}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item }) => <ItemCard item={item} />}

  // Performance
  removeClippedSubviews
  initialNumToRender={6}
  maxToRenderPerBatch={4}
  windowSize={10}

  // Pull-to-refresh
  refreshing={isRefreshing}
  onRefresh={handleRefresh}

  // Infinite scroll
  onEndReached={loadMore}
  onEndReachedThreshold={0.3}

  // States
  ListEmptyComponent={<EmptyState />}
  ListHeaderComponent={<Header />}

  contentContainerClassName="pb-8"
/>
```

> ✏️ **Fill in:** Why should you use `FlatList` instead of `ScrollView` + `.map()` for large lists?
>
> ___________________________________________________________________

## B. TextInput & Keyboard

```jsx
<TextInput
  value={value}
  onChangeText={setValue}
  returnKeyType="next"    // 'default' | 'done' | 'next' | 'search' | 'send'
  autoFocus               // Focus on mount
  secureTextEntry         // Password mask
  keyboardType="email-address"  // 'default' | 'numeric' | 'email-address' | 'phone-pad'
/>

// Platform-specific keyboard handling
<KeyboardAvoidingView
  className="flex-1"
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
```

---

# Class 4 — AsyncStorage & Device APIs

## A. AsyncStorage

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage'

// Always JSON.stringify/parse — AsyncStorage only stores strings
await AsyncStorage.setItem('key', JSON.stringify(value))

const raw = await AsyncStorage.getItem('key')
const val = raw ? JSON.parse(raw) : null

await AsyncStorage.removeItem('key')
await AsyncStorage.clear()
```

> ⚠️ AsyncStorage is **async** — always use `await`. `const val = AsyncStorage.getItem('key')` gives you a Promise, not the value.

## B. Permission Pattern — Always Request First

```javascript
const { status } = await Location.requestForegroundPermissionsAsync()
if (status !== 'granted') {
  // Handle gracefully — never crash
  Alert.alert('Permission needed', 'We need location to show nearby courses.')
  return null
}
// Only reach here if granted
const location = await Location.getCurrentPositionAsync({})
```

---

# Class 5 — TanStack Query

## A. Setup

```jsx
// app/_layout.jsx
const queryClient = new QueryClient()
<QueryClientProvider client={queryClient}><Slot /></QueryClientProvider>
```

## B. useQuery & useMutation

```jsx
// Fetch data
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['courses'],       // Unique cache key
  queryFn: () => fetchCourses(),
  staleTime: 5 * 60 * 1000,  // Fresh for 5 minutes
})

// Mutate data
const { mutate, isPending } = useMutation({
  mutationFn: (data) => postEnrolment(data),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
  onError: (err) => Alert.alert('Error', err.message),
})
```

> ✏️ **Fill in:** What does `queryClient.invalidateQueries({ queryKey: ['courses'] })` do?
>
> ___________________________________________________________________

---

# Class 6 — Authentication & SecureStore

## A. SecureStore vs AsyncStorage

| | AsyncStorage | SecureStore |
|---|---|---|
| Encryption | Plain text | Hardware-encrypted |
| Use for | General data, bookmarks | Tokens, passwords |
| Platform | iOS + Android | iOS + Android |

## B. Auth Pattern

```jsx
// Session state + route guard
const [session, setSession] = useState(null)
const [isReady, setIsReady] = useState(false)

// Load on mount
useEffect(() => {
  SecureStore.getItemAsync('session')
    .then(raw => setSession(raw ? JSON.parse(raw) : null))
    .finally(() => setIsReady(true))
}, [])

// Route guard — runs when session or route changes
useEffect(() => {
  if (!isReady) return
  const inAuth = segments[0] === '(auth)'
  if (!session && !inAuth) router.replace('/(auth)/login')
  if  (session &&  inAuth) router.replace('/(tabs)')
}, [session, isReady, segments])
```

---

# Class 7 — Reanimated 3 & Gestures

## A. Reanimated Basics

```jsx
import Animated, { useSharedValue, useAnimatedStyle, withSpring, FadeInDown } from 'react-native-reanimated'

// Shared value — lives on UI thread, no re-renders
const scale = useSharedValue(1)

// Animated style — reads shared values on UI thread
const style = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }]
}))

// Animate it
scale.value = withSpring(0.95)   // Physics-based spring
scale.value = withTiming(1, { duration: 200 })  // Time-based

// Entering animation — no shared values needed
<Animated.View entering={FadeInDown.delay(index * 60).springify()}>
```

## B. Common Entering Animations

| Animation | Effect |
|-----------|--------|
| `FadeIn` | Fade in |
| `FadeInDown` | Fade in from below |
| `SlideInRight` | Slide in from right |
| `.delay(ms)` | Add delay |
| `.springify()` | Spring physics |
| `.duration(ms)` | Timing duration |

---

# Class 8 — Performance, EAS Build & Deployment

## A. Performance Checklist

```jsx
// 1. memo — skip re-render if props unchanged
const Card = memo(function Card({ data, onPress }) { ... })

// 2. useCallback — stable reference for memo'd children
const handle = useCallback((id) => doThing(id), [])

// 3. FlashList — faster than FlatList for large lists
import { FlashList } from '@shopify/flash-list'
<FlashList estimatedItemSize={100} ... />

// 4. expo-image — faster image loading
import { Image } from 'expo-image'
<Image placeholder={{ blurhash }} cachePolicy="memory-disk" ... />
```

## B. EAS Build

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview  # → shareable APK link
eas update --branch preview --message "Fix"     # → OTA update, no rebuild
```

---

## ⚡ React Native Master Quick Reference

### Component Map
| Web | RN | Notes |
|-----|----|-------|
| `<div>` | `<View>` | flex-direction defaults to column |
| All text | `<Text>` | Must wrap ALL strings |
| `<img>` | `<Image>` | Needs width + height |
| `<input>` | `<TextInput>` | onChangeText, not onChange |
| `<button>` | `<Pressable>` | onPress, not onClick |
| list | `<FlatList>` | keyExtractor required |
| scroll | `<ScrollView>` | Short/static content only |

### Navigation
| Task | Code |
|------|------|
| Push screen | `router.push('/path')` |
| Replace | `router.replace('/path')` |
| Go back | `router.back()` |
| Read param | `const { id } = useLocalSearchParams()` |
| Active link | `<NavLink>` (or check segments) |
| Route guard | Check session in `useEffect([session, segments])` |

### Data & State
| Task | Code |
|------|------|
| Fetch + cache | `useQuery({ queryKey, queryFn })` |
| Mutate | `useMutation({ mutationFn })` |
| Invalidate | `queryClient.invalidateQueries({ queryKey })` |
| Persist | `AsyncStorage.setItem(key, JSON.stringify(val))` |
| Secure store | `SecureStore.setItemAsync(key, JSON.stringify(val))` |
| Permission | `const { status } = await API.requestPermissionsAsync()` |

### Animation
| Task | Code |
|------|------|
| Shared value | `const x = useSharedValue(0)` |
| Animated style | `useAnimatedStyle(() => ({ transform: [{ scale: x.value }] }))` |
| Spring | `x.value = withSpring(1)` |
| Timing | `x.value = withTiming(1, { duration: 200 })` |
| Enter animation | `<Animated.View entering={FadeInDown.delay(i * 60).springify()}>` |
| Layout animation | `<Animated.View layout={Layout.springify()}>` |

---

*Deejoft Coding School | React Native | All Classes Reference — keep permanently*
