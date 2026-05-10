'use client'

import React, { useState, useMemo, useCallback } from 'react'
import RupeeIcon from '@/components/RupeeIcon'

interface Loan {
  id: string
  type: string
  emi: number
}

const LOAN_TYPES = [
  'Personal Loan',
  'Credit Card',
  'Home Loan',
  'Car / Auto / Bike Loan',
  'Gold Loan',
  'Education Loan',
  'Other'
]

const formatNumber = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(2)} Cr`
  } else if (amount >= 100000) {
    return `${(amount / 100000).toFixed(2)} L`
  }
  return formatNumber(amount)
}

interface EmiEligibilityCalculatorProps {
  compact?: boolean
}

export default function EmiEligibilityCalculator({ compact = false }: EmiEligibilityCalculatorProps) {
  const [monthlySalary, setMonthlySalary] = useState<number>(75000)
  const [hasHomeLoan, setHasHomeLoan] = useState<boolean>(false)
  const [loans, setLoans] = useState<Loan[]>([
    { id: '1', type: 'Personal Loan', emi: 0 }
  ])
  const [customRoi, setCustomRoi] = useState<number>(8.5)
  const [customTenure, setCustomTenure] = useState<number>(20)
  const [tenureUnit, setTenureUnit] = useState<'Yr' | 'Mo'>('Yr')

  const addLoan = useCallback(() => {
    const newId = Date.now().toString()
    setLoans(prev => [...prev, { id: newId, type: 'Personal Loan', emi: 0 }])
  }, [])

  const removeLoan = useCallback((id: string) => {
    setLoans(prev => prev.filter(loan => loan.id !== id))
  }, [])

  const updateLoan = useCallback((id: string, field: keyof Loan, value: string | number) => {
    setLoans(prev => prev.map(loan => 
      loan.id === id ? { ...loan, [field]: value } : loan
    ))
  }, [])

  const calculations = useMemo(() => {
    let eligibleEmiPercent: number
    let eligibilityBracket: string

    if (monthlySalary >= 100000) {
      eligibleEmiPercent = hasHomeLoan ? 75 : 65
      eligibilityBracket = '₹1 Lakh & Above'
    } else if (monthlySalary >= 75000) {
      eligibleEmiPercent = hasHomeLoan ? 70 : 60
      eligibilityBracket = '₹75,000 - ₹1 Lakh'
    } else if (monthlySalary >= 50000) {
      eligibleEmiPercent = hasHomeLoan ? 65 : 55
      eligibilityBracket = '₹50,000 - ₹75,000'
    } else if (monthlySalary >= 25000) {
      eligibleEmiPercent = hasHomeLoan ? 55 : 50
      eligibilityBracket = '₹25,000 - ₹50,000'
    } else {
      eligibleEmiPercent = hasHomeLoan ? 50 : 45
      eligibilityBracket = 'Below ₹25,000'
    }

    const maxEligibleEmi = Math.round((monthlySalary * eligibleEmiPercent) / 100)

    const totalExistingEmi = loans.reduce((sum, loan) => sum + (loan.emi || 0), 0)

    const availableEmiCapacity = Math.max(0, maxEligibleEmi - totalExistingEmi)

    const monthlyRate = customRoi / 12 / 100
    const totalMonths = tenureUnit === 'Yr' ? customTenure * 12 : customTenure
    
    let maxLoanEligible = 0
    if (availableEmiCapacity > 0 && monthlyRate > 0) {
      maxLoanEligible = (availableEmiCapacity * (Math.pow(1 + monthlyRate, totalMonths) - 1)) / 
                        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
    }

    return {
      eligibleEmiPercent,
      eligibilityBracket,
      maxEligibleEmi,
      totalExistingEmi,
      availableEmiCapacity,
      maxLoanEligible: Math.round(maxLoanEligible)
    }
  }, [monthlySalary, hasHomeLoan, loans, customRoi, customTenure, tenureUnit])

  const {
    eligibleEmiPercent,
    eligibilityBracket,
    maxEligibleEmi,
    totalExistingEmi,
    availableEmiCapacity,
    maxLoanEligible
  } = calculations

  if (compact) {
    return (
      <div className="elig-compact">
        {/* 1. Net Monthly Salary */}
        <div className="elig-compact-input-group">
          <label className="elig-compact-label">Net Monthly Salary</label>
          <div className="elig-compact-input-wrap">
            <span className="elig-compact-currency"><RupeeIcon size={14} /></span>
            <input
              type="text"
              value={monthlySalary.toLocaleString('en-IN')}
              onChange={(e) => {
                const val = e.target.value.replace(/,/g, '')
                if (!isNaN(Number(val))) setMonthlySalary(Number(val))
              }}
              className="elig-compact-input"
              placeholder="Enter salary"
            />
          </div>
        </div>

        {/* 2. Home Loan Toggle */}
        <div className="elig-compact-input-group">
          <label className="elig-compact-label">Already running home loan?</label>
          <div className="elig-compact-toggle">
            <button
              type="button"
              className={`elig-compact-toggle-btn yes ${hasHomeLoan ? 'active' : ''}`}
              onClick={() => setHasHomeLoan(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={`elig-compact-toggle-btn no ${!hasHomeLoan ? 'active' : ''}`}
              onClick={() => setHasHomeLoan(false)}
            >
              No
            </button>
          </div>
        </div>

        {/* 6. Maximum EMI You Can Pay */}
        <div className="elig-compact-main-result">
          <div className="elig-compact-main-label">Maximum EMI You Can Pay</div>
          <div className="elig-compact-main-value">
            <RupeeIcon size={20} />{formatNumber(maxEligibleEmi)}
            <span className="elig-compact-per-month">/month</span>
          </div>
        </div>

        {/* 4 & 5. Interest Rate and Tenure */}
        <div className="elig-compact-row">
          <div className="elig-compact-input-group half">
            <label className="elig-compact-label">Interest Rate</label>
            <div className="elig-compact-input-wrap">
              <input
                type="number"
                value={customRoi}
                onChange={(e) => setCustomRoi(Math.max(1, Math.min(30, Number(e.target.value))))}
                step="0.1"
                className="elig-compact-input"
              />
              <span className="elig-compact-suffix">%</span>
            </div>
          </div>
          <div className="elig-compact-input-group half">
            <label className="elig-compact-label">Tenure</label>
            <div className="elig-compact-tenure-wrap">
              <div className="elig-compact-input-wrap tenure">
                <input
                  type="number"
                  value={customTenure}
                  onChange={(e) => setCustomTenure(Math.max(1, Math.min(tenureUnit === 'Yr' ? 30 : 360, Number(e.target.value))))}
                  className="elig-compact-input"
                />
              </div>
              <div className="elig-compact-tenure-toggle">
                <button
                  type="button"
                  className={`elig-compact-tenure-btn ${tenureUnit === 'Yr' ? 'active' : ''}`}
                  onClick={() => {
                    if (tenureUnit === 'Mo') setCustomTenure(Math.max(1, Math.round(customTenure / 12)))
                    setTenureUnit('Yr')
                  }}
                >
                  Yr
                </button>
                <button
                  type="button"
                  className={`elig-compact-tenure-btn ${tenureUnit === 'Mo' ? 'active' : ''}`}
                  onClick={() => {
                    if (tenureUnit === 'Yr') setCustomTenure(customTenure * 12)
                    setTenureUnit('Mo')
                  }}
                >
                  Mo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 9. Max Loan Eligible */}
        <div className="elig-compact-loan-result">
          <div className="elig-compact-loan-label">Max Loan Eligible</div>
          <div className="elig-compact-loan-value">
            <RupeeIcon size={18} />{formatCurrency(maxLoanEligible)}
          </div>
        </div>

        {/* 8. Available EMI Capacity */}
        <div className="elig-compact-card green">
          <span className="elig-compact-card-label">Available EMI Capacity</span>
          <span className="elig-compact-card-value">
            <RupeeIcon size={14} />{formatNumber(availableEmiCapacity)}
          </span>
        </div>

        {/* 7. Total Existing EMIs */}
        <div className="elig-compact-card red">
          <span className="elig-compact-card-label">Total Existing EMIs</span>
          <span className="elig-compact-card-value">
            <RupeeIcon size={14} />{formatNumber(totalExistingEmi)}
          </span>
        </div>

        {/* 3. Existing EMI Obligations */}
        <div className="elig-compact-loans-section">
          <div className="elig-compact-loans-header">
            <label className="elig-compact-label">Existing EMI Obligations</label>
            <button
              type="button"
              onClick={addLoan}
              className="elig-compact-add-btn"
              title="Add another loan"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add
            </button>
          </div>
          <div className="elig-compact-loans-list">
            {loans.map((loan, index) => (
              <div key={loan.id} className="elig-compact-loan-row">
                <div className="elig-compact-loan-num">{index + 1}</div>
                <select
                  value={loan.type}
                  onChange={(e) => updateLoan(loan.id, 'type', e.target.value)}
                  className="elig-compact-select"
                >
                  {LOAN_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="elig-compact-input-wrap small">
                  <span className="elig-compact-currency"><RupeeIcon size={12} /></span>
                  <input
                    type="text"
                    value={loan.emi > 0 ? loan.emi.toLocaleString('en-IN') : ''}
                    onChange={(e) => {
                      const val = e.target.value.replace(/,/g, '')
                      if (!isNaN(Number(val))) {
                        updateLoan(loan.id, 'emi', Number(val))
                      }
                    }}
                    className="elig-compact-input"
                    placeholder="EMI"
                  />
                </div>
                {loans.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLoan(loan.id)}
                    className="elig-compact-remove-btn"
                    title="Remove"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="emi-elig-container">
      <div className="emi-elig-grid">
        {/* Left Column - Inputs */}
        <div className="emi-elig-inputs">
          <div className="emi-elig-card">
            <h3 className="emi-elig-card-title">
              <span className="emi-elig-icon">💰</span>
              Income Details
            </h3>
            
            {/* Salary Input */}
            <div className="emi-elig-input-group">
              <label className="emi-elig-label">Net Monthly Salary</label>
              <div className="emi-elig-input-wrapper">
                <span className="emi-elig-currency"><RupeeIcon size={18} /></span>
                <input
                  type="text"
                  value={monthlySalary.toLocaleString('en-IN')}
                  onChange={(e) => {
                    const val = e.target.value.replace(/,/g, '')
                    if (!isNaN(Number(val))) {
                      setMonthlySalary(Number(val))
                    }
                  }}
                  className="emi-elig-input"
                  placeholder="Enter your net monthly salary"
                />
              </div>
            </div>

            {/* Home Loan Toggle */}
            <div className="emi-elig-input-group">
              <label className="emi-elig-label">Already running home loan?</label>
              <div className="emi-elig-toggle-group">
                <button
                  type="button"
                  className={`emi-elig-toggle-btn ${hasHomeLoan ? 'active' : ''}`}
                  onClick={() => setHasHomeLoan(true)}
                >
                  <span className="emi-elig-toggle-icon">🏠</span>
                  Yes
                </button>
                <button
                  type="button"
                  className={`emi-elig-toggle-btn ${!hasHomeLoan ? 'active' : ''}`}
                  onClick={() => setHasHomeLoan(false)}
                >
                  <span className="emi-elig-toggle-icon">❌</span>
                  No
                </button>
              </div>
              <p className="emi-elig-hint">
                Home loan applicants get higher EMI eligibility due to secured lending
              </p>
            </div>
          </div>

          {/* Existing Loans Section */}
          <div className="emi-elig-card">
            <div className="emi-elig-card-header">
              <h3 className="emi-elig-card-title">
                <span className="emi-elig-icon">📋</span>
                Existing EMI Obligations
              </h3>
              <button
                type="button"
                onClick={addLoan}
                className="emi-elig-add-btn"
                title="Add another loan"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Loan
              </button>
            </div>

            <div className="emi-elig-loans-list">
              {loans.map((loan, index) => (
                <div key={loan.id} className="emi-elig-loan-row">
                  <div className="emi-elig-loan-number">{index + 1}</div>
                  <div className="emi-elig-loan-fields">
                    <div className="emi-elig-loan-type">
                      <select
                        value={loan.type}
                        onChange={(e) => updateLoan(loan.id, 'type', e.target.value)}
                        className="emi-elig-select"
                      >
                        {LOAN_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="emi-elig-loan-emi">
                      <div className="emi-elig-input-wrapper small">
                        <span className="emi-elig-currency"><RupeeIcon size={14} /></span>
                        <input
                          type="text"
                          value={loan.emi > 0 ? loan.emi.toLocaleString('en-IN') : ''}
                          onChange={(e) => {
                            const val = e.target.value.replace(/,/g, '')
                            if (!isNaN(Number(val))) {
                              updateLoan(loan.id, 'emi', Number(val))
                            }
                          }}
                          className="emi-elig-input"
                          placeholder="Monthly EMI"
                        />
                      </div>
                    </div>
                  </div>
                  {loans.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLoan(loan.id)}
                      className="emi-elig-remove-btn"
                      title="Remove loan"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {loans.length === 0 && (
              <div className="emi-elig-no-loans">
                <p>No existing loans added. Click "Add Loan" to include your current EMIs.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="emi-elig-results">
          {/* EMI Eligibility Card */}
          <div className="emi-elig-result-card primary">
            <h3 className="emi-elig-result-title">Maximum EMI You Can Pay</h3>
            <div className="emi-elig-result-value">
              <RupeeIcon size={28} />
              <span>{formatNumber(maxEligibleEmi)}</span>
              <span className="emi-elig-per-month">/month</span>
            </div>
            <div className="emi-elig-result-badge">
              {eligibleEmiPercent}% of Salary • {eligibilityBracket}
            </div>
          </div>

          {/* EMI Summary Card */}
          <div className="emi-elig-result-card summary">
            <h3 className="emi-elig-result-title">EMI Summary</h3>
            <div className="emi-elig-summary-details">
              <div className="emi-elig-summary-row">
                <span>Total Existing EMIs:</span>
                <span><RupeeIcon size={16} />{formatNumber(totalExistingEmi)}</span>
              </div>
              <div className="emi-elig-summary-row highlight">
                <span>Available EMI Capacity:</span>
                <span><RupeeIcon size={16} />{formatNumber(availableEmiCapacity)}</span>
              </div>
            </div>
          </div>

          {/* Max Loan Eligibility */}
          <div className="emi-elig-result-card loan">
            <h3 className="emi-elig-result-title">Maximum Eligible Loan Amount</h3>
            <div className="emi-elig-result-value large">
              <RupeeIcon size={32} />
              <span>{formatCurrency(maxLoanEligible)}</span>
            </div>
            
            {/* ROI and Tenure Inputs */}
            <div className="emi-elig-loan-inputs">
              <div className="emi-elig-loan-input-group">
                <label>Interest Rate (% p.a.)</label>
                <div className="emi-elig-loan-input-wrap">
                  <input
                    type="number"
                    value={customRoi}
                    onChange={(e) => setCustomRoi(Math.max(1, Math.min(30, Number(e.target.value))))}
                    step="0.1"
                    min="1"
                    max="30"
                    className="emi-elig-loan-input"
                  />
                  <span className="emi-elig-loan-input-suffix">%</span>
                </div>
              </div>
              <div className="emi-elig-loan-input-group">
                <label>Tenure (Years)</label>
                <div className="emi-elig-loan-input-wrap">
                  <input
                    type="number"
                    value={customTenure}
                    onChange={(e) => setCustomTenure(Math.max(1, Math.min(30, Number(e.target.value))))}
                    step="1"
                    min="1"
                    max="30"
                    className="emi-elig-loan-input"
                  />
                  <span className="emi-elig-loan-input-suffix">Yr</span>
                </div>
              </div>
            </div>
            
            <p className="emi-elig-loan-note">
              Based on RBI guidelines & your available EMI capacity
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
