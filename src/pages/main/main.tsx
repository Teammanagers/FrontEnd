import styled from 'styled-components';
import Notice from '@components/main/Notice';

const MainPage = () => {
  const handleCopyClipBoard = (copyCode: string) => {
    try {
      navigator.clipboard.writeText(copyCode);
    } catch (e) {
      alert('팀코드 복사에 실패하였습니다!');
    }
  };

  return (
    <Layout>
      <header>
        <Notice />
        <TeamCodeCopy>
          <strong>X65VRG34</strong>
          <button onClick={() => handleCopyClipBoard('X65VRG34')}>
            팀 코드복사
          </button>
        </TeamCodeCopy>
      </header>
    </Layout>
  );
};

export default MainPage;

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 36px 0 0 119px;
  background-color: #f9fbff;
  box-sizing: border-box;

  header {
    display: flex;
  }
`;

const TeamCodeCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 163px;
  height: 73px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.colors.subLightBlue};

  strong {
    margin-bottom: 2px;
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    color: ${(props) => props.theme.colors.mainBlue};
  }

  button {
    width: 69px;
    height: 24px;
    border: none;
    border-radius: 4px;
    font-size: 9px;
    font-weight: 700;
    line-height: 13.5px;
    color: white;
    background-color: ${(props) => props.theme.colors.mainBlue};
    cursor: pointer;
    outline: none;

    &:active {
      background-color: ${(props) => props.theme.colors.subBlue};
    }
  }
`;
