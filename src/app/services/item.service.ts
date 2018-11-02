import {Injectable} from '@angular/core';
import {HttpManagerService} from './http-manager.service';
import {Observable} from 'rxjs';
import {ITEM_API} from '../config/item.api.config';
import {POSTS_API} from '../config/posts.api.config';

@Injectable()

export class ItemService {
  constructor(private http: HttpManagerService) {
  }

  public getById(item): Observable<any> {
    return this.http.getRequest(ITEM_API.getById(item.type, item.id));
  }

  public edit(item): Observable<any> {
    return this.http.putRequest(ITEM_API.edit(item.type, item.id), item);
  }
  public delete(item): Observable<any> {
    return this.http.deleteRequest(ITEM_API.delete(item.type, item.id));
  }
  public add(item): Observable<any> {
    return this.http.postRequest(ITEM_API.add(item.type), item);
  }
}
