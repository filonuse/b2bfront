class ReportsUrlConfig {
  public get getCustomerReport() {
    return '/client/reports/report_total_purchases';
  }

  public get getProviderGoods() {
    return '/client/reports/report_goods';
  }

  public get getProviderCustomer() {
    return '/client/reports/report_customers';
  }
}

export const REPORTS_API = new ReportsUrlConfig();
