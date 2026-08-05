import { getToken, isDemoToken } from './authService';
import {
  createDemoReminder,
  deleteDemoReminder,
  getDemoReminders,
  updateDemoReminder,
} from './demoReminders';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export type Reminder = {
  id: number;
  title: string;
  notes?: string;
  dueDate?: string;
  completed: boolean;
};

async function authedFetch(path: string, options: RequestInit = {}) {
  const token = await getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error ?? 'Request failed');
  }
  return response.json();
}

export async function getReminders(): Promise<Reminder[]> {
  if (isDemoToken(await getToken())) return getDemoReminders();
  return authedFetch('/reminders');
}

export async function createReminder(input: {
  title: string;
  notes?: string;
  dueDate?: string;
}): Promise<Reminder> {
  if (isDemoToken(await getToken())) return createDemoReminder(input);
  return authedFetch('/reminders', { method: 'POST', body: JSON.stringify(input) });
}

export async function updateReminder(id: number, input: Partial<Reminder>): Promise<Reminder> {
  if (isDemoToken(await getToken())) return updateDemoReminder(id, input);
  return authedFetch(`/reminders/${id}`, { method: 'PATCH', body: JSON.stringify(input) });
}

export async function deleteReminder(id: number): Promise<{ message: string }> {
  if (isDemoToken(await getToken())) return deleteDemoReminder(id);
  return authedFetch(`/reminders/${id}`, { method: 'DELETE' });
}
