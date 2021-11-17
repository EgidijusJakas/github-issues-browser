import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import App from '.';
import { mockFetch } from '../../testUtils';

const renderWithInitialState = () => render(
  <Provider store={store}>
    <App />
  </Provider>
);

describe('App', () => {
  describe('on initial state', () => {
    it('should render title and controls', () => {
      const { getByRole } = renderWithInitialState();

      expect(getByRole('heading', { name: /github issues browser/i })).toBeInTheDocument();
      expect(getByRole('textbox', { name: /organization/i })).toBeInTheDocument();
      expect(getByRole('textbox', { name: /repository/i })).toBeInTheDocument();
      expect(getByRole('button', { name: /search/i })).toBeInTheDocument();
    });
    it('should not render empty state', () => {
      const { queryByRole } = renderWithInitialState();
      expect(queryByRole('heading', { name: /no results found/i })).not.toBeInTheDocument();
    });
    it('should not render issues', () => {
      const { queryByRole } = renderWithInitialState();
      expect(queryByRole('listitem')).not.toBeInTheDocument();
    });
    it('should not render sort control', () => {
      const { queryByRole } = renderWithInitialState();
      expect(queryByRole('button', { name: /sort by/i })).not.toBeInTheDocument();
    });
  });

  describe('on initial state', () => {
    const renderAndSubmitForm = (response: unknown) => {
      global.fetch = mockFetch(response);

      const { getByRole, ...rest } = renderWithInitialState();

      const organizationInput = getByRole('textbox', { name: /organization/i });
      const repositoryInput = getByRole('textbox', { name: /repository/i });
      const searchButton = getByRole('button', { name: /search/i });

      fireEvent.change(organizationInput, { target: { value: 'orgName' } })
      fireEvent.change(repositoryInput, { target: { value: 'repoName' } })
      fireEvent.click(searchButton);

      return {
        getByRole,
        ...rest,
      };
    };

    it('should show issues list', async () => {
      const { queryByRole, getByRole, findAllByRole } = renderAndSubmitForm({
        items: [{
          created_at: '2021-11-15T21:35:11Z',
          id: 11111,
          number: 1,
          title: 'title',
          html_url: 'url',
          user: { login: 'username'},
        }],
        total_count: 1,
      });

      expect(getByRole('progressbar')).toBeInTheDocument();
      expect((await findAllByRole('listitem'))[0]).toBeInTheDocument();
      expect(queryByRole('progressbar')).not.toBeInTheDocument();
    });
  
    it('should show empty list', async () => {
      const { queryByRole, getByRole, findByRole } = renderAndSubmitForm({ items: null });

      expect(getByRole('progressbar')).toBeInTheDocument();
      expect(await findByRole('heading', { name: /no results found/i })).toBeInTheDocument();
      expect(queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });
});
