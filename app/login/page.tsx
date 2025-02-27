"use client"

import Login from '@/components/Login/Login'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function LoginPage() {
  return (
    <>
      <Header onCartClick={() => {}} cartItemsCount={0} />
      <Login />
      <Footer />
    </>
  )
}
