import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks';
import SearchControls from '../SearchControls';
import IssuesList from '../IssuesList';
import IssuesListHeader from '../IssuesListHeader';
import {
  isEmptyState,
  isSearchApplied,
  selectIssuesList,
  selectIssuesStatus,
} from '../../store/issuesSlice';
import classes from './App.module.css';
import translations from './translations';
import { Status } from '../../constants';

const App = () => {
  const issuesList = useAppSelector(selectIssuesList);
  const status = useAppSelector(selectIssuesStatus);
  const searchIsApplied = useAppSelector(isSearchApplied);
  const isEmpty = useAppSelector(isEmptyState);

  return (
    <div className={classes.root}>
      <Typography variant="h3">
        {translations.title}
      </Typography>
      <SearchControls />
      { searchIsApplied && <IssuesListHeader /> }
      {isEmpty &&
        <Paper className={classes.emptyState}>
          <Typography variant="h5">
            {translations.emptyState}
          </Typography>
        </Paper>
      }
      {status === Status.loading &&
        <Box margin={24}>
          <CircularProgress />
        </Box>
      }
      { !!issuesList.length && <IssuesList /> }
    </div>
  );
}

export default App;
