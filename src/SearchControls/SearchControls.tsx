import { TextField, Stack, Button, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectSearchResultsOrganizationName,
  selectSearchResultsRepositoryName, 
  setSearchControlsOrganizationName,
  setSearchResultsRepositoryName
} from './searchControlsSlice';
import { queryGithubIssues, setIssuesListOrganizationName, setIssuesListRepositoryName } from '../IssuesList/issuesListSlice';

const SearchControls = () => {
  const dispatch = useAppDispatch();
  const organizationName = useAppSelector(selectSearchResultsOrganizationName);
  const repositoryName = useAppSelector(selectSearchResultsRepositoryName);

  const onOrganizationNameChange = (event: any) => {
    dispatch(setSearchControlsOrganizationName(event.target.value))
  };

  const onRepositoryNameChange = (event: any) => {
    dispatch(setSearchResultsRepositoryName(event.target.value))
  };

  const onSubmit = async () => {
    dispatch(setIssuesListOrganizationName(organizationName))
    dispatch(setIssuesListRepositoryName(repositoryName))
    await dispatch(queryGithubIssues()).unwrap()
  }

  const isSubmitDisabled = !organizationName || !repositoryName;

  return (
    <Stack direction="row" gap="24px" marginTop="48px" justifyContent="center">
      <TextField size="small" label="Organization" variant="outlined" value={organizationName} onChange={onOrganizationNameChange} />
      <TextField size="small" label="Repository" variant="outlined" value={repositoryName} onChange={onRepositoryNameChange} />
      <Tooltip arrow title={isSubmitDisabled ? 'Please enter organization and repository names' : '' }>
        <span>
          <Button variant="contained" onClick={onSubmit} disabled={isSubmitDisabled}>
            Search
          </Button>
        </span>
      </Tooltip>
    </Stack>
  );
}

export default SearchControls;