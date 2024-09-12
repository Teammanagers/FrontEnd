import OnBoardingWrapper from '@components/Login/OnBoardingWrapper';
import CompleteImage from '@assets/login/complete.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Complete = () => {
  const navigate = useNavigate();

  return (
    <OnBoardingWrapper>
      <CompleteContainer>
        <CompleteImage />
        <BoldText>환영합니다</BoldText>
        <Text marginTop="18px">이제 팀매니저를 사용할 수 있어요!</Text>
        <StyledButton
          backgroundColor="#5C9EFF"
          color="white"
          marginTop="8px"
          onClick={() => navigate('/team/create')}
        >
          우리 팀 만들러 가기
        </StyledButton>
        <Text marginTop="15px">이미 다른 팀의 초대를 받았나요?</Text>
        <StyledButton
          backgroundColor="#FFF"
          color="#5C9EFF"
          border="1px solid #5C9EFF"
          marginTop="8px"
          onClick={() => navigate('/team/join')}
        >
          팀 참가하러 가기
        </StyledButton>
      </CompleteContainer>
    </OnBoardingWrapper>
  );
};

export default Complete;

const CompleteContainer = styled.div`
  display: grid;
  place-content: center;
  margin: 56px 92px;
  text-align: center;
`;

const BoldText = styled.p`
  color: #1d1d1d;
  font-size: 18px;
  line-height: 27px;
  margin: 0;
  font-weight: 700;
`;

const Text = styled.p<{ marginTop?: string }>`
  color: #1d1d1d;
  font-size: 14px;
  margin: 0;
  margin-top: ${({ marginTop }) => marginTop || '8px'};
  font-weight: 500;
`;

const StyledButton = styled.button<{
  backgroundColor: string;
  color: string;
  border?: string;
  marginTop?: string;
}>`
  width: 350px;
  height: 48px;
  border-radius: 4px;
  border: ${({ border }) => border || 'none'};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  font-weight: 700;
  font-size: 15px;
  line-height: 23px;
  margin-top: ${({ marginTop }) => marginTop || '0px'};
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
