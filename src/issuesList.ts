import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './app/store';

interface IUser {
    login: string;
}

interface IIssue {
    id: number;
    title: string;
    created_at: string;
    user: IUser
}

export enum Status {
  idle = 'idle',
  loading = 'loading'
}

export interface IIssuesListState {
  items: IIssue[];
  status: Status;
  totalCount: number;
}

const initialState: IIssuesListState = {
  items: [],
  status: Status.idle,
  totalCount: 0,
};

interface ISearchParams {
  page: number;
}

export const queryGithubIssues = createAsyncThunk(
  'issuesList/fetchItems',
  async ({ page }: ISearchParams, { getState }) => {
    const { searchControls: { organizationName, repositoryName } } = getState() as RootState
    const response = await fetch(`https://api.github.com/search/issues?q=repo:${organizationName}/${repositoryName}+type:issue+state:open&page=${page}`);
    return response.json();
  }
);

export const issuesList = createSlice({
  name: 'issuesList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(queryGithubIssues.pending, (state) => {
        console.log('pending?')
        state.items = []
        state.status = Status.loading;
      })
      .addCase(queryGithubIssues.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = Status.idle;
        state.items = action.payload.items ? action.payload.items.map(({ id, title, created_at, user }: IIssue) => ({
          id,
          title,
          created_at,
          username: user.login,
        })) : [];
        state.totalCount = action.payload.total_count || 0;
      });
  },
});

export const selectIssuesListItems = (state: RootState) => state.issuesList.items;
export const selectIssuesListStatus = (state: RootState) => state.issuesList.status;
export const selectIssuesListTotalCount = (state: RootState) => state.issuesList.totalCount;

export default issuesList.reducer;
