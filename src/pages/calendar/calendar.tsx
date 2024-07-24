import Styled from '../../components/calendar/layout/Layout';
import EventCalendar from '@components/calendar/EventCalendar';

export const CalendarPage = () => {
  return (
    <>
      <Styled.Layout>
        <EventCalendar />
        <div className="upcoming-schedule">
          <h2>다가오는 일정</h2>
        </div>
      </Styled.Layout>
    </>
  );
};
