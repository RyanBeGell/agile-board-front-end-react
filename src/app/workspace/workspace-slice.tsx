import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Workspace } from '@/types/interfaces';

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      return data.flatMap((user: any) => user.workspaces);  // Adjust this if the data structure differs
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    selectWorkspace(state, action: PayloadAction<string>) {
      const foundWorkspace = state.workspaces.find(workspace => workspace.id === action.payload);
      state.currentWorkspace = foundWorkspace || null;
    },
    addWorkspace(state, action: PayloadAction<Workspace>) {
      state.workspaces.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.pending, (state) => {
        state.loading = true;
        state.error = null;  // Clear any existing errors
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.workspaces = action.payload;
        state.loading = false;
        state.error = null;  // Clear errors on successful fetch
      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch workspaces';  // Set the error message
      });
  },
});

export const { addWorkspace, selectWorkspace } = workspacesSlice.actions;
export default workspacesSlice.reducer;