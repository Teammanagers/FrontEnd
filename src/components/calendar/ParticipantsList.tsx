import * as Popover from '@radix-ui/react-popover';
import styled from 'styled-components';
import MockData from '@assets/calendar/mock-data.json';
import AddParticipantsBtn from '@assets/calendar/add-participants.svg';
import { ParticipantsListType } from 'src/types/calendar';

interface MockDataType {
  participants: string[];
}
const mock = MockData as MockDataType;
const Mock = mock.participants;

const ParticipantsList = ({ setScheduleInfo }: ParticipantsListType) => {
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
          <ul className="participants-list">
            {Mock.map((item: string, index) => (
              <li className="participant" key={index} onClick={addParticipants}>
                {item}
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover.Portal>
    </PopoverRoot>
  );
};

export default ParticipantsList;

const PopoverRoot = styled(Popover.Root)`
  .popover-trigger {
    display: flex;
    align-items: center;
  }
`;
const PopoverContent = styled(Popover.Content)`
  position: relative;
  top: -23px;
  left: 17px;

  ul,
  li,
  button {
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

  .participant {
    margin-bottom: 10px;
    font-size: 10px;
    font-weight: 500;
    color: #1d1d1d;
    cursor: pointer;
  }

  .participant:first-child {
    margin-top: 6px;
  }
  .participant:last-child {
    margin-bottom: 6px;
  }
  .participant:hover {
    color: #5c9eff;
  }
`;
const StyledAddParticipantsBtn = styled(AddParticipantsBtn)`
  cursor: pointer;
`;
