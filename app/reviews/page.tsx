'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import EmailVerification from '@/components/EmailVerification'

interface SheetReview {
  name: string
  rating: number
  text: string
  date: string
}

function StarRating({ value, onChange, readonly = false }: { value: number; onChange?: (v: number) => void; readonly?: boolean }) {
  const [hover, setHover] = useState(0)
  return (
    <div className={`star-rating-input ${readonly ? 'star-rating-readonly' : ''}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star-btn ${star <= (hover || value) ? 'star-active' : ''}`}
          onClick={() => !readonly && onChange?.(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          disabled={readonly}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill={star <= (hover || value) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

const avatarColors = [
  '#20B2CC', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444',
  '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#84cc16', '#0ea5e9',
]

export default function ReviewsPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    rating: 5
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [reviews, setReviews] = useState<SheetReview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/reviews/sheets')
      .then((r) => r.json())
      .then((data) => {
        if (data.reviews?.length) setReviews(data.reviews)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === 'email') setEmailVerified(false)
    if (submitMessage) setSubmitMessage('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!emailVerified) return
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitMessage(t('reviews.thankYou'))
        setFormData({ name: '', email: '', review: '', rating: 5 })
        setEmailVerified(false)
      } else {
        setSubmitMessage(t('reviews.errorMessage'))
      }
    } catch {
      setSubmitMessage(t('reviews.errorMessage'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="main-body">
        <aside className="sidebar left-sidebar"></aside>
        <section className="main-content">
          <div className="content-wrapper">
            <div className="reviews-page-container">

              {/* Hero Header */}
              <div className="reviews-hero">
                <div className="reviews-hero-content">
                  <h1 className="reviews-hero-title">{t('reviews.title')}</h1>
                  <p className="reviews-hero-subtitle">{t('reviews.intro')}</p>
                </div>
                {reviews.length > 0 && (
                  <div className="reviews-hero-stats">
                    <div className="reviews-stat-card">
                      <span className="reviews-stat-number">{avgRating}</span>
                      <StarRating value={Math.round(Number(avgRating))} readonly />
                      <span className="reviews-stat-label">{reviews.length} verified reviews</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Reviews Grid */}
              <section className="reviews-grid-section">
                <div className="reviews-section-header">
                  <h2 className="reviews-section-title">{t('reviews.allReviews')}</h2>
                  {reviews.length > 0 && (
                    <span className="reviews-count">{reviews.length} reviews</span>
                  )}
                </div>

                {loading ? (
                  <div className="reviews-loading">
                    <div className="reviews-loading-grid">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="review-card-skeleton">
                          <div className="skeleton-header">
                            <div className="skeleton-avatar" />
                            <div className="skeleton-lines">
                              <div className="skeleton-line skeleton-line-short" />
                              <div className="skeleton-line skeleton-line-tiny" />
                            </div>
                          </div>
                          <div className="skeleton-line skeleton-line-stars" />
                          <div className="skeleton-line" />
                          <div className="skeleton-line skeleton-line-medium" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="reviews-empty">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <p>No reviews yet. Be the first to share your experience!</p>
                  </div>
                ) : (
                  <div className="reviews-masonry">
                    {reviews.map((review, index) => (
                      <article key={index} className="review-card">
                        <div className="review-card-header">
                          <div
                            className="review-avatar"
                            style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
                          >
                            {getInitials(review.name)}
                          </div>
                          <div className="review-meta">
                            <span className="review-author">{review.name}</span>
                            <span className="review-badge">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                              Verified
                            </span>
                          </div>
                        </div>
                        <div className="review-stars">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < review.rating ? '#facc15' : '#e2e8f0'} stroke="none">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <p className="review-text">&ldquo;{review.text}&rdquo;</p>
                        {review.date && (
                          <span className="review-date">{review.date}</span>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </section>

              {/* Write Review Section */}
              <section className="write-review-section" id="write-review">
                <div className="write-review-layout">
                  <div className="write-review-info">
                    <div className="write-review-header-row">
                      <div className="write-review-logo">
                        <Image src="/assets/images/helloans-logo.png" alt="Helloans" width={120} height={48} style={{ objectFit: 'contain' }} />
                      </div>
                      <h2 className="write-review-title">{t('reviews.writeReview')}</h2>
                    </div>
                    <p className="write-review-intro">{t('reviews.shareExperience')}</p>
                    <div className="write-review-benefits">
                      <div className="benefit-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                        <span>Your feedback helps us improve</span>
                      </div>
                      <div className="benefit-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                        <span>Reviews are verified via email</span>
                      </div>
                      <div className="benefit-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                        <span>Helps other customers make decisions</span>
                      </div>
                    </div>
                  </div>

                  <div className="write-review-form-card">
                    <form className="review-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">{t('contact.name')}</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder={t('reviews.yourName')}
                          className="form-input"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="form-label">{t('contact.email')}</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder={t('reviews.yourEmail')}
                          className="form-input"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <EmailVerification
                          email={formData.email}
                          onVerified={() => setEmailVerified(true)}
                          verified={emailVerified}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">{t('reviews.ratingOption')}</label>
                        <StarRating
                          value={formData.rating}
                          onChange={(v) => setFormData({ ...formData, rating: v })}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="review" className="form-label">{t('contact.message')}</label>
                        <textarea
                          id="review"
                          name="review"
                          placeholder={t('reviews.yourReview')}
                          className="form-textarea"
                          rows={5}
                          value={formData.review}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {submitMessage && (
                        <div className={`submit-message ${submitMessage === t('reviews.thankYou') ? 'success' : 'error'}`}>
                          {submitMessage}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="form-submit-button"
                        disabled={isSubmitting || !emailVerified}
                      >
                        {isSubmitting ? t('contact.submitting') : t('reviews.submitReview')}
                      </button>
                    </form>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </section>
        <aside className="sidebar right-sidebar"></aside>
      </main>
      <Footer />
    </>
  )
}
