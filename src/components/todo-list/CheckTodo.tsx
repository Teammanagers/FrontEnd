import { useState } from 'react';
import styled from 'styled-components';
import * as Checkbox from '@radix-ui/react-checkbox';
import CheckBoxIcon from '@assets/todo-list/checked-box.svg';

interface CheckboxProps {
  todo: string;
}

const CheckTodo = ({ todo }: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  return (
    <Container>
      <Checkbox.Root checked={checked} onCheckedChange={handleCheckedChange}>
        <Checkbox.Indicator className="checkbox-indicator">
          {checked === true && <CheckBoxIcon />}
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="todo-text">{todo}</label>
    </Container>
  );
};

export default CheckTodo;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 318px;
  height: 18px;

  .checkbox-indicator {
    display: flex;
    align-items: center;
    margin-right: 6px;
  }

  .todo-text {
    font-size: 12px;
    font-weight: 500;
    color: #1d1d1d;
  }
`;
