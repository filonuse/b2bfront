import {Injectable} from '@angular/core';
import {REVIEWS_API} from '../../config/api.url/reviews.url.config';
import {HttpManagerService} from '../http-manager.service';

@Injectable()

export class ReviewsService {
  constructor(private httpManager: HttpManagerService) {
  }

  public getById(user) {
    return this.httpManager.getRequest(REVIEWS_API.getById(user.id, user.role));
  }

  public add(review) {
    return this.httpManager.postRequest(REVIEWS_API.add, review);
  }

  public getSolo(id) {
    return this.httpManager.getRequest(REVIEWS_API.getSolo(id));
  }
}
