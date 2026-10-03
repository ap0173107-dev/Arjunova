import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Target, Cpu, ShieldCheck, Plus, Minus, Calendar, Globe2, GraduationCap, Sparkles } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import CourseCard from '../components/CourseCard.jsx'
import FloatingVideoCard from '../components/FloatingVideoCard.jsx'
import { Eyebrow } from '../components/ui.jsx'
import { courses } from '../data/courses.js'
import { faculty, testimonials, blogPosts, events } from '../data/content.js'
import Seo from '../components/seo.jsx'

const pillars = [
  {
    icon: Target,
    title: 'Precision teaching',
    body: 'Every course is built around a specific exam or curriculum, not a generic syllabus — so class time maps directly to what\u2019s tested.',
  },
  {
    icon: Cpu,
    title: 'Built on technology',
    body: 'Attendance, tests, notes and progress reports run through a single student system from day one — the same foundation our future AI tools will extend.',
  },
  {
    icon: ShieldCheck,
    title: 'Accountable results',
    body: 'Weekly analytics for students and parents alike. Progress isn\u2019t a feeling here, it\u2019s a number you can check.',
  },
]

const heroChips = [
  { icon: Globe2, label: 'Fully online, worldwide' },
  { icon: GraduationCap, label: 'Class 1 to competitive exams' },
  { icon: Sparkles, label: 'Indian & international curricula' },
]

const faqs = [
  {
    q: 'Which boards, exams and class levels does Arjunova cover?',
    a: 'Everything from Class 1 foundation subjects through CBSE, ICSE, Cambridge (IGCSE/A-Level) and IB school tuition, plus dedicated tracks for IIT JEE, NEET, Olympiads, SAT, AP, GRE and GMAT.',
  },
  {
    q: 'Do you teach students outside India?',
    a: 'Yes — Arjunova is a fully online academic team teaching Indian and international students alike, including IB and Cambridge curricula used worldwide.',
  },
  {
    q: 'How do parents track progress?',
    a: 'Every enrolled family gets access to the Parent Portal — attendance, test scores, fee status and direct teacher messaging in one dashboard.',
  },
  {
    q: 'Is there a free trial before enrolling?',
    a: 'Yes. Every course includes a free diagnostic session so you can experience the teaching style and get a baseline before committing.',
  },
]

function FaqItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border/10 py-5">
      <Seo
  title="Online Tutoring — CBSE, ICSE, Cambridge, IB, JEE, NEET"
  description="Arjunova offers online tuition for Class 1–12, JEE, NEET, Cambridge and IB — live classes with expert faculty, for Indian and international students."
  path="/"
