'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface SheetReview {
  name: string
  rating: number
  text: string
  date: string
}

const FALLBACK_REVIEWS = [
  { name: 'Ajay R', rating: 5, text: 'Excellent service from all team members. Zinee Group is my first choice for financial needs.' },
  { name: 'Raunak Batra', rating: 5, text: 'I was in need of funds and got my loan processed quickly with complete transparency.' },
  { name: 'Sonia Sharma', rating: 5, text: 'They provide quick financial assistance and a clear process that keeps you informed.' },
]

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

const avatarColors = [
  '#20B2CC', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444',
  '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#84cc16', '#0ea5e9',
]

export default function Testimonials() {
  const { t } = useLanguage()
  const [reviews, setReviews] = useState<{ name: string; rating: number; text: string }[]>([])

  useEffect(() => {
    fetch('/api/reviews/sheets')
      .then((r) => r.json())
      .then((data: { reviews?: SheetReview[] }) => {
        if (data.reviews?.length) {
          setReviews(data.reviews.map((r) => ({ name: r.name, rating: r.rating, text: r.text })))
        } else {
          setReviews(FALLBACK_REVIEWS)
        }
      })
      .catch(() => setReviews(FALLBACK_REVIEWS))
  }, [])

  const displayReviews = reviews.length > 0 ? reviews : FALLBACK_REVIEWS
  const tickerData = [...displayReviews, ...displayReviews]

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <div className="testimonials-header-left">
          <p className="happy-clients">{t('testimonials.happyClients')}</p>
          <h2 className="testimonials-title">
            <span className="highlight-box">
              <span className="highlight-shimmer">Client</span> Experiences
            </span>
          </h2>
        </div>
        <Link href="/reviews" className="read-all-reviews">
          {t('testimonials.readAll')}
        </Link>
      </div>
      <div className="testimonials-grid">
        <div className="testimonials-track">
          {tickerData.map((review, index) => (
            <article key={index} className="testimonial-card">
              <div className="testimonial-stars-row">
                <span className="testimonial-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} style={{ color: i < review.rating ? '#facc15' : '#d1d5db' }}>&#9733;</span>
                  ))}
                </span>
                <span className="testimonial-rating">
                  ({t('testimonials.rating')}: {review.rating})
                </span>
              </div>

              <p className="testimonial-text">&ldquo; {review.text} &rdquo;</p>

              <div className="testimonial-divider" />

              <div className="testimonial-footer">
                <span
                  className="testimonial-footer-avatar testimonial-avatar-initials"
                  style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
                >
                  {getInitials(review.name)}
                </span>
                <span className="testimonial-footer-name">{review.name}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
