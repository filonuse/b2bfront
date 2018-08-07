import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AdminPanelComponent} from './admin/admin-panel/admin-panel.component';
import {RouterModule} from '@angular/router';
import {Routes} from './routes';
import {AuthComponent} from './authentication/auth.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceModule} from './services/service.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CustomersComponent} from './customers/customers.component';
import {CustomerEditComponent} from './customers/customer-edit.component';
import {SuppliersComponent} from './suppliers/suppliers.component';
import {SupplierEditComponent} from './suppliers/supplier-edit.component';
import {CategoriesComponent} from './admin/categories/categories.component';
import {CategoryEditComponent} from './admin/categories/category-edit.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NewsComponent} from './news/news.component';
import {RegistrationComponent} from './registration/registration.component';
import {ProfileComponent} from './profile/profile.component';
import {GoodsComponent} from './goods/goods.component';
import {ProfileEditComponent} from './profile/profile-edit.component';
import {GoodsEditComponent} from './goods/modals/goods-edit.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {ImageComponent} from './services/image-service/image.component';
import {SuppliersInfoComponent} from './suppliers/suppliers-info.component';
import {OrdersComponent} from './orders/orders.component';
import {OrderDetailedComponent} from './orders/order-detailed.component';
import {ChatComponent} from './chat/chat.component';
import {ChatDirectComponent} from './chat/chat-direct.component';
import {SettingsComponent} from './settings/settings.component';
import {BagComponent} from './header/modals/bag/bag.component';
import {GoodsInfoComponent} from './goods/modals/goods-info.component';
import {ReviewsComponent} from './header/modals/reviews/reviews.component';
import {ReviewDetailedComponent} from './reviews/review-detailed.component';
import {StoresComponent} from './settings/stores/stores.component';
import {SettingsListComponent} from './settings/settings-list/settings-list.component';
import {ReportsComponent} from './reports/reports.component';
import {LogisticComponent} from './logistics/logistic.component';
import {AddEditRouteComponent} from './logistics/routes/add-edit-route.component';
import {RouteListComponent} from './logistics/routes/route-list.component';
import {TokenInterceptor} from '../interceptors/token.interceptor';
import {HttpManagerService} from './services/http-manager.service';
import {ErrorsHandleService} from './services/error-handler';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SideMenuComponent,
    FooterComponent,
    AuthComponent,
    AdminPanelComponent,
    CustomersComponent,
    CustomerEditComponent,
    SuppliersComponent,
    SupplierEditComponent,
    CategoriesComponent,
    CategoryEditComponent,
    NewsComponent,
    RegistrationComponent,
    ProfileComponent,
    ProfileEditComponent,
    GoodsComponent,
    GoodsEditComponent,
    GoodsInfoComponent,
    ImageComponent,
    SuppliersInfoComponent,
    OrdersComponent,
    OrderDetailedComponent,
    ChatComponent,
    ChatDirectComponent,
    SettingsComponent,
    ReviewsComponent,
    ReviewDetailedComponent,
    BagComponent,
    StoresComponent,
    SettingsListComponent,
    ReportsComponent,
    LogisticComponent,
    AddEditRouteComponent,
    RouteListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgxSmartModalModule.forRoot(),
    NgbModalModule.forRoot(),
    ServiceModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [
    AuthComponent,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ErrorsHandleService}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
