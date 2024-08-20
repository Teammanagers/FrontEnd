import React, { ChangeEvent, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import MockData from '@assets/main/mock-data.json';
import LouderSpeakerIcon from '@assets/main/loud-speaker.svg';
import PublishNoticeIcon from '@assets/main/publish-notice.svg';

type NoticeListType = {
  noticeId: number;
  content: string;
  createdAt: string;
}[];

interface MockType {
  code: number;
  message: string;
  result: { noticeList: NoticeListType };
}

const mock = MockData as MockType;
const Mock = mock.result.noticeList;

const Notice = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  // const handleClosed = () => {
  //   setOpen(false);
  // };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (inputValue.length >= 10) console.log('글자수 넘어감');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValue('');
  };

  return (
    <>
      <Wrapper>
        <StyledLoudSpeakerIcon />
        <h2> UMC 6th 팀 매니저 공지입니다</h2>

        <Dialog.Root open={open}>
          <DialogTrigger>공지 수정</DialogTrigger>
          <Dialog.Portal>
            <DialogOverlay />

            {open && (
              <DialogContent>
                <DialogTitle>공지사항</DialogTitle>
                <ul>
                  {Mock.map((item) => (
                    <li key={item.noticeId}>
                      <h3>{item.content}</h3>
                      <span>
                        {moment(item.createdAt).format('YYYY.MM.DD hh:mm')}
                      </span>
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={inputValue}
                    placeholder="공지 내용을 입력해주세요"
                    maxLength={49}
                    onChange={handleInput}
                  />
                  <button type="submit">
                    <PublishNoticeIcon />
                  </button>
                </form>
              </DialogContent>
            )}
          </Dialog.Portal>
        </Dialog.Root>
      </Wrapper>
    </>
  );
};

export default Notice;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 908px;
  height: 74px;
  padding-left: 19px;
  margin-right: 30px;
  border: 1px solid #ddebff;
  border-radius: 7px;
  color: black;
  background-color: white;

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
`;

const DialogTrigger = styled(Dialog.Trigger)`
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
