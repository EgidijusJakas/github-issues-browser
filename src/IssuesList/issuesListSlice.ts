import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface IUser {
    login: string;
}

interface IIssue {
  id: number;
  title: string;
  createdAt: string;
  username: IUser
  number: number;
  url: string;
}

export enum Status {
  idle = 'idle',
  loading = 'loading'
}

export interface IIssuesListState {
  items: IIssue[];
  status: Status;
  totalCount: number;
  organizationName: string;
  repositoryName: string;
}

const initialState: IIssuesListState = {
  items: [],
  status: Status.idle,
  totalCount: 0,
  organizationName: '',
  repositoryName: '',
};

export const queryGithubIssues = createAsyncThunk(
  'issuesList/fetchItems',
  async (_params, { getState }) => {
    const { searchControls: { organizationName, repositoryName }, pageNumber, sortBy } = getState() as RootState
    const response = await fetch(`https://api.github.com/search/issues?q=repo:${organizationName}/${repositoryName}+type:issue+state:open+sort:${sortBy}&page=${pageNumber}`);

    return response.json();
  }
);

export const issuesList = createSlice({
  name: 'issuesList',
  initialState,
  reducers: {
    setIssuesListOrganizationName: (state, action: PayloadAction<string>) => {
      state.organizationName = action.payload;
    },
    setIssuesListRepositoryName: (state, action: PayloadAction<string>) => {
      state.repositoryName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(queryGithubIssues.pending, (state) => {
        state.items = [];
        state.totalCount = 0;
        state.status = Status.loading;
      })
      .addCase(queryGithubIssues.fulfilled, (state, action) => {
        state.status = Status.idle;

        if (!action.payload.items) {
          return;
        }

        state.items = action.payload.items.map(({ id, title, created_at, user, number, html_url }: any) => ({
          id,
          title,
          createdAt: new Intl.DateTimeFormat().format(new Date(created_at)),
          username: user.login,
          number,
          url: html_url,
        }));
        state.totalCount = action.payload.total_count;
      });
  },
});

export const { setIssuesListOrganizationName, setIssuesListRepositoryName } = issuesList.actions;

export const selectIssuesListItems = (state: RootState) => state.issuesList.items;
export const selectIssuesListStatus = (state: RootState) => state.issuesList.status;
export const selectIssuesListTotalCount = (state: RootState) => state.issuesList.totalCount;
export const selectIssuesListOrganizationName = (state: RootState) => state.issuesList.organizationName;
export const selectIssuesListRepositoryName = (state: RootState) => state.issuesList.repositoryName;
export const isSearchApplied = (state: RootState) =>
  selectIssuesListOrganizationName(state) && selectIssuesListRepositoryName(state);
export const isEmptyIssuesList = (state: RootState) =>
  isSearchApplied(state) && selectIssuesListStatus(state) !== Status.loading && !selectIssuesListItems(state).length;

export default issuesList.reducer;
