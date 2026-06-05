import BankList from '@/components/BankList'
import { bankOffers } from '@/data/bankOffers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Overdraft Calculator | Helloans',
    description: 'Calculate your overdraft interest and limits. Get instant liquidity for your financial needs.',
}

const NBFC_NAMES = new Set([
    'Bajaj Finserv',
    'Tata Capital',
    'Aditya Birla Capital',
    'Cholamandalam',
    'Poonawalla Fincorp',
    'Piramal Capital',
])

export default function OverdraftPage() {
    const allOffers = bankOffers['overdraft']
    const salariedOffers = allOffers.filter((o) => NBFC_NAMES.has(o.bankName))
    const selfEmployedOffers = allOffers

    return (
        <>
            <Header />
            <main className="loan-page-main">
                <div className="loan-page-container">
                    <div className="loan-page-header">
                        <h1><span className="loan-title-shimmer">Overdraft</span></h1>
                        <p>An overdraft allows you to withdraw more money than you have in your account, providing flexible short-term funding.</p>
                    </div>

                    <BankList
                        offers={salariedOffers}
                        categoryTitle={<><span className="loan-title-shimmer">Salaried</span> Overdraft Offers</>}
                        loanCategory="overdraft-salaried"
                    />

                    <BankList
                        offers={selfEmployedOffers}
                        categoryTitle={<><span className="loan-title-shimmer">Self-Employed</span> Overdraft</>}
                        loanCategory="overdraft-self-employed"
                    />
                </div>
            </main>
            <Footer />
        </>
    )
}
