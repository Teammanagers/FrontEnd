import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover';
import CheckedIcon from '@assets/todo-list/checked.svg';
import TodoMenuIcon from '@assets/todo-list/todo-menu.svg';
import { deleteTodo, setTodoCheck, updateTodo } from '@apis/todo-list';

interface TodoProps {
  todo: {
    todoId: number;
    title: string;
    status: string;
  };
}

const Todo = ({ todo }: TodoProps) => {
  const [newTodo, setNewTodo] = useState<string>(todo.title);
  const [checked, setChecked] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  console.log(todo);

  const handleCheckedChange = () => {
    // 체크 UI
    setChecked(!checked);
    // api요청
    setTodoCheck(todo.todoId);
  };

  // 수정 시작
  const handleEditClick = () => {
    setIsEditing(true);
  };
  // 수정 중
  const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };
  // 수정 완료
  const handleEditComplete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const value = (target[0] as HTMLInputElement).value;
    updateTodo(todo.todoId, value);
    setIsEditing(false);
  };

  // 삭제
  const handleDelete = () => {
    deleteTodo(todo.todoId, newTodo);
  };

  useEffect(() => {
    todo.status === 'PROCEEDING' ? setChecked(false) : setChecked(true);
  }, []);

  return (
    <>
      {isEditing || (
        <TodoWrapper>
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
          <label className="todo-text">{newTodo}</label>
        </TodoWrapper>
      )}

      {/* 수정 */}
      {isEditing && (
        <Form onSubmit={handleEditComplete}>
          <input
            type="text"
            value={newTodo}
            className="edit-input"
            onChange={handleEditInput}
          />
          <button type="submit" className="edit-button">
            수정
          </button>
        </Form>
      )}

      {/* 수정 및 삭제 메뉴 */}
      {isEditing || (
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
              <button className="edit" onClick={handleEditClick}>
                수정
              </button>
              <button className="delete" onClick={handleDelete}>
                삭제
              </button>
            </PopoverContent>
          </Popover.Portal>
        </PopoverRoot>
      )}
    </>
  );
};

export default Todo;

const TodoWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 318px;
  height: 18px;
  margin-right: 9px;

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
    max-width: 296px;
    font-size: 12px;
    font-weight: 500;
    color: #1d1d1d;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 364px;

  .edit-input {
    width: 306px;
    height: 30px;
    border-radius: 4px;
    border: none;
    outline: none;
    padding-left: 9px;
    margin-right: 9px;
    font-size: 11px;
    font-weight: 500;
    line-height: 16px;
    color: #1d1d1d;
    background-color: #f0f0f0;
  }

  .edit-button {
    width: 49px;
    height: 25px;
    border: 0.76px solid #5c9eff;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 700;
    line-height: 15px;
    text-align: center;
    color: #5c9eff;
    background-color: white;
    cursor: pointer;
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

  .edit,
  .delete {
    font-size: 10px;
    font-weight: 400;
    cursor: pointer;
  }

  .edit {
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
