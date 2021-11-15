import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchControlsReducer from '../SearchControls/searchControlsSlice';
import paginationReducer from '../Pagination/paginationSlice';
import issuesListReducer from '../IssuesList/issuesListSlice';
import issuesListHeader from '../IssuesListHeader/issuesListHeaderSlice';

export const store = configureStore({
  reducer: {
    searchControls: searchControlsReducer,
    issuesList: issuesListReducer,
    pageNumber: paginationReducer,
    sortBy: issuesListHeader,
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
