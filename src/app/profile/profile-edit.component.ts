import {Component} from '@angular/core';
import {CategoriesService} from '../services/admin-services/categories.service';
import {CATALOGS, ICatalogs} from '../models/catalogs.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../services/clients-services/profile.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ActivatedRoute} from '@angular/router';
import {ResponseModel} from '../models/response.model';
import {userRoles} from '../authentication/auth.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile.css']
})
export class ProfileEditComponent {
  currentUser: any;
  currentUserForm: FormGroup;
  changePasswordForm: FormGroup;
  allCategoriesList: Array<any>;
  selfCategories: Array<any> = [];
  passVisible: any;
  currentRole: any;

  constructor(private catalogs: CategoriesService, private fb: FormBuilder, private service: ProfileService,
              private modal: NgxSmartModalService, route: ActivatedRoute) {
    userRoles.subscribe(value => this.currentRole = value.data ? value.data.role : localStorage.getItem('userRole'));
    // this.currentUser = Object.assign({}, JSON.parse(localStorage.getItem('userData')));
    this.service.getById(route.snapshot.paramMap.get('id')).subscribe((response: ResponseModel) => {
      this.currentUser = response.data;

      for (const elem of this.currentUser.categories) {
        this.selfCategories.push(elem.id);
      }
      this.currentUserForm = this.fb.group({
        id: [this.currentUser.id, Validators.required],
        // role: [this.currentUser.role, Validators.required],
        name: [this.currentUser.name, Validators.required],
        legal_name: [this.currentUser.legal_name, Validators.required],
        phone: [this.currentUser.phone, Validators.required],
        email: [this.currentUser.email, Validators.required],
        official_data: [this.currentUser.official_data, Validators.required],
        requisites: [this.currentUser.requisites, Validators.required],
        categories: new FormArray([]),
      });
      const catArr = this.fb.array(this.selfCategories);
      this.currentUserForm.setControl('categories', catArr);
      this.catalogs.getCatalogs(CATALOGS.Categories.name).subscribe((catalogsResponse: ICatalogs) => {
        this.allCategoriesList = catalogsResponse.data;
      });
    });

    this.changePasswordForm = this.fb.group({
      password_current: ['', Validators.required],
      password_new: ['', Validators.required],
      password_new_confirmation: ['', Validators.required]
    });
    this.passVisible = {
      password_current: false,
      password_new: false,
      password_new_confirmation: false
    };
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

  setCategory(category) {
    console.log(category, this.selfCategories.indexOf(category.id));
    if (this.selfCategories.indexOf(category.id) === -1) {
      this.selfCategories.push(category.id);
    } else {
      this.selfCategories.splice(this.selfCategories.indexOf(category.id), 1);
    }
    const catArr = this.fb.array(this.selfCategories);
    this.currentUserForm.setControl('categories', catArr);
  }

  openPassModal() {
    this.changePasswordForm.reset();
    this.modal.getModal('passModal').open();
    console.log('pass work');
  }

  changePassword() {
    const newPass = Object.assign({}, this.changePasswordForm.value);
    this.service.passwordUpdate(this.currentUser, newPass).subscribe(response => {
      this.modal.getModal('passModal').close();
    });
  }

  save() {
    const userModel: any = Object.assign({}, this.currentUserForm.value);
    userModel.role = this.currentRole;
    this.service.update(userModel).subscribe((response: any) => {
      alert('save complete');
      localStorage.setItem('userData', JSON.stringify(response.data));
    });
  }
}
