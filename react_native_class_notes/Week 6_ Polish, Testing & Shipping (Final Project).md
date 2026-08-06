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

### 6. A Design System Pass — Theming the Final App

Every screen so far has used one ad-hoc accent color, hand-typed as the literal string `'#D9793F'` in a dozen different `StyleSheet.create()` calls since Week 2. That was fine for focusing on *behavior* first — but it doesn't scale, and it's not how a real app's visual identity gets managed. This pass gives the finished app one cohesive look, driven from a single file.

* **Lecture & Concepts:**
    * A **design token** is a named constant for a design decision — a color, a corner radius, a spacing value — kept in one place instead of copy-pasted everywhere. Native has no CSS variables, so the RN equivalent is refreshingly low-tech: a plain exported object.
    * The reference app's final look is a warm, neutral surface (cream background, white cards) with **one** accent color doing all the work links, buttons, and selection states did separately before — the same "pick one accent, use it consistently" idea, just formalized.
    * None of this touches logic. Every gesture, mutation, and validation rule from Weeks 1-5 (and the animation/swipe/accessibility work earlier in this module) stays exactly as it is — only `style={...}` values change.

* **In-Depth Example:**
    ```tsx
    // constants/theme.ts
    export const colors = {
      background: '#F7F1E6',
      surface: '#FFFFFF',
      surfaceMuted: '#F1E6D5',
      border: '#E8DECB',
      ink: '#221B15',
      textPrimary: '#221B15',
      textSecondary: '#8C8072',
      accent: '#D9793F',
      accentSoft: '#F5DEC3',
      danger: '#BE4A3C',
      white: '#FFFFFF',
    };

    export const radii = { sm: 10, md: 16, lg: 20, pill: 999 };
    export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
    ```
    `ReminderListItem` becomes a rounded card instead of a bottom-bordered row, its checkbox becomes an icon "bubble" (filled with `colors.accent` and a ✓ glyph once checked, `colors.accentSoft` when not), and a trailing chevron hints that tapping the row opens it — the checkbox's gesture, the row's `onPress`/`onLongPress`, and the accessibility props from section 3 all carry over completely unchanged:
    ```tsx
    // components/ReminderListItem.tsx (styles, updated)
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md,
        marginBottom: spacing.sm, backgroundColor: colors.surface, borderRadius: radii.lg,
        shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
      },
      checkbox: {
        width: 40, height: 40, borderRadius: radii.md - 2, backgroundColor: colors.accentSoft,
        borderWidth: 1.5, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center',
      },
      checkboxChecked: { backgroundColor: colors.accent, borderColor: colors.accent },
      title: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
      completedTitle: { textDecorationLine: 'line-through', color: colors.textSecondary },
      chevron: { fontSize: 20, color: colors.textSecondary },
      // ...content/subtitle styles follow the same colors.* tokens
    });
    ```
    The home screen trades its floating "+" circle for a header row with title and a solid `Add` pill — matching the reference app's layout — and groups reminders by due date with `SectionList` instead of a flat `FlatList`, plus a floating `All / Active / Done` filter pill along the bottom (pure client-side filtering of `completed` — no backend change needed):
    ```tsx
    // app/(protected)/index.tsx (shape, updated)
    <View style={styles.header}>
      <Text style={styles.heading}>Reminders</Text>
      <Pressable style={styles.addButton} onPress={() => router.push('/(protected)/createUpdateReminder')}>
        <Text style={styles.addButtonText}>Add</Text>
      </Pressable>
    </View>
    <SectionList
      sections={groupByDueDate(filtered)} // groups by dueDate's day, undated last
      renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
      renderItem={({ item }) => <ReminderListItem reminderItem={item} ... />}
    />
    ```
    The section title format (`"13 Feb, Mon"`) comes straight from `Date#toLocaleDateString` with `{ day: 'numeric', month: 'short' }` and `{ weekday: 'short' }` — no date library needed for something this simple. The `Add` button keeps the exact `accessibilityRole="button"` / `accessibilityLabel="Add reminder"` pair from section 3; only its position and label text changed.

    > **Don't forget `useSafeAreaInsets` on the new header, too.** Week 2's `insets.bottom` lesson was about the *floating* "+" button specifically — but moving the title and `Add` button into a header row at the very top of the screen runs into the exact same problem from the other direction: a fixed `paddingTop` looks fine on the simulator you're testing on, then sits half-behind the Dynamic Island or status bar on a real notched phone. Pad the header with `insets.top` (the same `useSafeAreaInsets()` call already in this file), not a hardcoded number:
    > ```tsx
    > <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
    > ```
    The auth screens (`login.tsx`, `signup.tsx`) and the create/edit form pick up the same tokens too — bordered `colors.surface` inputs on a `colors.background` page, a solid `colors.ink` pill for the primary action, and `colors.accent` for links and the header "Save" text. Update `app.json`'s icon/splash colors to match (see Module 12, next) so the app's identity is consistent from splash screen to every screen after it.

