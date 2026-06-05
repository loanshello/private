import { personalLoanPartners } from '@/data/loanPartners'
import BankList from '@/components/BankList'
import { bankOffers } from '@/data/bankOffers'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personal Loan Calculator | Helloans',
  description: 'Calculate your personal loan EMI with our easy-to-use calculator. Apply for personal loans up to ₹50 lakhs.',
}

export default function PersonalLoansPage() {
  return (
    <>
      <Header />
      <main className="loan-page-main">
        <div className="loan-page-container">
          <div className="loan-page-header">
            <h1><span className="loan-title-shimmer">Personal</span> Loans</h1>
            <p>Whether it's for debt repayment or big life ambitions, a personal loan can be an excellent financial instrument.</p>
          </div>

          <BankList
  offers={bankOffers['personal-loans']}
  categoryTitle={<>Top <span className="loan-title-shimmer">Personal</span> Loan Offers</>}
  loanCategory="personal-loans"
/>        </div>
      </main>
      <Footer />
    </>
  )
}
