import { EventType } from 'src/types/calendar';
import { create } from 'zustand';

type CalendarStore = {
  searchMonth: number;
  eventList: EventType[];
};

type SetCalendarAction = {
  setSearchMonth: (searchMonth: number) => void;
  setEventList: (setEventList: EventType[]) => void;
};

export const useCalendarStore = create<CalendarStore & SetCalendarAction>()(
  (set) => ({
    searchMonth: 0,
    eventList: [],
    setSearchMonth: (searchMonth) => set(() => ({ searchMonth: searchMonth })),
    setEventList: (eventList) => set(() => ({ eventList: eventList }))
  })
);
