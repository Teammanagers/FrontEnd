import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import AddEventModal from './AddEventModal';
import { EventType, Value } from '../../types/calendar';
import NextBtn from '@assets/calendar/next-btn.svg';
import PrevBtn from '@assets/calendar/prev-btn.svg';
import { teamId } from '../../constant/index';
import { useMemberStore } from '@store/memberStore';
import { getCalendarEvent, getTeamMember } from '@apis/calendar';

const EventCalendar = () => {
  const setTeamMember = useMemberStore((state) => state.setTeamMember);
  const [date, setDate] = useState<Value>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [eventList, setEventList] = useState<EventType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [calendarHeight, setCalendarHeight] = useState<string>('520px');

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
    setOpen(true);
  };

  // 멤버 불러오기
  useEffect(() => {
    const fetchMember = async () => {
      const response = await getTeamMember(teamId);
      setTeamMember(response.data.result.teamMember);
    };

    fetchMember();
  }, []);

  // 월 업데이트
  const updateMonth = (activeStartDate: Date | null) => {
    setDate(activeStartDate);
    if (activeStartDate) {
      setMonth(activeStartDate?.getMonth() + 1);
    }
  };
  useEffect(() => {
    // 현재 날짜 기준으로 초기 월 설정
    updateMonth(new Date());
  }, []);

  // 월 스케쥴 가져오기
  const fetchCalendarEvent = async () => {
    const response = await getCalendarEvent(teamId, month);
    setEventList(response.data.result.calendarListOfMonth);
    console.log(eventList);
  };
  useEffect(() => {
    if (month) fetchCalendarEvent();
  }, [month]);

  // 매월 몇 주인지 구하기 -> 5,6주일 때 height 변화
  useEffect(() => {
    const getWeeksInMonth = (date: Date) => {
      // 해당 달의 첫째 날의 요일
      const firstDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      ).getDay();

      // 해당 달의 마지막 날
      const lastDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();

      return Math.ceil((firstDay + lastDate) / 7);
    };

    const determineWeeksInMonth = (value: Value) => {
      if (value instanceof Date) {
        return getWeeksInMonth(value);
      } else if (Array.isArray(value) && value[0] instanceof Date) {
        return getWeeksInMonth(value[0]);
      }
      // value가 Date, 배열 둘다 아닌 경우
      else {
        return getWeeksInMonth(new Date());
      }
    };

    const week = determineWeeksInMonth(date);

    if (week >= 6) {
      setCalendarHeight('595px');
    } else {
      setCalendarHeight('520px');
    }
  }, [date]);

  return (
    <StyledCalendarContainer height={calendarHeight}>
      <StyledCalendar
        locale="en-US"
        calendarType="gregory" // 일요일 부터 시작
        onChange={handleDateChange}
        // formatDay={(locale: string | undefined, date: Date) =>
        //   moment(date).format('D')
        // } // MM일 제거 -> 숫자만 보이게
        // formatMonthYear={(locale: string | undefined, date: Date) =>
        //   moment(date).format('YYYY. MM')
        // } // 네비게이션에서 2023. 12 이렇게 보이도록 설정

        // 일정 있는 날짜에 점 추가
        tileContent={({ date }) => {
          if (
            eventList.find(
              (v) =>
                v.date ===
                moment(date instanceof Date ? date : null).format('YYYY-MM-DD')
            )
          ) {
            return (
              <>
                <Dot />
              </>
            );
          }
        }}
        // 달 넘어갈 때 자동 선택된 값(1일)으로 캘린더 height 변화
        onActiveStartDateChange={({ activeStartDate }) =>
          updateMonth(activeStartDate)
        }
        showNeighboringMonth={true} // 전달, 다음달 날짜 숨기기
        next2Label={null} // 년도 이동 버튼 숨기기
        prev2Label={null} // 년도 이동 버튼 숨기기
        nextLabel={<NextBtn />}
        prevLabel={<PrevBtn />}
        minDetail="year" // 10년단위 년도 숨기기
      />
      {date && (
        <AddEventModal selectedDate={date} setOpen={setOpen} open={open} />
      )}
    </StyledCalendarContainer>
  );
};

export default EventCalendar;

const StyledCalendarContainer = styled.div<{ height: string }>`
  width: 630px;
  margin-right: 23px;

  .react-calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: inherit;
    height: ${(props) => props.height};
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
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 60px;
      height: 60px;
      padding: 0;
    }

    /* 날짜 */
    .react-calendar__month-view__days {
      row-gap: 12px;
      column-gap: 18px;
    }

    .react-calendar__month-view__days__day {
      position: relative;
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

const Dot = styled.div`
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translate(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.mainBlue};
`;
