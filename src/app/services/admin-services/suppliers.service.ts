import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URL_API} from '../../config/base-url.config';
import {USERS_API} from '../../config/api.url/users.url.config';
import {Observable} from 'rxjs/Observable';
import {HttpManagerService} from '../http-manager.service';

@Injectable()
export class SuppliersService {
  constructor(private httpManager: HttpManagerService) {
  }

  public getAll(pagination): Observable<any> {
    const url = pagination ? USERS_API.getAll('provider') +
      '&page=' + pagination.currentPage + '&per_page=' + pagination.perPage :
      USERS_API.getAll('provider');
    return this.httpManager.getRequest(url);
  }

  getById(userId) {
    return this.httpManager.getRequest(USERS_API.byId(userId));
  }

  public update(userModel): Observable<any> {
    return this.httpManager.putRequest(USERS_API.update(userModel.id), userModel);
  }

  public remove(userModel): Observable<any> {
    return this.httpManager.deleteRequest(USERS_API.remove(userModel.id));
  }

  public ban(userModel): Observable<any> {
    const url = userModel.banned === false ? USERS_API.ban(userModel.id) + '/true' :
      USERS_API.ban(userModel.id) + '/false';
    return this.httpManager.putRequest(url, userModel);
  }

  updateByUser(userModel) {
    return this.httpManager.putRequest(USERS_API.updateByClient(userModel.id), userModel);
  }
}
