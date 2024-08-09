import { useState } from 'react';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import LouderSpeaker from '@assets/main/loud-speaker.svg';

const Notice = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClosed = () => {
    setOpen(false);
  };

  return (
    <>
      <Wrapper>
        <StyledLoudSpeaker />
        <h2> UMC 6th 팀 매니저 공지입니다</h2>

        <Dialog.Root
          open={open}
          //   onOpenChange={() => {
          //     open ? setOpen(true) : handleClosed();
          //   }}
          onOpenChange={setOpen}
        >
          <DialogTrigger>공지 수정</DialogTrigger>
          <Dialog.Portal>
            <DialogOverlay />

            {open && (
              <DialogContent>
                <DialogTitle>공지사항</DialogTitle>
                <ul></ul>
                <form action="">
                  <input type="text" />
                  <button type="submit"></button>
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 534px;
  height: 558px;
  padding: 24px 18px;
  border: 1px solid #ddebff;
  border-radius: 9px;
  background-color: white;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

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

const StyledLoudSpeaker = styled(LouderSpeaker)`
  margin-right: 24px;
`;
