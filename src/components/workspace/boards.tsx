import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { PopoverClose } from '@radix-ui/react-popover';
import { FolderKanban, Layout, Lock, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FormPicker } from '../board/card/form-picker';
import { Button } from '../ui/button';

export default function BoardDashboard() {
  const workspace = { id: '1', name: 'Project Planning', icon: Layout };
  const boards = [
    {
      id: 'board-1',
      name: 'Project Dashboard',
      gradient: 'bg-gradient-to-r from-blue-400 to-teal-500',
    },
    {
      id: 'board-2',
      name: 'Design Team',
      gradient: 'bg-gradient-to-r from-pink-500 to-orange-500',
    },
    {
      id: 'board-3',
      name: 'Development Workflow',
      gradient: 'bg-gradient-to-r from-green-400 to-blue-600',
    },
    {
      id: 'board-4',
      name: 'Marketing Strategy',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
    {
      id: 'board-5',
      name: 'HR Initiatives',
      gradient: 'bg-gradient-to-b from-yellow-400 via-red-400 to-pink-500', // Top to Bottom
    },
    {
      id: 'board-6',
      name: 'Sales Goals',
      gradient: 'bg-gradient-to-bl from-red-500 via-red-700 to-black', // Top Right to Bottom Left
    },
    {
      id: 'board-7',
      name: 'Customer Support',
      gradient: 'bg-gradient-to-br from-green-300 to-blue-500', // Top Left to Bottom Right
    },
    {
      id: 'board-8',
      name: 'New Product Launch',
      gradient: 'bg-gradient-to-t from-purple-400 via-pink-500 to-orange-500', // Bottom to Top
    },
    {
      id: 'board-9',
      name: 'IT Department',
      gradient: 'bg-gradient-to-tr from-teal-500 to-green-500', // Bottom Left to Top Right
    },
    {
      id: 'board-10',
      name: 'Company Events',
      gradient: 'bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-500', // Bottom Right to Top Left
    },
  ];

  //next router
  const router = useRouter();

  return (
    <div className="bg-background">
      {/* Dashboard Header */}
      <div>
        <div className="flex items-center">
          <div className="bg-primary rounded-md p-1 mr-2 flex items-center justify-center">
            <workspace.icon className="h-10 w-10 text-white" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-bold text-lg">{workspace.name}</h1>
            <div className="flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              <span className="text-xs">Private</span>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4 bgcolor-border" />
      {/* "Your boards" subheader */}
      <div className="ml-4">
        <div className="flex items-center mb-4">
          <FolderKanban className="h-6 w-6 mr-2" />
          <h2 className=" font-semibold">Your Boards</h2>
        </div>
        {/* Display of users Boards as cards*/}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Add Board card */}
          <Popover>
            <PopoverTrigger asChild>
              <div
                role="button"
                className=" bg-muted hover:cursor-pointer justify-center text-center h-full w-full aspect-video relative rounded-sm flex font-semibold p-2 hover:opacity-75 transition"
              >
                <div className="flex items-center p-2">
                  <Plus className="mr-2 h-5 w-5 " />
                  <p className="text-sm">Create new board</p>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80" side="right">
              <div className="grid gap-4">
                <div className="text-center">
                  <h4 className="font-medium leading-none">Create New Board</h4>
                </div>
                <FormPicker />
                <div>
                  <Label htmlFor="Board name">Board name</Label>
                  <Input
                    id="boardName"
                    defaultValue=""
                    className="col-span-2 h-8"
                  />
                  <PopoverClose>
                    <Button
                      className="w-full h-8 mt-4"
                      onClick={() => {
                        toast(`Board has been created`, {
                          //show date in format "Sunday, December 03, 2023 at 9:00 AM"
                          description: `${new Date().toLocaleString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}`,
                          action: {
                            label: 'Open',
                            //TODO: router push to board
                            onClick: () => console.log('Undo'),
                          },
                        });
                      }}
                    >
                      Create
                    </Button>
                  </PopoverClose>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {boards.map((board) => (
            // Board card
            <div
              key={board.id}
              className={`${board.gradient} hover:cursor-pointer h-full w-full aspect-video relative rounded-sm flex p-2 hover:opacity-90 transition`}
              //nextjs link to boards page on click
              //onClick={() => router.push(`/boards/${board.id}`)}
              //temp page until api integration
              onClick={() => router.push(`/board`)}
            >
              <h3 className="text-white font-semibold">{board.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
