'use client'
import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function send() {
    if (!email) {
      setError('Please enter your email')
      return
    }

    setError('')
    const supa = supabaseBrowser()
    const { error: authError } = await supa.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    })

    if (authError) {
      setError(authError.message)
    } else {
      setDone(true)
    }
  }

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      {done ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800">Check your email for the magic link.</p>
        </div>
      ) : (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="admin email"
            className="w-full border px-3 py-2 rounded mb-4"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                send()
              }
            }}
          />
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button
            onClick={send}
            className="px-4 py-2 bg-primary text-ink rounded font-semibold"
          >
            Send Magic Link
          </button>
        </>
      )}
    </main>
  )
}

