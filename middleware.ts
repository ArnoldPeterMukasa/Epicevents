import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabaseServer } from './lib/supabase'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  
  // Only protect /admin routes
  if (!url.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow access to login page
  if (url.pathname === '/admin/login') {
    return NextResponse.next()
  }

  try {
    // Check if user is authenticated and is an admin
    const s = supabaseServer()
    const { data: { user } } = await s.auth.getUser()
    
    if (!user?.email) {
      return NextResponse.redirect(new URL('/admin/login', url.origin))
    }

    // Check if user's email is in admins table
    const { data: rows } = await s
      .from('admins')
      .select('email')
      .eq('email', user.email)
      .limit(1)

    if (!rows || rows.length === 0) {
      return NextResponse.redirect(new URL('/admin/login', url.origin))
    }

    return NextResponse.next()
  } catch (error) {
    // If there's an error, redirect to login
    return NextResponse.redirect(new URL('/admin/login', url.origin))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}

