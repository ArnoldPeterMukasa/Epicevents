import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { supabaseServer } from "@/lib/supabase";

export default async function Gallery() {
  const s = supabaseServer()
  const { data } = await s
    .from('gallery_items')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data && data.length > 0 ? (
            data.map((g) => (
              <figure key={g.id} className="rounded border overflow-hidden">
                <Image
                  src={g.image_url}
                  alt={g.title || 'Epic Event'}
                  width={640}
                  height={480}
                  className="w-full h-auto"
                />
                {g.title && (
                  <figcaption className="p-2 text-sm">{g.title}</figcaption>
                )}
              </figure>
            ))
          ) : (
            <p className="text-gray-600">Gallery coming soon! Check back for photos from our events.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
