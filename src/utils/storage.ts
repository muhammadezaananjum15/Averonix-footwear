// ─────────────────────────────────────────────────────────────────────────────
// Averonix — localStorage helpers
// ─────────────────────────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  BAG: 'averonix-bag',
  SAVED: 'averonix-saved',
  ORDERS: 'averonix-orders',
} as const

/** Read a JSON value from localStorage; returns the fallback on any error. */
export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

/** Persist any JSON-serialisable value to localStorage. */
export function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // quota exceeded — silently ignore
  }
}
