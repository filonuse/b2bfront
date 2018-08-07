import {Component, HostListener, OnInit} from '@angular/core';
import {CategoriesService} from '../../services/admin-services/categories.service';
import {Router} from '@angular/router';
import {NavigatorService} from '../../services/admin-services/navigator.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {IPaginationModel, PaginationModel} from '../../models/pagination.model';
import {language} from '../../authentication/auth.component';
import {LanguageService} from '../../services/language.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.css']
})
export class CategoriesComponent implements OnInit {
  categoriesList: Array<any>;
  categoryModel: any;
  editMode: boolean;
  categoryText: string;

  popVisible: boolean;
  currentPop: number;
  paginationModel: IPaginationModel;
  currentLanguage: any;
  languageState: any;

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

  constructor(private service: CategoriesService, private router: Router, private navigator: NavigatorService,
              private modal: NgxSmartModalService, private languageService: LanguageService) {
    language.subscribe(value => {
      this.languageState = value ? value : localStorage.getItem('currentLanguage');
      languageService.getLanguage(this.languageState).subscribe(response => this.currentLanguage = response);
    });
    this.paginationModel = new PaginationModel();
    this.popVisible = false;
    // this.currentPop = '';
    this.categoryModel = {
      id: null,
      name: ''
    };
  }

  ngOnInit() {
    this.getAll(this.paginationModel);
  }

  setPagination(meta: any) {
    this.paginationModel.totalItems = meta.total;
    this.paginationModel.currentPage = meta.current_page;
    this.paginationModel.totalPages = [];
    for (let i = 0; i < meta.last_page; i++) {
      this.paginationModel.totalPages.push(i + 1);
    }    this.paginationModel.lastPage = meta.last_page;
  }

  showHidePopover(id, event) {

    this.currentPop = id;
    //
    // // this.currentPop = document.getElementById(id + 'pop');
    // // // if (this.hostStart) {
    // //   this.currentPop = event.srcElement.nextElementSibling.lastElementChild;
    // //   document.getElementById(id + 'pop').style.display === 'block' ?
    // //     document.getElementById(id + 'pop').style.display = 'none' :
    // //     document.getElementById(id + 'pop').style.display = 'block';
    // //
    // //   document.getElementById(id + 'triangle').style.display === 'block' ?
    // //     document.getElementById(id + 'triangle').style.display = 'none' :
    // //     document.getElementById(id + 'triangle').style.display = 'block';
    // // }
    // this.hostListeneDone.subscribe((done) => {
    //   console.log(done);
    //   if (done) {
    //     // this.currentPop = event.srcElement.nextElementSibling.lastElementChild;
    //     document.getElementById(id + 'pop').style.display === 'block' ?
    //       document.getElementById(id + 'pop').style.display = 'none' :
    //       document.getElementById(id + 'pop').style.display = 'block';
    //
    //     document.getElementById(id + 'triangle').style.display === 'block' ?
    //       document.getElementById(id + 'triangle').style.display = 'none' :
    //       document.getElementById(id + 'triangle').style.display = 'block';
    //     // this.hostListeneDone.next(false);
    //   }
    // });

  }

  getAll(pagination) {
    this.service.getAll(pagination).subscribe(response => {
      console.log(response);
      this.categoriesList = response.data;
      this.setPagination(response.meta);
    });
  }

  editCategory() {
    this.service.update(this.categoryModel).subscribe(response => {
      console.log(response);
      this.modal.getModal('newCategory').close();
    });
  }

  openModal(category?) {
    this.modal.getModal('newCategory').open();
    if (category) {
      this.editMode = false;
      this.categoryModel = category;
      this.categoryText = 'editCategory';
    } else {
      this.categoryModel = {
        id: null,
        name: ''
      };
      this.categoryText = 'newCategory';
      this.editMode = true;
    }
  }

  doPagination(page) {
    const pagination: IPaginationModel = Object.assign({}, this.paginationModel);
    pagination.currentPage = page;
    this.getAll(pagination);
  }

  addCategory() {
    // const result = confirm('Вы уверены что добавить категорию : ' + this.categoryModel.name + ' ?');
    // if (result) {
    this.service.add(this.categoryModel).subscribe(response => {
      console.log(response);
      this.getAll(this.paginationModel);
      this.categoryModel.name = '';
      this.modal.getModal('newCategory').close();
    });
    // }
  }

  deleteCategory(category) {
    const result = confirm('Вы уверены что хотите удалить категорию : ' + category.name + ' ?');
    if (result) {
      this.service.remove(category).subscribe(response => {
        console.log(response);
        this.getAll(this.paginationModel);
      });
    }
  }
}
