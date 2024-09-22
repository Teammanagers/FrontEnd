import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import ClosedBtn from '@assets/calendar/closed-btn.svg';
import Quit from '@assets/alarm/quit.svg';
import Remind from '@assets/alarm/remind.svg';
import WakeUp from '@assets/alarm/wake-up.svg';
import moment from 'moment';
import { useUpdateAlarmStatus } from '@hooks/alarm/useUpdateAlarmStatus';
import { getTeamById } from '@apis/team/getTeamById';
import { useQuery } from '@tanstack/react-query';

type AlarmProps = {
  isAlarmOpen: boolean;
  toggleAlarm: () => void;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  data: AlarmItemProps;
};

type AlarmItemProps = {
  alarmId: number;
  alarmType: 'TODO_AWAKE' | 'CALENDAR_REMIND' | 'TEAM_FINISH';
  date: Date;
  isRead: boolean;
  referenceId: number;
}[];

interface AlarmLogoProps {
  type: 'TODO_AWAKE' | 'CALENDAR_REMIND' | 'TEAM_FINISH'; // 허용할 타입 정의
}

const AlarmLogo: React.FC<AlarmLogoProps> = ({ type }) => {
  const icons = {
    TODO_AWAKE: <WakeUp />,
    CALENDAR_REMIND: <Remind />,
    TEAM_FINISH: <Quit />
  }[type];

  return icons; // 해당 타입에 맞는 아이콘 반환
};

const Alarm = ({ isAlarmOpen, toggleAlarm, setHover, data }: AlarmProps) => {
  const [shouldRender, setShouldRender] = useState(isAlarmOpen);
  const alarmMutation = useUpdateAlarmStatus();

  const { data: team } = useQuery({
    queryKey: ['team'],
    queryFn: getTeamById
  });

  const alarmText = (data) => {
    const text = {
      TODO_AWAKE: `누군가가 ${team.result.name}님을 깨웠어요. 할 일을 해주세요!`,
      CALENDAR_REMIND: `${moment(data.date).format('YYYY.MM.DD HH:mm').date}에 일정이 있어요. 확인해주세요!`,
      TEAM_FINISH: '“팀매니저” 팀이 종료되었어요.'
    }[data.alarmType];

    return text;
  };

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
  const handleAlarmItemClick = (event: React.MouseEvent, alarmId: number) => {
    event.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되는 것을 막음
    alarmMutation.mutate(alarmId);
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
              {data?.map((alarm, index) => (
                <AlarmItem
                  isRead={alarm.isRead}
                  key={index}
                  onClick={(e) => {
                    handleAlarmItemClick(e, alarm.alarmId);
                  }}
                >
                  <div
                    style={{
                      minWidth: '36px',
                      height: '36px',
                      marginRight: '10px'
                    }}
                  >
                    <AlarmLogo type={alarm.alarmType} />
                  </div>
                  <div style={{ width: '100%', height: '40px' }}>
                    <div style={{ fontWeight: 500, fontSize: '15px' }}>
                      {alarmText(alarm)}
                    </div>
                    <div
                      style={{
                        fontWeight: 400,
                        fontSize: '10px',
                        float: 'right'
                      }}
                    >
                      {moment(alarm.date).format('YYYY.MM.DD HH:mm')}
                    </div>
                  </div>
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

const AlarmItem = styled.div<{ isRead: boolean }>`
  display: flex;
  box-sizing: border-box;
  height: 60px;
  border-radius: 6px;
  border: 1px solid #ddebff;
  padding: 10px 12px;
  opacity: ${({ isRead }) => isRead && 0.6};
  cursor: ${({ isRead }) => isRead && 'auto'};
`;

export default Alarm;
