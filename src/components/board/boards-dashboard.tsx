import { clearBoards, fetchBoards } from '@/components/board/board-slice';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { FolderKanban, Layout, Lock, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CreateBoardDialog from './create-board-dialog';
import { CreateBoardForm } from './create-board-form';

export default function BoardsDashboard() {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const {
    items: boards,
    status: boardsStatus,
    error: boardsError,
  } = useAppSelector((state: RootState) => state.boards);

  const {
    currentWorkspace,
    loading: workspaceLoading,
    error: workspaceError,
  } = useAppSelector((state: RootState) => state.workspaces);

  useEffect(() => {
    if (currentWorkspace?.id) {
      dispatch(fetchBoards(currentWorkspace.id));
    } else {
      dispatch(clearBoards()); // Clear the boards if there is no current workspace (workspace deleted)
    }
  }, [dispatch, currentWorkspace]);

  return (
    <div className="bg-background">
      {currentWorkspace && (
        <div className="flex items-center p-4">
          <div className="bg-primary rounded-md p-1 mr-2 flex items-center justify-center">
            <Layout className="h-10 w-10 text-white" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-bold text-lg">{currentWorkspace.name}</h1>
            <div className="flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              <span className="text-xs">Private</span>
            </div>
          </div>
        </div>
      )}
      <Separator className="my-4 bgcolor-border" />
      <div className="ml-4">
        <div className="flex items-center mb-4">
          <FolderKanban className="h-6 w-6 mr-2" />
          <h2 className="font-semibold">Your Boards</h2>
        </div>
        {boards.length === 0 ? (
          <CreateBoardForm />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <div
                  role="button"
                  className="bg-muted hover:cursor-pointer justify-center text-center h-full w-full aspect-video relative rounded-sm flex font-semibold p-2 hover:opacity-75 transition"
                >
                  <div className="flex items-center">
                    <Plus className="mr-2 h-5 w-5" />
                    <p className="text-sm">Create new board</p>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80" side="right">
                <CreateBoardDialog
                  closePopover={() => setIsPopoverOpen(false)}
                />
              </PopoverContent>
            </Popover>
            {boards.map((board) => (
              <div
                key={board.id}
                className={`${board.gradient} hover:cursor-pointer h-full w-full aspect-video relative rounded-sm flex p-2 hover:opacity-90 transition`}
                onClick={() => router.push(`/board/${board.id}`)}
              >
                <h3 className="text-black font-semibold">{board.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
