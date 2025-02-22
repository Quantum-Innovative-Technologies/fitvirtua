import { Instagram, Facebook, Twitter, PinIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">Fitvirtua</h3>
            <p className="text-gray-400">Premium athletic wear for the dedicated fitness enthusiast.</p>
          </div>
          <div>
            <h4 className="text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shipping
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-400">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-400">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-400">
                <PinIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg mb-6">Payment Methods</h4>
            <div className="flex space-x-4">
              <span className="text-2xl">💳</span>
              <span className="text-2xl">💳</span>
              <span className="text-2xl">💳</span>
              <span className="text-2xl">💳</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Fitvirtua. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

