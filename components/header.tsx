"use client"

import { ShoppingBag, User, Search } from "lucide-react"

interface HeaderProps {
  onCartClick: () => void
  cartItemsCount: number
}

export default function Header({ onCartClick, cartItemsCount }: HeaderProps) {
  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-serif tracking-wider">Fitvirtua</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-800 hover:text-gray-600">
                Home
              </a>
              <a href="#" className="text-gray-800 hover:text-gray-600">
                Shop
              </a>
              <a href="/virtual" className="text-gray-800 hover:text-gray-600">
                Virtual Try-On
              </a>
              <a href="#" className="text-gray-800 hover:text-gray-600">
                Size Guide
              </a>
              <a href="#" className="text-gray-800 hover:text-gray-600">
              Tailor's Corner
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border-none bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <button className="text-gray-800 hover:text-gray-600">
              <User className="w-6 h-6" />
            </button>
            <button className="text-gray-800 hover:text-gray-600 relative" onClick={onCartClick}>
              <ShoppingBag className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

