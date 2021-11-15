
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface ISearchControlsState {
  organizationName: string;
  repositoryName: string;
}

const initialState: ISearchControlsState = {
  organizationName: '',
  repositoryName: '',
};

export const searchControlsSlice = createSlice({
  name: 'searchControls',
  initialState,
  reducers: {
    setSearchControlsOrganizationName: (state, action: PayloadAction<string>) => {
      state.organizationName = action.payload;
    },
    setSearchResultsRepositoryName: (state, action: PayloadAction<string>) => {
      state.repositoryName = action.payload;
    },
  },
});

export const { setSearchControlsOrganizationName, setSearchResultsRepositoryName } = searchControlsSlice.actions;

export const selectSearchResultsOrganizationName = (state: RootState) => state.searchControls.organizationName;
export const selectSearchResultsRepositoryName = (state: RootState) => state.searchControls.repositoryName;

export default searchControlsSlice.reducer;
