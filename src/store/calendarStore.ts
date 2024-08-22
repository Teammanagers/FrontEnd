import { EventType, UpcomingEventType } from 'src/types/calendar';
import { create } from 'zustand';

type CalendarStore = {
  searchMonth: number;
  eventList: EventType[];
  upcomingEventList: UpcomingEventType;
};

type SetCalendarAction = {
  setSearchMonth: (searchMonth: number) => void;
  setEventList: (setEventList: EventType[]) => void;
  setUpcomingEventList: (upcomingEventList: UpcomingEventType) => void;
};

export const useCalendarStore = create<CalendarStore & SetCalendarAction>()(
  (set) => ({
    searchMonth: 0,
    eventList: [],
    upcomingEventList: [],
    setSearchMonth: (searchMonth) => set(() => ({ searchMonth: searchMonth })),
    setEventList: (eventList) => set(() => ({ eventList: eventList })),
    setUpcomingEventList: (upcomingEventList) =>
      set(() => ({ upcomingEventList: upcomingEventList }))
  })
);
