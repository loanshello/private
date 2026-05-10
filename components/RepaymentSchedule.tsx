'use client'

import React, { useState } from 'react'
import RupeeIcon from '@/components/RupeeIcon'

const formatNumber = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount)
}

interface YearlyRow {
  year: number
  principalPaid: number
  interestPaid: number
  totalPayment: number
  balance: number
  loanPaidExecute: string
  months: Array<{ month: number; emi: number; principal: number; interest: number; balance: number }>
}

interface RepaymentScheduleProps {
  yearlyData: YearlyRow[]
}

export default function RepaymentSchedule({ yearlyData }: RepaymentScheduleProps) {
  const [expandedYear, setExpandedYear] = useState<number | null>(null)

  if (!yearlyData || yearlyData.length === 0) return null

  return (
    <div className="emi-schedule-section-standalone">
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
  )
}
