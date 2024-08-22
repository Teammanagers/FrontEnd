import OnBoarding from '@components/login/OnBoarding';
import LogoFadeIn from '@components/login/LogoFadeIn';
import { useLogoFadeIn } from '@hooks/useLogoFadeIn';
import styled from 'styled-components';
import { useEffect } from 'react';

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
`;

export const LoginPage = () => {
  const isLogoFadeInActivate = useLogoFadeIn(3000);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken =
      urlParams.get('accessToken') || localStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    localStorage.setItem('accessToken', accessToken);
  }, []);

  return (
    <Wrapper>
      {isLogoFadeInActivate ? <LogoFadeIn /> : <OnBoarding type="signin" />}
    </Wrapper>
  );
};
