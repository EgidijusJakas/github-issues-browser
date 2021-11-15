
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export enum SortBy {
  newest = 'created-desc',
  oldest = 'created-asc',
  mostCommented = 'comments-desc',
  leastCommented = 'comments-asc',
}

export const sortBySlice = createSlice({
  name: 'sortBy',
  initialState: SortBy.newest,
  reducers: {
    setSortBy: (state, action: PayloadAction<SortBy>) => action.payload
  },
});

export const { setSortBy } = sortBySlice.actions;

export const selectSortBy = (state: RootState) => state.sortBy;

export default sortBySlice.reducer;
