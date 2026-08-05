# Week 6: Polish, Testing & Shipping — Ship the Reminders App

The app works end to end against a real, deployed backend. This final week: make it feel polished, prove it with real tests, and put an actual, installable build in your own hands (and, if you want, in front of real testers).

---

## Module 11: Polish & Tests

**Objective:** Add a touch of animation, and lock in confidence with component tests.

### 1. Animating the List with Reanimated

```bash
npx expo install react-native-reanimated
```

A subtle entrance/exit animation makes adding and removing reminders feel intentional instead of jarring. This wraps the real `ReminderListItem` you've been building since Week 1 — the tappable row (navigates to edit) and its checkbox (toggles complete) from Weeks 3-4 stay exactly as they are; `Animated.View` just wraps the outside of it:

```tsx
// components/ReminderListItem.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReminder } from '../services/reminderService';

export default function ReminderListItem({ reminderItem }: { reminderItem: Reminder }) {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: () => updateReminder(reminderItem.id, { completed: !reminderItem.completed }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reminders'] }),
  });

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Pressable
        style={styles.container}
        onPress={() => router.push(`/(protected)/createUpdateReminder?id=${reminderItem.id}`)}
      >
        <Pressable
          style={styles.checkbox}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => toggleMutation.mutate()}
        >
          {reminderItem.completed && <View style={styles.checkboxFill} />}
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={[styles.title, reminderItem.completed && styles.completedTitle]}>
            {reminderItem.title}
          </Text>
          {reminderItem.notes ? <Text style={styles.notes}>{reminderItem.notes}</Text> : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}
```

`Animated.View` from Reanimated wraps a regular `View` and adds declarative `entering`/`exiting` transitions — no manual `Animated.timing` setup required for this common case. Notice "toggle complete" is now a real `useMutation` calling `updateReminder(id, { completed: ... })` against the live API — the Week 4 version called a `toggleCompleted` helper that lived in the now-retired local `remindersStore.ts`, so it needs the same Week 5 upgrade every other local-only piece of this screen already got.

### 2. Swipe-to-Delete with Gesture Handler

Right now, deleting a reminder means opening it and tapping "Delete Reminder" — reliable, but it's not the affordance every Reminders-style app trains people to expect. A real one lets you swipe a row to delete it directly from the list, the way iOS's own Reminders and Mail apps do.

* **Lecture & Concepts:**
    * **`react-native-gesture-handler`** (already a transitive dependency of Expo Router) provides a `Swipeable` component: wrap a row in it, provide `renderRightActions`, and it handles the drag gesture, the reveal animation, and the threshold for "swiped far enough" for you.
    * This is a genuinely different gesture from the tap-to-edit / tap-checkbox-to-complete pair you already built — all three now coexist on the same row, each with its own distinct trigger.

* **In-Depth Example:**
    ```tsx
    // components/ReminderListItem.tsx (add)
    import { Swipeable } from 'react-native-gesture-handler';
    import { deleteReminder } from '../services/reminderService';

    export default function ReminderListItem({ reminderItem }: { reminderItem: Reminder }) {
      const queryClient = useQueryClient();

      const deleteMutation = useMutation({
        mutationFn: () => deleteReminder(reminderItem.id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reminders'] }),
      });

      return (
        <Swipeable
          renderRightActions={() => (
            <View style={styles.deleteAction}>
              <Text style={styles.deleteActionText}>Delete</Text>
            </View>
          )}
          onSwipeableOpen={() => deleteMutation.mutate()}
        >
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            {/* ...the same Pressable row and checkbox from section 1... */}
          </Animated.View>
        </Swipeable>
      );
    }

    const styles = StyleSheet.create({
      // ...existing styles...
      deleteAction: {
        backgroundColor: '#D32F2F',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        flex: 1,
      },
      deleteActionText: { color: 'white', fontWeight: '600', fontSize: 16 },
    });
    ```
    Matching the confirmation-free convention of the apps this pattern is borrowed from, swiping-and-releasing deletes immediately — no alert. The confirmed, deliberate "Delete Reminder" button inside the edit screen (Week 3) stays too, as the safer, slower path.

