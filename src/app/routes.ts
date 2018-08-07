import {AdminPanelComponent} from './admin/admin-panel/admin-panel.component';
import {AuthComponent} from './authentication/auth.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CustomersComponent} from './customers/customers.component';
import {CustomerEditComponent} from './customers/customer-edit.component';
import {SuppliersComponent} from './suppliers/suppliers.component';
import {SupplierEditComponent} from './suppliers/supplier-edit.component';
import {CategoriesComponent} from './admin/categories/categories.component';
import {CategoryEditComponent} from './admin/categories/category-edit.component';
import {NewsComponent} from './news/news.component';
import {RegistrationComponent} from './registration/registration.component';
import {ProfileComponent} from './profile/profile.component';
import {GoodsComponent} from './goods/goods.component';
import {ProfileEditComponent} from './profile/profile-edit.component';
import {GoodsEditComponent} from './goods/modals/goods-edit.component';
import {SuppliersInfoComponent} from './suppliers/suppliers-info.component';
import {OrdersComponent} from './orders/orders.component';
import {OrderDetailedComponent} from './orders/order-detailed.component';
import {ChatComponent} from './chat/chat.component';
import {ChatDirectComponent} from './chat/chat-direct.component';
import {SettingsComponent} from './settings/settings.component';
import {ReviewDetailedComponent} from './reviews/review-detailed.component';
import {BagComponent} from './header/modals/bag/bag.component';
import {StoresComponent} from './settings/stores/stores.component';
import {SettingsListComponent} from './settings/settings-list/settings-list.component';
import {ReportsComponent} from './reports/reports.component';
import {LogisticComponent} from './logistics/logistic.component';
import {AddEditRouteComponent} from './logistics/routes/add-edit-route.component';
import {RouteListComponent} from './logistics/routes/route-list.component';

export const Routes = [
  {path: '', component: AuthComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/:id', component: ProfileEditComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'adminPanel', component: AdminPanelComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'customerEdit', component: CustomerEditComponent},
  {path: 'suppliers', component: SuppliersComponent},
  {path: 'supplierEdit', component: SupplierEditComponent},
  {path: 'supplier/:id', component: SuppliersInfoComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categoryEdit', component: CategoryEditComponent},
  {path: 'addNews', component: NewsComponent},
  {path: 'goods', component: GoodsComponent},
  {path: 'goodsEdit', component: GoodsEditComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'order/:id', component: OrderDetailedComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'chat/:id', component: ChatDirectComponent},
  {path: 'settings', component: SettingsComponent, children: [
      {path: '', component: SettingsListComponent},
      {path: 'stores', component: StoresComponent}
    ]},
  {path: 'review/:id', component: ReviewDetailedComponent},
  {path: 'bag', component: BagComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'logistic', component: LogisticComponent, children: [
      {path: '' , component: RouteListComponent},
      {path: 'addEditRoute' , component: AddEditRouteComponent}
    ]}
];

