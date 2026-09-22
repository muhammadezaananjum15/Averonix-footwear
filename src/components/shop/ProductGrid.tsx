import { useState } from 'react'
import type { Product, ProductActions } from '../../types'
import ProductCard from './ProductCard'

// ─────────────────────────────────────────────────────────────────────────────
// ProductGrid — responsive grid of ProductCards
// ─────────────────────────────────────────────────────────────────────────────

type Props = ProductActions & {
  products: Product[]
  comparedIds?: number[]
}

export default function ProductGrid({
  products: items,
  add,
  openProduct,
  saved,
  toggleSaved,
  currency = 'USD',
  openCompare,
  comparedIds = [],
}: Props) {
  const [quickAdd, setQuickAdd] = useState<number | null>(null)

  return (
    <div className="product-grid">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          add={add}
          openProduct={openProduct}
          saved={saved}
          toggleSaved={toggleSaved}
          quickAddOpen={quickAdd === product.id}
          onToggleQuickAdd={setQuickAdd}
          currency={currency}
          isCompared={comparedIds.includes(product.id)}
          onToggleCompare={openCompare}
        />
      ))}
    </div>
  )
}
