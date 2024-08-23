import TeamContainer from '@components/team/TeamContainer';
import styled from 'styled-components';
import CreateTeam from '@assets/team/create-team.svg';
import { useNavigate } from 'react-router-dom';
import SearchTeamSection from '@components/team/SelectTeamSection';
import { getTeamById } from '@apis/team/getTeamById';
import { useQuery } from '@tanstack/react-query';

export const TeamPage = () => {
  const navigate = useNavigate();
  const { data: team, isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: getTeamById
  });

  const handleClickJoinButton = () => {
    navigate('/team/join');
  };

  const handleClickCreateButton = () => {
    navigate('/team/create');
  };

  return (
    <TeamContainer>
      <TeamIndexContainer>
        {!isLoading &&
          team?.result.teamList.map((item) => {
            return <SearchTeamSection data={item} />;
          })}
        <SelectTeamComponent>
          {!isLoading && team?.result.teamList.length < 5 && (
            <>
              <TeamLogoComponent onClick={handleClickCreateButton}>
                <CreateTeam />
              </TeamLogoComponent>
              <TeamTitleComponent>새로운 팀 생성하기</TeamTitleComponent>
            </>
          )}
        </SelectTeamComponent>
      </TeamIndexContainer>
      <ButtonContainer>
        <JoinText>다른 팀의 초대를 받았나요?</JoinText>
        <JoinButton onClick={handleClickJoinButton}>팀 찾으러 가기</JoinButton>
      </ButtonContainer>
    </TeamContainer>
  );
};

const TeamTitleComponent = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
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
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
    display: block;
  }
`;

const TeamIndexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 23px;
  overflow-x: hidden;
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
