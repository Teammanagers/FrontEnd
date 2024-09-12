import styled from 'styled-components';
import EventCalendar from '@components/Calendar/EventCalendar';
import UpcomingEventList from '@components/Calendar/UpcomingEventList';

export const CalendarPage = () => {
  return (
    <>
      <Layout>
        <EventCalendar />
        <UpcomingEventList />
      </Layout>
    </>
  );
};

const Layout = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  z-index: -2;
  width: 100vw;
  height: 100vh;
  padding: 100px 0 0 126px;
  background-color: #f9fbff;
`;
