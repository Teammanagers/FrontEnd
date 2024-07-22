import styled from 'styled-components';

const Progress = () => {
  return (
    <Container>
      <div className="progress">
        <h2>현재 전체 진행률</h2>
        <strong>33%</strong>
      </div>
      <div className="refresh">
        {/* <img src="" alt="refresh-icon" /> */}
        <span>3일전</span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 907px;
  height: 54px;
  margin: 0 0 62px 17px;
  background-color: skyblue;

  h2 {
    margin: 0;
  }
`;

export default Progress;
