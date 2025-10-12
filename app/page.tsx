export default function Homepage() {
  const services=[
    {title: "Ushering & Guest Experince", desc: "Professional hosts for concerts, corporate events & VIP."},
    {title: "Concert & Festival Management", desc: "Stage, Crowd flow, Artist logistics, brand activations."},
    {title: "Corporate Events", desc: "Launches, conferences, awards- end-to-end execution."},
    {title: "Club Nights & Promotions", desc: "Theme nights, MCs, Promos & ticketing coordination."},
  ];

  
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="grid md:grid-cols-2 gap-10 items-center py-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">We plan. You celebrate. 🎉</h1>
          <p className="mt-4 text-gray-600">
            Epic Events — Uganda’s partner for concerts, corporate, weddings & club nights. From Boyz II Men to CEO Presidential Forum, we deliver wow moments.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/contact" className="px-5 py-3 bg-black text-white rounded">Get a Quote</a>
            <a href="/gallery" className="px-5 py-3 border rounded">See Our Work</a>
          </div>
        </div>
        <div className="aspect-video rounded-lg border" />
      </section>

      <section className="py-10">
        <h2 className="text-2xl font-bold">What we do</h2>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(s => (
            <div key={s.title} className="p-6 border rounded-lg">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-gray-600 mt-2">{s.desc}</p>
              <a className="mt-4 inline-block text-sm underline" href={`/contact?service=${encodeURIComponent(s.title)}`}>Request quote →</a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}