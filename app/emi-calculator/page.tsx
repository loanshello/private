'use client'

import LoanCalculator from '@/components/LoanCalculator'
import BankLoanComparison from '@/components/BankLoanComparison'
import EmiEligibilityCalculator from '@/components/EmiEligibilityCalculator'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CompareButton } from '@/components/EmiCalculatorWithComparison'
import { useLanguage } from '@/contexts/LanguageContext'

export default function EmiCalculatorPage() {
  const { t } = useLanguage()
  const scrollToComparison = () => {
    const heading = document.querySelector('.compare-bank-loans-title')
    const scroller = document.querySelector('.scrollable-content')
    if (heading && scroller) {
      const headingTop = heading.getBoundingClientRect().top
      const scrollerTop = scroller.getBoundingClientRect().top
      scroller.scrollBy({ top: headingTop - scrollerTop, behavior: 'smooth' })
    }
  }

  return (
    <div className="page-container">
      <Header />
      <div className="scrollable-content">
        <main className="loan-page-main">
          <div className="loan-page-container">
            <div className="loan-page-header emi-page-header-with-btn">
              <div className="emi-header-title-row">
                <h1>
                  {(() => {
                    const title = t('emi.pageTitle')
                    const idx = title.indexOf(' ')
                    if (idx === -1) return <span className="shimmer-text">{title}</span>
                    return <><span className="shimmer-text">{title.substring(0, idx)}</span>{title.substring(idx)}</>
                  })()}
                </h1>
                <CompareButton onCompareClick={scrollToComparison} />
              </div>
              <p>{t('emi.pageDesc')}</p>
            </div>

            {/* Side-by-side Calculators */}
            <div className="emi-calculators-row">
              {/* EMI Calculator */}
              <div className="emi-calc-panel">
                <div className="emi-calc-panel-header">
                  <h2><span className="shimmer-text">EMI</span> Calculator</h2>
                  <p>Calculate your monthly EMI for any loan amount</p>
                </div>
                <LoanCalculator
                  loanType="Personal Loan"
                  defaultBanks={[]}
                  defaultInterestRate={10.5}
                  minAmount={50000}
                  maxAmount={999999999999}
                  compact
                />
              </div>

              {/* EMI Eligibility Calculator */}
              <div className="emi-calc-panel">
                <div className="emi-calc-panel-header">
                  <h2><span className="shimmer-text">Eligibility</span> Calculator</h2>
                  <p>Find out how much loan you can afford</p>
                </div>
                <EmiEligibilityCalculator compact />
              </div>
            </div>

            {/* Bank Comparison Section - Full Width Below */}
            <BankLoanComparison />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

