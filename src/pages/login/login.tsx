import OnBoarding from '@components/Login/OnBoarding';
import LogoFadeIn from '@components/Login/LogoFadeIn';
import { useLogoFadeIn } from '@hooks/useLogoFadeIn';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
`;

export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const isNewUser = localStorage.getItem('isNewUser');

    if (token && isNewUser === 'true') {
      navigate('/signup');
    }

    if (token && isNewUser === 'false') {
      navigate('/team');
    }
  }, [location]);

  return (
    <Wrapper>
      {isLogoFadeInActivate ? <LogoFadeIn /> : <OnBoarding type="signin" />}
    </Wrapper>
  );
};
