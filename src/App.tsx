import React from 'react';
import { Box, CircularProgress, Stack, Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Pagination, Paper } from '@mui/material';

import classes from './Pagination.module.css';
import './App.css';
import { queryGithubIssues, selectIssuesListItems, selectIssuesListStatus, selectIssuesListTotalCount, Status } from './issuesList';
import { useAppDispatch, useAppSelector } from './app/hooks';
import SearchControls from './SearchControls/SearchControls';


const App = () => {
  const [page, setPage] = React.useState(1)
  const dispatch = useAppDispatch();

  const listItems = useAppSelector(selectIssuesListItems);
  const status = useAppSelector(selectIssuesListStatus);
  const totalCount = useAppSelector(selectIssuesListTotalCount);

  const onPaginationChange = (e: any, value: number) => {
    setPage(value)
    dispatch(queryGithubIssues({ page: value}))
  }

  return (
    <div className="App">
      {status}
      <Typography variant="h3" gutterBottom component="div">
        Github issues browser
      </Typography>
      <SearchControls />
        {!listItems.length && status !== Status.loading && <Stack marginTop="18px" marginBottom="18px"><Card>
        <CardContent>
          <Typography variant="h5" component="div">
            No results found
          </Typography>
        </CardContent>
      </Card></Stack>}
      {status === Status.loading && <Box sx={{margin: 24}}>
        <CircularProgress />
      </Box>}
      {
        !!listItems.length && <div>
            <List sx={{ width: '100%',   bgcolor: 'background.paper' }}>
              { (listItems as any).map((issue: any)=>(
                <Stack marginTop="18px" marginBottom="18px" key={issue.id}><Paper elevation={3}><ListItem>
                  <ListItemText primary={issue.title} secondary={`#${issue.number} opened on ${issue.createdAt} by ${issue.loginName}`} />
                </ListItem></Paper></Stack>
            
              ))} 
            </List>
            <Divider />
            <Box sx={{marginTop: '12px'}}>
              <Pagination
                count={Math.ceil(totalCount/30)}
                page={page}
                onChange={onPaginationChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                classes={{ul: classes.pagination}}
              />
            </Box>
          </div>
      }
    </div>
    
  );
}

export default App;
