// app/index.jsx
// ============================================================
// Deejoft Coding School | React Native Course Starter
// Home screen — replace this with your content
// ============================================================
import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6 gap-6">
        <Text className="text-4xl font-bold text-dark text-center">
          My App
        </Text>
        <Text className="text-base text-muted text-center">
          Edit <Text className="font-mono text-brand">app/index.jsx</Text> to start building.
        </Text>
        <Pressable
          className="bg-brand rounded-2xl py-4 px-8 active:opacity-80"
          onPress={() => router.push('/explore')}
        >
          <Text className="text-white font-bold text-base">Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
