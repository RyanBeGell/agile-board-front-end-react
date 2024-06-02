'use client'

import { customFetch } from '@/components/auth/CustomFetch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/store/hooks';
import { IconNames } from '@/types/icons';
import React, { useState } from 'react';
import IconSelector from './icon-selector';
import { addWorkspace, setCurrentWorkspace } from './workspace-slice';

const CreateWorkspaceForm: React.FC = () => {
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [iconName, setIconName] = useState<IconNames>('Layout');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

  // Format function to format icon to match the icon name in the API (Java Constant Case)
  const formatIconName = (iconName: string) => {
    return iconName
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/([a-zA-Z])(\d+)/g, '$1_$2')
      .toUpperCase();
  };

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      setErrorMessage('Workspace name is required.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(''); // Clear any previous error messages

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces`;
    const requestBody = {
      name: workspaceName,
      icon: formatIconName(iconName),
    };

    try {
      const response = await customFetch(url, {
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

      dispatch(addWorkspace(responseData));
      dispatch(setCurrentWorkspace(responseData));

      // Reset the state for the next creation
      setWorkspaceName('');
      setIconName('Layout');
    } catch (error) {
      console.error('Error creating workspace:', error.message);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full p-8">
      <div className="flex flex-col w-1/2 p-4">
        <h3 className="text-xl font-bold mb-4">Let's build a Workspace</h3>
        <h5 className="text-muted-foreground mb-6 text-md">
          Boost your productivity by making it easier for everyone to access
          boards in one location.
        </h5>
        <Label htmlFor="workspaceName" className="text-left font-semibold mb-2">
          Workspace name
        </Label>
        <Input
          id="workspaceName"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          placeholder="Enter Workspace Name"
          className="mb-2"
        />
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <p className="text-muted-foreground text-sm mb-6">
          This is the name of your company, team, or organization.
        </p>
        <Label className="text-left font-semibold mb-2">Workspace Icon</Label>
        <div className="mb-2">
          <IconSelector selectedIcon={iconName} onIconSelect={setIconName} />
        </div>
        <Button
          onClick={handleCreateWorkspace}
          className="w-full mt-4"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Workspace'}
        </Button>
      </div>
      <div className="w-1/2 flex justify-center items-center p-4">
        <img
          src="/undraw_collaborators.svg"
          alt="Collaborators"
          className="max-h-full "
        />
      </div>
    </div>
  );
};

export default CreateWorkspaceForm;
