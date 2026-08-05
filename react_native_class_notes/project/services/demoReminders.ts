import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Reminder } from './reminderService';

const DEMO_REMINDERS_KEY = 'demoReminders';

const SEED_REMINDERS: Reminder[] = [
  {
    id: 1,
    title: 'Buy groceries',
    notes: 'Milk, eggs, bread',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    completed: false,
  },
  {
    id: 2,
    title: 'Finish class notes',
    notes: 'Week 5 routing & global state',
    completed: false,
  },
  {
    id: 3,
    title: 'Call dentist',
    completed: true,
  },
];

async function readReminders(): Promise<Reminder[]> {
  const raw = await AsyncStorage.getItem(DEMO_REMINDERS_KEY);
  if (!raw) {
    await AsyncStorage.setItem(DEMO_REMINDERS_KEY, JSON.stringify(SEED_REMINDERS));
    return SEED_REMINDERS.map((reminder) => ({ ...reminder }));
  }
  return JSON.parse(raw);
}

async function writeReminders(reminders: Reminder[]) {
  await AsyncStorage.setItem(DEMO_REMINDERS_KEY, JSON.stringify(reminders));
}

export async function getDemoReminders(): Promise<Reminder[]> {
  return readReminders();
}

export async function createDemoReminder(input: {
  title: string;
  notes?: string;
  dueDate?: string;
}): Promise<Reminder> {
  const reminders = await readReminders();
  const nextId = reminders.reduce((max, reminder) => Math.max(max, reminder.id), 0) + 1;
  const created: Reminder = {
    id: nextId,
    title: input.title,
    notes: input.notes,
    dueDate: input.dueDate,
    completed: false,
  };
  reminders.unshift(created);
  await writeReminders(reminders);
  return created;
}

export async function updateDemoReminder(id: number, input: Partial<Reminder>): Promise<Reminder> {
  const reminders = await readReminders();
  const index = reminders.findIndex((reminder) => reminder.id === id);
  if (index < 0) throw new Error('Reminder not found');
  const updated = { ...reminders[index], ...input, id };
  reminders[index] = updated;
  await writeReminders(reminders);
  return updated;
}

export async function deleteDemoReminder(id: number): Promise<{ message: string }> {
  const reminders = await readReminders();
  await writeReminders(reminders.filter((reminder) => reminder.id !== id));
  return { message: 'Deleted' };
}
