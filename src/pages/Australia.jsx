import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ClipboardCheck, Route, CalendarClock, LineChart } from 'lucide-react'

// Paste your Google Form link here
const ASSESSMENT_FORM_URL = 'https://forms.gle/ALx22QEnj2Yi2p8YA'

const reasons = [
  '1-to-1 personalised lessons',
  'Years 5–10 Mathematics',
  'Homework and concept support',
  'Exam preparation',
  'Flexible online scheduling',
  'Experience with Cambridge, IB, CBSE and other curricula',
]

const steps = [
  { icon: ClipboardCheck, title: 'Free 20-minute assessment', text: 'We find out where your child is now: strengths, gaps and confidence.' },
  { icon: Route, title: 'Personalised learning plan', text: 'You get a clear plan matched to their year level and school curriculum.' },
  { icon: CalendarClock, title: 'Regular 1-to-1 lessons', text: 'Live online sessions at times that suit your family.' },
  { icon: LineChart, title: 'Progress tracking', text: 'You see what has improved and what we are working on next.' },
]

const years = ['Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10']

function CTAButton({ children }) {
  return (
    <a
      href={ASSESSMENT_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full bg-nova px-7 py-3.5 font-body font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nova"
    >
      {children}
    </a>
  )
}

export default function Australia() {
  useEffect(() => {
    document.title = 'Online Maths Tutoring for Australian Students (Years 5–10) | Arjunova'
  }, [])

  return (
    <main className="bg-bg text-ink">
      {/* Hero */}
      <section className="mx-auto max-w-content px-6 pb-20 pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-5 font-body text-lg text-mist">🇦🇺 For Australian students and parents</p>
          <h1 className="font-display text-4xl font-black leading-tight md:text-6xl">
            Online Maths Tutoring for Australian Students
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg text-mist md:text-xl">
            Personalised 1-to-1 Mathematics tutoring for Years 5–10, delivered online by experienced tutors.
          </p>
          <p className="mt-3 font-body font-medium text-ink">
            Years 5–10 &nbsp;|&nbsp; 1-to-1 online classes &nbsp;|&nbsp; Flexible scheduling
          </p>
          <div className="mt-9">
            <CTAButton>Book a free 20-minute Maths assessment</CTAButton>
          </div>
        </motion.div>
      </section>

      {/* Why Arjunova */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-content px-6 py-20">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Why choose Arjunova?</h2>
          <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-3 font-body text-lg">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-nova" aria-hidden="true" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border bg-bg-elevated">
        <div className="mx-auto max-w-content px-6 py-20">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Designed around your child</h2>
          <p className="mt-4 max-w-2xl font-body text-lg text-mist">
            Every student starts with an assessment, so lessons are built on what they actually need.
          </p>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="border-t-2 border-nova pt-5">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-nova" aria-hidden="true" />
                  <span className="font-mono text-sm text-mist">Step {i + 1}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 font-body text-mist">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Subjects + Years */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-content gap-14 px-6 py-20 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">Subject</h2>
            <p className="mt-5 font-display text-2xl font-bold text-nova">Mathematics</p>
            <p className="mt-2 font-body text-mist">More subjects will be added as we grow.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">Who we teach</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {years.map((y) => (
                <span key={y} className="rounded-full border border-border px-5 py-2 font-body font-medium">
                  {y}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-bg-elevated">
        <div className="mx-auto max-w-content px-6 py-20 text-center">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Book a free Maths assessment</h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-mist">
            We will understand your child's current level, identify areas to improve, and recommend a suitable learning plan.
          </p>
          <div className="mt-8">
            <CTAButton>Book your free assessment</CTAButton>
          </div>
        </div>
      </section>
    </main>
  )
}