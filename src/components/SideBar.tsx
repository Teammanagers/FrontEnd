import styled from 'styled-components';
import Home from '@assets/sidebar/home.svg';

export const SideBar = () => {
  return (
    <SideBarContainer>
      <Home />
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div`
  width: 1920px;
  //width: 96px;
  height: 1080px;
  //background-color: #646cff;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`;
