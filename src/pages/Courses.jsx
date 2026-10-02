import React, { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { PageHero } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import CourseCard from '../components/CourseCard.jsx'
import { courses, categories } from '../data/courses.js'

export default function Courses() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const filterLabels = ['All', ...categories.map((c) => c.label)]

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const inCategory = active === 'All' || c.category === active
      const inSearch =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.tagline.toLowerCase().includes(query.toLowerCase()) ||
        c.level.toLowerCase().includes(query.toLowerCase())
      return inCategory && inSearch
    })
  }, [active, query])

  return (
    <div>
      <PageHero
        eyebrow="Courses"
        title="Every track we teach, in one place."
        description="From board-aligned school tuition to entrance-exam intensives and future-skills programmes — pick a track and see the full curriculum, faculty and pricing."
      />
      <section className="py-16 md:py-20">
        <div className="container-page">
          <Reveal className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 rounded-full border border-border/15 px-4 py-2.5 flex-1 max-w-sm">
              <Search className="w-4 h-4 text-mist" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses (e.g. JEE, Class 5, coding)"
                className="bg-transparent text-sm outline-none flex-1 placeholder:text-mist/70"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filterLabels.map((label) => (
                <button
                  key={label}
                  onClick={() => setActive(label)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    active === label
                      ? 'bg-nova text-[#1B2130] border-nova'
                      : 'border-border/15 text-ink/75 hover:border-nova/40'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.04}>
                <CourseCard course={c} />
              </Reveal>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-mist col-span-full">No courses match that search yet — try a different term.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}