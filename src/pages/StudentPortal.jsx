import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PageHero } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import { LayoutDashboard, CalendarCheck, FileText, BookOpen, ClipboardList, Award, Bell, Lock, AlertTriangle } from 'lucide-react'
import { useAuth } from '../lib/AuthContext.jsx'

const studentFeatures = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: CalendarCheck, label: 'Attendance' },
  { icon: FileText, label: 'Assignments' },
  { icon: BookOpen, label: 'Notes' },
  { icon: ClipboardList, label: 'Tests' },
  { icon: Award, label: 'Certificates' },
]

const parentFeatures = [
  { icon: LayoutDashboard, label: "Child's Performance" },
  { icon: CalendarCheck, label: 'Attendance' },
  { icon: FileText, label: 'Fee Status' },
  { icon: Bell, label: 'Teacher Communication' },
  { icon: ClipboardList, label: 'Reports' },
]

export default function StudentPortal() {
  const [tab, setTab] = useState('student')
  const [mode, setMode] = useState('login') // login | signup
  const [form, setForm] = useState({ fullName: '', email: '', password: '', childEmail: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, signIn, signUp, configured } = useAuth()
  const navigate = useNavigate()

  const features = tab === 'student' ? studentFeatures : parentFeatures

  if (user) return <Navigate to="/dashboard" replace />

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const action =
      mode === 'signup'
        ? signUp({
            email: form.email,
            password: form.password,
            fullName: form.fullName,
            role: tab,
            childEmail: tab === 'parent' ? form.childEmail : undefined,
          })
        : signIn({ email: form.email, password: form.password })
    const { error: err } = await action
    setLoading(false)
    if (err) {
      setError(err.message)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div>
      <PageHero
        eyebrow="Student & Parent Portal"
        title="Your dashboard for everything Arjunova."
        description="Attendance, tests, assignments and progress reports, in one login. The full feature set below is rolling out gradually — login and a basic dashboard are live now."
      />

      <section className="py-16 md:py-20">
        <div className="container-page grid lg:grid-cols-[1fr_0.85fr] gap-14 items-start">
          <div>
            <Reveal className="flex gap-2">
              <button
                onClick={() => setTab('student')}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${tab === 'student' ? 'bg-nova text-[#1B2130] border-nova' : 'border-border/15 text-ink/70'}`}
              >
                Student Portal
              </button>
              <button
                onClick={() => setTab('parent')}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${tab === 'parent' ? 'bg-nova text-[#1B2130] border-nova' : 'border-border/15 text-ink/70'}`}
              >
                Parent Portal
              </button>
            </Reveal>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <Reveal key={f.label} delay={i * 0.04}>
                  <div className="rounded-2xl border border-border/10 p-5 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-nova/10 grid place-items-center shrink-0">
                      <f.icon className="w-4 h-4 text-nova" />
                    </span>
                    <span className="text-sm font-medium">{f.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-8">
              <span className="w-11 h-11 rounded-2xl bg-arjuna/10 grid place-items-center">
                <Lock className="w-5 h-5 text-arjuna" />
              </span>
              <h3 className="mt-5 font-display font-bold text-xl">
                {mode === 'login' ? 'Log in to your account.' : `Create a ${tab} account.`}
              </h3>

              {!configured && (
                <p className="mt-3 flex items-start gap-2 text-xs text-nova bg-nova/10 rounded-xl p-3">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  Backend isn't connected yet, so login is disabled — see SUPABASE_SETUP.md to enable it.
                </p>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                {mode === 'signup' && (
                  <input
                    name="fullName" placeholder="Full name" value={form.fullName} onChange={handleChange} required
                    className="w-full rounded-xl border border-border/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-nova/50"
                  />
                )}
                <input
                  name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required
                  className="w-full rounded-xl border border-border/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-nova/50"
                />
                {mode === 'signup' && tab === 'parent' && (
                  <input
                    name="childEmail" type="email" placeholder="Your child's email (used on their enrollment)"
                    value={form.childEmail} onChange={handleChange} required
                    className="w-full rounded-xl border border-border/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-nova/50"
                  />
                )}
                <input
                  name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required
                  className="w-full rounded-xl border border-border/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-nova/50"
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={loading || !configured}
                  className="w-full rounded-full bg-nova text-[#1B2130] font-semibold px-6 py-3 text-sm disabled:opacity-50"
                >
                  {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Sign up'}
                </button>
              </form>

              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="mt-4 text-xs text-mist underline underline-offset-2"
              >
                {mode === 'login' ? "New here? Create an account" : 'Already have an account? Log in'}
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}