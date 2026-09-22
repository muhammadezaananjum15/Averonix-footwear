import { useState } from 'react'

type Props = {
  close: () => void
  onCopyCode: (code: string) => void
}

export default function VipClubModal({ close, onCopyCode }: Props) {
  const [copied, setCopied] = useState(false)
  const code = 'AVX15'

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    onCopyCode(code)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-panel vip-club-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close VIP offer">
          ×
        </button>

        <div className="vip-badge">✦ EXCLUSIVE PRIVILEGE</div>
        <h2>Join The Averonix Circle</h2>
        <p className="vip-desc">
          Enjoy 15% off your order immediately, complimentary express worldwide courier dispatch, and private access to our quarterly limited runs.
        </p>

        <div className="vip-code-container">
          <div className="vip-code-display">
            <span>PROMO CODE:</span>
            <strong>{code}</strong>
          </div>
          <button className="button button-dark copy-code-btn" onClick={handleCopy}>
            {copied ? 'Code Copied! ✓' : 'Copy Code ↗'}
          </button>
        </div>

        <div className="vip-benefits">
          <div>
            <i>✓</i> Instant 15% discount applied at checkout
          </div>
          <div>
            <i>✓</i> 30-day wear trial with free returns
          </div>
          <div>
            <i>✓</i> Concierge fit consulting
          </div>
        </div>
      </div>
    </div>
  )
}
