'use client';

import Footer from '@/components/landing/footer';
import Landing from '@/components/landing/landing';
import Navbar from '@/components/landing/navbar';
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}
