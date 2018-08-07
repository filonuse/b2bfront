import {Injectable} from '@angular/core';
import {HttpManagerService} from './http-manager.service';
import {LANGUAGE_API} from '../config/api.url/language.url.config';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class LanguageService {
  constructor(private httpManager: HttpManagerService) {
  }

  getLanguage(locale): Observable<any> {
    return this.httpManager.getRequest(LANGUAGE_API.getLanguage(locale));
  }
}
