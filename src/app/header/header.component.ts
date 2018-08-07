import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AUTH_STATE, language, userRoles} from '../authentication/auth.component';
import {NotificationsService} from '../services/clients-services/notifications.service';
import {ResponseModel} from '../models/response.model';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ReviewsService} from '../services/clients-services/reviews.service';
import {BagService} from '../services/clients-services/bag.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {PusherService} from '../services/pusher-service/pusher.service';
import {LanguageService} from '../services/language.service';

export const goodsInBag: BehaviorSubject<number> = new BehaviorSubject<number>(0);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  languageState: string;
  currentLanguage: any;

  isAuth: boolean;
  currentUser: any;
  total: any = {
    unread: 0,
    notifications: 0
  };
  pagination: any = {};
  notificationsList: Array<any>;
  visible: boolean;
  reviewsList: Array<any>;
  modalType: string;
  goodsCount: any;
  subscription: Subscription[];
  currentRole: any;
  // channels: Subscription[];
  // subModel: boolean;

  constructor(private service: AuthService, private router: Router, private notification: NotificationsService,
              private reviewsService: ReviewsService, private modal: NgxSmartModalService, private bagService: BagService,
              private pusherService: PusherService, private languageService: LanguageService) {
    language.subscribe(value => {
      this.languageState = value;
      this.languageService.getLanguage(this.languageState).subscribe(response => {
        this.currentLanguage = response;
      });
    });
    userRoles.subscribe(value => this.currentRole = value.data ? value.data.role : localStorage.getItem('userRole'));
    this.subscription = [];
    AUTH_STATE.subscribe(state => {
      this.isAuth = state;
      if (this.isAuth) {
        this.getCountNotifications();
        goodsCount = goodsInBag.subscribe((response) => {
          this.goodsCount = response;
          this.getNotifications(false);
        });
      }
    });
    // this.channels = [];
    // this.subModel = true;
    let goodsCount = new Subscription();

    this.subscription.push(goodsCount);
    console.log(this.subscription);
    this.visible = false;
    this.pagination = {
      page: 1,
      perPage: 5
    };
    this.currentUser = {
      name: '',
      role: ''
    };
    this.subscribeOnChannels();
    // this.getNotifications(false);
  }

  ngOnInit() {
    this.checkAuth();
    // this.subscribeOnChannels();
  }

  getCountNotifications() {
    this.bagService.getCount().subscribe((response: any) => {
      goodsInBag.next(response.count);
    });
  }

  changeLanguage(lang) {
    console.log('change language', lang);
    language.next(lang);
  }

  subscribeOnChannels() {
    this.pusherService.channel.bind('review_user', response => {
      console.log(response);
      this.getCountNotifications();
    });
    this.pusherService.channel.bind('review_goods', response => {
      console.log(response);
      this.getCountNotifications();
    });
    this.pusherService.channel.bind('order_status', response => {
      console.log(response);
      this.getCountNotifications();
    });
    this.pusherService.channel.bind('order_created', response => {
      console.log(response);
      this.getCountNotifications();
    });
    this.pusherService.channel.bind('reminder', response => {
      console.log(response);
      this.getCountNotifications();
    });
  }

  checkAuth() {
    if (localStorage.getItem('userData') && localStorage.getItem('userRole') && localStorage.getItem('currentLanguage')) {
      // AUTH_STATE.next(true);
      // this.isAuth = true;
      return this.currentUser = {
        name: JSON.parse(localStorage.getItem('userData')).name,
        role: localStorage.getItem('userRole'),
        id: JSON.parse(localStorage.getItem('userData')).id,
      };
    } else {
      return null;
    }
  }

  logOut() {
    this.router.navigate(['']).then(() => {
      AUTH_STATE.next(false);
      this.service.logOut().subscribe(() => {
        console.log('logout complete');
        localStorage.clear();
      });
    });
  }

  getNotifications(changeView) {
    changeView ? this.visible = !this.visible : '';
    if (!changeView || this.visible) {
      this.notification.getAll(this.pagination).subscribe((response: ResponseModel) => {
        this.notificationsList = response.data;
        this.total.unread = response.meta.total_unread;
        this.total.notifications = response.meta.total;
      });
    }
  }

  getMoreNotifications() {
    this.pagination.perPage += 5;
    this.getNotifications(false);
  }

  editProfile() {
    this.router.navigate(['profile', this.currentUser.id]).catch();
  }

  readNotification(notification) {
    if (notification.action === 'order_created') {
      this.router.navigate(['orders']).catch();
    } else {
      this.openModal('review');
    }
    if (!notification.read) {
      notification.read = true;
      this.notification.update(notification).subscribe((response: ResponseModel) => {
        this.getNotifications(false);
      });
    }
    this.visible = false;
  }

  openModal(type) {
    this.modalType = type;
    if (type === 'review') {
      this.reviewsService.getById(this.currentUser).subscribe((response: ResponseModel) => {
        this.reviewsList = response.data;
        this.reviewsList.reverse();
      });
    }
    this.modal.getModal('notificationsModal').open();
  }

  closeModal(modalName) {
    console.log('event emitter work');
    this.modal.getModal(modalName.toString()).close();
  }

  // switchAllChannels() {
  //   this.subModel = !this.subModel;
  //   if (this.subModel) {
  //     this.pusherService.channel.unsubscribe();
  //     console.log('off');
  //   } else {
  //     this.pusherService.pusher.subscribe('private-App.User.' + this.currentUser.id);
  //   }
  // }

  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
    this.pusherService.channel.unsubscribe();
  }
}
