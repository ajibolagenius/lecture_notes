# 📱 React Native — Tutor's Master Outline
### Deejoft Coding School | Mobile Development Track
**Duration:** 4 Weeks · 8 Classes · ~2 hours per class
**Level:** Intermediate (requires React completion)

---

> **Dear Tutor,**
> React Native with Expo is the fastest path from React knowledge to a real, published mobile app. In 2025, the New Architecture (Fabric renderer + JSI) is the default — it is faster, has no bridge overhead, and enables synchronous native calls. Teach it as the standard, not an advanced topic. This course uses **Expo SDK 52** with the New Architecture enabled by default, **Expo Router v4** for file-based navigation, and **NativeWind v4** for styling — which brings Tailwind utility classes to React Native and eliminates the disconnect between web and mobile styling.
>
> Every student should have the **Expo Go** app on their phone from Day 1. Everything we build should be tested on a real device. Emulators are optional.

---

## 🗺️ Course Map

| Week | Classes | Focus | Deliverable |
|------|---------|-------|-------------|
| Week 1 | 1–2 | Environment, Core Components, NativeWind Styling, Navigation Shell | Profile screen + tab navigation |
| Week 2 | 3–4 | State, Lists, Gestures & Device APIs | News reader with bookmarks |
| Week 3 | 5–6 | Async Data, Authentication & Offline Storage | Auth flow + persisted data |
| Week 4 | 7–8 | Animations, Performance & EAS Build | Polished capstone app |

**Prerequisites:** React (all 4 weeks) — especially: components, hooks, Context, async/await  
**Tools:** Node.js LTS, VS Code, Expo Go (iOS/Android), EAS CLI

---

## 🎯 Mental Model Shift — Web to Mobile

Draw this on the board on Day 1. Keep it visible all week.

```
WEB (React)              MOBILE (React Native)     Why It's Different
────────────────────     ────────────────────────   ─────────────────────────────
<div>                →   <View>                     No HTML. Compiles to native.
<p> <h1> <span>      →   <Text>                     ALL text must be inside <Text>.
<img>                →   <Image>                    Different props. Needs dimensions.
<input>              →   <TextInput>                Keyboard behaviour is explicit.
<button>             →   <Pressable>                Touch targets. Haptic feedback.
<ul> .map()          →   <FlatList>                 Virtualised. Required for perf.
CSS file             →   NativeWind / StyleSheet    No cascade. Styles are scoped.
div flex-direction:row→  View flexDirection: 'row'  Defaults to COLUMN, not ROW.
React Router         →   Expo Router                Same file-based concept.
localStorage         →   AsyncStorage / MMKV        Async. Must await.
```

---

## 📅 Week 1 — Foundations: Setup, Components & Navigation

### Class 1 — Environment, Core Components & NativeWind

#### Project Setup

```bash
# Create a new Expo project with the latest template (New Architecture enabled by default)
npx create-expo-app@latest DeejoftMobile --template default

cd DeejoftMobile
npx expo install nativewind tailwindcss
npx tailwindcss init

# Start the dev server
npx expo start
# → Scan QR code with Expo Go on your phone
```

**NativeWind Setup:**

```js
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand:  '#e94560',
        dark:   '#1a1a2e',
        muted:  '#888899',
        surface: '#f8f8fc',
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        bold: ['Inter_700Bold'],
      },
    },
  },
};
```

```js
// babel.config.js — add NativeWind preset
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
```

#### Core Components & NativeWind Styling

