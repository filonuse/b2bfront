import {Injectable} from '@angular/core';
import {HttpManagerService} from './http-manager.service';
import {Observable} from 'rxjs';
import {USER_API} from '../config/user.api.config';

@Injectable()

export class UserService {
  constructor(private http: HttpManagerService) {
  }

  public getById(id): Observable<any> {
    return this.http.getRequest(USER_API.getById(id));
  }

}
