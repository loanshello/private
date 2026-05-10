'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  sender: 'bot' | 'user'
  options?: Option[]
  timestamp: Date
}

interface Option {
  id: string
  text: string
  nextFlow?: FlowState
}

type FlowState =
  | 'initial'
  | 'personal-loans'
  | 'business-loans'
  | 'home-loans'
  | 'other-loans'
  | 'personal-loans-types'
  | 'personal-loans-eligibility'
  | 'personal-loans-documents'
  | 'personal-loans-interest'
  | 'business-loans-types'
  | 'business-loans-eligibility'
  | 'business-loans-documents'
  | 'business-loans-interest'
  | 'home-loans-types'
  | 'home-loans-eligibility'
  | 'home-loans-documents'
  | 'home-loans-interest'
  | 'other-loans-types'
  | 'contact-form-name'
  | 'contact-form-number'
  | 'contact-complete'

interface ChatBotLegacyProps {
  showWhatsApp?: boolean
  showChatToggle?: boolean
  showLabel?: boolean
  embedded?: boolean
  onClose?: () => void
}

function ChatBotLegacy({
  showWhatsApp = true,
  showChatToggle = true,
  showLabel = true,
  embedded = false,
  onClose,
}: ChatBotLegacyProps) {
  const [isOpen, setIsOpen] = useState(embedded)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentFlow, setCurrentFlow] = useState<FlowState>('initial')
  const [contactData, setContactData] = useState({ name: '', number: '' })
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (embedded) {
      initializeChat()
    }
  }, [embedded])

  useEffect(() => {
    if (!embedded && isOpen && messages.length === 0) {
      initializeChat()
    }
  }, [isOpen, embedded])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (currentFlow === 'contact-form-name' || currentFlow === 'contact-form-number') {
      inputRef.current?.focus()
    }
  }, [currentFlow])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const initializeChat = () => {
    const welcomeMessage: Message = {
      id: '1',
      text: 'Hello! 👋 Welcome to our loan assistance chatbot. How can I help you today?',
      sender: 'bot',
      options: [
        { id: 'opt1', text: 'Personal Loans', nextFlow: 'personal-loans' },
        { id: 'opt2', text: 'Business Loans', nextFlow: 'business-loans' },
        { id: 'opt3', text: 'Home Loans', nextFlow: 'home-loans' },
        { id: 'opt4', text: 'Other Loan Types', nextFlow: 'other-loans' },
      ],
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
    setCurrentFlow('initial')
  }

  const handleOptionClick = (option: Option) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: option.text,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Handle flow transition
    if (option.nextFlow) {
      handleFlowTransition(option.nextFlow)
    }
  }

  const handleFlowTransition = (nextFlow: FlowState) => {
    setCurrentFlow(nextFlow)

    let botMessage: Message | null = null

    switch (nextFlow) {
      case 'personal-loans':
        botMessage = {
          id: Date.now().toString(),
          text: 'Great! I can help you with Personal Loans. What would you like to know?',
          sender: 'bot',
          options: [
            { id: 'p1', text: 'Types of Personal Loans', nextFlow: 'personal-loans-types' },
            { id: 'p2', text: 'Eligibility Criteria', nextFlow: 'personal-loans-eligibility' },
            { id: 'p3', text: 'Required Documents', nextFlow: 'personal-loans-documents' },
            { id: 'p4', text: 'Interest Rates', nextFlow: 'personal-loans-interest' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'business-loans':
        botMessage = {
          id: Date.now().toString(),
          text: 'Excellent choice! Let me help you with Business Loans. What information do you need?',
          sender: 'bot',
          options: [
            { id: 'b1', text: 'Types of Business Loans', nextFlow: 'business-loans-types' },
            { id: 'b2', text: 'Eligibility Criteria', nextFlow: 'business-loans-eligibility' },
            { id: 'b3', text: 'Required Documents', nextFlow: 'business-loans-documents' },
            { id: 'b4', text: 'Interest Rates', nextFlow: 'business-loans-interest' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'home-loans':
        botMessage = {
          id: Date.now().toString(),
          text: 'Perfect! I\'m here to assist you with Home Loans. What would you like to know?',
          sender: 'bot',
          options: [
            { id: 'h1', text: 'Types of Home Loans', nextFlow: 'home-loans-types' },
            { id: 'h2', text: 'Eligibility Criteria', nextFlow: 'home-loans-eligibility' },
            { id: 'h3', text: 'Required Documents', nextFlow: 'home-loans-documents' },
            { id: 'h4', text: 'Interest Rates', nextFlow: 'home-loans-interest' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'other-loans':
        botMessage = {
          id: Date.now().toString(),
          text: 'Sure! I can help you with other loan types. What are you looking for?',
          sender: 'bot',
          options: [
            { id: 'o1', text: 'Loan Types Available', nextFlow: 'other-loans-types' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'personal-loans-types':
        botMessage = {
          id: Date.now().toString(),
          text: 'Here are the main types of Personal Loans:\n\n• Unsecured Personal Loans - No collateral required, based on credit score\n• Secured Personal Loans - Require collateral (CD, savings account)\n• Debt Consolidation Loans - Combine multiple debts into one\n• Personal Lines of Credit - Flexible credit access\n\nAll personal loans are installment loans with fixed monthly payments.',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Personal Loans', nextFlow: 'personal-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'personal-loans-eligibility':
        botMessage = {
          id: Date.now().toString(),
          text: 'Personal Loan Eligibility Criteria:\n\n• Age: 21-65 years\n• Minimum income: ₹15,000-₹25,000 per month (varies by bank)\n• Credit score: 650+ (preferred)\n• Employment: Salaried or self-employed\n• Work experience: Minimum 1-2 years\n• Debt-to-income ratio: Below 40%\n\nNote: Criteria may vary by lender.',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Personal Loans', nextFlow: 'personal-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'personal-loans-documents':
        botMessage = {
          id: Date.now().toString(),
          text: 'Required Documents for Personal Loans:\n\n• Identity Proof: Aadhaar, PAN, Passport, or Driving License\n• Address Proof: Aadhaar, Utility bills, Rental agreement\n• Income Proof: Salary slips (last 3 months), Bank statements (6 months)\n• Employment Proof: Employment certificate, Appointment letter\n• Photographs: 2 passport-size photos\n• Application Form: Duly filled and signed\n\nFor self-employed: ITR, Business registration, GST certificate',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Personal Loans', nextFlow: 'personal-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'personal-loans-interest':
        botMessage = {
          id: Date.now().toString(),
          text: 'Personal Loan Interest Rates:\n\n• Range: Typically 10.5% to 24% per annum\n• Factors affecting rate:\n  - Credit score (higher score = lower rate)\n  - Income level\n  - Employment stability\n  - Loan amount and tenure\n  - Relationship with bank\n\n• Processing fee: 0.5% to 6% of loan amount\n• Prepayment charges: Usually 2-4% of outstanding amount\n\nRates vary by lender and applicant profile.',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Personal Loans', nextFlow: 'personal-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'business-loans-types':
        botMessage = {
          id: Date.now().toString(),
          text: 'Types of Business Loans:\n\n• Term Loans - Fixed amount for specific period\n• Working Capital Loans - For daily operations\n• Equipment Financing - To purchase machinery/equipment\n• Invoice Financing - Against unpaid invoices\n• Business Line of Credit - Flexible credit access\n• SBA Loans - Government-backed loans\n• Commercial Real Estate Loans - For property purchase\n• Merchant Cash Advances - Based on future sales',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Business Loans', nextFlow: 'business-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'business-loans-eligibility':
        botMessage = {
          id: Date.now().toString(),
          text: 'Business Loan Eligibility Criteria:\n\n• Business age: Minimum 1-3 years (varies)\n• Annual turnover: ₹10 lakhs to ₹1 crore+\n• Credit score: 650+ for business owner\n• Business registration: Valid GST, PAN, Business license\n• Profitability: Positive cash flow\n• Collateral: May be required for larger amounts\n• Business plan: Required for new businesses\n\nNote: Requirements vary by loan type and lender.',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Business Loans', nextFlow: 'business-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'business-loans-documents':
        botMessage = {
          id: Date.now().toString(),
          text: 'Required Documents for Business Loans:\n\n• Business Registration: Certificate of Incorporation, Partnership deed\n• Identity & Address Proof: Aadhaar, PAN of directors/partners\n• Financial Documents: ITR (last 2-3 years), P&L statements, Balance sheets\n• Bank Statements: Last 6-12 months\n• GST Certificate & Returns\n• Business Plan: For new businesses\n• Collateral Documents: If applicable\n• KYC Documents: Of all partners/directors',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Business Loans', nextFlow: 'business-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'business-loans-interest':
        botMessage = {
          id: Date.now().toString(),
          text: 'Business Loan Interest Rates:\n\n• Range: Typically 8% to 20% per annum\n• Secured loans: Lower rates (8-15%)\n• Unsecured loans: Higher rates (12-20%)\n• Factors affecting rate:\n  - Business credit score\n  - Annual turnover\n  - Loan amount and tenure\n  - Collateral provided\n  - Industry type\n\n• Processing fee: 0.5% to 3% of loan amount\n• Prepayment: Usually allowed with minimal charges',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Business Loans', nextFlow: 'business-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'home-loans-types':
        botMessage = {
          id: Date.now().toString(),
          text: 'Types of Home Loans:\n\n• Conventional Loans - Standard loans, typically lower cost\n• FHA Loans - Low down payment, government-backed\n• VA Loans - For veterans, no down payment\n• USDA Loans - For rural areas\n• Fixed-Rate Mortgages - Interest rate stays same\n• Adjustable-Rate Mortgages (ARM) - Rate can change\n• Construction Loans - For building new homes\n• Home Improvement Loans - For renovations',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Home Loans', nextFlow: 'home-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'home-loans-eligibility':
        botMessage = {
          id: Date.now().toString(),
          text: 'Home Loan Eligibility Criteria:\n\n• Age: 18-70 years (at loan maturity)\n• Income: Minimum ₹25,000-₹30,000 per month\n• Credit score: 650+ (preferred)\n• Employment: Stable job (minimum 2 years)\n• Down payment: 10-20% of property value\n• Debt-to-income ratio: Below 40%\n• Property: Should be approved by lender\n\nNote: Criteria vary by lender and loan type.',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Home Loans', nextFlow: 'home-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'home-loans-documents':
        botMessage = {
          id: Date.now().toString(),
          text: 'Required Documents for Home Loans:\n\n• Identity Proof: Aadhaar, PAN, Passport\n• Address Proof: Aadhaar, Utility bills\n• Income Proof: Salary slips (6 months), Form 16, ITR (2-3 years)\n• Bank Statements: Last 6 months\n• Employment Proof: Appointment letter, Employment certificate\n• Property Documents: Sale agreement, Property papers, NOC\n• Photographs: 2 passport-size photos\n• Processing fee cheque',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Home Loans', nextFlow: 'home-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'home-loans-interest':
        botMessage = {
          id: Date.now().toString(),
          text: 'Home Loan Interest Rates:\n\n• Range: Typically 8.5% to 12% per annum\n• Current rates: Around 8.5-9.5% (varies by lender)\n• Factors affecting rate:\n  - Credit score\n  - Loan amount and tenure\n  - Property value and location\n  - Down payment amount\n  - Employment stability\n\n• Processing fee: 0.5% to 1% of loan amount\n• Prepayment: Usually allowed with minimal charges\n• Tax benefits: Available under Section 24 and 80C',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Home Loans', nextFlow: 'home-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'other-loans-types':
        botMessage = {
          id: Date.now().toString(),
          text: 'Other Loan Types Available:\n\n• Gold Loans - Against gold jewelry\n• Car Loans - For vehicle purchase\n• Education Loans - For studies\n• Medical Loans - For healthcare expenses\n• Credit Card Loans - Against credit limit\n• Loan Against Property (LAP)\n• Loan Against Fixed Deposits\n• Balance Transfer Loans\n• Top-up Loans - Additional on existing loan\n• Professional Loans - For professionals',
          sender: 'bot',
          options: [
            { id: 'back', text: '← Back to Other Loans', nextFlow: 'other-loans' },
            { id: 'contact', text: 'Talk to an Expert', nextFlow: 'contact-form-name' },
          ],
          timestamp: new Date(),
        }
        break

      case 'contact-form-name':
        botMessage = {
          id: Date.now().toString(),
          text: 'Great! I\'d be happy to connect you with our team. Please provide your name:',
          sender: 'bot',
          timestamp: new Date(),
        }
        break

      case 'contact-form-number':
        botMessage = {
          id: Date.now().toString(),
          text: `Thank you, ${contactData.name}! Now please provide your contact number:`,
          sender: 'bot',
          timestamp: new Date(),
        }
        break

      case 'contact-complete':
        botMessage = {
          id: Date.now().toString(),
          text: `Perfect! Thank you ${contactData.name}. Your contact information has been received. Our team will reach out to you at ${contactData.number} shortly. Is there anything else I can help you with?`,
          sender: 'bot',
          options: [
            { id: 'restart', text: 'Start Over', nextFlow: 'initial' },
          ],
          timestamp: new Date(),
        }
        break
    }

    if (botMessage) {
      setMessages((prev) => [...prev, botMessage!])
    }
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    if (currentFlow === 'contact-form-name') {
      setContactData({ ...contactData, name: inputValue.trim() })
      setInputValue('')
      setTimeout(() => {
        handleFlowTransition('contact-form-number')
      }, 500)
    } else if (currentFlow === 'contact-form-number') {
      setContactData({ ...contactData, number: inputValue.trim() })
      setInputValue('')
      setTimeout(() => {
        handleFlowTransition('contact-complete')
      }, 500)
    } else {
      setInputValue('')
    }
  }

  const handleRestart = () => {
    setMessages([])
    setCurrentFlow('initial')
    setContactData({ name: '', number: '' })
    setInputValue('')
    setTimeout(() => {
      initializeChat()
    }, 100)
  }


  const handleWhatsAppClick = () => {
    const whatsappNumber = '919654188188'
    const message = encodeURIComponent('Hello! I need help with loans.')
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* Floating WhatsApp Button - hide when embedded */}
      {!embedded && showWhatsApp && (
        <button
          type="button"
          className="whatsapp-float-button"
          onClick={handleWhatsAppClick}
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>
      )}

      {/* Chat Button - Talk to an Expert at top - hide when embedded */}
      {!embedded && !isOpen && showChatToggle && (
        <button
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Talk to an Expert"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {showLabel && <span className="chatbot-toggle-label">Talk to an Expert</span>}
        </button>
      )}

      {/* Chat Window - always show when embedded, else when isOpen */}
      {(isOpen || embedded) && (
        <div className={`chatbot-container ${embedded ? 'chatbot-container-embedded' : ''}`}>
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="chatbot-header-text">
                <h3>Loan Assistant</h3>
                <p>We're here to help</p>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={() => {
                if (embedded && onClose) {
                  onClose()
                } else {
                  setIsOpen(false)
                  setTimeout(() => {
                    setMessages([])
                    setCurrentFlow('initial')
                    setContactData({ name: '', number: '' })
                  }, 300)
                }
              }}
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`chatbot-message ${message.sender}`}>
                {message.sender === 'bot' && (
                  <div className="chatbot-message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
                <div className="chatbot-message-content">
                  <div className="chatbot-message-text">{message.text}</div>
                  {message.options && message.options.length > 0 && (
                    <div className="chatbot-options">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          className="chatbot-option-button"
                          onClick={() => {
                            if (option.id === 'restart') {
                              handleRestart()
                            } else {
                              handleOptionClick(option)
                            }
                          }}
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {(currentFlow === 'contact-form-name' || currentFlow === 'contact-form-number') && (
            <form className="chatbot-input-form" onSubmit={handleInputSubmit}>
              <input
                ref={inputRef}
                type={currentFlow === 'contact-form-number' ? 'tel' : 'text'}
                className="chatbot-input"
                placeholder={
                  currentFlow === 'contact-form-name'
                    ? 'Enter your name...'
                    : 'Enter your number...'
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="chatbot-send-button" aria-label="Send">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          )}
        </div>
      )}

      <style jsx>{`
        .whatsapp-float-button {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #25D366;
          border: none;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .whatsapp-float-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
          background: #20BA5A;
        }

        .whatsapp-float-button svg {
          width: 32px;
          height: 32px;
        }

        .chatbot-toggle {
          position: static;
          min-width: auto;
          height: 48px;
          padding: 0 24px;
          border-radius: 12px;
          gap: 10px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 8px 32px rgba(102, 126, 234, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05),
            0 4px 12px rgba(0, 0, 0, 0.1);
          color: #667eea;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          font-weight: 600;
        }

        .chatbot-toggle::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.5s ease;
        }

        .chatbot-toggle:hover::before {
          left: 100%;
        }

        .chatbot-toggle:hover {
          transform: translateY(-2px) scale(1.02);
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 
            0 12px 40px rgba(102, 126, 234, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1),
            0 8px 20px rgba(0, 0, 0, 0.15);
          border-color: rgba(255, 255, 255, 0.7);
        }

        .chatbot-toggle:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 
            0 4px 16px rgba(102, 126, 234, 0.2),
            inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .chatbot-toggle svg {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        .chatbot-toggle-label {
          font-size: 15px;
          font-weight: 600;
          white-space: nowrap;
        }

        .chatbot-container {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 380px;
          max-width: calc(100vw - 40px);
          height: 600px;
          max-height: calc(100vh - 100px);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          display: flex;
          flex-direction: column;
          z-index: 1001;
          overflow: hidden;
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-color-scheme: dark) {
          .chatbot-container {
            background: #1a1a1a;
            color: #e0e0e0;
          }
        }

        .chatbot-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 16px 16px 0 0;
        }

        .chatbot-header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chatbot-avatar {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-avatar svg {
          width: 24px;
          height: 24px;
        }

        .chatbot-header-text h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .chatbot-header-text p {
          margin: 0;
          font-size: 12px;
          opacity: 0.9;
        }

        .chatbot-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .chatbot-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .chatbot-close svg {
          width: 18px;
          height: 18px;
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chatbot-message {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .chatbot-message.user {
          flex-direction: row-reverse;
        }

        .chatbot-message-avatar {
          width: 32px;
          height: 32px;
          background: #f0f0f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (prefers-color-scheme: dark) {
          .chatbot-message-avatar {
            background: #2a2a2a;
          }
        }

        .chatbot-message.user .chatbot-message-avatar {
          display: none;
        }

        .chatbot-message-avatar svg {
          width: 18px;
          height: 18px;
          color: #667eea;
        }

        .chatbot-message-content {
          max-width: 75%;
        }

        .chatbot-message.user .chatbot-message-content {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .chatbot-message-text {
          padding: 12px 16px;
          border-radius: 12px;
          white-space: pre-line;
          line-height: 1.5;
        }

        .chatbot-message.bot .chatbot-message-text {
          background: #f0f0f0;
          color: #333;
        }

        @media (prefers-color-scheme: dark) {
          .chatbot-message.bot .chatbot-message-text {
            background: #2a2a2a;
            color: #e0e0e0;
          }
        }

        .chatbot-message.user .chatbot-message-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .chatbot-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
        }

        .chatbot-option-button {
          padding: 10px 16px;
          background: white;
          border: 2px solid #667eea;
          border-radius: 8px;
          color: #667eea;
          cursor: pointer;
          font-size: 14px;
          text-align: left;
          transition: all 0.2s;
          font-weight: 500;
        }

        @media (prefers-color-scheme: dark) {
          .chatbot-option-button {
            background: #1a1a1a;
            border-color: #667eea;
            color: #667eea;
          }
        }

        .chatbot-option-button:hover {
          background: #667eea;
          color: white;
          transform: translateX(4px);
        }

        @media (prefers-color-scheme: dark) {
          .chatbot-option-button:hover {
            background: #667eea;
            color: white;
          }
        }

        .chatbot-input-form {
          display: flex;
          gap: 8px;
          padding: 16px 20px;
          border-top: 1px solid #e0e0e0;
          background: white;
        }

        @media (prefers-color-scheme: dark) {
          .chatbot-input-form {
            border-top-color: #2a2a2a;
            background: #1a1a1a;
          }
        }

        .chatbot-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 24px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }

        @media (prefers-color-scheme: dark) {
          .chatbot-input {
            background: #2a2a2a;
            border-color: #2a2a2a;
            color: #e0e0e0;
          }
        }

        .chatbot-input:focus {
          border-color: #667eea;
        }

        .chatbot-send-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .chatbot-send-button:hover {
          transform: scale(1.05);
        }

        .chatbot-send-button svg {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 480px) {
          .chatbot-container {
            width: calc(100vw - 20px);
            height: calc(100vh - 20px);
            bottom: 10px;
            right: 10px;
            border-radius: 12px;
          }

          .whatsapp-float-button {
            bottom: 85px;
            right: 15px;
            width: 56px;
            height: 56px;
          }

          .whatsapp-float-button svg {
            width: 30px;
            height: 30px;
          }


          .chatbot-toggle {
            bottom: 15px;
            right: 15px;
            width: 56px;
            height: 56px;
          }
        }
      `}</style>
    </>
  )
}

export default ChatBotLegacy
