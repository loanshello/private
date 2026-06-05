import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BankList from '@/components/BankList'
import { bankOffers } from '@/data/bankOffers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Education Loans | Helloans',
    description: 'Fund your higher education dreams with our student-friendly education loan options.',
}

export default function EducationLoansPage() {
    return (
        <>
            <Header />
            <main className="loan-page-main">
                <div className="loan-page-container">
                    <div className="loan-page-header">
                        <h1><span className="loan-title-shimmer">Education</span> Loans</h1>
                        <p>Invest in your future with flexible education loans for studies in India and abroad.</p>
                    </div>

                    <BankList
                        offers={bankOffers['education-loans']}
                        categoryTitle={<>Top <span className="loan-title-shimmer">Education</span> Loan Offers</>}
                        loanCategory="education-loans"
                        />                </div>
            </main>
            <Footer />
        </>
    )
}
