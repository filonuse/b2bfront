import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../services/registration.service';
import {Router} from '@angular/router';
import {CategoriesService} from '../services/admin-services/categories.service';
import {CATALOGS, ICatalogs} from '../models/catalogs.model';
import {NavigatorService} from '../services/admin-services/navigator.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.css']
})
export class RegistrationComponent implements OnInit {
  isLoad: boolean;
  registerForm: FormGroup;
  categoriesList: Array<any>;
  pushedCategories: Array<any>;

  constructor(private service: RegistrationService, private fb: FormBuilder, private categories: CategoriesService,
              private navigator: NavigatorService, private router: Router) {
    this.isLoad = false;
    this.pushedCategories = [];
    this.categories.getCatalogs(CATALOGS.Categories).subscribe((response: ICatalogs) => {
      // console.log(response)
      this.categoriesList = response.data;
    });

    this.registerForm = this.fb.group({
      role: [this.navigator.currentRole, Validators.required],
      name: ['', Validators.required],
      legal_name: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      official_data: ['', Validators.required],
      requisites: ['', Validators.required],
      categories: new FormArray([]),
      privacy_policy: ['', [Validators.required, Validators.requiredTrue]],
    });
  }

  ngOnInit() {
  }

  setCategory(category) {
    if (this.pushedCategories.indexOf(category.id) === -1) {
      this.pushedCategories.push(category.id);
    } else {
      this.pushedCategories.splice(this.pushedCategories.indexOf(category.id), 1);
    }
    const pushedItem = this.fb.array(this.pushedCategories);
    this.registerForm.setControl('categories', pushedItem);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userModel = Object.assign({role: 'customer'}, this.registerForm.value);
      this.service.register(userModel).subscribe(response => {
        console.log(response);
        this.router.navigate(['goods']).catch();
      });
      console.log('form valid', this.registerForm.value);
    } else {
      console.log('form invalid');
    }
  }
}
