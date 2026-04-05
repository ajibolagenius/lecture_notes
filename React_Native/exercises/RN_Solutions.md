# ✅ React Native Exercises — Solutions
### Deejoft Coding School | Tutor Reference Only

---

## Week 1 Solutions

---

### Exercise 1.1 Solution — Debug the RN Errors

**Error A:** Text string directly in `<View>` — React Native requires all text in `<Text>`.
```jsx
<View className="flex-1 items-center justify-center">
  <Text>Welcome to Deejoft</Text>
</View>
```

**Error B:** Missing explicit dimensions. `Image` in RN needs `width` and `height` to render.
```jsx
<Image source={{ uri }} className="w-16 h-16 rounded-full" />
```

**Error C:** Missing `flex-row`. Default `flexDirection` is `column`, so items stack vertically.
```jsx
<View className="flex-row gap-2">
  <Text>HTML</Text>
  <Text>CSS</Text>
  <Text>React</Text>
</View>
```

**Error D:** `handleEnrol()` is called immediately on render (returns `undefined` to `onPress`).
```jsx
<Pressable onPress={handleEnrol}>
```

**Error E:** `<View>` does not have an `onPress` prop — it has no touch handling. Use `<Pressable>`.
```jsx
<Pressable onPress={() => console.log('tapped')}>
  <Text>Tap me</Text>
</Pressable>
```

---

### Exercise 1.2 Solution — Profile Screen (Key Parts)

```jsx
import { View, Text, Image, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const STATS = [
  { label: 'Courses',  value: '4'   },
  { label: 'Projects', value: '7'   },
  { label: 'Streak',   value: '14d' },
]

const SKILLS = ['HTML', 'CSS', 'JavaScript', 'React', 'React Native']

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="items-center px-6 py-8 gap-6"
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          className="w-24 h-24 rounded-full"
        />

        <View className="items-center gap-1">
          <Text className="text-2xl font-bold text-dark">Ada Lovelace</Text>
          <Text className="text-base text-muted">Full-Stack Developer</Text>
        </View>

        <View className="flex-row gap-10">
          {STATS.map(stat => (
            <View key={stat.label} className="items-center gap-1">
              <Text className="text-2xl font-bold text-dark">{stat.value}</Text>
              <Text className="text-sm text-muted">{stat.label}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row gap-3 w-full">
          <Pressable className="flex-1 bg-brand rounded-2xl py-3 items-center active:opacity-80">
            <Text className="text-white font-bold">Edit Profile</Text>
          </Pressable>
          <Pressable className="flex-1 border border-brand rounded-2xl py-3 items-center active:opacity-80">
            <Text className="text-brand font-bold">Share Profile</Text>
          </Pressable>
        </View>

        <View className="w-full gap-2">
          <Text className="font-bold text-dark text-base">Skills</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {SKILLS.map(skill => (
                <View key={skill} className="bg-gray-100 rounded-full px-4 py-2">
                  <Text className="text-sm font-medium text-dark">{skill}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
```

---

## Week 2 Solutions

---

### Exercise 2.2 Solution — Note-Taking App

```jsx
import { useState, useRef } from 'react'
import {
  View, Text, TextInput, Pressable, FlatList, Alert,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NotesScreen() {
  const [title, setTitle] = useState('')
  const [body, setBody]   = useState('')
  const [notes, setNotes] = useState([])
  const bodyRef = useRef(null)

  const addNote = () => {
    if (!title.trim()) return
    const note = { id: crypto.randomUUID(), title: title.trim(), body: body.trim(), createdAt: new Date() }
    setNotes(prev => [note, ...prev])
    setTitle('')
    setBody('')
    Keyboard.dismiss()
  }

  const deleteNote = (id) => {
    Alert.alert('Delete Note', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setNotes(prev => prev.filter(n => n.id !== id)),
      },
    ])
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View className="p-4 gap-3">
            <TextInput
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-dark"
              value={title}
              onChangeText={setTitle}
              placeholder="Note title..."
              placeholderTextColor="#888"
              returnKeyType="next"
              onSubmitEditing={() => bodyRef.current?.focus()}
              autoFocus
            />
            <TextInput
              ref={bodyRef}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-dark"
              value={body}
              onChangeText={setBody}
              placeholder="Note body..."
              placeholderTextColor="#888"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              returnKeyType="done"
              onSubmitEditing={addNote}
            />
            <Pressable
              className={`rounded-2xl py-4 items-center ${!title.trim() ? 'bg-gray-300' : 'bg-brand'}`}
              onPress={addNote}
              disabled={!title.trim()}
            >
              <Text className="text-white font-bold text-base">Add Note</Text>
            </Pressable>
          </View>

          <FlatList
            data={notes}
            keyExtractor={n => n.id}
            renderItem={({ item }) => (
              <Pressable
                className="mx-4 mb-3 bg-white rounded-xl p-4"
                onLongPress={() => deleteNote(item.id)}
              >
                <Text className="font-bold text-dark text-base">{item.title}</Text>
                {!!item.body && <Text className="text-muted text-sm mt-1" numberOfLines={2}>{item.body}</Text>}
              </Pressable>
            )}
            ListEmptyComponent={
              <View className="items-center py-12 gap-2">
                <Text className="text-4xl">📝</Text>
                <Text className="text-muted">No notes yet. Add one above!</Text>
              </View>
            }
            contentContainerClassName="pb-8"
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
```

