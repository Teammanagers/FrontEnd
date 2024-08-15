import styled from 'styled-components';
import { SwungDash } from '@components/management/schedule/TimeSelector.tsx';

export const ShowSchedule = () => {
  return (
    <>
      <ScheduleContainer>
        <DayContainer>
          <DayText>Monday</DayText>
          {/* map 함수로 불러와서 정렬.. */}
          <TimeContainer>
            <TimeBox>09:00</TimeBox>
            <SwungDash>~</SwungDash>
            <TimeBox>17:00</TimeBox>
          </TimeContainer>
          <TimeContainer>
            <TimeBox>09:00</TimeBox>
            <SwungDash>~</SwungDash>
            <TimeBox>17:00</TimeBox>
          </TimeContainer>
        </DayContainer>
        <DayContainer>
          <DayText>Tuesday</DayText>
          {/* 겹치는 시간이 없으면 없다고 띄움 따로 상태관리 하기 */}
          <TimeContainer>가능한 시간대가 없어요 😥</TimeContainer>
        </DayContainer>
        <DayContainer>
          <DayText>Wednesday</DayText>
          {/* 겹치는 시간이 없으면 없다고 띄움 따로 상태관리 하기 */}
          <TimeContainer>가능한 시간대가 없어요 😥</TimeContainer>
        </DayContainer>
        <DayContainer>
          <DayText>Thursday</DayText>
          {/* 겹치는 시간이 없으면 없다고 띄움 따로 상태관리 하기 */}
          <TimeContainer>가능한 시간대가 없어요 😥</TimeContainer>
        </DayContainer>
        <DayContainer>
          <DayText>Friday</DayText>
          {/* map 함수로 불러와서 정렬.. */}
          <TimeContainer>
            <TimeBox>09:00</TimeBox>
            <SwungDash>~</SwungDash>
            <TimeBox>17:00</TimeBox>
          </TimeContainer>
          <TimeContainer>
            <TimeBox>09:00</TimeBox>
            <SwungDash>~</SwungDash>
            <TimeBox>17:00</TimeBox>
          </TimeContainer>
        </DayContainer>
        <DayContainer>
          <DayText>Saturday</DayText>
          {/* map 함수로 불러와서 정렬.. */}
          <TimeContainer>
            <TimeBox>09:00</TimeBox>
            <SwungDash>~</SwungDash>
            <TimeBox>17:00</TimeBox>
          </TimeContainer>
          <TimeContainer>
            <TimeBox>09:00</TimeBox>
            <SwungDash>~</SwungDash>
            <TimeBox>17:00</TimeBox>
          </TimeContainer>
        </DayContainer>
        <DayContainer>
          <DayText>Sunday</DayText>
          {/* map 함수로 불러와서 정렬.. */}
          <TimeContainer>
            <TimeBox>09:00</TimeBox>
            <SwungDash>~</SwungDash>
            <TimeBox>17:00</TimeBox>
          </TimeContainer>
          <TimeContainer>
            <TimeBox>09:00</TimeBox>
            <SwungDash>~</SwungDash>
            <TimeBox>17:00</TimeBox>
          </TimeContainer>
        </DayContainer>
      </ScheduleContainer>
    </>
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
  //background: forestgreen;
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
  //background: burlywood;
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
