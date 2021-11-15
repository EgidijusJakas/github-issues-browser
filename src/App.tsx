import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import './App.css';
import {
  isEmptyIssuesList,
  selectIssuesListItems,
  selectIssuesListStatus,
  Status,
  isSearchApplied,
} from './IssuesList/issuesListSlice';
import { useAppSelector } from './app/hooks';
import SearchControls from './SearchControls/SearchControls';
import IssuesList from './IssuesList/IssuesList';
import IssuesListHeader from './IssuesListHeader/IssuesListHeader';


const App = () => {
  const listItems = useAppSelector(selectIssuesListItems);
  const status = useAppSelector(selectIssuesListStatus);
  const searchIsApplied = useAppSelector(isSearchApplied);
  const issuesListIsEmpty = useAppSelector(isEmptyIssuesList);

  return (
    <div className="App">
      <Typography variant="h3" gutterBottom component="div">
        Github issues browser
      </Typography>
      <SearchControls />
      { searchIsApplied && <IssuesListHeader /> }
      {issuesListIsEmpty &&
        <Paper sx={{margin: '18px 0 18px 0', padding: '18px'}}>
          <Typography variant="h5" component="div">
            No results found
          </Typography>
        </Paper>
      }
      {status === Status.loading &&
        <Box sx={{margin: 24}}>
          <CircularProgress />
        </Box>
      }
      { !!listItems.length && <IssuesList /> }
    </div>
  );
}

export default App;
