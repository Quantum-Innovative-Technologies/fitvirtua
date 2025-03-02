'use client';

import dynamic from 'next/dynamic';

// Dynamically import the CustomerProfile component with no SSR
const CustomerProfile = dynamic(
  () => import('@/components/Dashboard/Customer_Profile'),
  { ssr: false }
);

export default function CustomerDashboardPage() {
  return <CustomerProfile />;
}
