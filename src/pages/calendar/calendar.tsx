import Styled from './styles';
import Calendar from '@components/calendar/EventCalendar';

export const CalendarPage = () => {
  return (
    <>
      <Styled.Container>
        <Calendar />
        <div className="upcoming-schedule">
          <h2>다가오는 일정</h2>
        </div>
      </Styled.Container>
    </>
  );
};
