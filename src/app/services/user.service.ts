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

  deleteMessage(parentId: number, subIndex: number) {
    const commentIndex = this.data.comments.findIndex((x) => x.id === parentId);

    if (commentIndex !== -1) {
      if (subIndex !== undefined) {
        this.currentData.comments[commentIndex].replies.splice(subIndex, 1);
      } else {
        this.currentData.comments.splice(commentIndex, 1);
      }
    }

    this.saveData();
  }
}
