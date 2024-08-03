import { TeamCode } from '@components/management/TeamCode.tsx';
import styled from 'styled-components';

export const ManagementPage = () => {
  return (
    <Container>
      <TeamCode />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
