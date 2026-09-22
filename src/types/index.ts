// ─────────────────────────────────────────────────────────────────────────────
// Averonix — Shared type definitions
// ─────────────────────────────────────────────────────────────────────────────

export type Page =
  | 'home'
  | 'shop'
  | 'arrivals'
  | 'best'
  | 'offers'
  | 'about'
  | 'contact'
  | 'checkout'
  | 'account'
  | 'support'
  | 'disclaimer'
  | 'login'
  | 'signup'

export type Category = 'Running' | 'Lifestyle' | 'Training' | 'Trail'

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AED'

export type Product = {
  id: number
  name: string
  category: Category
  price: number
  previous?: number
  color: string
  image: string
  alternateImages?: string[]
  arrival?: boolean
  best?: boolean
  offer?: boolean
  description: string
  badge?: string
  specs?: {
    weight: string
    drop: string
    cushion: 'Firm' | 'Balanced' | 'Maximum Plush'
    surface: string
    midsole: string
  }
  rating?: number
  reviewsCount?: number
}

export type CartItem = {
  product: Product
  size: string
  quantity: number
}

export type Order = {
  id: string
  placedAt: string
  status: 'Confirmed' | 'Preparing' | 'Dispatched'
  items: CartItem[]
  total: number
}

export type Review = {
  id: string
  author: string
  location: string
  rating: number
  title: string
  comment: string
  productName: string
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large'
  date: string
  verified: boolean
}

/** Prop-set shorthand used by product-rendering components */
export type ProductActions = {
  add: (product: Product, size?: string, quantity?: number) => void
  openProduct: (product: Product) => void
  saved: number[]
  toggleSaved: (id: number) => void
  openCompare?: (product: Product) => void
  openSizeGuide?: () => void
  currency?: Currency
}

/** Minimal GSAP runtime shape (loaded from CDN — no npm package) */
export type GsapTimeline = {
  from: (
    target: string | Element | Element[],
    vars: Record<string, unknown>,
    position?: string | number,
  ) => GsapTimeline
}

export type GsapRuntime = {
  registerPlugin: (plugin: unknown) => void
  context: (callback: () => void) => { revert: () => void }
  from: (target: string | Element | Element[], vars: Record<string, unknown>) => unknown
  to: (target: string | Element | Element[], vars: Record<string, unknown>) => unknown
  timeline: (vars?: Record<string, unknown>) => GsapTimeline
  utils: { toArray: (selector: string) => Element[] }
}
