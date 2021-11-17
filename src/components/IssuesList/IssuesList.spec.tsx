import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { reducer, RootState } from '../../store';
import IssuesList from '.';
import { initialState as initialIssuesState } from '../../store/issuesSlice';
import { initialState as initialFiltersState } from '../../store/filtersSlice';
import { ITEMS_COUNT_PER_PAGE } from '../../constants';

const renderIssuesListWithState = (state: RootState) => render(
  <Provider store={configureStore({
    reducer,
    preloadedState: state,
  })}>
    <IssuesList />
  </Provider>
);

describe('IssuesList', () => {
  it('should render pagination when there are more than two pages', () => {
    const { getByRole } = renderIssuesListWithState({
      filters: initialFiltersState,
      issues: {
        ...initialIssuesState,
        totalCount: ITEMS_COUNT_PER_PAGE + 1,
      },
    });
    
    expect(getByRole('navigation', { name: /pagination navigation/i })).toBeInTheDocument();
  });
  it('should not render pagination when there is only one page', () => {
    const { queryByRole } = renderIssuesListWithState({
      filters: initialFiltersState,
      issues: {
        ...initialIssuesState,
        totalCount: ITEMS_COUNT_PER_PAGE - 1,
      },
    });
    
    expect(queryByRole('navigation', { name: /pagination navigation/i })).not.toBeInTheDocument();
  });
});
