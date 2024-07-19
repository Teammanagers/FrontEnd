import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
  padding: 100px 0 0 126px;
  background-color: #f9fbff;
  z-index: -999;

  .upcoming-schedule {
    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 700px;
    }
  }
`;

export default { Container };
