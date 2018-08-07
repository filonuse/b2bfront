import {Injectable} from '@angular/core';

@Injectable()
export class NavigatorService {
  public currentUser: any;
  public currentRole: string;
  public currentGoods: any;
  public currentOrder: any;
  public currentRoom: any;
  public currentBasket: any;
  constructor() {
  }
}
