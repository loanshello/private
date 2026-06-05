import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BankList from '@/components/BankList'
import { bankOffers } from '@/data/bankOffers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Home Loan & LAP | Helloans',
    description: 'Apply for home loans and loans against property with competitive interest rates.',
}

export default function HomeLoansPage() {
    return (
        <>
            <Header />
            <main className="loan-page-main">
                <div className="loan-page-container">
                    <div className="loan-page-header">
                        <h1><span className="loan-title-shimmer">Home</span> Loan & LAP</h1>
                        <p>Turn your dream home into reality or leverage your property for funds with our home loan solutions.</p>
                    </div>

                    <BankList
                    offers={bankOffers['home-loans']}
                    categoryTitle={<><span className="loan-title-shimmer">Home</span> Loan & LAP Offers</>}
                    loanCategory="home-loans"
                    />                </div>
            </main>
            <Footer />
        </>
    )
}
