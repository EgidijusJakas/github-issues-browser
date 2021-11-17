export const ITEMS_COUNT_PER_PAGE = 30;
export const DEFAULT_PAGE_NUMBER = 1;

export enum SortBy {
  newest = 'created-desc',
  oldest = 'created-asc',
  mostCommented = 'comments-desc',
  leastCommented = 'comments-asc',
}

export enum Status {
  idle = 'idle',
  loading = 'loading',
}