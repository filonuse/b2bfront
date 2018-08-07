import {Injectable} from '@angular/core';
import {CHAT_API} from '../../config/api.url/chat.url.config';
import {HttpManagerService} from '../http-manager.service';

@Injectable()

export class ChatService {
  constructor(private httpManager: HttpManagerService) {
  }

  public getAll() {
    return this.httpManager.getRequest(CHAT_API.getAllContacts);
  }

  public getDirect(userId) {
    return this.httpManager.getRequest(CHAT_API.getDirect(userId));
  }

  public sendMessage(messageModel) {
    return this.httpManager.postRequest(CHAT_API.sendMessage, messageModel);
  }
}
