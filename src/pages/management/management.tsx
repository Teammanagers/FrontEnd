import { TeamCode } from '@components/management/team-code/TeamCode.tsx';
// import { EndProject } from '@components/management/EndProject.tsx';
import styled from 'styled-components';
import { Members } from '@components/management/member/Members.tsx';
import { Schedule } from '@components/management/schedule/Schedule.tsx';
import { ShowSchedule } from '@components/management/schedule/ShowSchedule.tsx';
// import { TimeSelector } from '@components/management/TimeSelector.tsx';
// import { AddSchedule } from '@components/management/AddSchedule.tsx';
// import { PeopleDropDown } from '@components/management/PeopleDropDown.tsx';

export const ManagementPage = () => {
  return (
    <Container>
      <TeamCode />
      <Members />
      <Schedule />
      {/*<PeopleDropDown />*/}
      {/*<TimeSelector />*/}
      {/*<AddSchedule />*/}
      <ShowSchedule />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 182px;
`;
