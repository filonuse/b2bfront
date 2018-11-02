import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['']).catch();
      return false;
    }

  }
}

