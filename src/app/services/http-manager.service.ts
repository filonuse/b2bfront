import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_CONFIG} from '../config/url-config';
import {Observable} from 'rxjs';


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

  public getRequest(serviceUrl): Observable<any> {
    const url = URL_CONFIG.baseUrl + serviceUrl;
    return this.http.get(url, this.options);
  }

  public postRequest(serviceUrl, serviceBody, auth?): Observable<any> {
    const url = auth ? URL_CONFIG.authBaseUrl + serviceUrl : URL_CONFIG.baseUrl + serviceUrl;
    const body = JSON.stringify(serviceBody);
    return this.http.post(url, body, this.options);
  }

  public putRequest(serviceUrl, serviceBody): Observable<any> {
    const url = URL_CONFIG.baseUrl + serviceUrl;
    const body = JSON.stringify(serviceBody);
    return this.http.put(url, body, this.options);
  }

  public deleteRequest(serviceUrl): Observable<any> {
    const url = URL_CONFIG.baseUrl + serviceUrl;
    return this.http.delete(url, this.options);
  }


}
