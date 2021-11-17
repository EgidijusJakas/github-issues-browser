import { TextField, Stack, Button, Tooltip } from '@mui/material';
import {
  selectFiltersOrganizationName,
  selectFiltersRepositoryName,
  setFiltersOrganizationName,
  setFiltersRepositoryName,
} from '../../store/filtersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadAndSetIssues, setIssuesOrganizationName, setIssuesRepositoryName } from '../../store/issuesSlice';
import translations from './translations';

const SearchControls = () => {
  const dispatch = useAppDispatch();
  const organizationName = useAppSelector(selectFiltersOrganizationName);
  const repositoryName = useAppSelector(selectFiltersRepositoryName);

  const onOrganizationNameChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFiltersOrganizationName(value));
  };

  const onRepositoryNameChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFiltersRepositoryName(value));
  };

  const onSubmit = () => {
    dispatch(setIssuesOrganizationName(organizationName));
    dispatch(setIssuesRepositoryName(repositoryName));
    dispatch(loadAndSetIssues());
  }

  const isSubmitDisabled = !organizationName || !repositoryName;

  return (
    <Stack direction="row" gap="24px" marginTop="48px" justifyContent="center">
      <TextField
        size="small"
        label={translations.organization}
        variant="outlined"
        value={organizationName}
        onChange={onOrganizationNameChange}
        id="organization"
      />
      <TextField
        size="small"
        label={translations.repository}
        variant="outlined"
        value={repositoryName}
        onChange={onRepositoryNameChange}
        id="repository"
      />
      <Tooltip arrow title={isSubmitDisabled ? translations.disabledInfo : '' }>
        <span>
          <Button variant="contained" onClick={onSubmit} disabled={isSubmitDisabled}>
            {translations.search}
          </Button>
        </span>
      </Tooltip>
    </Stack>
  );
}

export default SearchControls;