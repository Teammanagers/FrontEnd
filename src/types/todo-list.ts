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
