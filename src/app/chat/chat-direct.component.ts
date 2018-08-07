import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../services/chat-service/chat.service';
import {NavigatorService} from '../services/admin-services/navigator.service';
import {ResponseModel} from '../models/response.model';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-direct-chat',
  templateUrl: './chat-direct.component.html',
  styleUrls: ['./chat.css']
})

export class ChatDirectComponent {
  chatId: string;
  recipientName: string;
  currentRoom: any;
  messagesList: Array<any>;
  currentUser: any;
  newMessage: any;
  loading: boolean;

  constructor(private navigator: NavigatorService, private service: ChatService, private route: ActivatedRoute) {
    this.chatId = this.route.snapshot.paramMap.get('id');
    this.recipientName = this.route.snapshot.paramMap.get('name');
    console.log(this.recipientName)
    console.log(this.chatId);
    this.loading = false;
    this.currentRoom = this.navigator.currentRoom;
    this.getRoom();
    this.currentUser = JSON.parse(localStorage.getItem('userData'));
    console.log(this.currentRoom);
    this.newMessage = {
      message: '',
      recipient: this.chatId
    };
  }

  getRoom() {
    this.service.getDirect(this.chatId).subscribe((response: ResponseModel) => {
      this.messagesList = response.data;
      this.messagesList.reverse();
      console.log(this.messagesList);
    });
  }

  parseTime(date) {
    return new Date(date).toLocaleTimeString();
  }

  sendMessage() {
    this.loading = true;
    this.service.sendMessage(this.newMessage).subscribe(() => {
      this.getRoom();
      this.newMessage.message = '';
      this.loading = false;
    });
  }


}
