import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL; // e.g. http://192.168.1.42:3000

const TOKEN_KEY = 'authToken';

export async function login(email: string, password: string) {
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
