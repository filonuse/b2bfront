import {Injectable} from '@angular/core';
import {NOTIFICATIONS_API} from '../../config/api.url/notifications.url.config';
import {HttpManagerService} from '../http-manager.service';

@Injectable()
export class NotificationsService {
  constructor(private httpManager: HttpManagerService) {
  }

  public getAll(pagination) {
    const url = NOTIFICATIONS_API.getAll + '?page=' + pagination.page + '&per_page=' + pagination.perPage ;
    return this.httpManager.getRequest(url);
  }

  public update(notification) {
    return this.httpManager.putRequest(NOTIFICATIONS_API.update(notification.id), notification);
  }

  // getById(order) {
  //   this.options.headers = this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //   const url = baseUrl + ORDERS_API.getById(order.id);
  //   return this.http.get(url, this.options);
  // }
  //
  // public update(order, status?) {
  //   this.options.headers = this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //   const url = status ? baseUrl + ORDERS_API.update(order.id, order.current_status_id) : baseUrl + ORDERS_API.update(order.id);
  //   const body = JSON.stringify(order);
  //   return this.http.put(url, body, this.options);
  // }
}
