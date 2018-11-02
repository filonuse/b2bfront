import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.css']
})

export class HeaderComponent {
  constructor(private router: Router) {
  }

  public isAuth(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  public logOut() {
    this.router.navigate([''])
      .then(() => localStorage.clear());

  }
}
