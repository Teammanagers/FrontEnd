import { INotice } from '@/types/new/common';

export interface getNoticeResponse {
  noticeList: INotice[];
}
export interface getRecentNoticeResponse {
  recentNotice: INotice;
}
