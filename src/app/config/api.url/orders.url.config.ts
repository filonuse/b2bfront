export class OrdersUrlConfig {
  public get getAll() {
    return '/client/orders';
  }

  public getById(id) {
    return '/client/orders/' + id;
  }

  public update(id, status?) {
    return status ? '/client/orders/' + id + '/' + status : '/client/orders/' + id;
  }

  public get make() {
    return '/client/orders';
  }
}

export const ORDERS_API = new OrdersUrlConfig();
