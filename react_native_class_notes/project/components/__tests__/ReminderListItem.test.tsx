import { render, screen } from '@testing-library/react-native';
import ReminderListItem from '../ReminderListItem';

test('renders the reminder title and notes', async () => {
  await render(
    <ReminderListItem
      reminderItem={{ id: 1, title: 'Buy milk', notes: 'Whole milk', completed: false }}
    />
  );
  expect(screen.getByText('Buy milk')).toBeTruthy();
  expect(screen.getByText('Whole milk')).toBeTruthy();
});

test('renders without notes when none are provided', async () => {
  await render(<ReminderListItem reminderItem={{ id: 2, title: 'Call the dentist', completed: false }} />);
  expect(screen.getByText('Call the dentist')).toBeTruthy();
  expect(screen.queryByText('Whole milk')).toBeNull();
});
