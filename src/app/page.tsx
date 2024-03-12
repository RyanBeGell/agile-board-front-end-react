'use client';

import Sidebar from '@/app/workspace/sidebar';
import Navbar from '@/components/navbar/navbar';
import BoardDashboard from '@/components/workspace/boards';

export default function Home() {
  return (
    <div className="bg-background">
      <div>
        <Navbar />
      </div>
      <div className="flex-1 grid grid-cols-[auto,1fr] mt-12 mx-16">
        <div>
          <Sidebar />
        </div>
        <div className="ml-6">
          <BoardDashboard />
          <main></main>
        </div>
      </div>
    </div>
  );
}
