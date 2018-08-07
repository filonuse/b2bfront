export interface IPaginationModel {
  currentPage: number;
  perPage: number;
  firstPage: number;
  lastPage: number;
  totalItems: number;
  totalPages: Array<any>;
}

export class PaginationModel implements IPaginationModel {
  constructor() {
    this.currentPage = 1;
    this.perPage = 10;
    this.firstPage = 1;
    this.totalPages = [];
  }
  currentPage: number;
  perPage: number;
  firstPage: number;
  lastPage: number;
  totalItems: number;
  totalPages: Array<any>;
}