```jsx
// The Web vs Native component table (refer back to this all week)
// View     = div    | Text = any text | Image = img
// TextInput = input  | Pressable = button | FlatList = ul + virtualisation

import { View, Text, Image, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native';
// With NativeWind, we use className just like Tailwind on the web

export default function ProfileScreen() {
  return (
    // SafeAreaView — prevents content going under status bar and notches
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-8 items-center gap-6"
        showsVerticalScrollIndicator={false}
      >

        {/* Avatar */}
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
          className="w-24 h-24 rounded-full border-4 border-brand"
        />

        {/* Name and role */}
        <View className="items-center gap-1">
          <Text className="text-2xl font-bold text-dark">Ada Lovelace</Text>
          <Text className="text-base text-muted">Full-Stack Developer</Text>
        </View>

        {/* Stats row */}
        <View className="flex-row gap-8">
          {[
            { label: 'Projects', value: '12' },
            { label: 'Courses', value: '4' },
            { label: 'Streak', value: '21d' },
          ].map(({ label, value }) => (
            <View key={label} className="items-center gap-1">
              <Text className="text-2xl font-bold text-dark">{value}</Text>
              <Text className="text-sm text-muted">{label}</Text>
            </View>
          ))}
        </View>

        {/* CTA Button */}
        <Pressable
          className="w-full bg-brand rounded-2xl py-4 items-center active:opacity-80"
          onPress={() => console.log('Edit profile')}
        >
          <Text className="text-white font-bold text-base">Edit Profile</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}
```

> **`active:opacity-80`** is a NativeWind variant for the pressed state — equivalent to `activeOpacity` on `TouchableOpacity`. NativeWind v4 supports all interactive variants: `active:`, `focus:`, `disabled:`.

**⚠️ Key Differences from Web Tailwind:**
```jsx
// 1. No margin/padding shorthand on web — use gap instead where possible
// 2. No 'w-full' on flex children in a row — use flex-1 instead
// 3. Text must ALWAYS be in <Text> — never directly in <View>
// 4. flexDirection defaults to 'column' — must explicitly add 'flex-row' for rows
// 5. No overflow: hidden by default — add 'overflow-hidden' explicitly

// ❌ This will error — text directly in a View
<View className="p-4">
  Hello  {/* Error: Text strings must be rendered within a <Text> component */}
</View>

// ✅ Always wrap text
<View className="p-4">
  <Text>Hello</Text>
</View>
```

---

### Class 2 — Expo Router & Tab Navigation

**Expo Router File Structure:**
```
app/
├── _layout.jsx          → Root layout (wrap with providers)
├── (tabs)/              → Tab group — () means it doesn't show in URL
│   ├── _layout.jsx      → Tab bar configuration
│   ├── index.jsx        → Home tab     → '/'
│   ├── explore.jsx      → Explore tab  → '/explore'
│   └── profile.jsx      → Profile tab  → '/profile'
├── (auth)/
│   ├── login.jsx        → '/login'
│   └── register.jsx     → '/register'
└── course/
    └── [slug].jsx       → '/course/react-19' (dynamic)
```

```jsx
// app/(tabs)/_layout.jsx — Tab bar with icons
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TABS = [
  { name: 'index',   title: 'Home',    icon: 'home'           },
  { name: 'explore', title: 'Explore', icon: 'compass-outline'},
  { name: 'profile', title: 'Profile', icon: 'person-outline' },
];

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          const tab = TABS.find(t => t.name === route.name);
          return (
            <Ionicons
              name={focused ? tab.icon.replace('-outline', '') : tab.icon}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#e94560',
        tabBarInactiveTintColor: '#888899',
        tabBarStyle: {
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e2e8',
        },
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontFamily: 'Inter_700Bold', fontSize: 18 },
      })}
    >
      {TABS.map(tab => (
        <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title }} />
      ))}
    </Tabs>
  );
}


// Navigating between screens
import { Link, useRouter, useLocalSearchParams } from 'expo-router';

// Declarative navigation
<Link href="/profile" asChild>
  <Pressable className="px-4 py-2 bg-brand rounded-xl">
    <Text className="text-white font-bold">View Profile</Text>
  </Pressable>
</Link>

// Programmatic navigation
const router = useRouter();
router.push('/course/react-19');
router.replace('/(auth)/login');   // Replace — no back button
router.back();

// Reading dynamic params: app/course/[slug].jsx
const { slug } = useLocalSearchParams();
```

---

