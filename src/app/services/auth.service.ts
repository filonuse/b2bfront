import {Injectable} from '@angular/core';
import {LOGIN_API} from '../config/api.url/auth.url.config';
import {Observable} from 'rxjs/Observable';
import {HttpManagerService} from './http-manager.service';


@Injectable()
export class AuthService {

  constructor(private httpManager: HttpManagerService) {
  }

  public logIn(loginModel): Observable<any> {
    return this.httpManager.postRequest(LOGIN_API.logIn, loginModel);
  }

  public logOut(): Observable<any> {
    return this.httpManager.getRequest(LOGIN_API.logOut);
  }
}
