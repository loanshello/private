'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
// TODO: Uncomment after DLT registration is complete
// import OtpVerification from '@/components/OtpVerification'
import QuickApplyForm from '@/components/QuickApplyForm'


const BANK_SLUGS = ['icici', 'indusind', 'yes', 'idfc', 'kotak', 'hdfc', 'axis', 'bajaj', 'adityabirla', 'tata', 'cholamandalam', 'poonawalla', 'piramal', 'pnb', 'sbi', 'canara', 'bob', 'popcard', 'federal', 'kiwi', 'tataneu', 'sbicard', 'scapia', 'magnifi', 'licaxis', 'magnet', 'unity', 'hero', 'creditvidya', 'incred', 'dmi', 'fimoney'] as const

const bankInfo: Record<string, { name: string; logo?: string; color: string; primaryColor: string }> = {
  icici: { name: 'ICICI Bank', logo: '/assets/images/partners/icici.svg', color: '#E85D04', primaryColor: '#E85D04' },
  indusind: { name: 'IndusInd Bank', logo: '/assets/images/partners/indus.png', color: '#C4122E', primaryColor: '#C4122E' },
  yes: { name: 'YES Bank', logo: '/assets/images/partners/yes.svg', color: '#132744', primaryColor: '#C4122E' },
  idfc: { name: 'IDFC FIRST Bank', logo: '/assets/images/partners/idfc.webp', color: '#E31837', primaryColor: '#E31837' },
  kotak: { name: 'Kotak Mahindra Bank', logo: '/assets/images/Kotak-1.png', color: '#00AEEF', primaryColor: '#00AEEF' },
  hdfc: { name: 'HDFC Bank', logo: '/assets/images/HDFC.svg', color: '#004C8A', primaryColor: '#E31837' },
  axis: { name: 'Axis Bank', logo: '/assets/images/AX.png', color: '#8B0040', primaryColor: '#8B0040' },
  bajaj: { name: 'Bajaj Finserv', logo: '/assets/images/partners/bajaj.png', color: '#0076b8', primaryColor: '#0076b8' },
  adityabirla: { name: 'Aditya Birla Capital', logo: '/assets/images/partners/aditya.jpg', color: '#a02030', primaryColor: '#a02030' },
  tata: { name: 'Tata Capital', logo: '/assets/images/partners/tata.png', color: '#2b8fcb', primaryColor: '#2b8fcb' },
  cholamandalam: { name: 'Cholamandalam', logo: '/assets/images/cholamandalam.png', color: '#0d47a1', primaryColor: '#0d47a1' },
  poonawalla: { name: 'Poonawalla Fincorp', logo: '/assets/images/partners/poonawalla.svg', color: '#1e88e5', primaryColor: '#1e88e5' },
  piramal: { name: 'Piramal Capital', logo: '/assets/images/Piramal_Finance_logo.svg', color: '#1565c0', primaryColor: '#1565c0' },
  pnb: { name: 'Punjab National Bank', logo: '/assets/images/PNB.png', color: '#0b3d91', primaryColor: '#d4272e' },
  sbi: { name: 'State Bank of India', logo: '/assets/images/SBI.png', color: '#22409a', primaryColor: '#22409a' },
  canara: { name: 'Canara Bank', logo: '/assets/images/CB.png', color: '#fbb034', primaryColor: '#0066b3' },
  bob: { name: 'Bank of Baroda', logo: '/assets/images/BOB.png', color: '#f26522', primaryColor: '#ed1c24' },
  popcard: { name: 'Popcard', logo: '/assets/images/partners/popcard.jpg', color: '#1a237e', primaryColor: '#1a237e' },
  federal: { name: 'Federal Bank', logo: '/assets/images/partners/federal.jpeg', color: '#003087', primaryColor: '#003087' },
  kiwi: { name: 'Kiwi', logo: '/assets/images/partners/kiwi.jpg', color: '#00c853', primaryColor: '#00c853' },
  tataneu: { name: 'Tata Neu', logo: '/assets/images/partners/tataneu.webp', color: '#5f259f', primaryColor: '#5f259f' },
  sbicard: { name: 'SBI Card', logo: '/assets/images/SBI.png', color: '#22409a', primaryColor: '#22409a' },
  scapia: { name: 'Scapia', logo: '/assets/images/partners/scapia.jpg', color: '#000000', primaryColor: '#333333' },
  magnifi: { name: 'Magnifi', logo: '/assets/images/partners/magnifi.png', color: '#6200ea', primaryColor: '#6200ea' },
  licaxis: { name: 'LIC Axis', logo: '/assets/images/licaxis-bank.jpg', color: '#7b0046', primaryColor: '#7b0046' },
  magnet: { name: 'Magnet', color: '#ff6d00', primaryColor: '#ff6d00' },
  unity: { name: 'Unity Bank', logo: '/assets/images/partners/unity.png', color: '#1a237e', primaryColor: '#1a237e' },
  hero: { name: 'Hero FinCorp', logo: '/assets/images/partners/hero.png', color: '#e53935', primaryColor: '#e53935' },
  creditvidya: { name: 'CreditVidya', logo: '/assets/images/partners/prefer.jpeg', color: '#1565c0', primaryColor: '#1565c0' },
  incred: { name: 'InCred', logo: '/assets/images/partners/incred.png', color: '#ff6f00', primaryColor: '#ff6f00' },
  dmi: { name: 'DMI Finance', logo: '/assets/images/partners/dmi.png', color: '#0d47a1', primaryColor: '#0d47a1' },
  fimoney: { name: 'Fi Money', logo: '/assets/images/partners/fi.svg', color: '#6200ea', primaryColor: '#6200ea' },
}

