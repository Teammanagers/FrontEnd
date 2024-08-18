import { ChangeEvent, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { useTodoStore } from '@store/todoStore';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionTrigger, AccordionContent } from './AccordionComponents';
import Todo from './Todo';
import { UserInfo } from 'src/types/todo-list';
import { createTodo } from '@apis/todo-list';
import { syncTodos } from '@utils/todoUtils';
import { teamId } from '../../constant/index';
import { Container, StyledAddTodoIcon } from './layout/StyledTodos';

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
            {ownerTeamManageId !==
            userInfo.teamManageId ? null : !isClickAdd ? (
              <button type="button" className="add-todo" onClick={openAddTodo}>
                <strong>투두 추가하기</strong>
                <StyledAddTodoIcon />
              </button>
            ) : (
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
            )}
          </AccordionContent>
        </Accordion.Item>
      </Accordion.Root>
    </Container>
  );
};

export default Todos;
