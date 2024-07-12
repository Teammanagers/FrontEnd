import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const StyledCalendarWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: relative; */

  .react-calendar {
    width: 828px;
    height: 664px;
    padding: 32px 62px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 12px;
    border: 1px solid rgba(221, 235, 255, 1);
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: rgba(29, 29, 29, 1);
    }
  }

  /* 년/월 네비게이션 */
  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    margin-bottom: 24px;

    button {
      color: rgba(29, 29, 29, 1);
    }

    .react-calendar__navigation__label {
      width: 200px;
      height: 36px;
      flex-grow: 0 !important;
      font-size: 24px;
      font-weight: 700;
    }

    /* 기본 hover 효과 무시 */
    button:hover,
    .react-calendar__navigation__label:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  }

  /* 전체 날짜 */
  .react-calendar__month-view {
    width: 704px;
    height: 540px;

    /* 요일  */
    .react-calendar__month-view__weekdays {
      column-gap: 24px;
    }

    .react-calendar__month-view__weekdays abbr {
      text-decoration: none;
      font-size: 24px;
      font-weight: 500;
    }

    /* 날짜 */
    .react-calendar__month-view__days {
      row-gap: 12px;
      column-gap: 24px;
    }

    .react-calendar__month-view__weekdays > div,
    .react-calendar__month-view__days > button {
      max-width: 80px;
      height: 80px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .react-calendar__month-view__days abbr {
      font-size: 24px;
      font-weight: 400;
    }
    /* 오늘 날짜 */
    .react-calendar__tile--now {
      background-color: rgba(255, 255, 255, 1);
    }
    .react-calendar__tile--now abbr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(221, 235, 255, 1);
    }
  }
`;

export const StyledCalendar = styled(Calendar)``;
