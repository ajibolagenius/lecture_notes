import AsyncStorage from '@react-native-async-storage/async-storage';
// Import local-notification APIs via deep paths so we don't load
// DevicePushTokenAutoRegistration.fx — that side effect calls into push-token
// APIs and console.error's on Android Expo Go (SDK 53+ removed remote push there).
// Local due-date notifications still work in Expo Go.
import scheduleNotificationAsync from 'expo-notifications/build/scheduleNotificationAsync';
import cancelScheduledNotificationAsync from 'expo-notifications/build/cancelScheduledNotificationAsync';
import { SchedulableTriggerInputTypes } from 'expo-notifications/build/Notifications.types';

// Local due-date notifications are a genuinely on-device feature, independent of the
// backend (see Week 5 notes) — the server doesn't know about scheduled notification ids,
// so we keep a small local map from reminder id -> notification id to cancel them later.
const NOTIFICATION_MAP_KEY = 'reminderNotificationIds';

async function getMap(): Promise<Record<string, string>> {
  const raw = await AsyncStorage.getItem(NOTIFICATION_MAP_KEY);
  return raw ? JSON.parse(raw) : {};
}

async function setMap(map: Record<string, string>) {
  await AsyncStorage.setItem(NOTIFICATION_MAP_KEY, JSON.stringify(map));
}

export async function scheduleReminderNotification(reminderId: number, title: string, dueDate: string) {
  const notificationId = await scheduleNotificationAsync({
    content: { title: 'Reminder', body: title },
    trigger: { type: SchedulableTriggerInputTypes.DATE, date: new Date(dueDate) },
  });
  const map = await getMap();
  map[reminderId] = notificationId;
  await setMap(map);
}

export async function cancelReminderNotification(reminderId: number) {
  const map = await getMap();
  const notificationId = map[reminderId];
  if (!notificationId) return;
  await cancelScheduledNotificationAsync(notificationId);
  delete map[reminderId];
  await setMap(map);
}
