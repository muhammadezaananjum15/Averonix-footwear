import { useEffect, useState } from 'react'
import { STORAGE_KEYS, readStorage, writeStorage } from '../utils/storage'

// ─────────────────────────────────────────────────────────────────────────────
// useSaved — wishlist / saved-styles state
// ─────────────────────────────────────────────────────────────────────────────

export function useSaved() {
  const [saved, setSaved] = useState<number[]>(() =>
    readStorage<number[]>(STORAGE_KEYS.SAVED, []),
  )

  useEffect(() => writeStorage(STORAGE_KEYS.SAVED, saved), [saved])

  const toggleSaved = (id: number) =>
    setSaved((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    )

  return { saved, toggleSaved }
}
