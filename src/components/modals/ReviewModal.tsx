import { type FormEvent, useState } from 'react'
import type { Review } from '../../types'
import { products } from '../../data/products'

type Props = {
  close: () => void
  onSubmit: (review: Review) => void
}

export default function ReviewModal({ close, onSubmit }: Props) {
  const [author, setAuthor] = useState('')
  const [location, setLocation] = useState('')
  const [productName, setProductName] = useState(products[0].name)
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [fitFeedback, setFitFeedback] = useState<'Runs Small' | 'True to Size' | 'Runs Large'>('True to Size')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !comment.trim() || !title.trim()) return

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || 'Verified Buyer',
      productName,
      rating,
      title: title.trim(),
      comment: comment.trim(),
      fitFeedback,
      date: 'Just now',
      verified: true,
    }

    onSubmit(newReview)
    close()
  }

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-panel review-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close modal">
          ×
        </button>

        <p className="eyebrow">COMMUNITY FEEDBACK</p>
        <h2>Write a Review</h2>
        <p className="modal-subhead">Share your real-world miles and impressions with fellow athletes.</p>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-row-two">
            <label>
              Your Name *
              <input
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Jordan Miller"
              />
            </label>
            <label>
              City, Country
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. New York, USA"
              />
            </label>
          </div>

          <div className="form-row-two">
            <label>
              Select Product
              <select
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="review-select"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </label>

            <label>
              Star Rating
              <div className="star-picker">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`star-btn ${star <= rating ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </label>
          </div>

          <label>
            Fit Rating
            <div className="fit-pill-group">
              {(['Runs Small', 'True to Size', 'Runs Large'] as const).map((fit) => (
                <button
                  type="button"
                  key={fit}
                  className={`fit-pill-btn ${fitFeedback === fit ? 'selected' : ''}`}
                  onClick={() => setFitFeedback(fit)}
                >
                  {fit}
                </button>
              ))}
            </div>
          </label>

          <label>
            Review Headline *
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Incredibly responsive and cushioned"
            />
          </label>

          <label>
            Detailed Experience *
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about the distance, terrain, and fit feel..."
            />
          </label>

          <button type="submit" className="button button-dark submit-review-btn">
            Submit Verified Review <span>→</span>
          </button>
        </form>
      </div>
    </div>
  )
}
