"use client"

import { useState } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import CollectionsSection from "@/components/collections-section"
import ProductsSection from "@/components/products-section"
import NewsletterSection from "@/components/newsletter-section"
import Footer from "@/components/footer"
import CartSidebar from "@/components/cart-sidebar"
import NotificationToast from "@/components/notification-toast"
import { CartItem } from "@/types"

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "tops", "leggings", "shorts", "sports-bras"]

  const newArrivals = [
    {
      id: 1,
      name: "Performance Training Top",
      price: 89,
      category: "tops",
      image: "/Tshirt.jpg",
    },
    {
      id: 2,
      name: "High-Impact Sports Bra",
      price: 65,
      category: "sports-bras",
      image: "/Bra.jpg",
    },
    {
      id: 3,
      name: "Compression Leggings",
      price: 95,
      category: "leggings",
      image: "/Legging.jpg",
    },
    {
      id: 4,
      name: "Training Shorts",
      price: 75,
      category: "shorts",
      image: "/Short.jpg",
    },
  ]

  const collections = [
    {
      title: "Women's Collection",
      description: "Elegant designs for the modern woman",
      image: "/Women.jpg",
    },
    {
      title: "Men's Collection",
      description: "Ophisticated styles for the contemporary man",
      image: "/Men.jpg",
    },
    {
      title: "Designer Series"  ,
      description: "Exclusive pieces from world-renowned designers",
      image: "/Designer.jpg",
    },
  ]

  const addToCart = (product: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setShowNotification(true);
    setNotificationMessage(`${product.name} added to cart`);
    setTimeout(() => setShowNotification(false), 3000);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemsCount={cartItems.length} />
      <HeroSection />
      <CollectionsSection collections={collections} />
      <ProductsSection
        products={newArrivals}
        selectedCategory={selectedCategory}
        categories={categories}
        onCategorySelect={setSelectedCategory}
        onAddToCart={addToCart}
      />
      <NewsletterSection />
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} />
      <NotificationToast show={showNotification} message={notificationMessage} />
    </div>
  )
}
