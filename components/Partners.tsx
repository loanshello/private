'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRef, useEffect, useCallback } from 'react'

const partners = [
  { image: '/assets/images/CB.png', alt: 'Canara Bank', color: '#00A0C0' },
  { image: '/assets/images/AX.png', alt: 'Axis Bank', color: '#7b0046' },
  { image: '/assets/images/HDFC.svg', alt: 'HDFC Bank', color: '#004c8f' },
  { image: '/assets/images/Kotak-1.png', alt: 'Kotak Mahindra Bank', color: '#d71920' },
  { image: '/assets/images/BOB.png', alt: 'Bank of Baroda', color: '#f97316' },
  { image: '/assets/images/SBI.png', alt: 'SBI', color: '#00A0C0' },
  { image: '/assets/images/partners/icici.svg', alt: 'ICICI Bank', color: '#b6401e' },
  { image: '/assets/images/partners/indusind.jpeg', alt: 'IndusInd Bank', color: '#C4122E' },
  { image: '/assets/images/partners/idfc.webp', alt: 'IDFC First Bank', color: '#7a003c' },
  { image: '/assets/images/partners/bajaj.png', alt: 'Bajaj Finserv', color: '#0076b8' },
  { image: '/assets/images/partners/unity.png', alt: 'Unity Bank', color: '#5b21b6' },
  { image: '/assets/images/partners/hero.png', alt: 'Hero FinCorp', color: '#dc2626' },
  { image: '/assets/images/partners/poonawalla.png', alt: 'Poonawalla', color: '#0d9488' },
  { image: '/assets/images/partners/incred.png', alt: 'InCred', color: '#0369a1' },
  { image: '/assets/images/partners/dmi.png', alt: 'DMI Finance', color: '#008DAA' },
  { image: '/assets/images/partners/fi.svg', alt: 'Fi Money', color: '#7c3aed' },
  { image: '/assets/images/partners/muthoot.png', alt: 'Muthoot', color: '#b45309' },
  { image: '/assets/images/partners/tata.png', alt: 'Tata Capital', color: '#2b8fcb' },
  { image: '/assets/images/partners/abfl.webp', alt: 'Aditya Birla Finance', color: '#a02030' },
  { image: '/assets/images/partners/federal.jpeg', alt: 'Federal Bank', color: '#007A94' },
  { image: '/assets/images/partners/kiwi.jpg', alt: 'Kiwi', color: '#16a34a' },
  { image: '/assets/images/partners/tataneu.webp', alt: 'Tata Neu', color: '#6d28d9' },
  { image: '/assets/images/partners/scapia.jpg', alt: 'Scapia', color: '#0891b2' },
  { image: '/assets/images/partners/magnifi.png', alt: 'Magnifi', color: '#4f46e5' },
  { image: '/assets/images/partners/popcard.jpg', alt: 'Popcard', color: '#e11d48' },
  { image: '/assets/images/partners/jio.jpeg', alt: 'Jio', color: '#006B80' },
  { image: '/assets/images/partners/protium.jpg', alt: 'Protium', color: '#0e7490' },
  { image: '/assets/images/partners/prefer.jpeg', alt: 'CreditVidya', color: '#059669' },
]

const mid = Math.ceil(partners.length / 2)
const row1 = partners.slice(0, mid)
const row2 = partners.slice(mid)

const ITEM_WIDTH = 140
const GAP = 20
const STEP = ITEM_WIDTH + GAP
const SPEED = 0.6

function useRowScroll(itemCount: number, scrollLeft: boolean) {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const isPausedRef = useRef(false)
  const frameRef = useRef<number>(0)

  const halfWidth = itemCount * STEP

  const animate = useCallback(() => {
    const track = trackRef.current
    if (track && !isPausedRef.current) {
      if (scrollLeft) {
        posRef.current -= SPEED
        if (Math.abs(posRef.current) >= halfWidth) posRef.current += halfWidth
      } else {
        posRef.current += SPEED
        if (posRef.current >= 0) posRef.current -= halfWidth
      }
      track.style.transform = `translate3d(${posRef.current}px, 0, 0)`
    }
    frameRef.current = requestAnimationFrame(animate)
  }, [halfWidth, scrollLeft])

  useEffect(() => {
    if (!scrollLeft) posRef.current = -halfWidth
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [animate, scrollLeft, halfWidth])

  const shift = (delta: number) => {
    posRef.current += delta
    if (posRef.current > 0) posRef.current -= halfWidth
    if (Math.abs(posRef.current) >= halfWidth) posRef.current += halfWidth
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`
    }
  }

  return { trackRef, isPausedRef, shift }
}

export default function Partners() {
  const { t } = useLanguage()
  const r1 = useRowScroll(row1.length, true)
  const r2 = useRowScroll(row2.length, false)

  const handlePrev = () => { r1.shift(STEP * 3); r2.shift(STEP * 3) }
  const handleNext = () => { r1.shift(-STEP * 3); r2.shift(-STEP * 3) }
  const pause = () => { r1.isPausedRef.current = true; r2.isPausedRef.current = true }
  const resume = () => { r1.isPausedRef.current = false; r2.isPausedRef.current = false }

  const doubled1 = [...row1, ...row1]
  const doubled2 = [...row2, ...row2]

  return (
    <section
      className="partners-section"
      aria-label="Partners – continuous scroll, pauses on hover"
    >
      <h2 className="section-title">
        <span className="highlight-box">
          Our <span className="highlight-shimmer">Authorized</span> Partners
        </span>
      </h2>
      <div className="partners-slideshow partners-slideshow--dual">
        <button
          className="partners-slide-btn"
          onClick={handlePrev}
          aria-label="Previous partners"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div
          className="partners-slideshow-viewport partners-slideshow-viewport--dual"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div
            className="partners-slideshow-track"
            ref={r1.trackRef}
            style={{ animation: 'none' }}
          >
            {doubled1.map((partner, index) => (
              <div
                key={index}
                className="partner-logo partners-slide-item partners-slide-item--sm"
                style={{
                  backgroundColor: `${partner.color}10`,
                  borderColor: `${partner.color}40`,
                }}
              >
                <Image
                  src={partner.image}
                  alt={partner.alt}
                  width={120}
                  height={55}
                  style={{ maxWidth: '100%', maxHeight: '55px', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
          <div
            className="partners-slideshow-track"
            ref={r2.trackRef}
            style={{ animation: 'none' }}
          >
            {doubled2.map((partner, index) => (
              <div
                key={index}
                className="partner-logo partners-slide-item partners-slide-item--sm"
                style={{
                  backgroundColor: `${partner.color}10`,
                  borderColor: `${partner.color}40`,
                }}
              >
                <Image
                  src={partner.image}
                  alt={partner.alt}
                  width={120}
                  height={55}
                  style={{ maxWidth: '100%', maxHeight: '55px', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className="partners-slide-btn"
          onClick={handleNext}
          aria-label="Next partners"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}
