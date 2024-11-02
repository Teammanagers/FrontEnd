import { ICalendar, ICalendarDetail } from '@/types/new/common';

export interface getCalendarResponse {
  calendarListOfMonth: ICalendar[];
}
export interface getComingCalendarResponse {
  comingCalendarList: ICalendar[];
}
export interface getCalendarDetailResponse {
  Calendar: ICalendarDetail;
}
