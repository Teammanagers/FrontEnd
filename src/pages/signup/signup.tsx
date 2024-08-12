import OnBoarding from '@components/login/OnBoarding';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
`;

export const SignupPage = () => {
  return (
    <Wrapper>
      <OnBoarding type="signup" />
    </Wrapper>
  );
};
