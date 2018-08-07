import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigatorService} from '../services/admin-services/navigator.service';
import {ReviewsService} from '../services/clients-services/reviews.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {SuppliersService} from '../services/admin-services/suppliers.service';
import {ResponseModel} from '../models/response.model';
import {ActivatedRoute, Router} from '@angular/router';


const maxStars = 5;

@Component({
  selector: 'app-suppliers-info',
  templateUrl: './suppliers-info.component.html',
  styleUrls: ['./suppliers.css']
})

export class SuppliersInfoComponent implements OnInit, OnDestroy {
  currentRole: string;
  supplierId: string;
  currentSupplier: any;
  currentTab: any;
  currentReviews: Array<any>;
  rating: Array<any> = Array(maxStars);
  newReview: any;
  currentRating: any;
  loading: boolean;

  constructor(private navigator: NavigatorService, private reviews: ReviewsService, private service: SuppliersService,
              private modal: NgxSmartModalService, private route: ActivatedRoute, private router: Router) {
    this.currentRole = localStorage.getItem('userRole');
    this.supplierId = this.route.snapshot.params.id;
    this.getSupplierInfo();
    this.currentReviews = [];
    this.loading = false;
    this.newReview = {
      review: '',
      estimate: 0,
      able_type: 'user',
      able_id: ''
    };
    this.currentRating = {
      mark: 0,
      edit: false
    };
  }

  ngOnInit() {
    // console.log(this.navigator.currentUser);
    // this.currentSupplier = this.navigator.currentUser;

  }

  getSupplierInfo() {
    console.log(this.supplierId);
    this.service.getById(this.supplierId).subscribe((response: ResponseModel) => {
      this.currentSupplier = response.data;
    });
  }

  getReviews() {
    console.log(this.currentSupplier);
    this.currentTab = 'reviews';
    const query = {id: this.supplierId, role: 'user'};
    this.reviews.getById(query).subscribe((response: any) => {
      this.currentReviews = response.data;
      console.log(response);
    });
  }

  sendReview() {
    this.loading = true;
    this.newReview.able_id = this.supplierId;
    this.reviews.add(this.newReview).subscribe((response: any) => {
      this.getReviews();
      this.loading = false;
      this.newReview = {
        review: '',
        estimate: 0,
        able_type: 'user',
        able_id: ''
      };
      this.getSupplierInfo();
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

  openDiscountModal() {
    this.modal.getModal('discountModal').open();
  }


  updateUser(discount, ban?) {
    this.loading = true;
    console.log(this.currentSupplier);
    if (!discount) {
      ban ? this.currentSupplier.blacklist = ban : this.currentSupplier.blacklist = ban;
    }
    this.service.updateByUser(this.currentSupplier).subscribe(() => {
      this.getSupplierInfo();
      this.loading = false;
      this.modal.getModal('discountModal').close();
    });
  }

  getDirectChat(user) {
    this.navigator.currentRoom = Object.assign({}, {userFrom: {name: user.name, id: user.id}, avatar: user.avatar});
    console.log(user);
    this.router.navigate(['chat', user.id, {name: user.name}]).catch();

  }

  ngOnDestroy() {
  }

}
