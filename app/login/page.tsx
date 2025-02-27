"use client"

import { Suspense } from 'react'
import Login from '@/components/Login/Login'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function LoginPage() {
  return (
    <>
      <Header onCartClick={() => {}} cartItemsCount={0} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Login />
      </Suspense>
      <Footer />
    </>
  )
}
