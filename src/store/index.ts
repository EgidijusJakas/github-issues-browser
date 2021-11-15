import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
import issuesReducer from './issuesSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    issues: issuesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
