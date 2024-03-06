'use client';

import BoardDashboard from '@/components/board-dashboard';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function Home() {
  return (
    <div className='bg-background'>
      <div>
        <Navbar />
      </div>
      <div className="flex-1 grid grid-cols-[auto,1fr] mt-12 mx-16">
        <div >
          <Sidebar />
        </div>
        <div className='ml-6'>
          <BoardDashboard />
          <main></main>
        </div>
      </div>
      </div>
  );
}
