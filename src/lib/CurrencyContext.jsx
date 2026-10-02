import React, { createContext, useContext, useEffect, useState } from 'react'

const CurrencyContext = createContext(null)

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem('arjunova-currency') || null
  })

  useEffect(() => {
    if (currency) return
    let cancelled = false

    async function detect() {
      try {
        const res = await fetch('https://ipwho.is/')
        const data = await res.json()
        if (!cancelled && data && data.country_code) {
          setCurrency(data.country_code === 'IN' ? 'INR' : 'USD')
          return
        }
        throw new Error('no country code')
      } catch {
        if (cancelled) return
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
          setCurrency(tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta' ? 'INR' : 'USD')
        } catch {
          setCurrency('INR')
        }
      }
    }
    detect()
    return () => {
      cancelled = true
    }
  }, [currency])

  useEffect(() => {
    if (currency) window.localStorage.setItem('arjunova-currency', currency)
  }, [currency])

  const toggleCurrency = () => setCurrency((c) => (c === 'INR' ? 'USD' : 'INR'))

  return (
    <CurrencyContext.Provider value={{ currency: currency || 'INR', setCurrency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}

export function coursePrice(course, currency) {
  return currency === 'USD' ? course.priceUSD : course.priceINR
}