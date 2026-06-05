import { businessLoanPartners } from '@/data/loanPartners'
import BankList from '@/components/BankList'
import { bankOffers } from '@/data/bankOffers'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Loan Calculator | Helloans',
  description: 'Calculate your business loan EMI. Get business loans to expand your business with competitive interest rates.',
}

export default function BusinessLoansPage() {
  return (
    <>
      <Header />
      <main className="loan-page-main">
        <div className="loan-page-container">
          <div className="loan-page-header">
            <h1><span className="loan-title-shimmer">Business</span> Loans</h1>
            <p>Business loan enables you to expand your business and network. It provides financial stability in your business.</p>
          </div>

                    <BankList
            offers={bankOffers['business-loans']}
            categoryTitle={<>Top <span className="loan-title-shimmer">Business</span> Loan Offers</>}
            loanCategory="business-loans"
          />
 </div>
      </main>
      <Footer />
    </>
  )
}
