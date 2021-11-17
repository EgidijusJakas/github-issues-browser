import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
import issuesReducer from './issuesSlice';

export const reducer = {
  filters: filtersReducer,
  issues: issuesReducer,
}

export const store = configureStore({
  reducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
