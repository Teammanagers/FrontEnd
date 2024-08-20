export interface TagProps {
  tagId: number;
  name: string;
}

export interface MemoProps {
  memoId: number;
  title: string;
  tagList: TagProps[];
  content: string;
}

export interface MemoResponse {
  code: string;
  isSuccess: boolean;
  message: string;
  result: {
    memoList: MemoProps[];
  };
}
