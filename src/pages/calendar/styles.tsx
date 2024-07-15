import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
  padding: 100px 0 0 126px;
  /* background-color: rgba(249, 251, 255, 1); */
  background-color: #c3c3dd;

  .upcoming-schedule {
    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 700px;
    }
  }
`;

export default { Container };
