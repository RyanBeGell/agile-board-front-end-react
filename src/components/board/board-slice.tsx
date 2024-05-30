// features/boards/boardsSlice.ts
import { customFetch } from '@/components/auth/CustomFetch';
import { Board, BoardsState, NewBoard } from '@/types/interfaces';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunk for fetching boards
export const fetchBoards = createAsyncThunk<Board[], string>(
  'boards/fetchBoards',
  async (workspaceId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await customFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/boards/workspace/${workspaceId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch boards: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unexpected error'
      );
    }
  }
);

export const createBoard = createAsyncThunk<Board, NewBoard>(
  'boards/createBoard',
  async (boardData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = localStorage.getItem('token');
      const response = await customFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/boards`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(boardData),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to create board: ${response.statusText}`);
      }
      return (await response.json()) as Board;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unexpected error'
      );
    }
  }
);

export const deleteBoard = createAsyncThunk<void, String>(
  'boards/deleteBoard',
  async (boardId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await customFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${boardId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete board: ${response.statusText}`);
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unexpected error'
      );
    }
  }
);

const initialState: BoardsState = {
  items: [],
  status: 'idle',
  error: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    clearBoards(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchBoards.fulfilled,
        (state, action: PayloadAction<Board[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
        }
      )
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch boards';
      });
  },
});
export const { clearBoards } = boardsSlice.actions;
export default boardsSlice.reducer;
