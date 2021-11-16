export interface Pageable<T> {
  content?: T[]; 
  pageable?: {
    sort?: {
      unsorted?: boolean;
      sorted?: boolean;
      empty?: boolean;
    },
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
    unpaged?: boolean;
  },
  totalPages?: number;
  totalElements?: number;
  last?: boolean;
  size?: number;
  number?: number;
  sort?: {
    unsorted?: boolean;
    sorted?: boolean;
    empty?: boolean;
  },
  first?: boolean;
  numberOfElements?: number;
  empty?: boolean;
}
