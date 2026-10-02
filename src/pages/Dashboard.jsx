import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { LogOut, GraduationCap, Mail, BadgeCheck } from 'lucide-react'
import { PageHero } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import { useAuth } from '../lib/AuthContext.jsx'
import { supabase } from '../lib/supabaseClient.js'

export default function Dashboard() {
  const { user, loading, signOut } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('enrollments')
      .select('*')
      .eq('email', user.email)
      .then(({ data }) => {
        setEnrollments(data || [])
        setLoadingData(false)
      })
  }, [user])

  if (loading) return null
  if (!user) return <Navigate to="/student-portal" replace />

  const role = user.user_metadata?.role || 'student'
  const fullName = user.user_metadata?.full_name || user.email

  return (
    <div>
      <PageHero
        eyebrow={role === 'parent' ? 'Parent Dashboard' : 'Student Dashboard'}
        title={`Welcome, ${fullName.split(' ')[0]}.`}
        description="This is a live account — data here comes straight from your Arjunova backend, not sample content."
      />
      <section className="py-16 md:py-20">
        <div className="container-page grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
          <Reveal>
            <div className="rounded-3xl border border-border/10 p-7">
              <span className="w-12 h-12 rounded-2xl bg-arjuna/10 grid place-items-center text-arjuna">
                <GraduationCap className="w-6 h-6" />
              </span>
              <h3 className="mt-4 font-display font-bold text-lg">{fullName}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-mist">
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-mist">
                <BadgeCheck className="w-3.5 h-3.5" /> {role === 'parent' ? 'Parent account' : 'Student account'}
              </p>
              <button
                onClick={signOut}
                className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-500"
              >
                <LogOut className="w-4 h-4" /> Log out
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display font-bold text-xl mb-4">Your enrollments</h2>
            {loadingData ? (
              <p className="text-sm text-mist">Loading…</p>
            ) : enrollments.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border/20 p-7 text-sm text-mist">
                No enrollments on file yet. Once you register interest in a course from its course page,
                it'll show up here.
              </div>
            ) : (
              <div className="space-y-3">
                {enrollments.map((e) => (
                  <div key={e.id} className="rounded-2xl border border-border/10 p-5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{e.course_name}</p>
                      <p className="text-xs text-mist mt-1">{e.base_price}</p>
                    </div>
                    {e.coupon_code && (
                      <span className="eyebrow text-arjuna text-[10px]">{e.coupon_code}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  )
}