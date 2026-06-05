import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BankList from '@/components/BankList'
import { bankOffers } from '@/data/bankOffers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Insurance | Helloans',
    description: 'Protect your future with our comprehensive insurance plans covering health, life, and more.',
}

export default function InsurancePage() {
    return (
        <>
            <Header />
            <main className="loan-page-main">
                <div className="loan-page-container">
                    <div className="loan-page-header">
                        <h1><span className="loan-title-shimmer">Insurance</span></h1>
                        <p>Secure your health and family's future with the best insurance policies available.</p>
                    </div>

                    <BankList
  offers={bankOffers['insurance']}
  categoryTitle={<>Top <span className="loan-title-shimmer">Insurance</span> Offers</>}
  loanCategory="insurance"
/>                </div>
            </main>
            <Footer />
        </>
    )
}
