import React from 'react'
import {
  Globe2, ClipboardList, UserPlus, MapPinned, LayoutDashboard,
  Video, Megaphone, MessageCircle, CheckCircle2, ArrowRight,
} from 'lucide-react'
import { PageHero } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'

const solutions = [
  {
    icon: Globe2,
    title: 'Website Development',
    body: 'A premium, fast, mobile-first website for your institute — built to convert visitors into enquiries, not just look good.',
    includes: [
      'Custom design for your brand, not a generic template',
      'Course pages, faculty profiles, testimonials, fee details',
      'Mobile-optimized and fast-loading',
      'Dark/light mode, SEO-ready from day one',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Student Enquiry Forms',
    body: 'Smart enquiry forms placed where prospective students actually look, routed straight to your team so no lead sits unanswered.',
    includes: [
      'Forms embedded on every course/landing page',
      'Instant notification to your email or WhatsApp',
      'Enquiry source tracking (which page, which course)',
      'No enquiry lost to a spreadsheet nobody checks',
    ],
  },
  {
    icon: UserPlus,
    title: 'Online Admission Systems',
    body: 'Take admissions online end-to-end — applications, document uploads, approvals — instead of chasing paperwork.',
    includes: [
      'Online application forms with document upload',
      'Admin dashboard to review and approve applications',
      'Automatic confirmation emails to students',
      'Status tracking so nothing falls through the cracks',
    ],
  },
  {
    icon: MapPinned,
    title: 'Google Business Optimization',
    body: 'Show up when local parents and students search for coaching near them — most institutes are invisible here by default.',
    includes: [
      'Google Business Profile setup and optimization',
      'Review generation strategy',
      'Local SEO for your service area and courses',
      'Map pack visibility for "coaching near me" searches',
    ],
  },
  {
    icon: LayoutDashboard,
    title: 'Student Management',
    body: 'Attendance, fees, tests and progress reports in one dashboard — for your staff, your students, and their parents.',
    includes: [
      'Attendance and test-score tracking',
      'Fee status visible to parents in real time',
      'Teacher-to-parent communication built in',
      'One login per role: student, parent, faculty, admin',
    ],
  },
  {
    icon: Video,
    title: 'Online Classes',
    body: 'Live and recorded class infrastructure built around how your institute actually teaches, not a generic video tool.',
    includes: [
      'Live class scheduling and links',
      'Recorded class library for revision',
      'Notes and resources attached per class',
      'Works whether you teach online, offline, or both',
    ],
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    body: 'Ads, SEO and content built to bring the right students to your enquiry form — not just traffic for its own sake.',
    includes: [
      'Google and Meta ad campaigns targeted to your courses',
      'SEO content matched to real parent/student searches',
      'Landing pages built to convert, not just inform',
      'Monthly reporting on what\u2019s actually working',
    ],
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Automation',
    body: 'Automated reminders, fee alerts and enquiry follow-ups on the channel parents and students actually check.',
    includes: [
      'Automatic enquiry follow-up messages',
      'Fee due and class reminders',
      'Broadcast announcements to batches',
      'No manual messaging for routine updates',
    ],
  },
]

export default function EducationalSolutions() {
  const whatsappHref = `https://wa.me/919875544837?text=${encodeURIComponent(
    "Hi! I run a coaching institute and I'd like to know more about Arjunova's solutions for institutes."
  )}`

  return (
    <div>
      <Seo
        title="Website, Admissions & Marketing Solutions for Coaching Institutes"
        description="A complete technology and growth package for educational institutes: website development, online admissions, student management, digital marketing and WhatsApp automation."
        path="/solutions/educational-institutes"
      />
      <PageHero
        eyebrow="For Educational Institutes & Coaching Centers"
        title="Everything your institute needs to run and grow online."
        description="Built by a team that also runs its own online coaching brand — these are the exact systems Arjunova uses, now available for your institute."
      />

      <section className="py-16 md:py-20">
        <div className="container-page space-y-8">
          {solutions.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <div className="rounded-3xl border border-border/10 p-7 md:p-9 grid md:grid-cols-[auto_1fr] gap-6 items-start">
                <span className="w-14 h-14 rounded-2xl bg-nova/10 grid place-items-center shrink-0">
                  <s.icon className="w-6 h-6 text-nova" />
                </span>
                <div>
                  <h2 className="font-display font-bold text-xl">{s.title}</h2>
                  <p className="mt-2 text-sm text-mist leading-relaxed max-w-2xl">{s.body}</p>
                  <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink/85">
                        <CheckCircle2 className="w-4 h-4 text-arjuna mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1B2130] text-white p-10 md:p-16 text-center">
              <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-tight max-w-2xl mx-auto">
                Let's talk about your institute.
              </h2>
              <p className="mt-4 text-white/70 max-w-lg mx-auto">
                Tell us what you're running today and where it's falling short — we'll tell you honestly what would help.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-nova text-[#1B2130] font-semibold px-7 py-3.5 hover:brightness-105 transition-all"
              >
                Chat on WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}