'use client';

import Column from '@/components/column';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { boardData } from '@/constants/board-data';
import { MoreHorizontal } from 'lucide-react';
export default function Board() {
  return (
    <Layout>
      <div className="min-h-screen w-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600">
        <div className=" items-center flex justify-between bg-blue-800 bg-opacity-75 text-white text-opacity-90 text-xl font-bold py-2 px-4">
          Board Header
          <Button size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </div>
        {/* Board content */}
        <div className="flex overflow-x-auto p-2">
          {boardData.map((column: any) => (
            <Column key={column.id} {...column} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
