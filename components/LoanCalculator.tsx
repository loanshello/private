'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { useBankRates } from '@/contexts/BankRatesContext'
import RupeeIcon from '@/components/RupeeIcon'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts'

export type LoanCalculatorParams = { amount: number; tenure: number; tenureUnit: 'Yr' | 'Mo' }

interface LoanCalculatorProps {
  loanType: string
  minAmount?: number
  maxAmount?: number
  defaultInterestRate?: number
  defaultBanks?: any[]
  /** Called when loan amount, tenure or tenure unit changes (e.g. for comparison section). */
  onParamsChange?: (params: LoanCalculatorParams) => void
  /** Compact mode for side-by-side layout */
  compact?: boolean
  /** Called with yearly schedule data so parent can render the table separately */
  onScheduleData?: (data: any[]) => void
}

const formatNumber = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function LoanCalculator({
  loanType,
  minAmount = 100000,
  maxAmount = 10000000,
  defaultInterestRate = 10.5,
  onParamsChange,
  compact = false,
  onScheduleData,
}: LoanCalculatorProps) {
  const { t } = useLanguage()
  const { getDefaultRate, isLoading: ratesLoading } = useBankRates()
  const sheetRate = getDefaultRate(loanType)
  const effectiveDefault = sheetRate ?? defaultInterestRate

  const [amount, setAmount] = useState(500000)
  const [interestRate, setInterestRate] = useState(effectiveDefault)

  useEffect(() => {
    if (!ratesLoading && sheetRate !== null) {
      setInterestRate(parseFloat(sheetRate.toFixed(2)))
    }
  }, [ratesLoading, sheetRate])
  const [tenure, setTenure] = useState(3)
  const [tenureUnit, setTenureUnit] = useState<'Yr' | 'Mo'>('Yr')

  useEffect(() => {
    onParamsChange?.({ amount, tenure, tenureUnit })
  }, [amount, tenure, tenureUnit, onParamsChange])

  // Constants for Ranges
  const MIN_RATE = 1
  const MAX_RATE = 30

  // Tenure Constraints
  const minTenure = tenureUnit === 'Yr' ? 1 : 12
  const maxTenure = tenureUnit === 'Yr' ? 30 : 360

  // Calculations
  const calculations = useMemo(() => {
    const principal = amount
    const monthlyRate = interestRate / 12 / 100
    const totalMonths = tenureUnit === 'Yr' ? tenure * 12 : tenure

    let emiCalc = 0
    if (interestRate === 0) {
      emiCalc = principal / totalMonths
    } else {
      emiCalc = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    }

    const totalPay = emiCalc * totalMonths
    const totalInt = totalPay - principal

    // Yearly + Monthly Breakdown
    const yearlyData: Array<{
      year: number
      principalPaid: number
      interestPaid: number
      totalPayment: number
      balance: number
      loanPaidExecute: string
      months: Array<{ month: number; emi: number; principal: number; interest: number; balance: number }>
    }> = []
    let balance = principal
    let totalPrincipalPaid = 0
    let currentYearPrincipal = 0
    let currentYearInterest = 0
    let currentYearTotal = 0
    let currentYearMonths: Array<{ month: number; emi: number; principal: number; interest: number; balance: number }> = []

    const startYear = new Date().getFullYear()

    for (let m = 1; m <= totalMonths; m++) {
      const interestForMonth = balance * monthlyRate
      const principalForMonth = emiCalc - interestForMonth
      balance -= principalForMonth
      if (balance < 0) balance = 0

      currentYearPrincipal += principalForMonth
      currentYearInterest += interestForMonth
      currentYearTotal += emiCalc
      currentYearMonths.push({
        month: m,
        emi: Math.round(emiCalc),
        principal: Math.round(principalForMonth),
        interest: Math.round(interestForMonth),
        balance: Math.round(balance)
      })

      if (m % 12 === 0 || m === totalMonths) {
        const yearIndex = Math.ceil(m / 12) - 1
        const yearLabel = startYear + yearIndex
        totalPrincipalPaid += currentYearPrincipal
        const loanPaidPercent = (totalPrincipalPaid / principal) * 100

        yearlyData.push({
          year: yearLabel,
          principalPaid: Math.round(currentYearPrincipal),
          interestPaid: Math.round(currentYearInterest),
          totalPayment: Math.round(currentYearTotal),
          balance: Math.round(balance),
          loanPaidExecute: loanPaidPercent.toFixed(2) + '%',
          months: currentYearMonths
        })
        currentYearPrincipal = 0
        currentYearInterest = 0
        currentYearTotal = 0
        currentYearMonths = []
      }
    }

    return {
      emi: Math.round(emiCalc),
      totalInterest: Math.round(totalInt),
      totalPayment: Math.round(totalPay),
      yearlyData,
      startYear
    }
  }, [amount, interestRate, tenure, tenureUnit])

  const { emi, totalInterest, totalPayment, yearlyData } = calculations
  const [expandedYear, setExpandedYear] = useState<number | null>(null)

  useEffect(() => {
    onScheduleData?.(yearlyData)
  }, [yearlyData, onScheduleData])

  // Pie Chart Data: Principal (green), Interest (red)
  const pieData = [
    { name: t('emi.principalAmount'), value: amount },
    { name: t('emi.totalInterest'), value: totalInterest },
  ]

  const PRINCIPAL_COLOR_PIE = '#16a34a' // Green for principal
  const INTEREST_COLOR_PIE = '#dc2626'   // Red for interest
  const PIE_COLORS = [PRINCIPAL_COLOR_PIE, INTEREST_COLOR_PIE]

  // Custom Tooltip to ensure readability of "Total Interest"
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {label && <p style={{ fontWeight: 600, marginBottom: '8px', color: '#111827' }}>{label}</p>}
          {payload.map((entry: any, index: number) => {
            const isInterest = entry.name === t('emi.totalInterest') || (entry.name && entry.name.toLowerCase().includes('interest'));
            const color = isInterest ? '#000000' : (entry.color || entry.payload?.fill || '#000');

            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: entry.color || entry.payload?.fill, marginRight: '8px', borderRadius: '2px' }}></div>
                <span style={{ color: color, fontSize: '0.9rem' }}>
                  {entry.name}: <RupeeIcon size={12} />{formatNumber(Number(entry.value))}
                </span>
              </div>
            )
          })}
        </div>
      )
    }
    return null
  }

  if (compact) {
    return (
      <div className="loan-calculator-compact">
        <div className="emi-compact-inputs">
          {/* Amount Input */}
          <div className="emi-compact-input-group">
            <label className="emi-compact-label">{t('emi.loanAmount')}</label>
            <div className="emi-compact-input-wrap">
              <span className="emi-compact-currency"><RupeeIcon size={14} /></span>
              <input
                type="text"
                value={amount.toLocaleString('en-IN')}
                onChange={(e) => {
                  const val = e.target.value.replace(/,/g, '')
                  if (!isNaN(Number(val))) setAmount(Number(val))
                }}
                onBlur={() => {
                  if (amount < minAmount) setAmount(minAmount)
                  if (amount > maxAmount) setAmount(maxAmount)
                }}
                className="emi-compact-input"
              />
            </div>
          </div>

          {/* Interest Rate Input */}
          <div className="emi-compact-input-group">
            <label className="emi-compact-label">{t('emi.rateOfInterest')}</label>
            <div className="emi-compact-input-wrap">
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="emi-compact-input"
              />
              <span className="emi-compact-suffix">%</span>
            </div>
          </div>

        </div>

        <div className="emi-compact-results">
          <div className="emi-compact-emi-box">
            <div className="emi-compact-emi-label">Monthly EMI</div>
            <div className="emi-compact-emi-value">
              <RupeeIcon size={20} />{formatNumber(emi)}
            </div>
          </div>

          {/* Tenure Input */}
          <div className="emi-compact-input-group">
            <label className="emi-compact-label">{t('emi.loanTenure')}</label>
            <div className="emi-compact-tenure-row">
              <div className="emi-compact-input-wrap tenure">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="emi-compact-input"
                />
              </div>
              <div className="emi-compact-toggle">
                <button
                  type="button"
                  className={`emi-compact-toggle-btn ${tenureUnit === 'Yr' ? 'active' : ''}`}
                  onClick={() => {
                    if (tenureUnit === 'Mo') setTenure(Math.max(1, Math.round(tenure / 12)))
                    setTenureUnit('Yr')
                  }}
                >
                  {t('emi.yr')}
                </button>
                <button
                  type="button"
                  className={`emi-compact-toggle-btn ${tenureUnit === 'Mo' ? 'active' : ''}`}
                  onClick={() => {
                    if (tenureUnit === 'Yr') setTenure(tenure * 12)
                    setTenureUnit('Mo')
                  }}
                >
                  {t('emi.mo')}
                </button>
              </div>
            </div>
          </div>

          <div className="emi-compact-stats">
            <div className="emi-compact-stat">
              <span className="emi-compact-stat-label">Total Interest</span>
              <span className="emi-compact-stat-value interest">
                <RupeeIcon size={12} />{formatNumber(totalInterest)}
              </span>
            </div>
            <div className="emi-compact-stat">
              <span className="emi-compact-stat-label">Total Payment</span>
              <span className="emi-compact-stat-value">
                <RupeeIcon size={12} />{formatNumber(totalPayment)}
              </span>
            </div>
          </div>

          <div className="emi-compact-chart">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={55}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '11px', paddingTop: '0px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="loan-calculator-container">
      <div className="emi-calc-wrapper">
        <div className="emi-calc-grid">

          <div className="emi-inputs-section">

            {/* Amount Input */}
            <div className="emi-input-group">
              <div className="emi-input-header">
                <label className="emi-label">{t('emi.loanAmount')}</label>
                <div className="emi-input-control">
                  <span className="emi-currency-symbol"><RupeeIcon size={16} /></span>
                  <input
                    type="text"
                    value={amount.toLocaleString('en-IN')}
                    onChange={(e) => {
                      const val = e.target.value.replace(/,/g, '')
                      if (!isNaN(Number(val))) setAmount(Number(val))
                    }}
                    onBlur={() => {
                      if (amount < minAmount) setAmount(minAmount)
                      if (amount > maxAmount) setAmount(maxAmount)
                    }}
                    className="emi-input-field"
                  />
                </div>
              </div>
            </div>

            {/* Interest Rate Input */}
            <div className="emi-input-group">
              <div className="emi-input-header">
                <label className="emi-label">{t('emi.rateOfInterest')}</label>
                <div className="emi-input-control">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="emi-input-field"
                  />
                  <span className="emi-currency-symbol">%</span>
                </div>
              </div>
            </div>

            {/* Tenure Input */}
            <div className="emi-input-group">
              <div className="emi-input-header">
                <label className="emi-label">{t('emi.loanTenure')}</label>
                <div className="flex gap-4 items-center">
                  <div className="emi-input-control" style={{ maxWidth: '100px' }}>
                    <input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="emi-input-field"
                    />
                  </div>
                  <div className="tenure-toggle-group">
                    <button
                      className={`tenure-toggle-btn ${tenureUnit === 'Yr' ? 'active' : ''}`}
                      onClick={() => {
                        if (tenureUnit === 'Mo') setTenure(Math.max(1, Math.round(tenure / 12)))
                        setTenureUnit('Yr')
                      }}
                    >
                      {t('emi.yr')}
                    </button>
                    <button
                      className={`tenure-toggle-btn ${tenureUnit === 'Mo' ? 'active' : ''}`}
                      onClick={() => {
                        if (tenureUnit === 'Yr') setTenure(tenure * 12)
                        setTenureUnit('Mo')
                      }}
                    >
                      {t('emi.mo')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="emi-right-col">
            <div className="emi-results-col">
              <div className="emi-stat-item">
                <div className="emi-stat-label">{t('emi.loanEmi')}</div>
                <div className="emi-stat-value highlight"><RupeeIcon size={18} />{formatNumber(emi)}</div>
              </div>
              <div className="emi-stat-item">
                <div className="emi-stat-label">{t('emi.totalInterestPayable')}</div>
                <div className="emi-stat-value"><RupeeIcon size={18} />{formatNumber(totalInterest)}</div>
              </div>
              <div className="emi-stat-item">
                <div className="emi-stat-label">{t('emi.totalPayment')}</div>
                <div className="emi-stat-value"><RupeeIcon size={18} />{formatNumber(totalPayment)}</div>
              </div>
            </div>

            <div className="emi-chart-col">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="45%"
                    innerRadius={40}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    iconSize={10}
                    wrapperStyle={{ fontSize: '12px', paddingTop: '0px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Repayment Schedule Table */}
        <div className="emi-schedule-section">
          <h3 className="emi-section-title emi-section-title-glass">
            Check your <span className="shimmer-text">repayment schedule</span>
          </h3>
          <div className="emi-table-wrapper">
            <table className="emi-table emi-table-pro">
              <thead>
                <tr>
                  <th className="emi-th emi-th-year">Year</th>
                  <th className="emi-th">Principal (A)</th>
                  <th className="emi-th">Interest (B)</th>
                  <th className="emi-th">Total Payment (A + B)</th>
                  <th className="emi-th">Balance</th>
                  <th className="emi-th">Loan Paid To Date</th>
                  <th className="emi-th emi-th-action"></th>
                </tr>
              </thead>
              <tbody>
                {yearlyData.map((row, index) => (
                  <React.Fragment key={row.year}>
                    <tr className={index % 2 === 0 ? 'emi-tr-even' : 'emi-tr-odd'}>
                      <td className="emi-td emi-td-year">
                        <span className="emi-year-cell">{row.year}</span>
                        <button
                          type="button"
                          className="emi-expand-btn"
                          onClick={() => setExpandedYear(expandedYear === row.year ? null : row.year)}
                          aria-expanded={expandedYear === row.year}
                          aria-label={expandedYear === row.year ? 'Collapse monthly' : 'View monthly installments'}
                        >
                          {expandedYear === row.year ? '−' : '+'}
                        </button>
                      </td>
                      <td className="emi-td emi-td-num"><RupeeIcon size={12} />{formatNumber(row.principalPaid)}</td>
                      <td className="emi-td emi-td-num"><RupeeIcon size={12} />{formatNumber(row.interestPaid)}</td>
                      <td className="emi-td emi-td-num"><RupeeIcon size={12} />{formatNumber(row.totalPayment)}</td>
                      <td className="emi-td emi-td-num"><RupeeIcon size={12} />{formatNumber(row.balance)}</td>
                      <td className="emi-td emi-td-center">{row.loanPaidExecute}</td>
                      <td className="emi-td emi-td-action"></td>
                    </tr>
                    {expandedYear === row.year && row.months && (
                      <tr className="emi-tr-expanded">
                        <td colSpan={7} className="emi-td-expanded">
                          <div className="emi-monthly-table-wrap">
                            <table className="emi-monthly-table">
                              <thead>
                                <tr>
                                  <th className="emi-monthly-th-month">Month</th>
                                  <th className="emi-monthly-th-num">EMI</th>
                                  <th className="emi-monthly-th-num">Principal</th>
                                  <th className="emi-monthly-th-num">Interest</th>
                                  <th className="emi-monthly-th-num">Balance</th>
                                </tr>
                              </thead>
                              <tbody>
                                {row.months.map((mo) => (
                                  <tr key={mo.month}>
                                    <td className="emi-monthly-td-month">{mo.month}</td>
                                    <td className="emi-monthly-td-num"><RupeeIcon size={11} />{formatNumber(mo.emi)}</td>
                                    <td className="emi-monthly-td-num"><RupeeIcon size={11} />{formatNumber(mo.principal)}</td>
                                    <td className="emi-monthly-td-num"><RupeeIcon size={11} />{formatNumber(mo.interest)}</td>
                                    <td className="emi-monthly-td-num"><RupeeIcon size={11} />{formatNumber(mo.balance)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
