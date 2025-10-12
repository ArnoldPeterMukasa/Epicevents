export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          We plan. You celebrate. 🎉
        </h1>
        <p className="mt-4 text-gray-600">
          Seamless event planning in Uganda — from concept to curtain call.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="/contact" className="px-5 py-3 bg-black text-white rounded">Get a Quote</a>
          <a href="/gallery" className="px-5 py-3 border rounded">See Our Work</a>
        </div>
      </div>
      <div className="aspect-video rounded-lg border" />
    </section>
  );
}
