import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Pagination from '.';
import { Status } from '../../constants';

describe('Pagination', () => {
  it('should set pageNumber and start loading on page click', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Pagination pageCount={2} />
      </Provider>
    );
    fireEvent.click(getByRole('button', { name: /go to page 2/i }));
    
    const { filters, issues } = store.getState();

    expect(filters.pageNumber).toEqual(2);
    expect(issues.status).toEqual(Status.loading);
  });
});
