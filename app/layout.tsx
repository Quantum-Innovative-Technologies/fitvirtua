import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FitVirtua',
  description: 'Your virtual wardrobe, tailored to your every move.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
