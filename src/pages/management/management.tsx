import { EndProject } from '@components/management/EndProject.tsx';
import styled from 'styled-components';

export const ManagementPage = () => {
  return (
    <Container>
      <EndProject />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
