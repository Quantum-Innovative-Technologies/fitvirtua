interface NotificationToastProps {
  message: string
  show: boolean
}

export default function NotificationToast({ message, show }: NotificationToastProps) {
  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-full shadow-lg z-50">{message}</div>
  )
}

