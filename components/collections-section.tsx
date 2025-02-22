interface Collection {
  title: string
  description: string
  image: string
}

interface CollectionsSectionProps {
  collections: Collection[]
}

export default function CollectionsSection({ collections }: CollectionsSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Collections</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <img
                src={collection.image || "/placeholder.svg"}
                alt={collection.title}
                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-white p-4">
                  <h3 className="text-2xl font-serif mb-2">{collection.title}</h3>
                  <p className="text-sm">{collection.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

