import styled from 'styled-components';
import MockData from '@assets/calendar/upcoming-events.json';

const UpcomingEvents = () => {
  return (
    <Container>
      <h2 className="upcoming-events-title">다가오는 일정</h2>
      <ul className="upcoming-event-list">
        <li className="upcoming-event"></li>
      </ul>
    </Container>
  );
};

export default UpcomingEvents;

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
    background-color: skyblue;
  }
`;
