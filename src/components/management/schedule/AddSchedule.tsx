import {
  TimeSelector,
  TimeSlot
} from '@components/management/schedule/TimeSelector.tsx';
import Reset from '@assets/management/reset.svg';
import Submit from '@assets/management/submit.svg';
import styled from 'styled-components';
import { useState } from 'react';

interface DayTimeSlots {
  // 요일: 값
  [key: string]: TimeSlot[];
}

interface AddScheduleProps {
  onSubmit: () => void;
}

export const AddSchedule = ({ onSubmit }: AddScheduleProps) => {
  // 요일별로 시간 지정
  const [weeklyTimes, setWeeklyTimes] = useState<DayTimeSlots>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  // 특정 요일의 시간 업데이트 함수
  const handleTimeChange = (day: string, times: TimeSlot[]) => {
    setWeeklyTimes((prev) => ({ ...prev, [day]: times }));
  };

  const handleReset = () => {
    setWeeklyTimes({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    });
  };

  const handleSubmit = () => {
    onSubmit();
    // 서버에 요청 보내는 로직 추가해야함
    console.log(weeklyTimes);
  };

  return (
    <Container>
      <AddScheduleContainer>
        <TimeSelector
          day={'Monday'}
          times={weeklyTimes.Monday}
          onChange={handleTimeChange}
        />
        <TimeSelector
          day={'Tuesday'}
          times={weeklyTimes.Tuesday}
          onChange={handleTimeChange}
        />
        <TimeSelector
          day={'Wednesday'}
          times={weeklyTimes.Wednesday}
          onChange={handleTimeChange}
        />
        <TimeSelector
          day={'Thursday'}
          times={weeklyTimes.Thursday}
          onChange={handleTimeChange}
        />
        <TimeSelector
          day={'Friday'}
          times={weeklyTimes.Friday}
          onChange={handleTimeChange}
        />
        <TimeSelector
          day={'Saturday'}
          times={weeklyTimes.Saturday}
          onChange={handleTimeChange}
        />
        <TimeSelector
          day={'Sunday'}
          times={weeklyTimes.Sunday}
          onChange={handleTimeChange}
        />
      </AddScheduleContainer>
      <ButtonContainer>
        <ResetBtn onClick={handleReset}>
          <Reset />
          <ResetBtnText>초기화</ResetBtnText>
        </ResetBtn>
        <SubmitBtn onClick={handleSubmit}>
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
`;

const AddScheduleContainer = styled.div`
  height: 262px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11px;
  margin-top: 11px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 19px;
  gap: 10px;
  margin-top: 8px;
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
