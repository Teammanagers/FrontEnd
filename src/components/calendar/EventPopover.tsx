import styled from 'styled-components';
import moment from 'moment';
import * as Popover from '@radix-ui/react-popover';
import AddEventModal from './AddEventModal';
import { EventType } from 'src/types/calendar';
import AddEventButton from '@assets/calendar/add-event-btn.svg';
import { useState } from 'react';
import Event from './Event';

type EventPopoverProps = {
  date: Date;
  eventList: EventType[];
};

const EventPopover = ({ date, eventList }: EventPopoverProps) => {
  const [open, setOpen] = useState<boolean>(false);

  console.log(eventList);
  const handleModalOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <PopoverRoot defaultOpen={true}>
        <Popover.Trigger asChild>
          <PopoverAnchor />
        </Popover.Trigger>
        <Popover.Portal>
          <PopoverContent>
            <h4 className="date">{moment(date).format('YYYY-MM-DD')}</h4>
            <ul className="event-list">
              {eventList.map((event) => {
                return <Event event={event} />;
              })}
            </ul>
            <button
              className="add-event-button"
              type="button"
              onClick={handleModalOpen}
            >
              <span>일정 추가하기</span>
              <StyledAddEventButton />
            </button>
            <PopoverArrow />
          </PopoverContent>
        </Popover.Portal>
      </PopoverRoot>
      <AddEventModal selectedDate={date} open={open} setOpen={setOpen} />
    </>
  );
};

export default EventPopover;

const PopoverRoot = styled(Popover.Root)``;

const PopoverAnchor = styled(Popover.Anchor)`
  position: absolute;
  width: 60px;
  height: 60px;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
`;

const PopoverContent = styled(Popover.Content)`
  width: 288px;
  min-height: 80px;
  padding: 15px;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 1.52px 3.04px 9.12px 0 rgba(0, 0, 0, 0.08);
  background-color: #ddebff;
  animation-duration: 600ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

  .date {
    margin: 0 0 6px 0;
    font-size: 9px;
    font-weight: 400;
    line-height: 13.5px;
    color: #5a5a5a;
  }

  .event-list {
    padding: 0;
    margin: 0;
  }

  .add-event-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 258px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.mainBlue};
    background-color: white;
    cursor: pointer;

    span {
      margin-right: 9px;
      font-size: 10px;
      font-weight: 700;
      line-height: 15px;
      color: ${(props) => props.theme.colors.mainBlue};
    }
  }

  &[data-state='open'][data-side='top'] {
    animation-name: slideDownAndFade;
  }
  &[data-state='open'][data-side='right'] {
    animation-name: slideLeftAndFade;
  }
  &[data-state='open'][data-side='bottom'] {
    animation-name: slideUpAndFade;
  }
  &[data-state='open'][data-side='left'] {
    animation-name: slideRightAndFade;
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideDownAndFade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeftAndFade {
    from {
      opacity: 0;
      transform: translateX(2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const PopoverArrow = styled(Popover.Arrow)`
  width: 15px;
  height: auto;
  fill: #ddebff;
`;

const StyledAddEventButton = styled(AddEventButton)`
  transform: translateY(-5%);
`;
