import React from 'react'
import { Link } from 'react-router-dom'
import {
  Globe2, ClipboardList, UserPlus, MapPinned, LayoutDashboard,
  Video, Megaphone, MessageCircle, ArrowRight,
} from 'lucide-react'
import { PageHero } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'

const services = [
  { icon: Globe2, title: 'Website Development', body: 'Premium, fast, mobile-first websites built for coaching institutes and schools.' },
  { icon: ClipboardList, title: 'Student Enquiry Forms', body: 'Smart enquiry forms that capture leads and route them straight to your team.' },
  { icon: UserPlus, title: 'Online Admission Systems', body: 'End-to-end digital admissions — applications, document uploads, approvals.' },
  { icon: MapPinned, title: 'Google Business Optimization', body: 'Rank higher in local search and maps for the courses you actually teach.' },
  { icon: LayoutDashboard, title: 'Student Management', body: 'Attendance, fees, tests and progress reports in one dashboard for your staff.' },
  { icon: Video, title: 'Online Classes', body: 'Live and recorded class infrastructure, built for how your institute teaches.' },
  { icon: Megaphone, title: 'Digital Marketing', body: 'Ads, SEO and content that bring the right students to your enquiry form.' },
  { icon: MessageCircle, title: 'WhatsApp Automation', body: 'Automated reminders, fee alerts and enquiry follow-ups on WhatsApp.' },
]

export default function Services() {
  return (
    <div>
      <Seo
        title="Technology Services for Coaching Institutes & Schools"
        description="Website development, admission systems, student management, digital marketing and WhatsApp automation — built for educational institutes and coaching centers."
        path="/services"
      />
      <PageHero
        eyebrow="Services"
        title="Technology & growth solutions, built for institutes like yours."
        description="Arjunova also builds the software and marketing infrastructure behind coaching institutes and schools — everything from your website to your admissions to the ads that bring students in."
      />

      <section className="py-16 md:py-20">
        <div className="container-page">
          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <div key={s.title} className="rounded-3xl border border-border/10 p-6">
                <span className="w-11 h-11 rounded-2xl bg-nova/10 grid place-items-center">
                  <s.icon className="w-5 h-5 text-nova" />
                </span>
                <h3 className="mt-5 font-display font-bold text-base leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{s.body}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 rounded-[2.5rem] bg-[#1B2130] text-white p-10 md:p-14 text-center">
              <p className="eyebrow text-nova">For Educational Institutes & Coaching Centers</p>
              <h2 className="mt-4 font-display font-extrabold text-2xl md:text-4xl leading-tight max-w-xl mx-auto">
                See the complete solution, built specifically for running a coaching institute.
              </h2>
              <p className="mt-4 text-white/70 max-w-lg mx-auto">
                One detailed page covering every service above — what's included, how it works, and how to get started.
              </p>
              <Link
                to="/solutions/educational-institutes"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-nova text-[#1B2130] font-semibold px-7 py-3.5 hover:brightness-105 transition-all"
              >
                View Solutions for Institutes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}