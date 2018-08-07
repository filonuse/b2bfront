import {Component, OnInit} from '@angular/core';
import {NavigatorService} from '../services/admin-services/navigator.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomersService} from '../services/admin-services/customers.service';
import {SuppliersService} from '../services/admin-services/suppliers.service';
import {language} from '../authentication/auth.component';
import {LanguageService} from '../services/language.service';
import {CategoriesService} from '../services/admin-services/categories.service';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./suppliers.css']
})
export class SupplierEditComponent implements OnInit {
  currentUser: any;
  userForm: FormGroup;
  currentLanguage: any;
  languageState: any;
  categoriesList: Array<any>;
  pushedCategories: any;

  constructor(private navigator: NavigatorService, private fb: FormBuilder, private service: SuppliersService,
              private languageService: LanguageService, private categoryService: CategoriesService) {
    language.subscribe(value => {
      this.languageState = value ? value : localStorage.getItem('currentLanguage');
      languageService.getLanguage(this.languageState).subscribe(response => this.currentLanguage = response);
    });
    this.categoryService.getAll().subscribe(response => {
      this.categoriesList = response.data;
      console.log(response);
    });
    this.userForm = this.fb.group({
      name: [''],
      legal_name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      official_data: ['', [Validators.required, Validators.minLength(3)]],
      requisites: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.currentUser = this.navigator.currentUser;
    this.userForm.patchValue({
      name: this.currentUser.name,
      legal_name: this.currentUser.legal_name,
      phone: this.currentUser.phone,
      official_data: this.currentUser.official_data,
      requisites: this.currentUser.requisites,
    });
    // console.log(this.navigator.currentUser)
  }

  setCategory(category) {
    if (this.currentUser.categories.indexOf(category.id) === -1) {
      this.currentUser.categories.push(category);
      console.log('add');
      console.log(this.currentUser.categories);
    } else {
      this.currentUser.categories.splice(this.currentUser.categories.indexOf(category.id), 1);
    }
  }

  checked(cat) {
    const res = this.currentUser.categories.findIndex(elem => {
      if (elem.id === cat.id) {
        return true;
      }
    });
    if (res > -1) {
      return true;
    }
  }

  save() {
    const categoriesArray: Array<any> = this.currentUser.categories.map((category) => {
      return category.id;
    });
    console.log(categoriesArray);
    if (this.userForm.valid) {
      const body = Object.assign({
        id: this.currentUser.id,
        role: this.currentUser.role,
        categories: categoriesArray
      }, this.userForm.value);
      this.service.update(body).subscribe((response) => {
        console.log(response);
      });
    }
  }
}
