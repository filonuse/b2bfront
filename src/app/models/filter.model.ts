export interface IFilterModel {
  ownerId: number;
  searchField: string;
  categories: Array<any>;
  orderBy: string;
  page: number;
  perPage: number;
  firstPage: number;
  lastPage: number;
  totalItems: number;
  totalPages: Array<any>;
  currentPage: number;

}

export class FilterModel implements IFilterModel {
  constructor() {
    this.page = 1;
    this.perPage = 10;
    this.categories = [];
    this.firstPage = 1;
    this.totalPages = [0];
    this.currentPage = 1;

  }
  ownerId: number;
  searchField: string;
  categories: Array<any>;
  orderBy: string;
  page: number;
  perPage: number;
  firstPage: number;
  lastPage: number;
  totalItems: number;
  totalPages: Array<any>;
  currentPage: number;

}

export class SortList  {
  nameAsc = {sort: 'name,asc', name: 'nameAsc'};
  nameDesc = {sort: 'name,desc', name: 'nameDesc'};
  priceAsc = {sort: 'price,asc', name: 'priceAsc'};
  priceDesc = {sort: 'price,desc', name: 'priceDesc'};
  createdAsc = {sort: 'created_at,asc', name: 'dateAsc'};
  createdDesc = {sort: 'created_at,desc', name: 'dateDesc'};
}
