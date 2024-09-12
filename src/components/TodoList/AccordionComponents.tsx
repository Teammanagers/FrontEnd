import { FC } from 'react';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import styled from 'styled-components';
import {
  AccordionContentProps,
  AccordionTriggerProps
} from '../../types/todo-list';
import ChevronDownIcon from '@assets/todo-list/chevron-down.svg';

export const AccordionTrigger: FC<AccordionTriggerProps> = ({
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

export const AccordionContent: FC<AccordionContentProps> = ({
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

const StyledChevronDownIcon = styled(ChevronDownIcon)``;
