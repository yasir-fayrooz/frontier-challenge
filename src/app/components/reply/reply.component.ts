import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reply, User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent implements OnInit {
  constructor(private userService: UserService, public dialog: MatDialog) {}

  @Input() parentId!: number;
  @Input() reply?: Reply;
  @Input() index!: number;

  user!: User;
  isEditing: boolean = false;

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  onReplyTo(username: string) {
    this.userService.replyingTo = {
      id: this.parentId,
      username: username,
    };

    window.scrollTo(0, document.body.scrollHeight);
  }

  onSaveReply(textArea: HTMLTextAreaElement) {
    this.reply!.content = textArea.value;
    this.isEditing = false;

    this.userService.saveData();
  }

  score(num: number) {
    this.reply!.score = this.reply!.score + num;
  }

  openDialog() {
    this.dialog.open(DialogBoxComponent, {
      data: {
        parentId: this.parentId,
        subIndex: this.index,
      },
    });
  }
}
