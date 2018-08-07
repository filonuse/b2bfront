import {Injectable} from '@angular/core';
import {BASE_URL_API} from '../../config/base-url.config';

declare const Pusher: any;
const socket = BASE_URL_API.socket;

export const pusher = {
  key: '905a92760d386c6830fd',
  cluster: 'eu'
};
export const webPush = {
  publicKey: 'BO-fZAZtvkWHaJ2rQlB0GL4Ds5c4On7-DfyDqs__H4-ZieS6W_4ZF_oUy9FKZlpg3x2RoZmwgFFnGbfhijY3UUU',
  privateKey: 'M76qScnFDXXJLmlqnxQLgAe_vEZ2vtiXoSoKReKN7n8'
};

@Injectable()

export class PusherService {
  pusher: any;
  channel: any;
  currentUserId: any;

  constructor() {
    this.currentUserId = JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')).id : 0;
    this.pusher = new Pusher(pusher.key, {
      cluster: pusher.cluster,
      encrypted: true,
      authEndpoint: socket + '/broadcasting/auth',
      auth: {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }
    });
    this.channel = this.pusher.subscribe('private-App.User.' + this.currentUserId);
  }
}
