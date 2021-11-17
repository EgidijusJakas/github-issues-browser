import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { DEFAULT_PAGE_NUMBER, SortBy } from '../constants';

export interface IFiltersState {
  organizationName: string;
  repositoryName: string;
  pageNumber: number;
  sortBy: SortBy;
}

export const initialState: IFiltersState = {
  organizationName: '',
  repositoryName: '',
  pageNumber: DEFAULT_PAGE_NUMBER,
  sortBy: SortBy.newest,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFiltersOrganizationName: (state, action: PayloadAction<string>) => {
      state.organizationName = action.payload;
    },
    setFiltersRepositoryName: (state, action: PayloadAction<string>) => {
      state.repositoryName = action.payload;
    },
    setFiltersPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setFiltersSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setFiltersOrganizationName,
  setFiltersRepositoryName,
  setFiltersSortBy,
  setFiltersPageNumber,
} = filtersSlice.actions;

export const selectFiltersOrganizationName = (state: RootState) => state.filters.organizationName;
export const selectFiltersRepositoryName = (state: RootState) => state.filters.repositoryName;
export const selectFiltersPageNumber = (state: RootState) => state.filters.pageNumber;
export const selectFiltersSortBy = (state: RootState) => state.filters.sortBy;

export default filtersSlice.reducer;
