import styled from 'styled-components';
import Close from '@assets/sidebar/close.svg';
import Plus from '@assets/sidebar/add-new-team.svg';
import Search from '@assets/sidebar/search.svg';
import { useState } from 'react';

interface AddTeamModalProps {
  modalClose: () => void;
}

export const AddTeamModal: React.FC<AddTeamModalProps> = ({ modalClose }) => {
  const [hover, setHover] = useState<number | null>(null);

  const handleHover = (index: number | null) => {
    setHover(index);
  };

  return (
    <ModalBackground>
      <AddTeamContainer>
        <TopContainer>
          <Title>팀 추가하기</Title>
          {/* svg 컴포넌트에 바로 onClick을 하면 에러가 뜬다 .. 구글링하니 div로 감싸면 안 뜬다고 한다.. */}
          <div onClick={modalClose}>
            <CloseBtn />
          </div>
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
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddTeamContainer = styled.div`
  position: relative;
  top: -5%;
  left: -5%;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 620px;
  height: 182px;
  gap: 12px;
  border-radius: 8px;
  flex-direction: column;
  background: white;
  box-shadow: 4px 0 16px 0 rgba(0, 0, 0, 0.5); // 일단 임시로..
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
