'use client';

import dynamic from 'next/dynamic';

// Dynamically import the TailorDashboard component with no SSR
const TailorDashboard = dynamic(
  () => import('@/components/Dashboard/Tailor_Dashboard'),
  { ssr: false }
);

export default function TailorDashboardPage() {
  return <TailorDashboard />;
}
