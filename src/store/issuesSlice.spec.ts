import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import issuesReducer, {
  IIssuesState,
  setIssuesOrganizationName,
  setIssuesRepositoryName,
  loadAndSetIssues,
  initialState as initialIssuesState,
} from './issuesSlice';

import { reducer, RootState } from '.'
import { SortBy, Status } from '../constants';
import { mockFetch } from '../testUtils';

const filtersState = {
  filters: { 
    organizationName: 'orgName',
    repositoryName: 'repoName',
    pageNumber: 5,
    sortBy: SortBy.leastCommented,
  },
};

const issuesState: IIssuesState = {
  list: [{
    createdAt: '15/11/2021',
    id: 1111,
    number: 1111,
    title: 'title',
    url: 'url',
    username: 'username',
  }],
  status: Status.idle,
  totalCount: 1,
  organizationName: 'orgName',
  repositoryName: 'repoName',
};
  
describe('issues reducer', () => {
  it('should handle initial state', () => {
    expect(issuesReducer(undefined, { type: 'unknown' })).toEqual(initialIssuesState);
  });

  it('should handle setIssuesOrganizationName', () => {
    const actual = issuesReducer(issuesState, setIssuesOrganizationName('facebook'));
    expect(actual.organizationName).toEqual('facebook');
  });

  it('should handle setIssuesRepositoryName', () => {
    const actual = issuesReducer(issuesState, setIssuesRepositoryName('react'));
    expect(actual.repositoryName).toEqual('react');
  });

  describe('loadAndSetIssues', () => {
    let store: EnhancedStore<RootState, any>

    beforeEach(() => {
      store = configureStore({
        reducer,
        preloadedState: filtersState,
      });
    });

    it('should fetch with correct params', () => {
      global.fetch = mockFetch({ items: null });

      store.dispatch(loadAndSetIssues());

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/search/issues?q=repo:orgName/repoName+type:issue+state:open+sort:comments-asc&page=5'
      );
    });

    it('should handle pending state', () => {
      global.fetch = mockFetch({ items: null });

      store.dispatch(loadAndSetIssues());

      expect(store.getState().issues).toEqual({
        ...initialIssuesState,
        status: Status.loading,
      });
    });

    it('should handle rejected state', async () => {
      global.fetch = jest.fn(() =>
        Promise.reject({
          json: () => Promise.reject({}),
        })
      ) as jest.Mock;

      await store.dispatch(loadAndSetIssues());

      expect(store.getState().issues).toEqual(initialIssuesState);
    });

    it('should handle fulfilled state when there are no results', async () => {
      global.fetch = mockFetch({ items: null })

      await store.dispatch(loadAndSetIssues());

      expect(store.getState().issues).toEqual(initialIssuesState);
    });

    it('should handle fulfilled state when there are results', async () => {
      const id = 123;
      const number = 1771;
      const title = 'title';
      const url = 'url';
      const username = 'username';

      global.fetch = mockFetch({
        items: [{
          created_at: '2021-11-15T21:35:11Z',
          id,
          number,
          title,
          html_url: url,
          user: { login: username},
        }],
        total_count: 1,
      });

      // @ts-ignore
      global.Intl.DateTimeFormat = jest.fn(() => ({
          format: () => 'formatted date',
      }))

      await store.dispatch(loadAndSetIssues());

      expect(store.getState().issues).toEqual({
        ...initialIssuesState,
        list: [{
          createdAt: 'formatted date',
          id,
          number,
          title,
          url,
          username,
        }],
        status: Status.idle,
        totalCount: 1,
      });
    });
  });
});
