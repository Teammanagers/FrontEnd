import { getCalendarEventList } from '@apis/calendar';
import { EventType } from 'src/types/calendar';

interface SyncCalendarEventProps {
  teamId: number;
  searchMonth: number;
  setEventList: (eventList: EventType[]) => void;
}

// 월 스케줄 가져오기
export const syncCalendarEvent = async ({
  teamId,
  searchMonth,
  setEventList
}: SyncCalendarEventProps) => {
  const response = await getCalendarEventList(teamId, searchMonth);
  setEventList(response.data.result.calendarListOfMonth);
};
