import { TextField, Stack, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectOrganizationName, selectRepositoryName, setOrganizationName, setRepositoryName } from './searchControlsSlice';
import { queryGithubIssues } from '../issuesList';

const SearchControls = () => {
  const dispatch = useAppDispatch();
  const organizationName = useAppSelector(selectOrganizationName);
  const repositoryName = useAppSelector(selectRepositoryName);

  const onOrganizationNameChange = (event: any) => {
    dispatch(setOrganizationName(event.target.value))
  };

  const onRepositoryNameChange = (event: any) => {
    dispatch(setRepositoryName(event.target.value))
  };

  const onSubmit = async () => {
    dispatch(queryGithubIssues({ page: 0}))
  }

  return (
    <Stack direction="row" gap="24px" marginTop="48px">
      <TextField label="Organization" variant="outlined" value={organizationName} onChange={onOrganizationNameChange} />
      <TextField label="Repository" variant="outlined" value={repositoryName} onChange={onRepositoryNameChange} />
      <Button variant="contained" onClick={onSubmit}>Search</Button>
    </Stack>
  );
}

export default SearchControls;