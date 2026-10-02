import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from './supabaseClient.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(supabaseConfigured)

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const signUp = async ({ email, password, fullName, role }) => {
    if (!supabaseConfigured) return { error: { message: 'Backend not connected yet — see SUPABASE_SETUP.md' } }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role: role || 'student' } },
    })
    return { data, error }
  }

  const signIn = async ({ email, password }) => {
    if (!supabaseConfigured) return { error: { message: 'Backend not connected yet — see SUPABASE_SETUP.md' } }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  const signOut = async () => {
    if (!supabaseConfigured) return
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, configured: supabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}