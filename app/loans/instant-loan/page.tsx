import BankList from '@/components/BankList'
import { bankOffers } from '@/data/bankOffers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Used Car Loan Calculator | Helloans',
  description: 'Get the best used car loan deals with competitive interest rates and flexible repayment options.',
}

export default function InstantLoanPage() {
  return (
    <>
      <Header />
      <main className="loan-page-main">
        <div className="loan-page-container">
          <div className="loan-page-header">
            <h1><span className="loan-title-shimmer">Used Car</span> Loan</h1>
            <p>Get the best deals on used car financing with competitive interest rates and flexible repayment options.</p>
          </div>

          <BankList
          offers={bankOffers['instant-loan']}
          categoryTitle={<>Banks &amp; NBFCs offering <span className="loan-title-shimmer">Used Car Loan</span></>}
          loanCategory="instant-loan"
        />
        </div>
      </main>
      <Footer />
    </>
  )
}