---

### Exercise 2.3 Solution — Bookmark System (Key Parts)

```jsx
// hooks/useBookmarks.js
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = '@deejoft/bookmarks'

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then(raw => { if (raw) setBookmarks(JSON.parse(raw)) })
      .catch(console.error)
  }, [])

  const toggle = async (id) => {
    const next = bookmarks.includes(id)
      ? bookmarks.filter(b => b !== id)
      : [...bookmarks, id]
    setBookmarks(next)
    await AsyncStorage.setItem(KEY, JSON.stringify(next))
  }

  return { bookmarks, toggle, isBookmarked: (id) => bookmarks.includes(id) }
}

// ArticleCard.jsx
function ArticleCard({ article, onToggle, isBookmarked }) {
  return (
    <View className="bg-white mx-4 mb-3 rounded-xl p-4 flex-row items-start gap-3">
      <View className="flex-1 gap-1">
        <Text className="text-xs font-bold text-brand uppercase">{article.category}</Text>
        <Text className="font-bold text-dark" numberOfLines={2}>{article.title}</Text>
      </View>
      <Pressable onPress={() => onToggle(article.id)} hitSlop={8}>
        <Ionicons
          name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
          size={22}
          color={isBookmarked ? '#e94560' : '#888899'}
        />
      </Pressable>
    </View>
  )
}
```

---

## Week 3 Solutions

---

### Exercise 3.1 Solution — TanStack Query Migration

```jsx
import { useQuery } from '@tanstack/react-query'
import { FlatList, Text, View, ActivityIndicator, RefreshControl } from 'react-native'

function CountryCard({ country }) {
  return (
    <View className="bg-white mx-4 mb-3 rounded-xl p-4 flex-row items-center gap-3">
      <Image
        source={{ uri: country.flags.svg }}
        className="w-12 h-8 rounded"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="font-bold text-dark">{country.name.common}</Text>
        <Text className="text-sm text-muted">{country.capital?.[0]} · {country.region}</Text>
      </View>
    </View>
  )
}

export default function CountriesScreen() {
  const { data: countries, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['countries'],
    queryFn: () =>
      fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,region')
        .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() }),
    select: data => data.sort((a, b) => a.name.common.localeCompare(b.name.common)),
  })

  if (isLoading) return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#e94560" />
    </View>
  )

  if (error) return (
    <View className="flex-1 items-center justify-center p-6">
      <Text className="text-red-500 text-center">{error.message}</Text>
    </View>
  )

  return (
    <FlatList
      data={countries}
      keyExtractor={c => c.name.common}
      renderItem={({ item }) => <CountryCard country={item} />}
      removeClippedSubviews
      initialNumToRender={15}
      maxToRenderPerBatch={10}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          tintColor="#e94560"
        />
      }
      ListHeaderComponent={
        <Text className="text-2xl font-bold text-dark px-4 pt-4 pb-2">
          {countries?.length} Countries
        </Text>
      }
      contentContainerClassName="pb-8"
    />
  )
}
```

---

## Week 4 Solutions

---

### Exercise 4.2 Solution — AnimatedPressable

```jsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'

function AnimatedPressable({ children, onPress, className }) {
  const scale   = useSharedValue(1)
  const opacity = useSharedValue(1)

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value   = withSpring(0.97, { damping: 15, stiffness: 300 })
      opacity.value = withTiming(0.85)
    })
    .onFinalize(() => {
      scale.value   = withSpring(1, { damping: 15, stiffness: 300 })
      opacity.value = withTiming(1)
    })
    .onEnd(() => {
      if (onPress) {
        // Run on JS thread
        runOnJS(onPress)()
      }
    })

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={animStyle} className={className}>
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

// Usage
<AnimatedPressable
  onPress={() => router.push('/enrol')}
  className="bg-brand rounded-2xl py-4 items-center"
>
  <Text className="text-white font-bold text-base">Enrol Now</Text>
</AnimatedPressable>
```

---

*Deejoft Coding School | React Native Solutions | Tutor Reference — Do Not Distribute*
