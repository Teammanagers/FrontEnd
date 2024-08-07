import { TeamCode } from '@components/management/TeamCode.tsx';
// import { EndProject } from '@components/management/EndProject.tsx';
import styled from 'styled-components';
import {Members} from "@components/management/Members.tsx";

export const ManagementPage = () => {
  return (
    <Container>
      <TeamCode />
      <Members />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 182px;
`;
