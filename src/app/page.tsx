'use client';

import Sidebar from '@/app/workspace/sidebar';
import Navbar from '@/components/navbar/navbar';
import BoardDashboard from '@/components/workspace/boards';

export default function Home() {
  return (
    <div className="bg-background">
      <Navbar />
      <div
        className="flex justify-center mt-12 mx-auto"
        style={{ maxWidth: 'calc(100% - 4rem)' }}
      >
        {' '}
        <div className="flex w-full max-w-screen-xl">
          {' '}
          <div className="flex-none">
            <Sidebar />
          </div>
          <div className="flex-grow ml-6 w-full max-w-full">
            <BoardDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
