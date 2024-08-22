import { getCalendarEventList, getUpcomingEvent } from '@apis/calendar';
import { EventType, UpcomingEventType } from 'src/types/calendar';

interface SyncCalendarEventProps {
  teamId: number;
  searchMonth: number;
  setEventList: (eventList: EventType[]) => void;
  setUpcomingEventList: (upcomingEventList: UpcomingEventType) => void;
}

// 월 스케줄 가져오기
export const syncCalendarEvent = async ({
  teamId,
  searchMonth,
  setEventList,
  setUpcomingEventList
}: SyncCalendarEventProps) => {
  // 전체 일정 가져오기
  const eventList = await getCalendarEventList(teamId, searchMonth);
  setEventList(eventList.data.result.calendarListOfMonth);
  // 다가오는 일정 가져오기
  const upcomingEventList = await getUpcomingEvent(teamId);
  setUpcomingEventList(upcomingEventList.data.result.comingCalendarList);
};
