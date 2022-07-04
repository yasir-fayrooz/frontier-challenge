export interface CurrentData {
  currentUser: User;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
}

export interface User {
  image: Image;
  username: string;
}

export interface Image {
  png: string;
}

export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
}

export interface ReplyingTo {
  id: number;
  username: string;
}
