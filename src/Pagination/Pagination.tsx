import { Pagination as PaginationMUI } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { queryGithubIssues } from '../IssuesList/issuesListSlice';
import { selectPageNumber, setPageNumber } from './paginationSlice';
import classes from './Pagination.module.css';

interface IPagination {
  pageCount: number;
}

const Pagination = ({ pageCount }: IPagination) => {
  const dispatch = useAppDispatch();

  const pageNumber = useAppSelector(selectPageNumber);

  const onPaginationChange = (_e: any, value: number) => {
    dispatch(setPageNumber(value))
    dispatch(queryGithubIssues())
  }

  return (
    <PaginationMUI
      count={pageCount}
      page={pageNumber}
      onChange={onPaginationChange}
      color="primary"
      size="large"
      showFirstButton
      showLastButton
      classes={{root: classes.root, ul: classes.pagination}}
    />
  );
}

export default Pagination;