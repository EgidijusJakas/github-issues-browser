import filtersReducer, {
  IFiltersState,
  SortBy,
  setFiltersOrganizationName,
  setFiltersRepositoryName,
  setFiltersPageNumber,
  setFiltersSortBy,
} from './filtersSlice';
  
describe('filters reducer', () => {
  const initialState: IFiltersState = {
    organizationName: 'orgName',
    repositoryName: 'repoName',
    pageNumber: 5,
    sortBy: SortBy.leastCommented,
  };
  it('should handle initial state', () => {
    expect(filtersReducer(undefined, { type: 'unknown' })).toEqual({
      organizationName: '',
      repositoryName: '',
      pageNumber: 1,
      sortBy: SortBy.newest,
    });
  });

  it('should handle setFiltersOrganizationName', () => {
    const actual = filtersReducer(initialState, setFiltersOrganizationName('facebook'));
    expect(actual.organizationName).toEqual('facebook');
  });

  it('should handle setFiltersRepositoryName', () => {
    const actual = filtersReducer(initialState, setFiltersRepositoryName('react'));
    expect(actual.repositoryName).toEqual('react');
  });

  it('should handle setFiltersPageNumber', () => {
    const actual = filtersReducer(initialState, setFiltersPageNumber(22));
    expect(actual.pageNumber).toEqual(22);
  });

  it('should handle setFiltersSortBy', () => {
    const actual = filtersReducer(initialState, setFiltersSortBy(SortBy.leastCommented));
    expect(actual.sortBy).toEqual(SortBy.leastCommented);
  });
});