## 📅 Week 2 — State, Lists, Gestures & Device APIs

### Class 3 — FlatList, Gestures & Haptics

```jsx
// ── FlatList — the ONLY way to render long lists ──
// Never use .map() inside ScrollView for dynamic data — it renders everything at once
import { FlatList, View, Text, Image, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

const NewsCard = ({ item, onBookmark, isBookmarked }) => (
  <Pressable
    className="bg-white rounded-2xl overflow-hidden mb-4 shadow-sm"
    onPress={() => router.push(`/article/${item.id}`)}
    onLongPress={async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onBookmark(item.id);
    }}
  >
    {item.imageUrl && (
      <Image
        source={{ uri: item.imageUrl }}
        className="w-full h-48"
        resizeMode="cover"
      />
    )}
    <View className="p-4 gap-2">
      <Text className="text-xs text-brand font-bold uppercase tracking-wide">
        {item.category}
      </Text>
      <Text className="text-lg font-bold text-dark leading-snug" numberOfLines={2}>
        {item.title}
      </Text>
      <Text className="text-sm text-muted" numberOfLines={2}>
        {item.summary}
      </Text>
      <View className="flex-row justify-between items-center mt-1">
        <Text className="text-xs text-muted">{item.readTime} min read</Text>
        <Pressable
          onPress={() => onBookmark(item.id)}
          hitSlop={8}     // Expands the touch target without affecting visual size
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={isBookmarked ? '#e94560' : '#888899'}
          />
        </Pressable>
      </View>
    </View>
  </Pressable>
);

function NewsFeed({ articles, bookmarks, onBookmark }) {
  return (
    <FlatList
      data={articles}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <NewsCard
          item={item}
          onBookmark={onBookmark}
          isBookmarked={bookmarks.includes(item.id)}
        />
      )}

      // Performance optimisations
      removeClippedSubviews     // Unmount off-screen items (Android)
      initialNumToRender={6}    // Render 6 items on first load
      maxToRenderPerBatch={4}   // Render 4 new items per scroll batch
      windowSize={10}           // Keep 10 viewports worth of items mounted

      // Pull-to-refresh
      refreshing={isRefreshing}
      onRefresh={handleRefresh}

      // Infinite scroll
      onEndReached={loadMoreArticles}
      onEndReachedThreshold={0.3}   // Trigger when 30% from the end

      // Separation
      ItemSeparatorComponent={() => <View className="h-1" />}

      // Empty state
      ListEmptyComponent={() => (
        <View className="flex-1 items-center justify-center py-20 gap-3">
          <Ionicons name="newspaper-outline" size={64} color="#888899" />
          <Text className="text-lg font-bold text-dark">No articles yet</Text>
          <Text className="text-muted text-center">Pull down to refresh</Text>
        </View>
      )}

      // Header
      ListHeaderComponent={() => (
        <Text className="text-2xl font-bold text-dark mb-4">Latest News</Text>
      )}

      contentContainerClassName="px-4 pb-8 pt-2"
    />
  );
}
```

### Class 4 — Device APIs & AsyncStorage

```bash
npx expo install @react-native-async-storage/async-storage
npx expo install expo-location expo-image-picker expo-camera expo-haptics
```

```jsx
// ── AsyncStorage — persisted key-value store ──
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use a storage service module — never scatter raw AsyncStorage calls
export const Storage = {
  async get(key) {
    try {
      const raw = await AsyncStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  async set(key, value) {
    try { await AsyncStorage.setItem(key, JSON.stringify(value)); }
    catch (e) { console.error('Storage write error:', e); }
  },

  async remove(key) {
    try { await AsyncStorage.removeItem(key); }
    catch (e) { console.error('Storage remove error:', e); }
  },
};

// ── Location API ──
import * as Location from 'expo-location';

async function getCurrentCity() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const [place] = await Location.reverseGeocodeAsync(coords);
  return `${place.city}, ${place.country}`;
}

// ── Image Picker ──
import * as ImagePicker from 'expo-image-picker';

async function pickAvatar() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],         // Force square crop
    quality: 0.8,           // 80% compression
  });

  if (result.canceled) return null;
  return result.assets[0].uri;
}
```

