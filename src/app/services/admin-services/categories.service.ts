import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CATEGORIES_API} from '../../config/api.url/categories.url.config';
import {HttpManagerService} from '../http-manager.service';

@Injectable()
export class CategoriesService {
  constructor(private httpManager: HttpManagerService) {
  }

  public getAll(pagination?): Observable<any> {
    const url = pagination ? CATEGORIES_API.getAll +
      '?page=' + pagination.currentPage + '&per_page=' + pagination.perPage :
      CATEGORIES_API.getAll;
    return this.httpManager.getRequest(url);
  }

  public add(categoryModel) {
    return this.httpManager.postRequest(CATEGORIES_API.add, categoryModel);
  }

  public update(categoryModel) {
    return this.httpManager.putRequest(CATEGORIES_API.update(categoryModel.id), categoryModel);
  }

  public remove(categoryModel) {
    return this.httpManager.deleteRequest(CATEGORIES_API.remove(categoryModel.id));
  }

  public getCatalogs(catalog) {
    return this.httpManager.getRequest(CATEGORIES_API.catalogs(catalog));

  }
}
