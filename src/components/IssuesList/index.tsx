import { List, Paper, ListItem, ListItemText, Divider, Link } from '@mui/material';
import { useAppSelector } from '../../hooks';
import Pagination from '../Pagination';
import { selectIssuesList, selectIssuesTotalCount } from '../../store/issuesSlice';
import translations from './translations';
import { ITEMS_COUNT_PER_PAGE } from '../../constants';
import classes from './IssuesList.module.css';

const IssuesList = () => {
  const issuesList = useAppSelector(selectIssuesList);
  const totalCount = useAppSelector(selectIssuesTotalCount);
  const pageCount = Math.ceil(totalCount/ITEMS_COUNT_PER_PAGE);

  return (
    <>
      <List>
        { issuesList.map(({ id, title, number, createdAt, username, url }) => (
          <Paper elevation={3} key={id} className={classes.listItem}>
            <ListItem>
              <ListItemText
                primary={
                  <Link href={url} underline="none" target="_blank">
                    {title}
                  </Link>}
                secondary={`#${number} ${translations.openedOn} ${createdAt} ${translations.by} ${username}`}
              />
            </ListItem>
          </Paper>
        ))} 
      </List>
      {pageCount > 1 &&
        [
          <Divider key="divider" />,
          <Pagination pageCount={pageCount} key="pagination" />,
        ]
      }
    </>
  );
}

export default IssuesList;