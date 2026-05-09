'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const isCibilPage = pathname === '/cibil-score'

  return (
    <footer className="main-footer" id="mainFooter">
      <div className="footer-content">
        <div className="footer-wrapper">
          <div className="footer-section footer-company">
            <div className="footer-logo">
              <div className="logo-container">
                <Image
                  src="/assets/images/helloans-logo.png"
                  alt="Helloans Logo"
                  className="footer-logo-img"
                  width={50}
                  height={50}
                />
                <div className="logo-text">
                </div>
              </div>
            </div>
            <p className="company-description">
              {t('footer.description')}
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">{t('footer.quickLinks')}</h3>
            <ul className="footer-list">
              <li>
                <Link href="/">
                  <svg className="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/about-us">
                  <svg className="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/apply-for-loan">
                  <svg className="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                  {t('nav.apply')}
                </Link>
              </li>
              <li>
                <Link href="/cibil-score">
                  <svg className="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  {t('nav.cibil')}
                </Link>
              </li>
              <li>
                <Link href="/talk-to-expert">
                  <svg className="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section footer-contact-section">
            <h3 className="footer-heading">{t('footer.getInTouch')}</h3>
            <ul className="footer-list">
              <li className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a href="tel:+919654188188">+91 96-54-188-188</a>
              </li>
              <li className="contact-item">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a href="mailto:info@zineegroup.com">info@zineegroup.com</a>
              </li>
              <li className="contact-item contact-item-address">
                <a href="https://www.google.com/maps/search/Hello+Loans+B11+Shankar+Garden+Vikaspuri+110018" target="_blank" rel="noopener noreferrer" className="contact-address">
                  <span className="contact-address-line1">
                    <svg className="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    B11, F/F, Shankar Garden
                  </span>
                  <span className="contact-address-line2">Vikaspuri, Delhi 110018</span>
                  {/* <span className="contact-address-line3"></span> */}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Our Branches</h3>
            <ul className="footer-list footer-locations">
              <li><span className="location-dot" />New Delhi (Delhi)</li>
              <li><span className="location-dot" />Noida (Uttar Pradesh)</li>
              <li><span className="location-dot" />Lucknow (Uttar Pradesh)</li>
              <li><span className="location-dot" />Vapi (Gujarat)</li>
              <li><span className="location-dot" />Raebareli (Uttar Pradesh)</li>
              <li><span className="location-dot" />Agra (Uttar Pradesh)</li>
              <li><span className="location-dot" />Saran (Bihar)</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Our Franchise</h3>
            <ul className="footer-list footer-locations">
              <li><span className="location-dot" />Gurgaon (Haryana)</li>
              <li><span className="location-dot" />Goa (Goa)</li>
              <li><span className="location-dot" />Chennai (Tamil Nadu)</li>
              <li><span className="location-dot" />Hyderabad (Telangana)</li>
              <li><span className="location-dot" />Jaipur (Rajasthan)</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">{t('footer.socialMedia')}</h3>
            <ul className="footer-list social-list">
              <li className="social-item">
                <a href="https://wa.me/919654188188" target="_blank" rel="noopener noreferrer" className="social-link-whatsapp" aria-label="WhatsApp">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.239-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
                <a href="https://wa.me/919654188188" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </li>
              <li className="social-item">
                <Image
                  src="/assets/social/instagram.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="social-icon"
                />
                <a href="https://www.instagram.com/helloans_zinee/?igsh=MTVmeWpiOGlkZXpseA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram</a>
              </li>
              <li className="social-item">
                <Image
                  src="/assets/social/linkedin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="social-icon"
                />
                <a href="https://in.linkedin.com/company/helloans-zinee-services-pvt-ltd" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
              <li className="social-item">
                <Image
                  src="/assets/social/facebook.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="social-icon"
                />
                <a href="https://www.facebook.com/HELLOANS.ZINEE?mibextid=wwXIfr&rdid=HaXjbDNL58yjXxXo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BCucexnhL%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer">Facebook</a>
              </li>
              <li className="social-item">
                <Image
                  src="/assets/social/youtube.png"
                  alt="YouTube"
                  width={24}
                  height={24}
                  className="social-icon"
                />
                <a href="https://www.youtube.com/@HELLOANS_ZINEEGROUP" target="_blank" rel="noopener noreferrer">YouTube</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="copyright-wrapper">
          <p className="copyright-text">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
