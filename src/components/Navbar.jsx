import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react'
import { useTheme } from '../lib/ThemeContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/success-stories', label: 'Success Stories' },
  {
    label: 'More',
    children: [
      { to: '/products', label: 'Products' },
      { to: '/services', label: 'Services' },
      { to: '/blog', label: 'Blog' },
      { to: '/events', label: 'Events' },
      { to: '/careers', label: 'Careers' },
    ],
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-nova ${isActive ? 'text-nova' : 'text-ink/80'}`

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-border/10">
        <nav className="container-page flex items-center justify-between h-16 md:h-[72px]">
          <Link to="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
            <span className="bg-white rounded-xl px-2.5 py-1.5 shadow-sm">
              <img src="/brand/arjunova-logo-navbar.png" alt="Arjunova" className="h-8 md:h-9 w-auto object-contain" />
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) =>
              l.children ? (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => setMoreOpen(true)}
                  onMouseLeave={() => setMoreOpen(false)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium text-ink/80 hover:text-nova transition-colors">
                    {l.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {moreOpen && (
                    <div className="absolute top-full left-0 pt-3 w-52">
                      <div className="glass rounded-xl p-2 shadow-xl border border-border/10">
                        {l.children.map((c) => (
                          <NavLink
                            key={c.to}
                            to={c.to}
                            className="block px-3 py-2 rounded-lg text-sm text-ink/80 hover:bg-nova/10 hover:text-nova transition-colors"
                          >
                            {c.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink key={l.to} to={l.to} className={linkClass}>
                  {l.label}
                </NavLink>
              )
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="w-9 h-9 grid place-items-center rounded-full border border-border/15 hover:border-nova/50 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              to="/student-portal"
              className="hidden md:inline-block text-sm font-medium text-ink/80 hover:text-nova transition-colors"
            >
              Login
            </Link>
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center rounded-full bg-nova text-[#1B2130] text-sm font-semibold px-5 py-2.5 hover:brightness-105 transition-all shadow-[0_0_0_0_rgba(232,163,61,0)] hover:shadow-[0_0_24px_-4px_rgba(232,163,61,0.6)]"
            >
              Book Free Demo
            </Link>
            <Link
              to="/australia"
              className="hidden md:inline-flex items-center rounded-full bg-nova text-[#1B2130] text-sm font-semibold px-5 py-2.5 hover:brightness-105 transition-all shadow-[0_0_0_0_rgba(232,163,61,0)] hover:shadow-[0_0_24px_-4px_rgba(232,163,61,0.6)]"
            >
              Australia
            </Link>
            <button
              className="lg:hidden w-9 h-9 grid place-items-center rounded-full border border-border/15"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="lg:hidden glass border-b border-border/10">
          <div className="container-page py-4 flex flex-col gap-1">
            {links.flatMap((l) => (l.children ? l.children : [l])).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-2 py-2.5 rounded-lg text-sm font-medium text-ink/85 hover:bg-nova/10 hover:text-nova"
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center rounded-full bg-nova text-[#1B2130] text-sm font-semibold px-5 py-2.5"
            >
              Book Free Demo
            </Link>
            <Link
              to="/australia"
              onClick={() => setOpen(false)}
              className="mt-2 text-center rounded-full bg-nova text-[#1B2130] text-sm font-semibold px-5 py-2.5"
            >
              Australia
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
