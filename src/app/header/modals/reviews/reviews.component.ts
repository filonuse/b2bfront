import {Component, Input, OnChanges} from '@angular/core';

const maxStars = 5;

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.css']
})

export class ReviewsComponent implements OnChanges {
  reviewsList: Array<any>;
  rating: Array<any>;

  @Input('inputData') inputData;

  constructor() {
    this.rating = new Array(maxStars);
  }

  ngOnChanges(change) {
    if (change.inputData && change.inputData.currentValue) {
      this.reviewsList = change.inputData.currentValue;
    }
  }

  parseDate(date) {
    return new Date(date).toLocaleDateString();
  }
}
