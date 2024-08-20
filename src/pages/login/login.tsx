import OnBoarding from '@components/login/OnBoarding';
import LogoFadeIn from '@components/login/LogoFadeIn';
import { useLogoFadeIn } from '@hooks/useLogoFadeIn';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
`;

export const LoginPage = () => {
  const isLogoFadeInActivate = useLogoFadeIn(3000);

  return (
    <Wrapper>
      {isLogoFadeInActivate ? <LogoFadeIn /> : <OnBoarding type="signin" />}
    </Wrapper>
  );
};
