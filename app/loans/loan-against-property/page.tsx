import BankList from '@/components/BankList'
import { bankOffers } from '@/data/bankOffers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loan against Property Calculator | Zineegroup',
  description: 'Calculate Loan against Property EMI with low interest rates. Leverage your property for better loan terms.',
}

export default function LoanAgainstPropertyPage() {
  return (
    <>
      <Header />
      <main className="loan-page-main">
        <div className="loan-page-container">
          <div className="loan-page-header">
            <h1><span className="loan-title-shimmer">Loan against</span> Property</h1>
            <p>Leverage your property to secure a loan with low interest rates and higher loan amounts.</p>
          </div>

          <BankList
            offers={bankOffers['loan-against-property']}
            categoryTitle={<>Banks &amp; NBFCs offering <span className="loan-title-shimmer">Loan against Property</span></>}
            loanCategory="loan-against-property"
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
