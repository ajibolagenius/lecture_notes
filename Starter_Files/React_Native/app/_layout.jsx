// app/_layout.jsx
// ============================================================
// Deejoft Coding School | React Native Course Starter
// Root layout — all providers go here
// ============================================================
import { Slot } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../global.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:            5 * 60 * 1000,
      gcTime:               10 * 60 * 1000,
      retry:                2,
      refetchOnWindowFocus: false,
    },
  },
})

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
