import { useState } from 'react';
import styled from 'styled-components';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover';
import CheckedIcon from '@assets/todo-list/checked.svg';
import TodoMenuIcon from '@assets/todo-list/todo-menu.svg';

interface TodoProps {
  todo: string;
}

const Todo = ({ todo }: TodoProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <CheckboxWrapper>
        <Checkbox.Root
          className="checkbox-root"
          checked={checked}
          onCheckedChange={handleCheckedChange}
        >
          {/* 체크박스 아이콘 */}
          <Checkbox.Indicator className="checkbox-indicator">
            <CheckedIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        {/* 투두 내용 */}
        <label className="todo-text">{todo}</label>
      </CheckboxWrapper>

      {/* 수정 및 삭제 메뉴 */}
      <PopoverRoot>
        <Popover.Anchor asChild className="popover-anchor">
          <Popover.Trigger asChild>
            <button className="todo-menu-icon">
              <StyledTodoMenuIcon />
            </button>
          </Popover.Trigger>
        </Popover.Anchor>

        <Popover.Portal>
          <PopoverContent>
            <button className="modify">수정</button>
            <button className="delete">삭제</button>
          </PopoverContent>
        </Popover.Portal>
      </PopoverRoot>
    </>
  );
};

export default Todo;

const CheckboxWrapper = styled.div`
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

const PopoverRoot = styled(Popover.Root)``;

const PopoverContent = styled(Popover.Content)`
  position: fixed;
  top: -20px;
  left: -25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 50px;
  border-radius: 3px;
  box-shadow: 0 1.52px 9.12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;

  button {
    all: unset;
  }

  .modify,
  .delete {
    font-size: 10px;
    font-weight: 400;
    cursor: pointer;
  }

  .modify {
    color: #1d1d1d;
    margin-bottom: 9px;
  }
  .delete {
    color: #ff0000;
  }
`;

const StyledTodoMenuIcon = styled(TodoMenuIcon)`
  cursor: pointer;
`;
