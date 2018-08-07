import {Component, HostListener, NgZone, OnInit} from '@angular/core';
import {AUTH_STATE, userRoles} from './authentication/auth.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuth: boolean;
  currentRole: string;
  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event) {
  //   localStorage.clear();
  // }

  constructor() {
    this.isAuth = false;
    userRoles.subscribe((value) => {
      this.currentRole = value.data ? value.data.role : localStorage.getItem('userRole');
    });
    AUTH_STATE.subscribe((value) => {
      this.isAuth = value;
    });
    // this.subscribeNotifications();
  }

  // subscribeNotifications() {
  //   this.swPush.requestSubscription({
  //     serverPublicKey: webPush.publicKey
  //   })
  //     .then(sub => {
  //       console.log('subscribe successfully');
  //     })
  //     .catch(err => {
  //       console.log('error');
  //     });
  // }

  ngOnInit() {
    this.checkAuth();
    // this.subscribeNotifications();
  }

  checkAuth() {
    if (localStorage.getItem('token')) {
      AUTH_STATE.next(true);
    } else {
      AUTH_STATE.next(false);
    }
  }

}
