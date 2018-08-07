import {Injectable} from '@angular/core';
import {STORES_API} from '../../config/api.url/stores.api.url';
import {HttpManagerService} from '../http-manager.service';

@Injectable()

export class StoreService {
  constructor(private httpManager: HttpManagerService) {
  }

  public getAll() {
    return this.httpManager.getRequest(STORES_API.getAll);
  }

  public addStore(storeModel) {
    return this.httpManager.postRequest(STORES_API.addStore, storeModel);
  }

}
