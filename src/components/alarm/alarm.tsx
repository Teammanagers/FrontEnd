import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import ClosedBtn from '@assets/calendar/closed-btn.svg';
import { AlarmListType } from 'src/types/alarm';

type AlarmProps = {
  isAlarmOpen: boolean;
  toggleAlarm: () => void;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  data: AlarmListType;
};

const Alarm = ({ isAlarmOpen, toggleAlarm, setHover, data }: AlarmProps) => {
  const [shouldRender, setShouldRender] = useState(isAlarmOpen);

  useEffect(() => {
    if (isAlarmOpen) {
      setShouldRender(true);
    }
  }, [isAlarmOpen]);

  const onAnimationEnd = () => {
    if (!isAlarmOpen) {
      setShouldRender(false);
      setHover(false);
    }
  };

  // AlarmItem 클릭 시 이벤트 버블링을 막는 핸들러
  const handleAlarmItemClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되는 것을 막음
  };

  return (
    <>
      {shouldRender && (
        <>
          <Overlay onClick={toggleAlarm} />
          <Modal isOpen={isAlarmOpen} onAnimationEnd={onAnimationEnd}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 700, fontSize: '24px' }}>알림</div>
              <div onClick={toggleAlarm}>
                <StyledClosedBtn />
              </div>
            </div>
            <AlarmList>
              {Array.from({ length: 6 }).map((_, index) => (
                <AlarmItem key={index} onClick={handleAlarmItemClick}>
                  하이 {index + 1}
                </AlarmItem>
              ))}
            </AlarmList>
          </Modal>
        </>
      )}
    </>
  );
};

// 모달 열리는 애니메이션
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

// 모달 닫히는 애니메이션
const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

// 모달 스타일 정의
const Modal = styled.div<{
  isOpen: boolean;
}>`
  position: fixed;
  top: 0;
  right: 0;
  width: 512px;
  height: 100vh;
  padding: 44px 26px;
  background-color: white;
  box-shadow: -4px 0px 12px 0px #00000014;
  z-index: 100;
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s forwards;
`;

// 반투명한 오버레이
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledClosedBtn = styled(ClosedBtn)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const AlarmList = styled.div`
  display: grid;
  gap: 24px;
  width: 428px;
  margin: 24px 42px 0px;
`;

const AlarmItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  border-radius: 6px;
  border: 1px solid #ddebff;
  padding: 10px 12px;
  background-color: yellow;
`;

export default Alarm;