* **⭐️ Class Exercise: Theme the Whole App**
    1.  Add `constants/theme.ts` exactly as shown, and replace every hardcoded hex value across `components/` and `app/` with the matching `colors.*`/`radii.*`/`spacing.*` token — there should be no bare `'#...'` string left in a screen or component file.
    2.  Confirm `npm test` still passes unmodified — you changed *how things look*, not what text renders or what any button is named, so every existing assertion should still hold.
    3.  Confirm the app still behaves identically end to end: create, edit, complete, and delete a reminder, and toggle the `All`/`Active`/`Done` filter — only the visuals should feel different.

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
          "backgroundColor": "#D9793F"
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

1. **Core flow, fully working:** signup/login, view reminders grouped by due date (`SectionList`), create/edit a reminder (shared modal, pre-filled on edit), mark complete (checkbox), delete (both the edit screen's button and swipe-to-delete) — all against the live, deployed Node/Express API.
2. **Device features:** local due-date notifications still working after the Week 5 backend migration, and tapping one deep-links to that specific reminder.
3. **Polish:** at least one Reanimated animation (e.g. list item entrance/exit) and swipe-to-delete via Gesture Handler.
4. **Design system:** a single `constants/theme.ts` of colors/radii/spacing tokens, applied consistently across every screen — no hardcoded hex values left in a component's `StyleSheet`, plus a working `All`/`Active`/`Done` filter on the home screen.
5. **Accessibility:** the checkbox and "Add" button have real `accessibilityLabel`/`accessibilityRole`/`accessibilityState`, verified with VoiceOver or TalkBack on a real device.
6. **App identity:** a real icon, splash screen, and `scheme` configured in `app.json` — no default Expo branding left.
7. **Tests:** component tests for `ReminderListItem` and the create/update form's validation, all passing (`npm test`).
8. **Shipped build:** a real EAS `preview` (or `production`) build installed on a physical device.
9. **Submission (stretch):** the build submitted to TestFlight or Play Internal Testing.

### Final Deliverable

Submit: your Github repo URL, a link to install your build (or a TestFlight/Play Store invite), and a short demo video showing the full flow — signup through to editing, completing, and deleting (both ways) a reminder — running against the live, deployed backend.

### Git Workflow

* `git commit -m "feat: add Reanimated entrance/exit animations to reminder list"`
* `git commit -m "feat: add swipe-to-delete with react-native-gesture-handler"`
* `git commit -m "feat: apply cream/ink/terracotta design system across all screens"`
* `git commit -m "fix: add accessibility labels, roles, and state to interactive elements"`
* `git commit -m "chore: configure real app icon, splash screen, and URL scheme"`
* `git commit -m "feat: deep-link due-date notifications to their reminder"`
* `git commit -m "test: add component tests for ReminderListItem and the create form"`
* `git commit -m "chore: configure EAS and ship a preview build"`

Congratulations — you've built and shipped a real, full-stack mobile app: a React Native frontend talking to a real Node/Express backend, with real accounts, real persistence, and a real install on a real device. Everything from here (offline support, shared/collaborative lists, richer search) is a natural extension of the app you already understand end to end.
