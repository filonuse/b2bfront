import {Component, HostListener, OnInit} from '@angular/core';
import {SuppliersService} from '../services/admin-services/suppliers.service';
import {Router} from '@angular/router';
import {NavigatorService} from '../services/admin-services/navigator.service';
import {PaginationModel, IPaginationModel} from '../models/pagination.model';
import {language, userRoles} from '../authentication/auth.component';
import {LanguageService} from '../services/language.service';
import {NgxSmartModalService} from 'ngx-smart-modal';

const maxStars = 5;

@Component({
  selector: 'app-providers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.css']
})
export class SuppliersComponent implements OnInit {
  suppliersList: Array<any>;
  loading: boolean;
  paginationModel: IPaginationModel;
  adminMode: boolean;
  rating: Array<any> = Array(maxStars);
  currentPop: number;
  currentRole: any;
  languageState: string;
  currentLanguage: any;
  currentUser: any;

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

  constructor(private service: SuppliersService, private router: Router, private navigator: NavigatorService,
              private languageService: LanguageService, private modal: NgxSmartModalService) {
    localStorage.getItem('userRole') === 'admin' ? this.adminMode = true : this.adminMode = false;
    userRoles.subscribe(value => this.currentRole = value.data ? value.data.role : localStorage.getItem('userRole'));
    language.subscribe(value => {
      this.languageState = value;
      this.languageService.getLanguage(this.languageState).subscribe(response => this.currentLanguage = response);
    });
    this.loading = false;
    this.paginationModel = new PaginationModel();
  }

  ngOnInit() {
    this.getAll(this.paginationModel);
  }

  getAll(pagination) {
    this.service.getAll(pagination).subscribe(response => {
      this.suppliersList = response.data;
      this.setPagination(response.meta);
      this.loading = false;
      console.log(response);
    });
  }

  setPagination(meta: any) {
    this.paginationModel.totalItems = meta.total;
    this.paginationModel.currentPage = meta.current_page;
    this.paginationModel.totalPages = [];
    for (let i = 0; i < meta.last_page; i++) {
      this.paginationModel.totalPages.push(i + 1);
    }
    this.paginationModel.lastPage = meta.last_page;
  }

  editSupplier(supplier) {
    this.router.navigate(['supplierEdit']).then(this.navigator.currentUser = supplier);
  }

  deleteSupplier(supplier) {
    const result = confirm('Вы уверены что хотите удалить поставщика : ' + supplier.name + ' ?');
    if (result) {
      this.loading = true;
      this.service.remove(supplier).subscribe(response => {
        this.getAll(this.paginationModel);
      });
    }
  }

  banModalOpen(supplier) {
    // let action = 'забанить';
    // if (supplier.banned === 1) {
    //   action = 'разбанить';
    // }
    // const result = confirm('Вы уверены что хотите ' + action + ' поставщика : ' + supplier.name + ' ?');
    // if (result) {
    //   this.loading = true;
    //   this.service.ban(supplier).subscribe(response => {
    //     this.getAll(this.paginationModel);
    //   });
    // }
    this.currentUser = supplier;
    this.modal.getModal('modeBlock').open();
  }

  banUnBan() {
    this.service.ban(this.currentUser).subscribe(response => {
      this.getAll(this.paginationModel);
      this.modal.getModal('modeBlock').close();
    });
  }

  doPagination(page) {
    const pagination: IPaginationModel = Object.assign({}, this.paginationModel);
    pagination.currentPage = page;
    this.getAll(pagination);
  }

  detailedInfo(supplier) {
    this.service.getById(supplier.id).subscribe((response: any) => {
      this.navigator.currentUser = response.data;
      this.router.navigate(['supplier', supplier.id]).catch();
    });
  }

  getDirectChat(user) {
    this.navigator.currentRoom = Object.assign({}, {userFrom: {name: user.name, id: user.id}, avatar: user.avatar});
    console.log(user);
    this.router.navigate(['chat', user.id, {name: user.name}]).catch();

  }
}
