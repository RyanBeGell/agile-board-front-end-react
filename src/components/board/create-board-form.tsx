import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import CreateBoardDialog from './create-board-dialog';

export const CreateBoardForm: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="flex h-full justify-center items-center">
      <div className="w-full max-w-xl flex flex-col justify-center items-center p-8">
        <img
          src="/undraw_scrum_board.svg"
          alt="Scrum Board"
          className="w-3/4 max-w-md mb-8"
        />
        <p className="text-center mb-8 text-muted-foreground  text-sm">
          Boards are where the work gets done. On a board, you can move cards
          between lists to keep projects, tasks, and more on track.
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" className="w-1/2">
              {' '}
              Create your first board
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" side="right">
            <CreateBoardDialog closePopover={() => setIsPopoverOpen(false)} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CreateBoardForm;
