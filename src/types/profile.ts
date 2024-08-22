export interface TagDTO {
  tagId: number;
  name: string;
}

export interface CommentDTO {
  commentId: number;
  content: string;
  isHidden: boolean;
}

export interface ProfileDTO {
  imageUrl: string;
  name: string;
  belong: string;
  phoneNumber: string;
  confidentRole: string[];
  commentList: CommentDTO[];
  loginProcess: string;
}

export interface ProfileResponse {
  code: string;
  message: string;
  result: {
    imageUrl: string;
    name: string;
    belong: string;
    phoneNumber: string;
    confidentRole: string[];
    commentList: CommentDTO[];
    loginProcess: string;
  };
}