---

## 📅 Week 3 — Data Fetching, Authentication & Offline

### Class 5 — TanStack Query for Async State

```bash
npm install @tanstack/react-query
```

```jsx
// ── TanStack Query — the standard for async state in React Native ──
// Handles loading, caching, background refetch, pagination automatically

import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Set up at the app root
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:    5 * 60 * 1000,  // 5 minutes — data is "fresh" for this long
      gcTime:       10 * 60 * 1000, // 10 minutes — keep in cache after unused
      retry:        2,              // Retry failed requests twice
      refetchOnWindowFocus: false,  // Don't refetch when app comes to foreground
    },
  },
});

// app/_layout.jsx
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}

// ── useQuery — fetch and cache data ──
function CourseDetailScreen() {
  const { slug } = useLocalSearchParams();

  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', slug],     // Cache key — must be unique per query
    queryFn: () => fetchCourse(slug),
    enabled: !!slug,                // Only run if slug exists
  });

  if (isLoading) return <Skeleton />;
  if (error)     return <ErrorScreen message={error.message} />;

  return <CourseDetail course={course} />;
}

// ── useMutation — for data changes (POST, PUT, DELETE) ──
function EnrolButton({ courseId }) {
  const queryClient = useQueryClient();

  const { mutate: enrol, isPending } = useMutation({
    mutationFn: (id) => fetch(`/api/courses/${id}/enrol`, { method: 'POST' }).then(r => r.json()),

    // Optimistic update — update UI before server responds
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['course', id] });
      const previous = queryClient.getQueryData(['course', id]);
      queryClient.setQueryData(['course', id], old => ({ ...old, isEnrolled: true }));
      return { previous };
    },

    onError: (err, id, context) => {
      // Roll back on error
      queryClient.setQueryData(['course', id], context.previous);
    },

    onSettled: (data, error, id) => {
      // Refetch to sync with server truth
      queryClient.invalidateQueries({ queryKey: ['course', id] });
    },
  });

  return (
    <Pressable
      className={`bg-brand rounded-2xl py-4 items-center ${isPending ? 'opacity-60' : ''}`}
      onPress={() => enrol(courseId)}
      disabled={isPending}
    >
      <Text className="text-white font-bold">
        {isPending ? 'Enrolling...' : 'Enrol Now'}
      </Text>
    </Pressable>
  );
}
```

---

### Class 6 — Authentication with Expo SecureStore

```bash
npx expo install expo-secure-store
```

```jsx
// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useSegments, useRouter } from 'expo-router';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const segments = useSegments();
  const router   = useRouter();

  // Load session on app start
  useEffect(() => {
    SecureStore.getItemAsync('session')
      .then(raw => setSession(raw ? JSON.parse(raw) : null))
      .finally(() => setIsReady(true));
  }, []);

  // Route guard — redirect based on auth state
  useEffect(() => {
    if (!isReady) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (!session && !inAuthGroup) router.replace('/(auth)/login');
    if (session  &&  inAuthGroup) router.replace('/(tabs)');
  }, [session, isReady, segments]);

  const signIn = async ({ email, password }) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Invalid credentials');

    const data = await response.json();
    await SecureStore.setItemAsync('session', JSON.stringify(data));
    setSession(data);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('session');
    setSession(null);
  };

  if (!isReady) return <SplashScreen />;

  return (
    <AuthContext.Provider value={{ session, user: session?.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
```

---

## 📅 Week 4 — Animations, Performance & Deployment

### Class 7 — Reanimated 3 & Gesture Handler

```bash
npx expo install react-native-reanimated react-native-gesture-handler
```

