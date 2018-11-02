import {Injectable} from '@angular/core';
import {HttpManagerService} from './http-manager.service';
import {Observable} from 'rxjs';
import {POSTS_API} from '../config/posts.api.config';

@Injectable()

export class PostsService {
  constructor(private http: HttpManagerService) {
  }

  public getAll(requestData): Observable<any> {
    return this.http.getRequest(POSTS_API.getAll(requestData));
  }
}
