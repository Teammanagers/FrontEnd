export interface CommentData {
  id: number;
  writer: string;
  createdAt: string;
  content: string;
  parentId: number;
  replies: CommentData[];
}
