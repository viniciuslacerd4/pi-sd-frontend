export class Pageable<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  content: T[];
}
