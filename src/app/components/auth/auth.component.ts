import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.css']
})


export class AuthComponent implements OnInit {

  public loginForm: FormGroup;
  public passLength: number;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.passLength = 6;
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.passLength)])
    });
  }

  public get email() {
    return this.loginForm.get('email');
  }

  public get password() {
    return this.loginForm.get('password');
  }


  public onSubmit() {
    if (this.loginForm.status === 'VALID') {
      const loginData = Object.assign({}, this.loginForm.value);
      this.authService.logIn(loginData).subscribe((response: any) => {
        this.logIn(response);
      });
    }
  }

  public logIn(response) {
    localStorage.setItem('token', response.token);
    this.router.navigate(['dashboard']).catch();
  }
}
