import { useState } from 'react';
import styled from 'styled-components';
import * as Checkbox from '@radix-ui/react-checkbox';
import CheckedIcon from '@assets/todo-list/checked.svg';

interface CheckboxProps {
  todo: string;
}

const CheckTodo = ({ todo }: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  const handleCheckedChange = () => {
    setChecked(!checked);
    console.log(checked);
  };

  return (
    <Container>
      <Checkbox.Root
        className="checkbox-root"
        checked={checked}
        onCheckedChange={handleCheckedChange}
      >
        <Checkbox.Indicator className="checkbox-indicator">
          <CheckedIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="todo-text">{todo}</label>
    </Container>
  );
};

export default CheckTodo;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 318px;
  height: 18px;

  .checkbox-root {
    width: 16px;
    height: 16px;
    border: 0.76px solid #5a5a5a;
    border-radius: 1.52px;
    margin-right: 6px;
  }

  .checkbox-root[data-state='checked'] {
    background-color: ${(props) => props.theme.colors.mainBlue};
    border: 0.76px solid ${(props) => props.theme.colors.mainBlue};
    border-radius: 2px;
  }

  .checkbox-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .todo-text {
    font-size: 12px;
    font-weight: 500;
    color: #1d1d1d;
  }
`;
