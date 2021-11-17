import { SortBy } from '../constants';
import filtersReducer, {
  IFiltersState,
  setFiltersOrganizationName,
  setFiltersRepositoryName,
  setFiltersPageNumber,
  setFiltersSortBy,
  initialState,
} from './filtersSlice';
  
describe('filters reducer', () => {
  const filtersState: IFiltersState = {
    organizationName: 'orgName',
    repositoryName: 'repoName',
    pageNumber: 5,
    sortBy: SortBy.leastCommented,
  };
  it('should handle initial state', () => {
    expect(filtersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setFiltersOrganizationName', () => {
    const actual = filtersReducer(filtersState, setFiltersOrganizationName('facebook'));
    expect(actual.organizationName).toEqual('facebook');
  });

  it('should handle setFiltersRepositoryName', () => {
    const actual = filtersReducer(filtersState, setFiltersRepositoryName('react'));
    expect(actual.repositoryName).toEqual('react');
  });

  it('should handle setFiltersPageNumber', () => {
    const actual = filtersReducer(filtersState, setFiltersPageNumber(22));
    expect(actual.pageNumber).toEqual(22);
  });

  it('should handle setFiltersSortBy', () => {
    const actual = filtersReducer(filtersState, setFiltersSortBy(SortBy.leastCommented));
    expect(actual.sortBy).toEqual(SortBy.leastCommented);
  });
});
