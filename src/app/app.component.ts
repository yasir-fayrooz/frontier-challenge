import { Component, OnInit } from '@angular/core';
import { Comment, CurrentData, Reply, User } from './interfaces/interfaces';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'challenge';
  currentData!: CurrentData;
  user!: User;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.currentData = this.userService.data;
    this.user = this.userService.user;
  }

  onAddComment(textArea: HTMLTextAreaElement) {
    if (this.userService.replyingTo) {
      const reply: Reply = {
        id: 10,
        content: textArea.value,
        createdAt: new Date().toISOString(),
        score: 0,
        replyingTo: this.userService.replyingTo?.username,
        user: this.user,
      };
      //Add a reply
      this.currentData.comments
        .find((x) => x.id === this.userService.replyingTo?.id)
        ?.replies.push(reply);
    } else {
      const comment: Comment = {
        id: 10,
        content: textArea.value,
        createdAt: new Date().toISOString(),
        score: 0,
        user: this.user,
        replies: [],
      };
      //Add a comment
      this.currentData.comments.push(comment);
    }

    //reset replies and value
    textArea.value = '';
    this.userService.replyingTo = undefined;

    this.userService.saveData();
  }

  onRemoveReplyingTo() {
    this.userService.replyingTo = undefined;
  }
}