* **⭐️ Class Exercise: Swipe to Delete**
    1.  Add `Swipeable` exactly as shown, wrapping your existing animated row.
    2.  Swipe a reminder left and confirm a red "Delete" action reveals itself, then confirm releasing past the threshold deletes it — check the home screen updates and the reminder is really gone from the database (Postman), not just the list.
    3.  Confirm the existing tap-to-edit, tap-checkbox-to-complete, and the edit screen's own Delete button all still work exactly as before — three real gestures on one row, none interfering with the others.

### 3. An Accessibility Pass

Everything built so far has been tested by tapping and swiping — never with a screen reader. That gap is worth closing before calling this app finished, not after.

* **Lecture & Concepts:**
    * **`accessibilityLabel`** gives VoiceOver (iOS) / TalkBack (Android) something to actually say for an element that has no readable text of its own — an icon-only checkbox, a "+" button.
    * **`accessibilityRole`** tells assistive tech what *kind* of control something is (`"checkbox"`, `"button"`) so it announces the right interaction model, and **`accessibilityState`** reports current state (`checked`) so a screen reader user knows a reminder's completed status without seeing the strikethrough.
    * **Touch target size** matters for more than a screen reader: Apple's Human Interface Guidelines call for a minimum 44×44pt tappable area. The checkbox's `hitSlop` from Week 4 already addresses this for that one element — this pass checks everything else got the same treatment.

* **In-Depth Example:**
    ```tsx
    // components/ReminderListItem.tsx (checkbox, updated)
    <Pressable
      style={styles.checkbox}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={() => toggleMutation.mutate()}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: reminderItem.completed }}
      accessibilityLabel={`Mark "${reminderItem.title}" as ${reminderItem.completed ? 'incomplete' : 'complete'}`}
    >
      {reminderItem.completed && <View style={styles.checkboxFill} />}
    </Pressable>
    ```
    ```tsx
    // app/(protected)/index.tsx ("+" button, updated)
    <Pressable
      style={[styles.addButton, { bottom: 24 + insets.bottom }]}
      onPress={() => router.push('/(protected)/createUpdateReminder')}
      accessibilityRole="button"
      accessibilityLabel="Add reminder"
    >
      <Text style={styles.addButtonText}>+</Text>
    </Pressable>
    ```

* **⭐️ Class Exercise: Turn On a Screen Reader**
    1.  Add the `accessibilityLabel`/`accessibilityRole`/`accessibilityState` props above to the checkbox and the "+" button.
    2.  Turn on VoiceOver (iOS: Settings → Accessibility → VoiceOver) or TalkBack (Android: Settings → Accessibility → TalkBack) on a real device, and navigate your reminders list by swiping between elements instead of looking at the screen.
    3.  Confirm the checkbox announces both what it is ("checkbox") and its current state ("checked" / "not checked") — not just silence or a raw icon description.
    4.  Confirm the "+" button announces "Add reminder," not just "button" with no label.

### 4. Setting Up Component Testing

Vitest and pytest showed up in earlier courses; Jest is React Native's equivalent — and `jest-expo` specifically was already installed back in Week 3 for the first validation tests. Add the one missing piece for testing actual components:

```bash
npx expo install --dev @testing-library/react-native
```

```json
// package.json
{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "preset": "jest-expo"
  }
}
```

### 5. Writing Component Tests

