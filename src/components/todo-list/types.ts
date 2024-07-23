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
