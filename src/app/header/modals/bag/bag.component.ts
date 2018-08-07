import {Component, EventEmitter, Output} from '@angular/core';
import {NavigatorService} from '../../../services/admin-services/navigator.service';
import {BagService} from '../../../services/clients-services/bag.service';
import {ResponseModel} from '../../../models/response.model';
import {OrdersService} from '../../../services/clients-services/orders.service';
import {newOrder} from '../../../goods/modals/goods-info.component';
import {goodsInBag} from '../../header.component';

const fixed = 2;

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.css']
})

export class BagComponent {
  currentBasket: any;

  @Output('finish') done: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private navigator: NavigatorService, private bagService: BagService, private orderService: OrdersService) {
    console.log(this.navigator.currentBasket);

    newOrder.subscribe(order => {
      this.done.emit(false);
      this.getBasket();
    });
  }


  getBasket() {
    this.bagService.getBag().subscribe((response: ResponseModel) => {
      console.log(response);
      this.currentBasket = response.data;
    });
  }

  deleteGoods(goods, bag) {
    console.log(goods, bag);
    const deletedGoods = {
      id: bag.id,
      goods_id: goods.id
    };
    this.bagService.remove(deletedGoods).subscribe((response: ResponseModel) => {
      localStorage.getItem('bag') ? goodsInBag.next(this.removeLocal(goods)) : '';
      this.getBasket();
    });
  }

  removeLocal(goods) {
    const formattedBag: Array<any> = JSON.parse(localStorage.getItem('bag'));
    formattedBag.forEach(item => {
      if (item.goods === goods.id) {
        formattedBag.splice(formattedBag.indexOf(item), 1);
        localStorage.setItem('bag', JSON.stringify(formattedBag));
      }
    });
    return formattedBag.length;
  }

  makeOrder() {
    const order = {
      bag_id: 0,
      amount: 0,
      store_id: 0,
      goods: []
    };
    this.currentBasket.forEach(bag => {
      console.log(bag);
      order.bag_id = bag.id;
      // bag.goods.forEach(goods => {
      //   order.amount += goods.quantity * goods.price;
      // });
      order.amount = this.countAmount();
      order.goods = bag.goods;
      this.orderService.makeOrder(order).subscribe(response => {
        this.getBasket();
        goodsInBag.next(0);
        this.done.emit(true);
        localStorage.removeItem('bag');
      });
    });
  }

  setDiscount(price, discount) {
    if (discount && discount > 0) {
      return {price, newPrice: (price - (price * discount / 100)).toFixed(2)};
    } else {
      return {price, newPrice: price};
    }
  }

  countSum(price: number, discount: number, quantity: number) {
    const formPrice = +price.toFixed(fixed);
    if (discount && discount > 0) {
      return ((formPrice - +(formPrice * discount / 100).toFixed(fixed)) * quantity).toFixed(fixed);
    } else {
      return formPrice * quantity;
    }
  }

  countAmount(): any {
    let amount = 0;
    this.currentBasket.forEach(bag => {
      bag.goods.forEach(goods => {
        amount += goods.quantity * this.setDiscount(goods.price, goods.discount).newPrice;
      });
    });

    return +amount.toFixed(fixed);
  }

}
