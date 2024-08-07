import styled from 'styled-components';
import { TitleText } from '@components/management/TeamCode.tsx';
import Add from '@assets/management/add-button.svg';

export const Schedule = () => {
  return (
    <Container>
      <ScheduleContainer>
        <TitleText>Schedule</TitleText>
        <PeopleContainer>
          <ContentText>현재 참여자들의 가능 시간: </ContentText>
          <AddBtn />
        </PeopleContainer>
      </ScheduleContainer>
      <SubmitBtn>내 스케줄 등록</SubmitBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 934px;
  margin-top: 17px;
  //background: lightpink;
`;

const ScheduleContainer = styled.div`
  height: 57px;
  display: flex;
  flex-direction: column;
  //background: lightcoral;
`;

const PeopleContainer = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  //background: mediumpurple;
`;

const ContentText = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.black};
`;

const AddBtn = styled(Add)`
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  width: 96px;
  height: 36px;
  border-radius: 4px;
  border: none;
  background: ${({ theme }) => theme.colors.mainBlue};
  margin-top: 13px;
  color: white;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;
