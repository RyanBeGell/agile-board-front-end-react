import { createBoard, fetchBoards } from '@/components/board/board-slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { NewBoard } from '@/types/interfaces';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GradientPicker } from './card/gradient-picker';

interface CreateBoardDialogProps {
  closePopover: () => void;
}

const CreateBoardDialog: React.FC<CreateBoardDialogProps> = ({
  closePopover,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentWorkspace } = useAppSelector(
    (state: RootState) => state.workspaces
  );
  const { toast } = useToast();

  const [boardName, setBoardName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGradient, setSelectedGradient] = useState('');

  const handleCreateBoard = async () => {
    const boardData: NewBoard = {
      name: boardName,
      description: description,
      gradient: selectedGradient,
      workspaceId: currentWorkspace?.id || '',
    };

    try {
      const newBoard = await dispatch(createBoard(boardData)).unwrap();
      closePopover();
      if (currentWorkspace?.id) {
        dispatch(fetchBoards(currentWorkspace.id));
      }
      toast({
        title: `Board '${newBoard.name}' created successfully`,
        description: 'You can now open the board.',
        action: (
          <ToastAction
            onClick={() => router.push(`/board/${newBoard.id}`)}
            altText="Open"
          >
            Open
          </ToastAction>
        ),
      });

      // Reset form fields
      setBoardName('');
      setDescription('');
      setSelectedGradient(''); // Close the popover
    } catch (error) {
      toast({
        title: 'Failed to create board',
        description: error.message,
      });
    }
  };

  return (
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
  );
};

export default CreateBoardDialog;
