import React, { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { CheckCircle2, PlayCircle, Star, ArrowRight } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { Eyebrow } from '../components/ui.jsx'
import Quiz from '../components/Quiz.jsx'
import EnrollModal from '../components/EnrollModal.jsx'
import { courses } from '../data/courses.js'
import { quizzes } from '../data/quizzes.js'
import { useCurrency, coursePrice } from '../lib/CurrencyContext.jsx'

export default function CourseDetail() {
  const { slug } = useParams()
  const course = courses.find((c) => c.slug === slug)
  const { currency, toggleCurrency } = useCurrency()
  const [enrollOpen, setEnrollOpen] = useState(false)

  if (!course) return <Navigate to="/courses" replace />
  const quiz = quizzes[course.slug]

  return (
    <div>
      <section className="pt-14 pb-16 md:pt-20 md:pb-20 border-b border-border/10">
        <div className="container-page">
          <Reveal>
            <Eyebrow>{course.category}</Eyebrow>
            <h1 className="mt-4 font-display font-extrabold text-4xl md:text-5xl leading-[1.05] max-w-2xl">
              {course.name}
            </h1>
            <p className="mt-5 text-base md:text-lg text-mist max-w-2xl leading-relaxed">{course.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-mist">Level</span>
                <p className="font-semibold">{course.level}</p>
              </div>
              <div>
                <span className="text-mist">Duration</span>
                <p className="font-semibold">{course.duration}</p>
              </div>
              <div>
                <span className="text-mist">Rating</span>
                <p className="font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-nova text-nova" /> {course.rating}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page grid lg:grid-cols-[1.3fr_0.9fr] gap-14">
          <div className="space-y-16">
            <Reveal>
              <h2 className="font-display font-bold text-2xl mb-4">Overview</h2>
              <p className="text-mist leading-relaxed">{course.overview}</p>
            </Reveal>

            <Reveal>
              <h2 className="font-display font-bold text-2xl mb-5">Curriculum</h2>
              <ul className="space-y-3">
                {course.curriculum.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink/85">
                    <CheckCircle2 className="w-4 h-4 text-arjuna mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-display font-bold text-2xl mb-5">Demo Video</h2>
              <button className="w-full aspect-video rounded-3xl border border-border/10 bg-bg-elevated/50 grid place-items-center group hover:border-nova/40 transition-colors">
                <span className="w-16 h-16 rounded-full bg-nova/15 grid place-items-center group-hover:bg-nova/25 transition-colors">
                  <PlayCircle className="w-8 h-8 text-nova" />
                </span>
              </button>
            </Reveal>

            {quiz && (
              <Reveal>
                <h2 className="font-display font-bold text-2xl mb-2">Try a Practice Question Set</h2>
                <p className="text-sm text-mist mb-5">A quick 3-question taste of what our classes drill on.</p>
                <Quiz quiz={quiz} />
              </Reveal>
            )}

            <Reveal>
              <h2 className="font-display font-bold text-2xl mb-5">Faculty</h2>
              <div className="flex flex-wrap gap-4">
                {course.faculty.map((role) => (
                  <div key={role} className="flex items-center gap-3 rounded-2xl border border-border/10 px-4 py-3">
                    <div className="w-9 h-9 rounded-full bg-arjuna/10 grid place-items-center font-display font-bold text-arjuna text-sm">
                      {role.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{role}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display font-bold text-2xl mb-5">FAQs</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold">Can I switch batches after enrolling?</p>
                  <p className="text-mist mt-1">Yes, subject to seat availability in the target batch.</p>
                </div>
                <div>
                  <p className="font-semibold">Is study material included?</p>
                  <p className="text-mist mt-1">Yes — notes, formula sheets and past papers are included in the fee.</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-7 sticky top-24">
              <p className="eyebrow text-arjuna">Course Fee</p>
              <p className="mt-2 font-display font-extrabold text-3xl">{coursePrice(course, currency)}</p>
              <button onClick={toggleCurrency} className="mt-1 text-xs text-mist underline underline-offset-2">
                Show in {currency === 'INR' ? 'USD' : 'INR'}
              </button>
              <button
                onClick={() => setEnrollOpen(true)}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-nova text-[#1B2130] font-semibold px-6 py-3.5 hover:brightness-105 transition-all"
              >
                Enroll Now <ArrowRight className="w-4 h-4" />
              </button>
              <p className="mt-4 text-xs text-mist text-center">Free diagnostic session before you commit.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {enrollOpen && <EnrollModal course={course} onClose={() => setEnrollOpen(false)} />}
    </div>
  )
}