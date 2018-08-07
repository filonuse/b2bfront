import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {GoodsModel} from '../../models/goods.model';
import {BagService} from '../../services/clients-services/bag.service';
import {goodsInBag} from '../../header/header.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {NavigatorService} from '../../services/admin-services/navigator.service';
import {language} from '../../authentication/auth.component';
import {LanguageService} from '../../services/language.service';

export const newOrder: BehaviorSubject<any> = new BehaviorSubject<any>('');

@Component({
  selector: 'app-goods-info',
  templateUrl: './goods-info.component.html',
  styleUrls: ['../goods.css']
})

export class GoodsInfoComponent implements OnChanges {
  currentGoods: GoodsModel;
  newOrder: any;
  currentRole: string;
  tempBag: Array<any>;
  isInBag: boolean;
  languageState: string;
  currentLanguage: any;

  @Input('inputData') inputData;
  @Input('clear') clear;
  @Output('finish') done: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private bagService: BagService, private router: Router, private navigator: NavigatorService,
              private languageService: LanguageService) {
    language.subscribe(value => {
      this.languageState = value ? value : 'ua';
      this.languageService.getLanguage(this.languageState).subscribe(response => this.currentLanguage = response);
    });
    this.clear = false;
    this.currentRole = localStorage.getItem('userRole');
    this.tempBag = [];
    this.newOrder = {
      provider_id: 0,
      goods: 0,
      quantity: 0
    };
  }

  ngOnChanges(change) {
    console.log(change);
    // if (change && change.clear) {
    //   this.newOrder = {
    //     provider_id: 0,
    //     goods: 0,
    //     quantity: 0
    //   };
    // }
    if (change && change.inputData && change.inputData.currentValue) {
      this.currentGoods = change.inputData.currentValue;
      // this.newOrder.provider_id = change
      this.newOrder = {
        provider_id: this.currentGoods.provider.id,
        goods: this.currentGoods.id,
        quantity: 0
      };
    }
  }

  increase() {
    this.newOrder.quantity >= this.currentGoods.quantity_actual ? '' : this.newOrder.quantity += 1;
  }

  decrease() {
    this.newOrder.quantity <= 0 ? '' : this.newOrder.quantity -= 1;
  }

  checkQuantity() {
    if (this.newOrder.quantity && this.newOrder.quantity <= 0) {
      return this.newOrder.quantity = 0;
    }
    if (this.newOrder.quantity && this.newOrder.quantity > this.currentGoods.quantity_actual) {
      return this.newOrder.quantity = this.currentGoods.quantity_actual;
    }
  }

  isAlreadyInBag() {
    const bag: Array<any> = JSON.parse(localStorage.getItem('bag'));
    if (bag && bag.findIndex((item) => {
        if (item.goods === this.newOrder.goods) {
          return true;
        }
      }) > -1) {
      return true;
    }
  }

  addToBag() {
    const bag = JSON.parse(localStorage.getItem('bag'));
    if (bag) {
      this.tempBag = bag;
      this.tempBag.push(this.newOrder);
    } else {
      this.tempBag.push(this.newOrder);
    }
    this.bagService.addToBag(this.newOrder).subscribe((response: any) => {
      console.log('asdasdasdasd', response)
      const count = response.count_goods;
      goodsInBag.next(count);
      newOrder.next(this.newOrder);
      localStorage.setItem('bag', JSON.stringify(this.tempBag));
    });
  }

  getDirectChat() {
    this.navigator.currentRoom = Object.assign({},
      {userFrom: {name: this.currentGoods.provider.name, id: this.currentGoods.provider.id}, avatar: this.currentGoods.provider.avatar});
    this.done.emit(true);
    this.router.navigate(['chat', this.currentGoods.provider.id, {name: this.currentGoods.provider.name}]).catch();

  }

  setDiscount(price, discount) {
    if (this.currentRole === 'customer' && discount && discount > 0) {
      return {price, newPrice: (price - (price * discount / 100)).toFixed(2)};
    } else {
      return {price, newPrice: price};
    }
  }


}
