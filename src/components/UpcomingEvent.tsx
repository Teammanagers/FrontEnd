import { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import RemindAlertIcon from '@assets/calendar/reminder-alert.svg';

interface UpcomingEventProps {
  event: {
    calendarId: number;
    title: string;
    status: string;
    isAlarm: boolean;
    date: string;
  };
}

const UpcomingEvent = ({ event }: UpcomingEventProps) => {
  const [isAlarm, setIsAlarm] = useState<boolean>(false);

  const handleSetAlarm = () => {
    setIsAlarm(!isAlarm);
  };

  return (
    <UpcomingEventWrapper>
      <div className="event-info">
        <div className="date-scheduler">
          {moment(event.date).format('YYYY.MM.DD')} · 이예은
        </div>
        <h3 className="event-title">{event.title}</h3>
      </div>

      <button
        className={isAlarm ? 'alarm-sent' : 'alarm-active'}
        onClick={handleSetAlarm}
      >
        <div className="remind-alert-icon">
          <RemindAlertIcon />
        </div>
        <span>{isAlarm ? '알림 설정 완료' : '리마인드 알림'}</span>
      </button>
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
      margin: 0;
      font-size: 15px;
      font-weight: 500;
      line-height: 21px;
      color: #1d1d1d;
    }
  }

  .alarm-active,
  .alarm-sent {
    display: flex;
    align-items: center;
    width: 107px;
    height: 30px;
    border-radius: 4px;
    border: none;
    background-color: #5c9eff;
    cursor: pointer;

    .remind-alert-icon {
      margin-right: 4px;
      cursor: pointer;
    }

    span {
      font-size: 11px;
      font-weight: 700;
      line-height: 16.5px;
      color: white;
    }
  }

  .alarm-sent {
    background-color: #55b7e8;
  }
`;
