import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RolesModel} from '../models/roles.model';
import {NavigatorService} from '../services/admin-services/navigator.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LanguageService} from '../services/language.service';

export const AUTH_STATE: BehaviorSubject<any> = new BehaviorSubject<any>(false);
export const userRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');
export const language: BehaviorSubject<any> = new BehaviorSubject<any>('ua');


@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.css']
})
export class AuthComponent implements OnInit {
  isLoad: boolean;
  loginForm: FormGroup;
  rolesList: Array<any>;
  currentLanguage: any;


  constructor(private service: AuthService, private fb: FormBuilder, private router: Router, private navigator: NavigatorService,
              private languageService: LanguageService) {
    this.isLoad = false;
    this.rolesList = [];
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
    language.subscribe((lang) => {
      this.languageService.getLanguage(lang).subscribe(currentLang => {
        this.currentLanguage = currentLang;
        localStorage.setItem('currentLanguage', JSON.stringify(currentLang));
        console.log(this.currentLanguage);
      });
    });
  }

  ngOnInit() {
    const roles = new RolesModel();
    for (const name in roles) {
      if (name) {
        this.rolesList.push(roles[name]);
      }
    }
  }

  public onSubmit() {
    this.isLoad = true;
    if (this.loginForm.valid) {
      const body = Object.assign({}, this.loginForm.value);
      this.service.logIn(body)
        .subscribe((response: any) => {
          this.isLoad = false;
          if (response.token) {
            console.log('check', response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userData', JSON.stringify(response.data));
            AUTH_STATE.next(true);
            userRoles.next(response);
            this.router.navigate(['dashboard']).catch();
          }
        }, (error) => {
          this.isLoad = false;
        });
    } else {
      this.isLoad = false;
      console.log('form invalid');
    }
  }

  public setRole(role) {
    this.navigator.currentRole = role.name;
  }

  public registration() {
    this.router.navigate(['registration']).catch();
  }


}
