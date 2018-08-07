import {Injectable} from '@angular/core';
import {ORDERS_API} from '../../config/api.url/orders.url.config';
import {HttpManagerService} from '../http-manager.service';

@Injectable()
export class OrdersService {
  constructor(private httpManager: HttpManagerService) {
  }

  public getAll() {
    return this.httpManager.getRequest(ORDERS_API.getAll);
  }

  getById(order) {
    const url = ORDERS_API.getById(order.id ? order.id : order);
    return this.httpManager.getRequest(url);
  }

  public update(order, status?) {
    const url = status ? ORDERS_API.update(order.id, order.current_status_id) : ORDERS_API.update(order.id);
    return this.httpManager.putRequest(url, order);
  }

  public makeOrder(order) {
    return this.httpManager.postRequest(ORDERS_API.make, order);
  }
}
