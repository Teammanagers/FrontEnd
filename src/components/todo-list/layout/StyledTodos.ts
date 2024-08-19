import styled from 'styled-components';
import AddTodoIcon from '@assets/todo-list/add-todo.svg';

export const Container = styled.div<{ ismypage: boolean }>`
  width: 382px;
  margin-bottom: ${(props) => (props.ismypage ? '16px' : '')};

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

  .accordion-trigger {
    cursor: pointer;
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

export const StyledAddTodoIcon = styled(AddTodoIcon)``;
