import styled from 'styled-components';
import MockData from '@assets/calendar/upcoming-events.json';
import UpcomingEvent from '@components/UpcomingEvent';

type UpcomingEventType = {
  calendarId: number;
  title: string;
  status: string;
  isAlarm: boolean;
  date: string;
}[];

interface MockDataType {
  code: number;
  message: string;
  result: { comingCalendarList: UpcomingEventType };
}

const mock = MockData as MockDataType;
const Mock = mock.result.comingCalendarList;

const UpcomingEventList = () => {
  return (
    <Container>
      <h2 className="upcoming-events-title">다가오는 일정</h2>
      <ul className="upcoming-event-list">
        {Mock.map((event, idx) => (
          <UpcomingEvent event={event} key={idx} />
        ))}
      </ul>
    </Container>
  );
};

export default UpcomingEventList;

const Container = styled.div`
  .upcoming-events-title {
    margin: 0 0 24px 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 25px;
    color: #1d1d1d;
  }

  .upcoming-event-list {
    width: 442px;
    height: auto;
    padding: 0;
  }
`;
