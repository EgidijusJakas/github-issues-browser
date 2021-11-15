
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const paginationSlice = createSlice({
  name: 'pageNumber',
  initialState: 1,
  reducers: {
    setPageNumber: (state, action: PayloadAction<number>) => action.payload
  },
});

export const { setPageNumber } = paginationSlice.actions;

export const selectPageNumber = (state: RootState) => state.pageNumber;

export default paginationSlice.reducer;
