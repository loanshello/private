'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'
import { useLanguage } from '@/contexts/LanguageContext'
import styles from './talk-to-expert.module.css'

export default function TalkToExpertPage() {
  const { t } = useLanguage()

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <aside className={styles.contentCard}>
            <h1 className={styles.title}>
              {(() => {
                const title = t('expert.title')
                if (title.includes('Expert')) {
                  const [before, after] = title.split('Expert')
                  return <>{before}<span className="loan-title-shimmer">Expert</span>{after}</>
                }
                return title
              })()}
            </h1>
            <p className={styles.subtitle}>{t('expert.subtitle')}</p>
            <span className={styles.liveHelp}>{t('expert.liveHelp')}</span>
            <p className={styles.cta}>{t('expert.cta')}</p>
            <p className={styles.helpHeading}>{t('expert.helpHeading')}</p>
            <ul className={styles.bullets}>
              <li>{t('expert.bullet1')}</li>
              <li>{t('expert.bullet2')}</li>
              <li>{t('expert.bullet3')}</li>
            </ul>
            <div className={styles.contactRow}>
              <div className={styles.contactBlock}>
                <p className={styles.emailLabel}>{t('expert.emailLabel')}</p>
                <a href="mailto:info@zineegroup.com" className={styles.emailLink}>
                  <svg className={styles.contactIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t('expert.email')}
                </a>
              </div>
              <div className={styles.contactBlock}>
                <p className={styles.emailLabel}>{t('expert.phoneLabel')}</p>
                <a href="tel:+919654188188" className={styles.emailLink}>
                  <svg className={styles.contactIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  +91 96-54-188-188
                </a>
              </div>
            </div>
          </aside>
          <section className={styles.chatWrapper} aria-label="Chat with expert">
            <div className={styles.chatCard}>
              <div className={styles.chatCardInner}>
                <ChatBot embedded showWhatsApp={false} showChatToggle={false} showLabel={false} />
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
