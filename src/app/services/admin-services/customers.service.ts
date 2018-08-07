import {Injectable} from '@angular/core';
import {USERS_API} from '../../config/api.url/users.url.config';
import {Observable} from 'rxjs/Observable';
import {HttpManagerService} from '../http-manager.service';

@Injectable()
export class CustomersService {
  constructor(private httpManager: HttpManagerService) {
  }

  public getAll(pagination): Observable<any> {
    const url = pagination ? USERS_API.getAll('customer') +
      '&page=' + pagination.currentPage + '&per_page=' + pagination.perPage :
      USERS_API.getAll('customer');
    return this.httpManager.getRequest(url);
  }

  public update(userModel) {
    return this.httpManager.putRequest(USERS_API.update(userModel.id), userModel);
  }

  public remove(userModel) {
    return this.httpManager.deleteRequest(USERS_API.remove(userModel.id));
  }

  public ban(userModel): Observable<any> {
    const url = !userModel.banned ? USERS_API.ban(userModel.id) + '/true' : USERS_API.ban(userModel.id) + '/false';
    return this.httpManager.putRequest(url, userModel);
  }
}
