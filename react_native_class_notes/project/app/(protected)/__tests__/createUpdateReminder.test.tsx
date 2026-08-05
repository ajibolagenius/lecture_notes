import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateUpdateReminderScreen from '../createUpdateReminder';
import { createReminder } from '../../../services/reminderService';

// Stack.Screen's headerRight is normally rendered by the native header chrome, not
// the screen's own body — mounting it here lets RNTL find and press the "Save" text
// exactly as a user tapping the real header button would.
jest.mock('expo-router', () => ({
  router: { back: jest.fn(), push: jest.fn() },
  Stack: {
    Screen: ({ options }: any) => (options?.headerRight ? options.headerRight() : null),
  },
  useLocalSearchParams: () => ({}),
}));

jest.mock('../../../services/reminderService', () => ({
  createReminder: jest.fn(),
  updateReminder: jest.fn(),
}));

jest.mock('../../../state/notifications', () => ({
  scheduleReminderNotification: jest.fn(),
  cancelReminderNotification: jest.fn(),
}));

async function renderScreen() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <CreateUpdateReminderScreen />
    </QueryClientProvider>
  );
}

test('blocks saving a reminder with an empty title', async () => {
  await renderScreen();

  await fireEvent.press(screen.getByText('Save'));

  expect(createReminder).not.toHaveBeenCalled();
});

test('saves a reminder once a title is entered', async () => {
  await renderScreen();

  await fireEvent.changeText(screen.getByPlaceholderText('Title'), 'Buy milk');
  await fireEvent.press(screen.getByText('Save'));

  await waitFor(() =>
    expect(createReminder).toHaveBeenCalledWith({ title: 'Buy milk', notes: undefined, dueDate: undefined })
  );
});
