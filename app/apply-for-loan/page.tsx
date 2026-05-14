'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
// TODO: Uncomment after DLT registration is complete
// import OtpVerification from '@/components/OtpVerification'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const LOAN_TYPES = [
  'Personal Loan',
  'Business Loan',
  'Home Loan',
  'Gold Loan',
  'Education Loan',
  'Professional Loan',
  'Used Car Loan',
  'Credit Card',
  'Balance Transfer',
  'Overdraft',
  'Loan Against Property',
  'Insurance',
  'Used Car Loan',
] as const

const EMPLOYMENT_TYPES = [
  'Salaried',
  'Self-Employed',
  'Business Owner',
  'Professional',
  'Freelancer',
  'Retired',
  'Student',
] as const

export default function ApplyForLoanPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    panNumber: '',
    city: '',
    pincode: '',
    loanType: '',
    loanAmount: '',
    employmentType: '',
    monthlyIncome: '',
    message: '',
  })
  const [documents, setDocuments] = useState<File[]>([])
  // TODO: Uncomment after DLT registration is complete
  // const [mobileVerified, setMobileVerified] = useState(false)
  const [mobileVerified] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    let cleaned = value
    if (name === 'phone') {
      cleaned = value.replace(/\D/g, '').slice(0, 10)
      // TODO: Uncomment after DLT registration is complete
      // if (cleaned !== formData.phone) setMobileVerified(false)
    }
    if (name === 'pincode') cleaned = value.replace(/\D/g, '').slice(0, 6)
    if (name === 'panNumber') cleaned = value.toUpperCase().slice(0, 10)
    if (name === 'loanAmount' || name === 'monthlyIncome') cleaned = value.replace(/\D/g, '')

    setFormData((prev) => ({ ...prev, [name]: cleaned }))
    if (submitMessage) setSubmitMessage('')
  }

  const isFormValid =
    formData.name.trim().length >= 2 &&
    formData.phone.replace(/\D/g, '').length === 10 &&
    formData.loanType !== '' &&
    formData.loanAmount !== '' &&
    formData.employmentType !== '' &&
    formData.monthlyIncome !== '' &&
    formData.city.trim() !== '' &&
    formData.pincode.replace(/\D/g, '').length === 6

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const fd = new FormData()
      Object.entries(formData).forEach(([key, value]) => fd.append(key, value))
      documents.forEach((file) => fd.append('documents', file))

      const response = await fetch('/api/loan-application', {
        method: 'POST',
        body: fd,
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage(t('apply.successMessage'))
        setFormData({
          name: '',
          email: '',
          phone: '',
          panNumber: '',
          city: '',
          pincode: '',
          loanType: '',
          loanAmount: '',
          employmentType: '',
          monthlyIncome: '',
          message: '',
        })
        setDocuments([])
        // TODO: Uncomment after DLT registration is complete
        // setMobileVerified(false)
      } else {
        setSubmitMessage(data.error || t('apply.errorMessage'))
      }
    } catch {
      setSubmitMessage(t('apply.errorMessage'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCurrency = (val: string) => {
    if (!val) return ''
    return '₹ ' + Number(val).toLocaleString('en-IN')
  }

  return (
    <div className="page-container">
      <Header />
      <div className="scrollable-content">
        <main className="main-body apply-for-loan-main">
          <aside className="sidebar left-sidebar"></aside>
          <section className="main-content">
            <div className="contact-page-container apply-for-loan-page-container">
              <div className="contact-header">
                <h1 className="contact-title">
                  {(() => {
                    const title = t('apply.title')
                    if (title.includes('Apply')) {
                      const [before, after] = title.split('Apply')
                      return (
                        <>
                          {before}
                          <span className="loan-title-shimmer">Apply</span>
                          {after}
                        </>
                      )
                    }
                    return title
                  })()}
                </h1>
                <p className="contact-intro">{t('apply.intro')}</p>
                <div className="loan-benefits">
                  {['quickApproval', 'lowInterestRates', 'minimalDoc', 'flexibleRepayment'].map(
                    (key) => (
                      <div className="benefit-item" key={key}>
                        <svg
                          className="benefit-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{t(`apply.${key}`)}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="contact-content-grid apply-for-loan-grid">
                <div className="contact-form-wrapper apply-for-loan-form-wrapper">
                  <form className="contact-form" onSubmit={handleSubmit}>
                    {/* Personal Information */}
                    <div className="form-section-header">
                      <h3 className="form-section-title">{t('apply.personalInfo')}</h3>
                    </div>

                    {/* Name */}
                    <div className="form-group">
                      <label className="form-label">{t('apply.fullName')} *</label>
                      <div className="form-input-wrapper">
                        <svg className="form-icon" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <input
                          type="text"
                          name="name"
                          placeholder={t('apply.enterFullName')}
                          className="form-input"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <input
                            type="email"
                            name="email"
                            placeholder="your.email@example.com"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">{t('apply.phoneNumber')} *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <input
                            type="tel"
                            name="phone"
                            placeholder={t('apply.enterPhone')}
                            className="form-input"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength={10}
                            required
                          />
                        </div>
                        {/* TODO: Uncomment after DLT registration is complete
                        <OtpVerification
                          mobile={formData.phone}
                          onVerified={() => setMobileVerified(true)}
                          verified={mobileVerified}
                          className="loan-otp-block"
                        /> */}
                      </div>
                    </div>

                    {/* PAN Number */}
                    <div className="form-group">
                      <label className="form-label">PAN Number</label>
                      <div className="form-input-wrapper">
                        <svg className="form-icon" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <input
                          type="text"
                          name="panNumber"
                          placeholder="e.g. ABCDE1234F"
                          className="form-input"
                          value={formData.panNumber}
                          onChange={handleChange}
                          maxLength={10}
                        />
                      </div>
                    </div>

                    {/* Loan Details */}
                    <div className="form-section-header">
                      <h3 className="form-section-title">Loan Details</h3>
                    </div>

                    {/* Loan Type & Employment */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Loan Type *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21H5M19 21H21M5 21H3M9 7H10M9 11H10M14 7H15M14 11H15M9 15H15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <select
                            name="loanType"
                            className="form-input form-select"
                            value={formData.loanType}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select loan type</option>
                            {LOAN_TYPES.map((lt) => (
                              <option key={lt} value={lt}>{lt}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Employment Type *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <select
                            name="employmentType"
                            className="form-input form-select"
                            value={formData.employmentType}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select employment type</option>
                            {EMPLOYMENT_TYPES.map((et) => (
                              <option key={et} value={et}>{et}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Loan Amount & Monthly Income */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Loan Amount Required *</label>
                        <div className="form-input-wrapper">
                          <span className="form-icon form-icon-text">₹</span>
                          <input
                            type="text"
                            name="loanAmount"
                            placeholder="e.g. 500000"
                            className="form-input"
                            value={formData.loanAmount}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        {formData.loanAmount && (
                          <span className="form-hint">{formatCurrency(formData.loanAmount)}</span>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Monthly Income *</label>
                        <div className="form-input-wrapper">
                          <span className="form-icon form-icon-text">₹</span>
                          <input
                            type="text"
                            name="monthlyIncome"
                            placeholder="e.g. 50000"
                            className="form-input"
                            value={formData.monthlyIncome}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        {formData.monthlyIncome && (
                          <span className="form-hint">{formatCurrency(formData.monthlyIncome)}</span>
                        )}
                      </div>
                    </div>

                    {/* City & Pincode */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">{t('apply.city')} *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <input
                            type="text"
                            name="city"
                            placeholder={t('apply.enterCity')}
                            className="form-input"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">{t('apply.pincode')} *</label>
                        <div className="form-input-wrapper">
                          <svg className="form-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <input
                            type="text"
                            name="pincode"
                            placeholder={t('apply.pincodePlaceholder')}
                            className="form-input"
                            value={formData.pincode}
                            onChange={handleChange}
                            maxLength={6}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Document Upload */}
                    <div className="form-section-header">
                      <h3 className="form-section-title">Upload Documents</h3>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Attach Documents (PAN Card, Aadhaar, Salary Slips, etc.)</label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        multiple
                        className="form-input form-file-input"
                        onChange={(e) => {
                          if (e.target.files) {
                            setDocuments(Array.from(e.target.files))
                          }
                        }}
                      />
                      {documents.length > 0 && (
                        <span className="form-hint">{documents.length} file(s) selected</span>
                      )}
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <label className="form-label">{t('apply.tellUsAbout')}</label>
                      <textarea
                        name="message"
                        placeholder={t('apply.messagePlaceholder')}
                        className="form-textarea"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    {submitMessage && (
                      <div
                        className={`submit-message ${
                          submitMessage.includes('error') || submitMessage.includes('Error')
                            ? 'error'
                            : 'success'
                        }`}
                      >
                        {submitMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="form-submit-button"
                      disabled={isSubmitting || !isFormValid}
                    >
                      {isSubmitting ? t('apply.submitting') : t('apply.applyNow')}
                    </button>

                    {/* TODO: Uncomment after DLT registration is complete
                    {!mobileVerified && formData.phone.replace(/\D/g, '').length === 10 && (
                      <p className="form-otp-reminder">Please verify your phone number above to enable submission</p>
                    )} */}
                  </form>
                </div>
              </div>
            </div>
          </section>
          <aside className="sidebar right-sidebar"></aside>
        </main>
        <Footer />
      </div>
    </div>
  )
}