/>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left gap-4"
      >
        <span className="font-display font-semibold text-base md:text-lg">{item.q}</span>
        <span className="shrink-0 w-7 h-7 grid place-items-center rounded-full border border-border/15 text-nova">
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>
      {open && <p className="mt-3 text-sm text-mist leading-relaxed max-w-2xl">{item.a}</p>}
    </div>
  )
}

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="container-page grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <Reveal>
            <Eyebrow>Learn · Innovate · Excel</Eyebrow>
            <h1 className="mt-5 font-display font-extrabold text-[2.6rem] leading-[1.05] md:text-6xl md:leading-[1.05]">
              Precision-built learning,{' '}
              <span className="text-gradient-nova">for every exam that matters.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-mist max-w-xl leading-relaxed">
              Arjunova is a fully online academic team teaching Indian and
              international students — board-aligned teaching for CBSE, ICSE,
              Cambridge and IB from Class 1 onward, dedicated tracks for JEE
              and NEET, and the foundation for the AI-powered learning tools
              we're building next.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-full bg-nova text-[#1B2130] font-semibold px-6 py-3.5 hover:brightness-105 transition-all"
              >
                Explore Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border/20 font-semibold px-6 py-3.5 hover:border-nova/50 transition-colors"
              >
                Book a Free Demo
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              {heroChips.map((c) => (
                <span
                  key={c.label}
                  className="flex items-center gap-2 rounded-full border border-border/12 bg-bg-elevated/50 px-4 py-2 text-xs font-medium text-ink/80"
                >
                  <c.icon className="w-3.5 h-3.5 text-nova" /> {c.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative aspect-square max-w-md mx-auto w-full">
            <div className="absolute inset-0 grid place-items-center">
              <div className="absolute w-full h-full rounded-full border border-nova/15 animate-spinSlow" />
              <div className="absolute w-[75%] h-[75%] rounded-full border border-arjuna/20 animate-spinSlowReverse" />
              <div className="absolute w-[50%] h-[50%] rounded-full border border-dashed border-nova/25" />
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-nova/70 animate-drift"
                  style={{
                    top: `${15 + i * 12}%`,
                    left: `${10 + ((i * 37) % 80)}%`,
                    animationDelay: `${i * 0.6}s`,
                  }}
                />
              ))}
              <img src="/brand/arjunova-icon.png" alt="Arjunova" className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-xl" />
            </div>

            {/* Floating video previews */}
            <FloatingVideoCard
              label="Live Class Preview"
              sublabel="IB Maths · AA HL"
              className="hidden lg:flex absolute -left-10 top-6"
              duration={6.5}
            />
            <FloatingVideoCard
              label="Demo Session"
              sublabel="JEE Physics"
              className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2"
              duration={7.5}
              delay={0.8}
            />
            <FloatingVideoCard
              label="Student Testimonial"
              sublabel="NEET Biology"
              className="hidden lg:flex absolute -left-4 bottom-2"
              duration={8}
              delay={1.4}
            />
          </Reveal>
        </div>
      </section>

      {/* WHY ARJUNOVA */}
      <section className="py-20 md:py-28 border-t border-border/10">
        <div className="container-page">
          <Reveal>
            <Eyebrow>Why Arjunova</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl max-w-xl">
              Coaching with a technology company's discipline.
            </h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="rounded-3xl border border-border/10 p-7 h-full bg-bg-elevated/50">
                  <div className="w-11 h-11 rounded-2xl bg-nova/10 grid place-items-center">
                    <p.icon className="w-5 h-5 text-nova" />
                  </div>
                  <h3 className="mt-6 font-display font-bold text-lg">{p.title}</h3>
                  <p className="mt-3 text-sm text-mist leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES OVERVIEW */}
      <section className="py-20 md:py-28 border-t border-border/10">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Courses</Eyebrow>
              <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl">Choose your track.</h2>
            </div>
            <Link to="/courses" className="flex items-center gap-1 text-sm font-semibold text-nova">
              View all courses <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT SUCCESS / TESTIMONIALS */}
      <section className="py-20 md:py-28 border-t border-border/10">
        <div className="container-page">
          <Reveal>
            <Eyebrow>Student Success</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl max-w-xl">
              In their words.
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.tag} delay={i * 0.06}>
                <div className="glass rounded-3xl p-7 h-full">
                  <p className="text-base md:text-lg leading-relaxed font-display">"{t.quote}"</p>
                  <p className="mt-6 text-xs eyebrow text-arjuna">{t.tag}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED FACULTY */}
      <section className="py-20 md:py-28 border-t border-border/10">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Featured Faculty</Eyebrow>
              <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl">Taught by people who've done it.</h2>
            </div>
            <Link to="/faculty" className="flex items-center gap-1 text-sm font-semibold text-nova">
              Meet the full team <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible">
            {faculty.slice(0, 4).map((f, i) => (
              <Reveal key={f.role} delay={i * 0.05} className="snap-start shrink-0 w-64 md:w-auto">
                <div className="rounded-3xl border border-border/10 p-6 h-full bg-bg-elevated/50">
                  <div className="w-14 h-14 rounded-2xl bg-arjuna/10 grid place-items-center text-arjuna">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="mt-5 font-display font-bold">{f.role}</h3>
                  <p className="text-xs text-nova mt-1">{f.subject}</p>
                  <p className="text-xs text-mist mt-3 leading-relaxed">{f.qualification}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING BATCHES / EVENTS */}
      <section className="py-20 md:py-28 border-t border-border/10">
        <div className="container-page">
          <Reveal>
            <Eyebrow>Upcoming Batches</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl max-w-xl">
              Reserve your seat before the batch fills.
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {events.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <div className="rounded-3xl border border-border/10 p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-mist">
                    <Calendar className="w-3.5 h-3.5 text-nova" /> {e.date}
                  </div>
                  <h3 className="mt-4 font-display font-bold text-lg leading-snug flex-1">{e.title}</h3>
                  <p className="mt-4 text-xs eyebrow text-arjuna">{e.mode}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST BLOGS */}
      <section className="py-20 md:py-28 border-t border-border/10">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>From the Blog</Eyebrow>
              <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl">Reading for students and parents.</h2>
            </div>
            <Link to="/blog" className="flex items-center gap-1 text-sm font-semibold text-nova">
              Visit the blog <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.06}>
                <Link to="/blog" className="block rounded-3xl border border-border/10 p-6 h-full hover:border-nova/40 transition-colors">
                  <span className="eyebrow text-arjuna">{b.category}</span>
                  <h3 className="mt-4 font-display font-bold text-lg leading-snug">{b.title}</h3>
                  <p className="mt-3 text-sm text-mist leading-relaxed">{b.excerpt}</p>
                  <p className="mt-5 text-xs text-mist">{b.date}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 border-t border-border/10">
        <div className="container-page grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-3xl md:text-4xl">Good to know.</h2>
            <p className="mt-4 text-sm text-mist max-w-sm leading-relaxed">
              Can't find your answer? <Link to="/contact" className="text-nova font-semibold">Reach out</Link> and
              we'll get back within a day.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              {faqs.map((f) => (
                <FaqItem key={f.q} item={f} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="pb-24 md:pb-32">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1B2130] text-white p-10 md:p-16 text-center">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-nova/20 blur-3xl" />
              <img src="/brand/arjunova-icon.png" alt="Arjunova" className="relative w-12 h-12 mx-auto object-contain" />
              <h2 className="relative mt-6 font-display font-extrabold text-3xl md:text-5xl leading-tight max-w-2xl mx-auto">
                Start with a free diagnostic session.
              </h2>
              <p className="relative mt-4 text-white/70 max-w-lg mx-auto">
                No commitment. Just a clear picture of where your child stands, and what precision teaching looks like — for any class level, anywhere in the world.
              </p>
              <Link
                to="/contact"
                className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-nova text-[#1B2130] font-semibold px-7 py-3.5 hover:brightness-105 transition-all"
              >
                Book Free Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
