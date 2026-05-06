export type BankOffer = {
    bankName: string
    link: string
    description?: string
    /** Optional logo path under /assets/images or remote URL */
    logo?: string
    /** Optional brand color used to tint the tile background/border */
    brandColor?: string
    /** When set, "Apply Now" links to /apply/[internalApplySlug]?loanType=[category] */
    internalApplySlug?: string
}

export type OfferCategory =
    | 'personal-loans'
    | 'business-loans'
    | 'instant-loan'
    | 'credit-cards'
    | 'home-loans'
    | 'gold-loans'
    | 'education-loans'
    | 'insurance'
    | 'overdraft'
    | 'loan-against-property'
    | 'used-car-loan'
    | 'balance-transfer'
    | 'professional-loans'

/** 7 banks + 6 NBFCs (Bajaj, Tata Capital, Aditya Birla, Cholamandalam, Poonawalla, Piramal) for personal-loans. Other categories show only those that offer that product. */
export const bankOffers: Record<OfferCategory, BankOffer[]> = {
    'personal-loans': [
        {
            bankName: 'ICICI Bank',
            link: '#',
            internalApplySlug: 'icici',
            logo: '/assets/images/partners/icici.svg',
            brandColor: '#b6401e',
        },
        {
            bankName: 'IndusInd Bank',
            link: '#',
            internalApplySlug: 'indusind',
            logo: '/assets/images/partners/indusind.jpeg',
            brandColor: '#C4122E',
        },
        {
            bankName: 'YES Bank',
            link: '#',
            internalApplySlug: 'yes',
            logo: '/assets/images/partners/yes.svg',
            brandColor: '#1e4f9c',
        },
        {
            bankName: 'IDFC First Bank',
            link: '#',
            internalApplySlug: 'idfc',
            logo: '/assets/images/partners/idfc.webp',
            brandColor: '#7a003c',
        },
        {
            bankName: 'Kotak Mahindra Bank',
            link: '#',
            internalApplySlug: 'kotak',
            logo: '/assets/images/Kotak-1.png',
            brandColor: '#d71920',
        },
        {
            bankName: 'HDFC Bank',
            link: '#',
            internalApplySlug: 'hdfc',
            logo: '/assets/images/HDFC.svg',
            brandColor: '#004c8f',
        },
        {
            bankName: 'Axis Bank',
            link: '#',
            internalApplySlug: 'axis',
            logo: '/assets/images/AX.png',
            brandColor: '#7b0046',
        },
        // NBFCs
        {
            bankName: 'Bajaj Finserv',
            link: '#',
            internalApplySlug: 'bajaj',
            logo: '/assets/images/partners/bajaj.png',
            brandColor: '#0076b8',
        },
        {
            bankName: 'Tata Capital',
            link: '#',
            internalApplySlug: 'tata',
            logo: '/assets/images/partners/tata.png',
            brandColor: '#2b8fcb',
        },
        {
            bankName: 'Aditya Birla Capital',
            link: '#',
            internalApplySlug: 'adityabirla',
            logo: '/assets/images/partners/abfl.webp',
            brandColor: '#a02030',
        },
        {
            bankName: 'Cholamandalam',
            link: '#',
            internalApplySlug: 'cholamandalam',
            logo: '/assets/images/cholamandalam.png',
            brandColor: '#0d47a1',
        },
        {
            bankName: 'Poonawalla Fincorp',
            link: '#',
            internalApplySlug: 'poonawalla',
            logo: '/assets/images/partners/poonawalla.png',
            brandColor: '#1e88e5',
        },
        {
            bankName: 'Piramal Capital',
            link: '#',
            internalApplySlug: 'piramal',
            logo: '/assets/images/Piramal_Finance_logo.svg',
            brandColor: '#1565c0',
        },
    ],
    // Business Loans: 7 banks + 6 NBFCs
    'business-loans': [
        { bankName: 'ICICI Bank', link: '#', internalApplySlug: 'icici', logo: '/assets/images/partners/icici.svg', brandColor: '#b6401e' },
        { bankName: 'IndusInd Bank', link: '#', internalApplySlug: 'indusind', logo: '/assets/images/partners/indusind.jpeg', brandColor: '#C4122E' },
        { bankName: 'YES Bank', link: '#', internalApplySlug: 'yes', logo: '/assets/images/partners/yes.svg', brandColor: '#1e4f9c' },
        { bankName: 'IDFC First Bank', link: '#', internalApplySlug: 'idfc', logo: '/assets/images/partners/idfc.webp', brandColor: '#7a003c' },
        { bankName: 'Kotak Mahindra Bank', link: '#', internalApplySlug: 'kotak', logo: '/assets/images/Kotak-1.png', brandColor: '#d71920' },
        { bankName: 'HDFC Bank', link: '#', internalApplySlug: 'hdfc', logo: '/assets/images/HDFC.svg', brandColor: '#004c8f' },
        { bankName: 'Axis Bank', link: '#', internalApplySlug: 'axis', logo: '/assets/images/AX.png', brandColor: '#7b0046' },
        {
            bankName: 'Bajaj Finserv',
            link: '#',
            internalApplySlug: 'bajaj',
            logo: '/assets/images/partners/bajaj.png',
            brandColor: '#0076b8',
        },
        {
            bankName: 'Tata Capital',
            link: '#',
            internalApplySlug: 'tata',
            logo: '/assets/images/partners/tata.png',
            brandColor: '#2b8fcb',
        },
        {
            bankName: 'Aditya Birla Capital',
            link: '#',
            internalApplySlug: 'adityabirla',
            logo: '/assets/images/partners/abfl.webp',
            brandColor: '#a02030',
        },
        {
            bankName: 'Cholamandalam',
            link: '#',
            internalApplySlug: 'cholamandalam',
            logo: '/assets/images/cholamandalam.png',
            brandColor: '#0d47a1',
        },
        {
            bankName: 'Poonawalla Fincorp',
            link: '#',
            internalApplySlug: 'poonawalla',
            logo: '/assets/images/partners/poonawalla.png',
            brandColor: '#1e88e5',
        },
        {
            bankName: 'Piramal Capital',
            link: '#',
            internalApplySlug: 'piramal',
            logo: '/assets/images/Piramal_Finance_logo.svg',
            brandColor: '#1565c0',
        },
    ],
    'instant-loan': [
        {
            bankName: 'IndusInd',
            link: '#',
            internalApplySlug: 'indusind',
            logo: '/assets/images/partners/indusind.jpeg',
            brandColor: '#C4122E',
        },
        {
            bankName: 'Bajaj Finserv',
            link: '#',
            internalApplySlug: 'bajaj',
            logo: '/assets/images/partners/bajaj.png',
            brandColor: '#0076b8',
        },
        {
            bankName: 'Unity Bank',
            link: '#',
            internalApplySlug: 'unity',
            logo: '/assets/images/partners/unity.png',
        },
        {
            bankName: 'Hero FinCorp',
            link: '#',
            internalApplySlug: 'hero',
            logo: '/assets/images/partners/hero.png',
        },
        {
            bankName: 'CreditVidya',
            link: '#',
            internalApplySlug: 'creditvidya',
            logo: '/assets/images/partners/prefer.jpeg',
        },
        {
            bankName: 'Poonawalla',
            link: '#',
            internalApplySlug: 'poonawalla',
            logo: '/assets/images/partners/poonawalla.png',
        },
        {
            bankName: 'InCred',
            link: '#',
            internalApplySlug: 'incred',
            logo: '/assets/images/partners/incred.png',
        },
        {
            bankName: 'DMI Finance',
            link: '#',
            internalApplySlug: 'dmi',
            logo: '/assets/images/partners/dmi.png',
        },
        {
            bankName: 'Fi Money',
            link: '#',
            internalApplySlug: 'fimoney',
            logo: '/assets/images/partners/fi.svg',
        },
        {
            bankName: 'IDFC First',
            link: '#',
            internalApplySlug: 'idfc',
            logo: '/assets/images/partners/idfc.webp',
            brandColor: '#7a003c',
        },
    ],
    // Home Loans: 7 banks + 6 NBFCs
    'home-loans': [
        { bankName: 'HDFC Bank', link: '#', internalApplySlug: 'hdfc', logo: '/assets/images/HDFC.svg', brandColor: '#004c8f' },
        { bankName: 'ICICI Bank', link: '#', internalApplySlug: 'icici', logo: '/assets/images/partners/icici.svg', brandColor: '#b6401e' },
        { bankName: 'Axis Bank', link: '#', internalApplySlug: 'axis', logo: '/assets/images/AX.png', brandColor: '#7b0046' },
        { bankName: 'Kotak Mahindra Bank', link: '#', internalApplySlug: 'kotak', logo: '/assets/images/Kotak-1.png', brandColor: '#d71920' },
        { bankName: 'IDFC First Bank', link: '#', internalApplySlug: 'idfc', logo: '/assets/images/partners/idfc.webp', brandColor: '#7a003c' },
        { bankName: 'IndusInd Bank', link: '#', internalApplySlug: 'indusind', logo: '/assets/images/partners/indusind.jpeg', brandColor: '#C4122E' },
        { bankName: 'YES Bank', link: '#', internalApplySlug: 'yes', logo: '/assets/images/partners/yes.svg', brandColor: '#1e4f9c' },
        { bankName: 'Bajaj Finserv', link: '#', internalApplySlug: 'bajaj', logo: '/assets/images/partners/bajaj.png', brandColor: '#0076b8' },
        { bankName: 'Tata Capital', link: '#', internalApplySlug: 'tata', logo: '/assets/images/partners/tata.png', brandColor: '#2b8fcb' },
        { bankName: 'Aditya Birla Capital', link: '#', internalApplySlug: 'adityabirla', logo: '/assets/images/partners/abfl.webp', brandColor: '#a02030' },
        { bankName: 'Cholamandalam', link: '#', internalApplySlug: 'cholamandalam', logo: '/assets/images/cholamandalam.png', brandColor: '#0d47a1' },
        { bankName: 'Poonawalla Fincorp', link: '#', internalApplySlug: 'poonawalla', logo: '/assets/images/partners/poonawalla.png', brandColor: '#1e88e5' },
        { bankName: 'Piramal Capital', link: '#', internalApplySlug: 'piramal', logo: '/assets/images/Piramal_Finance_logo.svg', brandColor: '#1565c0' },
    ],
    // Gold Loan: Top 5 banks + Muthoot NBFC
    'gold-loans': [
        { bankName: 'Punjab National Bank', link: '#', internalApplySlug: 'pnb', logo: '/assets/images/PNB.png', brandColor: '#0b3d91' },
        { bankName: 'State Bank of India', link: '#', internalApplySlug: 'sbi', logo: '/assets/images/SBI.png', brandColor: '#22409a' },
        { bankName: 'HDFC Bank', link: '#', internalApplySlug: 'hdfc', logo: '/assets/images/HDFC.svg', brandColor: '#004c8f' },
        { bankName: 'Canara Bank', link: '#', internalApplySlug: 'canara', logo: '/assets/images/CB.png', brandColor: '#fbb034' },
        { bankName: 'Bank of Baroda', link: '#', internalApplySlug: 'bob', logo: '/assets/images/BOB.png', brandColor: '#f26522' },
        {
            bankName: 'Muthoot',
            link: 'https://muthoot.mymoneymantra.com/?sms=false&btb=true&v1=EDI&utm_source=medi&utm_medium=mmm&utm_campaign=medi-mmm-941530&pid=Y2VjZmM3MjAtZjk5OS0xMWVlLTgyYjktMDdlOGJkMWUzOTA5',
            logo: '/assets/images/partners/muthoot.png',
        },
    ],
    // Education Loans: Top 5 banks
    'education-loans': [
        { bankName: 'Punjab National Bank', link: '#', internalApplySlug: 'pnb', logo: '/assets/images/PNB.png', brandColor: '#0b3d91' },
        { bankName: 'State Bank of India', link: '#', internalApplySlug: 'sbi', logo: '/assets/images/SBI.png', brandColor: '#22409a' },
        { bankName: 'Bank of Baroda', link: '#', internalApplySlug: 'bob', logo: '/assets/images/BOB.png', brandColor: '#f26522' },
        { bankName: 'HDFC Bank', link: '#', internalApplySlug: 'hdfc', logo: '/assets/images/HDFC.svg', brandColor: '#004c8f' },
        { bankName: 'ICICI Bank', link: '#', internalApplySlug: 'icici', logo: '/assets/images/partners/icici.svg', brandColor: '#b6401e' },
    ],
    'credit-cards': [
        {
            bankName: 'Popcard',
            link: '#',
            internalApplySlug: 'popcard',
            logo: '/assets/images/partners/popcard.jpg',
        },
        {
            bankName: 'Bank of Baroda',
            link: '#',
            internalApplySlug: 'bob',
            logo: '/assets/images/BOB.png',
            brandColor: '#f26522',
        },
        {
            bankName: 'Federal Bank',
            link: '#',
            internalApplySlug: 'federal',
            logo: '/assets/images/partners/federal.jpeg',
        },
        {
            bankName: 'Kiwi',
            link: '#',
            internalApplySlug: 'kiwi',
            logo: '/assets/images/partners/kiwi.jpg',
        },
        {
            bankName: 'Tata Neu',
            link: '#',
            internalApplySlug: 'tataneu',
            logo: '/assets/images/partners/tataneu.webp',
        },
        {
            bankName: 'SBI Card',
            link: '#',
            internalApplySlug: 'sbicard',
            logo: '/assets/images/SBI.png',
            brandColor: '#22409a',
        },
        {
            bankName: 'Axis Bank',
            link: '#',
            internalApplySlug: 'axis',
            logo: '/assets/images/AX.png',
            brandColor: '#7b0046',
        },
        {
            bankName: 'Scapia',
            link: '#',
            internalApplySlug: 'scapia',
            logo: '/assets/images/partners/scapia.jpg',
        },
        {
            bankName: 'Magnifi',
            link: '#',
            internalApplySlug: 'magnifi',
            logo: '/assets/images/partners/magnifi.png',
        },
        {
            bankName: 'IndusInd',
            link: '#',
            internalApplySlug: 'indusind',
            logo: '/assets/images/partners/indusind.jpeg',
            brandColor: '#C4122E',
        },
        {
            bankName: 'ICICI Bank',
            link: '#',
            internalApplySlug: 'icici',
            logo: '/assets/images/partners/icici.svg',
            brandColor: '#b6401e',
        },
        {
            bankName: 'LIC Axis',
            link: '#',
            internalApplySlug: 'licaxis',
            logo: '/assets/images/licaxis-bank.jpg',
        },
        {
            bankName: 'Magnet',
            link: '#',
            internalApplySlug: 'magnet',
        },
    ],
    // Insurance: Top 5 banks (by bancassurance commission)
    'insurance': [
        { bankName: 'HDFC Bank', link: '#', internalApplySlug: 'hdfc', logo: '/assets/images/HDFC.svg', brandColor: '#004c8f' },
        { bankName: 'ICICI Bank', link: '#', internalApplySlug: 'icici', logo: '/assets/images/partners/icici.svg', brandColor: '#b6401e' },
        { bankName: 'Axis Bank', link: '#', internalApplySlug: 'axis', logo: '/assets/images/AX.png', brandColor: '#7b0046' },
        { bankName: 'State Bank of India', link: '#', internalApplySlug: 'sbi', logo: '/assets/images/SBI.png', brandColor: '#22409a' },
        { bankName: 'IndusInd Bank', link: '#', internalApplySlug: 'indusind', logo: '/assets/images/partners/indusind.jpeg', brandColor: '#C4122E' },
    ],
    // Overdraft: 7 banks + 6 NBFCs
    'overdraft': [
        { bankName: 'ICICI Bank', link: '#', internalApplySlug: 'icici', logo: '/assets/images/partners/icici.svg', brandColor: '#b6401e' },
        { bankName: 'IndusInd Bank', link: '#', internalApplySlug: 'indusind', logo: '/assets/images/partners/indusind.jpeg', brandColor: '#C4122E' },
        { bankName: 'YES Bank', link: '#', internalApplySlug: 'yes', logo: '/assets/images/partners/yes.svg', brandColor: '#1e4f9c' },
        { bankName: 'IDFC First Bank', link: '#', internalApplySlug: 'idfc', logo: '/assets/images/partners/idfc.webp', brandColor: '#7a003c' },
        { bankName: 'Kotak Mahindra Bank', link: '#', internalApplySlug: 'kotak', logo: '/assets/images/Kotak-1.png', brandColor: '#d71920' },
        { bankName: 'HDFC Bank', link: '#', internalApplySlug: 'hdfc', logo: '/assets/images/HDFC.svg', brandColor: '#004c8f' },
        { bankName: 'Axis Bank', link: '#', internalApplySlug: 'axis', logo: '/assets/images/AX.png', brandColor: '#7b0046' },
        { bankName: 'Bajaj Finserv', link: '#', internalApplySlug: 'bajaj', logo: '/assets/images/partners/bajaj.png', brandColor: '#0076b8' },
        { bankName: 'Tata Capital', link: '#', internalApplySlug: 'tata', logo: '/assets/images/partners/tata.png', brandColor: '#2b8fcb' },
        { bankName: 'Aditya Birla Capital', link: '#', internalApplySlug: 'adityabirla', logo: '/assets/images/partners/abfl.webp', brandColor: '#a02030' },
        { bankName: 'Cholamandalam', link: '#', internalApplySlug: 'cholamandalam', logo: '/assets/images/cholamandalam.png', brandColor: '#0d47a1' },
        { bankName: 'Poonawalla Fincorp', link: '#', internalApplySlug: 'poonawalla', logo: '/assets/images/partners/poonawalla.png', brandColor: '#1e88e5' },
        { bankName: 'Piramal Capital', link: '#', internalApplySlug: 'piramal', logo: '/assets/images/Piramal_Finance_logo.svg', brandColor: '#1565c0' },
    ],
    // Loan Against Property: 7 banks + 6 NBFCs
    'loan-against-property': [
        { bankName: 'ICICI Bank', link: '#', internalApplySlug: 'icici', logo: '/assets/images/partners/icici.svg', brandColor: '#b6401e' },
        { bankName: 'IndusInd Bank', link: '#', internalApplySlug: 'indusind', logo: '/assets/images/partners/indusind.jpeg', brandColor: '#C4122E' },
        { bankName: 'YES Bank', link: '#', internalApplySlug: 'yes', logo: '/assets/images/partners/yes.svg', brandColor: '#1e4f9c' },
        { bankName: 'IDFC First Bank', link: '#', internalApplySlug: 'idfc', logo: '/assets/images/partners/idfc.webp', brandColor: '#7a003c' },
        { bankName: 'Kotak Mahindra Bank', link: '#', internalApplySlug: 'kotak', logo: '/assets/images/Kotak-1.png', brandColor: '#d71920' },
        { bankName: 'HDFC Bank', link: '#', internalApplySlug: 'hdfc', logo: '/assets/images/HDFC.svg', brandColor: '#004c8f' },
        { bankName: 'Axis Bank', link: '#', internalApplySlug: 'axis', logo: '/assets/images/AX.png', brandColor: '#7b0046' },
        { bankName: 'Bajaj Finserv', link: '#', internalApplySlug: 'bajaj', logo: '/assets/images/partners/bajaj.png', brandColor: '#0076b8' },
        { bankName: 'Tata Capital', link: '#', internalApplySlug: 'tata', logo: '/assets/images/partners/tata.png', brandColor: '#2b8fcb' },
        { bankName: 'Aditya Birla Capital', link: '#', internalApplySlug: 'adityabirla', logo: '/assets/images/partners/abfl.webp', brandColor: '#a02030' },
        { bankName: 'Cholamandalam', link: '#', internalApplySlug: 'cholamandalam', logo: '/assets/images/cholamandalam.png', brandColor: '#0d47a1' },
        { bankName: 'Poonawalla Fincorp', link: '#', internalApplySlug: 'poonawalla', logo: '/assets/images/partners/poonawalla.png', brandColor: '#1e88e5' },
        { bankName: 'Piramal Capital', link: '#', internalApplySlug: 'piramal', logo: '/assets/images/Piramal_Finance_logo.svg', brandColor: '#1565c0' },
    ],
    // Used Car Loan: only 7 banks (all self-created) – removed random-link NBFCs
    'used-car-loan': [
        { bankName: 'ICICI Bank', link: '#', internalApplySlug: 'icici', logo: '/assets/images/partners/icici.svg', brandColor: '#b6401e' },
        { bankName: 'IndusInd Bank', link: '#', internalApplySlug: 'indusind', logo: '/assets/images/partners/indusind.jpeg', brandColor: '#C4122E' },
        { bankName: 'YES Bank', link: '#', internalApplySlug: 'yes', logo: '/assets/images/partners/yes.svg', brandColor: '#1e4f9c' },
        { bankName: 'IDFC First Bank', link: '#', internalApplySlug: 'idfc', logo: '/assets/images/partners/idfc.webp', brandColor: '#7a003c' },
        { bankName: 'Kotak Mahindra Bank', link: '#', internalApplySlug: 'kotak', logo: '/assets/images/Kotak-1.png', brandColor: '#d71920' },
        { bankName: 'HDFC Bank', link: '#', internalApplySlug: 'hdfc', logo: '/assets/images/HDFC.svg', brandColor: '#004c8f' },
        { bankName: 'Axis Bank', link: '#', internalApplySlug: 'axis', logo: '/assets/images/AX.png', brandColor: '#7b0046' },
    ],
    // Balance Transfer: 7 banks + 6 NBFCs
    'balance-transfer': [
        { bankName: 'ICICI Bank', link: '#', internalApplySlug: 'icici', logo: '/assets/images/partners/icici.svg', brandColor: '#b6401e' },
        { bankName: 'IndusInd Bank', link: '#', internalApplySlug: 'indusind', logo: '/assets/images/partners/indusind.jpeg', brandColor: '#C4122E' },
        { bankName: 'YES Bank', link: '#', internalApplySlug: 'yes', logo: '/assets/images/partners/yes.svg', brandColor: '#1e4f9c' },
        { bankName: 'IDFC First Bank', link: '#', internalApplySlug: 'idfc', logo: '/assets/images/partners/idfc.webp', brandColor: '#7a003c' },
        { bankName: 'Kotak Mahindra Bank', link: '#', internalApplySlug: 'kotak', logo: '/assets/images/Kotak-1.png', brandColor: '#d71920' },
        { bankName: 'HDFC Bank', link: '#', internalApplySlug: 'hdfc', logo: '/assets/images/HDFC.svg', brandColor: '#004c8f' },
        { bankName: 'Axis Bank', link: '#', internalApplySlug: 'axis', logo: '/assets/images/AX.png', brandColor: '#7b0046' },
        { bankName: 'Bajaj Finserv', link: '#', internalApplySlug: 'bajaj', logo: '/assets/images/partners/bajaj.png', brandColor: '#0076b8' },
        { bankName: 'Tata Capital', link: '#', internalApplySlug: 'tata', logo: '/assets/images/partners/tata.png', brandColor: '#2b8fcb' },
        { bankName: 'Aditya Birla Capital', link: '#', internalApplySlug: 'adityabirla', logo: '/assets/images/partners/abfl.webp', brandColor: '#a02030' },
        { bankName: 'Cholamandalam', link: '#', internalApplySlug: 'cholamandalam', logo: '/assets/images/cholamandalam.png', brandColor: '#0d47a1' },
        { bankName: 'Poonawalla Fincorp', link: '#', internalApplySlug: 'poonawalla', logo: '/assets/images/partners/poonawalla.png', brandColor: '#1e88e5' },
        { bankName: 'Piramal Capital', link: '#', internalApplySlug: 'piramal', logo: '/assets/images/Piramal_Finance_logo.svg', brandColor: '#1565c0' },
    ],
    // Professional Loans: 7 banks + 6 NBFCs
    'professional-loans': [
        { bankName: 'ICICI Bank', link: '#', internalApplySlug: 'icici', logo: '/assets/images/partners/icici.svg', brandColor: '#b6401e' },
        { bankName: 'IndusInd Bank', link: '#', internalApplySlug: 'indusind', logo: '/assets/images/partners/indusind.jpeg', brandColor: '#C4122E' },
        { bankName: 'YES Bank', link: '#', internalApplySlug: 'yes', logo: '/assets/images/partners/yes.svg', brandColor: '#1e4f9c' },
        { bankName: 'IDFC First Bank', link: '#', internalApplySlug: 'idfc', logo: '/assets/images/partners/idfc.webp', brandColor: '#7a003c' },
        { bankName: 'Kotak Mahindra Bank', link: '#', internalApplySlug: 'kotak', logo: '/assets/images/Kotak-1.png', brandColor: '#d71920' },
        { bankName: 'HDFC Bank', link: '#', internalApplySlug: 'hdfc', logo: '/assets/images/HDFC.svg', brandColor: '#004c8f' },
        { bankName: 'Axis Bank', link: '#', internalApplySlug: 'axis', logo: '/assets/images/AX.png', brandColor: '#7b0046' },
        { bankName: 'Bajaj Finserv', link: '#', internalApplySlug: 'bajaj', logo: '/assets/images/partners/bajaj.png', brandColor: '#0076b8' },
        { bankName: 'Tata Capital', link: '#', internalApplySlug: 'tata', logo: '/assets/images/partners/tata.png', brandColor: '#2b8fcb' },
        { bankName: 'Aditya Birla Capital', link: '#', internalApplySlug: 'adityabirla', logo: '/assets/images/partners/abfl.webp', brandColor: '#a02030' },
        { bankName: 'Cholamandalam', link: '#', internalApplySlug: 'cholamandalam', logo: '/assets/images/cholamandalam.png', brandColor: '#0d47a1' },
        { bankName: 'Poonawalla Fincorp', link: '#', internalApplySlug: 'poonawalla', logo: '/assets/images/partners/poonawalla.png', brandColor: '#1e88e5' },
        { bankName: 'Piramal Capital', link: '#', internalApplySlug: 'piramal', logo: '/assets/images/Piramal_Finance_logo.svg', brandColor: '#1565c0' },
    ],
}
