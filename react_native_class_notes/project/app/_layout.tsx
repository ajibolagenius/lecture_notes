import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getToken } from '../services/authService';
import { setSession, useSession } from '../state/session';

Notifications.setNotificationHandler({
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
    Notifications.requestPermissionsAsync();
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
