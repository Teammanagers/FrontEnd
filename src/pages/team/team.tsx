import TeamContainer from '@components/team/TeamContainer';
import styled from 'styled-components';
import TeamLogo from '@assets/team/logo.svg';
import CreateTeam from '@assets/team/create-team.svg';
import { useNavigate } from 'react-router-dom';

export const TeamPage = () => {
  const navigate = useNavigate();

  const handleClickJoinButton = () => {
    navigate('/team/join');
  };

  const handleClickCreateButton = () => {
    navigate('/team/create');
  };

  return (
    <TeamContainer>
      <TeamIndexContainer>
        <SelectTeamComponent>
          <TeamLogoComponent withBorder>
            <TeamLogo />
          </TeamLogoComponent>
          <TeamTitleComponent>UMC 6th 팀매니저</TeamTitleComponent>
          <TeamTagContainer>
            <TeamTagComponent>UMC</TeamTagComponent>
            <TeamTagComponent>데모데이</TeamTagComponent>
          </TeamTagContainer>
        </SelectTeamComponent>
        <SelectTeamComponent onClick={handleClickCreateButton}>
          <TeamLogoComponent>
            <CreateTeam />
          </TeamLogoComponent>
          <TeamTitleComponent>새로운 팀 생성하기</TeamTitleComponent>
        </SelectTeamComponent>
      </TeamIndexContainer>
      <ButtonContainer>
        <JoinText>다른 팀의 초대를 받았나요?</JoinText>
        <JoinButton onClick={handleClickJoinButton}>팀 찾으러 가기</JoinButton>
      </ButtonContainer>
    </TeamContainer>
  );
};

const TeamIndexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 23px;
`;

const SelectTeamComponent = styled.div`
  cursor: pointer;
  margin-top: 76px;
  width: 163px;
  height: 274px;
  padding: 0px 47px;
`;

const TeamLogoComponent = styled.div<{ withBorder?: boolean }>`
  display: grid;
  place-content: center;
  width: 163px;
  height: 163px;
  border-radius: 100%;
  background-color: #ffffff;
  border: ${(props) =>
    props.withBorder ? '0.76px solid #5c9eff' : '0.76px solid #F0F0F0'};
`;

const TeamTitleComponent = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
`;

const TeamTagContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6px;
  gap: 8px;
`;

const TeamTagComponent = styled.div`
  display: grid;
  place-content: center;
  text-align: center;
  padding: 0px 10px;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #5c9eff;
  background-color: #ffffff;
`;

const ButtonContainer = styled.div`
  display: grid;
  place-items: center;
  margin-top: 139px;
`;

const JoinText = styled.span`
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
`;

const JoinButton = styled.button`
  width: 350px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid #5c9eff;
  background-color: #ffffff;
  color: #5c9eff;
  margin-top: 10px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
`;