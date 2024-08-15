import styled from 'styled-components';
import LogoImage from '@assets/login/project-logo.svg';
import KakaoLogo from '@assets/login/kakao-logo.svg';
import NaverLogo from '@assets/login/naver-logo.svg';
import GoogleLogo from '@assets/login/google-logo.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate('/signup');
  };

  return (
    <OnBoardingTextDiv>
      <LogoImage />
      <p>팀매니저에 오신 것을 환영해요!</p>
      <p>누구나 손쉬운 팀 관리, 함께 해볼까요?</p>
      <Button backgroundColor="#fee500" onClick={handleClickButton}>
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
