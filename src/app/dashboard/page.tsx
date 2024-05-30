'use client';

import Sidebar from '@/app/workspace/sidebar';
import {
  fetchWorkspaces,
  selectWorkspace,
} from '@/app/workspace/workspace-slice';
import BoardsDashboard from '@/components/board/boards-dashboard';
import Navbar from '@/components/navbar/navbar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import CreateWorkspaceForm from '../workspace/create-workspace-form';

export default function Home() {
  const dispatch = useAppDispatch();
  const { currentWorkspace, workspaces, loading } = useAppSelector(
    (state: RootState) => state.workspaces
  );
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchAndSelectWorkspace = async () => {
      await dispatch(fetchWorkspaces());
      setInitialized(true);
    };
    fetchAndSelectWorkspace();
  }, [dispatch]);

  useEffect(() => {
    if (!currentWorkspace && workspaces.length > 0) {
      dispatch(selectWorkspace(workspaces[0].id));
    }
  }, [currentWorkspace, workspaces, dispatch]);

  if (!initialized) {
    return <p>Loading...</p>; // TODO: improve loading UI
  }

  return (
    <div className="bg-background">
      <Navbar />
      <div
        className="flex justify-center mt-12 mx-auto"
        style={{ maxWidth: 'calc(100% - 4rem)' }}
      >
        <div className="flex w-full max-w-screen-xl">
          {currentWorkspace && (
            <div className="flex-none">
              <Sidebar />
            </div>
          )}
          <div
            className={`flex-grow ${
              currentWorkspace ? 'ml-6' : ''
            } w-full max-w-full`}
          >
            {currentWorkspace ? <BoardsDashboard /> : <CreateWorkspaceForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
