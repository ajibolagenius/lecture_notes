# Reminders App

The reference app built across the React Native course notes (`../Week 1_*.md` through `../Week 6_*.md`) — an Apple Reminders clone in Expo, backed by the companion Node/Express Reminders API (`../../node_express_class_notes/`).

## Running it

```bash
npm install
cp .env.example .env   # point EXPO_PUBLIC_API_URL at your running Reminders API's LAN IP
npx expo start
```

Scan the QR code with Expo Go, or press `i` / `a` for a simulator.

The API must be running (see the Node/Express course, through at least its Week 4) before login/signup will work — this app has no local-only fallback for reminders data, per the Week 5 notes.

## Where each week's work lives

| Week | What it added | Where |
| :--- | :--- | :--- |
| 1 | `ReminderListItem` component, core `View`/`Text`/`StyleSheet` | `components/ReminderListItem.tsx` |
| 2 | Expo Router root layout, create/update modal | `app/_layout.tsx`, `app/(protected)/_layout.tsx` |
| 3 | `FlatList`, controlled form, due-date picker | `app/(protected)/index.tsx`, `app/(protected)/createUpdateReminder.tsx` |
| 4 | AsyncStorage persistence, local notifications | `state/notifications.ts` (superseded by Week 5's backend for reminder data itself; notification scheduling stays local per the Week 5 notes) |
| 5 | Real auth, `(auth)`/`(protected)` groups, TanStack Query | `app/(auth)/`, `services/authService.ts`, `services/reminderService.ts` |
| 6 | Reanimated polish, Jest tests, EAS | `react-native-reanimated` in `ReminderListItem`, `**/__tests__/*.test.tsx`, `eas.json` |

## Testing

```bash
npm test
npm run typecheck
```

## Shipping

```bash
eas build --platform ios --profile preview
eas build --platform android --profile preview
eas submit --platform ios
```
