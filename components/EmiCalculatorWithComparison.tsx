'use client'

import LoanCalculator from '@/components/LoanCalculator'
import BankLoanComparison from '@/components/BankLoanComparison'

interface EmiCalculatorWithComparisonProps {
  hideComparison?: boolean
  onlyComparison?: boolean
}

export default function EmiCalculatorWithComparison({ 
  hideComparison = false, 
  onlyComparison = false 
}: EmiCalculatorWithComparisonProps) {
  if (onlyComparison) {
    return <BankLoanComparison />
  }

  return (
    <>
      <LoanCalculator
        loanType="Personal Loan"
        defaultBanks={[]}
        defaultInterestRate={10.5}
        minAmount={50000}
        maxAmount={999999999999}
      />
      {!hideComparison && <BankLoanComparison />}
    </>
  )
}

export function CompareButton({ onCompareClick }: { onCompareClick: () => void }) {
  return (
    <button
      type="button"
      className="emi-header-compare-btn"
      onClick={onCompareClick}
      aria-label="Scroll to bank comparison section"
    >
      <span className="emi-header-compare-btn-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3h5v5" /><path d="M8 3H3v5" />
          <path d="M21 3l-7 7" /><path d="M3 3l7 7" />
          <path d="M16 21h5v-5" /><path d="M8 21H3v-5" />
          <path d="M21 21l-7-7" /><path d="M3 21l7-7" />
        </svg>
      </span>
      <span className="emi-header-compare-btn-text">
        Click here to<br /><strong>Compare</strong>
      </span>
      <span className="emi-header-compare-btn-arrow">
        <svg width="16" height="40" viewBox="0 0 24 58" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 2l5 5 5-5" />
          <path d="M7 10l5 5 5-5" />
          <path d="M7 18l5 5 5-5" />
          <path d="M7 26l5 5 5-5" />
          <path d="M7 34l5 5 5-5" />
          <path d="M7 42l5 5 5-5" />
          <path d="M7 50l5 5 5-5" />
          <path d="M7 58l5 5 5-5" />
        </svg>
      </span>
    </button>
  )
}
