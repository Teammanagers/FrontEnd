import styled from 'styled-components';
import * as Progress from '@radix-ui/react-progress';

interface TeamProgressProps {
  progressValue: number;
}

const TeamProgress = ({ progressValue }: TeamProgressProps) => {
  return (
    <Container>
      <div className="progress-container">
        <div className="progress">
          <h2>현재 전체 진행률</h2>
          <strong className="progress-rate">{progressValue}%</strong>
        </div>
      </div>

      <div className="progress-bar"></div>
      <ProgressBar>
        <Progress.Root className="progress-root" value={progressValue}>
          <Progress.Indicator
            className="progress-indicator"
            style={{ transform: `translateX(-${100 - progressValue}%)` }}
          />
        </Progress.Root>
      </ProgressBar>
    </Container>
  );
};

export default TeamProgress;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 907px;
  height: 54px;
  margin: 0 0 62px 17px;

  .progress-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .progress {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 180px;
      height: 27px;

      h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
        color: black;
      }

      .progress-rate {
        font-size: 18px;
        font-weight: 700;
        color: ${(props) => props.theme.colors.mainBlue};
      }
    }
  }
`;

const ProgressBar = styled.div`
  .progress-root {
    width: 907px;
    height: 18px;
    border-radius: 76px;
    overflow: hidden;
    background-color: white;
  }

  .progress-indicator {
    background-color: #5c9eff;
    width: 100%;
    height: 100%;
    border-radius: 76px;
    transition: transform 900ms ease-in-out;
  }
`;
