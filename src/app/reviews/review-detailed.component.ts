import {Component, OnChanges} from '@angular/core';
import {ReviewsService} from '../services/clients-services/reviews.service';
import {ResponseModel} from '../models/response.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NavigatorService} from '../services/admin-services/navigator.service';

const maxStars = 5;

@Component({
  selector: 'app-review-detailed',
  templateUrl: './review-detailed.component.html',
  styleUrls: ['./review.css']
})

export class ReviewDetailedComponent implements OnChanges {
  reviewId: string;
  currentReview: any;
  rating: Array<any>;

  constructor(private service: ReviewsService, private route: ActivatedRoute) {
    this.reviewId = this.route.snapshot.params.id;
    this.route.params.subscribe((response: Params) => {
      this.reviewId = response.id;
      this.getReview();
    });

    this.rating = new Array(maxStars);
  }

  ngOnChanges() {
    console.log('init complete');
  }

  getReview() {
    this.service.getSolo(this.reviewId).subscribe((response: ResponseModel) => {
      this.currentReview = response.data;
    });
  }

  parseDate(date) {
    return new Date(date).toLocaleString();
  }
}
