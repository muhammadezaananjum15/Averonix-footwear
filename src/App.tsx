import { useState } from 'react'
import type { Currency, Page, Product, Review } from './types'
import { initialReviews } from './data/products'
import { useCart } from './hooks/useCart'
import { useSaved } from './hooks/useSaved'
import { useNotice } from './hooks/useNotice'
import { useGsap } from './hooks/useGsap'

// Layout & UI
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Toast from './components/ui/Toast'
import ScrollProgress from './components/ui/ScrollProgress'
import BackToTop from './components/ui/BackToTop'

// Modals & Overlays
import Bag from './components/modals/Bag'
import ProductDetail from './components/modals/ProductDetail'
import SiteSearch from './components/modals/SiteSearch'
import SizeGuideModal from './components/modals/SizeGuideModal'
import ProductCompareModal from './components/modals/ProductCompareModal'
import VipClubModal from './components/modals/VipClubModal'
import ReviewModal from './components/modals/ReviewModal'

// Pages
import Home from './components/pages/Home'
import Catalog from './components/shop/Catalog'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Checkout from './components/pages/Checkout'
import Account from './components/pages/Account'
import Support from './components/pages/Support'
import Disclaimer from './components/pages/Disclaimer'
import AuthPage from './components/pages/AuthPage'

// ─────────────────────────────────────────────────────────────────────────────
// App — root component, owns all shared UI state, currencies & modals
// ─────────────────────────────────────────────────────────────────────────────

const CATALOG_PAGES: Page[] = ['shop', 'arrivals', 'best', 'offers']

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [bagOpen, setBagOpen] = useState(false)
  const [detail, setDetail] = useState<Product | null>(null)
  const [mobileNav, setMobileNav] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // New Modals State
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [vipModalOpen, setVipModalOpen] = useState(false)
  const [compareModalOpen, setCompareModalOpen] = useState(false)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)

  // Global Currency State
  const [currency, setCurrency] = useState<Currency>('USD')

  // Reviews List State
  const [reviews, setReviews] = useState<Review[]>(initialReviews)

  // Recently Viewed History
  const [recentProducts, setRecentProducts] = useState<Product[]>([])

  // Compared Products (up to 3)
  const [comparedProducts, setComparedProducts] = useState<Product[]>([])

  const { cart, orders, count, total, add, updateQuantity, completeOrder } = useCart()
  const { saved, toggleSaved } = useSaved()
  const { notice, showNotice } = useNotice()

  // GSAP entrance animations — runs on every page change
  useGsap(page)

  const go = (next: Page) => {
    setPage(next)
    setMobileNav(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /** Wrap add() so we also show a toast and close details if open */
  const addToCart = (product: Product, size?: string, quantity?: number) => {
    add(product, size, quantity)
    showNotice(`Added ${product.name} (${size || 'US 9'}) to your bag.`)
  }

  /** Open product detail and track in recently viewed */
  const handleOpenProduct = (product: Product) => {
    setDetail(product)
    setRecentProducts((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id)
      return [product, ...filtered].slice(0, 6)
    })
  }

  /** Toggle product into compare list */
  const handleToggleCompare = (product: Product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) {
        showNotice(`Removed ${product.name} from comparison.`)
        return prev.filter((p) => p.id !== product.id)
      }
      if (prev.length >= 3) {
        showNotice(`Compare limit reached (max 3 shoes).`)
        return prev
      }
      showNotice(`Added ${product.name} to comparison matrix.`)
      return [...prev, product]
    })
  }

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev])
    showNotice(`Thank you, ${newReview.author}! Your verified review was published.`)
  }

  const productActions = {
    add: addToCart,
    openProduct: handleOpenProduct,
    saved,
    toggleSaved,
    currency,
    openCompare: handleToggleCompare,
    openSizeGuide: () => setSizeGuideOpen(true),
  }

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <ScrollProgress />

      <Header
        page={page}
        go={go}
        count={count}
        openBag={() => setBagOpen(true)}
        openSearch={() => setSearchOpen(true)}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        saved={saved.length}
        currency={currency}
        setCurrency={setCurrency}
        openVipModal={() => setVipModalOpen(true)}
        openSizeGuide={() => setSizeGuideOpen(true)}
        openCompareModal={() => setCompareModalOpen(true)}
        comparedCount={comparedProducts.length}
      />

      {/* ── Pages ── */}
      {page === 'home' && (
        <Home
          go={go}
          {...productActions}
          reviews={reviews}
          openReviewModal={() => setReviewModalOpen(true)}
          recentProducts={recentProducts}
          comparedIds={comparedProducts.map((p) => p.id)}
        />
      )}
      {CATALOG_PAGES.includes(page) && (
        <Catalog
          page={page}
          {...productActions}
          comparedIds={comparedProducts.map((p) => p.id)}
        />
      )}
      {page === 'about' && <About go={go} />}
      {page === 'contact' && <Contact />}
      {page === 'checkout' && (
        <Checkout cart={cart} total={total} go={go} completeOrder={completeOrder} />
      )}
      {page === 'account' && (
        <Account go={go} saved={saved} orders={orders} openProduct={handleOpenProduct} />
      )}
      {page === 'support' && <Support go={go} />}
      {page === 'disclaimer' && <Disclaimer go={go} />}
      {page === 'login' && <AuthPage mode="login" go={go} />}
      {page === 'signup' && <AuthPage mode="signup" go={go} />}

      <Footer go={go} />

      {/* ── Overlays & Modals ── */}
      {bagOpen && (
        <Bag
          cart={cart}
          close={() => setBagOpen(false)}
          updateQuantity={updateQuantity}
          total={total}
          go={go}
          currency={currency}
        />
      )}
      {detail && (
        <ProductDetail
          product={detail}
          close={() => setDetail(null)}
          add={addToCart}
          saved={saved.includes(detail.id)}
          toggleSaved={() => toggleSaved(detail.id)}
          currency={currency}
          openSizeGuide={() => {
            setSizeGuideOpen(true)
          }}
          openCompare={handleToggleCompare}
          isCompared={comparedProducts.some((p) => p.id === detail.id)}
        />
      )}
      {searchOpen && (
        <SiteSearch close={() => setSearchOpen(false)} openProduct={handleOpenProduct} />
      )}
      {sizeGuideOpen && (
        <SizeGuideModal close={() => setSizeGuideOpen(false)} />
      )}
      {vipModalOpen && (
        <VipClubModal
          close={() => setVipModalOpen(false)}
          onCopyCode={(code) => showNotice(`Coupon code "${code}" copied to clipboard!`)}
        />
      )}
      {compareModalOpen && (
        <ProductCompareModal
          productsToCompare={comparedProducts}
          close={() => setCompareModalOpen(false)}
          removeProduct={(id) =>
            setComparedProducts((prev) => prev.filter((p) => p.id !== id))
          }
          openProduct={handleOpenProduct}
          add={addToCart}
          currency={currency}
        />
      )}
      {reviewModalOpen && (
        <ReviewModal
          close={() => setReviewModalOpen(false)}
          onSubmit={handleAddReview}
        />
      )}

      {/* Floating Back to Top button */}
      <BackToTop />

      <Toast message={notice} />
    </>
  )
}
