import {
  TimeSelector,
  TimeSlot
} from '@components/management/schedule/TimeSelector.tsx';
import Reset from '@assets/management/reset.svg';
import Submit from '@assets/management/submit.svg';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  createSchedule,
  deleteSchedule,
  updateSchedule
} from '@apis/management.ts';
import { ScheduleDto } from '../../../types/management.ts';
import { convertTimeTableToTimeSlots } from '@components/management/schedule/ShowSchedule.tsx';

interface DayTimeSlots {
  // 요일: 값(TimeSlot[] 형태)
  [key: string]: TimeSlot[];
}

// AddSchedule 컴포넌트에서 Props 타입 수정
interface AddScheduleProps {
  onSubmit: (schedule: ScheduleDto | null) => void;
  initialSchedules?: ScheduleDto | null; // 여기에 ScheduleWrapper 타입 적용
}

export const AddSchedule = ({
  onSubmit,
  initialSchedules
}: AddScheduleProps) => {
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

  // 컴포넌트가 처음 렌더링될 때 initialSchedules를 사용하여 weeklyTimes 초기화
  useEffect(() => {
    if (initialSchedules) {
      setWeeklyTimes({
        ...weeklyTimes,
        Monday: convertTimeTableToTimeSlots(
          initialSchedules.monday?.value || []
        ),
        Tuesday: convertTimeTableToTimeSlots(
          initialSchedules.tuesday?.value || []
        ),
        Wednesday: convertTimeTableToTimeSlots(
          initialSchedules.wednesday?.value || []
        ),
        Thursday: convertTimeTableToTimeSlots(
          initialSchedules.thursday?.value || []
        ),
        Friday: convertTimeTableToTimeSlots(
          initialSchedules.friday?.value || []
        ),
        Saturday: convertTimeTableToTimeSlots(
          initialSchedules.saturday?.value || []
        ),
        Sunday: convertTimeTableToTimeSlots(
          initialSchedules.sunday?.value || []
        )
      });
    }
    console.log('값2: ', initialSchedules);
    console.log('값3: ', weeklyTimes);
  }, [initialSchedules]);
  console.log('값4: ', weeklyTimes);

  useEffect(() => {
    console.log('초기값1: ', initialSchedules);
  }, []);

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

  useEffect(() => {
    console.log('weekly: ', weeklyTimes);
  }, [weeklyTimes]);

  // 타임슬롯을 타임 테이블로 변환
  const convertTimeSlotToTimeTable = (timeSlots: TimeSlot[]): string[] => {
    const timeTable = Array(48).fill('0'); // 24시간, 30분 간격 -> 48개의 슬롯으로 초기화 / 기본값은 0

    timeSlots.forEach(({ start, end }) => {
      const startIndex =
        parseInt(start.split(':')[0]) * 2 +
        (start.split(':')[1] === '30' ? 1 : 0);
      const endIndex =
        parseInt(end.split(':')[0]) * 2 + (end.split(':')[1] === '30' ? 1 : 0);

      for (let i = startIndex; i < endIndex; i++) {
        timeTable[i] = '1';
      }
    });
    return timeTable;
  };

  const handleSubmit = async () => {
    const isEmpty = Object.values(weeklyTimes).every(
      (times) => times.length === 0
    );

    try {
      if (initialSchedules && isEmpty) {
        // 스케줄 수정 시 모든 값이 0으로 설정되면 삭제 처리
        await deleteSchedule(31); // 팀 아이디 1로 설정, 실제로는 동적으로 설정해야 함
        onSubmit(null);
      } else if (initialSchedules) {
        // 스케줄 수정
        const requestBody = {
          monday: { value: convertTimeSlotToTimeTable(weeklyTimes.Monday) },
          tuesday: { value: convertTimeSlotToTimeTable(weeklyTimes.Tuesday) },
          wednesday: {
            value: convertTimeSlotToTimeTable(weeklyTimes.Wednesday)
          },
          thursday: { value: convertTimeSlotToTimeTable(weeklyTimes.Thursday) },
          friday: { value: convertTimeSlotToTimeTable(weeklyTimes.Friday) },
          saturday: { value: convertTimeSlotToTimeTable(weeklyTimes.Saturday) },
          sunday: { value: convertTimeSlotToTimeTable(weeklyTimes.Sunday) }
        };

        const response = await updateSchedule(1, requestBody);
        onSubmit(response.scheduleDto);
      } else {
        // 스케줄 추가
        const requestBody = {
          monday: { value: convertTimeSlotToTimeTable(weeklyTimes.Monday) },
          tuesday: { value: convertTimeSlotToTimeTable(weeklyTimes.Tuesday) },
          wednesday: {
            value: convertTimeSlotToTimeTable(weeklyTimes.Wednesday)
          },
          thursday: { value: convertTimeSlotToTimeTable(weeklyTimes.Thursday) },
          friday: { value: convertTimeSlotToTimeTable(weeklyTimes.Friday) },
          saturday: { value: convertTimeSlotToTimeTable(weeklyTimes.Saturday) },
          sunday: { value: convertTimeSlotToTimeTable(weeklyTimes.Sunday) }
        };

        const response = await createSchedule(1, requestBody);
        onSubmit(response.scheduleDto);
      }
    } catch (error) {
      console.error('스케줄 생성/수정/삭제 중 오류가 발생했습니다:', error);
      onSubmit(null);
    }
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
