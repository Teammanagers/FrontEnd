import { MyTodoList } from 'src/types/todo-list';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionTrigger, AccordionContent } from './AccordionComponents';
import Todo from './Todo';
import { Container } from './layout/StyledTodos';
import { useLocation } from 'react-router-dom';

interface MyTodosProps {
  myTodos: MyTodoList;
}

const MyTodos = ({ myTodos }: MyTodosProps) => {
  const location = useLocation();
  return (
    <Container ismypage={location.pathname.startsWith('/mypage')}>
      <Accordion.Root type="single" className="accordion-root" collapsible>
        <Accordion.Item value="item-1" className="accordion-item">
          <AccordionTrigger>
            <div className="trigger-container">
              <strong className="username">{myTodos.title}</strong>
              <div className="tag-container">
                {myTodos.teamTagList.map((tag, index) => (
                  <span className="tag" key={index}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="todo-list">
              {/* 투두 리스트 */}
              {myTodos
                ? myTodos.todoList.map((todo) => {
                    return (
                      <li className="todo" key={todo.todoId}>
                        <Todo todo={todo} teamManageId={myTodos.teamId} />
                      </li>
                    );
                  })
                : null}
            </ul>
          </AccordionContent>
        </Accordion.Item>
      </Accordion.Root>
    </Container>
  );
};

export default MyTodos;
