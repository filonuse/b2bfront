import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {CustomersService} from './admin-services/customers.service';
import {NavigatorService} from './admin-services/navigator.service';
import {SuppliersService} from './admin-services/suppliers.service';
import {CategoriesService} from './admin-services/categories.service';
import {NewsService} from './admin-services/news.service';
import {RegistrationService} from './registration.service';
import {GoodsService} from './clients-services/goods.service';
import {ProfileService} from './clients-services/profile.service';
import {ReviewsService} from './clients-services/reviews.service';
import {OrdersService} from './clients-services/orders.service';
import {ChatService} from './chat-service/chat.service';
import {SettingsService} from './clients-services/settings.service';
import {NotificationsService} from './clients-services/notifications.service';
import {BagService} from './clients-services/bag.service';
import {StoreService} from './clients-services/store.service';
import {AddressService} from './address.service';
import {ReportsService} from './clients-services/reports.service';
import {PusherService} from './pusher-service/pusher.service';
import {RoutesService} from './clients-services/routes.service';
import {HttpManagerService} from './http-manager.service';
import {LanguageService} from './language.service';

@NgModule({
  providers: [
    AuthService,
    CustomersService,
    NavigatorService,
    SuppliersService,
    CategoriesService,
    NewsService,
    RegistrationService,
    GoodsService,
    ProfileService,
    ReviewsService,
    OrdersService,
    ChatService,
    SettingsService,
    NotificationsService,
    BagService,
    StoreService,
    AddressService,
    ReportsService,
    PusherService,
    RoutesService,
    HttpManagerService,
    LanguageService
  ]
})

export class ServiceModule {
}
