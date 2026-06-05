import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { BankRatesProvider } from '@/contexts/BankRatesContext'
import ChatBotWrapper from '@/components/ChatBotWrapper'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Helloans - Fastest Way To Get Money',
  description: 'Providing the best future for your best living. Get instant loans, personal loans, business loans, and more.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <LanguageProvider>
          <BankRatesProvider>
            {/* Vector Background Container - Available on all pages */}
            <div className="vector-background" id="vectorBackground"></div>
            {children}
            {/* Floating ChatBot */}
            <ChatBotWrapper />
          </BankRatesProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
