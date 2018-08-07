import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BASE_URL_API} from '../config/base-url.config';
import 'rxjs/add/operator/catch';

const baseUrl = BASE_URL_API.baseUrl;

@Injectable()

export class HttpManagerService {
  private options = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  public getRequest(serviceUrl) {
    const url = baseUrl + serviceUrl;
    return this.http.get(url, this.options);
  }

  public postRequest(serviceUrl, serviceBody) {
    const url = baseUrl + serviceUrl;
    const body = JSON.stringify(serviceBody);
    return this.http.post(url, body, this.options);
  }

  public putRequest(serviceUrl, serviceBody) {
    const url = baseUrl + serviceUrl;
    const body = JSON.stringify(serviceBody);
    return this.http.put(url, body, this.options);
  }

  public deleteRequest(serviceUrl) {
    const url = baseUrl + serviceUrl;
    return this.http.delete(url, this.options);
  }


}
