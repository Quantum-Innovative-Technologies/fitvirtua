'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Gucci Silk Shirt',
    price: 1200,
    image: '../TryShirt.jpg',
  },
  {
    id: '2',
    name: 'Versace Denim Jacket',
    price: 2500,
    image: '../Tryjacket.jpg',
  },
  {
    id: '3',
    name: 'Dior Floral Dress',
    price: 3800,
    image: '../Trysuit.jpg',
  },
  {
    id: '4',
    name: 'Saint Laurent Leather Jacket',
    price: 4500,
    image: '../TryBjack.jpg',
  },
];

type Category = 'All' | 'Shirts' | 'Jackets' | 'Dresses';

interface ProductGridProps {
  onTryOn: () => void;
}

export default function ProductGrid({ onTryOn }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const categoryStyles = {
    All: 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 hover:from-purple-200 hover:to-purple-300',
    Shirts: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300',
    Jackets: 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 hover:from-emerald-200 hover:to-emerald-300',
    Dresses: 'bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 hover:from-pink-200 hover:to-pink-300',
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'All') return true;
    return product.name.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Select Product to Try On</h2>
        <div className="flex space-x-4">
          {(Object.keys(categoryStyles) as Category[]).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${categoryStyles[category]} ${
                selectedCategory === category ? 'ring-2 ring-offset-2' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow">
            <img 
              src={product.image} 
              alt={product.name}
              className="aspect-square object-cover rounded-md mb-3"
            />
            <h3 className="font-medium text-sm">{product.name}</h3>
            <p className="text-sm text-gray-500">${product.price.toLocaleString()}</p>
            <button 
              onClick={onTryOn}
              className="mt-2 w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-2.5 text-sm rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <i className="ri-magic-line text-violet-200" />
              Try On
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
