import {Component} from '@angular/core';
import {ChatService} from '../services/chat-service/chat.service';
import {ResponseModel} from '../models/response.model';
import {NavigatorService} from '../services/admin-services/navigator.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.css']
})

export class ChatComponent {
  contactsList: Array<any>;
  filteredList: Array<any>;
  searchString: string;

  constructor(private service: ChatService, private navigator: NavigatorService, private router: Router) {
    this.getAllContacts();
  }

  getAllContacts() {
    this.service.getAll().subscribe((response: ResponseModel) => {
      this.contactsList = response.data;
      this.filteredList = this.contactsList.slice();
      console.log(response);
    });
  }

  getRoom(userId, user) {
    this.navigator.currentRoom = Object.assign({}, {userFrom: {name: user.name, id: user.id}, avatar: user.avatar});
    console.log(this.navigator.currentRoom);
    this.router.navigate(['chat', userId , {name: user.name}]).catch();
  }

  search() {
    console.log(this.searchString);
    this.filteredList = this.contactsList.filter((contact: any) => {
      if (contact.name.toLowerCase().includes(this.searchString.toLowerCase())) {
        return contact;
      }
    });
    console.log(this.filteredList);
  }

}
