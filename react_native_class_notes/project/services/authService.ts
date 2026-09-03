import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL; // e.g. http://192.168.1.42:3000
const API_BASE = `${API_URL}/api/v1`;

const TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

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

async function storeSession({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
  await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
}

export async function login(email: string, password: string) {
  if (email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return loginAsDemo();
  }

  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error ?? 'Login failed');
  }
  const { accessToken, refreshToken } = await response.json();
  await storeSession({ accessToken, refreshToken });
  return accessToken;
}

export async function signup(email: string, password: string) {
  if (email.toLowerCase() === DEMO_EMAIL) {
    throw new Error('That email is reserved for the demo account. Use Continue as demo on the login screen.');
  }

  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error ?? 'Signup failed');
  }
  const { accessToken, refreshToken } = await response.json();
  await storeSession({ accessToken, refreshToken });
  return accessToken;
}

/** Exchanges the stored refresh token for a fresh access/refresh pair. */
export async function refreshSession() {
  const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  if (!refreshToken) throw new Error('No refresh token available');

  const response = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.error ?? 'Session refresh failed');
  }
  const { accessToken, refreshToken: newRefreshToken } = await response.json();
  await storeSession({ accessToken, refreshToken: newRefreshToken });
  return accessToken;
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function logout() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}
