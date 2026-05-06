'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import OtpVerification from '@/components/OtpVerification'

const LOAN_TYPE_LABELS: Record<string, string> = {
  'personal-loans': 'Personal Loan',
  'business-loans': 'Business Loan',
}

const BRAND_COLOR = '#1d4ed8'
const BRAND_GRADIENT = `linear-gradient(135deg, #1d4ed8, #2563eb)`

export default function InstantApplyPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <InstantApplyContent />
    </Suspense>
  )
}

function InstantApplyContent() {
  const searchParams = useSearchParams()

  const loanTypeSlug = searchParams.get('loanType') || 'personal-loans'
  const loanLabel = LOAN_TYPE_LABELS[loanTypeSlug] || 'Personal Loan'
  const defaultSourceOfIncome = loanTypeSlug === 'business-loans' ? 'self-employed' : 'salaried'

  const [formTitleLabel, setFormTitleLabel] = useState(loanLabel)
  useEffect(() => {
    const slug = searchParams.get('loanType') || 'personal-loans'
    setFormTitleLabel(LOAN_TYPE_LABELS[slug] || 'Personal Loan')
  }, [searchParams])

  const [formData, setFormData] = useState({
    mobileNumber: '',
    email: '',
    day: '',
    month: '',
    year: '',
    sourceOfIncome: defaultSourceOfIncome,
    employerName: '',
    pincode: '',
    city: '',
    consentPersonalData: false,
    consentPersonalizedOffers: false,
    consentPerfios: false,
    panNo: '',
  })

  const [openLegalModal, setOpenLegalModal] = useState<'privacy' | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isApplied, setIsApplied] = useState(false)
  const [mobileVerified, setMobileVerified] = useState(false)

  const dobError = (() => {
    const { day, month, year } = formData
    if (!day || !month || !year) return ''
    const d = parseInt(day, 10)
    const m = parseInt(month, 10)
    const y = parseInt(year, 10)
    if (isNaN(d) || isNaN(m) || isNaN(y)) return ''
    if (d < 1 || d > 31) return 'Invalid day'
    if (m < 1 || m > 12) return 'Invalid month'
    if (year.length < 4) return ''
    if (y < 1900 || y > new Date().getFullYear()) return 'Invalid year'
    const dob = new Date(y, m - 1, d)
    if (dob.getDate() !== d || dob.getMonth() !== m - 1) return 'Invalid date'
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const monthDiff = today.getMonth() - dob.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--
    if (age < 18) return 'You must be at least 18 years old to apply'
    return ''
  })()

  const isDobValid = !!(
    formData.day && formData.month && formData.year &&
    formData.year.length === 4 && !dobError
  )

  const canProceed = !!(
    formData.mobileNumber.length === 10 &&
    isDobValid &&
    formData.consentPersonalData &&
    formData.consentPerfios &&
    mobileVerified
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canProceed) return
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/bank-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bankId: 'direct',
          bankName: 'Helloans Direct',
          loanType: loanTypeSlug,
          loanLabel,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          panNo: formData.panNo,
          day: formData.day,
          month: formData.month,
          year: formData.year,
          sourceOfIncome: formData.sourceOfIncome,
          employerName: formData.employerName,
          pincode: formData.pincode,
          city: formData.city,
          loanAmount: searchParams.get('amount') || '',
          tenure: searchParams.get('tenure') || '',
          tenureUnit: searchParams.get('tenureUnit') || 'Yr',
          consentPersonalData: formData.consentPersonalData,
          consentPersonalizedOffers: formData.consentPersonalizedOffers,
          consentPerfios: formData.consentPerfios,
        }),
      })
      const data = await response.json()
      if (response.ok) setIsApplied(true)
      else alert(data.error || 'There was an error submitting your application. Please try again.')
    } catch {
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const vectorBg = document.getElementById('vectorBackground')
    if (vectorBg) vectorBg.style.display = 'none'
    return () => { if (vectorBg) vectorBg.style.display = '' }
  }, [])

  return (
    <div className="bank-app-page-wrapper hdfc-bank-theme" style={{ marginTop: 0, position: 'relative', minHeight: '100vh' }}>
      {/* Header */}
      <div className="bank-apply-header" style={{ background: BRAND_GRADIENT }}>
        <div className="bank-apply-header-inner">
          <div className="bank-apply-header-left">
            <Image src="/assets/images/Logo-Helloans.png" alt="Helloans" width={130} height={44} className="bank-hero-logo zinee-logo" />
          </div>
          <div className="bank-apply-header-right">
            <div className="bank-apply-header-features">
              <div className="bank-apply-feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Quick Approval</span>
              </div>
              <div className="bank-apply-feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                <span>Minimal Docs</span>
              </div>
              <div className="bank-apply-feature">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success */}
      {isApplied && (
        <div className="application-success-overlay">
          <div className="success-content-overlay">
            <div className="success-message-box">
              <div className="success-icon-large">&#10003;</div>
              <h2 className="success-title">Application Submitted</h2>
              <p className="success-message">Our team will reach out to you shortly</p>
            </div>
            <div className="application-details-overlay">
              <h3 className="details-title">Application Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Loan Type:</span>
                  <span className="detail-value">{formTitleLabel}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Mobile Number:</span>
                  <span className="detail-value">+91 {formData.mobileNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date of Birth:</span>
                  <span className="detail-value">{formData.day}/{formData.month}/{formData.year}</span>
                </div>
                {formData.email && (
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{formData.email}</span>
                  </div>
                )}
                {formData.city && (
                  <div className="detail-item">
                    <span className="detail-label">City:</span>
                    <span className="detail-value">{formData.city}{formData.pincode ? ` - ${formData.pincode}` : ''}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {!isApplied && (
        <div className="bank-app-form-container bank-form-layout">
          <div className="bank-app-form-card">
            <div className="form-card-header">
              <h2 className="form-welcome-title">Apply for {formTitleLabel}</h2>
              <p className="form-welcome-subtitle">Complete the form below to check your eligibility</p>
            </div>

            <form onSubmit={handleSubmit} className="bank-app-form">
              {/* 1: Verification */}
              <div className="form-section">
                <div className="form-section-label">
                  <span className="form-section-number">1</span>
                  <span>Verification</span>
                </div>
                <div className="form-field-group">
                  <label className="form-field-label">Mobile Number <span className="required-asterisk">*</span></label>
                  <div className="mobile-input-wrapper">
                    <span className="country-code">+91</span>
                    <input type="tel" name="mobileNumber" className="form-input-mobile" placeholder="Enter 10-digit number" value={formData.mobileNumber} onChange={(e) => { handleChange(e); setMobileVerified(false) }} maxLength={10} required />
                  </div>
                  <OtpVerification mobile={formData.mobileNumber} onVerified={() => setMobileVerified(true)} verified={mobileVerified} />
                </div>
                <div className="form-field-group">
                  <label className="form-field-label">Email</label>
                  <input type="email" name="email" className="form-input" placeholder="e.g. name@example.com" value={formData.email} onChange={handleChange} />
                </div>
              </div>

              {/* 2: Personal Details */}
              <div className="form-section">
                <div className="form-section-label">
                  <span className="form-section-number">2</span>
                  <span>Personal Details</span>
                </div>
                <div className="form-field-group">
                  <label className="form-field-label">Date of Birth <span className="required-asterisk">*</span></label>
                  <div className="dob-inputs">
                    <input type="text" name="day" className={`dob-input ${dobError ? 'dob-input-error' : ''}`} placeholder="DD" value={formData.day} onChange={handleChange} maxLength={2} required />
                    <input type="text" name="month" className={`dob-input ${dobError ? 'dob-input-error' : ''}`} placeholder="MM" value={formData.month} onChange={handleChange} maxLength={2} required />
                    <input type="text" name="year" className={`dob-input ${dobError ? 'dob-input-error' : ''}`} placeholder="YYYY" value={formData.year} onChange={handleChange} maxLength={4} required />
                  </div>
                  {dobError && <p className="form-error-text">{dobError}</p>}
                </div>
                <div className="form-field-group">
                  <label className="form-field-label">PAN Number <span className="required-asterisk">*</span></label>
                  <input type="text" name="panNo" className="form-input form-input-pan" placeholder="e.g. ABCDE1234F" value={formData.panNo} onChange={handleChange} maxLength={10} style={{ textTransform: 'uppercase' }} required />
                  <p className="form-hint-text">Format: 5 letters, 4 digits, 1 letter</p>
                </div>
                <div className="form-field-group">
                  <label className="form-field-label">Source of Income</label>
                  <div className="radio-group-bank">
                    <label className="radio-option-bank selected" style={{ cursor: 'default', pointerEvents: 'none' }}>
                      <input type="radio" name="sourceOfIncome" value={defaultSourceOfIncome} checked readOnly />
                      <div className="radio-content">
                        <span className="radio-label">{defaultSourceOfIncome === 'salaried' ? 'Salaried' : 'Business'}</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="form-field-group">
                  <label className="form-field-label">Buisness Name</label>
                  <input type="text" name="employerName" className="form-input" placeholder="e.g. Tata Consultancy Services" value={formData.employerName} onChange={handleChange} />
                </div>
              </div>

              {/* 3: Address */}
              <div className="form-section">
                <div className="form-section-label">
                  <span className="form-section-number">3</span>
                  <span>Current Address</span>
                </div>
                <div className="form-uploads-row">
                  <div className="form-field-half">
                    <div className="form-field-group">
                      <label className="form-field-label">Pincode</label>
                      <input type="text" name="pincode" className="form-input" placeholder="e.g. 110018" value={formData.pincode} onChange={handleChange} maxLength={6} />
                    </div>
                  </div>
                  <div className="form-field-half">
                    <div className="form-field-group">
                      <label className="form-field-label">City</label>
                      <input type="text" name="city" className="form-input" placeholder="e.g. New Delhi" value={formData.city} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Consent & Submit */}
              <div className="form-section">
                <div className="consent-group">
                  <label className="consent-checkbox-label">
                    <input type="checkbox" name="consentPersonalData" checked={formData.consentPersonalData} onChange={handleChange} required />
                    <span><span className="required-asterisk">*</span> I consent to collection and processing of my data for this loan application.</span>
                  </label>
                  <label className="consent-checkbox-label">
                    <input type="checkbox" name="consentPerfios" checked={formData.consentPerfios} onChange={handleChange} required />
                    <span><span className="required-asterisk">*</span> I accept the Privacy Policy and agree to the Terms &amp; Conditions.</span>
                  </label>
                </div>
                <button
                  type="submit"
                  className={`eligibility-button ${!canProceed ? 'disabled' : ''}`}
                  disabled={!canProceed || isSubmitting}
                  style={canProceed ? { background: BRAND_GRADIENT, boxShadow: `0 6px 20px ${BRAND_COLOR}35` } : {}}
                >
                  {isSubmitting ? 'Submitting...' : 'Apply Now'}
                </button>
                <p className="form-footer-text">
                  By applying, you agree to our{' '}
                  <button type="button" className="footer-link footer-link-button" style={{ color: BRAND_COLOR }} onClick={() => setOpenLegalModal('privacy')}>T&amp;C</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {openLegalModal === 'privacy' && (
        <div className="legal-modal-backdrop" onClick={() => setOpenLegalModal(null)}>
          <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="legal-modal-close" onClick={() => setOpenLegalModal(null)}>✕</button>
            <h2 className="legal-modal-title shimmer-text">Privacy Policy</h2>
            <div className="legal-modal-body">
              <p><strong>Privacy Policy</strong> explains how we collect, use, store and share your personal data.</p>
              <p>We collect personal, financial, device and transaction information when you use our products or services.</p>
              <p>Data is used for application processing, credit checks, fraud prevention, security, legal compliance, and improving services.</p>
              <p>Your data may be shared with lending partners, service providers, and regulators when necessary.</p>
              <p>We store data as long as required by law or business needs and use security measures to protect it.</p>
              <p>You can review, correct or withdraw consent for your data by contacting us.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
