import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Comment, User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  constructor(private userService: UserService, public dialog: MatDialog) {}

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

  openDialog() {
    this.dialog.open(DialogBoxComponent, {
      data: {
        parentId: this.comment?.id,
      },
    });
  }
}
