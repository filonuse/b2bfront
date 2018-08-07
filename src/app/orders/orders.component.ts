import {Component, HostListener, OnDestroy} from '@angular/core';
import {OrdersService} from '../services/clients-services/orders.service';
import {ResponseModel} from '../models/response.model';
import {CATALOGS} from '../models/catalogs.model';
import {CategoriesService} from '../services/admin-services/categories.service';
import {NavigatorService} from '../services/admin-services/navigator.service';
import {Router} from '@angular/router';
import {language} from '../authentication/auth.component';
import {LanguageService} from '../services/language.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.css']
})

export class OrdersComponent implements OnDestroy {
  ordersList: Array<any>;
  ordersStatusList: Array<any>;
  currentRole: string;
  languageState: string;
  currentLanguage: any;
  currentPop: number;
  @HostListener('document:click', ['$event']) testClick(event) {
    const openSpan = document.getElementById(this.currentPop + 'open');
    if (openSpan && event.srcElement.id === openSpan.id && event.srcElement.classList[0]) {
      document.getElementById(this.currentPop + 'pop').style.display === 'block' ?
        document.getElementById(this.currentPop + 'pop').style.display = 'none' :
        document.getElementById(this.currentPop + 'pop').style.display = 'block';
      document.getElementById(this.currentPop + 'triangle').style.display === 'block' ?
        document.getElementById(this.currentPop + 'triangle').style.display = 'none' :
        document.getElementById(this.currentPop + 'triangle').style.display = 'block';
    } else {
      const blocks = document.getElementsByClassName('popover-block');
      const triangles = document.getElementsByClassName('triangle');
      for (let i = 0; i < blocks.length; i++) {
        blocks.item(i).setAttribute('style', 'display: none');
        triangles.item(i).setAttribute('style', 'display: none');
      }
    }
  }

  constructor(private service: OrdersService, private catalog: CategoriesService, private navigator: NavigatorService,
              private router: Router, private languageService: LanguageService) {
    language.subscribe(value => {
      this.languageState = value ? value : 'ua';
      this.languageService.getLanguage(this.languageState).subscribe(response => this.currentLanguage = response);
    });
    this.currentRole = localStorage.getItem('userRole');
    this.getCatalogues();
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((response: ResponseModel) => {
      this.ordersList = response.data;
      console.log(response);
    });
  }

  getCatalogues() {
    this.catalog.getCatalogs(CATALOGS.OrderStatuses.name).subscribe((response: ResponseModel) => {
      this.ordersStatusList = response.data;
      console.log(response);
    });
  }

  parseDate(date) {
    if (date) {
      return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString();
    }
  }

  parseStatus(value) {
    if (value && this.ordersStatusList) {
      let newStatus: any = {name: '', id: ''};
      this.ordersStatusList.forEach(status => {
        if (status.id === +value) {
          newStatus = status;
        }
      });
      return {name: newStatus.name, id: newStatus.id};
    }
  }


  changeStatus(value, order) {
    const result = confirm('вы уверены , что хотите изиенить статус на ' + this.parseStatus(value).name + ' ?');
    if (result) {
      const updatedOrder = this.ordersList[this.ordersList.indexOf(order)];
      updatedOrder.current_status_id = +value;
      this.service.update(updatedOrder, true).subscribe((response: ResponseModel) => {
        this.getAll();
      });
    }
  }

  detailedInfo(order) {
    console.log('na4alo', order);
    this.service.getById(order).subscribe((response: ResponseModel) => {
      this.navigator.currentOrder = response.data;
      this.router.navigate(['order', order.id]).catch();
    });
  }

  checkStatus(orderId) {
    const forbiddenStatuses = [];
    if (this.ordersStatusList) {
      this.ordersStatusList.forEach(status => {
        if (status.name === 'canceled' || status.name === 'accepted_customer') {
          forbiddenStatuses.push(status.id);
        }
      });
    }
    if (forbiddenStatuses.indexOf(orderId) > -1) {
      return true;
    } else {
      return false;
    }
  }

  // openInfoModal(order) {
  //   console.log(order)
  //   this.service.getById(order).subscribe((response: ResponseModel) => {
  //     this.currentOrder = Object.assign({user: order.user}, response.data);
  //     this.modal.getModal('infoModal').open();
  //   });
  //
  // }

  ngOnDestroy() {
  }
}
