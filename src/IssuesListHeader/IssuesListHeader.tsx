import { Stack, Typography, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { queryGithubIssues, selectIssuesListOrganizationName, selectIssuesListRepositoryName } from '../IssuesList/issuesListSlice';
import { selectSortBy, setSortBy, SortBy } from './issuesListHeaderSlice';

const IssuesListHeader = () => {
  const dispatch = useAppDispatch();

  const repositoryName = useAppSelector(selectIssuesListRepositoryName)
  const organizationName = useAppSelector(selectIssuesListOrganizationName)
  const sortBy = useAppSelector(selectSortBy);

  const onSortChange = (event: SelectChangeEvent) => {
    dispatch(setSortBy(event.target.value as SortBy))
    dispatch(queryGithubIssues());
  };

  return (
    <Stack direction="row" justifyContent="space-between" paddingTop="18px" alignItems="center">
      <Typography variant="h6" component="div" textAlign="left">
        {organizationName}/{repositoryName} issues:
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
          size="small"
          labelId="sort-by-label"
          value={sortBy}
          label="Sort by"
          onChange={onSortChange}
          >
            <MenuItem value={SortBy.newest}>Newest</MenuItem>
            <MenuItem value={SortBy.oldest}>Oldest</MenuItem>
            <MenuItem value={SortBy.mostCommented}>Most commented</MenuItem>
            <MenuItem value={SortBy.leastCommented}>Least commented</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
}

export default IssuesListHeader;