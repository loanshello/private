'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import OtpVerification from '@/components/OtpVerification'

interface BankInfo {
  name: string
  logo?: string
  color: string
  primaryColor: string
}

interface QuickApplyFormProps {
  bankId: string
  bank: BankInfo
  loanTypeSlug: string
  loanLabel: string
}

export default function QuickApplyForm({ bankId, bank, loanTypeSlug, loanLabel }: QuickApplyFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    panNo: '',
    dob: '',
    mobileNumber: '',
    email: '',
    city: '',
    pincode: '',
  })

  const [mobileVerified, setMobileVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isApplied, setIsApplied] = useState(false)

  useEffect(() => {
    const vectorBg = document.getElementById('vectorBackground')
    if (vectorBg) vectorBg.style.display = 'none'
    return () => { if (vectorBg) vectorBg.style.display = '' }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const canSubmit = !!(
    formData.fullName.trim() &&
    formData.panNo.length === 10 &&
    formData.dob &&
    formData.mobileNumber.length === 10 &&
    formData.city.trim() &&
    formData.pincode.length >= 5 &&
    mobileVerified
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setIsSubmitting(true)

    const dobParts = formData.dob.split('-')
    try {
      const response = await fetch('/api/bank-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bankId,
          bankName: bank.name,
          loanType: loanTypeSlug,
          loanLabel,
          fullName: formData.fullName,
          panNo: formData.panNo,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          year: dobParts[0] || '',
          month: dobParts[1] || '',
          day: dobParts[2] || '',
          city: formData.city,
          pincode: formData.pincode,
          sourceOfIncome: '',
          employerName: '',
          consentPersonalData: true,
          consentPerfios: true,
          consentPersonalizedOffers: false,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        setIsApplied(true)
      } else {
        alert(data.error || 'There was an error submitting your application. Please try again.')
      }
    } catch {
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="quick-apply-wrapper" style={{ marginTop: 0, position: 'relative', minHeight: '100vh' }}>
      {/* Header bar */}
      <div className="quick-apply-header" style={{ background: `linear-gradient(135deg, ${bank.color}, ${bank.primaryColor})` }}>
        <div className="quick-apply-header-inner">
          <Image src="/assets/images/helloans-logo.png" alt="Helloans" width={100} height={34} className="bank-hero-logo zinee-logo" />
          <span className="quick-apply-handshake">🤝</span>
          {bank.logo ? (
            <Image src={bank.logo} alt={bank.name} width={100} height={34} className="bank-hero-logo bank-partner-logo" />
          ) : (
            <span className="quick-apply-logo-fallback">{bank.name.charAt(0)}</span>
          )}
        </div>
      </div>

      {/* Success state */}
      {isApplied && (
        <div className="quick-apply-success">
          <div className="quick-apply-success-icon">&#10003;</div>
          <h2>Application Submitted!</h2>
          <p>Our team will reach out to you shortly on <strong>+91 {formData.mobileNumber}</strong></p>
          <div className="quick-apply-success-details">
            <div><span>Name:</span> <strong>{formData.fullName}</strong></div>
            <div><span>City:</span> <strong>{formData.city} - {formData.pincode}</strong></div>
            {formData.email && <div><span>Email:</span> <strong>{formData.email}</strong></div>}
          </div>
        </div>
      )}

      {/* Form */}
      {!isApplied && (
        <div className="quick-apply-card">
          <h2 className="quick-apply-title">Apply for {loanLabel}</h2>
          <p className="quick-apply-subtitle">Fill in your basic details to get started</p>

          <form onSubmit={handleSubmit} className="quick-apply-form">
            <div className="qf-field qf-full">
              <label className="qf-label">Enter name as per Pan Card <span className="required-asterisk">*</span></label>
              <input
                type="text"
                name="fullName"
                className="qf-input"
                placeholder="e.g. Rahul Kumar"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="qf-row">
              <div className="qf-field">
                <label className="qf-label">PAN Number <span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="panNo"
                  className="qf-input"
                  placeholder="ABCDE1234F"
                  value={formData.panNo}
                  onChange={handleChange}
                  maxLength={10}
                  style={{ textTransform: 'uppercase' }}
                  required
                />
              </div>
              <div className="qf-field">
                <label className="qf-label">Date of Birth <span className="required-asterisk">*</span></label>
                <input
                  type="date"
                  name="dob"
                  className="qf-input"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="qf-row">
              <div className="qf-field">
                <label className="qf-label">Mobile Number <span className="required-asterisk">*</span></label>
                <input
                  type="tel"
                  name="mobileNumber"
                  className="qf-input"
                  placeholder="9876543210"
                  value={formData.mobileNumber}
                  onChange={(e) => {
                    handleChange(e)
                    setMobileVerified(false)
                  }}
                  maxLength={10}
                  required
                />
              </div>
              <div className="qf-field">
                <label className="qf-label">Email ID</label>
                <input
                  type="email"
                  name="email"
                  className="qf-input"
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="qf-otp-row">
              <OtpVerification
                mobile={formData.mobileNumber}
                onVerified={() => setMobileVerified(true)}
                verified={mobileVerified}
                className="qf-otp"
              />
            </div>

            <div className="qf-row">
              <div className="qf-field">
                <label className="qf-label">City <span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="city"
                  className="qf-input"
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="qf-field">
                <label className="qf-label">Pincode <span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="pincode"
                  className="qf-input"
                  placeholder="400001"
                  value={formData.pincode}
                  onChange={handleChange}
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="qf-submit"
              disabled={!canSubmit || isSubmitting}
              style={canSubmit ? { background: `linear-gradient(135deg, ${bank.color}, ${bank.primaryColor})` } : {}}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Now'}
              {!isSubmitting && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
