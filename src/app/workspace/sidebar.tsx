'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Layout, Plus, Settings } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/store/hooks'; // Adjust the import path as necessary
import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { CreateWorkspaceDialog } from './create-workspace-dialog';
import { addWorkspace, fetchWorkspaces, selectWorkspace } from './workspace-slice';

import { iconMap, IconNames } from '@/types/icons';
import { Workspace } from '@/types/interfaces';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
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

  return (
    <div className="w-64 h-full flex flex-col bg-background">
      <div className="pl-2 flex justify-between items-center mb-2">
        <h2 className="text-xs font-bold">Workspaces</h2>
        <Button variant={'ghost'} size={'icon'} className="flex items-center justify-center p-2 h-8 w-8" onClick={handleAddWorkspace}>
          <Plus className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
      <CreateWorkspaceDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onWorkspaceCreated={handleWorkspaceCreated} />
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
                      {React.createElement(iconMap[workspace.icon as IconNames], { className: 'h-5 w-5 text-white' })}
                    </div>
                    {workspace.name}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-4">
                  <div className="flex flex-col">
                    <Button variant="ghost" className="h-8 flex items-center justify-start w-full mb-2" onClick={() => handleSelectWorkspace(workspace.id)}>
                      <Layout className=" h-5 mr-2" /> Boards
                    </Button>
                    <Button variant="ghost" className="h-8 flex items-center justify-start w-full">
                      <Settings className="h-5 mr-2" /> Settings
                    </Button>
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