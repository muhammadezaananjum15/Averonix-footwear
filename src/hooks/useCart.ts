import { useEffect, useState } from 'react'
import type { CartItem, Order, Product } from '../types'
import { STORAGE_KEYS, readStorage, writeStorage } from '../utils/storage'
import { generateOrderId, todayLabel } from '../utils/format'

// ─────────────────────────────────────────────────────────────────────────────
// useCart — all cart / order state and mutations
// ─────────────────────────────────────────────────────────────────────────────

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(STORAGE_KEYS.BAG, []),
  )
  const [orders, setOrders] = useState<Order[]>(() =>
    readStorage<Order[]>(STORAGE_KEYS.ORDERS, []),
  )

  // Persist on every change
  useEffect(() => writeStorage(STORAGE_KEYS.BAG, cart), [cart])
  useEffect(() => writeStorage(STORAGE_KEYS.ORDERS, orders), [orders])

  /** Total number of individual items in the bag */
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)

  /** Gross total before discounts */
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  /** Add or increment a product in the bag */
  const add = (product: Product, size = 'US 9', quantity = 1) => {
    setCart((items) => {
      const match = items.findIndex(
        (item) => item.product.id === product.id && item.size === size,
      )
      if (match < 0) return [...items, { product, size, quantity }]
      return items.map((item, index) =>
        index === match ? { ...item, quantity: item.quantity + quantity } : item,
      )
    })
  }

  /** Change the quantity of a line-item; passing 0 removes it */
  const updateQuantity = (index: number, quantity: number) => {
    setCart((items) =>
      quantity <= 0
        ? items.filter((_, i) => i !== index)
        : items.map((item, i) => (i === index ? { ...item, quantity } : item)),
    )
  }

  /** Commit the current cart as a new order and clear the bag */
  const completeOrder = (): Order => {
    const order: Order = {
      id: generateOrderId(),
      placedAt: todayLabel(),
      status: 'Confirmed',
      items: cart,
      total,
    }
    setOrders((prev) => [order, ...prev])
    setCart([])
    return order
  }

  return { cart, orders, count, total, add, updateQuantity, completeOrder }
}
