'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import InstantLoanSlide from './InstantLoanSlide'

const HERO_SLIDES = [
  {
    id: 1,
    mainText: 'Providing the Best future for your Best living.',
    highlight: 'Best',
  },
  {
    id: 2,
    mainText: 'Personal Loan starting @ 9.97%',
    highlight: '9.97%',
    loanType: 'personal',
  },
  {
    id: 3,
    mainText: 'Business Loan starting @ 12.99%',
    highlight: '12.99%',
    loanType: 'business',
  },
  {
    id: 4,
    mainText: 'Home Loan starting @ 7.35%',
    highlight: '7.35%',
    loanType: 'home',
  },
  {
    id: 5,
    mainText: 'Loan Against Property starting @ 9%',
    highlight: '9%',
    loanType: 'lap',
  },
]

export default function Hero() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating, currentSlide])

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % HERO_SLIDES.length
    goToSlide(next)
  }, [currentSlide, goToSlide])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const slide = HERO_SLIDES[currentSlide]

  const CheckEligibilityButton = () => (
    <Link href="/emi-calculator" className="hero-check-eligibility-btn">
      Check Eligibility
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  )

  const renderSlideText = () => {
    if (currentSlide === 0) {
      const titleLine1 = t('hero.titleLine1')
      const titleLine2 = t('hero.titleLine2')
      const highlight = t('hero.highlight')
      const capitalizedHighlight = highlight.charAt(0).toUpperCase() + highlight.slice(1)
      const parts1 = titleLine1.split(highlight)
      const parts2 = titleLine2.split(highlight)
      const hasHighlight1 = parts1.length > 1
      const hasHighlight2 = parts2.length > 1

      return (
        <span className="highlight-box">
          {hasHighlight1 ? (
            <>
              {parts1[0]}
              <span className="highlight-shimmer">{capitalizedHighlight}</span>
              {parts1.slice(1).join(highlight)}
            </>
          ) : (
            titleLine1
          )}
          <br />
          {hasHighlight2 ? (
            <>
              {parts2[0]}
              <span className="highlight-shimmer">{capitalizedHighlight}</span>
              {parts2.slice(1).join(highlight)}
            </>
          ) : (
            titleLine2
          )}
          <CheckEligibilityButton />
        </span>
      )
    }

    const { mainText, highlight } = slide
    if (highlight && mainText.includes(highlight)) {
      const [before, after] = mainText.split(highlight)
      return (
        <span className="highlight-box hero-loan-text">
          {before}
          <span className="highlight-shimmer hero-rate-highlight">{highlight}</span>
          {after}
          <CheckEligibilityButton />
        </span>
      )
    }
    return (
      <span className="highlight-box hero-loan-text">
        {mainText}
        <CheckEligibilityButton />
      </span>
    )
  }

  return (
    <div className="hero-section" id="home">
      <div className="hero-container">
        <div className={`hero-text-block hero-text-animated ${isAnimating ? 'slide-out' : 'slide-in'}`}>
          {renderSlideText()}
        </div>
        
        <div className="hero-carousel-dots">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="hero-carousel-content">
          <InstantLoanSlide />
        </div>
      </div>
    </div>
  )
}
