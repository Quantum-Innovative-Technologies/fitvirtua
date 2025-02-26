import { Heart } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
}

interface ProductsSectionProps {
  products: Product[]
  selectedCategory: string
  categories: string[]
  onCategorySelect: (category: string) => void
  onAddToCart: (product: Product) => void
}

export default function ProductsSection({
  products,
  selectedCategory,
  categories,
  onCategorySelect,
  onAddToCart,
}: ProductsSectionProps) {
  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((item) => item.category === selectedCategory)

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">New Arrivals</h2>
        <div className="flex justify-center mb-8 space-x-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`rounded-full px-6 py-2 whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <Heart className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium dark:text-white">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">${product.price}</p>
                <button
                  onClick={() => onAddToCart(product)}
                  className="rounded-full mt-2 w-full bg-black text-white py-2 hover:bg-gray-900 transition-colors dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
