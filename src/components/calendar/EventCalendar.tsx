import { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import moment from 'moment';
import Modal from './Modal';
import { Value } from '../../types/calendar';

const EventCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [open, setOpen] = useState(false);

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
    setOpen(true);
  };

  // const closedModal = () => {
  //   setOpen(false);
  //   setDate(null);
  // };

  return (
    <StyledCalendarContainer>
      <StyledCalendar
        locale="en-US"
        value={date}
        onChange={handleDateChange}
        // formatDay={(locale: string | undefined, date: Date) =>
        //   moment(date).format('D')
        // } // MM일 제거 -> 숫자만 보이게
        // formatMonthYear={(locale: string | undefined, date: Date) =>
        //   moment(date).format('YYYY. MM')
        // } // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={true} // 전달, 다음달 날짜 숨기기
        next2Label={null} // 년도 이동 버튼 숨기기
        prev2Label={null} // 년도 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
      />
      {date && <Modal date={date} setOpen={setOpen} open={open} />}
    </StyledCalendarContainer>
  );
};

export default EventCalendar;

const StyledCalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 630px;
  height: 520px;
  margin-right: 23px;

  .react-calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: inherit;
    height: 520px;
    padding: 24px 47px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 12px;
    border: 1px solid rgba(221, 235, 255, 1);
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      font-family: 'Roboto', sans-serif;
      color: rgba(29, 29, 29, 1);
    }
  }

  /* 년/월 네비게이션 */
  .react-calendar__navigation {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 213px;
    height: 27px;
    margin-bottom: 18px;

    button {
      color: rgba(29, 29, 29, 1);
      background: none;
    }

    .react-calendar__navigation__label {
      width: 152px;
      height: 27px;
      flex-grow: 0 !important;
      font-size: 18px;
      font-weight: 700;
      pointer-events: none; // 입력 이벤트 무시
    }

    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__next-button {
      width: 24px;
      height: 24px;
      padding: 0;
    }

    /* 기본 hover 효과 무시 */
    .react-calendar__navigation__prev-button:hover,
    .react-calendar__navigation__next-button:hover,
    .react-calendar__navigation__prev-button:focus,
    .react-calendar__navigation__next-button:focus,
    .react-calendar__navigation__label:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  }

  /* 전체 날짜 */
  .react-calendar__month-view {
    width: 535px;
    height: 424px;

    /* 요일  */
    .react-calendar__month-view__weekdays {
      column-gap: 18px;
    }

    .react-calendar__month-view__weekdays abbr {
      text-decoration: none;
      font-size: 18px;
      font-weight: 500;
    }

    /* 요일, 날짜 크기 및 정렬 */
    .react-calendar__month-view__weekdays > div,
    .react-calendar__month-view__days > button {
      max-width: 60px;
      height: 60px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    /* 날짜 */
    .react-calendar__month-view__days {
      row-gap: 12px;
      column-gap: 18px;
    }

    .react-calendar__month-view__days__day abbr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 26px;
      height: 26px;
      font-size: 18px;
      font-weight: 400;
    }

    /* 요일, 날짜 폰트 */
    .react-calendar__month-view__weekdays__weekday abbr,
    .react-calendar__month-view__days abbr {
      font-size: 18px;
      font-weight: 400;
    }

    /* 기본 hover 효과 제거 */
    .react-calendar__tile:hover {
      background-color: rgba(255, 255, 255, 1);
    }

    .react-calendar__month-view__days__day:hover abbr {
      font-weight: 500;
    }

    /* 오늘 날짜 */
    .react-calendar__tile--now {
      background-color: rgba(255, 255, 255, 1);
    }
    .react-calendar__tile--now abbr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: rgba(221, 235, 255, 1);
    }

    /* 선택된 날짜 */
    .react-calendar__tile--active {
      background-color: rgba(255, 255, 255, 1);
    }
    .react-calendar__tile--active abbr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: rgba(92, 158, 255, 1);
    }

    /* 이전/다음 달 날짜 */
    .react-calendar__month-view__days__day--neighboringMonth abbr {
      color: rgba(204, 204, 204, 1);
    }
  }
`;

const StyledCalendar = styled(Calendar)``;
