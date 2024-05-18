import { configureStore } from '@reduxjs/toolkit';
import workspacesReducer from '../app/workspace/workspace-slice';
import boardsReducer from '@/components/board/board-slice';
import type { ThunkAction, Action } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: {
      workspaces: workspacesReducer,
      boards: boardsReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;