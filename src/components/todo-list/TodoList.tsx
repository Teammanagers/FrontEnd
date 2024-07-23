import styled from 'styled-components';
import Todos from './Todos';

const TodoList = () => {
  return (
    <Container>
      <Todos />
    </Container>
  );
};

const Container = styled.div`
  width: 942px;
  height: 426px;
  padding: 31px 77px;
  background-color: lightgreen;
  /* background-color: #ffffff; */
`;

export default TodoList;
