import {Injectable} from '@angular/core';
import {BAGS_API} from '../../config/api.url/bags.url.config';
import {HttpManagerService} from '../http-manager.service';

@Injectable()

export class BagService {

  constructor(private httpManager: HttpManagerService) {
  }

  public getBag() {
    return this.httpManager.getRequest(BAGS_API.getBag);
  }

  public addToBag(goodsModel) {
    return this.httpManager.postRequest(BAGS_API.getBag, goodsModel);
  }

  public getCount() {
    return this.httpManager.getRequest(BAGS_API.getCount);
  }

  public remove(goods) {
    return this.httpManager.deleteRequest(BAGS_API.remove(goods));
  }
}
