import styled from 'styled-components';
import Notice from '@components/main/Notice';

const MainPage = () => {
  return (
    <Layout>
      <Notice />
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
`;
