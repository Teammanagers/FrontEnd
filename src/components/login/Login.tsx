import styled from 'styled-components';
import LogoImage from '@assets/login/project-logo.svg';
import KakaoLogo from '@assets/login/kakao-logo.svg';
import NaverLogo from '@assets/login/naver-logo.svg';
import GoogleLogo from '@assets/login/google-logo.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const KAKAO_REST_API_KEY = '03716e97eb5bf6be767426f8deb2c40a';
const KAKAO_REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/kakao';
const Login = () => {
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate('/signup');
  };

  const handleKakaoButtonClick = () => {
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

    const name = 'oauthLogin';
    const width = 500;
    const height = 450;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      `${url}&display=popup`,
      name,
      `menubar=no,toolbar=no,status=no,width=${width},height=${height},toolbar=no,left=${left},top=${top}`
    );
  };

  // 팝업으로부터 전달된 메시지를 처리하는 함수
  const handleMessage = async (event) => {
    console.log(event, '흠..');
    if (event.data.type === 'kakaoLogin' && event.data.code) {
      try {
        const code = event.data.code;

        const tokenResponse = await axios.post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}&client_secret=${KAKAO_CLIENT_SECRET}`
        );

        const accessToken = tokenResponse.data.access_token;

        const userInfoResponse = await axios.get(
          'https://kapi.kakao.com/v2/user/me',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        const userInfo = userInfoResponse.data;
        console.log('Kakao user info:', userInfo);

        // 로그인 후 페이지 이동
        navigate('/signup');
      } catch (error) {
        console.error('Kakao login error:', error);
      }
    }
  };

  // 컴포넌트가 마운트되면 메시지 이벤트 리스너를 등록
  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <OnBoardingTextDiv>
      <LogoImage />
      <p>팀매니저에 오신 것을 환영해요!</p>
      <p>누구나 손쉬운 팀 관리, 함께 해볼까요?</p>
      <Button backgroundColor="#fee500" onClick={handleKakaoButtonClick}>
        <KakaoLogo />
        <ButtonText>카카오로 1초만에 시작하기</ButtonText>
      </Button>
      <Button
        backgroundColor="#03c75a"
        textColor="white"
        onClick={handleClickButton}
      >
        <NaverLogo />
        <ButtonText>네이버로 1초만에 시작하기</ButtonText>
      </Button>
      <Button
        backgroundColor="white"
        textColor="#000"
        borderColor="#5A5A5A"
        onClick={handleClickButton}
      >
        <GoogleLogo />
        <ButtonText>구글로 1초만에 시작하기</ButtonText>
      </Button>
    </OnBoardingTextDiv>
  );
};

export default Login;

const OnBoardingTextDiv = styled.div`
  margin-top: 110px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    margin-top: 18px;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    color: #000;
  }

  & > p:nth-of-type(2) {
    margin-top: 9px;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #5a5a5a;
  }
`;

const Button = styled.button<{
  backgroundColor: string;
  textColor?: string;
  borderColor?: string;
}>`
  border: ${({ borderColor }) =>
    borderColor ? `1px solid ${borderColor}` : 'none'};
  border-radius: 8px;
  width: 365px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: 9px;
  cursor: pointer;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor || '#000'};
`;

const ButtonText = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
`;
