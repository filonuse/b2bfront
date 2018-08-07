import {Injectable} from '@angular/core';
import {GOODS_API} from '../../config/api.url/goods.url.config';
import {FilterModel} from '../../models/filter.model';
import {HttpManagerService} from '../http-manager.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GoodsService {

  constructor(private httpManager: HttpManagerService) {
  }

  public getAll(filterModel: FilterModel) {
    let url = GOODS_API.getAll;
    filterModel ? url += '?' + 'page=' + filterModel.page + '&per_page=' + filterModel.perPage : '';
    filterModel.ownerId ? url += '&filters[owner]=' + filterModel.ownerId : '';
    filterModel.searchField ? url += '&filters[like]=' + filterModel.searchField : '';
    filterModel.orderBy ? url += '&filters[orderBy]=' + filterModel.orderBy : '';
    filterModel.categories.length > 0 ? url += '&filters[category]=' + filterModel.categories : '';
    return this.httpManager.getRequest(url);
  }

  public add(goodsModel): Observable<any> {
    return this.httpManager.postRequest(GOODS_API.add, goodsModel);
  }

  public update(goodsModel): Observable<any> {
    return this.httpManager.postRequest(GOODS_API.update(goodsModel.id), goodsModel);
  }

  public remove(goodsModel): Observable<any> {
    return this.httpManager.deleteRequest(GOODS_API.remove(goodsModel.id));
  }
}
