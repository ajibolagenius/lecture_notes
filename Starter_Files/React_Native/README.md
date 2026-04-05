# React Native Starter — Expo SDK 52

Pre-configured with NativeWind v4, TanStack Query, Reanimated 3, Gesture Handler, AsyncStorage, SecureStore, and Expo Router.

## Quick Start

```bash
# 1. Copy and rename this folder
cp -r React_Native my-app
cd my-app

# 2. Update app.json
#    Change: name, slug, bundleIdentifier, package

# 3. Install dependencies
npm install

# 4. Start the dev server
npx expo start

# 5. Scan the QR code with Expo Go on your phone
```

## Project Structure

```
my-app/
├── app/
│   ├── _layout.jsx         ← Root layout (providers: QueryClient, SafeArea, Gesture)
│   ├── index.jsx           ← Home screen
│   └── (tabs)/             ← Add tab group here
├── components/             ← Reusable components
├── utils/
│   └── storage.js          ← AsyncStorage wrapper
├── assets/images/          ← App icon and splash screen
├── app.json                ← Expo configuration
├── eas.json                ← EAS Build profiles
├── tailwind.config.js      ← NativeWind theme (brand colours)
└── package.json
```

## What's Pre-Configured

| Package | Version | Purpose |
|---------|---------|---------|
| Expo SDK | 52 | Core framework, New Architecture enabled |
| Expo Router | 4 | File-based navigation |
| NativeWind | 4 | Tailwind CSS in React Native |
| TanStack Query | 5 | Async data fetching and caching |
| Reanimated | 3 | 60fps UI-thread animations |
| Gesture Handler | 2 | Swipe, tap, pinch gestures |
| AsyncStorage | 2 | Persistent key-value store |
| SecureStore | 14 | Encrypted storage for tokens |
| expo-image | 2 | Fast image loading with blurhash |
| FlashList | 1 | High-performance list component |
| expo-haptics | 14 | Haptic feedback |
| expo-location | 18 | Device GPS and geocoding |
| expo-image-picker | 16 | Camera and gallery access |

## Colour Tokens (tailwind.config.js)

```jsx
className="bg-brand"     // #e94560 — brand red
className="text-dark"    // #1a1a2e — dark navy
className="text-muted"   // #888899 — grey
className="bg-surface"   // #f8f8fc — off-white
className="border-border" // #e2e2e8 — light grey
```

## Build an APK (shareable, no Play Store needed)

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
# → Returns a download link in ~15 minutes
```

## Common Patterns

### Screen template
```jsx
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <Text className="text-2xl font-bold text-dark">My Screen</Text>
      </View>
    </SafeAreaView>
  )
}
```

### Fetch data with TanStack Query
```jsx
import { useQuery } from '@tanstack/react-query'

const { data, isLoading, error } = useQuery({
  queryKey: ['courses'],
  queryFn: () => fetch('https://api.example.com/courses').then(r => r.json()),
})
```

### Persist data
```jsx
import { Storage } from '../utils/storage'

await Storage.set('bookmarks', ['id1', 'id2'])
const bookmarks = await Storage.get('bookmarks')  // ['id1', 'id2']
```

### Remember: React Native rules
- ALL text must be inside `<Text>` — never directly in `<View>`
- `flexDirection` defaults to `'column'` — use `className="flex-row"` for horizontal
- `<Image>` needs explicit dimensions (`className="w-24 h-24"`)
- Use `<Pressable>` not `<TouchableOpacity>` — it is the modern tap target
- Use `<FlatList>` (or `FlashList`) not `.map()` in `<ScrollView>` for dynamic lists
