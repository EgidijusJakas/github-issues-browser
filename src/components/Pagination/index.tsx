import { Pagination as PaginationMUI } from '@mui/material';
import { selectFiltersPageNumber, setFiltersPageNumber } from '../../store/filtersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadAndSetIssues } from '../../store/issuesSlice';
import classes from './Pagination.module.css';

interface IPagination {
  pageCount: number;
}

const Pagination = ({ pageCount }: IPagination) => {
  const dispatch = useAppDispatch();

  const pageNumber = useAppSelector(selectFiltersPageNumber);

  const onPaginationChange = (_e: any, value: number) => {
    dispatch(setFiltersPageNumber(value));
    dispatch(loadAndSetIssues());
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