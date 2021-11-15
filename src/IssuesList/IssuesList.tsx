import { List, Paper, ListItem, ListItemText, Divider, Link } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { selectIssuesListItems, selectIssuesListTotalCount } from './issuesListSlice';
import Pagination from '../Pagination/Pagination';

const IssuesList = () => {
  const listItems = useAppSelector(selectIssuesListItems);
  const totalCount = useAppSelector(selectIssuesListTotalCount);
  const pageCount = Math.ceil(totalCount/30);

  return (
    <div>
      <List>
        { listItems.map(({ id, title, number, createdAt, username, url }) => (
          <Paper elevation={3} sx={{ margin: '18px 0 18px 0'}} key={id}>
            <ListItem>
              <ListItemText
                primary={
                  <Link href={url} underline="none" target="_blank">
                    {title}
                  </Link>}
                secondary={`#${number} opened on ${createdAt} by ${username}`} />
            </ListItem>
          </Paper>
        ))} 
      </List>
      {pageCount > 1 &&
        [
          <Divider key="divider" />,
          <Pagination pageCount={pageCount} key="pagination" />
        ]
      }
    </div>
  );
}

export default IssuesList;