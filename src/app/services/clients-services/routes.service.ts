import {Injectable} from '@angular/core';
import {BASE_URL_API} from '../../config/base-url.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ROUTES_API} from '../../config/api.url/routes.url.config';
import {HttpManagerService} from '../http-manager.service';

@Injectable()

export class RoutesService {
  constructor(private httpManager: HttpManagerService) {
  }

  public getAll() {
    const url = ROUTES_API.getAll + '?per_page=20';
    return this.httpManager.getRequest(url);
  }

  public addRoute(routeModel) {
    return this.httpManager.postRequest(ROUTES_API.addRoute, routeModel);
  }
}
