import { getToken } from './authService';

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

export function getReminders(): Promise<Reminder[]> {
  return authedFetch('/reminders');
}

export function createReminder(input: { title: string; notes?: string; dueDate?: string }): Promise<Reminder> {
  return authedFetch('/reminders', { method: 'POST', body: JSON.stringify(input) });
}

export function updateReminder(id: number, input: Partial<Reminder>): Promise<Reminder> {
  return authedFetch(`/reminders/${id}`, { method: 'PATCH', body: JSON.stringify(input) });
}

export function deleteReminder(id: number): Promise<{ message: string }> {
  return authedFetch(`/reminders/${id}`, { method: 'DELETE' });
}
