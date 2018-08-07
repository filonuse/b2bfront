import {Component} from '@angular/core';
import {NavigatorService} from '../services/admin-services/navigator.service';
import {ResponseModel} from '../models/response.model';

import {OrdersService} from '../services/clients-services/orders.service';
import {CategoriesService} from '../services/admin-services/categories.service';
import {CATALOGS} from '../models/catalogs.model';
import {ActivatedRoute} from '@angular/router';
import {language} from '../authentication/auth.component';
import {LanguageService} from '../services/language.service';

const fixed = 2;

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./orders.css']
})

export class OrderDetailedComponent {
  currentOrderId: string;
  currentOrder: any;
  categoriesList: Array<any>;
  languageState: string;
  currentLanguage: any;

  constructor(private navigator: NavigatorService, private service: OrdersService, private catalog: CategoriesService,
              private route: ActivatedRoute, private languageService: LanguageService) {
    language.subscribe(value => {
      this.languageState = value ? value : 'ua';
      this.languageService.getLanguage(this.languageState).subscribe(response => this.currentLanguage = response);
    });
    this.currentOrderId = this.route.snapshot.params.id;
    console.log(this.currentOrderId)
    this.getOrder();
    this.getCategories();
  }

  getOrder() {
    this.service.getById(this.currentOrderId).subscribe((response: ResponseModel) => {
      this.currentOrder = response.data;
      console.log('polu4ili', this.currentOrder);
      if (!this.navigator.currentOrder) {
        this.navigator.currentOrder = JSON.parse(JSON.stringify(this.currentOrder));
      }
      this.availableCount();
    });
    // this.currentOrder = JSON.parse(JSON.stringify(this.navigator.currentOrder));
  }

  getCategories() {
    this.catalog.getCatalogs(CATALOGS.Categories.name).subscribe((response: ResponseModel) => {
      this.categoriesList = response.data;
    });
  }


  summRow(price, quant) {
    return (price * quant).toFixed(fixed);
  }

  summ() {
    console.log(this.currentOrder)
    if (this.currentOrder && this.currentOrder.goods.length > 0) {
      let summ = 0;
      this.currentOrder.goods.forEach(goods => {
        summ += (goods.price * goods.quantity);
      });
      summ = +summ.toFixed(fixed);
      this.currentOrder.amount = summ;
      return summ;
    }
  }

  parseCategory(category) {
    let formatedCategory = '';
    if (this.categoriesList) {
      this.categoriesList.forEach(cat => {
        if (category === cat.id) {
          formatedCategory = cat.name;
        }
      });
      return formatedCategory;
    }
  }

  increase(goods) {
    this.currentOrder.goods[this.currentOrder.goods.indexOf(goods)].quantity += 1;
    console.log(this.navigator.currentOrder);
  }

  decrease(goods) {
    this.currentOrder.goods[this.currentOrder.goods.indexOf(goods)].quantity -= 1;
  }

  availableCount() {
    console.log(this.navigator.currentOrder)
    this.currentOrder.goods.forEach((goods, index) => {
      goods.total = this.navigator.currentOrder.goods[index].quantity + this.navigator.currentOrder.goods[index].quantity_available;
    });
  }

  saveOrder() {
    this.service.update(this.currentOrder).subscribe((response: ResponseModel) => {
      console.log(response);
    });
  }


}
