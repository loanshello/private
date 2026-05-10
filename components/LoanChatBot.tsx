'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { bankOffers, type OfferCategory } from '@/data/bankOffers'

interface Option {
  id: string
  text: string
  nextFlow?: string
  href?: string
}

interface Message {
  id: string
  text: string
  title?: string
  sender: 'bot' | 'user'
  options?: Option[]
  timestamp: Date
}

interface LoanChatBotProps {
  showWhatsApp?: boolean
  showChatToggle?: boolean
  showLabel?: boolean
  embedded?: boolean
  onClose?: () => void
}

function FormattedMessage({ text, title }: { text: string; title?: string }) {
  const parts = text.split(/\n/).filter(Boolean)
  return (
    <div className="lc-message-body">
      {title && <div className="lc-message-title">{title}</div>}
      <div className="lc-message-text">
        {parts.map((line, i) => {
          const isList = line.trimStart().startsWith('•') || /^[\s]*[-*]\s/.test(line)
          const content = line.replace(/^[\s•\-*]+/, '').trim()
          if (!content) return null
          return isList ? (
            <div key={i} className="lc-message-list-item">
              <span className="lc-message-bullet" />
              <span>{content}</span>
            </div>
          ) : (
            <p key={i} className="lc-message-paragraph">{line}</p>
          )
        })}
      </div>
    </div>
  )
}

/* ── Loan type definitions ── */

const LOAN_TYPES = [
  { id: 'personal', label: 'Personal Loans', category: 'personal-loans' as OfferCategory },
  { id: 'business', label: 'Business Loans', category: 'business-loans' as OfferCategory },
  { id: 'home', label: 'Home Loans', category: 'home-loans' as OfferCategory },
  { id: 'gold', label: 'Gold Loans', category: 'gold-loans' as OfferCategory },
  { id: 'education', label: 'Education Loans', category: 'education-loans' as OfferCategory },
  { id: 'car', label: 'Used Car Loans', category: 'used-car-loan' as OfferCategory },
  { id: 'lap', label: 'Loan Against Property', category: 'loan-against-property' as OfferCategory },
  { id: 'bt', label: 'Balance Transfer', category: 'balance-transfer' as OfferCategory },
  { id: 'pro', label: 'Professional Loans', category: 'professional-loans' as OfferCategory },
  { id: 'od', label: 'Overdraft', category: 'overdraft' as OfferCategory },
  { id: 'ins', label: 'Insurance', category: 'insurance' as OfferCategory },
  { id: 'cc', label: 'Credit Cards', category: 'credit-cards' as OfferCategory },
]

/* ── Loan content per type ── */

