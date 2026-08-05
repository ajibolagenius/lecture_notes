import { useEffect, useState } from 'react';

// A tiny shared, observable store — same subscribe/listeners shape as the
// remindersStore from Week 3 — so the root layout and the (auth) screens can
// agree on auth state without an imperative router call before the root
// navigator has ever mounted (which Expo Router now rejects outright).
let session: string | null | undefined; // undefined = not checked yet
const listeners = new Set<() => void>();

export function setSession(token: string | null) {
  session = token;
  listeners.forEach((listener) => listener());
}

export function useSession() {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const listener = () => forceUpdate((count) => count + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return session;
}
