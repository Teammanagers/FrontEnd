import styled from 'styled-components';
import TeamManager from '@assets/sidebar/drop-down-logo.svg';
import Giraffe from '@assets/sidebar/giraffe.svg';
import Mountain from '@assets/sidebar/mountain.svg';
import Plus from '@assets/sidebar/plus.svg';
import { useEffect, useState } from 'react';
import { AddTeamModal } from '@components/sidebar/AddTeamModal.tsx';

export const teams = [
  { id: '0', name: 'UMC 6th 팀매니저', logo: <TeamManager /> },
  { id: '1', name: 'UMC 6th 기린', logo: <Giraffe /> },
  { id: '2', name: 'UMC 산악 동아리', logo: <Mountain /> }
];

export const DropDown = () => {
  const [selected, setSelected] = useState<string>(teams[0].id);
  const [hovered, setHovered] = useState<string | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  // 선택된 팀이 젤 위로 오도록 teams 배열 재정렬
  const sortedTeams = teams
    .filter((team) => team.id === selected)
    .concat(teams.filter((team) => team.id !== selected));

  const handleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    console.log(modal);
  }, [modal]);

  return (
    <DropDownContainer>
      {/* 나중에 해당 팀 id로 이동하는 로직 추가할 수도 있음 */}
      {sortedTeams.map((team) => (
        <TeamContainer
          key={team.id}
          onClick={() => setSelected(team.id)}
          onMouseEnter={() => setHovered(team.id)}
          onMouseLeave={() => setHovered(null)}
          isSelected={selected === team.id}
          isHovered={hovered === team.id}
        >
          {team.logo}
          {team.name}
        </TeamContainer>
      ))}
      {/* 팀 추가 누르면 팝업 띄우기? */}
      <AddTeamBtn onClick={handleModal}>
        팀 추가하기
        <Plus />
      </AddTeamBtn>
      {modal && <AddTeamModal modalClose={handleModal} />}
    </DropDownContainer>
  );
};

const DropDownContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
  padding: 8px 0 8px 0;
  gap: 12px;
  background: white;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.1);
`;

interface TeamContainerProps {
  isSelected: boolean;
  isHovered: boolean;
}

const TeamContainer = styled.div<TeamContainerProps>`
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 140px;
  height: 32px;
  background: ${(props) =>
    (props.isSelected && props.theme.colors.mainBlue) ||
    (props.isHovered && props.theme.colors.background) ||
    'white'};
  gap: 12px;
  font-size: 12px;
  color: ${(props) => (props.isSelected ? 'white' : props.theme.colors.black)};
  font-weight: 500;
  cursor: pointer;
`;

const AddTeamBtn = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  gap: 12px;
  cursor: pointer;
`;
