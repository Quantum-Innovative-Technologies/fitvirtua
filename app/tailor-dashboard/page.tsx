"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import TailorDashboard from '@/components/Dashboard/Tailor_Dashboard';
import Header from '@/components/header';
import Footer from '@/components/footer';

const TailorDashboardPage = () => {
  const router = useRouter();

  // Check if user is authenticated
  React.useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    }
    const userData = JSON.parse(user || '{}');
    if (userData.userType !== 'tailor') {
      router.push('/login');
    }
  }, [router]);

  // Mock cart functionality for header
  const handleCartClick = () => {
    // No cart functionality needed for tailor dashboard
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={handleCartClick} cartItemsCount={0} />
      <main className="flex-grow pt-20">
        <TailorDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default TailorDashboardPage;
