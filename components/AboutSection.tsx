'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <div id="about" className="about-page-container">
      <div className="about-header">
        <h2 className="about-title">
          <span className="highlight-box">
            <span className="highlight-shimmer">{t('about.title')}</span>
          </span>
        </h2>
        <p className="about-subtitle">{t('about.subtitle')}</p>
        <div className="about-header-buttons">
          <Link href="/gallery" className="about-header-button">
            {t('about.gallery')}
          </Link>
        </div>
      </div>

      <div className="about-main-content">
        <div className="about-intro">
          <p className="about-text">{t('about.intro1')}</p>
          <p className="about-text">{t('about.intro2')}</p>
          <p className="about-text">{t('about.intro3')}</p>
        </div>
      </div>


      <div className="about-why-choose">
        <h3 className="about-section-title">{t('about.whyChoose')}</h3>
        <p className="about-why-subtitle">{t('about.whyChooseSubtitle')}</p>
        <p className="about-why-text">{t('about.whyChooseText')}</p>
        <div className="why-choose-grid">
          <div className="why-choose-card why-choose-card--blue">
            <div className="why-choose-icon-wrapper">
              <svg className="why-choose-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="why-choose-title">{t('about.professionalService')}</h4>
            <p className="why-choose-desc">Expert loan advisors with deep market knowledge to guide you.</p>
          </div>
          <div className="why-choose-card why-choose-card--amber">
            <div className="why-choose-icon-wrapper">
              <svg className="why-choose-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="why-choose-title">{t('about.ultraFastSupport')}</h4>
            <p className="why-choose-desc">Quick turnaround from application to disbursal.</p>
          </div>
          <div className="why-choose-card why-choose-card--green">
            <div className="why-choose-icon-wrapper">
              <svg className="why-choose-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="why-choose-title">{t('about.lowInterestLoan')}</h4>
            <p className="why-choose-desc">Competitive rates negotiated from our partner banks.</p>
          </div>
          <div className="why-choose-card why-choose-card--purple">
            <div className="why-choose-icon-wrapper">
              <svg className="why-choose-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="why-choose-title">{t('about.available24x7')}</h4>
            <p className="why-choose-desc">Round-the-clock assistance whenever you need us.</p>
          </div>
        </div>
      </div>

      <div className="about-cta-section">
        <h3 className="about-cta-title">{t('about.ctaTitle')}</h3>
        <p className="about-cta-text">{t('about.ctaDescription')}</p>
        <Link href="/apply-for-loan" className="about-cta-button-large">
          {t('nav.apply')}
        </Link>
      </div>
    </div>
  )
}
