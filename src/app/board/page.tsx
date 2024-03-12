'use client';

import Column from '@/components/column';
import Layout from '@/components/layout';
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
import { boardData } from '@/constants/board-data';
import { PopoverClose } from '@radix-ui/react-popover';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

export default function Board() {
  return (
    <Layout>
      <div className="min-h-screen w-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-600">
        <div className=" items-center flex justify-between bg-blue-800 bg-opacity-75 text-white text-opacity-90 text-xl font-bold py-2 px-4">
          Board Header
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 flex flex-col items-center">
              <h3 className=" text-sm font-semibold mb-2">Board Actions</h3>{' '}
              {/* Title */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
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
                      <AlertDialogAction
                        onClick={() => {
                          toast(`Board has been deleted`, {
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
                          });
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </PopoverClose>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </PopoverContent>
          </Popover>
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
