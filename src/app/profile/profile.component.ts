import {Component} from '@angular/core';
import {userRoles} from '../authentication/auth.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {
  userData: any;
  profile: any;

  constructor() {
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.profile = {
      name: this.userData.name,
      legal_name: this.userData.legal_name,
      id: this.userData.id
    };
  }
}
