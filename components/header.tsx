export default function Header() {
  return (
    <header className="border-b sticky top-0 bg-white/80 backdrop-blur z-50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="/" className="font-extrabold text-xl">Epic Events</a>
        <nav className="flex gap-4 text-sm">
          <a href="/services">Services</a>
          <a href="/gallery">Gallery</a>
          <a href="/contact" className="px-3 py-1 rounded bg-black text-white">Book</a>
        </nav>
      </div>
    </header>
  );
}