const QUICK_FORM_LOAN_TYPES = new Set(['instant-loan', 'used-car-loan'])

const LOAN_TYPE_LABELS: Record<string, string> = {
  'personal-loans': 'Personal Loan',
  'business-loans': 'Business Loan',
  'home-loans': 'Home Loan',
  'education-loans': 'Education Loan',
  'gold-loans': 'Gold Loan',
  'credit-cards': 'Credit Card',
  'insurance': 'Insurance',
  'overdraft': 'Overdraft',
  'overdraft-salaried': 'Salaried Overdraft',
  'overdraft-self-employed': 'Self-Employed Overdraft',
  'loan-against-property': 'Loan Against Property',
  'instant-loan': 'Used Car Loan',
  'used-car-loan': 'Used Car Loan',
  'balance-transfer': 'Balance Transfer',
  'professional-loans': 'Professional Loan',
}

function getBankThemeClass(bankId: string): string {
  const map: Record<string, string> = {
    icici: 'icici-bank-theme',
    indusind: 'indusind-bank-theme',
    yes: 'yes-bank-theme',
    idfc: 'idfc-bank-theme',
    kotak: 'kotak-bank-theme',
    hdfc: 'hdfc-bank-theme',
    axis: 'axis-bank-theme',
    bajaj: 'hdfc-bank-theme',
    adityabirla: 'hdfc-bank-theme',
    tata: 'hdfc-bank-theme',
    cholamandalam: 'hdfc-bank-theme',
    poonawalla: 'hdfc-bank-theme',
    piramal: 'hdfc-bank-theme',
    pnb: 'pnb-bank-theme',
    sbi: 'sbi-bank-theme',
    canara: 'canara-bank-theme',
    bob: 'bob-bank-theme',
    popcard: 'hdfc-bank-theme',
    federal: 'hdfc-bank-theme',
    kiwi: 'hdfc-bank-theme',
    tataneu: 'hdfc-bank-theme',
    sbicard: 'sbi-bank-theme',
    scapia: 'hdfc-bank-theme',
    magnifi: 'hdfc-bank-theme',
    licaxis: 'hdfc-bank-theme',
    magnet: 'hdfc-bank-theme',
    unity: 'hdfc-bank-theme',
    hero: 'hdfc-bank-theme',
    creditvidya: 'hdfc-bank-theme',
    incred: 'hdfc-bank-theme',
    dmi: 'hdfc-bank-theme',
    fimoney: 'hdfc-bank-theme',
  }
  return map[bankId] || 'hdfc-bank-theme'
}


