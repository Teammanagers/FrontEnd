import Complete from '@components/Login/Complete';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
`;

export const LoginCompletePage = () => {
  return (
    <Wrapper>
      <Complete />
    </Wrapper>
  );
};
