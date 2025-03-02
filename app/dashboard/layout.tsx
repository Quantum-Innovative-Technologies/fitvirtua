'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }

    // Parse user data
    try {
      const userData = JSON.parse(user);
      const path = window.location.pathname;

      // Check if user is accessing the correct dashboard
      if (userData.userType === 'tailor' && !path.includes('/dashboard/tailor')) {
        router.push('/dashboard/tailor');
      } else if (userData.userType === 'customer' && !path.includes('/dashboard/customer')) {
        router.push('/dashboard/customer');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
}
