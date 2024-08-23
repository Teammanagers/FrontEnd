import OnBoarding from '@components/login/OnBoarding';
import LogoFadeIn from '@components/login/LogoFadeIn';
import { useLogoFadeIn } from '@hooks/useLogoFadeIn';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
`;

export const LoginPage = () => {
  const location = useLocation();
  const isLogoFadeInActivate = useLogoFadeIn(3000);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken =
      urlParams.get('accessToken') || localStorage.getItem('accessToken');
    const isNewUser =
      urlParams.get('isNewUser') || localStorage.getItem('isNewUser');

    if (!accessToken || !isNewUser) {
      return;
    }

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('isNewUser', isNewUser);
  }, [location]);

  return (
    <Wrapper>
      {isLogoFadeInActivate ? <LogoFadeIn /> : <OnBoarding type="signin" />}
    </Wrapper>
  );
};
