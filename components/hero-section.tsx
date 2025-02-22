export default function HeroSection() {
  return (
    <section className="pt-20 relative h-[800px] bg-gradient-to-r from-gray-100 to-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/Hero.jpg"
          className="w-full h-full object-cover"
          alt="Hero background"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl bg-white/10 backdrop-blur-sm p-12 rounded-lg">
          <h1 className="text-6xl font-serif mb-6 leading-tight">Elevate Your Style</h1>
          <p className="text-xl mb-8 font-light">Luxury fashion tailored to perfection</p>
          <div className="flex gap-4">
            <button className="rounded-full bg-black text-white px-8 py-4 hover:bg-gray-900 transition-colors">
              Try Now
            </button>
            <button className="rounded-full border-2 border-black px-8 py-4 hover:bg-black hover:text-white transition-colors">
            Explore Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

