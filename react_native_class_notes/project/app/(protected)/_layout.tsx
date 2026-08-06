import { Stack, router } from 'expo-router';
import { Text } from 'react-native';
import { colors } from '../../constants/theme';

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="createUpdateReminder"
        options={{
          presentation: 'modal',
          headerTitle: 'New Reminder',
          headerLeft: () => (
            <Text style={{ color: colors.accent }} onPress={() => router.back()}>
              Cancel
            </Text>
          ),
        }}
      />
    </Stack>
  );
}
