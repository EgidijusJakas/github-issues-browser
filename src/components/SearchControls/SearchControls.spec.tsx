import { render, fireEvent } from '@testing-library/react';

import { Provider } from 'react-redux';
import { store } from '../../store';
import SearchControls from '.';

const renderWithInitialState = () => render(
  <Provider store={store}>
    <SearchControls />
  </Provider>
);

describe('SearchControls', () => {
  it('search button should be disabled if there empty inputs', () => {
    const { getByRole } = renderWithInitialState();
    const organizationInput = getByRole('textbox', { name: /organization/i });

    expect(getByRole('button', { name: /search/i })).toBeDisabled();

    fireEvent.change(organizationInput, {target: {value: 'orgName'}});

    expect(getByRole('button', { name: /search/i })).toBeDisabled();
  });
  it('search button should be enabled if both inputs are filled', () => {
    const { getByRole } = renderWithInitialState();
    const organizationInput = getByRole('textbox', { name: /organization/i });
    const repositoryInput = getByRole('textbox', { name: /repository/i });

    fireEvent.change(organizationInput, {target: {value: 'orgName'}});
    fireEvent.change(repositoryInput, {target: {value: 'repoName'}});

    expect(getByRole('button', { name: /search/i })).toBeEnabled();
  });
});
