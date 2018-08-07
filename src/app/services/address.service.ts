import {Injectable} from '@angular/core';
import {ADDRESS_API} from '../config/api.url/address.url.config';
import {HttpManagerService} from './http-manager.service';

@Injectable()

export class AddressService {

  constructor(private httpManager: HttpManagerService) {
  }

  public autocomplete(searchString) {
    return this.httpManager.getRequest(ADDRESS_API.autocomplete(searchString));
  }

  public getCoords(placeId) {
    return this.httpManager.getRequest(ADDRESS_API.getCoords(placeId));
  }
}
