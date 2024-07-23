import { FC } from 'react';
import styled from 'styled-components';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import ChevronDownIcon from '@assets/todo-list/chevron-down.svg';

interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  className?: string;
}

interface AccordionContentProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  className?: string;
}

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
      <StyledChevronDownIcon aria-hidden />
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
    <div className="AccordionContentText">{children}</div>
  </Accordion.Content>
);

const Todos = () => {
  return (
    <Container>
      <Accordion.Root type="single" className="accordion-root">
        <Accordion.Item value="item-1" className="accordion-item">
          <AccordionTrigger>
            <strong className="username">이예은</strong>
            <div className="tag-container">
              <span className="tag">기획자</span>
              <span className="tag">프론트엔드</span>
              <span className="tag">백엔드</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>투두리스트</AccordionContent>
        </Accordion.Item>
      </Accordion.Root>
    </Container>
  );
};

export default Todos;

const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  button,
  h3 {
    all: unset;
  }

  .accordion-root {
    position: relative; // chevron icon absolute 적용
    display: flex;
    align-items: center;
    width: 382px;
    height: 46px;
    padding-left: 15px;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    background-color: white;
  }

  .accordion-trigger {
    display: flex;
    align-items: center;
    padding: 0;
    background-color: white;
    border: none;

    .username {
      margin-right: 18px;
      font-size: 13px;
      font-weight: 500;
      color: #1d1d1d;
    }

    .tag-container {
      display: flex;
      align-items: center;
      /* height: 24px; */
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

  .accordion-root:focus-within {
    border: 1px solid #5c9eff;
  }
  .accordion-trigger[data-state='open'] > StyledChevronDownIcon {
    transform: rotate(180deg);
  }
  .accordion-trigger[data-state='open'] > .accordion-root {
    background-color: #f9fbff;
    box-shadow: 0 3.04px 9.12px 0 rgba(0, 0, 0, 0.08);
  }

  .accordion-trigger[data-state='open'] > .tag {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const StyledChevronDownIcon = styled(ChevronDownIcon)`
  position: absolute;
  top: 14px;
  right: 15px;
  transition: transform 300ms;
`;
