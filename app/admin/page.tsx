import { supabaseServer } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function AdminHome() {
  const s = supabaseServer()
  
  // Verify user is admin (middleware should handle this, but double-check)
  const { data: { user } } = await s.auth.getUser()
  if (!user?.email) {
    redirect('/admin/login')
  }

  const { data: adminCheck } = await s
    .from('admins')
    .select('email')
    .eq('email', user.email)
    .limit(1)

  if (!adminCheck || adminCheck.length === 0) {
    redirect('/admin/login')
  }

  // Fetch leads
  const { data: leads, error } = await s
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leads</h1>
        <a
          href="/admin/logout"
          className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
        >
          Logout
        </a>
      </div>
      
      {error ? (
        <p className="text-red-600">Error loading leads: {error.message}</p>
      ) : leads && leads.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="mt-6 w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Service</th>
                <th className="p-2">Status</th>
                <th className="p-2">Created</th>
                <th className="p-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{l.name}</td>
                  <td className="p-2">{l.email}</td>
                  <td className="p-2">{l.phone || '-'}</td>
                  <td className="p-2">{l.service || '-'}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      l.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                      l.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="p-2 text-xs text-gray-600">
                    {new Date(l.created_at).toLocaleString()}
                  </td>
                  <td className="p-2 text-xs text-gray-600 max-w-xs truncate">
                    {l.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 mt-6">No leads yet.</p>
      )}
    </main>
  )
}