```tsx
// components/__tests__/ReminderListItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react-native';
import ReminderListItem from '../ReminderListItem';

test('renders the reminder title and notes', () => {
  render(
    <ReminderListItem
      reminderItem={{ id: 1, title: 'Buy milk', notes: 'Whole milk', completed: false }}
    />
  );
  expect(screen.getByText('Buy milk')).toBeTruthy();
  expect(screen.getByText('Whole milk')).toBeTruthy();
});

test('renders without notes when none are provided', () => {
  render(<ReminderListItem reminderItem={{ id: 2, title: 'Call the dentist', completed: false }} />);
  expect(screen.getByText('Call the dentist')).toBeTruthy();
  expect(screen.queryByText('Whole milk')).toBeNull();
});
```

**⭐️ Class Exercise: Test the Form's Validation**

Write a test for the create-reminder form: render it, attempt to save with an empty title (simulate pressing "Save" with `fireEvent`), and assert that no navigation/save call happened — the same empty-title validation you built back in Week 3.

---

## Module 12: Shipping with EAS

**Objective:** Produce a real installable build and get it in front of real testers.

### 1. App Config: Icon, Splash Screen & Scheme

Before building anything installable, `app.json` needs to actually describe *your* app — not the generic Expo defaults every project starts with.

* **Lecture & Concepts:**
    * `app.json` (or `app.config.js`) holds everything about the app that isn't code: its name, icon, splash screen, bundle identifiers — and a URL `scheme`, which is what makes deep linking possible.
    * A real icon and splash screen are the most immediately visible difference between "a project running in Expo Go" and "a real, installed app" — skipping them is obvious the moment someone else opens your build.

* **In-Depth Example:**
    ```json
    // app.json
    {
      "expo": {
        "name": "Reminders",
        "slug": "reminders-app",
        "scheme": "remindersapp",
        "icon": "./assets/icon.png",
        "splash": {
          "image": "./assets/splash-icon.png",
          "backgroundColor": "#0E7AFE"
        },
        "ios": { "bundleIdentifier": "com.yourname.remindersapp" },
        "android": { "package": "com.yourname.remindersapp" }
      }
    }
    ```
    * `icon` needs to be a real, square PNG (1024×1024 is the safe default) — this is what shows on the home screen once installed, not the generic Expo logo.
    * `splash` is shown briefly while your JS bundle loads — a background color plus a small centered image is the standard, simple choice.
    * `scheme` registers a custom URL scheme (`remindersapp://...`) so a link from a notification, a QR code, or another app can open this app directly — the subject of the next section.

* **⭐️ Class Exercise: Give It a Real Identity**
    1.  Replace the default icon/splash assets in `assets/` with something of your own (even a simple placeholder), and point `app.json` at them.
    2.  Set a real, unique `scheme` in `app.json` (e.g. `remindersapp`).
    3.  Restart `expo start` and reload — confirm your custom icon appears in the app switcher and your splash screen shows briefly on launch.

### 2. Deep Linking: Using the Scheme You Just Set

* **Lecture & Concepts:**
    * That `scheme` isn't just decorative — Expo Router uses it automatically to support **deep linking**: a URL like `remindersapp://createUpdateReminder?id=5` opens the app directly to that reminder's edit screen, even from a cold start.
    * The most natural real use here: tapping a due-date notification (Week 4) should open the app straight to *that* reminder, not just dump the user on the home screen.

* **In-Depth Example:**
    ```tsx
    // app/_layout.tsx (add alongside the notification-handling logic from Week 4)
    import * as Notifications from 'expo-notifications';
    import { router } from 'expo-router';

    useEffect(() => {
      const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
        const reminderId = response.notification.request.content.data?.reminderId;
        if (reminderId) {
          router.push(`/(protected)/createUpdateReminder?id=${reminderId}`);
        }
      });
      return () => subscription.remove();
    }, []);
    ```
    * This requires attaching a `reminderId` to the notification's `data` wherever you schedule it now — inside `createMutation`'s `onSuccess`, per Week 5's migration (`Notifications.scheduleNotificationAsync({ content: { data: { reminderId: newReminder.id }, ... }, ... })`) — worth going back and adding if you haven't already.

