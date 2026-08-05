import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getToken } from '../services/authService';

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
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    Notifications.requestPermissionsAsync();

    (async () => {
      const token = await getToken();
      if (token) {
        router.replace('/(protected)');
      } else {
        router.replace('/(auth)/login');
      }
      setCheckingAuth(false);
    })();
  }, []);

  if (checkingAuth) return null; // or a loading spinner

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
