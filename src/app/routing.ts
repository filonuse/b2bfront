/**List of application's routes*/
import {AuthComponent} from './components/auth/auth.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UserComponent} from './components/user/user.component';
import {ItemEditComponent} from './components/item/item-edit.component';
import {AuthGuard} from './guards/auth.guard';

export const Routes = [
  {path: '', component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'item/:id', component: ItemEditComponent, canActivate: [AuthGuard]}
];

