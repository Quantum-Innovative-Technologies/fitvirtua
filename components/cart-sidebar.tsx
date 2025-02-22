import { X } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
}

export default function CartSidebar({ isOpen, onClose, items }: CartSidebarProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-medium">Shopping Cart</h3>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          {items.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-gray-600">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${items.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                </div>
                <button className="rounded-full w-full bg-black text-white py-3 mt-4 hover:bg-gray-900 transition-colors">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

