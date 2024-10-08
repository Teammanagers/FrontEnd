import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EventType } from 'src/types/calendar';
import CheckedIcon from '@assets/todo-list/checked.svg';
import { updateEventState } from '@apis/calendar';
import EventModal from './EventModal';

type EventProp = {
  event: EventType;
};

const Event = ({ event }: EventProp) => {
  const [checkEvent, setCheckEvent] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // 일정 확인
  const handleCheckEvent = () => {
    setCheckEvent(true);
  };

  // 일정 수정
  const handleEditEvent = () => {
    setIsEditing(true);
  };

  // 일정 완료
  const handleUpdateEventState = async (eventId: number) => {
    setIsComplete(!isComplete);
    await updateEventState(eventId);
  };

  useEffect(() => {
    event.status === 'PROCEEDING' ? setIsComplete(false) : setIsComplete(true);
  }, []);

  return (
    <>
      <EventWrapper key={event.calendarId}>
        <div className="event-title-container" onClick={handleCheckEvent}>
          <div className="ellipse"></div>
          <p className={isComplete ? 'underline event-title' : 'event-title'}>
            {event.title}
          </p>
        </div>
        <div className="buttons">
          {isComplete || (
            <button className="edit-button" onClick={handleEditEvent}>
              수정
            </button>
          )}
          {isComplete ? (
            <button
              className="checked-button"
              type="button"
              onClick={() => handleUpdateEventState(event.calendarId)}
            >
              <CheckedIcon />
            </button>
          ) : (
            <button
              className="complete-button"
              onClick={() => handleUpdateEventState(event.calendarId)}
            >
              완료
            </button>
          )}
        </div>
      </EventWrapper>
      <EventModal
        date={event.date}
        calendarId={event.calendarId}
        checkEvent={checkEvent}
        setCheckEvent={setCheckEvent}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </>
  );
};

export default Event;

const EventWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 258px;
  height: 22px;
  margin-bottom: 9px;

  .event-title-container {
    display: flex;
    align-items: center;
    width: 163px;
    height: 15px;

    .ellipse {
      width: 3px;
      height: 3px;
      border-radius: 6px;
      background-color: #1d1d1d;
      margin-right: 7px;
    }
    .underline {
      text-decoration: line-through;
    }
    .event-title {
      width: 153px;
      height: 15px;
      margin: 0;
      font-size: 10px;
      font-weight: 400;
      line-height: 15px;
      color: #1d1d1d;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
  }
  .buttons {
    display: flex;

    & > button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 41px;
      height: 22px;
      border-radius: 3px;
      font-size: 9px;
      font-weight: 700;
      line-height: 13.5px;
      cursor: pointer;
    }

    .edit-button {
      margin-right: 7px;
      background-color: white;
      border: 1px solid ${(props) => props.theme.colors.mainBlue};
      color: ${(props) => props.theme.colors.mainBlue};
    }

    .checked-button {
      width: 41px;
      height: 22px;
      border: none;
      border-radius: 3px;
      background-color: #55b7e8;
    }
    .complete-button {
      background-color: ${(props) => props.theme.colors.mainBlue};
      border: none;
      color: white;
    }
  }
`;
