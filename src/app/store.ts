import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchControlsReducer from '../SearchControls/searchControlsSlice';
import issuesListReducer from '../issuesList';

export const store = configureStore({
  reducer: {
    searchControls: searchControlsReducer,
    issuesList: issuesListReducer,
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
