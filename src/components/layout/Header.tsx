import type { Currency, Page } from '../../types'
import Announcement from './Announcement'

// ─────────────────────────────────────────────────────────────────────────────
// Header — announcement bar + sticky nav with live currency & tools
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  page: Page
  go: (page: Page) => void
  count: number
  openBag: () => void
  openSearch: () => void
  mobileNav: boolean
  setMobileNav: (value: boolean) => void
  saved: number
  currency: Currency
  setCurrency: (c: Currency) => void
  openVipModal: () => void
  openSizeGuide: () => void
  openCompareModal: () => void
  comparedCount: number
}

const NAV_LINKS: [Page, string][] = [
  ['home', 'Home'],
  ['shop', 'Shop'],
  ['arrivals', 'New'],
  ['best', 'Bestsellers'],
  ['offers', 'Offers'],
  ['about', 'Story'],
  ['contact', 'Contact'],
]

export default function Header({
  page,
  go,
  count,
  openBag,
  openSearch,
  mobileNav,
  setMobileNav,
  saved,
  currency,
  setCurrency,
  openVipModal,
  openSizeGuide,
  openCompareModal,
  comparedCount,
}: Props) {
  return (
    <>
      <Announcement
        currency={currency}
        setCurrency={setCurrency}
        openVipModal={openVipModal}
      />

      <header className="nav-shell store-nav">
        <button
          className="mobile-menu"
          aria-label="Open navigation"
          onClick={() => setMobileNav(!mobileNav)}
        >
          ☰
        </button>

        <button className="logo link-button" onClick={() => go('home')}>
          <span className="logo-mark">A</span> AVERONIX
        </button>

        <nav className={mobileNav ? 'open' : ''}>
          {NAV_LINKS.map(([target, label]) => (
            <button
              key={target}
              className={page === target ? 'nav-link selected' : 'nav-link'}
              onClick={() => go(target)}
            >
              {label}
            </button>
          ))}
          <button className="nav-link nav-fit-link" onClick={openSizeGuide}>
            Size Guide
          </button>
        </nav>

        <div className="nav-actions">
          <button
            aria-label="Search all products"
            className="search-trigger"
            onClick={openSearch}
            title="Search shoes"
          >
            ⌕
          </button>

          {/* Compare Button */}
          {comparedCount > 0 && (
            <button
              className="compare-nav-trigger"
              onClick={openCompareModal}
              title="View product comparison"
            >
              ⚖<i>{comparedCount}</i>
            </button>
          )}

          <button aria-label="Open saved styles" onClick={() => go('account')} title="Saved wishlist">
            ♡{saved ? <i>{saved}</i> : ''}
          </button>

          <button className="auth-link" onClick={() => go('login')}>
            Log in
          </button>

          <button className="auth-signup" onClick={() => go('signup')}>
            Sign up
          </button>

          <button aria-label="Open bag" onClick={openBag} className="nav-bag-button">
            Bag <span>{String(count).padStart(2, '0')}</span>
          </button>
        </div>
      </header>
    </>
  )
}
