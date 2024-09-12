import React, { ChangeEvent, useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import LouderSpeakerIcon from '@assets/main/loud-speaker.svg';
import PublishNoticeIcon from '@assets/main/publish-notice.svg';
import { createNotice, getNoticeList, getNoticeRecent } from '@apis/main';
import { NoticeListType } from 'src/types/matin';
import { useIdStore } from '@store/idStore';

const Notice = () => {
  const { teamId, setTeamId } = useIdStore((state) => ({
    teamId: state.teamId,
    setTeamId: state.setTeamId
  }));
  const { ownerTeamManageId, leaderTeamManageId } = useIdStore((state) => ({
    ownerTeamManageId: state.ownerTeamManageId,
    leaderTeamManageId: state.leaderTeamManageId
  }));
  const [noticeRecent, setNoticeRecent] = useState<string>('');
  const [noticeList, setNoticeList] = useState<NoticeListType>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (inputValue.length >= 10) console.log('글자수 넘어감');
  };

  //공지 생성
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValue('');
    const target = e.target as HTMLFormElement;
    const value = (target[0] as HTMLInputElement).value;
    await createNotice(teamId, value);
    fetchNoticeList();
  };

  const fetchNoticeList = async () => {
    // 공지 리스트 받아오기
    const response = await getNoticeList(teamId);
    setNoticeList(response.data.result.noticeList.reverse());
    // 최신 공지 받아오기
    const res = await getNoticeRecent(teamId);
    setNoticeRecent(res.data.result.recentNotice.content);
  };

  useEffect(() => {
    console.log(teamId);
    const id = localStorage.getItem('teamId');
    setTeamId(Number(id));
    if (teamId) fetchNoticeList();
  }, [teamId]);

  return (
    <>
      <Wrapper>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <StyledLoudSpeakerIcon />
            <h2>{noticeRecent}</h2>
            {ownerTeamManageId === leaderTeamManageId && (
              <button>공지 수정</button>
            )}
          </DialogTrigger>
          <Dialog.Portal>
            <DialogOverlay />

            {open && (
              <DialogContent>
                <DialogTitle>공지사항</DialogTitle>
                <ul>
                  {noticeList.map((notice) => (
                    <li key={notice.noticeId}>
                      <h3>{notice.content}</h3>
                      <span>
                        {moment(notice.createdAt).format('YYYY.MM.DD hh:mm')}
                      </span>
                    </li>
                  ))}
                </ul>
                {ownerTeamManageId === leaderTeamManageId && (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={inputValue}
                      placeholder="공지 내용을 입력해주세요"
                      maxLength={50}
                      onChange={handleInput}
                    />
                    <button type="submit">
                      <PublishNoticeIcon />
                    </button>
                  </form>
                )}
              </DialogContent>
            )}
          </Dialog.Portal>
        </Dialog.Root>
      </Wrapper>
    </>
  );
};

export default Notice;

const Wrapper = styled.div``;

const DialogTrigger = styled(Dialog.Trigger)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 908px;
  height: 74px;
  padding-left: 19px;
  margin-right: 30px;
  border: 1px solid #ddebff;
  border-radius: 7px;
  outline: none;
  color: black;
  background-color: white;
  cursor: pointer;

  & h2 {
    all: unset;
    display: flex;
    justify-content: flex-start;
    width: 678px;
    height: 27px;
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    color: #1d1d1d;
    margin-right: 36px;
  }

  button {
    width: 96px;
    height: 36px;
    border: 1px solid ${(props) => props.theme.colors.mainBlue};
    border-radius: 4px;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    color: ${(props) => props.theme.colors.mainBlue};
    background-color: white;
    cursor: pointer;
    outline: none;
  }
`;

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

const DialogContent = styled(Dialog.Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 534px;
  height: 558px;
  padding-top: 24px;
  border: 1px solid #ddebff;
  border-radius: 9px;
  background-color: white;
  box-sizing: border-box;
  animation: contentShow 400ms cubic-bezier(0.16, 1, 0.3, 1);

  ul,
  li,
  h3 {
    all: unset;
    box-sizing: border-box;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 98%;
    height: 397px;
    margin-bottom: 18px;
    gap: 18px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
      background-color: white;
    }

    &::-webkit-scrollbar-thumb {
      width: 3px;
      background-color: #f0f0f0;
      border: 3px solid white;
      border-radius: 76px;
    }

    &::-webkit-scrollbar-track {
      background-color: white;
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px white;
    }
  }

  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 498px;
    min-height: auto;
    padding: 9px 12px 7px 12px;
    border: 1px solid ${(props) => props.theme.colors.subLightBlue};
    border-radius: 6px;

    & h3 {
      font-size: 15px;
      font-weight: 700;
      line-height: 22.5px;
      color: #1d1d1d;
    }

    & span {
      font-size: 10px;
      font-weight: 400;
      text-align: right;
      line-height: 15px;
      color: #5a5a5a;
    }
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 498px;
    height: 50px;
    border: 1px solid #f0f0f0;
    border-radius: 5px;

    & input {
      width: 420px;
      height: 32px;
      margin-right: 6px;
      font-size: 11px;
      font-weight: 400;
      line-height: 15.4px;
      border: none;
      color: #1d1d1d;
      background-color: white;
      outline: none;
    }
    & input::placeholder {
      font-size: 12px;
      font-weight: 400;
      line-height: 16.8px;
      color: #5a5a5a;
    }

    & button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 32px;
      border: none;
      border-radius: 4px;
      background-color: ${(props) => props.theme.colors.mainBlue};
      cursor: pointer;
    }
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const DialogTitle = styled(Dialog.Title)`
  margin: 0 0 18px 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 27px;
  text-align: center;
  color: #1d1d1d;
`;

const StyledLoudSpeakerIcon = styled(LouderSpeakerIcon)`
  margin-right: 24px;
`;
