import { ChangeEvent, FC, useState } from 'react';
import styled from 'styled-components';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import Todo from './Todo';
import { UserInfo } from 'src/types/todo-list';
import {
  AccordionContentProps,
  AccordionTriggerProps
} from '../../types/todo-list';
import ChevronDownIcon from '@assets/todo-list/chevron-down.svg';
import AddTodoIcon from '@assets/todo-list/add-todo.svg';

interface TodosProps {
  userInfo: UserInfo;
}

const Todos = ({ userInfo }: TodosProps) => {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isClickAdd, setIsClickAdd] = useState(false);

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

  const handleAddTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValue('');
    const target = e.target as HTMLFormElement;
    const value = (target[0] as HTMLInputElement).value;
    if (value) setTodos((prev) => [...prev, value]);
    console.log(todos);
  };

  return (
    <Container>
      <Accordion.Root type="single" className="accordion-root" collapsible>
        <Accordion.Item value="item-1" className="accordion-item">
          <AccordionTrigger onClick={closedTodo}>
            <div className="trigger-container">
              <strong className="username">{userInfo.username}</strong>
              <div className="tag-container">
                {userInfo.tags.map((tag: string) => (
                  <span className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {/* 투두 리스트 */}
              {todos
                ? todos.map((todo) => {
                    return (
                      <li className="todo">
                        <Todo todo={todo} />
                      </li>
                    );
                  })
                : null}
            </ul>

            {/* 투두 추가하기 눌럿을 때 */}
            {isClickAdd ? (
              <form className="add-todo-form" onSubmit={handleAddTodoSubmit}>
                <input
                  value={inputValue}
                  onChange={handleAddTodoInput}
                  type="text"
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
      className={classNames('accordion-trigger', className)}
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

  button,
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
    background-color: skyblue;
    background-color: white;

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
        border-radius: 3px;
        font-size: 10px;
        font-weight: 700;
        color: white;
        background-color: #5c9eff;
      }
    }

    .add-todo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 36px;
      background-color: white;
      cursor: pointer;

      & strong {
        font-size: 12px;
        font-weight: 700;
        margin-right: 9px;
        color: #1d1d1d;
      }
    }

    .todo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 382px;
      height: 30px;
      padding: 0 18.24px;
      margin-bottom: 10px;
    }
  }

  .accordion-trigger:focus-within {
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
