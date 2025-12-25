"use client";
import { useState, useEffect } from 'react'
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [service, setService] = useState('')

  useEffect(() => {
    // Get service from URL query parameter
    const params = new URLSearchParams(window.location.search)
    const serviceParam = params.get('service')
    if (serviceParam) {
      setService(decodeURIComponent(serviceParam))
    }
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    try {
      const form = e.currentTarget
      const body = new FormData(form)
      const res = await fetch('/api/contact', { method: 'POST', body })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold">Book a free consult</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input name="name" placeholder="Your name" required className="w-full border px-3 py-2 rounded"/>
          <input name="email" type="email" placeholder="Email" required className="w-full border px-3 py-2 rounded"/>
          <input name="phone" placeholder="Phone" className="w-full border px-3 py-2 rounded"/>
          <input name="service" placeholder="Service (e.g., Concert ushering)" defaultValue={service} className="w-full border px-3 py-2 rounded"/>
          <textarea name="message" placeholder="Tell us about your event…" required className="w-full border px-3 py-2 rounded h-32"/>
          <button disabled={status === 'sending'} className="px-5 py-3 bg-primary text-ink rounded font-semibold">
            {status === 'sending' ? 'Sending…' : 'Send'}
          </button>
          {status === 'sent' && <p className="text-green-600">Thanks! We'll reply soon.</p>}
          {status === 'error' && <p className="text-red-600">Something went wrong.</p>}
        </form>
      </main>
      <Footer />
    </>
  )
}