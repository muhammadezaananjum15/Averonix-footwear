// ─────────────────────────────────────────────────────────────────────────────
// Averonix — Formatting utilities
// ─────────────────────────────────────────────────────────────────────────────

import type { Currency } from '../types'

export const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; locale: string }> = {
  USD: { rate: 1.0, symbol: '$', locale: 'en-US' },
  EUR: { rate: 0.92, symbol: '€', locale: 'de-DE' },
  GBP: { rate: 0.79, symbol: '£', locale: 'en-GB' },
  CAD: { rate: 1.36, symbol: 'CA$', locale: 'en-CA' },
  AED: { rate: 3.67, symbol: 'AED ', locale: 'en-AE' },
}

/** Format currency with active currency conversion */
export const formatPrice = (amountUsd: number, currency: Currency = 'USD'): string => {
  const meta = CURRENCY_RATES[currency] || CURRENCY_RATES.USD
  const converted = Math.round(amountUsd * meta.rate)
  return `${meta.symbol}${converted.toLocaleString(meta.locale)}`
}

/** USD currency formatter fallback */
export const money = {
  format: (amountUsd: number) => formatPrice(amountUsd, 'USD'),
}

/** Pad a cart count to always show two digits, e.g. "03" */
export const padCount = (n: number): string => String(n).padStart(2, '0')

/** Generate a human-readable order ID */
export const generateOrderId = (): string =>
  `AVX-${Math.floor(10000 + Math.random() * 89999)}`

/** Format today's date as "Sep 21, 2026" */
export const todayLabel = (): string =>
  new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
