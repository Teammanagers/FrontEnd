import styled from 'styled-components';
import { SwungDash } from '@components/Management/schedule/TimeSelector.tsx';
import { ScheduleDto } from '../../../types/management.ts';

interface ShowScheduleProps {
  schedule: ScheduleDto;
}

interface TimeSlot {
  start: string;
  end: string;
}

// TimeTable을 TimeSlot으로 변환
export const convertTimeTableToTimeSlots = (
  timeTable: string[]
): TimeSlot[] => {
  const timeSlots: TimeSlot[] = [];
  let startTime: string | null = null;

  timeTable.forEach((value, index) => {
    const time = `${String(Math.floor(index / 2)).padStart(2, '0')}:${
      index % 2 === 0 ? '00' : '30'
    }`;

    if (value === '1' && startTime === null) {
      startTime = time;
    } else if (value === '0' && startTime !== null) {
      timeSlots.push({ start: startTime, end: time });
      startTime = null;
    }
  });

  if (startTime !== null) {
    timeSlots.push({ start: startTime, end: '24:00' });
  }

  return timeSlots;
};

export const ShowSchedule = ({ schedule }: ShowScheduleProps) => {
  return (
    <ScheduleContainer>
      {Object.entries(schedule).map(([day, timeTable]) => (
        <DayContainer key={day}>
          <DayText>{day.charAt(0).toUpperCase() + day.slice(1)}</DayText>
          {convertTimeTableToTimeSlots(timeTable.value).length > 0 ? (
            convertTimeTableToTimeSlots(timeTable.value).map((slot, index) => (
              <TimeContainer key={index}>
                <TimeBox>{slot.start}</TimeBox>
                <SwungDash>~</SwungDash>
                <TimeBox>{slot.end}</TimeBox>
              </TimeContainer>
            ))
          ) : (
            <TimeContainer>가능한 시간대가 없어요 😥</TimeContainer>
          )}
        </DayContainer>
      ))}
    </ScheduleContainer>
  );
};

const ScheduleContainer = styled.div`
  width: 934px;
  height: 259px;
  display: flex;
  flex-direction: column;
  margin-top: 23px;
  gap: 7px;
`;

const DayContainer = styled.div`
  height: 31px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const DayText = styled.p`
  width: 70px;
  font-size: 13px;
  font-weight: 500;
  margin-right: 7px;
  color: ${({ theme }) => theme.colors.black};
`;

const TimeContainer = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.black};
`;

const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 28px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background: white;
`;
