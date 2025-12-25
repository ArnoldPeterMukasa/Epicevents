'use client'
import { useEffect } from 'react'
import { supabaseBrowser } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    async function logout() {
      const supa = supabaseBrowser()
      await supa.auth.signOut()
      router.push('/admin/login')
    }
    logout()
  }, [router])

  return (
    <main className="mx-auto max-w-md p-8">
      <p>Logging out...</p>
    </main>
  )
}

