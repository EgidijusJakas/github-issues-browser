import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { fetchGithubIssues } from '../data/issues';

interface IIssue {
  id: number;
  title: string;
  createdAt: string;
  username: string;
  number: number;
  url: string;
}

export enum Status {
  idle = 'idle',
  loading = 'loading',
}

interface IIssuesRepo {
  id: string;
  title: string;
  created_at: string;
  user: { login: string; };
  number: number;
  html_url: string;
}

export interface IIssuesState {
  list: IIssue[];
  status: Status;
  totalCount: number;
  organizationName: string;
  repositoryName: string;
}

const initialState: IIssuesState = {
  list: [],
  status: Status.idle,
  totalCount: 0,
  organizationName: '',
  repositoryName: '',
};

export const loadAndSetIssues = createAsyncThunk(
  'issues/loadAndSet',
  async (_params, { getState }) => {
    const { filters } = getState() as RootState
    const response = await fetchGithubIssues(filters);
    return response.json();
  }
);

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssuesOrganizationName: (state, action: PayloadAction<string>) => {
      state.organizationName = action.payload;
    },
    setIssuesRepositoryName: (state, action: PayloadAction<string>) => {
      state.repositoryName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAndSetIssues.pending, (state) => {
        state.list = [];
        state.totalCount = 0;
        state.status = Status.loading;
      })
      .addCase(loadAndSetIssues.fulfilled, (state, action) => {
        state.status = Status.idle;

        if (!action.payload.items) {
          return;
        }

        state.list = action.payload.items.map(({ id, title, created_at, user, number, html_url }: IIssuesRepo) => ({
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

export const { setIssuesOrganizationName, setIssuesRepositoryName } = issuesSlice.actions;

export const selectIssuesList = (state: RootState) => state.issues.list;
export const selectIssuesStatus = (state: RootState) => state.issues.status;
export const selectIssuesTotalCount = (state: RootState) => state.issues.totalCount;
export const selectIssuesOrganizationName = (state: RootState) => state.issues.organizationName;
export const selectIssuesRepositoryName = (state: RootState) => state.issues.repositoryName;
export const isSearchApplied = (state: RootState) =>
  selectIssuesOrganizationName(state) && selectIssuesRepositoryName(state);
export const isEmptyIssuesList = (state: RootState) =>
  isSearchApplied(state) && selectIssuesStatus(state) !== Status.loading && !selectIssuesList(state).length;

export default issuesSlice.reducer;
