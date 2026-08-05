import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

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
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: { title: 'Reminder', body: title },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: new Date(dueDate) },
  });
  const map = await getMap();
  map[reminderId] = notificationId;
  await setMap(map);
}

export async function cancelReminderNotification(reminderId: number) {
  const map = await getMap();
  const notificationId = map[reminderId];
  if (!notificationId) return;
  await Notifications.cancelScheduledNotificationAsync(notificationId);
  delete map[reminderId];
  await setMap(map);
}
