'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconNames } from '@/types/icons';
import { Workspace } from '@/types/interfaces';
import { useState } from 'react';
import IconSelector from './icon-selector';

interface CreateWorkspaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onWorkspaceCreated: (workspace: Workspace) => void; // Now expects a Workspace object
}

export function CreateWorkspaceDialog({
  isOpen,
  onClose,
  onWorkspaceCreated,
}: CreateWorkspaceDialogProps) {
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [iconName, setIconName] = useState<IconNames>('Layout');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  //format function to format icon to match the icon name in the API (Java Constant Case)
  const formatIconName = (iconName: string) => {
    return (
      iconName
        // Add an underscore before any capital letter that follows a lowercase letter
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        // Add an underscore before any number that follows a letter without an existing underscore
        .replace(/([a-zA-Z])(\d+)/g, '$1_$2')
        .toUpperCase()
    ); // Convert to upper case
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(''); // Clear any previous error messages
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces`;
    const requestBody = {
      name: workspaceName,
      icon: formatIconName(iconName),
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const responseData = await response.json();
      console.log('Workspace created successfully:', responseData);
      onClose(); // Close the dialog on successful creation
      onWorkspaceCreated(responseData); // Trigger refresh or update of workspace list
      // Reset the state for the next creation
    } catch (error) {
      console.error('Error creating workspace:', error.message);
      setErrorMessage(error.message); // Set the error message in state to display in the dialog
    } finally {
      setIsLoading(false); // Stop loading, regardless of the outcome
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
          <DialogDescription>
            Enter the details for the new workspace.
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="workspaceName" className="text-right col-span-1">
              Name:
            </Label>
            <Input
              id="workspaceName"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="Enter Workspace Name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right col-span-1">Icon:</Label>
            <IconSelector selectedIcon={iconName} onIconSelect={setIconName} />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Workspace'}
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
