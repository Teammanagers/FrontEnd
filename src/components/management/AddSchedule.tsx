import {
  TimeSelector,
  TimeSlot
} from '@components/management/TimeSelector.tsx';
import Reset from '@assets/management/reset.svg';
import Submit from '@assets/management/submit.svg';
import styled from 'styled-components';
import { useState } from 'react';

interface DayTimeSlots {
  // 요일: 값
  [key: string]: TimeSlot[];
}

export const AddSchedule = () => {
  // 요일별로 시간 지정
  const [weeklyTimes, setWeeklyTimes] = useState<DayTimeSlots>({});

  // 특정 요일의 시간 업데이트 함수
  const handleTimeChange = (day: string, times: TimeSlot[]) => {
    setWeeklyTimes((prev) => ({ ...prev, [day]: times }));
  };

  console.log(weeklyTimes);

  return (
    <Container>
      <AddScheduleContainer>
        <TimeSelector day={'Monday'} onChange={handleTimeChange} />
        <TimeSelector day={'Tuesday'} onChange={handleTimeChange} />
        <TimeSelector day={'Wednesday'} onChange={handleTimeChange} />
        <TimeSelector day={'Thursday'} onChange={handleTimeChange} />
        <TimeSelector day={'Friday'} onChange={handleTimeChange} />
        <TimeSelector day={'Saturday'} onChange={handleTimeChange} />
        <TimeSelector day={'Sunday'} onChange={handleTimeChange} />
      </AddScheduleContainer>
      <ButtonContainer>
        <ResetBtn>
          <Reset />
          <ResetBtnText>초기화</ResetBtnText>
        </ResetBtn>
        <SubmitBtn>
          <Submit />
          <SubmitBtnText>등록</SubmitBtnText>
        </SubmitBtn>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 949px;
  height: 325px;
  display: flex;
  flex-direction: column;
  margin-top: 23px;
  background: white;
  //background: burlywood;
`;

const AddScheduleContainer = styled.div`
  height: 262px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11px;
  margin-top: 11px;
  //background: forestgreen;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 19px;
  gap: 10px;
  margin-top: 8px;
  //background: lightskyblue;
`;

const Btn = styled.button`
  height: 36px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const BtnText = styled.p`
  font-size: 12px;
  font-weight: 700;
`;

const ResetBtn = styled(Btn)`
  width: 94px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
`;

const ResetBtnText = styled(BtnText)`
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const SubmitBtn = styled(Btn)`
  width: 83px;
  background: ${({ theme }) => theme.colors.mainBlue};
  border: none;
`;

const SubmitBtnText = styled(BtnText)`
  color: white;
`;
