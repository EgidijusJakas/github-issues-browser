
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
    setOrganizationName: (state, action: PayloadAction<string>) => {
      state.organizationName = action.payload;
    },
    setRepositoryName: (state, action: PayloadAction<string>) => {
      state.repositoryName = action.payload;
    },
  },
});

export const { setOrganizationName, setRepositoryName } = searchControlsSlice.actions;

export const selectOrganizationName = (state: RootState) => state.searchControls.organizationName;
export const selectRepositoryName = (state: RootState) => state.searchControls.repositoryName;

export default searchControlsSlice.reducer;
