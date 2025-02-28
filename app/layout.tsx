import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'FitVirtua',
  description: 'Your virtual wardrobe, tailored to your every move.',
}

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
