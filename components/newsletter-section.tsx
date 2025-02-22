export default function NewsletterSection() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-serif mb-6">Join Our Exclusive Circle</h2>
          <p className="text-gray-600 mb-12 text-lg">
            Be the first to receive our latest collections, private shopping events, and personalized style
            recommendations
          </p>
          <div className="flex gap-6 justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 max-w-md px-8 py-4 border-none bg-white shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 text-lg"
            />
            <button className="rounded-full bg-black text-white px-12 py-4 hover:bg-gray-900 transition-colors text-lg">
              Subscribe
            </button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            By subscribing, you agree to our Privacy Policy and Terms of Service
          </p>
        </div>
      </div>
    </section>
  )
}

