import styled from 'styled-components';

export const NoSchedule = () => {
  return <Container>아직 등록된 일정이 없어요!</Container>;
};

const Container = styled.div`
  width: 949px;
  height: 298px;
  background: white;
  margin-top: 11px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;
