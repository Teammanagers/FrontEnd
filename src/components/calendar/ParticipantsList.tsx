import * as Popover from '@radix-ui/react-popover';
import styled from 'styled-components';
import MockData from '@assets/calendar/participants-list.json';
import AddParticipantsBtn from '@assets/calendar/add-participants.svg';
import { ParticipantsListType } from 'src/types/calendar';

interface MockDataType {
  participants: string[];
}
const mock = MockData as MockDataType;
const Mock = mock.participants;

const ParticipantsList = ({
  scheduleInfo,
  setScheduleInfo
}: ParticipantsListType) => {
  const addParticipants = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    setScheduleInfo((prev) => ({
      ...prev,
      participants: [...prev.participants, target.innerText]
    }));
  };

  return (
    <PopoverRoot>
      <Popover.Anchor asChild className="popover-anchor">
        <Popover.Trigger asChild className="popover-trigger">
          <StyledAddParticipantsBtn />
        </Popover.Trigger>
      </Popover.Anchor>

      <Popover.Portal>
        <PopoverContent>
          <div className="participants-list">
            {Mock.map((item: string, index) => (
              <Button
                disabled={scheduleInfo.participants.includes(item)}
                key={index}
                onClick={addParticipants}
              >
                {item}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover.Portal>
    </PopoverRoot>
  );
};

export default ParticipantsList;

const PopoverRoot = styled(Popover.Root)``;
const PopoverContent = styled(Popover.Content)`
  position: relative;
  top: -23px;
  left: 15px;

  ul,
  li {
    all: unset;
  }

  .participants-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: auto;
    border-radius: 3px;
    box-shadow: 0px 1.32px 11.84px 0 rgba(0, 0, 0, 0.1);
    background-color: white;
  }
`;

const Button = styled.button`
  margin-bottom: 10px;
  font-size: 10px;
  font-weight: 500;
  background-color: white;
  border: none;
  color: ${(props) => (props.disabled ? '#999999' : '#1d1d1d')};
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};

  &:first-child {
    margin-top: 6px;
  }
  &:last-child {
    margin-bottom: 6px;
  }
  &:hover {
    color: ${(props) => (props.disabled ? '#999999' : '#5c9eff')};
  }
`;

const StyledAddParticipantsBtn = styled(AddParticipantsBtn)<{}>`
  position: sticky;
  top: 0;
  right: 5px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
