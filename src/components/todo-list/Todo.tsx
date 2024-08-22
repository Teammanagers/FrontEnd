import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover';
import CheckedIcon from '@assets/todo-list/checked.svg';
import TodoMenuIcon from '@assets/todo-list/todo-menu.svg';
import {
  deleteTodo,
  sendAwakeAlarm,
  setTodoCheck,
  updateTodo
} from '@apis/todo-list';
import { teamId } from '../../constant/index';
import { useTodoStore } from '@store/todoStore';
import { syncTodos } from '@utils/todoUtils';
import { TodoProps } from 'src/types/todo-list';
import { useLocation } from 'react-router-dom';
import { useIdStore } from '@store/idStore';

const Todo = ({ todo, teamManageId }: TodoProps) => {
  const location = useLocation();
  const { setTeamTodos } = useTodoStore((state) => ({
    setTeamTodos: state.setTeamTodos
  }));
  const { ownerTeamManageId, leaderTeamManageId } = useIdStore((state) => ({
    ownerTeamManageId: state.ownerTeamManageId,
    leaderTeamManageId: state.leaderTeamManageId
  }));
  const [newTodo, setNewTodo] = useState<string>(todo.title);
  const [checked, setChecked] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAwakeActive, setIsAwakeActive] = useState<boolean>(true);

  const handleCheckedChange = () => {
    // 내가 팀장일 때 or 마이 페이지 투두일 때
    if (
      ownerTeamManageId === leaderTeamManageId ||
      location.pathname.startsWith('/mypage')
    ) {
      // 체크 UI 및 api 요청
      setChecked(!checked);
      setTodoCheck(todo.todoId);
    } else {
      // 내가 팀장이 아닐 때는 내 투두만 체크 가능
      if (ownerTeamManageId === teamManageId) {
        setChecked(!checked);
        setTodoCheck(todo.todoId);
      }
    }
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
    setIsEditing(false);

    try {
      // 수정 api 요청
      await updateTodo(todo.todoId, value);
      // 팀 투두 변동사항 업데이트
      await syncTodos({ teamId, setTeamTodos });
    } catch (error) {
      console.error(error);
    }
  };

  // 삭제
  const handleDelete = async () => {
    try {
      await deleteTodo(todo.todoId);
      await syncTodos({ teamId, setTeamTodos });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    todo.status === 'PROCEEDING' ? setChecked(false) : setChecked(true);
  }, []);

  // 깨우기 알람 설정
  const handleAwake = async () => {
    await sendAwakeAlarm(teamId, todo.todoId);
    setIsAwakeActive(false);
    setTimeout(() => {
      setIsAwakeActive(true);
    }, 5000);
  };

  return (
    <>
      {isEditing || (
        <TodoWrapper isowner={ownerTeamManageId === teamManageId}>
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
      {/* 사용자가 아닐 때  && 마이페이지에는 적용 X */}
      {ownerTeamManageId !== teamManageId &&
        !location.pathname.startsWith('/mypage') && (
          <AwakeButton disabled={!isAwakeActive} onClick={handleAwake}>
            깨우기
          </AwakeButton>
        )}

      {/* 사용자일 때 */}
      {!isEditing && ownerTeamManageId === teamManageId && (
        <Popover.Root>
          <Popover.Anchor asChild className="popover-anchor">
            <PopoverTrigger asChild>
              <button
                className="todo-menu-icon"
                disabled={location.pathname.startsWith('/mypage')}
              >
                <StyledTodoMenuIcon />
              </button>
            </PopoverTrigger>
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
        </Popover.Root>
      )}
    </>
  );
};

export default Todo;

const TodoWrapper = styled.div<{ isowner: boolean }>`
  display: flex;
  align-items: center;
  min-width: ${(props) => (props.isowner ? '318px' : '291px')};
  height: 18px;
  margin-right: 9px;

  .checkbox-root {
    width: 16px;
    height: 16px;
    padding: 0;
    border: 0.76px solid #5a5a5a;
    border-radius: 1.52px;
    margin-right: 6px;
    background-color: white;
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

const PopoverTrigger = styled(Popover.Trigger)`
  border: none;
  background-color: white;

  & svg {
    fill: ${(props) => (props.disabled ? 'blue' : 'black')};
  }
`;

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
    border: none;
    background-color: white;
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

const AwakeButton = styled.button<{ disabled: boolean }>`
  width: 48px;
  height: 24px;
  border: 1px solid ${(props) => (props.disabled ? '#5C9EFF' : 'white')};
  border-radius: 4px;
  font-size: 9px;
  font-weight: 700;
  line-height: 14px;
  color: ${(props) => (props.disabled ? '#5C9EFF' : 'white')};
  background-color: ${(props) => (props.disabled ? 'white' : '#5C9EFF')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;

const StyledTodoMenuIcon = styled(TodoMenuIcon)`
  cursor: pointer;
  /* background-color: white;
  color: white;
  fill: white; */
`;
