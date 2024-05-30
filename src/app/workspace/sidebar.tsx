'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Layout, Plus, Settings } from 'lucide-react';

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks'; // Adjust the import path as necessary
import { RootState } from '@/store/store';
import { IconNames, iconMap } from '@/types/icons';
import { Workspace } from '@/types/interfaces';
import { PopoverClose } from '@radix-ui/react-popover';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { CreateWorkspaceDialog } from './create-workspace-dialog';
import {
  addWorkspace,
  deleteWorkspace,
  fetchWorkspaces,
  removeWorkspace,
  selectWorkspace,
} from './workspace-slice';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { workspaces, loading } = useAppSelector(
    (state: RootState) => state.workspaces
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchWorkspaces());
  }, [dispatch]);

  const handleAddWorkspace = () => {
    setIsDialogOpen(true);
  };

  console.log('Workspaces:', workspaces); // Check if workspaces are properly updated in Redux state

  const handleWorkspaceCreated = (newWorkspace: Workspace) => {
    console.log('New workspace created:', newWorkspace); // Check if new workspace data is correct
    dispatch(addWorkspace(newWorkspace)); // Dispatch action to add the new workspace
    setIsDialogOpen(false);
  };

  const handleSelectWorkspace = (workspaceId: string) => {
    dispatch(selectWorkspace(workspaceId));
  };

  const handleDeleteWorkspace = async (
    workspaceId: string,
    workspaceName: string
  ) => {
    try {
      await dispatch(deleteWorkspace(workspaceId)).unwrap();
      dispatch(removeWorkspace(workspaceId));

      const remainingWorkspaces = workspaces.filter(
        (workspace) => workspace.id !== workspaceId
      );

      if (remainingWorkspaces.length > 0) {
        dispatch(selectWorkspace(remainingWorkspaces[0].id));
      } else {
        dispatch(selectWorkspace(null)); // No workspaces left
      }

      toast({
        title: `Workspace ${workspaceName} has been deleted`,
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
    } catch (error) {
      console.error('Failed to delete workspace:', error);
    }
  };

  return (
    <div className="w-64 h-full flex flex-col bg-background">
      <div className="pl-2 flex justify-between items-center mb-2">
        <h2 className="text-xs font-bold">Workspaces</h2>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="flex items-center justify-center p-2 h-8 w-8"
          onClick={handleAddWorkspace}
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
      <CreateWorkspaceDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onWorkspaceCreated={handleWorkspaceCreated}
      />
      <div className="flex-1">
        {loading ? (
          <div>
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
          </div>
        ) : (
          workspaces.map((workspace, index) => (
            <Accordion type="single" key={workspace.id} collapsible>
              <AccordionItem value={`item-${index}`} className="border-b-0">
                <AccordionTrigger className="text-sm h-10">
                  <div className="flex items-center">
                    <div className="bg-black rounded-md p-1 mr-2">
                      {React.createElement(
                        iconMap[workspace.icon as IconNames],
                        { className: 'h-5 w-5 text-white' }
                      )}
                    </div>
                    {workspace.name}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-4">
                  <div className="flex flex-col">
                    <Button
                      variant="ghost"
                      className="h-8 flex items-center justify-start w-full mb-2"
                      onClick={() => handleSelectWorkspace(workspace.id)}
                    >
                      <Layout className=" h-5 mr-2" /> Boards
                    </Button>
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          variant="ghost"
                          className="h-8 flex items-center justify-start w-full"
                        >
                          <Settings className="h-5 mr-2" /> Settings
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="bottom" align="start">
                        <div className="relative flex items-center mb-2">
                          <div className="absolute left-1/2 transform -translate-x-1/2 text-xs font-semibold">
                            Workspace Settings
                          </div>
                          <PopoverClose asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-auto h-8 w-8 flex justify-center items-center"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </PopoverClose>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant={'destructive'}
                              className="w-full h-9"
                            >
                              Delete Workspace
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your workspace and all remove
                                it's data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteWorkspace(
                                    workspace.id,
                                    workspace.name
                                  )
                                }
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </PopoverContent>
                    </Popover>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
