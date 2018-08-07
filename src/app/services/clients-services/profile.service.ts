import {Injectable} from '@angular/core';
import {PROFILE_API} from '../../config/api.url/profile.url.config';
import {HttpManagerService} from '../http-manager.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProfileService {
  constructor(private httpManager: HttpManagerService) {
  }

  public getById(userId): Observable<any> {
    return this.httpManager.getRequest(PROFILE_API.getById(userId));
  }

  public update(userModel): Observable<any> {
    const url = PROFILE_API.update + userModel.id;
    return this.httpManager.putRequest(url, userModel);
  }

  public passwordUpdate(userModel, passwordModel): Observable<any> {
    const url = PROFILE_API.update + userModel.id + '/password';
    return this.httpManager.putRequest(url, passwordModel);
  }
}
