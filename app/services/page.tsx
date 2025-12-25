import Header from "@/components/header";
import Footer from "@/components/footer";
import { supabaseServer } from "@/lib/supabase";

export default async function Services() {
  const s = supabaseServer()
  const { data: services } = await s
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('order_index')

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold">Services & Packages</h1>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {services && services.length > 0 ? (
            services.map((svc) => (
              <div key={svc.id} className="p-6 border rounded-lg">
                <h3 className="font-semibold">{svc.title}</h3>
                <p className="text-gray-600 mt-2">{svc.short_desc}</p>
                {svc.price_from && (
                  <p className="mt-3 font-medium">From UGX {svc.price_from.toLocaleString()}</p>
                )}
                <a
                  className="mt-4 inline-block px-4 py-2 bg-primary text-ink rounded font-semibold"
                  href={`/contact?service=${encodeURIComponent(svc.title)}`}
                >
                  Request Quote
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No services available at the moment. Check back soon!</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}