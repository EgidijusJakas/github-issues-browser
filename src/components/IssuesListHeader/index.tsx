import {
  Stack,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { selectFiltersSortBy, setFiltersPageNumber, setFiltersSortBy } from '../../store/filtersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  loadAndSetIssues,
  selectIssuesOrganizationName,
  selectIssuesRepositoryName,
} from '../../store/issuesSlice';
import translations from './translations';
import { DEFAULT_PAGE_NUMBER, SortBy } from '../../constants';

const IssuesListHeader = () => {
  const dispatch = useAppDispatch();

  const repositoryName = useAppSelector(selectIssuesRepositoryName);
  const organizationName = useAppSelector(selectIssuesOrganizationName);
  const sortBy = useAppSelector(selectFiltersSortBy);

  const onSortChange = (event: SelectChangeEvent) => {
    dispatch(setFiltersSortBy(event.target.value as SortBy));
    dispatch(setFiltersPageNumber(DEFAULT_PAGE_NUMBER));
    dispatch(loadAndSetIssues());
  };

  return (
    <Stack direction="row" justifyContent="space-between" paddingTop="18px" alignItems="center">
      <Typography variant="h6" component="div" textAlign="left">
        {organizationName}/{repositoryName} {translations.issues}:
      </Typography>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="sort-by-label">{translations.sortBy}</InputLabel>
          <Select
            size="small"
            labelId="sort-by-label"
            value={sortBy}
            label={translations.sortBy}
            onChange={onSortChange}
            id="sort-by"
          >
            <MenuItem value={SortBy.newest}>{translations.newest}</MenuItem>
            <MenuItem value={SortBy.oldest}>{translations.oldest}</MenuItem>
            <MenuItem value={SortBy.mostCommented}>{translations.mostCommented}</MenuItem>
            <MenuItem value={SortBy.leastCommented}>{translations.leastCommented}</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
}

export default IssuesListHeader;