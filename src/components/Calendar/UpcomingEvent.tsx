import moment from 'moment';
import styled from 'styled-components';
import { UpcomingEventProps } from 'src/types/calendar';

const UpcomingEvent = ({ event }: UpcomingEventProps) => {
  return (
    <UpcomingEventWrapper>
      <div className="event-info">
        <div className="date-scheduler">
          {moment(event.date).format('YYYY.MM.DD')}
        </div>
        <h3 className="event-title">{event.title}</h3>
      </div>
    </UpcomingEventWrapper>
  );
};

export default UpcomingEvent;

const UpcomingEventWrapper = styled.li`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 442px;
  height: 66px;
  padding: 0 15px;
  margin-bottom: 16px;
  border: 1px solid #ddebff;
  border-radius: 6px;
  background-color: white;
  list-style: none;

  .event-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 256px;
    height: 42px;
    margin-right: 50px;

    .date-scheduler {
      font-size: 11px;
      font-weight: 400;
      line-height: 15.4px;
      color: #5a5a5a;
    }

    .event-title {
      width: 413px;
      margin: 0;
      font-size: 15px;
      font-weight: 500;
      line-height: 21px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #1d1d1d;
    }
  }
`;
