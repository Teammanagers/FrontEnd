export interface CommentData {
  id: number;
  author: string;
  role: string;
  date: string;
  content: string;
  replies: CommentData[];
}
