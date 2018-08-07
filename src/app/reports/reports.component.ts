import {Component} from '@angular/core';
import {ReportsService} from '../services/clients-services/reports.service';
import {userRoles} from '../authentication/auth.component';
import {reduce} from 'rxjs/operator/reduce';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.css']
})

export class ReportsComponent {
  currentRole: string;
  customerTotalReport: {
    currentMonth: number,
    lastMonth: number,
    difference: number
  };
  providerGoodsList: Array<any>;
  providerGoodsReport: {
    name: string,
    quantity: number,
    count_customers: number
  };
  provCustList: Array<any>;
  providerCustomerReport: {
    name: string,
    legal_name: string,
    count_supplies: number,
    amount: number,
    avg_amount: number,
    count_nomenclature: number
  };

  constructor(private reportsService: ReportsService) {
    this.provCustList = [];
    this.providerGoodsList = [];
    userRoles.subscribe(response => {
      this.currentRole = response ? response.data.role : localStorage.getItem('userRole');
    });

    if (this.currentRole === 'customer') {
      this.reportsService.getCustomerReports().subscribe((response: any) => {
        this.customerTotalReport = {
          currentMonth: response.current_month,
          lastMonth: response.last_month,
          difference: response.difference
        };
      });
    } else {
      console.log('provider');
      this.reportsService.getProviderGoodsReport().subscribe((response: any) => {
        console.log(response)
        if ((typeof response) === 'object') {
          for (const objKeys in response) {
            console.log(objKeys, response[objKeys])
            this.providerGoodsList.push(response[objKeys]);
          }
        }
        // this.providerGoodsReport = {
        //   name: response.name,
        //   quantity: response.quantity,
        //   count_customers: response.count_customers
        // };
      });
      this.reportsService.getProviderCustomerReport().subscribe((response: any) => {
        if ((typeof response) === 'object') {
          for (const objKeys in response) {
            this.provCustList.push(response[objKeys.toString()]);
          }
        }
        // this.providerCustomerReport = {
        //   name: response.name,
        //   legal_name: response.legal_name,
        //   count_supplies: response.count_supplies,
        //   amount: response.amount,
        //   avg_amount: response.avg_amount,
        //   count_nomenclature: response.count_nomenclature
        // };
      });
    }
  }
}
