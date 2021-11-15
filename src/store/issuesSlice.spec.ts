import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import issuesReducer, {
  IIssuesState,
  Status,
  setIssuesOrganizationName,
  setIssuesRepositoryName,
  loadAndSetIssues,
} from './issuesSlice';

import filtersReducer, { SortBy } from './filtersSlice';

const initialFiltersState = {
  filters: { 
    organizationName: 'facebook',
    repositoryName: 'react',
    pageNumber: 5,
    sortBy: SortBy.leastCommented,
  },
};

const initialIssuesState: IIssuesState = {
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

const mockFetch = (response: unknown) => jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(response),
  })
) as jest.Mock;
  
describe('issues reducer', () => {
  it('should handle initial state', () => {
    expect(issuesReducer(undefined, { type: 'unknown' })).toEqual({
      list: [],
      status: Status.idle,
      totalCount: 0,
      organizationName: '',
      repositoryName: '',
    });
  });

  it('should handle setIssuesOrganizationName', () => {
    const actual = issuesReducer(initialIssuesState, setIssuesOrganizationName('facebook'));
    expect(actual.organizationName).toEqual('facebook');
  });

  it('should handle setIssuesRepositoryName', () => {
    const actual = issuesReducer(initialIssuesState, setIssuesRepositoryName('react'));
    expect(actual.repositoryName).toEqual('react');
  });

  describe('loadAndSetIssues', () => {
    let store: EnhancedStore<any, any>

    beforeEach(() => {
      store = configureStore({
        reducer: { issues: issuesReducer, filters: filtersReducer },
        preloadedState: initialFiltersState,
      });
    });

    it('should fetch with correct params', async () => {
      global.fetch = mockFetch({ items: null });

      store.dispatch(loadAndSetIssues());

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/search/issues?q=repo:facebook/react+type:issue+state:open+sort:comments-asc&page=5'
      );
    });

    it('should handle pending state', async () => {
      global.fetch = mockFetch({ items: null });

      store.dispatch(loadAndSetIssues());

      expect(store.getState().issues).toEqual({
        list: [],
        status: Status.loading,
        totalCount: 0,
        organizationName: '',
        repositoryName: ''
      });
    });

    it('should handle fulfilled state when there are no results', async () => {
      global.fetch = mockFetch({ items: null })

      await store.dispatch(loadAndSetIssues());

      expect(store.getState().issues).toEqual({
        list: [],
        status: Status.idle,
        totalCount: 0,
        organizationName: '',
        repositoryName: ''
      });
    });

    it('should handle fulfilled state when there are results', async () => {
      const id = 11111;
      const number = 1;
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

      await store.dispatch(loadAndSetIssues());

      expect(store.getState().issues).toEqual({
        list: [{
          createdAt: '11/15/2021',
          id,
          number,
          title,
          url,
          username,
        }],
        status: Status.idle,
        totalCount: 1,
        organizationName: '',
        repositoryName: ''
      });
    });
  });
});
