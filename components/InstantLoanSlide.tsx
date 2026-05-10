'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const IconClock = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
)

const IconWallet = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
    </svg>
)

const IconFileOff = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="15" x2="15" y2="15" />
    </svg>
)

const IconShieldOff = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="8" y1="11" x2="16" y2="11" />
    </svg>
)

const IconCheckCircle = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
)

const IconClipboard = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
)

const IconSmartphone = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
)

const IconRupee = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12M6 8h12M6 3c0 0 6 0 6 5s-6 5-6 5l8 8" />
    </svg>
)

const IconPercent = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
)

const IconRefresh = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
)

const IconBuilding = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="9" y1="6" x2="9.01" y2="6" /><line x1="15" y1="6" x2="15.01" y2="6" /><line x1="9" y1="10" x2="9.01" y2="10" /><line x1="15" y1="10" x2="15.01" y2="10" /><line x1="9" y1="14" x2="9.01" y2="14" /><line x1="15" y1="14" x2="15.01" y2="14" /><line x1="9" y1="18" x2="15" y2="18" />
    </svg>
)

const IconLock = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /><line x1="12" y1="3" x2="12" y2="3" />
    </svg>
)

const IconZap = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
)

const IconTrending = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
)

const slides = [
    {
        title: 'INSTANT',
        subtitle: 'PERSONAL',
        subtitle2: 'LOAN',
        typeLabel: 'personal',
        highlights: [
            { icon: <IconClock />, text: '', bold: '5 Minutes Fast Approval' },
            { icon: <IconWallet />, text: '', bold: '30 Minutes Amount Credit' },
            { icon: <IconFileOff />, text: '', bold: 'No Documents Required' },
            { icon: <IconShieldOff />, text: '', bold: 'No Physical Verification' },
            { icon: <IconCheckCircle />, text: '', bold: 'No Additional Charges' },
            { icon: <IconClipboard />, text: '', bold: 'Required Basic Details Only' },
            { icon: <IconSmartphone />, text: '', bold: 'Total Digital Process' },
        ],
        socialProof: '10 lakhs+ customers have availed loans!',
        href: '/apply/instant?loanType=personal-loans',
    },
    {
        title: 'INSTANT',
        subtitle: 'BUSINESS',
        subtitle2: 'LOAN',
        typeLabel: 'business',
        highlights: [
            { icon: <IconRupee />, text: 'Loan from', bold: '₹1L to ₹5 Crore' },
            { icon: <IconPercent />, text: 'Interest starting', bold: '@14.99%' },
            { icon: <IconFileOff />, text: '', bold: 'Minimal Documentation' },
            { icon: <IconClock />, text: '', bold: 'Quick Disbursal in 48 Hrs' },
            { icon: <IconRefresh />, text: 'Tenure upto', bold: '5 years' },
            { icon: <IconBuilding />, text: '', bold: 'For All Business Types' },
            { icon: <IconLock />, text: '', bold: 'Collateral Free Options' },
        ],
        socialProof: '5 lakhs+ businesses funded!',
        href: '/apply/instant?loanType=business-loans',
    },
]

export default function InstantLoanSlide() {
    const { t } = useLanguage()
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const currentSlide = slides[currentSlideIndex]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlideIndex((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="modern-carousel">
            <div key={currentSlideIndex} className="instant-loan-card" style={{ animation: 'fadeIn 0.5s ease' }}>
                <div className="instant-loan-left">
                    <div className="instant-loan-header">
                        <h2 className="modern-title">
                            {currentSlide.title}<span className="instant-loan-zap"><IconZap /></span><br />
                            <span className="modern-title-blue">{currentSlide.subtitle}</span><br />
                            <span className="modern-title-blue">{currentSlide.subtitle2}</span>
                        </h2>
                        <p className="instant-loan-tagline">
                            Get pre-approved instant {currentSlide.typeLabel} loan
                        </p>
                    </div>

                    <div className="instant-loan-actions">
                        <div className="instant-loan-social-proof">
                            <span className="instant-loan-social-emoji"><IconTrending /></span>
                            {currentSlide.socialProof}
                        </div>
                    </div>

                    <div className="instant-loan-actions">
                        <Link href={currentSlide.href} className="instant-loan-apply-btn">
                            Apply Now
                        </Link>
                    </div>

                    <div className="instant-loan-nav-row">
                        <div className="instant-loan-dots">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`instant-loan-dot ${idx === currentSlideIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentSlideIndex(idx)}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <div className="carousel-nav-container">
                            <button
                                className="carousel-nav-btn"
                                onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                                aria-label="Previous Slide"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                className="carousel-nav-btn"
                                onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % slides.length)}
                                aria-label="Next Slide"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="instant-loan-right">
                    <ul className="instant-loan-highlights">
                        {currentSlide.highlights.map((item, i) => (
                            <li key={i} className="instant-loan-highlight-item">
                                <span className="instant-loan-highlight-icon">{item.icon}</span>
                                <span className="instant-loan-highlight-text">
                                    {item.text && <>{item.text}&nbsp;</>}<strong>{item.bold}</strong>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
