export interface StorageResponse {
  code: number;
  message: string;
  result: {
    storageId: number;
    title: string;
    size: string;
    uploadAt: string;
    fileUrl: string;
    uploader: string;
    fileExtension: string;
    contentType: string;
    inputStream: string;
  }[];
}

export interface FeedbackResponse {
  code: number;
  message: string;
  result: {
    feedbackList: {
      parentId: string;
      feedbackId: number;
      content: string;
    }[];
  };
}

export interface GetFeedback {
  code: number;
  message: string;
  result: CommentData[];
}

export interface CommentData {
  id: number;
  content: string;
  writer: string;
  createdAt: string;
  parentId: number;
  replies: CommentData[];
}
