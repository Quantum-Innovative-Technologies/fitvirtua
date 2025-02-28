"use client"

import { ShoppingBag, User, Search, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from "next-themes"

interface HeaderProps {
  onCartClick: () => void
  cartItemsCount: number
}

export default function Header({ onCartClick, cartItemsCount }: HeaderProps) {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const isTailorDashboard = pathname === '/tailor-dashboard'

  useEffect(() => {
    setMounted(true)
    // Get user data
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Wait until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const handleTailorCornerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.userType === 'tailor') {
        router.push('/tailor-dashboard');
      } else {
        router.push('/login?from=tailors-corner');
      }
    } else {
      router.push('/login?from=tailors-corner');
    }
  };

  return (
    <header className="fixed w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-serif tracking-wider text-gray-800 dark:text-white">
              Fitvirtua
            </Link>
            {isTailorDashboard ? (
              <nav className="hidden md:flex space-x-8">
                <span className="text-gray-800 dark:text-gray-200">
                  Tailor Dashboard
                </span>
              </nav>
            ) : (
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">
                  Home
                </Link>
                <Link href="/shop" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">
                  Shop
                </Link>
                <Link href="/virtual" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">
                  Virtual Try-On
                </Link>
                <Link href="/size-guide" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">
                  Size Guide
                </Link>
                <Link 
                  href="/login?from=tailors-corner"
                  onClick={handleTailorCornerClick}
                  className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                >
                  Tailor's Corner
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleTheme} 
              className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <User className="w-5 h-5" />
                  <span>{user.firstName || user.email}</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
            {!isTailorDashboard && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 border-none bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 text-gray-800 dark:text-gray-200"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                <button className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 relative" onClick={onCartClick}>
                  <ShoppingBag className="w-6 h-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
