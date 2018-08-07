import {Component, HostListener, OnDestroy, ViewEncapsulation} from '@angular/core';
import {GoodsService} from '../services/clients-services/goods.service';
import 'rxjs/add/operator/debounceTime';
import {Subject} from 'rxjs/Subject';
import {FilterModel, IFilterModel, SortList} from '../models/filter.model';
import {CategoriesService} from '../services/admin-services/categories.service';
import {CATALOGS} from '../models/catalogs.model';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {GoodsModel} from '../models/goods.model';
import {MODAL_STATE} from '../models/modal.model';
import {IPaginationModel, PaginationModel} from '../models/pagination.model';
import {language, userRoles} from '../authentication/auth.component';
import {LanguageService} from '../services/language.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.css'],
  encapsulation: ViewEncapsulation.None
})
export class GoodsComponent implements OnDestroy {

  currentRole: string;
  goodsList: Array<any>;
  currentId: number;
  inputField: Subject<any> = new Subject<any>();
  filterModel: IFilterModel;
  sortList: SortList;
  selectList: Array<any> = [];
  categoryList: Array<any> = [];
  newGoodsModel: GoodsModel;
  editMode: boolean;
  currentGoods: any;
  currentData: any;
  modalState: any;
  modalType: string;
  clearEvent: boolean;
  paginationModel: IPaginationModel;
  colspan: string;

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

  constructor(private service: GoodsService, private categoriesService: CategoriesService, private modal: NgxSmartModalService,
              private languageService: LanguageService) {
    this.paginationModel = new PaginationModel();
    this.modalState = MODAL_STATE;
    userRoles.subscribe(value => this.currentRole = value ? value : localStorage.getItem('userRole'));
    language.subscribe(value => {
      this.languageState = value ? value : 'ua';
      this.languageService.getLanguage(this.languageState).subscribe(response => this.currentLanguage = response);
    });
    this.colspan = this.currentRole === 'customer' ? '3' : '4';
    this.sortList = new SortList();
    this.newGoodsModel = new GoodsModel();
    for (const obj in this.sortList) {
      this.selectList.push(this.sortList[obj]);
    }
    this.currentId = JSON.parse(localStorage.getItem('userData')).id;
    this.filterModel = new FilterModel();
    this.inputField.debounceTime(1000).subscribe(response => {
      this.startSearch(response);
    });
    this.getAll(this.filterModel);
    this.getCategories();
  }

  getAll(pagination) {
    this.service.getAll(pagination).subscribe((response: any) => {
      this.goodsList = response.data;
      this.setPagination(response.meta);
      console.log(this.goodsList);
      console.log(response.meta);
    });
  }

  getCategories() {
    this.categoriesService.getCatalogs(CATALOGS.Categories.name).subscribe((response: any) => {
      this.categoryList = response.data;
    });
  }

  doPagination(page) {
    const pagination: FilterModel = Object.assign({}, this.filterModel);
    pagination.page = page;
    // this.filterModel.page = page;
    this.getAll(pagination);
  }

  setPagination(meta: any) {
    this.filterModel.totalItems = meta.total;
    this.filterModel.page = meta.current_page;
    this.filterModel.totalPages = [];
    for (let i = 0; i < meta.last_page; i++) {
      this.filterModel.totalPages.push(i + 1);
    }
    this.filterModel.lastPage = meta.last_page;
  }

  slicePagination(page) {
    let startPage = page - 3;
    let endPage = page + 2;
    if (startPage <= 0) {
      startPage = 0;
    }
    if (endPage >= this.filterModel.lastPage) {
      endPage = this.filterModel.lastPage;
    }
    return {start: startPage, end: endPage};
  }


  changeOwner(owner) {
    owner ? this.filterModel.ownerId = this.currentId : this.filterModel.ownerId = null;
    this.filterModel.page = 1;
    this.getAll(this.filterModel);
  }

  autoCompleteFunc(event) {
    this.inputField.next(event.srcElement.value);
  }

  startSearch(sField) {
    this.filterModel.searchField = sField;
    this.getAll(this.filterModel);
  }

  doSort(sortModel) {
    this.filterModel.orderBy = sortModel;
    this.getAll(this.filterModel);
  }

  doFilter(item) {
    if (this.filterModel.categories.indexOf(item.id) > -1) {
      this.filterModel.categories.splice(this.filterModel.categories.indexOf(item.id), 1);
    } else {
      this.filterModel.categories.push(item.id);
    }
    this.getAll(this.filterModel);
  }

  openModal(state, currentGoods?) {
    console.log(state);
    switch (state) {
      case MODAL_STATE.create :
        this.modalType = state;
        this.editMode = false;
        break;
      case MODAL_STATE.edit :
        this.modalType = state;
        this.editMode = true;
        this.currentData = currentGoods;
        break;
      case MODAL_STATE.info :
        this.modalType = state;
        this.currentGoods = currentGoods;
        break;
      case MODAL_STATE.delete :
        this.modalType = state;
        this.currentGoods = currentGoods;
        break;
    }
    this.modal.getModal('addGoodsModal').open();
    console.log(this.modalType);
  }

  deleteGoods(goodsModel) {
    this.service.remove(goodsModel).subscribe(response => {
      console.log(response);
      this.getAll(this.filterModel);
      this.modal.getModal('addGoodsModal').close();
    });
  }

  done() {
    console.log('close emit');
    this.modal.getModal('addGoodsModal').close();
    this.currentGoods = {};
    this.getAll(this.filterModel);
  }

  setDiscount(price, discount) {
    if (this.currentRole === 'customer' && discount && discount > 0) {
      return {price, newPrice: (price - (price * discount / 100)).toFixed(2)};
    } else {
      return {price, newPrice: price};
    }
  }

  testClose() {
    this.clearEvent = !this.clearEvent;
  }

  ngOnDestroy() {
    this.inputField.unsubscribe();
  }

}
