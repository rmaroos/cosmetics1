const PREFIX = 'nelum:';

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {

    /* storage may be full or unavailable; state still lives in memory */}
}

export function removeStorage(key: string): void {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {

    /* ignore */}
}

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`nelum-salt::${password}`);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).
  map((b) => b.toString(16).padStart(2, '0')).
  join('');
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function createId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}