* **⭐️ Class Exercise: Tap a Notification, Land on the Right Reminder**
    1.  Add `data: { reminderId }` to your notification-scheduling call.
    2.  Add the response listener above to `_layout.tsx`.
    3.  Schedule a reminder 1-2 minutes out, background the app, and when the notification arrives, tap it — confirm the app opens directly to that reminder's edit screen, not just the home screen.

### 3. Configuring EAS

```bash
npm install -g eas-cli
eas login
eas build:configure
```

This generates an `eas.json` with build profiles — typically `development`, `preview`, and `production` — each configuring things like whether the build includes dev tools or is store-ready.

### 4. Building

```bash
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

This runs in Expo's cloud build infrastructure — you don't need a Mac to build for iOS, or Android Studio installed locally, to build for Android. When it finishes, EAS gives you a link to install the build directly on a registered test device.

### 5. EAS Update — Shipping Fixes Without a Store Review

Once your app is built and installed, **EAS Update** lets you push JS-only changes (bug fixes, content tweaks) directly to users' installed apps — no app store review required. This only works for changes that don't touch native code; adding a new native module still requires a full rebuild.

```bash
eas update --branch preview --message "Fix reminder due-date formatting"
```

### 6. Submitting for Review

```bash
eas submit --platform ios
eas submit --platform android
```

This uploads your build to TestFlight (iOS) or Google Play's Internal Testing track (Android) — the standard way to get a real, not-yet-public build in front of real testers before a full public release.

**⭐️ Class Exercise: Get It On Your Phone**

Run a `preview` build for whichever platform matches your phone, install it via the link EAS gives you, and confirm it launches and works exactly like it did in Expo Go — but now it's a real, standalone app icon on your home screen.

---

## 📝 Week 6 / Final Project: Ship the Reminders App

**Goal:** Combine everything from all six weeks into one shipped, tested, polished app.

### Requirements

1. **Core flow, fully working:** signup/login, view reminders (`FlatList`), create/edit a reminder (shared modal, pre-filled on edit), mark complete (checkbox), delete (both the edit screen's button and swipe-to-delete) — all against the live, deployed Node/Express API.
2. **Device features:** local due-date notifications still working after the Week 5 backend migration, and tapping one deep-links to that specific reminder.
3. **Polish:** at least one Reanimated animation (e.g. list item entrance/exit) and swipe-to-delete via Gesture Handler.
4. **Accessibility:** the checkbox and "+" button have real `accessibilityLabel`/`accessibilityRole`/`accessibilityState`, verified with VoiceOver or TalkBack on a real device.
5. **App identity:** a real icon, splash screen, and `scheme` configured in `app.json` — no default Expo branding left.
6. **Tests:** component tests for `ReminderListItem` and the create/update form's validation, all passing (`npm test`).
7. **Shipped build:** a real EAS `preview` (or `production`) build installed on a physical device.
8. **Submission (stretch):** the build submitted to TestFlight or Play Internal Testing.

### Final Deliverable

Submit: your Github repo URL, a link to install your build (or a TestFlight/Play Store invite), and a short demo video showing the full flow — signup through to editing, completing, and deleting (both ways) a reminder — running against the live, deployed backend.

### Git Workflow

* `git commit -m "feat: add Reanimated entrance/exit animations to reminder list"`
* `git commit -m "feat: add swipe-to-delete with react-native-gesture-handler"`
* `git commit -m "fix: add accessibility labels, roles, and state to interactive elements"`
* `git commit -m "chore: configure real app icon, splash screen, and URL scheme"`
* `git commit -m "feat: deep-link due-date notifications to their reminder"`
* `git commit -m "test: add component tests for ReminderListItem and the create form"`
* `git commit -m "chore: configure EAS and ship a preview build"`

Congratulations — you've built and shipped a real, full-stack mobile app: a React Native frontend talking to a real Node/Express backend, with real accounts, real persistence, and a real install on a real device. Everything from here (offline support, shared/collaborative lists, richer search) is a natural extension of the app you already understand end to end.
