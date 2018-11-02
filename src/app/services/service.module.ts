/**Module of all application's services*/

import {NgModule} from '@angular/core';
import {PostsService} from './posts.service';
import {HttpManagerService} from './http-manager.service';
import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {ItemService} from './item.service';

@NgModule({
  providers: [
    HttpManagerService,
    PostsService,
    AuthService,
    UserService,
    ItemService
  ]
})

export class ServiceModule {

}
