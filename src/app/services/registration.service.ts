import {Injectable} from '@angular/core';
import {REGISTER_API} from '../config/api.url/registration.url.config';
import {HttpManagerService} from './http-manager.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class RegistrationService {

  constructor(private httpManager: HttpManagerService) {
  }

  public register(userModel): Observable<any> {
    return this.httpManager.postRequest(REGISTER_API.register, userModel);
  }
}
