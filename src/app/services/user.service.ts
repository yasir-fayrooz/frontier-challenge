import { Injectable } from '@angular/core';
import { default as defaultData } from '../../data.json';
import { CurrentData, ReplyingTo, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {
    let storage = localStorage.getItem('data');
    if (storage) {
      const data: CurrentData = JSON.parse(storage);
      this.currentData = data;
    } else {
      this.currentData = defaultData;
    }
  }

  private currentUser = defaultData.currentUser;
  private currentData: CurrentData;

  replyingTo?: ReplyingTo;

  get user() {
    return this.currentUser as User;
  }

  get data() {
    return this.currentData as CurrentData;
  }

  saveData() {
    localStorage.setItem('data', JSON.stringify(this.currentData));
  }
}
