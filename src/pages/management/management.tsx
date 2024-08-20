import styled from 'styled-components';
import { TeamCode } from '@components/management/team-code/TeamCode.tsx';
import { Members } from '@components/management/member/Members.tsx';
import { Schedule } from '@components/management/schedule/Schedule.tsx';
import { AddSchedule } from '@components/management/schedule/AddSchedule.tsx';
import { useState } from 'react';
import { ShowSchedule } from '@components/management/schedule/ShowSchedule.tsx';
import { NoSchedule } from '@components/management/schedule/NoSchedule.tsx';

export const ManagementPage = () => {
  const [showAddSchedule, setShowAddSchedule] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<number[]>([]); // 스케줄 조회, 현재는 임시

  const handleAddSchedule = () => {
    setShowAddSchedule(true);
  };

  const handleScheduleSubmit = (isAdded: boolean) => {
    if (isAdded) {
      setIsSubmitted(true);
      setSchedules([...schedules]); // 스케줄 추가 로직... 나중에 수정..
    }
    setShowAddSchedule(false);
  };

  return (
    <Container>
      <TeamCode />
      <Members />
      {!showAddSchedule ? (
        <>
          <Schedule
            onAddSchedule={handleAddSchedule}
            isSubmitted={isSubmitted}
          />
          {schedules.length > 0 ? <ShowSchedule /> : <NoSchedule />}
        </>
      ) : (
        <AddSchedule onSubmit={handleScheduleSubmit} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 182px;
`;
