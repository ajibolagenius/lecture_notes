import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL; // e.g. http://192.168.1.42:3000

const TOKEN_KEY = 'authToken';

/** Local-only session until the real backend is wired up. */
export const DEMO_TOKEN = 'demo-local-token';
export const DEMO_EMAIL = 'demo@reminders.app';
export const DEMO_PASSWORD = 'demo';

export function isDemoToken(token: string | null | undefined) {
  return token === DEMO_TOKEN;
}

export async function loginAsDemo() {
  await SecureStore.setItemAsync(TOKEN_KEY, DEMO_TOKEN);
  return DEMO_TOKEN;
}

export async function login(email: string, password: string) {
  if (email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return loginAsDemo();
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message ?? 'Login failed');
  }
  const { token } = await response.json();
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  return token;
}

export async function signup(email: string, password: string) {
  if (email.toLowerCase() === DEMO_EMAIL) {
    throw new Error('That email is reserved for the demo account. Use Continue as demo on the login screen.');
  }

  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message ?? 'Signup failed');
  }
  const { token } = await response.json();
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  return token;
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function logout() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
