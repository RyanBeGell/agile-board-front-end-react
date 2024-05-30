import { customFetch } from '@/components/auth/CustomFetch';
import { clearBoards } from '@/components/board/board-slice';
import { AppDispatch, RootState } from '@/store/store';
import { Workspace } from '@/types/interfaces';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface WorkspacesState {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  loading: boolean;
  error: string | null;
}

const initialState: WorkspacesState = {
  workspaces: [],
  currentWorkspace: null,
  loading: false,
  error: null,
};

export const fetchWorkspaces = createAsyncThunk(
  'workspaces/fetchWorkspaces',
  async (_, { rejectWithValue }) => {
    try {
      const response = await customFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      return data.flatMap((user: any) => user.workspaces); // Adjust this if the data structure differs
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWorkspace = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>(
  'workspaces/deleteWorkspace',
  async (workspaceId, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await customFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete workspace: ${response.statusText}`);
      }
      const state = getState();
      if (state.workspaces.currentWorkspace?.id === workspaceId) {
        dispatch(selectWorkspace(null)); // Reset currentWorkspace
      }
      dispatch(clearBoards()); // Clear the boards associated with the deleted workspace
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unexpected error'
      );
    }
  }
);

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    selectWorkspace(state, action: PayloadAction<string | null>) {
      if (action.payload === null) {
        state.currentWorkspace = null;
      } else {
        const foundWorkspace = state.workspaces.find(
          (workspace) => workspace.id === action.payload
        );
        state.currentWorkspace = foundWorkspace || null;
      }
    },
    addWorkspace(state, action: PayloadAction<Workspace>) {
      state.workspaces.push(action.payload);
    },
    setCurrentWorkspace(state, action) {
      state.currentWorkspace = action.payload;
    },
    removeWorkspace(state, action: PayloadAction<string>) {
      state.workspaces = state.workspaces.filter(
        (workspace) => workspace.id !== action.payload
      );
      if (state.currentWorkspace?.id === action.payload) {
        state.currentWorkspace = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.workspaces = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch workspaces';
      });
  },
});

export const {
  addWorkspace,
  selectWorkspace,
  removeWorkspace,
  setCurrentWorkspace,
} = workspacesSlice.actions;
export default workspacesSlice.reducer;