const LOAN_INFO: Record<string, { overview: string; eligibility: string; documents: string; interest: string; repayment: string }> = {
  personal: {
    overview: 'Personal loans are unsecured — no collateral needed. Amounts from ₹10,000 to ₹50 lakh, tenure 12–60 months. Quick approval with minimal documents.',
    eligibility: '• Age: 21–60 years\n• Income: Min. ₹15,000–₹25,000/month (salaried)\n• CIBIL: 650+ preferred; 750+ for best rates\n• Employment: Salaried (1+ year) or self-employed (2+ years)\n• Debt-to-income: Ideally under 40%',
    documents: '• ID: Aadhaar, PAN, passport or driving licence\n• Address: Aadhaar, utility bill or rent agreement\n• Income: Last 3 months salary slips + 6 months bank statements\n• Employment: Offer letter or employment certificate\n• Photo: 1–2 passport-size\n\nSelf-employed: add ITR (2–3 years), GST and business proof.',
    interest: '• Interest: 10.5%–24% p.a. depending on profile & lender\n• Processing: 0.5%–6% of loan amount (often capped)\n• Prepayment: Some banks allow with 0–4% charges\n• GST: 18% on processing fee',
    repayment: '• Tenure: 12–60 months\n• Shorter tenure = less interest, higher EMI\n• Longer tenure = lower EMI, more total interest\n• Part-payment and prepayment can reduce interest cost',
  },
  business: {
    overview: 'Business loans cover working capital, equipment, expansion and more. Secured and unsecured options available from ₹1 lakh to ₹5 crore.',
    eligibility: '• Business age: 1–3+ years\n• Turnover: As per lender (e.g. ₹10L+)\n• CIBIL: 650+ for promoters\n• Registration: GST, incorporation/partnership proof\n• Cash flow: Positive and consistent',
    documents: '• Registration: Certificate of incorporation, partnership deed\n• KYC: Aadhaar, PAN of partners/directors\n• Financials: ITR, P&L, balance sheet (2–3 years)\n• Bank statements: 6–12 months\n• GST returns and registration',
    interest: '• Rate: 8%–20% p.a.; secured loans often lower\n• Processing: 0.5%–3% of loan amount\n• Depends on turnover, collateral and credit profile',
    repayment: '• Tenure: 1–7 years typically\n• EMI or overdraft/revolving facility\n• Part-prepayment usually allowed\n• Collateral may allow lower rates and longer tenure',
  },
  home: {
    overview: 'Home loans for purchase, construction, improvement or balance transfer. Get up to 90% of property value with long tenure up to 30 years.',
    eligibility: '• Age: 18–70 at loan maturity\n• Income: Min. ₹25,000–30,000/month\n• CIBIL: 650+ preferred\n• Down payment: Usually 10–20% of property value\n• FOIR: Generally up to 40–50%',
    documents: '• ID & address: Aadhaar, PAN, passport\n• Income: Salary slips, Form 16, ITR (2–3 years)\n• Bank statements: 6 months\n• Property: Sale agreement, NOC, title papers\n• Photos and application form',
    interest: '• Rate: 8.5%–12% p.a.\n• Tax: Deduction on interest (Section 24) and principal (80C)\n• Processing: ~0.5%–1% of loan amount',
    repayment: '• Tenure: Up to 30 years\n• Floating or fixed rate options\n• Part-prepayment with minimal charges on floating rate\n• Balance transfer possible if better rate available',
  },
  gold: {
    overview: 'Get instant funds against your gold jewellery. Loan up to 60–75% of gold value with quick disbursal and minimal documents.',
    eligibility: '• Age: 18–70 years\n• Own gold jewellery (min. 18 carat purity)\n• No income proof required in most cases\n• Any CIBIL score accepted\n• Indian resident',
    documents: '• ID: Aadhaar, PAN or voter ID\n• Address proof: Aadhaar or utility bill\n• Gold jewellery for valuation\n• Passport-size photographs',
    interest: '• Rate: 8.25%–17% p.a.\n• Processing: 0.25%–1% of loan amount\n• No prepayment charges usually\n• Lower rates for higher gold value',
    repayment: '• Tenure: 3 months to 3 years\n• Bullet payment or EMI options\n• Part-release of gold possible\n• Renewal facility available',
  },
  education: {
    overview: 'Fund your higher education in India or abroad. Covers tuition, hostel, living expenses with moratorium during the course.',
    eligibility: '• Indian citizen with admission to recognized institution\n• Age: 16–35 years\n• Co-applicant (parent/guardian) usually required\n• Merit-based or income-based approval\n• Collateral-free up to ₹7.5 lakh',
    documents: '• Admission letter and fee structure\n• Academic records and mark sheets\n• Co-applicant income proof and KYC\n• Collateral documents (for higher amounts)\n• Passport and visa (for abroad)',
    interest: '• Rate: 7%–13% p.a.\n• Processing: 0–1% of loan amount\n• Tax benefit under Section 80E on entire interest\n• Subsidised schemes for economically weaker sections',
    repayment: '• Moratorium: During course + 6–12 months after\n• Repayment tenure: 5–15 years after moratorium\n• No prepayment charges usually\n• EMI starts after moratorium ends',
  },
  car: {
    overview: 'Finance your pre-owned vehicle with up to 85–90% of car value. Vehicle serves as security with competitive rates.',
    eligibility: '• Age: 21–65 years\n• Min. salary: ₹15,000/month\n• CIBIL: 650+ preferred\n• Car age limit: 7–10 years (at loan maturity)\n• Vehicle inspection required',
    documents: '• ID: Aadhaar, PAN\n• Income: Salary slips, bank statements\n• Car: RC book, insurance copy\n• Sale agreement with seller\n• Vehicle valuation report',
    interest: '• Rate: 10%–18% p.a.\n• Processing: 1%–3% of loan amount\n• Higher rates than new car loans\n• Rate depends on car age and condition',
    repayment: '• Tenure: 1–7 years\n• Car remains hypothecated to lender\n• Insurance must be maintained throughout\n• Part-prepayment usually allowed',
  },
  lap: {
    overview: 'Unlock the value of your property. Secured by residential or commercial property with lower rates than unsecured loans.',
    eligibility: '• Own residential or commercial property\n• Age: 25–65 years\n• Income proof (salaried or self-employed)\n• CIBIL: 650+ preferred\n• Clear property title required',
    documents: '• Property papers: title deed, NOC, encumbrance certificate\n• Income proof: salary slips, ITR, bank statements\n• KYC: Aadhaar, PAN, address proof\n• Property valuation report\n• Approved building plan',
    interest: '• Rate: 8%–14% p.a.\n• Processing: 0.5%–2% of loan amount\n• Lower than unsecured loans\n• Rate depends on property value and location',
    repayment: '• Tenure: 5–20 years\n• Part-prepayment usually allowed\n• Property remains mortgaged until closure\n• Can be used for any purpose',
  },
  bt: {
    overview: 'Switch your existing loan to a lower interest rate lender. Reduce your EMI or total interest with a top-up option available.',
    eligibility: '• Existing loan with good repayment history\n• Min. 6–12 EMIs already paid\n• Better or same CIBIL score\n• No recent defaults or bounces\n• Loan type must be transferable',
    documents: '• Existing loan statement and sanction letter\n• NOC from current lender\n• ID and income proof\n• Repayment track record (bank statement)\n• Property documents (for home loan BT)',
    interest: '• Typically 0.5%–2% lower than current rate\n• Processing fee on new loan applies\n• Check foreclosure charges on old loan\n• Savings depend on outstanding amount and remaining tenure',
    repayment: '• Same or new tenure with new lender\n• Top-up amount possible on transfer\n• EMI adjusted per new rate\n• Old loan closed by new lender directly',
  },
  pro: {
    overview: 'Tailored loans for doctors, CAs, architects and other professionals. Based on practice income and qualifications with flexible terms.',
    eligibility: '• Qualified professional (doctor, CA, architect, engineer, etc.)\n• Practice experience: 1–3+ years\n• CIBIL: 650+ preferred\n• Professional registration required\n• Stable practice income',
    documents: '• Professional qualification certificate\n• Practice registration/licence\n• ITR and income proof (2–3 years)\n• KYC: Aadhaar, PAN, address proof\n• Clinic/office proof (if applicable)',
    interest: '• Rate: 10%–18% p.a.\n• Processing: 1%–3% of loan amount\n• Rates based on specialization and income\n• Collateral-free up to certain limits',
    repayment: '• Tenure: 1–7 years\n• Flexible EMI options\n• Part-prepayment allowed\n• Higher limits for established professionals',
  },
  od: {
    overview: 'Flexible credit line — use only what you need and pay interest only on the amount used. Ideal for variable cash flow needs.',
    eligibility: '• Existing bank relationship preferred\n• Good CIBIL score (650+)\n• Regular income or cash flow\n• For secured: property or FD as collateral\n• Business or professional income proof',
    documents: '• KYC: Aadhaar, PAN, address proof\n• Income: salary slips, ITR, bank statements (6–12 months)\n• Property papers (for secured OD)\n• Business proof (for business OD)\n• FD receipt (for OD against FD)',
    interest: '• Rate: 10%–18% p.a. (on utilized amount only)\n• Processing: 0.5%–2% of sanctioned limit\n• Renewal fee annually\n• Lower rates for secured overdraft',
    repayment: '• Revolving credit — draw and repay as needed\n• Interest charged only on amount used\n• Facility renewed annually or periodically\n• No fixed EMI; pay back at your pace',
  },
  ins: {
    overview: 'Protect your health, life and assets. Compare life, health and general insurance plans from top insurers through leading banks.',
    eligibility: '• Age criteria vary by plan type\n• Medical check-up may be required\n• Income declaration for life/term plans\n• No pre-existing conditions exclusion in some plans\n• Indian resident',
    documents: '• KYC: Aadhaar, PAN, address proof\n• Age proof: birth certificate or passport\n• Medical reports (if required)\n• Income proof for term plans\n• Nominee details',
    interest: 'Insurance works on premiums, not interest rates.\n• Compare plans for coverage vs premium\n• Term plans are most affordable for life cover\n• Health plans: check co-pay, sub-limits, waiting period\n• Bundled plans may offer better value',
    repayment: '• Monthly, quarterly or annual premium payments\n• Grace period: usually 15–30 days\n• Some plans have surrender value\n• Tax benefit under Section 80C (life) and 80D (health)',
  },
  cc: {
    overview: 'Get a credit card with rewards, cashback and perks. Multiple options from leading banks for different spending patterns.',
    eligibility: '• Age: 21–65 years\n• Min. salary: ₹15,000–25,000/month\n• CIBIL: 700+ preferred\n• Salaried or self-employed\n• Existing bank relationship helps',
    documents: '• ID: Aadhaar, PAN\n• Address proof\n• Salary slips (last 3 months)\n• Form 16 or ITR\n• Bank statements (3–6 months)',
    interest: '• Revolving credit interest: 24%–42% p.a.\n• Annual fee: ₹0–₹10,000+ (waived on spending targets)\n• Late payment fee: ₹100–₹1,300\n• No interest if full bill paid by due date',
    repayment: '• Minimum due: 5% of outstanding or ₹200\n• Full payment avoids interest charges\n• Billing cycle: ~30 days\n• Convert large purchases to no-cost EMI',
  },
}

