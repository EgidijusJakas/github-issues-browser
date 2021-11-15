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

  const onOrganizationNameChange = (event: any) => {
    dispatch(setFiltersOrganizationName(event.target.value));
  };

  const onRepositoryNameChange = (event: any) => {
    dispatch(setFiltersRepositoryName(event.target.value));
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
      />
      <TextField
        size="small"
        label={translations.repository}
        variant="outlined"
        value={repositoryName}
        onChange={onRepositoryNameChange}
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