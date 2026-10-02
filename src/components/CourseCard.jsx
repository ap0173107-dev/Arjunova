import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Star } from 'lucide-react'
import { useCurrency, coursePrice } from '../lib/CurrencyContext.jsx'

export default function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group relative block rounded-3xl border border-border/10 p-6 md:p-7 bg-bg-elevated/60 hover:border-nova/40 transition-colors overflow-hidden"
    >
      <span className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full border border-nova/0 group-hover:border-nova/50 group-hover:animate-pulseRing transition-colors" />
      <div className="flex items-start justify-between gap-3">
        <span className="eyebrow text-arjuna">{course.category}</span>
        <span className="flex items-center gap-1 text-xs text-mist">
          <Star className="w-3.5 h-3.5 fill-nova text-nova" /> {course.rating}
        </span>
      </div>
      <h3 className="mt-4 font-display font-bold text-xl leading-snug">{course.name}</h3>
      <p className="mt-2 text-sm text-mist leading-relaxed">{course.tagline}</p>
      <div className="mt-6 flex items-center justify-between text-xs text-mist">
        <span>{course.level}</span>
        <span className="flex items-center gap-1 font-semibold text-ink group-hover:text-nova transition-colors">
          View course <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}
