import {Injectable} from '@angular/core';
import {REPORTS_API} from '../../config/api.url/reports.url.config';
import {HttpManagerService} from '../http-manager.service';

@Injectable()

export class ReportsService {
  constructor(private httpManager: HttpManagerService) {
  }

  public getCustomerReports() {
    return this.httpManager.getRequest(REPORTS_API.getCustomerReport);
  }

  public getProviderGoodsReport() {
    return this.httpManager.getRequest(REPORTS_API.getProviderGoods);
  }

  public getProviderCustomerReport() {
    return this.httpManager.getRequest(REPORTS_API.getProviderCustomer);
  }
}
