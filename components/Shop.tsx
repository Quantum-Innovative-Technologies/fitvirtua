import React, { useState, useEffect } from "react";
import Header from './header';
import Footer from './footer';
import { FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
import { useTheme } from 'next-themes';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const App: React.FC = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Classic Tailored Suit",
      price: 599.99,
      image: "./Trysuit.jpg",
      category: "Suits",
      description: "Elegant black wool suit with modern fit"
    },
    {
      id: 2,
      name: "Italian Dress Shirt",
      price: 129.99,
      image: "./TryShirt.jpg",
      category: "Shirts",
      description: "Premium cotton dress shirt in white"
    },
    {
      id: 3,
      name: "Designer Blazer",
      price: 349.99,
      image: "./Men.jpg",
      category: "Blazers",
      description: "Navy blue blazer with slim fit"
    },
    {
      id: 4,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      image:
        "./Tshirtcotton.jpg",
      category: "T-Shirts",
      description: "Elegant black wool suit with modern fit"
    },
    {
      id: 5,
      name: "Elegant Summer Dress",
      price: 89.99,
      image:
        "./Trysuit.jpg",
      category: "Dresses",
      description: "Premium cotton dress shirt in white"
    },
    {
      id: 6,
      name: "Classic Denim Jeans",
      price: 79.99,
      image:
        "./jeans.jpg",
      category: "Jeans",
      description: "Navy blue blazer with slim fit"
    },
    {
      id: 7,
      name: "Kids Cotton Pants",
      price: 24.99,
      image:
        "./cotton pants.jpg",
      category: "Kids",
      description: "Elegant black wool suit with modern fit"
    },
    {
      id: 8,
      name: "Wool Blend Sweater",
      price: 69.99,
      image:
        "./wool.jpg",
      category: "Sweaters",
      description: "Premium cotton dress shirt in white"
    },
    {
      id: 9,
      name: "Linen Dress Shirt",
      price: 119.99,
      image:
        "./Tryshirt.jpg",
      category: "Shirts",
      description: "Navy blue blazer with slim fit"
    },
    {
      id: 10,
      name: "Silk Evening Gown",
      price: 149.99,
      image:
        "./gouwn.jpg",
      category: "Dresses",
      description: "Elegant black wool suit with modern fit"
    },
    {
      id: 11,
      name: "Kids Cotton Hoodie",
      price: 39.99,
      image:
        "./hood.jpg",
      category: "Kids",
      description: "Premium cotton dress shirt in white"
    },
    // Add more products as needed
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  const categories = ['All', 'Suits', 'Shirts', 'Blazers', 'Pants', 'Accessories', 'T-Shirts', 'Dresses', 'Jeans', 'Kids', 'Sweaters'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCartCount(prev => prev + 1);
  };

  const handleCartClick = () => {
    // Handle cart click
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onCartClick={handleCartClick} cartItemsCount={cartCount} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-600 dark:bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => addToCart(product.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaHeart className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">${product.price}</span>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
