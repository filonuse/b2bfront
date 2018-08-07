class CatalogsModel {
  public Categories = {value: 0, name: 'categories'};
  public OrderStatuses = {value: 1, name: 'order_statuses'};
}
export interface ICatalogs {
  data: Array<any>;
}

export const CATALOGS = new CatalogsModel();