```jsx
// ── Reanimated 3 — runs animations on the UI thread (60fps guaranteed) ──
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  FadeIn,
  FadeInDown,
  SlideInRight,
  Layout,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

// ── Shared values live on the UI thread — no JS thread involvement ──
function AnimatedCard({ children, index = 0 }) {
  const scale  = useSharedValue(1);
  const shadow = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: shadow.value,
  }));

  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value  = withSpring(0.97, { damping: 15, stiffness: 300 });
      shadow.value = withTiming(0.08);
    })
    .onFinalize(() => {
      scale.value  = withSpring(1,    { damping: 15, stiffness: 300 });
      shadow.value = withTiming(0.04);
    });

  return (
    <GestureDetector gesture={tap}>
      {/* FadeInDown: enter animation — staggered by index */}
      <Animated.View
        entering={FadeInDown.delay(index * 80).springify()}
        layout={Layout.springify()}   // Animate layout changes (reorder, delete)
        style={animatedStyle}
        className="bg-white rounded-2xl p-4"
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
}


// ── Swipeable row (delete on swipe-left) ──
import { Swipeable } from 'react-native-gesture-handler';

function SwipeableTaskItem({ task, onDelete }) {
  const renderRightAction = () => (
    <Pressable
      className="bg-red-500 justify-center items-center w-20 rounded-r-2xl"
      onPress={() => onDelete(task.id)}
    >
      <Ionicons name="trash-outline" size={24} color="white" />
    </Pressable>
  );

  return (
    <Swipeable renderRightActions={renderRightAction} rightThreshold={40}>
      <View className="bg-white p-4 flex-row items-center gap-3">
        <Text className="flex-1 text-base text-dark">{task.text}</Text>
      </View>
    </Swipeable>
  );
}


// ── Bottom Sheet (with @gorhom/bottom-sheet) ──
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, useCallback } from 'react';

function FilterSheet({ onApply }) {
  const sheetRef = useRef(null);
  const snapPoints = ['40%', '80%'];

  const open  = useCallback(() => sheetRef.current?.expand(), []);
  const close = useCallback(() => sheetRef.current?.close(),  []);

  return (
    <>
      <Pressable onPress={open} className="bg-brand px-4 py-2 rounded-xl">
        <Text className="text-white font-bold">Filter</Text>
      </Pressable>

      <BottomSheet ref={sheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose>
        <BottomSheetView className="flex-1 p-6">
          <Text className="text-xl font-bold text-dark mb-4">Filter Courses</Text>
          {/* Filter options */}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
```

---

### Class 8 — Performance, EAS Build & Publishing

#### Performance Checklist

```jsx
// 1. memo() — prevent re-renders of pure components
import { memo, useCallback } from 'react';

const CourseCard = memo(function CourseCard({ course, onPress }) {
  return (
    <Pressable onPress={() => onPress(course.id)}>
      <Text>{course.title}</Text>
    </Pressable>
  );
});

// 2. useCallback — stable callbacks passed to memo'd children
function CourseList({ courses }) {
  const handlePress = useCallback((id) => {
    router.push(`/course/${id}`);
  }, []); // stable — never recreated

  return (
    <FlatList
      data={courses}
      renderItem={({ item }) => <CourseCard course={item} onPress={handlePress} />}
      keyExtractor={c => c.id}
    />
  );
}

// 3. Fast image loading with expo-image
import { Image } from 'expo-image';

<Image
  source={{ uri: url }}
  placeholder={{ blurhash }}   // Show a coloured blur while loading
  contentFit="cover"
  transition={200}             // Smooth fade-in
  cachePolicy="memory-disk"    // Aggressive caching
  className="w-full h-48 rounded-xl"
/>

// 4. Hermes JS engine is enabled by default in Expo SDK 52 — no action needed

// 5. New Architecture — enabled by default. Synchronous native modules, no bridge.

// 6. FlashList (drop-in FlatList replacement — 10x faster for large lists)
// npm install @shopify/flash-list
import { FlashList } from '@shopify/flash-list';
<FlashList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  estimatedItemSize={120}   // Required — estimated height of each item
  keyExtractor={item => item.id}
/>
```

