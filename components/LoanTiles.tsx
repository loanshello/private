'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

/* Sprite: loan-tiles-icons.png is a 4×3 grid (left→right, top→bottom) */
const SPRITE_COLS = 4
const SPRITE_ROWS = 3
const SPRITE_URL = '/assets/images/loan-tiles-icons.png'

const loanTypes: Array<{
  name: string
  slug: string
  image?: string
  spriteCol: number
  spriteRow: number
}> = [
    { name: 'Personal Loans', slug: 'personal-loans', image: '/assets/icons/personal-loan.png', spriteCol: 0, spriteRow: 0 },
    { name: 'Business Loans', slug: 'business-loans', image: '/assets/icons/business-loan.jpeg', spriteCol: 1, spriteRow: 0 },
    { name: 'Overdraft', slug: 'overdraft', image: '/assets/icons/overdraft.jpeg', spriteCol: 2, spriteRow: 0 },
    { name: 'Loan Against Property', slug: 'loan-against-property', image: '/assets/icons/secured-loans.jpeg', spriteCol: 3, spriteRow: 0 },
    { name: 'Used Car Loan', slug: 'used-car-loan', image: '/assets/icons/instant-loan.jpeg', spriteCol: 2, spriteRow: 2 },
    { name: 'Balance Transfer', slug: 'balance-transfer', image: '/assets/icons/balance-transfer.jpeg', spriteCol: 0, spriteRow: 1 },
    { name: 'Professional Loans', slug: 'professional-loans', image: '/assets/icons/professional-loans.jpeg', spriteCol: 1, spriteRow: 1 },
    { name: 'Credit Cards', slug: 'credit-cards', image: '/assets/icons/credit-card.jpeg', spriteCol: 2, spriteRow: 1 },
    { name: 'Home Loans', slug: 'home-loans', image: '/assets/icons/home-loans.jpeg', spriteCol: 3, spriteRow: 1 },
    { name: 'Gold Loans', slug: 'gold-loans', image: '/assets/icons/gold-loans.jpeg', spriteCol: 0, spriteRow: 2 },
    { name: 'Education Loans', slug: 'education-loans', image: '/assets/icons/education-loans.jpeg', spriteCol: 1, spriteRow: 2 },
    { name: 'Insurance', slug: 'insurance', image: '/assets/icons/insurance.jpeg', spriteCol: 3, spriteRow: 2 },
  ]

const translationKeyMap: Record<string, string> = {
  'overdraft': 'overdraft',
  'personal-loans': 'personalLoans',
  'business-loans': 'businessLoans',
  'professional-loans': 'professionalLoans',
  'loan-against-property': 'secureLoans',
  'balance-transfer': 'balanceTransfer',
  'used-car-loan': 'usedCarLoan',
  'home-loans': 'homeLoans',
  'gold-loans': 'goldLoans',
  'education-loans': 'educationLoans',
  'insurance': 'insurance',
  'credit-cards': 'creditCards',
}

export default function LoanTiles() {
  const { t } = useLanguage()

  return (
    <section className="loan-tiles-section">
      <div className="loan-tiles-container">
        <div className="loan-tiles-header">
          <h2 className="loan-tiles-title">
            <span className="highlight-box">
              Our <span className="highlight-shimmer">Loan</span> Products
            </span>
          </h2>
        </div>
        <div className="loan-tiles-grid">
          {loanTypes.map((loan) => {
            const labelText = translationKeyMap[loan.slug] ? t(`carousel.${translationKeyMap[loan.slug]}`) : loan.name
            const parts = labelText.split(/\s+/)
            const line1 = parts[0] ?? labelText
            const line2 = parts.length > 1 ? parts.slice(1).join(' ') : ''
            return (
            <Link
              key={loan.slug}
              href={`/loans/${loan.slug}`}
              className="loan-tile"
            >
              {/* Top layer: slides up on hover to reveal bottom */}
              <div className="loan-tile-top">
                <div className="loan-tile-icon-wrapper">
                  <div className="loan-tile-icon-circle loan-tile-icon-sprite" role="img" aria-label={loan.name}>
                    {loan.image ? (
                      <Image
                        src={loan.image}
                        alt={loan.name}
                        width={80}
                        height={80}
                        className="loan-tile-icon-img"
                      />
                    ) : (
                      <span
                        className="loan-tile-sprite-cell"
                        style={{
                          backgroundImage: `url(${SPRITE_URL})`,
                          backgroundSize: `${SPRITE_COLS * 100}% ${SPRITE_ROWS * 100}%`,
                          backgroundPosition: `${(loan.spriteCol / (SPRITE_COLS - 1)) * 100}% ${(loan.spriteRow / (SPRITE_ROWS - 1)) * 100}%`,
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="loan-tile-label loan-tile-label-top">
                  {line2 ? (
                    <>
                      <span className="loan-tile-label-line">{line1}</span>
                      <span className="loan-tile-label-line">{line2}</span>
                    </>
                  ) : (
                    <span className="loan-tile-label-line">{line1}</span>
                  )}
                </div>
              </div>
              {/* Bottom layer: revealed when top slides up */}
              <div className="loan-tile-bottom">
                <div className="loan-tile-label">
                  {line2 ? (
                    <>
                      <span className="loan-tile-label-line">{line1}</span>
                      <span className="loan-tile-label-line">{line2}</span>
                    </>
                  ) : (
                    <span className="loan-tile-label-line">{line1}</span>
                  )}
                </div>
                <span className="loan-tile-cta">View →</span>
              </div>
            </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
