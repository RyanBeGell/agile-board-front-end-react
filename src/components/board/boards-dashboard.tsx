import { createBoard, fetchBoards } from '@/components/board/board-slice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { NewBoard } from '@/types/interfaces';
import { FolderKanban, Layout, Lock, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { GradientPicker } from './card/gradient-picker';

export default function BoardsDashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
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

  const [boardName, setBoardName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGradient, setSelectedGradient] = useState('');

  useEffect(() => {
    if (currentWorkspace?.id) {
      dispatch(fetchBoards(currentWorkspace.id));
    }
  }, [dispatch, currentWorkspace?.id]);

  const handleCreateBoard = async () => {
    const boardData: NewBoard = {
      name: boardName,
      description: description,
      gradient: selectedGradient,
      workspaceId: currentWorkspace?.id || '',
    };

    try {
      const newBoard = await dispatch(createBoard(boardData)).unwrap();
      if (currentWorkspace?.id) {
        dispatch(fetchBoards(currentWorkspace.id));
      }
      toast(`Board '${newBoard.name}' created successfully`, {
        description: 'You can now open the board.',
        action: {
          label: 'Open',
          onClick: () => router.push(`/board/${newBoard.id}`), // Navigate to the new board page
        },
      });
    } catch (error) {
      // toast(`Failed to create board: ${error.message}`, { type: "error" });
    }
  };

  if (workspaceLoading || boardsStatus === 'loading') return <p>Loading...</p>;
  if (workspaceError || boardsError)
    return <p>Error: {workspaceError || boardsError}</p>;
  if (!currentWorkspace) return <p>No workspace selected.</p>;

  return (
    <div className="bg-background">
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
      <Separator className="my-4 bgcolor-border" />
      <div className="ml-4">
        <div className="flex items-center mb-4">
          <FolderKanban className="h-6 w-6 mr-2" />
          <h2 className="font-semibold">Your Boards</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <Popover>
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
              <div className="grid gap-4">
                <h4 className="text-center font-medium">Create New Board</h4>
                <Label htmlFor="Background Color">Background Color</Label>
                <GradientPicker
                  selectedGradient={selectedGradient}
                  setSelectedGradient={setSelectedGradient}
                />
                <Label htmlFor="Board name">Board name</Label>
                <Input
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  className="h-8"
                />
                <Label htmlFor="Description">Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Type your description here."
                />
                <Button className="w-full h-8 mt-4" onClick={handleCreateBoard}>
                  Create
                </Button>
              </div>
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
      </div>
    </div>
  );
}
