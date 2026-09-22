import { useEffect, useState } from 'react'
import type { Currency } from '../../types'

type Props = {
  currency: Currency
  setCurrency: (c: Currency) => void
  openVipModal: () => void
}

const MESSAGES = [
  'COMPLIMENTARY EXPRESS DELIVERY ON ORDERS OVER $150',
  'SPRING / SUMMER 2026 CAMPAIGN RELEASED',
  '30-DAY RISK-FREE ROAD TRIAL — FREE GLOBAL EXCHANGES',
]

export default function Announcement({ currency, setCurrency, openVipModal }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="announcement">
      <div className="announcement-ticker">
        <span className="ticker-text">{MESSAGES[index]}</span>
      </div>

      <div className="announcement-extras">
        <button className="announcement-vip-btn" onClick={openVipModal}>
          ✦ Join VIP & Get 15% Off
        </button>

        <div className="currency-picker">
          <label htmlFor="currency-select" className="sr-only">Currency</label>
          <select
            id="currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="currency-select"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD (CA$)</option>
            <option value="AED">AED (AED)</option>
          </select>
        </div>
      </div>
    </div>
  )
}
