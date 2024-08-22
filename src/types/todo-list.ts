export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  className?: string;
}

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  className?: string;
}

export interface UserInfo {
  teamManageId: number;
  name: string;
  roleTagList: { tagId: number; name: string }[];
  todoList: { todoId: number; title: string; status: string }[];
}

export interface MyTodoList {
  teamId: number;
  title: string;
  teamTagList: { tagId: number; name: string }[];
  todoList: { todoId: number; title: string; status: string }[];
}

export interface TodoProps {
  todo: {
    todoId: number;
    title: string;
    status: string;
  };
  teamManageId: number;
}

export interface SetIdProps {
  ownerTeamManageId: number;
  progerss: number;
  teamTodoList: UserInfo[];
}
