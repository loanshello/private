import BankList from '@/components/BankList'
import { bankOffers } from '@/data/bankOffers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Loan Calculator | Helloans',
  description: 'Calculate professional loan EMI for doctors, lawyers, CAs, and other professionals.',
}

export default function ProfessionalLoansPage() {
  return (
    <>
      <Header />
      <main className="loan-page-main">
        <div className="loan-page-container">
          <div className="loan-page-header">
            <h1><span className="loan-title-shimmer">Professional</span> Loans</h1>
            <p>A professional loan is a type of funding meant for professionals, such as accountants and attorneys.</p>
          </div>

          <BankList
  offers={bankOffers['professional-loans']}
  categoryTitle={<>Top <span className="loan-title-shimmer">Professional</span> Loan Offers</>}
  loanCategory="professional-loans"
/>
        </div>
      </main>
      <Footer />
    </>
  )
}
