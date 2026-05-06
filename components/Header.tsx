'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import StockTicker from './StockTicker'
import ChatBot from './ChatBot'
import { useLanguage, getLangLabelKey } from '@/contexts/LanguageContext'

type NavLink = {
  href: string
  labelKey: string
  highlight?: boolean
}

const NAV_LINKS: NavLink[] = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/emi-calculator', labelKey: 'nav.emi' },
  { href: '/apply-for-loan', labelKey: 'nav.apply', highlight: true },
  { href: '/cibil-score', labelKey: 'nav.cibil' },
  { href: '/become-partner', labelKey: 'nav.partner' },
]

type LoginModalType = 'employee' | 'customer' | 'partner' | null

const LOGIN_OPTIONS: { id: LoginModalType; label: string }[] = [
  { id: 'employee', label: 'Employee Login' },
  { id: 'customer', label: 'Customer Login' },
  { id: 'partner', label: 'Partner Login' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLinkLabel, setActiveLinkLabel] = useState<string | null>(null)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t, supportedLanguages } = useLanguage()

  const [loginModal, setLoginModal] = useState<LoginModalType>(null)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginClickCount, setLoginClickCount] = useState(0)
  const [showDashboardOverlay, setShowDashboardOverlay] = useState(false)

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginClickCount((c) => c + 1)
    if (loginClickCount + 1 >= 7) {
      setLoginModal(null)
      setLoginError('')
      setLoginClickCount(0)
      setShowDashboardOverlay(true)
      return
    }
    setLoginError('Wrong username or password')
  }
  const closeLoginModal = () => {
    setLoginModal(null)
    setLoginError('')
    setLoginUsername('')
    setLoginPassword('')
    setLoginClickCount(0)
  }
  const closeDashboardOverlay = () => setShowDashboardOverlay(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Set Grid Dots style permanently (Style 3)
    const vectorBackground = document.getElementById('vectorBackground')
    const mainHeader = document.getElementById('mainHeader')
    const mainFooter = document.getElementById('mainFooter')

    // Set background style
    if (vectorBackground) {
      vectorBackground.className = 'vector-background style-3'
    }

    // Set header style
    if (mainHeader) {
      mainHeader.classList.remove('header-style-1', 'header-style-2', 'header-style-4', 'header-style-5')
      mainHeader.classList.add('header-style-3')
    }

    // Set footer style
    if (mainFooter) {
      mainFooter.classList.remove('footer-style-1', 'footer-style-2', 'footer-style-4', 'footer-style-5')
      mainFooter.classList.add('footer-style-3')
    }
  }, [])

  // Reset active link label when pathname changes to a different route
  useEffect(() => {
    // Find all links that match the current pathname
    const matchingLinks = NAV_LINKS.filter(link => {
      const matches = link.href === '/'
        ? pathname === link.href
        : pathname.startsWith(link.href)
      return matches
    })

    // Find links with duplicate hrefs that match
    const hrefCounts = new Map<string, number>()
    matchingLinks.forEach(link => {
      hrefCounts.set(link.href, (hrefCounts.get(link.href) || 0) + 1)
    })

    // Only reset if we're on a route with no duplicate links
    // If there are duplicates, keep the stored label (from click) unless it's invalid
    const hasDuplicates = Array.from(hrefCounts.values()).some(count => count > 1)
    if (!hasDuplicates) {
      setActiveLinkLabel(null)
    } else {
      // Verify the stored label is still valid for the current route
      setActiveLinkLabel(prevLabel => {
        if (prevLabel) {
          const labelStillValid = matchingLinks.some(link => t(link.labelKey) === prevLabel)
          return labelStillValid ? prevLabel : null
        }
        return null
      })
    }
  }, [pathname, t])

  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.language-switcher')) {
        setIsLanguageDropdownOpen(false)
      }
      if (!target.closest('.login-dropdown')) {
        setIsLoginDropdownOpen(false)
      }
      if (!target.closest('.mobile-menu-toggle') && !target.closest('.main-nav')) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <StockTicker />
      <header
        className={`main-header ${isScrolled ? 'main-header-scrolled' : ''}`}
        id="mainHeader"
      >
        <div className="container">
          <Link href="/" className="logo logo-glass-wrap">
            <span className="logo-glass-inner">
              <Image
                src="/assets/images/Logo-Helloans.png"
                alt="Company Logo"
                width={200}
                height={68}
                priority
              />
            </span>
          </Link>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
          <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="main-nav-pill">
              {NAV_LINKS.map((item, index) => {
                const itemLabel = t(item.labelKey)
                // Check if this link matches the current pathname
                const matchesPath =
                  item.href === '/'
                    ? pathname === item.href
                    : pathname.startsWith(item.href)

                // Determine which link should be active
                let isActive = false

                if (matchesPath) {
                  // Find all links with the same href that match
                  const linksWithSameHref = NAV_LINKS.filter((link) => {
                    const linkMatches = link.href === '/'
                      ? pathname === link.href
                      : pathname.startsWith(link.href)
                    return linkMatches && link.href === item.href
                  })

                  // If we have duplicate links for this route
                  if (linksWithSameHref.length > 1) {
                    // If we have a stored active link label (from a click), use that
                    if (activeLinkLabel) {
                      isActive = itemLabel === activeLinkLabel
                    } else {
                      // Otherwise, prefer the last one (Contact us) as default
                      let lastMatchingIndex = -1
                      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
                        const link = NAV_LINKS[i]
                        const linkMatches = link.href === '/'
                          ? pathname === link.href
                          : pathname.startsWith(link.href)
                        if (linkMatches && link.href === item.href) {
                          lastMatchingIndex = i
                          break
                        }
                      }
                      isActive = lastMatchingIndex === index
                    }
                  } else {
                    // Only one link matches, so it's active
                    isActive = true
                  }
                }

                const handleClick = () => {
                  // Immediately set the active link label when clicked
                  // This ensures the correct link is highlighted when clicked
                  setActiveLinkLabel(itemLabel)
                  // Close mobile menu when a link is clicked
                  setIsMobileMenuOpen(false)
                }

                const isApplyNow = item.labelKey === 'nav.apply'
                return (
                  <Link
                    key={item.href + item.labelKey}
                    href={item.href}
                    onClick={handleClick}
                    className={[
                      'nav-link',
                      isActive ? 'nav-link-active' : '',
                      item.highlight ? 'nav-link-highlight' : '',
                      isApplyNow ? 'nav-link-apply-now' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {isApplyNow ? (
                      <span className="nav-link-apply-now-inner">
                        <span className="nav-link-apply-now-text">
                          <span className="nav-link-apply-now-line1">{t('apply.applyNowLine1')}</span>
                          <span className="nav-link-apply-now-line2">{t('apply.applyNowLine2')}</span>
                        </span>
                      </span>
                    ) : (
                      <span className="nav-link-label">{itemLabel}</span>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>
          <div className="header-actions">
            {/* Login Dropdown */}
            <div className="login-dropdown">
              <button
                className="login-dropdown-button"
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                aria-label="Login"
                aria-expanded={isLoginDropdownOpen}
              >
                <svg className="login-dropdown-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="login-dropdown-text">{t('nav.login')}</span>
                <svg
                  className={`login-dropdown-chevron ${isLoginDropdownOpen ? 'open' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {isLoginDropdownOpen && (
                <div className="login-dropdown-menu">
                  {LOGIN_OPTIONS.map(({ id, label }) => (
                    <button
                      key={id}
                      className="login-dropdown-option"
                      onClick={() => {
                        setLoginModal(id)
                        setIsLoginDropdownOpen(false)
                        setLoginError('')
                        setLoginUsername('')
                        setLoginPassword('')
                        setLoginClickCount(0)
                      }}
                    >
                      <span className="login-dropdown-option-text">{label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ChatBot */}
            <div style={{ position: 'relative' }}>
              <ChatBot showWhatsApp={false} showLabel={true} />
            </div>

            {/* Language Switcher */}
            <div className="language-switcher">
              <button
                className="language-switcher-button"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                aria-label="Select language"
                aria-expanded={isLanguageDropdownOpen}
              >
                <div className="language-switcher-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="10" height="10" rx="2" fill="#3B82F6" />
                    <text x="7" y="9" fontSize="8" fill="white" fontWeight="bold">A</text>
                    <rect x="12" y="12" width="10" height="10" rx="2" fill="#EC4899" />
                    <text x="16.5" y="19" fontSize="8" fill="white" fontWeight="bold">ए</text>
                  </svg>
                </div>
                <span className="language-switcher-text">
                  {t(getLangLabelKey(language))}
                </span>
                <svg
                  className={`language-switcher-chevron ${isLanguageDropdownOpen ? 'open' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {isLanguageDropdownOpen && (
                <div className="language-switcher-dropdown">
                  {supportedLanguages.map((lang) => (
                    <button
                      key={lang}
                      className={`language-option ${language === lang ? 'active' : ''}`}
                      onClick={() => {
                        setLanguage(lang)
                        setIsLanguageDropdownOpen(false)
                      }}
                    >
                      <span className="language-option-text">{t(getLangLabelKey(lang))}</span>
                      {language === lang && (
                        <svg className="language-option-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Login modal */}
      {loginModal && (
        <div className="partner-login-modal-overlay" onClick={closeLoginModal}>
          <div className="partner-login-modal" onClick={(e) => e.stopPropagation()}>
            <div className="partner-login-modal-header">
              <h3 className="partner-login-modal-title">
                {loginModal === 'employee' && 'Employee Login'}
                {loginModal === 'customer' && 'Customer Login'}
                {loginModal === 'partner' && 'Partner Login'}
              </h3>
              <button type="button" className="partner-login-modal-close" onClick={closeLoginModal} aria-label="Close">&times;</button>
            </div>
            <form className="partner-login-form" onSubmit={handleLoginSubmit}>
              <div className="partner-login-field">
                <label className="partner-login-label">Username</label>
                <input
                  type="text"
                  className="partner-login-input"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter username"
                  autoComplete="username"
                />
              </div>
              <div className="partner-login-field">
                <label className="partner-login-label">Password</label>
                <input
                  type="password"
                  className="partner-login-input"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
              </div>
              {loginError && <p className="partner-login-error">{loginError}</p>}
              <button type="submit" className="partner-login-submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {/* Dashboard placeholder overlay */}
      {showDashboardOverlay && (
        <div className="partner-dashboard-overlay">
          <p className="partner-dashboard-message">
            Here you will dash board – you will create using backend. If you are seeing this, it means it is not KK setting up backend.
          </p>
          <button type="button" className="partner-dashboard-close" onClick={closeDashboardOverlay}>Close</button>
        </div>
      )}
    </>
  )
}
