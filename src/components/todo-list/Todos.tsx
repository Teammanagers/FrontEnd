import { ChangeEvent, FC, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import Todo from './Todo';
import { useTodoStore } from '@store/todoStore';
import { UserInfo } from 'src/types/todo-list';
import {
  AccordionContentProps,
  AccordionTriggerProps
} from '../../types/todo-list';
import ChevronDownIcon from '@assets/todo-list/chevron-down.svg';
import AddTodoIcon from '@assets/todo-list/add-todo.svg';

import { createTodo } from '@apis/todo-list';
import { teamId } from '../../constant/index';
import { syncTodos } from '@utils/todoUtils';

interface TodosProps {
  userInfo: UserInfo;
}

const Todos = ({ userInfo }: TodosProps) => {
  // const location = useLocation();
  const [inputValue, setInputValue] = useState<string>('');
  const [isClickAdd, setIsClickAdd] = useState<boolean>(false);
  const { ownerTeamManageId, setTeamTodos } = useTodoStore((state) => ({
    ownerTeamManageId: state.ownerTeamManageId,
    setTeamTodos: state.setTeamTodos
  }));
  console.log(userInfo);

  // 투두 추가하기
  const openAddTodo = () => {
    setIsClickAdd(true);
  };

  // 토글 헤드 누르면 투두 추가 input 닫기
  const closedTodo = () => {
    setIsClickAdd(false);
    setInputValue('');
  };

  const handleAddTodoInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 투두 생성
  const handleAddTodoSubmit = async (
    teamManageId: number,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setInputValue('');
    const target = e.target as HTMLFormElement;
    const value = (target[0] as HTMLInputElement).value;

    try {
      // 투두 생성 요청
      await createTodo(teamManageId, value);
      // 팀 투두 변동사항 업데이트
      await syncTodos({ teamId, setTeamTodos });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      {/* 마이페이지일 때 */}
      {/* {location.pathname.startsWith('/mypage') ? (
        <Accordion.Root type="single" className="accordion-root" collapsible>
          <Accordion.Item value="item-1" className="accordion-item">
            <AccordionTrigger onClick={closedTodo}>
              <div className="trigger-container">
                <strong className="username">{userInfo.name}</strong>
                <div className="tag-container">
                  {userInfo.roleTagList.map((tag) => (
                    <span className="tag" key={tag.tagId}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul> */}
      {/* 투두 리스트 */}
      {/* {todos
                  ? todos.map((todo, index) => {
                      return (
                        <li className="todo" key={index}>
                          <Todo todo={todo} />
                        </li>
                      );
                    })
                  : null}
              </ul>
            </AccordionContent>
          </Accordion.Item>
        </Accordion.Root> */}
      {/* ) : ( */}
      {/* 투두 or 메인 페이지일 때 */}
      <Accordion.Root type="single" className="accordion-root" collapsible>
        <Accordion.Item value="item-1" className="accordion-item">
          <AccordionTrigger
            className={
              userInfo.teamManageId === ownerTeamManageId ? `owner-ui` : ''
            }
            onClick={closedTodo}
          >
            <div className="trigger-container">
              <strong className="username">{userInfo.name}</strong>
              <div className="tag-container">
                {userInfo.roleTagList.map((tag) => (
                  <span className="tag" key={tag.tagId}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="todo-list">
              {/* 투두 리스트 */}
              {userInfo
                ? userInfo.todoList.map((todo) => {
                    return (
                      <li className="todo" key={todo.todoId}>
                        <Todo
                          todo={todo}
                          teamManageId={userInfo.teamManageId}
                        />
                      </li>
                    );
                  })
                : null}
            </ul>

            {/* 투두 추가하기 눌럿을 때 */}
            {isClickAdd ? (
              <form
                className="add-todo-form"
                onSubmit={(e) => handleAddTodoSubmit(userInfo.teamManageId, e)}
              >
                <input
                  value={inputValue}
                  onChange={handleAddTodoInput}
                  type="text"
                  maxLength={30}
                  placeholder="할 일을 입력해주세요"
                  className="todo-input"
                />
                <button type="submit" className="add-btn">
                  등록
                </button>
              </form>
            ) : (
              <button type="button" className="add-todo" onClick={openAddTodo}>
                <strong>투두 추가하기</strong>
                <StyledAddTodoIcon />
              </button>
            )}
          </AccordionContent>
        </Accordion.Item>
      </Accordion.Root>
      {/* )} */}
    </Container>
  );
};

const AccordionTrigger: FC<AccordionTriggerProps> = ({
  children,
  className,
  ...props
}) => (
  <Accordion.Header className="accordion-header">
    <Accordion.Trigger
      className={classNames(`accordion-trigger`, className)}
      {...props}
    >
      {children}
      <div className="chevrondown-icon">
        <StyledChevronDownIcon aria-hidden />
      </div>
    </Accordion.Trigger>
  </Accordion.Header>
);

const AccordionContent: FC<AccordionContentProps> = ({
  children,
  className,
  ...props
}) => (
  <Accordion.Content
    className={classNames('accordion-content', className)}
    {...props}
  >
    <div className="accordion-content-container">{children}</div>
  </Accordion.Content>
);

export default Todos;

const Container = styled.div`
  width: 382px;
  * {
    box-sizing: border-box;
  }

  h3,
  ul,
  p {
    all: unset;
  }

  li {
    list-style: none;
  }

  .accordion-root {
    width: 382px;
  }

  .accordion-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: 46px;
    padding: 0 15px;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    background-color: white;

    .trigger-container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .username {
        margin-right: 18px;
        font-size: 13px;
        font-weight: 500;
        color: #1d1d1d;
      }

      .tag-container {
        display: flex;
        align-items: center;

        .tag {
          display: flex;
          justify-content: center;
          align-items: center;
          width: auto;
          height: 24px;
          padding: 0 6px 0 6px;
          border-radius: 3px;
          margin-right: 9px;
          font-size: 9px;
          font-weight: 500;
          color: #5c9eff;
          background-color: #f9fbff;
        }
      }
    }
  }

  .accorditag {
    width: 100%;
  }

  /* 투두 리스트 내용 */
  .accordion-content {
    display: flex;
    justify-content: center;
    width: 382px;
    height: auto;
    background-color: white;
    box-sizing: border-box;

    .add-todo-form {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;

      .todo-input,
      .todo-input::placeholder {
        color: #5a5a5a;
        font-size: 11px;
        font-weight: 500;
      }
      .todo-input {
        width: 306px;
        height: 30px;
        padding: 6.7px 10px;
        margin-right: 9px;
        border-radius: 5px;
        border: none;
        background-color: #f0f0f0;
        outline: none;
      }

      .add-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 25px;
        border: none;
        border-radius: 3px;
        font-size: 10px;
        font-weight: 700;
        color: white;
        background-color: #5c9eff;
        cursor: pointer;
      }
    }

    .add-todo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 36px;
      border: none;
      background-color: white;
      cursor: pointer;

      & strong {
        font-size: 12px;
        font-weight: 700;
        margin-right: 9px;
        color: #1d1d1d;
      }
    }

    .todo-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .todo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 382px;
      height: 30px;
      margin-bottom: 10px;
    }
  }

  .owner-ui {
    border: 1px solid #5c9eff;
  }

  /* 오픈 시 content 애니메이션 */
  .accordion-content[data-state='open'] .accordion-content-container {
    padding-top: 10px;
    /* animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1); */
    /* animation: slideDown 300ms ease-in-out; */
  }
  .accordion-content[data-state='closed'] .accordion-content-container {
    /* animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1); */
    /* animation: slideUp 100ms ease-in-out; */
  }

  /* 버튼 애니메이션 */
  .chevrondown-icon {
    transition: transform 500ms ease;
  }

  .accordion-trigger[data-state='open'] > .chevrondown-icon {
    transform: rotate(180deg);
  }

  /* open | closed state에 따른 스타일 */
  .accordion-trigger[data-state='open'] {
    background-color: #f9fbff;
    box-shadow: 0 3.04px 9.12px 0 rgba(0, 0, 0, 0.08);
  }

  .accordion-trigger[data-state='open'] .tag-container .tag {
    background-color: #ffffff;
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`;

const StyledChevronDownIcon = styled(ChevronDownIcon)``;
const StyledAddTodoIcon = styled(AddTodoIcon)``;
