// WorkspaceContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Types.ts
export interface Workspace {
  id: number;
  name: string;
  icon: string; // Update this if icon has specific string literals or is an enum
}

export interface WorkspaceContextType {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;
  loadWorkspaces: () => Promise<void>;
  addWorkspace: (workspace: Workspace) => void;
  setSelectedWorkspace: (workspace: Workspace) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

interface WorkspaceProviderProps {
  children: ReactNode; // Define children prop explicitly
}

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);

  const loadWorkspaces = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setWorkspaces(data.flatMap((user: any) => user.workspaces));
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  }, []);

  const addWorkspace = useCallback((workspace: Workspace) => {
    setWorkspaces(prev => [...prev, workspace]);
  }, []);

  return (
    <WorkspaceContext.Provider value={{ workspaces, selectedWorkspace, loadWorkspaces, addWorkspace, setSelectedWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspaces = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspaces must be used within a WorkspaceProvider');
  }
  return context;
};