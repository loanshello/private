import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BankList from '@/components/BankList'
import { bankOffers } from '@/data/bankOffers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Credit Cards | Helloans',
    description: 'Compare and apply for the best credit cards tailored to your lifestyle and spending habits.',
}

export default function CreditCardsPage() {
    return (
        <>
            <Header />
            <main className="loan-page-main">
                <div className="loan-page-container">
                    <div className="loan-page-header">
                        <h1><span className="loan-title-shimmer">Credit</span> Cards</h1>
                        <p>Unlock rewards, cashback, and exclusive lifestyle benefits with our wide range of credit card options.</p>
                    </div>

                    <BankList
                        offers={bankOffers['credit-cards']}
                        categoryTitle={<>Top <span className="loan-title-shimmer">Credit</span> Card Offers</>}
                        loanCategory="credit-cards"
                        />
                </div>
            </main>
            <Footer />
        </>
    )
}