/* ── Generate per-loan-type flows from LOAN_INFO ── */

function buildLoanFlows(): Record<string, { title?: string; text: string; options: Option[] }> {
  const flows: Record<string, { title?: string; text: string; options: Option[] }> = {}
  for (const lt of LOAN_TYPES) {
    const info = LOAN_INFO[lt.id]
    if (!info) continue

    flows[`loan-${lt.id}`] = {
      title: lt.label,
      text: info.overview + '\n\nWhat would you like to know?',
      options: [
        { id: 'elig', text: 'Eligibility', nextFlow: `loan-${lt.id}-eligibility` },
        { id: 'docs', text: 'Documents Required', nextFlow: `loan-${lt.id}-documents` },
        { id: 'interest', text: 'Interest Rates & Fees', nextFlow: `loan-${lt.id}-interest` },
        { id: 'repay', text: 'Repayment & Tenure', nextFlow: `loan-${lt.id}-repayment` },
        { id: 'apply', text: 'How to Apply', nextFlow: `apply-banks:${lt.category}` },
        { id: 'back', text: '← Types of Loan', nextFlow: 'loan-types' },
        { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
      ],
    }

    flows[`loan-${lt.id}-eligibility`] = {
      title: `${lt.label} – Eligibility`,
      text: info.eligibility,
      options: [
        { id: 'back', text: `← ${lt.label}`, nextFlow: `loan-${lt.id}` },
        { id: 'docs', text: 'Documents', nextFlow: `loan-${lt.id}-documents` },
        { id: 'apply', text: 'How to Apply', nextFlow: `apply-banks:${lt.category}` },
        { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
      ],
    }

    flows[`loan-${lt.id}-documents`] = {
      title: `${lt.label} – Documents`,
      text: info.documents,
      options: [
        { id: 'back', text: `← ${lt.label}`, nextFlow: `loan-${lt.id}` },
        { id: 'apply', text: 'How to Apply', nextFlow: `apply-banks:${lt.category}` },
        { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
      ],
    }

    flows[`loan-${lt.id}-interest`] = {
      title: `${lt.label} – Interest & Fees`,
      text: info.interest,
      options: [
        { id: 'back', text: `← ${lt.label}`, nextFlow: `loan-${lt.id}` },
        { id: 'repay', text: 'Repayment', nextFlow: `loan-${lt.id}-repayment` },
        { id: 'apply', text: 'How to Apply', nextFlow: `apply-banks:${lt.category}` },
        { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
      ],
    }

    flows[`loan-${lt.id}-repayment`] = {
      title: `${lt.label} – Repayment`,
      text: info.repayment,
      options: [
        { id: 'back', text: `← ${lt.label}`, nextFlow: `loan-${lt.id}` },
        { id: 'apply', text: 'How to Apply', nextFlow: `apply-banks:${lt.category}` },
        { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
      ],
    }
  }
  return flows
}

/* ── All bot flows (static + generated) ── */

const FLOWS: Record<string, { title?: string; text: string; options: Option[] }> = {
  initial: {
    title: 'Welcome to Helloans',
    text: `I'm your loan guide. How can I help you today?`,
    options: [
      { id: 'types', text: 'Types of Loan', nextFlow: 'loan-types' },
      { id: 'faq', text: 'Common Questions', nextFlow: 'faq' },
      { id: 'emi', text: 'EMI & Repayment', nextFlow: 'emi-repayment' },
      { id: 'cibil', text: 'CIBIL & Eligibility', nextFlow: 'cibil' },
      { id: 'apply', text: 'I want to apply', nextFlow: 'apply-intro' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'loan-types': {
    title: 'Types of Loan',
    text: 'Select a loan type to learn more about eligibility, documents, interest rates and how to apply.',
    options: [
      ...LOAN_TYPES.map((lt) => ({ id: lt.id, text: lt.label, nextFlow: `loan-${lt.id}` })),
      { id: 'back', text: '← Main menu', nextFlow: 'initial' },
    ],
  },
  ...buildLoanFlows(),

  /* ── Apply intro (shortcut from main menu) ── */
  'apply-intro': {
    title: 'Apply for a loan',
    text: 'Which type of loan would you like to apply for? Select one to see available banks.',
    options: [
      ...LOAN_TYPES.map((lt) => ({ id: lt.id, text: lt.label, nextFlow: `apply-banks:${lt.category}` })),
      { id: 'back', text: '← Main menu', nextFlow: 'initial' },
    ],
  },

  /* ── FAQ ── */
  faq: {
    title: 'Common questions',
    text: `Pick a question that's on your mind.`,
    options: [
      { id: 'faq1', text: 'What is the minimum salary for a personal loan?', nextFlow: 'faq-min-salary' },
      { id: 'faq2', text: 'Can I get a loan with a low CIBIL score?', nextFlow: 'faq-low-cibil' },
      { id: 'faq3', text: 'How long does loan approval take?', nextFlow: 'faq-approval-time' },
      { id: 'faq4', text: 'What is processing fee?', nextFlow: 'faq-processing-fee' },
      { id: 'faq5', text: 'Can I prepay my loan early?', nextFlow: 'faq-prepay' },
      { id: 'faq6', text: 'Why was my loan rejected?', nextFlow: 'faq-rejection' },
      { id: 'faq7', text: 'How much can I borrow for a home loan?', nextFlow: 'faq-home-amount' },
      { id: 'faq8', text: 'Secured vs unsecured loan?', nextFlow: 'faq-secured-unsecured' },
      { id: 'back', text: '← Main menu', nextFlow: 'initial' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'faq-min-salary': {
    title: 'Minimum salary for personal loan',
    text: `Most banks and NBFCs ask for a minimum net monthly salary of ₹15,000–₹25,000 for salaried applicants. Some lenders go lower (e.g. ₹12,000) and some higher. It also depends on your city, employer profile and existing obligations. Self-employed applicants are assessed on ITR and business income instead of salary.`,
    options: [
      { id: 'back', text: '← Common questions', nextFlow: 'faq' },
      { id: 'pe', text: 'Full eligibility criteria', nextFlow: 'loan-personal-eligibility' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'faq-low-cibil': {
    title: 'Loan with low CIBIL score',
    text: `A CIBIL score below 650 can make approval harder and rates higher, but it's not always a no. Some lenders offer loans to applicants with 600–650 for a higher interest rate or lower amount. Secured options (e.g. loan against FD, gold loan) are easier with a low score. Improving CIBIL by paying existing dues on time and correcting report errors can help.`,
    options: [
      { id: 'back', text: '← Common questions', nextFlow: 'faq' },
      { id: 'cibil', text: 'Improve CIBIL score', nextFlow: 'cibil' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'faq-approval-time': {
    title: 'How long does approval take?',
    text: `• Personal / instant loans: Often 1–3 working days; some lenders offer same-day disbursal for pre-approved customers.\n• Home / business loans: Usually 1–4 weeks due to property verification and longer underwriting.\n• Delays happen if documents are incomplete or additional checks are needed.`,
    options: [
      { id: 'back', text: '← Common questions', nextFlow: 'faq' },
      { id: 'apply', text: 'I want to apply', nextFlow: 'apply-intro' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'faq-processing-fee': {
    title: 'Processing fee',
    text: `Processing fee is a one-time charge levied by the lender to cover verification and administrative cost. It's usually 0.5%–2.5% of the loan amount (sometimes with a cap). It may be deducted from the disbursed amount or paid separately. GST (18%) is added on the fee. Some banks offer waivers during offers.`,
    options: [
      { id: 'back', text: '← Common questions', nextFlow: 'faq' },
      { id: 'pi', text: 'Interest & other fees', nextFlow: 'loan-personal-interest' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'faq-prepay': {
    title: 'Prepayment and foreclosure',
    text: `Most personal and home loans allow full or part prepayment. Rules differ by lender:\n• Part prepayment: Reduces outstanding; some banks allow it with no charges, others charge 1–4%.\n• Full foreclosure: Closing the loan early; charges if any are mentioned in your agreement.\n• Floating-rate home loans often have minimal or no prepayment charges.`,
    options: [
      { id: 'back', text: '← Common questions', nextFlow: 'faq' },
      { id: 'pr', text: 'Repayment & tenure', nextFlow: 'loan-personal-repayment' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'faq-rejection': {
    title: 'Why was my loan rejected?',
    text: `Common reasons include:\n• Low CIBIL or repayment history issues\n• Income too low or unstable for the requested amount\n• High existing debt (EMIs) compared to income\n• Incomplete or inconsistent documents\n• Age or employment criteria not met\n\nWe can help you improve eligibility or find a product that fits your profile.`,
    options: [
      { id: 'back', text: '← Common questions', nextFlow: 'faq' },
      { id: 'cibil', text: 'CIBIL & eligibility', nextFlow: 'cibil' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'faq-home-amount': {
    title: 'How much can I borrow for a home loan?',
    text: `Lenders typically offer 75–90% of the property's value. Your eligibility is based on:\n• Income and existing EMIs (FOIR – usually 40–50%)\n• Age and remaining working years\n• CIBIL score and employment stability\n• Property valuation and legal clearance`,
    options: [
      { id: 'back', text: '← Common questions', nextFlow: 'faq' },
      { id: 'h', text: 'Home loans overview', nextFlow: 'loan-home' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'faq-secured-unsecured': {
    title: 'Secured vs unsecured loan',
    text: `• Unsecured: No collateral. Approval depends on income, CIBIL and employment. Examples: personal loan, credit card. Interest is usually higher.\n• Secured: Backed by an asset (e.g. property, gold, FD). Lower risk for the lender, so rates are often lower. Examples: home loan, gold loan, loan against property.\n\nIf you have collateral, secured loans can save interest; if not, unsecured options are the way.`,
    options: [
      { id: 'back', text: '← Common questions', nextFlow: 'faq' },
      { id: 'types', text: 'Types of Loan', nextFlow: 'loan-types' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },

  /* ── EMI & Repayment ── */
  'emi-repayment': {
    title: 'EMI & repayment',
    text: `Understand EMI and how to manage repayment better.`,
    options: [
      { id: 'what', text: 'What is EMI?', nextFlow: 'emi-what' },
      { id: 'reduce', text: 'How to reduce EMI', nextFlow: 'emi-reduce' },
      { id: 'prepay', text: 'Prepayment & part-payment', nextFlow: 'emi-prepay' },
      { id: 'tenure', text: 'Choosing tenure', nextFlow: 'emi-tenure' },
      { id: 'back', text: '← Main menu', nextFlow: 'initial' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'emi-what': {
    title: 'What is EMI?',
    text: `EMI = Equated Monthly Instalment. It's a fixed amount you pay each month towards loan + interest. It depends on:\n• Loan amount\n• Interest rate\n• Tenure (months)\n\nUse our EMI calculator to try different combinations.`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'emi-repayment' },
      { id: 'reduce', text: 'Reduce EMI', nextFlow: 'emi-reduce' },
      { id: 'calc', text: 'Open EMI calculator', href: '/emi-calculator' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'emi-reduce': {
    title: 'How to reduce EMI',
    text: `• Opt for a longer tenure (EMI drops, total interest may rise)\n• Negotiate a lower rate with good CIBIL and stable income\n• Make a higher down payment to borrow less\n• Balance transfer to a lower-rate lender`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'emi-repayment' },
      { id: 'prepay', text: 'Prepayment', nextFlow: 'emi-prepay' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'emi-prepay': {
    title: 'Prepayment & part-payment',
    text: `• Full prepayment: Close the loan early (check charges)\n• Part-payment: Pay a lump sum to reduce principal and often EMI or tenure\n• Many lenders allow prepayment; charges vary (0–4%)\n• Reduces total interest when you prepay`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'emi-repayment' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'emi-tenure': {
    title: 'Choosing tenure',
    text: `• Shorter tenure: Higher EMI, less total interest, loan cleared sooner\n• Longer tenure: Lower EMI, more total interest\n• Pick tenure so EMI is comfortable and you can still prepay when possible`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'emi-repayment' },
      { id: 'calc', text: 'Open EMI calculator', href: '/emi-calculator' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },

  /* ── CIBIL ── */
  cibil: {
    title: 'CIBIL & eligibility',
    text: `Your credit score affects loan approval and interest rates. Here's what helps.`,
    options: [
      { id: 'what', text: 'What is CIBIL score?', nextFlow: 'cibil-what' },
      { id: 'improve', text: 'How to improve score', nextFlow: 'cibil-improve' },
      { id: 'check', text: 'Check my score', nextFlow: 'cibil-check' },
      { id: 'back', text: '← Main menu', nextFlow: 'initial' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'cibil-what': {
    title: 'What is CIBIL score?',
    text: `• 3-digit number (300–900) that reflects your credit behaviour\n• 700+ is generally good; 750+ gets better rates\n• Based on repayment history, utilisation, tenure and enquiries\n• Lenders use it to decide approval and interest rate`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'cibil' },
      { id: 'improve', text: 'Improve my score', nextFlow: 'cibil-improve' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'cibil-improve': {
    title: 'How to improve CIBIL score',
    text: `• Pay all EMIs and bills on time\n• Keep card utilisation under 30%\n• Don't apply for too many loans at once\n• Keep old accounts open; avoid closing paid-off loans abruptly\n• Check your report for errors and get them corrected`,
    options: [
      { id: 'back', text: '← Back', nextFlow: 'cibil' },
      { id: 'check', text: 'Check my score', nextFlow: 'cibil-check' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },
  'cibil-check': {
    title: 'Check your CIBIL score',
    text: `You can check your score for free on our CIBIL page. We'll only use it to suggest suitable offers.`,
    options: [
      { id: 'link', text: 'Open CIBIL page', href: '/cibil-score' },
      { id: 'back', text: '← Back', nextFlow: 'cibil' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    ],
  },

  /* ── Contact form ── */
  'contact-form-name': {
    text: `I'd be happy to connect you with our team. What's your name?`,
    options: [],
  },
  'contact-form-number': { text: '', options: [] },
  'contact-complete': {
    text: '',
    options: [{ id: 'restart', text: 'Start over', nextFlow: 'initial' }],
  },
}

/* ── Helpers for dynamic bank flows ── */

interface CompareEntry {
  id: string
  bank: string
  interestRate: number
  processingFee: string
  minAmount: number
  maxAmount: number
  minTenureYrs: number
  maxTenureYrs: number
  eligibility: string
  features: string[]
}

function formatAmount(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`
  return `₹${n.toLocaleString('en-IN')}`
}

function findLoanTypeByCategory(category: OfferCategory) {
  return LOAN_TYPES.find((lt) => lt.category === category)
}

/* ── Component ── */

export default function LoanChatBot(props: LoanChatBotProps) {
  return <LoanChatBotInner {...props} />
}

function LoanChatBotInner({
  showWhatsApp = true,
  showChatToggle = true,
  showLabel = true,
  embedded = false,
  onClose,
}: LoanChatBotProps) {
  const [isOpen, setIsOpen] = useState(embedded)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentFlow, setCurrentFlow] = useState('initial')
  const [contactData, setContactData] = useState({ name: '', number: '' })
  const [inputValue, setInputValue] = useState('')
  const lastUserMsgRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const contactNameRef = useRef('')
  const hasInteracted = useRef(false)

  const compareDataRef = useRef<{ personalLoans: CompareEntry[]; businessLoans: CompareEntry[] } | null>(null)
  const requirementsRef = useRef<{ requirements: { loanCategory: string; bankName: string; requirements: string[] }[] } | null>(null)

  useEffect(() => {
    if (embedded) initChat()
  }, [embedded])

  useEffect(() => {
    if (!embedded && isOpen && messages.length === 0) initChat()
  }, [isOpen, embedded])

  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener('open-chatbot', handler)
    return () => window.removeEventListener('open-chatbot', handler)
  }, [])

  useEffect(() => {
    if (!hasInteracted.current) return
    requestAnimationFrame(() => {
      const container = messagesContainerRef.current
      if (!container) return
      const userEl = lastUserMsgRef.current
      if (userEl) {
        const cr = container.getBoundingClientRect()
        const ur = userEl.getBoundingClientRect()
        const userPositionInContent = container.scrollTop + (ur.top - cr.top)
        const targetScroll = Math.max(0, userPositionInContent - 24)
        container.scrollTo({ top: targetScroll, behavior: 'smooth' })
      } else {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        })
      }
    })
  }, [messages])

  useEffect(() => {
    if (currentFlow === 'contact-form-name' || currentFlow === 'contact-form-number') {
      inputRef.current?.focus()
    }
  }, [currentFlow])

  function initChat() {
    const flow = FLOWS.initial
    setMessages([
      {
        id: '1',
        sender: 'bot',
        title: flow.title,
        text: flow.text,
        options: flow.options,
        timestamp: new Date(),
      },
    ])
    setCurrentFlow('initial')
  }

  async function ensureSheetData() {
    const fetches: Promise<void>[] = []
    if (!compareDataRef.current) {
      fetches.push(
        fetch('/api/loans/compare')
          .then((r) => r.json())
          .then((d) => { compareDataRef.current = d })
          .catch(() => {})
      )
    }
    if (!requirementsRef.current) {
      fetches.push(
        fetch('/api/requirements/sheets')
          .then((r) => r.json())
          .then((d) => { requirementsRef.current = d })
          .catch(() => {})
      )
    }
    if (fetches.length) await Promise.all(fetches)
  }

  function handleApplyBanks(category: OfferCategory) {
    const banks = bankOffers[category] || []
    const loanType = findLoanTypeByCategory(category)

    const bankOptions: Option[] = banks
      .map((b, i) => {
        if (b.internalApplySlug) {
          return {
            id: `bank-${i}`,
            text: b.bankName,
            nextFlow: `bank-detail:${b.internalApplySlug}:${category}`,
          }
        }
        if (b.link && b.link !== '#') {
          return { id: `bank-${i}`, text: b.bankName, href: b.link }
        }
        return null
      })
      .filter(Boolean) as Option[]

    bankOptions.push(
      { id: 'back', text: `← ${loanType?.label || 'Back'}`, nextFlow: loanType ? `loan-${loanType.id}` : 'loan-types' },
      { id: 'menu', text: '← Main menu', nextFlow: 'initial' },
      { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
    )

    setCurrentFlow(`apply-banks:${category}`)
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      title: `Banks for ${loanType?.label || 'this loan'}`,
      text: `Here are our partner banks and NBFCs for ${loanType?.label?.toLowerCase() || 'this category'}. Select a bank to see details and apply.`,
      options: bankOptions,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, botMsg])
  }

  async function handleBankDetail(slug: string, category: OfferCategory) {
    setCurrentFlow(`bank-detail:${slug}:${category}`)

    const banks = bankOffers[category] || []
    const bank = banks.find((b) => b.internalApplySlug === slug)
    const bankName = bank?.bankName || slug
    const loanType = findLoanTypeByCategory(category)

    await ensureSheetData()

    const allCompare = [
      ...(compareDataRef.current?.personalLoans || []),
      ...(compareDataRef.current?.businessLoans || []),
    ]
    const compareMatch = allCompare.find(
      (e) => e.id === slug || e.bank.toLowerCase().includes(slug.toLowerCase())
    )

    const allReqs = requirementsRef.current?.requirements || []
    const catLabel = (loanType?.label || category).toLowerCase()
    const reqMatch = allReqs.find(
      (r) =>
        r.bankName.toLowerCase().includes(slug.toLowerCase()) &&
        (r.loanCategory.toLowerCase().includes(catLabel) ||
          r.loanCategory.toLowerCase().includes(category.replace(/-/g, ' ')))
    )

    let detailLines: string[] = []
    if (compareMatch) {
      detailLines.push(`• Interest Rate: ${compareMatch.interestRate}% p.a.`)
      detailLines.push(`• Processing Fee: ${compareMatch.processingFee}`)
      detailLines.push(`• Loan Amount: ${formatAmount(compareMatch.minAmount)} – ${formatAmount(compareMatch.maxAmount)}`)
      detailLines.push(`• Tenure: ${compareMatch.minTenureYrs}–${compareMatch.maxTenureYrs} years`)
      if (compareMatch.eligibility) detailLines.push(`• Eligibility: ${compareMatch.eligibility}`)
      if (compareMatch.features?.length) {
        detailLines.push('')
        detailLines.push('Key features:')
        compareMatch.features.forEach((f) => detailLines.push(`• ${f}`))
      }
    }

    if (reqMatch && reqMatch.requirements.length > 0) {
      detailLines.push('')
      detailLines.push('Documents / requirements:')
      reqMatch.requirements.forEach((r) => detailLines.push(`• ${r}`))
    }

    if (detailLines.length === 0) {
      detailLines.push(
        `${bankName} offers competitive rates for ${loanType?.label?.toLowerCase() || 'this product'}. Apply now to get personalised offers and detailed terms.`
      )
    }

    const applyUrl = `/apply/${slug}?loanType=${category}`

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      title: bankName,
      text: detailLines.join('\n'),
      options: [
        { id: 'apply', text: 'Apply Now →', href: applyUrl },
        { id: 'back', text: '← Other banks', nextFlow: `apply-banks:${category}` },
        { id: 'menu', text: '← Main menu', nextFlow: 'initial' },
        { id: 'expert', text: 'Talk to an expert', nextFlow: 'contact-form-name' },
      ],
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, botMsg])
  }

  function handleOption(option: Option) {
    hasInteracted.current = true
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: option.text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])

    if (option.href) {
      setCurrentFlow('initial')
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Opening ${option.text.toLowerCase()}... You can continue here anytime.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      setTimeout(() => window.open(option.href!, '_self'), 400)
      return
    }

    if (option.id === 'restart') {
      setContactData({ name: '', number: '' })
      setCurrentFlow('initial')
      setTimeout(() => initChat(), 100)
      return
    }

    const nextFlow = option.nextFlow
    if (!nextFlow) return

    // Dynamic: show bank list for a loan category
    if (nextFlow.startsWith('apply-banks:')) {
      const category = nextFlow.slice('apply-banks:'.length) as OfferCategory
      handleApplyBanks(category)
      return
    }

    // Dynamic: show bank details (fetched from sheet)
    if (nextFlow.startsWith('bank-detail:')) {
      const rest = nextFlow.slice('bank-detail:'.length)
      const colonIdx = rest.indexOf(':')
      const slug = rest.slice(0, colonIdx)
      const category = rest.slice(colonIdx + 1) as OfferCategory
      handleBankDetail(slug, category)
      return
    }

    setCurrentFlow(nextFlow)

    if (nextFlow === 'contact-form-name') {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: FLOWS['contact-form-name'].text,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      return
    }

    const flow = FLOWS[nextFlow]
    if (!flow) return
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      title: flow.title,
      text: flow.text,
      options: flow.options,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, botMsg])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    hasInteracted.current = true
    const val = inputValue.trim()
    if (!val) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: val,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])

    if (currentFlow === 'contact-form-name') {
      contactNameRef.current = val
      setContactData((c) => ({ ...c, name: val }))
      setInputValue('')
      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `Thanks, ${val}! What's your 10-digit mobile number?`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMsg])
        setCurrentFlow('contact-form-number')
      }, 400)
    } else if (currentFlow === 'contact-form-number') {
      setContactData((c) => ({ ...c, number: val }))
      setInputValue('')
      const name = contactNameRef.current || contactData.name
      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `We've received your details, ${name}. Our team will call you on ${val} soon. Anything else?`,
          options: [{ id: 'restart', text: 'Start over', nextFlow: 'initial' }],
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMsg])
        setCurrentFlow('contact-complete')
      }, 400)
    }
  }

  function handleClose() {
    if (embedded) {
      if (onClose) {
        onClose()
      } else {
        setContactData({ name: '', number: '' })
        setCurrentFlow('initial')
        initChat()
      }
    } else {
      setIsOpen(false)
      setTimeout(() => {
        setMessages([])
        setCurrentFlow('initial')
        setContactData({ name: '', number: '' })
      }, 300)
    }
  }

  const showInput =
    currentFlow === 'contact-form-name' || currentFlow === 'contact-form-number'

  return (
    <>
      {!embedded && showWhatsApp && (
        <a
          href="https://wa.me/919654188188?text=Hello!%20I%20need%20help%20with%20loans."
          target="_blank"
          rel="noopener noreferrer"
          className="lc-whatsapp"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      )}

      {!embedded && !isOpen && showChatToggle && (
        <button
          type="button"
          className="lc-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Chat"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          {showLabel && <span className="lc-toggle-label">Chat</span>}
        </button>
      )}

      {(isOpen || embedded) && (
        <div className={`lc-container ${embedded ? 'lc-container-embedded' : ''}`}>
          <div className="lc-header">
            <div className="lc-header-left">
              <div className="lc-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <div className="lc-header-text">
                <span className="lc-header-title">Loan Assistant</span>
                <span className="lc-header-sub">Helloans · Here to help</span>
              </div>
            </div>
            <button
              type="button"
              className="lc-close"
              onClick={handleClose}
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={messagesContainerRef} className="lc-messages">
            {messages.map((msg, idx) => {
              const isLastUser =
                msg.sender === 'user' &&
                messages.slice(idx + 1).every((m) => m.sender !== 'user')
              return (
              <div
                key={msg.id}
                ref={isLastUser ? lastUserMsgRef : undefined}
                className={`lc-bubble-wrap lc-bubble-wrap--${msg.sender}`}
              >
                {msg.sender === 'bot' && (
                  <div className="lc-bubble-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                  </div>
                )}
                <div className={`lc-bubble lc-bubble--${msg.sender}`}>
                  {msg.sender === 'bot' ? (
                    <>
                      <FormattedMessage title={msg.title} text={msg.text} />
                      {msg.options && msg.options.length > 0 && (
                        <div className="lc-options">
                          {msg.options.map((opt) =>
                            opt.href ? (
                              <Link
                                key={opt.id}
                                href={opt.href}
                                className="lc-option lc-option--link"
                              >
                                {opt.text}
                              </Link>
                            ) : (
                              <button
                                key={opt.id}
                                type="button"
                                className="lc-option"
                                onClick={() => handleOption(opt)}
                              >
                                {opt.text}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="lc-message-body">
                      <div className="lc-message-text">{msg.text}</div>
                    </div>
                  )}
                </div>
              </div>
              )
            })}
          </div>

          {showInput && (
            <form className="lc-input-wrap" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type={currentFlow === 'contact-form-number' ? 'tel' : 'text'}
                className="lc-input"
                placeholder={
                  currentFlow === 'contact-form-name'
                    ? 'Your name'
                    : '10-digit mobile number'
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                maxLength={currentFlow === 'contact-form-number' ? 10 : undefined}
              />
              <button type="submit" className="lc-send" aria-label="Send">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          )}
        </div>
      )}

      <style jsx>{`
        .lc-whatsapp {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25d366;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
          z-index: 1000;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lc-whatsapp:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5);
        }
        .lc-whatsapp svg {
          width: 28px;
          height: 28px;
        }
        .lc-toggle {
          position: static;
          min-width: auto;
          height: 48px;
          padding: 0 22px;
          border-radius: 12px;
          gap: 10px;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 6px 24px rgba(59, 130, 246, 0.2);
          color: #1e40af;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.25s ease;
        }
        .lc-toggle:hover {
          background: rgba(255, 255, 255, 0.45);
          box-shadow: 0 8px 28px rgba(59, 130, 246, 0.3);
          transform: translateY(-1px);
        }
        .lc-toggle svg {
          width: 22px;
          height: 22px;
        }
        .lc-toggle-label {
          white-space: nowrap;
        }
      `}</style>
    </>
  )
}
