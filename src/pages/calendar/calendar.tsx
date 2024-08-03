import Styled from '../../components/calendar/layout/Layout';
import EventCalendar from '@components/calendar/EventCalendar';
import UpcomingEventList from '@components/calendar/UpcomingEventList';

export const CalendarPage = () => {
  return (
    <>
      <Styled.Layout>
        <EventCalendar />
        <UpcomingEventList />
      </Styled.Layout>
    </>
  );
};
