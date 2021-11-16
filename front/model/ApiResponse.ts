import { Pageable } from "./Pageable";

export interface ApiResponse<T> {
  status?: number;
  entity?: T;
  content?: Pageable<T>;
}