export default function BankApplicationPage({ params }: { params: { bankId: string } }) {
  const searchParams = useSearchParams()
  const bankId = params.bankId
  const bank = bankInfo[bankId] || bankInfo.hdfc

  const loanTypeSlug = searchParams.get('loanType') || 'personal-loans'
  const loanLabel = LOAN_TYPE_LABELS[loanTypeSlug] || 'Personal Loan'

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
    sourceOfIncome: 'salaried',
    employerName: '',
    pincode: '',
    city: '',
    consentPersonalData: false,
    consentPersonalizedOffers: false,
    consentPerfios: false,
    panNo: '',
    panCard: null as File | null,
    aadhaarCard: null as File | null,
    payslip: null as File | null,
    bankStatement: null as File | null,
    additionalDoc: null as File | null,
    addressProof: null as File | null,
  })

  const [panPreview, setPanPreview] = useState<string | null>(null)
  const [aadhaarPreview, setAadhaarPreview] = useState<string | null>(null)
  const [filePreviews, setFilePreviews] = useState<Record<string, string | null>>({})
  const [openLegalModal, setOpenLegalModal] = useState<'privacy' | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isApplied, setIsApplied] = useState(false)
  // TODO: Uncomment after DLT registration is complete
  // const [mobileVerified, setMobileVerified] = useState(false)
  const [mobileVerified] = useState(true)

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
    formData.consentPerfios
    // TODO: Uncomment after DLT registration is complete
    // && mobileVerified
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  type DocField = 'panCard' | 'aadhaarCard' | 'payslip' | 'bankStatement' | 'additionalDoc' | 'addressProof'

  const DOC_LABELS: Record<DocField, string> = {
    panCard: 'PAN Card',
    aadhaarCard: 'Aadhaar Card',
    payslip: 'Payslip',
    bankStatement: 'Bank Statement',
    additionalDoc: 'Additional Document',
    addressProof: 'Address Proof',
  }

  const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  const PDF_TYPES = ['application/pdf']
  const ALL_DOC_TYPES = [...IMAGE_TYPES, ...PDF_TYPES]

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>, field: DocField, allowPdf = false) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = allowPdf ? ALL_DOC_TYPES : IMAGE_TYPES
    if (!validTypes.includes(file.type)) {
      const formats = allowPdf ? 'JPG, PNG, WEBP, GIF, or PDF' : 'JPG, PNG, WEBP, or GIF'
      alert(`Please upload a valid file (${formats}) for ${DOC_LABELS[field]}`)
      e.target.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      alert(`File size must be under 2 MB. Please compress or re-upload a smaller file for ${DOC_LABELS[field]}.`)
      e.target.value = ''
      return
    }

    setFormData(prev => ({ ...prev, [field]: file }))

    if (field === 'panCard' || field === 'aadhaarCard') {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (field === 'panCard') setPanPreview(reader.result as string)
        else setAadhaarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreviews(prev => ({ ...prev, [field]: reader.result as string }))
      }
      reader.readAsDataURL(file)
    } else {
      setFilePreviews(prev => ({ ...prev, [field]: null }))
    }
  }

  const removeDoc = (field: DocField) => {
    setFormData(prev => ({ ...prev, [field]: null }))
    if (field === 'panCard') setPanPreview(null)
    else if (field === 'aadhaarCard') setAadhaarPreview(null)
    else setFilePreviews(prev => ({ ...prev, [field]: null }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canProceed) return

    setIsSubmitting(true)

    try {
      const toAttachment = async (file: File | null) => {
        if (!file) return null
        return { data: await fileToBase64(file), filename: file.name, contentType: file.type }
      }

      const [panCardAtt, aadhaarCardAtt, payslipAtt, bankStatementAtt, additionalDocAtt, addressProofAtt] = await Promise.all([
        toAttachment(formData.panCard),
        toAttachment(formData.aadhaarCard),
        toAttachment(formData.payslip),
        toAttachment(formData.bankStatement),
        toAttachment(formData.additionalDoc),
        toAttachment(formData.addressProof),
      ])

      const response = await fetch('/api/bank-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bankId,
          bankName: bank.name,
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
          panCard: panCardAtt,
          aadhaarCard: aadhaarCardAtt,
          payslip: payslipAtt,
          bankStatement: bankStatementAtt,
          additionalDoc: additionalDocAtt,
          addressProof: addressProofAtt,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsApplied(true)
      } else {
        alert(data.error || 'There was an error submitting your application. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting bank application:', error)
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1] // Remove data:image/...;base64, prefix
        resolve(base64String)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Inject dynamic styles for bank colors
  useEffect(() => {
    const styleId = `bank-dynamic-styles-${bankId}`
    let styleElement = document.getElementById(styleId) as HTMLStyleElement

    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = `
      .bank-app-page-wrapper .eligibility-button:not(.disabled):hover {
        background: ${bank.primaryColor} !important;
        box-shadow: 0 4px 12px ${bank.primaryColor}40 !important;
      }
    `

    // Hide vector background on all bank apply pages
    const vectorBg = document.getElementById('vectorBackground')
    if (vectorBg) {
      vectorBg.style.display = 'none'
    }

    return () => {
      const element = document.getElementById(styleId)
      if (element) {
        element.remove()
      }
      if (vectorBg) {
        vectorBg.style.display = ''
      }
    }
  }, [bankId, bank.primaryColor])

  const themeClass = getBankThemeClass(bankId)

  if (QUICK_FORM_LOAN_TYPES.has(loanTypeSlug)) {
    return (
      <QuickApplyForm
        bankId={bankId}
        bank={bank}
        loanTypeSlug={loanTypeSlug}
        loanLabel={loanLabel}
      />
    )
  }

  return (
    <div
      className={`bank-app-page-wrapper ${themeClass}`}
      style={{
        marginTop: 0,
        position: 'relative',
        minHeight: '100vh'
      }}
    >
      {/* Bank Header Bar */}
      <div className="bank-apply-header" style={{ background: `linear-gradient(135deg, ${bank.color}, ${bank.primaryColor})` }}>
        <div className="bank-apply-header-inner">
          <div className="bank-apply-header-left">
            <Image src="/assets/images/helloans-logo.png" alt="Helloans" width={110} height={38} className="bank-hero-logo zinee-logo" />
            <span className="bank-apply-header-handshake">🤝</span>
            {bank.logo ? (
              <Image src={bank.logo} alt={bank.name} width={110} height={38} className="bank-hero-logo bank-partner-logo" />
            ) : (
              <span className="bank-hero-logo bank-partner-logo-fallback" style={{ width: 110, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.2)', borderRadius: 8, fontSize: 22, fontWeight: 700, color: '#fff' }}>{bank.name.charAt(0)}</span>
            )}
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

      {/* Success Overlay */}
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
                  <span className="detail-label">Mobile Number:</span>
                  <span className="detail-value">+91 {formData.mobileNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date of Birth:</span>
                  <span className="detail-value">{formData.day}/{formData.month}/{formData.year}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Source of Income:</span>
                  <span className="detail-value">{formData.sourceOfIncome === 'salaried' ? 'Salaried' : 'Self Employed / Professionals / Business'}</span>
                </div>
                {formData.email && (
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{formData.email}</span>
                  </div>
                )}
                {formData.employerName && (
                  <div className="detail-item">
                    <span className="detail-label">Employer:</span>
                    <span className="detail-value">{formData.employerName}</span>
                  </div>
                )}
                {formData.city && (
                  <div className="detail-item">
                    <span className="detail-label">City:</span>
                    <span className="detail-value">{formData.city}{formData.pincode ? ` - ${formData.pincode}` : ''}</span>
                  </div>
                )}
                {formData.panCard && (
                  <div className="detail-item">
                    <span className="detail-label">PAN Card:</span>
                    <span className="detail-value">Uploaded ({formData.panCard.name})</span>
                  </div>
                )}
                {formData.aadhaarCard && (
                  <div className="detail-item">
                    <span className="detail-label">Aadhaar Card:</span>
                    <span className="detail-value">Uploaded ({formData.aadhaarCard.name})</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      {!isApplied && (
        <div className={`bank-app-form-container bank-form-layout bank-form-layout-${bankId}`}>
          <div className="bank-app-form-card">
            <div className="form-card-header">
              <h2 className="form-welcome-title">Apply for {formTitleLabel}</h2>
              <p className="form-welcome-subtitle">Complete the form below to check your eligibility</p>
            </div>

            <form onSubmit={handleSubmit} className="bank-app-form">
              {/* Section: Verification */}
              <div className="form-section">
                <div className="form-section-label">
                  <span className="form-section-number">1</span>
                  <span>Verification</span>
                </div>

                <div className="form-field-group">
                  <label className="form-field-label">Mobile Number <span className="required-asterisk">*</span></label>
                  <div className="mobile-input-wrapper">
                    <span className="country-code">+91</span>
                    <input
                      type="tel"
                      name="mobileNumber"
                      className="form-input-mobile"
                      placeholder="Enter 10-digit number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      maxLength={10}
                      required
                    />
                  </div>
                  {/* TODO: Uncomment after DLT registration is complete
                  <OtpVerification
                    mobile={formData.mobileNumber}
                    onVerified={() => setMobileVerified(true)}
                    verified={mobileVerified}
                  /> */}
                </div>

                <div className="form-field-group">
                  <label className="form-field-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="e.g. name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Section: Personal Details */}
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
                  <input
                    type="text"
                    name="panNo"
                    className="form-input form-input-pan"
                    placeholder="e.g. ABCDE1234F"
                    value={formData.panNo}
                    onChange={handleChange}
                    maxLength={10}
                    style={{ textTransform: 'uppercase' }}
                    required
                  />
                  <p className="form-hint-text">Format: 5 letters, 4 digits, 1 letter</p>
                </div>

                <div className="form-field-group">
                  <label className="form-field-label">Source of Income <span className="required-asterisk">*</span></label>
                  <div className="radio-group-bank">
                    <label className={`radio-option-bank ${formData.sourceOfIncome === 'salaried' ? 'selected' : ''}`}>
                      <input type="radio" name="sourceOfIncome" value="salaried" checked={formData.sourceOfIncome === 'salaried'} onChange={handleChange} required />
                      <div className="radio-content">
                        <span className="radio-label">Salaried</span>
                        {formData.sourceOfIncome === 'salaried' && (
                          <div className="info-box-yellow">Salary proof may be required for processing</div>
                        )}
                      </div>
                    </label>
                    <label className={`radio-option-bank ${formData.sourceOfIncome === 'self-employed' ? 'selected' : ''}`}>
                      <input type="radio" name="sourceOfIncome" value="self-employed" checked={formData.sourceOfIncome === 'self-employed'} onChange={handleChange} />
                      <div className="radio-content">
                        <span className="radio-label">Self Employed / Business</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="form-field-label">Employer Name</label>
                  <input
                    type="text"
                    name="employerName"
                    className="form-input"
                    placeholder="e.g. Tata Consultancy Services"
                    value={formData.employerName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Section 3A: KYC Documents */}
              <div className="form-section">
                <div className="form-section-label">
                  <span className="form-section-number">3A</span>
                  <span>KYC Documents</span>
                </div>

                <div className="form-uploads-row">
                  <div className="form-field-group form-field-half">
                    <label className="form-field-label">PAN Card <span className="required-asterisk">*</span></label>
                    <div className="file-upload-wrapper">
                      <input type="file" id="panCard" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" onChange={(e) => handleDocUpload(e, 'panCard')} className="file-input-hidden" />
                      {panPreview ? (
                        <div className="file-preview-container">
                          <img src={panPreview} alt="PAN Card Preview" className="file-preview-image" />
                          <button type="button" onClick={() => removeDoc('panCard')} className="file-remove-button">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="panCard" className="file-upload-label">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                          <span className="file-upload-text">Upload PAN Card</span>
                          <span className="file-upload-hint">JPG, PNG, WEBP (Max 2MB)</span>
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="form-field-group form-field-half">
                    <label className="form-field-label">Aadhaar Card <span className="required-asterisk">*</span></label>
                    <div className="file-upload-wrapper">
                      <input type="file" id="aadhaarCard" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" onChange={(e) => handleDocUpload(e, 'aadhaarCard')} className="file-input-hidden" />
                      {aadhaarPreview ? (
                        <div className="file-preview-container">
                          <img src={aadhaarPreview} alt="Aadhaar Card Preview" className="file-preview-image" />
                          <button type="button" onClick={() => removeDoc('aadhaarCard')} className="file-remove-button">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="aadhaarCard" className="file-upload-label">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                          <span className="file-upload-text">Upload Aadhaar Card</span>
                          <span className="file-upload-hint">JPG, PNG, WEBP (Max 2MB)</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3B: Income Documents */}
              <div className="form-section">
                <div className="form-section-label">
                  <span className="form-section-number">3B</span>
                  <span>Income Documents</span>
                </div>

                <div className="form-uploads-row">
                  <div className="form-field-group form-field-half">
                    <label className="form-field-label">Payslip <span className="required-asterisk">*</span></label>
                    <div className="file-upload-wrapper">
                      <input type="file" id="payslip" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,application/pdf" onChange={(e) => handleDocUpload(e, 'payslip', true)} className="file-input-hidden" />
                      {formData.payslip ? (
                        <div className="file-preview-container">
                          {filePreviews.payslip ? (
                            <img src={filePreviews.payslip} alt="Payslip Preview" className="file-preview-image" />
                          ) : (
                            <div className="file-preview-pdf">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                              <span className="file-preview-name">{formData.payslip.name}</span>
                            </div>
                          )}
                          <button type="button" onClick={() => removeDoc('payslip')} className="file-remove-button">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="payslip" className="file-upload-label">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                          <span className="file-upload-text">Upload Payslip</span>
                          <span className="file-upload-hint">JPG, PNG, PDF (Max 2MB)</span>
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="form-field-group form-field-half">
                    <label className="form-field-label">Bank Statement (PDF) <span className="required-asterisk">*</span></label>
                    <div className="file-upload-wrapper">
                      <input type="file" id="bankStatement" accept="application/pdf,image/jpeg,image/jpg,image/png,image/webp" onChange={(e) => handleDocUpload(e, 'bankStatement', true)} className="file-input-hidden" />
                      {formData.bankStatement ? (
                        <div className="file-preview-container">
                          {filePreviews.bankStatement ? (
                            <img src={filePreviews.bankStatement} alt="Bank Statement Preview" className="file-preview-image" />
                          ) : (
                            <div className="file-preview-pdf">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                              <span className="file-preview-name">{formData.bankStatement.name}</span>
                            </div>
                          )}
                          <button type="button" onClick={() => removeDoc('bankStatement')} className="file-remove-button">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="bankStatement" className="file-upload-label">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                          <span className="file-upload-text">Upload Bank Statement</span>
                          <span className="file-upload-hint">PDF, JPG, PNG (Max 2MB)</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="form-field-label">Additional Documents <span className="form-optional-tag">(Optional)</span></label>
                  <p className="form-hint-text" style={{ marginTop: '-2px', marginBottom: '8px' }}>Documents such as Form 16 / 26 AS, Previous Loan Statement, Repayment Schedule can be uploaded here</p>
                  <div className="file-upload-wrapper">
                    <input type="file" id="additionalDoc" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,application/pdf" onChange={(e) => handleDocUpload(e, 'additionalDoc', true)} className="file-input-hidden" />
                    {formData.additionalDoc ? (
                      <div className="file-preview-container">
                        {filePreviews.additionalDoc ? (
                          <img src={filePreviews.additionalDoc} alt="Additional Document Preview" className="file-preview-image" />
                        ) : (
                          <div className="file-preview-pdf">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            <span className="file-preview-name">{formData.additionalDoc.name}</span>
                          </div>
                        )}
                        <button type="button" onClick={() => removeDoc('additionalDoc')} className="file-remove-button">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="additionalDoc" className="file-upload-label">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        <span className="file-upload-text">Upload Additional Document</span>
                        <span className="file-upload-hint">JPG, PNG, PDF (Max 2MB)</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Section: Current Address Proof */}
              <div className="form-section">
                <div className="form-section-label">
                  <span className="form-section-number">4</span>
                  <span>Current Address Proof</span>
                </div>

                <div className="form-uploads-row">
                  <div className="form-field-group form-field-half">
                    <label className="form-field-label">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      className="form-input"
                      placeholder="e.g. 110018"
                      value={formData.pincode}
                      onChange={handleChange}
                      maxLength={6}
                    />
                  </div>
                  <div className="form-field-group form-field-half">
                    <label className="form-field-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-input"
                      placeholder="e.g. New Delhi"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="form-field-label">Address Proof <span className="required-asterisk">*</span></label>
                  <p className="form-hint-text" style={{ marginTop: '-2px', marginBottom: '8px' }}>Upload any one: Aadhaar Card, Rent Agreement, Electricity Bill, Voter ID, or Passport</p>
                  <div className="file-upload-wrapper">
                    <input type="file" id="addressProof" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,application/pdf" onChange={(e) => handleDocUpload(e, 'addressProof', true)} className="file-input-hidden" />
                    {formData.addressProof ? (
                      <div className="file-preview-container">
                        {filePreviews.addressProof ? (
                          <img src={filePreviews.addressProof} alt="Address Proof Preview" className="file-preview-image" />
                        ) : (
                          <div className="file-preview-pdf">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            <span className="file-preview-name">{formData.addressProof.name}</span>
                          </div>
                        )}
                        <button type="button" onClick={() => removeDoc('addressProof')} className="file-remove-button">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="addressProof" className="file-upload-label">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        <span className="file-upload-text">Upload Address Proof</span>
                        <span className="file-upload-hint">JPG, PNG, PDF (Max 2MB)</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Section: Consent & Submit */}
              <div className="form-section">
                <div className="consent-group">
                  <label className="consent-checkbox-label">
                    <input type="checkbox" name="consentPersonalData" checked={formData.consentPersonalData} onChange={handleChange} required />
                    <span><span className="required-asterisk">*</span> I consent to collection and processing of my data for this loan application as described in the notice.</span>
                  </label>
                  <label className="consent-checkbox-label">
                    <input type="checkbox" name="consentPerfios" checked={formData.consentPerfios} onChange={handleChange} required />
                    <span><span className="required-asterisk">*</span> I accept the Privacy Policy of {bank.name} and agree to Perfios T&C.</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className={`eligibility-button ${!canProceed ? 'disabled' : ''}`}
                  disabled={!canProceed || isSubmitting}
                  style={canProceed ? { background: `linear-gradient(135deg, ${bank.color}, ${bank.primaryColor})`, boxShadow: `0 6px 20px ${bank.primaryColor}35` } : {}}
                >
                  {isSubmitting ? 'Submitting...' : 'Apply Now'}
                </button>

                <p className="form-footer-text">
                  By applying, you agree to our{' '}
                  <button
                    type="button"
                    className="footer-link footer-link-button"
                    style={{ color: bank.primaryColor }}
                    onClick={() => setOpenLegalModal('privacy')}
                  >
                    T&amp;C
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
        
      )}
            {openLegalModal === 'privacy' && (
        <div className="legal-modal-backdrop" onClick={() => setOpenLegalModal(null)}>
          <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
          <button
              type="button"
              className="legal-modal-close"
              onClick={() => setOpenLegalModal(null)}
            >
              ✕
            </button>
            <h2 className="legal-modal-title shimmer-text">Privacy Policy</h2>

            <div className="legal-modal-body">
              <p><strong>Privacy Policy</strong> explains how the bank collects, uses, stores and shares your personal data.</p>
              <p>The bank collects personal, financial, device and transaction information when you use its products or services.</p>
              <p>Data may come from applications, transactions, website or app usage, third parties or public sources.</p>
              <p>The data is used for account services, credit checks, fraud prevention, security, legal compliance, customer support and improving services.</p>
              <p>Your data may be shared with partners, service providers, regulators and payment networks when necessary.</p>
              <p>The bank stores data as long as required by law or business needs and uses security measures to protect it.</p>
              <p>You can review, correct or withdraw consent for your data by contacting the bank.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

