import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import moment from 'moment';
import ParticipantsList from './ParticipantsList';
import { AddEventModalProps, ScheduleInfoType } from '../../types/calendar';
import ClosedBtn from '@assets/calendar/closed-btn.svg';
import RemoveTagIcon from '@assets/calendar/remove-tag-icon.svg';
import { createCalendarEvent } from '@apis/calendar';
import { syncCalendarEvent } from '@utils/calendarUtils';
import { useCalendarStore } from '@store/calendarStore';
import { useIdStore } from '@store/idStore';

const AddEventModal = ({ selectedDate, open, setOpen }: AddEventModalProps) => {
  const { teamId, setTeamId } = useIdStore((state) => ({
    teamId: state.teamId,
    setTeamId: state.setTeamId
  }));
  const location = useLocation();
  const { searchMonth, setEventList, setUpcomingEventList } = useCalendarStore(
    (state) => ({
      searchMonth: state.searchMonth,
      setEventList: state.setEventList,
      setUpcomingEventList: state.setUpcomingEventList
    })
  );
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfoType>({
    date: '',
    title: '',
    participants: [],
    content: ''
  });

  // 스케줄 내용 입력 받기
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setScheduleInfo((prev) => ({ ...prev, title: value }));
  };
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement;
    setScheduleInfo((prev) => ({ ...prev, content: value }));
  };

  // 참가자 태그 삭제
  const removeParticipants = (teamManageId: number) => {
    const newParticipants = scheduleInfo.participants.filter(
      (v) => v.teamManageId !== teamManageId
    );
    setScheduleInfo((prev) => ({
      ...prev,
      participants: newParticipants
    }));
  };

  // 일정 추가하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    const eventTitle = (target[0] as HTMLInputElement).value;
    const newParticipants = scheduleInfo.participants.map(
      (v) => v.teamManageId
    );
    const memo = (target[1] as HTMLTextAreaElement).value;

    const event = {
      date: moment(selectedDate instanceof Date ? selectedDate : null).format(
        'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
      ),
      title: eventTitle,
      participants: newParticipants,
      content: memo
    };

    try {
      await createCalendarEvent(teamId, event);
      setOpen(false);
      // 일정 변동사항 업데이트
      syncCalendarEvent({
        teamId,
        searchMonth,
        setEventList,
        setUpcomingEventList
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 상태 업데이트 후 모달 닫기
  const handleClosed = () => {
    setOpen(false);
    setScheduleInfo({
      date: '',
      title: '',
      participants: [],
      content: ''
    });
  };

  useEffect(() => {
    const id = localStorage.getItem('teamId');
    setTeamId(Number(id));
  }, [teamId]);

  return (
    <>
      <DialogRoot open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <DialogOverlay />
          <Dialog.Title />
          <Dialog.Description />
          {open && (
            <DialogContent
              isCalendarPage={location?.pathname.startsWith('/calendar')}
              isAddParticipants={scheduleInfo.participants.length > 0}
            >
              <div className="header">
                <Dialog.Close asChild onClick={handleClosed}>
                  <button className="closed-btn-container">
                    <StyledClosedBtn />
                  </button>
                </Dialog.Close>
                <h3 className="date">
                  {moment(
                    selectedDate instanceof Date ? selectedDate : null
                  ).format('YYYY.MM.DD')}
                </h3>
              </div>
              <hr />
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="schedule-title"
                  name="schedule-title"
                  placeholder="일정 제목"
                  maxLength={30}
                  onChange={handleInput}
                />
                <hr />
                <div className="participants">
                  {scheduleInfo.participants.length > 0 || (
                    <span className="participants-index">참여자</span>
                  )}
                  <ul className="participants-tags">
                    {scheduleInfo.participants.length > 0 &&
                      scheduleInfo.participants.map((member) => (
                        <li
                          className="participants-tag"
                          key={member.teamManageId}
                        >
                          <span className="participants-name">
                            {member.name}
                          </span>
                          <div
                            className="remove-participant-icon"
                            onClick={() =>
                              removeParticipants(member.teamManageId)
                            }
                          >
                            <StyledRemoveTagIcon />
                          </div>
                        </li>
                      ))}
                    <ParticipantsList
                      scheduleInfo={scheduleInfo}
                      setScheduleInfo={setScheduleInfo}
                    />
                  </ul>
                </div>
                <hr />
                <textarea
                  className="memo"
                  name="memo"
                  placeholder="메모"
                  maxLength={100}
                  onChange={handleTextarea}
                ></textarea>
                <AddScheduleBtn
                  className="add-schedule-btn"
                  type="submit"
                  disabled={
                    scheduleInfo.title &&
                    scheduleInfo.participants.length > 0 &&
                    scheduleInfo.content
                      ? false
                      : true
                  }
                >
                  일정 추가하기
                </AddScheduleBtn>
              </form>
            </DialogContent>
          )}
        </Dialog.Portal>
      </DialogRoot>
    </>
  );
};

export default AddEventModal;

const DialogRoot = styled(Dialog.Root)``;

const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DialogContent = styled(Dialog.Content)<{
  isCalendarPage: boolean;
  isAddParticipants: boolean;
}>`
  position: fixed;
  top: ${(props) => (props.isCalendarPage ? '237px' : '285px')};
  left: 255px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 290px;
  padding-top: 15px;
  border-radius: 6px;
  box-shadow: 1.52px 3.04px 9.12px 0 rgb(0, 0, 0, 0.08);
  background-color: #ffffff;
  animation: contentShow 500ms cubic-bezier(0.16, 1, 0.3, 1);

  ul,
  li {
    all: unset;
  }

  hr {
    width: 320px;
    height: 0.76px;
    border: 0;
    margin: 0 0 5px 0;
    background-color: #f0f0f0;
  }

  .header {
    display: flex;
    flex-direction: column;
    width: 320px;
    margin-bottom: 5px;

    .closed-btn-container {
      width: inherit;
      display: flex;
      justify-content: flex-end;
      background-color: white;
      border: none;
      cursor: pointer;
    }
    .date {
      font-size: 10px;
      font-weight: 500;
      color: #5a5a5a;
    }
  }

  form {
    width: 320px;
    display: flex;
    flex-direction: column;

    .schedule-title {
      width: inherit;
      height: 30px;
      background-color: white;
      border: none;
      padding: 0;
      margin-bottom: 5px;
      font-size: 13px;
      font-weight: 700;
      color: #1d1d1d;
      outline: none;
    }
    .schedule-title::placeholder {
      font-size: 13px;
      font-weight: 700;
      color: #999999;
    }

    .participants {
      display: flex;
      align-items: ${(props) =>
        props.isAddParticipants ? 'flex-start' : 'center'};
      width: inherit;
      height: 30px;
      margin-bottom: 5px;
      overflow: auto;

      .participants-index {
        transform: translateY(10%); //세로 가운데 정렬
        margin-right: 8px;
        font-size: 11px;
        font-weight: 500;
        color: #999999;
      }

      .participants-tags {
        display: flex;

        .participants-tag {
          display: flex;
          align-items: center;
          min-width: 55px;
          width: auto;
          height: 24px;
          padding: 0 6px;
          border-radius: 3px;
          margin-right: 6px;
          background-color: #f9fbff;

          .participants-name {
            margin-right: 5px;
            font-size: 9px;
            font-weight: 500;
            color: #5c9eff;
          }

          .remove-participant-icon {
            display: flex;
            align-items: center;
          }
        }
      }

      &::-webkit-scrollbar {
        height: 1px;
        background-color: white;
      }

      &::-webkit-scrollbar-thumb {
        width: 3px;
        background-color: ${(props) => props.theme.colors.mainBlue};
        border-radius: 76px;
      }
    }

    .memo {
      height: 87px;
      padding-top: 6px;
      border: none;
      margin-bottom: 5px;
      color: #1d1d1d;
      font-size: 11px;
      font-weight: 400;
      background-color: white;
      outline: none;
      resize: none;

      &::-webkit-scrollbar {
        width: 3px;
        background-color: white;
      }

      &::-webkit-scrollbar-thumb {
        width: 3px;
        background-color: #dddddd;
        border-radius: 76px;
      }

      &::-webkit-scrollbar-thumb:active {
        background-color: #5a5a5a;
      }
    }
    .memo::placeholder {
      font-size: 11px;
      font-weight: 400;
      color: #999999;
    }
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-7%, 7%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(0) scale(1);
    }
  }
`;

const StyledClosedBtn = styled(ClosedBtn)`
  cursor: pointer;
`;

const StyledRemoveTagIcon = styled(RemoveTagIcon)`
  cursor: pointer;
`;

const AddScheduleBtn = styled.button`
  height: 36px;
  font-size: 12px;
  font-weight: 700;
  border: none;
  border-radius: 3px;
  color: white;
  background-color: ${(props) => (props.disabled ? '#CCCCCC' : '#5c9eff')};
  cursor: pointer;
`;
