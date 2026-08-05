import { useEffect } from 'react';
import { Stack } from 'expo-router';
// Deep imports avoid expo-notifications' push-token auto-registration side effect,
// which console.error's on Android Expo Go (remote push removed in SDK 53+).
import { setNotificationHandler } from 'expo-notifications/build/NotificationsHandler';
import { requestPermissionsAsync } from 'expo-notifications/build/NotificationPermissions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getToken } from '../services/authService';
import { setSession, useSession } from '../state/session';

setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const queryClient = new QueryClient();

export default function RootLayout() {
  const session = useSession();

  useEffect(() => {
    requestPermissionsAsync();
    getToken().then((token) => setSession(token ?? null));
  }, []);

  if (session === undefined) return null; // still checking for a stored token

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(protected)" />
        </Stack.Protected>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </QueryClientProvider>
  );
}
