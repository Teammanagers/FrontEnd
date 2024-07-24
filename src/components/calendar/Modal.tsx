import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import moment from 'moment';
import { Value } from '../../types/calendar';
import ClosedBtn from '@assets/calendar/closed-btn.svg';
// import { Theme } from '@/style/theme';

type ModalProps = {
  date: Value;
  onClose: () => void;
  isOpen: boolean;
};

const Modal = ({ date, onClose, isOpen }: ModalProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const target = e.target as HTMLFormElement;
    // const title = (target[0] as HTMLInputElement).value;
    // const memo = (target[1] as HTMLTextAreaElement).value;
  };

  return (
    <Container>
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal>
          <DialogOverlay />
          <Dialog.Content>
            <Content>
              <div className="header">
                <Dialog.Close asChild>
                  <button className="closed-btn-container">
                    <StyledClosedBtn />
                  </button>
                </Dialog.Close>
                <span className="date">
                  {moment(date instanceof Date ? date : null).format(
                    'YYYY.MM.DD'
                  )}
                </span>
              </div>
              <hr />
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="schedule-title"
                  placeholder="일정 제목"
                />
                <hr />
                <div className="participants">
                  <span>참여자</span>
                </div>
                <hr />
                <textarea
                  className="memo"
                  name="memo"
                  placeholder="메모"
                ></textarea>
                <button className="add-schedule-btn" type="submit">
                  일정 추가하기
                </button>
              </form>
            </Content>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Container>
  );
};

export default Modal;

const Container = styled.div``;

const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  inset: 0;
`;

const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 290px;
  padding-top: 15px;
  border-radius: 6px;
  box-shadow: 1.52px 3.04px 9.12px 0 rgb(0, 0, 0, 0.08);
  background-color: #ffffff;

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
      width: inherit;
      height: 30px;
      margin-bottom: 5px;

      span {
        margin-right: 7px;
        font-size: 11px;
        font-weight: 500;
        color: #999999;
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
    }
    .memo::placeholder {
      font-size: 11px;
      font-weight: 400;
      color: #999999;
    }

    .add-schedule-btn {
      height: 36px;
      font-size: 12px;
      font-weight: 700;
      border: none;
      border-radius: 3px;
      color: white;
      background-color: #5c9eff;
      cursor: pointer;
    }
  }

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
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

const StyledClosedBtn = styled(ClosedBtn)`
  cursor: pointer;
`;
