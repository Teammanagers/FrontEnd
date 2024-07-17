import { useLocation } from 'react-router-dom';
import { SideBar } from './SideBar';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLoginPath = location.pathname.startsWith('/login');

  return (
    <>
      {!isLoginPath && <SideBar />}
      {children}
    </>
  );
};

export default Layout;
