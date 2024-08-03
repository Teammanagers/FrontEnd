import Styled from '../../components/calendar/layout/Layout';
import EventCalendar from '@components/calendar/EventCalendar';
import UpcomingEvents from '@components/calendar/UpcomingEvents';

export const CalendarPage = () => {
  return (
    <>
      <Styled.Layout>
        <EventCalendar />
        <UpcomingEvents />
      </Styled.Layout>
    </>
  );
};
