'use client';

import { customFetch } from '@/components/auth/CustomFetch';
import { deleteBoard } from '@/components/board/board-slice';
import Column from '@/components/board/column/column';
import Layout from '@/components/board/layout';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/store/hooks';
import { Board as BoardType, Column as ColumnType } from '@/types/interfaces';
import { PopoverClose } from '@radix-ui/react-popover';
import { MoreHorizontal, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { id: String } }) {
  const router = useRouter();
  const boardId: String = params.id;
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [board, setBoard] = useState<BoardType | null>(null);
  const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false);
  const [newColumn, setNewColumn] = useState<string>('');
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleDeleteColumn = (deletedColumnId: string) => {
    setColumns(columns.filter((column) => column.id !== deletedColumnId));
  };

  useEffect(() => {
    const fetchBoard = async () => {
      if (typeof boardId === 'string') {
        setLoading(true);
        try {
          const response = await customFetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${boardId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          if (!response.ok) throw new Error('Failed to fetch board');
          const data = (await response.json()) as BoardType;
          console.log('Board data:', data);
          setBoard(data);
          setColumns(data.columns);
        } catch (error) {
          setError('Failed to load board');
          console.error('Error fetching board:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBoard();
  }, [boardId]);

  const handleSaveColumn = async () => {
    try {
      const response = await customFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/columns/board/${boardId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            name: newColumn,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const savedColumn: ColumnType = await response.json();

      // Update the column list with the newly added column
      setColumns([...columns, savedColumn]);

      // Reset the new column input and close the input area
      setNewColumn('');
      setIsAddingColumn(false);
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  const handleCancelColumn = () => {
    setIsAddingColumn(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewColumn(e.target.value);
  };

  const handleAddColumn = () => {
    setIsAddingColumn(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDeleteBoard = async () => {
    try {
      await dispatch(deleteBoard(boardId)).unwrap();
      toast({
        title: `Board ${board?.name} has been deleted`,
        description: `${new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })}`,
      });
      router.push('/dashboard'); // Navigate to the home page after deletion
    } catch (error) {
      // toast.error('Failed to delete board');
    }
  };

  return (
    <Layout>
      <div className={`${board?.gradient} min-h-screen w-full`}>
        <div className="flex justify-between items-center bg-black bg-opacity-35 text-white text-opacity-90 text-xl font-bold py-2 px-4">
          Board Header {boardId}
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 flex flex-col items-center">
              <h3 className="text-sm font-semibold mb-2">Board Actions</h3>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full h-9"
                    onClick={() => {
                      console.log('Deleting the board...');
                    }}
                  >
                    Delete This Board
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your board and remove the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <PopoverClose>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </PopoverClose>
                    <PopoverClose>
                      <AlertDialogAction onClick={handleDeleteBoard}>
                        Continue
                      </AlertDialogAction>
                    </PopoverClose>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex overflow-x-auto p-2 items-start">
          {columns.map((column) => (
            <Column
              key={column.id}
              title={column.name}
              cards={column.cards}
              columnId={column.id}
              onDelete={handleDeleteColumn}
            />
          ))}
          {isAddingColumn ? (
            <div className="min-w-[284px] bg-white p-4 rounded-md m-2 shadow-sm">
              <Textarea
                value={newColumn}
                onChange={handleChange}
                placeholder="Enter list title..."
                className="mb-2"
              />
              <div className="flex space-x-2">
                <Button className="h-9" size="sm" onClick={handleSaveColumn}>
                  Add List
                </Button>
                <Button
                  size="icon"
                  variant={'ghost'}
                  className="h-9 text-black"
                  onClick={handleCancelColumn}
                >
                  <X />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              className="mt-2 w-[284px] p-4 rounded-md m-2 bg-white/80 hover:bg-white/50 transition text-left justify-start font-medium text-black"
              variant="secondary"
              onClick={handleAddColumn}
            >
              <Plus className="mr-2 h-4 w-4" />{' '}
              {`${columns.length === 0 ? 'Add a list' : 'Add another list'}`}
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
