import styled from 'styled-components';
import Close from '@assets/sidebar/close.svg';
import Plus from '@assets/sidebar/add-new-team.svg';
import Search from '@assets/sidebar/search.svg';
import { useState } from 'react';

export const AddTeamModal = () => {
  const [hover, setHover] = useState<number | null>(null);

  const handleHover = (index: number | null) => {
    setHover(index);
  };

  return (
    <AddTeamContainer>
      <TopContainer>
        <Title>팀 추가하기</Title>
        <CloseBtn />
      </TopContainer>
      <MenuContainer
        onMouseEnter={() => {
          handleHover(0);
        }}
        onMouseLeave={() => {
          handleHover(null);
        }}
        isHovered={hover === 0}
      >
        <MenuText>새로운 팀 생성하기</MenuText>
        <Plus />
      </MenuContainer>
      <MenuContainer
        onMouseEnter={() => {
          handleHover(1);
        }}
        onMouseLeave={() => {
          handleHover(null);
        }}
        isHovered={hover === 1}
      >
        <MenuText>다른 팀 참가하기</MenuText>
        <Search />
      </MenuContainer>
    </AddTeamContainer>
  );
};

const AddTeamContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 620px;
  height: 182px;
  gap: 12px;
  border-radius: 8px;
  flex-direction: column;
  background: white;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 540px;
  height: 30px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
`;

const CloseBtn = styled(Close)`
  margin-bottom: 12px;
  cursor: pointer;
`;

interface HoverProps {
  isHovered: boolean;
}

const MenuContainer = styled.div<HoverProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 540px;
  height: 40px;
  gap: 12px;
  background: ${({ isHovered, theme }) =>
    isHovered ? theme.colors.background : 'white'};
  cursor: pointer;
`;

const MenuText = styled.p`
  font-size: 16px;
  font-weight: 400;
`;
