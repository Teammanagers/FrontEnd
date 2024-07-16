import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CalendarPage, ExtraCalendarPage } from './pages/calendar';
import { LoginPage, ExtraLoginPage } from './pages/login';
import { ManagementPage, ExtraManagementPage } from './pages/management';
import { MemoPage, ExtraMemoPage } from './pages/memo';
import { MyPage, ExtraMyPage } from './pages/mypage';
import { SharePage, ExtraSharePage } from './pages/share';
import { TodoListPage, ExtraTodoListPage } from './pages/todo-list';
import ErrorPage from './pages/error';
import MainPage from './pages/main';
import { SideBar } from '@components/SideBar.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        {/* main page */}
        <Route path="/" element={<MainPage />} />
        {/* login page */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/:id" element={<ExtraLoginPage />} />
        {/* calendar page */}
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/calendar/:id" element={<ExtraCalendarPage />} />
        {/* management page */}
        <Route path="/management" element={<ManagementPage />} />
        <Route path="/management/:id" element={<ExtraManagementPage />} />
        {/* memo page */}
        <Route path="/memo" element={<MemoPage />} />
        <Route path="/memo/:id" element={<ExtraMemoPage />} />
        {/* mypage */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/:id" element={<ExtraMyPage />} />
        {/* share page */}
        <Route path="/share" element={<SharePage />} />
        <Route path="/share/:id" element={<ExtraSharePage />} />
        {/* todolist page */}
        <Route path="/todo-list" element={<TodoListPage />} />
        <Route path="/todo-list/:id" element={<ExtraTodoListPage />} />
        {/* error page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
