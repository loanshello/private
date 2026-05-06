'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BankOffer } from '@/data/bankOffers'
import { useLanguage } from '@/contexts/LanguageContext'

export type LoanCategorySlug = 'personal-loans' | 'business-loans' | 'instant-loan' | 'credit-cards' | 'home-loans' | 'gold-loans' | 'education-loans' | 'insurance' | 'overdraft' | 'overdraft-salaried' | 'overdraft-self-employed' | 'loan-against-property' | 'used-car-loan' | 'balance-transfer' | 'professional-loans'

interface BankListProps {
    offers: BankOffer[]
    categoryTitle: React.ReactNode
    loanCategory?: LoanCategorySlug
}

interface RequirementEntry {
    loanCategory: string
    bankName: string
    requirements: string[]
}

function ReqItem({ text }: { text: string }) {
    return (
        <li>
            <svg className="req-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {text}
        </li>
    )
}

function AutoScrollList({ reqs }: { reqs: string[] }) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const paused = useRef(false)
    const rafId = useRef<number>(0)

    useEffect(() => {
        let cancelled = false

        function step() {
            if (cancelled) return
            const el = wrapperRef.current
            if (!el || paused.current) {
                rafId.current = requestAnimationFrame(step)
                return
            }
            const halfHeight = el.scrollHeight / 2
            if (halfHeight <= el.clientHeight) {
                rafId.current = requestAnimationFrame(step)
                return
            }

            el.scrollTop += 0.5
            if (el.scrollTop >= halfHeight) {
                el.scrollTop -= halfHeight
            }

            rafId.current = requestAnimationFrame(step)
        }

        const timer = setTimeout(() => {
            rafId.current = requestAnimationFrame(step)
        }, 500)

        return () => {
            cancelled = true
            clearTimeout(timer)
            cancelAnimationFrame(rafId.current)
        }
    }, [])

    return (
        <div
            ref={wrapperRef}
            className="requirements-list-wrapper requirements-autoscroll"
            onMouseEnter={() => { paused.current = true }}
            onMouseLeave={() => { paused.current = false }}
        >
            <ul className="requirements-list">
                {reqs.map((req, i) => <ReqItem key={i} text={req} />)}
            </ul>
            <ul className="requirements-list requirements-clone" aria-hidden="true">
                {reqs.map((req, i) => <ReqItem key={`c-${i}`} text={req} />)}
            </ul>
        </div>
    )
}

export default function BankList({ offers, categoryTitle, loanCategory }: BankListProps) {
    const { t } = useLanguage()
    const [reqMap, setReqMap] = useState<Record<string, string[]>>({})

    useEffect(() => {
        fetch('/api/requirements/sheets')
            .then((r) => r.json())
            .then((data) => {
                if (!data.requirements?.length) return
                const map: Record<string, string[]> = {}
                data.requirements.forEach((entry: RequirementEntry) => {
                    const key = `${entry.loanCategory}::${entry.bankName}`
                    map[key] = entry.requirements
                })
                setReqMap(map)
            })
            .catch(() => {})
    }, [])

    const getRequirements = (bankName: string): string[] => {
        if (!loanCategory) return []
        const categoryKey = loanCategory === 'loan-against-property' ? 'secure-loans' : loanCategory
        return reqMap[`${categoryKey}::${bankName}`] || []
    }

    return (
        <div className="bank-list-section">
            <h2 className="bank-list-title">
                {categoryTitle}
            </h2>
            <div className="bank-tiles-grid">
                {offers.map((offer, index) => {
                    const reqs = getRequirements(offer.bankName)
                    const needsScroll = reqs.length > 4
                    return (
                        <div
                            key={index}
                            className="bank-tile"
                            style={
                                offer.brandColor
                                    ? ({ ['--bank-color' as string]: offer.brandColor } as React.CSSProperties)
                                    : undefined
                            }
                        >
                            <div className="bank-tile-header">
                                <h3 className="bank-tile-name">
                                    <span className="bank-tile-logo-wrap">
                                        {offer.logo ? (
                                            <Image
                                                src={offer.logo}
                                                alt={offer.bankName}
                                                width={40}
                                                height={40}
                                                className="bank-tile-logo-img"
                                            />
                                        ) : (
                                            <span className="bank-tile-logo-fallback">
                                                {offer.bankName.charAt(0)}
                                            </span>
                                        )}
                                    </span>
                                    {offer.bankName}
                                </h3>
                                {offer.description && (
                                    <p className="bank-tile-description">
                                        {offer.description}
                                    </p>
                                )}
                            </div>

                            {reqs.length > 0 && (
                                <div className={`bank-tile-requirements ${needsScroll ? 'requirements-scrollable' : ''}`}>
                                    <p className="requirements-title">Requirements:</p>
                                    {needsScroll ? (
                                        <AutoScrollList reqs={reqs} />
                                    ) : (
                                        <ul className="requirements-list">
                                            {reqs.map((req, i) => (
                                                <li key={i}>
                                                    <svg className="req-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}

                            {offer.internalApplySlug && loanCategory ? (
                                <Link
                                    href={`/apply/${offer.internalApplySlug}?loanType=${loanCategory}`}
                                    className="bank-tile-apply-btn"
                                >
                                    Apply Now
                                    <svg className="icon-arrow-right" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            ) : (
                                <a
                                    href={offer.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bank-tile-apply-btn"
                                >
                                    Apply Now
                                    <svg className="icon-arrow-right" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
