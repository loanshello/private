import BankList from '@/components/BankList'
import { bankOffers } from '@/data/bankOffers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Used Car Loan Calculator | Helloans',
  description: 'Calculate used car loan EMI. Compare offers from banks and NBFCs for pre-owned car financing.',
}

export default function UsedCarLoanPage() {
  return (
    <>
      <Header />
      <main className="loan-page-main">
        <div className="loan-page-container">
          <div className="loan-page-header">
            <h1><span className="loan-title-shimmer">Used Car</span> Loan</h1>
            <p>Finance your pre-owned car with competitive rates from banks and NBFCs.</p>
          </div>

          <BankList
            offers={bankOffers['used-car-loan']}
            categoryTitle={<>Banks &amp; NBFCs offering <span className="loan-title-shimmer">Used Car Loan</span></>}
            loanCategory="used-car-loan"
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
