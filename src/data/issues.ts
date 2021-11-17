import { IFiltersState } from '../store/filtersSlice';

const BASE_URL = 'https://api.github.com/search/issues';

export const fetchGithubIssues = ({ organizationName, repositoryName, sortBy, pageNumber }: IFiltersState) =>
    fetch(`${BASE_URL}?q=repo:${organizationName}/${repositoryName}+type:issue+state:open+sort:${sortBy}&page=${pageNumber}`);