#### EAS Build & Submission

```bash
# One-time setup
npm install -g eas-cli
eas login
eas build:configure   # Creates eas.json

# eas.json — build profiles
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
      "android": { "buildType": "app-bundle" },
      "ios":     { "credentialsSource": "remote" }
    }
  },
  "submit": {
    "production": {
      "android": { "serviceAccountKeyPath": "./google-service-account.json" },
      "ios":     { "appleId": "your@apple.id" }
    }
  }
}

# Build a shareable APK (Android preview)
eas build --platform android --profile preview
# → EAS builds in the cloud. No Android Studio needed.
# → Returns a shareable download link.

# Production build for app stores
eas build --platform all --profile production

# Over-the-air update — push JS changes without a new build
eas update --branch production --message "Fix: card tap gesture"

# Submit to stores
eas submit --platform android   # Requires Play Store developer account ($25 one-time)
eas submit --platform ios       # Requires Apple Developer Program ($99/year)
```

**`app.json` Production Configuration:**

```json
{
  "expo": {
    "name": "Deejoft",
    "slug": "deejoft-mobile",
    "version": "1.0.0",
    "scheme": "deejoft",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#1a1a2e"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.deejoft.mobile",
      "infoPlist": {
        "NSCameraUsageDescription": "Used for profile photo.",
        "NSPhotoLibraryUsageDescription": "Used to select your profile photo.",
        "NSLocationWhenInUseUsageDescription": "Used to show local course availability."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1a1a2e"
      },
      "package": "com.deejoft.mobile",
      "permissions": ["ACCESS_FINE_LOCATION", "READ_MEDIA_IMAGES"]
    },
    "plugins": ["expo-router", "expo-secure-store"]
  }
}
```

---

### 🏆 Capstone Project Options

**Option A: Deejoft Mobile App**
The official Deejoft student app. Course listings (fetched from API), enrolment flow, student profile, push notifications for class reminders, offline support.

**Option B: Habit Tracker**
Daily habit check-in, streak tracking, animated progress rings (Reanimated 3), weekly charts (Victory Native), reminder notifications, data persisted with AsyncStorage.

**Option C: Local Events Finder**
Uses device location, fetches nearby events from a public API, interactive map (react-native-maps), save events, share feature using Expo Sharing.

---

**Capstone Rubric:**

| Criterion | Points |
|-----------|--------|
| EAS build generates a working APK | 10 |
| Expo Router with 4+ screens, including one dynamic route | 10 |
| NativeWind styling consistent throughout | 10 |
| FlatList or FlashList with `keyExtractor` | 10 |
| TanStack Query for all data fetching | 10 |
| AsyncStorage or SecureStore for persistence | 10 |
| Reanimated 3 animation used at least once | 10 |
| Auth context with protected routes | 10 |
| `memo` and `useCallback` applied on list items | 5 |
| Haptic feedback on meaningful interactions | 5 |
| Accessible — all images have `accessibilityLabel` | 5 |
| GitHub repo with clean commit history | 5 |
| **Total** | **100** |

---

## 📚 Essential References

| Resource | URL | Use For |
|----------|-----|---------|
| Expo Docs | `docs.expo.dev` | Everything Expo — SDK, EAS, Router |
| React Native Docs | `reactnative.dev` | Core components and APIs |
| NativeWind Docs | `nativewind.dev` | Tailwind in React Native |
| TanStack Query | `tanstack.com/query` | Async state management |
| Reanimated 3 | `docs.swmansion.com/react-native-reanimated` | Animation API |
| William Candillon | YouTube: "Can It Be Done in React Native?" | Advanced Reanimated patterns |
| Simon Grimm | `galaxies.dev` | Practical Expo tutorials |

---

*Deejoft Coding School — Instructor Materials | React Native Mobile Track*
*Rebuilt 2025 — Expo SDK 52, New Architecture, NativeWind v4, TanStack Query, Reanimated 3, EAS*
