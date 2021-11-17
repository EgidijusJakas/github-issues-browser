import { render, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { reducer } from '../../store';
import IssuesListHeader from '.';
import { Status, initialState as initialIssuesState } from '../../store/issuesSlice';
import { DEFAULT_PAGE_NUMBER, initialState as initialFiltersState, SortBy } from '../../store/filtersSlice';

describe('IssuesListHeader', () => {
  it('should reset page number and start loading on sort change', async () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        filters: {
          ...initialFiltersState,
          pageNumber: 5,
        },
        issues: initialIssuesState,
      },
    });

    const { getByRole } = render(
      <Provider store={store}>
        <IssuesListHeader />
      </Provider>
    );

    fireEvent.mouseDown(getByRole('button', { name: /sort by/i }));
    fireEvent.click(getByRole('option', { name: /least commented/i }));

    const { filters, issues } = store.getState();

    expect(filters.sortBy).toEqual(SortBy.leastCommented);
    expect(filters.pageNumber).toEqual(DEFAULT_PAGE_NUMBER);
    expect(issues.status).toEqual(Status.loading);
  });
});
