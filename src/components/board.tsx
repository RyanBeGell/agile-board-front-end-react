import Column from '@/components/column';
import { boardData } from '@/constants/board-data';
import { MoreHorizontal } from 'lucide-react';

export default function Board() {
  return (
<div className="bg-blue-500 p-4">
      <div className="bg-blue-800 bg-opacity-75 text-white text-opacity-90 text-xl font-bold p-2 rounded flex justify-between items-center">
        Board Header1
        <button className="text-white">
          <MoreHorizontal  /> {/* Using the MoreHorizontal icon */}
        </button>
      </div>
      <div className="flex overflow-x-auto p-4">
        {boardData.map((column) => (
          <Column key={column.id} {...column} />
        ))}
      </div>
    </div>
  );
}
