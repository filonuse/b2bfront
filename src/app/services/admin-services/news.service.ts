import {Injectable} from '@angular/core';
import {NEWS_API} from '../../config/api.url/news.url.config';
import {HttpManagerService} from '../http-manager.service';

@Injectable()

export class NewsService {
  constructor(private httpManager: HttpManagerService) {
  }

  add(newsModel) {
    return this.httpManager.postRequest(NEWS_API.add, newsModel);
  }
}
