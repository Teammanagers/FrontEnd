import styled from 'styled-components';
import * as Popover from '@radix-ui/react-popover';
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
    const target = e.target as HTMLFormElement;
    const title = (target[0] as HTMLInputElement).value;
    const memo = (target[1] as HTMLTextAreaElement).value;
    console.log(title);
    console.log(memo);
  };

  return (
    <Container>
      <Popover.Root open={isOpen} onOpenChange={onClose}>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content>
            <Content>
              <div className="header">
                <Popover.Close asChild>
                  <div className="closed-btn-container">
                    <StyledClosedBtn />
                  </div>
                </Popover.Close>
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
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  position: absolute;
  top: 115px;
  left: 315px;
`;

const Content = styled(Popover.Content)`
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
`;

const StyledClosedBtn = styled(ClosedBtn)`
  cursor: pointer;
`;
