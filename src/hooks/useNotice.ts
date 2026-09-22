import { useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// useNotice — ephemeral toast notifications
// ─────────────────────────────────────────────────────────────────────────────

const DURATION_MS = 2600

export function useNotice() {
  const [notice, setNotice] = useState('')

  const showNotice = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), DURATION_MS)
  }

  return { notice, showNotice }
}
