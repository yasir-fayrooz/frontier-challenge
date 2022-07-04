import { Component, Input, OnInit } from '@angular/core';
import { Comment, User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  constructor(private userService: UserService) {}

  user!: User;
  isEditing: boolean = false;
  @Input() comment?: Comment;

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  onReplyTo(id: number, username: string) {
    this.userService.replyingTo = {
      id: id,
      username: username,
    };

    window.scrollTo(0, document.body.scrollHeight);
  }

  onSaveComment(textArea: HTMLTextAreaElement) {
    this.comment!.content = textArea.value;
    this.isEditing = false;

    this.userService.saveData();
  }

  score(num: number) {
    this.comment!.score = this.comment!.score + num;
  }
}
