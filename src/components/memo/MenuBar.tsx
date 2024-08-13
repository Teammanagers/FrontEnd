import styled from 'styled-components';

export const MenuBar = () => {
  return (
    <Container>
      <Btn>수정</Btn>
      <Btn style={{ color: 'red' }}>삭제</Btn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 55px;
  height: 50px;
  border-radius: 3px;
  background: white;
  box-shadow: 0 1.52px 9.12px 0 rgba(0, 0, 0, 0.1);
`;

const Btn = styled.button`
  width: 100%;
  height: 50%;
  font-size: 10px;
  border: none;
  background: white;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
  }
`;
