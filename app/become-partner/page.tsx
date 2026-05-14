'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
// TODO: Uncomment after DLT registration is complete
// import OtpVerification from '@/components/OtpVerification'

export default function BecomePartnerPage() {
    const { t } = useLanguage()
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        city: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')
    // TODO: Uncomment after DLT registration is complete
    // const [mobileVerified, setMobileVerified] = useState(false)
    const [mobileVerified] = useState(true)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        let value = e.target.value
        if (name === 'phone') value = value.replace(/\D/g, '').slice(0, 10)
        setFormData({
            ...formData,
            [name]: value
        })
        // TODO: Uncomment after DLT registration is complete
        // if (name === 'phone') setMobileVerified(false)
        if (submitMessage) setSubmitMessage('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage('')

        try {
            const response = await fetch('/api/partner-application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                setSubmitMessage(t('partner.success'))
                // TODO: Uncomment after DLT registration is complete
                // setMobileVerified(false)
                setFormData({
                    name: '',
                    companyName: '',
                    email: '',
                    phone: '',
                    city: '',
                    message: ''
                })
            } else {
                setSubmitMessage(data.error || t('partner.error'))
            }
        } catch (error) {
            console.error('Error submitting partner form:', error)
            setSubmitMessage(t('partner.error'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="page-container">
            <Header />
            <div className="scrollable-content">
                <main className="main-body become-partner-main">
                    <aside className="sidebar left-sidebar"></aside>
                    <section className="main-content">
                        <div className="become-partner-page">
                            {/* Hero strip */}
                            <header className="partner-hero">
                                <h1 className="partner-hero-title">{t('partner.titlePrefix')}<span className="shimmer-word">{t('partner.titleHighlight')}</span>{t('partner.titleSuffix')}</h1>
                                <p className="partner-hero-tagline">{t('partner.heroTagline')}</p>
                                <p className="partner-hero-subtitle">{t('partner.subtitle')}</p>
                            </header>

                            <div className="partner-layout">
                                {/* Left: Why partner with us */}
                                <div className="partner-side-card">
                                    <h2 className="partner-side-title">{t('partner.benefitsHeading')}</h2>
                                    <ul className="partner-benefits-list partner-benefits-list-redesign">
                                        <li>
                                            <span className="partner-benefit-icon" aria-hidden>✓</span>
                                            <span>{t('partner.benefit1')}</span>
                                        </li>
                                        <li>
                                            <span className="partner-benefit-icon" aria-hidden>✓</span>
                                            <span>{t('partner.benefit2')}</span>
                                        </li>
                                        <li>
                                            <span className="partner-benefit-icon" aria-hidden>✓</span>
                                            <span>{t('partner.benefit3')}</span>
                                        </li>
                                        <li>
                                            <span className="partner-benefit-icon" aria-hidden>✓</span>
                                            <span>{t('partner.benefit4')}</span>
                                        </li>
                                        <li>
                                            <span className="partner-benefit-icon" aria-hidden>✓</span>
                                            <span>{t('partner.benefit5')}</span>
                                        </li>
                                    </ul>
                                    <div className="partner-contact-block">
                                        <span className="partner-contact-label">Email us</span>
                                        <a href="mailto:info@zineegroup.com" className="partner-contact-email-link">
                                            <svg className="partner-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            info@zineegroup.com
                                        </a>
                                    </div>
                                    <div className="partner-contact-block">
                                        <span className="partner-contact-label">Call us</span>
                                        <a href="tel:+919654188188" className="partner-contact-email-link">
                                            <svg className="partner-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            +91 96-54-188-188
                                        </a>
                                    </div>
                                    <div className="partner-social-block">
                                        <span className="partner-social-label">{t('contact.socialMedia')}</span>
                                        <div className="social-links partner-social-links">
                                            <a href="https://in.linkedin.com/company/helloans-zinee-services-pvt-ltd" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                                <Image src="/assets/social/linkedin.png" alt="" width={36} height={36} className="social-icon-img" />
                                            </a>
                                            <a href="https://www.instagram.com/helloans_zinee/?igsh=MTVmeWpiOGlkZXpseA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                                                <Image src="/assets/social/instagram.png" alt="" width={36} height={36} className="social-icon-img" />
                                            </a>
                                            <a href="https://www.facebook.com/HELLOANS.ZINEE?mibextid=wwXIfr&rdid=HaXjbDNL58yjXxXo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BCucexnhL%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                                                <Image src="/assets/social/facebook.png" alt="" width={36} height={36} className="social-icon-img" />
                                            </a>
                                            <a href="https://www.youtube.com/@HELLOANS_ZINEEGROUP" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                                                <Image src="/assets/social/youtube.png" alt="" width={36} height={36} className="social-icon-img" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Form with sections */}
                                <div className="partner-form-card">
                                    <form className="partner-form-redesign" onSubmit={handleSubmit}>
                                        <div className="partner-form-section">
                                            <h3 className="partner-form-section-title">{t('partner.sectionYourDetails')}</h3>
                                            <div className="partner-form-field">
                                                <label className="partner-form-label" htmlFor="partner-name">{t('partner.labelFullName')} <span className="partner-required">*</span></label>
                                                <input
                                                    id="partner-name"
                                                    type="text"
                                                    name="name"
                                                    className="partner-form-input"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Rajesh Kumar"
                                                    required
                                                />
                                            </div>
                                            <div className="partner-form-row">
                                                <div className="partner-form-field">
                                                    <label className="partner-form-label" htmlFor="partner-email">{t('partner.labelWorkEmail')}</label>
                                                    <input
                                                        id="partner-email"
                                                        type="email"
                                                        name="email"
                                                        className="partner-form-input"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="you@company.com"
                                                    />
                                                </div>
                                                <div className="partner-form-field">
                                                    <label className="partner-form-label" htmlFor="partner-phone">{t('partner.labelPhone')} <span className="partner-required">*</span></label>
                                                    <input
                                                        id="partner-phone"
                                                        type="tel"
                                                        name="phone"
                                                        className="partner-form-input"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="10-digit mobile"
                                                        maxLength={10}
                                                        required
                                                    />
                                                    {/* TODO: Uncomment after DLT registration is complete
                                                    <div className="partner-verification-block">
                                                        <OtpVerification
                                                            mobile={formData.phone}
                                                            onVerified={() => setMobileVerified(true)}
                                                            verified={mobileVerified}
                                                            sendButtonLabel="Send OTP"
                                                            verifyButtonLabel="Verify"
                                                        />
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="partner-form-section">
                                            <h3 className="partner-form-section-title">{t('partner.sectionBusiness')}</h3>
                                            <div className="partner-form-field">
                                                <label className="partner-form-label" htmlFor="partner-company">{t('partner.labelCompanyOrBusiness')} <span className="partner-required">*</span></label>
                                                <input
                                                    id="partner-company"
                                                    type="text"
                                                    name="companyName"
                                                    className="partner-form-input"
                                                    value={formData.companyName}
                                                    onChange={handleChange}
                                                    placeholder="Your company or business name"
                                                    required
                                                />
                                            </div>
                                            <div className="partner-form-field">
                                                <label className="partner-form-label" htmlFor="partner-city">{t('partner.labelCity')} <span className="partner-required">*</span></label>
                                                <input
                                                    id="partner-city"
                                                    type="text"
                                                    name="city"
                                                    className="partner-form-input"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    placeholder="City"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="partner-form-section">
                                            <h3 className="partner-form-section-title">{t('partner.sectionGoals')}</h3>
                                            <div className="partner-form-field">
                                                <label className="partner-form-label" htmlFor="partner-message">{t('partner.labelTellUsMore')} <span className="partner-required">*</span></label>
                                                <textarea
                                                    id="partner-message"
                                                    name="message"
                                                    className="partner-form-textarea"
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="e.g. I’d like to refer customers for personal loans and earn commission."
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {submitMessage && (
                                            <div className={`partner-submit-message ${submitMessage.includes('wrong') || submitMessage.includes('error') ? 'error' : 'success'}`}>
                                                {submitMessage}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="partner-submit-btn"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? t('partner.submitting') : t('partner.submit')}
                                        </button>
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
