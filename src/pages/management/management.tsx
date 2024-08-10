import styled from 'styled-components';
import { TeamCode } from '@components/management/team-code/TeamCode.tsx';
import { Members } from '@components/management/member/Members.tsx';
import { Schedule } from '@components/management/schedule/Schedule.tsx';
import { AddSchedule } from '@components/management/schedule/AddSchedule.tsx';
import { useState } from 'react';
import { ShowSchedule } from '@components/management/schedule/ShowSchedule.tsx';

export const ManagementPage = () => {
  const [showAddSchedule, setShowAddSchedule] = useState<boolean>(false);

  const handleScheduleSubmit = () => {
    setShowAddSchedule(false);
  };

  return (
    <Container>
      <TeamCode />
      <Members />
      {!showAddSchedule ? (
        <>
          <Schedule onAddSchedule={() => setShowAddSchedule(true)} />
          <ShowSchedule />
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
