import { type FormEvent, useState } from 'react'
import type { Page } from '../../types'

// ─────────────────────────────────────────────────────────────────────────────
// Footer — newsletter + site links
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  go: (page: Page) => void
}

export default function Footer({ go }: Props) {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const join = (event: FormEvent) => {
    event.preventDefault()
    setJoined(true)
    setEmail('')
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <button className="logo link-button" onClick={() => go('home')}>
            <span className="logo-mark">A</span> AVERONIX
          </button>
          <p className="footer-intro">
            Performance footwear for an intentional life in motion.
          </p>
        </div>

        <form onSubmit={join}>
          <label>Private releases and field notes</label>
          <div>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
            />
            <button type="submit">→</button>
          </div>
          {joined && <small>Welcome to the list.</small>}
        </form>
      </div>

      <div className="footer-links">
        <div>
          <b>Shop</b>
          <button onClick={() => go('shop')}>All styles</button>
          <button onClick={() => go('arrivals')}>New arrivals</button>
          <button onClick={() => go('best')}>Bestsellers</button>
        </div>
        <div>
          <b>Service</b>
          <button onClick={() => go('support')}>Delivery &amp; returns</button>
          <button onClick={() => go('contact')}>Concierge</button>
          <button onClick={() => go('account')}>My account</button>
        </div>
        <div>
          <b>About</b>
          <button onClick={() => go('about')}>Our approach</button>
          <button onClick={() => go('support')}>Fit guide</button>
          <button onClick={() => go('offers')}>Current offers</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 AVERONIX ATHLETICS. ALL RIGHTS RESERVED.</p>
        <div>
          <button onClick={() => go('contact')}>Contact</button>
          <button onClick={() => go('support')}>Shipping &amp; returns</button>
          <button onClick={() => go('disclaimer')}>Disclaimer</button>
          <button onClick={() => go('account')}>Account</button>
        </div>
      </div>
    </footer>
  )
}
