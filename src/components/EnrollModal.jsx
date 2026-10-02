import React, { useState } from 'react'
import { X, Tag, CheckCircle2, ArrowRight } from 'lucide-react'
import { supabase, supabaseConfigured } from '../lib/supabaseClient.js'
import { findCoupon } from '../data/coupons.js'
import { coursePrice, useCurrency } from '../lib/CurrencyContext.jsx'

export default function EnrollModal({ course, onClose }) {
  const { currency } = useCurrency()
  const [form, setForm] = useState({ name: '', email: '', phone: '', coupon: '' })
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponMsg, setCouponMsg] = useState('')
  const [status, setStatus] = useState('idle') // idle | saving | done | error

  const basePrice = coursePrice(course, currency)

  const applyCoupon = () => {
    const found = findCoupon(form.coupon)
    if (found) {
      setAppliedCoupon(found)
      setCouponMsg(`Applied: ${found.label}`)
    } else {
      setAppliedCoupon(null)
      setCouponMsg('Coupon not recognized')
    }
  }

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('saving')

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      course_slug: course.slug,
      course_name: course.name,
      currency,
      base_price: basePrice,
      coupon_code: appliedCoupon?.code || null,
      discount_percent: appliedCoupon?.percentOff || 0,
    }

    try {
      if (supabaseConfigured) {
        const { error } = await supabase.from('enrollments').insert(payload)
        if (error) throw error
      } else {
        await fetch('https://formspree.io/f/xrewdero', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      setStatus('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const whatsappHref = `https://wa.me/919875544837?text=${encodeURIComponent(
    `Hi Arjunova! I just registered interest in ${course.name} (${basePrice}${
      appliedCoupon ? `, coupon ${appliedCoupon.code}` : ''
    }). My name is ${form.name || '___'}.`
  )}`

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-md glass rounded-3xl border border-border/10 shadow-2xl p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-5 right-5 w-8 h-8 grid place-items-center rounded-full hover:bg-border/10">
          <X className="w-4 h-4" />
        </button>

        {status === 'done' ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-10 h-10 text-arjuna mx-auto" />
            <h3 className="mt-4 font-display font-bold text-xl">You're on the list.</h3>
            <p className="mt-2 text-sm text-mist">
              We've saved your details for <strong>{course.name}</strong>. Finish up on WhatsApp to lock your
              seat and get the payment link.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-nova text-[#1B2130] font-semibold px-6 py-3 hover:brightness-105 transition-all"
            >
              Continue on WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <>
            <p className="eyebrow text-arjuna">Enroll</p>
            <h3 className="mt-2 font-display font-bold text-xl leading-snug">{course.name}</h3>
            <p className="mt-1 text-sm text-mist">
              {appliedCoupon ? (
                <>
                  <span className="line-through mr-2">{basePrice}</span>
                  <span className="text-arjuna font-semibold">{appliedCoupon.percentOff}% off applied</span>
                </>
              ) : (
                basePrice
              )}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                name="name" required placeholder="Full name" value={form.name} onChange={handleChange}
                className="w-full rounded-xl border border-border/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-nova/50"
              />
              <input
                name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange}
                className="w-full rounded-xl border border-border/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-nova/50"
              />
              <input
                name="phone" required placeholder="Phone / WhatsApp" value={form.phone} onChange={handleChange}
                className="w-full rounded-xl border border-border/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-nova/50"
              />
              <div>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 rounded-xl border border-border/15 px-4">
                    <Tag className="w-4 h-4 text-mist shrink-0" />
                    <input
                      name="coupon" placeholder="Coupon code (optional)" value={form.coupon} onChange={handleChange}
                      className="w-full bg-transparent py-3 text-sm outline-none"
                    />
                  </div>
                  <button type="button" onClick={applyCoupon} className="rounded-xl border border-border/15 px-4 text-sm font-medium hover:border-nova/50">
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p className={`mt-1.5 text-xs ${appliedCoupon ? 'text-arjuna' : 'text-mist'}`}>{couponMsg}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'saving'}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-nova text-[#1B2130] font-semibold px-6 py-3.5 hover:brightness-105 transition-all disabled:opacity-60"
              >
                {status === 'saving' ? 'Submitting…' : 'Reserve my seat'} <ArrowRight className="w-4 h-4" />
              </button>
              {status === 'error' && (
                <p className="text-xs text-red-500 text-center">
                  Something went wrong — message us on WhatsApp instead.
                </p>
              )}
              <p className="text-[11px] text-mist text-center">
                No payment now — this reserves your spot for a free diagnostic session first.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}